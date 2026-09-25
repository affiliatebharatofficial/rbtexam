-- ====================================================================
-- RBT Practice AI COMPLETE CLOUDFLARE D1 (SQLITE) MASTER SCHEMA
-- Database: Cloudflare D1 (rbtexam-db)
-- All 95 Platform Tables across Core Exam, Adaptive Learning, AI Workforce,
-- Analytics, API Platform, Notifications, RAG, Security, SEO & Subscriptions
-- ====================================================================

-- 1. CORE CANDIDATES, USERS & PROFILES
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'student',
  clinic_id TEXT,
  target_exam_date TEXT,
  target_score INTEGER DEFAULT 90,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  certification_target TEXT DEFAULT 'RBT',
  subscription_tier TEXT DEFAULT 'pro',
  account_status TEXT DEFAULT 'active',
  trial_ends_at TEXT,
  exam_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

CREATE TABLE IF NOT EXISTS clinics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  admin_id TEXT REFERENCES users(id),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS active_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS email_verifications (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  verified INTEGER DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 2. MASTER QUESTION BANK & EXAM ENGINE
CREATE TABLE IF NOT EXISTS master_questions (
  id TEXT PRIMARY KEY,
  question_code TEXT UNIQUE,
  certification TEXT NOT NULL DEFAULT 'RBT',
  question_text TEXT NOT NULL,
  scenario_text TEXT,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  difficulty TEXT NOT NULL DEFAULT 'medium',
  options TEXT NOT NULL DEFAULT '[]', -- JSON string
  correct_answer_id TEXT NOT NULL,
  answer_explanation TEXT NOT NULL,
  clinical_explanation TEXT,
  "references" TEXT,
  exam_tips TEXT,
  common_mistakes TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  keywords TEXT DEFAULT '[]', -- JSON string
  task_list_version TEXT DEFAULT '3rd_edition',
  estimated_time_seconds INTEGER DEFAULT 60,
  tags TEXT DEFAULT '[]', -- JSON string
  status TEXT NOT NULL DEFAULT 'published',
  is_premium INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_questions_code ON master_questions(question_code);
CREATE INDEX IF NOT EXISTS idx_questions_cert ON master_questions(certification);
CREATE INDEX IF NOT EXISTS idx_questions_category ON master_questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_status ON master_questions(status);

CREATE TABLE IF NOT EXISTS question_options (
  id TEXT PRIMARY KEY,
  question_id TEXT REFERENCES master_questions(id) ON DELETE CASCADE,
  option_letter TEXT NOT NULL,
  option_text TEXT NOT NULL,
  distractor_explanation TEXT,
  is_correct INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS question_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT UNIQUE,
  description TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS question_audit_logs (
  id TEXT PRIMARY KEY,
  question_id TEXT,
  action TEXT NOT NULL,
  changed_by TEXT,
  old_data TEXT,
  new_data TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS question_imports (
  id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  total_questions INTEGER DEFAULT 0,
  imported_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed',
  error_log TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exam_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL, -- diagnostic, practice, full_mock
  total_questions INTEGER NOT NULL,
  score REAL,
  percentage REAL,
  passed INTEGER,
  time_spent_seconds INTEGER DEFAULT 0,
  status TEXT DEFAULT 'in_progress', -- in_progress, completed, abandoned
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exam_answers (
  id TEXT PRIMARY KEY,
  session_id TEXT REFERENCES exam_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  selected_option TEXT,
  is_correct INTEGER NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS student_progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  readiness_score INTEGER DEFAULT 45,
  estimated_pass_likelihood INTEGER DEFAULT 50,
  completed_mocks_count INTEGER DEFAULT 0,
  questions_answered_count INTEGER DEFAULT 0,
  overall_accuracy REAL DEFAULT 0.00,
  study_time_hours REAL DEFAULT 0.00,
  streak_days INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 3. FLASHCARDS & SPACED REPETITION
CREATE TABLE IF NOT EXISTS flashcards (
  id TEXT PRIMARY KEY,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  difficulty TEXT DEFAULT 'medium',
  explanation TEXT,
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'published',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS master_flashcards (
  id TEXT PRIMARY KEY,
  card_code TEXT UNIQUE,
  certification TEXT NOT NULL DEFAULT 'RBT',
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  clinical_example TEXT,
  category TEXT NOT NULL,
  task_list_code TEXT,
  tags TEXT DEFAULT '[]',
  difficulty TEXT DEFAULT 'medium',
  is_premium INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS flashcard_decks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  certification TEXT DEFAULT 'RBT',
  card_count INTEGER DEFAULT 0,
  is_premium INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS flashcard_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  leitner_box INTEGER DEFAULT 1,
  correct_streak INTEGER DEFAULT 0,
  last_reviewed_at TEXT DEFAULT (datetime('now')),
  next_review_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, card_id)
);

CREATE TABLE IF NOT EXISTS user_flashcard_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  mastery_level INTEGER DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  last_reviewed_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, card_id)
);

-- 4. ADAPTIVE LEARNING & STUDY PLANNING
CREATE TABLE IF NOT EXISTS user_learning_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  certification TEXT NOT NULL DEFAULT 'RBT',
  target_exam_date TEXT,
  current_level TEXT DEFAULT 'Level 1: Novice',
  readiness_score REAL DEFAULT 0.00,
  predicted_pass_probability REAL DEFAULT 0.00,
  estimated_hours_remaining INTEGER DEFAULT 40,
  learning_velocity INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  total_study_time_minutes INTEGER DEFAULT 0,
  questions_answered_count INTEGER DEFAULT 0,
  overall_accuracy_percentage REAL DEFAULT 0.00,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS priority_learning_queue (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  task_item_id TEXT NOT NULL,
  domain_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  accuracy_percentage REAL DEFAULT 0.00,
  average_response_time_seconds INTEGER DEFAULT 0,
  mistake_frequency INTEGER DEFAULT 0,
  priority_score INTEGER DEFAULT 0,
  recommended_action TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, task_item_id)
);

CREATE TABLE IF NOT EXISTS adaptive_recommendations (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_domain TEXT,
  target_task_code TEXT,
  action_url TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 100,
  urgency TEXT DEFAULT 'medium',
  is_dismissed INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS daily_study_plans (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  plan_date TEXT DEFAULT (date('now')),
  task_title TEXT NOT NULL,
  task_type TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 20,
  is_completed INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS achievement_unlocks (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, achievement_id)
);

-- 5. AI TUTOR & CONTENT GENERATION
CREATE TABLE IF NOT EXISTS ai_conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_prompt_templates (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  system_instructions TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  agent_role TEXT,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  model TEXT,
  cost_usd REAL DEFAULT 0.0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS knowledge_base_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  source TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_content_drafts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  ai_model TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS content_versions (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quality_reports (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  reviewer TEXT,
  score REAL DEFAULT 0.0,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

-- 6. AI WORKFORCE & MULTI-AGENT ORCHESTRATION
CREATE TABLE IF NOT EXISTS ai_agents (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  department TEXT NOT NULL,
  model_provider TEXT NOT NULL DEFAULT 'openai',
  model_name TEXT NOT NULL DEFAULT 'gpt-4o',
  system_prompt TEXT NOT NULL,
  temperature REAL DEFAULT 0.20,
  max_tokens INTEGER DEFAULT 2048,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prompt_versions (
  id TEXT PRIMARY KEY,
  agent_id TEXT REFERENCES ai_agents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  system_prompt TEXT NOT NULL,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS task_queue (
  id TEXT PRIMARY KEY,
  job_type TEXT NOT NULL,
  agent_role TEXT REFERENCES ai_agents(role),
  status TEXT NOT NULL DEFAULT 'pending',
  payload TEXT DEFAULT '{}',
  result TEXT DEFAULT '{}',
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS job_history (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  job_type TEXT NOT NULL,
  agent_role TEXT,
  status TEXT NOT NULL,
  duration_ms INTEGER DEFAULT 0,
  error TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_metrics (
  id TEXT PRIMARY KEY,
  agent_role TEXT NOT NULL,
  tasks_completed INTEGER DEFAULT 0,
  tasks_failed INTEGER DEFAULT 0,
  average_latency_ms INTEGER DEFAULT 0,
  last_active_at TEXT DEFAULT (datetime('now'))
);

-- 7. ANALYTICS & TELEMETRY
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  event_name TEXT NOT NULL,
  event_category TEXT,
  properties TEXT DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event_name);

CREATE TABLE IF NOT EXISTS daily_business_metrics (
  id TEXT PRIMARY KEY,
  date TEXT UNIQUE NOT NULL,
  new_users_count INTEGER DEFAULT 0,
  active_users_count INTEGER DEFAULT 0,
  paid_subscribers_count INTEGER DEFAULT 0,
  revenue_usd REAL DEFAULT 0.0,
  mrr_usd REAL DEFAULT 0.0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS daily_student_metrics (
  id TEXT PRIMARY KEY,
  date TEXT UNIQUE NOT NULL,
  total_exams_taken INTEGER DEFAULT 0,
  total_questions_answered INTEGER DEFAULT 0,
  average_score REAL DEFAULT 0.0,
  pass_rate REAL DEFAULT 0.0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_usage_analytics (
  id TEXT PRIMARY KEY,
  date TEXT UNIQUE NOT NULL,
  total_requests INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  estimated_cost_usd REAL DEFAULT 0.0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 8. API PLATFORM & DEVELOPER ECOSYSTEM
CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  rate_limit_per_minute INTEGER DEFAULT 60,
  last_used_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS webhook_endpoints (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  secret TEXT NOT NULL,
  events TEXT DEFAULT '[]',
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS webhook_logs (
  id TEXT PRIMARY KEY,
  endpoint_id TEXT REFERENCES webhook_endpoints(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload TEXT DEFAULT '{}',
  response_status INTEGER,
  response_body TEXT,
  attempts INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS api_usage_metrics (
  id TEXT PRIMARY KEY,
  api_key_id TEXT REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 9. LAUNCH CONTROL, RELEASES & GO-LIVE
CREATE TABLE IF NOT EXISTS releases (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  release_type TEXT NOT NULL DEFAULT 'minor',
  environment TEXT NOT NULL DEFAULT 'production',
  status TEXT NOT NULL DEFAULT 'published',
  description TEXT,
  release_notes TEXT,
  breaking_changes TEXT,
  migration_notes TEXT,
  release_date TEXT,
  deployed_by TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS deployments (
  id TEXT PRIMARY KEY,
  release_id TEXT REFERENCES releases(id) ON DELETE CASCADE,
  environment TEXT NOT NULL,
  deployment_status TEXT NOT NULL DEFAULT 'completed',
  commit_sha TEXT,
  build_number TEXT,
  triggered_by TEXT,
  verification_report TEXT DEFAULT '{}',
  started_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS feature_flags (
  id TEXT PRIMARY KEY,
  flag_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'enabled',
  flag_type TEXT NOT NULL DEFAULT 'boolean',
  targeting_rules TEXT NOT NULL DEFAULT '{}',
  fallback_value TEXT DEFAULT 'false',
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS health_checks (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  latency_ms INTEGER DEFAULT 0,
  details TEXT DEFAULT '{}',
  checked_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rollbacks (
  id TEXT PRIMARY KEY,
  release_id TEXT REFERENCES releases(id) ON DELETE SET NULL,
  deployment_id TEXT REFERENCES deployments(id) ON DELETE SET NULL,
  rollback_type TEXT NOT NULL DEFAULT 'full_release',
  target_version TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  executed_by TEXT,
  details TEXT DEFAULT '{}',
  executed_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS beta_users (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  beta_code TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  beta_group TEXT DEFAULT 'general',
  joined_at TEXT DEFAULT (datetime('now')),
  feedback_count INTEGER DEFAULT 0,
  last_active_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS beta_invites (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  email TEXT,
  beta_group TEXT DEFAULT 'general',
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS beta_feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  email TEXT,
  feedback_type TEXT NOT NULL DEFAULT 'feedback',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  screenshot_url TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  resolved_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS crash_reports (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  error_name TEXT NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  severity TEXT NOT NULL DEFAULT 'error',
  component_stack TEXT,
  environment TEXT DEFAULT 'production',
  metadata TEXT DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'unresolved',
  resolved_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS release_notes (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  changelog_markdown TEXT NOT NULL,
  breaking_changes_markdown TEXT,
  migration_steps_markdown TEXT,
  is_published INTEGER DEFAULT 1,
  published_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 10. NOTIFICATIONS & AUTOMATION
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read INTEGER DEFAULT 0,
  read_at TEXT,
  action_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS email_templates (
  id TEXT PRIMARY KEY,
  template_key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  text_body TEXT,
  variables TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS automation_workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  actions TEXT DEFAULT '[]',
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email_notifications INTEGER DEFAULT 1,
  marketing_emails INTEGER DEFAULT 0,
  exam_reminders INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS delivery_logs (
  id TEXT PRIMARY KEY,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  provider TEXT,
  status TEXT DEFAULT 'sent',
  error TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 11. PROJECT BRAIN & ARCHITECTURE REGISTRY
CREATE TABLE IF NOT EXISTS project_brain_registry (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  description TEXT,
  metadata TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS feature_registry (
  id TEXT PRIMARY KEY,
  feature_key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS api_registry (
  id TEXT PRIMARY KEY,
  route_path TEXT UNIQUE NOT NULL,
  method TEXT NOT NULL,
  description TEXT,
  is_public INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS database_registry (
  id TEXT PRIMARY KEY,
  table_name TEXT UNIQUE NOT NULL,
  purpose TEXT,
  row_count_estimate INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS engine_dependencies (
  id TEXT PRIMARY KEY,
  engine_name TEXT NOT NULL,
  depends_on TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 12. QA ENGINE & TEST AUTOMATION
CREATE TABLE IF NOT EXISTS test_runs (
  id TEXT PRIMARY KEY,
  suite_name TEXT NOT NULL,
  total_tests INTEGER DEFAULT 0,
  passed_tests INTEGER DEFAULT 0,
  failed_tests INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS test_failures (
  id TEXT PRIMARY KEY,
  test_run_id TEXT REFERENCES test_runs(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  error_message TEXT,
  stack_trace TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quality_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value REAL NOT NULL,
  category TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 13. RAG KNOWLEDGE BASE & KNOWLEDGE GRAPH
CREATE TABLE IF NOT EXISTS knowledge_sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  url TEXT,
  file_path TEXT,
  total_chunks INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id TEXT PRIMARY KEY,
  chunk_code TEXT UNIQUE,
  source_id TEXT NOT NULL,
  source_type TEXT NOT NULL,
  certification TEXT DEFAULT 'all',
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  keywords TEXT DEFAULT '[]',
  embedding TEXT,
  embedding_model TEXT DEFAULT 'text-embedding-ada-002',
  is_indexed INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_chunks_source ON knowledge_chunks(source_id);

CREATE TABLE IF NOT EXISTS knowledge_graph_nodes (
  id TEXT PRIMARY KEY,
  node_code TEXT UNIQUE,
  concept_name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  task_list_code TEXT,
  definition TEXT NOT NULL,
  clinical_importance TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS knowledge_graph_edges (
  id TEXT PRIMARY KEY,
  source_node_id TEXT REFERENCES knowledge_graph_nodes(id) ON DELETE CASCADE,
  target_node_id TEXT REFERENCES knowledge_graph_nodes(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  weight REAL DEFAULT 1.00,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS embedding_queue (
  id TEXT PRIMARY KEY,
  chunk_id TEXT REFERENCES knowledge_chunks(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  retry_count INTEGER DEFAULT 0,
  error TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS retrieval_logs (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  top_chunks TEXT DEFAULT '[]',
  similarity_score REAL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 14. SECURITY, PRIVACY & GDPR COMPLIANCE
CREATE TABLE IF NOT EXISTS privacy_consent_records (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL,
  granted INTEGER DEFAULT 1,
  ip_address TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_subject_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  email TEXT NOT NULL,
  request_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS security_threat_logs (
  id TEXT PRIMARY KEY,
  ip_address TEXT,
  user_id TEXT,
  event_type TEXT NOT NULL,
  severity TEXT DEFAULT 'warning',
  payload TEXT DEFAULT '{}',
  blocked INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ip_whitelists (
  id TEXT PRIMARY KEY,
  ip_address TEXT UNIQUE NOT NULL,
  label TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 15. SEO ENGINE & CONTENT SILOS
CREATE TABLE IF NOT EXISTS seo_metadata (
  id TEXT PRIMARY KEY,
  path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT DEFAULT '[]',
  og_image_url TEXT,
  canonical_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_seo_path ON seo_metadata(path);

CREATE TABLE IF NOT EXISTS seo_redirects (
  id TEXT PRIMARY KEY,
  source_path TEXT UNIQUE NOT NULL,
  target_path TEXT NOT NULL,
  status_code INTEGER DEFAULT 301,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS internal_links (
  id TEXT PRIMARY KEY,
  source_page TEXT NOT NULL,
  target_page TEXT NOT NULL,
  anchor_text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS content_clusters (
  id TEXT PRIMARY KEY,
  cluster_name TEXT NOT NULL UNIQUE,
  pillar_slug TEXT NOT NULL,
  supporting_slugs TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS glossary_terms (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  clinical_example TEXT,
  task_list_code TEXT,
  category TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 16. SUBSCRIPTIONS, BILLING & PLANS
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  tier TEXT NOT NULL DEFAULT 'free',
  plan_tier TEXT DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TEXT,
  current_period_end TEXT,
  trial_ends_at TEXT,
  cancel_at_period_end INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_monthly REAL DEFAULT 0.0,
  price_annual REAL DEFAULT 0.0,
  description TEXT,
  features TEXT DEFAULT '[]',
  badge TEXT,
  target_audience TEXT,
  button_text TEXT DEFAULT 'Select Plan',
  is_popular INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percentage REAL DEFAULT 0.0,
  discount_amount_usd REAL DEFAULT 0.0,
  expires_at TEXT,
  max_redemptions INTEGER DEFAULT 100,
  redemptions_count INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  subscription_id TEXT,
  amount_usd REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'paid',
  pdf_url TEXT,
  invoice_date TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS usage_tracking (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  current_usage INTEGER DEFAULT 0,
  usage_limit INTEGER DEFAULT 100,
  period_start TEXT,
  period_end TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 17. ARTICLES CMS
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Exam Prep',
  tags TEXT DEFAULT '[]',
  cover_image_url TEXT,
  author_name TEXT DEFAULT 'Jobpe gyan',
  read_time_minutes INTEGER DEFAULT 5,
  status TEXT DEFAULT 'published',
  views_count INTEGER DEFAULT 0,
  published_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- 18. SYSTEM SETTINGS & SUPER ADMIN
CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL,
  permissions TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_providers_config (
  id TEXT PRIMARY KEY,
  provider_name TEXT UNIQUE NOT NULL,
  api_key_encrypted TEXT,
  default_model TEXT,
  is_enabled INTEGER DEFAULT 1,
  priority INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes INTEGER DEFAULT 0,
  mime_type TEXT,
  uploaded_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  category TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  resource TEXT,
  details TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_plugins (
  id TEXT PRIMARY KEY,
  plugin_name TEXT UNIQUE NOT NULL,
  version TEXT NOT NULL,
  is_installed INTEGER DEFAULT 1,
  is_active INTEGER DEFAULT 1,
  configuration TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TEXT DEFAULT (datetime('now'))
);
