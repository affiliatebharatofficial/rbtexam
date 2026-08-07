/**
 * Unit Tests — Notification Engine (lib/notification-engine.ts)
 */

import { describe, it, expect } from 'vitest';
import {
  publishNotificationEvent,
  getUserInAppNotifications,
  markNotificationAsRead,
  broadcastNotificationCampaign,
  EMAIL_TEMPLATES,
  AUTOMATION_WORKFLOWS,
} from '@/lib/notification-engine';

describe('publishNotificationEvent()', () => {
  it('creates a notification with correct fields', () => {
    const { notification } = publishNotificationEvent(
      'achievement_unlocked',
      'user-test-01',
      { title: '7-Day Streak!', message: 'You studied 7 days in a row.' }
    );
    expect(notification.title).toBe('7-Day Streak!');
    expect(notification.message).toBe('You studied 7 days in a row.');
    expect(notification.isRead).toBe(false);
    expect(notification.userId).toBe('user-test-01');
  });

  it('returns triggeredWorkflowsCount >= 0', () => {
    const { triggeredWorkflowsCount } = publishNotificationEvent('daily_study_reminder', 'user-x');
    expect(triggeredWorkflowsCount).toBeGreaterThanOrEqual(0);
  });

  it('adds notification to user inbox', () => {
    const countBefore = getUserInAppNotifications('user-ingest-test').length;
    publishNotificationEvent('payment_success', 'user-ingest-test', {
      title: 'Payment Received',
      message: '$29.00 USD processed.',
    });
    expect(getUserInAppNotifications('user-ingest-test').length).toBe(countBefore + 1);
  });
});

describe('markNotificationAsRead()', () => {
  it('marks a notification as read', () => {
    const { notification } = publishNotificationEvent('admin_broadcast', 'user-read-test', {
      title: 'Test Notification',
      message: 'Read me.',
    });
    expect(notification.isRead).toBe(false);
    markNotificationAsRead(notification.id);
    const updated = getUserInAppNotifications('user-read-test').find((n) => n.id === notification.id);
    expect(updated?.isRead).toBe(true);
  });

  it('returns undefined for non-existent notification id', () => {
    const result = markNotificationAsRead('nonexistent-id-xyz');
    expect(result).toBeUndefined();
  });
});

describe('broadcastNotificationCampaign()', () => {
  it('returns a recipient count > 0', () => {
    const result = broadcastNotificationCampaign('Test Campaign', 'Campaign message body', 'all');
    expect(result.count).toBeGreaterThan(0);
  });
});

describe('EMAIL_TEMPLATES', () => {
  it('has at least 1 template', () => {
    expect(EMAIL_TEMPLATES.length).toBeGreaterThanOrEqual(1);
  });

  it('each template has required fields', () => {
    EMAIL_TEMPLATES.forEach((tpl) => {
      expect(tpl).toHaveProperty('id');
      expect(tpl).toHaveProperty('templateCode');
      expect(tpl).toHaveProperty('subject');
      expect(tpl).toHaveProperty('bodyHTML');
      expect(tpl).toHaveProperty('category');
    });
  });
});

describe('AUTOMATION_WORKFLOWS', () => {
  it('each workflow has a triggerEvent and actionChannel', () => {
    AUTOMATION_WORKFLOWS.forEach((wf) => {
      expect(wf).toHaveProperty('triggerEvent');
      expect(wf).toHaveProperty('actionChannel');
      expect(wf.isActive).toBeDefined();
    });
  });
});
