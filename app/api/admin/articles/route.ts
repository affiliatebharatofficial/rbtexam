import { NextRequest, NextResponse } from 'next/server';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/lib/article-cms-engine';
import { requireAdminAuth } from '@/lib/server-auth';
import { d1Query, d1Run, isD1Available } from '@/lib/d1';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    let articlesList = getAllArticles();

    // Query D1 database for articles table if available
    if (isD1Available()) {
      try {
        const dbArticles = await d1Query(
          'SELECT * FROM articles ORDER BY created_at DESC'
        );

        if (dbArticles && Array.isArray(dbArticles) && dbArticles.length > 0) {
          articlesList = dbArticles.map((a: any) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            summary: a.summary || '',
            content: a.content || '',
            category: a.category || 'Exam Prep',
            tags: typeof a.tags === 'string' ? JSON.parse(a.tags || '[]') : (a.tags || []),
            coverImageUrl: a.cover_image_url || '/banner-rbt-hero.png',
            authorName: a.author_name || 'Jobpe gyan',
            readTimeMinutes: Number(a.read_time_minutes) || 5,
            status: a.status || 'published',
            viewsCount: Number(a.views_count) || 0,
            publishedAt: a.published_at || a.created_at,
            createdAt: a.created_at,
            updatedAt: a.updated_at,
          }));
        }
      } catch (dbErr) {
        console.warn('D1 articles query fallback to in-memory:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      articles: articlesList,
      totalCount: articlesList.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { title, summary, content, category, tags, coverImageUrl, authorName, status } = body;

    if (!title || !content || !summary) {
      return NextResponse.json({ error: 'Title, summary, and content are required' }, { status: 400 });
    }

    const created = createArticle({
      title,
      summary,
      content,
      category,
      tags,
      coverImageUrl,
      authorName,
      status,
    });

    // Sync to D1 database if available
    if (isD1Available()) {
      try {
        await d1Run(
          `INSERT INTO articles (id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status, published_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(slug) DO UPDATE SET
             title = excluded.title,
             summary = excluded.summary,
             content = excluded.content,
             category = excluded.category,
             tags = excluded.tags,
             cover_image_url = excluded.cover_image_url,
             author_name = excluded.author_name,
             read_time_minutes = excluded.read_time_minutes,
             status = excluded.status,
             updated_at = excluded.updated_at`,
          [
            created.id || crypto.randomUUID(),
            created.slug,
            created.title,
            created.summary,
            created.content,
            created.category,
            JSON.stringify(created.tags || []),
            created.coverImageUrl,
            created.authorName,
            created.readTimeMinutes,
            created.status,
            created.publishedAt,
            created.updatedAt,
          ]
        );
      } catch (e) {
        console.warn('D1 sync warning in POST /api/admin/articles:', e);
      }
    }

    return NextResponse.json({ success: true, article: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create article' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { id, title, summary, content, category, tags, coverImageUrl, authorName, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const updated = updateArticle({
      id,
      title,
      summary,
      content,
      category,
      tags,
      coverImageUrl,
      authorName,
      status,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Sync to D1
    if (isD1Available()) {
      try {
        await d1Run(
          `UPDATE articles SET
             title = COALESCE(?, title),
             summary = COALESCE(?, summary),
             content = COALESCE(?, content),
             category = COALESCE(?, category),
             tags = COALESCE(?, tags),
             cover_image_url = COALESCE(?, cover_image_url),
             author_name = COALESCE(?, author_name),
             status = COALESCE(?, status),
             updated_at = datetime('now')
           WHERE id = ? OR slug = ?`,
          [
            title || null,
            summary || null,
            content || null,
            category || null,
            tags ? JSON.stringify(tags) : null,
            coverImageUrl || null,
            authorName || null,
            status || null,
            id,
            id,
          ]
        );
      } catch (e) {
        console.warn('D1 sync warning in PUT /api/admin/articles:', e);
      }
    }

    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Article ID parameter is required' }, { status: 400 });
    }

    const deleted = deleteArticle(id);

    if (isD1Available()) {
      try {
        await d1Run('DELETE FROM articles WHERE id = ? OR slug = ?', [id, id]);
      } catch (e) {
        console.warn('D1 delete warning in DELETE /api/admin/articles:', e);
      }
    }

    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete article' }, { status: 500 });
  }
}
