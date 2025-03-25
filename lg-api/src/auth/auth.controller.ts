import { Controller, Post, Body, Query, Get, UseGuards, Session, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'
import { AuthenticatedGuard, LocalAuthGuard } from './LocalGuard';

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
  async getUserByEmailOrUsername(@Body() body) {
    let user = await this.authService.validateUser(body.username, body.password)
    return user
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true
    return session
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user
  }
}
