import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Game } from '../types';
import SPA_REACT_APP_API_URL from '../config';
import './GamePage.css';
import axios from '../axiosConfig'
import GameContainer from './GameContainer';
import FavoriteButton from './FavoriteButton';
import RatingButton from './RatingButton';
import GameDetails from './GameDetails';


const GamePage: React.FC = () => {
  const { author, gameString } = useParams();
  const [game, setGameData] = useState<Game | null>(null);

  const loadGame = async () => {
    let URL = `${SPA_REACT_APP_API_URL}/games/${author}/${gameString}`
    try {
      const response = await axios.get(URL);
      setGameData(response.data)
      setTimeout(() => {
        console.log('DING?!')
      }, 30000)
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  }

  useEffect(() => {
    loadGame();
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