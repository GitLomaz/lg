import React from 'react';
import { Game } from '../types';

interface GameContainerProps {
  game: Game | null;
}


const GameContainer: React.FC<GameContainerProps> = ({ game }) => {
  return (
    <div className="w-full md:w-auto overflow-hidden">
      <iframe 
        src={game?.iframe} 
        width={game?.width} 
        height={game?.height} 
        className="border-4 border-[#31353d] w-full md:w-auto max-w-full"
        style={{
          aspectRatio: game ? `${game.width} / ${game.height}` : undefined,
          maxHeight: '70vh'
        }}
      ></iframe>
    </div>
  );
};

export default GameContainer;