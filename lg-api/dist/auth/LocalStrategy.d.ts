import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<import("../common/responseCodes").APIResponse | {
        id: number;
        username: string;
        developer: boolean | null;
        image: string | null;
        email: string;
        is_verified: boolean;
        verification_token: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}
export {};
