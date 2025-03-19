import React, { useState } from 'react';
import LeftMenu from './LeftMenu';
import GameCarousel from './GameCarousel';
import { Game } from '../types';
import { GameContext } from '../contexts/useGameState';
import GalleryRows from './GalleryRows';
import './Gallery.css';


const Gallery: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const gameTags = ['Popular', 'Action', 'Puzzle', 'Idle', 'Clicker', 'Arcade'];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    console.log(`Selected tag: ${tag}`);
  };

  return (
    <GameContext.Provider value={{selectedGame, setSelectedGame}} >
      <div className='flex-row'>
        <div className='leftMenu'>
          <LeftMenu tags={gameTags} onTagClick={handleTagClick} />
        </div>
        <div className='galleryContent'>
        <GameCarousel />
        <GalleryRows tags={gameTags}/>
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default Gallery;