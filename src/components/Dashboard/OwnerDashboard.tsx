import React, { useState } from 'react';
import { Building2, Truck, IndianRupee, FileText, PlusCircle, AlertCircle, MapPin, Package, Navigation, ChevronRight, X, Loader2 } from 'lucide-react';
import { postJob } from '../../services/jobs';
import { useAppContext } from '../../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const OwnerDashboard = () => {
  const { user } = useAppContext();
  const [showPostModal, setShowPostModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobForm, setJobForm] = useState({
    role: '',
    company: 'Sharma Transport', // Default or from user profile
    route: '',
    salary: ''
  });

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    
    setLoading(true);
    try {
      await postJob({
        ownerId: user.uid,
        ...jobForm
      });
      setShowPostModal(false);
      setJobForm({ role: '', company: 'Sharma Transport', route: '', salary: '' });
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white">Sharma Transport</h2>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <Building2 size={14} className="mr-1 text-purple-500" /> Fleet Owner, Delhi
          </p>
        </div>
        <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30">
          Premium
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <Truck size={32} className="text-blue-400 mb-2" />
          <span className="text-2xl font-bold text-white">8/10</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Trucks Active</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <IndianRupee size={32} className="text-green-400 mb-2" />
          <span className="text-2xl font-bold text-white">1.2L</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Revenue (Week)</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowPostModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition shadow-lg shadow-purple-600/20"
        >
          <PlusCircle size={24} className="mb-2" />
          Post a Job
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition border border-slate-600">
          <FileText size={24} className="mb-2 text-slate-300" />
          View Expenses
        </button>
      </div>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800 rounded-3xl p-6 w-full max-w-md border border-slate-700 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowPostModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">Post a Driving Job</h2>
              
              <form onSubmit={handlePostJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Job Role</label>
                  <input 
                    type="text" 
                    required
                    value={jobForm.role}
                    onChange={(e) => setJobForm({...jobForm, role: e.target.value})}
                    placeholder="e.g., Long Haul Driver (Trailer)"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Route / Location</label>
                  <input 
                    type="text" 
                    required
                    value={jobForm.route}
                    onChange={(e) => setJobForm({...jobForm, route: e.target.value})}
                    placeholder="e.g., Delhi ↔ Mumbai"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Salary / Pay</label>
                  <input 
                    type="text" 
                    required
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    placeholder="e.g., ₹30,000/mo"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center shadow-lg shadow-purple-600/20 mt-6"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'Post Job'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Available Loads Market */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <Package size={18} className="mr-2 text-blue-400" /> Available Loads Market
          </h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {[
            { from: 'Mumbai', to: 'Delhi', weight: '15 Ton', price: '₹45,000', material: 'Electronics' },
            { from: 'Pune', to: 'Jaipur', weight: '20 Ton', price: '₹55,000', material: 'Textiles' },
          ].map((load, i) => (
            <div key={i} className="bg-slate-700/50 p-3 rounded-xl border border-slate-600">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
                  <span>{load.from}</span>
                  <Navigation size={12} className="text-slate-400" />
                  <span>{load.to}</span>
                </div>
                <span className="text-green-400 font-bold">{load.price}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{load.material} • {load.weight}</span>
                <button className="text-orange-400 font-medium hover:underline">Bid Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Status */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <Truck size={18} className="mr-2 text-blue-400" /> Fleet Status
          </h3>
          <span className="text-xs text-slate-400">View All</span>
        </div>
        <div className="divide-y divide-slate-700">
          {[
            { id: 'DL 1M 1234', driver: 'Ramesh', status: 'On Route', loc: 'Jaipur', delay: false },
            { id: 'HR 38 X 5678', driver: 'Suresh', status: 'Delayed', loc: 'Surat', delay: true },
            { id: 'UP 16 Z 9012', driver: 'Mukesh', status: 'Idle', loc: 'Delhi', delay: false },
          ].map((truck, i) => (
            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-700/30 transition">
              <div>
                <h4 className="font-semibold text-slate-200 font-mono text-lg">{truck.id}</h4>
                <p className="text-sm text-slate-400 flex items-center">
                  Driver: {truck.driver} • <MapPin size={12} className="mx-1" /> {truck.loc}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  truck.status === 'On Route' ? 'bg-green-500/20 text-green-400' :
                  truck.status === 'Delayed' ? 'bg-red-500/20 text-red-400 flex items-center' :
                  'bg-slate-600/50 text-slate-300'
                }`}>
                  {truck.delay && <AlertCircle size={12} className="mr-1" />}
                  {truck.status}
                </span>
                <button className="block mt-2 text-xs text-blue-400 hover:underline font-medium">Track GPS</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
