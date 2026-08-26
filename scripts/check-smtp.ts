import { getSupabaseAdminClient } from '../lib/supabase';

async function main() {
  try {
    const admin = getSupabaseAdminClient();
    const configData = {
      enabled: true,
      provider: 'smtp_relay',
      host: 'mailadmin.sitecountry.net',
      port: 465,
      username: 'hello@rbtpracticeai.com',
      password: '', // will be set from admin panel
      encryption: 'SSL',
      senderName: 'RBT Practice AI',
      senderEmail: 'hello@rbtpracticeai.com',
      replyTo: 'hello@rbtpracticeai.com',
    };

    const { data: upsertData, error: uErr } = await admin.from('users').upsert({
      id: '00000000-0000-0000-0000-000000000001',
      email: 'system_smtp_config@rbtpracticeai.internal',
      full_name: JSON.stringify(configData),
      role: 'admin',
      updated_at: new Date().toISOString(),
    });
    console.log('User config upsert:', upsertData, 'Error:', uErr);

    const { data: fetchConfig, error: fErr } = await admin
      .from('users')
      .select('full_name')
      .eq('email', 'system_smtp_config@rbtpracticeai.internal')
      .maybeSingle();

    console.log('Fetched Config from users:', fetchConfig?.full_name, 'Error:', fErr);
  } catch (err) {
    console.error('Check failed:', err);
  }
}

main();
