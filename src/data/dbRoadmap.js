// DBMS Zero-To-Infinity Curriculum Roadmap (Levels 0 - 25)
// Powered By Kapil | Under SarlaYash Mission Productions
// 25% Theory + 75% Hands-On

export const ROADMAP_LEVELS = [
  {
    id: 0,
    title: 'Data Before Databases',
    tagline: 'The File System Era',
    stage: 'Foundations',
    icon: 'FolderArchive',
    summary: 'Experience why flat files (txt, csv, json) collapse under modern workloads: data redundancy, anomalies, race conditions, and lack of atomicity.',
    theory: {
      why: 'Before databases existed (1950s-1960s), companies stored business data directly in operating system flat files (.txt, .csv). As systems scaled to thousands of users, file systems completely broke down.',
      keyConcepts: [
        'Data vs Information: Unprocessed raw facts vs processed meaningful context.',
        'File Storage Models: Sequential CSV, Tab-separated files, JSON hierarchies.',
        'Data Duplication: Repeating customer names/addresses in invoices, orders, and receipts.',
        'Data Inconsistency: Updating a phone number in students.txt but not in fees.csv.',
        'Concurrent Access Anomalies: Two programs writing to the same file simultaneously corrupting data.',
        'Security & Access Control: Inability to grant column-level or row-level permissions in raw files.'
      ],
      industryReality: 'In early banking and airline systems, flat-file record corruption frequently resulted in passenger double-bookings and phantom money transfers.',
      engineeringTradeoff: 'Files are fast for single-threaded append logs, but disastrous for multi-table relationships and concurrent mutations.',
      commonMyth: '"JSON files or CSVs are good enough for small production apps." (Myth: Concurrent writes easily corrupt JSON files without file locking).'
    },
    handsOnType: 'file-system-challenge',
    defaultQuery: '-- In Level 0, you experience why traditional file systems break down.\n-- Explore "The File System Challenge" in the interactive tab!',
    challenges: [
      {
        id: 'fs-1',
        title: 'Detect Data Redundancy',
        desc: 'Identify student names duplicated across attendance.csv, marks.csv, and fees.csv.',
        expectedGoal: 'Discover how 4 redundant copies lead to wasted disk space and desynchronization.'
      },
      {
        id: 'fs-2',
        title: 'Trigger File Inconsistency',
        desc: 'Update student 101 marks in marks.csv and notice fees.csv still holds outdated records.',
        expectedGoal: 'Experience lack of referential integrity in traditional files.'
      }
    ],
    quiz: [
      {
        question: 'Which of the following is a primary problem with traditional file processing systems?',
        options: [
          'Data redundancy and inconsistency',
          'Difficulty in accessing data',
          'Data isolation and atomicity problems',
          'All of the above'
        ],
        answer: 3,
        explanation: 'Traditional file systems suffer from redundancy, access hurdles, data isolation, concurrent anomalies, and lack of atomicity.'
      },
      {
        question: 'What happens when two concurrent programs attempt to write to the same text file simultaneously without OS locks?',
        options: [
          'Automatic atomic merge',
          'Lost update / File corruption',
          'Automatic transaction rollback',
          'Creation of a new schema'
        ],
        answer: 1,
        explanation: 'File systems do not provide ACID transaction isolation, leading to lost updates or file truncation.'
      }
    ]
  },
  {
    id: 1,
    title: 'Why DBMS?',
    tagline: 'The Architecture of Data Independence',
    stage: 'Foundations',
    icon: 'Database',
    summary: 'Discover the 3-Tier ANSI/SPARC Database Architecture: Physical, Logical, and View levels, plus data independence.',
    theory: {
      why: 'DBMS was engineered to decouple application code from physical disk storage, guaranteeing data consistency, security, and multi-user concurrency.',
      keyConcepts: [
        'DBMS Definition: Software system facilitating definition, creation, querying, and maintenance of databases.',
        '3-Tier ANSI/SPARC Schema: External/View Level -> Conceptual/Logical Level -> Internal/Physical Level.',
        'Physical Data Independence: Changing storage layout (B-Tree to Hash, SSD to NVMe) without rewriting SQL queries.',
        'Logical Data Independence: Altering table schemas without breaking existing external application views.',
        'Database Administrator (DBA): Controls schema evolution, user privileges, backup retention, and disaster recovery.'
      ],
      industryReality: 'Enterprise architectures (Oracle, PostgreSQL) maintain strict abstraction layers so disk partition resizing occurs live with 99.999% uptime.',
      engineeringTradeoff: 'DBMS adds memory overhead and parsing latency compared to direct binary disk reads, but grants bulletproof integrity.',
      commonMyth: '"Database and DBMS mean the exact same thing." (A database is the structured data itself; a DBMS is the software engine managing it).'
    },
    handsOnType: 'sql-lab',
    defaultQuery: 'SELECT * FROM departments;',
    challenges: [
      {
        id: 'wdb-1',
        title: 'Explore Department Schemas',
        desc: 'Retrieve all department records including their budget and allocated building block.',
        sql: 'SELECT dept_id, dept_name, budget, block FROM departments;'
      }
    ],
    quiz: [
      {
        question: 'The ability to modify the internal schema without having to change the conceptual schema is known as:',
        options: [
          'Logical Data Independence',
          'Physical Data Independence',
          'Data Abstraction',
          'Schema Isolation'
        ],
        answer: 1,
        explanation: 'Physical data independence isolates internal/physical disk modifications from the logical schema.'
      }
    ]
  },
  {
    id: 2,
    title: 'Database Fundamentals',
    tagline: 'Entities, Attributes & Key Constraints',
    stage: 'Foundations',
    icon: 'KeyRound',
    summary: 'Master Relational tables, attributes, tuples, domains, and the full hierarchy of keys: Super, Candidate, Primary, Alternate, and Foreign keys.',
    theory: {
      why: 'Without mathematically rigorous keys, tables cannot enforce uniqueness, identity, or entity relationships.',
      keyConcepts: [
        'Super Key: Any set of attributes that uniquely identifies a tuple.',
        'Candidate Key: A minimal super key with no redundant attributes.',
        'Primary Key (PK): The candidate key chosen by the database architect as the unique row identifier (cannot be NULL).',
        'Alternate Key: Candidate keys not chosen as the primary key.',
        'Foreign Key (FK): An attribute whose values reference the primary key of another relation, enforcing Referential Integrity.',
        'Domain Constraint: Permissible data types and values for an attribute.'
      ],
      industryReality: 'Production failures frequently occur when junior engineers fail to index foreign keys, leading to cascading table locks during deletes.',
      engineeringTradeoff: 'Adding foreign keys provides referential safety at the cost of slight write validation latency on INSERT/UPDATE.',
      commonMyth: '"A table can have multiple primary keys." (False: A table has exactly ONE primary key, though it can be a Composite key consisting of multiple columns).'
    },
    handsOnType: 'sql-lab',
    defaultQuery: 'SELECT id, name, branch, cgpa FROM students WHERE cgpa > 8.5;',
    challenges: [
      {
        id: 'keys-1',
        title: 'Query High Achievers',
        desc: 'Select student id, name, and cgpa for students with CGPA strictly greater than 9.0.',
        sql: 'SELECT id, name, cgpa FROM students WHERE cgpa > 9.0;'
      }
    ],
    quiz: [
      {
        question: 'Which of the following is true regarding Candidate Keys and Super Keys?',
        options: [
          'All super keys are candidate keys',
          'A candidate key is a minimal super key',
          'A primary key cannot be a candidate key',
          'Foreign keys are always super keys'
        ],
        answer: 1,
        explanation: 'A candidate key is defined as a minimal super key having no extraneous attributes.'
      }
    ]
  },
  {
    id: 3,
    title: 'Relational Model & Relational Algebra',
    tagline: 'Mathematical Foundation of SQL',
    stage: 'Core Relational',
    icon: 'Binary',
    summary: 'Understand Codd\'s Relational Model: Relations, Tuples, and the mathematical operations behind SQL (Selection, Projection, Join, Union, Intersection).',
    theory: {
      why: 'Edgar F. Codd invented the Relational Model in 1970 using Set Theory so queries could be declarative rather than imperative disk-traversals.',
      keyConcepts: [
        'Selection (σ): Horizontal filtering of tuples satisfying a predicate condition.',
        'Projection (π): Vertical selection of specific attribute columns.',
        'Cartesian Product (×): Combines every tuple of relation R with every tuple of S.',
        'Natural Join (⋈): Combines tuples from two relations based on equal matching common attributes.',
        'Set Operations: Union (∪), Intersection (∩), and Set Difference (-) requiring union-compatibility.'
      ],
      industryReality: 'Modern SQL query optimizers convert your SQL text directly into relational algebra expression trees before cost optimization.',
      engineeringTradeoff: 'Relational algebra guarantees mathematical correctness, but Cartesian products ($O(N \times M)$) can crash systems if unconstrained.',
      commonMyth: '"SQL and Relational Algebra are unrelated." (SQL is directly synthesized from Relational Algebra and Relational Calculus).'
    },
    handsOnType: 'relational-algebra',
    defaultQuery: 'SELECT name, branch FROM students WHERE branch = \'CSE\';',
    challenges: [
      {
        id: 'ra-1',
        title: 'Selection σ(branch=\'CSE\')',
        desc: 'Run a selection query in SQL filtering CSE students.',
        sql: 'SELECT * FROM students WHERE branch = \'CSE\';'
      }
    ],
    quiz: [
      {
        question: 'Which relational algebra operator performs vertical filtering of columns?',
        options: ['Selection (σ)', 'Projection (π)', 'Cartesian Product (×)', 'Intersection (∩)'],
        answer: 1,
        explanation: 'Projection (π) selects specific columns, filtering vertically.'
      }
    ]
  },
  {
    id: 4,
    title: 'SQL Zero',
    tagline: 'DDL, DML & DQL from First Principles',
    stage: 'Core SQL',
    icon: 'Terminal',
    summary: 'Kickstart SQL hands-on: CREATE, ALTER, DROP, TRUNCATE, INSERT, UPDATE, DELETE, and basic SELECT queries.',
    theory: {
      why: 'SQL (Structured Query Language) is the universal industry standard declarative query language for interacting with relational databases.',
      keyConcepts: [
        'DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE — modifies schema metadata.',
        'DML (Data Manipulation Language): INSERT, UPDATE, DELETE — modifies row data.',
        'DQL (Data Query Language): SELECT — reads and filters data.',
        'DCL (Data Control Language): GRANT, REVOKE — governs access privileges.',
        'TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT.'
      ],
      industryReality: 'Accidental `DELETE FROM users;` without a `WHERE` clause is the #1 recorded junior developer outage in production.',
      engineeringTradeoff: 'TRUNCATE is faster than DELETE because it deallocates data pages directly rather than logging row-by-row deletions.',
      commonMyth: '"TRUNCATE and DELETE do the same thing." (TRUNCATE resets high-water marks and cannot be rolled back easily in many engines; DELETE fires row triggers).'
    },
    handsOnType: 'sql-lab',
    defaultQuery: 'CREATE TABLE mentors (\n  mentor_id INT,\n  name VARCHAR(50),\n  domain VARCHAR(50)\n);\n\nINSERT INTO mentors VALUES (1, "Kapil", "Database Engineering");\n\nSELECT * FROM mentors;',
    challenges: [
      {
        id: 'sql0-1',
        title: 'Create and Query a Table',
        desc: 'Create a table named "projects" and insert a project record.',
        sql: 'CREATE TABLE projects (id INT, title VARCHAR(50));\nINSERT INTO projects VALUES (1, "Cloud DB Engine");\nSELECT * FROM projects;'
      }
    ],
    quiz: [
      {
        question: 'Which SQL command removes all rows from a table by deallocating data pages rather than logging row deletions?',
        options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'],
        answer: 1,
        explanation: 'TRUNCATE removes all rows quickly with minimal transaction logging.'
      }
    ]
  },
  {
    id: 5,
    title: 'SQL Power',
    tagline: 'Filtering, Aggregation & Grouping',
    stage: 'Core SQL',
    icon: 'Zap',
    summary: 'Harness the power of WHERE, ORDER BY, GROUP BY, HAVING, DISTINCT, LIMIT, and Aggregates (COUNT, SUM, AVG, MAX, MIN).',
    theory: {
      why: 'Modern analytics and backend APIs rely on aggregation pipelines to transform millions of raw transaction records into actionable KPIs.',
      keyConcepts: [
        'WHERE vs HAVING: WHERE filters individual tuples before grouping; HAVING filters aggregated groups.',
        'Aggregate Functions: COUNT, SUM, AVG, MAX, MIN ignore NULL values (except COUNT(*)).',
        'ORDER BY: Sorts results ASC (default) or DESC; executes near the end of query evaluation pipeline.',
        'DISTINCT: Removes duplicate rows from the projection result set.',
        'CASE WHEN: Conditional branching logic inside SQL queries.'
      ],
      industryReality: 'Using `HAVING` instead of `WHERE` for non-aggregate conditions forces the engine to aggregate millions of unnecessary rows, causing massive CPU spikes.',
      engineeringTradeoff: 'Sorting with ORDER BY on unindexed large tables triggers expensive external disk mergesort.',
      commonMyth: '"WHERE can filter on COUNT(*)". (False: Aggregations require GROUP BY and must be filtered using HAVING).'
    },
    handsOnType: 'sql-lab',
    defaultQuery: 'SELECT branch, COUNT(*) AS student_count, ROUND(AVG(cgpa), 2) AS avg_cgpa\nFROM students\nGROUP BY branch\nHAVING COUNT(*) > 1\nORDER BY avg_cgpa DESC;',
    challenges: [
      {
        id: 'sqlp-1',
        title: 'Department Salary Metrics',
        desc: 'Calculate the total salary and average salary per department from the employees table.',
        sql: 'SELECT department, SUM(salary) AS total_payroll, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department\nORDER BY total_payroll DESC;'
      }
    ],
    quiz: [
      {
        question: 'What is the exact conceptual evaluation order of clauses in a SQL SELECT statement?',
        options: [
          'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY',
          'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY',
          'FROM -> SELECT -> WHERE -> ORDER BY -> GROUP BY -> HAVING',
          'WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> ORDER BY'
        ],
        answer: 1,
        explanation: 'SQL executes FROM first to load source data, then WHERE, GROUP BY, HAVING, SELECT projection, and finally ORDER BY.'
      }
    ]
  },
  {
    id: 6,
    title: 'Mastering Joins',
    tagline: 'Visual Join Simulator',
    stage: 'Core SQL',
    icon: 'GitMerge',
    summary: 'Master INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF JOINs with the interactive Visual Join Simulator showing which rows survive.',
    theory: {
      why: 'Relational databases normalize data across separate tables to prevent anomalies; Joins recombine them dynamically at query time.',
      keyConcepts: [
        'INNER JOIN: Returns only tuples matching the ON predicate in both tables.',
        'LEFT JOIN (LEFT OUTER): Returns all rows from left table, padding NULL for unmatched right table columns.',
        'RIGHT JOIN (RIGHT OUTER): Returns all rows from right table, padding NULL for unmatched left columns.',
        'FULL OUTER JOIN: Returns union of left and right tables, with NULLs on either side when no match exists.',
        'CROSS JOIN: Cartesian product of both relations ($N \times M$ rows).',
        'SELF JOIN: Joining a table to itself (crucial for hierarchical manager-employee relationships).'
      ],
      industryReality: 'In real-world e-commerce, checking user orders that have no matching delivery records is done using a `LEFT JOIN ... WHERE delivery.id IS NULL`.',
      engineeringTradeoff: 'Hash Joins require building in-memory hash tables of the smaller relation; Nested Loop Joins work well when index scans are available.',
      commonMyth: '"LEFT JOIN is always slower than INNER JOIN." (On well-indexed foreign keys, performance is virtually identical).'
    },
    handsOnType: 'join-simulator',
    defaultQuery: 'SELECT e.name AS employee, e.department, d.block, d.budget\nFROM employees e\nINNER JOIN departments d ON e.department = d.dept_id;',
    challenges: [
      {
        id: 'join-1',
        title: 'Employees and Managers (Self Join)',
        desc: 'Query employees alongside their respective manager names using a SELF JOIN.',
        sql: 'SELECT emp.name AS employee, mgr.name AS manager\nFROM employees emp\nLEFT JOIN employees mgr ON emp.manager_id = mgr.emp_id;'
      }
    ],
    quiz: [
      {
        question: 'Which join type returns all records from the left table even if there is no match in the right table?',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'RIGHT OUTER JOIN'],
        answer: 1,
        explanation: 'LEFT JOIN preserves all left-table records, populating right-table attributes with NULL when no match exists.'
      }
    ]
  },
  {
    id: 7,
    title: 'Subqueries & Nested Queries',
    tagline: 'Correlated Queries & Placement Challenges',
    stage: 'Advanced SQL',
    icon: 'Layers',
    summary: 'Solve complex nested and correlated subqueries, EXISTS vs IN, and crack the classic placement interview problem: "Find the 2nd Highest Salary".',
    theory: {
      why: 'When queries require multi-step reasoning (e.g. comparing an employee salary to their specific department average), subqueries provide expressive nesting.',
      keyConcepts: [
        'Scalar Subquery: Returns exactly one value (one row, one column); can be used in SELECT or WHERE.',
        'Multi-Row Subquery: Returns multiple values; used with IN, ANY, ALL.',
        'Correlated Subquery: References a column from the outer query; executes once per outer tuple.',
        'EXISTS vs IN: EXISTS stops scanning immediately upon finding the first match (short-circuit boolean); IN builds a set.',
        'N-th Highest Salary: Solved via `WHERE salary < (SELECT MAX(salary)...)` or `DENSE_RANK() / LIMIT 1 OFFSET N-1`.'
      ],
      industryReality: 'TCS, Infosys, Amazon, and Google placement interviews frequently test candidate understanding of correlated subqueries vs window functions.',
      engineeringTradeoff: 'Correlated subqueries can trigger $O(N^2)$ execution times if the query optimizer fails to unnest them into a Hash Join.',
      commonMyth: '"IN is always faster than EXISTS." (In most engines, EXISTS is substantially faster when the subquery dataset is large).'
    },
    handsOnType: 'subquery-challenge',
    defaultQuery: '-- Find the 2nd Highest Salary in Company\nSELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);',
    challenges: [
      {
        id: 'subq-1',
        title: 'Find Above-Average Earners',
        desc: 'Find all employees whose salary exceeds the overall company average salary.',
        sql: 'SELECT name, department, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);'
      }
    ],
    quiz: [
      {
        question: 'What distinguishes a correlated subquery from a standard nested subquery?',
        options: [
          'It can only be used with SELECT statements',
          'It references columns from the outer query and re-evaluates for each outer row',
          'It can never return more than one row',
          'It must always be preceded by the ALL operator'
        ],
        answer: 1,
        explanation: 'A correlated subquery depends on values passed in from the outer query.'
      }
    ]
  },
  {
    id: 8,
    title: 'Database Design & ER Modeling',
    tagline: 'Entities, Cardinality & ER-to-Relational Mapping',
    stage: 'Design & Normalization',
    icon: 'Network',
    summary: 'Master Entity-Relationship (ER) diagrams, weak entities, cardinalities (1:1, 1:N, M:N), and algorithms to map ER diagrams into clean SQL tables.',
    theory: {
      why: 'Building databases without an ER model is like building a skyscraper without blueprints. ER modeling captures real-world business constraints before writing code.',
      keyConcepts: [
        'Entity & Entity Set: Real-world object distinguishable from others (e.g. Student, Course).',
        'Attributes: Simple, Composite (Name -> First, Last), Multivalued (Phone numbers), Derived (Age from DOB).',
        'Cardinality Ratios: One-to-One (1:1), One-to-Many (1:N), Many-to-Many (M:N).',
        'Weak Entity Set: Does not have a primary key on its own; identified via identifying relationship with owner entity.',
        'ER to Relational Mapping: M:N relationships decompose into an associative junction table with two foreign keys.'
      ],
      industryReality: 'Failure to decompose M:N relationships into junction tables is a common disaster when scaling e-commerce order-item systems.',
      engineeringTradeoff: 'Storing multivalued attributes as JSON columns violates 1NF but is sometimes chosen in modern NoSQL document stores.',
      commonMyth: '"Attributes in ER diagrams map directly 1:1 to SQL tables." (Composite attributes must be flattened; multivalued attributes must become separate tables).'
    },
    handsOnType: 'er-designer',
    defaultQuery: '-- College Database Design: Students, Departments, Professors\nSELECT s.name, s.branch, d.dept_name, d.hod\nFROM students s\nJOIN departments d ON s.branch = d.dept_id;',
    challenges: [
      {
        id: 'er-1',
        title: 'Design an E-Commerce Schema',
        desc: 'Observe the relational mapping between Users, Orders, and OrderItems.',
        sql: 'SELECT o.order_id, o.customer_name, o.product_name, o.amount, o.status FROM orders o;'
      }
    ],
    quiz: [
      {
        question: 'How is a Many-to-Many (M:N) relationship between two entities properly mapped into a relational database?',
        options: [
          'Add a foreign key to entity A',
          'Add a foreign key to entity B',
          'Create a third junction/bridge table containing foreign keys to both entities',
          'Combine both entities into a single flat file'
        ],
        answer: 2,
        explanation: 'M:N relationships require a bridge table to prevent non-atomic repeating groups and maintain 1NF.'
      }
    ]
  },
  {
    id: 9,
    title: 'Normalization',
    tagline: 'Fix The Database Workbench',
    stage: 'Design & Normalization',
    icon: 'ShieldCheck',
    summary: 'Master 1NF, 2NF, 3NF, BCNF, Functional Dependencies, and resolve insertion, update, and deletion anomalies on broken schemas.',
    theory: {
      why: 'Un-normalized databases suffer from data redundancy, insertion anomalies (cannot add course without student), update anomalies, and deletion anomalies.',
      keyConcepts: [
        'Functional Dependency (X -> Y): Value of attribute X uniquely determines attribute Y.',
        'First Normal Form (1NF): Attribute values must be atomic; no repeating groups.',
        'Second Normal Form (2NF): Must be in 1NF and have NO partial dependencies (non-prime attributes must depend on the whole candidate key).',
        'Third Normal Form (3NF): In 2NF and have NO transitive dependencies ($X \to Y$ and $Y \to Z$ where $Z$ is non-prime).',
        'Boyce-Codd Normal Form (BCNF): For every functional dependency $X \to Y$, $X$ must be a super key.'
      ],
      industryReality: 'OLTP systems normalize to 3NF/BCNF for high-integrity writes. OLAP data warehouses intentionally denormalize into Star/Snowflake schemas for analytical read speed.',
      engineeringTradeoff: 'Higher normalization reduces redundancy and eliminates anomalies, but increases the number of JOINs required to assemble complete records.',
      commonMyth: '"BCNF is always superior to 3NF in every production case." (3NF preserves functional dependencies that BCNF sometimes cannot preserve without cross-table assertions).'
    },
    handsOnType: 'normalization-workbench',
    defaultQuery: '-- Interactive "Fix the Database" Workbench available in tab!\nSELECT * FROM students;',
    challenges: [
      {
        id: 'norm-1',
        title: 'Detect Anomalies in Bad Table',
        desc: 'Review denormalized Student-Course-Instructor records and eliminate anomalies.',
        sql: 'SELECT s.id, s.name, e.course_id, e.score FROM students s JOIN enrollments e ON s.id = e.student_id;'
      }
    ],
    quiz: [
      {
        question: 'A relation is in 2NF if it is in 1NF and:',
        options: [
          'Has no transitive dependencies',
          'Has no partial functional dependencies on any candidate key',
          'Has all candidate keys as super keys',
          'Has no foreign keys'
        ],
        answer: 1,
        explanation: '2NF strictly forbids partial dependencies where a non-prime attribute depends on only a proper subset of a composite candidate key.'
      }
    ]
  },
  {
    id: 10,
    title: 'Transactions & Concurrency',
    tagline: 'ACID Simulator & Bank Transfer Crash',
    stage: 'Engineering & Internals',
    icon: 'RefreshCw',
    summary: 'Master ACID properties, Transaction states, isolation levels, concurrency phenomena (Dirty Read, Lost Update, Phantom Read), and simulated bank crashes.',
    theory: {
      why: 'In multi-user concurrent systems, crashes between debit and credit operations will lose millions of dollars without atomic transactions and WAL logs.',
      keyConcepts: [
        'Atomicity: All operations succeed or all are rolled back (All-or-Nothing).',
        'Consistency: Preserves database invariants and integrity constraints before and after execution.',
        'Isolation: Concurrent transactions execute without interfering with one another.',
        'Durability: Committed updates survive system crashes and power failures via Write-Ahead Logging (WAL).',
        'Concurrency Anomalies: Dirty Read (reading uncommitted data), Non-repeatable Read (row changes mid-transaction), Phantom Read (new rows appear), Lost Update.',
        'Isolation Levels: Read Uncommitted -> Read Committed -> Repeatable Read -> Serializable.'
      ],
      industryReality: 'Payment gateways like Stripe and UPI rely on strict serializable transactions or distributed consensus (Raft/Paxos) to prevent double-spending.',
      engineeringTradeoff: 'Higher isolation levels (Serializable) prevent all anomalies but drastically reduce throughput due to lock contention.',
      commonMyth: '"Read Committed prevents all concurrency bugs." (False: Read Committed still allows Non-repeatable Reads and Phantom Reads).'
    },
    handsOnType: 'transaction-simulator',
    defaultQuery: 'BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 5000 WHERE acc_no = "ACC1001";\nUPDATE accounts SET balance = balance + 5000 WHERE acc_no = "ACC1002";\nCOMMIT;\n\nSELECT * FROM accounts WHERE acc_no IN ("ACC1001", "ACC1002");',
    challenges: [
      {
        id: 'txn-1',
        title: 'Atomic Bank Transfer',
        desc: 'Execute a transfer with BEGIN, UPDATE, and COMMIT, then verify balances.',
        sql: 'BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 1000 WHERE acc_no = "ACC1001";\nUPDATE accounts SET balance = balance + 1000 WHERE acc_no = "ACC1002";\nCOMMIT;\nSELECT * FROM accounts;'
      }
    ],
    quiz: [
      {
        question: 'Which concurrency phenomenon occurs when Transaction A reads data modified by Transaction B before B has committed, and B subsequently rolls back?',
        options: ['Non-repeatable Read', 'Phantom Read', 'Dirty Read', 'Lost Update'],
        answer: 2,
        explanation: 'A Dirty Read occurs when a transaction reads uncommitted changes that are subsequently rolled back.'
      }
    ]
  },
  {
    id: 11,
    title: 'Indexing & Physical Storage',
    tagline: 'B-Tree vs Full Table Scan',
    stage: 'Engineering & Internals',
    icon: 'Search',
    summary: 'Discover how B-Trees, Hash indexes, Clustered vs Non-Clustered indexes transform $O(N)$ sequential scans into $O(\log N)$ instant lookups.',
    theory: {
      why: 'Scanning 100 million rows sequentially from disk takes minutes; traversing a B-Tree index takes 3 disk page reads (under 2 milliseconds).',
      keyConcepts: [
        'Full Table Scan: Reads every single 8KB disk page of the relation sequentially.',
        'B-Tree Index: Balanced search tree storing sorted keys and row pointers (O(log N)).',
        'Clustered Index: Determines the actual physical order of rows on disk (exactly ONE per table, usually Primary Key).',
        'Non-Clustered (Secondary) Index: Separate structure containing sorted keys and pointers to clustered index rows.',
        'Composite Index: Index on multiple columns (e.g. `(department, salary)`); obeys the Leftmost Prefix Rule.',
        'Covering Index: Contains all columns requested by the SELECT query, completely bypassing table lookups.'
      ],
      industryReality: 'Over-indexing is a silent killer in high-frequency trading: each index requires synchronous disk writes on every INSERT and UPDATE.',
      engineeringTradeoff: 'Indexes accelerate SELECTs by orders of magnitude, but degrade INSERT, UPDATE, and DELETE throughput.',
      commonMyth: '"Putting an index on every single column makes the database fast." (Disastrous misconception: causes extreme write amplification).'
    },
    handsOnType: 'index-explorer',
    defaultQuery: 'EXPLAIN SELECT * FROM students WHERE marks > 85;',
    challenges: [
      {
        id: 'idx-1',
        title: 'Inspect Query Cost with EXPLAIN',
        desc: 'Run EXPLAIN on an unindexed filter query to inspect the estimated scan cost.',
        sql: 'EXPLAIN SELECT name, salary FROM employees WHERE department = "Engineering";'
      }
    ],
    quiz: [
      {
        question: 'Why can a relational table have only ONE Clustered Index?',
        options: [
          'Hardware limitation of SSDs',
          'Because the physical storage order of rows on disk can only be arranged in one sequence',
          'SQL standards limit index count',
          'Only primary keys can be indexed'
        ],
        answer: 1,
        explanation: 'Data rows themselves can only be sorted and stored in one physical order on disk blocks.'
      }
    ]
  },
  {
    id: 12,
    title: 'Query Optimization',
    tagline: 'Make This Query 10x Better',
    stage: 'Engineering & Internals',
    icon: 'Gauge',
    summary: 'Understand the Query Planner, execution plans, cost estimation, sargable predicates, and fixing common SQL performance anti-patterns.',
    theory: {
      why: 'Writing semantically correct SQL is not enough. Bad queries can exhaust server RAM and lock entire tables during business peak hours.',
      keyConcepts: [
        'Query Lifecycle: Parser -> Rewriter -> Cost-Based Optimizer (CBO) -> Execution Engine.',
        'Sargable Predicates (Search Argument Able): Writing conditions that leverage indexes (e.g. `created_at >= "2024-01-01"` instead of `YEAR(created_at) = 2024`).',
        'Avoiding SELECT *: Fetching only necessary columns reduces memory, network serialization, and disk I/O.',
        'Join Order Optimization: Ordering joins so smaller filtered tables are probed first.',
        'Anti-patterns: Leading wildcards (`LIKE "%abc"`), functions on indexed columns, implicit type casting.'
      ],
      industryReality: 'In production incident post-mortems, 80% of database outages stem from missing indexes or un-sargable query predicates.',
      engineeringTradeoff: 'Heuristic-based optimization is fast to plan; Cost-Based Optimization takes milliseconds to evaluate permutations but produces superior query plans.',
      commonMyth: '"The database optimizer will always fix bad SQL for you." (If you apply functions to indexed columns, no optimizer can use the index).'
    },
    handsOnType: 'query-optimizer',
    defaultQuery: '-- Anti-pattern: SELECT * with unindexed wildcard\nEXPLAIN SELECT * FROM orders WHERE status = "DELIVERED";',
    challenges: [
      {
        id: 'opt-1',
        title: 'Optimize Selective Projection',
        desc: 'Replace SELECT * with explicit column projection and examine the execution plan.',
        sql: 'EXPLAIN SELECT order_id, customer_name, amount FROM orders WHERE amount > 20000;'
      }
    ],
    quiz: [
      {
        question: 'Which of the following WHERE clauses is NON-SARGABLE (cannot utilize an index on birth_date)?',
        options: [
          'WHERE birth_date >= "2000-01-01"',
          'WHERE YEAR(birth_date) = 2000',
          'WHERE birth_date BETWEEN "2000-01-01" AND "2000-12-31"',
          'WHERE birth_date = "2000-05-15"'
        ],
        answer: 1,
        explanation: 'Wrapping the indexed column in a function `YEAR(birth_date)` prevents the B-Tree index from performing direct binary lookups.'
      }
    ]
  },
  {
    id: 13,
    title: 'Database Security & SQL Injection',
    tagline: 'Security Sandbox & Exploit Defense',
    stage: 'Engineering & Internals',
    icon: 'Lock',
    summary: 'Attack an intentionally vulnerable login query using SQL injection (\' OR \'1\'=\'1), inspect exposed data, and secure it with Parameterized Queries and RBAC.',
    theory: {
      why: 'SQL Injection has remained on the OWASP Top 10 for over two decades. A single unescaped string concatenation can dump an entire database of customer passwords.',
      keyConcepts: [
        'SQL Injection (SQLi): Malicious input manipulating the syntactic AST of the query.',
        'Parameterized Queries (Prepared Statements): Separates query code structure from user data literals.',
        'Role-Based Access Control (RBAC): Least privilege principle using GRANT and REVOKE.',
        'Data at Rest & In Transit: Transparent Data Encryption (TDE) and TLS wire encryption.',
        'Auditing: Logging sensitive schema alterations and data read access patterns.'
      ],
      industryReality: 'Famous breaches (Sony, Equifax, TalkTalk) were traced directly to SQL injection vulnerabilities in legacy web endpoints.',
      engineeringTradeoff: 'Prepared statements eliminate SQL injection entirely with zero runtime penalty because query compilation is cached.',
      commonMyth: '"Escaping quotes with regex is enough to prevent SQL injection." (Dangerous myth: Character encoding mismatches and second-order SQLi can bypass regex).'
    },
    handsOnType: 'security-sandbox',
    defaultQuery: '-- Explore the interactive SQL Injection lab tab!\nSELECT * FROM accounts WHERE status = "ACTIVE";',
    challenges: [
      {
        id: 'sec-1',
        title: 'Inspect Account Privileges',
        desc: 'Review accounts with high security balances and active statuses.',
        sql: 'SELECT acc_no, customer_name, status FROM accounts WHERE status = "ACTIVE";'
      }
    ],
    quiz: [
      {
        question: 'What is the definitive, industry-standard mechanism to prevent SQL Injection vulnerabilities?',
        options: [
          'Client-side HTML input validation',
          'Using Parameterized Queries (Prepared Statements)',
          'Blacklisting the word OR in form inputs',
          'Disabling the database port'
        ],
        answer: 1,
        explanation: 'Parameterized queries compile the query AST beforehand, treating all user parameters purely as raw literal values.'
      }
    ]
  },
  {
    id: 14,
    title: 'Database Programming',
    tagline: 'Connecting with Java, Python & Node.js',
    stage: 'Engineering & Internals',
    icon: 'Code',
    summary: 'Bridge databases with application runtimes: Java JDBC, Python psycopg2/sqlite3, Node.js postgres, connection pooling, and ORM mechanics.',
    theory: {
      why: 'Databases do not exist in isolation; full-stack applications communicate with them via standardized wire protocols and connection drivers.',
      keyConcepts: [
        'Database Drivers: Protocol translators (e.g. JDBC, pgwire) between language runtimes and DB servers.',
        'Connection Pooling (HikariCP, PgBouncer): Reusing expensive TCP socket handshakes and authentication.',
        'Object-Relational Mapping (ORM): Hibernate, Prisma, SQLAlchemy mapping table rows to OOP objects.',
        'N+1 Query Problem: Executing one query for parents and N subsequent queries for children, crippling network latency.',
        'Prepared Statement Caching: Pre-compiling query plans across worker threads.'
      ],
      industryReality: 'HikariCP connection pool exhaustion during traffic surges is one of the most frequent root causes of microservice cascading failures.',
      engineeringTradeoff: 'ORMs accelerate developer velocity, but frequently generate un-optimized SQL queries compared to raw SQL query builders.',
      commonMyth: '"ORMs make knowing SQL obsolete." (Senior engineers spend enormous time tuning bad SQL generated by ORMs).'
    },
    handsOnType: 'programming-lab',
    defaultQuery: 'SELECT s.name, c.title, e.grade\nFROM enrollments e\nJOIN students s ON e.student_id = s.id\nJOIN courses c ON e.course_id = c.course_id;',
    challenges: [
      {
        id: 'prog-1',
        title: 'Student Course Report API Query',
        desc: 'Retrieve course enrollments and grades for student Aarav Sharma (id: 101).',
        sql: 'SELECT s.name, c.title, e.grade, e.score FROM enrollments e JOIN students s ON e.student_id = s.id JOIN courses c ON e.course_id = c.course_id WHERE s.id = 101;'
      }
    ],
    quiz: [
      {
        question: 'What serious performance issue occurs when an application fetches 100 author records and then executes 100 individual queries to fetch their books?',
        options: ['Dirty Read', 'The N+1 Query Problem', 'Cascading Rollback', 'Deadlock'],
        answer: 1,
        explanation: 'The N+1 query problem executes 1 initial query plus N supplementary queries, causing severe network and database overhead.'
      }
    ]
  },
  {
    id: 15,
    title: 'Databases Across The Industry',
    tagline: 'Relational, Document, Key-Value & Graph',
    stage: 'Modern Databases',
    icon: 'Server',
    summary: 'Survey the modern database landscape: PostgreSQL, MySQL, Oracle, MongoDB, Redis, Cassandra, Neo4j, and Serverless Cloud engines.',
    theory: {
      why: 'No single database fits every workload. Polyglot Persistence means choosing the right database paradigm for the specific access pattern.',
      keyConcepts: [
        'Relational (RDBMS): PostgreSQL, MySQL, Oracle, SQLite — ACID, structured schemas, complex joins.',
        'Document (NoSQL): MongoDB, Couchbase — JSON semi-structured documents, flexible polymorphic schemas.',
        'Key-Value: Redis, AWS DynamoDB — sub-millisecond memory caching, session storage, counters.',
        'Wide-Column: Apache Cassandra, ScyllaDB — massive append-heavy time-series, multi-datacenter replication.',
        'Graph: Neo4j, Amazon Neptune — nodes, edges, social networks, fraud rings, recommendation engines.'
      ],
      industryReality: 'Modern platforms like Uber and Netflix run PostgreSQL for accounts, Redis for real-time driver coordinates, and Cassandra for trip telemetry.',
      engineeringTradeoff: 'Relational databases provide rock-solid ACID transactions; NoSQL sacrifices joins to scale horizontally across hundreds of commodity servers.',
      commonMyth: '"NoSQL completely replaced SQL." (SQL remains the undisputed dominant data engine worldwide, with PostgreSQL leading developer adoption).'
    },
    handsOnType: 'sql-lab',
    defaultQuery: 'SELECT * FROM orders WHERE status = "DELIVERED";',
    challenges: [
      {
        id: 'ind-1',
        title: 'Order Status Query',
        desc: 'Query all delivered orders and calculate the total sales amount.',
        sql: 'SELECT status, COUNT(*) AS count, SUM(amount) AS total_revenue FROM orders GROUP BY status;'
      }
    ],
    quiz: [
      {
        question: 'Which database type is optimal for traversing complex relationship networks like social friends, recommendation graphs, and fraud rings?',
        options: ['Key-Value Store', 'Graph Database', 'Document Store', 'Wide-Column Store'],
        answer: 1,
        explanation: 'Graph databases store edges as first-class citizens, enabling $O(1)$ index-free adjacency graph traversals.'
      }
    ]
  },
  {
    id: 16,
    title: 'Database Comparison Engine',
    tagline: 'Interactive Trade-Off Matrix',
    stage: 'Modern Databases',
    icon: 'Scale',
    summary: 'Filter and compare top database engines (MySQL, PostgreSQL, Oracle, SQL Server, MongoDB, Redis, Cassandra, Neo4j) across 10 engineering dimensions.',
    theory: {
      why: 'Engineers must learn the fundamental concepts first, and product brands second. Technology choices must be grounded in trade-offs.',
      keyConcepts: [
        'Data Model: Relational Table vs JSON BSON vs Key-Value vs Graph Node-Edge vs Wide-Column.',
        'Transaction Support: Strict ACID vs Eventual Consistency vs Tunable Consistency.',
        'Horizontal vs Vertical Scalability: Scale up (bigger RAM/CPU) vs Scale out (adding server nodes).',
        'Query Language: ANSI SQL vs PromQL vs Cypher vs MQL vs Redis CLI.',
        'Primary Production Use Cases: Financial ledger vs User sessions vs Chat history vs Social graphs.'
      ],
      industryReality: 'Companies fail when they pick trendy databases without understanding operational overhead, backup tooling, and memory requirements.',
      engineeringTradeoff: 'PostgreSQL excels at analytical flexibility and extensions; Redis excels at microsecond in-memory caching.',
      commonMyth: '"PostgreSQL is only for small startups." (PostgreSQL powers critical services at Apple, Instagram, Spotify, and Reddit).'
    },
    handsOnType: 'comparison-engine',
    defaultQuery: 'SELECT * FROM departments;',
    challenges: [
      {
        id: 'comp-1',
        title: 'Inspect Department Budgets',
        desc: 'Review high-budget departments and their allocated blocks.',
        sql: 'SELECT dept_name, budget FROM departments WHERE budget >= 3500000 ORDER BY budget DESC;'
      }
    ],
    quiz: [
      {
        question: 'Which database provides sub-millisecond in-memory key-value operations commonly used for caching and leaderboards?',
        options: ['Apache Cassandra', 'Redis', 'Oracle Database', 'Neo4j'],
        answer: 1,
        explanation: 'Redis is an in-memory data structure store offering sub-millisecond read/write latency.'
      }
    ]
  },
  {
    id: 17,
    title: 'Database in Real Industry',
    tagline: 'Architecture Case Studies Across 8 Sectors',
    stage: 'Modern Databases',
    icon: 'Building2',
    summary: 'Explore production database architectures across Banking, E-Commerce, Healthcare, Education, Aviation, Telecom, Social Media, and Logistics.',
    theory: {
      why: 'The highest differentiator of a senior database engineer is knowing how domain business rules shape data modeling and database topologies.',
      keyConcepts: [
        'Banking Architecture: Immutable ledger, double-entry bookkeeping, strict ACID, zero data loss.',
        'E-Commerce Architecture: High read inventory catalogs, optimistic locking on checkout, payment webhooks.',
        'Healthcare: HIPAA compliance, audit trails, temporal tables for patient medical history.',
        'Aviation: Global seat reservation inventory, distributed 2PC or Saga patterns across partner airlines.',
        'Logistics & Telecom: High-throughput ingestion of GPS location pings and call data records (CDRs).'
      ],
      industryReality: 'In fintech ledgers, records are NEVER updated or deleted. You only insert offsetting reversal entries.',
      engineeringTradeoff: 'Event-driven architectures (Kafka + Read Replicas) decouple writes from reads but introduce eventual consistency replication lag.',
      commonMyth: '"Banks store balance as a simple mutable integer in a table." (Never: Balance is calculated from an immutable audit trail of debit/credit transactions).'
    },
    handsOnType: 'industry-case-study',
    defaultQuery: 'SELECT o.order_id, o.customer_name, o.product_name, o.amount, o.status\nFROM orders o\nWHERE o.amount > 10000\nORDER BY o.amount DESC;',
    challenges: [
      {
        id: 'ind-case-1',
        title: 'Audit Pending Orders',
        desc: 'Find all orders in PROCESSING or CANCELLED status.',
        sql: 'SELECT order_id, customer_name, amount, status FROM orders WHERE status IN ("PROCESSING", "CANCELLED");'
      }
    ],
    quiz: [
      {
        question: 'Why do production financial banking ledgers prohibit SQL UPDATE and DELETE statements on transaction rows?',
        options: [
          'To save CPU cycles',
          'To ensure full regulatory auditability and tamper-proof immutable double-entry bookkeeping',
          'SQL engines do not support updates on money columns',
          'Disk storage is free'
        ],
        answer: 1,
        explanation: 'Financial ledgers require immutable audit logs; mistakes are corrected via compensatory offset transactions.'
      }
    ]
  },
  {
    id: 18,
    title: 'Database Evolution',
    tagline: 'Visual Timeline: 1960s Files to 2026 AI Vectors',
    stage: 'Modern Databases',
    icon: 'History',
    summary: 'Traverse the visual timeline: Flat Files -> Hierarchical -> Network -> Relational -> NoSQL -> Distributed Cloud -> Serverless & Vector DBs.',
    theory: {
      why: '"Technology evolves because the problems evolve." Understanding the evolutionary pressures reveals why modern databases were engineered.',
      keyConcepts: [
        '1960s Flat Files & Hierarchical (IBM IMS): Tree structures, rigid pointer navigation.',
        '1970s Relational Revolution: Edgar Codd & System R — declarative SQL, relational algebra.',
        '1980s Commercial RDBMS Boom: Oracle, SQL Server, IBM DB2.',
        '2000s Big Data & NoSQL Wave: Google Bigtable, Amazon Dynamo, MongoDB, Cassandra tackling web-scale.',
        '2010s NewSQL & Cloud-Native: Google Spanner (TrueTime), CockroachDB, AWS Aurora.',
        '2020s AI & Vector Databases: Milvus, Pinecone, pgvector embeddings for Large Language Models.'
      ],
      industryReality: 'Today, PostgreSQL with `pgvector` allows engineers to store both relational customer accounts and 1536-dimensional AI vector embeddings in one unified database.',
      engineeringTradeoff: 'Specialized vector databases offer faster approximate nearest neighbor (HNSW/IVFFlat) indexes, but require maintaining another distributed system.',
      commonMyth: '"Vector databases replace relational databases." (Vector DBs complement relational systems by powering semantic search and LLM context retrieval).'
    },
    handsOnType: 'evolution-timeline',
    defaultQuery: 'SELECT * FROM courses;',
    challenges: [
      {
        id: 'evo-1',
        title: 'Review Course Catalog',
        desc: 'List courses that carry 4 credits.',
        sql: 'SELECT course_id, title, dept_id FROM courses WHERE credits = 4;'
      }
    ],
    quiz: [
      {
        question: 'What hardware technology does Google Spanner utilize to provide globally synchronized ACID transactions without distributed locks?',
        options: ['Quantum CPUs', 'TrueTime API with GPS and Atomic Clocks', 'Pure SSD Caching', 'Optical Fiber Ring'],
        answer: 1,
        explanation: 'Google Spanner uses TrueTime (GPS receivers and atomic clocks) to establish bounded uncertainty in global time.'
      }
    ]
  },
  {
    id: 19,
    title: 'Database Architecture & Distributed Systems',
    tagline: 'CAP Theorem, Sharding & Replication',
    stage: 'Engineering & Internals',
    icon: 'Share2',
    summary: 'Master distributed systems fundamentals: Replication (Master-Replica), Sharding, Partitioning, Load Balancing, and the CAP Theorem.',
    theory: {
      why: 'When data exceeds what a single server can hold, or when you need zero downtime during data center failures, distributed databases are required.',
      keyConcepts: [
        'Master-Replica Replication: Primary handles writes and streams binlogs to replicas for read scalability.',
        'Sharding (Horizontal Partitioning): Distributing rows across separate server nodes based on a Shard Key.',
        'CAP Theorem: In the presence of a Network Partition (P), a distributed system must choose between Consistency (C) or Availability (A).',
        'PACELC Theorem: If Partition, choose A or C; Else, choose Latency (L) or Consistency (C).',
        'Connection Pooling: Reusing established TCP connections to prevent thread exhaustion.'
      ],
      industryReality: 'Amazon DynamoDB prioritizes Availability (AP) during partitions so customer shopping carts never fail, reconciling items later.',
      engineeringTradeoff: 'Consistent hashing avoids full rehashing during cluster node additions, but hot partition keys can create skew.',
      commonMyth: '"You can build a system with 100% C, 100% A, and 100% P simultaneously." (Mathematically proven impossible by Eric Brewer).'
    },
    handsOnType: 'architecture-cap',
    defaultQuery: 'SELECT * FROM employees WHERE department = "Engineering";',
    challenges: [
      {
        id: 'cap-1',
        title: 'Engineering Department Payroll',
        desc: 'Select total salary payout for the Engineering department.',
        sql: 'SELECT department, SUM(salary) AS total_payroll FROM employees WHERE department = "Engineering" GROUP BY department;'
      }
    ],
    quiz: [
      {
        question: 'According to the CAP Theorem, when a network partition occurs between data centers, what choice must a distributed database make?',
        options: [
          'It can guarantee both Consistency and Availability without compromise',
          'It must sacrifice either Consistency or Availability',
          'It must immediately drop the database',
          'It must switch from SQL to NoSQL'
        ],
        answer: 1,
        explanation: 'During a network partition, you can either accept writes (giving up consistency) or reject writes (giving up availability).'
      }
    ]
  },
  {
    id: 20,
    title: 'NoSQL Deep Dive',
    tagline: 'Document, Key-Value, Graph & Wide Column',
    stage: 'Modern Databases',
    icon: 'FileJson',
    summary: 'Solve the same application problem (e-commerce catalog, user reviews, order history) across MongoDB, Redis, Neo4j, and Cassandra.',
    theory: {
      why: 'Experiencing how different database paradigms store and query identical datasets cements your ability to architect modern multi-model backends.',
      keyConcepts: [
        'Document Store (MongoDB): Nested JSON objects, schema flexibility, expressive aggregation pipeline.',
        'Key-Value Store (Redis): O(1) lookups by string key, in-memory data structures (Hashes, Sets, Sorted Sets).',
        'Graph Database (Neo4j): Pointer-based traversing of connected nodes and relationships without foreign key joins.',
        'Wide-Column Store (Cassandra): Partition key + Clustering column for predictable distributed sequential write performance.'
      ],
      industryReality: 'In high-scale social feeds, user profiles live in MongoDB, friends graph lives in Neo4j, and home timelines live in Redis lists.',
      engineeringTradeoff: 'Denormalizing in MongoDB makes reads instantaneous with zero joins, but requires updating multiple documents when shared data changes.',
      commonMyth: '"NoSQL databases have no schema." (They have Schema-on-Read, meaning application code must validate data integrity).'
    },
    handsOnType: 'nosql-workbench',
    defaultQuery: 'SELECT * FROM orders;',
    challenges: [
      {
        id: 'nosql-1',
        title: 'Inspect Order Pipeline',
        desc: 'List orders grouped by delivery city.',
        sql: 'SELECT city, COUNT(*) AS orders_count FROM orders GROUP BY city;'
      }
    ],
    quiz: [
      {
        question: 'What is a key difference between Schema-on-Write (RDBMS) and Schema-on-Read (Document NoSQL)?',
        options: [
          'Schema-on-Write checks constraints when inserting data, while Schema-on-Read interprets data structure when querying',
          'Schema-on-Read is only used in Python',
          'Schema-on-Write cannot store integers',
          'There is no difference'
        ],
        answer: 0,
        explanation: 'RDBMS validates types and constraints upon INSERT (Schema-on-Write), whereas Document stores leave interpretation to application queries.'
      }
    ]
  },
  {
    id: 21,
    title: 'Database Engineering',
    tagline: 'Backups, High Availability & Migration Pipelines',
    stage: 'Engineering & Internals',
    icon: 'Wrench',
    summary: 'Master production database operations: WAL archiving, Point-In-Time Recovery (PITR), schema migration tools (Flyway, Liquibase), and zero-downtime deployments.',
    theory: {
      why: 'Writing queries is only 20% of database engineering; keeping production databases online, secure, and recoverable during hardware failures is the other 80%.',
      keyConcepts: [
        'Backup Types: Full physical snapshot, differential backup, incremental WAL (Write-Ahead Log) archiving.',
        'Point-In-Time Recovery (PITR): Restoring a base backup and replaying WAL logs up to the exact second before a catastrophic DROP TABLE.',
        'High Availability (HA): Automatic failover via consensus algorithms (Patroni, Raft).',
        'Database Migrations: Version-controlled schema DDL scripts (Flyway, Prisma Migrate, Liquibase).',
        'Zero-Downtime Schema Changes: Adding nullable columns or dual-writing before deprecating old columns.'
      ],
      industryReality: 'A backup that has never been tested in a live restore drill is NOT a backup. Reliable companies run automated weekly disaster recovery simulations.',
      engineeringTradeoff: 'Synchronous replication guarantees zero data loss (RPO = 0) at the expense of higher write latency; asynchronous replication is faster but risks slight data loss during unexpected failover.',
      commonMyth: '"RAID disk redundancy replaces the need for database backups." (RAID protects against physical drive failure, not human error, ransomware, or logical corruption).'
    },
    handsOnType: 'sql-lab',
    defaultQuery: 'SELECT * FROM accounts;',
    challenges: [
      {
        id: 'eng-1',
        title: 'Audit System Accounts',
        desc: 'Query frozen or suspicious accounts.',
        sql: 'SELECT acc_no, customer_name, balance FROM accounts WHERE status = "FROZEN";'
      }
    ],
    quiz: [
      {
        question: 'What capability enables a DBA to restore a database to the exact state it was in at 02:47:15 PM immediately prior to an erroneous command?',
        options: ['RAID 5', 'Point-In-Time Recovery (PITR) with WAL replay', 'Foreign Key Cascades', 'Query Caching'],
        answer: 1,
        explanation: 'Point-In-Time Recovery combines a base physical backup with WAL replay up to the desired target timestamp.'
      }
    ]
  },
  {
    id: 22,
    title: 'Real Projects',
    tagline: '10 Major Production Database Implementations',
    stage: 'Projects & Showcase',
    icon: 'Briefcase',
    summary: 'Build and explore 10 complete production-grade database systems: Student Management, Hospital, Banking, E-Commerce, Food Delivery, and Enterprise ERP.',
    theory: {
      why: 'Industry employers hire engineers who demonstrate real-world schema design, indexing strategies, and complex query implementation on enterprise datasets.',
      keyConcepts: [
        '10 Guided Projects with complete DDL schemas, ER diagrams, analytical queries, and sample datasets.',
        'Production schemas covering B2C, FinTech, Healthcare, Logistics, and SaaS Multi-Tenancy.',
        'Index design strategies tailored for high read vs high write workloads.',
        'Integrity constraints and business rule enforcement directly in the database engine.'
      ],
      industryReality: 'Interviewers will ask you to defend your schema decisions: "Why did you choose a junction table here?" or "Why did you index these two columns together?".',
      engineeringTradeoff: 'Designing for immediate flexibility vs optimal indexing for current query patterns.',
      commonMyth: '"College toy schemas are sufficient for senior portfolio reviews." (Real enterprise schemas require handling soft deletes, temporal audit timestamps, and status enums).'
    },
    handsOnType: 'projects-hub',
    defaultQuery: '-- Select and explore any of the 10 Real Projects in the tab!\nSELECT * FROM orders;',
    challenges: [
      {
        id: 'proj-1',
        title: 'Analyze High-Value Customers',
        desc: 'Aggregate order amounts by customer.',
        sql: 'SELECT customer_name, COUNT(*) AS total_orders, SUM(amount) AS total_spent\nFROM orders\nGROUP BY customer_name\nORDER BY total_spent DESC;'
      }
    ],
    quiz: [
      {
        question: 'In a production E-Commerce database, why should order line items store the snapshot price of the product at purchase time rather than referencing current product price?',
        options: [
          'To save storage',
          'Because if the product price changes in the future, past order historical records and accounting invoices must not be altered',
          'Foreign keys cannot reference decimal fields',
          'It is required by 1NF'
        ],
        answer: 1,
        explanation: 'Orders must preserve immutable historical transaction prices for accounting and legal integrity.'
      }
    ]
  },
  {
    id: 23,
    title: 'Placement Preparation',
    tagline: '100+ SQL Coding Questions & Top Interview FAQs',
    stage: 'Placement Prep',
    icon: 'GraduationCap',
    summary: 'Master 100+ SQL interview challenges across Basic, Intermediate, Advanced, and Expert tiers, plus top interview theory FAQs from TCS, Infosys, Wipro, and Product Startups.',
    theory: {
      why: 'Placement technical screening rounds universally test SQL query writing (joins, group by having, subqueries, ranking) and DBMS fundamentals.',
      keyConcepts: [
        'Top Placement FAQs: DELETE vs TRUNCATE vs DROP, WHERE vs HAVING, UNION vs UNION ALL, Primary Key vs Unique Key.',
        'Classic Interview Queries: N-th highest salary, duplicate record detection, finding employees with no manager, department-wise top performers.',
        'Indexing & ACID interview traps: Explaining dirty reads, isolation levels, and why an index might not be used.',
        'Company specific problem banks: TCS Digital, Infosys SP/DSE, Cognizant, Accenture, Deloitte, Amazon.'
      ],
      industryReality: 'In 90% of technical screening rounds, candidates who write working SQL without relying on GUI tools pass directly to the technical interview.',
      engineeringTradeoff: 'Writing clean, readable ANSI SQL is favored by interviewers over engine-specific proprietary syntax.',
      commonMyth: '"UNION and UNION ALL are interchangeable." (UNION performs an expensive sorting deduplication; UNION ALL simply concatenates result sets).'
    },
    handsOnType: 'placement-challenge',
    defaultQuery: '-- Placement Question: Find second highest salary\nSELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);',
    challenges: [
      {
        id: 'prep-1',
        title: 'Find Departments with No Professors',
        desc: 'Find any department that currently has no assigned professors using a LEFT JOIN.',
        sql: 'SELECT d.dept_id, d.dept_name\nFROM departments d\nLEFT JOIN professors p ON d.dept_id = p.dept_id\nWHERE p.prof_id IS NULL;'
      }
    ],
    quiz: [
      {
        question: 'What is the key performance difference between UNION and UNION ALL?',
        options: [
          'UNION is faster because it removes duplicates',
          'UNION ALL is faster because it does NOT perform duplicate elimination or sorting',
          'They have identical performance',
          'UNION ALL can only be used on numerical tables'
        ],
        answer: 1,
        explanation: 'UNION ALL avoids the CPU and memory cost of hashing/sorting to eliminate duplicate records.'
      }
    ]
  },
  {
    id: 24,
    title: 'Interview Simulator',
    tagline: '7 Interactive Rounds + AI Database Interviewer',
    stage: 'Placement Prep',
    icon: 'MessageSquareCheck',
    summary: 'Experience simulated technical interview rounds: DBMS Fundamentals, SQL Coding, Query Solving, Database Design, Performance Tuning, System Design, and Industry Scenarios.',
    theory: {
      why: 'Practicing under simulated interview pressure transforms passive theoretical knowledge into fluent, confident verbal and technical articulation.',
      keyConcepts: [
        'Round 1: DBMS Fundamentals (Why DBMS, File Systems, Architecture).',
        'Round 2: SQL Mastery (Aggregations, Joins, Subqueries).',
        'Round 3: Query Solving & Edge Cases (Handling NULLs, second highest, ties).',
        'Round 4: Database Design & Normalization (Schema modeling, anomalies).',
        'Round 5: Performance Tuning (Indexing, EXPLAIN plans, query rewrites).',
        'Round 6: System Design (Sharding, Caching with Redis, CAP theorem).',
        'Round 7: Industry Scenario (Disaster recovery, bank transfer crash, high concurrency).'
      ],
      industryReality: 'Senior interviewers evaluate not just the final query, but whether you ask clarifying questions about data scale, NULL values, and index availability.',
      engineeringTradeoff: 'Interviewers look for candidates who understand that there is rarely one single perfect answer; every architecture involves tradeoffs.',
      commonMyth: '"Interviewers only care about getting any output." (Interviewers judge query efficiency, sargability, and edge-case handling).'
    },
    handsOnType: 'interview-simulator',
    defaultQuery: 'SELECT * FROM employees ORDER BY salary DESC LIMIT 5;',
    challenges: [
      {
        id: 'sim-1',
        title: 'Interview Query Challenge',
        desc: 'Find top 3 highest paid employees in Engineering department.',
        sql: 'SELECT name, salary FROM employees WHERE department = "Engineering" ORDER BY salary DESC LIMIT 3;'
      }
    ],
    quiz: [
      {
        question: 'During a system design interview, if asked how to handle 100,000 read requests per second on a product catalog, what is the best first recommendation?',
        options: [
          'Shard the relational primary database immediately',
          'Implement an in-memory cache layer (e.g. Redis) and read replicas',
          'Delete historical orders',
          'Disable foreign key constraints'
        ],
        answer: 1,
        explanation: 'Caching frequent reads in Redis and distributing reads to read-replicas offloads the primary database without complex sharding.'
      }
    ]
  },
  {
    id: 25,
    title: 'DBMS Placement Readiness Index',
    tagline: 'Zero-To-Infinity Benchmark & Industry Readiness',
    stage: 'Placement Prep',
    icon: 'Award',
    summary: 'Comprehensive evaluation across 8 dimensions (Theory, SQL, Design, Normalization, Optimization, Transactions, NoSQL, Projects). Unlock your Industry Readiness Certificate!',
    theory: {
      why: 'The ultimate culmination of your Zero-To-Infinity journey: a quantifiable, verifiable index proving your readiness to step into industry as a Database Engineer.',
      keyConcepts: [
        '8 Evaluation Dimensions: Theory, SQL, Database Design, Normalization, Optimization, Transactions, NoSQL, Projects.',
        'Readiness Levels: Bronze -> Silver -> Gold -> Platinum -> Industry Ready -> Database Engineer Ready.',
        'Automated Learning Intelligence Report highlighting personal strengths and actionable weaknesses.',
        'Verifiable Industry Readiness Certificate with QR verification under SarlaYash Mission Productions.'
      ],
      industryReality: 'Recruiters and hiring managers value concrete portfolios with verifiable certificates, demonstrable projects, and benchmarked readiness scores.',
      engineeringTradeoff: 'Continuous evaluation allows targeted reinforcement of weak concept areas before facing real interviewers.',
      commonMyth: '"Passing one MCQ test proves you are industry-ready." (True readiness requires hands-on query writing, optimization, and system design capability).'
    },
    handsOnType: 'readiness-index',
    defaultQuery: 'SELECT "ZERO-TO-INFINITY COMPLETE!" AS journey_status, 100 AS readiness_percentage;',
    challenges: [
      {
        id: 'ready-1',
        title: 'Benchmark Query Run',
        desc: 'Run a complex join and aggregation benchmark to finalize your portfolio stats.',
        sql: 'SELECT d.dept_name, COUNT(p.prof_id) AS total_faculty, AVG(p.salary) AS avg_faculty_sal\nFROM departments d\nLEFT JOIN professors p ON d.dept_id = p.dept_id\nGROUP BY d.dept_name;'
      }
    ],
    quiz: [
      {
        question: 'What is the core philosophy of the SarlaYash Zero-To-Infinity DBMS Journey?',
        options: [
          '100% Theory with no practice',
          'Learn -> Practice -> Build -> Assess -> Earn -> Showcase (25% Theory + 75% Hands-On)',
          'Only memorize SQL syntax',
          'Install heavy commercial database servers'
        ],
        answer: 1,
        explanation: 'The core philosophy is Learn -> Practice -> Build -> Assess -> Earn -> Showcase with 25% theory and 75% browser-based hands-on practice.'
      }
    ]
  }
];
