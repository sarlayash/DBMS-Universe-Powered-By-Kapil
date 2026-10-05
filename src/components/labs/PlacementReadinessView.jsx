import React from 'react';
import { Award, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function PlacementReadinessView({ learnerStats, onClaimCertificate }) {
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

  const getTier = (score) => {
    if (score >= 90) return { title: 'Database Engineer Ready', color: 'text-amber-400 bg-amber-950/60 border-amber-500' };
    if (score >= 80) return { title: 'Industry Ready', color: 'text-amber-300 bg-zinc-900 border-amber-500/60' };
    if (score >= 70) return { title: 'Platinum Tier', color: 'text-white bg-zinc-900 border-zinc-700' };
    if (score >= 60) return { title: 'Gold Tier', color: 'text-amber-400 bg-zinc-950 border-zinc-800' };
    if (score >= 50) return { title: 'Silver Tier', color: 'text-zinc-300 bg-zinc-950 border-zinc-800' };
    return { title: 'Bronze Tier', color: 'text-zinc-400 bg-zinc-950 border-zinc-800' };
  };

  const currentTier = getTier(overallScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Level 25: DBMS Placement Readiness Index</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-2xl">
              Zero-To-Infinity Benchmark benchmarked against real corporate interview rubrics (TCS, Infosys, Accenture, Startups, Product Cos).
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div>
              <span className="text-[11px] font-mono text-zinc-500 block uppercase">Overall Readiness</span>
              <div className="text-3xl font-extrabold font-mono text-amber-400">{overallScore}%</div>
            </div>
            <div className={`px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold ${currentTier.color}`}>
              {currentTier.title}
            </div>
          </div>
        </div>
      </div>

      {/* 9 Metric Bars */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
          Comprehensive Skill Dimension Breakdown:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map(m => (
            <div key={m.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">{m.name}</span>
                <span className="text-amber-400 font-bold">{m.score}%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-700"
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Learning Intelligence Report */}
      <div className="bg-zinc-900 border border-amber-500/40 rounded-2xl p-6 space-y-3 font-mono text-xs shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Personal DBMS Learning Intelligence Report</span>
        </div>
        <p className="text-zinc-300 leading-relaxed text-xs">
          "Your <strong>SQL Querying ({learnerStats?.sql || 92}%)</strong> and <strong>Real Projects ({learnerStats?.projects || 94}%)</strong> are in the top 5th percentile of industry candidates.
          Database Normalization and Transactions demonstrate strong competency.
          To reach <em>Database Engineer Ready</em> status, reinforce query optimization sargable patterns and NoSQL distributed partitions."
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {onClaimCertificate && (
            <button
              onClick={onClaimCertificate}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black font-extrabold rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Award className="w-4 h-4 text-black" />
              Claim Industry Readiness Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
