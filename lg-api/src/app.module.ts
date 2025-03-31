import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { FavoritesModule } from './favorites/favorites.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [DatabaseModule, GamesModule, AuthModule, MailModule, PassportModule.register({session: true}), FavoritesModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
