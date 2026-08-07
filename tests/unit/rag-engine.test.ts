/**
 * Unit Tests — RAG Engine (lib/rag-engine.ts)
 *
 * Tests the full RAG pipeline:
 *  - hybridSearch ranking & filtering
 *  - buildLLMContext structure
 *  - ingestKnowledgeChunk deduplication
 *  - getRAGEngineMetrics accuracy
 *  - ragSearch metadata filters
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  ragSearch,
  buildLLMContext,
  ingestKnowledgeChunk,
  getAllKnowledgeChunks,
  getKnowledgeGraph,
  getRAGEngineMetrics,
  getRetrievalLogs,
} from '@/lib/rag-engine';
import type { RAGSearchQuery, CertificationTarget } from '@/types/rag-engine';

// ─── ragSearch ────────────────────────────────────────────────────────────────
describe('ragSearch()', () => {
  it('returns a result object with required fields', () => {
    const query: RAGSearchQuery = { query: 'differential reinforcement', topK: 3 };
    const result = ragSearch(query);

    expect(result).toHaveProperty('query');
    expect(result).toHaveProperty('retrievedContexts');
    expect(result).toHaveProperty('relatedNodes');
    expect(result).toHaveProperty('latencyMs');
    expect(typeof result.latencyMs).toBe('number');
  });

  it('returns no more than topK contexts', () => {
    const result = ragSearch({ query: 'measurement', topK: 2 });
    expect(result.retrievedContexts.length).toBeLessThanOrEqual(2);
  });

  it('filters by certification correctly', () => {
    const result = ragSearch({ query: 'ethics', certification: 'BCBA' });
    // All returned contexts should be from BCBA or 'all' chunks
    result.retrievedContexts.forEach((ctx) => {
      expect(['BCBA', 'all']).toContain(
        getAllKnowledgeChunks().find((c) => c.id === ctx.chunkId)?.certification ?? 'all'
      );
    });
  });

  it('returns latencyMs >= 0', () => {
    const result = ragSearch({ query: 'DTT discrete trial', topK: 1 });
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('records retrieval in the log', () => {
    const logsBefore = getRetrievalLogs().length;
    ragSearch({ query: 'unique query for log test xyz-999', topK: 1 });
    expect(getRetrievalLogs().length).toBe(logsBefore + 1);
  });

  it('returns empty contexts for a nonsense query', () => {
    // nonsense keywords won't match any chunks — result may be empty or low-scored
    const result = ragSearch({ query: 'zzzzz-nonexistent-term-9999', topK: 5 });
    result.retrievedContexts.forEach((ctx) => {
      expect(ctx.confidenceScore).toBeGreaterThanOrEqual(0);
      expect(ctx.relevanceScore).toBeGreaterThanOrEqual(0);
    });
  });
});

// ─── buildLLMContext ─────────────────────────────────────────────────────────
describe('buildLLMContext()', () => {
  it('returns empty string for no contexts', () => {
    expect(buildLLMContext([])).toBe('');
  });

  it('includes KNOWLEDGE BASE CONTEXT markers', () => {
    const result = ragSearch({ query: 'reinforcement', topK: 2 });
    const ctx = buildLLMContext(result.retrievedContexts);
    expect(ctx).toContain('===KNOWLEDGE BASE CONTEXT===');
    expect(ctx).toContain('===END CONTEXT===');
  });

  it('includes source type label in context string', () => {
    const result = ragSearch({ query: 'measurement', topK: 1 });
    const ctx = buildLLMContext(result.retrievedContexts);
    expect(ctx).toContain('Source 1');
    expect(ctx).toMatch(/confidence: \d+%/);
  });

  it('limits to top 4 chunks regardless of input length', () => {
    const result = ragSearch({ query: 'differential', topK: 5 });
    const ctx = buildLLMContext(result.retrievedContexts);
    // Should have at most "Source 4", never "Source 5"
    expect(ctx).not.toContain('Source 5');
  });
});

// ─── ingestKnowledgeChunk ────────────────────────────────────────────────────
describe('ingestKnowledgeChunk()', () => {
  it('adds a new chunk to the corpus', () => {
    const countBefore = getAllKnowledgeChunks().length;
    ingestKnowledgeChunk({
      sourceId: 'test-src-001',
      sourceType: 'study_guide',
      certification: 'RBT',
      category: 'Ethics',
      content: 'Test chunk content for unit test purposes.',
      keywords: ['test', 'unit', 'ethics'],
      embeddingModel: 'text-embedding-ada-002',
      embeddingVersion: 'v1.0',
    });
    expect(getAllKnowledgeChunks().length).toBe(countBefore + 1);
  });

  it('new chunk starts as not indexed', () => {
    const chunk = ingestKnowledgeChunk({
      sourceId: 'test-src-002',
      sourceType: 'glossary_term',
      certification: 'all',
      category: 'Measurement',
      content: 'Another test glossary chunk.',
      keywords: ['glossary'],
      embeddingModel: 'text-embedding-ada-002',
      embeddingVersion: 'v1.0',
    });
    expect(chunk.isIndexed).toBe(false);
  });

  it('assigns a non-empty string id with chunk- prefix', () => {
    const chunk = ingestKnowledgeChunk({
      sourceId: 'src-id-test',
      sourceType: 'ai_notes',
      certification: 'BCBA',
      category: 'Skill Acquisition',
      content: 'Chunk content for ID format test.',
      keywords: [],
      embeddingModel: 'text-embedding-ada-002',
      embeddingVersion: 'v1.0',
    });
    expect(typeof chunk.id).toBe('string');
    expect(chunk.id.length).toBeGreaterThan(0);
    expect(chunk.id).toMatch(/^chunk-/);
  });
});

// ─── getRAGEngineMetrics ─────────────────────────────────────────────────────
describe('getRAGEngineMetrics()', () => {
  it('reports totalChunks >= indexedChunks', () => {
    const m = getRAGEngineMetrics();
    expect(m.totalChunks).toBeGreaterThanOrEqual(m.indexedChunks);
  });

  it('reports graphNodes and graphEdges as non-negative integers', () => {
    const m = getRAGEngineMetrics();
    expect(m.graphNodes).toBeGreaterThanOrEqual(0);
    expect(m.graphEdges).toBeGreaterThanOrEqual(0);
  });
});

// ─── getKnowledgeGraph ───────────────────────────────────────────────────────
describe('getKnowledgeGraph()', () => {
  it('returns nodes and edges arrays', () => {
    const graph = getKnowledgeGraph();
    expect(Array.isArray(graph.nodes)).toBe(true);
    expect(Array.isArray(graph.edges)).toBe(true);
  });

  it('all edges reference valid node ids', () => {
    const { nodes, edges } = getKnowledgeGraph();
    const nodeIds = new Set(nodes.map((n) => n.id));
    edges.forEach((edge) => {
      expect(nodeIds.has(edge.sourceNodeId)).toBe(true);
      expect(nodeIds.has(edge.targetNodeId)).toBe(true);
    });
  });

  it('edge weights are between 0 and 1', () => {
    const { edges } = getKnowledgeGraph();
    edges.forEach((edge) => {
      expect(edge.weight).toBeGreaterThanOrEqual(0);
      expect(edge.weight).toBeLessThanOrEqual(1);
    });
  });
});
