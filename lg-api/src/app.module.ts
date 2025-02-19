import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [DatabaseModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
