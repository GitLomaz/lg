import './GalleryTile.css';
import { GameRow } from '../types';
import { useGameState } from '../contexts/useGameState';

// Define props interface
interface GalleryTileProps {
  game: GameRow;
}

const GalleryTile: React.FC<GalleryTileProps> = ({ game }) => {
  const { selectedGame, setSelectedGame } = useGameState()

  function onTileClick(game: GameRow) {
    setSelectedGame(game)
  }

  return (
    <div
      className={`gallery-row-image-container ${selectedGame?.key === game.key ? 'selected-tile' : ''}`} 
      onClick={() => onTileClick(game)}
    >
      <img src={game.tile} alt={game.game_string} className='gallery-row-image' />
    </div>
  )
};

export default GalleryTile;