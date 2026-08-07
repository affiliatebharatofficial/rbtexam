# Enterprise Super Admin CMS - RBTTrainingAI SaaS Operating System

## Purpose
The Enterprise Super Admin CMS is the central operating system and administration console for the RBTTrainingAI SaaS platform. It governs every platform engine (*Master Question Bank, Smart Flashcards, Socrates AI Tutor, AI Adaptive Learning, Analytics BI, Subscription Billing, Enterprise SEO*), dynamic site configurations, multi-provider AI model routing (OpenAI, Gemini, OpenRouter), user roles, media assets, and security audit trails without requiring code changes.

## Architecture
- **Super Admin CMS Interface**: `g:\RBT\app\admin\page.tsx` (Global Overview, User & Roles, AI & Prompt CMS, Site Settings, Media Library, Audit Logs).
- **Dynamic Settings Core**: `g:\RBT\lib\platform-config.ts` (`getPlatformConfig`, `updatePlatformConfig`, `logAuditEvent`, `getSystemAuditLogs`).
- **Core Entities & Types**: `g:\RBT\types\super-admin.ts` (`SystemSetting`, `RolePermission`, `AIProviderConfig`, `MediaAsset`, `SystemAuditLog`, `PlatformPlugin`).
- **PostgreSQL Database Schema**: `g:\RBT\database\super-admin-schema.sql` (`system_settings`, `roles`, `ai_providers_config`, `media_assets`, `system_audit_logs`, `platform_plugins`).

## Folder Structure
- `g:\RBT\types\super-admin.ts`
- `g:\RBT\lib\platform-config.ts`
- `g:\RBT\database\super-admin-schema.sql`
- `g:\RBT\app\admin\page.tsx`
- `g:\RBT\app\api\admin\config\route.ts`
- `g:\RBT\app\api\admin\audit-logs\route.ts`
- `g:\RBT\docs\admin-super-cms.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\super-admin-schema.sql`

```sql
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('branding', 'ai', 'security', 'billing', 'features')),
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Platform Configuration
- **Endpoint**: `GET /api/admin/config`
- **Response**: Dynamic JSON object containing system settings.

### 2. Update Platform Setting
- **Endpoint**: `POST /api/admin/config`
- **Body**: `{ key: string, value: any, updatedBy: string }`
- **Response**: `{ success: true, key, value }`

### 3. Get Security Audit Logs
- **Endpoint**: `GET /api/admin/audit-logs`
- **Response**: `{ success: true, logs: SystemAuditLog[] }`

## Plugin Registration Workflow
Every platform engine registers itself in `REGISTERED_PLUGINS` (`lib/platform-config.ts`). Future developers simply append new engine definitions to expose their menu route and version in the CMS.

## Business Logic
- **No Code Configuration**: Maintenance mode toggles, max free daily AI tutor limits, and AI provider priorities take effect immediately.

## Security Notes
- CMS access strictly guarded by Supabase Row Level Security (RLS) policies enforcing `super_admin` role.

## Performance Considerations
- System configuration settings cached in memory for sub-1ms response times.

## Related Files
- [lib/platform-config.ts](file:///g:/RBT/lib/platform-config.ts)
- [app/admin/page.tsx](file:///g:/RBT/app/admin/page.tsx)
- [docs/role-permission-system.md](file:///g:/RBT/docs/role-permission-system.md)
