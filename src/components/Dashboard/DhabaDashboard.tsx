import React, { useState, useEffect } from 'react';
import { Coffee, Users, Star, Utensils, Edit, MapPin, TrendingUp } from 'lucide-react';
import { generateRoleHeroImage } from '../../services/gemini';

export const DhabaDashboard = () => {
  const [bgImage, setBgImage] = useState<string>('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000');

  useEffect(() => {
    const loadBgImage = async () => {
      const cachedImage = localStorage.getItem('dhabaHeroImage');
      if (cachedImage) {
        setBgImage(cachedImage);
      } else {
        const prompt = "Create a attractive header image for Indian dhaba owner app dashboard. Show a busy dhaba on highway at night, glowing lights, tandoor, trucks parked, owner smiling with food plates (paratha, chai, dal makhani), Indian family eating, warm yellow-orange lighting, modern realistic style, welcoming vibe. 16:9 ratio, high quality, no text.";
        const newImage = await generateRoleHeroImage(prompt);
        if (newImage) {
          setBgImage(newImage);
          try {
            localStorage.setItem('dhabaHeroImage', newImage);
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
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Sher-e-Punjab</h2>
          <p className="text-slate-200 text-sm flex items-center mt-1 drop-shadow-md">
            <MapPin size={14} className="mr-1 text-green-400" /> NH44, Murthal
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
          <Star size={14} className="mr-1 fill-current" /> 4.8
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
          <Users size={32} className="text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-slate-900">145</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Footfall Today</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
          <TrendingUp size={32} className="text-green-600 mb-2" />
          <span className="text-2xl font-bold text-slate-900">+12%</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Vs Last Week</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition shadow-md shadow-green-600/20">
          <Utensils size={24} className="mb-2" />
          Update Menu
        </button>
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-4 rounded-2xl font-bold flex flex-col items-center justify-center transition border border-slate-200">
          <Edit size={24} className="mb-2 text-slate-500" />
          Post Offer
        </button>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <Star size={18} className="mr-2 text-yellow-500 fill-current" /> Recent Reviews
          </h3>
          <span className="text-xs text-slate-500">View All</span>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { name: 'Ramesh Driver', rating: 5, text: 'Best parathas on NH44. Clean toilets.', date: '2 hrs ago' },
            { name: 'Suresh Mistri', rating: 4, text: 'Good tea, but parking was full.', date: '5 hrs ago' },
          ].map((review, i) => (
            <div key={i} className="p-4 hover:bg-slate-50 transition">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-900">{review.name}</h4>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className={j < review.rating ? 'fill-current' : 'text-slate-300'} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600 italic">"{review.text}"</p>
              <p className="text-xs text-slate-400 mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Offers */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <Coffee size={18} className="mr-2 text-orange-500" /> Active Offers
          </h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center bg-orange-50 p-3 rounded-xl border border-orange-200">
            <div>
              <h4 className="font-medium text-orange-600 text-sm">Free Chai with Thali</h4>
              <p className="text-xs text-slate-500">Valid till 10 PM tonight</p>
            </div>
            <button className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 transition border border-slate-200">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
