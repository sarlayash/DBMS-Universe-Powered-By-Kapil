import React, { useState } from 'react';
import { Gauge, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

export default function QueryOptimizerLab() {
  const [selectedFixes, setSelectedFixes] = useState({
    removeSelectAll: false,
    makeSargable: false,
    removeLeadingWildcard: false
  });

  const isFullyOptimized = selectedFixes.removeSelectAll && selectedFixes.makeSargable && selectedFixes.removeLeadingWildcard;

  const calculateCost = () => {
    let cost = 4850;
    if (selectedFixes.removeSelectAll) cost -= 950;
    if (selectedFixes.makeSargable) cost -= 2600;
    if (selectedFixes.removeLeadingWildcard) cost -= 1180;
    return cost;
  };

  const currentCost = calculateCost();
  const speedupFactor = (4850 / currentCost).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <Gauge className="w-5 h-5" />
          <span>Level 12 Challenge: "Make This Query 10x Better"</span>
        </div>
        <p className="text-slate-300 text-sm">
          A junior developer submitted a slow query on a 5-million row orders table that freezes the database.
          Identify the 3 critical performance anti-patterns and apply optimizations below!
        </p>
      </div>

      {/* Query Comparison Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unoptimized Bad Query */}
        <div className="bg-slate-950 p-4 rounded-xl border border-red-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-red-400 font-bold">Original Slow Query (Anti-Patterns)</span>
            <span className="text-red-300 bg-red-950 px-2 py-0.5 rounded">Cost: 4850 units</span>
          </div>
          <pre className="text-xs font-mono text-red-200 bg-slate-900/80 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
{`SELECT *
FROM orders
WHERE YEAR(order_date) = 2024
  AND status LIKE '%DELIVERED%';`}
          </pre>
          <div className="text-[11px] text-slate-400 space-y-1">
            <div className="text-red-400 font-semibold">• SELECT * pulls wide binary columns from heap</div>
            <div className="text-red-400 font-semibold">• YEAR(order_date) disables B-Tree index scan</div>
            <div className="text-red-400 font-semibold">• LIKE '%...' with leading wildcard forces full table scan</div>
          </div>
        </div>

        {/* Optimized Query */}
        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold">Optimized Production Query</span>
            <span className="text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
              Cost: {currentCost} units ({speedupFactor}x Faster)
            </span>
          </div>
          <pre className="text-xs font-mono text-emerald-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
{`SELECT ${selectedFixes.removeSelectAll ? 'order_id, customer_name, amount' : '*'}
FROM orders
WHERE ${selectedFixes.makeSargable ? 'order_date >= "2024-01-01" AND order_date <= "2024-12-31"' : 'YEAR(order_date) = 2024'}
  AND ${selectedFixes.removeLeadingWildcard ? 'status = "DELIVERED"' : 'status LIKE "%DELIVERED%"'};`}
          </pre>
          <div className="text-[11px] text-emerald-400">
            {isFullyOptimized
              ? '✨ Index range scan utilized! Covering index satisfied directly from cache.'
              : 'Apply all optimizations below to hit maximum 10x throughput.'}
          </div>
        </div>
      </div>

      {/* Optimization Toggles */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <span className="text-xs font-mono text-slate-400 font-bold uppercase block">
          Optimization Action Items:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-2.5 ${
            selectedFixes.removeSelectAll ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={selectedFixes.removeSelectAll}
              onChange={(e) => setSelectedFixes(prev => ({ ...prev, removeSelectAll: e.target.checked }))}
              className="mt-0.5"
            />
            <div className="text-xs">
              <span className="font-bold text-white block">1. Replace SELECT * with exact columns</span>
              <span className="text-slate-400 text-[11px]">Eliminates disk heap lookup & saves network bandwidth.</span>
            </div>
          </label>

          <label className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-2.5 ${
            selectedFixes.makeSargable ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={selectedFixes.makeSargable}
              onChange={(e) => setSelectedFixes(prev => ({ ...prev, makeSargable: e.target.checked }))}
              className="mt-0.5"
            />
            <div className="text-xs">
              <span className="font-bold text-white block">2. Sargable Date Range</span>
              <span className="text-slate-400 text-[11px]">Enables B-Tree index range scan instead of row-by-row function evaluation.</span>
            </div>
          </label>

          <label className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-2.5 ${
            selectedFixes.removeLeadingWildcard ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={selectedFixes.removeLeadingWildcard}
              onChange={(e) => setSelectedFixes(prev => ({ ...prev, removeLeadingWildcard: e.target.checked }))}
              className="mt-0.5"
            />
            <div className="text-xs">
              <span className="font-bold text-white block">3. Remove Leading Wildcard</span>
              <span className="text-slate-400 text-[11px]">Switch to exact equality = "DELIVERED" allowing index hash/b-tree match.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
