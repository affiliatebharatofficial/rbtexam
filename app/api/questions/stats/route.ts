import { NextResponse } from 'next/server';
import { d1Query, d1QueryFirst, isD1Available } from '@/lib/d1';
import { MASTER_QUESTION_BANK } from '@/lib/master-question-bank';
import { MasterQuestion } from '@/types/master-question';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isD1Available()) {
      try {
        const [
          totalRow,
          publishedRow,
          rbtRow,
          bcabaRow,
          bcbaRow,
          premiumRow,
          categoriesRows,
        ] = await Promise.all([
          d1QueryFirst<{ cnt: number }>('SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL'),
          d1QueryFirst<{ cnt: number }>("SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL AND status = 'published'"),
          d1QueryFirst<{ cnt: number }>("SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL AND certification = 'RBT'"),
          d1QueryFirst<{ cnt: number }>("SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL AND certification = 'BCaBA'"),
          d1QueryFirst<{ cnt: number }>("SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL AND certification = 'BCBA'"),
          d1QueryFirst<{ cnt: number }>('SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL AND (is_premium = 1 OR is_featured = 1)'),
          d1Query<{ category: string }>("SELECT category FROM master_questions WHERE deleted_at IS NULL AND certification = 'RBT'"),
        ]);

        const domainCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
        if (Array.isArray(categoriesRows)) {
          categoriesRows.forEach((row) => {
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

        const total = totalRow?.cnt ?? 0;
        if (total > 0) {
          return NextResponse.json({
            total,
            published: publishedRow?.cnt ?? total,
            rbt: rbtRow?.cnt ?? total,
            bcaba: bcabaRow?.cnt ?? 0,
            bcba: bcbaRow?.cnt ?? 0,
            featured: premiumRow?.cnt ?? 0,
            domainCounts,
          });
        }
      } catch (d1Err) {
        console.error('Error fetching question stats from D1:', d1Err);
      }
    }

    // High-availability fallback to canonical master question bank
    const allQ: MasterQuestion[] = MASTER_QUESTION_BANK;
    const fallbackDomainCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    allQ.forEach((q) => {
      const cat = (q.category || '').toLowerCase();
      if (cat.includes('measurement') || cat.includes('data collection') || cat.includes('graphing')) fallbackDomainCounts.A++;
      else if (cat.includes('assessment') || cat.includes('preference')) fallbackDomainCounts.B++;
      else if (cat.includes('acquisition') || cat.includes('skill') || cat.includes('dtt') || cat.includes('prompt')) fallbackDomainCounts.C++;
      else if (cat.includes('reduction') || cat.includes('behavior reduction') || cat.includes('bip') || cat.includes('extinction') || cat.includes('reinforcement')) fallbackDomainCounts.D++;
      else if (cat.includes('documentation') || cat.includes('reporting') || cat.includes('session notes')) fallbackDomainCounts.E++;
      else if (cat.includes('ethics') || cat.includes('professional') || cat.includes('code')) fallbackDomainCounts.F++;
      else fallbackDomainCounts.A++;
    });

    return NextResponse.json({
      total: allQ.length,
      published: allQ.filter((q: MasterQuestion) => (q.status || 'published') === 'published').length,
      rbt: allQ.filter((q: MasterQuestion) => q.certification === 'RBT').length,
      bcaba: allQ.filter((q: MasterQuestion) => q.certification === 'BCaBA').length,
      bcba: allQ.filter((q: MasterQuestion) => q.certification === 'BCBA').length,
      featured: allQ.filter((q: MasterQuestion) => q.isPremium || q.isFeatured).length,
      domainCounts: fallbackDomainCounts,
    });
  } catch (err: any) {
    console.error('Error fetching question stats:', err);
    return NextResponse.json({ error: 'Failed to fetch question stats' }, { status: 500 });
  }
}
