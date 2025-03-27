import { useEffect, useState } from 'react';
import './FavoriteButton.css';
import { Heart } from 'lucide-react';
import REACT_APP_API_URL from '../config';
import axios from '../axiosConfig'
import { useUserState } from '../contexts/useUserState';

// Define props interface
interface FavoriteButtonProps {
  gameId: number | undefined;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId }) => {
  const [favorite, setfavorite] = useState<boolean>(false);
    const { user } = useUserState()

  const toggleFavorite = async () => {
    if (user) {
      const newState = !favorite
      setfavorite(newState)
      let URL = `${REACT_APP_API_URL}/games/favorite/${gameId}`
      try {
        const response = await axios.post(URL, {favorite: newState});
        console.log(response.data.data)
      } catch (error) {
        setfavorite(!newState)
      }
    } else {
      // prompt login?
    }
  }

  const loadState = async () => {
    if (gameId && user) {
      let URL = `${REACT_APP_API_URL}/games/favorite/${gameId}`
      try {
        const response = await axios.get(URL);
        console.log(response.data.data)
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
    <div className="heart-border flex-row" onClick={toggleFavorite}>
      {favorite ? (
        <Heart className='flex-item-1' fill="currentColor" size={24}/>
      ) : (
        <Heart className='flex-item-1' size={24}/>
      )}
      <div className='flex-item-1'>Favorite</div>
    </div>
  )
};

export default FavoriteButton;