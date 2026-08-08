/**
 * Environment Validation Script
 * Validates all required environment variables at startup / CI.
 * Run: npx ts-node scripts/validate-env.ts
 */

interface EnvVar {
  key: string;
  required: boolean;
  description: string;
  example?: string;
}

const ENV_SCHEMA: EnvVar[] = [
  // App
  { key: 'NEXT_PUBLIC_APP_URL',             required: true,  description: 'Public app URL', example: 'https://rbtpracticequestions.com' },
  { key: 'NEXT_PUBLIC_APP_NAME',            required: false, description: 'App display name' },
  { key: 'NEXT_PUBLIC_APP_ENV',             required: true,  description: 'Environment: development|staging|production' },

  // Supabase
  { key: 'NEXT_PUBLIC_SUPABASE_URL',        required: true,  description: 'Supabase project URL' },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',   required: true,  description: 'Supabase anonymous key' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY',       required: true,  description: 'Supabase service role key (server only)' },
  { key: 'SUPABASE_JWT_SECRET',             required: true,  description: 'Supabase JWT signing secret' },

  // OpenAI
  { key: 'OPENAI_API_KEY',                  required: true,  description: 'OpenAI API key (sk-...)' },
  { key: 'OPENAI_CHAT_MODEL',               required: false, description: 'LLM model (default: gpt-4o)' },
  { key: 'OPENAI_EMBEDDING_MODEL',          required: false, description: 'Embedding model (default: text-embedding-ada-002)' },

  // Stripe
  { key: 'STRIPE_SECRET_KEY',               required: true,  description: 'Stripe secret key' },
  { key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', required: true, description: 'Stripe publishable key' },
  { key: 'STRIPE_WEBHOOK_SECRET',           required: true,  description: 'Stripe webhook signing secret (whsec_...)' },

  // Email
  { key: 'RESEND_API_KEY',                  required: true,  description: 'Resend email API key' },
  { key: 'RESEND_FROM_EMAIL',               required: true,  description: 'Sender email address' },

  // Security
  { key: 'INTERNAL_API_SECRET',             required: true,  description: 'Internal API signing secret (32+ chars)' },
];

export interface EnvValidationResult {
  isValid: boolean;
  missingRequired: string[];
  warnings: string[];
  summary: {
    total: number;
    present: number;
    missing: number;
  };
}

export function validateEnvironment(): EnvValidationResult {
  const missingRequired: string[] = [];
  const warnings: string[] = [];
  let presentCount = 0;

  for (const envVar of ENV_SCHEMA) {
    const value = process.env[envVar.key];
    if (!value) {
      if (envVar.required) {
        missingRequired.push(envVar.key);
      } else {
        warnings.push(`Optional env var ${envVar.key} not set. ${envVar.description}`);
      }
    } else {
      presentCount++;
      // Value quality checks
      if (envVar.key === 'INTERNAL_API_SECRET' && value.length < 32) {
        warnings.push(`INTERNAL_API_SECRET is shorter than 32 characters — use a stronger secret.`);
      }
      if (envVar.key.includes('OPENAI_API_KEY') && !value.startsWith('sk-')) {
        warnings.push(`OPENAI_API_KEY may be invalid — should start with "sk-".`);
      }
      if (envVar.key === 'STRIPE_WEBHOOK_SECRET' && !value.startsWith('whsec_')) {
        warnings.push(`STRIPE_WEBHOOK_SECRET may be invalid — should start with "whsec_".`);
      }
    }
  }

  return {
    isValid: missingRequired.length === 0,
    missingRequired,
    warnings,
    summary: {
      total: ENV_SCHEMA.length,
      present: presentCount,
      missing: missingRequired.length,
    },
  };
}

// CLI runner
if (require.main === module) {
  const result = validateEnvironment();
  console.log('\n🔍 RBT Practice Questions — Environment Validation\n');
  console.log(`Total vars: ${result.summary.total}  |  Present: ${result.summary.present}  |  Missing: ${result.summary.missing}`);

  if (result.missingRequired.length > 0) {
    console.error('\n❌ MISSING REQUIRED ENVIRONMENT VARIABLES:');
    result.missingRequired.forEach((key) => console.error(`   • ${key}`));
    console.error('\nCopy .env.example → .env.local and fill in the values.\n');
    process.exit(1);
  }

  if (result.warnings.length > 0) {
    console.warn('\n⚠  WARNINGS:');
    result.warnings.forEach((w) => console.warn(`   • ${w}`));
  }

  console.log('\n✅ All required environment variables are present.\n');
  process.exit(0);
}
