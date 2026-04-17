import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ session: true});
  }

  async validate(username: string, password: string) {
    const result = await this.authService.validateUser(username, password);
    // If the auth service returned an APIResponse (failure), throw to indicate unauthorized
    if (!result || (result as any).code) {
      const message = (result as any)?.data || 'Unauthorized';
      throw new UnauthorizedException(message);
    }
    return result;
  }
}