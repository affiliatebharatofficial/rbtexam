-- Cloudflare D1 Database Schema for RBT Practice AI (SQLite)
-- Production Grade Schema

-- 1. Master Questions Table
CREATE TABLE IF NOT EXISTS master_questions (
  id TEXT PRIMARY KEY,
  question_code TEXT UNIQUE,
  certification TEXT NOT NULL DEFAULT 'RBT',
  question_text TEXT NOT NULL,
  scenario_text TEXT,
  question_type TEXT DEFAULT 'scenario_based',
  difficulty TEXT DEFAULT 'medium',
  options TEXT NOT NULL, -- JSON array of options: [{"id":"A","text":"...","isCorrect":true,"explanation":"..."}]
  correct_answer_id TEXT NOT NULL DEFAULT 'A',
  answer_explanation TEXT NOT NULL,
  clinical_explanation TEXT,
  "references" TEXT,
  exam_tips TEXT,
  common_mistakes TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  keywords TEXT DEFAULT '[]', -- JSON array of keywords
  task_list_version TEXT NOT NULL DEFAULT '3rd_edition',
  estimated_time_seconds INTEGER DEFAULT 60,
  tags TEXT DEFAULT '[]', -- JSON array of tags
  status TEXT NOT NULL DEFAULT 'published',
  is_premium INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  created_by TEXT DEFAULT 'Super Admin CMS',
  updated_by TEXT DEFAULT 'Super Admin CMS',
  deleted_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Indices for master_questions
CREATE INDEX IF NOT EXISTS idx_mq_cert ON master_questions(certification);
CREATE INDEX IF NOT EXISTS idx_mq_cat ON master_questions(category);
CREATE INDEX IF NOT EXISTS idx_mq_diff ON master_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_mq_status ON master_questions(status);
CREATE INDEX IF NOT EXISTS idx_mq_del ON master_questions(deleted_at);
CREATE INDEX IF NOT EXISTS idx_mq_created ON master_questions(created_at DESC);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student', -- 'student', 'admin', 'super_admin', 'clinic_admin'
  email_verified INTEGER DEFAULT 0,
  password_hash TEXT,
  target_exam_date TEXT,
  target_score INTEGER DEFAULT 90,
  readiness_score INTEGER DEFAULT 0,
  estimated_pass_likelihood INTEGER DEFAULT 0,
  metadata TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 3. Profiles Table (Compatible with existing schemas)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE REFERENCES users(id),
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student',
  target_exam_date TEXT,
  target_score INTEGER DEFAULT 90,
  readiness_score INTEGER DEFAULT 0,
  estimated_pass_likelihood INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_profiles_uid ON profiles(user_id);

-- 4. Exam Sessions Table
CREATE TABLE IF NOT EXISTS exam_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  certification TEXT NOT NULL DEFAULT 'RBT',
  score_percentage INTEGER NOT NULL,
  is_passed INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 85,
  correct_count INTEGER NOT NULL DEFAULT 0,
  domain_scores TEXT, -- JSON record {A: {total, correct}, ...}
  answers TEXT, -- JSON user answers
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_exam_user ON exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_cert ON exam_sessions(certification);
CREATE INDEX IF NOT EXISTS idx_exam_created ON exam_sessions(created_at DESC);

-- 5. Flashcards Table
CREATE TABLE IF NOT EXISTS flashcards (
  id TEXT PRIMARY KEY,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  category TEXT,
  task_code TEXT,
  box_level INTEGER DEFAULT 1,
  certification TEXT NOT NULL DEFAULT 'RBT',
  status TEXT DEFAULT 'published',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_fc_cert ON flashcards(certification);
CREATE INDEX IF NOT EXISTS idx_fc_cat ON flashcards(category);

-- 6. Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'RBT Exam Guide',
  tags TEXT DEFAULT '[]', -- JSON array
  cover_image_url TEXT,
  author_name TEXT DEFAULT 'RBT Practice AI Editorial Team',
  read_time_minutes INTEGER DEFAULT 5,
  status TEXT DEFAULT 'published',
  views_count INTEGER DEFAULT 0,
  published_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_art_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_art_status ON articles(status);

-- 7. Audit & System Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  actor_id TEXT,
  ip_address TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
