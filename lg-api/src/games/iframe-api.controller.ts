import { Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { IframeApiService } from './iframe-api.service';

interface VerifyRequest {
  apiKey: string;
  gameId: number;
}

interface SubmitAchievementRequest {
  achievementId: number;
  userId?: number;
}

@Controller('iframe-api')
export class IframeApiController {
  constructor(private readonly iframeApiService: IframeApiService) {}

  @Post('verify')
  async verify(@Body() body: VerifyRequest) {
    const isValid = await this.iframeApiService.verifyApiKey(body.apiKey, body.gameId);
    
    if (!isValid) {
      throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
    }

    return {
      success: true,
      message: 'API key verified',
      gameId: body.gameId
    };
  }

  @Post('achievement')
  async submitAchievement(
    @Headers('x-api-key') apiKey: string,
    @Body() body: SubmitAchievementRequest
  ) {
    if (!apiKey) {
      throw new HttpException('API key required', HttpStatus.UNAUTHORIZED);
    }

    // Verify API key
    const game = await this.iframeApiService.getGameByApiKey(apiKey);
    if (!game) {
      throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
    }

    // Verify achievement belongs to this game
    const achievement = await this.iframeApiService.getAchievement(body.achievementId);
    if (!achievement || achievement.game_id !== game.id) {
      throw new HttpException('Invalid achievement for this game', HttpStatus.BAD_REQUEST);
    }

    // Submit achievement (if userId provided and valid)
    if (body.userId) {
      const result = await this.iframeApiService.grantAchievement(body.userId, body.achievementId);
      return {
        success: true,
        message: 'Achievement granted',
        data: result
      };
    }

    return {
      success: true,
      message: 'Achievement validated',
      achievement: achievement
    };
  }

  @Post('stat')
  async submitStat(
    @Headers('x-api-key') apiKey: string,
    @Body() body: { statType: string; value: number; userId?: number }
  ) {
    if (!apiKey) {
      throw new HttpException('API key required', HttpStatus.UNAUTHORIZED);
    }

    const game = await this.iframeApiService.getGameByApiKey(apiKey);
    if (!game) {
      throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
    }

    // For now, just validate and return success
    // You can extend this to store stats in the database
    return {
      success: true,
      message: 'Stat recorded',
      gameId: game.id,
      stat: {
        type: body.statType,
        value: body.value,
        userId: body.userId
      }
    };
  }
}
