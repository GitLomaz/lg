import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';

import { GamesService } from './games.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/LocalGuard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.gamesService.findByGenre(genre);
  }

  @Get('popular')
  findPopular() {
    return this.gamesService.findPopular();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  // @UseGuards(AuthenticatedGuard)
  // @Get('favorite/:id')
  // getFavorite(@Param('id') id: string, @Request() req: any) {
  //   const userId = req.user.id;
  //   return this.gamesService.findFavoriteByGame(parseInt(id), userId)
  // }

  // @UseGuards(AuthenticatedGuard)
  // @Post('favorite/:id')
  // setFavorite(@Param('id') id: string, @Request() req: any) {
  //   const userId = req.user.id;
  //   return this.gamesService.setFavoriteByGame(parseInt(id), userId)
  // }

  @Get(':author/:gameString')
  findByAuthorAndId(@Param('author') author: string, @Param('gameString') gameString: string) {
    return this.gamesService.findByAuthorAndId(author, gameString);
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
