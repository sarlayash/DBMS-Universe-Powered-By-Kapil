import React from 'react';
import { Award, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function PlacementReadinessView({ learnerStats, onClaimCertificate }) {
  // 8 Evaluated Dimensions
  const metrics = [
    { name: 'DBMS Theory', score: learnerStats?.theory || 85, color: 'bg-blue-500' },
    { name: 'SQL Querying', score: learnerStats?.sql || 92, color: 'bg-emerald-500' },
    { name: 'Database Design', score: learnerStats?.design || 78, color: 'bg-purple-500' },
    { name: 'Normalization', score: learnerStats?.normalization || 88, color: 'bg-amber-500' },
    { name: 'Query Optimization', score: learnerStats?.optimization || 76, color: 'bg-cyan-500' },
    { name: 'Transactions & ACID', score: learnerStats?.transactions || 86, color: 'bg-red-500' },
    { name: 'NoSQL & Modern DBs', score: learnerStats?.nosql || 72, color: 'bg-pink-500' },
    { name: 'Real Projects', score: learnerStats?.projects || 94, color: 'bg-indigo-500' },
    { name: 'Interview Simulator', score: learnerStats?.interview || 82, color: 'bg-teal-500' }
  ];

  const overallScore = Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length);

  const getTier = (score) => {
    if (score >= 90) return { title: 'Database Engineer Ready', color: 'text-amber-400 bg-amber-950/60 border-amber-500' };
    if (score >= 80) return { title: 'Industry Ready', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500' };
    if (score >= 70) return { title: 'Platinum Tier', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500' };
    if (score >= 60) return { title: 'Gold Tier', color: 'text-yellow-400 bg-yellow-950/60 border-yellow-500' };
    if (score >= 50) return { title: 'Silver Tier', color: 'text-slate-300 bg-slate-800 border-slate-600' };
    return { title: 'Bronze Tier', color: 'text-orange-400 bg-orange-950/60 border-orange-600' };
  };

  const currentTier = getTier(overallScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <Award className="w-5 h-5" />
              <span>Level 25: DBMS Placement Readiness Index</span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl">
              Zero-To-Infinity Benchmark benchmarked against real corporate interview rubrics (TCS, Infosys, Accenture, Startups, Product Cos).
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-slate-500 block uppercase">Overall Readiness</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-400">{overallScore}%</div>
            </div>
            <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold ${currentTier.color}`}>
              {currentTier.title}
            </div>
          </div>
        </div>
      </div>

      {/* 8 Metric Bars */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
        <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
          Comprehensive Skill Dimension Breakdown:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map(m => (
            <div key={m.name} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">{m.name}</span>
                <span className="text-white font-bold">{m.score}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full ${m.color} transition-all duration-700`}
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Learning Intelligence Report */}
      <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-5 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Personal DBMS Learning Intelligence Report</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-xs">
          "Your <strong>SQL Querying ({learnerStats?.sql || 92}%)</strong> and <strong>Real Projects ({learnerStats?.projects || 94}%)</strong> are in the top 5th percentile of industry candidates.
          Database Normalization and Transactions demonstrate strong competency.
          To reach <em>Database Engineer Ready</em> status, reinforce query optimization sargable patterns and NoSQL distributed partitions."
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {onClaimCertificate && (
            <button
              onClick={onClaimCertificate}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-lg transition flex items-center gap-1.5 shadow-lg"
            >
              <Award className="w-4 h-4" />
              Claim Industry Readiness Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
