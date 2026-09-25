const fs = require('fs');

console.log('=== CHECKING ALL QUESTION SOURCES ===');

// 1. lib/seed-questions-bank.ts
try {
  const content = fs.readFileSync('lib/seed-questions-bank.ts', 'utf8');
  const matches = content.match(/"id":\s*"q-[^"]+"/g) || [];
  console.log('1. lib/seed-questions-bank.ts:', matches.length, 'questions');
} catch (e) {
  console.log('1. lib/seed-questions-bank.ts error:', e.message);
}

// 2. lib/master-question-bank.ts
try {
  const content = fs.readFileSync('lib/master-question-bank.ts', 'utf8');
  const matches = content.match(/"id":\s*"q-[^"]+"/g) || [];
  console.log('2. lib/master-question-bank.ts:', matches.length, 'questions');
} catch (e) {
  console.log('2. lib/master-question-bank.ts error:', e.message);
}

// 3. lib/sample-questions.ts
try {
  const content = fs.readFileSync('lib/sample-questions.ts', 'utf8');
  const matches = content.match(/"question":\s*"/g) || content.match(/question:\s*'/g) || [];
  console.log('3. lib/sample-questions.ts:', matches.length, 'questions');
} catch (e) {
  console.log('3. lib/sample-questions.ts error:', e.message);
}

// 4. data/questions-store.json
try {
  if (fs.existsSync('data/questions-store.json')) {
    const store = JSON.parse(fs.readFileSync('data/questions-store.json', 'utf8'));
    console.log('4. data/questions-store.json:', Array.isArray(store) ? store.length : (store.questions ? store.questions.length : 'object'));
  }
} catch (e) {
  console.log('4. data/questions-store.json error:', e.message);
}

// 5. Check if any CSV in scratch has more questions
const csvFiles = [
  'scratch/all_input_questions.csv',
  'scratch/all_parsed_questions.csv',
  'scratch/extracted_all_questions.csv',
  'scratch/input_questions.csv'
];

csvFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf8').trim().split('\n');
    console.log('5.', f, ':', lines.length - 1, 'items');
  }
});
