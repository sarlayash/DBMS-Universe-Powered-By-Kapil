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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-1">
              <GraduationCap className="w-5 h-5" />
              <span>Level 23: Placement Preparation Engine</span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl">
              100+ Curated SQL Coding Questions (TCS, Infosys, Accenture, Cognizant, Wipro, Capgemini, Deloitte, Startups) & Top Technical Screening FAQs.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('coding')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                activeTab === 'coding' ? 'bg-emerald-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              SQL Coding Engine (100+)
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                activeTab === 'faqs' ? 'bg-emerald-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Interview Theory FAQs
            </button>
          </div>
        </div>

        {/* Filters for coding questions */}
        {activeTab === 'coding' && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex gap-2">
              {['ALL', 'Basic', 'Intermediate', 'Advanced', 'Expert'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition font-semibold ${
                    selectedDifficulty === diff
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search problem or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white"
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
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition space-y-3 font-mono text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    q.difficulty === 'Basic' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                    q.difficulty === 'Intermediate' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    q.difficulty === 'Advanced' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}>
                    {q.difficulty}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded">
                    <Building className="w-3 h-3 text-slate-500" />
                    {q.company}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm">{q.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{q.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{q.category}</span>
                {onSolveInIde && (
                  <button
                    onClick={() => onSolveInIde(q.initialQuery)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1 font-bold text-[11px] transition shadow"
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
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 font-mono text-xs"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>{faq.question}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
