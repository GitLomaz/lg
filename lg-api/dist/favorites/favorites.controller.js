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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const LocalGuard_1 = require("../auth/LocalGuard");
const favorites_service_1 = require("./favorites.service");
const responseCodes_1 = require("../common/responseCodes");
let FavoritesController = class FavoritesController {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async getFavorite(id, req) {
        console.log('here?!?!?');
        const userId = req.user.id;
        const favorite = await this.favoritesService.findFavoriteByGameAndUser(parseInt(id), userId);
        return (0, responseCodes_1.generateServerResponse)('SUCCESS', favorite !== null);
    }
    async setFavorite(gameId, req) {
        const userId = req.user.id;
        const existingFavorite = await this.favoritesService.findFavoriteByGameAndUser(gameId, userId);
        let added = true;
        if (existingFavorite) {
            await this.favoritesService.removeFavorite(gameId, userId);
            added = false;
        }
        else {
            await this.favoritesService.addFavorite(gameId, userId);
        }
        return (0, responseCodes_1.generateServerResponse)('SUCCESS', added);
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorite", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('gameId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "setFavorite", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map