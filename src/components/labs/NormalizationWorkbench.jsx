import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function NormalizationWorkbench() {
  const [currentStage, setCurrentStage] = useState('unnormalized'); // unnormalized, 1nf, 2nf, 3nf
  const [activeAnomaly, setActiveAnomaly] = useState(null);

  // Unnormalized anomalous records
  const unnormalizedData = [
    { student_id: 101, name: 'Aarav', courses: 'CS301, CS302', dept: 'CSE', dept_head: 'Dr. Kumar', dept_budget: '$500k' },
    { student_id: 102, name: 'Priya', courses: 'EC201', dept: 'ECE', dept_head: 'Dr. Sen', dept_budget: '$380k' },
    { student_id: 103, name: 'Rohan', courses: 'CS301', dept: 'CSE', dept_head: 'Dr. Kumar', dept_budget: '$500k' }
  ];

  // 1NF Data (Atomic values)
  const data1NF = [
    { student_id: 101, name: 'Aarav', course_id: 'CS301', course_name: 'DBMS', instructor: 'Kapil', dept: 'CSE', dept_head: 'Dr. Kumar' },
    { student_id: 101, name: 'Aarav', course_id: 'CS302', course_name: 'OS', instructor: 'Prof. Rao', dept: 'CSE', dept_head: 'Dr. Kumar' },
    { student_id: 102, name: 'Priya', course_id: 'EC201', course_name: 'DSP', instructor: 'Dr. Sen', dept: 'ECE', dept_head: 'Dr. Sen' },
    { student_id: 103, name: 'Rohan', course_id: 'CS301', course_name: 'DBMS', instructor: 'Kapil', dept: 'CSE', dept_head: 'Dr. Kumar' }
  ];

  // 2NF Tables (Removed partial dependencies on composite PK (student_id, course_id))
  const table2NF_Students = [
    { student_id: 101, name: 'Aarav', dept: 'CSE', dept_head: 'Dr. Kumar' },
    { student_id: 102, name: 'Priya', dept: 'ECE', dept_head: 'Dr. Sen' },
    { student_id: 103, name: 'Rohan', dept: 'CSE', dept_head: 'Dr. Kumar' }
  ];
  const table2NF_Courses = [
    { course_id: 'CS301', course_name: 'DBMS', instructor: 'Kapil' },
    { course_id: 'CS302', course_name: 'OS', instructor: 'Prof. Rao' },
    { course_id: 'EC201', course_name: 'DSP', instructor: 'Dr. Sen' }
  ];
  const table2NF_Enrollments = [
    { student_id: 101, course_id: 'CS301' },
    { student_id: 101, course_id: 'CS302' },
    { student_id: 102, course_id: 'EC201' },
    { student_id: 103, course_id: 'CS301' }
  ];

  // 3NF Tables (Removed transitive dependency: student_id -> dept -> dept_head)
  const table3NF_Students = [
    { student_id: 101, name: 'Aarav', dept_id: 'CSE' },
    { student_id: 102, name: 'Priya', dept_id: 'ECE' },
    { student_id: 103, name: 'Rohan', dept_id: 'CSE' }
  ];
  const table3NF_Departments = [
    { dept_id: 'CSE', dept_name: 'Computer Science', dept_head: 'Dr. Kumar', budget: '$500k' },
    { dept_id: 'ECE', dept_name: 'Electronics', dept_head: 'Dr. Sen', budget: '$380k' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Level 9: Schema Normalization Workbench & Anomaly Lab</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-2xl">
              An un-normalized table with multi-valued attributes and transitive dependencies causes 3 lethal anomalies:
              Insertion, Update, and Deletion anomalies. Step through normalization below to repair the schema!
            </p>
          </div>
          <button
            onClick={() => { setCurrentStage('unnormalized'); setActiveAnomaly(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            Reset to Broken
          </button>
        </div>

        {/* Progress Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5 font-mono text-xs">
          <button
            onClick={() => setCurrentStage('unnormalized')}
            className={`p-2.5 rounded-xl border text-center transition ${
              currentStage === 'unnormalized'
                ? 'bg-red-950/60 border-red-500 text-red-200 font-bold shadow-lg shadow-red-950/40'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            0. Broken (Anomalous)
          </button>
          <button
            onClick={() => setCurrentStage('1nf')}
            className={`p-2.5 rounded-xl border text-center transition ${
              currentStage === '1nf'
                ? 'bg-amber-950/60 border-amber-500 text-amber-200 font-bold shadow-lg shadow-amber-950/40'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            1. Apply 1NF (Atomic)
          </button>
          <button
            onClick={() => setCurrentStage('2nf')}
            className={`p-2.5 rounded-xl border text-center transition ${
              currentStage === '2nf'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold shadow-lg shadow-amber-500/20'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            2. Apply 2NF (No Partial)
          </button>
          <button
            onClick={() => setCurrentStage('3nf')}
            className={`p-2.5 rounded-xl border text-center transition ${
              currentStage === '3nf'
                ? 'bg-zinc-800 border-amber-400 text-amber-300 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            3. Apply 3NF (Clean Schema)
          </button>
        </div>
      </div>

      {/* Anomaly demonstrations when unnormalized */}
      {currentStage === 'unnormalized' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveAnomaly('insert')}
            className={`p-4 rounded-xl border text-left transition ${
              activeAnomaly === 'insert' ? 'bg-red-950/70 border-red-500 text-red-200' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-red-400 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Insertion Anomaly</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Cannot insert a new Department without enrolling an artificial dummy student first!
            </p>
          </button>

          <button
            onClick={() => setActiveAnomaly('update')}
            className={`p-4 rounded-xl border text-left transition ${
              activeAnomaly === 'update' ? 'bg-amber-950/70 border-amber-500 text-amber-200' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-amber-400 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Update Anomaly</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Updating CSE HOD requires updating 50,000 student rows; forgetting 1 row causes inconsistency!
            </p>
          </button>

          <button
            onClick={() => setActiveAnomaly('delete')}
            className={`p-4 rounded-xl border text-left transition ${
              activeAnomaly === 'delete' ? 'bg-zinc-900 border-amber-400 text-amber-200' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-amber-400 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Deletion Anomaly</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Deleting student Priya inadvertently wipes out all institutional record of the ECE department!
            </p>
          </button>
        </div>
      )}

      {/* Stage Table Views */}
      {currentStage === 'unnormalized' && (
        <div className="bg-zinc-900 border border-red-900/50 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-3.5 bg-red-950/40 border-b border-red-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
            <span className="text-red-400 font-bold">Unnormalized Broken Table (Violates 1NF, 2NF, 3NF)</span>
            <span className="text-red-300">Non-atomic attribute: courses has comma-separated list!</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">student_id</th>
                  <th className="p-3">name</th>
                  <th className="p-3 text-red-400">courses (NON-ATOMIC)</th>
                  <th className="p-3">dept</th>
                  <th className="p-3 text-amber-400">dept_head (TRANSITIVE)</th>
                  <th className="p-3">dept_budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {unnormalizedData.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-800/40 transition">
                    <td className="p-3 font-bold text-white">{row.student_id}</td>
                    <td className="p-3">{row.name}</td>
                    <td className="p-3 text-red-300 bg-red-950/20">{row.courses}</td>
                    <td className="p-3">{row.dept}</td>
                    <td className="p-3 text-amber-300 bg-amber-950/20">{row.dept_head}</td>
                    <td className="p-3 text-zinc-400">{row.dept_budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentStage === '1nf' && (
        <div className="bg-zinc-900 border border-amber-900/50 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-3.5 bg-amber-950/40 border-b border-amber-900/50 text-xs font-mono text-amber-300">
            <strong>1NF Applied:</strong> Every column is now atomic. Composite Primary Key is (student_id, course_id).
            <span className="block text-zinc-400 text-[11px] mt-0.5">Problem remaining: name depends only on student_id (Partial Dependency!).</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3 text-amber-400 font-bold">student_id (PK part 1)</th>
                  <th className="p-3">name</th>
                  <th className="p-3 text-amber-400 font-bold">course_id (PK part 2)</th>
                  <th className="p-3">course_name</th>
                  <th className="p-3">instructor</th>
                  <th className="p-3">dept</th>
                  <th className="p-3">dept_head</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {data1NF.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-800/40 transition">
                    <td className="p-3 text-amber-300 font-bold">{row.student_id}</td>
                    <td className="p-3 text-white">{row.name}</td>
                    <td className="p-3 text-amber-300 font-bold">{row.course_id}</td>
                    <td className="p-3">{row.course_name}</td>
                    <td className="p-3">{row.instructor}</td>
                    <td className="p-3">{row.dept}</td>
                    <td className="p-3 text-zinc-400">{row.dept_head}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentStage === '2nf' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-zinc-900 border border-amber-500/40 rounded-xl text-xs font-mono text-amber-300">
            <strong>2NF Applied:</strong> Decomposed into 3 tables to eliminate Partial Dependencies!
            <span className="block text-zinc-400 text-[11px] mt-0.5">Remaining issue: in students table, dept_head depends on dept (Transitive Dependency!).</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
              <span className="font-bold text-amber-400 block mb-2">TABLE: students (PK: student_id)</span>
              {table2NF_Students.map(s => (
                <div key={s.student_id} className="py-1 border-b border-zinc-800 text-zinc-300">
                  {s.student_id}: <span className="text-white font-medium">{s.name}</span> ({s.dept})
                </div>
              ))}
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
              <span className="font-bold text-zinc-200 block mb-2">TABLE: courses (PK: course_id)</span>
              {table2NF_Courses.map(c => (
                <div key={c.course_id} className="py-1 border-b border-zinc-800 text-zinc-300">
                  <span className="text-amber-400">{c.course_id}</span>: {c.course_name}
                </div>
              ))}
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
              <span className="font-bold text-amber-300 block mb-2">TABLE: enrollments (Composite PK)</span>
              {table2NF_Enrollments.map((e, idx) => (
                <div key={idx} className="py-1 border-b border-zinc-800 text-zinc-300">
                  Student {e.student_id} &rarr; Course <span className="text-amber-400 font-bold">{e.course_id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStage === '3nf' && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900 border border-amber-500/50 rounded-xl text-xs font-mono text-amber-300">
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>3NF Fully Achieved! All Anomalies Completely Eradicated</span>
            </div>
            Transitive dependency removed. The schema now satisfies 1NF, 2NF, and 3NF/BCNF.
            Inserting a new department without students is now valid. Updating HOD is an O(1) single-row update.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
              <span className="font-bold text-amber-400 block mb-2">TABLE: students (Clean 3NF)</span>
              <table className="w-full text-left">
                <thead className="text-zinc-500 border-b border-zinc-800">
                  <tr><th className="py-1">student_id (PK)</th><th className="py-1">name</th><th className="py-1">dept_id (FK)</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {table3NF_Students.map(s => (
                    <tr key={s.student_id}>
                      <td className="py-1.5 text-zinc-400">{s.student_id}</td>
                      <td className="py-1.5 text-white font-medium">{s.name}</td>
                      <td className="py-1.5 font-bold text-amber-400">{s.dept_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
              <span className="font-bold text-zinc-200 block mb-2">TABLE: departments (Decomposed Entity)</span>
              <table className="w-full text-left">
                <thead className="text-zinc-500 border-b border-zinc-800">
                  <tr><th className="py-1">dept_id (PK)</th><th className="py-1">dept_name</th><th className="py-1">dept_head</th><th className="py-1">budget</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {table3NF_Departments.map(d => (
                    <tr key={d.dept_id}>
                      <td className="py-1.5 font-bold text-amber-400">{d.dept_id}</td>
                      <td className="py-1.5 text-white font-medium">{d.dept_name}</td>
                      <td className="py-1.5 text-zinc-300">{d.dept_head}</td>
                      <td className="py-1.5 text-zinc-400">{d.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
