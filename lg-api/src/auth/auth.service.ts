import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { generateServerResponse } from 'src/common/responseCodes';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async verifyEmail(token: string) {
    const user = await this.databaseService.user.findUnique({ where: { verification_token: token } });
    if (!user) return generateServerResponse('INVALID_TOKEN');

    await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        is_verified: true,
        verification_token: null,
      },
    });
    return generateServerResponse('ACCOUNT_VERIFIED');
  }

  async validateUser(username: string, password: string) {
    const user = await this.getUserByEmailOrUsername(username)
    if (!user) {
      return false // User not found result
    }
    const passwordHash = user.passwords[0].password_hash
    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) {
      return false // User not found result
    }
    if (!user.is_verified) {
      return false // User not verified
    }
    return user
  }

  async getUserByEmailOrUsername(username: string) {
    if (!username) return null;
    return this.databaseService.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }
        ],
      },
      include: {
        passwords: {
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });
  }
}