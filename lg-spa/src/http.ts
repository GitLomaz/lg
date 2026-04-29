import REACT_APP_API_URL from "./config";

type MaybeObj = Record<string, any> | undefined;

const baseURL = REACT_APP_API_URL || "";
const withCredentials = true;

// Retry configuration for server startup scenarios
const RETRY_STATUS_CODES = [502, 503, 504]; // Bad Gateway, Service Unavailable, Gateway Timeout
const RETRY_DELAY_MS = 5000; // 5 seconds
const MAX_RETRY_TIME_MS = 60000; // 30 seconds total

function buildUrl(url: string) {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    const base = baseURL.replace(/\/$/, "");
    const path = url.replace(/^\//, "");
    return base ? `${base}/${path}` : path;
}

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function rawRequest(method: string, url: string, body?: any, cfg?: RequestInit) {
    const fullUrl = buildUrl(url);
    try {
        console.debug(`[http request] ${method.toUpperCase()} ${fullUrl}`);
    } catch (e) {}

    const headers: Record<string, string> = { ...(cfg && (cfg.headers as Record<string,string>)), };
    if (body !== undefined && !(body instanceof FormData)) {
        headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    const fetchCfg: RequestInit = {
        method,
        credentials: withCredentials ? "include" : "same-origin",
        ...cfg,
        headers,
    };

    if (body !== undefined && !(body instanceof FormData) && method !== 'GET' && method !== 'HEAD') {
        fetchCfg.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
        fetchCfg.body = body as any;
    }

    const startTime = Date.now();
    let lastError: any = null;
    let attempt = 0;

    while (Date.now() - startTime < MAX_RETRY_TIME_MS) {
        attempt++;
        
        try {
            const res = await fetch(fullUrl, fetchCfg);

            try {
                console.debug(`[http response] ${res.status} ${fullUrl}`);
            } catch (e) {}

            // Check if we should retry due to server startup
            if (RETRY_STATUS_CODES.includes(res.status)) {
                const elapsed = Date.now() - startTime;
                if (elapsed < MAX_RETRY_TIME_MS) {
                    console.warn(
                        `[http retry] Server not ready (${res.status}). Retrying in ${RETRY_DELAY_MS/1000}s... (attempt ${attempt}, elapsed ${Math.round(elapsed/1000)}s)`
                    );
                    await sleep(RETRY_DELAY_MS);
                    continue; // Retry the request
                }
            }

            const contentType = res.headers.get("content-type") || "";
            let data: any = null;
            if (contentType.includes("application/json")) {
                data = await res.json().catch(() => null);
            } else {
                data = await res.text().catch(() => null);
            }

            const response = { data, status: res.status, config: { url: fullUrl, method } };

            if (!res.ok) {
                const err: any = new Error(`HTTP error ${res.status}`);
                err.response = response;
                throw err;
            }

            return response;
        } catch (err: any) {
            lastError = err;
            
            // If it's a network error or retry-able status, retry
            if (err.response && RETRY_STATUS_CODES.includes(err.response.status)) {
                const elapsed = Date.now() - startTime;
                if (elapsed < MAX_RETRY_TIME_MS) {
                    console.warn(
                        `[http retry] Server not ready. Retrying in ${RETRY_DELAY_MS/1000}s... (attempt ${attempt}, elapsed ${Math.round(elapsed/1000)}s)`
                    );
                    await sleep(RETRY_DELAY_MS);
                    continue; // Retry the request
                }
            }
            
            // For non-retry-able errors, throw immediately
            throw err;
        }
    }

    // If we've exhausted retries, throw the last error
    console.error(`[http retry exhausted] Failed after ${attempt} attempts over ${Math.round((Date.now() - startTime)/1000)}s`);
    throw lastError || new Error('Request failed after maximum retry time');
}

const http = {
    request: (cfg: { method?: string; url: string; data?: any; headers?: MaybeObj } & RequestInit) => {
        const method = (cfg.method || 'GET').toUpperCase();
        return rawRequest(method, cfg.url, (cfg as any).data, cfg);
    },
    get: (url: string, cfg?: RequestInit) => rawRequest('GET', url, undefined, cfg),
    post: (url: string, data?: any, cfg?: RequestInit) => rawRequest('POST', url, data, cfg),
    put: (url: string, data?: any, cfg?: RequestInit) => rawRequest('PUT', url, data, cfg),
    delete: (url: string, cfg?: RequestInit) => rawRequest('DELETE', url, undefined, cfg),
};

export default http;
