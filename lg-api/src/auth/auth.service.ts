import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { generateServerResponse } from '../common/responseCodes';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailService
  ) {}

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
    if (existingEmail) {
      return generateServerResponse('EMAIL_TAKEN');
    }

    const existingUser = await this.databaseService.user.findUnique({ where: { username } });
    if (existingUser) {
      return generateServerResponse('USERNAME_TAKEN');
    }

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
    return generateServerResponse('ACCOUNT_REGISTERED', {email: email});
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