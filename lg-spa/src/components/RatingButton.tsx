import { useEffect, useState } from 'react';
import './RatingButton.css';
import { Star } from 'lucide-react';
import SPA_REACT_APP_API_URL from '../config';
import axios from '../axiosConfig'
import { useUserState } from '../contexts/useUserState';
import LoginModal from './modals/LoginModal';

interface RatingButtonProps {
  gameId: number | undefined,
  rating: number | undefined
}

const RatingButton: React.FC<RatingButtonProps> = ({ gameId, rating }) => {
  const [gameRating, setGameRating] = useState<number>(0);
  const [playerRating, setPlayerRating] = useState<number>(0);
  const [playerHovering, setPlayerHovering] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserState()

  const loadState = async () => {
    if (gameId && user) {
      let URL = `${SPA_REACT_APP_API_URL}/ratings/${gameId}`
      try {
        const response = await axios.get(URL);
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
        const response = await axios.post(URL, {
          value: rating,
          gameId: gameId
        });
        if (response?.data?.success) {
          setPlayerRating(response.data.data.rating)
          setGameRating(response.data.data.ave)
        } else {
          setPlayerRating(oldState)
        }
      } catch (error) {
        setPlayerRating(oldState)
      }
    } else {
      setIsOpen(true)
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
    setGameRating(rating || 0)
  }, [gameId]);

  return (
    <div className="rating-border flex-row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star 
          fill={playerHovering >= index + 1 ? "gray" : (playerRating >= index + 1 ? "currentColor" : "")}
          key={'star-' + (index + 1)} 
          id={'star-' + (index + 1)} 
          className='flex-item-1 star' 
          size={24} 
          onClick={() => {setStarRating(index + 1)}} 
          onMouseOver={() => {highlightStarRating(index + 1)}}
          onMouseLeave={unHighlight}/>
      ))}
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <div className='flex-item-1 rating-score'>Ave. {(Math.round(gameRating * 100) / 100).toFixed(2)}</div>
    </div>
  )
};

export default RatingButton;