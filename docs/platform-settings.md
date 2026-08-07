# Dynamic Platform Settings Engine - RBTTrainingAI SaaS

## Purpose
Defines the zero-code configuration manager allowing administrators to dynamically alter platform branding, maintenance status, daily AI tutor message limits, and currency settings.

## Architecture
- Implementation: `lib/platform-config.ts` (`getPlatformConfig`, `updatePlatformConfig`)
- API Route: `app/api/admin/config/route.ts`

## Related Files
- [lib/platform-config.ts](file:///g:/RBT/lib/platform-config.ts)
- [app/admin/page.tsx](file:///g:/RBT/app/admin/page.tsx)
