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
    <div className='relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden bg-background'>
      <div className='game-carousel'>
        <div className='absolute top-3 sm:top-5 md:top-[30px] left-2 sm:left-4 md:left-5 text-lg sm:text-2xl md:text-[32px] font-bold text-white bg-black/60 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded z-10 max-w-[calc(100%-4rem)]'>
          {selectedGame.translations[0].name}
        </div>
        <div className='absolute top-10 sm:top-14 md:top-[76px] left-2 sm:left-4 md:left-5 text-xs sm:text-sm md:text-base text-white bg-black/60 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded z-10 max-w-[calc(100%-4rem)] line-clamp-2'>
          {selectedGame.translations[0].description}
        </div>
        <div className='absolute top-[70px] sm:top-[90px] md:top-[115px] left-2 sm:left-4 md:left-5 z-10 max-w-[calc(100%-4rem)] flex flex-wrap'>
          <span className='inline-block text-xs sm:text-sm md:text-base font-bold text-white bg-black/60 px-1.5 sm:px-2 md:px-2.5 py-1 rounded m-0.5 sm:m-1'>
            {selectedGame.genre}
          </span>
          {selectedGame.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className='inline-block text-xs sm:text-sm text-white bg-black/60 px-1.5 sm:px-2 md:px-2.5 py-1 rounded m-0.5 sm:m-1'>
              {tag}
            </span>
          ))}
        </div>
        <div className='absolute bottom-3 sm:bottom-4 md:bottom-5 right-2 sm:right-4 md:right-5 text-xs sm:text-sm md:text-base font-bold text-white bg-black/60 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded z-10'>
          {selectedGame.plays} Play{selectedGame.plays === 1 ? '' : 's'}<span className="hidden sm:inline">, &nbsp;
          {selectedGame.favorites} Favorite{selectedGame.favorites === 1 ? '' : 's'}</span>
        </div>
        <Link to={`game/${selectedGame.author}/${selectedGame.game_string}`}>
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-2 sm:left-4 md:left-5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-black/60 text-white text-sm sm:text-base md:text-lg font-bold rounded cursor-pointer flex items-center justify-center z-20 transition-colors duration-300 hover:bg-black/80">
            Play<span className="hidden sm:inline"> Now</span> &nbsp;<span>▶️</span>
          </div>
        </Link>
        <Slider {...settings}>
          {selectedGame.screenshots.map((image: string, index: number) => (
            <div key={index}>
              <img src={image} alt={`Game ${index + 1}`} className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div className='relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden bg-background'>
      <div className='game-carousel'>
        <Slider {...settings}>
          <div className='shimmer h-[200px] sm:h-[250px] md:h-[300px]'></div>
        </Slider>
      </div>
    </div>
  );
};

export default GameCarousel;