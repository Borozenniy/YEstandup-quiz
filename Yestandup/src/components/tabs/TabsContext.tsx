import React, { useState, useContext } from 'react';

type TabsContext = {
  currentTab: string | null;
  setCurrentTab: any;
};

export const TabContext = React.createContext<TabsContext | null>(null);

export const withTabs: any =
  (Component: any) =>
  ({ children, ...props }: any) => {
    const [currentTab, setCurrentTab] = useState(null);

    return (
      <TabContext.Provider value={{ currentTab, setCurrentTab }}>
        <Component {...props} />
        {children}
      </TabContext.Provider>
    );
  };

export const useTabs = () => {
  const { currentTab, setCurrentTab } = useContext(TabContext) as TabsContext;

  if (!TabContext) {
    throw new Error('useTabs must be used within a TabsContext');
  }

  return {
    currentTab,
    setCurrentTab,
  };
};
