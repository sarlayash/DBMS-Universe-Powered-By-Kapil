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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-1">
          <Search className="w-5 h-5" />
          <span>Level 11 Signature: B-Tree Index Explorer vs Full Table Scan</span>
        </div>
        <p className="text-slate-300 text-sm">
          A table contains 10,000 employee records on disk. Enter a target ID to search for and compare the physical disk I/O operations required by a Sequential Scan versus a B-Tree Index!
        </p>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs font-mono text-slate-400">Search Target ID (1 - 10000):</span>
          <input
            type="number"
            min="1"
            max="10000"
            value={targetId}
            onChange={(e) => setTargetId(Number(e.target.value))}
            className="w-28 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white text-center"
          />
          <button
            onClick={runSimulation}
            disabled={isScanning}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold rounded-lg transition"
          >
            {isScanning ? 'Simulating Disk I/O...' : 'Run Query Execution Comparison'}
          </button>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Table Scan */}
        <div className="bg-slate-900/90 border border-red-900/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-red-400">
              METHOD 1: Sequential Scan (No Index)
            </span>
            <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
              O(N) Complexity
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Database reads disk page by page sequentially from block 1 until target record is discovered.
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Disk Pages Examined:</span>
              <span className="text-red-400 font-bold">{scanResult ? `${scanResult.seqDiskIo} pages` : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Latency:</span>
              <span className="text-red-400 font-bold">{scanResult ? `${scanResult.seqLatencyMs} ms` : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Memory Buffer Cache:</span>
              <span className="text-slate-400">Flooded with unused blocks</span>
            </div>
          </div>
        </div>

        {/* B-Tree Index Scan */}
        <div className="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">
              METHOD 2: B-Tree Index Scan (CREATE INDEX)
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              O(log N) Complexity
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Traverses Root Page &rarr; Branch Page &rarr; Leaf Page with exact row pointer (3 hops total).
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Disk Pages Examined:</span>
              <span className="text-emerald-400 font-bold">{scanResult ? '3 pages (Root, Node, Leaf)' : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Latency:</span>
              <span className="text-emerald-400 font-bold">{scanResult ? `${scanResult.btreeLatencyMs} ms` : 'Pending query...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Performance Speedup:</span>
              <span className="text-emerald-400 font-bold">{scanResult ? `${scanResult.speedup}x FASTER!` : 'Pending query...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual B-Tree Architecture Diagram */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
        <span className="text-slate-400 font-bold block mb-3 text-center">
          Physical B-Tree Traversal Path (Depth = 3)
        </span>
        <div className="flex flex-col items-center gap-3">
          <div className="p-2 bg-blue-950 border border-blue-500 rounded text-center text-blue-200 w-48">
            [Root Block #001]<br/>Keys: 2500 | 5000 | 7500
          </div>
          <ArrowRight className="w-4 h-4 rotate-90 text-slate-600" />
          <div className="p-2 bg-cyan-950 border border-cyan-500 rounded text-center text-cyan-200 w-52">
            [Intermediate Block #042]<br/>Keys: 6000 | 7000 | 8000
          </div>
          <ArrowRight className="w-4 h-4 rotate-90 text-slate-600" />
          <div className="p-2 bg-emerald-950 border border-emerald-500 rounded text-center text-emerald-200 w-56">
            [Leaf Block #389]<br/>Key {targetId} &rarr; Pointer to Row on Heap
          </div>
        </div>
      </div>
    </div>
  );
}
