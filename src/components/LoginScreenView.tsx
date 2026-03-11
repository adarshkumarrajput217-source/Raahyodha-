import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Lock, ArrowRight, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { auth } from '../services/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export const LoginScreen = ({ onLogin }: { onLogin: (phone: string, uid: string) => void }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Debug info
  const isConfigMissing = !auth || !auth.app || !auth.app.options.apiKey || auth.app.options.apiKey === 'mock-api-key' || auth.app.options.apiKey === '';

  useEffect(() => {
    if (isConfigMissing || !auth) return;
    
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        }
      });
    }
  }, [isConfigMissing]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formattedPhone = `+91${phone}`;
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setStep('otp');
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      
      if (err.code === 'auth/captcha-check-failed' || err.message?.includes('captcha-check-failed')) {
        setError(`Hostname match not found. Please add this exact domain to Firebase Authorized Domains: ${window.location.hostname}`);
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6 || !confirmationResult) {
      setError('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await confirmationResult.confirm(otp);
      onLogin(phone, result.user.uid);
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 relative overflow-hidden">
      <div id="recaptcha-container"></div>
      
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none"></div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to <span className="text-orange-400">Raahyodha</span></h2>
          <p className="text-slate-400">Log in to continue your journey</p>
        </div>

        {isConfigMissing && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm flex flex-col items-center text-center">
            <AlertTriangle className="mb-2 h-6 w-6" />
            <p className="font-bold mb-1">Firebase Configuration Missing</p>
            <p>Please add your Firebase credentials to the AI Studio Environment Variables (Settings menu) or create a .env file.</p>
            <p className="mt-2 text-xs opacity-80">Variables needed: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-4 pl-14 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg tracking-wider"
                  placeholder="Enter 10 digit number"
                  required
                  disabled={isConfigMissing}
                />
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || phone.length < 10 || isConfigMissing}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center shadow-lg shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <><span className="mr-2">Send OTP</span> <ArrowRight size={20} /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Enter OTP</label>
              <p className="text-xs text-slate-400 mb-4">Sent to +91 {phone} <button type="button" onClick={() => setStep('phone')} className="text-orange-400 hover:underline ml-1">Edit</button></p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-4 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-[0.5em] font-mono"
                  placeholder="------"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <><ShieldCheck className="mr-2" size={20} /> Verify & Login</>}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
