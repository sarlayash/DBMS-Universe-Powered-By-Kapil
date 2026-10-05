import React, { useState } from 'react';
import { Binary, Play, ArrowRight, Code2 } from 'lucide-react';

export default function RelationalAlgebraPlayground() {
  const [operator, setOperator] = useState('select'); // select, project, join, cartesian
  const [condition, setCondition] = useState('branch = "CSE"');
  const [projectionCols, setProjectionCols] = useState('name, marks');

  // Sample relations
  const relationStudents = [
    { id: 101, name: 'Aarav Sharma', branch: 'CSE', marks: 88 },
    { id: 102, name: 'Priya Patel', branch: 'ECE', marks: 94 },
    { id: 103, name: 'Rohan Verma', branch: 'CSE', marks: 76 },
    { id: 104, name: 'Ananya Iyer', branch: 'IT', marks: 91 }
  ];

  const relationDepts = [
    { dept_id: 'CSE', dept_name: 'Computer Science', block: 'Block-A' },
    { dept_id: 'ECE', dept_name: 'Electronics', block: 'Block-B' },
    { dept_id: 'IT', dept_name: 'Info Technology', block: 'Block-A' }
  ];

  // Compute transformed relation
  const computeResult = () => {
    if (operator === 'select') {
      if (condition.includes('ECE')) return relationStudents.filter(s => s.branch === 'ECE');
      if (condition.includes('marks > 85')) return relationStudents.filter(s => s.marks > 85);
      return relationStudents.filter(s => s.branch === 'CSE');
    }
    if (operator === 'project') {
      const cols = projectionCols.split(',').map(s => s.trim());
      return relationStudents.map(s => {
        const row = {};
        cols.forEach(c => { if (c in s) row[c] = s[c]; });
        return row;
      });
    }
    if (operator === 'join') {
      return relationStudents.map(s => {
        const d = relationDepts.find(d => d.dept_id === s.branch);
        return {
          id: s.id,
          name: s.name,
          branch: s.branch,
          dept_name: d?.dept_name || 'N/A',
          block: d?.block || 'N/A'
        };
      });
    }
    if (operator === 'cartesian') {
      const res = [];
      relationStudents.slice(0, 2).forEach(s => {
        relationDepts.slice(0, 2).forEach(d => {
          res.push({
            student: s.name,
            branch: s.branch,
            department: d.dept_name,
            block: d.block
          });
        });
      });
      return res;
    }
    return relationStudents;
  };

  const resultRows = computeResult();

  const getFormula = () => {
    switch (operator) {
      case 'select': return `σ[${condition}](Students)`;
      case 'project': return `π[${projectionCols}](Students)`;
      case 'join': return `Students ⋈[Students.branch = Dept.dept_id] Departments`;
      case 'cartesian': return `Students × Departments (Cartesian Product)`;
      default: return '';
    }
  };

  const getEquivalentSql = () => {
    switch (operator) {
      case 'select': return `SELECT * FROM students WHERE ${condition};`;
      case 'project': return `SELECT ${projectionCols} FROM students;`;
      case 'join': return `SELECT s.id, s.name, s.branch, d.dept_name, d.block\nFROM students s\nINNER JOIN departments d ON s.branch = d.dept_id;`;
      case 'cartesian': return `SELECT s.name, s.branch, d.dept_name, d.block\nFROM students s\nCROSS JOIN departments d;`;
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <Binary className="w-5 h-5 text-amber-400" />
          <span>Interactive Relational Algebra Playground</span>
        </div>
        <p className="text-zinc-300 text-sm">
          Edgar F. Codd formulated Relational Algebra using Set Theory in 1970. Toggle operators below to see how mathematical set operations map directly into declarative SQL queries!
        </p>

        {/* Operator selection buttons */}
        <div className="flex flex-wrap gap-2 mt-5">
          {[
            { id: 'select', label: 'Selection (σ)' },
            { id: 'project', label: 'Projection (π)' },
            { id: 'join', label: 'Natural Join (⋈)' },
            { id: 'cartesian', label: 'Cartesian Product (×)' }
          ].map(op => (
            <button
              key={op.id}
              onClick={() => setOperator(op.id)}
              className={`px-4 py-2 text-xs rounded-xl font-mono transition ${
                operator === op.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Operator controls */}
      {operator === 'select' && (
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-wrap items-center gap-3 shadow-lg">
          <span className="text-xs text-zinc-400 font-mono">Selection Predicate (σ):</span>
          {['branch = "CSE"', 'branch = "ECE"', 'marks > 85'].map(cond => (
            <button
              key={cond}
              onClick={() => setCondition(cond)}
              className={`px-3 py-1.5 text-xs rounded-lg border font-mono transition ${
                condition === cond
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      )}

      {operator === 'project' && (
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-wrap items-center gap-3 shadow-lg">
          <span className="text-xs text-zinc-400 font-mono">Projection Columns (π):</span>
          {['name, marks', 'id, name, branch'].map(cols => (
            <button
              key={cols}
              onClick={() => setProjectionCols(cols)}
              className={`px-3 py-1.5 text-xs rounded-lg border font-mono transition ${
                projectionCols === cols
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cols}
            </button>
          ))}
        </div>
      )}

      {/* Formula & SQL mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 shadow-lg">
          <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-2">
            Mathematical Relational Algebra
          </span>
          <div className="text-lg font-mono text-white font-bold">
            {getFormula()}
          </div>
        </div>

        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 shadow-lg">
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-amber-400" />
            Synthesized ANSI SQL Statement
          </span>
          <pre className="text-xs font-mono text-amber-300 whitespace-pre-wrap">
            {getEquivalentSql()}
          </pre>
        </div>
      </div>

      {/* Result relation display */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-3.5 bg-zinc-950 border-b border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
          <span>Transformed Relation Output ({resultRows.length} tuples)</span>
          <span className="text-amber-400 font-semibold">Status: Evaluated in memory</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
              <tr>
                {resultRows.length > 0 && Object.keys(resultRows[0]).map(col => (
                  <th key={col} className="p-3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {resultRows.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/40 transition">
                  {Object.values(row).map((val, idx) => (
                    <td key={idx} className="p-3 text-zinc-200">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
