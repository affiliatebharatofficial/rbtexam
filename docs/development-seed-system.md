# Development Seed System & Production Safeguards

## Overview
The Development Seed System (`lib/dev-seed-engine.ts`) provides controlled sample data populators for local testing without leaking mock data to production.

## Admin Toolbar Tools (Development Only)
In Super Admin Operating CMS (`/admin`), a specialized yellow toolbar renders **ONLY** when `NEXT_PUBLIC_APP_ENV !== 'production'`:
- **Load Demo Data**: Seeds sample records for questions, flashcards, analytics events.
- **Remove Demo Data**: Purges all sample records to zero.
- **Production Cleanup**: Enforces zero-data sanitization check.
- **Seed Database**: Triggers sample data population for dev testing.

## Security Safeguards
```ts
if (!canSeedDemoData()) {
  throw new Error('CRITICAL SECURITY VIOLATION: Seeding sample data is strictly prohibited in production environments.');
}
```
If invoked in production, the engine throws an immediate security exception and halts execution.
