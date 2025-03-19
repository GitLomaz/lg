import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { Route, Routes } from 'react-router-dom';
import GamePage from './components/GamePage';
import { UserContext } from './contexts/useUserState';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={{user, setUser}} >
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