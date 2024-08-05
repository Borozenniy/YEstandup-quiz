import { useState, useEffect } from 'react';
import { Login } from '../auth/login';
import { Header } from '../components/header/header';
//* do Fake Authentication
import './root.scss';

export const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useEffect(() => {
  //  isLoggedIn && navigate('/login');
  //}, [isLoggedIn, navigate]);

  return (
    <>
      {isLoggedIn && (
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};
