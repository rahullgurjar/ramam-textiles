export type BlogArticleStatus = 'published' | 'queued' | 'draft';

export interface BlogArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogArticleSection {
  heading?: string;
  body: string;
  image?: string;
  quote?: string;
}

export interface BlogArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate?: string;
  excerpt: string;
  coverImage: string;
  author: BlogArticleAuthor;
  contentSections: BlogArticleSection[];
  tags: string[];
  status: BlogArticleStatus;
  focusKeyword?: string;
  targetDay?: number;
  scheduledDate?: string;
  seoScore?: number;
  lastModified?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface BlogSEOCheckItem {
  id: string;
  label: string;
  passed: boolean;
  message: string;
  points: number;
  maxPoints: number;
  category: 'title' | 'keywords' | 'content' | 'structure' | 'readability';
}

export interface BlogSEOCheckResult {
  score: number;
  maxScore: number;
  rating: 'A+' | 'A' | 'B' | 'Needs Polish';
  wordCount: number;
  readingMinutes: number;
  checks: BlogSEOCheckItem[];
}

export interface BlogCalendarDay {
  day: number;
  date: string;
  title: string;
  focusKeyword: string;
  category: string;
  valueProp: string;
  status: 'PUBLISHED' | 'Queued' | 'Draft';
  linkedArticleId?: string;
}

export interface BlogEditorialStats {
  total: number;
  published: number;
  queued: number;
  drafts: number;
  totalWords: number;
  calendarTotalDays: number;
  calendarPublishedDays: number;
  averageSeoScore: number;
}
