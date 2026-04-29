import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService, MailService],
  exports: [UserService],
})
export class UserModule {}