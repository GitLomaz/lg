import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { Route, Routes } from 'react-router-dom';
import GamePage from './components/GamePage';
import { UserContext } from './contexts/useUserState';
import { User } from './types';
import VerificationModal from './components/modals/VerificationModal';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
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