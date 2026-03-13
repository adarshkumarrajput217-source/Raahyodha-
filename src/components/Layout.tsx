import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Map, Users, HeartPulse, Video, Menu, Bell, Crown, X, User as UserIcon, Settings, Star, Share2, Instagram, Facebook, Youtube, Globe, Moon, Sun, Search, Truck, Bot } from 'lucide-react';
import { useAppContext, Tab } from '../store/AppContext';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { activeTab, setActiveTab, user, theme, setTheme, language, setLanguage, t } = useAppContext();
  const [showAd, setShowAd] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const MenuItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors">
      <Icon size={20} className="text-slate-500" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const SocialMenuItem = ({ icon: Icon, label, colorClass, onClick }: { icon: any, label: string, colorClass: string, onClick: () => void }) => (
    <motion.button 
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick} 
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 hover:shadow-sm"
    >
      <div className={`p-2 rounded-lg text-white shadow-sm ${colorClass}`}>
        <Icon size={18} />
      </div>
      <span className="font-medium">{label}</span>
    </motion.button>
  );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'shorts', label: 'Shorts', icon: Video },
    { id: 'yodha', label: 'Yodha', icon: Bot },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-16 md:pb-0">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3 flex-grow max-w-md mr-4">
          <button onClick={() => setIsDrawerOpen(true)} className="p-2 rounded-full hover:bg-slate-100 transition flex-shrink-0">
            <Menu size={24} className="text-slate-600" />
          </button>
          <div className="relative flex-grow">
            {!searchQuery && (
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            )}
            <input 
              type="text" 
              placeholder="Raahyodha" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className={`w-full ${searchQuery ? 'pl-4' : 'pl-10'} pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-800 placeholder:text-slate-500`}
            />
            
            {/* Search Dropdown */}
            <AnimatePresence>
              {isSearchOpen && searchQuery && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSearchOpen(false)}
                  ></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden p-3"
                  >
                    <div className="px-2 pb-2">
                      <p className="text-xs text-slate-500 font-medium mb-2">Searching for "{searchQuery}"...</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                          <div className="bg-orange-100 p-2 rounded-full"><Map size={14} className="text-orange-600" /></div>
                          <span className="text-sm text-slate-700">Route to <span className="font-semibold">{searchQuery}</span></span>
                        </div>
                        <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                          <div className="bg-blue-100 p-2 rounded-full"><Home size={14} className="text-blue-600" /></div>
                          <span className="text-sm text-slate-700">Dhabas near <span className="font-semibold">{searchQuery}</span></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button className="hidden sm:flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:shadow-yellow-500/20 transition">
            <Crown size={14} className="mr-1" /> Premium
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full hover:bg-slate-100 transition"
            >
              <Bell size={24} className="text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationsOpen(false)}
                  ></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-bold text-slate-900">Notifications</h3>
                      <button className="text-xs text-orange-600 font-medium hover:text-orange-700">Mark all as read</button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                      <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Map size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-800"><span className="font-semibold">Traffic Alert:</span> Heavy jam on NH48 near Jaipur.</p>
                            <p className="text-xs text-slate-500 mt-1">10 mins ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer bg-orange-50/30">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users size={16} className="text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-800"><span className="font-semibold">Ramesh Singh</span> replied to your post in Community.</p>
                            <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <HeartPulse size={16} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-800"><span className="font-semibold">Health Reminder:</span> Time to take a 30-minute break.</p>
                            <p className="text-xs text-slate-500 mt-1">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
                      <button className="text-sm text-slate-600 font-medium hover:text-slate-900">View all notifications</button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div 
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-orange-600 transition shadow-sm overflow-hidden border-2 border-transparent hover:border-orange-200"
          >
            {user?.phone ? (
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} alt="Profile" className="w-full h-full object-cover bg-slate-100" />
            ) : (
              user?.name?.charAt(0) || 'Y'
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto w-full max-w-7xl mx-auto relative">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-1 py-2 flex justify-around items-center md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-1.5 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === tab.id
                ? 'text-primary bg-orange-50 scale-110'
                : 'text-slate-500 hover:text-primary hover:bg-slate-50'
            }`}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[9px] mt-1 font-medium truncate w-full text-center">{t(tab.label)}</span>
          </button>
        ))}
      </nav>

      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 p-4 z-40">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-primary bg-orange-50 font-medium'
                  : 'text-slate-500 hover:text-primary hover:bg-slate-50'
              }`}
            >
              <tab.icon size={24} className="mr-3" strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span>{t(tab.label)}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-200">
          <button className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-4 py-3 rounded-xl shadow-md hover:shadow-yellow-500/20 transition">
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
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-green-600">Raahyodha</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-3 space-y-1">
                  <MenuItem icon={Home} label={t('Home')} onClick={() => { setActiveTab('home'); setIsDrawerOpen(false); }} />
                  <MenuItem icon={Settings} label={t('Settings')} onClick={() => { setIsDrawerOpen(false); setIsSettingsOpen(true); }} />
                  <MenuItem icon={Star} label={t('Rate App')} onClick={() => setIsDrawerOpen(false)} />
                  <MenuItem icon={Share2} label={t('Share App')} onClick={() => setIsDrawerOpen(false)} />
                </div>

                <div className="mt-6 px-4 mb-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('Connect With Us')}</h3>
                </div>
                <div className="px-3 space-y-2">
                  <SocialMenuItem 
                    icon={Instagram} 
                    label="Instagram" 
                    colorClass="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" 
                    onClick={() => setIsDrawerOpen(false)} 
                  />
                  <SocialMenuItem 
                    icon={Facebook} 
                    label="Facebook" 
                    colorClass="bg-blue-600" 
                    onClick={() => setIsDrawerOpen(false)} 
                  />
                  <SocialMenuItem 
                    icon={Youtube} 
                    label="YouTube" 
                    colorClass="bg-red-600" 
                    onClick={() => setIsDrawerOpen(false)} 
                  />
                  <SocialMenuItem 
                    icon={Globe} 
                    label="Website" 
                    colorClass="bg-slate-800" 
                    onClick={() => setIsDrawerOpen(false)} 
                  />
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 text-center text-xs text-slate-400">
                App Version 1.0.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Settings className="mr-2 text-slate-500" /> {t('Settings')}
              </h2>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide pb-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{t('App Theme')}</h3>
                    {theme === 'dark' ? <Moon size={20} className="text-indigo-500" /> : <Sun size={20} className="text-yellow-500" />}
                  </div>
                  <p className="text-sm text-slate-500 mb-4">Choose your preferred visual style for the application.</p>
                  
                  <div className="flex bg-slate-200/50 p-1 rounded-xl">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Light
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{t('Language')}</h3>
                    <Globe size={20} className="text-orange-500" />
                  </div>
                  <p className="text-sm text-slate-500 mb-4">Select your preferred language for the application.</p>
                  
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3 shadow-sm outline-none font-medium"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="as">অসমীয়া (Assamese)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="or">ଓଡ଼ିଆ (Odia)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Placeholder for other settings */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 opacity-60">
                  <h3 className="font-semibold text-slate-900 mb-1">Notifications</h3>
                  <p className="text-sm text-slate-500">Manage your push notification preferences.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
