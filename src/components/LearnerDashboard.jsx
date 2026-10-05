import React from 'react';
import {
  User,
  Award,
  Flame,
  Zap,
  Target,
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  BarChart2,
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { ROADMAP_LEVELS } from '../data/dbRoadmap';

export default function LearnerDashboard({
  learnerProfile,
  onNavigateLevel,
  onOpenCertificate,
  onUnlockAllForDemo,
  onResetToLocked
}) {
  const profile = learnerProfile || {
    name: "Kapil's Learner",
    email: 'learner@sarlayash.edu',
    learningId: 'SY-DBMS-2026-9481',
    xp: 450,
    currentLevelId: 0,
    completedLevels: [0],
    progress: 4,
    skills: {
      sql: 82,
      theory: 75,
      design: 68,
      interview: 55
    },
    placementReadiness: 65,
    intelligenceReport: 'Complete all 26 modules and reach >=90% assessment score to unlock milestone badges and official certification.'
  };

  const totalLevels = ROADMAP_LEVELS.length; // 26
  const completedCount = profile.completedLevels?.length || 0;
  const isAllModulesCompleted = completedCount >= totalLevels;

  // Calculate assessment score
  const skills = profile.skills || { sql: 80, theory: 75, design: 70, interview: 65 };
  const calculatedScore = Math.round(
    ((skills.sql || 80) + (skills.theory || 75) + (skills.design || 70) + (skills.interview || 65)) / 4
  );
  const overallScore = profile.overallScore || calculatedScore;
  const isScoreEligible = overallScore >= 90;

  // Strict unlock condition
  const isUnlocked = isAllModulesCompleted && isScoreEligible;

  const currentLevelObj = ROADMAP_LEVELS.find(l => l.id === (profile.currentLevelId || 0)) || ROADMAP_LEVELS[0];

  const badges = [
    { id: 1, name: 'SQL Foundations', icon: '⚡', req: 'Level 0-2 Complete', desc: 'Syntax, DDL, DML mastery' },
    { id: 2, name: 'Relational Algebra', icon: '📐', req: 'Level 2 Interactive Lab', desc: 'Selection, Projection & Cartesian' },
    { id: 3, name: 'Normalization Architect', icon: '🏛️', req: 'Level 3 Workbench', desc: '1NF, 2NF, 3NF, BCNF decomposition' },
    { id: 4, name: 'ER Modeling Specialist', icon: '🕸️', req: 'Level 4 ER Studio', desc: 'Crow’s foot & Chen automated diagrams' },
    { id: 5, name: 'Query Optimization Pro', icon: '🚀', req: 'Level 10 Lab', desc: 'Sargable clauses & Index scans' },
    { id: 6, name: 'ACID & Transactions Guard', icon: '🛡️', req: 'Level 6-7 Simulator', desc: 'WAL, Concurrency & Crash recovery' },
    { id: 7, name: 'Storage & B+ Tree Master', icon: '🌲', req: 'Level 8-9 Visualizer', desc: 'Paging, Buffer pool & Clustering' },
    { id: 8, name: 'NoSQL & CAP Explorer', icon: '🌐', req: 'Level 12-14 Lab', desc: 'Document, Key-Value & Partitioning' },
    { id: 9, name: 'Database Security Shield', icon: '🔐', req: 'Level 15 Sandbox', desc: 'SQLi prevention & RBAC isolation' },
    { id: 10, name: 'Placement Ready Hero', icon: '💼', req: '100+ Interview Challenges', desc: 'MAANG & Tier-1 technical rubrics' },
    { id: 11, name: 'Zero-To-Infinity Master', icon: '🏆', req: '26/26 Modules & >=90% Score', desc: 'Master Database Engineer Credential' }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#140d09] via-[#1c130e] to-[#251810] border border-[#3b271b] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#fef08a]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#fef08a] via-[#fde047] to-[#facc15] flex items-center justify-center text-[#140d09] font-extrabold text-2xl shadow-xl shadow-yellow-400/20">
              {profile.name ? profile.name[0].toUpperCase() : 'K'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#fef08a] font-bold">
                  LEARNER PROFILE • ZERO-TO-INFINITY
                </span>
                <span className="text-[10px] bg-[#140d09] border border-[#3b271b] text-white px-2 py-0.5 rounded font-mono">
                  ID: {profile.learningId}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white">
                {profile.name}
              </h1>
              <span className="text-xs font-mono text-[#b8a495]">
                {profile.email} • Powered By Kapil (SarlaYash Mission)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#140d09] px-4 py-2.5 rounded-2xl border border-[#382519] text-center min-w-[90px]">
              <span className="text-[10px] text-[#b8a495] font-mono block">TOTAL XP</span>
              <span className="text-lg font-extrabold font-mono text-[#fef08a]">{profile.xp?.toLocaleString()}</span>
            </div>
            <div className="bg-[#140d09] px-4 py-2.5 rounded-2xl border border-[#382519] text-center min-w-[90px]">
              <span className="text-[10px] text-[#b8a495] font-mono block">EVAL SCORE</span>
              <span className={`text-lg font-extrabold font-mono ${overallScore >= 90 ? 'text-emerald-400' : 'text-[#fef08a]'}`}>
                {overallScore}%
              </span>
            </div>
            <div className="bg-[#140d09] px-4 py-2.5 rounded-2xl border border-[#382519] text-center min-w-[90px]">
              <span className="text-[10px] text-[#b8a495] font-mono block">MODULES</span>
              <span className={`text-lg font-extrabold font-mono ${completedCount >= 26 ? 'text-emerald-400' : 'text-white'}`}>
                {completedCount}/26
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STRICT LOCK / UNLOCK STATUS CALLOUT */}
      <div className={`p-5 rounded-3xl border transition-all ${
        isUnlocked
          ? 'bg-gradient-to-r from-[#18110b] via-[#22160f] to-[#18110b] border-[#fef08a]/60 shadow-xl shadow-yellow-400/10'
          : 'bg-[#18110b] border-[#442b1d] shadow-lg'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              isUnlocked
                ? 'bg-[#fef08a] text-[#140d09] border-[#fef08a]'
                : 'bg-[#140d09] text-[#fef08a] border-[#382519]'
            }`}>
              {isUnlocked ? <Unlock className="w-6 h-6 stroke-[2.5]" /> : <Lock className="w-6 h-6 stroke-[2.5]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-extrabold uppercase px-2 py-0.5 rounded ${
                  isUnlocked ? 'bg-[#fef08a] text-[#140d09]' : 'bg-[#251810] text-[#fef08a] border border-[#3b271b]'
                }`}>
                  {isUnlocked ? 'CREDENTIALS UNLOCKED' : 'BADGES & CERTIFICATES STRICTLY LOCKED'}
                </span>
                <span className="text-xs font-mono text-[#b8a495]">
                  Rule: 100% of 26 Modules Complete + 90%+ Assessment Score
                </span>
              </div>
              <p className="text-xs text-white mt-1.5 font-mono leading-relaxed">
                {isUnlocked ? (
                  <span className="text-[#fef08a] font-bold">
                    Congratulations! All 26 modules are verified complete and your score is {overallScore}%. Badges and Official Verification Certificate are fully unlocked!
                  </span>
                ) : (
                  <span>
                    Prerequisite 1: All 26 modules marked complete (<strong className={completedCount >= 26 ? 'text-emerald-400' : 'text-[#fef08a]'}>{completedCount}/26</strong>) •
                    Prerequisite 2: Overall assessment score $\ge 90\%$ (<strong className={overallScore >= 90 ? 'text-emerald-400' : 'text-[#fef08a]'}>{overallScore}%</strong>).
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onUnlockAllForDemo && !isUnlocked && (
              <button
                onClick={onUnlockAllForDemo}
                className="px-3.5 py-2 bg-[#251810] hover:bg-[#312015] border border-[#fef08a]/40 text-[#fef08a] rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5"
                title="Mark all 26 modules complete and set score to 95% for instant testing"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
                Test Unlock (26/26 & 95%)
              </button>
            )}

            {onResetToLocked && isUnlocked && (
              <button
                onClick={onResetToLocked}
                className="px-3.5 py-2 bg-[#251810] hover:bg-[#312015] border border-[#3b271b] text-white rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5"
                title="Reset completed modules to demonstrate locked state"
              >
                <Lock className="w-3.5 h-3.5 text-[#fef08a]" />
                Reset to Locked
              </button>
            )}

            <button
              onClick={onOpenCertificate}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-extrabold transition flex items-center gap-2 shadow-lg ${
                isUnlocked
                  ? 'bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] shadow-yellow-400/20'
                  : 'bg-[#22160f] hover:bg-[#2b1c13] text-[#fef08a] border border-[#4a3020]'
              }`}
            >
              {isUnlocked ? <Award className="w-4 h-4 text-[#140d09]" /> : <Lock className="w-4 h-4 text-[#fef08a]" />}
              <span>{isUnlocked ? 'View Certificate 🏆' : 'Certificate Vault 🔒'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-[#b8a495] text-xs font-mono mb-1">
            <Target className="w-4 h-4 text-[#fef08a]" />
            <span>Modules Complete</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {completedCount} <span className="text-xs text-[#b8a495]">/ 26</span>
          </div>
          <div className="w-full h-2 bg-[#140d09] rounded-full mt-2.5 overflow-hidden border border-[#382519]">
            <div
              className="h-full bg-gradient-to-r from-[#fef08a] to-[#fde047] transition-all duration-500"
              style={{ width: `${Math.round((completedCount / totalLevels) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#b8a495] block mt-1">
            {Math.round((completedCount / totalLevels) * 100)}% Complete
          </span>
        </div>

        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-[#b8a495] text-xs font-mono mb-1">
            <Zap className="w-4 h-4 text-[#fef08a]" />
            <span>Current Module</span>
          </div>
          <div className="text-sm font-bold text-white truncate">
            Level {currentLevelObj.id}: {currentLevelObj.title}
          </div>
          <button
            onClick={() => onNavigateLevel && onNavigateLevel(currentLevelObj.id)}
            className="text-[11px] text-[#fef08a] hover:text-white font-mono mt-2 inline-flex items-center gap-1 transition font-bold"
          >
            Study Module <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-[#b8a495] text-xs font-mono mb-1">
            <Award className="w-4 h-4 text-[#fef08a]" />
            <span>Badges Status</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {isUnlocked ? '11 / 11' : '0 / 11'}
          </div>
          <span className={`text-[10px] font-mono block mt-1 ${isUnlocked ? 'text-emerald-400 font-bold' : 'text-[#fef08a]'}`}>
            {isUnlocked ? '✓ All Unlocked' : '🔒 Locked (Needs 26/26 & >=90%)'}
          </span>
        </div>

        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-[#b8a495] text-xs font-mono mb-1">
            <BookOpen className="w-4 h-4 text-[#fef08a]" />
            <span>Hands-On Blueprint</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            10 / 10
          </div>
          <span className="text-[10px] text-[#b8a495] font-mono block mt-1">
            Production projects available
          </span>
        </div>
      </div>

      {/* Skills Radar & Personal Intelligence Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Skill Bars */}
        <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 space-y-4 shadow-xl">
          <span className="text-xs font-mono uppercase text-[#b8a495] font-bold block">
            4-Dimensional Assessment Metrics:
          </span>

          <div className="space-y-3.5 font-mono text-xs">
            <div>
              <div className="flex justify-between text-white mb-1.5">
                <span>SQL Querying & DDL</span>
                <span className="text-[#fef08a] font-bold">{skills.sql}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#140d09] rounded-full overflow-hidden border border-[#382519]">
                <div className="h-full bg-gradient-to-r from-[#fef08a] to-[#fde047]" style={{ width: `${skills.sql}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white mb-1.5">
                <span>DBMS Theoretical Principles</span>
                <span className="text-white font-bold">{skills.theory}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#140d09] rounded-full overflow-hidden border border-[#382519]">
                <div className="h-full bg-white" style={{ width: `${skills.theory}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white mb-1.5">
                <span>Database Design & Normalization</span>
                <span className="text-[#fef08a] font-bold">{skills.design}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#140d09] rounded-full overflow-hidden border border-[#382519]">
                <div className="h-full bg-[#fde047]" style={{ width: `${skills.design}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white mb-1.5">
                <span>Interview & Problem Solving</span>
                <span className="text-[#fef08a] font-bold">{skills.interview}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#140d09] rounded-full overflow-hidden border border-[#382519]">
                <div className="h-full bg-[#facc15]" style={{ width: `${skills.interview}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Report Box */}
        <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase text-[#fef08a] font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#fef08a]" />
              Mentor Guidance & Readiness Report
            </span>
            <p className="text-xs text-[#f5ece3] font-mono leading-relaxed bg-[#140d09] p-4 rounded-2xl border border-[#382519]">
              "{profile.intelligenceReport}"
            </p>
          </div>

          <div className="pt-3 border-t border-[#382519] flex items-center justify-between font-mono text-xs">
            <span className="text-[#b8a495]">
              Score Status: <strong className={overallScore >= 90 ? 'text-emerald-400' : 'text-[#fef08a]'}>{overallScore}% {overallScore >= 90 ? '(Eligible)' : '(Target: 90%)'}</strong>
            </span>
            <button
              onClick={onOpenCertificate}
              className="text-[#fef08a] hover:text-white font-bold flex items-center gap-1 transition"
            >
              Verify Prerequisite Vault &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Badges Cabinet */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#382519] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#fef08a]" />
              <h2 className="text-sm font-mono uppercase text-white font-bold">
                11 Milestone Credentials & Badges Cabinet
              </h2>
            </div>
            <p className="text-xs text-[#b8a495] font-mono mt-0.5">
              Strictly locked until 26/26 modules are marked complete AND score is $\ge 90\%$.
            </p>
          </div>

          <div className="text-xs font-mono">
            {isUnlocked ? (
              <span className="px-3 py-1 rounded-full bg-[#fef08a] text-[#140d09] font-extrabold flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> 11 / 11 UNLOCKED
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-[#140d09] text-[#fef08a] border border-[#382519] font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> ALL 11 LOCKED
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-br from-[#1c130e] to-[#251810] border-[#fef08a]/50 text-white shadow-lg shadow-yellow-400/5'
                  : 'bg-[#140d09]/70 border-[#2f1f14] text-[#8c786a]'
              }`}
            >
              {/* Lock Watermark when locked */}
              {!isUnlocked && (
                <div className="absolute top-3 right-3 text-[#523725]">
                  <Lock className="w-4 h-4" />
                </div>
              )}
              {isUnlocked && (
                <div className="absolute top-3 right-3 text-[#fef08a]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <div>
                <div className="text-2xl mb-2">{b.icon}</div>
                <div className={`font-mono text-xs font-bold ${isUnlocked ? 'text-[#fef08a]' : 'text-white/70'}`}>
                  {b.name}
                </div>
                <div className="text-[11px] font-mono text-[#b8a495] mt-1 line-clamp-2">
                  {b.desc}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#382519]/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#8c786a] truncate max-w-[120px]">{b.req}</span>
                <span className={`font-bold uppercase px-1.5 py-0.5 rounded ${
                  isUnlocked
                    ? 'bg-[#fef08a] text-[#140d09]'
                    : 'bg-[#1c130e] text-[#8c786a] border border-[#2f1f14]'
                }`}>
                  {isUnlocked ? 'UNLOCKED' : 'LOCKED 🔒'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
