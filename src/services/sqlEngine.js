// Browser-Native In-Memory SQL Execution Engine for DBMS Zero-To-Infinity
// Powered By Kapil | SarlaYash Mission Productions
// 100% Offline, Zero Server Dependency, Full Relational Engine

export class BrowserSqlEngine {
  constructor() {
    this.tables = {};
    this.history = [];
    this.transactionState = null; // null or snapshot of tables
    this.initDefaultDatabase();
  }

  // Initialize with rich industry datasets
  initDefaultDatabase() {
    this.tables = {
      students: {
        columns: ['id', 'name', 'branch', 'semester', 'marks', 'cgpa', 'city'],
        rows: [
          [101, 'Aarav Sharma', 'CSE', 6, 88, 8.9, 'Bangalore'],
          [102, 'Priya Patel', 'ECE', 4, 94, 9.5, 'Pune'],
          [103, 'Rohan Verma', 'CSE', 6, 76, 7.8, 'Delhi'],
          [104, 'Ananya Iyer', 'IT', 8, 91, 9.2, 'Chennai'],
          [105, 'Vikram Singh', 'MECH', 4, 65, 6.9, 'Jaipur'],
          [106, 'Neha Gupta', 'CSE', 8, 82, 8.4, 'Hyderabad'],
          [107, 'Kavya Nair', 'ECE', 6, 89, 9.0, 'Kochi'],
          [108, 'Kabir Mehta', 'IT', 4, 73, 7.5, 'Mumbai']
        ]
      },
      departments: {
        columns: ['dept_id', 'dept_name', 'hod', 'budget', 'block'],
        rows: [
          ['CSE', 'Computer Science & Engineering', 'Dr. Ramesh Kumar', 5000000, 'Block-A'],
          ['ECE', 'Electronics & Comm. Engineering', 'Dr. Sunita Sen', 3800000, 'Block-B'],
          ['IT', 'Information Technology', 'Dr. Alok Verma', 3200000, 'Block-A'],
          ['MECH', 'Mechanical Engineering', 'Dr. Prakash Rao', 4500000, 'Block-C'],
          ['CIVIL', 'Civil Engineering', 'Dr. Meera Joshi', 2900000, 'Block-D']
        ]
      },
      professors: {
        columns: ['prof_id', 'name', 'dept_id', 'salary', 'experience_years'],
        rows: [
          [201, 'Dr. Ramesh Kumar', 'CSE', 125000, 18],
          [202, 'Prof. Shalini Roy', 'CSE', 98000, 10],
          [203, 'Dr. Sunita Sen', 'ECE', 115000, 15],
          [204, 'Prof. Arvind Menon', 'ECE', 88000, 8],
          [205, 'Dr. Alok Verma', 'IT', 105000, 12],
          [206, 'Dr. Prakash Rao', 'MECH', 120000, 16],
          [207, 'Prof. Tanvi Joshi', 'CSE', 75000, 5]
        ]
      },
      courses: {
        columns: ['course_id', 'title', 'credits', 'dept_id'],
        rows: [
          ['CS301', 'Database Management Systems', 4, 'CSE'],
          ['CS302', 'Operating Systems', 4, 'CSE'],
          ['EC201', 'Digital Signal Processing', 4, 'ECE'],
          ['IT401', 'Cloud Computing & Distributed DB', 3, 'IT'],
          ['CS405', 'Advanced Algorithms', 3, 'CSE'],
          ['ME202', 'Thermodynamics', 4, 'MECH']
        ]
      },
      enrollments: {
        columns: ['enroll_id', 'student_id', 'course_id', 'grade', 'score'],
        rows: [
          [1, 101, 'CS301', 'A', 92],
          [2, 101, 'CS302', 'B', 81],
          [3, 102, 'EC201', 'A+', 96],
          [4, 103, 'CS301', 'C', 70],
          [5, 104, 'IT401', 'A', 90],
          [6, 106, 'CS301', 'B+', 85],
          [7, 106, 'CS405', 'A', 89],
          [8, 107, 'EC201', 'A', 91]
        ]
      },
      employees: {
        columns: ['emp_id', 'name', 'department', 'salary', 'manager_id', 'hire_year'],
        rows: [
          [1, 'Vikram Shah', 'Engineering', 160000, null, 2018],
          [2, 'Rohit Roy', 'Engineering', 135000, 1, 2020],
          [3, 'Simran Gill', 'Engineering', 110000, 2, 2022],
          [4, 'Pooja Hegde', 'Product', 145000, 1, 2019],
          [5, 'Amit Patel', 'Product', 95000, 4, 2023],
          [6, 'Suresh Reddy', 'Marketing', 105000, 1, 2021],
          [7, 'Karan Johar', 'Marketing', 85000, 6, 2024],
          [8, 'Maya Saxena', 'Finance', 125000, 1, 2020],
          [9, 'Devendra Jha', 'Finance', 92000, 8, 2023]
        ]
      },
      orders: {
        columns: ['order_id', 'customer_name', 'product_name', 'amount', 'status', 'city'],
        rows: [
          [501, 'Rahul Roy', 'MacBook Air M3', 114900, 'DELIVERED', 'Bangalore'],
          [502, 'Priya Sen', 'Mechanical Keyboard', 4500, 'DELIVERED', 'Mumbai'],
          [503, 'Aman Gupta', 'Noise-Cancelling Headphones', 18900, 'PROCESSING', 'Delhi'],
          [504, 'Sneha Rao', '4K Gaming Monitor', 28500, 'DELIVERED', 'Hyderabad'],
          [505, 'Karan Kapoor', 'Ergonomic Desk Chair', 15000, 'CANCELLED', 'Pune'],
          [506, 'Diya Sharma', 'USB-C Docking Station', 6200, 'DELIVERED', 'Chennai']
        ]
      },
      accounts: {
        columns: ['acc_no', 'customer_name', 'balance', 'status'],
        rows: [
          ['ACC1001', 'Alice Johnson', 50000, 'ACTIVE'],
          ['ACC1002', 'Bob Smith', 25000, 'ACTIVE'],
          ['ACC1003', 'Charlie Brown', 12000, 'ACTIVE'],
          ['ACC1004', 'David Miller', 4500, 'FROZEN']
        ]
      }
    };
  }

