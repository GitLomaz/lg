import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { APIResponse, generateServerResponse } from 'src/common/responseCodes';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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

  async validateUser(username: string, password: string): Promise<APIResponse | user> {
    const user = await this.getUserByEmailOrUsername(username)
    if (!user) {
      return generateServerResponse('LOGIN_FAILED');
    }
    const passwordHash = user.passwords[0].password_hash
    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) {
      return generateServerResponse('LOGIN_FAILED');
    }
    if (!user.is_verified) {
      return generateServerResponse('ACCOUNT_UNVERIFIED');
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

  async findOrCreateOauthUser(
    email: string,
    name: string,
    picture: string,
    provider: string
  ) {
    let user = await this.getUserByEmailOrUsername(email)
    if (!user) {
      const username = this.userService.generateUsername()
      await this.userService.register(username, email, null, true)
      user = await this.getUserByEmailOrUsername(email)
    }
    return user
    // let user = await this.userRepo.findOneBy({ email: profile.email });
    // if (!user) {
    //   user = this.userRepo.create(profile);
    //   await this.userRepo.save(user);
    // }
    // return user;
  }
}