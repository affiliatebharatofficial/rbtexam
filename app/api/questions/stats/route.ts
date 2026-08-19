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
      { data: rbtCategories },
    ] = await Promise.all([
      adminDb.from('master_questions').select('id', { count: 'exact', head: true }).is('deleted_at', null),
      adminDb.from('master_questions').select('id', { count: 'exact', head: true }).is('deleted_at', null).eq('status', 'published'),
      adminDb.from('master_questions').select('id', { count: 'exact', head: true }).is('deleted_at', null).eq('certification', 'RBT'),
      adminDb.from('master_questions').select('id', { count: 'exact', head: true }).is('deleted_at', null).eq('certification', 'BCaBA'),
      adminDb.from('master_questions').select('id', { count: 'exact', head: true }).is('deleted_at', null).eq('certification', 'BCBA'),
      adminDb.from('master_questions').select('id', { count: 'exact', head: true }).is('deleted_at', null).eq('is_premium', true),
      adminDb.from('master_questions').select('category').is('deleted_at', null).eq('certification', 'RBT'),
    ]);

    // Aggregate domain counts from lightweight category list
    const domainCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    if (Array.isArray(rbtCategories)) {
      rbtCategories.forEach((row: { category: string | null }) => {
        const cat = (row.category || '').toLowerCase();
        if (cat.includes('measurement') || cat.includes('data collection') || cat.includes('graphing')) domainCounts.A++;
        else if (cat.includes('assessment') || cat.includes('preference')) domainCounts.B++;
        else if (cat.includes('acquisition') || cat.includes('skill') || cat.includes('dtt') || cat.includes('prompt')) domainCounts.C++;
        else if (cat.includes('reduction') || cat.includes('behavior reduction') || cat.includes('bip') || cat.includes('extinction') || cat.includes('reinforcement')) domainCounts.D++;
        else if (cat.includes('documentation') || cat.includes('reporting') || cat.includes('session notes')) domainCounts.E++;
        else if (cat.includes('ethics') || cat.includes('professional') || cat.includes('code')) domainCounts.F++;
        else domainCounts.A++;
      });
    }

    if (totalErr || totalCount === null) {
      const allQ: MasterQuestion[] = MASTER_QUESTION_BANK;
      return NextResponse.json({
        total: allQ.length,
        published: allQ.filter((q: MasterQuestion) => q.status === 'published').length,
        rbt: allQ.filter((q: MasterQuestion) => q.certification === 'RBT').length,
        bcaba: allQ.filter((q: MasterQuestion) => q.certification === 'BCaBA').length,
        bcba: allQ.filter((q: MasterQuestion) => q.certification === 'BCBA').length,
        featured: allQ.filter((q: MasterQuestion) => q.isPremium || q.isFeatured).length,
        domainCounts: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
      });
    }

    return NextResponse.json({
      total: totalCount ?? 0,
      published: publishedCount ?? 0,
      rbt: rbtCount ?? 0,
      bcaba: bcabaCount ?? 0,
      bcba: bcbaCount ?? 0,
      featured: premiumCount ?? 0,
      domainCounts,
    });
  } catch (err: any) {
    console.error('Error fetching question stats:', err);
    return NextResponse.json({ error: 'Failed to fetch question stats' }, { status: 500 });
  }
}