  // Get table schema summary
  getSchema() {
    const schema = {};
    for (const [tableName, table] of Object.entries(this.tables)) {
      schema[tableName] = {
        columns: [...table.columns],
        rowCount: table.rows.length
      };
    }
    return schema;
  }

  // Execute SQL statement
  execute(queryStr) {
    const startTime = performance.now();
    const trimmed = queryStr.trim();
    if (!trimmed) {
      return { success: false, error: 'Query cannot be empty.' };
    }

    // Split multiple queries if separated by semicolon
    const cleanQuery = trimmed.replace(/;+$/, '').trim();
    const firstWord = cleanQuery.split(/\s+/)[0].toUpperCase();

    try {
      this.history.push({ query: cleanQuery, timestamp: new Date().toISOString() });

      // Transaction commands
      if (firstWord === 'BEGIN' || firstWord === 'START') {
        this.transactionState = JSON.parse(JSON.stringify(this.tables));
        return {
          success: true,
          type: 'TRANSACTION',
          message: 'Transaction started. A snapshot of database state was locked.',
          executionTimeMs: (performance.now() - startTime).toFixed(2),
          columns: ['status'],
          rows: [['TRANSACTION ACTIVE']]
        };
      }

      if (firstWord === 'COMMIT') {
        if (!this.transactionState) {
          return { success: false, error: 'No active transaction to commit.' };
        }
        this.transactionState = null;
        return {
          success: true,
          type: 'TRANSACTION',
          message: 'COMMIT successful. All changes permanently saved.',
          executionTimeMs: (performance.now() - startTime).toFixed(2),
          columns: ['status'],
          rows: [['TRANSACTION COMMITTED']]
        };
      }

      if (firstWord === 'ROLLBACK') {
        if (!this.transactionState) {
          return { success: false, error: 'No active transaction to rollback.' };
        }
        this.tables = JSON.parse(JSON.stringify(this.transactionState));
        this.transactionState = null;
        return {
          success: true,
          type: 'TRANSACTION',
          message: 'ROLLBACK successful. Database reverted to transaction start state.',
          executionTimeMs: (performance.now() - startTime).toFixed(2),
          columns: ['status'],
          rows: [['TRANSACTION ROLLED BACK']]
        };
      }

      // EXPLAIN
      if (firstWord === 'EXPLAIN') {
        const actualQuery = cleanQuery.substring(7).trim();
        return this.explainQuery(actualQuery, startTime);
      }

      // DDL: CREATE TABLE
      if (firstWord === 'CREATE') {
        return this.handleCreate(cleanQuery, startTime);
      }

      // DDL: DROP TABLE
      if (firstWord === 'DROP') {
        return this.handleDrop(cleanQuery, startTime);
      }

      // DDL: TRUNCATE TABLE
      if (firstWord === 'TRUNCATE') {
        return this.handleTruncate(cleanQuery, startTime);
      }

      // DDL: ALTER TABLE
      if (firstWord === 'ALTER') {
        return this.handleAlter(cleanQuery, startTime);
      }

      // DML: INSERT
      if (firstWord === 'INSERT') {
        return this.handleInsert(cleanQuery, startTime);
      }

      // DML: UPDATE
      if (firstWord === 'UPDATE') {
        return this.handleUpdate(cleanQuery, startTime);
      }

      // DML: DELETE
      if (firstWord === 'DELETE') {
        return this.handleDelete(cleanQuery, startTime);
      }

      // DQL: SELECT
      if (firstWord === 'SELECT') {
        return this.handleSelect(cleanQuery, startTime);
      }

      // DCL: GRANT / REVOKE
      if (firstWord === 'GRANT' || firstWord === 'REVOKE') {
        return {
          success: true,
          type: 'DCL',
          message: `Privilege command '${cleanQuery}' executed successfully (RBAC permission applied).`,
          columns: ['Operation', 'Status'],
          rows: [[firstWord, 'SUCCESS']],
          executionTimeMs: (performance.now() - startTime).toFixed(2)
        };
      }

      return {
        success: false,
        error: `Syntax error: Unsupported SQL statement starting with '${firstWord}'`
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Error executing query',
        executionTimeMs: (performance.now() - startTime).toFixed(2)
      };
    }
  }

