import React, { useState } from 'react';
import LeftMenu from './LeftMenu';
import GameCarousel from './GameCarousel';
import { Game } from '../types';
import { GameContext } from '../contexts/useGameState';
import GalleryRows from './GalleryRows';


const Gallery: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const gameTags = ['Popular', 'Action', 'Puzzle', 'Idle', 'Clicker', 'Arcade'];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <GameContext.Provider value={{selectedGame, setSelectedGame}} >
      <div className='flex flex-row'>
        <div className='w-[230px] bg-background text-white p-2.5'>
          <LeftMenu tags={gameTags} onTagClick={handleTagClick} />
        </div>
        <div className='flex-1 bg-[#f4f4f4] overflow-auto'>
          <GameCarousel />
          <GalleryRows tags={gameTags}/>
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default Gallery;