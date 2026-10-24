export type BlogArticleStatus = 'published' | 'queued' | 'draft';

export interface BlogArticleAuthor {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  credentials?: string;
}

export interface BlogTableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogInfographicStep {
  step: string;
  title: string;
  desc: string;
}

export interface BlogInfographicData {
  title: string;
  subtitle?: string;
  steps: BlogInfographicStep[];
}

export interface BlogLeadCta {
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  badge?: string;
}

export interface BlogArticleSection {
  heading?: string;      // H2 Heading
  subheading?: string;   // H3 Subheading
  body: string;
  image?: string;
  imageCaption?: string;
  quote?: string;
  bullets?: string[];    // Bite-sized bullet points
  table?: BlogTableData; // Contextual data table
}

export interface BlogArticleItem {
  id: string;
  slug: string;
  title: string;         // H1
  category: string;
  readTime: string;
  publishedDate?: string;
  excerpt: string;
  coverImage: string;
  author: BlogArticleAuthor;
  contentSections: BlogArticleSection[];
  table?: BlogTableData;
  infographic?: BlogInfographicData;
  faqs?: BlogFAQItem[];
  leadCta?: BlogLeadCta;
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
  category: 'title' | 'keywords' | 'content' | 'structure' | 'readability' | 'guidelines';
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
