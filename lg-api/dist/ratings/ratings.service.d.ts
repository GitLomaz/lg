import { DatabaseService } from 'src/database/database.service';
export declare class RatingsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findRatingByGameAndUser(gameId: number, userId: number): Promise<{
        game_id: number;
        user_id: number;
        value: number;
    }>;
    setRatingForGameAndUser(gameId: number, userId: number, rating: number): Promise<{
        game_id: number;
        user_id: number;
        value: number;
    }>;
}
