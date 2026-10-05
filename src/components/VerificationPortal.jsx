import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, Award } from 'lucide-react';

export default function VerificationPortal({ initialCertId }) {
  const [certId, setCertId] = useState(initialCertId || 'SY-DBMS-2026-000001');
  const [verificationResult, setVerificationResult] = useState({
    valid: true,
    certId: 'SY-DBMS-2026-000001',
    learner: 'Aarav Sharma',
    program: 'DBMS Zero-To-Infinity',
    status: 'VERIFIED',
    score: '91%',
    placementReadiness: 'INDUSTRY READY',
    issuedBy: 'SarlaYash Mission Productions',
    poweredBy: 'Kapil',
    issueDate: 'October 2026',
    verifiedSkills: [
      'Relational Algebra & Set Theory',
      'Complex SQL Joins & Subqueries',
      'ACID Concurrency & Transactions',
      '3NF/BCNF Normalization & Design',
      'Physical B-Tree Index Optimization',
      'NoSQL Distributed Architectures'
    ]
  });

  const handleVerify = (e) => {
    e.preventDefault();
    if (certId.toUpperCase().startsWith('SY-DBMS-')) {
      setVerificationResult({
        valid: true,
        certId: certId.toUpperCase(),
        learner: certId.includes('000001') ? 'Aarav Sharma' : 'Kapil\'s Certified Learner',
        program: 'DBMS Zero-To-Infinity',
        status: 'VERIFIED',
        score: '94%',
        placementReadiness: 'INDUSTRY READY',
        issuedBy: 'SarlaYash Mission Productions',
        poweredBy: 'Kapil',
        issueDate: 'October 2026',
        verifiedSkills: [
          'Relational Algebra & Set Theory',
          'Complex SQL Joins & Subqueries',
          'ACID Concurrency & Transactions',
          '3NF/BCNF Normalization & Design',
          'Physical B-Tree Index Optimization',
          'NoSQL Distributed Architectures'
        ]
      });
    } else {
      setVerificationResult({
        valid: false,
        certId: certId,
        message: 'No record found with this Certificate ID in the registry.'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Public Certificate Verification Portal</h2>
        <p className="text-slate-400 text-xs font-mono max-w-md mx-auto">
          Verify digital credentials issued by SarlaYash Mission Productions • Powered By Kapil.
        </p>

        <form onSubmit={handleVerify} className="flex gap-2 max-w-md mx-auto pt-3">
          <input
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. SY-DBMS-2026-000001)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-white outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            Verify
          </button>
        </form>
      </div>

      {/* Verification Card */}
      {verificationResult && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          {verificationResult.valid ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    ✓ VERIFIED CREDENTIAL
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  ID: {verificationResult.certId}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-slate-500">Learner Name:</span>
                  <div className="font-bold text-white text-sm">{verificationResult.learner}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500">Certified Program:</span>
                  <div className="font-bold text-blue-400">{verificationResult.program}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500">Cumulative Score:</span>
                  <div className="font-bold text-emerald-400">{verificationResult.score}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500">Placement Readiness Status:</span>
                  <div className="font-bold text-amber-400">{verificationResult.placementReadiness}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500">Issuing Entity:</span>
                  <div className="text-slate-300">{verificationResult.issuedBy}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500">Author & Mentor:</span>
                  <div className="text-slate-300">{verificationResult.poweredBy}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-2 font-bold">
                  Verified Technical Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {verificationResult.verifiedSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded text-[11px] font-mono">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-2 text-red-400 font-mono text-xs">
              <AlertCircle className="w-8 h-8 mx-auto opacity-70" />
              <div className="font-bold text-sm">Certificate Not Found</div>
              <p className="text-slate-400">{verificationResult.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
