import React from 'react';
import './Header.css';
import { useUserState } from '../contexts/useUserState';

const Header: React.FC = () => {
  const { user, setUser } = useUserState()


  return (
    <div className='app-header'>
      <a href='/'>
        <h1>Lomaz Games</h1>
      </a>
    </div>
  );
};

export default Header;