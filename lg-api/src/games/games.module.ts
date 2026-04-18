import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { IframeApiController } from './iframe-api.controller';
import { IframeApiService } from './iframe-api.service';

@Module({
  controllers: [GamesController, IframeApiController],
  providers: [GamesService, IframeApiService],
})
export class GamesModule {}
