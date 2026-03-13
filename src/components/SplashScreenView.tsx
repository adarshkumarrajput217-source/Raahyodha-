import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds splash screen
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full h-full flex items-center justify-center p-4"
      >
        <img 
          src="/logo.png" 
          alt="Raahyodha Splash" 
          className="w-full max-w-lg h-auto object-contain"
          onError={(e) => {
            // Fallback if they haven't uploaded it yet
            (e.target as HTMLImageElement).src = "/icons/icon-1024x1024.png";
          }}
        />
      </motion.div>
    </div>
  );
};
