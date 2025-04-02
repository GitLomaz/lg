import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
export declare class UserService {
    private readonly databaseService;
    private readonly mailService;
    constructor(databaseService: DatabaseService, mailService: MailService);
    checkIfUserExists(username: string, email: string): Promise<import("../common/responseCodes").APIResponse>;
    register(username: string, email: string, password: string): Promise<import("../common/responseCodes").APIResponse>;
    verifyEmail(token: string): Promise<import("../common/responseCodes").APIResponse>;
    getUserByEmailOrUsername(username: string, email: string): Promise<{
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
    sanitizeUser(user: any): any;
}
