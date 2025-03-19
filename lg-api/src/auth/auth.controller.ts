import { Controller, Post, Req, Res, UseGuards, Body, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CsrfGuard } from '../middlewares/csrf.guard';
import * as passport from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    passport.authenticate('local', (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: 'Login failed' });
        }
        return res.json({ message: 'Login successful', user });
      });
    })(req, res); // Trigger passport's middleware for local strategy
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
