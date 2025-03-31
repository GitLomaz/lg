import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/LocalGuard';
import { RatingsService } from './ratings.service';
import { generateServerResponse } from '../common/responseCodes';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getFavorite(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    const rating = await this.ratingsService.findRatingByGameAndUser(parseInt(id), userId);
    return generateServerResponse('SUCCESS', rating ? rating.value : false);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async setFavorite(@Body('gameId') gameId: number, @Body('value') value: number, @Request() req: any) {
    if (![1,2,3,4,5].includes(value)) {
      return generateServerResponse('INVALID_REQUEST');
    }
    const userId = req.user.id;
    const rating = await this.ratingsService.setRatingForGameAndUser(gameId, userId, value);
    return generateServerResponse('SUCCESS', rating.value);
  }
}