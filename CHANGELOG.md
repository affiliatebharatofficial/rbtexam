# CHANGELOG — RBT Practice Questions SaaS

## Master Version History

### [v3.6.2] - 2026-08-27 (Enterprise SEO Audit Resolution: robots.txt, Title Lengths & H1 Optimization)
#### Fixed & Enhanced
- **Title Length SERP Optimization (`utils/seo.ts`, `lib/seo-engine.ts`, layouts & programmatic routes)**:
  - Shortened all page and layout metadata titles to stay strictly within Google's 60-character SERP limit.
  - Formatted programmatic question routes (`/rbt/question/[slug]`) and glossary term routes (`/rbt/glossary/[slug]`) with intelligent character clamping (<= 58 chars).
  - Enforced a 60-character safeguard clamp inside `constructMetadata` and `buildSEOMetadata`.
- **Missing H1 Tag Elimination (68+ routes)**:
  - Converted client-only re-export pages (`/rbt/mock-exam`, `/rbt/practice-test`, `/rbt/flashcards`, `/articles`, `/articles/[slug]`) to Server Components with dedicated SSR `<h1 className="...">` headers.
  - Converted Socrates AI Tutor (`/tutor`) main header from `<h2>` to `<h1>`.
  - Added screen-reader accessible and visible semantic `<h1>` tags across all tool, educational, and auth callback pages.
- **Robots.txt & Sitemap Integrity (`app/robots.ts`, `app/sitemap.ts`)**:
  - Refined `robots.ts` disallow rules to cover `/admin/`, `/admin`, `/profile/`, `/profile`, `/dashboard/`, `/dashboard`, `/auth/`, `/study-planner/`.
  - Cleaned `sitemap.ts` to include exclusively 200 OK canonical URLs (replaced `/about` redirect with canonical `/rbt/about` and added `/articles` & `/tutor`).

### [v3.6.1] - 2026-08-26 (Production SEO Canonical Domain & Indexability Fix)
#### Fixed & Enhanced
- **Canonical Domain Enforcement (`utils/seo.ts`)**:
  - Enforced authoritative primary domain `https://www.rbtpracticeai.com` across all pages and layouts.
  - Added automatic sanitization logic to clean Cloudflare Worker URLs (`workers.dev`), Vercel preview domains, and non-www variants to prevent crawler canonicalisation issues.
  - Fixed `metadataBase`, `alternates.canonical`, and `openGraph.url` to guarantee self-referencing canonical tags for full indexability.
- **Cloudflare Worker & Environment Configuration (`wrangler.jsonc`, `.env`)**:
  - Updated `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_APP_URL` to `https://www.rbtpracticeai.com`.
  - Updated auth redirect and email template URLs in `auth-context.tsx` and `notification-engine.ts`.

### [v3.6.0] - 2026-08-22 (Bing & Multi-Search-Engine IndexNow Protocol Integration)
#### Added & Production-Ready
- **Bing IndexNow Engine (`lib/indexnow-engine.ts`)**:
  - Full support for standard IndexNow protocol connecting to Bing, Yandex, Naver, and Seznam search engines.
  - Multi-endpoint fallback architecture (`api.indexnow.org`, `bing.com/indexnow`, `yandex.com/indexnow`).
  - Automated dynamic sitemap collector aggregating static routes, BACB questions, ABA glossary terms, and published articles.
  - Automatic chunking (up to 10,000 URLs per batch) and URL normalization.
  - Real-time audit logging and persistent submission history.
- **REST API Route (`app/api/indexnow/route.ts`)**:
  - `GET /api/indexnow` diagnostics and statistics endpoint.
  - `POST /api/indexnow` on-demand submission endpoint for single URLs, batch lists, or 1-click full site re-indexing.
- **Super Admin CMS Integration (`app/admin/page.tsx` `tab=indexnow`)**:
  - Dedicated "Bing IndexNow" tab in Super Admin dashboard.
  - 1-Click Mass Push button with live HTTP status feedback.
  - Custom URL submission box.
  - Verification key display and direct link to verification file.
  - Live audit log stream.
- **Article CMS Hook (`lib/article-cms-engine.ts`)**:
  - Automatic background notification to IndexNow whenever an article is published or updated.
- **CLI Automation Script (`scripts/submit-indexnow.mjs`)**:
  - CLI runner (`npm run submit:indexnow`) for manual, cron, or CI/CD deployments.
- **Public Verification File (`public/e39f75ba5a894762b71efc5e3d748f21.txt`)**:
  - Verification key file placed at website root.
- **Documentation & Tests**:
  - `docs/BING_INDEXNOW.md` architecture and integration guide.
  - Comprehensive unit test suite `tests/unit/indexnow-engine.test.ts` (7/7 passing).

### [v3.5.1] - 2026-08-21 (Super Admin User Deletion & Complete Database Sync Fix)
#### Fixed / Enhanced
- **Admin User Deletion Backend (`app/api/admin/users/delete/route.ts`)**:
  - Implemented cascading deletion across all database tables (`exam_answers`, `exam_sessions`, `flashcard_progress`, `student_progress`, `subscriptions`, `study_plans`, `adaptive_learning_state`, `ai_conversations`, `notifications`, `system_audit_logs`, `profiles`, `users`).
  - Added Supabase Auth user deletion (`adminSupabase.auth.admin.deleteUser`) matching by user UUID and email address.
  - Added case-insensitive email cleanup (`ilike`) and whitelist protection preventing accidental deletion of super admin accounts.
- **Admin Client Sync (`app/admin/page.tsx`)**:
  - Attached verified `getAdminAuthHeaders()` (`Authorization: Bearer <token>` and `x-admin-email`) to delete, update, and fetch requests.
  - Synchronized client-side state and purged deleted records from `localStorage` (`rbt_registered_users`, `rbt_admin_users_roster`).
  - Added automatic reload from authoritative server database upon successful deletion to ensure zero ghost reappearance on page refresh.
