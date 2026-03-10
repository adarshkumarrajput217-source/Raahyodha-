import React, { useState } from 'react';
import { AppProvider, useAppContext } from './store/AppContext';
import { SplashScreen } from './components/SplashScreenView';
import { LoginScreen } from './components/LoginScreenView';
import { RoleSelection } from './components/RoleSelection';
import { VerificationScreen } from './components/VerificationScreenView';
import { Layout } from './components/Layout';
import { DriverDashboard } from './components/Dashboard/DriverDashboard';
import { MistriDashboard } from './components/Dashboard/MistriDashboard';
import { OwnerDashboard } from './components/Dashboard/OwnerDashboard';
import { DhabaDashboard } from './components/Dashboard/DhabaDashboard';
import { MapScreen } from './components/MapScreenView';
import { CommunityScreen } from './components/CommunityScreenView';
import { HealthScreen } from './components/HealthScreenView';
import { ShortsScreen } from './components/ShortsScreenView';
import { ProfileScreen } from './components/ProfileScreenView';
import { YodhaAssistant } from './components/YodhaAssistant';
import { AdminDashboard } from './components/AdminDashboard';

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

  if (!user.isVerified) {
    return (
      <VerificationScreen
        role={user.role}
        onComplete={() => {
          setUser({ 
            ...user, 
            isVerified: true, 
            joinedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) 
          });
        }}
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
      case 'profile': return <ProfileScreen />;
      default: return <DriverDashboard />;
    }
  };

  return (
    <Layout>
      {renderTabContent()}
      <YodhaAssistant />
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


