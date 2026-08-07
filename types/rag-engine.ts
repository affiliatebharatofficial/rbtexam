// Enterprise AI Knowledge Graph & RAG Engine - Core Types

export type KnowledgeSourceType =
  | 'question_bank'
  | 'flashcard_deck'
  | 'glossary_term'
  | 'study_guide'
  | 'blog_article'
  | 'clinical_scenario'
  | 'case_study'
  | 'ai_notes'
  | 'user_bookmark'
  | 'user_notes';

export type CertificationTarget = 'RBT' | 'BCaBA' | 'BCBA' | 'all';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface KnowledgeChunk {
  id: string;
  sourceId: string;
  sourceType: KnowledgeSourceType;
  certification: CertificationTarget;
  category: string;
  subcategory?: string;
  difficulty?: DifficultyLevel;
  content: string;         // Raw text content of the chunk
  summary?: string;        // AI-generated summary
  keywords: string[];
  embeddingModel: string;  // e.g. "text-embedding-ada-002"
  embeddingVersion: string;
  isIndexed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;           // e.g. "Reinforcement"
  type: 'topic' | 'concept' | 'question' | 'flashcard' | 'definition' | 'scenario';
  certification: CertificationTarget;
  category: string;
  metadata: Record<string, any>;
}

export interface KnowledgeGraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationship: 'related_to' | 'prerequisite_of' | 'example_of' | 'contrasts_with' | 'part_of';
  weight: number;          // 0.0 – 1.0 relevance weight
}

export interface RetrievedContext {
  chunkId: string;
  content: string;
  sourceType: KnowledgeSourceType;
  category: string;
  confidenceScore: number;   // 0.0 – 1.0
  relevanceScore: number;    // Hybrid search score
  sourceUrl?: string;
}

export interface RAGSearchQuery {
  query: string;
  userId?: string;
  certification?: CertificationTarget;
  category?: string;
  difficulty?: DifficultyLevel;
  topK?: number;             // Default 5
}

export interface RAGSearchResult {
  query: string;
  retrievedContexts: RetrievedContext[];
  synthesizedAnswer?: string;
  relatedNodes: KnowledgeGraphNode[];
  latencyMs: number;
}

export interface RetrievalLog {
  id: string;
  userId?: string;
  query: string;
  resultsCount: number;
  topConfidenceScore: number;
  latencyMs: number;
  timestamp: string;
}

export interface EmbeddingQueueItem {
  id: string;
  chunkId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  queuedAt: string;
}
