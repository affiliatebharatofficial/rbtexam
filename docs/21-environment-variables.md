# 21. Environment Variables - RBT Practice Questions SaaS

## Purpose
This document catalogs all environment configuration variables required to run RBT Practice Questions across development, staging, and production environments.

## Architecture
Configuration files:
- `.env.local` (Local secret overrides)
- `.env.production` (Vercel production environment)
- `.env.example` (Template for onboarding developers)

## Folder Location
- `g:\RBT\.env.local`

## Environment Variables List

| Variable Name | Required | Description | Example / Location |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical domain URL | `https://rbtpracticequestions.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public API key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side database admin key | `eyJhbGciOi...` |
| `STRIPE_SECRET_KEY` | Yes | Stripe payment processing secret | `sk_live_51...` |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe client publishable key | `pk_live_51...` |
| `OPENAI_API_KEY` | Yes | Socrates AI LLM provider API key | `sk-proj-...` |
| `RESEND_API_KEY` | Yes | Transactional email dispatch key | `re_123456789` |

## Database Tables Used
Not directly dependent on database tables; stores credentials to access services.

## API Endpoints
Accessed server-side in API routes and server components.

## Workflow
1. Developer copies `.env.example` to `.env.local`.
2. Populates local development keys.
3. Next.js automatically loads `.env.local` during `npm run dev`.

## Data Flow
`Process Environment` -> `Next.js Config Load` -> `Service Initialization`.

## Business Logic
- Variables prefixed with `NEXT_PUBLIC_` are safe to expose in client browser bundles.
- Variables without `NEXT_PUBLIC_` are strictly isolated to server node execution environments.

## Security Notes
- Never commit populated `.env.local` files to public or private source control repositories.

## Performance Considerations
- Environment variables loaded at process startup with zero runtime overhead.

## Future Improvements
- Vault integration (HashiCorp Vault or AWS Secrets Manager) for enterprise key rotation.

## Dependencies
- Next.js environment configuration system.

## Related Files
- [.gitignore](file:///g:/RBT/.gitignore)
