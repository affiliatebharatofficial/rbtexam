// Socrates AI Tutor Engine - Core Type Definitions

export type CertificationLevel = 'RBT' | 'BCaBA' | 'BCBA';

export type AIProvider = 'openai' | 'gemini' | 'openrouter' | 'anthropic';

export type PromptMode =
  | 'socratic_mentor'
  | 'question_explainer'
  | 'scenario_analyzer'
  | 'flashcard_generator'
  | 'quiz_generator';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  clinicalInsight?: {
    concept: string;
    simpleExplanation: string;
    clinicalExample: string;
    examTip: string;
    mnemonicTip?: string;
    commonMistakes?: string;
    relatedTopics?: string[];
    suggestedFlashcards?: string[];
  };
  scenarioAnalysis?: {
    problemBehavior: string;
    antecedent: string;
    behavior: string;
    consequence: string;
    replacementBehavior: string;
    interventionStrategy: string;
    reinforcementSchedule: string;
    ethicalConsiderations: string;
    documentationTip: string;
  };
}

export interface ConversationSession {
  id: string; // UUID v4
  userId: string;
  title: string;
  certification: CertificationLevel;
  mode: PromptMode;
  messages: ChatMessage[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateMemoryContext {
  userId: string;
  fullName: string;
  certification: CertificationLevel;
  readinessScore: number;
  weakTopics: string[]; // e.g. ['D-04 Differential Reinforcement', 'C-04 DTT']
  strongTopics: string[];
  targetExamDate: string;
  recentMockScore?: number;
  masteredFlashcardsCount: number;
}

export interface PromptTemplate {
  id: string;
  mode: PromptMode;
  title: string;
  systemPrompt: string;
  provider: AIProvider;
  model: string;
  temperature: number;
  maxTokens: number;
  isActive: boolean;
  version: number;
  updatedAt: string;
}

export interface AIUsageLog {
  id: string;
  userId: string;
  conversationId: string;
  provider: AIProvider;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUSD: number;
  createdAt: string;
}
