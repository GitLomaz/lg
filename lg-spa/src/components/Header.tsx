import React, { useState } from 'react';
import LoginModal from './modals/LoginModal'
import LogoutModal from './modals/LogoutModal'
import { useUserState } from '../contexts/useUserState';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SPA_REACT_APP_API_URL from '../config';
import http from '../fetchConfig';

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
    <div className='flex flex-row items-center'>
      <div className='hidden md:flex flex-1 max-w-[300px]'>
        <div id='logo'></div>
      </div>
      <div className='flex-1 text-center'>
        <Link to="/" className="text-white no-underline">
          <h1 className="text-lg md:text-2xl m-0">Lomaz Games</h1>
        </Link>
      </div>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}></LoginModal>
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}></LogoutModal>
      <div className='flex-1 text-right text-base md:text-xl leading-[34px] max-w-[150px] md:max-w-[300px]'>
      {!user ? (
        <>
          <span className="cursor-pointer flex items-center justify-end gap-1" onClick={() => promptLogin()}>
            <span className="hidden sm:inline">Log In</span>
            <span className="align-middle inline-block">
              <User size={20} className="md:w-6 md:h-6" />
            </span>
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center justify-end cursor-pointer gap-1 md:gap-2" onClick={() => {toggleMenu()}}>
            <div className="text-sm md:text-base truncate max-w-[80px] md:max-w-[200px]">{user.username}</div>
            <div 
              className="w-6 h-6 md:w-8 md:h-8 bg-cover bg-center rounded-3xl flex-shrink-0" 
              style={{ backgroundImage: `url('/logo.png')` }}
            />
          </div >
          {menuOpen && (
            <>
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1000]" onClick={() => closeMenu()}></div>
              <div className="absolute bg-container-bg text-white top-[40px] md:top-[50px] right-[5px] border-2 border-border shadow-lg rounded-[5px] p-2.5 min-w-[120px] md:min-w-[150px] z-[2000]">
                <div className="cursor-pointer p-0.5 pr-2.5 transition-colors duration-200 rounded hover:bg-border text-sm md:text-base" onClick={() => navigate("/profile")}>
                  Profile
                </div>
                <div className="cursor-pointer p-0.5 pr-2.5 transition-colors duration-200 rounded hover:bg-border text-sm md:text-base" onClick={handleLogout}>
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