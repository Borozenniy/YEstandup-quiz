import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button/button';

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <Button label='Log In' mode='primary' onClick={() => loginWithPopup()} />
  );
};
export { LoginButton };
