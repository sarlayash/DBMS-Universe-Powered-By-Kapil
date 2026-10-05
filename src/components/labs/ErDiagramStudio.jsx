import React, { useState, useMemo } from 'react';
import {
  Network,
  Database,
  Layers,
  Key,
  Link2,
  Download,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  Code2,
  Eye,
  CheckCircle2,
  HelpCircle,
  FolderGit2
} from 'lucide-react';

// Preset Industry Schema Libraries
export const SCHEMA_PRESETS = {
  ecommerce: {
    id: 'ecommerce',
    name: 'E-Commerce Marketplace',
    description: 'Amazon/Flipkart scale architecture with Customers, Orders, Line Items, Products, Categories, and Payments.',
    tables: [
      {
        id: 'customers',
        name: 'customers',
        description: 'Customer profiles and contact details',
        columns: [
          { name: 'customer_id', type: 'INT', isPk: true, isFk: false },
          { name: 'email', type: 'VARCHAR(255)', isPk: false, isFk: false },
          { name: 'full_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'city', type: 'VARCHAR(50)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'orders',
        name: 'orders',
        description: 'Placed transaction headers',
        columns: [
          { name: 'order_id', type: 'INT', isPk: true, isFk: false },
          { name: 'customer_id', type: 'INT', isPk: false, isFk: true, references: 'customers.customer_id', relName: 'PLACES', cardinality: '1:N' },
          { name: 'order_date', type: 'TIMESTAMP', isPk: false, isFk: false },
          { name: 'total_amount', type: 'DECIMAL(10,2)', isPk: false, isFk: false },
          { name: 'order_status', type: 'VARCHAR(20)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'categories',
        name: 'categories',
        description: 'Hierarchical catalog taxonomy',
        columns: [
          { name: 'category_id', type: 'INT', isPk: true, isFk: false },
          { name: 'category_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'tax_slab', type: 'DECIMAL(4,2)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'products',
        name: 'products',
        description: 'Inventory SKUs available for purchase',
        columns: [
          { name: 'product_id', type: 'INT', isPk: true, isFk: false },
          { name: 'category_id', type: 'INT', isPk: false, isFk: true, references: 'categories.category_id', relName: 'CLASSIFIED_UNDER', cardinality: '1:N' },
          { name: 'sku_name', type: 'VARCHAR(150)', isPk: false, isFk: false },
          { name: 'unit_price', type: 'DECIMAL(10,2)', isPk: false, isFk: false },
          { name: 'stock_qty', type: 'INT', isPk: false, isFk: false }
        ]
      },
      {
        id: 'order_items',
        name: 'order_items',
        description: 'Associative junction bridging Orders and Products (M:N)',
        columns: [
          { name: 'item_id', type: 'INT', isPk: true, isFk: false },
          { name: 'order_id', type: 'INT', isPk: false, isFk: true, references: 'orders.order_id', relName: 'CONTAINS', cardinality: '1:N' },
          { name: 'product_id', type: 'INT', isPk: false, isFk: true, references: 'products.product_id', relName: 'REFERENCES', cardinality: '1:N' },
          { name: 'quantity', type: 'INT', isPk: false, isFk: false },
          { name: 'historical_price', type: 'DECIMAL(10,2)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'payments',
        name: 'payments',
        description: 'Payment settlement records (1:1 with Orders)',
        columns: [
          { name: 'payment_id', type: 'INT', isPk: true, isFk: false },
          { name: 'order_id', type: 'INT', isPk: false, isFk: true, references: 'orders.order_id', relName: 'SETTLED_VIA', cardinality: '1:1' },
          { name: 'payment_method', type: 'VARCHAR(50)', isPk: false, isFk: false },
          { name: 'gateway_tx_ref', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'settled_at', type: 'TIMESTAMP', isPk: false, isFk: false }
        ]
      },
      {
        id: 'reviews',
        name: 'reviews',
        description: 'User feedback and star ratings on products',
        columns: [
          { name: 'review_id', type: 'INT', isPk: true, isFk: false },
          { name: 'customer_id', type: 'INT', isPk: false, isFk: true, references: 'customers.customer_id', relName: 'WRITES', cardinality: '1:N' },
          { name: 'product_id', type: 'INT', isPk: false, isFk: true, references: 'products.product_id', relName: 'APPRAISES', cardinality: '1:N' },
          { name: 'rating_stars', type: 'INT', isPk: false, isFk: false },
          { name: 'review_body', type: 'TEXT', isPk: false, isFk: false }
        ]
      }
    ]
  },
  university: {
    id: 'university',
    name: 'University Academic Portal',
    description: 'Higher education model with Departments, Students, Instructors, Courses, and Enrollments.',
    tables: [
      {
        id: 'departments',
        name: 'departments',
        description: 'Academic faculties and branches',
        columns: [
          { name: 'dept_id', type: 'VARCHAR(10)', isPk: true, isFk: false },
          { name: 'dept_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'budget', type: 'DECIMAL(12,2)', isPk: false, isFk: false },
          { name: 'building_block', type: 'VARCHAR(50)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'instructors',
        name: 'instructors',
        description: 'Faculty professors and researchers',
        columns: [
          { name: 'instructor_id', type: 'INT', isPk: true, isFk: false },
          { name: 'dept_id', type: 'VARCHAR(10)', isPk: false, isFk: true, references: 'departments.dept_id', relName: 'MEMBER_OF', cardinality: '1:N' },
          { name: 'full_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'salary', type: 'DECIMAL(10,2)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'students',
        name: 'students',
        description: 'Enrolled scholars and undergraduates',
        columns: [
          { name: 'student_id', type: 'INT', isPk: true, isFk: false },
          { name: 'dept_id', type: 'VARCHAR(10)', isPk: false, isFk: true, references: 'departments.dept_id', relName: 'BELONGS_TO', cardinality: '1:N' },
          { name: 'name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'cgpa', type: 'DECIMAL(3,2)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'courses',
        name: 'courses',
        description: 'Subject syllabus and credits',
        columns: [
          { name: 'course_id', type: 'VARCHAR(15)', isPk: true, isFk: false },
          { name: 'dept_id', type: 'VARCHAR(10)', isPk: false, isFk: true, references: 'departments.dept_id', relName: 'OFFERED_BY', cardinality: '1:N' },
          { name: 'course_title', type: 'VARCHAR(150)', isPk: false, isFk: false },
          { name: 'credits', type: 'INT', isPk: false, isFk: false }
        ]
      },
      {
        id: 'enrollments',
        name: 'enrollments',
        description: 'Student-Course registration bridge table (M:N)',
        columns: [
          { name: 'enrollment_id', type: 'INT', isPk: true, isFk: false },
          { name: 'student_id', type: 'INT', isPk: false, isFk: true, references: 'students.student_id', relName: 'ENROLLS_IN', cardinality: '1:N' },
          { name: 'course_id', type: 'VARCHAR(15)', isPk: false, isFk: true, references: 'courses.course_id', relName: 'TAKEN_BY', cardinality: '1:N' },
          { name: 'instructor_id', type: 'INT', isPk: false, isFk: true, references: 'instructors.instructor_id', relName: 'TAUGHT_BY', cardinality: '1:N' },
          { name: 'grade_letter', type: 'VARCHAR(2)', isPk: false, isFk: false }
        ]
      }
    ]
  },
  hospital: {
    id: 'hospital',
    name: 'Hospital Healthcare System',
    description: 'Medical care ledger: Patients, Doctors, Wards, Appointments, and Prescriptions.',
    tables: [
      {
        id: 'wards',
        name: 'wards',
        description: 'Hospital specialty wings and units',
        columns: [
          { name: 'ward_id', type: 'INT', isPk: true, isFk: false },
          { name: 'ward_name', type: 'VARCHAR(50)', isPk: false, isFk: false },
          { name: 'total_beds', type: 'INT', isPk: false, isFk: false }
        ]
      },
      {
        id: 'doctors',
        name: 'doctors',
        description: 'Licensed medical specialists',
        columns: [
          { name: 'doctor_id', type: 'INT', isPk: true, isFk: false },
          { name: 'ward_id', type: 'INT', isPk: false, isFk: true, references: 'wards.ward_id', relName: 'ASSIGNED_TO', cardinality: '1:N' },
          { name: 'doctor_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'specialization', type: 'VARCHAR(100)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'patients',
        name: 'patients',
        description: 'Admitted patients and medical history',
        columns: [
          { name: 'patient_id', type: 'INT', isPk: true, isFk: false },
          { name: 'full_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'blood_group', type: 'VARCHAR(5)', isPk: false, isFk: false },
          { name: 'emergency_contact', type: 'VARCHAR(20)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'appointments',
        name: 'appointments',
        description: 'Consultation scheduling junction (M:N)',
        columns: [
          { name: 'appointment_id', type: 'INT', isPk: true, isFk: false },
          { name: 'patient_id', type: 'INT', isPk: false, isFk: true, references: 'patients.patient_id', relName: 'SCHEDULED_FOR', cardinality: '1:N' },
          { name: 'doctor_id', type: 'INT', isPk: false, isFk: true, references: 'doctors.doctor_id', relName: 'CONDUCTED_BY', cardinality: '1:N' },
          { name: 'appointment_time', type: 'TIMESTAMP', isPk: false, isFk: false },
          { name: 'diagnosis_notes', type: 'TEXT', isPk: false, isFk: false }
        ]
      },
      {
        id: 'prescriptions',
        name: 'prescriptions',
        description: 'Medication and pharmacy orders',
        columns: [
          { name: 'prescription_id', type: 'INT', isPk: true, isFk: false },
          { name: 'appointment_id', type: 'INT', isPk: false, isFk: true, references: 'appointments.appointment_id', relName: 'ISSUED_DURING', cardinality: '1:1' },
          { name: 'medication_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'dosage_instructions', type: 'VARCHAR(200)', isPk: false, isFk: false }
        ]
      }
    ]
  },
  banking: {
    id: 'banking',
    name: 'Fintech Banking & Ledger',
    description: 'Double-entry core banking: Customers, Accounts, Branches, Transactions, and Debit Cards.',
    tables: [
      {
        id: 'branches',
        name: 'branches',
        description: 'Physical or digital bank jurisdictions',
        columns: [
          { name: 'branch_id', type: 'VARCHAR(10)', isPk: true, isFk: false },
          { name: 'branch_name', type: 'VARCHAR(100)', isPk: false, isFk: false },
          { name: 'ifsc_code', type: 'VARCHAR(15)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'bank_customers',
        name: 'bank_customers',
        description: 'Verified KYC accounts holder entities',
        columns: [
          { name: 'customer_id', type: 'INT', isPk: true, isFk: false },
          { name: 'pan_number', type: 'VARCHAR(20)', isPk: false, isFk: false },
          { name: 'legal_name', type: 'VARCHAR(120)', isPk: false, isFk: false },
          { name: 'mobile_registered', type: 'VARCHAR(20)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'accounts',
        name: 'accounts',
        description: 'Demand deposit and savings ledger accounts',
        columns: [
          { name: 'account_number', type: 'BIGINT', isPk: true, isFk: false },
          { name: 'customer_id', type: 'INT', isPk: false, isFk: true, references: 'bank_customers.customer_id', relName: 'OWNS', cardinality: '1:N' },
          { name: 'branch_id', type: 'VARCHAR(10)', isPk: false, isFk: true, references: 'branches.branch_id', relName: 'LOCATED_AT', cardinality: '1:N' },
          { name: 'current_balance', type: 'DECIMAL(15,2)', isPk: false, isFk: false },
          { name: 'account_type', type: 'VARCHAR(20)', isPk: false, isFk: false }
        ]
      },
      {
        id: 'transactions',
        name: 'transactions',
        description: 'Immutable ACID audit ledger of funds movement',
        columns: [
          { name: 'tx_id', type: 'BIGINT', isPk: true, isFk: false },
          { name: 'account_number', type: 'BIGINT', isPk: false, isFk: true, references: 'accounts.account_number', relName: 'LOGGED_ON', cardinality: '1:N' },
          { name: 'amount', type: 'DECIMAL(15,2)', isPk: false, isFk: false },
          { name: 'tx_type', type: 'VARCHAR(10)', isPk: false, isFk: false },
          { name: 'created_at', type: 'TIMESTAMP', isPk: false, isFk: false }
        ]
      },
      {
        id: 'cards',
        name: 'cards',
        description: 'Issued physical and virtual payment cards',
        columns: [
          { name: 'card_number', type: 'VARCHAR(19)', isPk: true, isFk: false },
          { name: 'account_number', type: 'BIGINT', isPk: false, isFk: true, references: 'accounts.account_number', relName: 'LINKED_TO', cardinality: '1:N' },
          { name: 'card_type', type: 'VARCHAR(15)', isPk: false, isFk: false },
          { name: 'expiry_date', type: 'VARCHAR(7)', isPk: false, isFk: false }
        ]
      }
    ]
  }
};

export default function ErDiagramStudio() {
  const [selectedPresetKey, setSelectedPresetKey] = useState('ecommerce');
  const [activeTables, setActiveTables] = useState(() => {
    // Default: all tables from ecommerce preset selected
    return SCHEMA_PRESETS.ecommerce.tables.map(t => t.id);
  });
  const [notationStyle, setNotationStyle] = useState('crowsfoot'); // 'crowsfoot' | 'chen'
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [copiedDdl, setCopiedDdl] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAttributes, setShowAttributes] = useState(true);

  // Switch schema preset
  const handleSelectPreset = (key) => {
    setSelectedPresetKey(key);
    setActiveTables(SCHEMA_PRESETS[key].tables.map(t => t.id));
    setSelectedTableId(null);
  };

  // Toggle individual table
  const handleToggleTable = (tableId) => {
    if (activeTables.includes(tableId)) {
      if (activeTables.length <= 1) return; // keep at least 1 table
      setActiveTables(prev => prev.filter(id => id !== tableId));
      if (selectedTableId === tableId) setSelectedTableId(null);
    } else {
      setActiveTables(prev => [...prev, tableId]);
    }
  };

  const currentPreset = SCHEMA_PRESETS[selectedPresetKey];
  const renderedTables = useMemo(() => {
    return currentPreset.tables.filter(t => activeTables.includes(t.id));
  }, [currentPreset, activeTables]);

  // Extract all relationships between ACTIVE tables
  const relationships = useMemo(() => {
    const list = [];
    renderedTables.forEach(sourceTable => {
      sourceTable.columns.forEach(col => {
        if (col.isFk && col.references) {
          const [targetTableId, targetColName] = col.references.split('.');
          // Only create relationship if target table is also active
          const targetExists = renderedTables.some(t => t.id === targetTableId);
          if (targetExists) {
            list.push({
              id: `${sourceTable.id}-${col.name}-${targetTableId}`,
              sourceTable: sourceTable.id,
              sourceCol: col.name,
              targetTable: targetTableId,
              targetCol: targetColName,
              relName: col.relName || 'RELATES_TO',
              cardinality: col.cardinality || '1:N'
            });
          }
        }
      });
    });
    return list;
  }, [renderedTables]);

  // Layout Engine: Compute (x, y) coordinates for tables on canvas
  const tablePositions = useMemo(() => {
    const positions = {};
    const count = renderedTables.length;
    if (count === 0) return positions;

    // Grid layout configuration
    const cols = count <= 3 ? count : count <= 6 ? 3 : 4;
    const cellWidth = 320;
    const cellHeight = 280;
    const startX = 60;
    const startY = 60;

    renderedTables.forEach((table, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      // Stagger odd rows slightly for cleaner diagonal connectors
      const offsetX = (row % 2 === 1 && cols > 2) ? 40 : 0;
      positions[table.id] = {
        x: startX + col * cellWidth + offsetX,
        y: startY + row * cellHeight,
        width: 260,
        height: 80 + (showAttributes ? table.columns.length * 24 : 0)
      };
    });

    return positions;
  }, [renderedTables, showAttributes]);

  // Generate ANSI SQL DDL from currently active tables
  const generatedDdl = useMemo(() => {
    let ddl = `-- ========================================================\n`;
    ddl += `-- AUTOMATICALLY SYNTHESIZED ANSI SQL SCHEMA DDL\n`;
    ddl += `-- Generated by DBMS Zero-To-Infinity | Powered By Kapil\n`;
    ddl += `-- Model: ${currentPreset.name}\n`;
    ddl += `-- Tables Selected: ${renderedTables.length} | Relationships: ${relationships.length}\n`;
    ddl += `-- ========================================================\n\n`;

    renderedTables.forEach(table => {
      ddl += `CREATE TABLE ${table.name} (\n`;
      const colDefs = table.columns.map(c => {
        let def = `  ${c.name} ${c.type}`;
        if (c.isPk) def += ' PRIMARY KEY';
        return def;
      });

      // Add FOREIGN KEY constraints
      table.columns.forEach(c => {
        if (c.isFk && c.references) {
          const [tTable, tCol] = c.references.split('.');
          if (activeTables.includes(tTable)) {
            colDefs.push(`  CONSTRAINT fk_${table.name}_${c.name} FOREIGN KEY (${c.name}) REFERENCES ${tTable}(${tCol}) ON DELETE CASCADE`);
          }
        }
      });

      ddl += colDefs.join(',\n');
      ddl += `\n);\n\n`;
    });

    return ddl;
  }, [renderedTables, relationships, currentPreset, activeTables]);

  const handleCopyDdl = () => {
    navigator.clipboard.writeText(generatedDdl);
    setCopiedDdl(true);
    setTimeout(() => setCopiedDdl(false), 2000);
  };

  const selectedTableObj = renderedTables.find(t => t.id === selectedTableId);

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
              <Network className="w-5 h-5 text-amber-400" />
              <span>Interactive Automatic E-R Diagram Studio</span>
            </div>
            <p className="text-zinc-300 text-sm max-w-3xl">
              "Blueprints before brickwork." Select tables below and the platform <strong>automatically synthesizes and renders the complete Entity-Relationship diagram</strong> in real time with foreign key cardinality paths, Chen/Crow's Foot notations, and production ANSI SQL DDL!
            </p>
          </div>

          {/* Preset System Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
            {Object.values(SCHEMA_PRESETS).map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition ${
                  selectedPresetKey === preset.id
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {preset.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Table Toggle Selector Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Active Tables (Automatic ER Diagram Re-draw):</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTables(currentPreset.tables.map(t => t.id))}
                className="text-[11px] font-mono text-amber-400 hover:underline"
              >
                Select All ({currentPreset.tables.length})
              </button>
              <span className="text-zinc-600">•</span>
              <button
                onClick={() => setActiveTables(currentPreset.tables.slice(0, 3).map(t => t.id))}
                className="text-[11px] font-mono text-zinc-400 hover:text-white"
              >
                Minimal Core (3)
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentPreset.tables.map(table => {
              const isActive = activeTables.includes(table.id);
              const fkCount = table.columns.filter(c => c.isFk).length;
              return (
                <button
                  key={table.id}
                  onClick={() => handleToggleTable(table.id)}
                  className={`px-3 py-2 rounded-xl font-mono text-xs transition flex items-center gap-2 border ${
                    isActive
                      ? 'bg-zinc-950 border-amber-500 text-white shadow-md shadow-amber-500/10'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-amber-400 text-black' : 'border border-zinc-700'
                  }`}>
                    {isActive ? '✓' : ''}
                  </div>
                  <span className="font-bold">{table.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-zinc-900 text-amber-300' : 'text-zinc-600'
                  }`}>
                    {table.columns.length} cols
                  </span>
                  {fkCount > 0 && (
                    <span className="text-[10px] text-zinc-400 font-normal">
                      🔗 {fkCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Diagram Canvas Area & Toolbar */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Canvas Toolbar Controls */}
        <div className="p-4 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-zinc-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Canvas Mode:</span>
            </span>
            <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setNotationStyle('crowsfoot')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  notationStyle === 'crowsfoot'
                    ? 'bg-amber-400 text-black font-extrabold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Crow's Foot Notation (1:N)
              </button>
              <button
                onClick={() => setNotationStyle('chen')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  notationStyle === 'chen'
                    ? 'bg-amber-400 text-black font-extrabold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Peter Chen Notation (◇ Diamonds)
              </button>
            </div>
            <label className="flex items-center gap-1.5 text-zinc-400 cursor-pointer ml-2">
              <input
                type="checkbox"
                checked={showAttributes}
                onChange={(e) => setShowAttributes(e.target.checked)}
                className="accent-amber-400 rounded"
              />
              <span>Show Column Attributes</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500">
              Active: {renderedTables.length} Tables • {relationships.length} Relationships
            </span>
            <button
              onClick={handleCopyDdl}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 font-bold rounded-lg transition flex items-center gap-1.5"
            >
              {copiedDdl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedDdl ? 'DDL Copied!' : 'Copy SQL DDL'}</span>
            </button>
          </div>
        </div>

        {/* SVG Drawing Canvas with Interactive Tables */}
        <div className="p-6 overflow-x-auto min-h-[580px] bg-black/90 relative">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-15 pointer-events-none" />

          <svg
            className="w-full min-w-[950px] min-h-[540px]"
            style={{ minHeight: `${Math.max(540, (Math.ceil(renderedTables.length / 3)) * 300)}px` }}
          >
            <defs>
              {/* Arrow Marker for Foreign Key target */}
              <marker
                id="gold-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
              {/* Circle Marker for 1-end */}
              <marker
                id="gold-dot"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
              >
                <circle cx="5" cy="5" r="3" fill="#fbbf24" />
              </marker>
            </defs>

            {/* Dynamic Relationship Connector Paths */}
            {relationships.map(rel => {
              const srcPos = tablePositions[rel.sourceTable];
              const tgtPos = tablePositions[rel.targetTable];
              if (!srcPos || !tgtPos) return null;

              // Compute center connector points
              const x1 = srcPos.x + srcPos.width / 2;
              const y1 = srcPos.y + srcPos.height / 2;
              const x2 = tgtPos.x + tgtPos.width / 2;
              const y2 = tgtPos.y + tgtPos.height / 2;

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              // Orthogonal / Bezier curve control
              const dx = x2 - x1;
              const dy = y2 - y1;
              const pathData = `M ${x1} ${y1} Q ${midX + (dy > 0 ? 30 : -30)} ${midY} ${x2} ${y2}`;

              const isHighlighted = selectedTableId === rel.sourceTable || selectedTableId === rel.targetTable;

              return (
                <g key={rel.id} className="transition-all duration-300">
                  {/* Shadow path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#000000"
                    strokeWidth={isHighlighted ? 6 : 4}
                    opacity="0.8"
                  />
                  {/* Golden connection line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isHighlighted ? '#fbbf24' : '#d4af37'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeDasharray={notationStyle === 'chen' ? '4,4' : 'none'}
                    markerEnd="url(#gold-arrow)"
                    markerStart="url(#gold-dot)"
                    opacity={isHighlighted ? 1 : 0.75}
                  />

                  {/* Relationship Label / Diamond Box */}
                  {notationStyle === 'chen' ? (
                    // Chen Diamond
                    <g transform={`translate(${midX}, ${midY})`}>
                      <polygon
                        points="0,-16 28,0 0,16 -28,0"
                        fill="#18181b"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="3"
                        fill="#fbbf24"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {rel.relName.length > 9 ? rel.relName.slice(0, 8) + '..' : rel.relName}
                      </text>
                    </g>
                  ) : (
                    // Crow's foot Cardinality Badge
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-38"
                        y="-10"
                        width="76"
                        height="20"
                        rx="6"
                        fill="#18181b"
                        stroke="#fbbf24"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="3.5"
                        fill="#fbbf24"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {rel.relName} ({rel.cardinality})
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* HTML Overlay Table Cards */}
          <div className="absolute inset-0 pointer-events-none p-6">
            {renderedTables.map(table => {
              const pos = tablePositions[table.id];
              if (!pos) return null;

              const isSelected = selectedTableId === table.id;

              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTableId(isSelected ? null : table.id)}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: `${pos.width}px`
                  }}
                  className={`pointer-events-auto rounded-xl border transition-all duration-300 font-mono text-xs shadow-2xl cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-950 border-amber-400 ring-2 ring-amber-400/30 scale-105 z-30'
                      : 'bg-zinc-950/95 border-zinc-800 hover:border-amber-500/60 z-10'
                  }`}
                >
                  {/* Table Entity Header */}
                  <div className="p-3 bg-zinc-900 border-b border-zinc-800 rounded-t-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-[10px] font-bold">
                        T
                      </div>
                      <span className="font-extrabold text-white tracking-wide text-xs">
                        {table.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-800">
                      Entity
                    </span>
                  </div>

                  {/* Attributes & Columns */}
                  {showAttributes && (
                    <div className="p-2 space-y-1 divide-y divide-zinc-900">
                      {table.columns.map(col => (
                        <div
                          key={col.name}
                          className="pt-1 first:pt-0 flex items-center justify-between text-[11px] text-zinc-300 hover:text-white"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {col.isPk && (
                              <span className="text-[10px] text-amber-400 font-bold" title="Primary Key">
                                🔑
                              </span>
                            )}
                            {col.isFk && (
                              <span className="text-[10px] text-amber-300" title={`Foreign Key referencing ${col.references}`}>
                                🔗
                              </span>
                            )}
                            <span className={col.isPk ? 'text-amber-300 font-bold truncate' : 'truncate'}>
                              {col.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-sans ml-2 shrink-0">
                            {col.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Table Footer info */}
                  <div className="px-3 py-1.5 bg-black/60 border-t border-zinc-900 rounded-b-xl flex items-center justify-between text-[10px] text-zinc-500">
                    <span>{table.columns.length} columns</span>
                    <span className="text-amber-400 hover:underline">Inspect details</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Table Inspector & Generated ANSI DDL Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Inspector Card */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-200 font-bold text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Entity Inspector: {selectedTableObj ? selectedTableObj.name : 'Click any table above'}</span>
            </span>
            {selectedTableObj && (
              <span className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-600/50 px-2 py-0.5 rounded">
                Active Entity
              </span>
            )}
          </div>

          {selectedTableObj ? (
            <div className="space-y-3">
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                {selectedTableObj.description}
              </p>

              <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="p-2 bg-zinc-900 text-zinc-400 font-bold text-[11px] border-b border-zinc-800 flex justify-between">
                  <span>Attribute Column</span>
                  <span>Data Type & Constraint</span>
                </div>
                <div className="divide-y divide-zinc-900">
                  {selectedTableObj.columns.map(col => (
                    <div key={col.name} className="p-2 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {col.isPk && <span className="text-amber-400">🔑</span>}
                        {col.isFk && <span className="text-amber-300">🔗</span>}
                        <span className={col.isPk ? 'text-amber-300 font-bold' : 'text-zinc-200'}>
                          {col.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-400 text-[10px] block">{col.type}</span>
                        {col.isFk && (
                          <span className="text-amber-400 text-[9px] block">
                            &rarr; {col.references}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-500 space-y-2">
              <Database className="w-8 h-8 mx-auto text-zinc-700" />
              <p>Click on any table card in the canvas above to examine its schema constraints, primary keys, and foreign relations!</p>
            </div>
          )}
        </div>

        {/* Synthesized SQL DDL Code View */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-200 font-bold text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Synthesized ANSI SQL Schema DDL</span>
            </span>
            <button
              onClick={handleCopyDdl}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
            >
              {copiedDdl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDdl ? 'Copied to Clipboard' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-amber-300 max-h-72 overflow-y-auto leading-relaxed text-[11px] whitespace-pre-wrap">
            {generatedDdl}
          </pre>
        </div>
      </div>
    </div>
  );
}
