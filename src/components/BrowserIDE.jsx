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
    <div className="flex flex-col h-full bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top IDE Toolbar */}
      <div className="p-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-xs text-amber-400 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-amber-400" />
            In-Browser SQL Studio
          </span>
          <span className="text-xs bg-zinc-900 text-zinc-400 border border-zinc-800 px-2.5 py-0.5 rounded-full font-mono">
            SQLite / In-Memory Engine • 100% Offline
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMentorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 font-mono text-xs rounded-lg transition"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            Ask Kapil's DBMS Mentor
          </button>

          <button
            onClick={handleExplain}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs rounded-lg border border-zinc-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Explain Query (Cost)
          </button>

          <button
            onClick={handleRunQuery}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-110 text-black font-mono text-xs font-extrabold rounded-lg transition shadow-md shadow-amber-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run SQL (F5)
          </button>
        </div>
      </div>

      {/* Main 4-Panel Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left Panel: Lesson & Schema (Cols 1-4) */}
        <div className="lg:col-span-4 border-r border-zinc-800 bg-zinc-950 flex flex-col min-h-0">
          <div className="flex border-b border-zinc-800 bg-zinc-900 px-3 pt-2 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`pb-2 border-b-2 font-semibold transition ${
                activeTab === 'lesson' ? 'border-amber-400 text-amber-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Lesson Context
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`pb-2 border-b-2 font-semibold transition ${
                activeTab === 'schema' ? 'border-amber-400 text-amber-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Schema Tables ({Object.keys(schemaSummary).length})
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-4 font-mono text-xs flex-1">
            {activeTab === 'lesson' ? (
              <>
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                    {currentLevel?.stage || 'Current Concept'}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {currentLevel?.title || 'Interactive SQL Lab'}
                  </h3>
                  <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                    {currentLevel?.summary || 'Practice executing SQL statements directly against live in-memory tables.'}
                  </p>
                </div>

                {currentLevel?.theory?.keyConcepts && (
                  <div className="bg-black p-3 rounded-xl border border-zinc-800 space-y-1.5">
                    <span className="text-amber-300 font-bold block text-[11px]">Core Principles:</span>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1 text-[11px]">
                      {currentLevel.theory.keyConcepts.slice(0, 3).map((kc, i) => (
                        <li key={i}>{kc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentLevel?.challenges && currentLevel.challenges.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-zinc-400 font-bold text-[11px] block uppercase">
                      Suggested Challenge:
                    </span>
                    {currentLevel.challenges.map((c, i) => (
                      <div key={i} className="bg-black p-3 rounded-lg border border-zinc-800 space-y-2">
                        <span className="text-amber-300 font-bold block">{c.title}</span>
                        <p className="text-zinc-300 text-[11px]">{c.desc}</p>
                        {c.sql && (
                          <button
                            onClick={() => setQuery(c.sql)}
                            className="text-amber-400 hover:text-amber-300 text-[11px] font-bold underline block"
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
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Available In-Memory Tables:</span>
                  <button
                    onClick={handleResetDb}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {Object.entries(schemaSummary).map(([tbl, meta]) => (
                  <div key={tbl} className="bg-black p-2.5 rounded-lg border border-zinc-800">
                    <div className="flex justify-between items-center text-amber-400 font-bold mb-1">
                      <span>{tbl}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{meta.rowCount} rows</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 flex flex-wrap gap-1">
                      {meta.columns.map(c => (
                        <span key={c} className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
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
        <div className="lg:col-span-4 border-r border-zinc-800 bg-black flex flex-col min-h-0">
          <div className="p-2 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>SQL Query Editor</span>
            <div className="flex gap-2">
              <button
                onClick={() => setQuery('SELECT * FROM students;')}
                className="hover:text-amber-400 text-[11px] transition"
              >
                students
              </button>
              <button
                onClick={() => setQuery('SELECT * FROM employees;')}
                className="hover:text-amber-400 text-[11px] transition"
              >
                employees
              </button>
              <button
                onClick={() => setQuery('SELECT * FROM orders;')}
                className="hover:text-amber-400 text-[11px] transition"
              >
                orders
              </button>
            </div>
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your SQL query here (e.g. SELECT * FROM students;)"
            className="flex-1 w-full p-4 bg-black text-zinc-100 font-mono text-xs leading-relaxed outline-none resize-none code-editor selection:bg-amber-500 selection:text-black"
            spellCheck="false"
          />

          {/* Quick statement snippets */}
          <div className="p-2 border-t border-zinc-800 bg-zinc-950/70 flex flex-wrap gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => setQuery('SELECT * FROM students WHERE marks > 80;')}
              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:bg-zinc-800 hover:text-white hover:border-amber-500/40 transition"
            >
              WHERE
            </button>
            <button
              onClick={() => setQuery('SELECT branch, COUNT(*), AVG(marks) FROM students GROUP BY branch;')}
              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:bg-zinc-800 hover:text-white hover:border-amber-500/40 transition"
            >
              GROUP BY
            </button>
            <button
              onClick={() => setQuery('SELECT s.name, d.dept_name FROM students s JOIN departments d ON s.branch = d.dept_id;')}
              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:bg-zinc-800 hover:text-white hover:border-amber-500/40 transition"
            >
              JOIN
            </button>
            <button
              onClick={() => setQuery('BEGIN;\nUPDATE accounts SET balance = balance - 1000 WHERE acc_no = "ACC1001";\nCOMMIT;')}
              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:bg-zinc-800 hover:text-white hover:border-amber-500/40 transition"
            >
              TRANSACTION
            </button>
          </div>
        </div>

        {/* Right Panel: Output & Result Table (Cols 9-12) */}
        <div className="lg:col-span-4 bg-zinc-950 flex flex-col min-h-0">
          <div className="p-2.5 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Query Results / Execution View</span>
            {result && (
              <span className={`text-[10px] font-bold ${result.success ? 'text-amber-400' : 'text-red-400'}`}>
                {result.executionTimeMs} ms
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto p-3 font-mono text-xs">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center p-6 space-y-2">
                <Database className="w-8 h-8 opacity-40 text-amber-400" />
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
                  <div className="bg-zinc-900 border border-amber-500/40 p-2.5 rounded-lg text-amber-300 text-[11px]">
                    {result.message}
                  </div>
                )}

                {result.summary && (
                  <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg text-zinc-200 text-[11px]">
                    {result.summary}
                  </div>
                )}

                {result.rows && result.rows.length > 0 ? (
                  <div className="border border-zinc-800 rounded-lg overflow-x-auto shadow">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                        <tr>
                          {result.columns.map((col, i) => (
                            <th key={i} className="p-2.5 whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 bg-black text-zinc-200">
                        {result.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/60 transition">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2.5 whitespace-nowrap">
                                {val === null ? <span className="text-zinc-600 italic">NULL</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-zinc-500 italic p-3 text-center">
                    0 rows returned. (Mutation executed or condition matched no rows).
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel: Hints, Explanation & Similar Challenge */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'View Mentor Hint'}
          </button>
          {showHint && (
            <span className="text-zinc-300 text-[11px] bg-black px-3 py-1 rounded border border-zinc-800">
              💡 Always verify WHERE filter predicates before GROUP BY, and remember COUNT(*) counts rows including NULLs.
            </span>
          )}
        </div>

        <button
          onClick={() => {
            setQuery('SELECT name, marks, cgpa FROM students WHERE branch = "CSE" ORDER BY cgpa DESC;');
            handleRunQuery();
          }}
          className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition"
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
