# Environment Variables Management — RBTTrainingAI SaaS

## Purpose
Specifies environment configuration, validation schema, security rules, and variable isolation across environments.

## Environments Supported
1. **Development**: Local development using `.env.local`.
2. **Preview / Staging**: Pull request preview environments created by Vercel.
3. **Production**: Live production environment on Vercel and Supabase Cloud.

## Environment Validation Script
The platform includes an automated validation runner in `scripts/validate-env.ts`:
```bash
# Validate current environment
npx tsx scripts/validate-env.ts
```

## Mandatory Variables
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_JWT_SECRET`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL`
- `INTERNAL_API_SECRET`

## Security Rules
- Client-side variables MUST begin with `NEXT_PUBLIC_`.
- Server-side secrets (`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`) MUST NEVER use `NEXT_PUBLIC_`.
- All production secrets must be minimum 32 characters long.

## Related Files
- [.env.example](file:///g:/RBT/.env.example)
- [scripts/validate-env.ts](file:///g:/RBT/scripts/validate-env.ts)
