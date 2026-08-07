import { NextRequest, NextResponse } from 'next/server';
import { submitDataSubjectRequest } from '@/lib/security-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, requestType, userId } = body;

    if (!email || !requestType) {
      return NextResponse.json({ error: 'email and requestType are required' }, { status: 400 });
    }

    const req = submitDataSubjectRequest(email, requestType, userId || 'default_user');
    return NextResponse.json({ success: true, request: req });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to submit privacy request' }, { status: 500 });
  }
}
