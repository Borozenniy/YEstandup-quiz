import { Button } from '../components/button/button';
import './login.scss';

export const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const logIn = () => {
    setIsLoggedIn(true);
  };

  const singUp = () => {};
  return (
    <>
      {!isLoggedIn && (
        <div className='login'>
          <Button mode='primary' label='Log In' onClick={logIn} />
          <Button mode='primary' label='Sing up' onClick={singUp} />
        </div>
      )}
    </>
  );
};
