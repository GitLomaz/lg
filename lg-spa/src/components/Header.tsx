import React from 'react';
import './Header.css';
import { useUserState } from '../contexts/useUserState';

const Header: React.FC = () => {
  const { user, setUser } = useUserState()

  return (
    // Add 3 flexboxes here
    <div className='app-header flex-row'>
      <div id='auth' className='flex-item-1'>
        <div id='logo'></div>
      </div>
      <div id='header-home' className='flex-item-1'>
        <a href='/'>
          <h1>Lomaz Games</h1>
        </a>
      </div>
      <div id='auth' className='flex-item-1'>Log In</div>
    </div>
  );
};

export default Header;