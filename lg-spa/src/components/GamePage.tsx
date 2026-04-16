import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Game } from '../types';
import SPA_REACT_APP_API_URL from '../config';
import './GamePage.css';
import http from '../http'
import GameContainer from './GameContainer';
import FavoriteButton from './FavoriteButton';
import RatingButton from './RatingButton';
import GameDetails from './GameDetails';


const GamePage: React.FC = () => {
  const { author, gameString } = useParams();
  const [game, setGameData] = useState<Game | null>(null);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<number | null>(null);

  const loadGame = async () => {
    let URL = `${SPA_REACT_APP_API_URL}/games/${author}/${gameString}`
    try {
      const response = await http.get(URL);
      setGameData(response.data)
      // clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        if (isMountedRef.current) {
          http.post(`${SPA_REACT_APP_API_URL}/games/${response.data.id}/play`)
        }
      }, 30000)
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  }

  useEffect(() => {
    isMountedRef.current = true;
    loadGame();
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
    
  return (
    <div className='game-page'>
      <div className='game-title'>{game?.translations[0].name}</div>
      <div className='flex-row game-box'>
        <div className='flex-column'>
          <div className='game-block flex-row'>
            <GameContainer game={game}/>
            <GameDetails game={game}/>
          </div>
          <div className='flex-row'>
            <FavoriteButton gameId={game?.id}/>
            <RatingButton gameId={game?.id} rating={game?.ratings.average}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;