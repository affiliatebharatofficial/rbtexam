import { getRuntimeEnv, getSupabaseAdminClient, isSupabaseConfigured } from './supabase';
import { getPlatformConfig, updatePlatformConfig, logAuditEvent } from './platform-config';
import * as net from 'node:net';
import * as tls from 'node:tls';

export interface SMTPConfiguration {
  enabled: boolean;
  provider: 'smtp_relay' | 'resend' | 'sendgrid' | 'brevo' | 'supabase';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  encryption?: 'TLS' | 'SSL' | 'NONE';
  senderName: string;
  senderEmail: string;
  apiKey?: string; // For Resend / SendGrid / Brevo
  replyTo?: string;
  updatedAt?: string;
}

export interface EmailDispatchOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  senderName?: string;
  replyTo?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  provider: string;
  latencyMs?: number;
  error?: string;
}

const DEFAULT_SMTP_CONFIG: SMTPConfiguration = {
  enabled: true,
  provider: 'resend',
  host: 'smtp.resend.com',
  port: 587,
  username: 'resend',
  password: '',
  encryption: 'TLS',
  senderName: 'RBT Practice AI',
  senderEmail: 'verify@rbtpracticeai.com',
  apiKey: '',
  replyTo: 'support@rbtpracticeai.com',
  updatedAt: new Date().toISOString(),
};

const SYSTEM_CONFIG_PROFILE_EMAIL = 'system_smtp_config@rbtpracticeai.internal';

/**
 * Gets the current active SMTP/Email Configuration from Database or System Config
 */
export async function getActiveSMTPConfig(): Promise<SMTPConfiguration> {
  const platformConfig = getPlatformConfig();
  const envResendKey = getRuntimeEnv('RESEND_API_KEY') || process.env.RESEND_API_KEY || '';
  const envFromEmail = getRuntimeEnv('RESEND_FROM_EMAIL') || process.env.RESEND_FROM_EMAIL || '';

  // 1. Try to load from Supabase persistent storage
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdminClient();

      // Check profiles dedicated config row (guaranteed to exist across migrations)
      const { data: profData } = await adminClient
        .from('profiles')
        .select('avatar_url')
        .eq('email', SYSTEM_CONFIG_PROFILE_EMAIL)
        .limit(1)
        .maybeSingle();

      if (profData?.avatar_url && profData.avatar_url.startsWith('{')) {
        const stored = JSON.parse(profData.avatar_url);
        return {
          ...DEFAULT_SMTP_CONFIG,
          ...stored,
          apiKey: stored.apiKey || envResendKey,
          senderEmail: stored.senderEmail || envFromEmail || DEFAULT_SMTP_CONFIG.senderEmail,
        };
      }

      // Check system_settings if table exists
      const { data: sysData } = await adminClient
        .from('system_settings')
        .select('*')
        .or('setting_key.eq.smtp_configuration,key.eq.smtp_configuration')
        .limit(1)
        .maybeSingle();

      if (sysData) {
        const val = sysData.setting_value || sysData.value;
        const stored = typeof val === 'string' ? JSON.parse(val) : val;
        if (stored) {
          return {
            ...DEFAULT_SMTP_CONFIG,
            ...stored,
            apiKey: stored.apiKey || envResendKey,
            senderEmail: stored.senderEmail || envFromEmail || DEFAULT_SMTP_CONFIG.senderEmail,
          };
        }
      }
    } catch (e) {
      // Fallback
    }
  }

  // 2. Fallback to platform-config
  const conf = platformConfig.smtp || {};
  return {
    ...DEFAULT_SMTP_CONFIG,
    ...conf,
    apiKey: conf.apiKey || envResendKey,
    senderEmail: conf.senderEmail || envFromEmail || DEFAULT_SMTP_CONFIG.senderEmail,
  };
}

/**
 * Saves and updates SMTP Configuration in Super Admin CMS & Database
 */
