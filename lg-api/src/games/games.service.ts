import { Injectable } from '@nestjs/common';
import { game_favorite } from '@prisma/client';
import { generateServerResponse } from 'src/common/responseCodes';
import { DatabaseService } from 'src/database/database.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private readonly databaseService: DatabaseService) {

  }

  /*

  REFRENCE:  https://www.youtube.com/watch?v=skQXoZ8chxk

  async create(createGameDto: Prisma.gameCreateInput) {
    return this.databaseService.game.create({data: createGameDto})
  }
    
  async update(id: number, updateGameDto: Prisma.gameUpdateInput) {
    return this.databaseService.game.update({
      where: {id},
      data: updateGameDto
    })  
  }

  async remove(id: number) {
    return this.databaseService.game.delete({
      where: {id}
    })
  }
  */

  async findByAuthorAndId(author: string, gameString: string) {
    const game = await this.databaseService.game.findFirst({
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
    })
    return this.transpose(game)
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
          { translations: { some: { language: "en" } } }, // Games that have English translations
          { translations: { none: {} } } // Games that have no translations at all
        ]
      }
    })
    this.transposeAll(games)
    return games
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
          { translations: { some: { language: "en" } } }, // Games that have English translations
          { translations: { none: {} } } // Games that have no translations at all
        ]
      }
    })
    this.transposeAll(games)
    games.sort(function(a, b) {
      return a.plays > b.plays ? -1 : 1
    })
    return games
  }

  async findByGenre(genre: string) {
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
          { translations: { some: { language: "en" } } }, // Games that have English translations
          { translations: { none: {} } } // Games that have no translations at all
        ],
        genre: { name: genre }
      }
    })
    this.transposeAll(games)
    return games
  }

  async findOne(id: number) {
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
    })
    return game
  }

  transpose(game) {
    game.genre = game.genre.name
    game.author = game.author.username
    game.tags = game.tags.map(tag => tag.name)
    game.tile = null
    game.screenshots = []
    game.assets.forEach(function(asset) {
      if (asset.type === 'ss') {
        game.screenshots.push(asset.path)
      } else if (asset.type === 'tile') {
        game.tile = asset.path
      }
    });
    delete game.assets
    game.plays = game.plays.reduce(function(sum, day) {
      return sum + day.count
    }, 0)
    game.ratings = {
      1: game.ratings.reduce(function(sum, rating) {
        return sum + (rating.value === 1 ? 1 : 0)
      }, 0), 
      2: game.ratings.reduce(function(sum, rating) {
        return sum + (rating.value === 2 ? 1 : 0)
      }, 0), 
      3: game.ratings.reduce(function(sum, rating) {
        return sum + (rating.value === 3 ? 1 : 0)
      }, 0), 
      4: game.ratings.reduce(function(sum, rating) {
        return sum + (rating.value === 4 ? 1 : 0)
      }, 0), 
      5: game.ratings.reduce(function(sum, rating) {
        return sum + (rating.value === 5 ? 1 : 0)
      }, 0),
      average: game.ratings.reduce(function(sum, rating) {
        return sum + rating.value
      }, 0) / game.ratings.length,
    }
    game.favorites = game.favorites.length
    return game
  }

  transposeAll(games: any[]) {
    return games.map(this.transpose.bind(this));
  }
}
