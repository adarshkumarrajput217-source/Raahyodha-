import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, AlertCircle, CheckCircle2, FileText, IndianRupee, Calendar, MapPin, ShieldAlert } from 'lucide-react';

interface ChallanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChallanCheckModal: React.FC<ChallanModalProps> = ({ isOpen, onClose }) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'result'>('idle');
  const [hasChallan, setHasChallan] = useState(false);

  const handleCheck = () => {
    if (!vehicleNo.trim()) return;
    setStatus('loading');
    
    // Simulate API call to RTO/Parivahan database
    setTimeout(() => {
      // Randomly show challan or no challan for demo purposes
      const randomHasChallan = Math.random() > 0.5;
      setHasChallan(randomHasChallan);
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
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <FileText size={18} className="mr-2 text-orange-500" /> Check E-Challan
          </h3>
          <button onClick={() => { onClose(); reset(); }} className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {status === 'idle' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">Enter your vehicle registration number to check pending challans across India.</p>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Vehicle Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. HR 38 X 1234" 
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold text-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 uppercase"
                />
              </div>
              <button 
                onClick={handleCheck}
                disabled={!vehicleNo.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center"
              >
                <Search size={18} className="mr-2" /> Check Now
              </button>
              <div className="bg-blue-50 p-3 rounded-xl flex items-start mt-4 border border-blue-100">
                <ShieldAlert size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">This connects to the traffic police database to fetch real-time challan records.</p>
              </div>
            </div>
          )}

          {status === 'loading' && (
            <div className="py-10 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium animate-pulse">Connecting to Parivahan database...</p>
            </div>
          )}

          {status === 'result' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="inline-block bg-slate-100 px-4 py-1.5 rounded-full font-mono font-bold text-slate-800 mb-4 border border-slate-200">
                  {vehicleNo}
                </div>
                {hasChallan ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                      <AlertCircle size={32} className="text-red-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Pending Challans Found</h4>
                    <p className="text-sm text-slate-500 mt-1">Please pay them to avoid legal action.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">No Pending Challans!</h4>
                    <p className="text-sm text-slate-500 mt-1">Your vehicle has a clean record.</p>
                  </div>
                )}
              </div>

              {hasChallan && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start border-b border-red-100 pb-3">
                    <div>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">Challan No.</span>
                      <span className="font-mono text-slate-800 text-sm font-semibold">DL{Math.floor(Math.random() * 100000000)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">Amount</span>
                      <span className="font-bold text-red-600 flex items-center justify-end"><IndianRupee size={14} /> 2,000</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-700">
                      <Calendar size={14} className="mr-2 text-slate-400" /> {new Date().toLocaleDateString('en-IN')}
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <MapPin size={14} className="mr-2 text-slate-400" /> NH-48, Speed Camera 4
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <AlertCircle size={14} className="mr-2 text-slate-400" /> Over-speeding (85 km/h in 60 zone)
                    </div>
                  </div>
                  <button className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition">
                    Pay Now
                  </button>
                </div>
              )}

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
