import { SystemSetting, AIProviderConfig, SystemAuditLog, PlatformPlugin } from '@/types/super-admin';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const STORAGE_KEY = 'rbt_platform_config';

// Default Platform Config Store (Supabase database ready)
const SYSTEM_CONFIG_STORE: Record<string, any> = {
  brandName: 'RBTTrainingAI',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  primaryColor: '#2563EB',
  secondaryColor: '#0F172A',
  companyName: 'RBTTrainingAI Inc.',
  supportEmail: 'support@rbttraining.ai',
  supportPhone: '+1 (800) 555-0199',
  footerCopyright: '© 2026 RBTTrainingAI Inc. All rights reserved.',
  socialLinks: {
    twitter: 'https://twitter.com/rbttrainingai',
    linkedin: 'https://linkedin.com/company/rbttrainingai',
    facebook: 'https://facebook.com/rbttrainingai',
  },
  maintenanceMode: false,
  primaryCurrency: 'USD',
  allowPublicRegistration: true,
  allowNewRegistration: true,
  inviteOnlyMode: false,
  allowedEmailDomains: [] as string[],
  requireAdminApproval: false,
  aiPrimaryProvider: 'OpenAI (GPT-4o)',
  aiFallbackProvider: 'Google Gemini 1.5 Pro',
  requireEmailVerification: true,
  maxDailyFreeAIMessages: 5,
  lemonSqueezy: {
    storeId: 'ls_store_84920',
    apiKeyMasked: 'ls_api_live_51M0...9102',
    webhookSecretMasked: 'ls_whsec_...7492',
    environment: 'live' as 'test' | 'live',
    currency: 'USD',
  },
  stripe: {
    publishableKey: 'pk_live_51M0...9102',
    secretKeyMasked: 'sk_live_51M0...8491',
    webhookSecretMasked: 'whsec_...7492',
    environment: 'live' as 'test' | 'live',
    currency: 'USD',
  },
  smtp: {
    host: 'smtp.sendgrid.net',
    port: 587,
    username: 'apikey',
    passwordMasked: 'SG.9a8f...1029',
    encryption: 'TLS' as 'TLS' | 'SSL' | 'NONE',
    senderName: 'RBTTrainingAI Candidate Portal',
    senderEmail: 'noreply@rbttraining.ai',
  },
  landing: {
    heroTitle: 'Pass Your BACB RBT® Exam on the First Attempt',
    heroSubtitle: 'The ultimate AI-powered preparation platform for Applied Behavior Analysis candidates.',
    ctaButtonText: 'Start Free Candidate Practice',
    featuresTitle: 'Everything You Need for BACB Certification Success',
    faqTitle: 'Frequently Asked Questions',
  },
  language: {
    defaultLocale: 'en-US',
    supportedLocales: ['en-US', 'es-ES'],
  },
};

export const DEFAULT_AI_PROVIDERS: AIProviderConfig[] = [
  { id: 'prov-openai', name: 'OpenAI (GPT-4o / GPT-3.5)', isEnabled: true, priority: 1, apiKeyMasked: 'sk-proj-...8492', monthlyTokenLimit: 50000000, tokensConsumedThisMonth: 12400000, monthlyCostUSD: 186.40 },
  { id: 'prov-gemini', name: 'Google Gemini 1.5 Pro', isEnabled: true, priority: 2, apiKeyMasked: 'AIzaSy...9102', monthlyTokenLimit: 25000000, tokensConsumedThisMonth: 2100000, monthlyCostUSD: 14.20 },
  { id: 'prov-openrouter', name: 'OpenRouter (Claude 3.5 / DeepSeek)', isEnabled: true, priority: 3, apiKeyMasked: 'sk-or-...1029', monthlyTokenLimit: 10000000, tokensConsumedThisMonth: 450000, monthlyCostUSD: 3.80 },
];

