export interface APIResponse {
    code: string;
    data: string;
    success: boolean;
}
export declare function generateServerResponse(code: string, data?: any): APIResponse;
