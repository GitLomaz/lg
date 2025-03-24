import { useEffect, useState } from 'react';
import './VerificationModal.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import REACT_APP_API_URL from '../../config';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GENERIC_ERROR = "Invalid or Expired Token"

const Verification: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState<string>('Loading...')
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const runVerification = async (token: string) => {
      let URL = `${REACT_APP_API_URL}/auth/verify?token=${token}`
      try {
        const response = await axios.get(URL);
        if (!response?.data?.data) {
          setMessage(GENERIC_ERROR);
          return
        }
        switch (response.data.code) {
          case 'INVALID_TOKEN':
          case 'ACCOUNT_VERIFIED':
            setMessage(response.data.data);
            break;
          default:
            setMessage(GENERIC_ERROR);
            break;
        }
        navigate(window.location.pathname, { replace: true });
      } catch (error: any) {
        setMessage(GENERIC_ERROR);
      }
    }
    runVerification(searchParams.get('verify') || '')
  }, [searchParams]);

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">Complete Registration</div><br/>
        <div className="modal-content">{message}</div>
      </div>
    </div>
  );
};

export default Verification;