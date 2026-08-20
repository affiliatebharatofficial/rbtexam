import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/platform-config';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      topic?: string;
      orderId?: string;
      message?: string;
    };
    const { name, email, topic, orderId, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Please provide your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Message must be at least 5 characters long.' }, { status: 400 });
    }

    const cleanTopic = topic || 'General Inquiry';
    const timestamp = new Date().toISOString();
    const ticketId = `TICK-${Date.now().toString(36).toUpperCase()}`;

    // Record audit event
    logAuditEvent(name, 'CONTACT_INQUIRY', 'Support Desk', `Ticket [${ticketId}] from ${email} (${cleanTopic}): ${message.slice(0, 80)}...`);

    // Optionally save to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('notifications').insert({
          user_id: 'system-support',
          title: `New Support Inquiry: ${cleanTopic} (${ticketId})`,
          message: `From: ${name} <${email}>\nOrder: ${orderId || 'N/A'}\n\n${message}`,
          type: 'support',
          created_at: timestamp,
        });
      } catch (err) {
        // Continue even if table is not yet migrated
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Your message has been received. Our team will respond to your email at hello@rbtpracticeai.com within 2-4 business hours.',
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry. Please email hello@rbtpracticeai.com directly.' },
      { status: 500 }
    );
  }
}
