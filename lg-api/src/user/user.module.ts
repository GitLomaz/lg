import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [UserService, DatabaseService, MailService],
  exports: [UserService],
})
export class UserModule {}