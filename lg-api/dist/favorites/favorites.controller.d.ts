import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorite(id: string, req: any): Promise<import("../common/responseCodes").APIResponse>;
    setFavorite(gameId: number, req: any): Promise<import("../common/responseCodes").APIResponse>;
}
