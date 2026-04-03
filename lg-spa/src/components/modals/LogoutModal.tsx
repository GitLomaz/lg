import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<ModalProps> = ( { isOpen, onClose } ) => {
  if (!isOpen) return <></>
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]" onClick={onClose}>
      <div className="bg-background text-white p-3 rounded-lg border-2 border-border shadow-lg w-[90%] max-w-[500px] text-center relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2.5 right-4 bg-transparent border-none text-lg cursor-pointer text-white hover:text-red-600" onClick={onClose}>&times;</button>
        <div className="text-2xl">Logout Successful</div>
      </div>
    </div>
  )
};

export default LogoutModal;