# 03. Database Schema - RBTTrainingAI SaaS

## Purpose
This document defines the complete relational database schema for RBTTrainingAI, hosted on Supabase (PostgreSQL). It covers tables, relationships, indices, Row Level Security (RLS) policies, and data types supporting candidate tracking, clinic management, and diagnostic algorithms.

## Architecture
- **DBMS**: PostgreSQL 15+ (Supabase Managed)
- **Security**: Row Level Security (RLS) on all user-facing tables
- **Primary Keys**: UUID v4
- **Timestamps**: UTC `timestamptz` default `now()`

## Folder Location
- Schema files: `g:\RBT\database\`
- Client initialization: `g:\RBT\lib\supabase.ts`

## Database Tables Used

### 1. `profiles`
Stores user profile information for candidates, supervisors, and admins.
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT CHECK (role IN ('candidate', 'supervisor', 'admin')) DEFAULT 'candidate',
  clinic_id UUID REFERENCES public.clinics(id) ON DELETE SET NULL,
  target_exam_date DATE,
  readiness_score NUMERIC(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. `clinics`
Stores ABA clinic / agency organization records for B2B portal.
```sql
CREATE TABLE public.clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  license_seats INTEGER DEFAULT 10,
  admin_user_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3. `exam_sessions`
Tracks individual 85-question diagnostic & mock exam attempts.
```sql
CREATE TABLE public.exam_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  mode TEXT CHECK (mode IN ('diagnostic_15', 'full_85_mock', 'domain_drill')),
  score_percentage NUMERIC(5,2) NOT NULL,
  passed BOOLEAN NOT NULL,
  time_spent_seconds INTEGER NOT NULL,
  domain_scores JSONB NOT NULL, -- e.g. {"A": 85, "B": 90, "C": 60, "D": 75, "E": 90, "F": 80}
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 4. `flashcard_progress`
Stores Leitner 5-box spaced repetition memory states for candidates.
```sql
CREATE TABLE public.flashcard_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL, -- Maps to ABA term code (e.g., 'ABA-TERM-001')
  box_level INTEGER CHECK (box_level BETWEEN 1 AND 5) DEFAULT 1,
  next_review_at TIMESTAMPTZ DEFAULT now(),
  times_correct INTEGER DEFAULT 0,
  times_incorrect INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, card_id)
);
```

### 5. `subscriptions`
Manages Stripe payment tiers and pass guarantee entitlements.
```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_type TEXT CHECK (plan_type IN ('free', 'pro_guarantee', 'clinic_enterprise')),
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## API Endpoints
- `GET /api/user/profile` -> Query profile schema
- `POST /api/exam/save` -> Insert `exam_sessions` record

## Workflow
Client triggers database interactions through `@supabase/supabase-js` OR Next.js server actions. Row Level Security policies automatically enforce that users can only read/write their own records.

## Data Flow
`User UI Action` -> `Supabase Client` -> `PostgreSQL RLS Filter` -> `JSON Response` -> `State Update`.

## Business Logic
- Readiness calculation formula: `Readiness = (Avg Domain Accuracy * 0.7) + (Leitner Box 4-5 Percentage * 0.3)`.

## Security Notes
- Row Level Security (RLS) Policy Example:
```sql
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own exam sessions" ON public.exam_sessions
  FOR SELECT USING (auth.uid() = user_id);
```

## Performance Considerations
- Indices created on `user_id`, `clinic_id`, and `created_at` for sub-10ms query execution.

## Future Improvements
- Automated automated partitioning on `exam_sessions` table by created year.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0

## Related Files
- [lib/supabase.ts](file:///g:/RBT/lib/supabase.ts)
