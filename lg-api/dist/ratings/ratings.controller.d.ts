import { RatingsService } from './ratings.service';
import { GamesService } from '../games/games.service';
export declare class RatingsController {
    private readonly ratingsService;
    private readonly gamesService;
    constructor(ratingsService: RatingsService, gamesService: GamesService);
    getFavorite(id: string, req: any): Promise<import("../common/responseCodes").APIResponse>;
    setFavorite(gameId: number, value: number, req: any): Promise<import("../common/responseCodes").APIResponse>;
}
