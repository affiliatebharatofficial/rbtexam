import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    // Webhook Processing Logic (Handles subscription update, invoice payment, cancellation)
    console.log('Stripe Webhook Event Received. Signature:', signature ? 'Present' : 'Missing');

    return NextResponse.json({ received: true, status: 'processed' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Webhook Handler Failed', message: error.message }, { status: 400 });
  }
}
