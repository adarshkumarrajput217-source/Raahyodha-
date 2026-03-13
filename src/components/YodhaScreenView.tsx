import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { generateAIResponse } from '../services/gemini';

export const YodhaScreen = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'Namaste Yodha! Main aapka AI Assistant hoon. Raste ki jankari, dhaba, ya health tips chahiye? Puchiye!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const aiResponse = await generateAIResponse(userMessage);
    
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 flex items-center shadow-md z-10">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm mr-3">
          <Bot size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg leading-tight">Yodha Assistant</h3>
          <p className="text-orange-100 text-xs flex items-center">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span> Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-100 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <motion.div
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] md:max-w-[70%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-orange-500 text-white rounded-br-sm shadow-md' 
                : 'bg-white text-slate-800 rounded-bl-sm border border-slate-200 shadow-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white text-slate-800 p-3 rounded-2xl rounded-bl-sm border border-slate-200 flex items-center space-x-2 shadow-sm">
              <Loader2 size={16} className="animate-spin text-orange-500" />
              <span className="text-xs font-medium text-slate-500">Yodha is typing...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <div className="flex items-center space-x-2 bg-slate-100 rounded-full border border-slate-200 p-1 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Puchiye kuch bhi..."
            className="flex-grow bg-transparent text-slate-800 placeholder-slate-500 px-4 py-2 focus:outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:bg-slate-400 text-white p-2 rounded-full transition flex-shrink-0 shadow-md"
          >
            <Send size={18} className={input.trim() && !isLoading ? 'translate-x-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};
