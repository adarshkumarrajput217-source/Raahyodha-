import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Search, CheckCircle2, CreditCard, User, Calendar, ShieldCheck, Activity, Car, FileText } from 'lucide-react';

interface RCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RCCheckModal: React.FC<RCModalProps> = ({ isOpen, onClose }) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'result'>('idle');

  const handleCheck = () => {
    if (!vehicleNo.trim()) return;
    setStatus('loading');
    
    // Simulate API call to Vahan database
    setTimeout(() => {
      setStatus('result');
    }, 2500);
  };

  const reset = () => {
    setStatus('idle');
    setVehicleNo('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-bold text-slate-900 flex items-center">
            <CreditCard size={18} className="mr-2 text-blue-500" /> Check RC Details
          </h3>
          <button onClick={() => { onClose(); reset(); }} className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto">
          {status === 'idle' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">Enter your vehicle registration number to fetch RC details from the Vahan database.</p>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Vehicle Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. HR 38 X 1234" 
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase"
                />
              </div>
              <button 
                onClick={handleCheck}
                disabled={!vehicleNo.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center"
              >
                <Search size={18} className="mr-2" /> Fetch RC
              </button>
              <div className="bg-blue-50 p-3 rounded-xl flex items-start mt-4 border border-blue-100">
                <ShieldCheck size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">This connects to the central Vahan database to fetch real-time registration records.</p>
              </div>
            </div>
          )}

          {status === 'loading' && (
            <div className="py-10 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium animate-pulse">Connecting to Vahan database...</p>
            </div>
          )}

          {status === 'result' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="inline-block bg-slate-100 px-4 py-1.5 rounded-full font-mono font-bold text-slate-800 mb-2 border border-slate-200">
                  {vehicleNo}
                </div>
                <div className="flex items-center justify-center text-green-600 font-bold text-sm">
                  <CheckCircle2 size={16} className="mr-1" /> ACTIVE
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="flex items-start">
                  <User size={16} className="text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Owner Name</p>
                    <p className="font-semibold text-slate-900">Ramesh Kumar (First Owner)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Car size={16} className="text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Maker / Model</p>
                    <p className="font-semibold text-slate-900">Tata Motors / LPT 3118</p>
                    <p className="text-xs text-slate-500">Heavy Goods Vehicle (HGV) • DIESEL</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center"><Calendar size={10} className="mr-1"/> Reg. Date</p>
                    <p className="font-semibold text-slate-800 text-sm">12-Aug-2018</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center"><ShieldCheck size={10} className="mr-1"/> Fitness Upto</p>
                    <p className="font-semibold text-slate-800 text-sm">11-Aug-2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center"><FileText size={10} className="mr-1"/> Insurance Upto</p>
                    <p className="font-semibold text-slate-800 text-sm">05-May-2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center"><Activity size={10} className="mr-1"/> PUC Upto</p>
                    <p className="font-semibold text-slate-800 text-sm text-red-600">20-Nov-2024 (Expired)</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={reset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition"
              >
                Check Another Vehicle
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
