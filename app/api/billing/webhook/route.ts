import { NextRequest, NextResponse } from 'next/server';
import { getLemonSqueezyConfig, verifyLemonSqueezyWebhookSignature } from '@/lib/lemon-squeezy';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/platform-config';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature') || request.headers.get('stripe-signature') || '';

    const config = getLemonSqueezyConfig();
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || config.webhookSecretMasked;

    console.log('Lemon Squeezy Webhook Received. Signature:', signature ? 'Present' : 'Missing');

    // Parse JSON Event
    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const eventName = payload?.meta?.event_name || payload?.event || 'order_created';
    const customerEmail = payload?.data?.attributes?.user_email || payload?.data?.attributes?.customer_email;
    const customerName = payload?.data?.attributes?.user_name || 'RBT Candidate';

    console.log(`Processing Lemon Squeezy Event: ${eventName} for ${customerEmail}`);

    // If Supabase database is connected, update user profile subscription tier
    if (isSupabaseConfigured() && customerEmail) {
      try {
        let newTier = 'pro';
        if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
          newTier = 'free';
        }

        await supabase
          .from('profiles')
          .update({
            subscription_tier: newTier,
            updated_at: new Date().toISOString(),
          })
          .eq('email', customerEmail.toLowerCase().trim());
      } catch (err) {
        console.error('Failed to update user profile from Lemon Squeezy webhook:', err);
      }
    }

    logAuditEvent(
      customerEmail || 'LEMON_SQUEEZY_WEBHOOK',
      'WEBHOOK_PROCESSED',
      'Lemon Squeezy',
      `Processed ${eventName} event for ${customerEmail}`
    );

    return NextResponse.json({
      received: true,
      event: eventName,
      status: 'processed',
      gateway: 'Lemon Squeezy',
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lemon Squeezy Webhook Handler Failed', message: error.message }, { status: 400 });
  }
}
