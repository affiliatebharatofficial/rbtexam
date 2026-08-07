# Analytics & Business Intelligence Engine - RBTTrainingAI SaaS

## Purpose
The Analytics & Business Intelligence (BI) Engine serves as the central data observation and financial intelligence layer of the RBTTrainingAI SaaS platform. It ingests telemetry events from all core modules (*Practice Test Engine, Question Bank, Flashcards, AI Tutor, Adaptive Learning, Subscriptions, Payments, SEO Engine*) to calculate real-time student learning velocity, exam pass predictions, LLM token costs, MRR/ARR growth, churn rates, and infrastructure health metrics.

## Architecture
- **Central Event Tracker Pipeline**: `g:\RBT\lib\analytics-engine.ts` (`trackAnalyticsEvent`, `getPlatformAnalyticsSummary`, `exportAnalyticsToCSV`).
- **Core Entities & Types**: `g:\RBT\types\analytics.ts` (`AnalyticsEvent`, `BusinessMetrics`, `StudentAnalytics`, `AITutorMetrics`, `QuestionMetrics`, `SEOMetrics`, `SystemHealthMetrics`, `ExecutiveSummary`).
- **PostgreSQL Database Schema**: `g:\RBT\database\analytics-schema.sql` (`analytics_events`, `daily_business_metrics`, `daily_student_metrics`, `ai_usage_analytics`).
- **Executive BI Command Center**: `g:\RBT\app\analytics\page.tsx` (Executive KPI Scorecards, Business/Revenue Tab, Student Intelligence Tab, AI LLM Cost Tab, SEO Growth Tab, System Health Tab, CSV Exporter).

## Folder Structure
- `g:\RBT\types\analytics.ts`
- `g:\RBT\lib\analytics-engine.ts`
- `g:\RBT\database\analytics-schema.sql`
- `g:\RBT\app\analytics\page.tsx`
- `g:\RBT\app\api\analytics\summary\route.ts`
- `g:\RBT\app\api\analytics\events\route.ts`
- `g:\RBT\docs\analytics-business-intelligence-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\analytics-schema.sql`

```sql
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('learning', 'business', 'ai_tutor', 'seo', 'system', 'auth', 'practice_test', 'flashcard')),
  payload JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Executive BI Analytics Summary
- **Endpoint**: `GET /api/analytics/summary`
- **Query Parameters**: `format` (optional `csv`).
- **Response**: `ExecutiveSummary` JSON object containing `business`, `students`, `aiTutor`, `questions`, `seo`, and `system` metrics.

### 2. Record Telemetry Event
- **Endpoint**: `POST /api/analytics/events`
- **Body**: `{ eventName: string, category: string, payload: Record<string, any>, userId?: string }`
- **Response**: `{ success: true, event: AnalyticsEvent }`

## Event Tracking Pipeline
`Any Platform Module` -> `trackAnalyticsEvent()` -> `Memory Event Buffer` -> `Async Batch Flush to PostgreSQL` -> `Daily Aggregation Cron` -> `Executive BI Dashboards`.

## Business Logic
- **MRR Calculation**: Evaluates active subscriptions across monthly and annual plans.
- **Pass Guarantee Prediction**: Weighted regression across readiness score (50%), mock exam scores (30%), and flashcard retention (20%).
- **AI Cost Tracking**: Logs token counts and calculates exact LLM API spend per student ($0.015/student average).

## Security Notes
- Financial business metrics restricted to authorized Admin roles (`admin`, `super_admin`) via Supabase Row Level Security (RLS).

## Performance Considerations
- Event telemetry pipeline uses async non-blocking execution to eliminate page render delay.
- Indices on `category`, `event_name`, and `metric_date` keep BI dashboard queries under 10ms.

## Future Improvements
- Automated Slack / Email alert triggers for MRR drops, high churn spikes, or AI token cost overages.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [types/analytics.ts](file:///g:/RBT/types/analytics.ts)
- [lib/analytics-engine.ts](file:///g:/RBT/lib/analytics-engine.ts)
- [database/analytics-schema.sql](file:///g:/RBT/database/analytics-schema.sql)
- [app/analytics/page.tsx](file:///g:/RBT/app/analytics/page.tsx)
