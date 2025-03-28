import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { APIResponse } from 'src/common/responseCodes';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(body: any): Promise<APIResponse>;
    verifyEmail(token: string): Promise<APIResponse>;
    login(body: any): Promise<APIResponse | {
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
