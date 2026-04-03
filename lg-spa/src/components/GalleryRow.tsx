import React, { useState, useEffect } from 'react';
import { Game, GameRow } from '../types';
import Slider from 'react-slick';
import GalleryTile from './GalleryTile';
import SPA_REACT_APP_API_URL from "../config";
import http from '../fetchConfig'
import { useGameState } from '../contexts/useGameState';

// Define props interface
interface GalleryRowProps {
  genre: string;
}

const GalleryRow: React.FC<GalleryRowProps> = ({ genre }) => {
  const [currentGames, setCurrentGames] = useState<Game[]>([]); // State for carousel games
  const { setSelectedGame } = useGameState()

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    variableWidth: true,
    touchThreshold: 100,
    swipe: true,
    draggable: true
  };

  const loadGames = async () => {
    let URL = `${SPA_REACT_APP_API_URL}/games/genre/${genre}`
    if (genre === 'Popular') {
      URL = `${SPA_REACT_APP_API_URL}/games/popular`
    }
    let games: GameRow[] = []
    try {
      const data = await http.get(URL);
      games = data.map(function(game: Game) {
        return {
          ...game,
          key: game.game_string + '_' + genre.toLowerCase()
        }
      })
      setCurrentGames(games);
      if (genre === 'Popular') {
        setSelectedGame(games[0])
      }
    } catch (error) {
      console.error('Failed to fetch games:', error);
      setCurrentGames([]);
    }
  }

  useEffect(() => {
    loadGames();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className='relative h-56 overflow-hidden bg-background text-white p-2.5'>
      <div className='uppercase float-left text-xl'>{genre}</div>
      <div className='float-right text-lg'>View All</div>
      {currentGames.length !== 0 ? (
        <Slider {...settings} className="inline-grid clear-both">
          {currentGames.map((game) => (
            <GalleryTile key={game.game_string} game={game} />
          ))}
        </Slider> 
      ) : (
        <Slider {...settings} className="inline-grid clear-both">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='shimmer w-[250px] h-[200px] m-2'></div>
          ))}
        </Slider> 
      )}
    </div>
  );
};

export default GalleryRow;