import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { Route, Routes } from 'react-router-dom';
import GamePage from './components/GamePage';

function App() {
  return (
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
  );
}

export default App;