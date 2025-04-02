import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { GamesService } from '../games/games.service';
import { RatingsController } from './ratings.controller';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, GamesService],
})
export class RatingsModule {}
