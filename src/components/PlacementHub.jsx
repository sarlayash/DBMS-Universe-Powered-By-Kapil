import React, { useState } from 'react';
import { GraduationCap, Code2, HelpCircle, Search, Filter, Play, CheckCircle2, Building, ChevronRight } from 'lucide-react';
import { PLACEMENT_QUESTIONS, PLACEMENT_FAQS } from '../data/placementQuestions';

export default function PlacementHub({ onSolveInIde }) {
  const [activeTab, setActiveTab] = useState('coding'); // 'coding', 'faqs'
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState(null);

  const filteredQuestions = PLACEMENT_QUESTIONS.filter(q => {
    if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery && !q.title.toLowerCase().includes(searchQuery.toLowerCase()) && !q.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#fef08a] font-bold text-lg mb-1">
              <GraduationCap className="w-5 h-5 text-[#fef08a]" />
              <span>Level 23: Placement Preparation Engine</span>
            </div>
            <p className="text-[#f5ece3] text-sm max-w-2xl">
              100+ Curated SQL Coding Questions (TCS, Infosys, Accenture, Cognizant, Wipro, Capgemini, Deloitte, Startups) & Top Technical Screening FAQs.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('coding')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                activeTab === 'coding'
                  ? 'bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] text-[#140d09] font-extrabold shadow-md shadow-yellow-400/20'
                  : 'bg-[#140d09] border border-[#382519] text-[#b8a495] hover:text-white'
              }`}
            >
              SQL Coding Engine (100+)
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                activeTab === 'faqs'
                  ? 'bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] text-[#140d09] font-extrabold shadow-md shadow-yellow-400/20'
                  : 'bg-[#140d09] border border-[#382519] text-[#b8a495] hover:text-white'
              }`}
            >
              Interview Theory FAQs
            </button>
          </div>
        </div>

        {/* Filters for coding questions */}
        {activeTab === 'coding' && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#382519]">
            <div className="flex gap-2">
              {['ALL', 'Basic', 'Intermediate', 'Advanced', 'Expert'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition font-semibold ${
                    selectedDifficulty === diff
                      ? 'bg-[#fef08a] text-[#140d09] font-extrabold shadow-sm'
                      : 'bg-[#140d09] border border-[#382519] text-[#b8a495] hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8c786a]" />
              <input
                type="text"
                placeholder="Search problem or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#140d09] border border-[#382519] rounded-xl text-xs font-mono text-white outline-none focus:border-[#fef08a]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Coding Questions View */}
      {activeTab === 'coding' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map(q => (
            <div
              key={q.id}
              className="bg-[#1c130e] border border-[#382519] hover:border-[#fef08a]/50 rounded-3xl p-5 flex flex-col justify-between transition space-y-3 font-mono text-xs shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    q.difficulty === 'Basic' ? 'bg-[#140d09] text-white border border-[#382519]' :
                    q.difficulty === 'Intermediate' ? 'bg-[#22160f] text-[#fef08a] border border-[#382519]' :
                    q.difficulty === 'Advanced' ? 'bg-[#2b1c13] text-[#fef08a] border border-[#fef08a]/40' :
                    'bg-[#fef08a] text-[#140d09] font-extrabold'
                  }`}>
                    {q.difficulty}
                  </span>
                  <span className="text-[10px] text-[#b8a495] flex items-center gap-1 bg-[#140d09] px-2 py-0.5 rounded-lg border border-[#382519]">
                    <Building className="w-3 h-3 text-[#fef08a]" />
                    {q.company}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm">{q.title}</h3>
                <p className="text-[#b8a495] text-xs leading-relaxed">{q.description}</p>
              </div>

              <div className="pt-2 border-t border-[#382519] flex items-center justify-between">
                <span className="text-[10px] text-[#8c786a]">{q.category}</span>
                {onSolveInIde && (
                  <button
                    onClick={() => onSolveInIde(q.initialQuery)}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] rounded-xl flex items-center gap-1 font-extrabold text-[11px] transition shadow-md shadow-yellow-400/20"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Solve in SQL Lab
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Top FAQs View */
        <div className="space-y-3">
          {PLACEMENT_FAQS.map(faq => (
            <div
              key={faq.id}
              className="bg-[#1c130e] border border-[#382519] rounded-2xl p-5 space-y-2 font-mono text-xs shadow-md"
            >
              <div className="flex items-center gap-2 text-[#fef08a] font-bold text-sm">
                <HelpCircle className="w-4 h-4 shrink-0 text-[#fef08a]" />
                <span>{faq.question}</span>
              </div>
              <p className="text-[#f5ece3] leading-relaxed text-xs pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
