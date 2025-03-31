import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/LocalGuard';
import { FavoritesService } from './favorites.service';
import { generateServerResponse } from '../common/responseCodes';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getFavorite(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    const favorite = await this.favoritesService.findFavoriteByGameAndUser(parseInt(id), userId);
    return generateServerResponse('SUCCESS', favorite !== null);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async setFavorite(@Body('gameId') gameId: number, @Request() req: any) {
    const userId = req.user.id;
    const existingFavorite = await this.favoritesService.findFavoriteByGameAndUser(gameId, userId);
    let added = true;
    if (existingFavorite) {
      await this.favoritesService.removeFavorite(gameId, userId);
      added = false;
    } else {
      await this.favoritesService.addFavorite(gameId, userId);
    }
    
    return generateServerResponse('SUCCESS', added);
  }
}