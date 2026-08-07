import {
  KnowledgeChunk,
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  RetrievedContext,
  RAGSearchQuery,
  RAGSearchResult,
  RetrievalLog,
  EmbeddingQueueItem,
} from '@/types/rag-engine';

// ─── INTERNAL KNOWLEDGE CORPUS ─────────────────────────────────────────────
// Simulates pgvector-indexed chunks from the internal Question Bank,
// Flashcard Decks, Glossary, and Study Guides. In production, these
// would be fetched from Supabase using cosine similarity queries.

const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'chunk-001',
    sourceId: 'q-b01-1',
    sourceType: 'question_bank',
    certification: 'RBT',
    category: 'Behavior Reduction',
    subcategory: 'Differential Reinforcement',
    difficulty: 'medium',
    content:
      'Differential Reinforcement of Other Behavior (DRO) is a procedure in which reinforcement is delivered contingent upon the absence of the target problem behavior for a specified interval. It does not specify what alternative behavior should occur.',
    summary: 'DRO reinforces the absence of problem behavior within a time interval.',
    keywords: ['DRO', 'differential reinforcement', 'extinction', 'ABA', 'behavior reduction'],
    embeddingModel: 'text-embedding-ada-002',
    embeddingVersion: 'v1.2',
    isIndexed: true,
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-002',
    sourceId: 'glossary-001',
    sourceType: 'glossary_term',
    certification: 'all',
    category: 'Measurement',
    subcategory: 'Data Collection',
    difficulty: 'easy',
    content:
      'Continuous Measurement involves recording every instance of the target behavior during the observation period. Examples include frequency, rate, duration, latency, and inter-response time (IRT).',
    summary: 'Records every behavioral instance. Types: frequency, rate, duration, latency, IRT.',
    keywords: ['continuous measurement', 'frequency', 'rate', 'duration', 'latency', 'IRT'],
    embeddingModel: 'text-embedding-ada-002',
    embeddingVersion: 'v1.2',
    isIndexed: true,
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-003',
    sourceId: 'flashcard-deck-001',
    sourceType: 'flashcard_deck',
    certification: 'BCBA',
    category: 'Skill Acquisition',
    subcategory: 'Discrete Trial Training',
    difficulty: 'hard',
    content:
      'Discrete Trial Training (DTT) is a structured ABA teaching strategy that breaks skills into small, distinct components. Each trial consists of: (1) Discriminative Stimulus (SD), (2) Prompt (if needed), (3) Response, (4) Consequence, and (5) Inter-trial interval.',
    summary: 'DTT 5-step structure: SD → Prompt → Response → Consequence → ITI.',
    keywords: ['DTT', 'discrete trial', 'skill acquisition', 'SD', 'reinforcement', 'BCBA'],
    embeddingModel: 'text-embedding-ada-002',
    embeddingVersion: 'v1.2',
    isIndexed: true,
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-004',
    sourceId: 'study-guide-001',
    sourceType: 'study_guide',
    certification: 'RBT',
    category: 'Measurement',
    subcategory: 'Discontinuous Measurement',
    difficulty: 'medium',
    content:
      'Discontinuous Measurement methods include Momentary Time Sampling (MTS), Partial Interval Recording (PIR), and Whole Interval Recording (WIR). MTS records whether behavior is occurring at the moment the interval ends. PIR records if behavior occurs at any point during the interval. WIR records only if behavior occurs for the entire interval.',
    summary: 'MTS (end of interval), PIR (any occurrence), WIR (whole interval).',
    keywords: ['MTS', 'PIR', 'WIR', 'discontinuous measurement', 'time sampling'],
    embeddingModel: 'text-embedding-ada-002',
    embeddingVersion: 'v1.2',
    isIndexed: true,
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-005',
    sourceId: 'clinical-scenario-001',
    sourceType: 'clinical_scenario',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Professional Conduct',
    difficulty: 'hard',
    content:
      'According to the BACB Ethics Code 1.0, behavior analysts must maintain competence in their area of practice, seek supervision or consultation when encountering cases outside their area of expertise, and practice within the scope of their training and credentials.',
    summary: 'BACB Ethics 1.0: Maintain competence, seek supervision outside expertise scope.',
    keywords: ['ethics', 'BACB', 'competence', 'supervision', 'professional conduct', 'BCBA'],
    embeddingModel: 'text-embedding-ada-002',
    embeddingVersion: 'v1.2',
    isIndexed: true,
    createdAt: '2026-04-01T09:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
];

