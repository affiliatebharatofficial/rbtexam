import { SystemSetting, AIProviderConfig, SystemAuditLog, PlatformPlugin } from '@/types/super-admin';

// Default Platform Config Store (Supabase database ready)
const SYSTEM_CONFIG_STORE: Record<string, any> = {
  brandName: 'RBTTrainingAI',
  maintenanceMode: false,
  primaryCurrency: 'USD',
  allowPublicRegistration: true,
  aiPrimaryProvider: 'OpenAI (GPT-4o)',
  aiFallbackProvider: 'Google Gemini 1.5 Pro',
  requireEmailVerification: true,
  maxDailyFreeAIMessages: 5,
};

export const DEFAULT_AI_PROVIDERS: AIProviderConfig[] = [
  { id: 'prov-openai', name: 'OpenAI (GPT-4o / GPT-3.5)', isEnabled: true, priority: 1, apiKeyMasked: 'sk-proj-...8492', monthlyTokenLimit: 50000000, tokensConsumedThisMonth: 12400000, monthlyCostUSD: 186.40 },
  { id: 'prov-gemini', name: 'Google Gemini 1.5 Pro', isEnabled: true, priority: 2, apiKeyMasked: 'AIzaSy...9102', monthlyTokenLimit: 25000000, tokensConsumedThisMonth: 2100000, monthlyCostUSD: 14.20 },
  { id: 'prov-openrouter', name: 'OpenRouter (Claude 3.5 / DeepSeek)', isEnabled: true, priority: 3, apiKeyMasked: 'sk-or-...1029', monthlyTokenLimit: 10000000, tokensConsumedThisMonth: 450000, monthlyCostUSD: 3.80 },
];

export const REGISTERED_PLUGINS: PlatformPlugin[] = [
  { id: 'plug-questions', name: 'Master Question Bank Engine', version: 'v1.4.0', status: 'active', menuLabel: 'Question Bank', route: '/admin/questions' },
  { id: 'plug-flashcards', name: 'Smart Flashcard Engine', version: 'v1.5.0', status: 'active', menuLabel: 'Flashcards', route: '/flashcards' },
  { id: 'plug-tutor', name: 'Socrates AI Tutor Engine', version: 'v1.6.0', status: 'active', menuLabel: 'AI Tutor', route: '/tutor' },
  { id: 'plug-adaptive', name: 'AI Adaptive Learning Engine', version: 'v1.7.0', status: 'active', menuLabel: 'Study Planner', route: '/study-planner' },
  { id: 'plug-analytics', name: 'Analytics & BI Engine', version: 'v1.8.0', status: 'active', menuLabel: 'Analytics', route: '/analytics' },
  { id: 'plug-billing', name: 'Subscription & Billing Engine', version: 'v1.9.0', status: 'active', menuLabel: 'Billing', route: '/profile/billing' },
  { id: 'plug-seo', name: 'Enterprise SEO & pSEO Engine', version: 'v2.0.0', status: 'active', menuLabel: 'SEO Hub', route: '/rbt' },
];

const AUDIT_LOG_BUFFER: SystemAuditLog[] = [
  { id: 'log-01', userId: 'usr-admin-1', userName: 'Super Admin', action: 'CONFIG_UPDATE', module: 'System Settings', ipAddress: '192.168.1.1', details: 'Updated Maintenance Mode to false', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: 'log-02', userId: 'usr-admin-1', userName: 'Super Admin', action: 'PROMPT_UPDATE', module: 'AI Tutor Engine', ipAddress: '192.168.1.1', details: 'Modified Socratic Tutor system prompt version v2.1', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 'log-03', userId: 'usr-admin-1', userName: 'Super Admin', action: 'ROLE_MODIFIED', module: 'Role Management', ipAddress: '192.168.1.1', details: 'Granted BCBA Editor questions.bulk_import permission', timestamp: new Date(Date.now() - 7200000).toISOString() },
];

/**
 * Returns dynamic platform settings
 */
export function getPlatformConfig() {
  return { ...SYSTEM_CONFIG_STORE };
}

/**
 * Updates dynamic platform setting without requiring code changes
 */
export function updatePlatformConfig(key: string, value: any, updatedBy: string = 'Super Admin') {
  SYSTEM_CONFIG_STORE[key] = value;

  logAuditEvent(updatedBy, 'CONFIG_UPDATE', 'System Settings', `Updated ${key} to ${JSON.stringify(value)}`);
  return { success: true, key, value };
}

/**
 * Records system security audit trail
 */
export function logAuditEvent(userName: string, action: string, module: string, details: string) {
  const log: SystemAuditLog = {
    id: `log-${Date.now()}`,
    userId: 'usr-admin-1',
    userName,
    action,
    module,
    ipAddress: '127.0.0.1',
    details,
    timestamp: new Date().toISOString(),
  };

  AUDIT_LOG_BUFFER.unshift(log);
  if (AUDIT_LOG_BUFFER.length > 500) AUDIT_LOG_BUFFER.pop();
}

/**
 * Returns audit log history
 */
export function getSystemAuditLogs(): SystemAuditLog[] {
  return [...AUDIT_LOG_BUFFER];
}
