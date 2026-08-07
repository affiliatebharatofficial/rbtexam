/**
 * RAG Retrieval Quality Tests
 *
 * These tests lock the minimum retrieval quality thresholds.
 * A failing test here means the RAG engine's accuracy has degraded.
 */

import { describe, it, expect } from 'vitest';
import { ragSearch, buildLLMContext } from '@/lib/rag-engine';

const KNOWN_QUERIES = [
  {
    query: 'differential reinforcement DRO',
    expectedCategory: 'Behavior Reduction',
    expectedKeyword: 'DRO',
  },
  {
    query: 'continuous measurement frequency rate duration',
    expectedCategory: 'Measurement',
    expectedKeyword: 'continuous',
  },
  {
    query: 'discrete trial training DTT skill acquisition',
    expectedCategory: 'Skill Acquisition',
    expectedKeyword: 'DTT',
  },
];

describe('RAG Retrieval Quality — Known Good Queries', () => {
  KNOWN_QUERIES.forEach(({ query, expectedCategory, expectedKeyword }) => {
    it(`retrieves relevant context for: "${query.slice(0, 50)}"`, () => {
      const result = ragSearch({ query, topK: 3 });
      expect(result.retrievedContexts.length).toBeGreaterThan(0);

      const topCtx = result.retrievedContexts[0];
      // Top result should be from the expected category
      expect(topCtx.category.toLowerCase()).toContain(expectedCategory.toLowerCase());
      // Top result content should contain expected keyword
      expect(topCtx.content.toLowerCase()).toContain(expectedKeyword.toLowerCase());
      // Confidence should be above 0
      expect(topCtx.confidenceScore).toBeGreaterThan(0);
    });
  });
});

describe('RAG Context Builder — Quality Gates', () => {
  it('context for measurement query contains source label', () => {
    const result = ragSearch({ query: 'measurement frequency', topK: 2 });
    const ctx = buildLLMContext(result.retrievedContexts);
    expect(ctx).toContain('Source 1');
    expect(ctx).toMatch(/confidence: \d+%/);
  });

  it('context does not exceed expected size for topK=4', () => {
    const result = ragSearch({ query: 'reinforcement', topK: 4 });
    const ctx = buildLLMContext(result.retrievedContexts);
    // Context should be under 8000 chars (safe for most LLM context windows)
    expect(ctx.length).toBeLessThan(8000);
  });
});
