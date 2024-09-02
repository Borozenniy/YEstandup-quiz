import { useState } from 'react';
import { ModalProvider } from '../modal/modal-provider';
import { Outlet } from 'react-router';
import { Login } from '../auth/login';
import { Header } from '../components/header/header';
//* do Fake Authentication
import './root.scss';

export const Root = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useEffect(() => {
  //  isLoggedIn && navigate('/login');
  //}, [isLoggedIn, navigate]);

  return (
    <>
      <ModalProvider>
        <Header />
        <Outlet />
        <Login />
      </ModalProvider>
    </>
  );
};
2;
