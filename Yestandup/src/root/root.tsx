import { ModalProvider } from '../modal/modal-provider';
import { SidebarProvider } from '../components/sidebar/sidebar-provider';
import { SocketProvider } from '../socket/socket-provider';
import { Outlet } from 'react-router';
import { Login } from '../auth/login';
import { Header } from '../components/header/header';
//* do Fake Authentication
import './root.scss';

export const Root = () => {
  return (
    <>
      <SocketProvider>
        <ModalProvider>
          <SidebarProvider>
            <Header />
            <Outlet />
            <Login />
          </SidebarProvider>
        </ModalProvider>
      </SocketProvider>
    </>
  );
};
2;
