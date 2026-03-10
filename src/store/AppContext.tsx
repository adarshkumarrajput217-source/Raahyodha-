import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'driver' | 'mistri' | 'owner' | 'dhaba' | null;
export type Language = 'hi' | 'en';
export type Theme = 'dark' | 'light';
export type Tab = 'home' | 'map' | 'community' | 'health' | 'shorts' | 'profile';

export interface User {
  uid?: string;
  phone: string;
  role: Role;
  name: string;
  isVerified: boolean;
  joinedDate?: string;
}

interface AppState {
  user: User | null;
  language: Language;
  theme: Theme;
  activeTab: Tab;
  setUser: (user: User | null) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setActiveTab: (tab: Tab) => void;
  logout: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const logout = () => {
    setUser(null);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        theme,
        activeTab,
        setUser,
        setLanguage,
        setTheme,
        setActiveTab,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

