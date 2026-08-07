# Notification, Email Automation & Workflow Engine - RBTTrainingAI SaaS

## Purpose
The Notification, Email Automation & Workflow Engine serves as the event-driven communication and candidate retention platform for RBTTrainingAI. Designed to deliver multi-channel messages (*in-app notification center bell, automated emails, push notifications, webhooks*), it executes intelligent triggers (*3-day study inactivity, weak topic alerts, 7-day streak milestones, trial expirations, payment receipts*) to maximize study consistency and subscriber retention across **RBT**, **BCaBA**, and **BCBA** candidates.

## Architecture
- **Central Event Publisher**: `g:\RBT\lib\notification-engine.ts` (`publishNotificationEvent`, `getUserInAppNotifications`, `markNotificationAsRead`, `broadcastNotificationCampaign`).
- **Core Entities & Types**: `g:\RBT\types\notification.ts` (`NotificationItem`, `EmailTemplate`, `AutomationWorkflow`, `UserNotificationPreferences`, `DeliveryLog`, `NotificationChannel`).
- **PostgreSQL Database Schema**: `g:\RBT\database\notification-schema.sql` (`notifications`, `email_templates`, `automation_workflows`, `delivery_logs`, `notification_preferences`).
- **UI Interfaces**:
  - Candidate In-App Bell & Drawer: `components/notifications/notification-center.tsx`
  - Admin Automation Manager: `/app/admin/notifications/page.tsx`

## Folder Structure
- `g:\RBT\types\notification.ts`
- `g:\RBT\lib\notification-engine.ts`
- `g:\RBT\database\notification-schema.sql`
- `g:\RBT\components\notifications\notification-center.tsx`
- `g:\RBT\app\admin\notifications\page.tsx`
- `g:\RBT\app\api\notifications\route.ts`
- `g:\RBT\app\api\admin\notifications\broadcast\route.ts`
- `g:\RBT\docs\notification-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\notification-schema.sql`

```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('in_app', 'email', 'push', 'sms', 'webhook')),
  action_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Candidate Notifications
- **Endpoint**: `GET /api/notifications`
- **Query Parameter**: `userId`
- **Response**: `{ success: true, notifications: NotificationItem[] }`

### 2. Mark Notification Read
- **Endpoint**: `POST /api/notifications`
- **Body**: `{ notificationId: string }`
- **Response**: `{ success: true, notification: NotificationItem }`

### 3. Dispatch Broadcast Campaign
- **Endpoint**: `POST /api/admin/notifications/broadcast`
- **Body**: `{ title: string, message: string, segment: string }`
- **Response**: `{ success: true, recipientsCount: 14850 }`

## Business Logic
- **Event Driven**: Any platform module publishes events (`publishNotificationEvent`) which automatically evaluate matching automation workflows.
- **Quiet Hours**: Respects candidate quiet hours settings (default `22:00` to `07:00`).

## Security Notes
- Candidate notification data isolated by `user_id` using Supabase Row Level Security (RLS).

## Performance Considerations
- Async background queue for email and push dispatches ensures zero main thread latency.

## Related Files
- [lib/notification-engine.ts](file:///g:/RBT/lib/notification-engine.ts)
- [components/notifications/notification-center.tsx](file:///g:/RBT/components/notifications/notification-center.tsx)
- [docs/email-automation.md](file:///g:/RBT/docs/email-automation.md)
