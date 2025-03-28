import { user } from '@prisma/client';
import { APIResponse } from 'src/common/responseCodes';
import { DatabaseService } from 'src/database/database.service';
export declare class AuthService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    verifyEmail(token: string): Promise<APIResponse>;
    validateUser(username: string, password: string): Promise<APIResponse | user>;
    getUserByEmailOrUsername(username: string): Promise<{
        passwords: {
            id: string;
            created_at: Date | null;
            user_id: number;
            password_hash: string;
        }[];
    } & {
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