export async function saveSMTPConfig(
  newConfig: Partial<SMTPConfiguration>,
  adminUser: string = 'Super Admin'
): Promise<SMTPConfiguration> {
  const current = await getActiveSMTPConfig();
  const updated: SMTPConfiguration = {
    ...current,
    ...newConfig,
    updatedAt: new Date().toISOString(),
  };

  updatePlatformConfig('smtp', updated, adminUser);

  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdminClient();

      // Persist to profiles table guaranteed row
      await adminClient.from('profiles').upsert(
        {
          id: '00000000-0000-0000-0000-000000000001',
          email: SYSTEM_CONFIG_PROFILE_EMAIL,
          full_name: 'System SMTP Configuration',
          avatar_url: JSON.stringify(updated),
          certification_target: 'RBT',
          subscription_tier: 'enterprise',
          account_status: 'active',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

      // Also attempt system_settings
      try {
        await adminClient.from('system_settings').upsert(
          {
            setting_key: 'smtp_configuration',
            setting_value: updated,
            category: 'security',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'setting_key' }
        );
      } catch (_) {}
    } catch (e) {
      console.warn('Failed to save SMTP config to database:', e);
    }
  }

  logAuditEvent(
    adminUser,
    'SMTP_CONFIG_UPDATED',
    'Email Infrastructure',
    `Updated email provider to ${updated.provider} (${updated.senderEmail})`
  );
  return updated;
}

/**
 * Direct SMTP Socket Transport via Node.js TLS/Net Sockets
 */
async function sendDirectSMTPSocket(
  config: SMTPConfiguration,
  options: EmailDispatchOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  return new Promise((resolve) => {
    const host = config.host || 'smtp.gmail.com';
    const port = config.port || 587;
    const isDirectTls = port === 465 || config.encryption === 'SSL';
    let socket: any;
    let step = 'INIT';
    let buffer = '';
    let resolved = false;

    const cleanup = (err?: any) => {
      if (resolved) return;
      resolved = true;
      try {
        socket?.destroy();
      } catch (_) {}
      if (err) {
        resolve({ success: false, error: err.message || String(err) });
      }
    };

    const write = (cmd: string) => {
      socket.write(cmd + '\r\n');
    };

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString();
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line) continue;
        const code = parseInt(line.substring(0, 3), 10);
        const isLastLine = line.charAt(3) === ' ' || line.length === 3;
        if (!isLastLine) continue;

        if (code >= 400) {
          return cleanup(new Error(`SMTP Error (${code}): ${line}`));
        }

        if (step === 'INIT' && code === 220) {
          step = 'EHLO';
          write('EHLO rbtpracticeai.com');
        } else if (step === 'EHLO' && code === 250) {
          if (config.username && config.password) {
            step = 'AUTH_LOGIN';
            write('AUTH LOGIN');
          } else {
            step = 'MAIL_FROM';
            write(`MAIL FROM:<${config.senderEmail}>`);
          }
        } else if (step === 'AUTH_LOGIN' && code === 334) {
          step = 'AUTH_USER';
          write(Buffer.from(config.username || '').toString('base64'));
        } else if (step === 'AUTH_USER' && code === 334) {
          step = 'AUTH_PASS';
          write(Buffer.from(config.password || '').toString('base64'));
        } else if (step === 'AUTH_PASS' && code === 235) {
          step = 'MAIL_FROM';
          write(`MAIL FROM:<${config.senderEmail}>`);
        } else if (step === 'MAIL_FROM' && code === 250) {
          step = 'RCPT_TO';
          const to = Array.isArray(options.to) ? options.to[0] : options.to;
          write(`RCPT TO:<${to}>`);
        } else if (step === 'RCPT_TO' && code === 250) {
          step = 'DATA';
          write('DATA');
        } else if (step === 'DATA' && code === 354) {
          step = 'MESSAGE';
          const toList = Array.isArray(options.to) ? options.to.join(', ') : options.to;
          const msg = [
            `From: ${options.from || `${config.senderName} <${config.senderEmail}>`}`,
            `To: ${toList}`,
            `Subject: ${options.subject}`,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: 7bit',
            '',
            options.html,
            '.',
          ].join('\r\n');
          write(msg);
        } else if (step === 'MESSAGE' && code === 250) {
          step = 'QUIT';
          write('QUIT');
          resolved = true;
          resolve({ success: true, messageId: `smtp_${Date.now()}` });
          cleanup();
        }
      }
    };

    try {
      if (isDirectTls) {
        socket = tls.connect(
          { host, port, timeout: 12000, rejectUnauthorized: false },
          () => {}
        );
      } else {
        socket = net.connect({ host, port, timeout: 12000 }, () => {});
      }
      socket.on('data', onData);
      socket.on('error', (err: any) => cleanup(err));
      socket.on('timeout', () => cleanup(new Error(`SMTP Connection timed out connecting to ${host}:${port}`)));
    } catch (err: any) {
      cleanup(err);
    }
  });
}

