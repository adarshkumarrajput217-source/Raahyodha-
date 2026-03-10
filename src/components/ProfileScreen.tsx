import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Edit2, HelpCircle, PhoneCall, MessageSquare, 
  Video, Moon, Sun, Globe, Crown, LogOut, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const ProfileScreen = () => {
  const { user, theme, setTheme, language, setLanguage, logout } = useAppContext();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [supportMsg, setSupportMsg] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const faqs = [
    { q: 'How to find loads?', a: 'Go to the Home dashboard and scroll down to "Available Loads".' },
    { q: 'How to report a bribe?', a: 'Use the Map screen and tap the "Bribe/Police Alerts" button.' },
    { q: 'Is the app free?', a: 'Yes, basic features are free. Premium features require an upgrade.' },
  ];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportMsg.trim()) {
      setMsgSent(true);
      setTimeout(() => {
        setSupportMsg('');
        setMsgSent(false);
      }, 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center space-x-6 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-700 border-4 border-slate-800 overflow-hidden shadow-lg">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-slate-800 shadow-md" title="Verified">
              <ShieldCheck size={16} />
            </div>
          </div>
          
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-white flex items-center">
              {user.name}
            </h2>
            <p className="text-slate-400 font-mono text-sm mt-1">{user.phone}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
                {user.role}
              </span>
              <span className="text-xs text-slate-500">Joined {user.joinedDate || 'Today'}</span>
            </div>
          </div>
          
          <button className="bg-slate-700/50 hover:bg-slate-600 p-3 rounded-full text-slate-300 transition border border-slate-600">
            <Edit2 size={20} />
          </button>
        </div>
      </div>

      {/* Role Specific Details */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-md">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Professional Details</h3>
        {user.role === 'driver' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-400">Truck Number</p><p className="font-mono text-slate-200 font-bold">HR 38 X 1234</p></div>
            <div><p className="text-slate-400">License Type</p><p className="text-slate-200 font-bold">Heavy Motor Vehicle</p></div>
            <div><p className="text-slate-400">Experience</p><p className="text-slate-200 font-bold">8 Years</p></div>
          </div>
        )}
        {user.role === 'mistri' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-400">Garage Name</p><p className="text-slate-200 font-bold">Raju Auto Works</p></div>
            <div><p className="text-slate-400">Specialty</p><p className="text-slate-200 font-bold">Engine & Tyres</p></div>
          </div>
        )}
        {user.role === 'owner' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-400">Company</p><p className="text-slate-200 font-bold">Sharma Transport</p></div>
            <div><p className="text-slate-400">Fleet Size</p><p className="text-slate-200 font-bold">10 Trucks</p></div>
          </div>
        )}
        {user.role === 'dhaba' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-400">Dhaba Name</p><p className="text-slate-200 font-bold">Sher-e-Punjab</p></div>
            <div><p className="text-slate-400">Location</p><p className="text-slate-200 font-bold">NH44, Murthal</p></div>
          </div>
        )}
      </div>

      {/* Help & Support */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
        <div className="p-5 border-b border-slate-700 bg-slate-800/50">
          <h3 className="font-bold text-white text-lg flex items-center">
            <HelpCircle size={20} className="mr-2 text-blue-400" /> Help & Support
          </h3>
        </div>
        
        <div className="p-5 space-y-6">
          {/* Emergency Numbers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center uppercase tracking-wider">
              <PhoneCall size={16} className="mr-2 text-red-400" /> Emergency Contacts
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">112</span>
                <span className="text-xs">All Emergencies</span>
              </button>
              <button className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">100</span>
                <span className="text-xs">Police</span>
              </button>
              <button className="bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">1091</span>
                <span className="text-xs">Women Helpline</span>
              </button>
              <button className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">1033</span>
                <span className="text-xs">Highway Rescue</span>
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">FAQs</h4>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-700 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-4 bg-slate-700/30 hover:bg-slate-700/50 transition text-left"
                  >
                    <span className="font-medium text-slate-200 text-sm">{faq.q}</span>
                    {activeFaq === i ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-4 bg-slate-800 text-sm text-slate-400 border-t border-slate-700"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Tutorials */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center uppercase tracking-wider">
              <Video size={16} className="mr-2 text-purple-400" /> Tutorial Videos
            </h4>
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[160px] h-24 bg-slate-700 rounded-xl border border-slate-600 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <img src={`https://picsum.photos/seed/tutorial${i}/300/200`} alt="Tutorial" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition" />
                  <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 z-10">
                    <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Form */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center uppercase tracking-wider">
              <MessageSquare size={16} className="mr-2 text-green-400" /> Contact Support
            </h4>
            <form onSubmit={handleSupportSubmit} className="space-y-3">
              <textarea
                className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-sm"
                placeholder="Describe your issue..."
                rows={3}
                value={supportMsg}
                onChange={(e) => setSupportMsg(e.target.value)}
                required
              ></textarea>
              <button 
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition flex items-center justify-center"
              >
                {msgSent ? <span className="text-green-400 flex items-center"><ShieldCheck size={18} className="mr-2" /> Sent Successfully</span> : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl border border-slate-700 flex items-center justify-between transition"
          >
            <span className="font-medium text-slate-200">Theme</span>
            {theme === 'dark' ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-yellow-400" />}
          </button>
          
          <button 
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl border border-slate-700 flex items-center justify-between transition"
          >
            <span className="font-medium text-slate-200">Language</span>
            <div className="flex items-center text-orange-400">
              <Globe size={16} className="mr-1" />
              <span className="font-bold">{language === 'hi' ? 'HI' : 'EN'}</span>
            </div>
          </button>
        </div>

        <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold p-4 rounded-2xl flex items-center justify-center transition shadow-lg shadow-yellow-500/20">
          <Crown size={20} className="mr-2" /> Upgrade to Premium
        </button>

        <button 
          onClick={logout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold p-4 rounded-2xl flex items-center justify-center transition"
        >
          <LogOut size={20} className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};
