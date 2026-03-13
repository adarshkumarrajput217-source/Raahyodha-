import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Music, Plus, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

export const ShortsScreen = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const videos = [
    {
      id: 1,
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      author: '@RameshDriver',
      desc: 'NH48 par subah ka nazara! Drive safe dosto. #TruckLife #Raahyodha',
      likes: '12.4K',
      comments: '342',
      music: 'Original Sound - Ramesh',
    },
    {
      id: 2,
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      author: '@SureshMistri',
      desc: 'Engine overheating problem solved in 5 mins! #MechanicTips',
      likes: '8.2K',
      comments: '156',
      music: 'Trending Tune - Yodha',
    },
  ];

  return (
    <div className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] w-full bg-black overflow-hidden flex flex-col snap-y snap-mandatory">
      {/* Top Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <h2 className="text-xl font-heading font-bold text-white tracking-wider">Yodha Shorts</h2>
        <button className="bg-primary hover:bg-orange-700 text-white p-2 rounded-full transition shadow-lg shadow-orange-600/30">
          <Plus size={24} />
        </button>
      </div>

      {/* Video Feed */}
      <div className="flex-grow overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative">
        {videos.map((video, index) => (
          <div key={video.id} className="h-full w-full snap-start snap-always relative bg-darkBg flex items-center justify-center">
            {/* Simulated Video Player */}
            <video
              className="h-full w-full object-cover"
              src={video.url}
              autoPlay={index === activeVideo}
              loop
              muted={false}
              playsInline
              onClick={(e) => {
                const target = e.target as HTMLVideoElement;
                if (target.paused) target.play();
                else target.pause();
              }}
            />

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 z-10">
              <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-white overflow-hidden relative">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.author}`} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary rounded-full p-0.5">
                  <Plus size={12} className="text-white" />
                </div>
              </div>

              <button className="flex flex-col items-center group">
                <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm group-hover:bg-black/60 transition">
                  <Heart size={28} className="text-white group-hover:text-red-500 transition-colors" />
                </div>
                <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{video.likes}</span>
              </button>

              <button className="flex flex-col items-center group">
                <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm group-hover:bg-black/60 transition">
                  <MessageCircle size={28} className="text-white" />
                </div>
                <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">{video.comments}</span>
              </button>

              <button className="flex flex-col items-center group">
                <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm group-hover:bg-black/60 transition">
                  <Share2 size={28} className="text-white" />
                </div>
                <span className="text-white text-xs font-semibold mt-1 drop-shadow-md">Share</span>
              </button>

              <button className="flex flex-col items-center group">
                <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm group-hover:bg-black/60 transition">
                  <MoreVertical size={28} className="text-white" />
                </div>
              </button>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pb-20 md:pb-4">
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">{video.author}</h3>
              <p className="text-white text-sm mb-3 drop-shadow-md max-w-[80%] line-clamp-2">{video.desc}</p>
              <div className="flex items-center text-white text-sm font-medium bg-black/30 w-max px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <Music size={14} className="mr-2 animate-spin-slow" />
                <span className="truncate max-w-[150px]">{video.music}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
