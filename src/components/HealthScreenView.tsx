import React from 'react';
import { HeartPulse, Activity, Apple, Moon, ShieldAlert, AlertTriangle, HelpCircle, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../store/AppContext';

const safetySlogans = [
  "🚫 शराब पीकर वाहन न चलाएं",
  "💺 सीटबेल्ट हमेशा पहनें",
  "🛑 नींद आने पर वाहन रोक कर आराम करें",
  "⚠️ तेज़ रफ़्तार, जान का ख़तरा",
  "📱 वाहन चलाते समय मोबाइल का प्रयोग न करें",
  "🛣️ सड़क सुरक्षा, जीवन रक्षा"
];

export const HealthScreen = () => {
  const { t } = useAppContext();

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Health & Wellness</h1>
          <p className="text-slate-500 text-sm">Stay fit on the road</p>
        </div>
        <div className="bg-red-100 p-3 rounded-full">
          <HeartPulse className="text-red-500" size={24} />
        </div>
      </div>

      {/* Safety Marquee */}
      <div className="overflow-hidden bg-red-50 border border-red-200 rounded-xl py-2.5 flex items-center shadow-sm relative">
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-red-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-red-50 to-transparent z-10"></div>
        <motion.div
          className="flex whitespace-nowrap gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {[...safetySlogans, ...safetySlogans, ...safetySlogans, ...safetySlogans].map((slogan, index) => (
            <span key={index} className="font-bold text-red-600 text-sm flex-shrink-0">
              {slogan}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center"
        >
          <Activity className="text-blue-500 mb-2" size={24} />
          <span className="text-2xl font-bold text-slate-800">8,432</span>
          <span className="text-xs text-slate-500">Steps Today</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center"
        >
          <Moon className="text-indigo-500 mb-2" size={24} />
          <span className="text-2xl font-bold text-slate-800">6h 20m</span>
          <span className="text-xs text-slate-500">Sleep Last Night</span>
        </motion.div>
      </div>

      {/* Daily Tips */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3">Daily Tips</h2>
        <div className="space-y-3">
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg mt-1">
              <Apple className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Stay Hydrated</h3>
              <p className="text-sm text-slate-600 mt-1">Drink at least 3-4 liters of water today. Keep a bottle handy in the cabin.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <Activity className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Stretch Breaks</h3>
              <p className="text-sm text-slate-600 mt-1">Take a 5-minute stretching break every 4 hours of driving to prevent back pain.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3">Emergency Help</h2>
        <a href="tel:108" className="w-full bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl flex items-center justify-center space-x-2 font-bold hover:bg-red-100 transition mb-3">
          <ShieldAlert size={20} />
          <span>Call Ambulance (108)</span>
        </a>
      </div>

      {/* Help & Support */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
        <div className="p-5 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900 text-lg flex items-center">
            <HelpCircle size={20} className="mr-2 text-blue-500" /> {t('Help & Support')}
          </h3>
        </div>
        
        <div className="p-5 space-y-6">
          {/* Emergency Numbers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center uppercase tracking-wider">
              <PhoneCall size={16} className="mr-2 text-red-500" /> {t('Emergency Contacts')}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:112" className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">112</span>
                <span className="text-xs">All Emergencies</span>
              </a>
              <a href="tel:100" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">100</span>
                <span className="text-xs">Police</span>
              </a>
              <a href="tel:1091" className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-600 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">1091</span>
                <span className="text-xs">Women Helpline</span>
              </a>
              <a href="tel:1033" className="bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 p-3 rounded-xl flex flex-col items-center justify-center transition">
                <span className="font-bold text-xl">1033</span>
                <span className="text-xs">Highway Rescue</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
