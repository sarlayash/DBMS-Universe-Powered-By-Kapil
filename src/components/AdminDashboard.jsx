import React from 'react';
import { Users, TrendingUp, AlertTriangle, Award, CheckCircle2, Clock, BarChart3, ShieldAlert, Cpu } from 'lucide-react';

export default function AdminDashboard() {
  const adminStats = {
    totalLearners: 12480,
    activeLearners: 3840,
    completionRate: 64.2,
    avgAssessmentScore: 78.6,
    dailyActive: 1920,
    weeklyActive: 7420,
    projectsCompleted: 8650,
    certificatesIssued: 4120,
    certificatesVerified: 3890,
    certificatesPending: 230,
    difficultLessons: [
      { id: 'L9', name: 'Level 9: Normalization (3NF & BCNF)', failRate: '38.4%' },
      { id: 'L10', name: 'Level 10: Concurrency & Isolation Levels', failRate: '34.1%' },
      { id: 'L7', name: 'Level 7: Correlated Subqueries', failRate: '29.7%' },
      { id: 'L12', name: 'Level 12: Sargable Query Optimization', failRate: '27.5%' }
    ],
    failedChallenges: [
      { name: 'Find 2nd Highest Salary without LIMIT', attempts: 8940, failPct: '42%' },
      { name: 'Self Join Employee-Manager Hierarchy', attempts: 6410, failPct: '36%' },
      { name: 'Left Join Null-Orphan Detection', attempts: 5120, failPct: '31%' }
    ],
    contentAlert: {
      topic: 'BCNF Functional Dependency Preservation',
      message: 'This topic is causing abnormal learner failure (41.2% drop-off). Suggested action: Introduce interactive dependency arrows visualizer.',
      severity: 'HIGH'
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase mb-1">
              <Cpu className="w-4 h-4" />
              <span>SarlaYash Mission Productions • Admin Intelligence</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              DBMS Zero-To-Infinity Operational Dashboard
            </h1>
            <p className="text-slate-400 text-xs font-mono">
              Live telemetry tracking learner cohorts, assessment distributions, and certificate verifications.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-mono font-bold rounded-lg border border-emerald-800">
              ● System Online (100% Offline Capable)
            </span>
          </div>
        </div>
      </div>

      {/* Content Intelligence Alarm */}
      <div className="bg-red-950/40 border border-red-500/50 rounded-2xl p-4 flex items-start gap-3 text-xs font-mono text-red-200">
        <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-sm text-red-300">
            CONTENT INTELLIGENCE ALERT: {adminStats.contentAlert.topic}
          </div>
          <p className="text-slate-300 leading-relaxed">
            "{adminStats.contentAlert.message}"
          </p>
        </div>
      </div>

      {/* Cohort Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-[11px] font-mono">TOTAL LEARNERS</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {adminStats.totalLearners.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">+14% this month</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-[11px] font-mono">ACTIVE LEARNERS</div>
          <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
            {adminStats.activeLearners.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">31% engagement</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-[11px] font-mono">COMPLETION RATE</div>
          <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
            {adminStats.completionRate}%
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Zero to Infinity pass</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-[11px] font-mono">AVG ASSESSMENT</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {adminStats.avgAssessmentScore}%
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Across 26 modules</span>
        </div>
      </div>

      {/* Certificates & Difficult Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Certificate Pipeline */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white uppercase text-xs">Certificate Registry</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">ISSUED</span>
              <span className="text-lg font-bold text-white">{adminStats.certificatesIssued}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">VERIFIED</span>
              <span className="text-lg font-bold text-emerald-400">{adminStats.certificatesVerified}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">PENDING</span>
              <span className="text-lg font-bold text-amber-400">{adminStats.certificatesPending}</span>
            </div>
          </div>
        </div>

        {/* Most Difficult Lessons */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <span className="font-bold text-white uppercase text-xs block border-b border-slate-800 pb-2">
            Highest Friction Lessons (Abnormal Dropoff):
          </span>
          <div className="space-y-2">
            {adminStats.difficultLessons.map(l => (
              <div key={l.id} className="flex justify-between items-center p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-slate-300">{l.name}</span>
                <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-900/50">
                  {l.failRate} Fail
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
