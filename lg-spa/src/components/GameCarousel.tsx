import React from 'react';
import Slider from 'react-slick';
import './GameCarousel.css';
import { useGameState } from '../contexts/useGameState';
import { Link } from 'react-router-dom';

 
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
        <Link to={`game/${selectedGame.author}/${selectedGame.game_string}`}>
          <div className="game-carousel-play-button">
            Play Now &nbsp;&nbsp;<span className="icon">▶️</span>
          </div>
        </Link>
        <Slider {...settings}>
          {selectedGame.screenshots.map((image: string, index: number) => (
            <div key={index}>
              <img src={image} alt={`Game ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div className='game-carousel-container'>
    <div className='game-carousel'>
      <Slider {...settings}>
        <div className='shimmer carousel-placeholder'></div>
      </Slider>
    </div>
  </div>
  );
};

export default GameCarousel;