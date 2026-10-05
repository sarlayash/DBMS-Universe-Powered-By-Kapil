import React, { useState, useEffect } from 'react';
import {
  Database,
  Terminal,
  Layers,
  GraduationCap,
  Briefcase,
  Scale,
  Award,
  BarChart2,
  Cpu,
  User,
  ShieldCheck,
  Wifi,
  WifiOff,
  Download,
  BookOpen,
  Sparkles,
  Bot,
  Flame,
  CheckCircle2,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

import { ROADMAP_LEVELS } from './data/dbRoadmap';
import { sqlEngine } from './services/sqlEngine';

// Components
import BrowserIDE from './components/BrowserIDE';
import LearnerDashboard from './components/LearnerDashboard';
import LevelTheoryView from './components/LevelTheoryView';
import PlacementHub from './components/PlacementHub';
import ProjectsHub from './components/ProjectsHub';
import AdminDashboard from './components/AdminDashboard';
import VerificationPortal from './components/VerificationPortal';
import CertificateModal from './components/CertificateModal';
import GoogleAuthModal from './components/GoogleAuthModal';
import KapilMentorModal from './components/KapilMentorModal';

// Specialized Interactive Labs
import FileSystemChallenge from './components/labs/FileSystemChallenge';
import RelationalAlgebraPlayground from './components/labs/RelationalAlgebraPlayground';
import VisualJoinSimulator from './components/labs/VisualJoinSimulator';
import NormalizationWorkbench from './components/labs/NormalizationWorkbench';
import TransactionCrashSimulator from './components/labs/TransactionCrashSimulator';
import IndexExplorer from './components/labs/IndexExplorer';
import QueryOptimizerLab from './components/labs/QueryOptimizerLab';
import SecuritySandbox from './components/labs/SecuritySandbox';
import DbComparisonEngine from './components/labs/DbComparisonEngine';
import ArchitectureCapVisualizer from './components/labs/ArchitectureCapVisualizer';
import EvolutionTimeline from './components/labs/EvolutionTimeline';
import NoSqlWorkbench from './components/labs/NoSqlWorkbench';
import InterviewSimulator from './components/labs/InterviewSimulator';
import PlacementReadinessView from './components/labs/PlacementReadinessView';
import WelcomeGateway from './components/WelcomeGateway';

export default function App() {
  // Loading Gateway State (Note from Kapil & Sign-In)
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('dbms_entered') === 'true';
  });

  // Navigation View State
  const [currentView, setCurrentView] = useState('home'); // home, roadmap, ide, lab, placement, projects, comparison, verification, dashboard, admin
  const [selectedLevelId, setSelectedLevelId] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // PWA Offline & Install State
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  // Learner Profile & Gamification
  const [learnerProfile, setLearnerProfile] = useState(() => {
    const saved = localStorage.getItem('sarlayash_dbms_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: "Kapil's Learner",
      email: 'learner@sarlayash.edu',
      learningId: 'SY-DBMS-2026-8491',
      xp: 450,
      currentLevelId: 0,
      completedLevels: [0],
      progress: 15,
      badgesCount: 3,
      projectsCount: 1,
      skills: {
        sql: 82,
        theory: 75,
        design: 68,
        interview: 55
      },
      placementReadiness: 70
    };
  });

  // Modal States
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('sarlayash_dbms_profile', JSON.stringify(learnerProfile));
  }, [learnerProfile]);

  // Online / Offline Listeners & PWA Install Hook & Firebase Auth Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // URL parameter check for Certificate Verification link (?verify=SY-DBMS-...)
    const params = new URLSearchParams(window.location.search);
    if (params.get('verify')) {
      setCurrentView('verification');
    }

    // Subscribe to Firebase Google Authentication State
    let unsubscribeAuth = null;
    try {
      import('./services/firebase').then(({ subscribeToAuthChanges }) => {
        unsubscribeAuth = subscribeToAuthChanges((firebaseUser) => {
          if (firebaseUser) {
            setLearnerProfile(prev => ({
              ...prev,
              name: firebaseUser.name,
              email: firebaseUser.email,
              learningId: firebaseUser.learningId,
              photoURL: firebaseUser.photoURL,
              isGoogleAuth: true
            }));
          }
        });
      }).catch(err => console.log('Firebase auth listener skipped (offline mode):', err));
    } catch (e) {
      console.log('Firebase auth init error:', e);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const handleAddXp = (amount) => {
    setLearnerProfile(prev => ({
      ...prev,
      xp: prev.xp + amount,
      progress: Math.min(100, prev.progress + 2)
    }));
  };

  const handleLevelSelect = (id) => {
    setSelectedLevelId(id);
    setCurrentView('roadmap-detail');
    setMobileMenuOpen(false);
  };

  const currentLevelObj = ROADMAP_LEVELS.find(l => l.id === selectedLevelId) || ROADMAP_LEVELS[0];

  // Render Specialized Lab based on level handsOnType
  const renderSpecializedLab = (level) => {
    switch (level.handsOnType) {
      case 'file-system-challenge':
        return <FileSystemChallenge onComplete={() => handleAddXp(100)} />;
      case 'relational-algebra':
        return <RelationalAlgebraPlayground />;
      case 'join-simulator':
        return <VisualJoinSimulator />;
      case 'normalization-workbench':
        return <NormalizationWorkbench />;
      case 'transaction-simulator':
        return <TransactionCrashSimulator />;
      case 'index-explorer':
        return <IndexExplorer />;
      case 'query-optimizer':
        return <QueryOptimizerLab />;
      case 'security-sandbox':
        return <SecuritySandbox />;
      case 'comparison-engine':
        return <DbComparisonEngine />;
      case 'architecture-cap':
        return <ArchitectureCapVisualizer />;
      case 'evolution-timeline':
        return <EvolutionTimeline />;
      case 'nosql-workbench':
        return <NoSqlWorkbench />;
      case 'interview-simulator':
        return <InterviewSimulator />;
      case 'readiness-index':
        return (
          <PlacementReadinessView
            learnerStats={learnerProfile.skills}
            onClaimCertificate={() => setIsCertModalOpen(true)}
          />
        );
      case 'projects-hub':
        return <ProjectsHub onRunQueryInIde={(q) => { setCurrentView('ide'); }} />;
      case 'placement-challenge':
        return <PlacementHub onSolveInIde={(q) => { setCurrentView('ide'); }} />;
      default:
        return (
          <BrowserIDE
            currentLevel={level}
            onXpEarned={handleAddXp}
          />
        );
    }
  };

  if (!hasEntered) {
    return (
      <WelcomeGateway
        onEnterApp={() => {
          setHasEntered(true);
          sessionStorage.setItem('dbms_entered', 'true');
        }}
        onGoogleSignInSuccess={(user) => {
          setLearnerProfile(prev => ({ ...prev, ...user }));
          setHasEntered(true);
          sessionStorage.setItem('dbms_entered', 'true');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/30 group-hover:scale-105 transition">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  DBMS ZERO-TO-INFINITY
                </span>
                <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-800/80 px-1.5 py-0.2 rounded font-mono font-bold">
                  25% Theory • 75% Practice
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                Powered By Kapil • SarlaYash Mission Productions
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-mono font-semibold">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentView('roadmap')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'roadmap' || currentView === 'roadmap-detail' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              26 Levels
            </button>
            <button
              onClick={() => setCurrentView('ide')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                currentView === 'ide' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              SQL Studio
            </button>
            <button
              onClick={() => setCurrentView('placement')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'placement' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Placement (100+)
            </button>
            <button
              onClick={() => setCurrentView('projects')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'projects' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              10 Projects
            </button>
            <button
              onClick={() => setCurrentView('comparison')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'comparison' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              DB Comparison
            </button>
            <button
              onClick={() => setCurrentView('verification')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentView === 'verification' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Verify Certificate
            </button>
          </nav>

          {/* Right Controls: PWA Offline pill, Install, Profile */}
          <div className="flex items-center gap-2">
            {/* Offline Status Badge */}
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                isOnline
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                  : 'bg-amber-950/60 border-amber-800 text-amber-400'
              }`}
              title={isOnline ? 'Online with full offline cache' : '100% Offline Mode Active (Zero Server Dependency)'}
            >
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{isOnline ? 'PWA Ready' : 'Offline'}</span>
            </div>

            {/* Install PWA Button */}
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-bold transition shadow"
              >
                <Download className="w-3 h-3" />
                Install App
              </button>
            )}

            {/* Note from Kapil Gateway */}
            <button
              onClick={() => setHasEntered(false)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-600/50 rounded-xl text-amber-300 font-mono text-xs transition"
              title="Read Note from Kapil"
            >
              <img src="./kapil-hero.jpg" alt="Kapil" className="w-4 h-4 rounded-full object-cover border border-amber-400" />
              <span className="hidden sm:inline">Note from Kapil</span>
            </button>

            {/* Ask AI Mentor */}
            <button
              onClick={() => setIsMentorModalOpen(true)}
              className="p-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 rounded-lg transition"
              title="Kapil's DBMS Mentor"
            >
              <Bot className="w-4 h-4" />
            </button>

            {/* Profile / Google Auth */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                {learnerProfile.name[0]}
              </div>
              <span className="hidden sm:inline text-xs font-mono font-semibold text-slate-200">
                {learnerProfile.name.split(' ')[0]}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 text-xs font-mono">
            <button
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300"
            >
              Overview
            </button>
            <button
              onClick={() => { setCurrentView('roadmap'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300"
            >
              26 Levels Roadmap
            </button>
            <button
              onClick={() => { setCurrentView('ide'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-blue-400 font-bold"
            >
              SQL Studio (IDE)
            </button>
            <button
              onClick={() => { setCurrentView('placement'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300"
            >
              Placement Prep (100+)
            </button>
            <button
              onClick={() => { setCurrentView('projects'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300"
            >
              10 Real Projects
            </button>
            <button
              onClick={() => { setCurrentView('comparison'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300"
            >
              Database Comparison Engine
            </button>
            <button
              onClick={() => { setCurrentView('verification'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-slate-300"
            >
              Verify Certificate
            </button>
            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded hover:bg-slate-800 text-purple-400"
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </header>

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* VIEW 1: HOME / LANDING & DASHBOARD */}
        {currentView === 'home' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Zero Software Purchase • Zero Paid IDE • 100% In-Browser & Offline</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                From Files to Databases.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                  From Learner to Database Engineer.
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A browser-based, hands-on DBMS learning ecosystem that takes you from zero knowledge of data storage and file systems to industry-ready database engineering with <strong>25% Theory + 75% Hands-On Practice</strong>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleLevelSelect(0)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl transition shadow-lg shadow-blue-950 flex items-center gap-2"
                >
                  Start From Zero (Level 0) <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('ide')}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Open SQL Studio
                </button>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <BarChart2 className="w-4 h-4 text-amber-400" />
                  My Dashboard
                </button>
              </div>
            </div>

            {/* Core Philosophy Banner: Learn -> Practice -> Build -> Assess -> Earn -> Showcase */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block text-center mb-4">
                Core SarlaYash Learning Architecture:
              </span>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-blue-400 font-bold block mb-1">1. LEARN</span>
                  <span className="text-slate-400 text-[11px]">Why & First Principles</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">2. PRACTICE</span>
                  <span className="text-slate-400 text-[11px]">Browser SQL Sandbox</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-purple-400 font-bold block mb-1">3. BUILD</span>
                  <span className="text-slate-400 text-[11px]">10 Real Projects</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">4. ASSESS</span>
                  <span className="text-slate-400 text-[11px]">Micro & Final Checks</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">5. EARN</span>
                  <span className="text-slate-400 text-[11px]">Verifiable Certificates</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-pink-400 font-bold block mb-1">6. SHOWCASE</span>
                  <span className="text-slate-400 text-[11px]">Placement Readiness</span>
                </div>
              </div>
            </div>

            {/* Learner Dashboard Quick Preview */}
            <LearnerDashboard
              learnerProfile={learnerProfile}
              onNavigateLevel={(lvlId) => handleLevelSelect(lvlId)}
              onOpenCertificate={() => setIsCertModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 2: ROADMAP (ALL 26 LEVELS) */}
        {currentView === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h1 className="text-2xl font-bold text-white">
                Zero &rarr; Infinity DBMS Roadmap (Levels 0 - 25)
              </h1>
              <p className="text-slate-400 text-xs font-mono mt-1">
                26 Evolutionary Levels • 75% Hands-On Laboratories • Placement Ready
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROADMAP_LEVELS.map(lvl => (
                <div
                  key={lvl.id}
                  onClick={() => handleLevelSelect(lvl.id)}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 cursor-pointer transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-400 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        Level {lvl.id} • {lvl.stage}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
                    </div>

                    <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition">
                      {lvl.title}
                    </h3>
                    <div className="text-xs text-amber-400 font-mono">
                      {lvl.tagline}
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {lvl.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{lvl.challenges?.length || 1} Challenges</span>
                    <span className="text-emerald-400">+100 XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: LEVEL DETAIL & LAB */}
        {currentView === 'roadmap-detail' && (
          <div className="space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => setCurrentView('roadmap')}
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                &larr; Back to 26 Levels
              </button>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Jump Level:</span>
                <select
                  value={selectedLevelId}
                  onChange={(e) => setSelectedLevelId(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-xs font-mono"
                >
                  {ROADMAP_LEVELS.map(l => (
                    <option key={l.id} value={l.id}>Level {l.id}: {l.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Theory View */}
            <LevelTheoryView
              level={currentLevelObj}
              onLaunchLab={() => {
                const labEl = document.getElementById('hands-on-lab-container');
                if (labEl) labEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Hands-On Interactive Laboratory Container */}
            <div id="hands-on-lab-container" className="pt-4 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-400">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Hands-On Laboratory (75% Practice): {currentLevelObj.title}</span>
              </div>
              {renderSpecializedLab(currentLevelObj)}
            </div>
          </div>
        )}

        {/* VIEW 4: BROWSER SQL IDE */}
        {currentView === 'ide' && (
          <div className="h-[calc(100vh-8.5rem)]">
            <BrowserIDE
              currentLevel={currentLevelObj}
              onXpEarned={handleAddXp}
            />
          </div>
        )}

        {/* VIEW 5: PLACEMENT ENGINE */}
        {currentView === 'placement' && (
          <PlacementHub
            onSolveInIde={(q) => {
              setCurrentView('ide');
            }}
          />
        )}

        {/* VIEW 6: 10 REAL PROJECTS */}
        {currentView === 'projects' && (
          <ProjectsHub
            onRunQueryInIde={(q) => {
              setCurrentView('ide');
            }}
          />
        )}

        {/* VIEW 7: DATABASE COMPARISON ENGINE */}
        {currentView === 'comparison' && (
          <DbComparisonEngine />
        )}

        {/* VIEW 8: CERTIFICATE VERIFICATION PORTAL */}
        {currentView === 'verification' && (
          <VerificationPortal initialCertId={learnerProfile.learningId} />
        )}

        {/* VIEW 9: LEARNER DASHBOARD */}
        {currentView === 'dashboard' && (
          <LearnerDashboard
            learnerProfile={learnerProfile}
            onNavigateLevel={(lvlId) => handleLevelSelect(lvlId)}
            onOpenCertificate={() => setIsCertModalOpen(true)}
          />
        )}

        {/* VIEW 10: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Universal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            DBMS Zero-To-Infinity • Powered By Kapil | SarlaYash Mission Productions
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('verification')} className="hover:text-slate-300">
              Verify Certificate
            </button>
            <button onClick={() => setCurrentView('admin')} className="hover:text-purple-400">
              Admin Portal
            </button>
            <span className="text-emerald-500">100% Offline PWA</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        learnerProfile={learnerProfile}
      />

      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentProfile={learnerProfile}
        onLoginSuccess={(newProfile) => setLearnerProfile(prev => ({ ...prev, ...newProfile }))}
      />

      <KapilMentorModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        topicContext={currentLevelObj}
      />
    </div>
  );
}
