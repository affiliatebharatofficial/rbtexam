import { NextRequest, NextResponse } from 'next/server';
import { testSMTPConnection, sendTransactionalEmail } from '@/lib/smtp-engine';
import { renderEmailTemplate } from '@/lib/notification-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { recipientEmail, config, templateId, variables } = body;

    if (!recipientEmail || !recipientEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid recipient email address is required' }, { status: 400 });
    }

    let result;
    if (templateId) {
      const rendered = renderEmailTemplate(templateId, variables || {});
      result = await sendTransactionalEmail({
        to: recipientEmail,
        subject: rendered.subject,
        html: rendered.html,
      });
    } else {
      result = await testSMTPConnection(recipientEmail, config);
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to deliver test email' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Test email successfully dispatched to ${recipientEmail} via ${result.provider.toUpperCase()} (${result.latencyMs}ms).`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'SMTP Test failed' }, { status: 500 });
  }
}
