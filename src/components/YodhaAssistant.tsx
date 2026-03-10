import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateAIResponse } from '../services/gemini';

export const YodhaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
  }, [messages, isOpen, isMinimized]);

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
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl z-50 border-2 border-orange-400/50 flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Bot size={32} className="relative z-10" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white animate-pulse">
            AI
          </span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[400px] bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 z-50 overflow-hidden flex flex-col ${isMinimized ? '' : 'max-h-[80vh]'}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">Yodha Assistant</h3>
                  <p className="text-orange-100 text-xs flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                  className="text-orange-100 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  className="text-orange-100 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  {messages.map((msg, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-orange-600 text-white rounded-br-sm' 
                          : 'bg-slate-700 text-slate-200 rounded-bl-sm border border-slate-600 shadow-sm'
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
                      <div className="bg-slate-700 text-slate-300 p-3 rounded-2xl rounded-bl-sm border border-slate-600 flex items-center space-x-2">
                        <Loader2 size={16} className="animate-spin text-orange-400" />
                        <span className="text-xs font-medium">Yodha is typing...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-800 border-t border-slate-700">
                  <div className="flex items-center space-x-2 bg-slate-900 rounded-full border border-slate-600 p-1 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Puchiye kuch bhi..."
                      className="flex-grow bg-transparent text-white placeholder-slate-500 px-4 py-2 focus:outline-none text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:bg-slate-600 text-white p-2 rounded-full transition flex-shrink-0 shadow-md"
                    >
                      <Send size={18} className={input.trim() && !isLoading ? 'translate-x-0.5' : ''} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
