import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import SPA_REACT_APP_API_URL from '../config';
import http from '../http'
import { useUserState } from '../contexts/useUserState';
import LoginModal from './modals/LoginModal';
import { useGameState } from '../contexts/useGameState';

const RatingButton: React.FC = () => {
  const [playerRating, setPlayerRating] = useState<number>(0);
  const [playerHovering, setPlayerHovering] = useState<number>(0);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const { user } = useUserState()
  const { activeGame, setActiveGame } = useGameState();

  const loadState = async () => {
    if (activeGame?.id && user) {
      let URL = `${SPA_REACT_APP_API_URL}/ratings/${activeGame.id}`
      try {
        const response = await http.get(URL);
        setPlayerRating(response.data.data)
      } catch (error) {
        setPlayerRating(0)
      }
    }
  }

  const setStarRating = async (rating: number) => {
    if (user) {
      const oldState = playerRating
      setPlayerHovering(0)
      setPlayerRating(rating)
      if (rating === playerRating) {
        return
      }
      let URL = `${SPA_REACT_APP_API_URL}/ratings`
      try {
        const response = await http.post(URL, {
          value: rating,
          gameId: activeGame?.id
        });
        if (response?.data?.success && activeGame) {
          setPlayerRating(response.data.data.rating)
          setActiveGame({ ...activeGame, ratings: { ...activeGame.ratings, average: response.data.data.ave } })
        } else {
          setPlayerRating(oldState)
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          setLoginPrompt(true)
        } else {
          setPlayerRating(oldState)
        }
      }
    } else {
      setLoginPrompt(true)
    }
  }

  const highlightStarRating = (rating: number) => {
    setPlayerHovering(rating)
  }

  const unHighlight = () => {
    setPlayerHovering(0)
  }

  useEffect(() => {
    loadState();
  }, [activeGame?.id]);

  if (!activeGame) {
    return null
  }

  return (
    <div className="flex-row p-3 border-2 border-solid border-primary-875 rounded-sm w-64 items-center justify-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star 
          fill={playerHovering >= index + 1 ? "gray" : (playerRating >= index + 1 ? "currentColor" : "")}
          key={'star-' + (index + 1)} 
          id={'star-' + (index + 1)} 
          className='flex-item-1 cursor-pointer' 
          size={24} 
          onClick={() => {setStarRating(index + 1)}} 
          onMouseOver={() => {highlightStarRating(index + 1)}}
          onMouseLeave={unHighlight}/>
      ))}
      <LoginModal isOpen={loginPrompt} onClose={() => setLoginPrompt(false)}></LoginModal>
      <div className='flex-item-1 rating-score'>Ave. {(Math.round(activeGame?.ratings?.average * 100) / 100).toFixed(2)}</div>
    </div>
  )
};

export default RatingButton;