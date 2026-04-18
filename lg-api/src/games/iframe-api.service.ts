import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IframeApiService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Verify that an API key is valid for a specific game
   * For now, we'll use a simple scheme: API key = `game-${gameId}-${secret}`
   * In production, you'd want to store these in the database
   */
  async verifyApiKey(apiKey: string, gameId: number): Promise<boolean> {
    try {
      // Check if game exists
      const game = await this.databaseService.game.findUnique({
        where: { id: gameId }
      });

      if (!game) {
        return false;
      }

      // For now, accept any API key format that includes the game ID
      // TODO: Implement proper API key storage and validation
      return apiKey.includes(`game-${gameId}`);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get game by API key
   */
  async getGameByApiKey(apiKey: string) {
    try {
      // Extract game ID from API key (format: game-{id}-{secret})
      const match = apiKey.match(/game-(\d+)-/);
      if (!match) {
        return null;
      }

      const gameId = parseInt(match[1]);
      return await this.databaseService.game.findUnique({
        where: { id: gameId },
        include: {
          achievements: true
        }
      });
    } catch (error) {
      return null;
    }
  }

  /**
   * Get achievement by ID
   */
  async getAchievement(achievementId: number) {
    try {
      return await this.databaseService.achievement.findUnique({
        where: { id: achievementId },
        include: {
          translations: true
        }
      });
    } catch (error) {
      return null;
    }
  }

  /**
   * Grant an achievement to a user
   */
  async grantAchievement(userId: number, achievementId: number) {
    try {
      // Check if user already has this achievement
      const user = await this.databaseService.user.findUnique({
        where: { id: userId },
        include: {
          achievements: {
            where: { id: achievementId }
          }
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // If user already has achievement, return it
      if (user.achievements.length > 0) {
        return {
          alreadyEarned: true,
          achievement: user.achievements[0]
        };
      }

      // Grant the achievement
      await this.databaseService.user.update({
        where: { id: userId },
        data: {
          achievements: {
            connect: { id: achievementId }
          }
        }
      });

      const achievement = await this.getAchievement(achievementId);

      return {
        alreadyEarned: false,
        achievement: achievement
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all achievements for a user in a specific game
   */
  async getUserGameAchievements(userId: number, gameId: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id: userId },
        include: {
          achievements: {
            where: {
              game_id: gameId
            },
            include: {
              translations: true
            }
          }
        }
      });

      return user?.achievements || [];
    } catch (error) {
      return [];
    }
  }
}
