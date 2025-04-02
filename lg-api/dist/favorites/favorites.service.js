"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let FavoritesService = class FavoritesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findFavoriteByGameAndUser(gameId, userId) {
        const favorite = await this.databaseService.game_favorite.findUnique({
            where: {
                game_id_user_id: {
                    game_id: gameId,
                    user_id: userId,
                },
            },
        });
        return favorite;
    }
    async removeFavorite(gameId, userId) {
        await this.databaseService.game_favorite.delete({
            where: {
                game_id_user_id: {
                    game_id: gameId,
                    user_id: userId,
                },
            },
        });
        return true;
    }
    async addFavorite(gameId, userId) {
        await this.databaseService.game_favorite.create({
            data: {
                game_id: gameId,
                user_id: userId,
            },
        });
        return true;
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map