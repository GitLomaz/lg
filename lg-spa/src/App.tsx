import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';

function App() {
  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="content">
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;