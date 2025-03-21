import React, { useState, useEffect } from 'react';
import { Game, GameRow } from '../types';
import Slider from 'react-slick';
import './GalleryRow.css';
import GalleryTile from './GalleryTile';
import REACT_APP_API_URL from "../config";
import axios from 'axios';
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
    // Fetch games based on selected tag
    let URL = `${REACT_APP_API_URL}/games/genre/${genre}`
    if (genre === 'Popular') {
      URL = `${REACT_APP_API_URL}/games/popular`
    }
    let games: GameRow[] = []
    try {
      const response = await axios.get(URL);
      games = response.data.map(function(game: Game) {
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
    <div className='gallery-row'>
      <div className='gallery-row-title'>{genre}</div>
      <div className='gallery-row-view-all'>View All</div>
      {<Slider {...settings}>
        {currentGames.map((game) => (
          <GalleryTile key={game.game_string} game={game} />
        ))}
      </Slider> }
    </div>
  );
};

export default GalleryRow;