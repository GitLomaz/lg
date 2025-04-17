import React, { useState } from 'react';
import './Header.css';
import LoginModal from './modals/LoginModal'
import LogoutModal from './modals/LogoutModal'
import { useUserState } from '../contexts/useUserState';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, setUser } = useUserState()
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  function promptLogin() {
    setIsOpen(true)
    closeMenu()
  }

  function handleLogout() {
    setIsLogoutOpen(true)
    setUser(null)
  }

  return (
    <div className='app-header flex-row'>
      <div id='auth' className='flex-item-1 fixed-width-300'>
        <div id='logo'></div>
      </div>
      <div id='header-home' className='flex-item-1'>
        <Link to="/">
          <h1>Lomaz Games</h1>
        </Link>
      </div>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}></LogoutModal>
      <div className='flex-item-1 profile-button fixed-width-300'>
      {!user ? (
        <>
          <span id='auth-container' onClick={() => promptLogin()}>Log In<span id='user-icon'><User size={24} /></span></span>
        </>
      ) : (
        <>
          <div id="profile-container" onClick={() => {toggleMenu()}}>
            <div>{user.username}</div>
            <div id="profile-icon" style={{ backgroundImage: `url('/logo.png')` }}/>
          </div >
          {menuOpen && (
            <>
              <div id='menu-backdrop' onClick={() => closeMenu()}></div>
              <div id='menu'>
                <div className="menu-item" onClick={() => navigate("/profile")}>
                  Profile
                </div>
                <div className="menu-item" onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            </>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default Header;