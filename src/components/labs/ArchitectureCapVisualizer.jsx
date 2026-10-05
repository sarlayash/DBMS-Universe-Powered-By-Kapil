import React, { useState } from 'react';
import { Share2, Server, Database, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const CAP_MODELS = {
  CP: {
    title: 'CP: Consistency + Partition Tolerance',
    examples: 'MongoDB, HBase, Redis Sentinel, Google Spanner (with TrueTime)',
    explanation: 'When network partitions occur, the system rejects writes to maintain strict consistency. Data is never out-of-sync, but availability is sacrificed.',
    bestFor: 'Financial systems, payment ledgers, authentication auth tokens.'
  },
  AP: {
    title: 'AP: Availability + Partition Tolerance',
    examples: 'Apache Cassandra, Amazon DynamoDB, CouchDB',
    explanation: 'When network partitions occur, all nodes continue accepting writes. Nodes temporarily diverge and resolve conflicts later via Eventual Consistency.',
    bestFor: 'E-commerce shopping carts, DNS lookup, social media posts, IoT sensor pings.'
  },
  CA: {
    title: 'CA: Consistency + Availability (Single DC)',
    examples: 'Traditional Single-Node PostgreSQL, MySQL, Oracle',
    explanation: 'Assumes zero network partition (impossible across distributed WAN networks). Provides full ACID transactions inside a single physical machine.',
    bestFor: 'Monolithic transactional backends, internal enterprise tools.'
  }
};

export default function ArchitectureCapVisualizer() {
  const [selectedCap, setSelectedCap] = useState('CP');
  const [activeArchTab, setActiveArchTab] = useState('cap'); // 'cap', 'replication', 'sharding'

  // Sharding test state
  const [testKey, setTestKey] = useState('user_8921');
  const [computedShard, setComputedShard] = useState('Shard 2 (Node 192.168.1.12)');

  const handleKeyChange = (val) => {
    setTestKey(val);
    let hash = 0;
    for (let i = 0; i < val.length; i++) hash += val.charCodeAt(i);
    const shardIdx = (hash % 3) + 1;
    setComputedShard(`Shard ${shardIdx} (Node 192.168.1.1${shardIdx})`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-1">
          <Share2 className="w-5 h-5" />
          <span>Level 19: Database Architecture & CAP Theorem Visualizer</span>
        </div>
        <p className="text-slate-300 text-sm">
          Eric Brewer's CAP Theorem dictates that any distributed data store can guarantee at most 2 out of 3 properties:
          <strong> Consistency, Availability, and Partition Tolerance</strong>.
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveArchTab('cap')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition ${
              activeArchTab === 'cap' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            CAP Theorem Explorer
          </button>
          <button
            onClick={() => setActiveArchTab('replication')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition ${
              activeArchTab === 'replication' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Master-Replica Replication
          </button>
          <button
            onClick={() => setActiveArchTab('sharding')}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition ${
              activeArchTab === 'sharding' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Horizontal Sharding & Hash Keys
          </button>
        </div>
      </div>

      {activeArchTab === 'cap' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(CAP_MODELS).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedCap(key)}
              className={`p-4 rounded-xl border text-left transition space-y-2 ${
                selectedCap === key
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-cyan-300 font-mono">{key} System</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {key === 'CP' ? 'Consistency First' : key === 'AP' ? 'Availability First' : 'Single Host'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{data.explanation}</p>
              <div className="pt-2 border-t border-slate-800/80 font-mono text-[11px]">
                <span className="text-slate-500 block">Real Examples:</span>
                <span className="text-slate-200">{data.examples}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeArchTab === 'replication' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
          <span className="text-cyan-400 font-bold block text-sm">
            Primary / Read-Replica Topology (Scale-Out Architecture)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-950 border border-cyan-500/50 p-4 rounded-xl space-y-1">
              <Server className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
              <span className="font-bold text-white block">Primary DB (Leader)</span>
              <span className="text-emerald-400 text-[11px] block">Handles 100% Writes (INSERT/UPDATE)</span>
              <span className="text-slate-500 text-[10px] block">Appends to Write-Ahead Log (WAL)</span>
            </div>

            <div className="flex flex-col items-center justify-center text-slate-400 text-[11px]">
              <span className="text-cyan-400 mb-1">Async Binary Log Stream &rarr;</span>
              <span className="text-slate-500 text-[10px]">(Replication Lag ~15ms)</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
              <Server className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <span className="font-bold text-white block">Read Replicas (Followers)</span>
              <span className="text-purple-300 text-[11px] block">Handles 95% Read Queries (SELECT)</span>
              <span className="text-slate-500 text-[10px] block">Promoted to Leader on failover</span>
            </div>
          </div>
        </div>
      )}

      {activeArchTab === 'sharding' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
          <span className="text-cyan-400 font-bold block text-sm">
            Consistent Hash Sharding Simulator
          </span>
          <p className="text-slate-300 text-xs">
            Enter any Shard Key (e.g. user_id, order_id) to see which database node receives the partition:
          </p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={testKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs w-48"
            />
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="bg-cyan-950 border border-cyan-500 text-cyan-300 px-3 py-1.5 rounded-lg font-bold">
              Routed to: {computedShard}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
