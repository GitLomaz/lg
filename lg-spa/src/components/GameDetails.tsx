import React, { useEffect, useState } from 'react';
import { formatNumber, timestampToReadableDate } from '../utils/format';
import API_URL from '../config';
import { useGameState } from '../contexts/useGameState';
import HighScoresTab from './HighScoresTab';

type GameDetailsState = 'details' | 'achievements' | 'highscores';

const GameDetails: React.FC = () => {
  const { activeGame: game } = useGameState();
  const [panelState, setPanelState] = useState<GameDetailsState>('details');
  const hasAchievements = game?.achievements && game.achievements.length > 0;
  const [achievements, setAchievements] = useState<any[] | null>(null);
  const [achievementsLoading, setAchievementsLoading] = useState(false);
  const [achievementsError, setAchievementsError] = useState<string | null>(null);
  
  
  useEffect(() => {
    if (panelState !== 'achievements' || !hasAchievements || !game) return;
    if (achievements !== null) return;

    const fetchAchievements = async () => {
      setAchievementsLoading(true);
      setAchievementsError(null);
      try {
        const res = await fetch(`${API_URL}/games/id/${game.id}`, { credentials: 'include' });
        if (!res.ok) {
          throw new Error('Failed to load achievements');
        }
        const data = await res.json();
        setAchievements(data.achievements || []);
      } catch (err: any) {
        setAchievementsError(err.message || 'Error fetching achievements');
      } finally {
        setAchievementsLoading(false);
      }
    };

    fetchAchievements();
  }, [panelState, hasAchievements, game, achievements]);

  return (
    <div id="game-details" className='border-primary-875 border-4 border-l-0 p-4 text-left w-80'>
      <div className='flex gap-4 mb-4'>
        <div className={`cursor-pointer ${panelState === 'details' ? 'border-primary-800 border-b-4' : ''}`} onClick={() => setPanelState('details')}>Details</div>
        {game?.achievements && game?.achievements.length > 0 && (
          <div className={`cursor-pointer ${panelState === 'achievements' ? 'border-primary-800 border-b-4' : ''}`} onClick={() => setPanelState('achievements')}>Achievements</div>
        )}
        {game?.highscores && (
          <div className={`cursor-pointer ${panelState === 'highscores' ? 'border-primary-800 border-b-4' : ''}`} onClick={() => setPanelState('highscores')}>High Scores</div>
        )}
      </div>
      {panelState === 'details' && (
        <>
        <span className='bold'>Author: </span>{game?.author}<br />
        <span className='bold'>Date Published: </span>{timestampToReadableDate(game?.created_at)}<br />
        <span className='bold'>Total Plays: </span>{formatNumber(game?.plays)}<br />
        <span className='bold'>Total Favorites: </span>{formatNumber(game?.favorites)}<br />
        <span className='bold'>Average Rating: </span>{formatNumber(game?.ratings?.average, 2)}<br /><br />
        <span className='bold'>Description: <br/></span>{game?.translations?.[0]?.description ?? 'N/A'}<br /><br />
        <span className='bold'>Instructions: <br/></span>{game?.translations?.[0]?.instructions ?? 'N/A'}<br />
        </>
      )}
      {panelState === 'highscores' && (
        <HighScoresTab />
      )}
      {panelState === 'achievements' && (
        <div>
          {achievementsLoading && <div>Loading achievements...</div>}
          {achievementsError && <div className='text-red-500'>{achievementsError}</div>}
          {!achievementsLoading && !achievementsError && (
            <>
              {(achievements ?? game?.achievements ?? []).map((achievement: any) => (
                <div key={achievement.id}>
                  <span className='bold'>{achievement.difficulty}: </span>{achievement?.name}<br />
                  {achievement?.description ?? ''}<br />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GameDetails;