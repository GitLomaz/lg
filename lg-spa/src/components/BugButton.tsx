import { useState } from 'react';
import { Bug } from 'lucide-react';
import SPA_REACT_APP_API_URL from '../config';
import http from '../http'
import { useGameState } from '../contexts/useGameState';

const BugButton: React.FC = () => {
  const [playerHovering, setPlayerHovering] = useState<boolean>(false);
  const { activeGame } = useGameState();

  const highlight = () => {
    setPlayerHovering(true)
  }

  const unHighlight = () => {
    setPlayerHovering(false)
  }

  const sendBugReport = async () => {
    if (activeGame) {
      let URL = `${SPA_REACT_APP_API_URL}/bug-reports`
      try {
        const response = await http.post(URL, {
          gameId: activeGame?.id
        });
        console.log(response)
      } catch (error: any) {
        console.log(error)
      }
    }
  }

  if (!activeGame) {
    return null
  }

  return (
    <div className="flex-row p-3 border-2 border-solid border-primary-875 rounded-sm w-40 items-center justify-center cursor-pointer"
      onClick={sendBugReport} 
      onMouseOver={highlight}
      onMouseLeave={unHighlight}>
      <Bug 
        fill={playerHovering ? "gray" : ""}
        id={'bugReport'} 
        className='flex-item-1' 
        size={24}/>
      <div className='flex-item-1 rating-score'>Report a bug</div>
    </div>
  )
};

export default BugButton;