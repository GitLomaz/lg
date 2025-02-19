import React, { Fragment, useState, useEffect } from 'react';
import LeftMenu from './LeftMenu';
import GameCarousel from './GameCarousel';
import { Game } from '../types';
import GalleryRows from './GalleryRows';


const Gallery: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const gameTags = ['Popular', 'Action', 'Puzzle', 'Idle', 'Clicker', 'Arcade'];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    console.log(`Selected tag: ${tag}`);
  };

  return (
    <Fragment>
      <LeftMenu tags={gameTags} onTagClick={handleTagClick} />
      <GameCarousel />
      <GalleryRows tags={gameTags}/>
    </Fragment>
  );
};

export default Gallery;