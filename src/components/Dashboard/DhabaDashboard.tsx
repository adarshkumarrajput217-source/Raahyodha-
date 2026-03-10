import React from 'react';
import { Coffee, Users, Star, Utensils, Edit, MapPin, TrendingUp } from 'lucide-react';

export const DhabaDashboard = () => {
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white">Sher-e-Punjab</h2>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <MapPin size={14} className="mr-1 text-green-500" /> NH44, Murthal
          </p>
        </div>
        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30 flex items-center">
          <Star size={14} className="mr-1 fill-current" /> 4.8
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <Users size={32} className="text-blue-400 mb-2" />
          <span className="text-2xl font-bold text-white">145</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Footfall Today</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <TrendingUp size={32} className="text-green-400 mb-2" />
          <span className="text-2xl font-bold text-white">+12%</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Vs Last Week</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition shadow-lg shadow-green-600/20">
          <Utensils size={24} className="mb-2" />
          Update Menu
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition border border-slate-600">
          <Edit size={24} className="mb-2 text-slate-300" />
          Post Offer
        </button>
      </div>

      {/* Recent Reviews */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <Star size={18} className="mr-2 text-yellow-400 fill-current" /> Recent Reviews
          </h3>
          <span className="text-xs text-slate-400">View All</span>
        </div>
        <div className="divide-y divide-slate-700">
          {[
            { name: 'Ramesh Driver', rating: 5, text: 'Best parathas on NH44. Clean toilets.', date: '2 hrs ago' },
            { name: 'Suresh Mistri', rating: 4, text: 'Good tea, but parking was full.', date: '5 hrs ago' },
          ].map((review, i) => (
            <div key={i} className="p-4 hover:bg-slate-700/30 transition">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-200">{review.name}</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className={j < review.rating ? 'fill-current' : 'text-slate-600'} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-400 italic">"{review.text}"</p>
              <p className="text-xs text-slate-500 mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Offers */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <Coffee size={18} className="mr-2 text-orange-400" /> Active Offers
          </h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center bg-orange-500/10 p-3 rounded-xl border border-orange-500/30">
            <div>
              <h4 className="font-medium text-orange-400 text-sm">Free Chai with Thali</h4>
              <p className="text-xs text-slate-400">Valid till 10 PM tonight</p>
            </div>
            <button className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300 transition">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
