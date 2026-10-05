import React, { useState } from 'react';
import { Lock, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SecuritySandbox() {
  const [userInput, setUserInput] = useState("' OR '1'='1' --");
  const [isSecureMode, setIsSecureMode] = useState(false);
  const [attackOutput, setAttackOutput] = useState(null);

  // Mock user accounts in target app
  const secretDatabaseUsers = [
    { id: 1, username: 'admin', password_hash: '$2a$12$e84.8Jfk82j9a0e', role: 'SUPER_ADMIN', balance: '$2,500,000' },
    { id: 2, username: 'cfo_sarah', password_hash: '$2a$12$K19fka82lpa990z', role: 'EXECUTIVE', balance: '$1,200,000' },
    { id: 3, username: 'lead_dev', password_hash: '$2a$12$98Jfk192ksp128x', role: 'DEVELOPER', balance: '$180,000' }
  ];

  const executeAttack = () => {
    if (!isSecureMode) {
      if (userInput.includes("' OR '1'='1") || userInput.includes("' OR 1=1")) {
        setAttackOutput({
          exploited: true,
          message: '🚨 CRITICAL VULNERABILITY EXPLOITED! SQL Injection succeeded. Entire users table dumped without valid password!',
          dumpedRows: secretDatabaseUsers
        });
      } else {
        setAttackOutput({
          exploited: false,
          message: `Query evaluated: SELECT * FROM users WHERE username = '${userInput}'. No records matched.`,
          dumpedRows: []
        });
      }
    } else {
      setAttackOutput({
        exploited: false,
        message: '🛡️ ATTACK BLOCKED! Parameterized query sanitized input. Treated "\' OR \'1\'=\'1\' --" as literal string username. 0 records leaked.',
        dumpedRows: []
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Level 13 Security Lab: SQL Injection Exploit & Defense Sandbox</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-2xl">
              Experience firsthand how a simple malicious string input completely hijacks an unescaped SQL query to dump confidential user tables.
              Then toggle on <strong>Parameterized Queries</strong> to see how prepared statements neutralize the exploit!
            </p>
          </div>
          <button
            onClick={() => { setIsSecureMode(!isSecureMode); setAttackOutput(null); }}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-xl border transition flex items-center gap-2 shadow-md ${
              isSecureMode
                ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                : 'bg-red-950/60 border-red-500 text-red-300'
            }`}
          >
            {isSecureMode ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
            Mode: {isSecureMode ? 'SECURED (Prepared)' : 'VULNERABLE (Concatenated)'}
          </button>
        </div>
      </div>

      {/* Terminal Attacker Console */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 font-mono text-xs space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-3">
          <span className="flex items-center gap-2 text-zinc-300">
            <Terminal className="w-4 h-4 text-amber-400" />
            Hacker Penetration Testing Console
          </span>
          <span className="text-[11px] text-zinc-500">Target: /api/v1/login</span>
        </div>

        <div>
          <label className="text-zinc-400 block mb-1.5">Payload Input (username parameter):</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:border-amber-400 outline-none"
            />
            <button
              onClick={executeAttack}
              className={`px-5 py-2.5 font-extrabold rounded-xl transition ${
                isSecureMode
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30'
              }`}
            >
              Send Exploit Payload
            </button>
          </div>
        </div>

        {/* Generated Backend Query */}
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-1">
          <span className="text-zinc-500 block mb-1">Backend SQL Evaluated by Database Engine:</span>
          {isSecureMode ? (
            <div className="text-amber-400 font-mono">
              <code>PREPARE stmt FROM 'SELECT * FROM users WHERE username = ? AND password = ?';</code>
              <br />
              <code>EXECUTE stmt USING ('{userInput}', 'secret');</code>
            </div>
          ) : (
            <div className="text-red-400 font-mono">
              <code>SELECT * FROM users WHERE username = '{userInput}' AND password = 'password';</code>
            </div>
          )}
        </div>
      </div>

      {/* Attack Results */}
      {attackOutput && (
        <div className={`p-5 rounded-2xl border font-mono text-xs shadow-xl ${
          attackOutput.exploited
            ? 'bg-red-950/40 border-red-500/60'
            : 'bg-zinc-900 border-amber-500/60 text-amber-300'
        }`}>
          <div className={`font-bold text-sm mb-2 ${
            attackOutput.exploited ? 'text-red-400' : 'text-amber-400'
          }`}>
            {attackOutput.message}
          </div>

          {attackOutput.dumpedRows.length > 0 && (
            <div className="overflow-x-auto mt-3">
              <span className="text-red-300 font-bold block mb-2">Confidential Database DUMP:</span>
              <table className="w-full text-left">
                <thead className="text-zinc-400 border-b border-red-900/60 bg-zinc-950">
                  <tr>
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">username</th>
                    <th className="p-2.5">password_hash</th>
                    <th className="p-2.5">role</th>
                    <th className="p-2.5">balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-900/30 text-red-200">
                  {attackOutput.dumpedRows.map(u => (
                    <tr key={u.id} className="hover:bg-red-950/20">
                      <td className="p-2.5">{u.id}</td>
                      <td className="p-2.5 font-bold text-white">{u.username}</td>
                      <td className="p-2.5 text-zinc-400">{u.password_hash}</td>
                      <td className="p-2.5">{u.role}</td>
                      <td className="p-2.5 font-bold text-amber-400">{u.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
