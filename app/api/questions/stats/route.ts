import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { MASTER_QUESTION_BANK } from '@/lib/master-question-bank';
import { MasterQuestion } from '@/types/master-question';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const adminDb = getSupabaseAdminClient();

    // Run parallel exact count queries without downloading full table payloads
    const [
      { count: totalCount, error: totalErr },
      { count: publishedCount },
      { count: rbtCount },
      { count: bcabaCount },
      { count: bcbaCount },
      { count: premiumCount },
    ] = await Promise.all([
      adminDb.from('master_questions').select('*', { count: 'exact', head: true }).is('deleted_at', null),
      adminDb.from('master_questions').select('*', { count: 'exact', head: true }).is('deleted_at', null).eq('status', 'published'),
      adminDb.from('master_questions').select('*', { count: 'exact', head: true }).is('deleted_at', null).eq('certification', 'RBT'),
      adminDb.from('master_questions').select('*', { count: 'exact', head: true }).is('deleted_at', null).eq('certification', 'BCaBA'),
      adminDb.from('master_questions').select('*', { count: 'exact', head: true }).is('deleted_at', null).eq('certification', 'BCBA'),
      adminDb.from('master_questions').select('*', { count: 'exact', head: true }).is('deleted_at', null).eq('is_premium', true),
    ]);

    if (totalErr || totalCount === null) {
      const allQ: MasterQuestion[] = MASTER_QUESTION_BANK;
      return NextResponse.json({
        total: allQ.length,
        published: allQ.filter((q: MasterQuestion) => q.status === 'published').length,
        rbt: allQ.filter((q: MasterQuestion) => q.certification === 'RBT').length,
        bcaba: allQ.filter((q: MasterQuestion) => q.certification === 'BCaBA').length,
        bcba: allQ.filter((q: MasterQuestion) => q.certification === 'BCBA').length,
        featured: allQ.filter((q: MasterQuestion) => q.isPremium || q.isFeatured).length,
      });
    }

    return NextResponse.json({
      total: totalCount ?? 0,
      published: publishedCount ?? 0,
      rbt: rbtCount ?? 0,
      bcaba: bcabaCount ?? 0,
      bcba: bcbaCount ?? 0,
      featured: premiumCount ?? 0,
    });
  } catch (err: any) {
    console.error('Error fetching question stats:', err);
    return NextResponse.json({ error: 'Failed to fetch question stats' }, { status: 500 });
  }
}
