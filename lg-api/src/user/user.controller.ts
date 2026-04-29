import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService
  ) {}

  @Get('profile')
  async profile(@Req() req: Request) {
    if (req.isAuthenticated && req.isAuthenticated() && req.user) {
      return {
        success: true,
        data: this.userService.sanitizeUser(req.user)
      };
    }
    return {
      success: false,
      message: 'Not authenticated'
    };
  }

  @Get('achievements')
  async achievements(@Req() req: Request) {
    if (!(req.isAuthenticated && req.isAuthenticated() && req.user)) {
      return { success: false, message: 'Not authenticated' };
    }

    const userId = (req.user as any).id;
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: {
        achievements: {
          include: {
            translations: true
          }
        }
      }
    });

    return {
      success: true,
      achievements: user?.achievements || []
    };
  }

  @Get('achievements/:gameid')
  async achievementsForGame(@Req() req: Request, @Param('gameid') gameid: string) {
    if (!(req.isAuthenticated && req.isAuthenticated() && req.user)) {
      return { success: false, message: 'Not authenticated' };
    }

    const userId = (req.user as any).id;
    const gameId = parseInt(gameid);
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: {
        achievements: {
          where: { game_id: gameId },
          include: { translations: true }
        }
      }
    });

    return {
      success: true,
      achievements: user?.achievements || []
    };
  }
}
