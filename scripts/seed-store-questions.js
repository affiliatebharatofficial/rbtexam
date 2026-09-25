const fs = require('fs');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const store = JSON.parse(fs.readFileSync('data/questions-store.json', 'utf8'));
const statements = [];

for (const q of store) {
  const id = escapeSql(q.id);
  const code = escapeSql(q.id);
  const cert = escapeSql(q.certification || 'RBT');
  const qText = escapeSql(q.question);
  const sText = escapeSql(q.scenarioText || null);
  const qType = escapeSql(q.questionType || 'multiple_choice');
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

fs.writeFileSync('database/seed-remaining-questions.sql', statements.join('\n\n'));
console.log('Successfully wrote ' + statements.length + ' questions to database/seed-remaining-questions.sql');
