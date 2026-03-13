import React, { useState, useEffect } from 'react';
import { Wrench, PhoneCall, CheckCircle, Clock, IndianRupee, MapPin } from 'lucide-react';
import { generateRoleHeroImage } from '../../services/gemini';

export const MistriDashboard = () => {
  const [bgImage, setBgImage] = useState<string>('https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1000');

  useEffect(() => {
    const loadBgImage = async () => {
      const cachedImage = localStorage.getItem('mistriHeroImage');
      if (cachedImage) {
        setBgImage(cachedImage);
      } else {
        const prompt = "High-quality hero banner for Indian garage mechanic mistri app dashboard. Show a skilled Indian mechanic (mistri) in garage, fixing truck engine, tools around, happy customer truck driver, clean modern garage with Indian elements (Hanuman photo, tea kettle), blue-black tones with red accents for energy. Realistic, professional, 16:9, no text on image.";
        const newImage = await generateRoleHeroImage(prompt);
        if (newImage) {
          setBgImage(newImage);
          try {
            localStorage.setItem('mistriHeroImage', newImage);
          } catch (e) {
            console.warn('Could not save image to localStorage');
          }
        }
      }
    };
    loadBgImage();
  }, []);

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Hero Image */}
      <div 
        className="w-full h-48 rounded-2xl bg-slate-800 bg-cover bg-center shadow-lg border border-slate-700 relative overflow-hidden transition-all duration-1000"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Raju Ustad</h2>
          <p className="text-slate-200 text-sm flex items-center mt-1 drop-shadow-md">
            <MapPin size={14} className="mr-1 text-orange-400" /> NH48 Garage, Jaipur
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Available
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
          <Wrench size={32} className="text-orange-500 mb-2" />
          <span className="text-2xl font-bold text-slate-900">12</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Jobs Today</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
          <IndianRupee size={32} className="text-green-600 mb-2" />
          <span className="text-2xl font-bold text-slate-900">4,500</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Earnings (₹)</span>
        </div>
      </div>

      {/* Active Requests */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <PhoneCall size={18} className="mr-2 text-red-500" /> Emergency Requests
          </h3>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold border border-red-200">2 New</span>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { id: '#1042', issue: 'Tyre Burst', truck: 'HR 38 X 1234', dist: '5 km away', time: '10 mins ago', urgent: true },
            { id: '#1043', issue: 'Engine Overheating', truck: 'RJ 14 Y 5678', dist: '12 km away', time: '25 mins ago', urgent: false },
          ].map((req, i) => (
            <div key={i} className={`p-4 hover:bg-slate-50 transition ${req.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-slate-900 text-lg">{req.issue}</h4>
                  <p className="text-sm text-slate-500 font-mono">{req.truck}</p>
                </div>
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock size={12} className="mr-1" /> {req.time}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-orange-600 flex items-center">
                  <MapPin size={14} className="mr-1" /> {req.dist}
                </span>
                <div className="space-x-2">
                  <button className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-700 font-medium transition border border-slate-200">Ignore</button>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-sm text-white font-medium transition shadow-md shadow-green-600/20">Accept</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Jobs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <CheckCircle size={18} className="mr-2 text-green-500" /> Recent Completed Jobs
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {[
            { issue: 'Brake Pad Replacement', truck: 'PB 08 Z 9012', amount: '₹1,200', date: 'Today, 2:00 PM' },
            { issue: 'Oil Change', truck: 'UP 16 A 3456', amount: '₹800', date: 'Today, 11:30 AM' },
          ].map((job, i) => (
            <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <h4 className="font-medium text-slate-900 text-sm">{job.issue}</h4>
                <p className="text-xs text-slate-500">{job.truck} • {job.date}</p>
              </div>
              <span className="font-bold text-green-600">{job.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
