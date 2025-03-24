import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import GamePage from './components/GamePage';
import { UserContext } from './contexts/useUserState';
import { User } from './types';
import VerificationModal from './components/modals/VerificationModal';

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.has("verify")) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  return (
    <UserContext.Provider value={{user, setUser}} >
      <VerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="app flex-column">
        <div className="header">
          <Header />
        </div>
        <div className="content">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/game/:author/:gameString" element={<GamePage />} />
        </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;