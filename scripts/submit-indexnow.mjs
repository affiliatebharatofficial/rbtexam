#!/usr/bin/env node

/**
 * Enterprise Bing IndexNow CLI Submission Tool
 * Usage:
 *   node scripts/submit-indexnow.mjs --all
 *   node scripts/submit-indexnow.mjs https://www.rbtpracticeai.com/about
 *   node scripts/submit-indexnow.mjs --url=/rbt/mock-exam
 */

const DEFAULT_KEY = process.env.INDEXNOW_KEY || 'e39f75ba5a894762b71efc5e3d748f21';
const DEFAULT_HOST = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.rbtpracticeai.com')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');

const CORE_STATIC_URLS = [
  '/',
  '/rbt',
  '/task-list',
  '/rbt/mock-exam',
  '/rbt/questions',
  '/flashcards',
  '/rbt/flashcards',
  '/rbt/glossary',
  '/rbt/study-guide',
  '/rbt/practice-test',
  '/pricing',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/disclaimer',
  '/guarantee-terms',
  '/rbt/about',
];

async function run() {
  const args = process.argv.slice(2);
  let host = DEFAULT_HOST;
  let key = DEFAULT_KEY;
  let isAll = false;
  let targetUrls = [];

  for (const arg of args) {
    if (arg === '--all') {
      isAll = true;
    } else if (arg.startsWith('--host=')) {
      host = arg.split('=')[1];
    } else if (arg.startsWith('--key=')) {
      key = arg.split('=')[1];
    } else if (arg.startsWith('--url=')) {
      targetUrls.push(arg.split('=')[1]);
    } else if (!arg.startsWith('--')) {
      targetUrls.push(arg);
    }
  }

  const baseUrl = `https://${host}`;

  if (isAll || targetUrls.length === 0) {
    targetUrls = CORE_STATIC_URLS.map((path) =>
      path === '/' ? baseUrl : `${baseUrl}${path}`
    );
  } else {
    targetUrls = targetUrls.map((url) => {
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
    });
  }

  // Deduplicate
  targetUrls = Array.from(new Set(targetUrls));

  console.log('\n=============================================');
  console.log('🚀 Bing & Multi-Search-Engine IndexNow Tool');
  console.log('=============================================');
  console.log(`🌐 Host:         ${host}`);
  console.log(`🔑 Key:          ${key}`);
  console.log(`📄 Key Location: ${baseUrl}/${key}.txt`);
  console.log(`📊 URLs to Push: ${targetUrls.length}`);
  console.log('---------------------------------------------');

  const payload = {
    host,
    key,
    keyLocation: `${baseUrl}/${key}.txt`,
    urlList: targetUrls,
  };

  const endpoints = [
    { name: 'IndexNow Global Hub', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Bing IndexNow', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex IndexNow', url: 'https://yandex.com/indexnow' },
  ];

  let anySuccess = false;

  for (const ep of endpoints) {
    process.stdout.write(`📡 Submitting to ${ep.name}... `);
    try {
      const res = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'RBT-Practice-AI-IndexNow-Bot/1.0',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok || res.status === 200 || res.status === 202) {
        console.log(`✅ Success (HTTP ${res.status})`);
        anySuccess = true;
      } else {
        const text = await res.text().catch(() => '');
        console.log(`⚠️ Status ${res.status} (${text || 'Failed'})`);
      }
    } catch (e) {
      console.log(`❌ Network Error: ${e.message}`);
    }
  }

  console.log('---------------------------------------------');
  if (anySuccess) {
    console.log('🎉 IndexNow Submission Completed Successfully!');
  } else {
    console.log('⚠️ Notice: Could not reach external APIs or validation pending.');
  }
  console.log('=============================================\n');
}

run().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
