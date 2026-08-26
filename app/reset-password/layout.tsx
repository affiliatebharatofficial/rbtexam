import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Set New Password | RBT Practice AI',
  description: 'Enter your 6-digit OTP security code and choose a new password for your account.',
  path: '/reset-password',
  noIndex: true,
});

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
