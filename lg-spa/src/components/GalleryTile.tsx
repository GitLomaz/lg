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
      className={`w-[250px] h-[200px] m-2 ${
        selectedGame?.key === game.key ? 'box-border border-2 border-border transition-all duration-300' : ''
      }`} 
      onClick={() => onTileClick(game)}
    >
      <img src={game.tile} alt={game.game_string} className='w-full h-full object-scale-down' />
    </div>
  )
};

export default GalleryTile;