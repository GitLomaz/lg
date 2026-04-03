import React, { useState } from 'react';
import LeftMenu from './LeftMenu';
import GameCarousel from './GameCarousel';
import { Game } from '../types';
import { GameContext } from '../contexts/useGameState';
import GalleryRows from './GalleryRows';
import { Menu, X } from 'lucide-react';


const Gallery: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const gameTags = ['Popular', 'Action', 'Puzzle', 'Idle', 'Clicker', 'Arcade'];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setMobileMenuOpen(false); // Close menu on mobile after selection
  };

  return (
    <GameContext.Provider value={{selectedGame, setSelectedGame}} >
      <div className='flex flex-col md:flex-row'>
        {/* Mobile Menu Button */}
        <button 
          className='md:hidden fixed top-14 left-4 z-[100] bg-container-bg p-2 rounded-md text-white'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Left Menu - Hidden on mobile unless toggled */}
        <div className={`
          fixed md:static
          w-[230px] bg-background text-white p-2.5
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          top-0 left-0 h-full z-50
          md:block
        `}>
          <LeftMenu tags={gameTags} onTagClick={handleTagClick} />
        </div>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div 
            className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className='flex-1 bg-[#f4f4f4] overflow-auto'>
          <GameCarousel />
          <GalleryRows tags={gameTags}/>
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default Gallery;