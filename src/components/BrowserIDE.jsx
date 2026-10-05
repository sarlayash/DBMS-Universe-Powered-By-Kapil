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
    <div className="flex flex-col h-full bg-[#140d09] border border-[#382519] rounded-3xl overflow-hidden shadow-2xl font-sans">
      {/* Top IDE Toolbar */}
      <div className="p-3 bg-[#18110b] border-b border-[#382519] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-xs text-[#fef08a] flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-[#fef08a]" />
            In-Browser SQL Studio
          </span>
          <span className="text-xs bg-[#140d09] text-[#b8a495] border border-[#382519] px-2.5 py-0.5 rounded-full font-mono">
            SQLite / In-Memory Engine • 100% Offline
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMentorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#22160f] hover:bg-[#2b1c13] border border-[#fef08a]/40 text-[#fef08a] font-mono text-xs rounded-xl transition"
          >
            <Bot className="w-3.5 h-3.5 text-[#fef08a]" />
            Ask Kapil's DBMS Mentor
          </button>

          <button
            onClick={handleExplain}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#22160f] hover:bg-[#2b1c13] text-[#f5ece3] font-mono text-xs rounded-xl border border-[#382519] transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
            Explain Query (Cost)
          </button>

          <button
            onClick={handleRunQuery}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:brightness-110 text-[#140d09] font-mono text-xs font-extrabold rounded-xl transition shadow-md shadow-yellow-400/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run SQL (F5)
          </button>
        </div>
      </div>

      {/* Main 4-Panel Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left Panel: Lesson & Schema (Cols 1-4) */}
        <div className="lg:col-span-4 border-r border-[#382519] bg-[#18110b] flex flex-col min-h-0">
          <div className="flex border-b border-[#382519] bg-[#140d09] px-3 pt-2 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`pb-2 border-b-2 font-semibold transition ${
                activeTab === 'lesson' ? 'border-[#fef08a] text-[#fef08a]' : 'border-transparent text-[#b8a495] hover:text-white'
              }`}
            >
              Lesson Context
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`pb-2 border-b-2 font-semibold transition ${
                activeTab === 'schema' ? 'border-[#fef08a] text-[#fef08a]' : 'border-transparent text-[#b8a495] hover:text-white'
              }`}
            >
              Schema Tables ({Object.keys(schemaSummary).length})
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-4 font-mono text-xs flex-1 custom-wooden-scrollbar">
            {activeTab === 'lesson' ? (
              <>
                <div>
                  <span className="text-[10px] text-[#fef08a] uppercase font-bold tracking-wider">
                    {currentLevel?.stage || 'Current Concept'}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {currentLevel?.title || 'Interactive SQL Lab'}
                  </h3>
                  <p className="text-[#b8a495] text-xs mt-1 leading-relaxed">
                    {currentLevel?.summary || 'Practice executing SQL statements directly against live in-memory tables.'}
                  </p>
                </div>

                {currentLevel?.theory?.keyConcepts && (
                  <div className="bg-[#140d09] p-3 rounded-2xl border border-[#382519] space-y-1.5">
                    <span className="text-[#fef08a] font-bold block text-[11px]">Core Principles:</span>
                    <ul className="list-disc list-inside text-[#b8a495] space-y-1 text-[11px]">
                      {currentLevel.theory.keyConcepts.slice(0, 3).map((kc, i) => (
                        <li key={i}>{kc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentLevel?.challenges && currentLevel.challenges.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[#8c786a] font-bold text-[11px] block uppercase">
                      Suggested Challenge:
                    </span>
                    {currentLevel.challenges.map((c, i) => (
                      <div key={i} className="bg-[#140d09] p-3 rounded-2xl border border-[#382519] space-y-2">
                        <span className="text-[#fef08a] font-bold block">{c.title}</span>
                        <p className="text-[#f5ece3] text-[11px]">{c.desc}</p>
                        {c.sql && (
                          <button
                            onClick={() => setQuery(c.sql)}
                            className="text-[#fef08a] hover:text-white text-[11px] font-bold underline block"
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
                <div className="flex items-center justify-between text-[#b8a495]">
                  <span>Available In-Memory Tables:</span>
                  <button
                    onClick={handleResetDb}
                    className="text-[10px] text-[#fef08a] hover:underline flex items-center gap-1 font-bold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {Object.entries(schemaSummary).map(([tbl, meta]) => (
                  <div key={tbl} className="bg-[#140d09] p-2.5 rounded-2xl border border-[#382519]">
                    <div className="flex justify-between items-center text-[#fef08a] font-bold mb-1">
                      <span>{tbl}</span>
                      <span className="text-[10px] text-[#8c786a] font-normal">{meta.rowCount} rows</span>
                    </div>
                    <div className="text-[11px] text-[#b8a495] flex flex-wrap gap-1">
                      {meta.columns.map(c => (
                        <span key={c} className="bg-[#1c130e] border border-[#382519] px-1.5 py-0.5 rounded text-[#f5ece3]">
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
        <div className="lg:col-span-4 border-r border-[#382519] bg-[#140d09] flex flex-col min-h-0">
          <div className="p-2.5 border-b border-[#382519] bg-[#18110b] flex items-center justify-between text-xs font-mono text-[#b8a495]">
            <span>SQL Query Editor</span>
            <div className="flex gap-2">
              <button
                onClick={() => setQuery('SELECT * FROM students;')}
                className="hover:text-[#fef08a] text-[11px] transition"
              >
                students
              </button>
              <button
                onClick={() => setQuery('SELECT * FROM employees;')}
                className="hover:text-[#fef08a] text-[11px] transition"
              >
                employees
              </button>
              <button
                onClick={() => setQuery('SELECT * FROM orders;')}
                className="hover:text-[#fef08a] text-[11px] transition"
              >
                orders
              </button>
            </div>
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your SQL query here (e.g. SELECT * FROM students;)"
            className="flex-1 w-full p-4 bg-[#140d09] text-[#f5ece3] font-mono text-xs leading-relaxed outline-none resize-none code-editor selection:bg-[#fef08a] selection:text-[#140d09]"
            spellCheck="false"
          />

          {/* Quick statement snippets */}
          <div className="p-2 border-t border-[#382519] bg-[#18110b] flex flex-wrap gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => setQuery('SELECT * FROM students WHERE marks > 80;')}
              className="px-2 py-1 bg-[#140d09] border border-[#382519] text-[#b8a495] rounded-lg hover:bg-[#22160f] hover:text-[#fef08a] hover:border-[#fef08a]/40 transition"
            >
              WHERE
            </button>
            <button
              onClick={() => setQuery('SELECT branch, COUNT(*), AVG(marks) FROM students GROUP BY branch;')}
              className="px-2 py-1 bg-[#140d09] border border-[#382519] text-[#b8a495] rounded-lg hover:bg-[#22160f] hover:text-[#fef08a] hover:border-[#fef08a]/40 transition"
            >
              GROUP BY
            </button>
            <button
              onClick={() => setQuery('SELECT s.name, d.dept_name FROM students s JOIN departments d ON s.branch = d.dept_id;')}
              className="px-2 py-1 bg-[#140d09] border border-[#382519] text-[#b8a495] rounded-lg hover:bg-[#22160f] hover:text-[#fef08a] hover:border-[#fef08a]/40 transition"
            >
              JOIN
            </button>
            <button
              onClick={() => setQuery('BEGIN;\nUPDATE accounts SET balance = balance - 1000 WHERE acc_no = "ACC1001";\nCOMMIT;')}
              className="px-2 py-1 bg-[#140d09] border border-[#382519] text-[#b8a495] rounded-lg hover:bg-[#22160f] hover:text-[#fef08a] hover:border-[#fef08a]/40 transition"
            >
              TRANSACTION
            </button>
          </div>
        </div>

        {/* Right Panel: Output & Result Table (Cols 9-12) */}
        <div className="lg:col-span-4 bg-[#18110b] flex flex-col min-h-0">
          <div className="p-2.5 border-b border-[#382519] bg-[#140d09] flex items-center justify-between text-xs font-mono text-[#b8a495]">
            <span>Query Results / Execution View</span>
            {result && (
              <span className={`text-[10px] font-bold ${result.success ? 'text-[#fef08a]' : 'text-red-400'}`}>
                {result.executionTimeMs} ms
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto p-3 font-mono text-xs custom-wooden-scrollbar">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-[#8c786a] text-center p-6 space-y-2">
                <Database className="w-8 h-8 opacity-40 text-[#fef08a]" />
                <p>Run a query above to see execution output and tabular records.</p>
              </div>
            ) : !result.success ? (
              <div className="bg-[#251810] border border-red-900/60 p-4 rounded-2xl text-red-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  SQL Error:
                </div>
                <p className="text-xs">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {result.message && (
                  <div className="bg-[#140d09] border border-[#fef08a]/40 p-2.5 rounded-xl text-[#fef08a] text-[11px]">
                    {result.message}
                  </div>
                )}

                {result.summary && (
                  <div className="bg-[#140d09] border border-[#382519] p-2.5 rounded-xl text-[#f5ece3] text-[11px]">
                    {result.summary}
                  </div>
                )}

                {result.rows && result.rows.length > 0 ? (
                  <div className="border border-[#382519] rounded-2xl overflow-x-auto shadow-md">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#140d09] text-[#fef08a] border-b border-[#382519]">
                        <tr>
                          {result.columns.map((col, i) => (
                            <th key={i} className="p-2.5 whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#382519] bg-[#18110b] text-[#f5ece3]">
                        {result.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#20150e] transition">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2.5 whitespace-nowrap">
                                {val === null ? <span className="text-[#8c786a] italic">NULL</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-[#8c786a] italic p-3 text-center">
                    0 rows returned. (Mutation executed or condition matched no rows).
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel: Hints, Explanation & Similar Challenge */}
      <div className="p-3 bg-[#18110b] border-t border-[#382519] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-[#fef08a] hover:text-white transition font-bold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'View Mentor Hint'}
          </button>
          {showHint && (
            <span className="text-[#f5ece3] text-[11px] bg-[#140d09] px-3 py-1 rounded-xl border border-[#382519]">
              💡 Always verify WHERE filter predicates before GROUP BY, and remember COUNT(*) counts rows including NULLs.
            </span>
          )}
        </div>

        <button
          onClick={() => {
            setQuery('SELECT name, marks, cgpa FROM students WHERE branch = "CSE" ORDER BY cgpa DESC;');
            handleRunQuery();
          }}
          className="flex items-center gap-1.5 text-[#fef08a] hover:text-white font-semibold transition"
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
