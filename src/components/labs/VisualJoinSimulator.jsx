import React, { useState } from 'react';
import { GitMerge, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function VisualJoinSimulator() {
  const [joinType, setJoinType] = useState('INNER'); // INNER, LEFT, RIGHT, FULL, CROSS, SELF

  // Table A: Employees
  const tableEmployees = [
    { emp_id: 1, name: 'Vikram', dept_id: 'ENG' },
    { emp_id: 2, name: 'Rohit', dept_id: 'ENG' },
    { emp_id: 3, name: 'Pooja', dept_id: 'MKT' },
    { emp_id: 4, name: 'Devendra', dept_id: 'FIN' },
    { emp_id: 5, name: 'Arun', dept_id: 'HR' } // Dept 'HR' doesn't exist in Table B
  ];

  // Table B: Departments
  const tableDepartments = [
    { dept_id: 'ENG', dept_name: 'Engineering', budget: '$500k' },
    { dept_id: 'MKT', dept_name: 'Marketing', budget: '$250k' },
    { dept_id: 'FIN', dept_name: 'Finance', budget: '$350k' },
    { dept_id: 'OPS', dept_name: 'Operations', budget: '$180k' } // No employees in OPS
  ];

  // Compute surviving rows
  const getJoinedRows = () => {
    const results = [];

    if (joinType === 'INNER') {
      tableEmployees.forEach(e => {
        const d = tableDepartments.find(dep => dep.dept_id === e.dept_id);
        if (d) {
          results.push({
            emp_id: e.emp_id,
            name: e.name,
            emp_dept: e.dept_id,
            dep_dept: d.dept_id,
            dept_name: d.dept_name,
            budget: d.budget,
            status: 'MATCHED'
          });
        }
      });
    } else if (joinType === 'LEFT') {
      tableEmployees.forEach(e => {
        const d = tableDepartments.find(dep => dep.dept_id === e.dept_id);
        results.push({
          emp_id: e.emp_id,
          name: e.name,
          emp_dept: e.dept_id,
          dep_dept: d ? d.dept_id : 'NULL',
          dept_name: d ? d.dept_name : 'NULL',
          budget: d ? d.budget : 'NULL',
          status: d ? 'MATCHED' : 'LEFT_SURVIVOR (NULL PADDED)'
        });
      });
    } else if (joinType === 'RIGHT') {
      tableDepartments.forEach(d => {
        const matchedEmps = tableEmployees.filter(e => e.dept_id === d.dept_id);
        if (matchedEmps.length > 0) {
          matchedEmps.forEach(e => {
            results.push({
              emp_id: e.emp_id,
              name: e.name,
              emp_dept: e.dept_id,
              dep_dept: d.dept_id,
              dept_name: d.dept_name,
              budget: d.budget,
              status: 'MATCHED'
            });
          });
        } else {
          results.push({
            emp_id: 'NULL',
            name: 'NULL',
            emp_dept: 'NULL',
            dep_dept: d.dept_id,
            dept_name: d.dept_name,
            budget: d.budget,
            status: 'RIGHT_SURVIVOR (NULL PADDED)'
          });
        }
      });
    } else if (joinType === 'FULL') {
      // All left rows
      const matchedDeptIds = new Set();
      tableEmployees.forEach(e => {
        const d = tableDepartments.find(dep => dep.dept_id === e.dept_id);
        if (d) matchedDeptIds.add(d.dept_id);
        results.push({
          emp_id: e.emp_id,
          name: e.name,
          emp_dept: e.dept_id,
          dep_dept: d ? d.dept_id : 'NULL',
          dept_name: d ? d.dept_name : 'NULL',
          budget: d ? d.budget : 'NULL',
          status: d ? 'MATCHED' : 'LEFT_ORPHAN'
        });
      });
      // Remaining right rows
      tableDepartments.forEach(d => {
        if (!matchedDeptIds.has(d.dept_id)) {
          results.push({
            emp_id: 'NULL',
            name: 'NULL',
            emp_dept: 'NULL',
            dep_dept: d.dept_id,
            dept_name: d.dept_name,
            budget: d.budget,
            status: 'RIGHT_ORPHAN'
          });
        }
      });
    } else if (joinType === 'CROSS') {
      tableEmployees.slice(0, 3).forEach(e => {
        tableDepartments.slice(0, 3).forEach(d => {
          results.push({
            emp_id: e.emp_id,
            name: e.name,
            emp_dept: e.dept_id,
            dep_dept: d.dept_id,
            dept_name: d.dept_name,
            budget: d.budget,
            status: 'CARTESIAN_PRODUCT'
          });
        });
      });
    } else if (joinType === 'SELF') {
      // Employees joined with managers
      results.push(
        { emp_id: 2, name: 'Rohit', emp_dept: 'Manager: Vikram (ID 1)', dep_dept: 'N/A', dept_name: 'Engineering', budget: '$500k', status: 'REPORTING' },
        { emp_id: 3, name: 'Pooja', emp_dept: 'Manager: Vikram (ID 1)', dep_dept: 'N/A', dept_name: 'Product', budget: '$450k', status: 'REPORTING' }
      );
    }

    return results;
  };

  const rows = getJoinedRows();

  const getSqlString = () => {
    switch (joinType) {
      case 'INNER':
        return `SELECT e.name, e.dept_id, d.dept_name, d.budget\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.dept_id;`;
      case 'LEFT':
        return `SELECT e.name, e.dept_id, d.dept_name, d.budget\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.dept_id;`;
      case 'RIGHT':
        return `SELECT e.name, e.dept_id, d.dept_name, d.budget\nFROM employees e\nRIGHT JOIN departments d ON e.dept_id = d.dept_id;`;
      case 'FULL':
        return `SELECT e.name, e.dept_id, d.dept_name, d.budget\nFROM employees e\nFULL OUTER JOIN departments d ON e.dept_id = d.dept_id;`;
      case 'CROSS':
        return `SELECT e.name, d.dept_name\nFROM employees e\nCROSS JOIN departments d;`;
      case 'SELF':
        return `SELECT e.name AS employee, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.emp_id;`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <GitMerge className="w-5 h-5 text-amber-400" />
          <span>Level 6 Signature: Visual Join Simulator</span>
        </div>
        <p className="text-zinc-300 text-sm">
          Select two tables below and visually witness <strong>which rows survive the join</strong> and which columns are padded with NULL!
        </p>

        {/* Join type selector tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'SELF'].map(type => (
            <button
              key={type}
              onClick={() => setJoinType(type)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition font-semibold ${
                joinType === type
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold shadow-md shadow-amber-500/20'
                  : 'bg-black text-zinc-300 hover:text-white border border-zinc-800'
              }`}
            >
              {type} JOIN
            </button>
          ))}
        </div>
      </div>

      {/* Source Tables Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Table A */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400">TABLE A: employees (Left Table)</span>
            <span className="text-[10px] bg-black text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">5 Rows</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="p-1.5">emp_id</th>
                  <th className="p-1.5">name</th>
                  <th className="p-1.5">dept_id</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {tableEmployees.map(e => (
                  <tr key={e.emp_id} className={e.dept_id === 'HR' ? 'bg-amber-950/30 text-amber-300' : 'text-zinc-300'}>
                    <td className="p-1.5">{e.emp_id}</td>
                    <td className="p-1.5">{e.name}</td>
                    <td className="p-1.5 font-bold">{e.dept_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-400 mt-2 italic">
            * Note: Employee Arun has dept_id 'HR' which has NO match in Table B.
          </p>
        </div>

        {/* Table B */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-zinc-200">TABLE B: departments (Right Table)</span>
            <span className="text-[10px] bg-black text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">4 Rows</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="p-1.5">dept_id</th>
                  <th className="p-1.5">dept_name</th>
                  <th className="p-1.5">budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {tableDepartments.map(d => (
                  <tr key={d.dept_id} className={d.dept_id === 'OPS' ? 'bg-amber-950/30 text-amber-300' : 'text-zinc-300'}>
                    <td className="p-1.5 font-bold">{d.dept_id}</td>
                    <td className="p-1.5">{d.dept_name}</td>
                    <td className="p-1.5">{d.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-400 mt-2 italic">
            * Note: Department 'OPS' has NO matching employees in Table A.
          </p>
        </div>
      </div>

      {/* Generated SQL Banner */}
      <div className="bg-black border border-amber-500/40 rounded-xl p-4 shadow-lg shadow-amber-500/10">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Synthesized SQL Statement for {joinType} JOIN</span>
        </div>
        <pre className="text-xs font-mono text-amber-200 whitespace-pre-wrap">
          {getSqlString()}
        </pre>
      </div>

      {/* Surviving Rows Output Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-3 bg-black border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
          <span className="text-white font-bold">
            SURVIVING ROWS: {rows.length} rows returned
          </span>
          <span className="text-amber-400">Join Predicate: A.dept_id = B.dept_id</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
              <tr>
                <th className="p-3">emp_id</th>
                <th className="p-3">name</th>
                <th className="p-3">dept_id</th>
                <th className="p-3">dept_name</th>
                <th className="p-3">budget</th>
                <th className="p-3">Survival Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  className={`transition ${
                    r.status.includes('NULL')
                      ? 'bg-amber-950/20 text-amber-200 hover:bg-amber-950/40'
                      : 'hover:bg-zinc-900/60 text-zinc-200'
                  }`}
                >
                  <td className="p-3">{r.emp_id}</td>
                  <td className="p-3 font-semibold">{r.name}</td>
                  <td className="p-3">{r.emp_dept || r.dep_dept}</td>
                  <td className="p-3">{r.dept_name}</td>
                  <td className="p-3">{r.budget}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === 'MATCHED'
                          ? 'bg-zinc-900 text-amber-300 border border-amber-500/40'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
