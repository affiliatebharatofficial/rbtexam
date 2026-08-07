// Enterprise AI Workforce System - Type Definitions

export type AgentRole =
  | 'ai_tutor'
  | 'question_writer'
  | 'flashcard_writer'
  | 'scenario_writer'
  | 'glossary_writer'
  | 'study_guide_writer'
  | 'seo_specialist'
  | 'content_reviewer'
  | 'fact_checker'
  | 'grammar_reviewer'
  | 'internal_linking_expert'
  | 'metadata_writer'
  | 'schema_generator'
  | 'image_prompt_creator'
  | 'learning_coach'
  | 'study_planner'
  | 'adaptive_learning_agent'
  | 'weak_topic_analyzer'
  | 'exam_readiness_coach'
  | 'analytics_assistant'
  | 'support_agent'
  | 'billing_assistant'
  | 'admin_assistant'
  | 'notification_assistant'
  | 'translation_agent'
  | 'knowledge_curator'
  | 'prompt_engineer'
  | 'rag_optimizer'
  | 'qa_agent';

export type AIModelProvider = 'openai' | 'gemini' | 'anthropic' | 'openrouter' | 'deepseek';

export type ModelName =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gemini-1.5-pro'
  | 'claude-3-5-sonnet'
  | 'deepseek-v3'
  | 'deepseek-r1';

export type WorkQueueType =
  | 'content_queue'
  | 'review_queue'
  | 'seo_queue'
  | 'publishing_queue'
  | 'notification_queue'
  | 'ai_tutor_queue'
  | 'translation_queue'
  | 'knowledge_queue';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'in_review';

export interface AIAgent {
  id: string;
  role: AgentRole;
  displayName: string;
  description: string;
  department: 'content' | 'learning' | 'seo' | 'quality' | 'operations' | 'technical';
  modelProvider: AIModelProvider;
  modelName: ModelName;
  temperature: number;
  maxTokens: number;
  promptVersion: string;
  systemPrompt: string;
  isActive: boolean;
  requiresHumanApproval: boolean;
  totalJobsProcessed: number;
  successRatePercentage: number;
  averageLatencyMs: number;
  totalCostUSD: number;
  createdAt: string;
  updatedAt: string;
}

export interface PromptVersion {
  id: string;
  agentRole: AgentRole;
  version: string;
  systemPrompt: string;
  userPromptTemplate: string;
  changeLog: string;
  author: string;
  isCurrent: boolean;
  createdAt: string;
}

export interface WorkforceJob {
  id: string;
  queueType: WorkQueueType;
  primaryAgentRole: AgentRole;
  pipelineRoles: AgentRole[];
  currentStepIndex: number;
  payload: Record<string, any>;
  stepResults: Array<{
    agentRole: AgentRole;
    output: string;
    score?: number;
    approved: boolean;
    latencyMs: number;
    tokensUsed: number;
    costUSD: number;
    timestamp: string;
  }>;
  finalOutput?: string;
  status: JobStatus;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export interface AgentMetrics {
  role: AgentRole;
  jobsProcessedToday: number;
  avgLatencyMs: number;
  successRate: number;
  totalTokensUsed: number;
  totalCostUSD: number;
  lastActiveAt: string;
}

export interface WorkforceMetricsSummary {
  totalAgents: number;
  activeAgentsCount: number;
  pendingJobsInQueue: number;
  completedJobsToday: number;
  overallSuccessRatePercentage: number;
  totalTokenUsage24h: number;
  totalCost24hUSD: number;
}
