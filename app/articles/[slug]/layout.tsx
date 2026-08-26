import { Metadata } from 'next';
import { constructMetadata } from '@/utils/seo';
import { getArticleBySlug } from '@/lib/article-cms-engine';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'RBT Article & Study Guide | RBT Practice AI',
      description: 'Explore BACB RBT exam preparation guides, ABA clinical methods, and flashcards.',
      path: `/articles/${slug}`,
    });
  }

  const desc = article.summary || article.title;
  const trimmedDesc = desc.length > 158 ? `${desc.slice(0, 155).trim()}...` : desc;

  return constructMetadata({
    title: `${article.title} | RBT Practice AI`,
    description: trimmedDesc,
    path: `/articles/${article.slug}`,
    keywords: article.tags || ['RBT Exam', 'ABA Study Guide'],
  });
}

export default function ArticleDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
