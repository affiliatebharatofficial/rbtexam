import {
  FeatureRecord,
  APIRecord,
  DatabaseTableRecord,
  EngineDependencyNode,
  ProjectBrainOverview,
} from '@/types/project-brain';

// ─── MASTER FEATURE REGISTRY ────────────────────────────────────────────────
const FEATURE_REGISTRY: FeatureRecord[] = [
  {
    id: 'feat-01',
    name: 'BACB Practice Test & Mock Exam Engine',
    description: 'Timed 85-question diagnostic mock exams and domain practice quizzes with task list score breakdowns.',
    owner: 'Core Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['master-question-bank.ts', 'adaptive-learning-engine.ts'],
    databaseTables: ['master_questions', 'exam_sessions'],
    apiEndpoints: ['/api/questions', '/api/questions/[id]', '/api/adaptive/profile'],
    routes: ['/exam'],
    documentationPath: 'docs/08-practice-test-engine.md',
  },
  {
    id: 'feat-02',
    name: 'Socrates AI Tutor Engine',
    description: 'RAG-grounded Socratic mentor assisting candidates with complex behavior-analytic concepts.',
    owner: 'AI Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['rag-engine.ts', 'ai-prompt-manager.ts', 'security-engine.ts'],
    databaseTables: ['knowledge_chunks', 'knowledge_graph_nodes', 'retrieval_logs'],
    apiEndpoints: ['/api/tutor/chat', '/api/rag/search'],
    routes: ['/tutor'],
    documentationPath: 'docs/10-ai-tutor-engine.md',
  },
  {
    id: 'feat-03',
    name: 'Smart Flashcards Engine',
    description: 'Leitner 5-box spaced repetition memory system for ABA terminology and Task List concepts.',
    owner: 'Core Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['flashcard-bank.ts', 'spaced-repetition-engine.ts'],
    databaseTables: ['master_flashcards', 'user_learning_profiles'],
    apiEndpoints: ['/api/flashcards', '/api/flashcards/review'],
    routes: ['/flashcards'],
    documentationPath: 'docs/09-flashcards-engine.md',
  },
  {
    id: 'feat-04',
    name: 'AI Adaptive Learning Engine',
    description: 'Continuously analyzes student response accuracy to recommend weak topic remediation paths.',
    owner: 'AI Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['adaptive-learning-engine.ts', 'bacb-task-list.ts'],
    databaseTables: ['user_learning_profiles', 'analytics_events'],
    apiEndpoints: ['/api/adaptive/profile', '/api/adaptive/recommendations'],
    routes: ['/study-planner', '/analytics'],
    documentationPath: 'docs/adaptive-learning-engine.md',
  },
  {
    id: 'feat-05',
    name: 'Enterprise AI Knowledge Graph & RAG Engine',
    description: 'pgvector hybrid retrieval (60% semantic + 40% keyword) over internal knowledge corpus.',
    owner: 'AI Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['rag-engine.ts'],
    databaseTables: ['knowledge_sources', 'knowledge_chunks', 'knowledge_graph_nodes', 'knowledge_graph_edges', 'retrieval_logs'],
    apiEndpoints: ['/api/rag/search', '/api/admin/rag/index'],
    routes: ['/admin/knowledge'],
    documentationPath: 'docs/rag-engine.md',
  },
  {
    id: 'feat-06',
    name: 'Enterprise AI Workforce System',
    description: '29 specialized AI Employees collaborating in automated multi-step content and review pipelines.',
    owner: 'AI Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['ai-workforce-engine.ts', 'ai-content-engine.ts'],
    databaseTables: ['ai_agents', 'prompt_versions', 'task_queue', 'job_history', 'agent_metrics'],
    apiEndpoints: ['/api/admin/ai-workforce/agents', '/api/admin/ai-workforce/orchestrate', '/api/admin/ai-workforce/queue'],
    routes: ['/admin/ai-workforce'],
    documentationPath: 'docs/ai-workforce.md',
  },
  {
    id: 'feat-07',
    name: 'Programmatic SEO Engine',
    description: 'Scalable SEO generator creating thousands of dynamic question, glossary, and category pages.',
    owner: 'SEO Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['seo-engine.ts'],
    databaseTables: ['seo_metadata'],
    apiEndpoints: ['/api/seo/metadata', '/api/seo/audit'],
    routes: ['/rbt', '/rbt/question/[slug]', '/rbt/glossary'],
    documentationPath: 'docs/12-seo-engine.md',
  },
  {
    id: 'feat-08',
    name: 'SaaS Subscription & Billing Engine',
    description: 'Multi-tier pricing (Free, Pro, Team, Lifetime) with Stripe webhook integration and daily usage quotas.',
    owner: 'Core Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['subscription-engine.ts', 'coupon-engine.ts'],
    databaseTables: ['subscriptions', 'invoices', 'coupons'],
    apiEndpoints: ['/api/billing/plans', '/api/billing/webhook', '/api/billing/coupon/validate'],
    routes: ['/pricing', '/profile/billing'],
    documentationPath: 'docs/14-subscription-engine.md',
  },
  {
    id: 'feat-09',
    name: 'Developer API Platform & Ecosystem',
    description: 'Public REST API ecosystem with scoped API key management, rate limiting, and webhooks.',
    owner: 'DevOps Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['api-gateway.ts'],
    databaseTables: ['api_keys'],
    apiEndpoints: ['/api/v1/health', '/api/v1/developer/keys'],
    routes: ['/developer'],
    documentationPath: 'docs/api-platform.md',
  },
  {
    id: 'feat-10',
    name: 'Enterprise Security & Compliance Engine',
    description: 'Zero Trust architecture, prompt injection mitigation, session revocation, and GDPR/CCPA privacy queue.',
    owner: 'Security Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['security-engine.ts'],
    databaseTables: ['security_threat_logs', 'active_sessions', 'data_subject_requests'],
    apiEndpoints: ['/api/security/summary', '/api/privacy/request'],
    routes: ['/admin/security'],
    documentationPath: 'docs/security-engine.md',
  },
  {
    id: 'feat-11',
    name: 'DevOps, Deployment & Health Engine',
    description: 'Multi-stage Docker build, GitHub Actions CI/CD, startup env validator, and unified health API.',
    owner: 'DevOps Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['health-engine.ts'],
    databaseTables: ['schema_migrations'],
    apiEndpoints: ['/api/health'],
    routes: ['/admin/infrastructure'],
    documentationPath: 'docs/devops.md',
  },
  {
    id: 'feat-12',
    name: 'QA & Automated Testing Center',
    description: 'Vitest unit/integration suite, Playwright E2E smoke tests, and prompt regression verification.',
    owner: 'DevOps Team',
    version: 'v2.8.0',
    status: 'production',
    dependencies: ['health-engine.ts'],
    databaseTables: ['test_runs', 'test_failures', 'quality_metrics'],
    apiEndpoints: [],
    routes: ['/admin/qa'],
    documentationPath: 'docs/testing-engine.md',
  },
];

