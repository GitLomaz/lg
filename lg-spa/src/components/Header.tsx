import React, { useState } from 'react';
import './Header.css';
import LoginModal from './modals/LoginModal'
import { useUserState } from '../contexts/useUserState';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  const { user } = useUserState()
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
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <div className='flex-item-1 profile-button'>
      {!user ? (
        <>
          <span id='auth' onClick={() => promptLogin()}>Log In<span id='user-icon'><User size={24} /></span></span>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <div>{user.username}</div>
            <div id="profile-icon" style={{ backgroundImage: `url('/logo.png')` }}/>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Header;