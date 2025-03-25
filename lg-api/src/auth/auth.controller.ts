import { Controller, Post, Body, Query, Get, UseGuards, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async getUserByEmailOrUsername(@Body() body) {
    let user = await this.authService.validateUser(body.username, body.password)
    console.log(user)
    return user
    // return this.authService.verifyEmail(token);
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session.id)
  }
}
