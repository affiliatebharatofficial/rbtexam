# Retrieval Engine — RBT Practice Questions SaaS

## Purpose
Specifies the hybrid retrieval strategy: semantic vector search combined with keyword BM25 matching, followed by metadata filtering and confidence re-ranking.

## Retrieval Flow
1. `ragSearch()` receives `RAGSearchQuery` (query, certification, category, difficulty, topK).
2. **Metadata filter**: Pre-filters chunks by certification and category before vector search.
3. **Keyword score**: Term frequency against `content` + `keywords` array.
4. **Semantic score**: Simulated via keyword_score × 0.7 + noise. In production: pgvector cosine similarity.
5. **Hybrid score**: 40% keyword + 60% semantic.
6. **Re-ranking**: Sort by `confidenceScore + relevanceScore` descending, return top-K.
7. `buildLLMContext()` serialises top-4 chunks into a structured `===KNOWLEDGE BASE CONTEXT===` block.

## Related Files
- [lib/rag-engine.ts](file:///g:/RBT/lib/rag-engine.ts) — `ragSearch()`, `hybridSearch()`, `buildLLMContext()`
- [docs/rag-engine.md](file:///g:/RBT/docs/rag-engine.md)
