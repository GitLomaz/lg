import { Controller, Get, Param, Post } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
  
    return this.gamesService.findGames({ genre });
  }

  @Get('popular')
  findPopular() {
    return this.gamesService.findGames({ sortByPlays: true });
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Get(':author/:gameString')
  findByAuthorAndId(@Param('author') author: string, @Param('gameString') gameString: string) {
    return this.gamesService.findByAuthorAndId(author, gameString);
  }

  @Post(':id/play')
  async play(@Param('id') id: string) {
    const playCountRow = await this.gamesService.getCurrentPlays(+id);
    if (playCountRow !== null) {
      await this.gamesService.updatePlays({ id: playCountRow.id, gameId: +id, count: playCountRow.count });
    } else {
      await this.gamesService.createPlays(+id);
    }
  }

  /*
  @Post()
  create(@Body() createGameDto: Prisma.gameCreateInput) {
    return this.gamesService.create(createGameDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: Prisma.gameUpdateInput) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
  */
}