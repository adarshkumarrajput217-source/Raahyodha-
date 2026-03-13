import React from 'react';
import { HeartPulse, Activity, Apple, Moon, ShieldAlert, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const safetySlogans = [
  "🚫 शराब पीकर वाहन न चलाएं",
  "💺 सीटबेल्ट हमेशा पहनें",
  "🛑 नींद आने पर वाहन रोक कर आराम करें",
  "⚠️ तेज़ रफ़्तार, जान का ख़तरा",
  "📱 वाहन चलाते समय मोबाइल का प्रयोग न करें",
  "🛣️ सड़क सुरक्षा, जीवन रक्षा"
];

export const HealthScreen = () => {
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
        <button className="w-full bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl flex items-center justify-center space-x-2 font-bold hover:bg-red-100 transition">
          <ShieldAlert size={20} />
          <span>Call Ambulance (108)</span>
        </button>
      </div>
    </div>
  );
};
