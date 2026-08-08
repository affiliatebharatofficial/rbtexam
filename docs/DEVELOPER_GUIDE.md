# DEVELOPER ONBOARDING GUIDE — RBT Practice Questions SaaS

## Overview
Guidelines, architecture principles, and setup instructions for software engineers joining the RBT Practice Questions engineering team.

---

## 1. Quick Start Development Workflow

```bash
# 1. Clone repository
git clone <repo-url>
cd RBT

# 2. Run one-command setup
bash scripts/setup.sh

# 3. Validate environment schema
npx tsx scripts/validate-env.ts

# 4. Start local development server
npm run dev

# 5. Run test suite before committing
npm run test
```

---

## 2. Key Architecture Standards
1. **Decoupled Engines**: Always put business logic inside a service file in `/lib` (`lib/my-feature-engine.ts`), never inside component views or API routes.
2. **Type Safety**: Always define TypeScript interfaces in `/types` (`types/my-feature.ts`).
3. **Documentation Integrity**: Every new feature or API MUST include a corresponding `.md` documentation file in `/docs/`.
4. **Zero Raw LLM Calls**: AI features MUST use `lib/rag-engine.ts` for knowledge retrieval.

---

## Related Files
- [docs/CODING_STANDARDS.md](file:///g:/RBT/docs/CODING_STANDARDS.md)
- [docs/RELEASE_PROCESS.md](file:///g:/RBT/docs/RELEASE_PROCESS.md)
