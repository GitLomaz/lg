import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Game } from '../types';
import SPA_REACT_APP_API_URL from '../config';
import './GamePage.css';
import axios from '../axiosConfig'
import GameContainer from './GameContainer';
import FavoriteButton from './FavoriteButton';


const GamePage: React.FC = () => {
  const { author, gameString } = useParams();
  const [game, setGameData] = useState<Game | null>(null);

  const loadGame = async () => {
    let URL = `${SPA_REACT_APP_API_URL}/games/${author}/${gameString}`
    try {
      const response = await axios.get(URL);
      setGameData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  }

  useEffect(() => {
    loadGame();
  }, []); // Empty dependency array ensures this runs only once on mount
    
  return (
    <Fragment>
      <div className='game-container'>{game?.game_string}</div>
      <GameContainer game={game}/>
      <FavoriteButton gameId={game?.id}/>
    </Fragment>
  );
};

export default GamePage;