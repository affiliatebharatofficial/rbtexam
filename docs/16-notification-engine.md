# 16. Notification Engine - RBTTrainingAI SaaS

## Purpose
The Notification Engine drives candidate engagement via in-app bell notifications, push notifications, webhooks, and trigger-condition-action automation rules.

## Architecture
- Types: `types/notification.ts`
- Engine: `lib/notification-engine.ts`
- Schema Definition: `database/notification-schema.sql`
- Candidate Component: `components/notifications/notification-center.tsx`
- Admin Manager: `app/admin/notifications/page.tsx`
- Dedicated Specification Suite:
  - `docs/notification-engine.md`
  - `docs/email-automation.md`
  - `docs/workflow-engine.md`
  - `docs/template-system.md`
  - `docs/campaign-manager.md`

## Folder Location
- `g:\RBT\types\notification.ts`
- `g:\RBT\lib\notification-engine.ts`
- `g:\RBT\database\notification-schema.sql`
- `g:\RBT\components\notifications\notification-center.tsx`
- `g:\RBT\app\admin\notifications\page.tsx`

## Database Tables Used
- `public.notifications`
- `public.email_templates`
- `public.automation_workflows`
- `public.notification_preferences`
- `public.delivery_logs`

## API Endpoints
- `GET /api/notifications`: Fetch candidate in-app notifications.
- `POST /api/notifications`: Mark notification as read.
- `POST /api/admin/notifications/broadcast`: Dispatch broadcast campaign.

## Workflow
1. Event occurs (*e.g. 7-Day Study Streak Unlocked*).
2. Engine publishes event (`publishNotificationEvent`).
3. In-App notification added to candidate's notification bell drawer.

## Business Logic
- Quiet hours (22:00 to 07:00) respected for push/SMS channels.

## Security Notes
- Row Level Security (RLS) restricts notifications to authenticated account owners.

## Performance Considerations
- Async dispatch pipeline ensures sub-5ms API response times.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/notification.ts](file:///g:/RBT/types/notification.ts)
- [lib/notification-engine.ts](file:///g:/RBT/lib/notification-engine.ts)
- [docs/notification-engine.md](file:///g:/RBT/docs/notification-engine.md)