- **Admin User Update Route (`app/api/admin/users/update/route.ts`)**:
  - Unified with `getSupabaseAdminClient()` and case-insensitive email matching.
- **Unit Test Coverage (`tests/unit/admin-user-deletion.test.ts`)**:
  - Added unit tests for admin protection and deletion validation.
#### Added / Enhanced
- **Refund & Cancellation Policy Page (`/refund-policy`)**:
  - Full subscription billing explanation (Monthly $29/mo, Annual $19/mo USD), 1-click self-service cancellation, 48-hour accidental renewal grace window, 100% Pass-or-Refund Guarantee claim instructions, failed payment dunning, and duplicate charge remedies.
- **Educational Disclaimer & Non-Affiliation Notice (`/disclaimer`)**:
  - Independent platform disclaimer, BACB® and Pearson VUE® trademark non-affiliation, original educational content statement, test security compliance (strict prohibition against leaked/unauthorized questions), exam performance limitations, and Socratic AI assistance disclosure.
- **Terms of Service (`/terms`)**:
  - Comprehensive user agreement covering account security, acceptable use, anti-scraping/anti-sharing restrictions, subscription terms, cross-links to Refund Policy and Guarantee Terms, AI-generated content disclaimer, limitation of liability, and Delaware governing law.
- **Privacy Policy (`/privacy`)**:
  - Complete data collection breakdown (learning progress, domain diagnostics, Leitner flashcard telemetry), payment processor PCI-DSS Level 1 compliance notice, sub-processors inventory (Cloudflare, Supabase, OpenAI, Anthropic, Stripe, Lemon Squeezy), data encryption (AES-256 / TLS 1.3), and GDPR/CCPA user rights.
- **Support & Inquiries Desk (`/contact`)**:
  - Added dedicated SEO layout and structured support categories for billing, refund requests, pass guarantee claims, and clinical feedback.
- **Pre-Checkout Compliance Disclosures (`components/landing/pricing-section.tsx`)**:
  - Explicit USD ($) currency indicators, recurring billing intervals, cancellation terms, and active links to Terms of Service, Privacy Policy, and Refund Policy.
- **Global Footer Legal Navigation (`components/layout/footer.tsx`)**:
  - Added visible links to Privacy Policy, Terms of Service, Refund & Cancellation Policy, Pass Guarantee Terms, Educational Disclaimer, and Contact & Support.
- **Sitemap & SEO Synchronization (`app/sitemap.ts`)**:
  - Integrated `/refund-policy` into static sitemap routes with proper indexing priority.

### [v3.4.0] - 2026-08-10 (Multilingual i18n & Spanish Language Engine Release)
#### Added / Fixed
- **Spanish (Español 🇪🇸) Multilingual Support**:
  - Implemented client-side i18n engine (`context/language-context.tsx`) supporting English (`en`) and Spanish (`es`).
  - Added glassmorphism `LanguageSelector` dropdown component with flag icons in header navbar and mobile drawer menu.
  - Updated Socrates AI Tutor (`lib/ai-prompt-manager.ts`), AI Question Generator (`lib/ai-question-generator-engine.ts`), and Leitner Flashcards (`lib/ai-flashcard-generator-engine.ts`) to support Spanish language requests and official BACB Spanish ABA terminology.
  - Enhanced Super Admin Language Manager (`app/admin/page.tsx`) with supported locale inventory management (`es-ES`, `es-MX`, `es-US`).
  - Added unit test suite `tests/unit/language-context.test.ts` and system documentation `/docs/24-i18n-multilingual-engine.md`.

### [v3.3.0] - 2026-08-09 (Super Admin Blog & Article CMS Engine Release)
#### Added / Fixed
- **Super Admin Article CMS Portal (`app/admin/articles/page.tsx`)**:
  - Full Article Management CMS interface supporting article creation, editing, publishing, deleting, category tagging, author assignment, read time calculation, and status toggles.
  - **Live Markdown & Table Preview**: Integrated live Markdown editor tab with real-time GFM Markdown and table formatting preview.
- **PostgreSQL Database Schema (`database/articles-schema.sql`)**:
  - Migration script creating `public.articles` table with index optimization and Supabase RLS security policies.
- **Article Service Engine (`lib/article-cms-engine.ts`)**:
  - Full CRUD operations, initial high-quality seed articles, slug generator, reading time estimator, and storage sync.
- **Admin & Public REST API Endpoints (`/api/admin/articles` & `/api/articles`)**:
  - Server endpoints for CRUD management and public article queries.
- **Public Blog & Article Pages (`/articles` & `/articles/[slug]`)**:
  - Responsive articles index page and individual article reader rendering Markdown content and tables.

### [v3.2.0] - 2026-08-09 (Central User Persistence & Admin User Roster Sync Fix)
#### Added / Fixed
- **Central User Registration API (`/api/auth/register`)**:
  - Implemented server-side user registration endpoint utilizing Supabase Service Role key to upsert signed-up users and Google SSO users into `public.users` and `public.profiles` PostgreSQL tables.
- **Auth Context Database Persistence (`context/auth-context.tsx`)**:
  - Updated `signUp()` and `ensureDatabaseProfile()` to invoke `/api/auth/register` immediately upon account creation, ensuring candidates are centrally saved to PostgreSQL server-side.
- **Admin User Roster Query Sync (`app/api/admin/users/route.ts`)**:
  - Updated GET `/api/admin/users` to fetch from `auth.users`, `public.profiles`, and `public.users` tables, ensuring all candidates registered on any device are visible in the Admin Panel (`/admin`).

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
