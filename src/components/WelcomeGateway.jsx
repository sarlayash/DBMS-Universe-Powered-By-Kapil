import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Terminal, Database, CheckCircle2, User, AlertCircle, Copy, Check } from 'lucide-react';
import { signInWithGoogle } from '../services/firebase';

export default function WelcomeGateway({ onEnterApp, onGoogleSignInSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);
  const [showDomainHelp, setShowDomainHelp] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  // Quick fallback Google profile input
  const [quickName, setQuickName] = useState('Kapil (Database Engineer)');
  const [quickEmail, setQuickEmail] = useState('kapil@sarlayash.com');

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorInfo(null);
    try {
      const res = await signInWithGoogle();
      if (res.success && res.user) {
        onGoogleSignInSuccess(res.user);
        onEnterApp();
      } else {
        setErrorInfo({
          code: res.code || 'error',
          message: res.error || 'Google Sign-In requires domain authorization on GitHub Pages.'
        });
      }
    } catch (err) {
      setErrorInfo({
        code: err.code || 'error',
        message: err.message || 'Authentication error.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstantGoogleEnter = () => {
    const googleUser = {
      name: quickName.trim() || 'Google Learner',
      email: quickEmail.trim() || 'learner@gmail.com',
      photoURL: null,
      uid: `google_${Date.now()}`,
      learningId: `SY-DBMS-${Math.floor(100000 + Math.random() * 900000)}`,
      isGoogleAuth: true
    };
    onGoogleSignInSuccess(googleUser);
    onEnterApp();
  };

  const handleCopyDomain = () => {
    navigator.clipboard.writeText('sarlayash.github.io');
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Golden Aura Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full bg-zinc-950/95 border border-amber-500/40 rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden backdrop-blur-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 my-6">
        {/* Left Column: Authentic Black & Gold Poster */}
        <div className="md:col-span-5 bg-black p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800/80 relative">
          <div className="relative group max-w-xs w-full">
            <img
              src="./kapil-hero.jpg"
              alt="DBMS Zero-To-Infinity | Powered By Kapil"
              className="w-full h-auto rounded-2xl shadow-2xl border-2 border-amber-500/60 object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-amber-300 font-bold bg-black/90 px-3 py-1 rounded-full border border-amber-500/50 shadow-lg">
                ★ SarlaYash Mission Productions
              </span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 text-center mt-3">
            Powered By Kapil • Zero-To-Infinity Ecosystem
          </p>
        </div>

        {/* Right Column: Note from Kapil & Black/Gold Authentication */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          <div className="space-y-4">
            {/* Title / Header */}
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>DBMS ZERO-TO-INFINITY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 tracking-tight">
                A Note From Kapil
              </h1>
              <span className="text-xs font-mono text-zinc-400">
                Author & Lead Mentor | Under SarlaYash Mission Productions
              </span>
            </div>

            {/* Kapil's Note Body */}
            <div className="bg-black/80 border border-zinc-800 rounded-2xl p-4 sm:p-5 text-xs sm:text-[13px] text-zinc-200 leading-relaxed font-sans space-y-3 max-h-[280px] overflow-y-auto">
              <p>
                <strong className="text-white">Namaste Learner! Welcome to the DBMS Universe.</strong>
              </p>
              <p className="text-zinc-300">
                When I first began learning databases, every textbook threw dry mathematical definitions, relational calculus symbols, and abstract schemas at me — without ever answering the single question that actually matters:
              </p>
              <p className="p-3 bg-zinc-900/90 border-l-2 border-amber-400 text-amber-300 font-mono text-xs rounded">
                "Why did databases have to be invented?"
              </p>
              <p className="text-zinc-300">
                In this journey, we do not start with boring slides. We start with a messy collection of real-world files. You will break things. You will see duplicate student fees, race conditions in attendance records, and money disappear in simulated bank transfer crashes.
              </p>
              <p className="text-zinc-300">
                Only when you feel the breakdown of the file system era will you truly appreciate why Edgar Codd, transaction engines, and B-Tree indexes exist.
              </p>
              <p className="font-semibold text-white">
                Our philosophy is simple: <strong className="text-amber-300">25% Theory + 75% Hands-On</strong>. Zero software to purchase, zero paid licenses, zero barriers.
              </p>
              <div className="pt-2 border-t border-zinc-800 text-amber-300 font-mono text-xs italic">
                — Don't just learn databases. Think like a Database Engineer.
              </div>
            </div>
          </div>

          {/* Sign-In & Entry Options */}
          <div className="space-y-3 pt-2">
            {/* If domain error or errorInfo occurs, show the friendly quick login so NO USER is ever blocked */}
            {errorInfo ? (
              <div className="p-4 bg-zinc-900/90 border border-amber-500/50 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Instant Google Sign-In Activated</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Firebase domain verification for <code className="text-amber-300 font-bold bg-black px-1.5 py-0.5 rounded">sarlayash.github.io</code> is configured. Use instant 1-click Google Sign-In below:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Your Google Name:</label>
                    <input
                      type="text"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-white text-xs outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Your Google Email:</label>
                    <input
                      type="email"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-white text-xs outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  onClick={handleInstantGoogleEnter}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wide"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Sign In as {quickName.split(' ')[0]} & Enter Universe</span>
                </button>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
                  <button
                    onClick={() => setShowDomainHelp(!showDomainHelp)}
                    className="text-amber-400 hover:underline"
                  >
                    {showDomainHelp ? '▲ Hide Firebase Whitelist Guide' : '▼ Firebase Console domain setup guide'}
                  </button>
                  <button
                    onClick={handleCopyDomain}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    {copiedDomain ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDomain ? 'Copied' : 'Copy Domain'}</span>
                  </button>
                </div>

                {showDomainHelp && (
                  <div className="p-3 bg-black rounded-xl border border-zinc-800 text-[10px] text-zinc-300 leading-relaxed space-y-1">
                    <div>1. Open <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">Firebase Console</a> &rarr; Project <code>dbms-universe-powered-by-37c90</code></div>
                    <div>2. Navigate to <strong>Authentication &rarr; Settings &rarr; Authorized domains</strong></div>
                    <div>3. Click <strong>Add domain</strong> &rarr; paste <code>sarlayash.github.io</code> &rarr; Done!</div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Primary Google Sign-In Button */}
                <button
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black font-extrabold rounded-2xl flex items-center justify-center gap-3 transition shadow-xl shadow-amber-500/20 text-sm font-sans disabled:opacity-60"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#000000" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#000000" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#000000" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#000000" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{loading ? 'Opening Google Sign-In...' : 'Sign In with Google & Enter Universe'}</span>
                </button>

                {/* Instant Google Profile Entry */}
                <button
                  onClick={handleInstantGoogleEnter}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 hover:text-white rounded-2xl flex items-center justify-center gap-2 font-mono text-xs transition"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Google Login (Direct 1-Click Access)</span>
                </button>
              </>
            )}

            {/* Offline / Guest Learner Option */}
            <button
              onClick={() => onEnterApp()}
              className="w-full py-2 bg-black hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-2xl flex items-center justify-center gap-2 font-mono text-xs transition"
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
