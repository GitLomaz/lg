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
    <div className='relative h-[300px] overflow-hidden bg-background'>
      <div className='game-carousel'>
        <div className='absolute top-[30px] left-5 text-[32px] font-bold text-white bg-black/60 px-2.5 py-1.5 rounded z-10'>
          {selectedGame.translations[0].name}
        </div>
        <div className='absolute top-[76px] left-5 text-base text-white bg-black/60 px-2.5 py-1.5 rounded z-10'>
          {selectedGame.translations[0].description}
        </div>
        <div className='absolute top-[115px] left-5 z-10'>
          <span className='inline-block text-base font-bold text-white bg-black/60 px-2.5 py-1.5 rounded m-1'>
            {selectedGame.genre}
          </span>
          {selectedGame.tags.map((tag: string) => (
            <span key={tag} className='inline-block text-sm text-white bg-black/60 px-2.5 py-1.5 rounded m-1'>
              {tag}
            </span>
          ))}
        </div>
        <div className='absolute bottom-5 right-5 text-base font-bold text-white bg-black/60 px-2.5 py-1.5 rounded z-10'>
          {selectedGame.plays} Play{selectedGame.plays === 1 ? '' : 's'}, &nbsp;
          {selectedGame.favorites} Favorite{selectedGame.favorites === 1 ? '' : 's'}
        </div>
        <Link to={`game/${selectedGame.author}/${selectedGame.game_string}`}>
          <div className="absolute bottom-5 left-5 px-5 py-2.5 bg-black/60 text-white text-lg font-bold rounded cursor-pointer flex items-center justify-center z-20 transition-colors duration-300 hover:bg-black/80">
            Play Now &nbsp;&nbsp;<span>▶️</span>
          </div>
        </Link>
        <Slider {...settings}>
          {selectedGame.screenshots.map((image: string, index: number) => (
            <div key={index}>
              <img src={image} alt={`Game ${index + 1}`} className="w-full h-[300px] object-cover" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div className='relative h-[300px] overflow-hidden bg-background'>
      <div className='game-carousel'>
        <Slider {...settings}>
          <div className='shimmer h-[300px]'></div>
        </Slider>
      </div>
    </div>
  );
};

export default GameCarousel;