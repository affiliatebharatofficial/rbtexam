# GitHub Actions CI/CD Pipeline — RBTTrainingAI SaaS

## Purpose
Automates code quality verification, type checks, unit/integration testing, Docker builds, and cloud deployments on push, pull request, merge, and nightly schedules.

## Pipeline Jobs (`.github/workflows/ci.yml`)
1. **quality**: Runs TypeScript `tsc --noEmit` and ESLint checks.
2. **env-check**: Validates presence of core environment variable schemas.
3. **tests**: Executes Vitest unit, integration, and AI regression suites with coverage reports.
4. **build**: Validates Next.js production build bundle (`npm run build`).
5. **docker**: Builds and pushes multi-architecture images to GitHub Container Registry (`ghcr.io`) on main branch commits.
6. **deploy-production**: Deploys main branch to Vercel production environment with post-deploy `/api/health` verifications.
7. **e2e-smoke**: Executes Playwright smoke tests against production.

## Required GitHub Secrets
- `PROD_SUPABASE_URL` / `PROD_SUPABASE_ANON_KEY`
- `TEST_SUPABASE_URL` / `TEST_SUPABASE_ANON_KEY`
- `TEST_OPENAI_API_KEY`
- `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`

## Related Files
- [.github/workflows/ci.yml](file:///g:/RBT/.github/workflows/ci.yml)
- [vitest.config.ts](file:///g:/RBT/vitest.config.ts)
- [playwright.config.ts](file:///g:/RBT/playwright.config.ts)
