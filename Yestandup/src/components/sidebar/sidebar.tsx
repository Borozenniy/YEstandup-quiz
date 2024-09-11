import { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { SidebarContext } from './sidebar-provider';
import './sidebar.scss';

const sidebarRoot = document.querySelector('#sidebar-root') as HTMLElement;
const Sidebar = () => {
  const { openSidebar, closeSidebar, showSidebar, sidebarContent } = useContext(
    SidebarContext
  ) as any;

  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      closeSidebar();
    }
  };

  const handleCloseSidebar = () => {
    closeSidebar();
  };
  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
  }, [showSidebar]);

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSidebar]);

  if (!sidebarRoot) {
    return null;
  }

  if (showSidebar) {
    return createPortal(
      <div className={showSidebar ? 'sidebar show' : 'sidebar'}>
        <div className='sidebar__content' onClick={(e) => e.stopPropagation()}>
          <div className='sidebar__close' onClick={handleCloseSidebar}>
            &times;
          </div>
          <div className='sidebar__body'>{sidebarContent}</div>
        </div>
      </div>,
      sidebarRoot
    );
  }
  return null;
};

export default Sidebar;
