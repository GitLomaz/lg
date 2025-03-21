import React, {useEffect} from 'react';
import Slider from 'react-slick';
import './GameCarousel.css';
import { useGameState } from '../contexts/useGameState';

 
const GameCarousel: React.FC = () => {

  const { selectedGame } = useGameState()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
  };

  //const selectedGame = useSelector((state: RootState) => state.selectedGame.game);

  // useEffect(() => {
  //   if (selectedGame) {
  //     console.log("Selected Game has changed:", selectedGame);
  //   } else {
  //     console.log("No game selected");
  //   }
  // }, [selectedGame]); // The effect will run when selectedGame changes

  return selectedGame ? (
    <div className='game-carousel-container'>
      <div className='game-carousel'>
        <div className='game-carousel-title'>{selectedGame.translations[0].name}</div>
        <div className='game-carousel-description'>{selectedGame.translations[0].description}</div>
        <div className='game-carousel-tags'>
          <span className='game-genre'>{selectedGame.genre}</span>
          {selectedGame.tags.map((tag: string) => (
            <span key={tag} className='game-tag'>{tag}</span>
          ))}
        </div>
        <div className='game-carousel-stats'>
          {selectedGame.plays} Play{selectedGame.plays === 1 ? '' : 's'}, &nbsp;
          {selectedGame.favorites} Favorite{selectedGame.favorites === 1 ? '' : 's'}
        </div>
        <a href={`game/${selectedGame.author}/${selectedGame.game_string}`}><div className="game-carousel-play-button">Play Now &nbsp;&nbsp;<span className="icon">▶️</span></div></a>
        <Slider {...settings}>
          {selectedGame.screenshots.map((image: string, index: number) => (
            <div key={index}>
              <img src={image} alt={`Game ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : null;
};

export default GameCarousel;