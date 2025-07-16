import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [activeTab, setActiveTab] = useState('shop');

  const value = {
    activeTab,
    setActiveTab,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
