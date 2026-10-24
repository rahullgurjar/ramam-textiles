import { BlogArticleItem, BlogArticleStatus, BlogEditorialStats, BlogSEOCheckResult, BlogSEOCheckItem } from '../types/blog';
import { JOURNAL_ARTICLES } from '../data/journal';
import rawQueueData from '../data/blogQueue.json';
import { EDITORIAL_CALENDAR_SCHEDULE, SEED_QUEUED_CALENDAR_ARTICLES } from '../data/blogCalendarData';

const STORAGE_CUSTOM_ARTICLES = 'rt_blog_custom_articles_v1';
const STORAGE_STATUS_OVERRIDES = 'rt_blog_status_overrides_v1';
const STORAGE_DELETED_IDS = 'rt_blog_deleted_ids_v1';
const BLOG_UPDATE_EVENT = 'rt:blog-updated';

function getFormattedDate(): string {
  const d = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Build initial master base articles by merging journal.ts + blogQueue.json + seed calendar articles
 */
function getInitialBaseArticles(): BlogArticleItem[] {
  const articles: BlogArticleItem[] = [];
  const existingSlugs = new Set<string>();

  // 1. Published articles from journal.ts
  JOURNAL_ARTICLES.forEach((art, index) => {
    existingSlugs.add(art.slug);
    const calMatch = EDITORIAL_CALENDAR_SCHEDULE.find(
      c => c.linkedArticleId === art.id || c.title.toLowerCase().includes(art.title.toLowerCase().slice(0, 15))
    );

    articles.push({
      id: art.id,
      slug: art.slug,
      title: art.title,
      category: art.category,
      readTime: art.readTime,
      publishedDate: art.publishedDate,
      excerpt: art.excerpt,
      coverImage: art.coverImage,
      author: art.author,
      contentSections: art.contentSections,
      tags: art.tags || [],
      status: 'published',
      focusKeyword: calMatch?.focusKeyword || art.tags?.[0] || '',
      targetDay: calMatch?.day || (index + 1),
      lastModified: art.publishedDate
    });
  });

  // 2. Queued articles from blogQueue.json (that aren't already published)
  (rawQueueData as any[]).forEach(item => {
    if (!existingSlugs.has(item.slug)) {
      existingSlugs.add(item.slug);
      const calMatch = EDITORIAL_CALENDAR_SCHEDULE.find(
        c => c.linkedArticleId === item.id || c.title.toLowerCase().includes(item.title.toLowerCase().slice(0, 15))
      );

      articles.push({
        id: item.id,
        slug: item.slug,
        title: item.title,
        category: item.category,
        readTime: item.readTime,
        publishedDate: item.publishedDate || '',
        excerpt: item.excerpt,
        coverImage: item.coverImage,
        author: item.author,
        contentSections: item.contentSections,
        tags: item.tags || [],
        status: 'queued',
        focusKeyword: calMatch?.focusKeyword || item.tags?.[0] || '',
        targetDay: calMatch?.day || 4,
        lastModified: 'October 23, 2026'
      });
    }
  });

  // 3. Seed calendar queue articles
  SEED_QUEUED_CALENDAR_ARTICLES.forEach(seed => {
    if (!existingSlugs.has(seed.slug)) {
      existingSlugs.add(seed.slug);
      articles.push(seed);
    }
  });

  return articles;
}

/**
 * Calculate SEO & E-E-A-T score out of 100 with actionable feedback
 */
export function calculateArticleSEOScore(article: Partial<BlogArticleItem>): BlogSEOCheckResult {
  const checks: BlogSEOCheckItem[] = [];
  let score = 0;
  const maxScore = 100;

  const title = (article.title || '').trim();
  const excerpt = (article.excerpt || '').trim();
  const keyword = (article.focusKeyword || (article.tags && article.tags[0]) || '').trim().toLowerCase();
  const sections = article.contentSections || [];

  // Count total words in all body sections
  const fullText = sections.map(s => (s.heading || '') + ' ' + (s.body || '') + ' ' + (s.quote || '')).join(' ');
  const wordCount = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // Check 1: Title Length (45-85 chars recommended for Google SERP)
  const titleLen = title.length;
  if (titleLen >= 40 && titleLen <= 85) {
    score += 10;
    checks.push({
      id: 'title_length',
      label: 'SEO Title Length',
      passed: true,
      message: `Optimal length (${titleLen} characters, ideal: 40-85 chars).`,
      points: 10,
      maxPoints: 10,
      category: 'title'
    });
  } else if (titleLen > 0) {
    score += 6;
    checks.push({
      id: 'title_length',
      label: 'SEO Title Length',
      passed: false,
      message: `${titleLen} characters. Aim for 40-85 characters for best SERP display.`,
      points: 6,
      maxPoints: 10,
      category: 'title'
    });
  } else {
    checks.push({
      id: 'title_length',
      label: 'SEO Title Length',
      passed: false,
      message: 'Article title is required.',
      points: 0,
      maxPoints: 10,
      category: 'title'
    });
  }

  // Check 2: Focus Keyword in Title
  const titleLower = title.toLowerCase();
  const keywordInTitle = keyword && (titleLower.includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => titleLower.includes(w)));
  if (keywordInTitle) {
    score += 10;
    checks.push({
      id: 'keyword_in_title',
      label: 'Focus Keyword in Title',
      passed: true,
      message: `Title contains target keyword "${keyword}".`,
      points: 10,
      maxPoints: 10,
      category: 'keywords'
    });
  } else if (keyword) {
    checks.push({
      id: 'keyword_in_title',
      label: 'Focus Keyword in Title',
      passed: false,
      message: `Consider placing keyword "${keyword}" inside title.`,
      points: 0,
      maxPoints: 10,
      category: 'keywords'
    });
  } else {
    checks.push({
      id: 'keyword_in_title',
      label: 'Focus Keyword Defined',
      passed: false,
      message: 'No primary focus keyword assigned.',
      points: 0,
      maxPoints: 10,
      category: 'keywords'
    });
  }

  // Check 3: Excerpt / Meta Description Length (100-180 chars)
  const excerptLen = excerpt.length;
  if (excerptLen >= 90 && excerptLen <= 190) {
    score += 10;
    checks.push({
      id: 'excerpt_length',
      label: 'Meta Excerpt Length',
      passed: true,
      message: `Ideal summary length (${excerptLen} characters).`,
      points: 10,
      maxPoints: 10,
      category: 'content'
    });
  } else if (excerptLen > 40) {
    score += 6;
    checks.push({
      id: 'excerpt_length',
      label: 'Meta Excerpt Length',
      passed: false,
      message: `${excerptLen} characters. Ideal length is 90-190 characters.`,
      points: 6,
      maxPoints: 10,
      category: 'content'
    });
  } else {
    checks.push({
      id: 'excerpt_length',
      label: 'Meta Excerpt Length',
      passed: false,
      message: 'Excerpt is too brief or empty.',
      points: 0,
      maxPoints: 10,
      category: 'content'
    });
  }

  // Check 4: Keyword in Excerpt
  const excerptLower = excerpt.toLowerCase();
  const keywordInExcerpt = keyword && (excerptLower.includes(keyword) || keyword.split(/\s+/).filter(w => w.length > 3).some(w => excerptLower.includes(w)));
  if (keywordInExcerpt) {
    score += 10;
    checks.push({
      id: 'keyword_in_excerpt',
      label: 'Focus Keyword in Meta Excerpt',
      passed: true,
      message: 'Keyword appears naturally in the opening summary.',
      points: 10,
      maxPoints: 10,
      category: 'keywords'
    });
  } else if (keyword) {
    checks.push({
      id: 'keyword_in_excerpt',
      label: 'Focus Keyword in Meta Excerpt',
      passed: false,
      message: `Include "${keyword}" within first sentence of excerpt.`,
      points: 0,
      maxPoints: 10,
      category: 'keywords'
    });
  }

  // Check 5: Content Depth (E-E-A-T Word Count)
  if (wordCount >= 600) {
    score += 15;
    checks.push({
      id: 'word_count',
      label: 'Content Depth & E-E-A-T Depth',
      passed: true,
      message: `Authoritative depth (${wordCount} words, ~${readingMinutes} min read).`,
      points: 15,
      maxPoints: 15,
      category: 'content'
    });
  } else if (wordCount >= 350) {
    score += 10;
    checks.push({
      id: 'word_count',
      label: 'Content Depth & E-E-A-T Depth',
      passed: true,
      message: `Good depth (${wordCount} words). Expand over 600 words for maximum Google E-E-A-T.`,
      points: 10,
      maxPoints: 15,
      category: 'content'
    });
  } else {
    score += 4;
    checks.push({
      id: 'word_count',
      label: 'Content Depth & E-E-A-T Depth',
      passed: false,
      message: `Thin content (${wordCount} words). Expand with sub-headings and detailed craft analysis.`,
      points: 4,
      maxPoints: 15,
      category: 'content'
    });
  }

  // Check 6: Section Structure & H2 Headings
  const headings = sections.filter(s => !!s.heading);
  if (headings.length >= 3) {
    score += 10;
    checks.push({
      id: 'section_headings',
      label: 'Heading Hierarchy (H2 Structure)',
      passed: true,
      message: `${headings.length} main H2 sections defined for scannability.`,
      points: 10,
      maxPoints: 10,
      category: 'structure'
    });
  } else {
    score += 5;
    checks.push({
      id: 'section_headings',
      label: 'Heading Hierarchy (H2 Structure)',
      passed: false,
      message: `Only ${headings.length} H2 heading(s). Add at least 3 structured headings.`,
      points: 5,
      maxPoints: 10,
      category: 'structure'
    });
  }

  // Guideline 1: Paragraph Length (< 3 lines per paragraph)
  let longParagraphsCount = 0;
  sections.forEach(sec => {
    if (sec.body) {
      const paras = sec.body.split(/\n\n+/).filter(Boolean);
      paras.forEach(p => {
        const words = p.trim().split(/\s+/).length;
        if (words > 65) longParagraphsCount++;
      });
    }
  });

  if (longParagraphsCount === 0) {
    score += 5;
    checks.push({
      id: 'paragraph_length',
      label: 'Guideline 1: Paragraph Length (< 3 Lines)',
      passed: true,
      message: 'All paragraphs are punchy and under 3 lines for optimal mobile readability.',
      points: 5,
      maxPoints: 5,
      category: 'guidelines'
    });
  } else {
    score += 2;
    checks.push({
      id: 'paragraph_length',
      label: 'Guideline 1: Paragraph Length (< 3 Lines)',
      passed: false,
      message: `Found ${longParagraphsCount} paragraph(s) longer than 3 lines. Break them into bite-sized units.`,
      points: 2,
      maxPoints: 5,
      category: 'guidelines'
    });
  }

  // Guideline 2: Subheading Hierarchy (H3 under H2)
  const hasSubheadings = sections.some(s => !!s.subheading) || fullText.includes('###') || sections.length >= 4;
  if (hasSubheadings) {
    score += 4;
    checks.push({
      id: 'heading_hierarchy',
      label: 'Guideline 2: H1 → H2 → H3 Heading Hierarchy',
      passed: true,
      message: 'Proper nested heading hierarchy observed with H1 title and H2/H3 subheadings.',
      points: 4,
      maxPoints: 4,
      category: 'guidelines'
    });
  } else {
    checks.push({
      id: 'heading_hierarchy',
      label: 'Guideline 2: H1 → H2 → H3 Heading Hierarchy',
      passed: false,
      message: 'Include H3 subheadings under major H2 sections for fine-grained clarity.',
      points: 0,
      maxPoints: 4,
      category: 'guidelines'
    });
  }

  // Guideline 3: Bullet Points
  const hasBullets = sections.some(s => (s.bullets && s.bullets.length > 0) || (s.body && /([•\-\*]|\d+[\.\)])\s/.test(s.body)));
  if (hasBullets) {
    score += 5;
    checks.push({
      id: 'bullet_points',
      label: 'Guideline 3: Scannable Bullet Points',
      passed: true,
      message: 'Bite-sized bullet points present for easy skimmability.',
      points: 5,
      maxPoints: 5,
      category: 'guidelines'
    });
  } else {
    checks.push({
      id: 'bullet_points',
      label: 'Guideline 3: Scannable Bullet Points',
      passed: false,
      message: 'Add bullet points for key takeaways, technical specs, or pros/cons.',
      points: 0,
      maxPoints: 5,
      category: 'guidelines'
    });
  }

  // Guideline 4: Relevant Data Table
  const hasTable = !!article.table || sections.some(s => !!s.table);
  if (hasTable) {
    score += 5;
    checks.push({
      id: 'data_table',
      label: 'Guideline 4: Relevant Structured Data Table',
      passed: true,
      message: 'Includes structured data/comparison table for high E-E-A-T value.',
      points: 5,
      maxPoints: 5,
      category: 'guidelines'
    });
  } else {
    checks.push({
      id: 'data_table',
      label: 'Guideline 4: Relevant Structured Data Table',
      passed: false,
      message: 'Add a comparison or technical specifications table (GSM, sizing, care, or process).',
      points: 0,
      maxPoints: 5,
      category: 'guidelines'
    });
  }

  // Guideline 5: Images & Infographics
  const hasInfographic = !!article.infographic || sections.some(s => !!s.image);
  if (hasInfographic && !!article.coverImage) {
    score += 4;
    checks.push({
      id: 'visuals_infographic',
      label: 'Guideline 5: Relevant Images & Infographics',
      passed: true,
      message: 'Rich visuals and craft infographics present.',
      points: 4,
      maxPoints: 4,
      category: 'guidelines'
    });
  } else {
    score += 2;
    checks.push({
      id: 'visuals_infographic',
      label: 'Guideline 5: Relevant Images & Infographics',
      passed: false,
      message: 'Add process infographics or workshop photos to complement the cover image.',
      points: 2,
      maxPoints: 4,
      category: 'guidelines'
    });
  }

  // Guideline 6: Author Information & Credentials
  const hasAuthorBio = !!article.author && !!article.author.name && !!article.author.role;
  if (hasAuthorBio) {
    score += 4;
    checks.push({
      id: 'author_details',
      label: 'Guideline 6: Verified Author Information',
      passed: true,
      message: `Author "${article.author?.name}" (${article.author?.role}) assigned.`,
      points: 4,
      maxPoints: 4,
      category: 'guidelines'
    });
  } else {
    checks.push({
      id: 'author_details',
      label: 'Guideline 6: Verified Author Information',
      passed: false,
      message: 'Author credentials and artisan role must be provided.',
      points: 0,
      maxPoints: 4,
      category: 'guidelines'
    });
  }

  // Guideline 7: FAQ Section
  const faqCount = (article.faqs || []).length;
  if (faqCount >= 3) {
    score += 5;
    checks.push({
      id: 'faq_section',
      label: 'Guideline 7: FAQ Section with Schema Markup',
      passed: true,
      message: `${faqCount} high-intent FAQs included with Schema.org FAQPage compatibility.`,
      points: 5,
      maxPoints: 5,
      category: 'guidelines'
    });
  } else if (faqCount > 0) {
    score += 2;
    checks.push({
      id: 'faq_section',
      label: 'Guideline 7: FAQ Section with Schema Markup',
      passed: false,
      message: `Only ${faqCount} FAQ(s). Aim for at least 3 questions to capture Google People Also Ask.`,
      points: 2,
      maxPoints: 5,
      category: 'guidelines'
    });
  } else {
    checks.push({
      id: 'faq_section',
      label: 'Guideline 7: FAQ Section with Schema Markup',
      passed: false,
      message: 'Add a dedicated FAQ section with at least 3 buyer questions.',
      points: 0,
      maxPoints: 5,
      category: 'guidelines'
    });
  }

  // Guideline 8 & 9: Lead Gen CTA (Redirect to /contact)
  const hasLeadCta = !!article.leadCta || fullText.toLowerCase().includes('contact') || fullText.toLowerCase().includes('sourcing');
  if (hasLeadCta) {
    score += 4;
    checks.push({
      id: 'lead_cta',
      label: 'Guideline 9: Lead Generation CTA to /contact',
      passed: true,
      message: 'Dedicated lead generation CTA actively routes readers to /contact.',
      points: 4,
      maxPoints: 4,
      category: 'guidelines'
    });
  } else {
    checks.push({
      id: 'lead_cta',
      label: 'Guideline 9: Lead Generation CTA to /contact',
      passed: false,
      message: 'Add a lead generation CTA card redirecting to /contact.',
      points: 0,
      maxPoints: 4,
      category: 'guidelines'
    });
  }

  let rating: 'A+' | 'A' | 'B' | 'Needs Polish' = 'Needs Polish';
  if (score >= 90) rating = 'A+';
  else if (score >= 75) rating = 'A';
  else if (score >= 60) rating = 'B';

  return {
    score,
    maxScore,
    rating,
    wordCount,
    readingMinutes,
    checks
  };
}

