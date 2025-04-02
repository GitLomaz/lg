import { PassportSerializer } from "@nestjs/passport";
import { DatabaseService } from "src/database/database.service";
export declare class SessionSerializer extends PassportSerializer {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    serializeUser(user: any, done: Function): void;
    deserializeUser(payload: any, done: Function): Promise<any>;
}
