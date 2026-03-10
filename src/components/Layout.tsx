import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Map, Users, HeartPulse, Video, Menu, Bell, Crown, X, User as UserIcon, Settings, Star, Share2, Instagram, Facebook, Youtube, Globe } from 'lucide-react';
import { useAppContext, Tab } from '../store/AppContext';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { activeTab, setActiveTab, user } = useAppContext();
  const [showAd, setShowAd] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const MenuItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition">
      <Icon size={20} className="text-slate-400" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'shorts', label: 'Shorts', icon: Video },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white pb-16 md:pb-0">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsDrawerOpen(true)} className="p-2 rounded-full hover:bg-slate-700 transition">
            <Menu size={24} className="text-slate-300" />
          </button>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-green-400">
            Raahyodha
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="hidden sm:flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hover:shadow-yellow-500/20 transition">
            <Crown size={14} className="mr-1" /> Premium
          </button>
          <button className="relative p-2 rounded-full hover:bg-slate-700 transition">
            <Bell size={24} className="text-slate-300" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-800"></span>
          </button>
          <div 
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-orange-600 transition"
          >
            {user?.name?.charAt(0) || 'Y'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto w-full max-w-7xl mx-auto relative">
        {children}
      </main>

      {/* Simulated Ad Banner */}
      {showAd && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-2 flex justify-center items-center z-40">
          <div className="relative w-full max-w-md bg-slate-700 rounded-lg h-12 flex items-center justify-center border border-slate-600 overflow-hidden">
            <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Advertisement</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            <button 
              onClick={() => setShowAd(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800/80 p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-1 py-2 flex justify-around items-center md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-1.5 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === tab.id
                ? 'text-orange-500 bg-orange-500/10 scale-110'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[9px] mt-1 font-medium truncate w-full text-center">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-slate-800 border-r border-slate-700 p-4 z-40">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-orange-500 bg-orange-500/10 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon size={24} className="mr-3" strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-700">
          <button className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:shadow-yellow-500/20 transition">
            <Crown size={18} className="mr-2" /> Go Premium
          </button>
        </div>
      </aside>

      {/* Side Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-slate-800 border-r border-slate-700 z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-green-400">Raahyodha</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-full hover:bg-slate-700 text-slate-400">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-3 space-y-1">
                  <MenuItem icon={Home} label="Home" onClick={() => { setActiveTab('home'); setIsDrawerOpen(false); }} />
                  <MenuItem icon={Settings} label="Settings" onClick={() => setIsDrawerOpen(false)} />
                  <MenuItem icon={Star} label="Rate App" onClick={() => setIsDrawerOpen(false)} />
                  <MenuItem icon={Share2} label="Share App" onClick={() => setIsDrawerOpen(false)} />
                </div>

                <div className="mt-6 px-4 mb-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connect With Us</h3>
                </div>
                <div className="px-3 space-y-1">
                  <MenuItem icon={Instagram} label="Instagram" onClick={() => setIsDrawerOpen(false)} />
                  <MenuItem icon={Facebook} label="Facebook" onClick={() => setIsDrawerOpen(false)} />
                  <MenuItem icon={Youtube} label="YouTube" onClick={() => setIsDrawerOpen(false)} />
                  <MenuItem icon={Globe} label="Website" onClick={() => setIsDrawerOpen(false)} />
                </div>
              </div>
              <div className="p-4 border-t border-slate-700 text-center text-xs text-slate-500">
                App Version 1.0.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
