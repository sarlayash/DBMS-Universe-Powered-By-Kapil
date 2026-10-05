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
      // Vulnerable string concatenation simulation:
      // SELECT * FROM users WHERE username = '${userInput}'
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
      // Secure mode with parameterized query
      setAttackOutput({
        exploited: false,
        message: '🛡️ ATTACK BLOCKED! Parameterized query sanitized input. Treated "\' OR \'1\'=\'1\' --" as literal string literal username. 0 records leaked.',
        dumpedRows: []
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-bold text-lg mb-1">
              <ShieldAlert className="w-5 h-5" />
              <span>Level 13 Security Lab: SQL Injection Exploit & Defense Sandbox</span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl">
              Experience firsthand how a simple malicious string input completely hijacks an unescaped SQL query to dump confidential user tables.
              Then toggle on <strong>Parameterized Queries</strong> to see how prepared statements neutralize the exploit!
            </p>
          </div>
          <button
            onClick={() => { setIsSecureMode(!isSecureMode); setAttackOutput(null); }}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition flex items-center gap-1.5 ${
              isSecureMode
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-red-950 border-red-500 text-red-300'
            }`}
          >
            {isSecureMode ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            Mode: {isSecureMode ? 'SECURED (Parameterized)' : 'VULNERABLE (Concatenation)'}
          </button>
        </div>
      </div>

      {/* Terminal Attacker Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Terminal className="w-4 h-4 text-emerald-400" />
            Hacker Penetration Testing Console
          </span>
          <span className="text-[11px] text-slate-500">Target: /api/v1/login</span>
        </div>

        <div>
          <label className="text-slate-400 block mb-1">Payload Input (username parameter):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono"
            />
            <button
              onClick={executeAttack}
              className={`px-4 py-2 font-bold rounded text-white transition ${
                isSecureMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              Send Exploit Payload
            </button>
          </div>
        </div>

        {/* Generated Backend Query */}
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-500 block mb-1">Backend SQL Evaluated by Database Engine:</span>
          {isSecureMode ? (
            <div className="text-emerald-400">
              <code>PREPARE stmt FROM 'SELECT * FROM users WHERE username = ? AND password = ?';</code>
              <br />
              <code>EXECUTE stmt USING ('{userInput}', 'secret');</code>
            </div>
          ) : (
            <div className="text-red-400">
              <code>SELECT * FROM users WHERE username = '{userInput}' AND password = 'password';</code>
            </div>
          )}
        </div>
      </div>

      {/* Attack Results */}
      {attackOutput && (
        <div className={`p-4 rounded-xl border font-mono text-xs ${
          attackOutput.exploited
            ? 'bg-red-950/40 border-red-500/60'
            : 'bg-emerald-950/40 border-emerald-500/60'
        }`}>
          <div className={`font-bold text-sm mb-2 ${
            attackOutput.exploited ? 'text-red-400' : 'text-emerald-400'
          }`}>
            {attackOutput.message}
          </div>

          {attackOutput.dumpedRows.length > 0 && (
            <div className="overflow-x-auto mt-3">
              <span className="text-red-300 font-bold block mb-1">Confidential Database DUMP:</span>
              <table className="w-full text-left">
                <thead className="text-slate-400 border-b border-red-900/60">
                  <tr>
                    <th className="p-2">id</th>
                    <th className="p-2">username</th>
                    <th className="p-2">password_hash</th>
                    <th className="p-2">role</th>
                    <th className="p-2">balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-900/30 text-red-200">
                  {attackOutput.dumpedRows.map(u => (
                    <tr key={u.id}>
                      <td className="p-2">{u.id}</td>
                      <td className="p-2 font-bold">{u.username}</td>
                      <td className="p-2">{u.password_hash}</td>
                      <td className="p-2">{u.role}</td>
                      <td className="p-2 font-bold">{u.balance}</td>
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
