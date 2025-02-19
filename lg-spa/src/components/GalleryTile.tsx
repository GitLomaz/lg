import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, setSelectedGame, RootState } from '../store';
import './GalleryTile.css';
import { GameRow } from '../types';

// Define props interface
interface GalleryTileProps {
  game: GameRow;
}

const GalleryTile: React.FC<GalleryTileProps> = ({ game }) => {
  const dispatch: AppDispatch = useDispatch()
  const selectedGame = useSelector((state: RootState) => state.selectedGame.game);

  function onTileClick(game: GameRow) {
    dispatch(setSelectedGame(game));
    console.log(game.key)
  }

  return (
    <div
      key={game.game_string} 
      className={`gallery-row-image-container ${selectedGame?.key === game.key ? 'selected-tile' : ''}`} 
      onClick={() => onTileClick(game)
    }>
      <img src={game.tile} alt={game.game_string} className='gallery-row-image' />
    </div>
  )
};

export default GalleryTile;