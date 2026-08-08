# AI Adaptive Learning Engine - RBT Practice Questions SaaS

## Purpose
The AI Adaptive Learning Engine serves as the central intelligence layer of the RBT Practice Questions SaaS platform. Designed for candidates preparing for **RBT**, **BCaBA**, and **BCBA** certification exams, it continuously monitors learning behavior across practice tests, Socratic AI tutor chats, spaced flashcards, and diagnostic drills to automatically generate weak topic priority queues, personalized study plans, pass likelihood predictions, and daily task recommendations.

## Architecture
- **Certifications Supported**: RBT, BCaBA, BCBA
- **Central Core Engine**: `g:\RBT\lib\adaptive-learning-engine.ts` (`calculatePredictedPassProbability`, `detectWeakTopics`, `generateSmartRecommendations`, `generateDailyStudyPlan`, `getCandidateAdaptiveProfile`).
- **Core Entities & Types**: `g:\RBT\types\adaptive-learning.ts` (`LearningProfile`, `PriorityQueueItem`, `SmartRecommendation`, `DailyTask`, `AchievementBadge`).
- **PostgreSQL Database Schema**: `g:\RBT\database\adaptive-learning-schema.sql` (`user_learning_profiles`, `priority_learning_queue`, `adaptive_recommendations`, `daily_study_plans`, `achievement_unlocks`).
- **Interface**: `g:\RBT\app\study-planner\page.tsx` (Adaptive Roadmap, Weak Topic Remediation Queue, Smart Recommendation Cards, Daily Study Checklist, Achievement Badges).

## Folder Structure
- `g:\RBT\types\adaptive-learning.ts`
- `g:\RBT\lib\adaptive-learning-engine.ts`
- `g:\RBT\database\adaptive-learning-schema.sql`
- `g:\RBT\app\study-planner\page.tsx`
- `g:\RBT\app\api\adaptive\profile\route.ts`
- `g:\RBT\app\api\adaptive\recommendations\route.ts`
- `g:\RBT\docs\adaptive-learning-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\adaptive-learning-schema.sql`

```sql
CREATE TABLE public.user_learning_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  target_exam_date DATE NOT NULL,
  current_level TEXT DEFAULT 'Level 1: Novice',
  readiness_score NUMERIC(5,2) DEFAULT 0.00,
  predicted_pass_probability NUMERIC(5,2) DEFAULT 0.00,
  estimated_hours_remaining INTEGER DEFAULT 40,
  learning_velocity INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  total_study_time_minutes INTEGER DEFAULT 0,
  questions_answered_count INTEGER DEFAULT 0,
  overall_accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Candidate Adaptive Profile
- **Endpoint**: `GET /api/adaptive/profile`
- **Query Parameters**: `userId`, `certification`.
- **Response**: `LearningProfile` JSON object containing readiness score, weak topics queue, daily checklist, and achievements.

### 2. Get Smart Recommendations
- **Endpoint**: `GET /api/adaptive/recommendations`
- **Query Parameters**: `certification`.
- **Response**: `{ success: true, recommendations: SmartRecommendation[] }`

## Algorithms & Formulas

### 1. Predicted Exam Pass Probability Algorithm
Formula:
`Pass Probability (%) = Math.min(99, Math.round((ReadinessScore * 0.5) + (MockAvg * 0.3) + (FlashcardMastery * 0.2)))`

### 2. Weak Topic Detection Algorithm
Ranks BACB task list codes by priority score (0-100) using:
- Accuracy percentage (< 80%)
- Average response latency (> 75s)
- Repeat mistake frequency in mock exams
Priority Score Formula:
`Priority = (100 - Accuracy) * 0.6 + (ResponseTime / 1.5) * 0.2 + (Mistakes * 5) * 0.2`

## Learning Flow
`Candidate Action (Test / Flashcard / Tutor)` -> `Update Metrics` -> `Run Weak Topic Detector` -> `Recalculate Pass Likelihood` -> `Generate Daily Checklist & Smart Recommendations` -> `Render Adaptive UI`.

## Business Logic
- **Remediation Trigger**: Any BACB task item scoring below 80% accuracy triggers an automatic high-priority Socrates AI Socratic drill recommendation.
- **Pass Threshold**: Candidates achieving `>= 85%` readiness rating unlock the "Pass Ready Threshold" achievement badge.

## Security Notes
- Candidate learning data isolated by `user_id` using Supabase RLS.

## Performance Considerations
- Background processing for priority queue calculations ensures zero latency during practice test submissions.

## Future Improvements
- Multi-variable machine learning model trained on historic candidate pass rate data to further refine pass probability predictions.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [types/adaptive-learning.ts](file:///g:/RBT/types/adaptive-learning.ts)
- [lib/adaptive-learning-engine.ts](file:///g:/RBT/lib/adaptive-learning-engine.ts)
- [database/adaptive-learning-schema.sql](file:///g:/RBT/database/adaptive-learning-schema.sql)
- [app/study-planner/page.tsx](file:///g:/RBT/app/study-planner/page.tsx)
