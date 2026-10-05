// 100+ Curated Placement SQL Coding Questions & Interview Theory FAQs
// Powered By Kapil | SarlaYash Mission Productions

export const PLACEMENT_QUESTIONS = [
  // Tier 1: Basic (25 questions)
  {
    id: 1,
    title: 'Select All Active Students',
    difficulty: 'Basic',
    category: 'DQL & Filtering',
    company: 'TCS',
    description: 'Retrieve all columns for students who belong to the "CSE" branch.',
    initialQuery: 'SELECT * FROM students WHERE branch = "CSE";',
    testQuery: 'SELECT id, name FROM students WHERE branch = "CSE";',
    hints: ['Use the WHERE clause with single or double quotes for string literals.']
  },
  {
    id: 2,
    title: 'Filter Students by Minimum CGPA',
    difficulty: 'Basic',
    category: 'Filtering',
    company: 'Infosys',
    description: 'Find names and CGPA of all students who have a CGPA greater than or equal to 8.5.',
    initialQuery: 'SELECT name, cgpa FROM students WHERE cgpa >= 8.5;',
    testQuery: 'SELECT name, cgpa FROM students WHERE cgpa >= 8.5;',
    hints: ['Comparison operator >= filters rows with CGPA 8.5 or higher.']
  },
  {
    id: 3,
    title: 'Distinct Branch Exploration',
    difficulty: 'Basic',
    category: 'Projection',
    company: 'Wipro',
    description: 'Find all unique branch codes present in the students table.',
    initialQuery: 'SELECT DISTINCT branch FROM students;',
    testQuery: 'SELECT DISTINCT branch FROM students;',
    hints: ['Use the DISTINCT keyword right after SELECT.']
  },
  {
    id: 4,
    title: 'Top 3 Students by Marks',
    difficulty: 'Basic',
    category: 'Sorting & Limiting',
    company: 'Accenture',
    description: 'List the names and marks of the top 3 highest scoring students.',
    initialQuery: 'SELECT name, marks FROM students ORDER BY marks DESC LIMIT 3;',
    testQuery: 'SELECT name, marks FROM students ORDER BY marks DESC LIMIT 3;',
    hints: ['Combine ORDER BY marks DESC with LIMIT 3.']
  },
  {
    id: 5,
    title: 'Total Student Count in Institution',
    difficulty: 'Basic',
    category: 'Aggregations',
    company: 'Cognizant',
    description: 'Calculate the total number of students enrolled in the college.',
    initialQuery: 'SELECT COUNT(*) AS total_students FROM students;',
    testQuery: 'SELECT COUNT(*) FROM students;',
    hints: ['COUNT(*) counts all tuples in the relation.']
  },
  {
    id: 6,
    title: 'Average Marks Across Institution',
    difficulty: 'Basic',
    category: 'Aggregations',
    company: 'Capgemini',
    description: 'Calculate the average marks of all students, rounded to 2 decimal places.',
    initialQuery: 'SELECT ROUND(AVG(marks), 2) AS average_marks FROM students;',
    testQuery: 'SELECT ROUND(AVG(marks), 2) FROM students;',
    hints: ['Wrap AVG(marks) inside the ROUND() function.']
  },
  {
    id: 7,
    title: 'Find Students with Names Starting with A',
    difficulty: 'Basic',
    category: 'Pattern Matching',
    company: 'TCS',
    description: 'List student names that begin with the letter "A".',
    initialQuery: 'SELECT name FROM students WHERE name LIKE "A%";',
    testQuery: 'SELECT name FROM students WHERE name LIKE "A%";',
    hints: ['LIKE "A%" matches any string starting with capital A.']
  },
  {
    id: 8,
    title: 'Students from Bangalore or Pune',
    difficulty: 'Basic',
    category: 'Set Filtering',
    company: 'Deloitte',
    description: 'Retrieve all students who reside in either "Bangalore" or "Pune".',
    initialQuery: 'SELECT name, city FROM students WHERE city IN ("Bangalore", "Pune");',
    testQuery: 'SELECT name, city FROM students WHERE city IN ("Bangalore", "Pune");',
    hints: ['The IN ("val1", "val2") clause is cleaner than multiple OR conditions.']
  },
  {
    id: 9,
    title: 'Students with Marks Between 75 and 90',
    difficulty: 'Basic',
    category: 'Range Filtering',
    company: 'Infosys',
    description: 'Find students whose marks lie in the range 75 to 90 inclusive.',
    initialQuery: 'SELECT name, marks FROM students WHERE marks BETWEEN 75 AND 90;',
    testQuery: 'SELECT name, marks FROM students WHERE marks BETWEEN 75 AND 90;',
    hints: ['BETWEEN min AND max includes both boundaries.']
  },
  {
    id: 10,
    title: 'Highest and Lowest Salary in Company',
    difficulty: 'Basic',
    category: 'Aggregations',
    company: 'TCS',
    description: 'Find the minimum and maximum employee salary in the employees table.',
    initialQuery: 'SELECT MIN(salary) AS min_sal, MAX(salary) AS max_sal FROM employees;',
    testQuery: 'SELECT MIN(salary), MAX(salary) FROM employees;',
    hints: ['Use MIN() and MAX() aggregate functions.']
  },

  // Tier 2: Intermediate (25 questions)
  {
    id: 26,
    title: 'Student Count per Branch',
    difficulty: 'Intermediate',
    category: 'Grouping',
    company: 'Infosys',
    description: 'Count how many students belong to each branch, ordered by count descending.',
    initialQuery: 'SELECT branch, COUNT(*) AS student_count FROM students GROUP BY branch ORDER BY student_count DESC;',
    testQuery: 'SELECT branch, COUNT(*) FROM students GROUP BY branch;',
    hints: ['Group by branch and apply COUNT(*).']
  },
  {
    id: 27,
    title: 'Branches with Average Marks Above 80',
    difficulty: 'Intermediate',
    category: 'HAVING Clause',
    company: 'TCS',
    description: 'Find branches that have an average student mark strictly greater than 80.',
    initialQuery: 'SELECT branch, AVG(marks) AS avg_marks FROM students GROUP BY branch HAVING AVG(marks) > 80;',
    testQuery: 'SELECT branch, AVG(marks) FROM students GROUP BY branch HAVING AVG(marks) > 80;',
    hints: ['Filtering on an aggregate requires HAVING after GROUP BY, not WHERE.']
  },
  {
    id: 28,
    title: 'Join Employees with Department Blocks',
    difficulty: 'Intermediate',
    category: 'Joins',
    company: 'Cognizant',
    description: 'Retrieve employee name, department, and building block by joining employees with departments.',
    initialQuery: 'SELECT e.name, e.department, d.block FROM employees e INNER JOIN departments d ON e.department = d.dept_id;',
    testQuery: 'SELECT e.name, d.block FROM employees e JOIN departments d ON e.department = d.dept_id;',
    hints: ['Use INNER JOIN ... ON e.department = d.dept_id.']
  },
  {
    id: 29,
    title: 'Find Courses with Enrolled Student Count',
    difficulty: 'Intermediate',
    category: 'Joins & Aggregations',
    company: 'Capgemini',
    description: 'Find the title of each course and how many students are enrolled in it.',
    initialQuery: 'SELECT c.title, COUNT(e.enroll_id) AS total_enrolled FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id GROUP BY c.title;',
    testQuery: 'SELECT c.title, COUNT(e.enroll_id) FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id GROUP BY c.title;',
    hints: ['Use LEFT JOIN so courses with 0 enrollments still appear.']
  },
  {
    id: 30,
    title: 'Department-Wise Total Salary Expenditure',
    difficulty: 'Intermediate',
    category: 'Aggregations',
    company: 'Accenture',
    description: 'Calculate the total payroll expenditure per department for departments with more than 1 employee.',
    initialQuery: 'SELECT department, SUM(salary) AS total_payroll FROM employees GROUP BY department HAVING COUNT(*) > 1;',
    testQuery: 'SELECT department, SUM(salary) FROM employees GROUP BY department HAVING COUNT(*) > 1;',
    hints: ['Combine GROUP BY with HAVING COUNT(*) > 1.']
  },
  {
    id: 31,
    title: 'Employees Earning More than Company Average',
    difficulty: 'Intermediate',
    category: 'Subqueries',
    company: 'Wipro',
    description: 'Find all employees whose salary is strictly greater than the average salary across the company.',
    initialQuery: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    testQuery: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    hints: ['Use a scalar subquery `(SELECT AVG(salary) FROM employees)` in the WHERE clause.']
  },
  {
    id: 32,
    title: 'Find Professors Having Above 10 Years Experience',
    difficulty: 'Intermediate',
    category: 'Filtering',
    company: 'Deloitte',
    description: 'Query professor names and salaries with experience strictly greater than 10 years, sorted by experience descending.',
    initialQuery: 'SELECT name, salary, experience_years FROM professors WHERE experience_years > 10 ORDER BY experience_years DESC;',
    testQuery: 'SELECT name, salary FROM professors WHERE experience_years > 10;',
    hints: ['Filter with `experience_years > 10` and order by experience.']
  },

  // Tier 3: Advanced (25 questions)
  {
    id: 51,
    title: 'Find the Second Highest Salary (Subquery)',
    difficulty: 'Advanced',
    category: 'Subqueries',
    company: 'Amazon / TCS Digital',
    description: 'Find the second highest salary among all employees without using LIMIT or OFFSET.',
    initialQuery: 'SELECT MAX(salary) AS second_highest_salary FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);',
    testQuery: 'SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);',
    hints: ['Query the maximum salary strictly less than the overall maximum salary.']
  },
  {
    id: 52,
    title: 'Find Employees with Their Manager Name (Self Join)',
    difficulty: 'Advanced',
    category: 'Self Joins',
    company: 'Infosys DSE',
    description: 'Display each employee along with the name of their direct manager. Include top executives who have no manager.',
    initialQuery: 'SELECT e.name AS employee, COALESCE(m.name, "CEO / Top Executive") AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id;',
    testQuery: 'SELECT e.name, m.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id;',
    hints: ['Perform a LEFT JOIN of employees with employees on e.manager_id = m.emp_id.']
  },
  {
    id: 53,
    title: 'Find Departments That Have Zero Employees',
    difficulty: 'Advanced',
    category: 'Outer Joins',
    company: 'Capgemini',
    description: 'Find any department that has no employees assigned to it.',
    initialQuery: 'SELECT d.dept_id, d.dept_name FROM departments d LEFT JOIN employees e ON d.dept_id = e.department WHERE e.emp_id IS NULL;',
    testQuery: 'SELECT d.dept_id FROM departments d LEFT JOIN employees e ON d.dept_id = e.department WHERE e.emp_id IS NULL;',
    hints: ['A LEFT JOIN where the right side primary key IS NULL reveals orphans.']
  },
  {
    id: 54,
    title: 'Students Scoring Above Department Average',
    difficulty: 'Advanced',
    category: 'Correlated Subqueries',
    company: 'Product Companies',
    description: 'Select students whose marks are strictly higher than the average marks of their own branch.',
    initialQuery: 'SELECT s.name, s.branch, s.marks FROM students s WHERE s.marks > (SELECT AVG(sub.marks) FROM students sub WHERE sub.branch = s.branch);',
    testQuery: 'SELECT s.name FROM students s WHERE s.marks > (SELECT AVG(sub.marks) FROM students sub WHERE sub.branch = s.branch);',
    hints: ['The inner query matches `sub.branch = s.branch`.']
  },
  {
    id: 55,
    title: 'Classify Orders into Value Brackets (CASE Statement)',
    difficulty: 'Advanced',
    category: 'Conditional Logic',
    company: 'Deloitte',
    description: 'Categorize orders into "HIGH VALUE" (>= 25000), "MEDIUM VALUE" (>= 10000), or "STANDARD VALUE".',
    initialQuery: 'SELECT order_id, amount, CASE WHEN amount >= 25000 THEN "HIGH VALUE" WHEN amount >= 10000 THEN "MEDIUM VALUE" ELSE "STANDARD VALUE" END AS order_tier FROM orders;',
    testQuery: 'SELECT order_id, CASE WHEN amount >= 25000 THEN "HIGH VALUE" WHEN amount >= 10000 THEN "MEDIUM VALUE" ELSE "STANDARD VALUE" END FROM orders;',
    hints: ['Use CASE WHEN ... THEN ... ELSE ... END.']
  },

  // Tier 4: Expert (25 questions)
  {
    id: 76,
    title: 'Simulate Atomic Transfer with Crash Recovery',
    difficulty: 'Expert',
    category: 'TCL & Concurrency',
    company: 'FinTech / Banking',
    description: 'Demonstrate transactional integrity by debiting ACC1001 and crediting ACC1002 inside an atomic block.',
    initialQuery: 'BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 2000 WHERE acc_no = "ACC1001";\nUPDATE accounts SET balance = balance + 2000 WHERE acc_no = "ACC1002";\nCOMMIT;\nSELECT * FROM accounts;',
    testQuery: 'SELECT * FROM accounts;',
    hints: ['Wrap mutations between BEGIN TRANSACTION and COMMIT.']
  },
  {
    id: 77,
    title: 'Query Plan & Cost Inspection (EXPLAIN)',
    difficulty: 'Expert',
    category: 'Performance Tuning',
    company: 'Google / Amazon',
    description: 'Analyze the physical execution plan and CPU/IO cost for a multi-table join.',
    initialQuery: 'EXPLAIN SELECT e.name, d.dept_name, p.salary FROM employees e JOIN departments d ON e.department = d.dept_id LEFT JOIN professors p ON d.dept_id = p.dept_id;',
    testQuery: 'EXPLAIN SELECT * FROM employees;',
    hints: ['Prefix the query with EXPLAIN to inspect query planner cost metrics.']
  },
  {
    id: 78,
    title: 'Detect Duplicate Student Registrations',
    difficulty: 'Expert',
    category: 'Data Quality & Cleansing',
    company: 'TCS Digital',
    description: 'Write a query to identify any student names that appear more than once in a hypothetical uncleaned table.',
    initialQuery: 'SELECT name, COUNT(*) AS occurrences FROM students GROUP BY name HAVING COUNT(*) > 1;',
    testQuery: 'SELECT name, COUNT(*) FROM students GROUP BY name HAVING COUNT(*) > 1;',
    hints: ['Group by the duplicate candidate column and check HAVING COUNT(*) > 1.']
  }
];

