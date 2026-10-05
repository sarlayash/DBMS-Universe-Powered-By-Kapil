import React, { useState } from 'react';
import { FileJson, Layers, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function NoSqlWorkbench() {
  const [modelType, setModelType] = useState('document'); // 'document', 'keyvalue', 'graph', 'widecolumn'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-1">
          <FileJson className="w-5 h-5 text-amber-400" />
          <span>Level 20: NoSQL Paradigm Workbench</span>
        </div>
        <p className="text-zinc-300 text-sm max-w-2xl">
          Solve the identical real-world e-commerce data problem across 4 different database paradigms:
          <strong> Document (MongoDB), Key-Value (Redis), Graph (Neo4j), and Wide-Column (Cassandra)</strong>.
        </p>

        {/* Model Tabs */}
        <div className="flex flex-wrap gap-2 mt-5 font-mono text-xs">
          {[
            { id: 'document', name: 'Document (MongoDB)', icon: 'JSON' },
            { id: 'keyvalue', name: 'Key-Value (Redis)', icon: 'K-V' },
            { id: 'graph', name: 'Graph (Neo4j)', icon: 'Nodes' },
            { id: 'widecolumn', name: 'Wide-Column (Cassandra)', icon: 'CQL' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setModelType(m.id)}
              className={`px-4 py-2 rounded-xl font-bold transition border ${
                modelType === m.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black border-amber-400 shadow-lg shadow-amber-500/20 font-extrabold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Model Representation Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 font-mono text-xs space-y-4 shadow-xl">
        {modelType === 'document' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-amber-400 font-bold text-sm">MongoDB BSON Document Representation</span>
              <span className="text-zinc-500 text-[11px]">Collection: `orders`</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Orders, nested items, and shipping addresses are embedded in a single polymorphic document. Zero foreign key joins required!
            </p>
            <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-amber-300 leading-relaxed overflow-x-auto">
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
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-amber-400 font-bold text-sm">Redis In-Memory Key-Value & Hashes</span>
              <span className="text-zinc-500 text-[11px]">Time Complexity: O(1)</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Sub-millisecond access via direct memory keys and hashes. Perfect for shopping carts, user sessions, and cache buffers.
            </p>
            <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-200 leading-relaxed overflow-x-auto">
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
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-amber-400 font-bold text-sm">Neo4j Cypher Property Graph</span>
              <span className="text-zinc-500 text-[11px]">Nodes & Labeled Directed Edges</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Models relationships as first-class citizens. Enables index-free adjacency for friend networks and recommendation graphs.
            </p>
            <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-amber-300 leading-relaxed overflow-x-auto">
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
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-amber-400 font-bold text-sm">Apache Cassandra CQL Wide-Column Table</span>
              <span className="text-zinc-500 text-[11px]">Partition Key + Clustering Column</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Designed for petabyte-scale write throughput across hundreds of distributed server nodes with zero downtime.
            </p>
            <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-200 leading-relaxed overflow-x-auto">
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
