import React from 'react';
import { Game } from '../types';

interface GameDetailsProps {
  game: Game | null;
}


const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  console.log(game)
  return (
    <div className="border-4 md:border-l-0 border-[#31353d] p-2.5 w-full md:w-[300px] text-left text-xs sm:text-sm">
      <span className='font-bold'>Author: </span>{game?.author}<br />
      <span className='font-bold'>Date Published: </span>{game?.plays}<br />
      <span className='font-bold'>Total Plays: </span>{game?.plays}<br />
      <span className='font-bold'>Total Favorites: </span>2<br />
      <span className='font-bold'>Average Rating: </span>3.63<br />
    </div>
  );
};

export default GameDetails;