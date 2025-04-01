import { useEffect, useState } from 'react';
import './FavoriteButton.css';
import { Heart } from 'lucide-react';
import SPA_REACT_APP_API_URL from '../config';
import axios from '../axiosConfig'
import { useUserState } from '../contexts/useUserState';

// Define props interface
interface FavoriteButtonProps {
  gameId: number | undefined;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId }) => {
  const [favorite, setfavorite] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const { user } = useUserState()

  const toggleFavorite = async () => {
    if (user) {
      const newState = !favorite
      setfavorite(newState)
      setHovering(false)
      let URL = `${SPA_REACT_APP_API_URL}/favorites`
      try {
        const response = await axios.post(URL, {
          favorite: newState,
          gameId: gameId
        });
        if (response?.data?.success) {
          setfavorite(response.data.data)
        } else {
          setfavorite(!newState)
        }
      } catch (error) {
        setfavorite(!newState)
      }
    } else {
      // prompt login?
    }
  }

  const loadState = async () => {
    if (gameId && user) {
      let URL = `${SPA_REACT_APP_API_URL}/favorites/${gameId}`
      try {
        const response = await axios.get(URL);
        setfavorite(response.data.data)
      } catch (error) {
        setfavorite(false)
      }
    }
  }

  useEffect(() => {
    loadState();
  }, [gameId]);

  return (
    <div className="heart-border flex-row" 
      onClick={toggleFavorite}
      onMouseOver={() => {setHovering(true)}}
      onMouseLeave={() => {setHovering(false)}}
    >
      <Heart 
      className='flex-item-1' 
      fill={hovering ? "gray" : (favorite ? "currentColor" : "")}
      size={24}/>
      <div className='flex-item-1'>Favorite</div>
    </div>
  )
};

export default FavoriteButton;