import { PassportSerializer } from "@nestjs/passport";
import { DatabaseService } from "src/database/database.service";

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user)
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.databaseService.user.findUnique({ where: { id: payload.id } });
    return user ? done(null, user) : done(null, null)
  }
}