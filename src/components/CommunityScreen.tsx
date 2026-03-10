import React, { useState } from 'react';
import { Send, Image as ImageIcon, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

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
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Create Post */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 shadow-lg">
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white flex-shrink-0">
            Y
          </div>
          <div className="flex-grow">
            <textarea
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Share an update, alert, or thought..."
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center mt-3">
              <button className="text-slate-400 hover:text-orange-400 transition p-2 rounded-full hover:bg-slate-700">
                <ImageIcon size={20} />
              </button>
              <button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl font-medium flex items-center transition shadow-lg shadow-orange-600/20"
              >
                Post <Send size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center font-bold text-white">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 flex items-center">
                      {post.author}
                      <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                        {post.role}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">{post.time}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <p className="text-slate-200 mb-4 whitespace-pre-wrap">{post.content}</p>
              
              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-slate-700">
                  <img src={post.image} alt="Post content" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/50 flex justify-between items-center text-slate-400">
              <button className="flex items-center space-x-1.5 hover:text-red-400 transition group">
                <Heart size={18} className="group-hover:fill-current" />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-blue-400 transition">
                <MessageCircle size={18} />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-green-400 transition">
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
