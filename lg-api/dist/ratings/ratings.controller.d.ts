import { RatingsService } from './ratings.service';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    getFavorite(id: string, req: any): Promise<import("../common/responseCodes").APIResponse>;
    setFavorite(gameId: number, value: number, req: any): Promise<import("../common/responseCodes").APIResponse>;
}
