// Enterprise Notification, Email Automation & Workflow Engine - Core Types

export type NotificationChannel = 'in_app' | 'email' | 'push' | 'sms' | 'webhook';

export type NotificationEventName =
  | 'user_registered'
  | 'daily_study_reminder'
  | 'flashcards_due'
  | 'weak_topic_alert'
  | 'achievement_unlocked'
  | 'trial_expiring'
  | 'payment_success'
  | 'payment_failed'
  | 'admin_broadcast';

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  channel: NotificationChannel;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  templateCode: string;
  subject: string;
  bodyHTML: string;
  category: 'onboarding' | 'study' | 'billing' | 'marketing';
  isEditable: boolean;
  updatedAt: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  triggerEvent: NotificationEventName;
  conditionRules: Record<string, any>;
  actionChannel: NotificationChannel;
  actionTemplateId: string;
  isActive: boolean;
}

export interface UserNotificationPreferences {
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  quietHoursStart?: string; // e.g. "22:00"
  quietHoursEnd?: string; // e.g. "07:00"
}

export interface DeliveryLog {
  id: string;
  eventId: string;
  userId: string;
  channel: NotificationChannel;
  recipient: string;
  status: 'sent' | 'delivered' | 'failed' | 'bounced';
  errorMessage?: string;
  timestamp: string;
}
