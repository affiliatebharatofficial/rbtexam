const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let supabaseUrl = 'https://rbtexam.supabase.co';
let supabaseKey = '';

if (fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf-8');
  content.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) supabaseKey = line.split('=')[1].trim();
    if (!supabaseKey && line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
  });
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const { count: qCount } = await supabase
    .from('master_questions')
    .select('id', { count: 'exact' })
    .is('deleted_at', null);

  const { data: flashcards, count: fCount } = await supabase
    .from('master_flashcards')
    .select('id, term, task_list_code, tags')
    .is('deleted_at', null);

  console.log('=== SUPABASE DB RECORD COUNTS ===');
  console.log('Total Master Questions in DB:', qCount);
  console.log('Total Master Flashcards in DB:', fCount);
}

inspect();
