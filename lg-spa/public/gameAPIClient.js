/**
 * Lomaz Games API Client
 * 
 * Include this script in your game to communicate with the Lomaz Games platform.
 * Works across different origins using postMessage.
 * 
 * Usage:
 * <script src="https://lomazgames.com/gameAPIClient.js"></script>
 * <script>
 *   const api = new LomazGamesAPI();
 *   await api.verify('your-api-key', yourGameId);
 *   await api.submitAchievement(achievementId);
 * </script>
 */

(function() {
  'use strict';

  class LomazGamesAPI {
    constructor() {
      this.apiKey = null;
      this.gameId = null;
      this.verified = false;
      this.userId = null;
      this.pendingRequests = new Map();
      this.requestCounter = 0;
      
      // Setup message listener
      window.addEventListener('message', this._handleMessage.bind(this));
    }

    /**
     * Handle messages from parent window
     */
    _handleMessage(event) {
      if (!event.data || event.data.type !== 'GAME_API_RESPONSE') {
        return;
      }

      const { requestId, success, data, error } = event.data;
      
      const pending = this.pendingRequests.get(requestId);
      if (!pending) {
        return;
      }

      this.pendingRequests.delete(requestId);

      if (success) {
        pending.resolve(data);
      } else {
        pending.reject(new Error(error || 'Unknown error'));
      }
    }

    /**
     * Send a request to parent window and wait for response
     */
    _sendRequest(type, payload, timeout = 30000) {
      return new Promise((resolve, reject) => {
        const requestId = `${Date.now()}_${this.requestCounter++}`;
        
        // Store resolve/reject for when response comes back
        this.pendingRequests.set(requestId, { resolve, reject });

        // Set timeout
        setTimeout(() => {
          if (this.pendingRequests.has(requestId)) {
            this.pendingRequests.delete(requestId);
            reject(new Error('Request timeout'));
          }
        }, timeout);

        // Send message to parent
        window.parent.postMessage({
          type,
          requestId,
          payload,
        }, '*'); // In production, specify exact origin
      });
    }

    /**
     * Verify API key - must be called first
     */
    async verify(apiKey, gameId) {
      try {
        const response = await this._sendRequest('GAME_API_VERIFY', {
          apiKey,
          gameId,
        });

        this.apiKey = apiKey;
        this.gameId = gameId;
        this.verified = true;

        // Get user ID
        await this._refreshUserId();

        return {
          success: true,
          data: response,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }

    /**
     * Check if API is verified
     */
    isVerified() {
      return this.verified;
    }

    /**
     * Get current game ID
     */
    getGameId() {
      return this.gameId;
    }

    /**
     * Get current user ID (null if not logged in)
     */
    getUserId() {
      return this.userId;
    }

    /**
     * Refresh user ID from parent
     */
    async _refreshUserId() {
      try {
        const response = await this._sendRequest('GAME_API_GET_USER_ID', {});
        this.userId = response.userId;
      } catch (error) {
        this.userId = null;
      }
    }

    /**
     * Submit an achievement
     */
    async submitAchievement(achievementId) {
      if (!this.verified) {
        return {
          success: false,
          error: 'API not verified. Call verify() first.',
        };
      }

      try {
        const response = await this._sendRequest('GAME_API_SUBMIT_ACHIEVEMENT', {
          apiKey: this.apiKey,
          achievementId,
        });

        return {
          success: true,
          alreadyEarned: response.data?.alreadyEarned,
          achievement: response.data?.achievement || response.achievement,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }

    /**
     * Submit a game statistic
     */
    async submitStat(statType, value) {
      if (!this.verified) {
        return {
          success: false,
          error: 'API not verified. Call verify() first.',
        };
      }

      try {
        await this._sendRequest('GAME_API_SUBMIT_STAT', {
          apiKey: this.apiKey,
          statType,
          value,
        });

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }

    /**
     * Get all achievements for this game
     */
    async getGameAchievements() {
      if (!this.verified) {
        return {
          success: false,
          error: 'API not verified. Call verify() first.',
        };
      }

      try {
        const response = await this._sendRequest('GAME_API_GET_ACHIEVEMENTS', {
          gameId: this.gameId,
        });

        return {
          success: true,
          achievements: response.achievements || [],
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }

    /**
     * Request user to login
     */
    requestLogin() {
      this._sendRequest('GAME_API_REQUEST_LOGIN', {
        gameId: this.gameId,
      }).catch(() => {
        // Ignore errors, this is fire-and-forget
      });
    }
  }

  // Expose globally
  window.LomazGamesAPI = LomazGamesAPI;

  // Also create a default instance for convenience
  if (typeof window.gameAPI === 'undefined') {
    window.gameAPI = new LomazGamesAPI();
  }
})();
