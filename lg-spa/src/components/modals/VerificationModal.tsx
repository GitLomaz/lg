import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SPA_REACT_APP_API_URL from '../../config';
import http from '../../fetchConfig'

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
      let URL = `${SPA_REACT_APP_API_URL}/auth/verify?token=${token}`
      try {
        const response = await http.get(URL);
        if (!response?.data) {
          setMessage(GENERIC_ERROR);
          return
        }
        switch (response.code) {
          case 'INVALID_TOKEN':
          case 'ACCOUNT_VERIFIED':
            setMessage(response.data);
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
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]" onClick={onClose}>
      <div className="bg-background text-white p-3 rounded-lg border-2 border-border shadow-lg w-[90%] max-w-[500px] text-center relative min-h-[20px]" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2.5 right-4 bg-transparent border-none text-lg cursor-pointer text-white hover:text-red-600" onClick={onClose}>&times;</button>
        <div className="text-2xl">Complete Registration</div><br/>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Verification;