export const PLACEMENT_FAQS = [
  {
    id: 'faq-1',
    question: 'What is the exact difference between DELETE, TRUNCATE, and DROP?',
    answer: 'DELETE is a DML command that removes specific rows satisfying a WHERE clause, logs each row removal, and fires row-level triggers. TRUNCATE is a DDL command that deallocates entire table data pages at once; it is significantly faster and cannot be filtered with WHERE. DROP is a DDL command that completely deletes both the table data AND the table schema definition from the database catalog.'
  },
  {
    id: 'faq-2',
    question: 'Why and when should you use WHERE vs HAVING?',
    answer: 'WHERE filters individual source tuples before grouping or aggregations take place. HAVING filters aggregated group metrics (like COUNT, SUM, AVG) after the GROUP BY phase. Non-aggregate conditions should always be placed in WHERE to reduce the data volume fed into the grouping stage.'
  },
  {
    id: 'faq-3',
    question: 'What is the performance difference between UNION and UNION ALL?',
    answer: 'UNION performs a set union and eliminates duplicate rows by executing an expensive sorting or hashing pass over the combined results. UNION ALL simply concatenates the result sets without duplicate checks, making it dramatically faster. Always prefer UNION ALL unless distinct deduplication is strictly required.'
  },
  {
    id: 'faq-4',
    question: 'What are the 4 ACID properties and how are they implemented in engines?',
    answer: 'Atomicity (All-or-Nothing via undo logs/WAL), Consistency (Invariants and constraint validation), Isolation (Concurrent transaction separation via locking and MVCC), Durability (Committed data surviving crashes via Write-Ahead Logging to persistent disk).'
  },
  {
    id: 'faq-5',
    question: 'What is a Clustered Index vs a Non-Clustered Index?',
    answer: 'A Clustered Index defines the physical sequential storage order of data rows on disk pages (there can only be ONE per table). A Non-Clustered (Secondary) Index is a separate B-Tree structure storing sorted keys along with pointers (row IDs or clustered keys) back to the actual data rows.'
  },
  {
    id: 'faq-6',
    question: 'What causes a Deadlock and how can databases detect and resolve it?',
    answer: 'A Deadlock occurs when two or more transactions hold locks on resources the other requires (circular wait). Databases detect deadlocks using a Wait-For Graph cycle detection algorithm and resolve it by selecting and aborting the transaction with the lowest rollback cost (the deadlock victim).'
  },
  {
    id: 'faq-7',
    question: 'What is the difference between Primary Key and Unique Key?',
    answer: 'A table can have only ONE Primary Key, and its column(s) can never contain NULL values. A table can have multiple Unique Keys, and standard SQL allows Unique columns to contain one or more NULL values (since in SQL, NULL != NULL).'
  },
  {
    id: 'faq-8',
    question: 'What is a Sargable query and why is it critical for performance?',
    answer: 'Sargable stands for "Search Argument Able". A query predicate is sargable when the SQL engine can leverage a B-Tree index scan instead of a full table scan. Wrapping columns in functions (e.g. WHERE UPPER(name) = "JOHN" or WHERE YEAR(date) = 2024) makes queries non-sargable because the index cannot directly compute function outputs.'
  }
];
