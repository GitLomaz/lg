import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import SPA_REACT_APP_API_URL from '../config';
import http from '../http'
import { useUserState } from '../contexts/useUserState';
import { useGameState } from '../contexts/useGameState';
import LoginModal from './modals/LoginModal';

const FavoriteButton: React.FC = () => {
  const [favorite, setfavorite] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserState()
  const { selectedGame, setSelectedGame } = useGameState()

  const toggleFavorite = async () => {
    if (user && selectedGame) {
      const newState = !favorite
      setfavorite(newState)
      setHovering(false)
      let URL = `${SPA_REACT_APP_API_URL}/favorites`
      try {
        const response = await http.post(URL, {
          favorite: newState,
          gameId: selectedGame?.id
        });
        setfavorite(response.data.data.favorite)
        setSelectedGame({ ...selectedGame, favorites: response.data.data.count })
      } catch (error: any) {
        if (error?.response?.status === 403) {
          setIsOpen(true)
        } else {
          setfavorite(!newState)
        }
      }
    } else {
      setIsOpen(true)
    }
  }

  const loadState = async () => {
    if (selectedGame?.id && user) {
      let URL = `${SPA_REACT_APP_API_URL}/favorites/${selectedGame.id}`
      try {
        const response = await http.get(URL);
        setfavorite(response.data.data.favorite)
      } catch (error: any) {
        if (error?.response?.status === 403) {
          setIsOpen(true)
        } else {
          setfavorite(false)
        }
      }
    }
  }

  useEffect(() => {
    loadState();
  }, [selectedGame?.id, user]);

  if (!selectedGame) {
    return null
  }

  return (
    <div className="flex-row p-3 cursor-pointer border-2 border-solid border-primary-875 rounded-sm w-32 items-center justify-center" 
      onClick={toggleFavorite}
      onMouseOver={() => {setHovering(true)}}
      onMouseLeave={() => {setHovering(false)}}
    >
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <Heart 
      className='flex-item-1' 
      fill={hovering ? "gray" : (favorite ? "currentColor" : "")}
      size={24}/>
      <div className='flex-item-1'>Favorite</div>
    </div>
  )
};

export default FavoriteButton;