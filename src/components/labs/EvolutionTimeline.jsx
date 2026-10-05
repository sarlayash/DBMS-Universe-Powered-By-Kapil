import React, { useState } from 'react';
import { History, ArrowDown, ChevronRight, Sparkles, Database, Server, Cpu } from 'lucide-react';

export const EVOLUTION_MILESTONES = [
  {
    era: '1960s',
    title: 'Flat Files & OS File Systems',
    problem: 'Companies needed to store digital records for employee payroll and banking.',
    breakdown: 'Severe data redundancy, no concurrent write locking, no atomicity, file format incompatibilities.',
    solution: 'OS files (txt, binary records).'
  },
  {
    era: 'Late 1960s',
    title: 'Hierarchical Databases (IBM IMS)',
    problem: 'Managing complex Bill-of-Materials for Apollo Moon Missions.',
    breakdown: 'Rigid tree structures: a child could only have exactly one parent. Inflexible many-to-many relationships.',
    solution: 'Hierarchical tree pointer models.'
  },
  {
    era: 'Early 1970s',
    title: 'Network Databases (CODASYL DBTG)',
    problem: 'Need to model many-to-many relationships without data duplication.',
    breakdown: 'Developers had to write complex imperative pointer traversal code (e.g. `FIND NEXT RECORD IN SET`). Fragile against schema modifications.',
    solution: 'Network graph pointer records.'
  },
  {
    era: '1970 - 1979',
    title: 'Relational Model Revolution (Edgar F. Codd & System R)',
    problem: 'Decouple application programs from physical storage structures (Physical & Logical Data Independence).',
    breakdown: 'Mathematical relational algebra, relations, tuples, declarative querying.',
    solution: 'Birth of the Relational Model and ANSI SQL.'
  },
  {
    era: '1980s - 1990s',
    title: 'Commercial Enterprise RDBMS Boom',
    problem: 'Enterprises required bulletproof ACID guarantees, concurrency control, and multi-user scaling.',
    breakdown: 'Oracle Database, IBM DB2, Microsoft SQL Server, PostgreSQL, MySQL.',
    solution: 'B-Tree indexes, Write-Ahead Logging (WAL), cost-based query optimizers.'
  },
  {
    era: '2000s',
    title: 'Web-Scale & The NoSQL Wave',
    problem: 'Google, Amazon, and Facebook faced billions of daily web visits and petabytes of data that could not fit onto a single relational server.',
    breakdown: 'Relational ACID locks were too slow for distributed clusters across worldwide data centers.',
    solution: 'Google Bigtable, Amazon Dynamo, MongoDB, Apache Cassandra, Redis.'
  },
  {
    era: '2010s',
    title: 'NewSQL & Globally Distributed Cloud DBs',
    problem: 'Financial and global platforms needed BOTH horizontal scaling AND strict ACID transactions across multiple cloud regions.',
    breakdown: 'NoSQL eventual consistency led to balance discrepancies and phantom shopping carts.',
    solution: 'Google Spanner (TrueTime GPS atomic clocks), CockroachDB, AWS Aurora.'
  },
  {
    era: '2020s - Present',
    title: 'AI-Native, Serverless & Vector Databases',
    problem: 'AI Large Language Models (LLMs) and embeddings require millisecond similarity search across millions of high-dimensional floating-point vectors.',
    breakdown: 'Traditional B-Trees cannot perform nearest-neighbor searches in 1536-dimensional space.',
    solution: 'pgvector, Pinecone, Milvus, Qdrant with HNSW graph indexing.'
  }
];

export default function EvolutionTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(3); // Default to relational revolution

  const active = EVOLUTION_MILESTONES[selectedIdx];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <History className="w-5 h-5 text-amber-400" />
          <span>Level 18: Database Evolution Interactive Visual Timeline</span>
        </div>
        <p className="text-zinc-300 text-sm">
          "Technology evolves because the problems evolve." Follow the evolutionary chain from 1960s flat files to 2026 AI vector engines!
        </p>

        {/* Timeline Horizontal Selector */}
        <div className="flex overflow-x-auto gap-2 mt-5 pb-2 scrollbar-none font-mono text-xs">
          {EVOLUTION_MILESTONES.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition font-bold border ${
                selectedIdx === idx
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black border-amber-400 shadow-lg shadow-amber-500/20 font-extrabold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {m.era}: {m.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Era Deep Dive Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 font-mono text-xs space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{active.era} ERA</span>
            <h2 className="text-base font-bold text-white mt-0.5">{active.title}</h2>
          </div>
          <span className="text-[11px] bg-zinc-950 text-zinc-400 px-3 py-1 rounded-full border border-zinc-800 self-start sm:self-auto">
            Evolution Step {selectedIdx + 1} of 8
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950 p-4 rounded-xl border border-red-900/40 space-y-1.5 shadow-md">
            <span className="text-red-400 font-bold block">The Bottleneck / Crisis:</span>
            <p className="text-zinc-300 leading-relaxed text-[11px]">{active.breakdown}</p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5 shadow-md">
            <span className="text-zinc-200 font-bold block">Business Problem Trigger:</span>
            <p className="text-zinc-300 leading-relaxed text-[11px]">{active.problem}</p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/40 space-y-1.5 shadow-md">
            <span className="text-amber-400 font-bold block">Architectural Innovation:</span>
            <p className="text-zinc-300 leading-relaxed text-[11px]">{active.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
