# RELEASE & DEPLOYMENT PROCESS — RBT Practice Questions SaaS

## Release Pipeline Overview
Every production release follows a strict 5-stage automated CI/CD pipeline managed by GitHub Actions (`.github/workflows/ci.yml`).

## 5-Stage Release Process
1. **Stage 1: Code Quality**: Automated `npx tsc --noEmit` and ESLint checks.
2. **Stage 2: Environment Check**: Validates environment variable schema completeness (`scripts/validate-env.ts`).
3. **Stage 3: Automated Testing**: Executes 110 Vitest unit, integration, AI regression, and RAG quality tests.
4. **Stage 4: Production Build**: Compiles standalone Next.js production bundle (`npm run build`).
5. **Stage 5: Vercel Deployment & E2E Verification**: Deploys to Vercel production edge, verifies `/api/health`, and executes Playwright E2E smoke tests.

## Related Files
- [.github/workflows/ci.yml](file:///g:/RBT/.github/workflows/ci.yml)
- [docs/devops.md](file:///g:/RBT/docs/devops.md)
