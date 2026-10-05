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
    pros: 'Index-free adjacency: traversing relationships is O(1) per hop regardless of dataset size',
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
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-[#fef08a] font-bold text-lg mb-1">
          <Scale className="w-5 h-5 text-[#fef08a]" />
          <span>Level 16: Database Architecture Comparison Engine</span>
        </div>
        <p className="text-[#f5ece3] text-sm">
          "Learn the concept first. Learn the product second." Compare enterprise database engines to understand
          <strong> when and why</strong> an engineering team chooses PostgreSQL over MongoDB or Cassandra.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
          <div className="flex gap-2">
            {['ALL', 'RELATIONAL', 'NOSQL'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition font-bold border ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] text-[#140d09] border-[#fef08a] shadow-md shadow-yellow-400/20'
                    : 'bg-[#140d09] border-[#382519] text-[#b8a495] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8c786a]" />
            <input
              type="text"
              placeholder="Search database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-[#140d09] border border-[#382519] rounded-xl text-xs font-mono text-white focus:border-[#fef08a] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Selector */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl p-6 shadow-xl">
        <span className="text-xs font-mono uppercase text-[#b8a495] font-bold block mb-3">
          Head-to-Head Architecture Showdown:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={compareDbs[0]}
            onChange={(e) => setCompareDbs([e.target.value, compareDbs[1]])}
            className="bg-[#140d09] border border-[#382519] rounded-xl px-3.5 py-2 text-xs font-mono text-[#fef08a] focus:border-[#fef08a] outline-none"
          >
            {DATABASE_PROFILES.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
          <span className="text-xs font-bold text-[#8c786a]">VS</span>
          <select
            value={compareDbs[1]}
            onChange={(e) => setCompareDbs([compareDbs[0], e.target.value])}
            className="bg-[#140d09] border border-[#382519] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:border-[#fef08a] outline-none"
          >
            {DATABASE_PROFILES.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Head-to-Head Comparison Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 font-mono text-xs">
          <div className="bg-[#140d09] p-5 rounded-2xl border border-[#fef08a]/40 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#382519] pb-2.5">
              <span className="text-[#fef08a] font-bold text-base">{dbA.name}</span>
              <span className="text-[#8c786a] text-[11px]">{dbA.license}</span>
            </div>
            <div><span className="text-[#8c786a]">Data Model:</span> <span className="text-white font-medium">{dbA.model}</span></div>
            <div><span className="text-[#8c786a]">Query Language:</span> <span className="text-[#f5ece3]">{dbA.sql}</span></div>
            <div><span className="text-[#8c786a]">ACID Transactions:</span> <span className="text-[#fef08a] font-bold">{dbA.transactions}</span></div>
            <div><span className="text-[#8c786a]">CAP Theorem:</span> <span className="text-[#fef08a]">{dbA.cap}</span></div>
            <div><span className="text-[#8c786a]">Scaling:</span> <span className="text-[#b8a495]">{dbA.scaling}</span></div>
            <div className="pt-2.5 border-t border-[#382519]">
              <span className="text-[#fef08a] font-bold block mb-1">When to Choose:</span>
              <p className="text-[#b8a495] text-[11px] leading-relaxed">{dbA.typicalUse}</p>
            </div>
          </div>

          <div className="bg-[#140d09] p-5 rounded-2xl border border-[#382519] space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#382519] pb-2.5">
              <span className="text-white font-bold text-base">{dbB.name}</span>
              <span className="text-[#8c786a] text-[11px]">{dbB.license}</span>
            </div>
            <div><span className="text-[#8c786a]">Data Model:</span> <span className="text-white font-medium">{dbB.model}</span></div>
            <div><span className="text-[#8c786a]">Query Language:</span> <span className="text-[#f5ece3]">{dbB.sql}</span></div>
            <div><span className="text-[#8c786a]">ACID Transactions:</span> <span className="text-[#fef08a] font-bold">{dbB.transactions}</span></div>
            <div><span className="text-[#8c786a]">CAP Theorem:</span> <span className="text-[#fef08a]">{dbB.cap}</span></div>
            <div><span className="text-[#8c786a]">Scaling:</span> <span className="text-[#b8a495]">{dbB.scaling}</span></div>
            <div className="pt-2.5 border-t border-[#382519]">
              <span className="text-[#fef08a] font-bold block mb-1">When to Choose:</span>
              <p className="text-[#b8a495] text-[11px] leading-relaxed">{dbB.typicalUse}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Database Matrix Table */}
      <div className="bg-[#1c130e] border border-[#382519] rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#140d09] border-b border-[#382519] text-xs font-mono font-bold text-white">
          Complete Industry Database Taxonomy Matrix
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#140d09] text-[#fef08a] border-b border-[#382519]">
              <tr>
                <th className="p-3.5">Database</th>
                <th className="p-3.5">Data Model</th>
                <th className="p-3.5">SQL Support</th>
                <th className="p-3.5">Transactions</th>
                <th className="p-3.5">Primary Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#382519] text-[#f5ece3]">
              {filtered.map(db => (
                <tr key={db.name} className="hover:bg-[#22160f] transition">
                  <td className="p-3.5 font-bold text-white">{db.name}</td>
                  <td className="p-3.5">{db.model}</td>
                  <td className="p-3.5">{db.sql}</td>
                  <td className="p-3.5 text-[#fef08a]">{db.transactions}</td>
                  <td className="p-3.5 text-[#b8a495] text-[11px] max-w-xs">{db.typicalUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
