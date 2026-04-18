/**
 * GameAPI - API for iframe games to interact with the platform
 * 
 * This class runs in the PARENT window and handles postMessage communication
 * from iframes. Games use the client-side SDK (gameAPIClient.js) to communicate.
 */

import SPA_REACT_APP_API_URL from './config';

export class GameAPI {
  private apiUrl: string;
  private pendingRequests: Map<string, {
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = new Map();

  constructor(apiUrl: string = SPA_REACT_APP_API_URL) {
    this.apiUrl = apiUrl;
    this.setupMessageListener();
  }

  /**
   * Setup listener for messages from iframe games
   */
  private setupMessageListener(): void {
    window.addEventListener('message', async (event) => {
      // TODO: Validate event.origin in production for security
      
      if (!event.data || !event.data.type || !event.data.type.startsWith('GAME_API_')) {
        return;
      }

      const { type, requestId, payload } = event.data;

      try {
        let response;

        switch (type) {
          case 'GAME_API_VERIFY':
            response = await this.handleVerify(payload);
            break;
          case 'GAME_API_SUBMIT_ACHIEVEMENT':
            response = await this.handleSubmitAchievement(payload);
            break;
          case 'GAME_API_SUBMIT_STAT':
            response = await this.handleSubmitStat(payload);
            break;
          case 'GAME_API_GET_ACHIEVEMENTS':
            response = await this.handleGetAchievements(payload);
            break;
          case 'GAME_API_GET_USER_ID':
            response = await this.handleGetUserId();
            break;
          case 'GAME_API_REQUEST_LOGIN':
            this.handleRequestLogin(payload);
            return; // No response needed
          default:
            throw new Error('Unknown API method');
        }

        // Send response back to iframe
        event.source?.postMessage({
          type: 'GAME_API_RESPONSE',
          requestId,
          success: true,
          data: response,
        }, event.origin as any);
      } catch (error: any) {
        // Send error back to iframe
        event.source?.postMessage({
          type: 'GAME_API_RESPONSE',
          requestId,
          success: false,
          error: error.message || 'Unknown error',
        }, event.origin as any);
      }
    });
  }

  /**
   * Handle verify request from iframe
   */
  private async handleVerify(payload: { apiKey: string; gameId: number }): Promise<any> {
    const { apiKey, gameId } = payload;


    const response = await fetch(`${this.apiUrl}/iframe-api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, gameId }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Verification failed' }));
      throw new Error(error.message || 'Invalid API key');
    }

    const data = await response.json();
    return data;
  }

  /**
   * Handle submit achievement request
   */
  private async handleSubmitAchievement(payload: { 
    apiKey: string; 
    achievementId: number;
  }): Promise<any> {
    const { apiKey, achievementId } = payload;

    // Get user ID from session
    const userId = await this.getCurrentUserId();

    const response = await fetch(`${this.apiUrl}/iframe-api/achievement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        achievementId,
        userId,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to submit achievement' }));
      throw new Error(error.message || 'Failed to submit achievement');
    }

    const data = await response.json();
    return data;
  }

  /**
   * Handle submit stat request
   */
  private async handleSubmitStat(payload: { 
    apiKey: string;
    statType: string; 
    value: number;
  }): Promise<any> {
    const { apiKey, statType, value } = payload;

    const userId = await this.getCurrentUserId();

    const response = await fetch(`${this.apiUrl}/iframe-api/stat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        statType,
        value,
        userId,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to submit stat' }));
      throw new Error(error.message || 'Failed to submit stat');
    }

    const data = await response.json();
    return data;
  }

  /**
   * Handle get achievements request
   */
  private async handleGetAchievements(payload: { gameId: number }): Promise<any> {
    const { gameId } = payload;

    const response = await fetch(`${this.apiUrl}/games/id/${gameId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch game achievements');
    }

    const data = await response.json();
    return { achievements: data.achievements || [] };
  }

  /**
   * Handle get user ID request
   */
  private async handleGetUserId(): Promise<any> {
    const userId = await this.getCurrentUserId();
    return { userId };
  }

  /**
   * Handle login request from iframe
   */
  private handleRequestLogin(payload: { gameId?: number }): void {
    // Dispatch custom event that GameContainer can listen to
    window.dispatchEvent(new CustomEvent('gameRequestLogin', {
      detail: payload
    }));
  }

  /**
   * Get current user ID from session
   */
  private async getCurrentUserId(): Promise<number | null> {
    try {
      const response = await fetch(`${this.apiUrl}/auth/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        return data.data?.id || null;
      }
    } catch (error) {
      // User not logged in
    }
    return null;
  }
}

// Create a global instance
const gameAPI = new GameAPI();

// Expose to window for debugging
declare global {
  interface Window {
    gameAPI: GameAPI;
  }
}

window.gameAPI = gameAPI;

export default gameAPI;
