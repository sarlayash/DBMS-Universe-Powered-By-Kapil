import React, { useState } from 'react';
import { Binary, Play, ArrowRight, Code2 } from 'lucide-react';

export default function RelationalAlgebraPlayground() {
  const [operator, setOperator] = useState('select'); // select, project, join, cartesian, union
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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-lg mb-1">
          <Binary className="w-5 h-5" />
          <span>Interactive Relational Algebra Playground</span>
        </div>
        <p className="text-slate-300 text-sm">
          Edgar F. Codd formulated Relational Algebra using Set Theory in 1970. Toggle operators below to see how mathematical set operations map directly into declarative SQL queries!
        </p>

        {/* Operator selection buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setOperator('select')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono transition ${
              operator === 'select'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Selection (σ)
          </button>
          <button
            onClick={() => setOperator('project')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono transition ${
              operator === 'project'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Projection (π)
          </button>
          <button
            onClick={() => setOperator('join')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono transition ${
              operator === 'join'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Natural Join (⋈)
          </button>
          <button
            onClick={() => setOperator('cartesian')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono transition ${
              operator === 'cartesian'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Cartesian Product (×)
          </button>
        </div>
      </div>

      {/* Operator controls */}
      {operator === 'select' && (
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Selection Predicate (σ):</span>
          <button
            onClick={() => setCondition('branch = "CSE"')}
            className={`px-2.5 py-1 text-xs rounded border transition ${
              condition === 'branch = "CSE"' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            branch = 'CSE'
          </button>
          <button
            onClick={() => setCondition('branch = "ECE"')}
            className={`px-2.5 py-1 text-xs rounded border transition ${
              condition === 'branch = "ECE"' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            branch = 'ECE'
          </button>
          <button
            onClick={() => setCondition('marks > 85')}
            className={`px-2.5 py-1 text-xs rounded border transition ${
              condition === 'marks > 85' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            marks &gt; 85
          </button>
        </div>
      )}

      {operator === 'project' && (
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Projection Columns (π):</span>
          <button
            onClick={() => setProjectionCols('name, marks')}
            className={`px-2.5 py-1 text-xs rounded border transition ${
              projectionCols === 'name, marks' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            name, marks
          </button>
          <button
            onClick={() => setProjectionCols('id, name, branch')}
            className={`px-2.5 py-1 text-xs rounded border transition ${
              projectionCols === 'id, name, branch' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            id, name, branch
          </button>
        </div>
      )}

      {/* Formula & SQL mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30">
          <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider block mb-1">
            Mathematical Relational Algebra
          </span>
          <div className="text-lg font-mono text-white font-bold">
            {getFormula()}
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30">
          <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" />
            Synthesized ANSI SQL Statement
          </span>
          <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap">
            {getEquivalentSql()}
          </pre>
        </div>
      </div>

      {/* Result relation display */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
          <span>Transformed Relation Output ({resultRows.length} tuples)</span>
          <span className="text-emerald-400">Status: Evaluated in memory</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-800/60 text-slate-300 border-b border-slate-700">
              <tr>
                {resultRows.length > 0 && Object.keys(resultRows[0]).map(col => (
                  <th key={col} className="p-3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {resultRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition">
                  {Object.values(row).map((val, idx) => (
                    <td key={idx} className="p-3 text-slate-200">{String(val)}</td>
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
