import React, { useState } from 'react';
import { Search, Gauge, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IndexExplorer() {
  const [targetId, setTargetId] = useState(7421);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const runSimulation = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        target: targetId,
        seqDiskIo: targetId,
        seqLatencyMs: (targetId * 0.04).toFixed(1),
        btreeDiskIo: 3,
        btreeLatencyMs: '0.12',
        speedup: ((targetId * 0.04) / 0.12).toFixed(0)
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <Search className="w-5 h-5 text-amber-400" />
          <span>Level 11: B-Tree Index Explorer vs Full Table Scan</span>
        </div>
        <p className="text-zinc-300 text-sm">
          A table contains 10,000 employee records on disk. Enter a target ID to search for and compare the physical disk I/O operations required by a Sequential Scan versus a B-Tree Index!
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-5">
          <span className="text-xs font-mono text-zinc-400">Search Target ID (1 - 10000):</span>
          <input
            type="number"
            min="1"
            max="10000"
            value={targetId}
            onChange={(e) => setTargetId(Number(e.target.value))}
            className="w-28 px-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs font-mono text-white text-center focus:border-amber-400 outline-none"
          />
          <button
            onClick={runSimulation}
            disabled={isScanning}
            className="px-5 py-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black text-xs font-mono font-extrabold rounded-lg transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isScanning ? 'Simulating Disk I/O...' : 'Run Query Execution Comparison'}
          </button>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Table Scan */}
        <div className="bg-zinc-900/90 border border-red-900/40 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-red-400">
              METHOD 1: Sequential Scan (No Index)
            </span>
            <span className="text-[10px] bg-red-950/80 text-red-300 px-2.5 py-0.5 rounded-full border border-red-800 font-mono">
              O(N) Complexity
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Database reads disk page by page sequentially from block 1 until target record is discovered.
          </p>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Disk Pages Examined:</span>
              <span className="text-red-400 font-bold">{scanResult ? `${scanResult.seqDiskIo} pages` : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Estimated Latency:</span>
              <span className="text-red-400 font-bold">{scanResult ? `${scanResult.seqLatencyMs} ms` : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Memory Buffer Cache:</span>
              <span className="text-zinc-400">Flooded with unused blocks</span>
            </div>
          </div>
        </div>

        {/* B-Tree Index Scan */}
        <div className="bg-zinc-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">
              METHOD 2: B-Tree Index Scan (CREATE INDEX)
            </span>
            <span className="text-[10px] bg-amber-950/80 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-600 font-mono">
              O(log N) Complexity
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Traverses Root Page &rarr; Branch Page &rarr; Leaf Page with exact row pointer (3 hops total).
          </p>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Disk Pages Examined:</span>
              <span className="text-amber-400 font-bold">{scanResult ? '3 pages (Root, Node, Leaf)' : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Estimated Latency:</span>
              <span className="text-amber-300 font-bold">{scanResult ? `${scanResult.btreeLatencyMs} ms` : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Performance Speedup:</span>
              <span className="text-amber-400 font-bold">{scanResult ? `${scanResult.speedup}x FASTER!` : 'Pending query...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual B-Tree Architecture Diagram */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 font-mono text-xs shadow-xl">
        <span className="text-zinc-400 font-bold block mb-4 text-center">
          Physical B-Tree Traversal Path (Depth = 3)
        </span>
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-zinc-900 border border-amber-500/60 rounded-xl text-center text-amber-300 w-52 shadow-md">
            [Root Block #001]<br/>Keys: 2500 | 5000 | 7500
          </div>
          <ArrowRight className="w-4 h-4 rotate-90 text-zinc-600" />
          <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-center text-zinc-200 w-56 shadow-md">
            [Intermediate Block #042]<br/>Keys: 6000 | 7000 | 8000
          </div>
          <ArrowRight className="w-4 h-4 rotate-90 text-zinc-600" />
          <div className="p-3 bg-zinc-900 border border-amber-400 rounded-xl text-center text-amber-400 font-bold w-64 shadow-lg shadow-amber-500/10">
            [Leaf Block #389]<br/>Key {targetId} &rarr; Pointer to Row on Heap
          </div>
        </div>
      </div>
    </div>
  );
}
