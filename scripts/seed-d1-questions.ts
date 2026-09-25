import fs from 'fs';
import path from 'path';
import { FULL_BACB_SEED_QUESTIONS } from '../lib/seed-questions-bank';
import { SAMPLE_FLASHCARDS } from '../lib/sample-flashcards';
import { INITIAL_SEED_ARTICLES } from '../lib/article-cms-engine';

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function generateD1SeedSql(): string {
  const statements: string[] = [];

  // 1. Seed Master Questions
  console.log(`Generating SQL for ${FULL_BACB_SEED_QUESTIONS.length} master questions...`);
  for (const q of FULL_BACB_SEED_QUESTIONS) {
    const id = escapeSql(q.id);
    const code = escapeSql(q.id);
    const cert = escapeSql(q.certification || 'RBT');
    const qText = escapeSql(q.question);
    const sText = escapeSql(q.scenarioText || null);
    const qType = escapeSql(q.questionType || 'scenario_based');
    const diff = escapeSql(q.difficulty || 'medium');
    const options = escapeSql(JSON.stringify(q.options || []));
    const correctId = escapeSql(q.correctAnswerId || 'A');
    const ansExp = escapeSql(q.answerExplanation || '');
    const clinExp = escapeSql(q.clinicalExplanation || null);
    const refs = escapeSql(q.references || null);
    const tips = escapeSql(q.examTips || null);
    const mistakes = escapeSql(q.commonMistakes || null);
    const cat = escapeSql(q.category || 'Data Collection and Graphing');
    const subCat = escapeSql(q.subCategory || null);
    const keywords = escapeSql(JSON.stringify(q.keywords || []));
    const taskVer = escapeSql(q.taskListVersion || '3rd_edition');
    const estTime = q.estimatedTimeSeconds || 60;
    const tags = escapeSql(JSON.stringify(q.tags || []));
    const status = escapeSql(q.status || 'published');
    const isPrem = q.isPremium ? 1 : 0;
    const isFeat = q.isFeatured ? 1 : 0;

    statements.push(
      `INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        ${id}, ${code}, ${cert}, ${qText}, ${sText},
        ${qType}, ${diff}, ${options}, ${correctId}, ${ansExp},
        ${clinExp}, ${refs}, ${tips}, ${mistakes}, ${cat},
        ${subCat}, ${keywords}, ${taskVer}, ${estTime}, ${tags},
        ${status}, ${isPrem}, ${isFeat}
      );`
    );
  }

  // 2. Seed Flashcards
  console.log(`Generating SQL for ${SAMPLE_FLASHCARDS.length} flashcards...`);
  for (const f of (SAMPLE_FLASHCARDS as any[])) {
    const id = escapeSql(f.id);
    const term = escapeSql(f.term || f.front || 'Term');
    const def = escapeSql(f.definition || f.back || 'Definition');
    const cat = escapeSql(f.category || 'Measurement');
    const taskCode = escapeSql(f.taskCode || f.task_code || null);
    const box = f.box || f.box_level || 1;
    const cert = escapeSql(f.certification || 'RBT');

    statements.push(
      `INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        ${id}, ${term}, ${def}, ${cat}, ${taskCode}, ${box}, ${cert}, 'published'
      );`
    );
  }

  // 3. Seed Articles
  console.log(`Generating SQL for ${INITIAL_SEED_ARTICLES.length} articles...`);
  for (const a of INITIAL_SEED_ARTICLES) {
    const id = escapeSql(a.id);
    const slug = escapeSql(a.slug);
    const title = escapeSql(a.title);
    const summary = escapeSql(a.summary);
    const content = escapeSql(a.content);
    const cat = escapeSql(a.category);
    const tags = escapeSql(JSON.stringify(a.tags || []));
    const cover = escapeSql(a.coverImageUrl || null);
    const author = escapeSql(a.authorName || 'RBT Practice AI Editorial Team');
    const readTime = a.readTimeMinutes || 5;

    statements.push(
      `INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        ${id}, ${slug}, ${title}, ${summary}, ${content}, ${cat}, ${tags}, ${cover}, ${author}, ${readTime}, 'published'
      );`
    );
  }

  // 4. Default Admin User
  statements.push(
    `INSERT OR REPLACE INTO users (
      id, email, full_name, role, email_verified
    ) VALUES (
      'usr_admin_001', 'jobpegyan@gmail.com', 'Job Pegyan (Admin)', 'super_admin', 1
    );`
  );

  statements.push(
    `INSERT OR REPLACE INTO profiles (
      id, user_id, full_name, role
    ) VALUES (
      'prf_admin_001', 'usr_admin_001', 'Job Pegyan (Admin)', 'super_admin'
    );`
  );

  return statements.join('\n');
}

const outputPath = path.join(process.cwd(), 'database', 'seed-d1.sql');
const sql = generateD1SeedSql();
fs.writeFileSync(outputPath, sql, 'utf-8');
console.log(`Successfully generated ${outputPath} (${(sql.length / 1024).toFixed(1)} KB)`);
