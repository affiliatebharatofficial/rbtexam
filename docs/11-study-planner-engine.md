# 11. AI Adaptive Study Planner Engine - RBT Practice Questions SaaS

## Purpose
The AI Adaptive Study Planner Engine automates candidate exam preparation by generating personalized daily study checklists, priority weakness queues, and pass probability predictions based on real-time performance analytics.

## Architecture
- Core Types: `types/adaptive-learning.ts`
- Engine & Algorithms: `lib/adaptive-learning-engine.ts`
- Schema Definition: `database/adaptive-learning-schema.sql`
- Study Planner Interface: `app/study-planner/page.tsx`
- Dedicated Specification: `docs/adaptive-learning-engine.md`

## Folder Location
- `g:\RBT\types\adaptive-learning.ts`
- `g:\RBT\lib\adaptive-learning-engine.ts`
- `g:\RBT\database\adaptive-learning-schema.sql`
- `g:\RBT\app\study-planner\page.tsx`

## Database Tables Used
- `public.user_learning_profiles`
- `public.priority_learning_queue`
- `public.adaptive_recommendations`
- `public.daily_study_plans`
- `public.achievement_unlocks`

## API Endpoints
- `GET /api/adaptive/profile`: Fetch candidate learning profile, pass likelihood, and weakness queue.
- `GET /api/adaptive/recommendations`: Fetch next recommended learning actions.

## Workflow
1. Candidate views `/study-planner`.
2. Engine calculates readiness rating (88%), predicted pass likelihood (94%), and remaining study hours (14 hrs).
3. Renders Priority Weakness Remediation Queue (e.g. D-04 Differential Reinforcement) with direct Socratic AI Tutor drill launch links.
4. Candidate checks off daily study tasks to earn XP points.

## Data Flow
`Candidate Performance Analytics` -> `Adaptive Learning Engine` -> `Weakness Priority Ranking` -> `Daily Checklist & Recommendations`.

## Business Logic
- Supports RBT, BCaBA, and BCBA certifications.
- Calculates pass likelihood using weighted regression across readiness scores, mock exam averages, and flashcard retention.

## Security Notes
- Row Level Security (RLS) policies restrict learning profile access to the current authenticated user.

## Performance Considerations
- Database indices on `user_id`, `priority_score`, and `plan_date` ensure sub-10ms query execution.

## Future Improvements
- Google Calendar & iCal calendar synchronization for study plan reminders.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/adaptive-learning.ts](file:///g:/RBT/types/adaptive-learning.ts)
- [lib/adaptive-learning-engine.ts](file:///g:/RBT/lib/adaptive-learning-engine.ts)
- [docs/adaptive-learning-engine.md](file:///g:/RBT/docs/adaptive-learning-engine.md)
