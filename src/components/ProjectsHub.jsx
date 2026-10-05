import React, { useState } from 'react';
import { Briefcase, Code2, Database, Play, CheckCircle2, Copy, Download } from 'lucide-react';
import { REAL_PROJECTS } from '../data/realProjects';
import { sqlEngine } from '../services/sqlEngine';

export default function ProjectsHub({ onRunQueryInIde }) {
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const currentProject = REAL_PROJECTS.find(p => p.id === selectedProjectId) || REAL_PROJECTS[0];

  const handleCopySchema = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg mb-1">
          <Briefcase className="w-5 h-5" />
          <span>Level 22: 10 Major Industry Database Projects</span>
        </div>
        <p className="text-slate-300 text-sm max-w-2xl">
          Build and explore complete production-grade database systems with full schemas, key analytical queries, and business constraints.
        </p>

        {/* Project Selector Chips */}
        <div className="flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-none font-mono text-xs">
          {REAL_PROJECTS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition font-semibold border ${
                selectedProjectId === p.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Project {p.id}: {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Project Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Column: Specs & Business Constraints */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div>
            <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">
              {currentProject.category} • {currentProject.difficulty}
            </span>
            <h2 className="text-base font-bold text-white mt-1">
              {currentProject.title}
            </h2>
            <p className="text-slate-300 text-xs mt-2 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-2 uppercase text-[11px]">
              Key Relational Entities:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentProject.entities.map(e => (
                <span key={e} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300">
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-2 uppercase text-[11px]">
              Architectural Constraints:
            </span>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
              {currentProject.keyFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Schema DDL & Sample Queries */}
        <div className="lg:col-span-2 space-y-4">
          {/* Schema DDL */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                DDL Production Schema Definition
              </span>
              <button
                onClick={() => handleCopySchema(currentProject.sampleSchemaDDL, currentProject.id)}
                className="text-xs hover:text-white flex items-center gap-1"
              >
                {copiedId === currentProject.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === currentProject.id ? 'Copied' : 'Copy SQL'}
              </button>
            </div>
            <pre className="text-indigo-200 overflow-x-auto text-[11px] leading-relaxed p-2 bg-slate-900/50 rounded-lg">
              {currentProject.sampleSchemaDDL}
            </pre>
          </div>

          {/* Starter Queries */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="font-bold text-white block text-[11px] uppercase">
              Production Analytical Queries:
            </span>
            <div className="space-y-2">
              {currentProject.starterQueries.map((q, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                  <pre className="text-emerald-300 overflow-x-auto text-[11px] flex-1">{q}</pre>
                  {onRunQueryInIde && (
                    <button
                      onClick={() => onRunQueryInIde(q)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1 shrink-0 transition"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Run in Lab
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