/**
 * Core Universal Email Dispatcher
 */
export async function sendTransactionalEmail(
  options: EmailDispatchOptions
): Promise<EmailDispatchResult> {
  const startTime = Date.now();
  const config = await getActiveSMTPConfig();
  const recipientList = Array.isArray(options.to) ? options.to : [options.to];
  const primaryRecipient = recipientList[0]?.toLowerCase().trim();

  if (!primaryRecipient) {
    return {
      success: false,
      provider: 'none',
      error: 'Recipient email address is required',
    };
  }

  const sender = options.from || `${config.senderName} <${config.senderEmail}>`;
  const apiKey = config.apiKey || getRuntimeEnv('RESEND_API_KEY') || process.env.RESEND_API_KEY || '';

  // 1. Dispatch via Resend API (if Resend provider or apiKey starts with re_)
  if (config.provider === 'resend' || (apiKey && apiKey.startsWith('re_'))) {
    const key = apiKey || config.password || '';
    if (key) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: sender,
            to: recipientList,
            subject: options.subject,
            html: options.html,
            text: options.text || options.subject,
            reply_to: options.replyTo || config.replyTo,
          }),
        });

        const latencyMs = Date.now() - startTime;

        if (res.ok) {
          const data = (await res.json()) as any;
          logAuditEvent(
            'SYSTEM',
            'EMAIL_SENT',
            'Resend Provider',
            `Delivered "${options.subject}" to ${primaryRecipient} (${latencyMs}ms)`
          );
          return {
            success: true,
            messageId: data?.id || `resend_${Date.now()}`,
            provider: 'resend',
            latencyMs,
          };
        } else {
          const errJson = (await res.json().catch(() => ({}))) as any;
          const errMsg = errJson?.message || `Resend API returned status ${res.status}`;
          console.warn('Resend email error:', errMsg);
          return {
            success: false,
            provider: 'resend',
            error: errMsg,
            latencyMs,
          };
        }
      } catch (err: any) {
        return {
          success: false,
          provider: 'resend',
          error: err?.message || 'Resend HTTP dispatch failed',
          latencyMs: Date.now() - startTime,
        };
      }
    }
  }

  // 2. Dispatch via Brevo / SendInBlue REST API
  if (config.provider === 'brevo' || (apiKey && apiKey.startsWith('xkeysib-'))) {
    const key = apiKey || config.password || '';
    if (key) {
      try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': key,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            sender: { name: config.senderName, email: config.senderEmail },
            to: recipientList.map((e) => ({ email: e })),
            subject: options.subject,
            htmlContent: options.html,
            textContent: options.text,
          }),
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          const data = (await res.json()) as any;
          return {
            success: true,
            messageId: data?.messageId,
            provider: 'brevo',
            latencyMs,
          };
        } else {
          const errJson = (await res.json().catch(() => ({}))) as any;
          return {
            success: false,
            provider: 'brevo',
            error: errJson?.message || `Brevo returned status ${res.status}`,
            latencyMs,
          };
        }
      } catch (err: any) {
        return {
          success: false,
          provider: 'brevo',
          error: err?.message,
          latencyMs: Date.now() - startTime,
        };
      }
    }
  }

  // 3. Dispatch via SendGrid Mail Send REST API
  if (config.provider === 'sendgrid' || (apiKey && apiKey.startsWith('SG.'))) {
    const key = apiKey || config.password || '';
    if (key) {
      try {
        const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{ to: recipientList.map((e) => ({ email: e })) }],
            from: { email: config.senderEmail, name: config.senderName },
            subject: options.subject,
            content: [{ type: 'text/html', value: options.html }],
          }),
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok || res.status === 202) {
          return {
            success: true,
            messageId: `sg_${Date.now()}`,
            provider: 'sendgrid',
            latencyMs,
          };
        } else {
          const errJson = (await res.json().catch(() => ({}))) as any;
          return {
            success: false,
            provider: 'sendgrid',
            error: errJson?.errors?.[0]?.message || `SendGrid returned status ${res.status}`,
            latencyMs,
          };
        }
      } catch (err: any) {
        return {
          success: false,
          provider: 'sendgrid',
          error: err?.message,
          latencyMs: Date.now() - startTime,
        };
      }
    }
  }

  // 4. Dispatch via Direct Custom SMTP Relay Socket (Gmail, Hostinger, cPanel, SES, etc.)
  if (config.provider === 'smtp_relay' || config.host) {
    const socketRes = await sendDirectSMTPSocket(config, options);
    const latencyMs = Date.now() - startTime;
    if (socketRes.success) {
      logAuditEvent(
        'SYSTEM',
        'EMAIL_SENT',
        'SMTP Relay',
        `Delivered "${options.subject}" to ${primaryRecipient} via ${config.host} (${latencyMs}ms)`
      );
      return {
        success: true,
        messageId: socketRes.messageId,
        provider: 'smtp_relay',
        latencyMs,
      };
    } else {
      return {
        success: false,
        provider: 'smtp_relay',
        error: socketRes.error || 'Failed to connect to SMTP server',
        latencyMs,
      };
    }
  }

  // 5. Fallback warning
  const latencyMs = Date.now() - startTime;
  return {
    success: false,
    provider: 'unconfigured',
    error: 'No active SMTP Provider or API Key configured in Super Admin CMS.',
    latencyMs,
  };
}

