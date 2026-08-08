# 01. Project Overview - RBT Practice Questions SaaS

## Purpose
RBT Practice Questions is an enterprise-grade, AI-powered commercial SaaS application designed to help Registered Behavior Technician (RBT) candidates in the United States pass their official Behavior Analyst Certification Board (BACB®) 2nd Edition Task List certification exam on their first attempt. The platform incorporates adaptive diagnostic test engines, Socratic AI tutoring, Leitner 5-box spaced-repetition flashcards, clinic B2B supervision dashboards, and real-time pass readiness heatmaps.

## Architecture
The application is built on a modern full-stack web architecture leveraging:
- **Frontend Framework**: Next.js 16 (App Router) with React 19 and TypeScript.
- **Styling & UI**: Vanilla Tailwind CSS v4, dynamic glassmorphism design tokens, CSS micro-animations, and Lucide React icons.
- **State Management & Logic**: React Hooks, local storage persistence, and adaptive diagnostic algorithms.
- **Backend / Database Layer**: Supabase (PostgreSQL), Next.js API Routes, Row Level Security (RLS).
- **AI Engine**: Custom Socratic Prompt Engine (`Socrates AI`) interacting with LLM providers for real-time ethics roleplay, prompt fading explanation, and adaptive domain remediation.
- **SEO & Compliance**: Schema.org JSON-LD structured data (Course & FAQPage), Open Graph tags, canonical URLs, and BACB disclaimer notices.

## Folder Location
- Root Directory: `g:\RBT`
- Documentation Directory: `g:\RBT\docs`
- Main Application Routes: `g:\RBT\app`
- Core UI Components: `g:\RBT\components`
- Business Logic & Engines: `g:\RBT\lib` & `g:\RBT\services`

## Database Tables Used
- `users`: Core profile data, role (`candidate`, `supervisor`, `admin`), clinic ID.
- `exam_sessions`: Timed diagnostic test runs, raw score, domain scores (Domains A-F), pass likelihood.
- `user_task_mastery`: Individual BACB Task List item scores (A-01 through F-04).
- `flashcard_progress`: Leitner box level (1-5), next review timestamp, retention rate.
- `subscriptions`: Stripe billing status (`free_tier`, `pass_guarantee_pro`, `clinic_enterprise`).

## API Endpoints
- `POST /api/exam/start`: Initializes diagnostic session with 85 randomized BACB questions.
- `POST /api/exam/submit`: Evaluates answers, calculates domain sub-scores, and generates pass readiness score.
- `POST /api/tutor/chat`: Sends candidate prompt to Socrates AI tutor for Socratic clinical feedback.
- `GET /api/analytics/summary`: Returns candidate weakness heatmaps and recommended focus tasks.

## Workflow
1. **Onboarding & Baseline**: User completes a 15-minute diagnostic exam covering Domains A-F.
2. **AI Study Plan Generation**: Socrates AI analyzes domain accuracy and generates an adaptive daily study schedule.
3. **Active Practice**: Candidate alternates between 5-box spaced flashcards, targeted drills, and conversational ethics roleplay.
4. **Mock Exam Verification**: Candidate completes 85-question 90-minute timed mock exams until readiness score exceeds 85%.
5. **Pass Guarantee Validation**: Candidate takes official BACB exam with full money-back guarantee backing.

## Data Flow
`User Action` -> `Next.js Client Component` -> `Socrates AI Engine / Spaced Repetition Logic` -> `Supabase PostgreSQL` -> `Real-time UI Re-render & Analytics Heatmap`.

## Business Logic
- Exam Pass Threshold: 85% readiness across all 6 BACB domains.
- Spaced Repetition Interval: Box 1 (1 day), Box 2 (3 days), Box 3 (7 days), Box 4 (14 days), Box 5 (30 days / Mastered).
- Pass Guarantee Qualification: Complete 3 mock exams with >= 85% score before official test date.

## Security Notes
- Row Level Security (RLS) enabled on all PostgreSQL tables.
- JWT verification on all protected API routes.
- Strict input sanitization for Socrates AI prompt injections.

## Performance Considerations
- Static Site Generation (SSG) for public marketing & SEO landing pages.
- Client-side state caching for instant flashcard flipping and mock test navigation.
- Sub-50ms latency for score calculation algorithms.

## Future Improvements
- Native iOS & Android apps built with React Native.
- Voice-enabled Socratic voice tutor roleplay.
- Automated BACB 40-Hour Training certificate verification integration.

## Dependencies
- `next`: ^16.3.0
- `react`: ^19.2.8
- `lucide-react`: ^1.29.0
- `tailwindcss`: ^4.0.0
- `@supabase/supabase-js`: ^2.39.0

## Related Files
- [app/page.tsx](file:///g:/RBT/app/page.tsx)
- [app/layout.tsx](file:///g:/RBT/app/layout.tsx)
- [lib/bacb-task-list.ts](file:///g:/RBT/lib/bacb-task-list.ts)