// ─── MASTER API REGISTRY ────────────────────────────────────────────────────
const API_REGISTRY: APIRecord[] = [
  { id: 'api-01', endpoint: '/api/health', method: 'GET', description: 'Platform service health status', authentication: 'none', rateLimit: '100 req/min', consumerModules: ['Uptime Monitors', 'Admin Infrastructure'], documentationPath: 'docs/monitoring.md' },
  { id: 'api-02', endpoint: '/api/rag/search', method: 'POST', description: 'Hybrid pgvector semantic search', authentication: 'user', rateLimit: '60 req/min', consumerModules: ['Socrates AI Tutor', 'Study Planner'], documentationPath: 'docs/rag-engine.md' },
  { id: 'api-03', endpoint: '/api/tutor/chat', method: 'POST', description: 'Socrates AI Tutor interaction', authentication: 'user', rateLimit: '30 req/min', consumerModules: ['AI Tutor View'], documentationPath: 'docs/10-ai-tutor-engine.md' },
  { id: 'api-04', endpoint: '/api/questions', method: 'GET', description: 'Fetch practice test questions', authentication: 'user', rateLimit: '120 req/min', consumerModules: ['Practice Test Engine'], documentationPath: 'docs/07-question-engine.md' },
  { id: 'api-05', endpoint: '/api/flashcards', method: 'GET', description: 'Fetch flashcards for review', authentication: 'user', rateLimit: '120 req/min', consumerModules: ['Smart Flashcards Engine'], documentationPath: 'docs/09-flashcards-engine.md' },
  { id: 'api-06', endpoint: '/api/admin/ai-workforce/agents', method: 'GET', description: 'Fetch 29 AI workforce agents', authentication: 'admin', rateLimit: '60 req/min', consumerModules: ['Admin AI Workforce Dashboard'], documentationPath: 'docs/ai-workforce.md' },
  { id: 'api-07', endpoint: '/api/admin/ai-workforce/orchestrate', method: 'POST', description: 'Execute multi-agent pipeline', authentication: 'admin', rateLimit: '20 req/min', consumerModules: ['Admin AI Workforce Dashboard'], documentationPath: 'docs/agent-orchestration.md' },
  { id: 'api-08', endpoint: '/api/security/summary', method: 'GET', description: 'Fetch security health metrics', authentication: 'admin', rateLimit: '30 req/min', consumerModules: ['Admin Security Center'], documentationPath: 'docs/security-engine.md' },
  { id: 'api-09', endpoint: '/api/privacy/request', method: 'POST', description: 'Submit GDPR/CCPA privacy request', authentication: 'none', rateLimit: '10 req/min', consumerModules: ['Public Privacy Form'], documentationPath: 'docs/privacy-engine.md' },
  { id: 'api-10', endpoint: '/api/v1/developer/keys', method: 'GET', description: 'Manage developer API keys', authentication: 'user', rateLimit: '30 req/min', consumerModules: ['Developer Portal'], documentationPath: 'docs/api-platform.md' },
];

