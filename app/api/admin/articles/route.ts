import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/lib/article-cms-engine';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    let articlesList = getAllArticles();

    // Query Supabase DB for articles table if available
    try {
      const { data: dbArticles } = await adminSupabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbArticles && Array.isArray(dbArticles) && dbArticles.length > 0) {
        const mapped = dbArticles.map((a: any) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          summary: a.summary,
          content: a.content,
          category: a.category,
          tags: a.tags || [],
          coverImageUrl: a.cover_image_url || '/banner-rbt-hero.png',
          authorName: a.author_name || 'Jobpe gyan',
          readTimeMinutes: a.read_time_minutes || 5,
          status: a.status || 'draft',
          viewsCount: a.views_count || 0,
          publishedAt: a.published_at,
          createdAt: a.created_at,
          updatedAt: a.updated_at,
        }));
        articlesList = mapped;
      }
    } catch (dbErr) {
      console.warn('Supabase DB articles query fallback to in-memory:', dbErr);
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
  try {
    const body = await request.json();
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

    // Optionally sync to Supabase DB
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
      const serviceRoleKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';

      const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      });

      await adminSupabase.from('articles').upsert({
        slug: created.slug,
        title: created.title,
        summary: created.summary,
        content: created.content,
        category: created.category,
        tags: created.tags,
        cover_image_url: created.coverImageUrl,
        author_name: created.authorName,
        read_time_minutes: created.readTimeMinutes,
        status: created.status,
        published_at: created.publishedAt,
        updated_at: created.updatedAt,
      });
    } catch (e) {
      console.warn('DB sync warning in POST /api/admin/articles:', e);
    }

    return NextResponse.json({ success: true, article: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create article' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
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

    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Article ID parameter is required' }, { status: 400 });
    }

    const deleted = deleteArticle(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete article' }, { status: 500 });
  }
}
