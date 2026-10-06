import { NextRequest, NextResponse } from 'next/server';
import { getActiveSMTPConfig, saveSMTPConfig } from '@/lib/smtp-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) return auth.response!;
  try {
    const config = await getActiveSMTPConfig();
    const { password: _password, apiKey: _apiKey, ...safeConfig } = config as any;
    return NextResponse.json({
      success: true,
      config: {
        ...safeConfig,
        // Only masked forms are ever returned; raw secrets never leave the server
        apiKeyMasked: config.apiKey ? `${config.apiKey.slice(0, 5)}...${config.apiKey.slice(-4)}` : '',
        passwordMasked: config.password ? '••••••••' : '',
        password: '',
        apiKey: '',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch SMTP config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) return auth.response!;
  try {
    const body = (await request.json()) as any;
    const { enabled, provider, host, port, username, password, apiKey, senderName, senderEmail, replyTo, adminUser } = body;

    const saved = await saveSMTPConfig(
      {
        enabled: enabled ?? true,
        provider: provider || 'smtp_relay',
        host: host || 'mailadmin.sitecountry.net',
        port: port ? Number(port) : 465,
        username: username || 'hello@rbtpracticeai.com',
        password,
        apiKey,
        senderName: senderName || 'RBT Practice AI',
        senderEmail: senderEmail || username || 'hello@rbtpracticeai.com',
        replyTo: replyTo || 'hello@rbtpracticeai.com',
      },
      adminUser || 'Super Admin'
    );

    return NextResponse.json({
      success: true,
      message: 'SMTP & Email Provider Configuration updated successfully.',
      config: saved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save SMTP config' }, { status: 500 });
  }
}
