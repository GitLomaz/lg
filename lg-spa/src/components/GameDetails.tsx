import React from 'react';
import './GameDetails.css';
import { Game } from '../types';
import { formatNumber, timestampToReadableDate } from '../utils/format';

interface GameDetailsProps {
  game: Game | null;
}


const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  console.log(game)
  return (
    <div id="game-details">
      <span className='bold'>Author: </span>{game?.author}<br />
      <span className='bold'>Date Published: </span>{timestampToReadableDate(game?.created_at)}<br />
      <span className='bold'>Total Plays: </span>{formatNumber(game?.plays)}<br />
      <span className='bold'>Total Favorites: </span>{formatNumber(game?.favorites)}<br />
      <span className='bold'>Average Rating: </span>{formatNumber(game?.ratings?.average, 2)}<br />
    </div>
  );
};

export default GameDetails;