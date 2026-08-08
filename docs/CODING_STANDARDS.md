# CODING & ARCHITECTURE STANDARDS — RBT Practice Questions SaaS

## Core Architectural Rules
1. **Engine Separation**: Business logic MUST reside in `/lib/` files. Components MUST only render views and forward events.
2. **Type Declarations**: All domain models MUST be typed in `/types/`. Avoid `any`.
3. **API Contracts**: All API responses MUST return a standard JSON object containing `{ success: boolean, ... }` or `{ error: string }`.
4. **Security & Prompt Guarding**: User inputs to AI features MUST pass through `sanitizeAIPromptInput()` in `lib/security-engine.ts`.
5. **Database Access**: All database operations MUST adhere to Supabase Row Level Security (RLS) policies.

## PR Checklist
- [ ] TypeScript check (`npx tsc --noEmit`) passes with 0 errors.
- [ ] Unit & Integration tests (`npm run test`) pass.
- [ ] Added or updated markdown documentation in `/docs/`.
- [ ] Verified responsive layout across mobile and desktop breakpoints.

## Related Files
- [docs/DEVELOPER_GUIDE.md](file:///g:/RBT/docs/DEVELOPER_GUIDE.md)
- [docs/RELEASE_PROCESS.md](file:///g:/RBT/docs/RELEASE_PROCESS.md)
