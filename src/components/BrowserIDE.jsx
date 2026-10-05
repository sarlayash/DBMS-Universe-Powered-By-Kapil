import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, HelpCircle, Bot, Sparkles, CheckCircle2, AlertCircle, Database, ChevronRight, Terminal } from 'lucide-react';
import { sqlEngine } from '../services/sqlEngine';
import KapilMentorModal from './KapilMentorModal';

export default function BrowserIDE({ currentLevel, onSolveChallenge, onXpEarned }) {
  const [query, setQuery] = useState(currentLevel?.defaultQuery || 'SELECT * FROM students WHERE marks > 80;');
  const [result, setResult] = useState(null);
  const [schemaSummary, setSchemaSummary] = useState(sqlEngine.getSchema());
  const [isExplainMode, setIsExplainMode] = useState(false);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson', 'schema'

  useEffect(() => {
    if (currentLevel?.defaultQuery) {
      setQuery(currentLevel.defaultQuery);
      setResult(null);
    }
  }, [currentLevel]);

  const handleRunQuery = () => {
    const res = sqlEngine.execute(query);
    setResult(res);
    setSchemaSummary(sqlEngine.getSchema());

    if (res.success && onXpEarned) {
      onXpEarned(25);
    }
  };

  const handleExplain = () => {
    const explainQuery = 'EXPLAIN ' + query.replace(/^EXPLAIN\s+/i, '');
    const res = sqlEngine.execute(explainQuery);
    setResult(res);
  };

  const handleResetDb = () => {
    sqlEngine.initDefaultDatabase();
    setSchemaSummary(sqlEngine.getSchema());
    setResult({
      success: true,
      type: 'INFO',
      message: 'Database tables restored to default clean state.',
      columns: ['status'],
      rows: [['DATABASE RESTORED']]
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top IDE Toolbar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-xs text-blue-400 flex items-center gap-1.5">
            <Terminal className="w-4 h-4" />
            In-Browser SQL Studio
          </span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-mono">
            SQLite / In-Memory Engine • 100% Offline
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMentorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 font-mono text-xs rounded-lg transition"
          >
            <Bot className="w-3.5 h-3.5" />
            Ask Kapil's DBMS Mentor
          </button>

          <button
            onClick={handleExplain}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Explain Query (Cost)
          </button>

          <button
            onClick={handleRunQuery}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-lg transition shadow-md shadow-blue-950"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run SQL (F5)
          </button>
        </div>
      </div>

      {/* Main 4-Panel Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left Panel: Lesson & Schema (Cols 1-4) */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-slate-900/50 flex flex-col min-h-0">
          <div className="flex border-b border-slate-800 bg-slate-900 px-3 pt-2 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`pb-2 border-b-2 font-semibold transition ${
                activeTab === 'lesson' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Lesson Context
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`pb-2 border-b-2 font-semibold transition ${
                activeTab === 'schema' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Schema Tables ({Object.keys(schemaSummary).length})
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-4 font-mono text-xs flex-1">
            {activeTab === 'lesson' ? (
              <>
                <div>
                  <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">
                    {currentLevel?.stage || 'Current Concept'}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {currentLevel?.title || 'Interactive SQL Lab'}
                  </h3>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    {currentLevel?.summary || 'Practice executing SQL statements directly against live in-memory tables.'}
                  </p>
                </div>

                {currentLevel?.theory?.keyConcepts && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-blue-300 font-bold block text-[11px]">Core Principles:</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-1 text-[11px]">
                      {currentLevel.theory.keyConcepts.slice(0, 3).map((kc, i) => (
                        <li key={i}>{kc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentLevel?.challenges && currentLevel.challenges.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-slate-400 font-bold text-[11px] block uppercase">
                      Suggested Challenge:
                    </span>
                    {currentLevel.challenges.map((c, i) => (
                      <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                        <span className="text-emerald-400 font-bold block">{c.title}</span>
                        <p className="text-slate-300 text-[11px]">{c.desc}</p>
                        {c.sql && (
                          <button
                            onClick={() => setQuery(c.sql)}
                            className="text-blue-400 hover:text-blue-300 text-[11px] font-bold underline block"
                          >
                            Load Challenge Query &rarr;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Available In-Memory Tables:</span>
                  <button
                    onClick={handleResetDb}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {Object.entries(schemaSummary).map(([tbl, meta]) => (
                  <div key={tbl} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-blue-400 font-bold mb-1">
                      <span>{tbl}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{meta.rowCount} rows</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex flex-wrap gap-1">
                      {meta.columns.map(c => (
                        <span key={c} className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-300">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Panel: SQL Editor (Cols 5-8) */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-slate-950 flex flex-col min-h-0">
          <div className="p-2 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SQL Query Editor</span>
            <div className="flex gap-2">
              <button
                onClick={() => setQuery('SELECT * FROM students;')}
                className="hover:text-blue-400 text-[11px]"
              >
                students
              </button>
              <button
                onClick={() => setQuery('SELECT * FROM employees;')}
                className="hover:text-blue-400 text-[11px]"
              >
                employees
              </button>
              <button
                onClick={() => setQuery('SELECT * FROM orders;')}
                className="hover:text-blue-400 text-[11px]"
              >
                orders
              </button>
            </div>
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your SQL query here (e.g. SELECT * FROM students;)"
            className="flex-1 w-full p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed outline-none resize-none code-editor selection:bg-blue-700"
            spellCheck="false"
          />

          {/* Quick statement snippets */}
          <div className="p-2 border-t border-slate-800 bg-slate-900/40 flex flex-wrap gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => setQuery('SELECT * FROM students WHERE marks > 80;')}
              className="px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
            >
              WHERE
            </button>
            <button
              onClick={() => setQuery('SELECT branch, COUNT(*), AVG(marks) FROM students GROUP BY branch;')}
              className="px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
            >
              GROUP BY
            </button>
            <button
              onClick={() => setQuery('SELECT s.name, d.dept_name FROM students s JOIN departments d ON s.branch = d.dept_id;')}
              className="px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
            >
              JOIN
            </button>
            <button
              onClick={() => setQuery('BEGIN;\nUPDATE accounts SET balance = balance - 1000 WHERE acc_no = "ACC1001";\nCOMMIT;')}
              className="px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
            >
              TRANSACTION
            </button>
          </div>
        </div>

        {/* Right Panel: Output & Result Table (Cols 9-12) */}
        <div className="lg:col-span-4 bg-slate-900/30 flex flex-col min-h-0">
          <div className="p-2.5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Query Results / Execution View</span>
            {result && (
              <span className={`text-[10px] font-bold ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
                {result.executionTimeMs} ms
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto p-3 font-mono text-xs">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-6 space-y-2">
                <Database className="w-8 h-8 opacity-40" />
                <p>Run a query above to see execution output and tabular records.</p>
              </div>
            ) : !result.success ? (
              <div className="bg-red-950/40 border border-red-800 p-4 rounded-xl text-red-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  SQL Error:
                </div>
                <p className="text-xs">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {result.message && (
                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg text-emerald-300 text-[11px]">
                    {result.message}
                  </div>
                )}

                {result.summary && (
                  <div className="bg-cyan-950/40 border border-cyan-800/60 p-2.5 rounded-lg text-cyan-300 text-[11px]">
                    {result.summary}
                  </div>
                )}

                {result.rows && result.rows.length > 0 ? (
                  <div className="border border-slate-800 rounded-lg overflow-x-auto shadow">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                        <tr>
                          {result.columns.map((col, i) => (
                            <th key={i} className="p-2.5 whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-slate-200">
                        {result.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/30">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2.5 whitespace-nowrap">
                                {val === null ? <span className="text-slate-600 italic">NULL</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-slate-400 italic p-3 text-center">
                    0 rows returned. (Mutation executed or condition matched no rows).
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel: Hints, Explanation & Similar Challenge */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'View Mentor Hint'}
          </button>
          {showHint && (
            <span className="text-slate-300 text-[11px] bg-slate-950 px-3 py-1 rounded border border-slate-800">
              💡 Always verify WHERE filter predicates before GROUP BY, and remember COUNT(*) counts rows including NULLs.
            </span>
          )}
        </div>

        <button
          onClick={() => {
            setQuery('SELECT name, marks, cgpa FROM students WHERE branch = "CSE" ORDER BY cgpa DESC;');
            handleRunQuery();
          }}
          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
        >
          <span>Try Similar Challenge</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Kapil's AI Mentor Modal */}
      <KapilMentorModal
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        topicContext={currentLevel}
        currentQuery={query}
      />
    </div>
  );
}
