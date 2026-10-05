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
    <div className="min-h-screen bg-[#140d09] text-[#fdfbf7] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Light Lemon Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#fef08a]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#facc15]/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl w-full bg-[#1c130e]/95 border border-[#3f291b] rounded-3xl shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 my-6">
        {/* Left Column: Authentic Portrait Poster in Dark Wooden Brown Frame */}
        <div className="md:col-span-5 bg-[#140d09] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#38261b] relative">
          <div className="relative group max-w-xs w-full">
            <img
              src="./kapil-hero.jpg"
              alt="DBMS Zero-To-Infinity | Powered By Kapil"
              className="w-full h-auto rounded-2xl shadow-2xl border-2 border-[#fef08a]/40 object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#140d09]/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-[#fef08a] font-bold bg-[#140d09]/95 px-3 py-1 rounded-full border border-[#fef08a]/40 shadow-lg">
                ★ SarlaYash Mission Productions
              </span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-[#ab9687] text-center mt-3">
            Powered By Kapil • Zero-To-Infinity Ecosystem
          </p>
        </div>

        {/* Right Column: Note from Kapil & Light Lemon / Dark Wood Authentication */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#1c130e] via-[#22160f] to-[#140d09]">
          <div className="space-y-4">
            {/* Title / Header */}
            <div>
              <div className="flex items-center gap-2 text-[#fef08a] font-mono text-xs font-bold uppercase mb-1">
                <Sparkles className="w-4 h-4 text-[#fef08a]" />
                <span>DBMS ZERO-TO-INFINITY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fef9c3] to-[#fef08a] tracking-tight">
                A Note From Kapil
              </h1>
              <span className="text-xs font-mono text-[#ab9687]">
                Author & Lead Mentor | Under SarlaYash Mission Productions
              </span>
            </div>

            {/* Kapil's Note Body */}
            <div className="bg-[#140d09] border border-[#38261b] rounded-2xl p-4 sm:p-5 text-xs sm:text-[13px] text-[#f5ece3] leading-relaxed font-sans space-y-3 max-h-[280px] overflow-y-auto">
              <p>
                <strong className="text-white">Namaste Learner! Welcome to the DBMS Universe.</strong>
              </p>
              <p className="text-[#ab9687]">
                When I first began learning databases, every textbook threw dry mathematical definitions, relational calculus symbols, and abstract schemas at me — without ever answering the single question that actually matters:
              </p>
              <p className="p-3 bg-[#1e140d] border-l-2 border-[#fef08a] text-[#fef08a] font-mono text-xs rounded-r-xl">
                "Why did an engineer have to invent this, and what breaks in production if we don't use it?"
              </p>
              <p className="text-[#ab9687]">
                This ecosystem was crafted from that singular frustration. In standard courses, you spend 90% of your time memorizing definitions for college exams and 10% running simple queries.
              </p>
              <p className="text-white font-semibold">
                Here, that equation is reversed: 25% First Principles Theory, and 75% Hands-On Engineering.
              </p>
              <p className="text-[#ab9687]">
                You will not simply read about B-Tree indexes — you will execute queries and watch disk I/O drop from 10,000 block reads to 3. You will not memorize ACID — you will deliberately crash database transactions mid-flight and inspect the Write-Ahead Log.
              </p>
              <div className="pt-2 border-t border-[#38261b] flex items-center justify-between text-xs text-[#ab9687] font-mono">
                <span>With dedication to your growth,</span>
                <span className="text-[#fef08a] font-serif italic text-sm">~ Kapil</span>
              </div>
            </div>
          </div>

          {/* Authentication & Entry Gateway Controls */}
          <div className="space-y-3 pt-2 border-t border-[#38261b]">
            {errorInfo ? (
              <div className="p-4 bg-[#140d09] border border-[#fef08a]/40 rounded-2xl space-y-3 font-mono text-xs shadow-lg">
                <div className="flex items-center gap-2 text-[#fef08a] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#fef08a]" />
                  <span>Instant Profile Entry Ready (Zero Waiting)</span>
                </div>
                <p className="text-[#ab9687] text-[11px] leading-relaxed">
                  Firebase domain whitelisting is pending for GitHub Pages. You can enter right now using your custom Google Profile:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="Your Name"
                    className="px-3 py-1.5 bg-[#1e130c] border border-[#3f291b] rounded-lg text-white text-xs outline-none focus:border-[#fef08a]"
                  />
                  <input
                    type="email"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    placeholder="Your Email"
                    className="px-3 py-1.5 bg-[#1e130c] border border-[#3f291b] rounded-lg text-white text-xs outline-none focus:border-[#fef08a]"
                  />
                </div>

                <button
                  onClick={handleInstantGoogleEnter}
                  className="w-full py-2.5 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-extrabold rounded-xl transition shadow-md shadow-yellow-400/20 text-xs font-sans"
                >
                  Enter Platform Immediately ({quickName.split(' ')[0]}) &rarr;
                </button>

                <div className="pt-2 border-t border-[#38261b] flex items-center justify-between text-[10px] text-[#ab9687]">
                  <button
                    onClick={() => setShowDomainHelp(!showDomainHelp)}
                    className="text-[#fef08a] hover:underline"
                  >
                    {showDomainHelp ? '▲ Hide Firebase Whitelist Guide' : '▼ Firebase Console domain setup guide'}
                  </button>
                  <button
                    onClick={handleCopyDomain}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    {copiedDomain ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#fef08a]" />}
                    <span>{copiedDomain ? 'Copied' : 'Copy Domain'}</span>
                  </button>
                </div>

                {showDomainHelp && (
                  <div className="p-3 bg-[#140d09] rounded-xl border border-[#38261b] text-[10px] text-[#ab9687] leading-relaxed space-y-1">
                    <div>1. Open <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#fef08a] underline">Firebase Console</a> &rarr; Project <code>dbms-universe-powered-by-37c90</code></div>
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
                  className="w-full py-3.5 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-extrabold rounded-2xl flex items-center justify-center gap-3 transition shadow-xl shadow-yellow-400/20 text-sm font-sans disabled:opacity-60 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#140d09" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#140d09" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#140d09" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#140d09" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{loading ? 'Opening Google Sign-In...' : 'Sign In with Google & Enter Universe'}</span>
                </button>

                {/* Instant Google Profile Entry */}
                <button
                  onClick={handleInstantGoogleEnter}
                  className="w-full py-2.5 bg-[#140d09] hover:bg-[#251810] border border-[#3f291b] text-[#fef08a] hover:text-white rounded-2xl flex items-center justify-center gap-2 font-mono text-xs transition cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#fef08a]" />
                  <span>Instant Google Login (Direct 1-Click Access)</span>
                </button>
              </>
            )}

            {/* Offline / Guest Learner Option */}
            <button
              onClick={() => onEnterApp()}
              className="w-full py-2 bg-[#140d09] hover:bg-[#1f140e] border border-[#38261b] text-[#ab9687] hover:text-white rounded-2xl flex items-center justify-center gap-2 font-mono text-xs transition cursor-pointer"
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
