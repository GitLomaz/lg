import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Game } from '../types';
import REACT_APP_API_URL from '../config';
import './GamePage.css';
import axios from 'axios';
import GameContainer from './GameContainer';


const GamePage: React.FC = () => {
  const { author, gameString } = useParams();
  const [game, setGameData] = useState<Game | null>(null);

  const loadGame = async () => {
    let URL = `${REACT_APP_API_URL}/games/${author}/${gameString}`
    try {
      const response = await axios.get(URL);
      setGameData(response.data)
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
    </Fragment>
  );
};

export default GamePage;