export const REGISTERED_PLUGINS: PlatformPlugin[] = [
  { id: 'plug-questions', name: 'Master Question Bank Engine', version: 'v1.4.0', status: 'active', isEnabled: true, category: 'Core Learning', description: 'BACB 2nd Edition Task List question generator & CSV manager.', menuLabel: 'Question Bank', route: '/admin/questions' },
  { id: 'plug-flashcards', name: 'Smart Flashcard Engine', version: 'v1.5.0', status: 'active', isEnabled: true, category: 'Core Learning', description: 'Leitner 5-box spaced repetition algorithm & progress persistence.', menuLabel: 'Flashcards', route: '/flashcards' },
  { id: 'plug-tutor', name: 'Socrates AI Tutor Engine', version: 'v1.6.0', status: 'active', isEnabled: true, category: 'AI Workforce', description: 'Clinical dialogue roleplay, RAG retrieval & prompt safety gates.', menuLabel: 'AI Tutor', route: '/tutor' },
  { id: 'plug-adaptive', name: 'AI Adaptive Learning Engine', version: 'v1.7.0', status: 'active', isEnabled: true, category: 'Core Learning', description: 'Dynamic study planner, target date readiness & domain heatmaps.', menuLabel: 'Study Planner', route: '/study-planner' },
  { id: 'plug-analytics', name: 'Analytics & BI Engine', version: 'v1.8.0', status: 'active', isEnabled: true, category: 'Operations', description: 'Pass likelihood calculator, DAU/MAU metrics & cohort analytics.', menuLabel: 'Analytics', route: '/analytics' },
  { id: 'plug-billing', name: 'Lemon Squeezy Billing Engine', version: 'v1.9.0', status: 'active', isEnabled: true, category: 'Operations', description: 'SaaS merchant checkout, recurring webhooks & subscription quotas.', menuLabel: 'Billing', route: '/profile/billing' },
  { id: 'plug-seo', name: 'Enterprise SEO & pSEO Engine', version: 'v2.0.0', status: 'active', isEnabled: true, category: 'Operations', description: 'Programmatic landing pages, dynamic XML sitemaps & OpenGraph metadata.', menuLabel: 'SEO Hub', route: '/rbt' },
  { id: 'plug-workforce', name: 'AI Workforce Manager', version: 'v2.1.0', status: 'active', isEnabled: true, category: 'AI Workforce', description: '29 autonomous AI agents across 7 specialized departments.', menuLabel: 'AI Workforce', route: '/admin/ai-workforce' },
  { id: 'plug-knowledge', name: 'Knowledge Graph Engine', version: 'v2.2.0', status: 'active', isEnabled: true, category: 'Core Learning', description: 'Interactive BACB task list nodes & clinical dependency visualizer.', menuLabel: 'Knowledge Graph', route: '/admin/knowledge' },
  { id: 'plug-launch', name: 'Launch & Release Engine', version: 'v2.3.0', status: 'active', isEnabled: true, category: 'Operations', description: '20-point pre-launch validation matrix & SemVer changelog generator.', menuLabel: 'Launch Control', route: '/admin/launch-control' },
  { id: 'plug-security', name: 'Security & RLS Engine', version: 'v2.4.0', status: 'active', isEnabled: true, category: 'Security & Infrastructure', description: 'PostgreSQL Row-Level Security, prompt injection filters & audit trail.', menuLabel: 'Security Center', route: '/admin/security' },
  { id: 'plug-brain', name: 'Project Brain Inventory', version: 'v2.5.0', status: 'active', isEnabled: true, category: 'Operations', description: 'Real-time codebase component, database table & API route registry.', menuLabel: 'Project Brain', route: '/admin/project-brain' },
  { id: 'plug-qa', name: 'QA & Automated Testing', version: 'v2.6.0', status: 'active', isEnabled: true, category: 'Operations', description: '145-test suite execution, Playwright E2E smoke tests & health checks.', menuLabel: 'QA Hub', route: '/admin/qa' },
  { id: 'plug-notifications', name: 'Notification & Email Engine', version: 'v2.7.0', status: 'active', isEnabled: true, category: 'Operations', description: 'In-app notification inbox, SMTP gateway & email campaign manager.', menuLabel: 'Notifications', route: '/admin/notifications' },
];

const AUDIT_LOG_BUFFER: SystemAuditLog[] = [
  { id: 'log-01', userId: 'usr-admin-1', userName: 'Super Admin', action: 'CONFIG_UPDATE', module: 'System Settings', ipAddress: '192.168.1.1', details: 'Updated Maintenance Mode to false', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: 'log-02', userId: 'usr-admin-1', userName: 'Super Admin', action: 'PROMPT_UPDATE', module: 'AI Tutor Engine', ipAddress: '192.168.1.1', details: 'Modified Socratic Tutor system prompt version v2.1', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 'log-03', userId: 'usr-admin-1', userName: 'Super Admin', action: 'ROLE_MODIFIED', module: 'Role Management', ipAddress: '192.168.1.1', details: 'Granted BCBA Editor questions.bulk_import permission', timestamp: new Date(Date.now() - 7200000).toISOString() },
];

/**
 * Returns dynamic platform settings with persistence from localStorage & DB
 */
export function getPlatformConfig() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.assign(SYSTEM_CONFIG_STORE, parsed);
      }
    } catch (e) {
      console.error('Failed to load platform config from storage', e);
    }
  }
  return { ...SYSTEM_CONFIG_STORE };
}

/**
 * Updates dynamic platform setting with full persistence to LocalStorage & Supabase database
 */
export function updatePlatformConfig(key: string, value: any, updatedBy: string = 'Super Admin') {
  SYSTEM_CONFIG_STORE[key] = value;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SYSTEM_CONFIG_STORE));
    } catch (e) {
      console.error('Failed to persist platform config to localStorage', e);
    }
  }

  if (isSupabaseConfigured()) {
    try {
      Promise.resolve(
        supabase
          .from('system_settings')
          .upsert({
            key,
            value: typeof value === 'object' ? value : JSON.stringify(value),
            updated_at: new Date().toISOString(),
          })
      )
        .then(({ error }) => {
          if (error && !error.message.includes('fetch failed')) {
            console.error(`Failed to persist system setting '${key}' to Supabase:`, error.message);
          }
        })
        .catch(() => {
          // Ignore offline/test environment fetch errors silently
        });
    } catch (e) {
      // Catch synchronous errors
    }
  }

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
