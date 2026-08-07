# Production Cleanup & Zero Fake Data Standard

## 1. Executive Summary
RBTTrainingAI enforces a strict production data integrity policy. All demo, mock, placeholder, and fake data (dummy users, fake revenue, sample exam results, placeholder charts, and fake study progress) are completely isolated and prohibited from appearing in production environments.

## 2. Removed Demo Modules & Isolated Systems
- **Dummy Users & Accounts**: Removed static user roster in production mode. Users are fetched directly from PostgreSQL Supabase `profiles` table.
- **Fake Revenue & Subscriptions**: $42.8k hardcoded MRR metrics replaced with live subscription aggregations.
- **Mock Charts & Analytics**: Charts render **only** when database record count > 0.
- **Sample Questions & Flashcards**: Production question queries fetch from PostgreSQL `master_questions` and `master_flashcards`.
- **Demo Seed System Isolation**: `seedDemoData()` in [dev-seed-engine.ts](file:///g:/RBT/lib/dev-seed-engine.ts) throws `CRITICAL SECURITY VIOLATION` when invoked under `NEXT_PUBLIC_APP_ENV === 'production'`.

## 3. Related Files
- Engine: [dev-seed-engine.ts](file:///g:/RBT/lib/dev-seed-engine.ts)
- Analytics: [analytics-engine.ts](file:///g:/RBT/lib/analytics-engine.ts)
- Empty State Component: [empty-state.tsx](file:///g:/RBT/components/ui/empty-state.tsx)
- Admin CMS: [page.tsx](file:///g:/RBT/app/admin/page.tsx)
