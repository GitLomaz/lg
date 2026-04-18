import React, { useEffect, useState } from 'react';
import './GameContainer.css';
import { Game } from '../types';
import LoginModal from './modals/LoginModal';

interface GameContainerProps {
  game: Game | null;
}


const GameContainer: React.FC<GameContainerProps> = ({ game }) => {
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
      <iframe src={game?.iframe} width={game?.width} height={game?.height}></iframe>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default GameContainer;