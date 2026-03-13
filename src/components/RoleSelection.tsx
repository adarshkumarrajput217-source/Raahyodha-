import React from 'react';
import { motion } from 'motion/react';
import { Truck, Wrench, Building2, Coffee } from 'lucide-react';
import { Role } from '../store/AppContext';

const roles = [
  { id: 'driver', title: 'Driver (चालक)', icon: Truck, color: 'bg-blue-600', desc: 'Road-focused dashboard' },
  { id: 'mistri', title: 'Mistri (मिस्त्री)', icon: Wrench, color: 'bg-primary', desc: 'Service & garage tools' },
  { id: 'owner', title: 'Owner (मालिक)', icon: Building2, color: 'bg-purple-600', desc: 'Fleet & load management' },
  { id: 'dhaba', title: 'Dhaba Malik (ढाबा)', icon: Coffee, color: 'bg-green-600', desc: 'Business & rest stop' },
];

export const RoleSelection = ({ onSelect }: { onSelect: (role: Role) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900 p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md flex flex-col items-center relative z-10"
      >
        <div className="mb-6 w-32 h-32 sm:w-40 sm:h-40">
          <img 
            src="/logo.png" 
            alt="Raahyodha Logo" 
            className="w-full h-full object-contain drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-1">Choose Your Role</h2>
          <p className="text-sm text-slate-500">आपकी भूमिका क्या है?</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(role.id as Role)}
              className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors group shadow-sm"
            >
              <div className={`p-3 rounded-full ${role.color} mb-3 group-hover:shadow-md transition-shadow`}>
                <role.icon size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{role.title}</h3>
              <p className="text-xs text-slate-500 text-center leading-tight">{role.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
