import React, { useEffect, useState } from 'react';
import LoginModal from './modals/LoginModal';
import { useGameState } from '../contexts/useGameState';

const GameContainer: React.FC = () => {
  const { activeGame: game } = useGameState();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Listen for login requests from games (via custom event)
    const handleLoginRequest = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Game requested login', customEvent.detail);
      setShowLoginModal(true);
    };

    window.addEventListener('gameRequestLogin', handleLoginRequest);

    return () => {
      window.removeEventListener('gameRequestLogin', handleLoginRequest);
    };
  }, []);

  return (
    <>
      <iframe 
        src={game?.iframe} 
        width={game?.width} 
        height={game?.height}
        title={game?.translations?.[0]?.name || 'Game'}
        className={"border-primary-875 border-4"}
      ></iframe>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default GameContainer;