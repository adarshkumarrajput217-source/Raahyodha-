import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Edit2, 
  Video, Moon, Sun, Globe, Crown, LogOut, AlertCircle, Save, Camera
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { VerificationScreen } from './VerificationScreenView';

export const ProfileScreen = () => {
  const { user, setUser, theme, setTheme, language, setLanguage, logout, t } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, phone: e.target.value });
  };

  const handlePhotoChange = () => {
    // Simulate photo change by changing the seed
    const newSeed = Math.random().toString(36).substring(7);
    setUser({ ...user, phone: newSeed }); // Using phone as seed for avatar
  };

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center space-x-6 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-md relative group">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} alt="Profile" className="w-full h-full object-cover" />
              {isEditing && (
                <div 
                  onClick={handlePhotoChange}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera size={24} className="text-white" />
                </div>
              )}
            </div>
            {user.isVerified ? (
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm" title="Verified">
                <ShieldCheck size={16} />
              </div>
            ) : (
              <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white p-1.5 rounded-full border-2 border-white shadow-sm" title="Unverified">
                <AlertCircle size={16} />
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            {isEditing ? (
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={handleNameChange}
                  className="w-full font-heading font-bold text-slate-900 text-xl border-b border-slate-300 focus:border-orange-500 focus:outline-none bg-transparent py-1"
                  placeholder="Your Name"
                />
                <input 
                  type="text" 
                  value={user.phone} 
                  onChange={handlePhoneChange}
                  className="w-full font-mono text-slate-600 text-sm border-b border-slate-300 focus:border-orange-500 focus:outline-none bg-transparent py-1"
                  placeholder="Phone Number"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center">
                  {user.name}
                </h2>
                <p className="text-slate-500 font-mono text-sm mt-1">{user.phone}</p>
              </>
            )}
            <div className="flex items-center mt-2 space-x-2">
              <span className="bg-orange-100 text-orange-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                {user.role}
              </span>
              <span className="text-xs text-slate-500">{t('Joined')} {user.joinedDate || 'Today'}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`p-3 rounded-full transition border ${isEditing ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'}`}
          >
            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
          </button>
        </div>
      </div>

      {/* Verification Section (Merged into Edit Mode) */}
      <AnimatePresence>
        {isEditing && !user.isVerified && user.role && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <VerificationScreen 
              role={user.role} 
              onComplete={() => {
                setUser({ 
                  ...user, 
                  isVerified: true, 
                  joinedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) 
                });
                setIsEditing(false);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Specific Details */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">{t('Professional Details')}</h3>
        {user.role === 'driver' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-500">Truck Number</p><p className="font-mono text-slate-900 font-bold">HR 38 X 1234</p></div>
            <div><p className="text-slate-500">License Type</p><p className="text-slate-900 font-bold">Heavy Motor Vehicle</p></div>
            <div><p className="text-slate-500">Experience</p><p className="text-slate-900 font-bold">8 Years</p></div>
          </div>
        )}
        {user.role === 'mistri' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-500">Garage Name</p><p className="text-slate-900 font-bold">Raju Auto Works</p></div>
            <div><p className="text-slate-500">Specialty</p><p className="text-slate-900 font-bold">Engine & Tyres</p></div>
          </div>
        )}
        {user.role === 'owner' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-500">Company</p><p className="text-slate-900 font-bold">Sharma Transport</p></div>
            <div><p className="text-slate-500">Fleet Size</p><p className="text-slate-900 font-bold">10 Trucks</p></div>
          </div>
        )}
        {user.role === 'dhaba' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-500">Dhaba Name</p><p className="text-slate-900 font-bold">Sher-e-Punjab</p></div>
            <div><p className="text-slate-500">Location</p><p className="text-slate-900 font-bold">NH44, Murthal</p></div>
          </div>
        )}
      </div>

      {/* Settings & Actions */}
      <div className="space-y-3">
        <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold p-4 rounded-2xl flex items-center justify-center transition shadow-md shadow-yellow-500/20">
          <Crown size={20} className="mr-2" /> {t('Upgrade to Premium')}
        </button>

        <button 
          onClick={logout}
          className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold p-4 rounded-2xl flex items-center justify-center transition"
        >
          <LogOut size={20} className="mr-2" /> {t('Logout')}
        </button>
      </div>
    </div>
  );
};
