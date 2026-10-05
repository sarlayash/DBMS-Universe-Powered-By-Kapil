import React, { useState } from 'react';
import { Scale, Check, X, Info, Search, Filter } from 'lucide-react';

export const DATABASE_PROFILES = [
  {
    name: 'PostgreSQL',
    model: 'Relational (Object-Relational)',
    sql: 'Yes (ANSI Compliant)',
    transactions: 'Full ACID (MVCC)',
    scaling: 'Vertical (Read Replicas, Citus for Sharding)',
    cap: 'CA (Consistent & Available under normal network)',
    license: 'Open Source (PostgreSQL License)',
    typicalUse: 'Enterprise web apps, complex financial ledgers, GIS spatial data (PostGIS), AI vectors (pgvector)',
    pros: 'Extensible, rich data types, JSONB indexing, strict integrity',
    cons: 'Higher connection memory footprint, connection pooling required'
  },
  {
    name: 'MySQL',
    model: 'Relational',
    sql: 'Yes',
    transactions: 'Full ACID (InnoDB engine)',
    scaling: 'Vertical (Group Replication, Vitess for Sharding)',
    cap: 'CA',
    license: 'Open Source (GPL) & Commercial (Oracle)',
    typicalUse: 'E-commerce, CMS platforms (WordPress), read-heavy web applications',
    pros: 'Extremely popular, mature ecosystem, fast read throughput',
    cons: 'Historically weaker optimizer than Postgres, fewer advanced data types'
  },
  {
    name: 'Oracle Database',
    model: 'Relational / Multi-model',
    sql: 'Yes (PL/SQL)',
    transactions: 'Full ACID (Enterprise Grade)',
    scaling: 'Vertical & Oracle RAC (Clustering)',
    cap: 'CA',
    license: 'Commercial Enterprise (High Cost)',
    typicalUse: 'Global Fortune 500 banks, airlines, government tax systems',
    pros: 'Extremely sophisticated optimizer, mission-critical reliability',
    cons: 'Astronomical licensing fees, complex vendor lock-in'
  },
  {
    name: 'Microsoft SQL Server',
    model: 'Relational',
    sql: 'Yes (T-SQL)',
    transactions: 'Full ACID',
    scaling: 'Vertical & AlwaysOn Availability Groups',
    cap: 'CA',
    license: 'Commercial (Microsoft)',
    typicalUse: 'Corporate Windows/.NET ecosystems, healthcare records, ERPs',
    pros: 'Superb tooling (SSMS), tight Windows Server & Active Directory integration',
    cons: 'Licensing costs, less prevalent in modern Linux microservices'
  },
  {
    name: 'MongoDB',
    model: 'Document (BSON)',
    sql: 'No (MQL / Aggregation Pipeline)',
    transactions: 'Multi-document ACID (since v4.0)',
    scaling: 'Horizontal native sharding',
    cap: 'CP (Consistent & Partition Tolerant)',
    license: 'SSPL (Server Side Public License)',
    typicalUse: 'Dynamic catalogs, content management, polymorphic nested entities, mobile backends',
    pros: 'Schema flexibility, rapid prototyping, built-in horizontal sharding',
    cons: 'No cross-collection foreign key constraints, memory hungry'
  },
  {
    name: 'Redis',
    model: 'Key-Value (In-Memory Data Structures)',
    sql: 'No (Redis Command Set)',
    transactions: 'Atomic operations (MULTI/EXEC)',
    scaling: 'Horizontal (Redis Cluster, Sentinel)',
    cap: 'CP',
    license: 'RSALv2 / SSPL',
    typicalUse: 'Sub-millisecond caching, session tokens, real-time leaderboards, pub/sub messaging',
    pros: 'Sub-millisecond latency, versatile data structures (Hashes, Sets, Streams)',
    cons: 'Dataset constrained by available physical RAM, asynchronous disk persistence'
  },
  {
    name: 'Apache Cassandra',
    model: 'Wide-Column Store',
    sql: 'No (CQL - Cassandra Query Language)',
    transactions: 'Tunable Consistency (No ACID multi-row transactions)',
    scaling: 'Peer-to-peer masterless horizontal scaling',
    cap: 'AP (Available & Partition Tolerant)',
    license: 'Open Source (Apache 2.0)',
    typicalUse: 'IoT telemetry, activity logging, massive write throughput across multiple global regions',
    pros: 'Zero single point of failure, linearly scalable write performance',
    cons: 'No joins, requires designing tables strictly around specific query access patterns'
  },
  {
    name: 'Neo4j',
    model: 'Graph Database',
    sql: 'No (Cypher Query Language)',
    transactions: 'Full ACID',
    scaling: 'Causal Clustering',
    cap: 'CA / CP',
    license: 'GPLv3 / Enterprise',
    typicalUse: 'Social networks, fraud detection rings, recommendation engines, knowledge graphs',
    pros: 'Index-free adjacency: traversing relationships is $O(1)$ per hop regardless of dataset size',
    cons: 'Specialized for deep graph traversal; poor fit for flat tabular financial ledgers'
  },
  {
    name: 'SQLite',
    model: 'Relational (Serverless In-Process)',
    sql: 'Yes',
    transactions: 'Full ACID',
    scaling: 'Embedded / Single Machine',
    cap: 'Local Single Node',
    license: 'Public Domain',
    typicalUse: 'Mobile apps (iOS/Android), desktop apps, browser caches, IoT edge devices',
    pros: 'Zero configuration, zero server management, single file database',
    cons: 'Single writer at a time; not suited for high concurrent write web traffic'
  }
];

