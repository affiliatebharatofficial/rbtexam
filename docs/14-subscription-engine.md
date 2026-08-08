# 14. Subscription Engine - RBT Practice Questions SaaS

## Purpose
The Subscription Engine handles plan tiers (Free, Pro Pass Guarantee, Team Clinic, Lifetime), entitlement permission guards, daily usage quotas, and billing cycle state management.

## Architecture
- Types: `types/subscription.ts`
- Engine: `lib/subscription-engine.ts`
- Coupon Engine: `lib/coupon-engine.ts`
- Schema Definition: `database/subscription-schema.sql`
- Customer Portal: `app/profile/billing/page.tsx`
- Pricing View: `app/pricing/page.tsx`
- Dedicated Specification: `docs/subscription-billing-engine.md`

## Folder Location
- `g:\RBT\types\subscription.ts`
- `g:\RBT\lib\subscription-engine.ts`
- `g:\RBT\lib\coupon-engine.ts`
- `g:\RBT\app\pricing\page.tsx`
- `g:\RBT\app\profile\billing\page.tsx`

## Database Tables Used
- `public.plans`
- `public.subscriptions`
- `public.invoices`
- `public.coupons`
- `public.usage_tracking`

## API Endpoints
- `GET /api/billing/plans`: Fetch available subscription plans.
- `POST /api/billing/coupon/validate`: Validate promo code.
- `POST /api/billing/webhook`: Process Stripe payment webhooks.

## Workflow
1. Candidate views `/pricing`.
2. Selects Pro Plan ($29/mo or $199/yr) or Team Plan ($99/mo).
3. Entitlements engine grants unlimited mock exams, flashcards, and Socrates AI Tutor access.

## Data Flow
`User Checkout` -> `Stripe Payment Gateway` -> `Webhook Processor` -> `Update Subscription Record` -> `Enable Entitlements`.

## Business Logic
- Free plan enforces daily usage quotas (1 diagnostic test, 15 flashcards, 5 AI Tutor messages).
- Pro and Lifetime plans grant 100% money-back pass guarantee.

## Security Notes
- Row Level Security (RLS) restricts billing data access to authenticated account owners.

## Performance Considerations
- Entitlement checks execute in memory (< 0.1ms).

## Future Improvements
- Automated dunning management for failed credit card renewals.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/subscription.ts](file:///g:/RBT/types/subscription.ts)
- [lib/subscription-engine.ts](file:///g:/RBT/lib/subscription-engine.ts)
- [docs/subscription-billing-engine.md](file:///g:/RBT/docs/subscription-billing-engine.md)
