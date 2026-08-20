export const ADMIN_EMAILS: string[] = [
  'jobpegyan@gmail.com',
  'manorhub533@gmail.com',
  'affiliatebharatofficial@gmail.com',
  'hello@rbtpracticeai.com',
  'support@rbtpracticeai.com',
  'admin@rbtpracticeai.com',
];

export const isEmailAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  return ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === clean);
};
