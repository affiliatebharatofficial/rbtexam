import { NextRequest, NextResponse } from 'next/server';
import { getPublishedArticles, getArticleBySlug, incrementArticleViews } from '@/lib/article-cms-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const article = getArticleBySlug(slug);
      if (!article || article.status !== 'published') {
        return NextResponse.json({ error: 'Article not found or not published' }, { status: 404 });
      }
      incrementArticleViews(article.id);
      return NextResponse.json({ success: true, article });
    }

    const publishedList = getPublishedArticles();
    return NextResponse.json({
      success: true,
      articles: publishedList,
      totalCount: publishedList.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch articles' }, { status: 500 });
  }
}
