import React, { useState } from 'react';
import { MessageSquareCheck, Award, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, Send } from 'lucide-react';

export const INTERVIEW_ROUNDS = [
  {
    round: 1,
    title: 'Round 1: DBMS Fundamentals',
    interviewer: 'Technical Screening Lead',
    question: 'Why does an enterprise choose a relational DBMS over storing records directly in OS file systems (JSON, CSV)? Explain 2 specific failure modes of file systems.',
    expectedKeywords: ['redundancy', 'inconsistency', 'concurrency', 'acid', 'atomicity', 'locks'],
    hint: 'Think about multiple processes writing at once and duplicate data updates.',
    sampleGoodAnswer: 'File systems lack ACID transactions. First, concurrent writes cause race conditions and lost updates because there are no row-level locks. Second, flat files suffer from data inconsistency: updating a customer address in one file leaves outdated records in others.'
  },
  {
    round: 2,
    title: 'Round 2: SQL Mastery & Clause Lifecycle',
    interviewer: 'Senior Database Architect',
    question: 'Explain the difference between WHERE and HAVING. In what exact order does a SQL engine conceptually execute FROM, WHERE, GROUP BY, HAVING, SELECT, and ORDER BY?',
    expectedKeywords: ['from', 'where', 'group by', 'having', 'select', 'order by', 'aggregate'],
    hint: 'WHERE filters tuples before aggregation; HAVING filters groups after aggregation.',
    sampleGoodAnswer: 'FROM executes first to bind tables, followed by WHERE to filter rows. Next, GROUP BY aggregates rows into buckets, and HAVING filters those aggregated groups. Finally, SELECT projects columns, and ORDER BY sorts the final output.'
  },
  {
    round: 3,
    title: 'Round 3: Query Solving & Edge Cases',
    interviewer: 'Product Company Lead',
    question: 'Write a query to find the 2nd highest salary from an employee table without using LIMIT or OFFSET. How do you handle ties or NULL values?',
    expectedKeywords: ['max', 'where', 'salary <', 'subquery', 'dense_rank'],
    hint: 'Use `WHERE salary < (SELECT MAX(salary) FROM employees)` or DENSE_RANK().',
    sampleGoodAnswer: '`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`. Alternatively in modern SQL: `SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;` or using `DENSE_RANK() OVER (ORDER BY salary DESC)`.'
  },
  {
    round: 4,
    title: 'Round 4: Database Design & Normalization',
    interviewer: 'Data Architect',
    question: 'You are designing an Amazon-like shopping portal. Why should the OrderItem table store a snapshot unit price instead of merely referencing the product price via foreign key?',
    expectedKeywords: ['historical', 'price change', 'invoice', 'audit', 'immutable'],
    hint: 'What happens to past sales records when a seller changes the product price next month?',
    sampleGoodAnswer: 'Product catalog prices change constantly over time. If OrderItems only referenced Product.price, all historical invoices, accounting records, and customer receipts would retroactively alter whenever product prices change. Financial order history must be immutable.'
  },
  {
    round: 5,
    title: 'Round 5: Performance & Indexing',
    interviewer: 'Infrastructure Lead',
    question: 'A query `SELECT * FROM users WHERE YEAR(created_at) = 2024` is taking 15 seconds on 10 million rows despite an index on `created_at`. Why is it slow and how do you rewrite it?',
    expectedKeywords: ['non-sargable', 'function', 'range scan', 'b-tree', 'between', 'index'],
    hint: 'Wrapping indexed columns in functions breaks index tree navigation.',
    sampleGoodAnswer: 'Wrapping `created_at` in the `YEAR()` function makes the query non-sargable. The B-Tree index cannot compute function outputs, forcing a full table scan. Rewrite as: `WHERE created_at >= "2024-01-01" AND created_at <= "2024-12-31"` to enable a direct B-Tree index range scan.'
  },
  {
    round: 6,
    title: 'Round 6: System Design & Scaling',
    interviewer: 'Staff Systems Architect',
    question: 'Your relational database is receiving 80,000 read requests and 1,000 write requests per second. How do you scale this architecture without immediate complex database sharding?',
    expectedKeywords: ['read replicas', 'cache', 'redis', 'master', 'replication', 'connection pool'],
    hint: 'Separate reads from writes and introduce in-memory caching.',
    sampleGoodAnswer: 'Implement an in-memory caching layer using Redis for frequent cacheable queries. For remaining reads, configure horizontal read replicas with asynchronous streaming replication. Direct all writes to the primary master and route 95% of reads to replicas.'
  },
  {
    round: 7,
    title: 'Round 7: Industry Disaster Recovery Scenario',
    interviewer: 'VP of Engineering',
    question: 'A junior engineer accidentally ran `DROP TABLE customers` at 2:15 PM in production. You take full backups daily at midnight. How do you recover data up to 2:14 PM with zero loss?',
    expectedKeywords: ['pitr', 'point in time recovery', 'wal', 'write ahead log', 'archive'],
    hint: 'Combine midnight base backup with WAL replay.',
    sampleGoodAnswer: 'Use Point-In-Time Recovery (PITR). Restore the last valid full base backup taken at midnight onto a staging instance, then replay the continuous archived Write-Ahead Logs (WAL) up to the exact target timestamp 2:14:59 PM, stopping right before the DROP command.'
  }
];

