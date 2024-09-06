import { ModalProvider } from '../modal/modal-provider';
import { Outlet } from 'react-router';
import { Login } from '../auth/login';
import { Header } from '../components/header/header';
//* do Fake Authentication
import './root.scss';

export const Root = () => {
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
