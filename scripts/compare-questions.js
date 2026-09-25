const fs = require('fs');

const seedContent = fs.readFileSync('lib/seed-questions-bank.ts', 'utf8');
const seedIds = (seedContent.match(/"id":\s*"([^"]+)"/g) || []).map(m => m.split('"')[3]);
console.log('Seed questions count:', seedIds.length);

const storeQuestions = JSON.parse(fs.readFileSync('data/questions-store.json', 'utf8'));
console.log('questions-store.json questions count:', storeQuestions.length);

const storeIds = storeQuestions.map(q => q.id);
const uniqueInStore = storeQuestions.filter(q => !seedIds.includes(q.id));
console.log('Unique questions in questions-store.json NOT in seed bank:', uniqueInStore.length);

uniqueInStore.forEach((q, idx) => {
  console.log(`${idx + 1}. [${q.id}] ${q.category} - ${q.question.slice(0, 60)}...`);
});
