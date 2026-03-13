import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Heart, MessageCircle, Share2, MoreHorizontal, Plus, FileText, Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CommunityScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Ramesh Singh',
      role: 'Driver',
      avatar: 'R',
      time: '2 hours ago',
      content: 'Bhaiyo, NH48 par Jaipur ke paas bhari jaam hai. Kripya doosra rasta sochein.',
      likes: 45,
      comments: 12,
      image: null,
    },
    {
      id: 2,
      author: 'Suresh Mistri',
      role: 'Mistri',
      avatar: 'S',
      time: '5 hours ago',
      content: 'Aaj ek truck ka engine theek kiya jo 500km se bina oil change chal raha tha. Maintenance zaroori hai dosto!',
      likes: 120,
      comments: 34,
      image: 'https://picsum.photos/seed/mechanic/600/400',
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const attachmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attachmentRef.current && !attachmentRef.current.contains(event.target as Node)) {
        setShowAttachments(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          author: 'You',
          role: 'User',
          avatar: 'Y',
          time: 'Just now',
          content: newPost,
          likes: 0,
          comments: 0,
          image: null,
        },
        ...posts,
      ]);
      setNewPost('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] md:h-[calc(100vh-70px)] bg-slate-50 relative">
      {/* Feed */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 pb-24 max-w-2xl mx-auto w-full">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 flex items-center">
                      {post.author}
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {post.role}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500">{post.time}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 transition">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <p className="text-slate-800 mb-4 whitespace-pre-wrap text-sm">{post.content}</p>
              
              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-slate-200">
                  <img src={post.image} alt="Post content" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-slate-500">
              <button className="flex items-center space-x-1.5 hover:text-red-500 transition group">
                <Heart size={18} className="group-hover:fill-current" />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-blue-500 transition">
                <MessageCircle size={18} />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-green-500 transition">
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-2xl mx-auto flex items-end gap-2 relative" ref={attachmentRef}>
          {/* Attachment Menu */}
          <AnimatePresence>
            {showAttachments && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-14 left-0 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex gap-2 z-30"
              >
                <button className="flex flex-col items-center justify-center p-3 hover:bg-slate-50 rounded-xl transition-colors min-w-[70px]">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700">File</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 hover:bg-slate-50 rounded-xl transition-colors min-w-[70px]">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <ImageIcon size={20} className="text-purple-600" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700">Gallery</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 hover:bg-slate-50 rounded-xl transition-colors min-w-[70px]">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <Camera size={20} className="text-green-600" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700">Camera</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setShowAttachments(!showAttachments)}
            className={`p-3 rounded-full flex-shrink-0 transition-colors ${showAttachments ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {showAttachments ? <X size={20} /> : <Plus size={20} />}
          </button>
          
          <div className="flex-grow bg-slate-100 rounded-2xl border border-slate-200 flex items-center px-4 py-1 min-h-[48px]">
            <textarea
              className="w-full bg-transparent border-none text-slate-800 placeholder-slate-500 focus:outline-none resize-none py-2 text-sm max-h-[100px]"
              placeholder="Message community..."
              rows={1}
              value={newPost}
              onChange={(e) => {
                setNewPost(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePost();
                }
              }}
            ></textarea>
          </div>
          
          <button
            onClick={handlePost}
            disabled={!newPost.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full flex-shrink-0 transition shadow-sm"
          >
            <Send size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
