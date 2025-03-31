import { Controller, Post, Body, Query, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'
import { LocalAuthGuard } from './LocalGuard';
import { APIResponse, generateServerResponse } from 'src/common/responseCodes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('register')
  async register(@Body() body) {
    return this.userService.register(body.username, body.email, body.password);
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    let user = await this.authService.validateUser(body.username, body.password)
    if ((user as APIResponse).code) {
      return user;
    }
    return generateServerResponse('LOGIN_SUCCESSFUL', this.userService.sanitizeUser(user));
  }
}
