import React, { useState, useRef } from 'react';
import { AppProvider, useAppContext } from './store/AppContext';
import { SplashScreen } from './components/SplashScreenView.tsx';
import { LoginScreen } from './components/LoginScreenView.tsx';
import { RoleSelection } from './components/RoleSelection.tsx';
import { Layout } from './components/Layout.tsx';
import { DriverDashboard } from './components/Dashboard/DriverDashboard.tsx';
import { MistriDashboard } from './components/Dashboard/MistriDashboard.tsx';
import { OwnerDashboard } from './components/Dashboard/OwnerDashboard.tsx';
import { DhabaDashboard } from './components/Dashboard/DhabaDashboard.tsx';
import { MapScreen } from './components/MapScreenView.tsx';
import { CommunityScreen } from './components/CommunityScreenView.tsx';
import { HealthScreen } from "./components/HealthScreenView.tsx";
import { ShortsScreen } from './components/ShortsScreenView.tsx';
import { ProfileScreen } from './components/ProfileScreenView.tsx';
import { YodhaScreen } from './components/YodhaScreenView.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';

const MainApp = () => {
  const { user, setUser, activeTab } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!user) {
    return (
      <LoginScreen
        onLogin={(phone, uid) => setUser({ uid, phone, role: null, name: 'Yodha', isVerified: false })}
      />
    );
  }

  // Admin Route Check
  if (user.phone === '9999999999' || window.location.pathname === '/admin') {
    return (
      <Layout>
        <AdminDashboard />
      </Layout>
    );
  }

  if (!user.role) {
    return (
      <RoleSelection
        onSelect={(role) => setUser({ ...user, role })}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        switch (user.role) {
          case 'driver': return <DriverDashboard />;
          case 'mistri': return <MistriDashboard />;
          case 'owner': return <OwnerDashboard />;
          case 'dhaba': return <DhabaDashboard />;
          default: return <DriverDashboard />;
        }
      case 'map': return <MapScreen />;
      case 'community': return <CommunityScreen />;
      case 'health': return <HealthScreen />;
      case 'shorts': return <ShortsScreen />;
      case 'yodha': return <YodhaScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <DriverDashboard />;
    }
  };

  return (
    <Layout>
      {renderTabContent()}
    </Layout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}


