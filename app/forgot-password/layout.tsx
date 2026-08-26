import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Reset Your Password | RBT Practice AI',
  description: 'Request a secure 6-digit verification code to reset your RBT Practice AI account password.',
  path: '/forgot-password',
  noIndex: true,
});

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
