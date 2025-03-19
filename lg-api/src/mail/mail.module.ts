import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // Ensure MailService is exported so it can be used elsewhere
})
export class MailModule {}