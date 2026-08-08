# Subscription & Billing Engine - RBT Practice Questions SaaS

## Purpose
The Subscription & Billing Engine provides an enterprise-grade SaaS monetization and entitlement system for RBT Practice Questions. Built to handle individual candidates, clinic organizations, and lifetime memberships, it governs feature permissions (*practice test limits, flashcard daily quotas, AI Tutor messages*), Stripe webhook integrations, invoice generation, tax reporting, and promo coupon validation.

## Architecture
- **Plans Supported**: `free`, `basic`, `pro` (Pass Guarantee), `team` (Clinic Organization), `enterprise`, `lifetime`.
- **Core Entities & Types**: `g:\RBT\types\subscription.ts` (`SubscriptionPlan`, `UserSubscription`, `PlanLimits`, `Coupon`, `Invoice`, `UsageQuota`).
- **Feature Permission Guard**: `g:\RBT\lib\subscription-engine.ts` (`canUserAccessFeature`, `checkAndTrackUsageQuota`).
- **Coupon Engine**: `g:\RBT\lib\coupon-engine.ts` (`validateAndApplyCoupon`).
- **PostgreSQL Database Schema**: `g:\RBT\database\subscription-schema.sql` (`plans`, `subscriptions`, `invoices`, `coupons`, `usage_tracking`).
- **Customer UI Interfaces**:
  - Pricing Page: `/app/pricing/page.tsx`
  - Customer Billing Portal: `/app/profile/billing/page.tsx`

## Folder Structure
- `g:\RBT\types\subscription.ts`
- `g:\RBT\lib\subscription-engine.ts`
- `g:\RBT\lib\coupon-engine.ts`
- `g:\RBT\database\subscription-schema.sql`
- `g:\RBT\app\pricing\page.tsx`
- `g:\RBT\app\profile\billing\page.tsx`
- `g:\RBT\app\api\billing\plans\route.ts`
- `g:\RBT\app\api\billing\coupon\validate\route.ts`
- `g:\RBT\app\api\billing\webhook\route.ts`
- `g:\RBT\docs\subscription-billing-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\subscription-schema.sql`

```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  plan_id UUID REFERENCES public.plans(id),
  tier TEXT NOT NULL CHECK (tier IN ('free', 'basic', 'pro', 'premium', 'team', 'enterprise', 'lifetime')) DEFAULT 'free',
  status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'paused', 'unpaid', 'expired')) DEFAULT 'active',
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('monthly', 'yearly', 'one_time')) DEFAULT 'monthly',
  current_period_start TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_period_end TIMESTAMPTZ DEFAULT timezone('utc'::text, now() + interval '30 days') NOT NULL,
  trial_ends_at TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Subscription Plans
- **Endpoint**: `GET /api/billing/plans`
- **Response**: Array of `SubscriptionPlan` JSON objects.

### 2. Validate Coupon Code
- **Endpoint**: `POST /api/billing/coupon/validate`
- **Body**: `{ code: string, price: number, tier: string }`
- **Response**: `{ valid: boolean, discountedPriceUSD: number, discountAmountUSD: number, message: string }`

### 3. Stripe Webhook Listener
- **Endpoint**: `POST /api/billing/webhook`
- **Header**: `stripe-signature`
- **Response**: `{ received: true, status: "processed" }`

## Payment & Webhook Flow
`Customer Selects Plan` -> `Create Stripe Checkout Session` -> `Customer Completes Payment` -> `Stripe Webhook Triggers` -> `Update User Subscription Tier to Active` -> `Generate Invoice PDF Receipt`.

## Business Rules
- **Pass Guarantee**: Pro & Lifetime plan members who do not pass their BACB exam receive 100% money-back refund guarantee.
- **Free Plan Quotas**: Daily limit of 1 diagnostic quiz, 15 flashcards, and 5 Socrates AI Tutor messages.
- **Quota Resets**: Usage counters automatically reset daily at 00:00 UTC.

## Security Notes
- Webhook signature header (`stripe-signature`) validated before updating subscription status.
- Supabase Row Level Security (RLS) policies prevent candidates from accessing other candidates' invoices.

## Performance Considerations
- Feature entitlement checks (`canUserAccessFeature`) run in < 0.1ms using in-memory session context.

## Future Improvements
- Multi-currency support (EUR, GBP, CAD) with automatic localized checkout pricing.

## Dependencies
- `stripe`: ^14.0.0
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [types/subscription.ts](file:///g:/RBT/types/subscription.ts)
- [lib/subscription-engine.ts](file:///g:/RBT/lib/subscription-engine.ts)
- [lib/coupon-engine.ts](file:///g:/RBT/lib/coupon-engine.ts)
- [database/subscription-schema.sql](file:///g:/RBT/database/subscription-schema.sql)
- [app/pricing/page.tsx](file:///g:/RBT/app/pricing/page.tsx)
- [app/profile/billing/page.tsx](file:///g:/RBT/app/profile/billing/page.tsx)
