import { Controller, Post, Body, Query, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'
import { LocalAuthGuard } from './LocalGuard';
import { APIResponse, generateServerResponse } from 'src/common/responseCodes';
import { AuthGuard } from '@nestjs/passport';
import { promisify } from 'util';

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

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const logoutAsync = promisify(req.logout.bind(req));
    const destroyAsync = req.session ? promisify(req.session.destroy.bind(req.session)) : null;
    try {
      await logoutAsync();
      if (destroyAsync) {
        await destroyAsync();
      }
      res.clearCookie('LG_SESSION');
    } catch (err) {
      console.error('Logout error:', err);
      return generateServerResponse('LOGOUT_FAILED');
    }
    return generateServerResponse('LOGOUT_SUCCESSFUL');
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    req.login(req.user, (err) => {
      const script = `
        <script>
          window.opener.postMessage({ type: 'google-auth-success', username: '${req.user['username']}' }, '*');
          window.close();
        </script>
      `;
      res.send(script);
    });
  }
}