import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className='app-header'>
      <a href='/'>
        <h1>Lomaz Games</h1>
      </a>
    </div>
  );
};

export default Header;