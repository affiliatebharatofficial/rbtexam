# Development Seed System & Production Isolation

## 1. Overview
The Development Seed System provides 1-click sample data seeding for local development and staging test runs.

## 2. Environment Safeguard Rules
- **Production (`production`)**: `canSeedDemoData()` returns `false`. Calling `seedDemoData()` throws `CRITICAL SECURITY VIOLATION`.
- **Staging (`staging`) / Development (`development`)**: Seeding demo data is permitted for offline testing.

## 3. Related Files
- Engine: [dev-seed-engine.ts](file:///g:/RBT/lib/dev-seed-engine.ts)
- Test Suite: [production-cleanup.test.ts](file:///g:/RBT/tests/unit/production-cleanup.test.ts)
