import { getRuntimeEnv, getSupabaseAdminClient, isSupabaseConfigured } from './supabase';
import { getPlatformConfig, updatePlatformConfig, logAuditEvent } from './platform-config';

export interface SMTPConfiguration {
  enabled: boolean;
  provider: 'smtp_relay' | 'resend' | 'sendgrid' | 'brevo' | 'mailchannels' | 'supabase';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  encryption?: 'TLS' | 'SSL' | 'NONE';
  senderName: string;
  senderEmail: string;
  apiKey?: string;
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
  diagnostics?: string;
}

const DEFAULT_SMTP_CONFIG: SMTPConfiguration = {
  enabled: true,
  provider: 'smtp_relay',
  host: 'smtp.gmail.com',
  port: 465,
  username: '',
  password: '',
  encryption: 'SSL',
  senderName: 'RBT Practice AI',
  senderEmail: 'hello@rbtpracticeai.com',
  apiKey: '',
  replyTo: 'support@rbtpracticeai.com',
  updatedAt: new Date().toISOString(),
};

const SYSTEM_CONFIG_PROFILE_EMAIL = 'system_smtp_config@rbtpracticeai.internal';

const withTimeout = async <T = any>(promise: PromiseLike<T> | Promise<T> | any, ms: number = 3500): Promise<T> => {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Database query timeout')), ms)),
  ]);
};

/**
 * Gets the current active SMTP/Email Configuration from Database or System Config
 */
