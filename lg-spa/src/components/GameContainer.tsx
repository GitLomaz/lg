import React from 'react';
import { Game } from '../types';

interface GameContainerProps {
  game: Game | null;
}


const GameContainer: React.FC<GameContainerProps> = ({ game }) => {
  return (
    <iframe src={game?.iframe} width={game?.width} height={game?.height} className="border-4 border-[#31353d]"></iframe>
  );
};

export default GameContainer;