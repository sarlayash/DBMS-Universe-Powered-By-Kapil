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
          text: topicContext?.theory?.why || 'Before this concept existed, computer systems suffered from data anomalies, lost updates under concurrent access, and unpredictable disk I/O bottlenecks. Inventing this abstraction allowed decoupled, declarative applications to scale with integrity.'
        };
      case 'WHAT':
        return {
          heading: 'What is the precise engineering definition?',
          text: topicContext?.summary || 'A mathematical and structural guarantee provided by the relational database management system to ensure referential integrity, physical data independence, and declarative querying.'
        };
      case 'HOW':
        return {
          heading: 'How does it execute under the hood?',
          text: `Under the hood, the SQL parser compiles your declarative statement into an Abstract Syntax Tree (AST), performs cost-based optimization (CBO), and evaluates physical operators such as Hash Join, B-Tree Index Seek, or Table Scans across disk pages.`
        };
      case 'WHERE_USED':
        return {
          heading: 'Where is this used in real production systems?',
          text: topicContext?.theory?.industryReality || 'Used by payment gateways, fintech ledgers (Stripe, Zerodha), e-commerce order catalogs (Amazon, Flipkart), and ride-sharing telemetry (Uber).'
        };
      case 'COMMON_MISTAKE':
        return {
          heading: 'What common mistake or trap catches developers?',
          text: topicContext?.theory?.commonMyth || 'A critical trap is confusing conceptual modeling with physical storage, or assuming the database engine will automatically fix non-sargable query predicates without proper index design.'
        };
      case 'INTERVIEW_QUESTION':
        return {
          heading: 'What question do tech companies ask on this?',
          text: topicContext?.quiz?.[0]?.question || 'Explain the internal difference between a clustered and non-clustered index, and how ACID isolation levels prevent phantom reads.'
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
    <div className="fixed inset-0 z-50 bg-[#140d09]/85 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="bg-[#1c130e] border border-[#382519] w-full max-w-2xl rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#140d09] border-b border-[#382519] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#22160f] border border-[#fef08a]/40 flex items-center justify-center text-[#fef08a] shadow-sm">
              <Bot className="w-5 h-5 text-[#fef08a]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">Kapil's DBMS Mentor</span>
                <span className="text-[10px] bg-[#1c130e] text-[#fef08a] px-1.5 py-0.5 rounded border border-[#382519] font-mono">
                  SarlaYash AI
                </span>
              </div>
              <span className="text-xs text-[#b8a495] font-mono">{title}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#b8a495] hover:text-white rounded-lg hover:bg-[#251810] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aspects Tabs */}
        <div className="flex overflow-x-auto border-b border-[#382519] bg-[#140d09] p-2 gap-1.5 scrollbar-none">
          {aspects.map(a => (
            <button
              key={a.id}
              onClick={() => setActiveAspect(a.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition font-bold ${
                activeAspect === a.id
                  ? 'bg-gradient-to-r from-[#fef08a] to-[#fde047] text-[#140d09] shadow-md shadow-yellow-400/20'
                  : 'bg-[#1c130e] text-[#b8a495] hover:text-white hover:bg-[#251810] border border-[#382519]'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-[#1c130e] to-[#140d09]">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#fef08a] font-bold block">
              {activeAspect} Perspective:
            </span>
            <h2 className="text-base font-bold text-white">
              {content.heading}
            </h2>
          </div>

          <div className="bg-[#140d09] border border-[#382519] rounded-2xl p-4 text-xs font-mono text-[#f5ece3] leading-relaxed">
            {content.text}
          </div>

          {currentQuery && (
            <div className="pt-2 border-t border-[#382519]">
              <span className="text-[11px] font-mono text-[#8c786a] block mb-1">
                Contextual SQL Inspection:
              </span>
              <pre className="bg-[#140d09] border border-[#382519] p-2.5 rounded-xl text-[11px] text-[#fef08a] overflow-x-auto">
                {currentQuery}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#140d09] border-t border-[#382519] flex items-center justify-between text-xs font-mono">
          <span className="text-[#8c786a] text-[11px]">
            Powered By Kapil • 25% Theory + 75% Hands-On Practice
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#251810] hover:bg-[#312015] border border-[#382519] text-[#fef08a] rounded-xl font-bold transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
