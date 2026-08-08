# CHANGELOG — RBT Practice Questions SaaS

## Master Version History

### [v3.1.0] - 2026-08-08 (Official Brand Launch: RBT Practice Questions)
#### Added / Modified
- Complete project-wide rebrand to **RBT Practice Questions** (Domain: `https://rbtpracticequestions.com`).
- Updated all SEO metadata, primary/secondary keywords, OpenGraph, JSON-LD schema, title tags (`RBT Practice Questions | Free Mock Exams, Flashcards & AI Tutor`), and meta descriptions.
- Updated Navbar logo, Footer navigation, Hero headline/subheadline, CTAs, Admin CMS, and AI Tutor system prompts.
- Updated support and no-reply email addresses (`support@rbtpracticequestions.com`, `no-reply@rbtpracticequestions.com`).
- Updated all 100+ documentation files and database schemas.

### [v3.0.0] - 2026-08-07 (Production Launch, Beta Release & Production Cleanup Release)
#### Added
- **Production Cleanup & Zero Fake Data Standard (`lib/dev-seed-engine.ts`)**:
  - Production mode safeguard suppressing all hardcoded/fake numbers ($42.8k MRR, fake student counts, dummy charts).
  - Reusable Apple-Level `EmptyState` component (`components/ui/empty-state.tsx`) displaying clean zero-state cards with CTAs when database record count == 0.
  - Dynamic PostgreSQL database analytics pipeline in `analytics-engine.ts`.
  - 4 Production readiness documentation files (`/docs/production-cleanup.md`, `/docs/dashboard-data-flow.md`, `/docs/empty-states.md`, `/docs/development-seed-system.md`).
- **Production Launch & Go-Live Control CMS (`app/admin/launch-control/page.tsx`)**:
  - Unified Super Admin launch portal with 7 dedicated modules: Release Control, Pre-Launch Matrix, Feature Flags, Health Diagnostics, Beta Program, Emergency Controls, and Changelog Notes.
- **Release Management Engine (`lib/release-management-engine.ts`)**:
  - Multi-environment release lifecycle manager (`dev` -> `staging` -> `private_beta` -> `public_beta` -> `production`).
  - SemVer version manager with automated changelog generator.
- **Dynamic Feature Flags Engine**:
  - Feature toggling with rules matching by Role, Country, Percentage rollout, Time-window, Beta-only, Internal-only, and Premium-only.
- **20-Point Automated Pre-Launch Validation Matrix**:
  - Verifies Build, TypeScript, ESLint, Tests, SEO, Accessibility, Performance, Security RLS, Env Vars, DB, APIs, Email, AI providers (OpenAI, Gemini, DeepSeek, Anthropic, OpenRouter), Stripe, Supabase, Storage, Background Workers, Cron Jobs, Adaptive Learning SM-2, & RAG Vector index.
- **11-Subsystem Deep Health Probe**:
  - Real-time diagnostic monitoring for Application, API, Database, Storage, Auth, Billing, AI Providers, Email, Workers, Queues, and Webhooks.
- **Beta Program & Feedback Engine**:
  - Invite codes, early access redemption, beta user groups, user feedback, and crash reporting.
- **Emergency Safety Controls & Single-Click Rollbacks**:
  - Maintenance Mode, Read-Only Mode, Emergency Top Banner, and Single-Click Rollbacks.
- **PostgreSQL / Supabase Schema (`database/launch-engine-schema.sql`)**:
  - 10 new tables (`releases`, `deployments`, `feature_flags`, `health_checks`, `rollbacks`, `beta_users`, `beta_invites`, `beta_feedback`, `crash_reports`, `release_notes`) with Supabase RLS policies.
- **11 Architectural Documentation Files in `/docs/`**.
