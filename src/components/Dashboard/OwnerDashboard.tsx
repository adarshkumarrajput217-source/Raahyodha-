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
    salary: '',
    vehicleType: '',
    netEarnings: ''
  });

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    
    try {
      await postJob({
        ownerId: user.uid,
        ...jobForm
      });
      setShowPostModal(false);
      setJobForm({ role: '', company: 'Sharma Transport', route: '', salary: '', vehicleType: '', netEarnings: '' });
      // alert("Job posted successfully!"); // Removed alert for a smoother experience
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sharma Transport</h2>
          <p className="text-slate-500 text-sm flex items-center mt-1">
            <Building2 size={14} className="mr-1 text-purple-600" /> Fleet Owner, Delhi
          </p>
        </div>
        <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold border border-purple-200">
          Premium
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
          <Truck size={32} className="text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-slate-900">8/10</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Trucks Active</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
          <IndianRupee size={32} className="text-green-600 mb-2" />
          <span className="text-2xl font-bold text-slate-900">1.2L</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Revenue (Week)</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowPostModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition shadow-md shadow-purple-600/20"
        >
          <PlusCircle size={24} className="mb-2" />
          Post a Job
        </button>
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition border border-slate-200">
          <FileText size={24} className="mb-2 text-slate-500" />
          View Expenses
        </button>
      </div>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowPostModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Post a Driving Job</h2>
              
              <form onSubmit={handlePostJob} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Job Role</label>
                    <input 
                      type="text" 
                      required
                      value={jobForm.role}
                      onChange={(e) => setJobForm({...jobForm, role: e.target.value})}
                      placeholder="e.g., Long Haul Driver"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                    <input 
                      type="text" 
                      required
                      value={jobForm.vehicleType}
                      onChange={(e) => setJobForm({...jobForm, vehicleType: e.target.value})}
                      placeholder="e.g., 18-Wheeler Trailer"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Route / Location</label>
                  <input 
                    type="text" 
                    required
                    value={jobForm.route}
                    onChange={(e) => setJobForm({...jobForm, route: e.target.value})}
                    placeholder="e.g., Delhi ↔ Mumbai"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Base Salary</label>
                    <input 
                      type="text" 
                      required
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      placeholder="e.g., ₹30,000/mo"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Net Earnings (Est.)</label>
                    <input 
                      type="text" 
                      required
                      value={jobForm.netEarnings}
                      onChange={(e) => setJobForm({...jobForm, netEarnings: e.target.value})}
                      placeholder="e.g., ₹45,000/mo"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center shadow-md shadow-purple-600/20 mt-6"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'Post Job'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Available Loads Market */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <Package size={18} className="mr-2 text-blue-500" /> Available Loads Market
          </h3>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {[
            { from: 'Mumbai', to: 'Delhi', weight: '15 Ton', price: '₹45,000', material: 'Electronics' },
            { from: 'Pune', to: 'Jaipur', weight: '20 Ton', price: '₹55,000', material: 'Textiles' },
          ].map((load, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                  <span>{load.from}</span>
                  <Navigation size={12} className="text-slate-400" />
                  <span>{load.to}</span>
                </div>
                <span className="text-green-600 font-bold">{load.price}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{load.material} • {load.weight}</span>
                <button className="text-orange-600 font-medium hover:underline">Bid Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Status */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <Truck size={18} className="mr-2 text-blue-500" /> Fleet Status
          </h3>
          <span className="text-xs text-slate-500">View All</span>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { id: 'DL 1M 1234', driver: 'Ramesh', status: 'On Route', loc: 'Jaipur', delay: false },
            { id: 'HR 38 X 5678', driver: 'Suresh', status: 'Delayed', loc: 'Surat', delay: true },
            { id: 'UP 16 Z 9012', driver: 'Mukesh', status: 'Idle', loc: 'Delhi', delay: false },
          ].map((truck, i) => (
            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
              <div>
                <h4 className="font-semibold text-slate-900 font-mono text-lg">{truck.id}</h4>
                <p className="text-sm text-slate-500 flex items-center">
                  Driver: {truck.driver} • <MapPin size={12} className="mx-1" /> {truck.loc}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  truck.status === 'On Route' ? 'bg-green-100 text-green-700' :
                  truck.status === 'Delayed' ? 'bg-red-100 text-red-700 flex items-center' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {truck.delay && <AlertCircle size={12} className="mr-1" />}
                  {truck.status}
                </span>
                <button className="block mt-2 text-xs text-blue-600 hover:underline font-medium">Track GPS</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
