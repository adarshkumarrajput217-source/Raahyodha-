import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Coffee, AlertTriangle, Navigation, Package, ChevronRight, MessageSquare, Briefcase, Loader2, CheckCircle2, Search, HeartPulse, Users, Car, FileText, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { generateAIResponse } from '../../services/gemini';
import { subscribeToJobs, applyForJob, Job } from '../../services/jobs';
import { useAppContext } from '../../store/AppContext';
import { ChallanCheckModal } from '../ChallanCheckModal';
import { RCCheckModal } from '../RCCheckModal';

export const DriverDashboard = () => {
  const { user, t } = useAppContext();
  const [motivationalTip, setMotivationalTip] = useState('Loading tip...');
  const [loadingTip, setLoadingTip] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);
  const [isRCModalOpen, setIsRCModalOpen] = useState(false);

  const allDhabas = [
    { name: 'Sher-e-Punjab Dhaba', dist: '2.5 km', rating: 4.5, type: 'Veg/Non-Veg' },
    { name: 'Rao Hotel', dist: '5.1 km', rating: 4.2, type: 'Pure Veg' },
  ];

  const filteredDhabas = allDhabas.filter(dhaba => 
    dhaba.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dhaba.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(job => 
    job.role?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.route?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchTip = async () => {
      setLoadingTip(true);
      const cachedTip = localStorage.getItem('driverMotivationalTip');
      const cachedTime = localStorage.getItem('driverMotivationalTipTime');
      
      // Use cached tip if it's less than 24 hours old
      if (cachedTip && cachedTime && (Date.now() - parseInt(cachedTime)) < 24 * 60 * 60 * 1000) {
        setMotivationalTip(cachedTip);
        setLoadingTip(false);
        return;
      }

      const tip = await generateAIResponse('Give a short, 1-sentence motivational and safety tip for an Indian truck driver in Hindi (Devanagari script) and English mix.');
      
      // Only cache if it's not an error message
      if (!tip.includes('Network error') && !tip.includes('Quota Exceeded') && !tip.includes('limit khatam')) {
        localStorage.setItem('driverMotivationalTip', tip);
        localStorage.setItem('driverMotivationalTipTime', Date.now().toString());
      }
      
      setMotivationalTip(tip);
      setLoadingTip(false);
    };
    fetchTip();

    // Subscribe to real-time jobs
    const unsubscribe = subscribeToJobs((fetchedJobs) => {
      setJobs(fetchedJobs);
    });

    return () => unsubscribe();
  }, []);

  const handleApply = async (jobId: string) => {
    if (!user?.uid) return;
    setApplyingTo(jobId);
    try {
      await applyForJob(jobId, user.uid);
      // Optimistic update handled by onSnapshot
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("Failed to apply. Please try again.");
    } finally {
      setApplyingTo(null);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Banner Image with Header Inside */}
      <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&q=80&w=1000" 
          alt="Indian Truck Driver Banner" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 flex flex-col justify-between p-4">
          {/* Top Section: Namaste & On Duty */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white drop-shadow-md">Namaste, Yodha!</h2>
              <p className="text-white/90 text-sm flex items-center mt-0.5 drop-shadow-md">
                <MapPin size={14} className="mr-1 text-orange-400" /> Delhi to Mumbai (NH48)
              </p>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm text-green-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-400/30 flex items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
              On Duty
            </div>
          </div>

          {/* Motivational Tip (Compact & Inside Banner) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm pb-1"
          >
            <h3 className="text-orange-400 font-semibold mb-1 flex items-center text-[10px] uppercase tracking-wider drop-shadow-md">
              <MessageSquare size={12} className="mr-1.5" /> Yodha Tip of the Day
            </h3>
            <p className="text-white/90 text-xs leading-snug relative z-10 line-clamp-2 italic drop-shadow-md">
              {loadingTip ? 'Loading tip...' : `"${motivationalTip}"`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Clock size={20} className="text-blue-500" />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-900 leading-none mb-0.5">04:30</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">Driving Time</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 relative overflow-hidden shadow-sm">
          <div className="absolute inset-y-0 left-0 w-1 bg-red-500"></div>
          <div className="bg-red-50 p-2 rounded-lg ml-1">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-900 leading-none mb-0.5">30 min</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">Break Due In</span>
          </div>
        </div>
      </div>

      {/* Nearby Dhabas */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <Coffee size={18} className="mr-2 text-orange-500" /> Nearby Dhabas
          </h3>
          <button className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center">
            View Map <ChevronRight size={14} />
          </button>
        </div>
        <div className="divide-y divide-slate-200">
          {filteredDhabas.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">No dhabas found.</div>
          ) : (
            filteredDhabas.map((dhaba, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition cursor-pointer">
                <div>
                  <h4 className="font-semibold text-slate-900">{dhaba.name}</h4>
                  <p className="text-xs text-slate-500">{dhaba.type} • ⭐ {dhaba.rating}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-green-600">{dhaba.dist}</span>
                  <button className="block mt-1 text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 font-medium">Navigate</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Driving Jobs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center">
            <Briefcase size={18} className="mr-2 text-blue-500" /> Available Driving Jobs
          </h3>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-slate-500 py-4">No jobs found.</div>
          ) : (
            filteredJobs.map((job) => {
              const hasApplied = user?.uid ? job.applicants?.includes(user.uid) : false;
              return (
                <div key={job.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{job.role}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-bold text-sm block">{job.salary}</span>
                      {job.netEarnings && <span className="text-[10px] text-slate-500">Net: {job.netEarnings}</span>}
                    </div>
                  </div>
                  {job.vehicleType && (
                    <div className="flex items-center text-xs text-slate-600 mb-2 bg-slate-100 px-2 py-1 rounded w-fit">
                      <Truck size={12} className="mr-1" /> {job.vehicleType}
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                    <span className="flex items-center"><MapPin size={12} className="mr-1" /> {job.route}</span>
                    <button 
                      onClick={() => job.id && handleApply(job.id)}
                      disabled={hasApplied || applyingTo === job.id}
                      className={`font-medium flex items-center ${
                        hasApplied ? 'text-green-600 cursor-default' : 
                        applyingTo === job.id ? 'text-orange-400 cursor-not-allowed' : 
                        'text-orange-600 hover:underline'
                      }`}
                    >
                      {applyingTo === job.id ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
                      {hasApplied ? <><CheckCircle2 size={14} className="mr-1" /> Applied</> : 'Apply Now'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Vehicle Related Services */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative opacity-90 mt-6">
        <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center text-sm">
            <Car size={16} className="mr-2 text-indigo-500" /> Vehicle Related Services
          </h3>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Coming Soon</span>
        </div>
        <div className="grid grid-cols-2 gap-[1px] bg-slate-100">
          <button 
            onClick={() => setIsChallanModalOpen(true)}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 transition-colors"
          >
            <FileText size={24} className="text-orange-500 mb-2" />
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">Check<br/>Challan</span>
          </button>
          <button 
            onClick={() => setIsRCModalOpen(true)}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 transition-colors"
          >
            <CreditCard size={24} className="text-blue-500 mb-2" />
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">Check<br/>RC</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white opacity-50 cursor-not-allowed relative">
            <ShieldCheck size={24} className="text-green-500 mb-2" />
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">Check<br/>Licence</span>
            <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Soon</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white opacity-50 cursor-not-allowed relative">
            <HeartPulse size={24} className="text-red-500 mb-2" />
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">Yodha Loans<br/>& Life Beema</span>
            <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Soon</span>
          </button>
        </div>
      </div>

      {/* Challan Modal */}
      <AnimatePresence>
        {isChallanModalOpen && (
          <ChallanCheckModal isOpen={isChallanModalOpen} onClose={() => setIsChallanModalOpen(false)} />
        )}
        {isRCModalOpen && (
          <RCCheckModal isOpen={isRCModalOpen} onClose={() => setIsRCModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
