import React, { useState } from 'react';
import './LoginModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ( { isOpen, onClose } ) => {
  const [modalMode, setModalMode] = useState<string>('login')
  function resetAndClose() {
    setModalMode('login')
    onClose()
  }

  if (!isOpen) return <></>
  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={resetAndClose}>&times;</button>
        {modalMode === 'login' ? 
          <>
          <div className="modal-header">Log In</div>
          <div className="modal-form">
            <label htmlFor="username">Username or Email Address</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <div className="remember-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember on this device</label>
            </div>
            <button type="submit">Login</button>
            <div>Don't have an account? <span onClick={() => setModalMode('register')} className='register-click'>click here</span> to register</div>
          </div>
        </>:<>
          <div className="modal-header">Create Account</div>
          <div className="modal-form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />            
            <label htmlFor="emailAddress">Email Address</label>
            <input type="text" id="emailAddress" name="emailAddress" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="retypePassword">Retype Password</label>
            <input type="password" id="retypePassword" name="retypePassword" required />
            <button type="submit">Register</button>
            <div>Already have an account? <span onClick={() => setModalMode('login')} className='register-click'>click here</span></div>
          </div>
        </>
        }
      </div>
    </div>
  )
};

export default LoginModal;