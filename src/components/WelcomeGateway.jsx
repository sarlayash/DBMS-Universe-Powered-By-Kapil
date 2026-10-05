import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Terminal, Database, CheckCircle2, User } from 'lucide-react';
import { signInWithGoogle } from '../services/firebase';

export default function WelcomeGateway({ onEnterApp, onGoogleSignInSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await signInWithGoogle();
      if (res.success && res.user) {
        onGoogleSignInSuccess(res.user);
        onEnterApp();
      } else {
        setErrorMsg(res.error || 'Google sign-in was cancelled or encountered an issue. You can continue as Guest!');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error. You can continue as Guest!');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestEnter = () => {
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full bg-slate-900/90 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl relative z-10 grid grid-cols-1 md:grid-cols-12 my-6">
        {/* Left Column: Authentic Poster Image */}
        <div className="md:col-span-5 bg-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 relative">
          <div className="relative group max-w-xs w-full">
            <img
              src="./kapil-hero.jpg"
              alt="DBMS Zero-To-Infinity | Powered By Kapil"
              className="w-full h-auto rounded-2xl shadow-2xl border-2 border-amber-500/50 object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-amber-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
                ★ SarlaYash Mission Productions
              </span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-slate-400 text-center mt-3">
            Powered By Kapil • Zero-To-Infinity Ecosystem
          </p>
        </div>

        {/* Right Column: Note from Kapil & Sign-In */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Title / Header */}
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>DBMS Zero-To-Infinity</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                A Note From Kapil
              </h1>
              <span className="text-xs font-mono text-slate-400">
                Author & Lead Mentor | SarlaYash Mission Productions
              </span>
            </div>

            {/* Kapil's Note Body */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans space-y-3 max-h-[300px] overflow-y-auto">
              <p>
                <strong>Namaste Learner! Welcome to the DBMS Universe.</strong>
              </p>
              <p>
                When I first began learning databases, every textbook threw dry mathematical definitions, relational calculus symbols, and abstract schemas at me — without ever answering the single question that actually matters:
              </p>
              <p className="p-2.5 bg-amber-950/40 border-l-2 border-amber-500 text-amber-200 font-mono text-xs rounded">
                "Why did databases have to be invented?"
              </p>
              <p>
                In this journey, we do not start with boring slides. We start with a messy collection of real-world files. You will break things. You will see duplicate student fees, race conditions in attendance records, and money disappear in simulated bank transfer crashes.
              </p>
              <p>
                Only when you feel the breakdown of the file system era will you truly appreciate why Edgar Codd, transaction engines, and B-Tree indexes exist.
              </p>
              <p className="font-semibold text-white">
                Our philosophy is simple: <strong>25% Theory + 75% Hands-On</strong>. Zero software to purchase, zero paid licenses, zero barriers.
              </p>
              <div className="pt-2 border-t border-slate-800 text-amber-300 font-mono text-xs italic">
                — Don't just learn databases. Think like a Database Engineer.
              </div>
            </div>
          </div>

          {/* Sign-In & Entry Options */}
          <div className="space-y-3 pt-2">
            {errorMsg && (
              <div className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            {/* Primary Google Sign-In Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition shadow-xl text-sm font-sans disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{loading ? 'Signing In with Google...' : 'Sign In with Google & Enter Universe'}</span>
            </button>

            {/* Offline / Guest Learner Option */}
            <button
              onClick={handleGuestEnter}
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-2xl flex items-center justify-center gap-2 font-mono text-xs transition"
            >
              <span>Continue as Guest Learner (100% Offline Mode)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
