import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, email: string, password: string) {
    // const user = await this.authService.validateUser(username, email, password);
    // if (!user) {
    //   return null
    // }
    // return user;
  }
}