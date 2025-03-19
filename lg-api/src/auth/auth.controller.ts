import { Controller, Post, Req, Res, UseGuards, Body, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CsrfGuard } from '../middlewares/csrf.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() body) {
    return this.authService.login(body.email, body.password, req, res);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body.username, body.email, body.password);
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('protected')
  @UseGuards(CsrfGuard)
  async protectedEndpoint() {
    return { message: 'You accessed a protected route' };
  }
}
