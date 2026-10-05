import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  Scale,
  AlertTriangle,
  Building,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Check
} from 'lucide-react';

export default function LevelTheoryView({
  level,
  onTakeQuiz,
  onLaunchLab,
  isCompleted,
  onToggleComplete
}) {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  if (!level) return null;

  const currentQuiz = level.quiz?.[0];

  const handleQuizSubmit = (optIdx) => {
    setSelectedQuizAnswer(optIdx);
    setIsAnswerSubmitted(true);
    // If correct, mark module as completed if not already!
    if (optIdx === currentQuiz?.answer && onToggleComplete && !isCompleted) {
      onToggleComplete(level.id);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Level Header Banner */}
      <div className="bg-[#1c130e] border border-[#3b271b] rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#fef08a] font-mono text-xs font-bold uppercase mb-1">
              <span>{level.stage} • Level {level.id} of 25</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {level.title}
            </h1>
            <p className="text-[#ab9687] text-xs font-mono mt-1">
              {level.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Mark as Complete Toggle */}
            {onToggleComplete && (
              <button
                onClick={() => onToggleComplete(level.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 border ${
                  isCompleted
                    ? 'bg-[#18110b] border-emerald-500/60 text-emerald-300 shadow-md'
                    : 'bg-[#251810] hover:bg-[#312015] border-[#4f3424] text-[#fef08a]'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Check className="w-4 h-4 text-[#fef08a]" />}
                <span>{isCompleted ? 'Module Completed ✓' : 'Mark Module Complete'}</span>
              </button>
            )}

            {/* Launch Lab */}
            <button
              onClick={onLaunchLab}
              className="px-4 py-2 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-mono text-xs font-extrabold rounded-xl transition shadow-md shadow-yellow-400/20 flex items-center gap-1.5"
            >
              Launch Hands-On Lab (75% Practice) <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* WHY & Core Concepts */}
      <div className="bg-[#1c130e] border border-[#3b271b] rounded-3xl p-6 space-y-4 font-mono text-xs shadow-xl">
        <div className="space-y-2">
          <span className="text-[#fef08a] font-bold uppercase text-xs block">
            1. Why Did This Concept Have to be Invented?
          </span>
          <p className="text-[#f5ece3] leading-relaxed text-xs bg-[#140d09] p-4 rounded-2xl border border-[#38261b]">
            {level.theory.why}
          </p>
        </div>

        {level.theory.keyConcepts && (
          <div className="space-y-2 pt-2">
            <span className="text-[#ab9687] font-bold uppercase text-xs block">
              2. Fundamental Principles:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {level.theory.keyConcepts.map((c, i) => (
                <div key={i} className="p-3 bg-[#140d09] rounded-2xl border border-[#38261b] text-[#f5ece3] flex items-start gap-2">
                  <span className="text-[#fef08a] font-bold">•</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Real Facts From Industry Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Industry Reality */}
        <div className="bg-[#1c130e] border border-[#3b271b] rounded-2xl p-5 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-[#fef08a] font-bold text-xs uppercase">
            <Building className="w-4 h-4 text-[#fef08a]" />
            <span>Industry Reality (What Companies Actually Do)</span>
          </div>
          <p className="text-[#ab9687] leading-relaxed text-xs">
            {level.theory.industryReality}
          </p>
        </div>

        {/* Engineering Trade-off */}
        <div className="bg-[#1c130e] border border-[#3b271b] rounded-2xl p-5 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-[#fef08a] font-bold text-xs uppercase">
            <Scale className="w-4 h-4 text-[#fef08a]" />
            <span>Engineering Trade-Off (Why Not Pure Theory?)</span>
          </div>
          <p className="text-[#ab9687] leading-relaxed text-xs">
            {level.theory.engineeringTradeoff}
          </p>
        </div>

        {/* Common Myth */}
        <div className="bg-[#1c130e] border border-[#3b271b] rounded-2xl p-5 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-[#fef08a] font-bold text-xs uppercase">
            <AlertTriangle className="w-4 h-4 text-[#fef08a]" />
            <span>Common Myth (What Students Misunderstand)</span>
          </div>
          <p className="text-[#ab9687] leading-relaxed text-xs">
            {level.theory.commonMyth}
          </p>
        </div>

        {/* Interview Reality */}
        <div className="bg-[#1c130e] border border-[#3b271b] rounded-2xl p-5 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-[#fef08a] font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4 text-[#fef08a]" />
            <span>Interview Reality (What Companies Test)</span>
          </div>
          <p className="text-[#ab9687] leading-relaxed text-xs">
            Interviewers test whether you can predict query performance, edge-case NULL handling, and trade-offs rather than purely reciting textbook definitions.
          </p>
        </div>
      </div>

      {/* Micro Assessment Quiz */}
      {currentQuiz && (
        <div className="bg-[#1c130e] border border-[#3b271b] rounded-3xl p-6 font-mono text-xs space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#38261b] pb-2">
            <span className="text-[#fef08a] font-bold uppercase text-xs">
              Micro-Assessment Checkpoint
            </span>
            <span className="text-[#ab9687] text-[11px]">+50 XP on completion</span>
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
                      ? 'bg-[#140d09] border-[#fef08a] text-[#fef08a] font-bold shadow-md shadow-yellow-400/20'
                      : idx === selectedQuizAnswer
                      ? 'bg-[#2b1410] border-red-500 text-red-200'
                      : 'bg-[#140d09] border-[#38261b] text-[#8c7a6e]'
                    : 'bg-[#140d09] border-[#38261b] hover:border-[#fef08a] text-[#f5ece3]'
                }`}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>

          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border ${
              selectedQuizAnswer === currentQuiz.answer
                ? 'bg-[#140d09] border-[#fef08a]/50 text-[#fef08a]'
                : 'bg-[#2b1410] border-red-500/50 text-red-300'
            }`}>
              <div className="font-bold mb-1">
                {selectedQuizAnswer === currentQuiz.answer ? '✅ Correct Answer! Module marked as mastered.' : '❌ Incorrect Selection'}
              </div>
              <p className="text-[#f5ece3] text-[11px] leading-relaxed">
                {currentQuiz.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
