// 10 Major Production Database Projects
// Level 22: PRD Specification
// Powered By Kapil | SarlaYash Mission Productions

export const REAL_PROJECTS = [
  {
    id: 1,
    title: 'Student Management System',
    category: 'Education & Institutional',
    difficulty: 'Intermediate',
    description: 'Centralized relational platform handling student demographics, academic departments, semester enrollments, grades, and attendance tracking.',
    entities: ['Students', 'Departments', 'Courses', 'Professors', 'Enrollments', 'Attendance'],
    keyFeatures: [
      'Enforces referential integrity across Department and Course offerings.',
      'Junction table modeling M:N student course enrollments.',
      'Automated semester GPA computation view.'
    ],
    sampleSchemaDDL: `-- Project 1: Student Management System
CREATE TABLE departments (
  dept_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  hod VARCHAR(100),
  budget DECIMAL(12,2)
);

CREATE TABLE students (
  student_id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  dept_id VARCHAR(10) REFERENCES departments(dept_id),
  cgpa DECIMAL(3,2),
  admission_year INT
);

CREATE TABLE courses (
  course_id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  dept_id VARCHAR(10) REFERENCES departments(dept_id),
  credits INT DEFAULT 3
);`,
    starterQueries: [
      'SELECT s.full_name, d.name AS department FROM students s JOIN departments d ON s.dept_id = d.dept_id;',
      'SELECT dept_id, COUNT(*) AS total_students, AVG(cgpa) FROM students GROUP BY dept_id;'
    ]
  },
  {
    id: 2,
    title: 'Library Management System',
    category: 'Information & Cataloging',
    difficulty: 'Intermediate',
    description: 'Digital catalog for books, authors, publisher details, student borrowings, late return fine tracking, and reservation queues.',
    entities: ['Books', 'Authors', 'Publishers', 'BookCopies', 'Members', 'BorrowRecords', 'Fines'],
    keyFeatures: [
      'Distinguishes conceptual title from physical copy barcode IDs.',
      'Fine calculation trigger based on overdue return timestamps.',
      'Book availability status updates upon loan checkouts.'
    ],
    sampleSchemaDDL: `-- Project 2: Library Management System
CREATE TABLE books (
  isbn VARCHAR(13) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50),
  published_year INT
);

CREATE TABLE borrow_records (
  borrow_id INT PRIMARY KEY,
  isbn VARCHAR(13) REFERENCES books(isbn),
  member_id INT,
  borrow_date DATE NOT NULL,
  return_due_date DATE NOT NULL,
  returned_at DATE,
  fine_amount DECIMAL(6,2) DEFAULT 0.00
);`,
    starterQueries: [
      'SELECT b.title, r.borrow_date, r.return_due_date FROM borrow_records r JOIN books b ON r.isbn = b.isbn WHERE r.returned_at IS NULL;'
    ]
  },
  {
    id: 3,
    title: 'Hospital Management System',
    category: 'Healthcare & Clinical',
    difficulty: 'Advanced',
    description: 'HIPAA-conscious clinical database managing patient electronic health records (EHR), attending physicians, wards, prescriptions, and lab tests.',
    entities: ['Patients', 'Doctors', 'Specializations', 'Appointments', 'Prescriptions', 'Billing'],
    keyFeatures: [
      'Strict audit trails for patient medical history inspection.',
      'Prescription line items with dosage, frequency, and drug interaction safeguards.',
      'Multi-insurance billing ledger with copay breakdown.'
    ],
    sampleSchemaDDL: `-- Project 3: Hospital Management System
CREATE TABLE patients (
  patient_id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  blood_group VARCHAR(5),
  emergency_contact VARCHAR(20)
);

CREATE TABLE appointments (
  appointment_id INT PRIMARY KEY,
  patient_id INT REFERENCES patients(patient_id),
  doctor_id INT,
  scheduled_time TIMESTAMP,
  status VARCHAR(20) -- SCHEDULED, COMPLETED, CANCELLED
);`,
    starterQueries: [
      'SELECT p.full_name, a.scheduled_time, a.status FROM appointments a JOIN patients p ON a.patient_id = p.patient_id WHERE a.status = "SCHEDULED";'
    ]
  },
  {
    id: 4,
    title: 'Banking & Financial Ledger',
    category: 'FinTech & Core Banking',
    difficulty: 'Advanced',
    description: 'High-integrity double-entry accounting ledger tracking accounts, debit/credit entries, card transactions, fraud checks, and monthly interest accruals.',
    entities: ['Customers', 'Accounts', 'Transactions', 'LedgerEntries', 'Cards', 'AuditLog'],
    keyFeatures: [
      'Strict prohibition of UPDATE/DELETE on financial transactions; adjustments require offset entries.',
      'Serializable isolation level simulations for fund transfers.',
      'Composite index on (account_id, transaction_timestamp DESC) for instant statement generation.'
    ],
    sampleSchemaDDL: `-- Project 4: Banking Ledger
CREATE TABLE accounts (
  account_number VARCHAR(20) PRIMARY KEY,
  customer_id INT NOT NULL,
  balance DECIMAL(15,2) NOT NULL CHECK (balance >= 0),
  account_type VARCHAR(20),
  status VARCHAR(20)
);

CREATE TABLE transactions (
  txn_id VARCHAR(36) PRIMARY KEY,
  from_account VARCHAR(20) REFERENCES accounts(account_number),
  to_account VARCHAR(20) REFERENCES accounts(account_number),
  amount DECIMAL(15,2) NOT NULL,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    starterQueries: [
      'SELECT account_number, balance FROM accounts WHERE balance > 10000 ORDER BY balance DESC;'
    ]
  },
  {
    id: 5,
    title: 'E-Commerce Database System',
    category: 'Retail & Marketplaces',
    difficulty: 'Advanced',
    description: 'Amazon-style shopping platform supporting product catalog, SKU variants, inventory reservations, shopping carts, order checkouts, and shipment logistics.',
    entities: ['Users', 'Products', 'Categories', 'Orders', 'OrderItems', 'Payments', 'Inventory'],
    keyFeatures: [
      'OrderItems store historical snapshot unit price at transaction instant.',
      'Optimistic concurrency locking (`version` column) preventing inventory overselling.',
      'Partitioning strategy for orders by calendar year.'
    ],
    sampleSchemaDDL: `-- Project 5: E-Commerce
CREATE TABLE products (
  product_id INT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  category VARCHAR(50)
);

CREATE TABLE order_items (
  item_id INT PRIMARY KEY,
  order_id INT,
  product_id INT REFERENCES products(product_id),
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL
);`,
    starterQueries: [
      'SELECT p.title, SUM(oi.quantity) AS units_sold FROM order_items oi JOIN products p ON oi.product_id = p.product_id GROUP BY p.title;'
    ]
  },
  {
    id: 6,
    title: 'Food Delivery Platform (Swiggy/Zomato style)',
    category: 'Hyperlocal Logistics',
    difficulty: 'Advanced',
    description: 'Real-time ordering and dispatch system connecting customers, restaurant menus, delivery executives, live GPS coordinates, and rating reviews.',
    entities: ['Customers', 'Restaurants', 'MenuItems', 'Orders', 'DeliveryExecutives', 'LiveTracking'],
    keyFeatures: [
      'Geospatial indexing (PostGIS / spatial index) matching nearest available delivery partners.',
      'Dynamic menu availability toggles (out of stock items).',
      'Delivery surge multiplier pricing engine.'
    ],
    sampleSchemaDDL: `-- Project 6: Food Delivery
CREATE TABLE restaurants (
  restaurant_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  city VARCHAR(50),
  rating DECIMAL(2,1),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE delivery_orders (
  order_id INT PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(restaurant_id),
  customer_id INT,
  delivery_executive_id INT,
  subtotal DECIMAL(10,2),
  status VARCHAR(20) -- PLACED, COOKING, OUT_FOR_DELIVERY, DELIVERED
);`,
    starterQueries: [
      'SELECT r.name, COUNT(o.order_id) AS total_orders FROM delivery_orders o JOIN restaurants r ON o.restaurant_id = r.restaurant_id GROUP BY r.name;'
    ]
  },
  {
    id: 7,
    title: 'Employee Payroll System',
    category: 'Enterprise HRMS',
    difficulty: 'Intermediate',
    description: 'Corporate payroll and salary distribution engine calculating basic pay, HRA, Provident Fund, tax deductions, and pay slip disbursements.',
    entities: ['Employees', 'SalaryStructure', 'MonthlyPayroll', 'Deductions', 'TaxSlabs', 'BankDetails'],
    keyFeatures: [
      'Automated net salary formula: Basic + Allowances - Deductions (PF, Professional Tax, TDS).',
      'Historical monthly payroll snapshots for tax audit compliance.',
      'Departmental payroll variance reporting.'
    ],
    sampleSchemaDDL: `-- Project 7: Payroll
CREATE TABLE payroll_records (
  payroll_id INT PRIMARY KEY,
  emp_id INT REFERENCES employees(emp_id),
  pay_month VARCHAR(7), -- '2026-03'
  basic_pay DECIMAL(10,2) NOT NULL,
  allowances DECIMAL(10,2) DEFAULT 0,
  tax_deduction DECIMAL(10,2) DEFAULT 0,
  net_salary DECIMAL(10,2) NOT NULL
);`,
    starterQueries: [
      'SELECT pay_month, SUM(net_salary) AS total_company_disbursement FROM payroll_records GROUP BY pay_month;'
    ]
  },
  {
    id: 8,
    title: 'College ERP Database',
    category: 'Higher Education Management',
    difficulty: 'Expert',
    description: 'University-wide multi-campus ERP managing admissions, timetable generation, semester exam halls, hall tickets, hostel allotments, and fee receipts.',
    entities: ['Campuses', 'Departments', 'Faculties', 'Students', 'Hostels', 'Exams', 'FeeLedger'],
    keyFeatures: [
      'Exam seating hall conflict detection view (preventing same student scheduled in two exams simultaneously).',
      'Automated fee balance calculation and dues clearance certification.',
      'Role-based security views (Dean, Professor, Student, Accountant).'
    ],
    sampleSchemaDDL: `-- Project 8: College ERP
CREATE TABLE exam_schedules (
  exam_id VARCHAR(10) PRIMARY KEY,
  course_code VARCHAR(10),
  exam_date DATE,
  start_time TIME,
  hall_number VARCHAR(20)
);`,
    starterQueries: [
      'SELECT course_code, exam_date, hall_number FROM exam_schedules ORDER BY exam_date ASC;'
    ]
  },
  {
    id: 9,
    title: 'Hotel Booking Database',
    category: 'Hospitality & Travel',
    difficulty: 'Intermediate',
    description: 'Room inventory, pricing tiers, guest reservations, check-in check-out logs, housekeeping states, and banquet hall events.',
    entities: ['Hotels', 'Rooms', 'RoomTypes', 'Guests', 'Reservations', 'Payments', 'Housekeeping'],
    keyFeatures: [
      'Date-overlap query prevention using range types or BETWEEN checkouts.',
      'Seasonal dynamic pricing based on occupancy rates.',
      'Housekeeping status transitions (Dirty -> Cleaning -> Inspected -> Ready).'
    ],
    sampleSchemaDDL: `-- Project 9: Hotel Booking
CREATE TABLE room_reservations (
  booking_id INT PRIMARY KEY,
  room_number INT,
  guest_id INT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_price DECIMAL(10,2),
  status VARCHAR(20)
);`,
    starterQueries: [
      'SELECT room_number, check_in_date, check_out_date FROM room_reservations WHERE status = "CONFIRMED";'
    ]
  },
  {
    id: 10,
    title: 'Enterprise Multi-Tenant Database Architecture Project',
    category: 'Cloud SaaS Architecture',
    difficulty: 'Expert',
    description: 'Complete production-grade SaaS multi-tenant database supporting tenant isolation (Row-Level Security), subscription licensing, data sharding, and GDPR compliance.',
    entities: ['Tenants', 'TenantUsers', 'FeatureSubscriptions', 'AuditLogs', 'DataPartitions', 'UsageMetrics'],
    keyFeatures: [
      'Tenant isolation via PostgreSQL Row-Level Security (RLS) policies.',
      'Tenant identifier column `tenant_id` mandatory in all table composite primary keys.',
      'Global analytics aggregation without exposing cross-tenant identifiable information (PII).',
      'Automated tenant offboarding / GDPR Right to be Forgotten deletion pipeline.'
    ],
    sampleSchemaDDL: `-- Project 10: Enterprise Multi-Tenant Architecture
CREATE TABLE tenants (
  tenant_id VARCHAR(36) PRIMARY KEY,
  org_name VARCHAR(100) NOT NULL,
  tier VARCHAR(20) DEFAULT 'ENTERPRISE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE tenant_data (
  record_id VARCHAR(36) PRIMARY KEY,
  tenant_id VARCHAR(36) REFERENCES tenants(tenant_id),
  entity_type VARCHAR(50),
  payload_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    starterQueries: [
      'SELECT t.org_name, COUNT(d.record_id) AS total_records FROM tenants t LEFT JOIN tenant_data d ON t.tenant_id = d.tenant_id GROUP BY t.org_name;'
    ]
  }
];
