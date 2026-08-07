# Dashboard Empty States Architecture

## Purpose
In production mode, when a candidate or clinic user has 0 activity, RBTTrainingAI hides mock charts and displays Apple-level glassmorphic `EmptyState` components with clear onboarding CTAs.

## Component Specification
- **`components/ui/empty-state.tsx`**: Universal glassmorphism container accepting `title`, `description`, `icon`, `badgeLabel`, `actionLabel`, `onAction`.

## Widget Empty State Matrix
| Widget | Empty Condition | Rendered Empty State |
| :--- | :--- | :--- |
| **`PerformanceChart`** | 0 exam attempts | Hides canvas; renders *"No Analytics Available Yet"* |
| **`WeakStrongTopics`** | 0 topic drills | Hides heatmaps; renders *"No Domain Topic Breakdown Available"* |
| **`RecentTestsTable`** | 0 completed exams | Hides table; renders *"No Exam Attempts Yet"* |
| **`RecentActivityFeed`**| 0 activity logs | Hides feed; renders *"No Activity Logged"* |
| **`FlashcardsSummary`** | 0 cards reviewed | Shows 0% Mastered with 0 Box counts |
| **`ReadinessRing`** | 0 readiness score | Displays `0% Readiness` with `Diagnostic Needed` badge |
