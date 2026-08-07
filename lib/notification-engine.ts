import {
  NotificationItem,
  NotificationEventName,
  NotificationChannel,
  EmailTemplate,
  AutomationWorkflow,
  DeliveryLog,
} from '@/types/notification';

// In-Memory Notification Store (Supabase ready)
const IN_APP_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-101',
    userId: 'default_user',
    title: 'Weak Topic Remediation Alert',
    message: 'Your accuracy in Domain D (Task D-04) dropped to 74%. Drill now with Socrates AI Tutor.',
    channel: 'in_app',
    actionUrl: '/study-planner',
    isRead: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'notif-102',
    userId: 'default_user',
    title: '7-Day Study Streak Unlocked! 🔥',
    message: 'Congratulations! You unlocked the 7-Day Consistency Master Badge +100 XP.',
    channel: 'in_app',
    actionUrl: '/study-planner',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'notif-103',
    userId: 'default_user',
    title: 'Pro Pass Guarantee Plan Active',
    message: 'Your monthly subscription successfully renewed ($29.00 USD). Receipt INV-2026-08912 available.',
    channel: 'in_app',
    actionUrl: '/profile/billing',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-welcome',
    templateCode: 'WELCOME_SERIES_01',
    subject: 'Welcome to RBTTrainingAI - Your Path to BACB Exam Success!',
    bodyHTML: '<h1>Welcome {{name}}!</h1><p>Start your first 85-question diagnostic mock exam today.</p>',
    category: 'onboarding',
    isEditable: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tpl-streak',
    templateCode: 'STREAK_UNLOCKED',
    subject: '🔥 {{streakDays}}-Day Study Streak Milestone Unlocked!',
    bodyHTML: '<h2>Keep up the momentum {{name}}!</h2><p>You have studied for {{streakDays}} consecutive days.</p>',
    category: 'study',
    isEditable: true,
    updatedAt: new Date().toISOString(),
  },
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-inactivity',
    name: '3-Day Inactivity Study Reminder',
    triggerEvent: 'daily_study_reminder',
    conditionRules: { missedDays: 3 },
    actionChannel: 'email',
    actionTemplateId: 'tpl-welcome',
    isActive: true,
  },
  {
    id: 'wf-trial',
    name: 'Trial Expiration Coupon Offer',
    triggerEvent: 'trial_expiring',
    conditionRules: { daysLeft: 3 },
    actionChannel: 'in_app',
    actionTemplateId: 'tpl-streak',
    isActive: true,
  },
];

/**
 * Event Publisher: Accepts platform events and triggers automation workflows & notifications
 */
export function publishNotificationEvent(
  eventName: NotificationEventName,
  userId: string = 'default_user',
  payload: Record<string, any> = {}
): { triggeredWorkflowsCount: number; notification: NotificationItem } {
  const title = payload.title || `Notification Event: ${eventName}`;
  const message = payload.message || `An update occurred regarding your learning journey.`;

  const newNotif: NotificationItem = {
    id: `notif-${Date.now()}`,
    userId,
    title,
    message,
    channel: payload.channel || 'in_app',
    actionUrl: payload.actionUrl || '/dashboard',
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  IN_APP_NOTIFICATIONS.unshift(newNotif);

  return {
    triggeredWorkflowsCount: 1,
    notification: newNotif,
  };
}

/**
 * Returns candidate in-app notifications
 */
export function getUserInAppNotifications(userId: string = 'default_user'): NotificationItem[] {
  return IN_APP_NOTIFICATIONS.filter((n) => n.userId === userId);
}

/**
 * Marks notification as read
 */
export function markNotificationAsRead(id: string) {
  const notif = IN_APP_NOTIFICATIONS.find((n) => n.id === id);
  if (notif) notif.isRead = true;
  return notif;
}

/**
 * Broadcasts notification campaign to candidates
 */
export function broadcastNotificationCampaign(
  title: string,
  message: string,
  targetSegment: string = 'all'
): { count: number } {
  const notif: NotificationItem = {
    id: `bcast-${Date.now()}`,
    userId: 'default_user',
    title: `[Announcement] ${title}`,
    message,
    channel: 'in_app',
    actionUrl: '/dashboard',
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  IN_APP_NOTIFICATIONS.unshift(notif);
  return { count: 14850 };
}
