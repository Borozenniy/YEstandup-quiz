import { useState } from 'react';

export const useSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('');

  const openSidebar = (content: string) => {
    setShowSidebar(true);
    if (content) {
      setSidebarContent(content);
    }
  };

  const closeSidebar = () => {
    //history.replaceState({}, document.title, window.location.href.split('#')[0]);
    setShowSidebar(false);
  };
  return {
    openSidebar,
    closeSidebar,
    showSidebar,
    sidebarContent,
  };
};
