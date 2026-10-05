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
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <Share2 className="w-5 h-5 text-amber-400" />
          <span>Level 19: Database Architecture & CAP Theorem Visualizer</span>
        </div>
        <p className="text-zinc-300 text-sm">
          Eric Brewer's CAP Theorem dictates that any distributed data store can guarantee at most 2 out of 3 properties:
          <strong> Consistency, Availability, and Partition Tolerance</strong>.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {[
            { id: 'cap', label: 'CAP Theorem Explorer' },
            { id: 'replication', label: 'Primary-Replica Topology' },
            { id: 'sharding', label: 'Horizontal Sharding & Hash Keys' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveArchTab(tab.id)}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition border ${
                activeArchTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeArchTab === 'cap' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(CAP_MODELS).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedCap(key)}
              className={`p-5 rounded-2xl border text-left transition space-y-3 ${
                selectedCap === key
                  ? 'bg-zinc-900 border-amber-500 shadow-xl shadow-amber-500/10'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-amber-400 font-mono">{key} System</span>
                <span className="text-[10px] bg-zinc-950 text-zinc-300 px-2.5 py-0.5 rounded-full border border-zinc-800 font-mono">
                  {key === 'CP' ? 'Consistency First' : key === 'AP' ? 'Availability First' : 'Single Host'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{data.explanation}</p>
              <div className="pt-2 border-t border-zinc-800 font-mono text-[11px]">
                <span className="text-zinc-500 block mb-0.5">Real Examples:</span>
                <span className="text-amber-300 font-medium">{data.examples}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeArchTab === 'replication' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 font-mono text-xs shadow-xl">
          <span className="text-amber-400 font-bold block text-sm">
            Primary / Read-Replica Topology (Scale-Out Architecture)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-zinc-950 border border-amber-500/50 p-5 rounded-2xl space-y-1.5 shadow-lg">
              <Server className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <span className="font-bold text-white block">Primary DB (Leader)</span>
              <span className="text-amber-300 text-[11px] block font-semibold">Handles 100% Writes (INSERT/UPDATE)</span>
              <span className="text-zinc-500 text-[10px] block">Appends to Write-Ahead Log (WAL)</span>
            </div>

            <div className="flex flex-col items-center justify-center text-zinc-400 text-[11px] py-4">
              <span className="text-amber-400 font-bold mb-1">Async Binary Log Stream &rarr;</span>
              <span className="text-zinc-500 text-[10px]">(Replication Lag ~15ms)</span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-1.5 shadow-lg">
              <Server className="w-6 h-6 text-zinc-300 mx-auto mb-1" />
              <span className="font-bold text-white block">Read Replicas (Followers)</span>
              <span className="text-zinc-300 text-[11px] block font-semibold">Handles 95% Read Queries (SELECT)</span>
              <span className="text-zinc-500 text-[10px] block">Promoted to Leader on failover</span>
            </div>
          </div>
        </div>
      )}

      {activeArchTab === 'sharding' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 font-mono text-xs shadow-xl">
          <span className="text-amber-400 font-bold block text-sm">
            Consistent Hash Sharding Simulator
          </span>
          <p className="text-zinc-300 text-xs">
            Enter any Shard Key (e.g. user_id, order_id) to see which database node receives the partition:
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={testKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              className="bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-white font-mono text-xs w-52 focus:border-amber-400 outline-none"
            />
            <ArrowRight className="w-4 h-4 text-zinc-500" />
            <span className="bg-zinc-950 border border-amber-500/60 text-amber-300 px-4 py-2 rounded-xl font-bold shadow-md">
              Routed to: {computedShard}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
