import '../styles/auth.css';
import google_icon from '../images/google-icon.png';

export const Auth = () => {
  return (
    <div className='auth'>
      <div className='auth-container'>
        <div className="chango rp2">OO</div>
        <h2 className='rp1'>Create an account to keep track of your reviews!</h2>
        <br />
        <GoogleLoginButton />
        <br />
        <h2 className='rp1'>If you already have an account, you can login with the same link</h2>
      </div>
    </div>
  );
};

const GoogleLoginButton = () => {
  return (
    <a href="http://localhost:3001/auth/google" className="google-button readexpro rp1">
      Sign In With Google
      <img src={google_icon} alt='google icon' className='google-icon' />
    </a>
  );
};

