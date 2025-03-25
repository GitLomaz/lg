import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './LocalStrategy';
import { SessionSerializer } from './SessionSerializer';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [MailModule, UserModule, PassportModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,
    {
      provide: SessionSerializer,
      useFactory: (databaseService: DatabaseService) => {
        return new SessionSerializer(databaseService);
      },
      inject: [DatabaseService], // Injecting the DatabaseService
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}