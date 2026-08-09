import fs from 'fs';
import path from 'path';

// Automatically parse local .env file if available
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const idx = trimmed.indexOf('=');
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val;
      }
    }
  }
} catch (e) {}

async function seedDatabaseQuestions() {
  const { getSupabaseAdminClient } = await import('../lib/supabase');
  const { FULL_BACB_SEED_QUESTIONS } = await import('../lib/seed-questions-bank');

  console.log(`====================================================`);
  console.log(`SUPABASE DATABASE QUESTION SEEDER`);
  console.log(`====================================================`);
  console.log(`Target URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log(`Seeding total BACB master questions: ${FULL_BACB_SEED_QUESTIONS.length}`);

  try {
    const adminDb = getSupabaseAdminClient();

    const rows = FULL_BACB_SEED_QUESTIONS.map((q) => ({
      certification: q.certification || 'RBT',
      question_code: q.id,
      question_text: q.question,
      scenario_text: q.scenarioText || null,
      question_type: q.questionType || 'scenario_based',
      difficulty: q.difficulty || 'medium',
      options: q.options || [],
      correct_answer_id: q.correctAnswerId || 'A',
      answer_explanation: q.answerExplanation || '',
      clinical_explanation: q.clinicalExplanation || null,
      references: q.references || 'BACB RBT 3rd Edition TCO',
      exam_tips: q.examTips || null,
      common_mistakes: q.commonMistakes || null,
      category: q.category || 'Data Collection and Graphing',
      sub_category: q.subCategory || null,
      keywords: q.keywords || [],
      task_list_version: q.taskListVersion || '3rd_edition',
      estimated_time_seconds: q.estimatedTimeSeconds || 60,
      tags: q.tags || [],
      status: q.status || 'published',
      is_premium: q.isPremium || false,
      is_featured: q.isFeatured || false,
      version: q.version || 1,
      created_at: q.createdAt || new Date().toISOString(),
      updated_at: q.updatedAt || new Date().toISOString(),
    }));

    const { data, error } = await adminDb
      .from('master_questions')
      .upsert(rows, { onConflict: 'question_code' })
      .select('id, question_code');

    if (error) {
      console.error(`❌ Supabase Database Seeding Failed:`, error.message);
      process.exit(1);
    } else {
      console.log(`✅ Successfully seeded/upserted ${data?.length} questions into Supabase master_questions table!`);
    }
  } catch (err: any) {
    console.error(`❌ Exception during database seeder execution:`, err.message);
    process.exit(1);
  }
}

seedDatabaseQuestions();
