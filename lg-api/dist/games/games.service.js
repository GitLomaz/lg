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
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let GamesService = class GamesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findByAuthorAndId(author, gameString) {
        const game = this.databaseService.game.findFirst({
            where: {
                game_string: gameString,
                author: {
                    username: author
                }
            },
            select: {
                id: true,
                game_string: true,
                author: true,
                iframe: true,
                width: true,
                height: true,
                tags: true,
                genre: true,
                ratings: true,
                plays: true,
                favorites: true,
                achievements: true,
                assets: {
                    select: {
                        type: true,
                        path: true
                    }
                },
                translations: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            }
        });
        return game;
    }
    async findAll() {
        const games = await this.databaseService.game.findMany({
            select: {
                id: true,
                game_string: true,
                author: true,
                tags: true,
                genre: true,
                ratings: true,
                plays: true,
                favorites: true,
                achievements: true,
                assets: {
                    select: {
                        type: true,
                        path: true
                    }
                },
                translations: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            },
            where: {
                OR: [
                    { translations: { some: { language: "en" } } },
                    { translations: { none: {} } }
                ]
            }
        });
        this.transposeAll(games);
        return games;
    }
    async findPopular() {
        const games = await this.databaseService.game.findMany({
            select: {
                game_string: true,
                author: true,
                tags: true,
                genre: true,
                ratings: true,
                plays: true,
                favorites: true,
                achievements: true,
                assets: {
                    select: {
                        type: true,
                        path: true
                    }
                },
                translations: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            },
            where: {
                OR: [
                    { translations: { some: { language: "en" } } },
                    { translations: { none: {} } }
                ]
            }
        });
        this.transposeAll(games);
        games.sort(function (a, b) {
            return a.plays > b.plays ? -1 : 1;
        });
        return games;
    }
    async findByGenre(genre) {
        const games = await this.databaseService.game.findMany({
            select: {
                game_string: true,
                author: true,
                tags: true,
                genre: true,
                ratings: true,
                plays: true,
                favorites: true,
                achievements: true,
                assets: {
                    select: {
                        type: true,
                        path: true
                    }
                },
                translations: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            },
            where: {
                OR: [
                    { translations: { some: { language: "en" } } },
                    { translations: { none: {} } }
                ],
                genre: { name: genre }
            }
        });
        this.transposeAll(games);
        return games;
    }
    async findOne(id) {
        const game = this.databaseService.game.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        username: true,
                        image: true
                    }
                },
                tags: {
                    select: {
                        name: true
                    }
                },
                genre: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return game;
    }
    transpose(game) {
        game.genre = game.genre.name;
        game.author = game.author.username;
        game.tags = game.tags.map(tag => tag.name);
        game.tile = null;
        game.screenshots = [];
        game.assets.forEach(function (asset) {
            if (asset.type === 'ss') {
                game.screenshots.push(asset.path);
            }
            else if (asset.type === 'tile') {
                game.tile = asset.path;
            }
        });
        delete game.assets;
        game.plays = game.plays.reduce(function (sum, day) {
            return sum + day.count;
        }, 0);
        game.ratings = {
            1: game.ratings.reduce(function (sum, rating) {
                return sum + (rating.value === 1 ? 1 : 0);
            }, 0),
            2: game.ratings.reduce(function (sum, rating) {
                return sum + (rating.value === 2 ? 1 : 0);
            }, 0),
            3: game.ratings.reduce(function (sum, rating) {
                return sum + (rating.value === 3 ? 1 : 0);
            }, 0),
            4: game.ratings.reduce(function (sum, rating) {
                return sum + (rating.value === 4 ? 1 : 0);
            }, 0),
            5: game.ratings.reduce(function (sum, rating) {
                return sum + (rating.value === 5 ? 1 : 0);
            }, 0),
            average: game.ratings.reduce(function (sum, rating) {
                return sum + rating.value;
            }, 0) / game.ratings.length,
        };
        game.favorites = game.favorites.length;
        return game;
    }
    transposeAll(games) {
        return games.map(this.transpose.bind(this));
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], GamesService);
//# sourceMappingURL=games.service.js.map