# 15. Payment Engine - RBT Practice Questions SaaS

## Purpose
The Payment Engine integrates payment gateways (Stripe primary, extensible for PayPal/Paddle), manages subscription checkouts, invoice receipts, tax reporting, and webhook event processing.

## Architecture
- Types: `types/subscription.ts`
- Engine: `lib/subscription-engine.ts`
- Webhook Handler: `app/api/billing/webhook/route.ts`
- Schema Definition: `database/subscription-schema.sql`
- Dedicated Specification: `docs/subscription-billing-engine.md`

## Folder Location
- `g:\RBT\lib\subscription-engine.ts`
- `g:\RBT\app\api\billing\webhook\route.ts`
- `g:\RBT\app\profile\billing\page.tsx`

## Database Tables Used
- `public.subscriptions`
- `public.invoices`
- `public.plans`

## API Endpoints
- `POST /api/billing/webhook`: Process Stripe webhooks (`invoice.payment_succeeded`, `customer.subscription.deleted`).

## Workflow
1. Candidate inputs credit card info on Stripe Checkout.
2. Stripe processes payment and emits `invoice.payment_succeeded` webhook.
3. Webhook updates subscription status to `active` and generates downloadable PDF receipt.

## Data Flow
`Checkout Action` -> `Stripe Gateway` -> `Webhook Event` -> `Database Synchronization`.

## Business Logic
- Supports monthly, yearly, and one-time lifetime payment options.

## Security Notes
- Webhook payload signature (`stripe-signature`) validated before processing.

## Performance Considerations
- Webhook events processed asynchronously.

## Future Improvements
- Multi-currency localization (EUR, GBP, CAD).

## Dependencies
- `stripe`: ^14.0.0

## Related Files
- [types/subscription.ts](file:///g:/RBT/types/subscription.ts)
- [app/api/billing/webhook/route.ts](file:///g:/RBT/app/api/billing/webhook/route.ts)
- [docs/subscription-billing-engine.md](file:///g:/RBT/docs/subscription-billing-engine.md)