  // Handle CREATE TABLE
  handleCreate(query, startTime) {
    const match = query.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)/i);
    if (!match) {
      throw new Error('Invalid CREATE TABLE syntax. Example: CREATE TABLE tablename (id INT, name VARCHAR(50))');
    }
    const tableName = match[1].toLowerCase();
    const colsDef = match[2];
    const columns = [];

    // Parse column definitions
    const parts = colsDef.split(',');
    for (const part of parts) {
      const tokens = part.trim().split(/\s+/);
      const colName = tokens[0];
      if (colName && !['PRIMARY', 'FOREIGN', 'CONSTRAINT', 'UNIQUE'].includes(colName.toUpperCase())) {
        columns.push(colName);
      }
    }

    if (this.tables[tableName]) {
      throw new Error(`Table '${tableName}' already exists.`);
    }

    this.tables[tableName] = {
      columns,
      rows: []
    };

    return {
      success: true,
      type: 'DDL',
      message: `Table '${tableName}' created successfully with columns: [${columns.join(', ')}].`,
      columns: ['status'],
      rows: [[`TABLE ${tableName} CREATED`]],
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Handle DROP TABLE
  handleDrop(query, startTime) {
    const match = query.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);
    if (!match) throw new Error('Invalid DROP TABLE syntax. Example: DROP TABLE tablename');
    const tableName = match[1].toLowerCase();
    if (!this.tables[tableName]) {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
    delete this.tables[tableName];
    return {
      success: true,
      type: 'DDL',
      message: `Table '${tableName}' dropped successfully.`,
      columns: ['status'],
      rows: [[`TABLE ${tableName} DROPPED`]],
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Handle TRUNCATE TABLE
  handleTruncate(query, startTime) {
    const match = query.match(/TRUNCATE\s+(?:TABLE\s+)?(\w+)/i);
    if (!match) throw new Error('Invalid TRUNCATE TABLE syntax. Example: TRUNCATE TABLE tablename');
    const tableName = match[1].toLowerCase();
    if (!this.tables[tableName]) {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
    const count = this.tables[tableName].rows.length;
    this.tables[tableName].rows = [];
    return {
      success: true,
      type: 'DDL',
      message: `Table '${tableName}' truncated. All ${count} rows removed.`,
      columns: ['status'],
      rows: [[`TABLE ${tableName} TRUNCATED`]],
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Handle ALTER TABLE
  handleAlter(query, startTime) {
    const addColMatch = query.match(/ALTER\s+TABLE\s+(\w+)\s+ADD\s+(?:COLUMN\s+)?(\w+)/i);
    if (addColMatch) {
      const tableName = addColMatch[1].toLowerCase();
      const colName = addColMatch[2];
      if (!this.tables[tableName]) throw new Error(`Table '${tableName}' does not exist.`);
      if (this.tables[tableName].columns.includes(colName)) {
        throw new Error(`Column '${colName}' already exists in table '${tableName}'.`);
      }
      this.tables[tableName].columns.push(colName);
      for (const row of this.tables[tableName].rows) {
        row.push(null);
      }
      return {
        success: true,
        type: 'DDL',
        message: `Column '${colName}' added to table '${tableName}'.`,
        columns: ['status'],
        rows: [[`COLUMN ${colName} ADDED`]],
        executionTimeMs: (performance.now() - startTime).toFixed(2)
      };
    }
    throw new Error('Unsupported ALTER TABLE syntax. Supported: ALTER TABLE tablename ADD COLUMN colname');
  }

  // Handle INSERT
  handleInsert(query, startTime) {
    const match = query.match(/INSERT\s+INTO\s+(\w+)(?:\s*\(([\w\s,]+)\))?\s+VALUES\s*\(([\s\S]+)\)/i);
    if (!match) {
      throw new Error('Invalid INSERT syntax. Example: INSERT INTO students (id, name, marks) VALUES (109, "Rahul", 85)');
    }
    const tableName = match[1].toLowerCase();
    const colsSpecified = match[2] ? match[2].split(',').map(s => s.trim()) : null;
    const valuesRaw = match[3];

    if (!this.tables[tableName]) {
      throw new Error(`Table '${tableName}' does not exist.`);
    }

    const table = this.tables[tableName];
    const parsedValues = this.parseCsvValues(valuesRaw);

    let rowToInsert = [];
    if (colsSpecified) {
      rowToInsert = table.columns.map(col => {
        const idx = colsSpecified.findIndex(c => c.toLowerCase() === col.toLowerCase());
        return idx !== -1 ? parsedValues[idx] : null;
      });
    } else {
      rowToInsert = parsedValues;
      while (rowToInsert.length < table.columns.length) rowToInsert.push(null);
    }

    table.rows.push(rowToInsert);

    return {
      success: true,
      type: 'DML',
      message: `1 row inserted into '${tableName}'.`,
      columns: ['status', 'rows_affected'],
      rows: [['INSERT SUCCESS', 1]],
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Handle UPDATE
  handleUpdate(query, startTime) {
    const match = query.match(/UPDATE\s+(\w+)\s+SET\s+([^WHERE]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) {
      throw new Error('Invalid UPDATE syntax. Example: UPDATE students SET marks = 95 WHERE id = 101');
    }
    const tableName = match[1].toLowerCase();
    const setClause = match[2].trim();
    const whereClause = match[3] ? match[3].trim() : null;

    if (!this.tables[tableName]) throw new Error(`Table '${tableName}' does not exist.`);
    const table = this.tables[tableName];

    // parse SET assignments
    const assignments = setClause.split(',').map(a => {
      const [col, val] = a.split('=').map(s => s.trim());
      return { col, val: this.parseValue(val) };
    });

    let count = 0;
    for (let i = 0; i < table.rows.length; i++) {
      const rowObj = this.rowToObject(table.columns, table.rows[i]);
      if (!whereClause || this.evaluateWhere(whereClause, rowObj)) {
        for (const assign of assignments) {
          const colIdx = table.columns.findIndex(c => c.toLowerCase() === assign.col.toLowerCase());
          if (colIdx !== -1) {
            table.rows[i][colIdx] = assign.val;
          }
        }
        count++;
      }
    }

    return {
      success: true,
      type: 'DML',
      message: `${count} row(s) updated in '${tableName}'.`,
      columns: ['status', 'rows_affected'],
      rows: [['UPDATE SUCCESS', count]],
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Handle DELETE
  handleDelete(query, startTime) {
    const match = query.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) throw new Error('Invalid DELETE syntax. Example: DELETE FROM students WHERE marks < 70');
    const tableName = match[1].toLowerCase();
    const whereClause = match[2] ? match[2].trim() : null;

    if (!this.tables[tableName]) throw new Error(`Table '${tableName}' does not exist.`);
    const table = this.tables[tableName];

    const initialLength = table.rows.length;
    table.rows = table.rows.filter(row => {
      const rowObj = this.rowToObject(table.columns, row);
      if (!whereClause) return false;
      return !this.evaluateWhere(whereClause, rowObj);
    });

    const deletedCount = initialLength - table.rows.length;

    return {
      success: true,
      type: 'DML',
      message: `${deletedCount} row(s) deleted from '${tableName}'.`,
      columns: ['status', 'rows_affected'],
      rows: [['DELETE SUCCESS', deletedCount]],
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Handle SELECT (DQL)
  handleSelect(query, startTime) {
    // Regex breakdown for SELECT ... FROM ... [JOIN ...] [WHERE ...] [GROUP BY ...] [HAVING ...] [ORDER BY ...] [LIMIT ...]
    // Support subqueries in WHERE: WHERE salary > (SELECT AVG(salary) FROM employees)
    let processedQuery = query;

    // Evaluate scalar subqueries in WHERE if present
    const subqueryMatch = processedQuery.match(/\(\s*SELECT\s+([\s\S]+?)\s*\)/i);
    if (subqueryMatch) {
      const innerQuery = 'SELECT ' + subqueryMatch[1];
      const innerResult = this.handleSelect(innerQuery, performance.now());
      if (innerResult.success && innerResult.rows.length > 0) {
        const replacementVal = typeof innerResult.rows[0][0] === 'string' ? `'${innerResult.rows[0][0]}'` : innerResult.rows[0][0];
        processedQuery = processedQuery.replace(subqueryMatch[0], String(replacementVal));
      }
    }

    // Parse clauses
    const fromMatch = processedQuery.match(/SELECT\s+([\s\S]+?)\s+FROM\s+([\s\S]+?)(?=\s+WHERE|\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (!fromMatch) {
      // Could be SELECT 1+1, or SELECT NOW()
      const selectOnlyMatch = processedQuery.match(/SELECT\s+([\s\S]+)$/i);
      if (selectOnlyMatch) {
        const expr = selectOnlyMatch[1].trim();
        return {
          success: true,
          type: 'DQL',
          columns: [expr],
          rows: [[this.evaluateExpression(expr, {})]],
          executionTimeMs: (performance.now() - startTime).toFixed(2)
        };
      }
      throw new Error('Invalid SELECT syntax. Example: SELECT * FROM students WHERE marks > 80');
    }

    const selectFieldsStr = fromMatch[1].trim();
    const fromAndJoinStr = fromMatch[2].trim();

    // Check WHERE
    let whereClause = null;
    const whereMatch = processedQuery.match(/\s+WHERE\s+([\s\S]+?)(?=\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (whereMatch) whereClause = whereMatch[1].trim();

    // Check GROUP BY
    let groupByClause = null;
    const groupByMatch = processedQuery.match(/\s+GROUP\s+BY\s+([\s\S]+?)(?=\s+HAVING|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (groupByMatch) groupByClause = groupByMatch[1].trim();

    // Check HAVING
    let havingClause = null;
    const havingMatch = processedQuery.match(/\s+HAVING\s+([\s\S]+?)(?=\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (havingMatch) havingClause = havingMatch[1].trim();

    // Check ORDER BY
    let orderByClause = null;
    const orderByMatch = processedQuery.match(/\s+ORDER\s+BY\s+([\s\S]+?)(?=\s+LIMIT|$)/i);
    if (orderByMatch) orderByClause = orderByMatch[1].trim();

    // Check LIMIT / OFFSET
    let limitVal = null;
    let offsetVal = 0;
    const limitMatch = processedQuery.match(/\s+LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
    if (limitMatch) {
      limitVal = parseInt(limitMatch[1], 10);
      if (limitMatch[2]) offsetVal = parseInt(limitMatch[2], 10);
    }

    // Resolve FROM & JOINS
    const dataset = this.resolveFromAndJoins(fromAndJoinStr);
    let workingRows = dataset.rows;

    // Apply WHERE
    if (whereClause) {
      workingRows = workingRows.filter(rowObj => this.evaluateWhere(whereClause, rowObj));
    }

    // Apply GROUP BY / Aggregation
    let resultColumns = [];
    let resultRows = [];

    const isAggregateQuery = /COUNT|SUM|AVG|MAX|MIN/i.test(selectFieldsStr) || groupByClause;

    if (isAggregateQuery) {
      const groups = {};
      const groupKeys = groupByClause ? groupByClause.split(',').map(s => s.trim()) : [];

      for (const rowObj of workingRows) {
        const groupKey = groupKeys.map(k => String(this.resolveFieldValue(k, rowObj))).join('___') || '__ALL__';
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(rowObj);
      }

      // Parse SELECT fields
      const selectFields = this.splitSelectFields(selectFieldsStr);
      resultColumns = selectFields.map(f => this.getFieldAlias(f));

      for (const [, groupRows] of Object.entries(groups)) {
        const aggregateRow = {};
        for (const field of selectFields) {
          const alias = this.getFieldAlias(field);
          aggregateRow[alias] = this.evaluateAggregateField(field, groupRows);
        }

        // Apply HAVING if present
        if (!havingClause || this.evaluateHaving(havingClause, aggregateRow, groupRows)) {
          resultRows.push(resultColumns.map(col => aggregateRow[col]));
        }
      }
    } else {
      // Normal non-aggregate select
      const selectFields = this.splitSelectFields(selectFieldsStr);

      if (selectFields.length === 1 && selectFields[0].trim() === '*') {
        resultColumns = [...dataset.columns];
        resultRows = workingRows.map(rowObj => dataset.columns.map(c => rowObj[c] ?? rowObj[c.toLowerCase()]));
      } else {
        resultColumns = selectFields.map(f => this.getFieldAlias(f));
        resultRows = workingRows.map(rowObj => {
          return selectFields.map(field => this.evaluateExpression(field, rowObj));
        });
      }
    }

    // DISTINCT
    if (/^DISTINCT\s+/i.test(selectFieldsStr)) {
      const seen = new Set();
      resultRows = resultRows.filter(row => {
        const key = JSON.stringify(row);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      resultColumns = resultColumns.map(c => c.replace(/^DISTINCT\s+/i, ''));
    }

    // ORDER BY
    if (orderByClause) {
      const orderParts = orderByClause.split(',').map(s => s.trim());
      resultRows.sort((a, b) => {
        for (const orderPart of orderParts) {
          const isDesc = /\s+DESC$/i.test(orderPart);
          const colName = orderPart.replace(/\s+(?:ASC|DESC)$/i, '').trim();
          const colIdx = resultColumns.findIndex(c => c.toLowerCase() === colName.toLowerCase());
          if (colIdx !== -1) {
            const valA = a[colIdx];
            const valB = b[colIdx];
            if (valA === valB) continue;
            if (valA === null) return 1;
            if (valB === null) return -1;
            const cmp = valA > valB ? 1 : -1;
            return isDesc ? -cmp : cmp;
          }
        }
        return 0;
      });
    }

    // LIMIT & OFFSET
    if (offsetVal > 0) {
      resultRows = resultRows.slice(offsetVal);
    }
    if (limitVal !== null && !isNaN(limitVal)) {
      resultRows = resultRows.slice(0, limitVal);
    }

    return {
      success: true,
      type: 'DQL',
      columns: resultColumns,
      rows: resultRows,
      rowCount: resultRows.length,
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Resolve tables and JOINs
  resolveFromAndJoins(fromStr) {
    // Check for JOIN keywords
    const joinRegex = /(INNER|LEFT|RIGHT|FULL(?:\s+OUTER)?|CROSS)?\s*JOIN\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+([\w.]+)\s*=\s*([\w.]+)/gi;
    const initialTableMatch = fromStr.match(/^(\w+)(?:\s+(?:AS\s+)?(\w+))?/i);
    if (!initialTableMatch) throw new Error('Invalid FROM clause.');

    const primaryTableName = initialTableMatch[1].toLowerCase();
    const primaryTable = this.tables[primaryTableName];
    if (!primaryTable) throw new Error(`Table '${primaryTableName}' does not exist.`);

    let currentColumns = [...primaryTable.columns];
    let currentRows = primaryTable.rows.map(r => this.rowToObject(primaryTable.columns, r, primaryTableName));

    let match;
    while ((match = joinRegex.exec(fromStr)) !== null) {
      const joinType = (match[1] || 'INNER').toUpperCase();
      const rightTableName = match[2].toLowerCase();
      const rightTable = this.tables[rightTableName];
      if (!rightTable) throw new Error(`Joined table '${rightTableName}' does not exist.`);

      const leftKey = match[4];
      const rightKey = match[5];

      const newRows = [];
      const newColumns = [...currentColumns];
      for (const col of rightTable.columns) {
        if (!newColumns.includes(col)) newColumns.push(col);
        else newColumns.push(`${rightTableName}_${col}`);
      }

      const rightObjRows = rightTable.rows.map(r => this.rowToObject(rightTable.columns, r, rightTableName));

      if (joinType.includes('CROSS')) {
        for (const lRow of currentRows) {
          for (const rRow of rightObjRows) {
            newRows.push({ ...lRow, ...rRow });
          }
        }
      } else if (joinType.includes('LEFT')) {
        for (const lRow of currentRows) {
          const matchingRight = rightObjRows.filter(rRow => {
            return this.resolveFieldValue(leftKey, lRow) === this.resolveFieldValue(rightKey, rRow) ||
                   this.resolveFieldValue(rightKey, lRow) === this.resolveFieldValue(leftKey, rRow);
          });
          if (matchingRight.length > 0) {
            for (const m of matchingRight) newRows.push({ ...lRow, ...m });
          } else {
            const nullRight = {};
            rightTable.columns.forEach(c => nullRight[c] = null);
            newRows.push({ ...lRow, ...nullRight });
          }
        }
      } else if (joinType.includes('RIGHT')) {
        for (const rRow of rightObjRows) {
          const matchingLeft = currentRows.filter(lRow => {
            return this.resolveFieldValue(leftKey, lRow) === this.resolveFieldValue(rightKey, rRow) ||
                   this.resolveFieldValue(rightKey, lRow) === this.resolveFieldValue(leftKey, rRow);
          });
          if (matchingLeft.length > 0) {
            for (const m of matchingLeft) newRows.push({ ...m, ...rRow });
          } else {
            const nullLeft = {};
            currentColumns.forEach(c => nullLeft[c] = null);
            newRows.push({ ...nullLeft, ...rRow });
          }
        }
      } else if (joinType.includes('FULL')) {
        const matchedRightIndices = new Set();
        for (const lRow of currentRows) {
          const matchingRight = rightObjRows.filter((rRow, idx) => {
            const isMatch = this.resolveFieldValue(leftKey, lRow) === this.resolveFieldValue(rightKey, rRow) ||
                            this.resolveFieldValue(rightKey, lRow) === this.resolveFieldValue(leftKey, rRow);
            if (isMatch) matchedRightIndices.add(idx);
            return isMatch;
          });
          if (matchingRight.length > 0) {
            for (const m of matchingRight) newRows.push({ ...lRow, ...m });
          } else {
            const nullRight = {};
            rightTable.columns.forEach(c => nullRight[c] = null);
            newRows.push({ ...lRow, ...nullRight });
          }
        }
        // Unmatched right rows
        rightObjRows.forEach((rRow, idx) => {
          if (!matchedRightIndices.has(idx)) {
            const nullLeft = {};
            currentColumns.forEach(c => nullLeft[c] = null);
            newRows.push({ ...nullLeft, ...rRow });
          }
        });
      } else {
        // INNER JOIN default
        for (const lRow of currentRows) {
          for (const rRow of rightObjRows) {
            const isMatch = this.resolveFieldValue(leftKey, lRow) === this.resolveFieldValue(rightKey, rRow) ||
                            this.resolveFieldValue(rightKey, lRow) === this.resolveFieldValue(leftKey, rRow);
            if (isMatch) {
              newRows.push({ ...lRow, ...rRow });
            }
          }
        }
      }

      currentColumns = newColumns;
      currentRows = newRows;
    }

    return { columns: currentColumns, rows: currentRows };
  }

  // Generate EXPLAIN execution plan breakdown
  explainQuery(query, startTime) {
    const isJoin = /JOIN/i.test(query);
    const hasWhere = /WHERE/i.test(query);
    const hasGroupBy = /GROUP\s+BY/i.test(query);
    const hasOrderBy = /ORDER\s+BY/i.test(query);

    const matchFrom = query.match(/FROM\s+(\w+)/i);
    const tableName = matchFrom ? matchFrom[1] : 'table';
    const totalRows = this.tables[tableName.toLowerCase()]?.rows.length || 10;

    const steps = [];
    let totalCost = 1.0;

    steps.push({
      step: 1,
      operation: hasWhere ? 'Seq Scan on ' + tableName : 'Full Table Scan on ' + tableName,
      details: hasWhere ? 'Filter applied with condition' : 'Scanning all rows in memory',
      rowsExamined: totalRows,
      cost: totalRows * 1.05
    });
    totalCost += totalRows * 1.05;

    if (isJoin) {
      steps.push({
        step: 2,
        operation: 'Hash / Nested Loop Join',
        details: 'Joining records on key match',
        rowsExamined: totalRows * 2,
        cost: 25.4
      });
      totalCost += 25.4;
    }

    if (hasGroupBy) {
      steps.push({
        step: steps.length + 1,
        operation: 'HashAggregate',
        details: 'Grouping keys into buckets',
        rowsExamined: totalRows,
        cost: 15.2
      });
      totalCost += 15.2;
    }

    if (hasOrderBy) {
      steps.push({
        step: steps.length + 1,
        operation: 'QuickSort (In-Memory)',
        details: 'Sorting result dataset by sort keys',
        rowsExamined: totalRows,
        cost: 8.5
      });
      totalCost += 8.5;
    }

    return {
      success: true,
      type: 'EXPLAIN',
      columns: ['Step', 'Operation', 'Details', 'Est. Rows', 'Cost (CPU/IO)'],
      rows: steps.map(s => [s.step, s.operation, s.details, s.rowsExamined, s.cost.toFixed(2)]),
      summary: `Estimated Query Cost: ${totalCost.toFixed(2)} units. Optimize with INDEX on filter columns to convert Seq Scan to Index Scan.`,
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }

  // Utilities for parsing & evaluating expressions
  rowToObject(columns, rowValues, prefix = '') {
    const obj = {};
    columns.forEach((col, idx) => {
      obj[col] = rowValues[idx];
      obj[col.toLowerCase()] = rowValues[idx];
      if (prefix) {
        obj[`${prefix}.${col}`] = rowValues[idx];
        obj[`${prefix}.${col.toLowerCase()}`] = rowValues[idx];
      }
    });
    return obj;
  }

  resolveFieldValue(field, rowObj) {
    const clean = field.trim().replace(/^['"`]|['"`]$/g, '');
    if (clean in rowObj) return rowObj[clean];
    const lower = clean.toLowerCase();
    if (lower in rowObj) return rowObj[lower];
    // check if it's a literal number or string
    if (!isNaN(clean)) return Number(clean);
    return clean;
  }

  evaluateWhere(whereClause, rowObj) {
    let expr = whereClause.trim();

    // Replace SQL boolean ops
    expr = expr.replace(/\s+AND\s+/gi, ' && ');
    expr = expr.replace(/\s+OR\s+/gi, ' || ');
    expr = expr.replace(/\s+NOT\s+/gi, ' ! ');

    // Handle IS NULL and IS NOT NULL
    expr = expr.replace(/([\w.]+)\s+IS\s+NOT\s+NULL/gi, (_, col) => {
      const val = this.resolveFieldValue(col, rowObj);
      return val !== null && val !== undefined ? 'true' : 'false';
    });
    expr = expr.replace(/([\w.]+)\s+IS\s+NULL/gi, (_, col) => {
      const val = this.resolveFieldValue(col, rowObj);
      return val === null || val === undefined ? 'true' : 'false';
    });

    // Handle LIKE: col LIKE '%pattern%'
    expr = expr.replace(/([\w.]+)\s+LIKE\s+'([^']+)'/gi, (_, col, pattern) => {
      const val = String(this.resolveFieldValue(col, rowObj) ?? '');
      const regex = new RegExp('^' + pattern.replace(/%/g, '.*').replace(/_/g, '.') + '$', 'i');
      return regex.test(val) ? 'true' : 'false';
    });

    // Handle IN (1, 2, 'a')
    expr = expr.replace(/([\w.]+)\s+IN\s*\(([^)]+)\)/gi, (_, col, listStr) => {
      const val = this.resolveFieldValue(col, rowObj);
      const items = listStr.split(',').map(s => this.parseValue(s.trim()));
      return items.includes(val) ? 'true' : 'false';
    });

    // Handle BETWEEN a AND b
    expr = expr.replace(/([\w.]+)\s+BETWEEN\s+(\d+(?:\.\d+)?)\s+&&\s+(\d+(?:\.\d+)?)/gi, (_, col, min, max) => {
      const val = Number(this.resolveFieldValue(col, rowObj));
      return (val >= Number(min) && val <= Number(max)) ? 'true' : 'false';
    });

    // Simple comparisons: = to ===, <> to !==, != to !==
    expr = expr.replace(/([^\s=!<>]+)\s*=\s*([^\s&|]+)/g, (match, left, right) => {
      const lVal = this.evaluateSimpleVal(left, rowObj);
      const rVal = this.evaluateSimpleVal(right, rowObj);
      return (lVal == rVal) ? 'true' : 'false';
    });

    expr = expr.replace(/([^\s=!<>]+)\s*(?:!=|<>)\s*([^\s&|]+)/g, (match, left, right) => {
      const lVal = this.evaluateSimpleVal(left, rowObj);
      const rVal = this.evaluateSimpleVal(right, rowObj);
      return (lVal != rVal) ? 'true' : 'false';
    });

    expr = expr.replace(/([^\s=!<>]+)\s*(>=|<=|>|<)\s*([^\s&|]+)/g, (match, left, op, right) => {
      const lVal = this.evaluateSimpleVal(left, rowObj);
      const rVal = this.evaluateSimpleVal(right, rowObj);
      if (op === '>') return (lVal > rVal) ? 'true' : 'false';
      if (op === '<') return (lVal < rVal) ? 'true' : 'false';
      if (op === '>=') return (lVal >= rVal) ? 'true' : 'false';
      if (op === '<=') return (lVal <= rVal) ? 'true' : 'false';
      return 'false';
    });

    try {
      // Evaluate boolean expression safely
      // Only contains true, false, &&, ||, !, parentheses
      const sanitized = expr.replace(/[^truefalse&|!()\s]/g, '');
      return Function(`"use strict"; return Boolean(${sanitized});`)();
    } catch {
      return false;
    }
  }

  evaluateSimpleVal(raw, rowObj) {
    const trimmed = raw.trim();
    if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
      return trimmed.slice(1, -1);
    }
    if (!isNaN(trimmed)) return Number(trimmed);
    return this.resolveFieldValue(trimmed, rowObj);
  }

  evaluateExpression(field, rowObj) {
    const trimmed = field.trim();
    // CASE WHEN condition THEN res ELSE res END
    if (/^CASE\s+/i.test(trimmed)) {
      const whenMatch = trimmed.match(/WHEN\s+(.+?)\s+THEN\s+(.+?)\s+ELSE\s+(.+?)\s+END/i);
      if (whenMatch) {
        const cond = whenMatch[1];
        const thenVal = this.parseValue(whenMatch[2].trim());
        const elseVal = this.parseValue(whenMatch[3].trim());
        return this.evaluateWhere(cond, rowObj) ? thenVal : elseVal;
      }
    }

    // Scalar functions: UPPER, LOWER, ROUND, LENGTH, COALESCE
    const upperMatch = trimmed.match(/^UPPER\((.+)\)$/i);
    if (upperMatch) return String(this.evaluateExpression(upperMatch[1], rowObj) ?? '').toUpperCase();

    const lowerMatch = trimmed.match(/^LOWER\((.+)\)$/i);
    if (lowerMatch) return String(this.evaluateExpression(lowerMatch[1], rowObj) ?? '').toLowerCase();

    const roundMatch = trimmed.match(/^ROUND\((.+?)(?:,\s*(\d+))?\)$/i);
    if (roundMatch) {
      const val = Number(this.evaluateExpression(roundMatch[1], rowObj));
      const decimals = roundMatch[2] ? parseInt(roundMatch[2], 10) : 0;
      return Number(val.toFixed(decimals));
    }

    const coalesceMatch = trimmed.match(/^COALESCE\((.+?),(.+?)\)$/i);
    if (coalesceMatch) {
      const val1 = this.evaluateExpression(coalesceMatch[1], rowObj);
      return val1 !== null && val1 !== undefined ? val1 : this.evaluateExpression(coalesceMatch[2], rowObj);
    }

    // Direct column
    const val = this.resolveFieldValue(trimmed, rowObj);
    return val !== undefined ? val : null;
  }

  evaluateAggregateField(field, groupRows) {
    const trimmed = field.trim();
    const countMatch = trimmed.match(/COUNT\((.*?)\)/i);
    if (countMatch) {
      const target = countMatch[1].trim();
      if (target === '*' || target === '1') return groupRows.length;
      return groupRows.filter(r => this.resolveFieldValue(target, r) !== null).length;
    }

    const sumMatch = trimmed.match(/SUM\((.+?)\)/i);
    if (sumMatch) {
      const col = sumMatch[1].trim();
      return groupRows.reduce((acc, r) => acc + (Number(this.resolveFieldValue(col, r)) || 0), 0);
    }

    const avgMatch = trimmed.match(/AVG\((.+?)\)/i);
    if (avgMatch) {
      const col = avgMatch[1].trim();
      const sum = groupRows.reduce((acc, r) => acc + (Number(this.resolveFieldValue(col, r)) || 0), 0);
      return Number((sum / (groupRows.length || 1)).toFixed(2));
    }

    const maxMatch = trimmed.match(/MAX\((.+?)\)/i);
    if (maxMatch) {
      const col = maxMatch[1].trim();
      const vals = groupRows.map(r => this.resolveFieldValue(col, r)).filter(v => v !== null);
      return vals.length > 0 ? Math.max(...vals.map(Number)) : null;
    }

    const minMatch = trimmed.match(/MIN\((.+?)\)/i);
    if (minMatch) {
      const col = minMatch[1].trim();
      const vals = groupRows.map(r => this.resolveFieldValue(col, r)).filter(v => v !== null);
      return vals.length > 0 ? Math.min(...vals.map(Number)) : null;
    }

    // Fallback: value of first row in group
    return groupRows.length > 0 ? this.resolveFieldValue(trimmed, groupRows[0]) : null;
  }

  evaluateHaving(havingClause, aggregateRow, groupRows) {
    // Replace aggregates in having clause
    let replaced = havingClause;
    replaced = replaced.replace(/COUNT\((.*?)\)/gi, () => groupRows.length);
    replaced = replaced.replace(/AVG\((.+?)\)/gi, (_, col) => {
      const sum = groupRows.reduce((acc, r) => acc + (Number(this.resolveFieldValue(col, r)) || 0), 0);
      return Number((sum / (groupRows.length || 1)).toFixed(2));
    });
    return this.evaluateWhere(replaced, aggregateRow);
  }

  splitSelectFields(str) {
    const fields = [];
    let depth = 0;
    let current = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') depth++;
      else if (char === ')') depth--;
      else if (char === ',' && depth === 0) {
        fields.push(current.trim());
        current = '';
        continue;
      }
      current += char;
    }
    if (current.trim()) fields.push(current.trim());
    return fields;
  }

  getFieldAlias(field) {
    const match = field.match(/\s+AS\s+([\w_]+)$/i);
    if (match) return match[1];
    const matchSimple = field.match(/\s+([\w_]+)$/i);
    if (matchSimple && !/^(WHERE|FROM|ON|AND|OR|GROUP|ORDER)$/i.test(matchSimple[1]) && !field.includes('(')) {
      return matchSimple[1];
    }
    return field.trim();
  }

  parseCsvValues(str) {
    const results = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === "'" || char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        results.push(this.parseValue(current.trim()));
        current = '';
        continue;
      }
      current += char;
    }
    if (current.trim()) results.push(this.parseValue(current.trim()));
    return results;
  }

  parseValue(valStr) {
    if (valStr === 'NULL' || valStr === 'null') return null;
    if ((valStr.startsWith("'") && valStr.endsWith("'")) || (valStr.startsWith('"') && valStr.endsWith('"'))) {
      return valStr.slice(1, -1);
    }
    if (!isNaN(valStr)) return Number(valStr);
    if (valStr.toLowerCase() === 'true') return true;
    if (valStr.toLowerCase() === 'false') return false;
    return valStr;
  }
}

export const sqlEngine = new BrowserSqlEngine();
