import React, { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Job } from '../services/jobs';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeJobs: 0,
    totalAlerts: 0
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In a real app, we'd fetch users from a 'users' collection
        // For now, we'll simulate user count and fetch real jobs
        const jobsSnapshot = await getDocs(collection(db, 'jobs'));
        const fetchedJobs: Job[] = [];
        jobsSnapshot.forEach(doc => {
          fetchedJobs.push({ id: doc.id, ...doc.data() } as Job);
        });

        setJobs(fetchedJobs);
        setStats({
          totalUsers: 145, // Simulated
          activeJobs: fetchedJobs.length,
          totalAlerts: 12 // Simulated
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <ShieldCheck className="mr-3 text-orange-500" size={32} />
            Admin Control Panel
          </h1>
          <p className="text-slate-400 mt-1">Manage users, jobs, and platform health</p>
        </div>
        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold flex items-center border border-green-500/30">
          <Activity size={18} className="mr-2 animate-pulse" /> System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Users</p>
              <h3 className="text-4xl font-bold text-white mt-2">{stats.totalUsers}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users size={24} className="text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Jobs</p>
              <h3 className="text-4xl font-bold text-white mt-2">{stats.activeJobs}</h3>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Briefcase size={24} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Alerts</p>
              <h3 className="text-4xl font-bold text-white mt-2">{stats.totalAlerts}</h3>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg mt-8">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FileText className="mr-2 text-purple-400" size={24} />
            Recent Job Postings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Route</th>
                <th className="p-4 font-medium">Salary</th>
                <th className="p-4 font-medium text-center">Applicants</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No jobs posted yet.</td>
                </tr>
              ) : (
                jobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-700/30 transition">
                    <td className="p-4 text-white font-medium">{job.role}</td>
                    <td className="p-4 text-slate-300">{job.company}</td>
                    <td className="p-4 text-slate-300">{job.route}</td>
                    <td className="p-4 text-green-400 font-medium">{job.salary}</td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold">
                        {job.applicants?.length || 0}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        job.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-300'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
