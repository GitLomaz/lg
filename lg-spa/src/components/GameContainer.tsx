import React from 'react';
import './GameContainer.css';
import { Game } from '../types';

interface GameContainerProps {
  game: Game | null;
}


const GameContainer: React.FC<GameContainerProps> = ({ game }) => {
  return (
    <iframe src={game?.iframe} width={game?.width} height={game?.height}></iframe>
  );
};

export default GameContainer;