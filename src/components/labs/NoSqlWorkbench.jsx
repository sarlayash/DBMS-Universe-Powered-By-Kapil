import React, { useState } from 'react';
import { FileJson, Layers, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function NoSqlWorkbench() {
  const [modelType, setModelType] = useState('document'); // 'document', 'keyvalue', 'graph', 'widecolumn'

  // The common problem: Storing an E-Commerce User Order with Reviews and Cart Items
  const sampleData = {
    user: 'Aarav Sharma (ID: 101)',
    orderId: 'ORD-9821',
    product: 'MacBook Air M3',
    price: 114900,
    review: 'Blazing fast, 18-hour battery life!'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-pink-400 font-bold text-lg mb-1">
          <FileJson className="w-5 h-5" />
          <span>Level 20: NoSQL Paradigm Workbench</span>
        </div>
        <p className="text-slate-300 text-sm max-w-2xl">
          Solve the identical real-world e-commerce data problem across 4 different database paradigms:
          <strong> Document (MongoDB), Key-Value (Redis), Graph (Neo4j), and Wide-Column (Cassandra)</strong>.
        </p>

        {/* Model Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
          {[
            { id: 'document', name: 'Document (MongoDB)', icon: 'JSON' },
            { id: 'keyvalue', name: 'Key-Value (Redis)', icon: 'K-V' },
            { id: 'graph', name: 'Graph (Neo4j)', icon: 'Nodes' },
            { id: 'widecolumn', name: 'Wide-Column (Cassandra)', icon: 'CQL' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setModelType(m.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition border ${
                modelType === m.id
                  ? 'bg-pink-600 border-pink-500 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Model Representation Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 font-mono text-xs space-y-4">
        {modelType === 'document' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold text-sm">MongoDB BSON Document Representation</span>
              <span className="text-slate-500 text-[11px]">Collection: `orders`</span>
            </div>
            <p className="text-slate-300 text-xs">
              Orders, nested items, and shipping addresses are embedded in a single polymorphic document. Zero foreign key joins required!
            </p>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 leading-relaxed overflow-x-auto">
{`db.orders.insertOne({
  _id: ObjectId("65dfa82910fa"),
  order_number: "ORD-9821",
  customer: {
    id: 101,
    name: "Aarav Sharma",
    email: "aarav@gmail.com"
  },
  items: [
    { product: "MacBook Air M3", price: 114900, qty: 1 }
  ],
  status: "DELIVERED",
  reviews: [
    { rating: 5, comment: "Blazing fast, 18-hour battery life!" }
  ]
});`}
            </pre>
          </div>
        )}

        {modelType === 'keyvalue' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-red-400 font-bold text-sm">Redis In-Memory Key-Value & Hashes</span>
              <span className="text-slate-500 text-[11px]">Time Complexity: O(1)</span>
            </div>
            <p className="text-slate-300 text-xs">
              Sub-millisecond access via direct memory keys and hashes. Perfect for shopping carts, user sessions, and cache buffers.
            </p>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-red-300 leading-relaxed overflow-x-auto">
{`# 1. Store order hash
HSET order:9821 customer_id 101 amount 114900 status "DELIVERED"

# 2. Add to customer's active orders set
SADD user:101:orders "order:9821"

# 3. Cache latest review with 24hr TTL (expiry)
SETEX user:101:last_review 86400 "Blazing fast, 18-hour battery life!"`}
            </pre>
          </div>
        )}

        {modelType === 'graph' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-blue-400 font-bold text-sm">Neo4j Cypher Property Graph</span>
              <span className="text-slate-500 text-[11px]">Nodes & Labeled Directed Edges</span>
            </div>
            <p className="text-slate-300 text-xs">
              Models relationships as first-class citizens. Enables index-free adjacency for friend networks and recommendation graphs.
            </p>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-blue-300 leading-relaxed overflow-x-auto">
{`CREATE (u:User {name: "Aarav Sharma", id: 101})
CREATE (p:Product {name: "MacBook Air M3", price: 114900})
CREATE (o:Order {order_id: "ORD-9821"})

// Create semantic relationships
CREATE (u)-[:PLACED]->(o)
CREATE (o)-[:CONTAINS]->(p)
CREATE (u)-[:REVIEWED {rating: 5}]->(p)

// Traverse recommendations
MATCH (u:User)-[:PLACED]->(:Order)-[:CONTAINS]->(p:Product)<-[:CONTAINS]-(otherOrder)
RETURN otherOrder;`}
            </pre>
          </div>
        )}

        {modelType === 'widecolumn' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold text-sm">Apache Cassandra CQL Wide-Column Table</span>
              <span className="text-slate-500 text-[11px]">Partition Key + Clustering Column</span>
            </div>
            <p className="text-slate-300 text-xs">
              Designed for petabyte-scale write throughput across hundreds of distributed server nodes with zero downtime.
            </p>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 leading-relaxed overflow-x-auto">
{`CREATE TABLE orders_by_customer (
  customer_id int,
  order_id text,
  order_timestamp timestamp,
  amount decimal,
  status text,
  PRIMARY KEY ((customer_id), order_timestamp, order_id)
) WITH CLUSTERING ORDER BY (order_timestamp DESC);

// High-speed sequential write
INSERT INTO orders_by_customer (customer_id, order_id, order_timestamp, amount, status)
VALUES (101, 'ORD-9821', toTimestamp(now()), 114900, 'DELIVERED');`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
