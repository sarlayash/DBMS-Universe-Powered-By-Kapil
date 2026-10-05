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
  ChevronRight,
  ChevronLeft,
  Network,
  LogOut,
  Lock,
  Unlock,
  Home,
  Target,
  Split,
  ChevronDown
} from 'lucide-react';

import { ROADMAP_LEVELS } from './data/dbRoadmap';
import { sqlEngine } from './services/sqlEngine';
import { logoutUser } from './services/firebase';

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
import WelcomeGateway from './components/WelcomeGateway';

// Specialized Interactive Labs
import FileSystemChallenge from './components/labs/FileSystemChallenge';
import RelationalAlgebraPlayground from './components/labs/RelationalAlgebraPlayground';
import VisualJoinSimulator from './components/labs/VisualJoinSimulator';
import NormalizationWorkbench from './components/labs/NormalizationWorkbench';
import ErDiagramStudio from './components/labs/ErDiagramStudio';
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

export default function App() {
  // Loading Gateway State (Note from Kapil & Sign-In)
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('dbms_entered') === 'true';
  });

  // Collapsible Left Navigation Bar State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Navigation View State
  const [currentView, setCurrentView] = useState('home'); // home, roadmap, roadmap-detail, ide, er-studio, normalization, placement, projects, comparison, readiness, verification, dashboard, admin
  const [selectedLevelId, setSelectedLevelId] = useState(0);

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
      progress: 4,
      badgesCount: 0,
      projectsCount: 1,
      skills: {
        sql: 82,
        theory: 75,
        design: 68,
        interview: 55
      },
      placementReadiness: 65,
      isGoogleAuth: false
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
      progress: Math.min(100, Math.round(((prev.completedLevels?.length || 1) / 26) * 100))
    }));
  };

  // Toggle Module Completion state (all 26 modules need completion for unlock)
  const handleToggleComplete = (levelId) => {
    setLearnerProfile(prev => {
      const currentCompleted = prev.completedLevels || [];
      const isAlreadyComplete = currentCompleted.includes(levelId);
      const newCompleted = isAlreadyComplete
        ? currentCompleted.filter(id => id !== levelId)
        : [...currentCompleted, levelId];

      const newProgress = Math.round((newCompleted.length / 26) * 100);
      const isNowUnlocked = newCompleted.length >= 26 && (prev.overallScore || 85) >= 90;

      return {
        ...prev,
        completedLevels: newCompleted,
        progress: newProgress,
        badgesCount: isNowUnlocked ? 11 : 0
      };
    });
  };

  // Demo helper: Unlock all 26 modules and 95% score for instant verification
  const handleUnlockAllForDemo = () => {
    const all26 = Array.from({ length: 26 }, (_, i) => i);
    setLearnerProfile(prev => ({
      ...prev,
      completedLevels: all26,
      progress: 100,
      badgesCount: 11,
      overallScore: 95,
      skills: {
        sql: 96,
        theory: 94,
        design: 95,
        interview: 92
      },
      placementReadiness: 95
    }));
  };

  // Demo helper: Reset to locked state
  const handleResetToLocked = () => {
    setLearnerProfile(prev => ({
      ...prev,
      completedLevels: [0],
      progress: 4,
      badgesCount: 0,
      overallScore: 75,
      skills: {
        sql: 82,
        theory: 75,
        design: 68,
        interview: 55
      },
      placementReadiness: 65
    }));
  };

  // Log Off Handler: Immediately clears session and redirects to Kapil's Note Gateway
  const handleSignOff = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log('Sign-off error:', err);
    }
    setLearnerProfile(prev => ({
      ...prev,
      name: "Guest Learner",
      email: "guest@sarlayash.edu",
      photoURL: null,
      isGoogleAuth: false
    }));
    // Clear session storage and show Note from Kapil page
    sessionStorage.removeItem('dbms_entered');
    setHasEntered(false);
  };

  const handleLevelSelect = (id) => {
    setSelectedLevelId(id);
    setCurrentView('roadmap-detail');
    setMobileSidebarOpen(false);
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileSidebarOpen(false);
  };

  const currentLevelObj = ROADMAP_LEVELS.find(l => l.id === selectedLevelId) || ROADMAP_LEVELS[0];

  // Derived lock status
  const totalCompleted = learnerProfile.completedLevels?.length || 0;
  const currentSkills = learnerProfile.skills || { sql: 80, theory: 75, design: 70, interview: 65 };
  const currentAvgScore = learnerProfile.overallScore || Math.round(
    ((currentSkills.sql || 80) + (currentSkills.theory || 75) + (currentSkills.design || 70) + (currentSkills.interview || 65)) / 4
  );
  const isVaultUnlocked = totalCompleted >= 26 && currentAvgScore >= 90;

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
      case 'er-designer':
        return <ErDiagramStudio />;
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
            completedLevelsCount={totalCompleted}
            onClaimCertificate={() => setIsCertModalOpen(true)}
          />
        );
      case 'projects-hub':
        return <ProjectsHub onRunQueryInIde={() => setCurrentView('ide')} />;
      case 'placement-challenge':
        return <PlacementHub onSolveInIde={() => setCurrentView('ide')} />;
      default:
        return (
          <BrowserIDE
            currentLevel={level}
            onXpEarned={handleAddXp}
          />
        );
    }
  };

  // If user hasn't entered (or after log off), render Note from Kapil Gateway
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

  // Sidebar items configuration
  const navSections = [
    {
      title: 'Core Learning',
      items: [
        { id: 'home', label: 'Overview & Mission', icon: Home, badge: null },
        { id: 'roadmap', label: '26 Levels Roadmap', icon: Layers, badge: `${totalCompleted}/26` },
        { id: 'dashboard', label: 'My Dashboard', icon: BarChart2, badge: null }
      ]
    },
    {
      title: 'Hands-On Labs (75%)',
      items: [
        { id: 'ide', label: 'SQL Studio (IDE)', icon: Terminal, badge: 'LIVE' },
        { id: 'er-studio', label: 'Automatic ER Studio', icon: Network, badge: 'AUTO' },
        { id: 'normalization', label: 'Normalization Lab', icon: Split, badge: '0NF-5NF' },
        { id: 'comparison', label: 'DB Comparison', icon: Scale, badge: null }
      ]
    },
    {
      title: 'Career & Blueprints',
      items: [
        { id: 'placement', label: 'Placement Prep', icon: Briefcase, badge: '100+' },
        { id: 'projects', label: '10 Real Projects', icon: Cpu, badge: 'PRO' },
        { id: 'readiness', label: 'Readiness Index', icon: Target, badge: null }
      ]
    },
    {
      title: 'Credentials & Admin',
      items: [
        {
          id: 'cert-action',
          label: 'Official Certificate',
          icon: isVaultUnlocked ? Award : Lock,
          badge: isVaultUnlocked ? 'UNLOCKED' : 'LOCKED 🔒',
          action: () => setIsCertModalOpen(true)
        },
        { id: 'verification', label: 'Verify Certificate', icon: ShieldCheck, badge: null },
        { id: 'admin', label: 'Admin Portal', icon: User, badge: null }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#140d09] text-[#f5ece3] flex font-sans selection:bg-[#fef08a] selection:text-[#140d09]">
      {/* ------------------------------------------------------------------ */}
      {/* LEFT NAVIGATION SIDEBAR (EXPANDABLE & COLLAPSIBLE)                */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 bg-[#18110b] border-r border-[#382519] transition-all duration-300 z-30 sticky top-0 h-screen select-none ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header: Brand & Collapse Toggle */}
        <div className="p-4 border-b border-[#382519] flex items-center justify-between gap-2">
          {!sidebarCollapsed ? (
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group truncate"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#fef08a] via-[#fde047] to-[#facc15] flex items-center justify-center text-[#140d09] font-extrabold shadow-lg shadow-yellow-400/20 group-hover:scale-105 transition shrink-0">
                <Database className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="truncate">
                <div className="font-extrabold text-xs tracking-tight text-white truncate">
                  DBMS ZERO-TO-INFINITY
                </div>
                <div className="text-[10px] text-[#fef08a] font-mono truncate font-bold">
                  Powered By Kapil
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigateTo('home')}
              className="w-10 h-10 mx-auto rounded-2xl bg-gradient-to-tr from-[#fef08a] via-[#fde047] to-[#facc15] flex items-center justify-center text-[#140d09] font-extrabold shadow-lg shadow-yellow-400/20 cursor-pointer hover:scale-105 transition"
              title="DBMS Zero-To-Infinity • Powered By Kapil"
            >
              <Database className="w-5 h-5 stroke-[2.5]" />
            </div>
          )}

          {/* Toggle Expand / Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-xl bg-[#22160f] hover:bg-[#2e1d14] text-[#b8a495] hover:text-[#fef08a] border border-[#382519] transition"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar Nav Links (Categorized) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-wooden-scrollbar">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-mono uppercase font-bold tracking-wider text-[#8c786a]">
                  {sec.title}
                </div>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        navigateTo(item.id);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs font-semibold transition group text-left ${
                      isActive
                        ? 'bg-[#251810] text-[#fef08a] border border-[#fef08a]/40 shadow-md shadow-yellow-400/5'
                        : 'text-[#b8a495] hover:text-white hover:bg-[#20150e]'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition ${
                      isActive ? 'text-[#fef08a]' : 'text-[#8c786a] group-hover:text-white'
                    }`} />

                    {!sidebarCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {!sidebarCollapsed && item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                        item.badge.includes('LOCK') && !item.badge.includes('UN')
                          ? 'bg-[#140d09] text-[#fef08a] border border-[#382519]'
                          : item.badge === 'UNLOCKED'
                          ? 'bg-[#fef08a] text-[#140d09]'
                          : 'bg-[#140d09] text-[#fef08a] border border-[#382519]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Kapil Note, AI Mentor, Sign Off & Profile */}
        <div className="p-3 border-t border-[#382519] space-y-2 bg-[#140d09]/60">
          {/* Note from Kapil Shortcut */}
          <button
            onClick={() => setHasEntered(false)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl bg-[#1c130e] hover:bg-[#251810] border border-[#382519] hover:border-[#fef08a]/50 text-[#fef08a] text-xs font-mono transition ${
              sidebarCollapsed ? 'justify-center p-2' : ''
            }`}
            title="Read Note from Kapil (Landing Page)"
          >
            <img
              src="./kapil-hero.jpg"
              alt="Kapil"
              className="w-6 h-6 rounded-full object-cover border border-[#fef08a]/60 shrink-0"
            />
            {!sidebarCollapsed && (
              <span className="truncate font-bold text-left flex-1">Note from Kapil</span>
            )}
          </button>

          {/* AI Mentor Bot Button */}
          <button
            onClick={() => setIsMentorModalOpen(true)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl bg-[#1c130e] hover:bg-[#251810] border border-[#382519] hover:border-[#fef08a]/50 text-white hover:text-[#fef08a] text-xs font-mono transition ${
              sidebarCollapsed ? 'justify-center p-2' : ''
            }`}
            title="Ask Kapil's DBMS Mentor AI"
          >
            <Bot className="w-5 h-5 text-[#fef08a] shrink-0" />
            {!sidebarCollapsed && (
              <span className="truncate font-bold text-left flex-1">Kapil's AI Mentor</span>
            )}
          </button>

          {/* Install App button if available */}
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className={`w-full flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-r from-[#fef08a] to-[#fde047] text-[#140d09] text-xs font-mono font-bold transition shadow-md shadow-yellow-400/20 ${
                sidebarCollapsed ? 'justify-center p-2' : ''
              }`}
              title="Install DBMS Universe PWA"
            >
              <Download className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="truncate">Install App</span>}
            </button>
          )}

          {/* User Profile & Sign Off / Sign In */}
          <div className="pt-2 border-t border-[#382519]">
            {learnerProfile.isGoogleAuth ? (
              <div className={`flex items-center gap-2 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!sidebarCollapsed && (
                  <div
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-2 cursor-pointer truncate flex-1"
                    title="Account Details"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#2b1c13] border border-[#fef08a]/40 flex items-center justify-center text-[#fef08a] font-bold text-xs shrink-0">
                      {learnerProfile.name[0]}
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-white font-bold truncate">
                        {learnerProfile.name.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-[#8c786a] font-mono truncate">
                        Google Verified
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleSignOff}
                  className="p-2 rounded-xl bg-[#251810] hover:bg-[#3d1814] text-[#b8a495] hover:text-red-300 border border-[#382519] hover:border-red-900/50 transition shrink-0"
                  title="Sign Off / Log Out (Loads Note from Kapil)"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`w-full flex items-center gap-2 p-2 rounded-xl bg-[#251810] hover:bg-[#312015] border border-[#382519] text-[#fef08a] text-xs font-mono font-bold transition ${
                  sidebarCollapsed ? 'justify-center p-2' : ''
                }`}
                title="Sign In with Google"
              >
                <User className="w-4 h-4 shrink-0 text-[#fef08a]" />
                {!sidebarCollapsed && <span className="truncate">Sign In</span>}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE DRAWER SIDEBAR                                              */}
      {/* ------------------------------------------------------------------ */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#140d09]/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85%] bg-[#18110b] border-r border-[#382519] h-full flex flex-col justify-between p-4 z-10 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#382519]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#fef08a] to-[#facc15] flex items-center justify-center text-[#140d09] font-extrabold">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-white">DBMS ZERO-TO-INFINITY</div>
                    <div className="text-[10px] text-[#fef08a] font-mono">Powered By Kapil</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 text-[#b8a495] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4">
                {navSections.map((sec, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[10px] font-mono uppercase font-bold text-[#8c786a] px-2">
                      {sec.title}
                    </div>
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            } else {
                              navigateTo(item.id);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-mono transition ${
                            isActive
                              ? 'bg-[#251810] text-[#fef08a] border border-[#fef08a]/40 font-bold'
                              : 'text-[#b8a495] hover:text-white hover:bg-[#20150e]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#fef08a]" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#140d09] text-[#fef08a] border border-[#382519]">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#382519] space-y-2">
              <button
                onClick={() => { setHasEntered(false); setMobileSidebarOpen(false); }}
                className="w-full flex items-center gap-2 p-2 rounded-xl bg-[#1c130e] text-[#fef08a] text-xs font-mono font-bold border border-[#382519]"
              >
                <img src="./kapil-hero.jpg" alt="Kapil" className="w-5 h-5 rounded-full object-cover border border-[#fef08a]" />
                <span>Note from Kapil</span>
              </button>

              {learnerProfile.isGoogleAuth ? (
                <button
                  onClick={() => { handleSignOff(); setMobileSidebarOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#251810] text-red-400 font-mono text-xs font-bold border border-red-900/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Off ({learnerProfile.name.split(' ')[0]})</span>
                </button>
              ) : (
                <button
                  onClick={() => { setIsAuthModalOpen(true); setMobileSidebarOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#fef08a] text-[#140d09] font-mono text-xs font-extrabold"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MAIN VIEW CONTENT AREA (RIGHT OF SIDEBAR)                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sleek Top Header (Clean, Zero Clutter) */}
        <header className="sticky top-0 z-20 bg-[#140d09]/95 backdrop-blur-md border-b border-[#382519] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-[#1c130e] text-[#fef08a] border border-[#382519]"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Current View Breadcrumb */}
            <div className="font-mono text-xs text-[#b8a495] flex items-center gap-1.5">
              <span className="text-white font-bold">DBMS ZERO-TO-INFINITY</span>
              <span>/</span>
              <span className="text-[#fef08a] font-bold uppercase">
                {currentView === 'home' && 'Overview'}
                {currentView === 'roadmap' && '26 Levels Roadmap'}
                {currentView === 'roadmap-detail' && `Level ${currentLevelObj.id}: ${currentLevelObj.title}`}
                {currentView === 'ide' && 'SQL Studio IDE'}
                {currentView === 'er-studio' && 'Automatic ER Diagram Studio'}
                {currentView === 'normalization' && 'Normalization Visualization Lab'}
                {currentView === 'placement' && 'Placement Prep (100+)'}
                {currentView === 'projects' && '10 Production Blueprints'}
                {currentView === 'comparison' && 'Database Comparison Engine'}
                {currentView === 'readiness' && 'Placement Readiness Index'}
                {currentView === 'verification' && 'Certificate Verification'}
                {currentView === 'dashboard' && 'Learner Intelligence Dashboard'}
                {currentView === 'admin' && 'Admin Portal'}
              </span>
            </div>
          </div>

          {/* Right Top Status & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Live Progress Pill */}
            <div
              onClick={() => navigateTo('dashboard')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1c130e] border border-[#382519] cursor-pointer hover:border-[#fef08a]/40 transition text-xs font-mono"
              title="Click to view full dashboard"
            >
              <span className="text-[#8c786a]">Modules:</span>
              <span className={`font-bold ${totalCompleted >= 26 ? 'text-emerald-400' : 'text-[#fef08a]'}`}>
                {totalCompleted}/26
              </span>
              <span className="text-[#8c786a]">•</span>
              <span className="text-[#8c786a]">Score:</span>
              <span className={`font-bold ${currentAvgScore >= 90 ? 'text-emerald-400' : 'text-white'}`}>
                {currentAvgScore}%
              </span>
            </div>

            {/* Offline Status Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold border ${
                isOnline
                  ? 'bg-[#1c130e] border-[#382519] text-[#fef08a]'
                  : 'bg-[#251810] border-[#382519] text-[#b8a495]'
              }`}
              title={isOnline ? 'Online • 100% Offline PWA Ready' : '100% Offline Mode (Zero Server Dependency)'}
            >
              {isOnline ? <Wifi className="w-3 h-3 text-[#fef08a]" /> : <WifiOff className="w-3 h-3 text-[#b8a495]" />}
              <span className="hidden sm:inline">{isOnline ? 'PWA Ready' : 'Offline'}</span>
            </div>

            {/* Note from Kapil Button */}
            <button
              onClick={() => setHasEntered(false)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1c130e] hover:bg-[#251810] border border-[#fef08a]/40 hover:border-[#fef08a] rounded-xl text-[#fef08a] font-mono text-xs transition shadow-sm font-bold"
              title="Open Note from Kapil (Landing Page)"
            >
              <img src="./kapil-hero.jpg" alt="Kapil" className="w-4 h-4 rounded-full object-cover border border-[#fef08a]" />
              <span>Note from Kapil</span>
            </button>

            {/* Kapil's AI Mentor Button */}
            <button
              onClick={() => setIsMentorModalOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#1c130e] hover:bg-[#251810] border border-[#382519] text-[#fef08a] rounded-xl transition flex items-center gap-1.5 font-mono text-xs"
              title="Ask Kapil's DBMS Mentor AI"
            >
              <Bot className="w-4 h-4 text-[#fef08a]" />
              <span className="hidden xl:inline">AI Mentor</span>
            </button>

            {/* Sign Off / Sign In button in header */}
            {learnerProfile.isGoogleAuth ? (
              <button
                onClick={handleSignOff}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#251810] hover:bg-[#3d1814] text-[#b8a495] hover:text-red-300 border border-[#382519] hover:border-red-900/50 rounded-xl font-mono text-xs font-bold transition"
                title="Sign Off (Immediately loads Note from Kapil)"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Sign Off</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-mono text-xs font-extrabold rounded-xl transition shadow-md shadow-yellow-400/20"
                title="Sign In with Google"
              >
                <User className="w-3.5 h-3.5 text-[#140d09]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Profile Avatar */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#fef08a] to-[#facc15] flex items-center justify-center font-extrabold text-xs text-[#140d09] shadow-sm hover:scale-105 transition shrink-0"
              title="Learner Profile"
            >
              {learnerProfile.name ? learnerProfile.name[0].toUpperCase() : 'K'}
            </button>
          </div>
        </header>

        {/* Main Content Render */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
          {/* VIEW 1: HOME / LANDING & DASHBOARD */}
          {currentView === 'home' && (
            <div className="space-y-10">
              {/* Hero Section */}
              <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c130e] border border-[#fef08a]/40 text-[#fef08a] text-xs font-mono shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
                  <span>Zero Software Purchase • Zero Paid IDE • 100% In-Browser & Offline</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  From Files to Databases.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fef9c3] via-[#fef08a] to-[#fde047]">
                    From Learner to Database Engineer.
                  </span>
                </h1>
                <p className="text-[#f5ece3] text-sm sm:text-base leading-relaxed">
                  A browser-based, hands-on DBMS ecosystem that takes you from fundamental byte storage and file structures to enterprise database engineering with <strong className="text-white">25% Theory + 75% Hands-On Practice</strong>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleLevelSelect(0)}
                    className="px-6 py-3 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-mono text-xs font-extrabold rounded-xl transition shadow-lg shadow-yellow-400/20 flex items-center gap-2"
                  >
                    Start From Zero (Level 0) <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('ide')}
                    className="px-6 py-3 bg-[#1c130e] hover:bg-[#251810] border border-[#382519] hover:border-[#fef08a]/50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2"
                  >
                    <Terminal className="w-4 h-4 text-[#fef08a]" />
                    Open SQL Studio
                  </button>
                  <button
                    onClick={() => navigateTo('er-studio')}
                    className="px-6 py-3 bg-[#1c130e] hover:bg-[#251810] border border-[#382519] hover:border-[#fef08a]/50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2"
                  >
                    <Network className="w-4 h-4 text-[#fef08a]" />
                    Automatic ER Studio
                  </button>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="px-6 py-3 bg-[#1c130e] hover:bg-[#251810] border border-[#382519] hover:border-[#fef08a]/50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2"
                  >
                    <BarChart2 className="w-4 h-4 text-[#fef08a]" />
                    My Dashboard
                  </button>
                </div>
              </div>

              {/* Core Philosophy Banner: Learn -> Practice -> Build -> Assess -> Earn -> Showcase */}
              <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-mono uppercase text-[#b8a495] font-bold block text-center mb-4">
                  Core SarlaYash Learning Architecture:
                </span>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center font-mono text-xs">
                  <div className="p-3 bg-[#140d09] rounded-2xl border border-[#382519]">
                    <span className="text-[#fef08a] font-bold block mb-1">1. LEARN</span>
                    <span className="text-[#b8a495] text-[11px]">Why & Principles</span>
                  </div>
                  <div className="p-3 bg-[#140d09] rounded-2xl border border-[#382519]">
                    <span className="text-white font-bold block mb-1">2. PRACTICE</span>
                    <span className="text-[#b8a495] text-[11px]">Browser SQL Sandbox</span>
                  </div>
                  <div className="p-3 bg-[#140d09] rounded-2xl border border-[#382519]">
                    <span className="text-[#fef08a] font-bold block mb-1">3. BUILD</span>
                    <span className="text-[#b8a495] text-[11px]">10 Real Projects</span>
                  </div>
                  <div className="p-3 bg-[#140d09] rounded-2xl border border-[#382519]">
                    <span className="text-white font-bold block mb-1">4. ASSESS</span>
                    <span className="text-[#b8a495] text-[11px]">Quizzes & Rubrics</span>
                  </div>
                  <div className="p-3 bg-[#140d09] rounded-2xl border border-[#382519]">
                    <span className="text-[#fef08a] font-bold block mb-1">5. EARN</span>
                    <span className="text-[#b8a495] text-[11px]">Verifiable Credentials</span>
                  </div>
                  <div className="p-3 bg-[#140d09] rounded-2xl border border-[#382519]">
                    <span className="text-white font-bold block mb-1">6. SHOWCASE</span>
                    <span className="text-[#b8a495] text-[11px]">Placement Readiness</span>
                  </div>
                </div>
              </div>

              {/* Learner Dashboard */}
              <LearnerDashboard
                learnerProfile={learnerProfile}
                onNavigateLevel={(lvlId) => handleLevelSelect(lvlId)}
                onOpenCertificate={() => setIsCertModalOpen(true)}
                onUnlockAllForDemo={handleUnlockAllForDemo}
                onResetToLocked={handleResetToLocked}
              />
            </div>
          )}

          {/* VIEW 2: ROADMAP (ALL 26 LEVELS) */}
          {currentView === 'roadmap' && (
            <div className="space-y-6">
              <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Zero &rarr; Infinity DBMS Roadmap (Levels 0 - 25)
                  </h1>
                  <p className="text-[#b8a495] text-xs font-mono mt-1">
                    26 Evolutionary Levels • 75% Hands-On Laboratories • Placement Ready
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#140d09] px-4 py-2 rounded-2xl border border-[#382519] text-xs font-mono">
                    <span className="text-[#8c786a]">Completed: </span>
                    <strong className={totalCompleted >= 26 ? 'text-emerald-400' : 'text-[#fef08a]'}>
                      {totalCompleted} / 26
                    </strong>
                  </div>
                  {totalCompleted < 26 && (
                    <button
                      onClick={handleUnlockAllForDemo}
                      className="px-3 py-2 bg-[#251810] hover:bg-[#312015] border border-[#fef08a]/40 text-[#fef08a] rounded-xl font-mono text-xs font-bold transition"
                      title="Mark all 26 modules complete for evaluation"
                    >
                      Test Complete All
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROADMAP_LEVELS.map(lvl => {
                  const isDone = learnerProfile.completedLevels?.includes(lvl.id);
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => handleLevelSelect(lvl.id)}
                      className={`bg-[#1c130e] hover:bg-[#251810] border rounded-3xl p-5 cursor-pointer transition flex flex-col justify-between space-y-3 group shadow-xl ${
                        isDone
                          ? 'border-emerald-500/50 shadow-emerald-950/20'
                          : 'border-[#382519] hover:border-[#fef08a]/50'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#fef08a] uppercase bg-[#140d09] px-2 py-0.5 rounded border border-[#382519]">
                            Level {lvl.id} • {lvl.stage}
                          </span>
                          {isDone ? (
                            <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 bg-[#140d09] px-2 py-0.5 rounded border border-emerald-500/40">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Complete
                            </span>
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#8c786a] group-hover:text-[#fef08a] transition" />
                          )}
                        </div>

                        <h3 className="font-bold text-white text-base group-hover:text-[#fef08a] transition">
                          {lvl.title}
                        </h3>
                        <div className="text-xs text-[#fef08a] font-mono">
                          {lvl.tagline}
                        </div>
                        <p className="text-[#b8a495] text-xs line-clamp-2">
                          {lvl.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#382519] flex items-center justify-between text-[11px] font-mono text-[#8c786a]">
                        <span>{lvl.challenges?.length || 1} Challenges</span>
                        <span className="text-[#fef08a] font-bold">+100 XP</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: LEVEL DETAIL & LAB */}
          {currentView === 'roadmap-detail' && (
            <div className="space-y-6">
              {/* Breadcrumb Navigation & Jump Dropdown */}
              <div className="flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => navigateTo('roadmap')}
                  className="text-[#b8a495] hover:text-[#fef08a] flex items-center gap-1 transition"
                >
                  &larr; Back to 26 Levels
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[#8c786a]">Jump Level:</span>
                  <select
                    value={selectedLevelId}
                    onChange={(e) => setSelectedLevelId(Number(e.target.value))}
                    className="bg-[#1c130e] border border-[#382519] text-white rounded-xl px-2.5 py-1 text-xs font-mono outline-none focus:border-[#fef08a]"
                  >
                    {ROADMAP_LEVELS.map(l => (
                      <option key={l.id} value={l.id}>
                        Level {l.id}: {l.title} {learnerProfile.completedLevels?.includes(l.id) ? '✓' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Theory View with Mark as Complete */}
              <LevelTheoryView
                level={currentLevelObj}
                isCompleted={learnerProfile.completedLevels?.includes(currentLevelObj.id)}
                onToggleComplete={handleToggleComplete}
                onLaunchLab={() => {
                  const labEl = document.getElementById('hands-on-lab-container');
                  if (labEl) labEl.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Hands-On Interactive Laboratory Container */}
              <div id="hands-on-lab-container" className="pt-4 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#b8a495]">
                  <Terminal className="w-4 h-4 text-[#fef08a]" />
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

          {/* VIEW: AUTOMATIC ER DIAGRAM STUDIO */}
          {currentView === 'er-studio' && (
            <ErDiagramStudio />
          )}

          {/* VIEW: NORMALIZATION VISUALIZATION LAB */}
          {currentView === 'normalization' && (
            <NormalizationWorkbench />
          )}

          {/* VIEW 5: PLACEMENT ENGINE */}
          {currentView === 'placement' && (
            <PlacementHub
              onSolveInIde={() => navigateTo('ide')}
            />
          )}

          {/* VIEW 6: 10 REAL PROJECTS */}
          {currentView === 'projects' && (
            <ProjectsHub
              onRunQueryInIde={() => navigateTo('ide')}
            />
          )}

          {/* VIEW 7: DATABASE COMPARISON ENGINE */}
          {currentView === 'comparison' && (
            <DbComparisonEngine />
          )}

          {/* VIEW: READINESS INDEX */}
          {currentView === 'readiness' && (
            <PlacementReadinessView
              learnerStats={learnerProfile.skills}
              completedLevelsCount={totalCompleted}
              onClaimCertificate={() => setIsCertModalOpen(true)}
            />
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
              onUnlockAllForDemo={handleUnlockAllForDemo}
              onResetToLocked={handleResetToLocked}
            />
          )}

          {/* VIEW 10: ADMIN DASHBOARD */}
          {currentView === 'admin' && (
            <AdminDashboard />
          )}
        </main>

        {/* Universal Footer */}
        <footer className="border-t border-[#382519] bg-[#140d09] py-6 mt-12 text-center text-xs font-mono text-[#8c786a]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              DBMS Zero-To-Infinity • Powered By Kapil | SarlaYash Mission Productions
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigateTo('verification')} className="hover:text-[#fef08a] transition">
                Verify Certificate
              </button>
              <button onClick={() => navigateTo('admin')} className="hover:text-[#fef08a] transition">
                Admin Portal
              </button>
              <span className="text-[#fef08a] font-bold">100% Offline PWA</span>
            </div>
          </div>
        </footer>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODALS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        learnerProfile={learnerProfile}
        onCompleteAllModules={handleUnlockAllForDemo}
        onBoostScoreTo90={handleUnlockAllForDemo}
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
