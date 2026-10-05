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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Level 23: Placement Preparation Engine</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-2xl">
              100+ Curated SQL Coding Questions (TCS, Infosys, Accenture, Cognizant, Wipro, Capgemini, Deloitte, Startups) & Top Technical Screening FAQs.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('coding')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                activeTab === 'coding' ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold shadow-md shadow-amber-500/20' : 'bg-black border border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              SQL Coding Engine (100+)
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                activeTab === 'faqs' ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold shadow-md shadow-amber-500/20' : 'bg-black border border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              Interview Theory FAQs
            </button>
          </div>
        </div>

        {/* Filters for coding questions */}
        {activeTab === 'coding' && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-800/80">
            <div className="flex gap-2">
              {['ALL', 'Basic', 'Intermediate', 'Advanced', 'Expert'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition font-semibold ${
                    selectedDifficulty === diff
                      ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                      : 'bg-black border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search problem or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white outline-none focus:border-amber-400"
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
              className="bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition space-y-3 font-mono text-xs shadow-lg shadow-black/40"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    q.difficulty === 'Basic' ? 'bg-zinc-850 text-zinc-300 border border-zinc-700' :
                    q.difficulty === 'Intermediate' ? 'bg-zinc-900 text-amber-300 border border-amber-500/40' :
                    q.difficulty === 'Advanced' ? 'bg-amber-950/60 text-amber-400 border border-amber-600/50' :
                    'bg-gold-gradient text-black font-extrabold'
                  }`}>
                    {q.difficulty}
                  </span>
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1 bg-black px-2 py-0.5 rounded border border-zinc-850">
                    <Building className="w-3 h-3 text-zinc-500" />
                    {q.company}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm">{q.title}</h3>
                <p className="text-zinc-300 text-xs leading-relaxed">{q.description}</p>
              </div>

              <div className="pt-2 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">{q.category}</span>
                {onSolveInIde && (
                  <button
                    onClick={() => onSolveInIde(q.initialQuery)}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-110 text-black rounded-lg flex items-center gap-1 font-extrabold text-[11px] transition shadow-md shadow-amber-500/20"
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
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-2 font-mono text-xs shadow-md"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>{faq.question}</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-xs pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
