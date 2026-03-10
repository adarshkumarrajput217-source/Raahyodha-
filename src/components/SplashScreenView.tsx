import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Truck, ShieldCheck } from 'lucide-react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // Increased to 5 seconds to allow reading the quote
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-night-highway-with-cars-and-trucks-driving-32628-large.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-lg mx-auto">
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
          <div className="relative bg-slate-900/80 p-6 rounded-full border-2 border-orange-500 backdrop-blur-sm shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            <Truck size={70} className="text-white" />
            <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-2 border-slate-900">
              <ShieldCheck size={20} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="space-y-2"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400 drop-shadow-lg">
            राहयोद्धा
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-slate-300 tracking-widest uppercase">
            Raahyodha
          </h2>
        </motion.div>

        {/* The requested Hindi quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-10 w-full"
        >
          <div className="bg-black/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold text-orange-400 leading-tight mb-2"
            >
              "इंडियन ड्राइवर्स"
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-xl md:text-2xl font-semibold text-white"
            >
              देश के आंतरिक सिपाही हैं
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="text-xs text-slate-400 mt-4 uppercase tracking-widest"
            >
              The Internal Soldiers of the Nation
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
