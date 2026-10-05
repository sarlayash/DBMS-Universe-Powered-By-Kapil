import React, { useState } from 'react';
import { AlertTriangle, FileText, CheckCircle2, RefreshCw, Flame, ShieldAlert, Users, Database } from 'lucide-react';

export default function FileSystemChallenge({ onComplete }) {
  const [activeTab, setActiveTab] = useState('students');
  const [anomalyTriggered, setAnomalyTriggered] = useState(null);
  const [logs, setLogs] = useState([
    'System initialized in 1960s Traditional Flat File System mode.',
    '4 flat files loaded into memory: students.txt, fees.csv, attendance.csv, marks.csv.'
  ]);

  // Initial file states
  const [studentsFile, setStudentsFile] = useState([
    'ID: 101 | Name: Aarav Sharma | Branch: CSE | Phone: 9876543210',
    'ID: 102 | Name: Priya Patel   | Branch: ECE | Phone: 9811223344',
    'ID: 103 | Name: Rohan Verma   | Branch: CSE | Phone: 9788990011'
  ]);

  const [feesFile, setFeesFile] = useState([
    'StudentID,StudentName,AmountPaid,PendingDues',
    '101,Aarav Sharma,45000,5000',
    '102,Priya Patel,50000,0',
    '103,Rohan Verma,30000,20000'
  ]);

  const [attendanceFile, setAttendanceFile] = useState([
    'StudentID,StudentName,AttendedDays,TotalDays',
    '101,Aarav Sharma,78,90',
    '102,Priya Patel,88,90',
    '103,Rohan Verma,65,90'
  ]);

  const [marksFile, setMarksFile] = useState([
    'StudentID,StudentName,DBMS_Marks,OS_Marks',
    '101,Aarav Sharma,88,82',
    '102,Priya Patel,94,91',
    '103,Rohan Verma,76,70'
  ]);

  const addLog = (msg) => {
    setLogs(prev => [msg, ...prev.slice(0, 7)]);
  };

  // Anomaly 1: Redundancy
  const triggerRedundancy = () => {
    setAnomalyTriggered('redundancy');
    addLog('CRITICAL: Duplicate student records created across 3 separate files. Wasted storage and redundant updates required.');
  };

  // Anomaly 2: Inconsistency
  const triggerInconsistency = () => {
    setMarksFile(prev => [
      prev[0],
      '101,Aarav K. Sharma (Name Changed in Exam Dept),98,92',
      prev[2],
      prev[3]
    ]);
    setAnomalyTriggered('inconsistency');
    addLog('ANOMALY DETECTED: Student 101 name was updated in marks.csv, but fees.csv and students.txt still store the outdated name! Data desynchronized!');
  };

  // Anomaly 3: Concurrent Write Race Condition
  const triggerRaceCondition = () => {
    setAnomalyTriggered('concurrency');
    setAttendanceFile(prev => [
      prev[0],
      '101,Aarav Sharma,CORRUPT_BYTES_0x8F,90 (Race condition: 2 instructors wrote simultaneously)',
      prev[2],
      prev[3]
    ]);
    addLog('FATAL: File Lock collision! Attendance instructor A and B edited attendance.csv at the exact same millisecond. Last write won, file partially corrupted!');
  };

  // Anomaly 4: Security Leak
  const triggerSecurityLeak = () => {
    setAnomalyTriggered('security');
    addLog('SECURITY BREACH: Any OS process or student can read plaintext fees and marks without authentication or row-level permissions.');
  };

  const resetAll = () => {
    setAnomalyTriggered(null);
    setStudentsFile([
      'ID: 101 | Name: Aarav Sharma | Branch: CSE | Phone: 9876543210',
      'ID: 102 | Name: Priya Patel   | Branch: ECE | Phone: 9811223344',
      'ID: 103 | Name: Rohan Verma   | Branch: CSE | Phone: 9788990011'
    ]);
    setFeesFile([
      'StudentID,StudentName,AmountPaid,PendingDues',
      '101,Aarav Sharma,45000,5000',
      '102,Priya Patel,50000,0',
      '103,Rohan Verma,30000,20000'
    ]);
    setAttendanceFile([
      'StudentID,StudentName,AttendedDays,TotalDays',
      '101,Aarav Sharma,78,90',
      '102,Priya Patel,88,90',
      '103,Rohan Verma,65,90'
    ]);
    setMarksFile([
      'StudentID,StudentName,DBMS_Marks,OS_Marks',
      '101,Aarav Sharma,88,82',
      '102,Priya Patel,94,91',
      '103,Rohan Verma,76,70'
    ]);
    addLog('File system reset to initial demo state.');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-black via-zinc-950 to-zinc-900 border border-amber-500/40 rounded-xl p-5 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Signature Experience: "The File System Challenge"</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-2xl">
              Experience the historical crisis that forced computer scientists to invent DBMS! You manage 4 independent flat files.
              Trigger real-world anomalies below and observe how the file system architecture catastrophically breaks down.
            </p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-black hover:bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Files
          </button>
        </div>
      </div>

      {/* Anomaly Trigger Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={triggerRedundancy}
          className={`p-4 rounded-xl border text-left transition flex flex-col justify-between shadow-md ${
            anomalyTriggered === 'redundancy'
              ? 'bg-black border-amber-500 text-amber-300 shadow-amber-500/10'
              : 'bg-zinc-950 border-zinc-800 hover:border-amber-500/50 text-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm">1. Data Duplication</span>
          </div>
          <span className="text-xs text-zinc-400">Notice student names and IDs copied in 4 separate files.</span>
        </button>

        <button
          onClick={triggerInconsistency}
          className={`p-4 rounded-xl border text-left transition flex flex-col justify-between shadow-md ${
            anomalyTriggered === 'inconsistency'
              ? 'bg-red-950/50 border-red-500 text-red-200'
              : 'bg-zinc-950 border-zinc-800 hover:border-red-500/50 text-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="font-semibold text-sm">2. Data Inconsistency</span>
          </div>
          <span className="text-xs text-zinc-400">Update marks without updating fees or profile.</span>
        </button>

        <button
          onClick={triggerRaceCondition}
          className={`p-4 rounded-xl border text-left transition flex flex-col justify-between shadow-md ${
            anomalyTriggered === 'concurrency'
              ? 'bg-black border-amber-500 text-amber-300'
              : 'bg-zinc-950 border-zinc-800 hover:border-amber-500/40 text-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm">3. Concurrent Crash</span>
          </div>
          <span className="text-xs text-zinc-400">Simulate two users saving attendance simultaneously.</span>
        </button>

        <button
          onClick={triggerSecurityLeak}
          className={`p-4 rounded-xl border text-left transition flex flex-col justify-between shadow-md ${
            anomalyTriggered === 'security'
              ? 'bg-zinc-900 border-zinc-600 text-zinc-200'
              : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-zinc-200" />
            <span className="font-semibold text-sm">4. Security Exposure</span>
          </div>
          <span className="text-xs text-zinc-400">Expose raw unencrypted financial & academic records.</span>
        </button>
      </div>

      {/* File Viewer Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          {/* File tabs */}
          <div className="flex items-center border-b border-zinc-800 bg-black px-2 pt-2 gap-1">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-t-lg transition border-t border-x ${
                activeTab === 'students'
                  ? 'bg-zinc-950 text-amber-400 border-zinc-800'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              students.txt
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-t-lg transition border-t border-x ${
                activeTab === 'fees'
                  ? 'bg-zinc-950 text-amber-300 border-zinc-800'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              fees.csv
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-t-lg transition border-t border-x ${
                activeTab === 'attendance'
                  ? 'bg-zinc-950 text-zinc-200 border-zinc-800'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              attendance.csv
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-t-lg transition border-t border-x ${
                activeTab === 'marks'
                  ? 'bg-zinc-950 text-amber-400 border-zinc-800'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              marks.csv
            </button>
          </div>

          {/* File Content Preview */}
          <div className="p-4 bg-black font-mono text-xs text-zinc-300 min-h-[220px] overflow-x-auto">
            {activeTab === 'students' && (
              <div className="space-y-1">
                {studentsFile.map((line, idx) => (
                  <div key={idx} className="hover:bg-zinc-900 p-1 rounded transition">
                    <span className="text-zinc-600 mr-3 select-none">{idx + 1}</span>
                    {line}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'fees' && (
              <div className="space-y-1">
                {feesFile.map((line, idx) => (
                  <div key={idx} className="hover:bg-zinc-900 p-1 rounded transition">
                    <span className="text-zinc-600 mr-3 select-none">{idx + 1}</span>
                    <span className={idx === 0 ? 'text-amber-300 font-bold' : ''}>{line}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'attendance' && (
              <div className="space-y-1">
                {attendanceFile.map((line, idx) => (
                  <div key={idx} className="hover:bg-zinc-900 p-1 rounded transition">
                    <span className="text-zinc-600 mr-3 select-none">{idx + 1}</span>
                    <span className={line.includes('CORRUPT') ? 'text-red-400 font-bold bg-red-950/60 p-0.5 rounded' : ''}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'marks' && (
              <div className="space-y-1">
                {marksFile.map((line, idx) => (
                  <div key={idx} className="hover:bg-zinc-900 p-1 rounded transition">
                    <span className="text-zinc-600 mr-3 select-none">{idx + 1}</span>
                    <span className={line.includes('Exam Dept') ? 'text-amber-400 font-bold bg-amber-950/60 p-0.5 rounded' : ''}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Console Activity & Conclusion */}
        <div className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-md">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2 flex items-center gap-1.5">
              <span>Operating System Event Stream</span>
            </h4>
            <div className="space-y-2 text-xs font-mono max-h-[160px] overflow-y-auto pr-1">
              {logs.map((log, i) => (
                <div key={i} className="text-zinc-400 border-l-2 border-zinc-700 pl-2 py-0.5">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-amber-500/40 rounded-xl p-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Why DBMS Was Invented</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Because of <strong className="text-white">Redundancy, Inconsistency, Concurrency Collisions, and Security Voids</strong>, the relational DBMS was born:
              providing a single unified schema, ACID transactions, and declarative SQL!
            </p>
            {onComplete && (
              <button
                onClick={onComplete}
                className="mt-3 w-full py-2.5 px-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-110 text-black font-extrabold text-xs rounded-lg transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                Complete Level 0 Signature Experience (+100 XP)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
