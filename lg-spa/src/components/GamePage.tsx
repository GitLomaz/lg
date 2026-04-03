import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Game } from '../types';
import SPA_REACT_APP_API_URL from '../config';
import http from '../fetchConfig'
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
      const data = await http.get(URL);
      setGameData(data)
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
    <div className='px-2 md:px-5 mx-0 md:mx-5 text-center'>
      <div className='text-center p-2.5 text-2xl md:text-[40px] font-bold'>{game?.translations[0].name}</div>
      <div className='flex flex-col md:flex-row justify-center items-center'>
        <div className='flex flex-col w-full md:w-auto'>
          <div className='w-full md:w-max flex flex-col md:flex-row'>
            <GameContainer game={game}/>
            <GameDetails game={game}/>
          </div>
          <div className='flex flex-col sm:flex-row gap-2 mt-2'>
            <FavoriteButton gameId={game?.id}/>
            <RatingButton gameId={game?.id} rating={game?.ratings.average}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;