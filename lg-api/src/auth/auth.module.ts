import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MailModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}