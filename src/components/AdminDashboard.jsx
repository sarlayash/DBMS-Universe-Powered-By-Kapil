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
      message: 'This topic causes abnormal learner friction (41.2% drop-off). Suggested action: Use interactive dependency arrows in Normalization Workbench.',
      severity: 'HIGH'
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#fef08a] font-mono text-xs font-bold uppercase mb-1">
              <Cpu className="w-4 h-4 text-[#fef08a]" />
              <span>SarlaYash Mission Productions • Admin Intelligence</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              DBMS Zero-To-Infinity Operational Dashboard
            </h1>
            <p className="text-[#b8a495] text-xs font-mono">
              Live telemetry tracking learner cohorts, assessment distributions, and certificate verifications.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3.5 py-1.5 bg-[#140d09] text-[#fef08a] text-xs font-mono font-bold rounded-xl border border-[#382519] shadow-sm">
              ● System Online (100% Offline Capable)
            </span>
          </div>
        </div>
      </div>

      {/* Content Intelligence Alarm */}
      <div className="bg-[#251810] border border-red-900/60 rounded-3xl p-5 flex items-start gap-3.5 text-xs font-mono text-red-200 shadow-lg">
        <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-sm text-red-300">
            CONTENT INTELLIGENCE ALERT: {adminStats.contentAlert.topic}
          </div>
          <p className="text-[#f5ece3] leading-relaxed">
            "{adminStats.contentAlert.message}"
          </p>
        </div>
      </div>

      {/* Cohort Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="text-[#8c786a] text-[11px] font-mono">TOTAL LEARNERS</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {adminStats.totalLearners.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#fef08a] font-mono">+14% this month</span>
        </div>

        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="text-[#8c786a] text-[11px] font-mono">ACTIVE LEARNERS</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {adminStats.activeLearners.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#b8a495] font-mono">31% engagement</span>
        </div>

        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="text-[#8c786a] text-[11px] font-mono">COMPLETION RATE</div>
          <div className="text-2xl font-bold font-mono text-[#fef08a] mt-1">
            {adminStats.completionRate}%
          </div>
          <span className="text-[10px] text-[#fef08a] font-mono">Zero to Infinity pass</span>
        </div>

        <div className="bg-[#1c130e] border border-[#382519] rounded-2xl p-4 shadow-xl">
          <div className="text-[#8c786a] text-[11px] font-mono">AVG ASSESSMENT</div>
          <div className="text-2xl font-bold font-mono text-[#fef08a] mt-1">
            {adminStats.avgAssessmentScore}%
          </div>
          <span className="text-[10px] text-[#b8a495] font-mono">Across 26 modules</span>
        </div>
      </div>

      {/* Certificates & Difficult Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Certificate Pipeline */}
        <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#382519] pb-3">
            <span className="font-bold text-white uppercase text-xs">Certificate Registry</span>
            <Award className="w-4 h-4 text-[#fef08a]" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#140d09] p-3 rounded-2xl border border-[#382519]">
              <span className="text-[#8c786a] text-[10px] block">ISSUED</span>
              <span className="text-lg font-bold text-white">{adminStats.certificatesIssued}</span>
            </div>
            <div className="bg-[#140d09] p-3 rounded-2xl border border-[#382519]">
              <span className="text-[#8c786a] text-[10px] block">VERIFIED</span>
              <span className="text-lg font-bold text-[#fef08a]">{adminStats.certificatesVerified}</span>
            </div>
            <div className="bg-[#140d09] p-3 rounded-2xl border border-[#382519]">
              <span className="text-[#8c786a] text-[10px] block">PENDING</span>
              <span className="text-lg font-bold text-[#b8a495]">{adminStats.certificatesPending}</span>
            </div>
          </div>
        </div>

        {/* Most Difficult Lessons */}
        <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-5 space-y-3 shadow-xl">
          <span className="font-bold text-white uppercase text-xs block border-b border-[#382519] pb-3">
            Highest Friction Lessons (Drop-Off Points):
          </span>
          <div className="space-y-2">
            {adminStats.difficultLessons.map(l => (
              <div key={l.id} className="flex justify-between items-center p-2.5 bg-[#140d09] rounded-2xl border border-[#382519]">
                <span className="text-[#f5ece3]">{l.name}</span>
                <span className="text-red-400 font-bold bg-[#251810] px-2 py-0.5 rounded-lg border border-red-900/50">
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