export async function getActiveSMTPConfig(): Promise<SMTPConfiguration> {
  if (tempOverrideConfig) {
    return tempOverrideConfig;
  }
  const platformConfig = getPlatformConfig();
  const envResendKey = getRuntimeEnv('RESEND_API_KEY') || process.env.RESEND_API_KEY || '';
  const envFromEmail = getRuntimeEnv('RESEND_FROM_EMAIL') || process.env.RESEND_FROM_EMAIL || '';

  // In test environment, immediately return local configuration to avoid network timeouts
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    const conf = platformConfig.smtp || {};
    return {
      ...DEFAULT_SMTP_CONFIG,
      ...conf,
      apiKey: conf.apiKey || envResendKey,
      senderEmail: conf.senderEmail || envFromEmail || DEFAULT_SMTP_CONFIG.senderEmail,
    };
  }

  // 1. Try to load from Supabase persistent storage
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdminClient();

      // Check users table for system smtp config
      const userRes = await withTimeout(
        adminClient
          .from('users')
          .select('full_name')
          .eq('email', SYSTEM_CONFIG_PROFILE_EMAIL)
          .limit(1)
          .maybeSingle()
      ).catch(() => null);

      const userData = (userRes as any)?.data;
      if (userData?.full_name && userData.full_name.startsWith('{')) {
        const stored = JSON.parse(userData.full_name);
        return {
          ...DEFAULT_SMTP_CONFIG,
          ...stored,
          apiKey: stored.apiKey || envResendKey,
          senderEmail: stored.senderEmail || envFromEmail || DEFAULT_SMTP_CONFIG.senderEmail,
        };
      }

      const profRes = await withTimeout(
        adminClient
          .from('profiles')
          .select('avatar_url')
          .eq('email', SYSTEM_CONFIG_PROFILE_EMAIL)
          .limit(1)
          .maybeSingle()
      ).catch(() => null);

      const profData = (profRes as any)?.data;
      if (profData?.avatar_url && profData.avatar_url.startsWith('{')) {
        const stored = JSON.parse(profData.avatar_url);
        return {
          ...DEFAULT_SMTP_CONFIG,
          ...stored,
          apiKey: stored.apiKey || envResendKey,
          senderEmail: stored.senderEmail || envFromEmail || DEFAULT_SMTP_CONFIG.senderEmail,
        };
      }
    } catch (e) {
      // Fallback to local
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

  // Preserve existing password or apiKey if masked or omitted
  const cleanPassword =
    newConfig.password && newConfig.password !== '••••••••' && newConfig.password.trim() !== ''
      ? newConfig.password.trim()
      : current.password;

  const cleanApiKey =
    newConfig.apiKey && !newConfig.apiKey.includes('...') && newConfig.apiKey.trim() !== ''
      ? newConfig.apiKey.trim()
      : current.apiKey;

  const updated: SMTPConfiguration = {
    ...current,
    ...newConfig,
    password: cleanPassword,
    apiKey: cleanApiKey,
    updatedAt: new Date().toISOString(),
  };

  updatePlatformConfig('smtp', updated, adminUser);

  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return updated;
  }

  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdminClient();

      await withTimeout(
        adminClient.from('users').upsert(
          {
            id: '00000000-0000-0000-0000-000000000001',
            email: SYSTEM_CONFIG_PROFILE_EMAIL,
            full_name: JSON.stringify(updated),
            role: 'admin',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        )
      ).catch(() => null);
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
 * Universal Direct SMTP Socket Transport supporting Node.js sockets & Cloudflare sockets
 */
async function sendDirectSMTPSocket(
  config: SMTPConfiguration,
  options: EmailDispatchOptions
): Promise<{ success: boolean; messageId?: string; error?: string; diagnostics?: string }> {
  const host = (config.host || 'smtp.gmail.com').trim();
  const port = Number(config.port) || 465;
  const isDirectTls = port === 465 || config.encryption === 'SSL';
  const username = (config.username || '').trim();
  const password = (config.password || '').trim();
  const envelopeSender = (username && username.includes('@') ? username : (config.senderEmail || 'hello@rbtpracticeai.com')).trim();
  const senderEmail = (config.senderEmail || envelopeSender).trim();
  const senderName = config.senderName || 'RBT Practice AI';
  const recipientList = Array.isArray(options.to) ? options.to : [options.to];
  const primaryRecipient = recipientList[0]?.toLowerCase().trim();

  if (username && !password) {
    return {
      success: false,
      error: `SMTP Authentication password is required for "${username}". Please open Super Admin > Notifications (/admin/notifications), enter your email password, and click "Save Email & SMTP Settings".`,
    };
  }

  // Try Cloudflare Sockets first (if running on Cloudflare Workers edge)
  try {
    const cfMod = 'cloudflare:sockets';
    const cf = await (import(/* webpackIgnore: true */ cfMod) as Promise<any>).catch(() => null);
    if (cf && typeof cf.connect === 'function') {
      const socket = cf.connect(
        { hostname: host, port },
        { secureTransport: isDirectTls ? 'on' : 'off', allowHalfOpen: false }
      );

      const writer = socket.writable.getWriter();
      const reader = socket.readable.getReader();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      let buffer = '';
      const readLine = async (): Promise<string> => {
        while (true) {
          const idx = buffer.indexOf('\r\n');
          if (idx !== -1) {
            const line = buffer.substring(0, idx);
            buffer = buffer.substring(idx + 2);
            return line;
          }
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
        }
        return buffer;
      };

      const writeCommand = async (cmd: string) => {
        await writer.write(encoder.encode(cmd + '\r\n'));
      };

      const readSmtpResponse = async (): Promise<{ code: number; lastLine: string; lines: string[] }> => {
        const lines: string[] = [];
        while (true) {
          const line = await readLine();
          lines.push(line);
          const isContinuation = line.length >= 4 && line.charAt(3) === '-';
          if (!isContinuation) {
            const code = parseInt(line.substring(0, 3), 10) || 0;
            return { code, lastLine: line, lines };
          }
        }
      };

      // Read initial server banner
      const greeting = await readSmtpResponse();
      if (greeting.code !== 220) {
        return { success: false, error: `SMTP Greeting Error: ${greeting.lastLine}` };
      }

      await writeCommand('EHLO rbtpracticeai.com');
      const ehloRes = await readSmtpResponse();
      if (ehloRes.code !== 250) {
        return { success: false, error: `SMTP EHLO rejected: ${ehloRes.lastLine}` };
      }

      // Authenticate
      if (username && password) {
        await writeCommand('AUTH LOGIN');
        const authUserPrompt = await readSmtpResponse();
        if (authUserPrompt.code !== 334) {
          return { success: false, error: `SMTP AUTH prompt error: ${authUserPrompt.lastLine}` };
        }

        await writeCommand(btoa(username));
        const authPassPrompt = await readSmtpResponse();
        if (authPassPrompt.code !== 334) {
          return { success: false, error: `SMTP Username rejected: ${authPassPrompt.lastLine}` };
        }

        await writeCommand(btoa(password));
        const authResult = await readSmtpResponse();
        if (authResult.code !== 235) {
          const isGmail = host.includes('google') || host.includes('gmail');
          const help = isGmail
            ? ' For Gmail, you must generate and use a 16-character Google App Password (not your personal account password).'
            : ' Please verify your email password is correct.';
          return { success: false, error: `SMTP Authentication failed (${authResult.lastLine}).${help}` };
        }
      }

      // MAIL FROM
      await writeCommand(`MAIL FROM:<${envelopeSender}>`);
      const mailFromRes = await readSmtpResponse();
      if (mailFromRes.code !== 250) {
        return { success: false, error: `SMTP MAIL FROM rejected: ${mailFromRes.lastLine}` };
      }

      // RCPT TO
      for (const rec of recipientList) {
        await writeCommand(`RCPT TO:<${rec}>`);
        const rcptRes = await readSmtpResponse();
        if (rcptRes.code !== 250) {
          return { success: false, error: `SMTP Recipient rejected (<${rec}>): ${rcptRes.lastLine}` };
        }
      }

      // DATA
      await writeCommand('DATA');
      const dataPrompt = await readSmtpResponse();
      if (dataPrompt.code !== 354) {
        return { success: false, error: `SMTP DATA command rejected: ${dataPrompt.lastLine}` };
      }

      const mimeMessage = [
        `From: "${senderName}" <${senderEmail}>`,
        `To: ${recipientList.join(', ')}`,
        `Subject: ${options.subject}`,
        `Date: ${new Date().toUTCString()}`,
        `Message-ID: <${Date.now()}.${Math.random().toString(36).substring(2)}@${host}>`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        btoa(unescape(encodeURIComponent(options.html))),
        '.',
      ].join('\r\n');

      await writeCommand(mimeMessage);
      const dataSentRes = await readSmtpResponse();
      await writeCommand('QUIT');

      if (dataSentRes.code === 250) {
        return { success: true, messageId: `smtp_${Date.now()}` };
      } else {
        return { success: false, error: `SMTP Delivery failed: ${dataSentRes.lastLine}` };
      }
    }
  } catch (cfErr: any) {
    const rawMsg = cfErr?.message || String(cfErr);
    let hint = '';
    if (rawMsg.includes('cannot connect') || rawMsg.includes('proxy request failed')) {
      hint = ` Could not connect to "${host}:${port}". Please verify the SMTP host is a valid mail hostname (e.g. for rbtpracticeai.com, your mail host is "mailadmin.sitecountry.net" on Port 465).`;
    }
    return {
      success: false,
      error: `Cloudflare Edge Socket Connection Failed: ${rawMsg}.${hint}`,
    };
  }

  // Node.js TLS/Net Socket Implementation (for Node runtime, local dev & testing)
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const net = require('node:net');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tls = require('node:tls');

    let socket: any = null;
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
        const errMsg = err.message || String(err);
        const isGmail = host.includes('google') || host.includes('gmail');
        let hint = '';
        if (errMsg.includes('535') || errMsg.includes('534') || errMsg.includes('Authentication')) {
          hint = isGmail
            ? ' Hint: For Gmail, please create an App Password in your Google Account (Security > 2-Step Verification > App Passwords) and use it here.'
            : ' Hint: Check that the SMTP username and password are correct.';
        }
        resolve({ success: false, error: `${errMsg}${hint}` });
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
          if (username && password) {
            step = 'AUTH_LOGIN';
            write('AUTH LOGIN');
          } else {
            step = 'MAIL_FROM';
            write(`MAIL FROM:<${envelopeSender}>`);
          }
        } else if (step === 'AUTH_LOGIN' && code === 334) {
          step = 'AUTH_USER';
          write(Buffer.from(username).toString('base64'));
        } else if (step === 'AUTH_USER' && code === 334) {
          step = 'AUTH_PASS';
          write(Buffer.from(password).toString('base64'));
        } else if (step === 'AUTH_PASS' && code === 235) {
          step = 'MAIL_FROM';
          write(`MAIL FROM:<${envelopeSender}>`);
        } else if (step === 'MAIL_FROM' && code === 250) {
          step = 'RCPT_TO';
          write(`RCPT TO:<${primaryRecipient}>`);
        } else if (step === 'RCPT_TO' && code === 250) {
          step = 'DATA';
          write('DATA');
        } else if (step === 'DATA' && code === 354) {
          step = 'MESSAGE';
          const mime = [
            `From: "${senderName}" <${senderEmail}>`,
            `To: ${recipientList.join(', ')}`,
            `Subject: ${options.subject}`,
            `Date: ${new Date().toUTCString()}`,
            `Message-ID: <${Date.now()}.${Math.random().toString(36).substring(2)}@${host}>`,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
            '',
            Buffer.from(options.html).toString('base64'),
            '.',
          ].join('\r\n');
          write(mime);
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
          { host, port, timeout: 15000, rejectUnauthorized: false, servername: host },
          () => {}
        );
      } else {
        socket = net.connect({ host, port, timeout: 15000 }, () => {});
      }

      socket.on('data', onData);
      socket.on('error', (err: any) => cleanup(err));
      socket.on('timeout', () =>
        cleanup(new Error(`SMTP Connection timed out connecting to ${host}:${port}. Please verify host/port settings.`))
      );
    } catch (err: any) {
      cleanup(err);
    }
  });
}

