import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Scale, AlertTriangle, Building, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function LevelTheoryView({ level, onTakeQuiz, onLaunchLab }) {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  if (!level) return null;

  const currentQuiz = level.quiz?.[0];

  const handleQuizSubmit = (optIdx) => {
    setSelectedQuizAnswer(optIdx);
    setIsAnswerSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase mb-1">
              <span>{level.stage} • Level {level.id}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {level.title}
            </h1>
            <p className="text-slate-300 text-xs font-mono mt-1">
              {level.tagline}
            </p>
          </div>

          <button
            onClick={onLaunchLab}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5 self-start md:self-auto"
          >
            Launch Hands-On Lab (75% Practice) <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WHY & Core Concepts */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
        <div className="space-y-2">
          <span className="text-blue-400 font-bold uppercase text-xs block">
            1. Why Did This Concept Have to be Invented?
          </span>
          <p className="text-slate-300 leading-relaxed text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
            {level.theory.why}
          </p>
        </div>

        {level.theory.keyConcepts && (
          <div className="space-y-2 pt-2">
            <span className="text-slate-400 font-bold uppercase text-xs block">
              2. Fundamental Principles:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {level.theory.keyConcepts.map((c, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-300 flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 14: "Real Facts From Industry" Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Industry Reality */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
            <Building className="w-4 h-4" />
            <span>Industry Reality (What Companies Actually Do)</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-xs">
            {level.theory.industryReality}
          </p>
        </div>

        {/* Engineering Trade-off */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Scale className="w-4 h-4" />
            <span>Engineering Trade-Off (Why Not Pure Theory?)</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-xs">
            {level.theory.engineeringTradeoff}
          </p>
        </div>

        {/* Common Myth */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Common Myth (What Students Misunderstand)</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-xs">
            {level.theory.commonMyth}
          </p>
        </div>

        {/* Interview Reality */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Interview Reality (What Companies Test)</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-xs">
            Interviewers test whether you can predict query performance, edge-case NULL handling, and trade-offs rather than purely reciting textbook definitions.
          </p>
        </div>
      </div>

      {/* Micro Assessment Quiz */}
      {currentQuiz && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-blue-400 font-bold uppercase text-xs">
              Micro-Assessment Checkpoint
            </span>
            <span className="text-slate-500 text-[11px]">+50 XP on completion</span>
          </div>

          <h3 className="text-sm font-bold text-white leading-relaxed">
            {currentQuiz.question}
          </h3>

          <div className="space-y-2">
            {currentQuiz.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleQuizSubmit(idx)}
                className={`w-full p-3 rounded-xl border text-left transition ${
                  isAnswerSubmitted
                    ? idx === currentQuiz.answer
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : idx === selectedQuizAnswer
                      ? 'bg-red-950/70 border-red-500 text-red-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-950 border-slate-800 hover:border-blue-500 text-slate-200'
                }`}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>

          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border ${
              selectedQuizAnswer === currentQuiz.answer
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/40 border-red-500/50 text-red-300'
            }`}>
              <div className="font-bold mb-1">
                {selectedQuizAnswer === currentQuiz.answer ? '✅ Correct Answer!' : '❌ Incorrect Selection'}
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentQuiz.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
