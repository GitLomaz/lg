import React, { useState } from 'react';
import './Header.css';
import LoginModal from './modals/LoginModal'
import LogoutModal from './modals/LogoutModal'
import { useUserState } from '../contexts/useUserState';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SPA_REACT_APP_API_URL from '../config';
import http from '../http';

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

  async function handleLogout() {
    let URL = `${SPA_REACT_APP_API_URL}/auth/logout`
    try {
      await http.post(URL);
      setIsLogoutOpen(true)
      setUser(null)
    } catch (error: any) {
      console.log('Failed to log out', error)
    }
  }

  return (
    <div className='relative h-full'>
      <div id='auth' className='absolute left-2 top-1/2 -translate-y-1/2 flex items-center'>
        <div id='logo'></div>
      </div>
      <div id='header-home' className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Link to="/">
          <h1 className='text-2xl'>Lomaz Games</h1>
        </Link>
      </div>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}></LogoutModal>
      <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2'>
      {!user ? (
        <>
          <span id='auth-container' className='cursor-pointer' onClick={() => promptLogin()}>Log In</span>
          <User size={24} />
        </>
      ) : (
        <>
          <div id="profile-container" className='flex items-center space-x-2 cursor-pointer' onClick={() => {toggleMenu()}}>
            <div>{user.username}</div>
            <div className='w-8 h-8 rounded-full bg-center bg-cover mt-1' style={{ backgroundImage: `url('/logo.png')` }}/>
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