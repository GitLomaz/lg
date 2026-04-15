import REACT_APP_API_URL from "./config";

type MaybeObj = Record<string, any> | undefined;

const baseURL = REACT_APP_API_URL || "";
const withCredentials = true;

function buildUrl(url: string) {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    const base = baseURL.replace(/\/$/, "");
    const path = url.replace(/^\//, "");
    return base ? `${base}/${path}` : path;
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

    const res = await fetch(fullUrl, fetchCfg);

    try {
        console.debug(`[http response] ${res.status} ${fullUrl}`);
    } catch (e) {}

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
