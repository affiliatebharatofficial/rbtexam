# 05. User Dashboard - RBTTrainingAI SaaS

## Purpose
The User Dashboard (Candidate Command Center) serves as the primary intelligence hub for RBT candidates. Designed with Apple-level visual aesthetics, glassmorphic blur panels, dark mode toggling, and interactive data visualization widgets, it tracks BACB exam readiness, study streaks, daily target goals, weak/strong task list items, Leitner 5-box flashcards distribution, recent mock attempts, timeline activity feed, and performance trends.

## Architecture
- **Route**: `/app/dashboard/page.tsx`
- **Layout**: Apple-level high-density 12-column responsive dashboard grid with dark mode theme switching.
- **Sub-Components**:
  - `ReadinessRing`: Circular SVG readiness gauge (`components/dashboard/readiness-ring.tsx`).
  - `StreakCard`: 7-day flame habit tracker (`components/dashboard/streak-card.tsx`).
  - `TodayGoal`: Daily study task checklist & progress bar (`components/dashboard/today-goal.tsx`).
  - `WeakStrongTopics`: BACB task list weakness & mastery cards (`components/dashboard/weak-strong-topics.tsx`).
  - `FlashcardsSummary`: Leitner 5-box memory distribution (`components/dashboard/flashcards-summary.tsx`).
  - `RecentTestsTable`: Mock exam & diagnostic history table (`components/dashboard/recent-tests-table.tsx`).
  - `RecentActivityFeed`: Live timeline activity stream (`components/dashboard/recent-activity-feed.tsx`).
  - `PerformanceChart`: Multi-week readiness progression & domain weight bars (`components/dashboard/performance-chart.tsx`).
  - `QuickActions`: Apple-style action launchers (`components/dashboard/quick-actions.tsx`).

## Folder Location
- Page: `g:\RBT\app\dashboard\page.tsx`
- Dashboard Components: `g:\RBT\components\dashboard\`

## Database Tables Used
- `public.profiles`: Stores candidate baseline scores, target exam date, target score rating.
- `public.exam_sessions`: Logs 85-question mock attempts, domain sub-scores, and completion durations.
- `public.flashcard_progress`: Tracks Leitner 5-box card counts and due card review dates.
- `public.student_progress`: Maintains cumulative accuracy, study hours, streak days.

## API Endpoints
- `GET /api/user/dashboard-summary`: Aggregates score history, Leitner memory state, and active streak.
- `GET /api/exam/history`: Fetches past mock exam attempts.
- `POST /api/user/today-goal`: Updates daily checklist task status.

## Workflow

### 1. Initial Load & Render
1. Candidate logs in and lands on `/dashboard`.
2. `ProtectedRoute` verifies active `AuthSession`.
3. System reads candidate readiness rating (e.g. 88% Ready) and calculates pass probability (94%).
4. SVG `ReadinessRing` animates stroke-dash offset smoothly.

### 2. Daily Goal & Habit Streak Tracking
1. Candidate checks completed study items on `TodayGoal` checklist.
2. XP points awarded and overall progress bar recalculates in real-time.
3. `StreakCard` evaluates consecutive daily logins; highlights active flame pills for Monday through Sunday.

### 3. Weakness Remediation Workflow
1. Dashboard isolates BACB task codes scoring below 80% accuracy (e.g., D-04 Differential Reinforcement 74%).
2. Displays "Drill Weak Topics with Socrates AI" direct launcher.
3. Candidate clicks drill button to launch pre-filtered Socratic AI prompt session.

## Data Flow
`Auth & User Context` -> `Dashboard Aggregator` -> `Widget State Sync` -> `SVG Canvas & Dark Mode CSS Render` -> `Interactive User Action`.

## Business Logic
- **Readiness Rating Formula**:
  - `Readiness = (Avg Mock Score * 0.5) + (Domain Sub-scores Weighted Avg * 0.3) + (Leitner Box 4-5 Retention * 0.2)`
- **Pass Guarantee Threshold**: `>= 85% Readiness Rating` displays `Pass Guaranteed` badge.
- **Streak Rule**: Daily login or completion of 1 test / 10 flashcards increments streak counter by 1.

## Security Notes
- Candidate metrics isolated to authenticated session user ID via Supabase RLS.
- Sensitive diagnostic details protected against unauthorized cross-candidate reads.

## Performance Considerations
- SVG ring rendering uses hardware-accelerated CSS transforms (`transform -rotate-90`).
- Responsive layout avoids layout shift (CLS < 0.01) using CSS grid template columns.

## Future Improvements
- Customizable widget drag-and-drop dashboard dashboard layout rearrangement.
- Push notification reminder integration for streak preservation.

## Dependencies
- `lucide-react`: ^1.29.0
- `react`: ^19.2.8
- `@/context/auth-context`

## Related Files
- [app/dashboard/page.tsx](file:///g:/RBT/app/dashboard/page.tsx)
- [components/dashboard/readiness-ring.tsx](file:///g:/RBT/components/dashboard/readiness-ring.tsx)
- [components/dashboard/streak-card.tsx](file:///g:/RBT/components/dashboard/streak-card.tsx)
- [components/dashboard/today-goal.tsx](file:///g:/RBT/components/dashboard/today-goal.tsx)
- [components/dashboard/weak-strong-topics.tsx](file:///g:/RBT/components/dashboard/weak-strong-topics.tsx)
- [components/dashboard/flashcards-summary.tsx](file:///g:/RBT/components/dashboard/flashcards-summary.tsx)
- [components/dashboard/recent-tests-table.tsx](file:///g:/RBT/components/dashboard/recent-tests-table.tsx)
- [components/dashboard/recent-activity-feed.tsx](file:///g:/RBT/components/dashboard/recent-activity-feed.tsx)
- [components/dashboard/performance-chart.tsx](file:///g:/RBT/components/dashboard/performance-chart.tsx)
- [components/dashboard/quick-actions.tsx](file:///g:/RBT/components/dashboard/quick-actions.tsx)
