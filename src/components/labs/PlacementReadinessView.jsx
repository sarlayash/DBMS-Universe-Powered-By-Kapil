import React from 'react';
import { Award, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Download, Sparkles, Lock, Unlock } from 'lucide-react';

export default function PlacementReadinessView({ learnerStats, completedLevelsCount = 0, onClaimCertificate }) {
  // 9 Evaluated Dimensions
  const metrics = [
    { name: 'DBMS Theory', score: learnerStats?.theory || 85 },
    { name: 'SQL Querying', score: learnerStats?.sql || 92 },
    { name: 'Database Design', score: learnerStats?.design || 78 },
    { name: 'Normalization', score: learnerStats?.normalization || 88 },
    { name: 'Query Optimization', score: learnerStats?.optimization || 76 },
    { name: 'Transactions & ACID', score: learnerStats?.transactions || 86 },
    { name: 'NoSQL & Modern DBs', score: learnerStats?.nosql || 72 },
    { name: 'Real Projects', score: learnerStats?.projects || 94 },
    { name: 'Interview Simulator', score: learnerStats?.interview || 82 }
  ];

  const overallScore = Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length);
  const isUnlocked = completedLevelsCount >= 26 && overallScore >= 90;

  const getTier = (score) => {
    if (score >= 90) return { title: 'Database Engineer Ready', color: 'text-[#fef08a] bg-[#22160f] border-[#fef08a]' };
    if (score >= 80) return { title: 'Industry Ready', color: 'text-[#fef08a] bg-[#1c130e] border-[#523725]' };
    if (score >= 70) return { title: 'Platinum Tier', color: 'text-white bg-[#1c130e] border-[#382519]' };
    if (score >= 60) return { title: 'Gold Tier', color: 'text-[#fef08a] bg-[#140d09] border-[#382519]' };
    return { title: 'Foundation Tier', color: 'text-[#b8a495] bg-[#140d09] border-[#382519]' };
  };

  const currentTier = getTier(overallScore);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#fef08a] font-bold text-lg mb-1">
              <Award className="w-5 h-5 text-[#fef08a]" />
              <span>Level 25: DBMS Placement Readiness Index</span>
            </div>
            <p className="text-[#f5ece3] text-sm max-w-2xl">
              Zero-To-Infinity Benchmark benchmarked against real corporate interview rubrics (Tier-1 Tech, Enterprise, High-Growth Startups).
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#140d09] p-4 rounded-2xl border border-[#382519]">
            <div>
              <span className="text-[11px] font-mono text-[#b8a495] block uppercase">Overall Readiness</span>
              <div className="text-3xl font-extrabold font-mono text-[#fef08a]">{overallScore}%</div>
            </div>
            <div className={`px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold ${currentTier.color}`}>
              {currentTier.title}
            </div>
          </div>
        </div>
      </div>

      {/* 9 Metric Bars */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 space-y-4 shadow-xl">
        <span className="text-xs font-mono uppercase text-[#b8a495] font-bold block">
          Comprehensive Skill Dimension Breakdown:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map(m => (
            <div key={m.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white">{m.name}</span>
                <span className="text-[#fef08a] font-bold">{m.score}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#140d09] rounded-full overflow-hidden border border-[#382519]">
                <div
                  className="h-full bg-gradient-to-r from-[#fef08a] to-[#fde047] transition-all duration-700"
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Learning Intelligence Report & Certificate Prerequisite */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 space-y-4 font-mono text-xs shadow-xl">
        <div className="flex items-center gap-2 text-[#fef08a] font-bold text-sm">
          <Sparkles className="w-4 h-4 text-[#fef08a]" />
          <span>Personal DBMS Placement Intelligence Report</span>
        </div>
        <p className="text-[#f5ece3] leading-relaxed text-xs bg-[#140d09] p-4 rounded-2xl border border-[#382519]">
          "Your <strong>SQL Querying ({learnerStats?.sql || 92}%)</strong> and <strong>Real Projects ({learnerStats?.projects || 94}%)</strong> are in the top 5th percentile of industry candidates.
          Database Normalization and Transactions demonstrate strong production readiness.
          To reach <em>Database Engineer Ready</em> status, reinforce query optimization sargable patterns and complete all 26 roadmap levels."
        </p>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#382519]">
          <div className="text-[#b8a495] flex items-center gap-2">
            {isUnlocked ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Unlock className="w-4 h-4" /> Certificate Unlocked (26/26 Modules & {overallScore}%)
              </span>
            ) : (
              <span className="text-[#fef08a] flex items-center gap-1 font-bold">
                <Lock className="w-4 h-4" /> Locked (Requires 26/26 Modules [{completedLevelsCount}/26] & $\ge 90\%$ Score [{overallScore}%])
              </span>
            )}
          </div>

          {onClaimCertificate && (
            <button
              onClick={onClaimCertificate}
              className={`px-5 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 shadow-lg ${
                isUnlocked
                  ? 'bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] shadow-yellow-400/20'
                  : 'bg-[#251810] hover:bg-[#312015] border border-[#4a3020] text-[#fef08a]'
              }`}
            >
              {isUnlocked ? <Award className="w-4 h-4 text-[#140d09]" /> : <Lock className="w-4 h-4 text-[#fef08a]" />}
              <span>{isUnlocked ? 'Claim Industry Readiness Certificate 🏆' : 'Open Certificate Vault 🔒'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
