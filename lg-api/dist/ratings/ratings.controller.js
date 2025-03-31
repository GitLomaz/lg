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
exports.RatingsController = void 0;
const common_1 = require("@nestjs/common");
const LocalGuard_1 = require("../auth/LocalGuard");
const ratings_service_1 = require("./ratings.service");
const responseCodes_1 = require("../common/responseCodes");
let RatingsController = class RatingsController {
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    async getFavorite(id, req) {
        const userId = req.user.id;
        const rating = await this.ratingsService.findRatingByGameAndUser(parseInt(id), userId);
        return (0, responseCodes_1.generateServerResponse)('SUCCESS', rating ? rating.value : false);
    }
    async setFavorite(gameId, value, req) {
        if (![1, 2, 3, 4, 5].includes(value)) {
            return (0, responseCodes_1.generateServerResponse)('INVALID_REQUEST');
        }
        const userId = req.user.id;
        const rating = await this.ratingsService.setRatingForGameAndUser(gameId, userId, value);
        return (0, responseCodes_1.generateServerResponse)('SUCCESS', rating.value);
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getFavorite", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('gameId')),
    __param(1, (0, common_1.Body)('value')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "setFavorite", null);
exports.RatingsController = RatingsController = __decorate([
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [ratings_service_1.RatingsService])
], RatingsController);
//# sourceMappingURL=ratings.controller.js.map