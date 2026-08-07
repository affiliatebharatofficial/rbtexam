// Enterprise Super Admin CMS - Core Type Definitions

export type UserRole = 'super_admin' | 'admin' | 'bcba_editor' | 'support_staff' | 'student';

export interface SystemSetting {
  key: string;
  value: any;
  category: 'branding' | 'ai' | 'security' | 'billing' | 'features';
  description: string;
  isPublic: boolean;
  updatedAt: string;
}

export interface RolePermission {
  role: UserRole;
  permissions: string[]; // e.g. ['questions.manage', 'users.impersonate', 'ai.prompts.edit']
}

export interface AIProviderConfig {
  id: string;
  name: string; // OpenAI, Gemini, Anthropic, OpenRouter
  isEnabled: boolean;
  priority: number; // 1 = Primary, 2 = Fallback
  apiKeyMasked: string;
  monthlyTokenLimit: number;
  tokensConsumedThisMonth: number;
  monthlyCostUSD: number;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  fileType: 'image' | 'pdf' | 'video';
  fileSizeKB: number;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

export interface SystemAuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string; // e.g. 'CONFIG_UPDATE', 'USER_IMPERSONATED', 'ROLE_MODIFIED'
  module: string;
  ipAddress: string;
  details: string;
  timestamp: string;
}

export interface PlatformPlugin {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'inactive';
  menuLabel: string;
  route: string;
}
