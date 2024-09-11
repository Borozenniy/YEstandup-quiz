import { createContext } from 'react';
import Sidebar from './sidebar';
import { useSidebar } from '../../services/hooks/use-sidebar';

const SidebarContext = createContext<any>(null);

const SidebarProvider = ({ children }: any) => {
  const { openSidebar, closeSidebar, showSidebar, sidebarContent } =
    useSidebar();
  return (
    <SidebarContext.Provider
      value={{ openSidebar, closeSidebar, showSidebar, sidebarContent }}
    >
      <Sidebar />
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
