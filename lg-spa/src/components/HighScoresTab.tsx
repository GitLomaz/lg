import React, { useEffect, useState } from 'react';
import { formatNumber } from '../utils/format';
import { SCORES_API_URL } from '../config';
import { useGameState } from '../contexts/useGameState';

const HighScoresTab: React.FC = () => {
  const { activeGame: game } = useGameState();
  const [highScores, setHighScores] = useState<any[] | null>(null);
  
  
  useEffect(() => {
    console.log(SCORES_API_URL, "scores API URL")
    const fetchHighScores = async () => {
      try {
        const res = await fetch(`${SCORES_API_URL}?count=20&game=${game?.game_string}`);
        if (!res.ok) {
          throw new Error('Failed to load high scores');
        }
        const data = await res.json();
        setHighScores(data.scores || []);
      } catch (err: any) {
        console.error('Error fetching high scores:', err);
      }
    };
    fetchHighScores();
  }, [game]);

  return (
    <div id="high-scores" className='text-left'>
      {highScores && highScores.length > 0 ? (
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th className='border-b-2 border-primary-875'>Rank</th>
              <th className='border-b-2 border-primary-875'>Player</th>
              <th className='border-b-2 border-primary-875'>Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr key={index} className='border-b border-primary-875'>
                <td className='py-1'>{index + 1}</td>
                <td className='py-1'>{score.name}</td>
                <td className='py-1'>{formatNumber(score.score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading High Scores...</div>
      )}
    </div>  
  );
};

export default HighScoresTab;