-- BACB 3rd Edition Question Categories
INSERT OR REPLACE INTO question_categories (id, name, code, description) VALUES
('cat_a', 'Measurement', 'A', 'Continuous, discontinuous measurement, and data collection procedures.'),
('cat_b', 'Assessment', 'B', 'Behavioral, preference, and functional assessment assistance.'),
('cat_c', 'Skill Acquisition', 'C', 'Skill acquisition plans, shaping, chaining, and token economies.'),
('cat_d', 'Behavior Reduction', 'D', 'Behavior reduction plans, extinction, differential reinforcement, and crisis protocols.'),
('cat_e', 'Documentation and Reporting', 'E', 'Objective session notes, legal reporting, and communication standards.'),
('cat_f', 'Professional Conduct and Scope of Practice', 'F', 'BACB ethics code, dual relationships, and clinical boundaries.');

-- Platform Roles
INSERT OR REPLACE INTO roles (id, role_name, permissions) VALUES
('role_super_admin', 'super_admin', '["*"]'),
('role_admin', 'admin', '["questions.*", "users.*", "articles.*", "analytics.*"]'),
('role_clinic_admin', 'clinic_admin', '["trainees.*", "cohorts.*", "reports.*"]'),
('role_student', 'student', '["exam.take", "flashcards.study", "tutor.chat", "profile.edit"]');

-- Core Feature Flags
INSERT OR REPLACE INTO feature_flags (id, flag_key, name, description, status, flag_type, fallback_value) VALUES
('ff_ai_tutor', 'ai_tutor', 'AI Tutor Copilot', 'Enables 24/7 AI conversational tutoring for candidates', 'enabled', 'boolean', 'true'),
('ff_spaced_rep', 'spaced_repetition', 'Spaced Repetition Leitner Engine', 'SuperMemo / Leitner algorithmic flashcard scheduling', 'enabled', 'boolean', 'true'),
('ff_clinic_mode', 'clinic_portal', 'Clinic and University Cohort Portal', 'Enables supervisor trainee analytics and bulk licenses', 'enabled', 'boolean', 'true'),
('ff_dark_mode', 'dark_mode', 'Dynamic Dark Mode', 'Enables high-contrast Apple-style dark UI mode', 'enabled', 'boolean', 'true');

-- System Settings
INSERT OR REPLACE INTO system_settings (key, value) VALUES
('platform_name', '"RBT Practice AI"'),
('active_exam_version', '"3rd_edition"'),
('passing_score_percentage', '80'),
('total_mock_questions', '85'),
('exam_duration_minutes', '90'),
('allow_public_registration', 'true'),
('ai_model_default', '"gpt-4o"');
