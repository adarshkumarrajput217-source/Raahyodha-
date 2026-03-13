import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Role } from '../store/AppContext';

interface VerificationProps {
  role: Role;
  onComplete: () => void;
}

export const VerificationScreen = ({ role, onComplete }: VerificationProps) => {
  const [uploads, setUploads] = useState<Record<string, boolean>>({});
  const [simulating, setSimulating] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const getRequirements = () => {
    switch (role) {
      case 'driver':
        return [
          { id: 'dl', label: 'Driving License (ड्राइविंग लाइसेंस)' },
          { id: 'selfie', label: 'Selfie (सेल्फी)' },
        ];
      case 'mistri':
        return [
          { id: 'dl', label: 'Driving License / ID Proof' },
          { id: 'selfie', label: 'Selfie (सेल्फी)' },
          { id: 'shop', label: 'Garage/Shop Photo (दुकान की फोटो)' },
        ];
      case 'owner':
        return [
          { id: 'dl', label: 'Driving License / ID Proof' },
          { id: 'selfie', label: 'Selfie (सेल्फी)' },
        ];
      case 'dhaba':
        return [
          { id: 'dl', label: 'Driving License / ID Proof' },
          { id: 'selfie', label: 'Selfie (सेल्फी)' },
          { id: 'dhaba', label: 'Dhaba Photo (ढाबा की फोटो)' },
        ];
      default:
        return [];
    }
  };

  const requirements = getRequirements();
  const allUploaded = requirements.every(req => uploads[req.id]);

  const handleUpload = (id: string) => {
    setSimulating(id);
    setTimeout(() => {
      setUploads(prev => ({ ...prev, [id]: true }));
      setSimulating(null);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-6 rounded-3xl border border-green-500/30 text-center w-full shadow-lg shadow-green-500/10"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-1">Profile Verified!</h2>
          <p className="text-green-400 font-medium mb-4 text-sm">Verification Successful</p>
          
          <div className="bg-slate-700/50 rounded-xl p-3 mb-6 text-left space-y-2 border border-slate-600">
            <p className="text-textLight text-xs flex items-center"><CheckCircle2 size={14} className="mr-2 text-green-400" /> Phone Number Verified</p>
            <p className="text-slate-300 text-xs flex items-center"><CheckCircle2 size={14} className="mr-2 text-green-400" /> Documents Approved</p>
            <p className="text-slate-300 text-xs flex items-center"><CheckCircle2 size={14} className="mr-2 text-green-400" /> Blue Tick Badge Assigned</p>
          </div>

          <button
            onClick={onComplete}
            className="w-full bg-primary hover:bg-orange-700 text-white font-bold py-3 rounded-xl flex items-center justify-center transition shadow-md shadow-orange-600/20"
          >
            Done <ArrowRight className="ml-2" size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-700"
      >
        <div className="text-center mb-6">
          <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle size={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Verification Required</h2>
          <p className="text-slate-400 text-xs">Complete your profile to unlock all features.</p>
        </div>

        <div className="space-y-4 mb-8">
          {requirements.map((req) => (
            <div key={req.id} className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex items-center justify-between">
              <span className="font-medium text-textLight">{req.label}</span>
              {uploads[req.id] ? (
                <span className="flex items-center text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={16} className="mr-1" /> Verified
                </span>
              ) : (
                <button
                  onClick={() => handleUpload(req.id)}
                  disabled={simulating !== null}
                  className="flex items-center bg-slate-600 hover:bg-slate-500 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
                >
                  {simulating === req.id ? (
                    <span className="flex items-center">Uploading...</span>
                  ) : (
                    <><Upload size={16} className="mr-2" /> Upload</>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allUploaded}
          className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center ${
            allUploaded 
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20' 
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          Submit Verification
        </button>
      </motion.div>
    </div>
  );
};