// ─── KNOWLEDGE GRAPH NODES ──────────────────────────────────────────────────
const KNOWLEDGE_GRAPH_NODES: KnowledgeGraphNode[] = [
  { id: 'node-01', label: 'Differential Reinforcement', type: 'concept', certification: 'RBT', category: 'Behavior Reduction', metadata: {} },
  { id: 'node-02', label: 'DRO', type: 'concept', certification: 'RBT', category: 'Behavior Reduction', metadata: {} },
  { id: 'node-03', label: 'DRA', type: 'concept', certification: 'RBT', category: 'Behavior Reduction', metadata: {} },
  { id: 'node-04', label: 'DTT', type: 'concept', certification: 'BCBA', category: 'Skill Acquisition', metadata: {} },
  { id: 'node-05', label: 'Continuous Measurement', type: 'topic', certification: 'all', category: 'Measurement', metadata: {} },
  { id: 'node-06', label: 'Discontinuous Measurement', type: 'topic', certification: 'all', category: 'Measurement', metadata: {} },
];

// ─── KNOWLEDGE GRAPH EDGES ──────────────────────────────────────────────────
const KNOWLEDGE_GRAPH_EDGES: KnowledgeGraphEdge[] = [
  { id: 'edge-01', sourceNodeId: 'node-01', targetNodeId: 'node-02', relationship: 'part_of', weight: 0.95 },
  { id: 'edge-02', sourceNodeId: 'node-01', targetNodeId: 'node-03', relationship: 'part_of', weight: 0.92 },
  { id: 'edge-03', sourceNodeId: 'node-05', targetNodeId: 'node-06', relationship: 'contrasts_with', weight: 0.88 },
  { id: 'edge-04', sourceNodeId: 'node-04', targetNodeId: 'node-01', relationship: 'related_to', weight: 0.72 },
];

const RETRIEVAL_LOGS: RetrievalLog[] = [];
const EMBEDDING_QUEUE: EmbeddingQueueItem[] = [];

// ─── CHUNKING HELPERS ───────────────────────────────────────────────────────
/**
 * Semantic chunking: splits text at sentence boundaries respecting a max
 * token window (≈512 tokens ≈ 2000 chars). In production this calls the
 * real tokenizer from the chosen embedding provider.
 */