/**
 * Sends a live Test Email to verify SMTP configuration
 */
export async function testSMTPConnection(
  testRecipient: string,
  tempConfig?: Partial<SMTPConfiguration>
): Promise<EmailDispatchResult> {
  const config = tempConfig ? { ...DEFAULT_SMTP_CONFIG, ...tempConfig } : await getActiveSMTPConfig();
  const testSubject = `✅ [SMTP Test] RBT Practice AI Email Dispatch Verified`;
  const testHtml = `
    <div style="font-family: sans-serif; padding: 24px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
      <h2 style="color: #2563EB; margin-top: 0;">SMTP & Email Delivery Test Successful</h2>
      <p>This is a live test email sent from <strong>${config.senderName}</strong> (&lt;${config.senderEmail}&gt;).</p>
      <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 13px;">
        <p style="margin: 4px 0;"><strong>Provider:</strong> ${config.provider.toUpperCase()}</p>
        <p style="margin: 4px 0;"><strong>Host:</strong> ${config.host || 'Cloud API'}</p>
        <p style="margin: 4px 0;"><strong>Sender Email:</strong> ${config.senderEmail}</p>
        <p style="margin: 4px 0;"><strong>Recipient:</strong> ${testRecipient}</p>
        <p style="margin: 4px 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      </div>
      <p style="color: #64748b; font-size: 12px; margin-top: 16px;">RBT Practice Questions • Production Email Engine</p>
    </div>
  `;

  return sendTransactionalEmail({
    to: testRecipient,
    subject: testSubject,
    html: testHtml,
    text: 'SMTP Test Successful from RBT Practice AI.',
    from: `${config.senderName} <${config.senderEmail}>`,
  });
}

