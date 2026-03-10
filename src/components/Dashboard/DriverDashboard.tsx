import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Coffee, AlertTriangle, Navigation, Package, ChevronRight, MessageSquare, Briefcase, Loader2, CheckCircle2 } from 'lucide-react';
import { generateAIResponse } from '../../services/gemini';
import { subscribeToJobs, applyForJob, Job } from '../../services/jobs';
import { useAppContext } from '../../store/AppContext';

export const DriverDashboard = () => {
  const { user } = useAppContext();
  const [motivationalTip, setMotivationalTip] = useState('Loading tip...');
  const [loadingTip, setLoadingTip] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  useEffect(() => {
    const fetchTip = async () => {
      setLoadingTip(true);
      const tip = await generateAIResponse('Give a short, 1-sentence motivational and safety tip for an Indian truck driver in Hindi (Devanagari script) and English mix.');
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
      {/* Header Section */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white">Namaste, Yodha!</h2>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <MapPin size={14} className="mr-1 text-orange-500" /> Delhi to Mumbai (NH48)
          </p>
        </div>
        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          On Duty
        </div>
      </div>

      {/* Motivational Tip from Gemini */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600/20 to-orange-500/10 border border-orange-500/30 p-4 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h3 className="text-orange-400 font-semibold mb-2 flex items-center text-sm uppercase tracking-wider">
          <MessageSquare size={16} className="mr-2" /> Yodha Tip of the Day
        </h3>
        <p className="text-slate-200 italic leading-relaxed">
          {loadingTip ? '...' : `"${motivationalTip}"`}
        </p>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <Clock size={32} className="text-blue-400 mb-2" />
          <span className="text-2xl font-bold text-white">04:30</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Driving Time</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500"></div>
          <AlertTriangle size={32} className="text-red-400 mb-2" />
          <span className="text-2xl font-bold text-white">30 min</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Break Due In</span>
        </div>
      </div>

      {/* Nearby Dhabas */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <Coffee size={18} className="mr-2 text-orange-400" /> Nearby Dhabas
          </h3>
          <button className="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center">
            View Map <ChevronRight size={14} />
          </button>
        </div>
        <div className="divide-y divide-slate-700">
          {[
            { name: 'Sher-e-Punjab Dhaba', dist: '2.5 km', rating: 4.5, type: 'Veg/Non-Veg' },
            { name: 'Rao Hotel', dist: '5.1 km', rating: 4.2, type: 'Pure Veg' },
          ].map((dhaba, i) => (
            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-700/30 transition cursor-pointer">
              <div>
                <h4 className="font-semibold text-slate-200">{dhaba.name}</h4>
                <p className="text-xs text-slate-400">{dhaba.type} • ⭐ {dhaba.rating}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-green-400">{dhaba.dist}</span>
                <button className="block mt-1 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300">Navigate</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Driving Jobs */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white flex items-center">
            <Briefcase size={18} className="mr-2 text-blue-400" /> Available Driving Jobs
          </h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {jobs.length === 0 ? (
            <div className="text-center text-slate-400 py-4">No jobs available right now.</div>
          ) : (
            jobs.map((job) => {
              const hasApplied = user?.uid ? job.applicants?.includes(user.uid) : false;
              return (
                <div key={job.id} className="bg-slate-700/50 p-3 rounded-xl border border-slate-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{job.role}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{job.company}</p>
                    </div>
                    <span className="text-green-400 font-bold text-sm">{job.salary}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span className="flex items-center"><MapPin size={12} className="mr-1" /> {job.route}</span>
                    <button 
                      onClick={() => job.id && handleApply(job.id)}
                      disabled={hasApplied || applyingTo === job.id}
                      className={`font-medium flex items-center ${
                        hasApplied ? 'text-green-400 cursor-default' : 
                        applyingTo === job.id ? 'text-orange-400/50 cursor-not-allowed' : 
                        'text-orange-400 hover:underline'
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
    </div>
  );
};
