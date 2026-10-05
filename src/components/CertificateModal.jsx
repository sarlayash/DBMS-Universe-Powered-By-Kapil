import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Download, Printer, X, ShieldCheck, Share2, Sparkles } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, certificateData, learnerProfile }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const certRef = useRef(null);

  const cert = certificateData || {
    id: 'SY-DBMS-2026-000001',
    title: 'DBMS Zero-To-Infinity Industry Readiness Certificate',
    level: 'Industry Ready',
    score: 91,
    skills: ['Relational Model', 'Advanced SQL', 'ER Modeling', '3NF/BCNF Normalization', 'ACID Transactions', 'Query Optimization', 'NoSQL Architectures']
  };

  const learnerName = learnerProfile?.name || 'Aarav Sharma';
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (isOpen) {
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Generate dynamic QR code encoding verification URL
      const verifyUrl = `${window.location.origin}${window.location.pathname}?verify=${cert.id}`;
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' }
      }).then(url => {
        setQrDataUrl(url);
      }).catch(err => console.error(err));
    }
  }, [isOpen, cert.id]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8">
        {/* Actions Bar */}
        <div className="p-4 bg-black border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official Verifiable Credential</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg border border-zinc-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div ref={certRef} className="p-8 md:p-12 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white relative border-8 border-double border-amber-500/50 rounded-xl m-4 print:m-0 print:border-4 shadow-2xl">
          {/* Subtle Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <Award className="w-96 h-96 text-amber-400" />
          </div>

          <div className="relative z-10 text-center space-y-6">
            {/* Header / Brand */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold block">
                SarlaYash Mission Productions
              </span>
              <h2 className="text-xs text-zinc-400 font-mono tracking-wider">
                POWERED BY KAPIL • ZERO-TO-INFINITY ECOSYSTEM
              </h2>
              <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mt-2 font-serif">
                {cert.title}
              </h1>
            </div>

            {/* Presentation Line */}
            <div className="text-xs font-mono text-zinc-400">
              This is to certify that
            </div>

            {/* Recipient Name */}
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-wide underline decoration-amber-500/60 decoration-2 underline-offset-8">
              {learnerName}
            </div>

            {/* Description */}
            <p className="max-w-xl mx-auto text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              has successfully mastered the complete 26-level rigorous curriculum of <strong>DBMS Zero-To-Infinity</strong>,
              demonstrating excellence in hands-on SQL engineering, transaction isolation, database normalization, and distributed architectures.
            </p>

            {/* Skills Badges */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto pt-2">
              {cert.skills.map(s => (
                <span key={s} className="px-2.5 py-0.5 bg-black border border-amber-500/40 text-amber-300 text-[10px] font-mono rounded-full shadow-sm">
                  ✓ {s}
                </span>
              ))}
            </div>

            {/* Verification Footer Grid */}
            <div className="pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 items-end gap-6 text-left">
              {/* Left Column: Details */}
              <div className="space-y-1 text-xs font-mono text-zinc-400">
                <div><span className="text-zinc-500">Certificate ID:</span> <span className="text-amber-400 font-bold">{cert.id}</span></div>
                <div><span className="text-zinc-500">Issued On:</span> <span className="text-zinc-200">{issueDate}</span></div>
                <div><span className="text-zinc-500">Assessment Score:</span> <span className="text-amber-400 font-bold">{cert.score}%</span></div>
                <div><span className="text-zinc-500">Readiness Tier:</span> <span className="text-amber-300 font-semibold">{cert.level}</span></div>
              </div>

              {/* Middle Column: Signatures */}
              <div className="text-center space-y-1 font-mono">
                <div className="font-serif italic text-lg text-amber-300">Kapil</div>
                <div className="w-32 h-0.5 bg-zinc-700 mx-auto" />
                <span className="text-[11px] text-zinc-400 block">Lead Architect & Mentor</span>
                <span className="text-[10px] text-zinc-500">SarlaYash Mission Productions</span>
              </div>

              {/* Right Column: QR Code */}
              <div className="flex flex-col items-center md:items-end space-y-1">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Verification QR" className="w-24 h-24 rounded-lg bg-white p-1 shadow-md" />
                ) : (
                  <div className="w-24 h-24 bg-zinc-800 rounded-lg flex items-center justify-center text-[10px] text-zinc-400">
                    QR Code
                  </div>
                )}
                <span className="text-[10px] font-mono text-zinc-500 text-center md:text-right">
                  Scan to Verify Authenticity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
