import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailService
  ) {}

  // async validateUser(username: string, email: string, password: string): Promise<user | null> {
  //   const user = await this.databaseService.user.findFirst({
  //     where: {
  //       OR: [
  //         { email },
  //         { username }
  //       ]
  //     },
  //     include: {
  //       passwords: {
  //         take: 1,
  //         orderBy: {
  //           created_at: 'desc'
  //         }
  //       }
  //     }
  //   });
  //   if (!user) return null;
  //   const isMatch = await bcrypt.compare(password, user.passwords[0].password_hash);
  //   if (!isMatch) return null;
  //   return user;
  // }

  async login(email: string, password: string, req: Request, res: Response) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
      include: { passwords: true },
    });

    if (!user || !(await bcrypt.compare(password, user.passwords[0].password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sessionToken = randomUUID();
    await this.databaseService.sessions.create({
      data: {
        user_id: user.id,
        session_token: sessionToken,
        user_agent: req.headers['user-agent'],
        ip_address: req.ip,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiry
      },
    });

    // Set HttpOnly cookie
    res.cookie('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    });

    return { message: 'Login successful' };
  }

  async logout(req: Request, res: Response) {
    const sessionToken = req.cookies['session_token'];
    if (!sessionToken) return;

    // Delete session from DB
    await this.databaseService.sessions.deleteMany({
      where: { session_token: sessionToken },
    });

    res.clearCookie('session_token');
    return { message: 'Logged out' };
  }

  async register(username: string, email: string, password: string) {
    const existingEmail = await this.databaseService.user.findUnique({ where: { email } });
    if (existingEmail) throw new BadRequestException('Email already in use');

    const existingUser = await this.databaseService.user.findUnique({ where: { username } });
    if (existingUser) throw new BadRequestException('Username is taken');

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = randomUUID();

    const user = await this.databaseService.user.create({
      data: {
        username,
        email,
        verification_token: verificationToken,
      },
    });

    await this.databaseService.passwords.create({
      data: {
        user_id: user.id,
        password_hash: hashedPassword,
      },
    });

    await this.mailService.sendVerificationEmail(email, verificationToken);
    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    const user = await this.databaseService.user.findUnique({ where: { verification_token: token } });
    if (!user) throw new BadRequestException('Invalid or expired token');

    await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        is_verified: true,
        verification_token: null,
      },
    });

    return { message: 'Email verified successfully' };
  }
}