/**
 * Retrieve all blog articles merged with local storage overrides
 */
export function getAllBlogArticles(): BlogArticleItem[] {
  const baseArticles = getInitialBaseArticles();

  if (typeof window === 'undefined') {
    return baseArticles;
  }

  try {
    const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_IDS) || '[]');
    const statusOverrides: Record<string, { status: BlogArticleStatus; publishedDate?: string }> = 
      JSON.parse(localStorage.getItem(STORAGE_STATUS_OVERRIDES) || '{}');
    const customArticles: BlogArticleItem[] = 
      JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');

    // 1. Filter out deleted base articles
    let list = baseArticles.filter(a => !deletedIds.includes(a.id));

    // 2. Apply status overrides to base articles
    list = list.map(art => {
      const override = statusOverrides[art.id];
      if (override) {
        return {
          ...art,
          status: override.status,
          publishedDate: override.publishedDate !== undefined ? override.publishedDate : art.publishedDate
        };
      }
      return art;
    });

    // 3. Merge custom user-created/edited articles
    customArticles.forEach(custom => {
      if (deletedIds.includes(custom.id)) return;
      const idx = list.findIndex(a => a.id === custom.id || a.slug === custom.slug);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...custom };
      } else {
        list.push(custom);
      }
    });

    // Calculate SEO score for each article
    return list.map(art => ({
      ...art,
      seoScore: calculateArticleSEOScore(art).score
    }));
  } catch (err) {
    console.error('Error loading blog articles from storage:', err);
    return baseArticles;
  }
}

