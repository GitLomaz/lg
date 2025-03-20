import React, { useState } from 'react';
import './Header.css';
import Modal from './modals/LoginModal'
import { useUserState } from '../contexts/useUserState';

const Header: React.FC = () => {
  const { user, setUser } = useUserState()
  const [isOpen, setIsOpen] = useState(false);

  function promptLogin() {
    setIsOpen(true)
  }

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
      <div id='auth' className='flex-item-1' onClick={() => promptLogin()}>Log In</div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  );
};

export default Header;