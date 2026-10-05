import React, { useState } from 'react';
import { Briefcase, Code2, Database, Play, CheckCircle2, Copy, Download, Check } from 'lucide-react';
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
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-[#fef08a] font-bold text-lg mb-1">
          <Briefcase className="w-5 h-5 text-[#fef08a]" />
          <span>Level 22: 10 Major Industry Database Projects</span>
        </div>
        <p className="text-[#f5ece3] text-sm max-w-2xl">
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
                  ? 'bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] border-[#fef08a] text-[#140d09] font-extrabold shadow-lg shadow-yellow-400/20'
                  : 'bg-[#140d09] border-[#382519] text-[#b8a495] hover:text-white'
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
        <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-5 space-y-4 shadow-xl">
          <div>
            <span className="text-[10px] text-[#fef08a] uppercase font-bold tracking-wider">
              {currentProject.category} • {currentProject.difficulty}
            </span>
            <h2 className="text-base font-bold text-white mt-1">
              {currentProject.title}
            </h2>
            <p className="text-[#b8a495] text-xs mt-2 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#382519]">
            <span className="text-white font-bold block text-xs">
              Engineering Architecture:
            </span>
            <ul className="space-y-1.5 text-[#b8a495] text-[11px]">
              <li className="flex items-center gap-1.5">
                <span className="text-[#fef08a]">•</span> Primary Tables: {currentProject.tablesCount || '4-8'} Relations
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#fef08a]">•</span> Integrity: Foreign Key Constraints & Triggers
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#fef08a]">•</span> Concurrency: Strict ACID Serializability
              </li>
            </ul>
          </div>

          {currentProject.schemaSql && (
            <div className="pt-2">
              <button
                onClick={() => handleCopySchema(currentProject.schemaSql, 'schema')}
                className="w-full py-2 bg-[#140d09] hover:bg-[#251810] border border-[#382519] text-[#fef08a] rounded-xl flex items-center justify-center gap-2 transition font-bold"
              >
                {copiedId === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'schema' ? 'Schema Copied!' : 'Copy Complete DDL Schema'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right 2 Columns: Production Queries & Schema Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-5 space-y-3 shadow-xl">
            <span className="text-xs uppercase text-[#fef08a] font-bold block">
              Core Analytical & Production Queries:
            </span>

            <div className="space-y-3">
              {currentProject.queries?.map((q, idx) => (
                <div key={idx} className="bg-[#140d09] border border-[#382519] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-xs">{q.title}</span>
                    {onRunQueryInIde && (
                      <button
                        onClick={() => onRunQueryInIde(q.sql)}
                        className="px-2.5 py-1 bg-gradient-to-r from-[#fef08a] to-[#fde047] text-[#140d09] font-bold rounded-lg text-[10px] flex items-center gap-1 hover:brightness-110 transition"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Run in IDE
                      </button>
                    )}
                  </div>
                  <pre className="text-[11px] text-[#fef08a] overflow-x-auto p-2 bg-[#18110b] rounded-xl border border-[#382519]">
                    {q.sql}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
