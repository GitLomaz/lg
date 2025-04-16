import './GoogleLoginButton.css';

interface GoogleLoginButtonProps {
  loginFunction: Function;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ loginFunction }) => {
  const handleGoogleLogin = () => {
    const googleAuthURL = 'http://localhost:3000/auth/google';
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      googleAuthURL,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const messageListener = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') return;

      if (event.data.type === 'google-auth-success') {
        loginFunction(event.data.username, event.data.image)
      }

      window.removeEventListener('message', messageListener);
      authWindow?.close();
    };

    window.addEventListener('message', messageListener);
  };

  return (
    <div onClick={handleGoogleLogin}  className='google-btn flex-row'>
      <div className='google-logo'></div>
      <div className='google-text'>Sign In with Google</div>
    </div>
  );
};

export default GoogleLoginButton