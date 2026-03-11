import React from 'react';
import { HeartPulse, Activity, Apple, Moon, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const HealthScreen = () => {
  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Health & Wellness</h1>
          <p className="text-slate-500 text-sm">Stay fit on the road</p>
        </div>
        <div className="bg-red-100 p-3 rounded-full">
          <HeartPulse className="text-red-500" size={24} />
        </div>
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
