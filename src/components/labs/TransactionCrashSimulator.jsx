import React, { useState } from 'react';
import { RefreshCw, Zap, AlertOctagon, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function TransactionCrashSimulator() {
  const [activeTab, setActiveTab] = useState('bank-crash'); // 'bank-crash', 'anomalies', 'isolation'
  const [step, setStep] = useState(0);
  const [accountA, setAccountA] = useState(50000);
  const [accountB, setAccountB] = useState(20000);
  const [crashed, setCrashed] = useState(false);
  const [isRolledBack, setIsRolledBack] = useState(false);
  const [walLogs, setWalLogs] = useState([]);

  // Concurrency scenario state
  const [anomalyType, setAnomalyType] = useState('dirty-read');

  const runStep = () => {
    if (step === 0) {
      setWalLogs(prev => ['[BEGIN_TXN] Transaction T1 started (ID: 98402)', ...prev]);
      setStep(1);
    } else if (step === 1) {
      setAccountA(prev => prev - 10000);
      setWalLogs(prev => [
        '[WRITE] UPDATE accounts SET balance = balance - 10000 WHERE acc = "ACC_ALICE"',
        '[UNDO_LOG] Recorded old balance for rollback: 50,000',
        ...prev
      ]);
      setStep(2);
    } else if (step === 2) {
      // Prompt user to either crash or continue
      setStep(3);
    } else if (step === 3) {
      setAccountB(prev => prev + 10000);
      setWalLogs(prev => [
        '[WRITE] UPDATE accounts SET balance = balance + 10000 WHERE acc = "ACC_BOB"',
        '[COMMIT_TXN] Transaction committed successfully. Flushing to disk.',
        ...prev
      ]);
      setStep(4);
    }
  };

  const simulateCrash = () => {
    setCrashed(true);
    setWalLogs(prev => [
      '🔥 POWER FAILURE / SERVER CRASH OCCURRED!',
      'Database server rebooted. Scanning WAL (Write-Ahead-Log)...',
      'Uncommitted transaction T1 found without COMMIT record.',
      'TRIGGERING AUTOMATIC UNDO / ROLLBACK...',
      ...prev
    ]);
    setTimeout(() => {
      setAccountA(50000);
      setAccountB(20000);
      setIsRolledBack(true);
      setWalLogs(prev => [
        '✅ ATOMICITY PRESERVED: Alice balance restored to 50,000. $0 lost.',
        ...prev
      ]);
    }, 1200);
  };

  const resetTransfer = () => {
    setStep(0);
    setAccountA(50000);
    setAccountB(20000);
    setCrashed(false);
    setIsRolledBack(false);
    setWalLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <Zap className="w-5 h-5" />
              <span>Level 10 Signature: ACID Bank Transfer & Crash Simulation</span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl">
              Watch what happens when a database crashes midway between Account A and Account B debit/credit operations.
              Experience how Write-Ahead Logging (WAL) and Atomicity prevent catastrophic money evaporation!
            </p>
          </div>
          <button
            onClick={resetTransfer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset State
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('bank-crash')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono font-semibold transition ${
              activeTab === 'bank-crash' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Bank Transfer Crash Simulator
          </button>
          <button
            onClick={() => setActiveTab('anomalies')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono font-semibold transition ${
              activeTab === 'anomalies' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Concurrency Anomalies
          </button>
          <button
            onClick={() => setActiveTab('isolation')}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono font-semibold transition ${
              activeTab === 'isolation' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Isolation Levels Matrix
          </button>
        </div>
      </div>

      {activeTab === 'bank-crash' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bank Accounts Visualizer */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Account Alice */}
              <div className={`p-4 rounded-xl border transition ${
                step >= 2 && !isRolledBack ? 'bg-red-950/30 border-red-500/50' : 'bg-slate-900 border-slate-800'
              }`}>
                <span className="text-xs font-mono text-slate-400 block mb-1">Source Account A</span>
                <span className="font-bold text-white text-base">Alice Johnson (ACC_1001)</span>
                <div className="mt-3 text-2xl font-mono font-extrabold text-emerald-400">
                  ₹{accountA.toLocaleString()}
                </div>
                {step >= 2 && (
                  <span className="text-xs text-red-400 font-mono mt-1 block">
                    -₹10,000 debited in memory buffer
                  </span>
                )}
              </div>

              {/* Account Bob */}
              <div className={`p-4 rounded-xl border transition ${
                step === 4 ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-slate-900 border-slate-800'
              }`}>
                <span className="text-xs font-mono text-slate-400 block mb-1">Destination Account B</span>
                <span className="font-bold text-white text-base">Bob Smith (ACC_1002)</span>
                <div className="mt-3 text-2xl font-mono font-extrabold text-blue-400">
                  ₹{accountB.toLocaleString()}
                </div>
                {step === 4 ? (
                  <span className="text-xs text-emerald-400 font-mono mt-1 block">
                    +₹10,000 credited & committed!
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-mono mt-1 block">
                    Awaiting incoming transfer...
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Timeline Stepper */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Execution Steps: ₹10,000 Transfer
              </span>

              <div className="flex flex-wrap gap-2">
                {step === 0 && (
                  <button
                    onClick={runStep}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold rounded-lg transition"
                  >
                    1. Execute BEGIN TRANSACTION
                  </button>
                )}
                {step === 1 && (
                  <button
                    onClick={runStep}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold rounded-lg transition"
                  >
                    2. Execute UPDATE Alice (-₹10,000)
                  </button>
                )}
                {step === 2 && !crashed && (
                  <div className="flex gap-2">
                    <button
                      onClick={simulateCrash}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold rounded-lg transition animate-pulse"
                    >
                      <Flame className="w-4 h-4" />
                      CRASH SYSTEM NOW! (Simulate Power Failure)
                    </button>
                    <button
                      onClick={runStep}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold rounded-lg transition"
                    >
                      3. Continue to UPDATE Bob (+₹10,000)
                    </button>
                  </div>
                )}
                {step === 3 && (
                  <button
                    onClick={runStep}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold rounded-lg transition"
                  >
                    4. Execute COMMIT
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* WAL Log Monitor */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
            <span className="text-amber-400 font-bold block mb-2">Write-Ahead Log (WAL) Console</span>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto text-slate-300">
              {walLogs.length === 0 ? (
                <div className="text-slate-600 italic">Logs will stream as transactions execute...</div>
              ) : (
                walLogs.map((log, i) => (
                  <div key={i} className={`p-1 rounded ${
                    log.includes('CRASH') ? 'bg-red-950 text-red-300 font-bold' :
                    log.includes('PRESERVED') ? 'bg-emerald-950 text-emerald-300 font-bold' :
                    'text-slate-400'
                  }`}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'anomalies' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            {['dirty-read', 'lost-update', 'non-repeatable', 'phantom-read'].map(type => (
              <button
                key={type}
                onClick={() => setAnomalyType(type)}
                className={`p-2.5 rounded-lg border text-center transition uppercase font-bold ${
                  anomalyType === type ? 'bg-amber-950 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
            {anomalyType === 'dirty-read' && (
              <>
                <span className="text-amber-400 font-bold text-sm block">Dirty Read (Reading Uncommitted Garbage):</span>
                <p className="text-slate-300">
                  Transaction T1 modifies a row. Transaction T2 reads the modified row. T1 then executes ROLLBACK!
                  T2 has now made financial calculations based on phantom data that never legally existed in the database!
                </p>
                <div className="text-slate-500 bg-slate-900 p-2 rounded">Prevented by: Read Committed, Repeatable Read, Serializable</div>
              </>
            )}
            {anomalyType === 'lost-update' && (
              <>
                <span className="text-red-400 font-bold text-sm block">Lost Update:</span>
                <p className="text-slate-300">
                  Transaction T1 and T2 both read balance = ₹50,000. T1 adds ₹5,000 and writes ₹55,000.
                  T2 subtracts ₹2,000 from the original read and writes ₹48,000. T1's ₹5,000 deposit is completely wiped out!
                </p>
                <div className="text-slate-500 bg-slate-900 p-2 rounded">Prevented by: Row-level locking (SELECT FOR UPDATE) or Repeatable Read</div>
              </>
            )}
            {anomalyType === 'non-repeatable' && (
              <>
                <span className="text-blue-400 font-bold text-sm block">Non-Repeatable Read:</span>
                <p className="text-slate-300">
                  Transaction T1 reads row (balance = ₹10,000). Transaction T2 updates balance to ₹20,000 and COMMITS.
                  T1 re-reads the exact same row and receives ₹20,000. The same query yielded two different results inside one transaction!
                </p>
                <div className="text-slate-500 bg-slate-900 p-2 rounded">Prevented by: Repeatable Read, Serializable</div>
              </>
            )}
            {anomalyType === 'phantom-read' && (
              <>
                <span className="text-purple-400 font-bold text-sm block">Phantom Read:</span>
                <p className="text-slate-300">
                  Transaction T1 executes `SELECT COUNT(*) WHERE branch = 'CSE'` and gets 50.
                  Transaction T2 inserts a 51st student and COMMITS. T1 repeats the count query and sees 51 tuples!
                </p>
                <div className="text-slate-500 bg-slate-900 p-2 rounded">Prevented by: Serializable (Range Locks / Next-Key Locks)</div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'isolation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Isolation Level</th>
                <th className="p-3">Dirty Read</th>
                <th className="p-3">Non-Repeatable Read</th>
                <th className="p-3">Phantom Read</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-red-400">Read Uncommitted</td>
                <td className="p-3 text-red-400">Allowed</td>
                <td className="p-3 text-red-400">Allowed</td>
                <td className="p-3 text-red-400">Allowed</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-400">Read Committed (PostgreSQL / Oracle Default)</td>
                <td className="p-3 text-emerald-400">Prevented</td>
                <td className="p-3 text-red-400">Allowed</td>
                <td className="p-3 text-red-400">Allowed</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-400">Repeatable Read (MySQL InnoDB Default)</td>
                <td className="p-3 text-emerald-400">Prevented</td>
                <td className="p-3 text-emerald-400">Prevented</td>
                <td className="p-3 text-red-400">Allowed (MySQL prevents via Next-Key)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-400">Serializable (Highest Isolation)</td>
                <td className="p-3 text-emerald-400">Prevented</td>
                <td className="p-3 text-emerald-400">Prevented</td>
                <td className="p-3 text-emerald-400">Prevented</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
