import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { generateServerResponse } from '../common/responseCodes';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailService
  ) {}

  // Check if user exists by username or email
  async checkIfUserExists(username: string, email: string) {
    const existingEmail = await this.databaseService.user.findUnique({ where: { email } });
    if (existingEmail) return generateServerResponse('EMAIL_TAKEN');

    const existingUser = await this.databaseService.user.findUnique({ where: { username } });
    if (existingUser) return generateServerResponse('USERNAME_TAKEN');
    
    return null;
  }

  // Register a new user
  async register(username: string, email: string, password: string) {
    // Check if the user already exists
    const existingUserCheck = await this.checkIfUserExists(username, email);
    if (existingUserCheck) return existingUserCheck;
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
    return generateServerResponse('ACCOUNT_REGISTERED', { email: email });
  }

  // Verify email using the token
  async verifyEmail(token: string) {
    const user = await this.databaseService.user.findUnique({ where: { verification_token: token } });
    if (!user) {
      return generateServerResponse('INVALID_TOKEN');
    }
    await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        is_verified: true,
        verification_token: null,
      },
    });
    return generateServerResponse('ACCOUNT_VERIFIED');
  }

  // Get user by username or email
  async getUserByEmailOrUsername(username: string, email: string) {
    return this.databaseService.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      },
      include: {
        passwords: {
          orderBy: {
            created_at: 'desc'
          },
          take: 1
        }
      }
    });
  }
}