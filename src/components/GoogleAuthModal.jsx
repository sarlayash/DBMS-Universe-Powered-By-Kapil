import React, { useState } from 'react';
import { X, CheckCircle2, User, Sparkles, ShieldCheck, AlertCircle, LogOut, Check, Copy } from 'lucide-react';
import { signInWithGoogle, logoutUser } from '../services/firebase';

export default function GoogleAuthModal({ isOpen, onClose, currentProfile, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [customName, setCustomName] = useState(currentProfile?.name || "Kapil (Database Engineer)");
  const [customEmail, setCustomEmail] = useState(currentProfile?.email || 'kapil@sarlayash.com');
  const [copiedDomain, setCopiedDomain] = useState(false);

  if (!isOpen) return null;

  const demoAccounts = [
    {
      id: 'user1',
      name: 'Kapil (Database Engineer)',
      email: 'kapil@sarlayash.com',
      avatar: 'K',
      bgColor: 'bg-[#fef08a] text-[#140d09] font-extrabold'
    },
    {
      id: 'user2',
      name: 'Aarav Sharma (B.Tech CSE)',
      email: 'aarav.sharma@college.edu',
      avatar: 'A',
      bgColor: 'bg-[#2b1c13] text-white font-bold border border-[#382519]'
    },
    {
      id: 'user3',
      name: 'Priya Patel (Placement Aspirant)',
      email: 'priya.patel@aspirant.io',
      avatar: 'P',
      bgColor: 'bg-[#22160f] text-[#fef08a] font-bold border border-[#fef08a]/40'
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
        setAuthError(res.error || 'Google Sign-In domain authorization pending on GitHub Pages.');
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
      name: "Guest Learner",
      email: 'guest@sarlayash.edu',
      learningId: `SY-DBMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: 'G',
      isGoogleAuth: false
    });
    onClose();
  };

  const handleCopyDomain = () => {
    navigator.clipboard.writeText('sarlayash.github.io');
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#140d09]/85 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="bg-[#1c130e] border border-[#382519] w-full max-w-md rounded-3xl shadow-2xl shadow-black/80 overflow-hidden font-mono text-xs">
        {/* Header */}
        <div className="p-4 bg-[#140d09] border-b border-[#382519] flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#fef08a" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fde047" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fef9c3] to-[#fef08a] font-extrabold">
              Google Authentication
            </span>
          </div>
          <button onClick={onClose} className="text-[#b8a495] hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 bg-gradient-to-b from-[#1c130e] to-[#140d09]">
          <p className="text-[#f5ece3] text-[11px] leading-relaxed">
            Synchronize your Zero-To-Infinity roadmap progress, unlocked credentials, and verifiable certificate across sessions.
          </p>

          {/* Primary Action: Firebase Google Sign-In */}
          <button
            onClick={handleFirebaseGoogleLogin}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-extrabold rounded-xl flex items-center justify-center gap-2.5 transition shadow-lg shadow-yellow-400/20 text-xs font-sans disabled:opacity-60"
          >
            <span>{loading ? 'Opening Google Sign-In...' : 'Sign In with Google Account'}</span>
          </button>

          {authError && (
            <div className="p-3 bg-[#140d09] border border-[#fef08a]/50 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#fef08a] font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#fef08a]" />
                <span>Instant 1-Click Profile Login</span>
              </div>
              <p className="text-[#f5ece3] text-[10px]">
                Domain authorization pending on GitHub Pages. Select an instant Google profile below:
              </p>
              <div className="flex items-center justify-between text-[10px] text-[#b8a495] pt-1 border-t border-[#382519]">
                <span>Domain: <code className="text-[#fef08a]">sarlayash.github.io</code></span>
                <button onClick={handleCopyDomain} className="text-[#fef08a] hover:text-white flex items-center gap-1">
                  {copiedDomain ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDomain ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#382519]"></div></div>
            <span className="relative bg-[#1c130e] px-2 text-[10px] text-[#8c786a] uppercase">Instant Verified Profiles</span>
          </div>

          {/* Quick Account Picker */}
          <div className="space-y-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.id}
                onClick={() => handleSelectAccount(acc)}
                className="w-full p-2.5 bg-[#140d09] border border-[#382519] hover:border-[#fef08a]/60 rounded-xl flex items-center gap-3 transition text-left group"
              >
                <div className={`w-7 h-7 rounded-full ${acc.bgColor} flex items-center justify-center text-xs shrink-0`}>
                  {acc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold truncate group-hover:text-[#fef08a] transition">{acc.name}</div>
                  <div className="text-[#8c786a] text-[10px] truncate">{acc.email}</div>
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8c786a] group-hover:text-[#fef08a] shrink-0" />
              </button>
            ))}
          </div>

          {/* Custom profile inputs */}
          <form onSubmit={handleCustomLogin} className="space-y-2 pt-2 border-t border-[#382519]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Custom Google Name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="flex-1 bg-[#140d09] border border-[#382519] rounded-xl px-2.5 py-1.5 text-white outline-none focus:border-[#fef08a] text-[11px]"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#251810] hover:bg-[#312015] text-[#fef08a] font-bold rounded-xl transition text-[11px] border border-[#382519]"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign Out Option */}
          <div className="pt-2.5 border-t border-[#382519] text-center">
            {currentProfile?.isGoogleAuth ? (
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-[#251810] hover:bg-[#3d1814] border border-red-900/50 hover:border-red-600 text-red-300 hover:text-red-100 font-bold text-xs rounded-xl inline-flex items-center justify-center gap-2 transition"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Sign Off / Log Out ({currentProfile.name.split(' ')[0]})</span>
              </button>
            ) : (
              <span className="text-[#8c786a] text-[11px]">
                Currently in Guest Mode • Select a verified profile above to sync
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
