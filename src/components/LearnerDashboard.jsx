import React from 'react';
import { User, Award, Flame, Zap, Target, BookOpen, Clock, CheckCircle2, ChevronRight, BarChart2, ShieldCheck } from 'lucide-react';

export default function LearnerDashboard({ learnerProfile, onNavigateLevel, onOpenCertificate }) {
  const profile = learnerProfile || {
    name: "Kapil's Learner",
    email: 'learner@sarlayash.edu',
    learningId: 'SY-DBMS-2026-9481',
    xp: 8450,
    currentLevelName: 'SQL Power (Level 5)',
    currentLevelId: 5,
    progress: 47,
    badgesCount: 14,
    projectsCount: 4,
    skills: {
      sql: 82,
      theory: 71,
      design: 63,
      interview: 51
    },
    placementReadiness: 69,
    intelligenceReport: 'Your SQL querying is strong (82%), but database normalization (63%) and transaction concurrency require reinforcement before interview rounds.'
  };

  const badges = [
    { name: 'SQL Starter', icon: '🏅', unlocked: true },
    { name: 'Query Master', icon: '🏅', unlocked: true },
    { name: 'Join Ninja', icon: '🏅', unlocked: true },
    { name: 'Normalization Architect', icon: '🏅', unlocked: true },
    { name: 'Transaction Guardian', icon: '🏅', unlocked: false },
    { name: 'Database Designer', icon: '🏅', unlocked: false },
    { name: 'Query Optimizer', icon: '🏅', unlocked: false },
    { name: 'NoSQL Explorer', icon: '🏅', unlocked: false },
    { name: 'Database Security Defender', icon: '🏅', unlocked: false },
    { name: 'DBMS Placement Ready', icon: '🏅', unlocked: false },
    { name: 'Zero-To-Infinity Engineer', icon: '🏆', unlocked: false }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/50">
              {profile.name[0]}
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                WELCOME, {profile.name.toUpperCase()}
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-white">DBMS ZERO-TO-INFINITY</h1>
              <span className="text-xs font-mono text-slate-400">
                Learning ID: {profile.learningId} • Powered By Kapil
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 font-mono block">TOTAL XP</span>
              <span className="text-lg font-bold font-mono text-amber-400">{profile.xp.toLocaleString()}</span>
            </div>
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 font-mono block">READINESS</span>
              <span className="text-lg font-bold font-mono text-emerald-400">{profile.placementReadiness}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
            <Target className="w-4 h-4 text-blue-400" />
            <span>Overall Progress</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">{profile.progress}%</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${profile.progress}%` }} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Current Level</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{profile.currentLevelName}</div>
          <button
            onClick={() => onNavigateLevel && onNavigateLevel(profile.currentLevelId)}
            className="text-[11px] text-blue-400 hover:text-blue-300 font-mono mt-2 inline-flex items-center gap-1"
          >
            Resume Learning <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Badges Unlocked</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">{profile.badgesCount}</div>
          <span className="text-[10px] text-slate-500 font-mono">11 milestone credentials</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Projects Done</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">{profile.projectsCount}/10</div>
          <span className="text-[10px] text-slate-500 font-mono">Production blueprints</span>
        </div>
      </div>

      {/* Skills Radar & Personal Intelligence Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Skill Bars */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
            Core Competency Metrics:
          </span>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>SQL Skill</span>
                <span className="text-emerald-400 font-bold">{profile.skills.sql}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500" style={{ width: `${profile.skills.sql}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>DBMS Theory</span>
                <span className="text-blue-400 font-bold">{profile.skills.theory}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-blue-500" style={{ width: `${profile.skills.theory}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Database Design</span>
                <span className="text-purple-400 font-bold">{profile.skills.design}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-purple-500" style={{ width: `${profile.skills.design}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Interview Simulation</span>
                <span className="text-amber-400 font-bold">{profile.skills.interview}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-amber-500" style={{ width: `${profile.skills.interview}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Report Box */}
        <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-blue-400 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              Personal DBMS Learning Intelligence Report
            </span>
            <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              "{profile.intelligenceReport}"
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">
              Readiness: {profile.placementReadiness}%
            </span>
            <button
              onClick={onOpenCertificate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow"
            >
              <Award className="w-3.5 h-3.5" />
              View Milestone Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Badges Cabinet */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
        <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-3">
          Earned Milestones & Badges:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border text-center transition ${
                b.unlocked
                  ? 'bg-slate-950 border-amber-500/40 text-amber-200 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-600 opacity-60'
              }`}
            >
              <div className="text-xl mb-1">{b.icon}</div>
              <div className="text-[11px] font-mono font-semibold truncate">{b.name}</div>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">
                {b.unlocked ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