export default function DbComparisonEngine() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareDbs, setCompareDbs] = useState(['PostgreSQL', 'MongoDB']);

  const filtered = DATABASE_PROFILES.filter(db => {
    if (selectedFilter === 'RELATIONAL' && !db.model.includes('Relational')) return false;
    if (selectedFilter === 'NOSQL' && db.model.includes('Relational')) return false;
    if (searchQuery && !db.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const dbA = DATABASE_PROFILES.find(d => d.name === compareDbs[0]) || DATABASE_PROFILES[0];
  const dbB = DATABASE_PROFILES.find(d => d.name === compareDbs[1]) || DATABASE_PROFILES[4];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg mb-1">
          <Scale className="w-5 h-5" />
          <span>Level 16: Database Comparison Engine</span>
        </div>
        <p className="text-slate-300 text-sm">
          "Learn the concept first. Learn the product second." Compare enterprise database engines to understand
          <strong> when and why</strong> an engineering team chooses PostgreSQL over MongoDB or Cassandra.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex gap-2">
            {['ALL', 'RELATIONAL', 'NOSQL'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition font-semibold ${
                  selectedFilter === filter ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white"
            />
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-3">
          Head-to-Head Architecture Showdown:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={compareDbs[0]}
            onChange={(e) => setCompareDbs([e.target.value, compareDbs[1]])}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300"
          >
            {DATABASE_PROFILES.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
          <span className="text-xs font-bold text-slate-500">VS</span>
          <select
            value={compareDbs[1]}
            onChange={(e) => setCompareDbs([compareDbs[0], e.target.value])}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-purple-300"
          >
            {DATABASE_PROFILES.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Head-to-Head Comparison Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-indigo-400 font-bold text-sm">{dbA.name}</span>
              <span className="text-slate-500 text-[11px]">{dbA.license}</span>
            </div>
            <div><span className="text-slate-500">Data Model:</span> <span className="text-slate-200">{dbA.model}</span></div>
            <div><span className="text-slate-500">Query Language:</span> <span className="text-slate-200">{dbA.sql}</span></div>
            <div><span className="text-slate-500">ACID Transactions:</span> <span className="text-emerald-400">{dbA.transactions}</span></div>
            <div><span className="text-slate-500">CAP Theorem:</span> <span className="text-amber-400">{dbA.cap}</span></div>
            <div><span className="text-slate-500">Scaling:</span> <span className="text-slate-300">{dbA.scaling}</span></div>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-indigo-300 font-bold block mb-1">When to Choose:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">{dbA.typicalUse}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-purple-400 font-bold text-sm">{dbB.name}</span>
              <span className="text-slate-500 text-[11px]">{dbB.license}</span>
            </div>
            <div><span className="text-slate-500">Data Model:</span> <span className="text-slate-200">{dbB.model}</span></div>
            <div><span className="text-slate-500">Query Language:</span> <span className="text-slate-200">{dbB.sql}</span></div>
            <div><span className="text-slate-500">ACID Transactions:</span> <span className="text-emerald-400">{dbB.transactions}</span></div>
            <div><span className="text-slate-500">CAP Theorem:</span> <span className="text-amber-400">{dbB.cap}</span></div>
            <div><span className="text-slate-500">Scaling:</span> <span className="text-slate-300">{dbB.scaling}</span></div>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-purple-300 font-bold block mb-1">When to Choose:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">{dbB.typicalUse}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Database Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-3 bg-slate-950/80 border-b border-slate-800 text-xs font-mono font-bold text-slate-300">
          Complete Industry Database Taxonomy Matrix
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-800/60 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3">Database</th>
                <th className="p-3">Data Model</th>
                <th className="p-3">SQL Support</th>
                <th className="p-3">Transactions</th>
                <th className="p-3">Primary Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map(db => (
                <tr key={db.name} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">{db.name}</td>
                  <td className="p-3">{db.model}</td>
                  <td className="p-3">{db.sql}</td>
                  <td className="p-3 text-emerald-400">{db.transactions}</td>
                  <td className="p-3 text-slate-400 text-[11px] max-w-xs">{db.typicalUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