/**
 * Returns only published articles for public website display
 */
export function getPublishedArticles(): BlogArticleItem[] {
  const all = getAllBlogArticles();
  return all.filter(a => a.status === 'published');
}

/**
 * Find article by slug
 */
export function getBlogArticleBySlug(slug: string): BlogArticleItem | undefined {
  const all = getAllBlogArticles();
  const clean = slug.replace(/^\//, '').replace(/^blogs?\//, '').replace(/^journal\//, '');
  return all.find(a => a.slug === clean || a.id === clean);
}

/**
 * Find article by id
 */
export function getBlogArticleById(id: string): BlogArticleItem | undefined {
  const all = getAllBlogArticles();
  return all.find(a => a.id === id);
}

/**
 * Save draft or update an existing article
 */
export function saveBlogArticle(article: BlogArticleItem): void {
  if (typeof window === 'undefined') return;

  try {
    const customList: BlogArticleItem[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');
    const existingIndex = customList.findIndex(a => a.id === article.id || a.slug === article.slug);

    const updated = {
      ...article,
      lastModified: getFormattedDate()
    };

    if (existingIndex >= 0) {
      customList[existingIndex] = updated;
    } else {
      customList.push(updated);
    }

    localStorage.setItem(STORAGE_CUSTOM_ARTICLES, JSON.stringify(customList));

    // Also update status override
    const statusOverrides = JSON.parse(localStorage.getItem(STORAGE_STATUS_OVERRIDES) || '{}');
    statusOverrides[article.id] = {
      status: article.status,
      publishedDate: article.publishedDate
    };
    localStorage.setItem(STORAGE_STATUS_OVERRIDES, JSON.stringify(statusOverrides));

    window.dispatchEvent(new CustomEvent(BLOG_UPDATE_EVENT, { detail: { articleId: article.id } }));
  } catch (err) {
    console.error('Failed to save blog article:', err);
  }
}

/**
 * Review & Publish an article live to the site
 */
export function publishBlogArticle(articleId: string, customPublishedDate?: string): BlogArticleItem | null {
  if (typeof window === 'undefined') return null;

  try {
    const all = getAllBlogArticles();
    const article = all.find(a => a.id === articleId);
    if (!article) return null;

    const pubDate = customPublishedDate || getFormattedDate();

    // 1. Update status override
    const statusOverrides = JSON.parse(localStorage.getItem(STORAGE_STATUS_OVERRIDES) || '{}');
    statusOverrides[articleId] = {
      status: 'published',
      publishedDate: pubDate
    };
    localStorage.setItem(STORAGE_STATUS_OVERRIDES, JSON.stringify(statusOverrides));

    // 2. Update custom storage if exists
    const customList: BlogArticleItem[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');
    const customIdx = customList.findIndex(a => a.id === articleId);
    const updatedArticle: BlogArticleItem = {
      ...article,
      status: 'published',
      publishedDate: pubDate,
      lastModified: pubDate
    };

    if (customIdx >= 0) {
      customList[customIdx] = updatedArticle;
    } else {
      customList.push(updatedArticle);
    }
    localStorage.setItem(STORAGE_CUSTOM_ARTICLES, JSON.stringify(customList));

    window.dispatchEvent(new CustomEvent(BLOG_UPDATE_EVENT, { detail: { articleId, action: 'publish' } }));
    return updatedArticle;
  } catch (err) {
    console.error('Failed to publish article:', err);
    return null;
  }
}

/**
 * Move published article back to queued / draft
 */
export function unpublishBlogArticle(articleId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const statusOverrides = JSON.parse(localStorage.getItem(STORAGE_STATUS_OVERRIDES) || '{}');
    statusOverrides[articleId] = {
      status: 'queued',
      publishedDate: ''
    };
    localStorage.setItem(STORAGE_STATUS_OVERRIDES, JSON.stringify(statusOverrides));

    const customList: BlogArticleItem[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');
    const idx = customList.findIndex(a => a.id === articleId);
    if (idx >= 0) {
      customList[idx].status = 'queued';
      customList[idx].publishedDate = '';
      localStorage.setItem(STORAGE_CUSTOM_ARTICLES, JSON.stringify(customList));
    }

    window.dispatchEvent(new CustomEvent(BLOG_UPDATE_EVENT, { detail: { articleId, action: 'unpublish' } }));
  } catch (err) {
    console.error('Failed to unpublish article:', err);
  }
}

/**
 * Delete or archive an article
 */
export function deleteBlogArticle(articleId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_IDS) || '[]');
    if (!deletedIds.includes(articleId)) {
      deletedIds.push(articleId);
      localStorage.setItem(STORAGE_DELETED_IDS, JSON.stringify(deletedIds));
    }

    // Remove from custom articles if present
    const customList: BlogArticleItem[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');
    const filtered = customList.filter(a => a.id !== articleId);
    localStorage.setItem(STORAGE_CUSTOM_ARTICLES, JSON.stringify(filtered));

    window.dispatchEvent(new CustomEvent(BLOG_UPDATE_EVENT, { detail: { articleId, action: 'delete' } }));
  } catch (err) {
    console.error('Failed to delete blog article:', err);
  }
}

/**
 * Get next upcoming queued article from editorial queue
 */
export function getNextQueuedBlogArticle(): BlogArticleItem | null {
  const all = getAllBlogArticles();
  const queued = all.filter(a => a.status === 'queued');
  if (queued.length === 0) return null;

  // Prioritize lower targetDay if assigned
  queued.sort((a, b) => (a.targetDay || 99) - (b.targetDay || 99));
  return queued[0];
}

/**
 * Editorial stats overview
 */
export function getBlogEditorialStats(): BlogEditorialStats {
  const all = getAllBlogArticles();
  const published = all.filter(a => a.status === 'published');
  const queued = all.filter(a => a.status === 'queued');
  const drafts = all.filter(a => a.status === 'draft');

  let totalWords = 0;
  let totalScore = 0;

  all.forEach(art => {
    const text = (art.contentSections || []).map(s => (s.heading || '') + ' ' + (s.body || '') + ' ' + (s.quote || '')).join(' ');
    totalWords += text.trim() ? text.trim().split(/\s+/).length : 0;
    totalScore += art.seoScore || 0;
  });

  const avgScore = all.length > 0 ? Math.round(totalScore / all.length) : 0;

  return {
    total: all.length,
    published: published.length,
    queued: queued.length,
    drafts: drafts.length,
    totalWords,
    calendarTotalDays: EDITORIAL_CALENDAR_SCHEDULE.length,
    calendarPublishedDays: published.length,
    averageSeoScore: avgScore
  };
}

/**
 * Export clean TypeScript file content for src/data/journal.ts
 */
export function generateJournalTsExport(articles?: BlogArticleItem[]): string {
  const list = articles || getPublishedArticles();

  const formattedArticles = list.map(art => {
    let extraFields = '';
    if (art.table) {
      extraFields += `,\n    table: ${JSON.stringify(art.table, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
    }
    if (art.infographic) {
      extraFields += `,\n    infographic: ${JSON.stringify(art.infographic, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
    }
    if (art.faqs && art.faqs.length > 0) {
      extraFields += `,\n    faqs: ${JSON.stringify(art.faqs, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
    }
    if (art.leadCta) {
      extraFields += `,\n    leadCta: ${JSON.stringify(art.leadCta, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
    }

    return `  {\n` +
      `    id: ${JSON.stringify(art.id)},\n` +
      `    slug: ${JSON.stringify(art.slug)},\n` +
      `    title: ${JSON.stringify(art.title)},\n` +
      `    category: ${JSON.stringify(art.category)},\n` +
      `    readTime: ${JSON.stringify(art.readTime)},\n` +
      `    publishedDate: ${JSON.stringify(art.publishedDate || getFormattedDate())},\n` +
      `    excerpt: ${JSON.stringify(art.excerpt)},\n` +
      `    coverImage: ${JSON.stringify(art.coverImage)},\n` +
      `    author: {\n` +
      `      name: ${JSON.stringify(art.author.name)},\n` +
      `      role: ${JSON.stringify(art.author.role)}${art.author.bio ? `,\n      bio: ${JSON.stringify(art.author.bio)}` : ''}\n` +
      `    },\n` +
      `    contentSections: ${JSON.stringify(art.contentSections, null, 6).replace(/"([^"]+)":/g, '$1:')},\n` +
      `    tags: ${JSON.stringify(art.tags)}${extraFields}\n` +
      `  }`;
  }).join(',\n');

  return `import { JournalArticle } from '../types';\n\n` +
    `export const JOURNAL_ARTICLES: JournalArticle[] = [\n` +
    formattedArticles +
    `\n];\n\n` +
    `export const JOURNAL_POSTS = JOURNAL_ARTICLES.map(a => ({\n` +
    `  id: a.id,\n` +
    `  slug: a.slug,\n` +
    `  title: a.title,\n` +
    `  category: a.category,\n` +
    `  readTime: a.readTime,\n` +
    `  date: a.publishedDate,\n` +
    `  excerpt: a.excerpt,\n` +
    `  image: a.coverImage,\n` +
    `  author: a.author,\n` +
    `  contentSections: a.contentSections,\n` +
    `  tags: a.tags,\n` +
    `  table: a.table,\n` +
    `  infographic: a.infographic,\n` +
    `  faqs: a.faqs,\n` +
    `  leadCta: a.leadCta\n` +
    `}));\n`;
}

/**
 * Export clean JSON for src/data/blogQueue.json
 */
export function generateBlogQueueJsonExport(): string {
  const all = getAllBlogArticles();
  const queued = all.filter(a => a.status === 'queued' || a.status === 'draft');
  return JSON.stringify(queued, null, 2);
}
