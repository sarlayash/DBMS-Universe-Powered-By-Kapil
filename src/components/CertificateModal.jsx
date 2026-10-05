import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  Award,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  X,
  ShieldCheck,
  Share2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ROADMAP_LEVELS } from '../data/dbRoadmap';

export default function CertificateModal({
  isOpen,
  onClose,
  learnerProfile,
  onCompleteAllModules,
  onBoostScoreTo90
}) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const certRef = useRef(null);

  // Compute unlock conditions
  const totalLevels = ROADMAP_LEVELS.length; // 26 levels
  const completedCount = learnerProfile?.completedLevels?.length || 0;
  const isAllModulesCompleted = completedCount >= totalLevels;

  // Calculate overall assessment score
  const skills = learnerProfile?.skills || { sql: 85, theory: 80, design: 75, interview: 70 };
  const calculatedScore = Math.round(
    ((skills.sql || 80) + (skills.theory || 80) + (skills.design || 80) + (skills.interview || 80)) / 4
  );
  const overallScore = learnerProfile?.overallScore || calculatedScore;
  const isScoreEligible = overallScore >= 90;

  // Master unlock rule: Must have completed ALL 26 modules AND scored >= 90%
  const isUnlocked = isAllModulesCompleted && isScoreEligible;

  const certId = learnerProfile?.learningId || 'SY-DBMS-2026-8491';
  const learnerName = learnerProfile?.name || "Kapil's Learner";
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (isOpen && isUnlocked) {
      // Confetti burst on unlocked
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Generate dynamic QR code encoding verification URL
      const verifyUrl = `${window.location.origin}${window.location.pathname}?verify=${certId}`;
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: '#140d09', light: '#ffffff' }
      }).then(url => {
        setQrDataUrl(url);
      }).catch(err => console.error(err));
    }
  }, [isOpen, isUnlocked, certId]);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (!isUnlocked) return;
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#140d09]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-[#1c130e] border border-[#3f291b] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8">
        {/* Actions Bar */}
        <div className="p-4 bg-[#140d09] border-b border-[#382519] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#fef08a] font-bold">
            {isUnlocked ? (
              <>
                <Award className="w-4 h-4 text-[#fef08a]" />
                <span className="text-[#fef08a]">Official Verifiable Industry Credential • UNLOCKED</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#fef08a]" />
                <span className="text-[#fef08a]">Industry Credential • STRICTLY LOCKED (Prerequisites Required)</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2b1c13] hover:bg-[#3d271a] text-[#fef08a] font-bold rounded-xl border border-[#523522] transition"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#ab9687] hover:text-white rounded-lg hover:bg-[#271a12] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOCKED VAULT STATUS BANNER */}
        {!isUnlocked && (
          <div className="p-6 bg-gradient-to-b from-[#22160f] to-[#1c130e] border-b border-[#3b271b] space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#140d09] border border-[#fef08a]/40 flex items-center justify-center text-[#fef08a] shrink-0 shadow-lg">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">
                    Certificate & Mastery Badges Are Locked
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#140d09] border border-[#fef08a]/30 text-[#fef08a] font-bold">
                    Prerequisites Enforced
                  </span>
                </div>
                <p className="text-xs text-[#ab9687] leading-relaxed">
                  To safeguard industry integrity, the <strong>Zero-To-Infinity Verified Certificate</strong> is issued only when two non-negotiable milestones are achieved:
                </p>
              </div>
            </div>

            {/* 2 Mandatory Prerequisites Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-1">
              {/* Prerequisite 1: All 26 Modules Complete */}
              <div className={`p-4 rounded-2xl border transition ${
                isAllModulesCompleted
                  ? 'bg-[#18110b] border-emerald-600/50 text-white'
                  : 'bg-[#140d09] border-[#422c1d] text-[#ab9687]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    {isAllModulesCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-[#fef08a]" />}
                    <span>1. All 26 Modules Completed</span>
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    isAllModulesCompleted ? 'bg-emerald-950 text-emerald-300' : 'bg-[#261912] text-[#fef08a]'
                  }`}>
                    {completedCount} / {totalLevels} Done
                  </span>
                </div>
                <div className="w-full h-2 bg-[#22160f] rounded-full overflow-hidden border border-[#3b271b] mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#fef08a] to-[#facc15] transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((completedCount / totalLevels) * 100))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{isAllModulesCompleted ? '✓ Completed all 26 curriculum levels' : `Need ${totalLevels - completedCount} more modules marked complete`}</span>
                  {onCompleteAllModules && !isAllModulesCompleted && (
                    <button
                      onClick={onCompleteAllModules}
                      className="text-[#fef08a] hover:underline font-bold"
                    >
                      Mark All Complete ✓
                    </button>
                  )}
                </div>
              </div>

              {/* Prerequisite 2: Score >= 90% */}
              <div className={`p-4 rounded-2xl border transition ${
                isScoreEligible
                  ? 'bg-[#18110b] border-emerald-600/50 text-white'
                  : 'bg-[#140d09] border-[#422c1d] text-[#ab9687]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    {isScoreEligible ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-[#fef08a]" />}
                    <span>2. Assessment Score &ge; 90%</span>
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    isScoreEligible ? 'bg-emerald-950 text-emerald-300' : 'bg-[#261912] text-[#fef08a]'
                  }`}>
                    {overallScore}% / 90% Req
                  </span>
                </div>
                <div className="w-full h-2 bg-[#22160f] rounded-full overflow-hidden border border-[#3b271b] mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#fef08a] to-[#facc15] transition-all duration-500"
                    style={{ width: `${Math.min(100, overallScore)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{isScoreEligible ? '✓ Assessment criteria satisfied (≥ 90%)' : `Short by ${90 - overallScore}% to unlock`}</span>
                  {onBoostScoreTo90 && !isScoreEligible && (
                    <button
                      onClick={onBoostScoreTo90}
                      className="text-[#fef08a] hover:underline font-bold"
                    >
                      Boost to 95% (Evaluate) ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Printable Canvas (Hidden behind frosted shield if locked) */}
        <div className="relative p-4">
          {!isUnlocked && (
            <div className="absolute inset-4 z-20 backdrop-blur-md bg-[#140d09]/80 rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3 border border-[#3f291b]">
              <div className="w-16 h-16 rounded-full bg-[#1e130c] border-2 border-[#fef08a]/60 flex items-center justify-center text-[#fef08a] shadow-2xl">
                <Lock className="w-8 h-8 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">
                Official Credential Locked
              </h3>
              <p className="text-xs text-[#ab9687] max-w-md font-mono">
                Complete all 26 modules and score 90% or above in assessments to unveil your verified certificate with dynamic QR validation code.
              </p>
            </div>
          )}

          <div
            ref={certRef}
            className={`p-8 md:p-12 bg-gradient-to-br from-[#140d09] via-[#1a110b] to-[#251810] text-[#fdfbf7] relative border-8 border-double border-[#fef08a]/50 rounded-2xl print:m-0 print:border-4 shadow-2xl transition-all duration-500 ${
              !isUnlocked ? 'filter blur-[3px] select-none pointer-events-none opacity-40' : ''
            }`}
          >
            {/* Subtle Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <Award className="w-96 h-96 text-[#fef08a]" />
            </div>

            <div className="relative z-10 text-center space-y-6">
              {/* Header / Brand */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#fef08a] font-mono font-bold block">
                  SarlaYash Mission Productions
                </span>
                <h2 className="text-xs text-[#ab9687] font-mono tracking-wider">
                  POWERED BY KAPIL • ZERO-TO-INFINITY ECOSYSTEM
                </h2>
                <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fef9c3] to-[#fef08a] mt-2 font-serif">
                  DBMS Zero-To-Infinity Industry Readiness Certificate
                </h1>
              </div>

              {/* Presentation Line */}
              <div className="text-xs font-mono text-[#ab9687]">
                This is to certify that
              </div>

              {/* Recipient Name */}
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-wide underline decoration-[#fef08a]/60 decoration-2 underline-offset-8">
                {learnerName}
              </div>

              {/* Description */}
              <p className="max-w-xl mx-auto text-xs md:text-sm text-[#f5ece3] leading-relaxed font-sans">
                has successfully mastered all 26 evolutionary levels of <strong>DBMS Zero-To-Infinity</strong> with an extraordinary assessment score of <strong>{overallScore}%</strong>,
                demonstrating mastery across ANSI SQL engineering, relational algebra, 1NF&ndash;5NF normalization, transaction isolation, query optimization, and distributed architectures.
              </p>

              {/* Skills Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto pt-2">
                {[
                  'Relational Model',
                  'ANSI SQL Engineering',
                  'ER Modeling & Cardinality',
                  '1NF to 5NF Normalization',
                  'ACID Transactions & WAL',
                  'B-Tree Indexing & Optimization',
                  'CAP Theorem & Distributed NoSQL'
                ].map(s => (
                  <span key={s} className="px-2.5 py-0.5 bg-[#140d09] border border-[#fef08a]/40 text-[#fef08a] text-[10px] font-mono rounded-full shadow-sm">
                    ✓ {s}
                  </span>
                ))}
              </div>

              {/* Verification Footer Grid */}
              <div className="pt-8 border-t border-[#3b271b] grid grid-cols-1 md:grid-cols-3 items-end gap-6 text-left">
                {/* Left Column: Details */}
                <div className="space-y-1 text-xs font-mono text-[#ab9687]">
                  <div><span className="text-[#8c7a6e]">Certificate ID:</span> <span className="text-[#fef08a] font-bold">{certId}</span></div>
                  <div><span className="text-[#8c7a6e]">Issued On:</span> <span className="text-white">{issueDate}</span></div>
                  <div><span className="text-[#8c7a6e]">Assessment Score:</span> <span className="text-[#fef08a] font-bold">{overallScore}%</span></div>
                  <div><span className="text-[#8c7a6e]">Curriculum:</span> <span className="text-white font-semibold">26/26 Modules Verified</span></div>
                </div>

                {/* Middle Column: Signatures */}
                <div className="text-center space-y-1 font-mono">
                  <div className="font-serif italic text-xl text-[#fef08a]">Kapil</div>
                  <div className="w-32 h-0.5 bg-[#523725] mx-auto" />
                  <span className="text-[11px] text-[#f5ece3] block font-bold">Kapil • Lead Architect & Mentor</span>
                  <span className="text-[10px] text-[#ab9687]">SarlaYash Mission Productions</span>
                </div>

                {/* Right Column: QR Code */}
                <div className="flex flex-col items-center md:items-end space-y-1">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="Verification QR" className="w-24 h-24 rounded-lg bg-white p-1 shadow-md" />
                  ) : (
                    <div className="w-24 h-24 bg-[#140d09] border border-[#3b271b] rounded-lg flex items-center justify-center text-[10px] text-[#ab9687]">
                      QR Code
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-[#ab9687] text-center md:text-right">
                    Scan to Verify Authenticity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
