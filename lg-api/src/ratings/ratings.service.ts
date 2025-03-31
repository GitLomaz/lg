import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findRatingByGameAndUser(gameId: number, userId: number) {
    const rating = await this.databaseService.game_rating.findUnique({
      where: {
        game_id_user_id: {
          game_id: gameId,
          user_id: userId,
        },
      },
    });
    return rating
  }

  async setRatingForGameAndUser(gameId: number, userId: number, rating: number) {
    const record = await this.databaseService.game_rating.upsert({
      where: {
        game_id_user_id: { game_id: gameId, user_id: userId }
      },
      update: {value: rating},
      create: {
        game_id: gameId,
        user_id: userId,
        value: rating
      }
    });
    return record
  }
}