function semanticChunk(text: string, maxChars: number = 1800, overlap: number = 200): string[] {
  if (text.length <= maxChars) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const chunks: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if ((current + sentence).length > maxChars) {
      chunks.push(current.trim());
      current = current.slice(-overlap) + sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

// ─── HYBRID SEARCH ──────────────────────────────────────────────────────────
/**
 * Hybrid Search: combines keyword BM25-style matching + semantic similarity
 * scoring. In production, semantic scoring comes from pgvector cosine
 * similarity queries against embeddings stored in Supabase.
 */
function hybridSearch(query: string, chunks: KnowledgeChunk[], topK: number = 5): RetrievedContext[] {
  const queryTerms = query.toLowerCase().split(/\s+/);

  const scored = chunks.map((chunk) => {
    const contentLower = chunk.content.toLowerCase();
    const keywordMatches = queryTerms.filter(
      (term) => contentLower.includes(term) || chunk.keywords.some((kw) => kw.toLowerCase().includes(term))
    ).length;

    const keywordScore = keywordMatches / queryTerms.length;
    // Simulate semantic similarity score (would be cosine similarity from pgvector)
    const semanticScore = keywordScore * 0.7 + Math.random() * 0.15;
    const relevanceScore = Math.min(keywordScore * 0.4 + semanticScore * 0.6, 1.0);
    const confidenceScore = Math.min(relevanceScore + (chunk.isIndexed ? 0.05 : 0), 1.0);

    return {
      chunkId: chunk.id,
      content: chunk.content,
      sourceType: chunk.sourceType,
      category: chunk.category,
      confidenceScore: parseFloat(confidenceScore.toFixed(2)),
      relevanceScore: parseFloat(relevanceScore.toFixed(2)),
    } as RetrievedContext;
  });

  // Re-rank by combined relevance + confidence, return topK
  return scored
    .sort((a, b) => (b.confidenceScore + b.relevanceScore) - (a.confidenceScore + a.relevanceScore))
    .slice(0, topK);
}

// ─── LLM CONTEXT BUILDER ────────────────────────────────────────────────────
/**
 * Assembles a structured RAG context string for injection into LLM system prompt.
 * Called by the AI Tutor engine (lib/ai-tutor-engine.ts) before every answer.
 */
export function buildLLMContext(contexts: RetrievedContext[]): string {
  if (contexts.length === 0) return '';
  const snippets = contexts
    .slice(0, 4)
    .map((ctx, i) => `[Source ${i + 1} | ${ctx.sourceType.replace('_', ' ')} | ${ctx.category} | confidence: ${(ctx.confidenceScore * 100).toFixed(0)}%]\n${ctx.content}`)
    .join('\n\n');
  return `===KNOWLEDGE BASE CONTEXT===\n${snippets}\n===END CONTEXT===`;
}

// ─── PUBLIC API ─────────────────────────────────────────────────────────────
/**
 * Primary RAG search entrypoint. Called by the AI Tutor, Adaptive Learning Engine,
 * and Study Planner to retrieve authoritative context before generating answers.
 */
export function ragSearch(searchQuery: RAGSearchQuery): RAGSearchResult {
  const start = Date.now();
  const { query, certification, category, difficulty, topK = 5 } = searchQuery;

  // Apply metadata filters
  let filtered = KNOWLEDGE_CHUNKS;
  if (certification && certification !== 'all') {
    filtered = filtered.filter((c) => c.certification === certification || c.certification === 'all');
  }
  if (category) {
    filtered = filtered.filter((c) => c.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter((c) => c.difficulty === difficulty);
  }

  const contexts = hybridSearch(query, filtered, topK);
  const relatedNodes = KNOWLEDGE_GRAPH_NODES.filter((node) =>
    contexts.some((ctx) => ctx.category === node.category)
  ).slice(0, 4);

  const latencyMs = Date.now() - start;

  // Log retrieval for analytics
  RETRIEVAL_LOGS.unshift({
    id: `rlog-${Date.now()}`,
    userId: searchQuery.userId,
    query,
    resultsCount: contexts.length,
    topConfidenceScore: contexts[0]?.confidenceScore ?? 0,
    latencyMs,
    timestamp: new Date().toISOString(),
  });

  return {
    query,
    retrievedContexts: contexts,
    relatedNodes,
    latencyMs,
  };
}

/**
 * Adds a new knowledge chunk to the corpus and queues it for embedding.
 */
export function ingestKnowledgeChunk(chunk: Omit<KnowledgeChunk, 'id' | 'isIndexed' | 'createdAt' | 'updatedAt'>): KnowledgeChunk {
  const newChunk: KnowledgeChunk = {
    ...chunk,
    id: `chunk-${Date.now()}`,
    isIndexed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  KNOWLEDGE_CHUNKS.unshift(newChunk);

  // Queue for embedding
  EMBEDDING_QUEUE.unshift({
    id: `eq-${Date.now()}`,
    chunkId: newChunk.id,
    status: 'pending',
    queuedAt: new Date().toISOString(),
  });

  return newChunk;
}

/**
 * Returns knowledge graph topology for Admin Knowledge Graph Viewer
 */
export function getKnowledgeGraph(): { nodes: KnowledgeGraphNode[]; edges: KnowledgeGraphEdge[] } {
  return { nodes: KNOWLEDGE_GRAPH_NODES, edges: KNOWLEDGE_GRAPH_EDGES };
}

/**
 * Returns all indexed knowledge chunks (for admin viewer)
 */
export function getAllKnowledgeChunks(): KnowledgeChunk[] {
  return [...KNOWLEDGE_CHUNKS];
}

/**
 * Returns retrieval logs for admin RAG analytics dashboard
 */
export function getRetrievalLogs(): RetrievalLog[] {
  return [...RETRIEVAL_LOGS];
}

/**
 * Returns embedding queue status for admin
 */
export function getEmbeddingQueue(): EmbeddingQueueItem[] {
  return [...EMBEDDING_QUEUE];
}

/**
 * Returns engine health metrics for Admin Knowledge Dashboard
 */
export function getRAGEngineMetrics() {
  return {
    totalChunks: KNOWLEDGE_CHUNKS.length,
    indexedChunks: KNOWLEDGE_CHUNKS.filter((c) => c.isIndexed).length,
    pendingEmbeddings: EMBEDDING_QUEUE.filter((e) => e.status === 'pending').length,
    graphNodes: KNOWLEDGE_GRAPH_NODES.length,
    graphEdges: KNOWLEDGE_GRAPH_EDGES.length,
    avgRetrievalLatencyMs: RETRIEVAL_LOGS.length
      ? Math.round(RETRIEVAL_LOGS.reduce((sum, l) => sum + l.latencyMs, 0) / RETRIEVAL_LOGS.length)
      : 0,
    totalRetrieval: RETRIEVAL_LOGS.length,
  };
}
