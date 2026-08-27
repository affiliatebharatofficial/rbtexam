import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'ABA Glossary & Terminology | RBT Practice AI',
  description:
    'Comprehensive dictionary of Applied Behavior Analysis definitions, operational criteria, clinical scenario examples, and mnemonic memory tricks mapped to the BACB RBT outline.',
  path: '/rbt/glossary',
  keywords: [
    'aba glossary',
    'rbt terminology',
    'applied behavior analysis terms',
    'rbt definitions',
    'aba clinical dictionary',
  ],
});

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
