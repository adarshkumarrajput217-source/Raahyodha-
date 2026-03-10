import React from 'react';
import { motion } from 'motion/react';
import { Truck, Wrench, Building2, Coffee } from 'lucide-react';
import { Role } from '../store/AppContext';

const roles = [
  { id: 'driver', title: 'Driver (चालक)', icon: Truck, color: 'bg-blue-600', desc: 'Road-focused dashboard' },
  { id: 'mistri', title: 'Mistri (मिस्त्री)', icon: Wrench, color: 'bg-orange-600', desc: 'Service & garage tools' },
  { id: 'owner', title: 'Owner (मालिक)', icon: Building2, color: 'bg-purple-600', desc: 'Fleet & load management' },
  { id: 'dhaba', title: 'Dhaba Malik (ढाबा)', icon: Coffee, color: 'bg-green-600', desc: 'Business & rest stop' },
];

export const RoleSelection = ({ onSelect }: { onSelect: (role: Role) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Role</h2>
          <p className="text-xl text-slate-400">आपकी भूमिका क्या है?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(role.id as Role)}
              className="flex flex-col items-center p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-slate-500 transition-colors group"
            >
              <div className={`p-6 rounded-full ${role.color} mb-6 group-hover:shadow-lg group-hover:shadow-${role.color}/50 transition-shadow`}>
                <role.icon size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
              <p className="text-slate-400 text-center">{role.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
