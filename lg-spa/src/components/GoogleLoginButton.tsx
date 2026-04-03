import REACT_APP_API_URL from '../config';

interface GoogleLoginButtonProps {
  loginFunction: Function;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ loginFunction }) => {
  const handleGoogleLogin = () => {
    const googleAuthURL = REACT_APP_API_URL + '/auth/google';
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
      if (event.origin !== REACT_APP_API_URL) return;

      if (event.data.type === 'google-auth-success') {
        loginFunction(event.data.username, event.data.image)
      }

      window.removeEventListener('message', messageListener);
      authWindow?.close();
    };

    window.addEventListener('message', messageListener);
  };

  return (
    <div onClick={handleGoogleLogin}  className='bg-button-bg border border-border rounded-md p-2 w-60 my-2.5 mx-auto cursor-pointer flex flex-row justify-center'>
      <div className='bg-[url("../../public/google-icon.svg")] bg-contain bg-no-repeat w-[22px] h-[22px] mr-2.5'></div>
      <div>Sign In with Google</div>
    </div>
  );
};

export default GoogleLoginButton