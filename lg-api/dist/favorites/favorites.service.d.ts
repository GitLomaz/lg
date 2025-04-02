import { DatabaseService } from 'src/database/database.service';
export declare class FavoritesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findFavoriteByGameAndUser(gameId: number, userId: number): Promise<{
        game_id: number;
        user_id: number;
    }>;
    removeFavorite(gameId: number, userId: number): Promise<boolean>;
    addFavorite(gameId: number, userId: number): Promise<boolean>;
}
