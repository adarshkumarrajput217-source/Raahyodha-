import React from 'react';
import { Wrench, PhoneCall, CheckCircle, Clock, IndianRupee, MapPin } from 'lucide-react';

export const MistriDashboard = () => {
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white">Raju Ustad</h2>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <MapPin size={14} className="mr-1 text-orange-500" /> NH48 Garage, Jaipur
          </p>
        </div>
        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Available
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <Wrench size={32} className="text-orange-400 mb-2" />
          <span className="text-2xl font-bold text-white">12</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Jobs Today</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <IndianRupee size={32} className="text-green-400 mb-2" />
          <span className="text-2xl font-bold text-white">4,500</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Earnings (₹)</span>
        </div>
      </div>

      {/* Active Requests */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <PhoneCall size={18} className="mr-2 text-red-400" /> Emergency Requests
          </h3>
          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full font-bold">2 New</span>
        </div>
        <div className="divide-y divide-slate-700">
          {[
            { id: '#1042', issue: 'Tyre Burst', truck: 'HR 38 X 1234', dist: '5 km away', time: '10 mins ago', urgent: true },
            { id: '#1043', issue: 'Engine Overheating', truck: 'RJ 14 Y 5678', dist: '12 km away', time: '25 mins ago', urgent: false },
          ].map((req, i) => (
            <div key={i} className={`p-4 hover:bg-slate-700/30 transition ${req.urgent ? 'border-l-4 border-red-500' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-slate-200 text-lg">{req.issue}</h4>
                  <p className="text-sm text-slate-400 font-mono">{req.truck}</p>
                </div>
                <span className="text-xs text-slate-500 flex items-center">
                  <Clock size={12} className="mr-1" /> {req.time}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-orange-400 flex items-center">
                  <MapPin size={14} className="mr-1" /> {req.dist}
                </span>
                <div className="space-x-2">
                  <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-sm text-white font-medium transition">Ignore</button>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-sm text-white font-medium transition shadow-lg shadow-green-600/20">Accept</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Jobs */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <CheckCircle size={18} className="mr-2 text-green-400" /> Recent Completed Jobs
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {[
            { issue: 'Brake Pad Replacement', truck: 'PB 08 Z 9012', amount: '₹1,200', date: 'Today, 2:00 PM' },
            { issue: 'Oil Change', truck: 'UP 16 A 3456', amount: '₹800', date: 'Today, 11:30 AM' },
          ].map((job, i) => (
            <div key={i} className="flex justify-between items-center bg-slate-700/30 p-3 rounded-xl border border-slate-600">
              <div>
                <h4 className="font-medium text-slate-200 text-sm">{job.issue}</h4>
                <p className="text-xs text-slate-400">{job.truck} • {job.date}</p>
              </div>
              <span className="font-bold text-green-400">{job.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
