import { PassportSerializer } from "@nestjs/passport";
import { DatabaseService } from "src/database/database.service";

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  // Serialize the user's identifier (e.g., user.id) into the session
  serializeUser(user: any, done: Function) {
    done(null, user.id); // Store the user id (or unique identifier)
  }

  // Deserialize the user using the id from the session to retrieve the full user object
  async deserializeUser(payload: any, done: Function) {
    const user = await this.databaseService.user.findUnique({ where: { id: payload } });
    if (user) {
      done(null, user); // Complete deserialization by returning the full user
    } else {
      done(null, null); // If user not found, return null
    }
  }
}