/**
 * Cloudflare Native MailChannels Dispatcher
 */
async function sendViaMailChannels(
  config: SMTPConfiguration,
  options: EmailDispatchOptions
): Promise<EmailDispatchResult> {
  const startTime = Date.now();
  const recipientList = Array.isArray(options.to) ? options.to : [options.to];

  try {
    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: recipientList.map((e) => ({ email: e })) }],
        from: {
          email: config.senderEmail || 'verify@rbtpracticeai.com',
          name: config.senderName || 'RBT Practice AI',
        },
        subject: options.subject,
        content: [{ type: 'text/html', value: options.html }],
      }),
    });

    const latencyMs = Date.now() - startTime;
    if (res.ok || res.status === 202) {
      return {
        success: true,
        messageId: `mc_${Date.now()}`,
        provider: 'mailchannels',
        latencyMs,
      };
    } else {
      const errText = await res.text().catch(() => '');
      return {
        success: false,
        provider: 'mailchannels',
        error: `MailChannels rejected message (${res.status}): ${errText}`,
        latencyMs,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      provider: 'mailchannels',
      error: err.message || 'MailChannels dispatch error',
      latencyMs: Date.now() - startTime,
    };
  }
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

  // 1. Resend API
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

  // 2. Brevo REST API
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

  // 3. SendGrid REST API
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

  // 4. MailChannels (Cloudflare native free email)
  if (config.provider === 'mailchannels') {
    return sendViaMailChannels(config, options);
  }

  // 5. Custom SMTP Server / Relay (Gmail, Hostinger, cPanel, Custom Port 465 / 587)
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

  // 6. Fallback warning
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
  const current = await getActiveSMTPConfig();
  const config: SMTPConfiguration = tempConfig
    ? {
        ...current,
        ...tempConfig,
        password:
          tempConfig.password && tempConfig.password !== '••••••••' && tempConfig.password.trim() !== ''
            ? tempConfig.password.trim()
            : current.password,
        apiKey:
          tempConfig.apiKey && !tempConfig.apiKey.includes('...') && tempConfig.apiKey.trim() !== ''
            ? tempConfig.apiKey.trim()
            : current.apiKey,
      }
    : current;

  const testSubject = `✅ [SMTP Test] RBT Practice AI Email Dispatch Verified`;
  const testHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 28px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 540px; margin: 0 auto;">
      <h2 style="color: #2563EB; margin-top: 0; font-size: 20px;">SMTP & Email Delivery Test Successful</h2>
      <p style="color: #334155; font-size: 14px; line-height: 1.5;">This is a live test email sent from <strong>${config.senderName}</strong> (&lt;${config.senderEmail}&gt;).</p>
      <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; font-size: 12px; line-height: 1.6; color: #0f172a;">
        <div><strong>Provider:</strong> ${config.provider.toUpperCase()}</div>
        <div><strong>Host:</strong> ${config.host || 'Direct Cloud API'}</div>
        <div><strong>Port:</strong> ${config.port || '465 / 587'}</div>
        <div><strong>Sender:</strong> ${config.senderEmail}</div>
        <div><strong>Recipient:</strong> ${testRecipient}</div>
        <div><strong>Timestamp:</strong> ${new Date().toISOString()}</div>
      </div>
      <p style="color: #64748b; font-size: 12px; margin-top: 16px;">RBT Practice Questions • Production Email Engine</p>
    </div>
  `;

  const previousSmtp = platformConfigInMemory(config);
  try {
    const res = await sendTransactionalEmail({
      to: testRecipient,
      subject: testSubject,
      html: testHtml,
      text: 'SMTP Test Successful from RBT Practice AI.',
      from: `${config.senderName} <${config.senderEmail}>`,
    });
    return res;
  } finally {
    restoreInMemoryConfig(previousSmtp);
  }
}

let tempOverrideConfig: SMTPConfiguration | null = null;
function platformConfigInMemory(conf: SMTPConfiguration) {
  tempOverrideConfig = conf;
  return conf;
}
function restoreInMemoryConfig(_: any) {
  tempOverrideConfig = null;
}


