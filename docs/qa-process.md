# QA Process — RBTTrainingAI SaaS

## Definition of Done
A feature is only complete when:
1. Unit tests written and passing (95%+ coverage).
2. Integration tests written for all new API routes.
3. AI Prompt Regression tests updated if AI behaviour changes.
4. `npx tsc --noEmit` passes with zero errors.
5. `npm run build` succeeds.
6. PR description includes test coverage screenshot.

## Test Pyramid
```
       /\  E2E (Playwright)
      /  \  Critical flows only
     /────\
    / Int  \  API route integration tests
   /────────\
  /  Unit    \  Pure business logic — 95%+ coverage
 /────────────\
```

## Related Files
- [docs/testing-engine.md](file:///g:/RBT/docs/testing-engine.md)
- [vitest.config.ts](file:///g:/RBT/vitest.config.ts)
