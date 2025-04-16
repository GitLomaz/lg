import React from 'react';
import './GameDetails.css';
import { Game } from '../types';

interface GameDetailsProps {
  game: Game | null;
}


const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  return (
    <div id="game-details">
      <span className='bold'>Author: </span>Lomaz<br/>
      <span className='bold'>Date Published: </span>10/12/2024<br/>
      <span className='bold'>Total Plays: </span>123<br/>
      <span className='bold'>Total Favorites: </span>2<br/>
      <span className='bold'>Average Rating: </span>3.63<br/>
    </div>
  );
};

export default GameDetails;