import { useEffect, useState } from 'react';
import { Heart, SettingsIcon } from 'lucide-react';
import SPA_REACT_APP_API_URL from '../config';
import http from '../fetchConfig'
import { useUserState } from '../contexts/useUserState';
import LoginModal from './modals/LoginModal';

// Define props interface
interface FavoriteButtonProps {
  gameId: number | undefined;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId }) => {
  const [favorite, setfavorite] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserState()

  const toggleFavorite = async () => {
    if (user) {
      const newState = !favorite
      setfavorite(newState)
      setHovering(false)
      let URL = `${SPA_REACT_APP_API_URL}/favorites`
      try {
        const response = await http.post(URL, {
          favorite: newState,
          gameId: gameId
        });
        if (response?.success) {
          setfavorite(response.data)
        } else {
          setfavorite(!newState)
        }
      } catch (error) {
        setfavorite(!newState)
      }
    } else {
      setIsOpen(true)
    }
  }

  const loadState = async () => {
    if (gameId && user) {
      let URL = `${SPA_REACT_APP_API_URL}/favorites/${gameId}`
      try {
        const response = await http.get(URL);
        setfavorite(response.data)
      } catch (error) {
        setfavorite(false)
      }
    }
  }

  useEffect(() => {
    loadState();
  }, [gameId]);

  return (
    <div className="border-2 border-[#31353d] rounded-sm cursor-pointer p-2 w-full sm:w-[125px] flex flex-row items-center justify-center gap-1" 
      onClick={toggleFavorite}
      onMouseOver={() => {setHovering(true)}}
      onMouseLeave={() => {setHovering(false)}}
    >
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <Heart 
      className='flex-shrink-0' 
      fill={hovering ? "gray" : (favorite ? "currentColor" : "")}
      size={20}/>
      <div className='text-sm md:text-base'>Favorite</div>
    </div>
  )
};

export default FavoriteButton;