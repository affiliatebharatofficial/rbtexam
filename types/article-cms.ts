export type ArticleStatus = 'draft' | 'published' | 'archived';

export type ArticleCategory =
  | 'RBT Exam Guide'
  | 'ABA Techniques'
  | 'BACB Ethics'
  | 'Study Strategies'
  | 'Clinical Scenarios'
  | 'Career & Certification';

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  coverImageUrl: string;
  authorName: string;
  readTimeMinutes: number;
  status: ArticleStatus;
  viewsCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleInput {
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  tags?: string[];
  coverImageUrl?: string;
  authorName?: string;
  status?: ArticleStatus;
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {
  id: string;
}
