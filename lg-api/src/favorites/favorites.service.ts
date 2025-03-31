import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findFavoriteByGameAndUser(gameId: number, userId: number) {
    const favorite = await this.databaseService.game_favorite.findUnique({
      where: {
        game_id_user_id: {
          game_id: gameId,
          user_id: userId,
        },
      },
    });
    return favorite
  }

  async removeFavorite(gameId: number, userId: number) {
    await this.databaseService.game_favorite.delete({
      where: {
        game_id_user_id: {
          game_id: gameId,
          user_id: userId,
        },
      },
    });
    return true
  }

  async addFavorite(gameId: number, userId: number) {
    await this.databaseService.game_favorite.create({
      data: {
        game_id: gameId,
        user_id: userId,
      },
    });
    return true
  }
}
