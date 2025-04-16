import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from "./auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.API_GOOGLE_CLIENT_ID,
      clientSecret: process.env.API_GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.API_GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const { name, emails, photos } = profile;
    const user = await this.authService.findOrCreateOauthUser(
      'google-' + emails[0].value,
      name.givenName,
      photos[0].value,
      'google',
    );
    done(null, user);
  }
}