export default function InterviewSimulator() {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [roundScores, setRoundScores] = useState({});

  const current = INTERVIEW_ROUNDS[currentRoundIdx];

  const evaluateAnswer = () => {
    if (!userAnswer.trim()) return;

    const lower = userAnswer.toLowerCase();
    const matched = current.expectedKeywords.filter(kw => lower.includes(kw));
    const scorePct = Math.min(100, Math.round((matched.length / Math.max(2, current.expectedKeywords.length * 0.5)) * 100));

    const result = {
      score: scorePct,
      passed: scorePct >= 60,
      matchedKeywords: matched,
      missingKeywords: current.expectedKeywords.filter(kw => !lower.includes(kw))
    };

    setFeedback(result);
    setRoundScores(prev => ({ ...prev, [current.round]: scorePct }));
  };

  const handleNextRound = () => {
    setUserAnswer('');
    setFeedback(null);
    if (currentRoundIdx < INTERVIEW_ROUNDS.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
    }
  };

  const calculateOverall = () => {
    const vals = Object.values(roundScores);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <MessageSquareCheck className="w-5 h-5 text-amber-400" />
              <span>Level 24: AI-Style Database Interview Simulator</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-2xl">
              7 rigorous technical interview rounds covering DBMS fundamentals, SQL writing, normalization, indexing, scaling, and disaster recovery.
            </p>
          </div>
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center sm:text-right">
            <span className="text-xs font-mono text-zinc-400 block mb-1">Overall Interview Score</span>
            <span className="text-2xl font-extrabold font-mono text-amber-400">{calculateOverall()}%</span>
          </div>
        </div>

        {/* Round Tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          {INTERVIEW_ROUNDS.map((r, i) => (
            <button
              key={r.round}
              onClick={() => { setCurrentRoundIdx(i); setFeedback(null); setUserAnswer(''); }}
              className={`px-3 py-1.5 text-xs font-mono rounded-xl transition font-bold border ${
                currentRoundIdx === i
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black border-amber-400 shadow-md shadow-amber-500/20 font-extrabold'
                  : roundScores[r.round] !== undefined
                  ? 'bg-zinc-950 text-amber-300 border-amber-500/50'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              R{r.round}: {r.round === 1 ? 'Fundamentals' : r.round === 2 ? 'SQL' : r.round === 3 ? 'Queries' : r.round === 4 ? 'Design' : r.round === 5 ? 'Perf' : r.round === 6 ? 'Scale' : 'DR'}
            </button>
          ))}
        </div>
      </div>

      {/* Current Round Interactive Dialogue */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">{current.title}</span>
            <h3 className="text-sm font-semibold text-white">Interviewer: {current.interviewer}</h3>
          </div>
          <span className="text-xs font-mono bg-zinc-950 text-zinc-300 px-3 py-1 rounded-full border border-zinc-800">
            Round {current.round} of 7
          </span>
        </div>

        {/* Interviewer Question Prompt */}
        <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/30 text-sm text-zinc-200 leading-relaxed font-mono">
          <span className="text-amber-400 font-bold block mb-1">Interviewer Question:</span>
          "{current.question}"
        </div>

        {/* Candidate Response Area */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 block">Your Professional Response:</label>
          <textarea
            rows={4}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your explanation or query approach here..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3.5 text-xs font-mono text-white focus:border-amber-400 outline-none leading-relaxed"
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <span className="text-[11px] text-zinc-500 font-mono">
              Tip: Include technical keywords ({current.hint})
            </span>
            <button
              onClick={evaluateAnswer}
              disabled={!userAnswer.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 disabled:opacity-50 text-black text-xs font-mono font-extrabold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              Submit Response to Interviewer
            </button>
          </div>
        </div>

        {/* Real-time AI Evaluation Feedback */}
        {feedback && (
          <div className={`p-5 rounded-2xl border font-mono text-xs space-y-3 ${
            feedback.passed ? 'bg-zinc-950 border-amber-500/60 shadow-lg' : 'bg-zinc-950 border-zinc-700 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-bold text-sm ${feedback.passed ? 'text-amber-400' : 'text-zinc-300'}`}>
                {feedback.passed ? '✅ Strong Technical Response!' : '⚠️ Incomplete Explanation'} (Score: {feedback.score}%)
              </span>
              {currentRoundIdx < INTERVIEW_ROUNDS.length - 1 && (
                <button
                  onClick={handleNextRound}
                  className="px-4 py-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black rounded-lg font-extrabold flex items-center gap-1 shadow-md shadow-amber-500/20"
                >
                  Next Round <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              )}
            </div>

            <div className="text-zinc-300">
              <span className="text-zinc-400 block mb-1">Keywords Identified:</span>
              <div className="flex flex-wrap gap-1.5">
                {feedback.matchedKeywords.map(k => (
                  <span key={k} className="px-2.5 py-0.5 bg-zinc-900 text-amber-300 rounded-lg border border-amber-500/40">
                    +{k}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-[11px]">
              <span className="text-amber-400 font-bold block mb-1">Model Ideal Answer:</span>
              <p className="text-zinc-300 leading-relaxed">{current.sampleGoodAnswer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
