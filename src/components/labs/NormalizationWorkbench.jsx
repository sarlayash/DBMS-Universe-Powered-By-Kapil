import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  GitBranch,
  Table,
  Check,
  Flame,
  Binary,
  Split
} from 'lucide-react';

export default function NormalizationWorkbench() {
  const [currentStage, setCurrentStage] = useState('0nf'); // '0nf', '1nf', '2nf', '3nf', 'bcnf', '4nf', '5nf'
  const [activeAnomaly, setActiveAnomaly] = useState(null);
  const [activeTab, setActiveTab] = useState('visualizer'); // 'visualizer' | 'matrix' | 'cheatsheet'

  // Stage 0: Unnormalized Anomalous Data
  const data0NF = [
    { student_id: 101, name: 'Aarav', courses: 'CS301, CS302', dept: 'CSE', dept_head: 'Dr. Kumar', dept_budget: '$500k' },
    { student_id: 102, name: 'Priya', courses: 'EC201', dept: 'ECE', dept_head: 'Dr. Sen', dept_budget: '$380k' },
    { student_id: 103, name: 'Rohan', courses: 'CS301', dept: 'CSE', dept_head: 'Dr. Kumar', dept_budget: '$500k' }
  ];

  // Stage 1: 1NF Data (Atomic values, repeating groups eliminated)
  const data1NF = [
    { student_id: 101, name: 'Aarav', course_id: 'CS301', course_name: 'DBMS', instructor: 'Kapil', dept: 'CSE', dept_head: 'Dr. Kumar' },
    { student_id: 101, name: 'Aarav', course_id: 'CS302', course_name: 'OS', instructor: 'Prof. Rao', dept: 'CSE', dept_head: 'Dr. Kumar' },
    { student_id: 102, name: 'Priya', course_id: 'EC201', course_name: 'DSP', instructor: 'Dr. Sen', dept: 'ECE', dept_head: 'Dr. Sen' },
    { student_id: 103, name: 'Rohan', course_id: 'CS301', course_name: 'DBMS', instructor: 'Kapil', dept: 'CSE', dept_head: 'Dr. Kumar' }
  ];

  // Stage 2: 2NF Tables (Partial dependencies on composite PK (student_id, course_id) removed)
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

  // Stage 3: 3NF Tables (Transitive dependency student_id -> dept -> dept_head removed)
  const table3NF_Students = [
    { student_id: 101, name: 'Aarav', dept_id: 'CSE' },
    { student_id: 102, name: 'Priya', dept_id: 'ECE' },
    { student_id: 103, name: 'Rohan', dept_id: 'CSE' }
  ];
  const table3NF_Departments = [
    { dept_id: 'CSE', dept_name: 'Computer Science', dept_head: 'Dr. Kumar', budget: '$500k' },
    { dept_id: 'ECE', dept_name: 'Electronics', dept_head: 'Dr. Sen', budget: '$380k' }
  ];

  // Stage 4: BCNF Example (Student_Advisor_Subject where advisor -> subject violates BCNF)
  const dataBCNF_Broken = [
    { student_id: 101, advisor: 'Prof. Sharma', subject: 'Database' },
    { student_id: 102, advisor: 'Prof. Verma', subject: 'Database' },
    { student_id: 101, advisor: 'Prof. Gupta', subject: 'Networks' },
    { student_id: 103, advisor: 'Prof. Sharma', subject: 'Database' }
  ];
  const tableBCNF_AdvisorSubject = [
    { advisor: 'Prof. Sharma', subject: 'Database' },
    { advisor: 'Prof. Verma', subject: 'Database' },
    { advisor: 'Prof. Gupta', subject: 'Networks' }
  ];
  const tableBCNF_StudentAdvisor = [
    { student_id: 101, advisor: 'Prof. Sharma' },
    { student_id: 102, advisor: 'Prof. Verma' },
    { student_id: 101, advisor: 'Prof. Gupta' },
    { student_id: 103, advisor: 'Prof. Sharma' }
  ];

  // Stage 5: 4NF Example (Multi-Valued Dependencies: emp_id ->-> skill and emp_id ->-> hobby)
  const data4NF_Broken = [
    { emp_id: 101, skill: 'Python', hobby: 'Chess' },
    { emp_id: 101, skill: 'Python', hobby: 'Hiking' },
    { emp_id: 101, skill: 'SQL', hobby: 'Chess' },
    { emp_id: 101, skill: 'SQL', hobby: 'Hiking' }
  ];
  const table4NF_EmpSkills = [
    { emp_id: 101, skill: 'Python' },
    { emp_id: 101, skill: 'SQL' }
  ];
  const table4NF_EmpHobbies = [
    { emp_id: 101, hobby: 'Chess' },
    { emp_id: 101, hobby: 'Hiking' }
  ];

  // Stage 6: 5NF Example (Project-Join Normal Form: Agent_Company_Product cyclic join dependency)
  const data5NF_Broken = [
    { agent: 'Rajesh', company: 'TCS', product: 'Cloud' },
    { agent: 'Rajesh', company: 'Infosys', product: 'AI' },
    { agent: 'Pooja', company: 'TCS', product: 'Cloud' }
  ];
  const table5NF_AgentCompany = [
    { agent: 'Rajesh', company: 'TCS' },
    { agent: 'Rajesh', company: 'Infosys' },
    { agent: 'Pooja', company: 'TCS' }
  ];
  const table5NF_CompanyProduct = [
    { company: 'TCS', product: 'Cloud' },
    { company: 'Infosys', product: 'AI' }
  ];
  const table5NF_AgentProduct = [
    { agent: 'Rajesh', product: 'Cloud' },
    { agent: 'Rajesh', product: 'AI' },
    { agent: 'Pooja', product: 'Cloud' }
  ];

  // Summary Matrix Data
  const NORMALIZATION_MATRIX = [
    {
      form: '1NF',
      name: 'First Normal Form',
      rule: 'All attributes are atomic; no repeating groups or arrays.',
      eliminates: 'Multi-valued attributes, comma-separated lists.',
      tradeoff: 'Minimal overhead, fundamental requirement for all relational DBMS.'
    },
    {
      form: '2NF',
      name: 'Second Normal Form',
      rule: 'In 1NF + NO Partial Functional Dependencies on composite keys.',
      eliminates: 'Partial dependencies (non-prime attributes depending on part of candidate key).',
      tradeoff: 'Requires decomposing composite tables into separate entity tables.'
    },
    {
      form: '3NF',
      name: 'Third Normal Form',
      rule: 'In 2NF + NO Transitive Dependencies (X -> Y -> Z).',
      eliminates: 'Transitive dependencies across non-key columns.',
      tradeoff: 'Gold standard for high-throughput OLTP systems with minimal write locks.'
    },
    {
      form: 'BCNF',
      name: 'Boyce-Codd Normal Form',
      rule: 'For every functional dependency X -> Y, X must be a Super Key.',
      eliminates: 'Overlapping candidate key anomalies where a non-prime attribute determines a prime attribute.',
      tradeoff: 'May occasionally fail to preserve all functional dependencies across separate relations.'
    },
    {
      form: '4NF',
      name: 'Fourth Normal Form',
      rule: 'In BCNF + NO Multi-Valued Dependencies (MVDs: X ->-> Y).',
      eliminates: 'Cartesian tuple explosion caused by independent multivalued attributes.',
      tradeoff: 'Splits independent facts into 2 or more binary tables.'
    },
    {
      form: '5NF',
      name: 'Fifth Normal Form (PJNF)',
      rule: 'In 4NF + NO Join Dependencies (JD) that cannot be reconstructed via candidate keys.',
      eliminates: 'Cyclic ternary anomalies where a 3-way table can be reconstructed losslessly only from 3 binary projections.',
      tradeoff: 'Rarely applied manually; primarily handled via schema design discipline.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Comprehensive Normalization Visualization Lab (1NF through 5NF)</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-3xl">
              From Edgar F. Codd's foundations to Boyce-Codd, 4NF, and 5NF Project-Join Normal Form.
              Step through every stage below to visualize how functional, multi-valued, and join dependencies decompose into bulletproof relational schemas!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCurrentStage('0nf'); setActiveAnomaly(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              Reset to 0NF
            </button>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 mt-5 border-t border-zinc-800 pt-4">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              activeTab === 'visualizer'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Step-by-Step Stage Visualizer
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All-Types Comparison Matrix
          </button>
        </div>

        {/* Normalization Stepper Pipeline (0NF through 5NF) */}
        {activeTab === 'visualizer' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-4 font-mono text-xs">
            {[
              { id: '0nf', label: '0NF: Broken Table', badge: 'Anomalies' },
              { id: '1nf', label: '1NF: Atomic', badge: 'No Arrays' },
              { id: '2nf', label: '2NF: No Partial', badge: 'Full PK' },
              { id: '3nf', label: '3NF: No Transitive', badge: 'No Chains' },
              { id: 'bcnf', label: 'BCNF: Strict 3NF', badge: 'Super Keys' },
              { id: '4nf', label: '4NF: No MVDs', badge: 'Multi-Valued' },
              { id: '5nf', label: '5NF: No JDs', badge: 'Project-Join' }
            ].map(stage => (
              <button
                key={stage.id}
                onClick={() => { setCurrentStage(stage.id); setActiveAnomaly(null); }}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                  currentStage === stage.id
                    ? stage.id === '0nf'
                      ? 'bg-red-950/70 border-red-500 text-red-200 font-bold shadow-lg shadow-red-950/40'
                      : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span className="font-bold text-xs">{stage.label.split(':')[0]}</span>
                <span className="text-[10px] opacity-80">{stage.label.split(':')[1]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MATRIX VIEW */}
      {activeTab === 'matrix' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 text-xs font-mono font-bold text-zinc-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Table className="w-4 h-4 text-amber-400" />
              <span>Codd's Complete Normalization Taxonomy (1NF through 5NF)</span>
            </span>
            <span className="text-amber-400 text-[11px]">
              "The key, the whole key, and nothing but the key, so help me Codd."
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3.5">Normal Form</th>
                  <th className="p-3.5">Formal Mathematical Rule</th>
                  <th className="p-3.5">Lethal Anomaly Eliminated</th>
                  <th className="p-3.5">Real-World Engineering Tradeoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {NORMALIZATION_MATRIX.map(row => (
                  <tr key={row.form} className="hover:bg-zinc-800/40 transition">
                    <td className="p-3.5 font-bold text-amber-400">
                      <span className="bg-zinc-950 px-2 py-1 rounded-lg border border-amber-500/40">
                        {row.form}
                      </span>
                    </td>
                    <td className="p-3.5 text-white font-medium max-w-xs">{row.rule}</td>
                    <td className="p-3.5 text-zinc-300 max-w-xs">{row.eliminates}</td>
                    <td className="p-3.5 text-zinc-400 text-[11px] max-w-xs">{row.tradeoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP-BY-STEP VISUALIZER VIEW */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          {/* STAGE 0: UNNORMALIZED ANOMALIES */}
          {currentStage === '0nf' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveAnomaly('insert')}
                  className={`p-4 rounded-xl border text-left transition ${
                    activeAnomaly === 'insert' ? 'bg-red-950/70 border-red-500 text-red-200' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-red-400 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>1. Insertion Anomaly</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Cannot add a new department (e.g. AI & Robotics) without enrolling an artificial dummy student first!
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
                    <span>2. Update Anomaly</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Updating CSE HOD requires updating 50,000 student rows; missing 1 creates corrupted, conflicting records!
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
                    <span>3. Deletion Anomaly</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Deleting student Priya inadvertently wipes out all institutional record of the ECE department!
                  </p>
                </button>
              </div>

              <div className="bg-zinc-900 border border-red-900/50 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-3.5 bg-red-950/40 border-b border-red-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <span className="text-red-400 font-bold">Unnormalized Master Table (Violates 1NF, 2NF, 3NF)</span>
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
                      {data0NF.map((row, i) => (
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
            </div>
          )}

          {/* STAGE 1: 1NF (ATOMICITY) */}
          {currentStage === '1nf' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-amber-500/40 rounded-2xl text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>1NF Transformation: Atomicity Enforced</span>
                </div>
                <p>
                  Every attribute value is now atomic. The repeating group in <code>courses</code> has been unnested into discrete tuples.
                  Composite Candidate Key is <strong>(student_id, course_id)</strong>.
                </p>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-amber-300 text-[11px]">
                  ⚠️ <strong>Remaining 2NF Violation:</strong> <code>name</code> and <code>dept</code> depend ONLY on <code>student_id</code> (Partial Functional Dependency on composite key!).
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                      <tr>
                        <th className="p-3 text-amber-400 font-bold">student_id (PK Part 1)</th>
                        <th className="p-3">name</th>
                        <th className="p-3 text-amber-400 font-bold">course_id (PK Part 2)</th>
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
            </div>
          )}

          {/* STAGE 2: 2NF (NO PARTIAL DEPENDENCIES) */}
          {currentStage === '2nf' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-amber-500/40 rounded-2xl text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <Split className="w-4 h-4 text-amber-400" />
                  <span>2NF Transformation: Decomposed to Eliminate Partial Dependencies</span>
                </div>
                <p>
                  Non-prime attributes must depend on the <strong>whole</strong> primary key.
                  Table decomposed into 3 clean relations: <code>students</code>, <code>courses</code>, and <code>enrollments</code>.
                </p>
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-amber-300 text-[11px]">
                  ⚠️ <strong>Remaining 3NF Violation:</strong> Inside <code>students</code>, <code>dept_head</code> depends on <code>dept</code>, which depends on <code>student_id</code> (Transitive Dependency!).
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-amber-400 block mb-2">TABLE: students (PK: student_id)</span>
                  {table2NF_Students.map(s => (
                    <div key={s.student_id} className="py-1 border-b border-zinc-800 text-zinc-300">
                      {s.student_id}: <span className="text-white font-medium">{s.name}</span> ({s.dept})
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-zinc-200 block mb-2">TABLE: courses (PK: course_id)</span>
                  {table2NF_Courses.map(c => (
                    <div key={c.course_id} className="py-1 border-b border-zinc-800 text-zinc-300">
                      <span className="text-amber-400">{c.course_id}</span>: {c.course_name} ({c.instructor})
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
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

          {/* STAGE 3: 3NF (NO TRANSITIVE DEPENDENCIES) */}
          {currentStage === '3nf' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-amber-500/50 rounded-2xl text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>3NF Transformation: Transitive Dependencies Removed</span>
                </div>
                <p>
                  No non-prime attribute depends transitively on the candidate key. Department entity has been decoupled into its own relation.
                  Updating a department's budget or head is now an O(1) single-row update with zero redundancy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-amber-400 block mb-2">TABLE: students (3NF Compliant)</span>
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

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-zinc-200 block mb-2">TABLE: departments (Decomposed Relation)</span>
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

          {/* STAGE 4: BCNF (BOYCE-CODD NORMAL FORM) */}
          {currentStage === 'bcnf' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-amber-500/50 rounded-2xl text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <GitBranch className="w-4 h-4 text-amber-400" />
                  <span>BCNF (Boyce-Codd Normal Form): Strict 3NF</span>
                </div>
                <p>
                  <strong>Rule:</strong> In every non-trivial functional dependency $X \to Y$, $X$ MUST be a Super Key!
                </p>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <div className="text-amber-400 font-bold">Why 3NF can still fail:</div>
                  <p className="text-zinc-300 text-[11px]">
                    Consider table <code>Student_Advisor(student_id, advisor, subject)</code>.
                    An advisor teaches only 1 subject (<code>advisor &rarr; subject</code>).
                    Candidate Keys are <code>(student_id, subject)</code> and <code>(student_id, advisor)</code>.
                    Because <code>subject</code> is part of a candidate key (prime attribute), 3NF allows <code>advisor &rarr; subject</code>!
                    However, <code>advisor</code> is NOT a super key, causing an insertion anomaly (cannot add an advisor who doesn't have students yet!).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-amber-400 block mb-2">TABLE 1: Advisor_Subject (PK: advisor)</span>
                  <table className="w-full text-left">
                    <thead className="text-zinc-500 border-b border-zinc-800">
                      <tr><th className="py-1">advisor (PK)</th><th className="py-1">subject</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-300">
                      {tableBCNF_AdvisorSubject.map((r, i) => (
                        <tr key={i}>
                          <td className="py-1.5 font-bold text-white">{r.advisor}</td>
                          <td className="py-1.5 text-amber-400">{r.subject}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-zinc-200 block mb-2">TABLE 2: Student_Advisor (Composite PK)</span>
                  <table className="w-full text-left">
                    <thead className="text-zinc-500 border-b border-zinc-800">
                      <tr><th className="py-1">student_id</th><th className="py-1">advisor (FK)</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-300">
                      {tableBCNF_StudentAdvisor.map((r, i) => (
                        <tr key={i}>
                          <td className="py-1.5 text-zinc-400">{r.student_id}</td>
                          <td className="py-1.5 text-amber-400 font-bold">{r.advisor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 5: 4NF (MULTI-VALUED DEPENDENCIES) */}
          {currentStage === '4nf' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-amber-500/50 rounded-2xl text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>4NF (Fourth Normal Form): Eliminating Multi-Valued Dependencies (MVDs)</span>
                </div>
                <p>
                  <strong>Rule:</strong> In 4NF, no table contains two or more independent multi-valued facts about an entity ($X \twoheadrightarrow Y \mid Z$).
                </p>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <div className="text-amber-400 font-bold">The Cartesian Explosion Hazard:</div>
                  <p className="text-zinc-300 text-[11px]">
                    If an employee has 3 programming skills and 4 hobbies, keeping them in one table produces $3 \times 4 = 12$ rows!
                    Adding 1 hobby requires inserting 3 new rows. 4NF decomposes independent facts into 2 distinct binary tables.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-amber-400 block mb-2">TABLE 1: Emp_Skills (emp_id &rarr;&rarr; skill)</span>
                  <table className="w-full text-left">
                    <thead className="text-zinc-500 border-b border-zinc-800">
                      <tr><th className="py-1">emp_id</th><th className="py-1">skill</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-300">
                      {table4NF_EmpSkills.map((r, i) => (
                        <tr key={i}>
                          <td className="py-1.5 text-zinc-400">{r.emp_id}</td>
                          <td className="py-1.5 text-amber-400 font-bold">{r.skill}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-zinc-200 block mb-2">TABLE 2: Emp_Hobbies (emp_id &rarr;&rarr; hobby)</span>
                  <table className="w-full text-left">
                    <thead className="text-zinc-500 border-b border-zinc-800">
                      <tr><th className="py-1">emp_id</th><th className="py-1">hobby</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-300">
                      {table4NF_EmpHobbies.map((r, i) => (
                        <tr key={i}>
                          <td className="py-1.5 text-zinc-400">{r.emp_id}</td>
                          <td className="py-1.5 text-white font-medium">{r.hobby}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 6: 5NF (PROJECT-JOIN NORMAL FORM) */}
          {currentStage === '5nf' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-amber-500/50 rounded-2xl text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                  <Binary className="w-4 h-4 text-amber-400" />
                  <span>5NF (Fifth Normal Form / Project-Join Normal Form - PJNF)</span>
                </div>
                <p>
                  <strong>Rule:</strong> A table is in 5NF if every non-trivial Join Dependency (JD) is implied by candidate keys.
                  It addresses 3-way ternary relations that cannot be split into 2 tables without spurious tuples, but CAN be decomposed losslessly into 3 binary projections!
                </p>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <div className="text-amber-400 font-bold">The Cyclic Rule:</div>
                  <p className="text-zinc-300 text-[11px]">
                    If Agent Rajesh represents TCS, TCS sells Cloud, and Rajesh is certified for Cloud &mdash; then Rajesh MUST sell Cloud for TCS.
                    Decomposing into 3 projection tables ($R_1, R_2, R_3$) ensures zero anomalous spurious joins!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-amber-400 block mb-2">Projection R1: Agent_Company</span>
                  {table5NF_AgentCompany.map((r, i) => (
                    <div key={i} className="py-1 border-b border-zinc-800 text-zinc-300">
                      <span className="text-white">{r.agent}</span> &harr; {r.company}
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-zinc-200 block mb-2">Projection R2: Company_Product</span>
                  {table5NF_CompanyProduct.map((r, i) => (
                    <div key={i} className="py-1 border-b border-zinc-800 text-zinc-300">
                      <span className="text-white">{r.company}</span> &harr; {r.product}
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
                  <span className="font-bold text-amber-300 block mb-2">Projection R3: Agent_Product</span>
                  {table5NF_AgentProduct.map((r, i) => (
                    <div key={i} className="py-1 border-b border-zinc-800 text-zinc-300">
                      <span className="text-white">{r.agent}</span> &harr; {r.product}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
