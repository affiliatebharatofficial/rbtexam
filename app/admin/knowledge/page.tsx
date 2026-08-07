'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ragSearch,
  getAllKnowledgeChunks,
  getKnowledgeGraph,
  getRAGEngineMetrics,
  buildLLMContext,
} from '@/lib/rag-engine';
import { RAGSearchResult, KnowledgeChunk, KnowledgeGraphNode } from '@/types/rag-engine';
import {
  Brain,
  Search,
  Database,
  Network,
  Layers,
  Sparkles,
  Activity,
  ChevronRight,
  FileText,
  Zap,
  CheckCircle2,
  Clock,
} from 'lucide-react';

type KnowledgeTab = 'explorer' | 'graph' | 'index' | 'inspector';

const CERT_OPTIONS = ['all', 'RBT', 'BCaBA', 'BCBA'] as const;

export default function AdminKnowledgePage() {
  const [activeTab, setActiveTab] = useState<KnowledgeTab>('explorer');
  const [query, setQuery] = useState('');
  const [certification, setCertification] = useState<'all' | 'RBT' | 'BCaBA' | 'BCBA'>('all');
  const [searchResult, setSearchResult] = useState<RAGSearchResult | null>(null);
  const [llmContext, setLLMContext] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const chunks = getAllKnowledgeChunks();
  const graph = getKnowledgeGraph();
  const metrics = getRAGEngineMetrics();

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const result = ragSearch({
        query,
        certification: certification === 'all' ? undefined : certification,
        topK: 5,
      });
      setSearchResult(result);
      setLLMContext(buildLLMContext(result.retrievedContexts));
      setIsSearching(false);
    }, 120);
  };

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Brain className="w-3.5 h-3.5" />
              <span>RAG Engine · pgvector · Knowledge Graph</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              AI Knowledge Graph & RAG Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Retrieval-Augmented Generation over internal Question Bank, Flashcard Decks, Glossary, Study Guides, and Clinical Scenarios. Every AI answer is grounded in authorized knowledge sources.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>&larr; Back to Admin CMS</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* TOP KPI SCORECARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total Chunks', value: metrics.totalChunks, color: 'text-slate-900' },
            { label: 'Indexed', value: metrics.indexedChunks, color: 'text-emerald-600' },
            { label: 'Queued', value: metrics.pendingEmbeddings, color: 'text-amber-600' },
            { label: 'Graph Nodes', value: metrics.graphNodes, color: 'text-indigo-600' },
            { label: 'Graph Edges', value: metrics.graphEdges, color: 'text-purple-600' },
            { label: 'Avg Latency', value: `${metrics.avgRetrievalLatencyMs || '<5'}ms`, color: 'text-[#2563EB]' },
          ].map((kpi) => (
            <Card key={kpi.label} glass className="p-4 text-center space-y-1 border-white/90 shadow-xl">
              <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</div>
            </Card>
          ))}
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
          {[
            { id: 'explorer', label: 'Knowledge Explorer', icon: Search },
            { id: 'graph', label: 'Knowledge Graph', icon: Network },
            { id: 'index', label: 'Chunk Index', icon: Database },
            { id: 'inspector', label: 'Prompt Inspector', icon: Layers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as KnowledgeTab)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1 — KNOWLEDGE EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-sm font-extrabold text-[#0F172A]">Hybrid RAG Search (Semantic + Keyword)</h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. What is Differential Reinforcement of Other Behavior?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={certification}
                  onChange={(e) => setCertification(e.target.value as typeof certification)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
                >
                  {CERT_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c === 'all' ? 'All Certifications' : c}</option>
                  ))}
                </select>
                <Button
                  onClick={handleSearch}
                  variant="primary"
                  size="md"
                  className="gap-2 shadow-lg shadow-blue-500/25"
                  disabled={isSearching || !query.trim()}
                >
                  {isSearching ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span>{isSearching ? 'Searching…' : 'RAG Search'}</span>
                </Button>
              </div>

              {/* Results */}
              {searchResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2">
                    <span>{searchResult.retrievedContexts.length} chunks retrieved</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{searchResult.latencyMs}ms</span>
                    </span>
                  </div>

                  {searchResult.retrievedContexts.map((ctx, idx) => (
                    <div key={ctx.chunkId} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-[#2563EB]">Source {idx + 1}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-mono text-[9px] uppercase">
                            {ctx.sourceType.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px]">
                            {ctx.category}
                          </span>
                        </div>
                        <div className="text-right space-x-3 text-[10px] font-mono text-slate-500">
                          <span>relevance {(ctx.relevanceScore * 100).toFixed(0)}%</span>
                          <span className="text-emerald-600 font-extrabold">conf {(ctx.confidenceScore * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{ctx.content}</p>
                    </div>
                  ))}

                  {/* Related Knowledge Graph Nodes */}
                  {searchResult.relatedNodes.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                        Knowledge Graph — Related Nodes
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchResult.relatedNodes.map((node) => (
                          <span
                            key={node.id}
                            className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100"
                          >
                            {node.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* TAB 2 — KNOWLEDGE GRAPH */}
        {activeTab === 'graph' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-sm font-extrabold text-[#0F172A]">Knowledge Graph Topology ({graph.nodes.length} nodes · {graph.edges.length} edges)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {graph.nodes.map((node) => {
                  const outgoing = graph.edges.filter((e) => e.sourceNodeId === node.id);
                  return (
                    <div key={node.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900">{node.label}</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[9px] uppercase">{node.type}</span>
                      </div>
                      <div className="text-slate-500">{node.category} · {node.certification}</div>
                      {outgoing.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {outgoing.map((edge) => {
                            const target = graph.nodes.find((n) => n.id === edge.targetNodeId);
                            return target ? (
                              <span key={edge.id} className="flex items-center space-x-1 text-[10px] text-slate-600">
                                <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                                <span>{edge.relationship.replace('_', ' ')}</span>
                                <span className="font-bold text-indigo-600">{target.label}</span>
                                <span className="text-slate-400">({edge.weight})</span>
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 3 — CHUNK INDEX */}
        {activeTab === 'index' && (
          <div className="space-y-4 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-sm font-extrabold text-[#0F172A]">Knowledge Chunk Index ({chunks.length} chunks)</h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {chunks.map((chunk) => (
                  <div key={chunk.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-bold text-[#2563EB] font-mono text-[10px]">{chunk.id}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] text-[9px] uppercase">{chunk.sourceType.replace('_', ' ')}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px]">{chunk.certification}</span>
                        {chunk.difficulty && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${chunk.difficulty === 'hard' ? 'bg-rose-50 text-rose-700' : chunk.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                            {chunk.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 leading-relaxed line-clamp-2">{chunk.content}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {chunk.keywords.slice(0, 4).map((kw) => (
                          <span key={kw} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-mono">{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {chunk.isIndexed ? (
                        <span className="flex items-center space-x-1 text-[10px] text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Indexed</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-[10px] text-amber-600 font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Queued</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 4 — PROMPT INSPECTOR */}
        {activeTab === 'inspector' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-sm font-extrabold text-[#0F172A]">LLM Context Window Inspector</h3>
              <p className="text-xs text-slate-500">
                Run a search on the Explorer tab first, then view the exact RAG context injected into the LLM system prompt before AI generation.
              </p>
              {llmContext ? (
                <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {llmContext}
                </pre>
              ) : (
                <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center text-slate-400 text-xs font-medium">
                  No retrieval context yet. Perform a Knowledge Explorer search first.
                </div>
              )}
            </Card>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
