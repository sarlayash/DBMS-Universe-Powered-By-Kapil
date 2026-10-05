import React, { useState } from 'react';
import { X, CheckCircle2, User, Sparkles, ShieldCheck, AlertCircle, LogOut } from 'lucide-react';
import { signInWithGoogle, logoutUser } from '../services/firebase';

export default function GoogleAuthModal({ isOpen, onClose, currentProfile, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [customName, setCustomName] = useState(currentProfile?.name || "Kapil's Learner");
  const [customEmail, setCustomEmail] = useState(currentProfile?.email || 'learner@sarlayash.edu');

  if (!isOpen) return null;

  const demoAccounts = [
    {
      id: 'user1',
      name: 'Kapil (Database Engineer)',
      email: 'kapil@sarlayash.com',
      avatar: 'K',
      bgColor: 'bg-blue-600'
    },
    {
      id: 'user2',
      name: 'Aarav Sharma (B.Tech CSE)',
      email: 'aarav.sharma@college.edu',
      avatar: 'A',
      bgColor: 'bg-emerald-600'
    },
    {
      id: 'user3',
      name: 'Priya Patel (Placement Aspirant)',
      email: 'priya.patel@aspirant.io',
      avatar: 'P',
      bgColor: 'bg-purple-600'
    }
  ];

  const handleFirebaseGoogleLogin = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await signInWithGoogle();
      if (res.success && res.user) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setAuthError(res.error || 'Google Sign-In was cancelled or failed.');
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAccount = (acc) => {
    const updated = {
      name: acc.name,
      email: acc.email,
      learningId: `SY-DBMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: acc.avatar,
      isGoogleAuth: true
    };
    onLoginSuccess(updated);
    onClose();
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    const updated = {
      name: customName,
      email: customEmail,
      learningId: `SY-DBMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: customName[0]?.toUpperCase() || 'U',
      isGoogleAuth: true
    };
    onLoginSuccess(updated);
    onClose();
  };

  const handleLogout = async () => {
    await logoutUser();
    onLoginSuccess({
      name: "Kapil's Learner",
      email: 'learner@sarlayash.edu',
      learningId: `SY-DBMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: 'K',
      isGoogleAuth: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            {/* Google G logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google Authentication</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Sign in with Google to synchronize your Zero-To-Infinity progress, badges, and verified industry certificates across devices.
          </p>

          {/* Primary Action: Real Firebase Google Sign-In Button */}
          <button
            onClick={handleFirebaseGoogleLogin}
            disabled={loading}
            className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2.5 transition shadow-lg text-xs font-sans disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{loading ? 'Opening Google Sign-In...' : 'Continue with Google Account'}</span>
          </button>

          {authError && (
            <div className="p-2.5 bg-red-950/60 border border-red-800 rounded-lg text-red-300 text-[11px] flex items-start gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <span className="relative bg-slate-900 px-2 text-[10px] text-slate-500 uppercase">Or Offline Profile Picker</span>
          </div>

          {/* Quick Account Picker (Offline / Dev Fallback) */}
          <div className="space-y-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.id}
                onClick={() => handleSelectAccount(acc)}
                className="w-full p-2 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl flex items-center gap-3 transition text-left"
              >
                <div className={`w-7 h-7 rounded-full ${acc.bgColor} flex items-center justify-center font-bold text-white text-xs`}>
                  {acc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold truncate">{acc.name}</div>
                  <div className="text-slate-500 text-[10px] truncate">{acc.email}</div>
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 hover:text-blue-400" />
              </button>
            ))}
          </div>

          {/* Custom profile inputs */}
          <form onSubmit={handleCustomLogin} className="space-y-2 pt-1 border-t border-slate-800/80">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Learner name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-blue-500 text-[11px]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition text-[11px]"
              >
                Set
              </button>
            </div>
          </form>

          {/* Sign Out Option */}
          {currentProfile?.isGoogleAuth && (
            <div className="pt-2 border-t border-slate-800/80 text-center">
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-[11px] inline-flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                Sign Out from Current Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
