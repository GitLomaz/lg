import React from 'react';
import Slider from 'react-slick';
import './GameCarousel.css';
import { useGameState } from '../contexts/useGameState';
import { Link } from 'react-router-dom';

 
const GameCarousel: React.FC = () => {

  const { activeGame } = useGameState()

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

  return activeGame ? (
    <div className='game-carousel-container'>
      <div className='game-carousel'>
        <div className='game-carousel-title'>{activeGame.translations[0].name}</div>
        <div className='game-carousel-description'>{activeGame.translations[0].description}</div>
        <div className='game-carousel-tags'>
          <span className='game-genre'>{activeGame.genre}</span>
          {activeGame.tags.map((tag: string) => (
            <span key={tag} className='game-tag'>{tag}</span>
          ))}
        </div>
        <div className='game-carousel-stats'>
          {activeGame.plays} Play{activeGame.plays === 1 ? '' : 's'}, &nbsp;
          {activeGame.favorites} Favorite{activeGame.favorites === 1 ? '' : 's'}
        </div>
        <Link to={`game/${activeGame.author}/${activeGame.game_string}`}>
          <div className="game-carousel-play-button">
            Play Now &nbsp;&nbsp;<span className="icon">▶️</span>
          </div>
        </Link>
        <Slider {...settings}>
          {activeGame.screenshots.map((image: string, index: number) => (
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