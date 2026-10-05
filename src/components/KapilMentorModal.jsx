import React, { useState } from 'react';
import { Bot, Sparkles, X, HelpCircle, CheckCircle2, ChevronRight, BookOpen, AlertOctagon, Terminal } from 'lucide-react';

export default function KapilMentorModal({ isOpen, onClose, topicContext, currentQuery }) {
  const [activeAspect, setActiveAspect] = useState('WHY'); // WHY, WHAT, HOW, WHERE_USED, COMMON_MISTAKE, INTERVIEW_QUESTION, PRACTICE_QUESTION

  if (!isOpen) return null;

  const title = topicContext?.title || 'Relational SQL & DBMS Concepts';

  const getAspectContent = () => {
    switch (activeAspect) {
      case 'WHY':
        return {
          heading: 'Why did this concept have to be invented?',
          text: topicContext?.theory?.why || 'Before this concept existed, computers suffered from data inconsistency, lack of atomicity, and massive disk I/O bottlenecks. Inventing this abstraction allowed decoupled, declarative applications to scale with integrity.'
        };
      case 'WHAT':
        return {
          heading: 'What is the precise engineering definition?',
          text: topicContext?.summary || 'A mathematical and structural guarantee provided by the relational database management system to ensure referential integrity, physical data independence, and declarative querying.'
        };
      case 'HOW':
        return {
          heading: 'How does it execute under the hood?',
          text: `Under the hood, the SQL parser compiles your query into an abstract syntax tree (AST), runs cost-based optimization (CBO), and evaluates physical operators such as Hash Join, Nested Loop, or Index Scan on 8KB disk pages.`
        };
      case 'WHERE_USED':
        return {
          heading: 'Where is this used in real production systems?',
          text: topicContext?.theory?.industryReality || 'Used by payment gateways, fintech ledgers (Stripe, Zerodha), e-commerce order catalogs (Amazon, Flipkart), and ride-sharing telemetry (Uber).'
        };
      case 'COMMON_MISTAKE':
        return {
          heading: 'What common mistake or trap catches junior developers?',
          text: topicContext?.theory?.commonMyth || 'A critical trap is confusing conceptual modeling with physical storage, or assuming the database engine will automatically fix non-sargable query predicates without proper indexing.'
        };
      case 'INTERVIEW_QUESTION':
        return {
          heading: 'What question do tech companies (TCS, Infosys, Amazon) ask on this?',
          text: topicContext?.quiz?.[0]?.question || 'Explain the internal difference between a full table scan and a B-Tree index scan, and how isolation levels prevent dirty reads.'
        };
      case 'PRACTICE_QUESTION':
        return {
          heading: 'Practice Challenge to Test Your Mastery',
          text: topicContext?.challenges?.[0]?.desc || 'Write an optimized query using WHERE, GROUP BY, and HAVING to compute department-wise metrics.'
        };
      default:
        return { heading: '', text: '' };
    }
  };

  const content = getAspectContent();

  const aspects = [
    { id: 'WHY', label: 'WHY', desc: 'First principles motivation' },
    { id: 'WHAT', label: 'WHAT', desc: 'Technical definition' },
    { id: 'HOW', label: 'HOW', desc: 'Syntax & Execution' },
    { id: 'WHERE_USED', label: 'WHERE USED', desc: 'Industry reality' },
    { id: 'COMMON_MISTAKE', label: 'COMMON MISTAKE', desc: 'Anti-patterns & Traps' },
    { id: 'INTERVIEW_QUESTION', label: 'INTERVIEW Q', desc: 'Tech screening questions' },
    { id: 'PRACTICE_QUESTION', label: 'PRACTICE Q', desc: 'Immediate challenge' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-black via-zinc-950 to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">Kapil's DBMS Mentor</span>
                <span className="text-[10px] bg-black text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 font-mono">
                  AI Guidance
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">{title}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aspects Tabs */}
        <div className="flex overflow-x-auto border-b border-zinc-800 bg-black/80 p-2 gap-1.5 scrollbar-none">
          {aspects.map(a => (
            <button
              key={a.id}
              onClick={() => setActiveAspect(a.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition font-bold ${
                activeAspect === a.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Mentor Content */}
        <div className="p-5 overflow-y-auto space-y-4 font-mono text-xs">
          <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2">
            <span className="text-amber-400 font-bold text-sm block">
              {content.heading}
            </span>
            <p className="text-zinc-300 leading-relaxed text-xs whitespace-pre-wrap">
              {content.text}
            </p>
          </div>

          {currentQuery && (
            <div className="bg-black/60 p-3 rounded-lg border border-zinc-800 text-[11px]">
              <span className="text-zinc-500 block mb-1">Your Currently Active SQL Query:</span>
              <pre className="text-amber-300 overflow-x-auto">{currentQuery}</pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/90 border-t border-zinc-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs rounded-lg transition border border-zinc-800"
          >
            Back to Code Lab
          </button>
        </div>
      </div>
    </div>
  );
}
