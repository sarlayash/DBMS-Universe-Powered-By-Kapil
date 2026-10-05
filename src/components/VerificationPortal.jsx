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
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 text-center space-y-2 shadow-xl">
        <div className="w-12 h-12 bg-[#140d09] border border-[#fef08a]/40 rounded-2xl flex items-center justify-center text-[#fef08a] mx-auto mb-2 shadow-md shadow-yellow-400/10">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Public Certificate Verification Portal</h2>
        <p className="text-[#b8a495] text-xs font-mono max-w-md mx-auto">
          Verify digital credentials issued by SarlaYash Mission Productions • Powered By Kapil.
        </p>

        <form onSubmit={handleVerify} className="flex gap-2 max-w-md mx-auto pt-3">
          <input
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. SY-DBMS-2026-000001)"
            className="flex-1 bg-[#140d09] border border-[#382519] rounded-xl px-4 py-2 text-xs font-mono text-white outline-none focus:border-[#fef08a]"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] text-xs font-mono font-extrabold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-yellow-400/20"
          >
            <Search className="w-3.5 h-3.5" />
            Verify
          </button>
        </form>
      </div>

      {/* Verification Card */}
      {verificationResult && (
        <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl space-y-5">
          {verificationResult.valid ? (
            <>
              <div className="flex items-center justify-between border-b border-[#382519] pb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#fef08a]" />
                  <span className="font-mono font-bold text-[#fef08a] text-sm">
                    ✓ VERIFIED CREDENTIAL
                  </span>
                </div>
                <span className="text-xs font-mono text-[#b8a495] bg-[#140d09] px-3 py-1 rounded-full border border-[#382519]">
                  ID: {verificationResult.certId}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[#8c786a]">Learner Name:</span>
                  <div className="font-bold text-white text-sm">{verificationResult.learner}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#8c786a]">Certified Program:</span>
                  <div className="font-bold text-[#fef08a]">{verificationResult.program}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#8c786a]">Cumulative Score:</span>
                  <div className="font-bold text-[#fef08a]">{verificationResult.score}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#8c786a]">Placement Readiness Status:</span>
                  <div className="font-bold text-white bg-[#140d09] px-2 py-0.5 rounded-lg border border-[#382519] inline-block">{verificationResult.placementReadiness}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#8c786a]">Issuing Entity:</span>
                  <div className="text-[#f5ece3]">{verificationResult.issuedBy}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#8c786a]">Author & Mentor:</span>
                  <div className="text-[#f5ece3]">{verificationResult.poweredBy}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#382519]">
                <span className="text-xs font-mono text-[#b8a495] block mb-2 font-bold">
                  Verified Technical Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {verificationResult.verifiedSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#140d09] border border-[#382519] text-[#f5ece3] rounded-xl text-[11px] font-mono">
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
              <p className="text-[#b8a495]">{verificationResult.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
