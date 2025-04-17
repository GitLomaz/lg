import React from 'react';
import './LogoutModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<ModalProps> = ( { isOpen, onClose } ) => {
  if (!isOpen) return <></>
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">Logout Successful</div>
      </div>
    </div>
  )
};

export default LogoutModal;