import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button/button';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      label='Log out'
      mode='primary'
      onClick={() =>
        logout({ logoutParams: { returnTo: 'http://localhost:5173/' } })
      }
    />
  );
};

export { LogoutButton };
