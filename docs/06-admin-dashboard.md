# 06. Super Admin Operating CMS - RBT Practice Questions SaaS

## Purpose
The Super Admin Operating CMS controls platform configurations, dynamic site branding, multi-provider AI model routing (OpenAI, Gemini, OpenRouter), user roles, media assets, engine plugin registries, and security audit streams.

## Architecture
- Types: `types/super-admin.ts`
- Config Core: `lib/platform-config.ts`
- Schema Definition: `database/super-admin-schema.sql`
- CMS Interface: `app/admin/page.tsx`
- Dedicated Specification Suite:
  - `docs/admin-super-cms.md`
  - `docs/role-permission-system.md`
  - `docs/platform-settings.md`
  - `docs/prompt-manager.md`
  - `docs/media-library.md`
  - `docs/security-admin.md`

## Folder Location
- `g:\RBT\types\super-admin.ts`
- `g:\RBT\lib\platform-config.ts`
- `g:\RBT\database\super-admin-schema.sql`
- `g:\RBT\app\admin\page.tsx`

## Database Tables Used
- `public.system_settings`
- `public.roles`
- `public.ai_providers_config`
- `public.media_assets`
- `public.system_audit_logs`
- `public.platform_plugins`

## API Endpoints
- `GET /api/admin/config`: Fetch dynamic system configuration.
- `POST /api/admin/config`: Update dynamic system setting.
- `GET /api/admin/audit-logs`: Fetch security audit trail.

## Workflow
1. Super Admin opens `/admin`.
2. Views Global Overview, Registered Engine Plugins, User & Role Management, AI LLM Provider priorities, Site Settings, Media Library, or Security Audit Logs.
3. System changes take immediate effect without code edits.

## Business Logic
- Multi-provider AI routing allows falling back to Google Gemini if OpenAI rate limits trigger.

## Security Notes
- Row Level Security (RLS) restricts CMS controls exclusively to `super_admin` role.

## Performance Considerations
- Config settings cached in memory for sub-1ms evaluation.

## Future Improvements
- Automated automated database backup snapshot triggers from the CMS.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/super-admin.ts](file:///g:/RBT/types/super-admin.ts)
- [lib/platform-config.ts](file:///g:/RBT/lib/platform-config.ts)
- [docs/admin-super-cms.md](file:///g:/RBT/docs/admin-super-cms.md)
