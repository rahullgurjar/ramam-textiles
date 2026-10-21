/**
 * RAMAM TEXTILES: ON-PAGE SEO TYPES & INTERFACES
 * Comprehensive data contracts for manual SEO management, auditing, and publishing.
 */

export type PageType = 
  | 'home'
  | 'shop'
  | 'category'
  | 'product'
  | 'collection'
  | 'wholesale'
  | 'custom'
  | 'article'
  | 'static'
  | 'legal';

export type SearchIntent = 'commercial' | 'transactional' | 'informational' | 'navigational';

export type RobotsDirective = 
  | 'index, follow'
  | 'noindex, follow'
  | 'index, nofollow'
  | 'noindex, nofollow'
  | 'noarchive'
  | 'nosnippet';

export type SchemaType = 
  | 'Product'
  | 'Organization'
  | 'BreadcrumbList'
  | 'Article'
  | 'BlogPosting'
  | 'FAQPage'
  | 'LocalBusiness'
  | 'Custom';

export interface PageImageSEO {
  src: string;
  filename: string;
  alt: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CustomMetaTag {
  id: string;
  name: string;
  content: string;
}

export interface HreflangTag {
  lang: string;
  href: string;
}

export interface InternalLinkItem {
  id: string;
  targetPath: string;
  anchorText: string;
  context?: string;
}

export interface PageSEOData {
  path: string;                    // e.g. '/', '/shop', '/product/kantha-duffle'
  pageName: string;                // Friendly name e.g. "Heritage Kantha Duffle"
  pageType: PageType;
  focusKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  
  // Basic SEO
  pageTitle: string;               // Display title on page
  seoTitle: string;                // <title> tag
  metaDescription: string;
  urlSlug: string;
  canonicalUrl: string;
  robotsDirectives: string;
  isIndexable: boolean;
  isFollowable: boolean;

  // Headings
  h1: string;
  h2s: string[];
  h3s: string[];

  // Image SEO
  images: PageImageSEO[];

  // Social SEO (OpenGraph & Twitter)
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Advanced SEO
  schemaType: SchemaType;
  jsonLd: string;                  // JSON-LD string
  customMetaTags: CustomMetaTag[];
  hreflang: HreflangTag[];

  // Internal Links
  internalLinks: InternalLinkItem[];

  // Workflow & Status
  status: 'published' | 'draft' | 'needs_review';
  hasUnsavedChanges?: boolean;
  lastUpdated: string;             // ISO Date string
  lastPublished: string | null;    // ISO Date string
  updatedBy?: string;
}

export interface SEOChangeHistoryItem {
  id: string;
  timestamp: string;               // ISO Date string
  user: string;
  path: string;
  pageName: string;
  field: string;
  previousValue: any;
  newValue: any;
  status: 'draft' | 'published';
}

export interface SEOSettings {
  siteName: string;
  siteBaseUrl: string;
  titleTemplate: string;           // e.g. "%title% | Ramam Textiles Jaipur"
  defaultOgImage: string;
  defaultRobots: string;
  googleVerification: string;
  bingVerification: string;
  pinterestVerification: string;
  sitemapUrl: string;
  autoCanonical: boolean;
}

export interface SEOValidationIssue {
  id: string;
  code: string;
  level: 'error' | 'warning' | 'info';
  category: 'title' | 'description' | 'headings' | 'images' | 'canonical' | 'robots' | 'schema' | 'links' | 'keywords';
  message: string;
  suggestion: string;
  isExternalCheck?: boolean;       // True if requires crawler/Search Console API
}

export interface PageAuditReport {
  path: string;
  score: number;
  errorsCount: number;
  warningsCount: number;
  passedCount: number;
  issues: SEOValidationIssue[];
}

export interface SiteWideAuditSummary {
  totalPages: number;
  indexedPages: number;
  noindexPages: number;
  missingTitles: number;
  duplicateTitles: number;
  missingDescriptions: number;
  missingCanonicals: number;
  missingAltTexts: number;
  pagesWithErrors: number;
  pagesWithWarnings: number;
  averageHealthScore: number;
  orphanPages: number;
  totalImages: number;
  imagesMissingAlt: number;
}