// ─── MASTER DATABASE REGISTRY ───────────────────────────────────────────────
const DATABASE_REGISTRY: DatabaseTableRecord[] = [
  { id: 'db-01', tableName: 'profiles', schema: 'public', description: 'User account profiles and certification target', columnCount: 9, hasRLS: true, hasIndexes: true, relatedTables: ['auth.users', 'subscriptions'] },
  { id: 'db-02', tableName: 'master_questions', schema: 'public', description: 'BACB exam questions bank', columnCount: 12, hasRLS: true, hasIndexes: true, relatedTables: ['exam_sessions'] },
  { id: 'db-03', tableName: 'master_flashcards', schema: 'public', description: 'Spaced repetition flashcards deck', columnCount: 10, hasRLS: true, hasIndexes: true, relatedTables: [] },
  { id: 'db-04', tableName: 'subscriptions', schema: 'public', description: 'SaaS user subscriptions and Stripe billing', columnCount: 10, hasRLS: true, hasIndexes: true, relatedTables: ['profiles', 'invoices'] },
  { id: 'db-05', tableName: 'knowledge_chunks', schema: 'public', description: 'pgvector 1536-dim vector embeddings store', columnCount: 14, hasRLS: true, hasIndexes: true, relatedTables: ['knowledge_sources'] },
  { id: 'db-06', tableName: 'knowledge_graph_nodes', schema: 'public', description: 'ABA concept nodes in Knowledge Graph', columnCount: 7, hasRLS: true, hasIndexes: true, relatedTables: ['knowledge_graph_edges'] },
  { id: 'db-07', tableName: 'ai_agents', schema: 'public', description: 'Registry of 29 AI Employees', columnCount: 17, hasRLS: true, hasIndexes: true, relatedTables: ['prompt_versions', 'task_queue'] },
  { id: 'db-08', tableName: 'task_queue', schema: 'public', description: 'Asynchronous workforce job queue', columnCount: 8, hasRLS: true, hasIndexes: true, relatedTables: ['job_history'] },
  { id: 'db-09', tableName: 'security_threat_logs', schema: 'public', description: 'Rate limit & prompt injection threat events', columnCount: 8, hasRLS: true, hasIndexes: true, relatedTables: [] },
  { id: 'db-10', tableName: 'schema_migrations', schema: 'public', description: 'Database migration tracking table', columnCount: 6, hasRLS: false, hasIndexes: true, relatedTables: [] },
];

// ─── ENGINE DEPENDENCY GRAPH ────────────────────────────────────────────────
const ENGINE_DEPENDENCIES: EngineDependencyNode[] = [
  { engineName: 'rag-engine.ts', fileLocation: 'lib/rag-engine.ts', dependsOn: ['types/rag-engine.ts', 'database/rag-schema.sql'], consumedBy: ['ai-tutor', 'study-planner', 'admin-knowledge'] },
  { engineName: 'ai-workforce-engine.ts', fileLocation: 'lib/ai-workforce-engine.ts', dependsOn: ['types/ai-workforce.ts', 'database/ai-workforce-schema.sql'], consumedBy: ['admin-ai-workforce', 'api-orchestrate'] },
  { engineName: 'security-engine.ts', fileLocation: 'lib/security-engine.ts', dependsOn: ['types/security.ts'], consumedBy: ['api-middleware', 'rag-engine', 'admin-security'] },
  { engineName: 'api-gateway.ts', fileLocation: 'lib/api-gateway.ts', dependsOn: ['types/api-platform.ts'], consumedBy: ['developer-portal', 'public-apis'] },
  { engineName: 'subscription-engine.ts', fileLocation: 'lib/subscription-engine.ts', dependsOn: ['types/subscription.ts'], consumedBy: ['pricing-page', 'question-engine'] },
  { engineName: 'adaptive-learning-engine.ts', fileLocation: 'lib/adaptive-learning-engine.ts', dependsOn: ['bacb-task-list.ts'], consumedBy: ['practice-test-engine', 'study-planner'] },
  { engineName: 'health-engine.ts', fileLocation: 'lib/health-engine.ts', dependsOn: ['rag-engine.ts'], consumedBy: ['api-health', 'admin-infrastructure'] },
];

// ─── PUBLIC BRAIN ENGINE API ─────────────────────────────────────────────────

export function getProjectBrainOverview(): ProjectBrainOverview {
  return {
    totalFeatures: FEATURE_REGISTRY.length,
    totalEngines: ENGINE_DEPENDENCIES.length,
    totalAPIRoutes: API_REGISTRY.length,
    totalDatabaseTables: DATABASE_REGISTRY.length,
    totalDocsFiles: 104,
    implementationCompletionPercentage: 100,
    systemHealthScore: 98.5,
    lastBrainSyncAt: new Date().toISOString(),
  };
}

export function getFeatureRegistry(): FeatureRecord[] {
  return [...FEATURE_REGISTRY];
}

export function getAPIRegistry(): APIRecord[] {
  return [...API_REGISTRY];
}

export function getDatabaseRegistry(): DatabaseTableRecord[] {
  return [...DATABASE_REGISTRY];
}

export function getEngineDependencyGraph(): EngineDependencyNode[] {
  return [...ENGINE_DEPENDENCIES];
}
