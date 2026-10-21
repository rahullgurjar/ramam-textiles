/**
 * RAMAM TEXTILES: ON-PAGE SEO PERSISTENCE & AUDIT ENGINE
 * Central store for manual SEO overrides, draft workflows, validation checks,
 * live SERP simulations, and audit logging.
 */

import { 
  PageSEOData, 
  PageType, 
  SEOChangeHistoryItem, 
  SEOSettings, 
  SEOValidationIssue, 
  PageAuditReport, 
  SiteWideAuditSummary 
} from '../types/seo';
import { DEFAULT_SEO } from './seo';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { JOURNAL_ARTICLES } from '../data/journal';

const BASE_URL = 'https://ramamtextiles.shop';
const PUBLISHED_STORAGE_KEY = 'rt_seo_published_v1';
const DRAFTS_STORAGE_KEY = 'rt_seo_drafts_v1';
const HISTORY_STORAGE_KEY = 'rt_seo_history_v1';
const SETTINGS_STORAGE_KEY = 'rt_seo_settings_v1';

export const DEFAULT_SEO_SETTINGS: SEOSettings = {
  siteName: 'Ramam Textiles Jaipur',
  siteBaseUrl: BASE_URL,
  titleTemplate: '%title% | Ramam Textiles',
  defaultOgImage: '/logo.png',
  defaultRobots: 'index, follow',
  googleVerification: 'GTM-MF9DKWFK',
  bingVerification: '',
  pinterestVerification: '',
  sitemapUrl: `${BASE_URL}/sitemap.xml`,
  autoCanonical: true
};

/**
 * Generates initial default schema JSON-LD based on page type
 */
function generateDefaultSchema(type: PageType, name: string, path: string, desc: string, image: string): string {
  const fullUrl = `${BASE_URL}${path === '/' ? '' : path}`;
  const fullImg = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? image : '/' + image}`;

  if (type === 'product') {
    return JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': name,
      'image': [fullImg],
      'description': desc,
      'sku': `RT-${name.substring(0, 3).toUpperCase()}-001`,
      'brand': {
        '@type': 'Brand',
        'name': 'Ramam Textiles'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'INR',
        'lowPrice': '350',
        'highPrice': '2400',
        'offerCount': '12',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'Organization',
          'name': 'Ramam Textiles Jaipur'
        }
      }
    }, null, 2);
  }

  if (type === 'article') {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': fullUrl
      },
      'headline': name,
      'description': desc,
      'image': fullImg,
      'author': {
        '@type': 'Organization',
        'name': 'Ramam Textiles Guild'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Ramam Textiles',
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/logo.png`
        }
      },
      'datePublished': '2026-10-20T08:00:00+05:30',
      'dateModified': '2026-10-21T10:00:00+05:30'
    }, null, 2);
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Ramam Textiles Jaipur',
    'url': fullUrl,
    'logo': `${BASE_URL}/logo.png`,
    'description': desc,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Jaipur',
      'addressRegion': 'Rajasthan',
      'addressCountry': 'IN'
    }
  }, null, 2);
}

/**
 * Builds the comprehensive default registry of all real website routes
 */
function buildFactoryPages(): PageSEOData[] {
  const pages: PageSEOData[] = [];
  const now = new Date().toISOString();

  // 1. Core Pages
  const coreMap: Array<{ path: string; name: string; type: PageType; key: string; focus: string; h1: string }> = [
    { path: '/', name: 'Home Atelier', type: 'home', key: 'home', focus: 'Jaipur luxury textiles wholesale manufacturer', h1: 'Authentic Jaipur Artisan Textiles & Wholesale Manufacturing' },
    { path: '/shop', name: 'Wholesale Catalog', type: 'shop', key: 'shop', focus: 'wholesale hand block print bags fabrics', h1: 'Wholesale Catalog & Ready-To-Order SKUs' },
    { path: '/collections', name: 'Curated Sets & Heritage Editions', type: 'collection', key: 'collections', focus: 'artisan cotton bags vanity trios sets', h1: 'Curated Heritage Collections & Coordinated Sets' },
    { path: '/custom-manufacturing', name: 'Custom Manufacturing & Private Label', type: 'custom', key: 'customManufacturing', focus: 'custom garment manufacturing Jaipur private label', h1: 'Bespoke Garment Manufacturing & Private Label OEM' },
    { path: '/bulk-enquiry', name: 'Bulk Order & Wholesale Quotation', type: 'wholesale', key: 'bulkEnquiry', focus: 'bulk order quotation textile export India', h1: 'Request Wholesale Price Sheet & Bulk Quotation' },
    { path: '/wholesale', name: 'Wholesale Buyer Portal', type: 'wholesale', key: 'wholesale', focus: 'Jaipur block print wholesale supplier low MOQ', h1: 'Wholesale Buyer Terms, FOB Pricing & Catalog' },
    { path: '/craftsmanship', name: 'Heritage Handblock Craftsmanship', type: 'static', key: 'craftsmanship', focus: 'Bagru Dabu indigo hand block printing process', h1: 'The 400-Year Heritage of Jaipur Hand Block Printing' },
    { path: '/about', name: 'About Ramam Textiles Atelier', type: 'static', key: 'about', focus: 'Ramam Textiles Jaipur artisan workshop', h1: 'Master Printers & Heritage Craftsmen of Jaipur' },
    { path: '/lookbook', name: 'Editorial Lookbook', type: 'static', key: 'lookbook', focus: 'quilted cotton bags lookbook catalog styling', h1: 'Editorial Lookbook: High-Fashion Artisan Duffles' },
    { path: '/blog', name: 'Artisan Blog & Sourcing Journal', type: 'article', key: 'blog', focus: 'textile sourcing guide Jaipur cotton block print', h1: 'Jaipur Artisan Blog & Technical Sourcing Guides' },
    { path: '/contact', name: 'Contact Jaipur Atelier', type: 'static', key: 'contact', focus: 'contact Jaipur textile manufacturer phone email', h1: 'Connect with our Jaipur Production Atelier' },
    { path: '/track-order', name: 'Track Order & Consignment Dispatch', type: 'static', key: 'trackOrder', focus: 'track wholesale textile order dispatch', h1: 'Real-Time Production & Courier Consignment Tracking' },
    { path: '/faq', name: 'Frequently Asked Questions', type: 'static', key: 'faq', focus: 'hand block print wholesale FAQ MOQ terms', h1: 'Buyer Knowledge Base & Frequently Asked Questions' },
    { path: '/privacy-policy', name: 'Privacy Policy', type: 'legal', key: 'legal', focus: 'Ramam Textiles privacy policy', h1: 'Privacy Policy & Data Safeguards' },
    { path: '/shipping-returns', name: 'Worldwide Shipping & Export Policies', type: 'legal', key: 'legal', focus: 'international worldwide shipping terms export', h1: 'Worldwide Courier Delivery, Air Cargo & Transit Times' },
    { path: '/terms-conditions', name: 'Terms of Service & Wholesale Agreement', type: 'legal', key: 'legal', focus: 'wholesale terms and conditions Ramam Textiles', h1: 'Commercial Terms, Invoicing & Sampling Agreement' },
  ];

  coreMap.forEach(item => {
    const seoDef = DEFAULT_SEO[item.key] || DEFAULT_SEO.home;
    const isLegal = item.type === 'legal';
    pages.push({
      path: item.path,
      pageName: item.name,
      pageType: item.type,
      focusKeyword: item.focus,
      secondaryKeywords: ['Jaipur textiles', 'hand block print', 'pure cotton India', 'wholesale manufacturer'],
      searchIntent: item.type === 'shop' || item.type === 'wholesale' ? 'transactional' : item.type === 'article' ? 'informational' : 'commercial',
      pageTitle: item.name,
      seoTitle: seoDef.title,
      metaDescription: seoDef.description,
      urlSlug: item.path === '/' ? '' : item.path.replace('/', ''),
      canonicalUrl: `${BASE_URL}${item.path === '/' ? '' : item.path}`,
      robotsDirectives: isLegal ? 'noindex, follow' : 'index, follow',
      isIndexable: !isLegal,
      isFollowable: true,
      h1: item.h1,
      h2s: ['Heritage Hand Block Artistry', 'Export Grade Technical Standards', 'Direct Atelier Wholesale Inquiries'],
      h3s: ['Organic Cotton Batting', 'Natural Indigo & Botanical Dyes', 'Low MOQ Custom Runs'],
      images: [
        {
          src: '/products/duffle-kantha-patchwork.jpg',
          filename: 'duffle-kantha-patchwork.jpg',
          alt: `${item.name} - Handcrafted artisan textile product Jaipur`
        }
      ],
      ogTitle: seoDef.title,
      ogDescription: seoDef.description,
      ogImage: '/logo.png',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: seoDef.title,
      twitterDescription: seoDef.description,
      twitterImage: '/logo.png',
      schemaType: item.type === 'article' ? 'BlogPosting' : 'Organization',
      jsonLd: generateDefaultSchema(item.type, item.name, item.path, seoDef.description, '/logo.png'),
      customMetaTags: [],
      hreflang: [
        { lang: 'en', href: `${BASE_URL}${item.path === '/' ? '' : item.path}` }
      ],
      internalLinks: [
        { id: 'il-shop', targetPath: '/shop', anchorText: 'Wholesale Catalog' },
        { id: 'il-custom', targetPath: '/custom-manufacturing', anchorText: 'Custom Private Label' },
        { id: 'il-contact', targetPath: '/contact', anchorText: 'Inquire Directly' }
      ],
      status: 'published',
      lastUpdated: now,
      lastPublished: now
    });
  });

  // 2. Categories from CATEGORIES
  CATEGORIES.forEach(cat => {
    const catPath = `/category/${cat.id}`;
    const seoTitle = `${cat.name} | Jaipur Handcrafted Wholesale Supplier | Ramam Textiles`;
    pages.push({
      path: catPath,
      pageName: `Category: ${cat.name}`,
      pageType: 'category',
      focusKeyword: `${cat.name.toLowerCase()} Jaipur wholesale manufacturer`,
      secondaryKeywords: ['hand block printed bags', 'cotton quilted cosmetic pouches', 'low MOQ apparel supplier'],
      searchIntent: 'commercial',
      pageTitle: cat.name,
      seoTitle,
      metaDescription: cat.description,
      urlSlug: cat.id,
      canonicalUrl: `${BASE_URL}${catPath}`,
      robotsDirectives: 'index, follow',
      isIndexable: true,
      isFollowable: true,
      h1: `${cat.name} — Jaipur Artisan Wholesale Line`,
      h2s: ['Artisan Hand Block Techniques', 'B2B Volume Tier Pricing', 'Custom Label Packaging'],
      h3s: ['Channel Quilting Construction', 'Water-Resistant Linings', 'YKK Zippers & Brass Hardware'],
      images: [
        {
          src: cat.image,
          filename: cat.image.split('/').pop() || 'category.jpg',
          alt: `${cat.name} wholesale manufacturer Jaipur India`
        }
      ],
      ogTitle: seoTitle,
      ogDescription: cat.description,
      ogImage: cat.image,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: seoTitle,
      twitterDescription: cat.description,
      twitterImage: cat.image,
      schemaType: 'BreadcrumbList',
      jsonLd: generateDefaultSchema('category', cat.name, catPath, cat.description, cat.image),
      customMetaTags: [],
      hreflang: [{ lang: 'en', href: `${BASE_URL}${catPath}` }],
      internalLinks: [
        { id: `il-cat-${cat.id}`, targetPath: '/bulk-enquiry', anchorText: 'Request Wholesale Swatch Kit' },
        { id: 'il-home', targetPath: '/', anchorText: 'Ramam Textiles Home' }
      ],
      status: 'published',
      lastUpdated: now,
      lastPublished: now
    });
  });

  // 3. Products from PRODUCTS
  PRODUCTS.forEach(p => {
    const prodPath = `/product/${p.slug}`;
    const seoTitle = `${p.name} | Jaipur Block Print Wholesale | Ramam Textiles`;
    const prodImg = p.images && p.images.length > 0 ? p.images[0] : '/logo.png';
    pages.push({
      path: prodPath,
      pageName: p.name,
      pageType: 'product',
      focusKeyword: `${p.name.toLowerCase()} wholesale Jaipur`,
      secondaryKeywords: [p.sku, p.fabric, 'pure cotton hand block print', 'wholesale supplier India'],
      searchIntent: 'transactional',
      pageTitle: p.name,
      seoTitle,
      metaDescription: p.description,
      urlSlug: p.slug,
      canonicalUrl: `${BASE_URL}${prodPath}`,
      robotsDirectives: 'index, follow',
      isIndexable: true,
      isFollowable: true,
      h1: p.name,
      h2s: ['Fabric & Craftsmanship Specifications', 'Volume Wholesale Pricing Tiers', 'Custom Brand Tagging'],
      h3s: ['Pure Cambric Cotton 60s', 'Shock-Absorbing Batting', 'Azo-Free Botanical Dye'],
      images: (p.images || ['/logo.png']).map((img, idx) => ({
        src: img,
        filename: img.split('/').pop() || `product-${idx}.jpg`,
        alt: `${p.name} - SKU: ${p.sku} view ${idx + 1}`
      })),
      ogTitle: seoTitle,
      ogDescription: p.description,
      ogImage: prodImg,
      ogType: 'product',
      twitterCard: 'summary_large_image',
      twitterTitle: seoTitle,
      twitterDescription: p.description,
      twitterImage: prodImg,
      schemaType: 'Product',
      jsonLd: generateDefaultSchema('product', p.name, prodPath, p.description, prodImg),
      customMetaTags: [],
      hreflang: [{ lang: 'en', href: `${BASE_URL}${prodPath}` }],
      internalLinks: [
        { id: `il-cat-${p.category}`, targetPath: `/category/${p.category}`, anchorText: 'Browse Category' },
        { id: 'il-bulk', targetPath: '/bulk-enquiry', anchorText: 'Wholesale Quotation' }
      ],
      status: 'published',
      lastUpdated: now,
      lastPublished: now
    });
  });

  // 4. Journal / Blog Articles from JOURNAL_ARTICLES
  JOURNAL_ARTICLES.forEach(art => {
    const artPath = `/blog/${art.slug}`;
    const seoTitle = `Ramam Textiles • ${art.title}`;
    pages.push({
      path: artPath,
      pageName: art.title,
      pageType: 'article',
      focusKeyword: `${art.category.toLowerCase()} Jaipur textiles guide`,
      secondaryKeywords: art.tags || ['Jaipur textiles guide', 'hand block print tips'],
      searchIntent: 'informational',
      pageTitle: art.title,
      seoTitle,
      metaDescription: art.excerpt,
      urlSlug: art.slug,
      canonicalUrl: `${BASE_URL}${artPath}`,
      robotsDirectives: 'index, follow',
      isIndexable: true,
      isFollowable: true,
      h1: art.title,
      h2s: (art.contentSections || []).slice(0, 3).map(s => s.heading || 'Craft Guide Section'),
      h3s: ['Technical Yarn Counts', 'Natural Indigo Chemistry', 'Atelier Finishing Standards'],
      images: [
        {
          src: art.coverImage,
          filename: art.coverImage.split('/').pop() || 'article-cover.jpg',
          alt: `${art.title} technical textile guide Jaipur`
        }
      ],
      ogTitle: seoTitle,
      ogDescription: art.excerpt,
      ogImage: art.coverImage,
      ogType: 'article',
      twitterCard: 'summary_large_image',
      twitterTitle: seoTitle,
      twitterDescription: art.excerpt,
      twitterImage: art.coverImage,
      schemaType: 'BlogPosting',
      jsonLd: generateDefaultSchema('article', art.title, artPath, art.excerpt, art.coverImage),
      customMetaTags: [],
      hreflang: [{ lang: 'en', href: `${BASE_URL}${artPath}` }],
      internalLinks: [
        { id: 'il-blog-index', targetPath: '/blog', anchorText: 'Artisan Journal Index' },
        { id: 'il-shop', targetPath: '/shop', anchorText: 'Shop Quilted Bags' }
      ],
      status: 'published',
      lastUpdated: now,
      lastPublished: now
    });
  });

  return pages;
}

// In-memory cache of factory pages
let cachedFactoryPages: PageSEOData[] | null = null;
function getFactoryPages(): PageSEOData[] {
  if (!cachedFactoryPages) {
    cachedFactoryPages = buildFactoryPages();
  }
  return cachedFactoryPages;
}

/**
 * Normalizes paths for matching (e.g. removes trailing slashes, hashes)
 */
export function normalizePath(path: string): string {
  if (!path) return '/';
  let p = path.trim();
  if (p.startsWith('#/')) p = p.substring(1);
  if (p.startsWith('#')) p = '/' + p.substring(1);
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/**
 * Loads published overrides from localStorage
 */
export function getPublishedOverrides(): Record<string, PageSEOData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PUBLISHED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load published SEO overrides:', e);
    return {};
  }
}

/**
 * Loads draft overrides from localStorage
 */
export function getDraftOverrides(): Record<string, PageSEOData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(DRAFTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load draft SEO overrides:', e);
    return {};
  }
}

/**
 * Loads SEO audit change history from localStorage
 */
export function getSEOChangeHistory(): SEOChangeHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load SEO change history:', e);
    return [];
  }
}

/**
 * Loads global SEO settings
 */
export function getSEOSettings(): SEOSettings {
  if (typeof window === 'undefined') return DEFAULT_SEO_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? { ...DEFAULT_SEO_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SEO_SETTINGS;
  } catch (e) {
    return DEFAULT_SEO_SETTINGS;
  }
}

/**
 * Saves global SEO settings
 */
export function saveSEOSettings(settings: SEOSettings, user = 'Admin'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    recordHistory({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      timestamp: new Date().toISOString(),
      user,
      path: 'GLOBAL_SETTINGS',
      pageName: 'Global SEO Settings',
      field: 'Global Config',
      previousValue: 'Settings Updated',
      newValue: 'Settings Updated',
      status: 'published'
    });
  } catch (e) {
    console.error('Failed to save SEO settings:', e);
  }
}

/**
 * Records an entry into the audit trail
 */
function recordHistory(item: SEOChangeHistoryItem): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getSEOChangeHistory();
    const updated = [item, ...current].slice(0, 200); // retain last 200 entries
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to record history:', e);
  }
}

/**
 * Retrieves all pages with published & draft overrides merged
 */
export function getAllPagesSEO(): PageSEOData[] {
  const factory = getFactoryPages();
  const published = getPublishedOverrides();
  const drafts = getDraftOverrides();

  return factory.map(page => {
    const key = normalizePath(page.path);
    const pub = published[key];
    const draft = drafts[key];

    if (draft) {
      return { ...page, ...draft, hasUnsavedChanges: true, status: 'draft' };
    }
    if (pub) {
      return { ...page, ...pub, hasUnsavedChanges: false, status: 'published' };
    }
    return { ...page, hasUnsavedChanges: false, status: 'published' };
  });
}

/**
 * Retrieves a specific page's SEO record
 */
export function getPageSEO(path: string): PageSEOData | null {
  const key = normalizePath(path);
  const all = getAllPagesSEO();
  return all.find(p => normalizePath(p.path) === key) || null;
}

/**
 * Retrieves ONLY the published record for public website consumption
 */
export function getPublishedSEORecord(path: string): PageSEOData | null {
  const key = normalizePath(path);
  const published = getPublishedOverrides();
  if (published[key]) {
    return published[key];
  }
  const factory = getFactoryPages();
  return factory.find(p => normalizePath(p.path) === key) || null;
}

/**
 * Saves draft changes without publishing to live public site
 */
export function saveDraftSEO(path: string, data: Partial<PageSEOData>, user = 'Admin'): PageSEOData {
  const key = normalizePath(path);
  const existing = getPageSEO(key) || getFactoryPages()[0];
  const drafts = getDraftOverrides();

  const updated: PageSEOData = {
    ...existing,
    ...data,
    path: key,
    status: 'draft',
    hasUnsavedChanges: true,
    lastUpdated: new Date().toISOString(),
    updatedBy: user
  };

  drafts[key] = updated;
  if (typeof window !== 'undefined') {
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  }

  recordHistory({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    timestamp: new Date().toISOString(),
    user,
    path: key,
    pageName: updated.pageName,
    field: 'Draft Saved',
    previousValue: existing.seoTitle,
    newValue: updated.seoTitle,
    status: 'draft'
  });

  return updated;
}

/**
 * Publishes SEO changes live to public-facing pages and syncs storage
 */
export function publishSEO(path: string, data: Partial<PageSEOData>, user = 'Admin'): PageSEOData {
  const key = normalizePath(path);
  const existing = getPageSEO(key) || getFactoryPages()[0];
  const published = getPublishedOverrides();
  const drafts = getDraftOverrides();

  const now = new Date().toISOString();
  const updated: PageSEOData = {
    ...existing,
    ...data,
    path: key,
    status: 'published',
    hasUnsavedChanges: false,
    lastUpdated: now,
    lastPublished: now,
    updatedBy: user
  };

  published[key] = updated;
  delete drafts[key];

  if (typeof window !== 'undefined') {
    localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(published));
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  }

  recordHistory({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    timestamp: now,
    user,
    path: key,
    pageName: updated.pageName,
    field: 'Published SEO Settings',
    previousValue: existing.seoTitle,
    newValue: updated.seoTitle,
    status: 'published'
  });

  return updated;
}

/**
 * Discards uncommitted draft and reverts to last published
 */
export function discardDraft(path: string): PageSEOData | null {
  const key = normalizePath(path);
  const drafts = getDraftOverrides();
  if (drafts[key]) {
    delete drafts[key];
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    }
  }
  return getPageSEO(key);
}

/**
 * Resets a page completely to the initial factory code defaults
 */
export function resetToDefault(path: string, user = 'Admin'): PageSEOData | null {
  const key = normalizePath(path);
  const published = getPublishedOverrides();
  const drafts = getDraftOverrides();

  delete published[key];
  delete drafts[key];

  if (typeof window !== 'undefined') {
    localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(published));
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  }

  recordHistory({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    timestamp: new Date().toISOString(),
    user,
    path: key,
    pageName: 'Page Reset',
    field: 'Reset to Factory Defaults',
    previousValue: 'Custom Overrides',
    newValue: 'Default Code Config',
    status: 'published'
  });

  return getPageSEO(key);
}

/**
 * Restores a specific historic change from the audit log
 */
export function rollbackChange(historyId: string, user = 'Admin'): boolean {
  const history = getSEOChangeHistory();
  const target = history.find(h => h.id === historyId);
  if (!target || target.path === 'GLOBAL_SETTINGS') return false;

  const current = getPageSEO(target.path);
  if (!current) return false;

  // Apply change
  const field = target.field as keyof PageSEOData;
  if (field in current) {
    const updated = { ...current, [field]: target.previousValue };
    publishSEO(target.path, updated, `${user} (Rollback)`);
    return true;
  }
  return false;
}

/**
 * Validates a single page against 16+ on-page SEO best practices
 * Calculates a transparent quality indicator score (0–100)
 */
export function validatePageSEO(page: PageSEOData): PageAuditReport {
  const issues: SEOValidationIssue[] = [];
  let score = 100;

  // 1. Title Checks
  if (!page.seoTitle || page.seoTitle.trim().length === 0) {
    issues.push({
      id: 'title-missing',
      code: 'TITLE_MISSING',
      level: 'error',
      category: 'title',
      message: 'Missing SEO Title tag (<title>)',
      suggestion: 'Add an explicit, descriptive SEO title between 50 and 60 characters.'
    });
    score -= 20;
  } else {
    const tLen = page.seoTitle.trim().length;
    if (tLen < 30) {
      issues.push({
        id: 'title-short',
        code: 'TITLE_TOO_SHORT',
        level: 'warning',
        category: 'title',
        message: `SEO title is short (${tLen} chars)`,
        suggestion: 'Expand title to 50–60 characters with primary focus keyword and brand.'
      });
      score -= 5;
    } else if (tLen > 65) {
      issues.push({
        id: 'title-long',
        code: 'TITLE_TOO_LONG',
        level: 'warning',
        category: 'title',
        message: `SEO title may truncate in SERP (${tLen} chars, max recommended ~60)`,
        suggestion: 'Keep title around 50–60 characters to prevent ellipsis (...) cut-off on Google.'
      });
      score -= 5;
    }
  }

  // 2. Meta Description Checks
  if (!page.metaDescription || page.metaDescription.trim().length === 0) {
    issues.push({
      id: 'desc-missing',
      code: 'DESCRIPTION_MISSING',
      level: 'error',
      category: 'description',
      message: 'Missing Meta Description',
      suggestion: 'Provide a compelling 140–160 character snippet with clear user value.'
    });
    score -= 15;
  } else {
    const dLen = page.metaDescription.trim().length;
    if (dLen < 70) {
      issues.push({
        id: 'desc-short',
        code: 'DESCRIPTION_TOO_SHORT',
        level: 'warning',
        category: 'description',
        message: `Meta description is short (${dLen} chars)`,
        suggestion: 'Aim for 140–160 characters to maximize SERP visual engagement.'
      });
      score -= 5;
    } else if (dLen > 165) {
      issues.push({
        id: 'desc-long',
        code: 'DESCRIPTION_TOO_LONG',
        level: 'warning',
        category: 'description',
        message: `Meta description may be truncated on mobile SERP (${dLen} chars)`,
        suggestion: 'Trim description to roughly 155–160 characters.'
      });
      score -= 4;
    }
  }

  // 3. Focus Keyword Usage Checks
  if (!page.focusKeyword || page.focusKeyword.trim().length === 0) {
    issues.push({
      id: 'kw-missing',
      code: 'FOCUS_KEYWORD_MISSING',
      level: 'warning',
      category: 'keywords',
      message: 'No primary focus keyword assigned',
      suggestion: 'Assign a targeted commercial or informational search phrase.'
    });
    score -= 10;
  } else {
    const kw = page.focusKeyword.trim().toLowerCase();
    const titleLower = (page.seoTitle || '').toLowerCase();
    const descLower = (page.metaDescription || '').toLowerCase();
    const h1Lower = (page.h1 || '').toLowerCase();

    if (!titleLower.includes(kw)) {
      issues.push({
        id: 'kw-not-in-title',
        code: 'KEYWORD_NOT_IN_TITLE',
        level: 'warning',
        category: 'keywords',
        message: 'Focus keyword does not appear in SEO Title',
        suggestion: `Include "${page.focusKeyword}" naturally near the beginning of your title.`
      });
      score -= 6;
    }

    if (!descLower.includes(kw)) {
      issues.push({
        id: 'kw-not-in-desc',
        code: 'KEYWORD_NOT_IN_DESCRIPTION',
        level: 'info',
        category: 'keywords',
        message: 'Focus keyword not detected in Meta Description',
        suggestion: `Weave "${page.focusKeyword}" naturally into the description snippet.`
      });
      score -= 3;
    }

    if (!h1Lower.includes(kw)) {
      issues.push({
        id: 'kw-not-in-h1',
        code: 'KEYWORD_NOT_IN_H1',
        level: 'info',
        category: 'keywords',
        message: 'Focus keyword not present in primary H1 heading',
        suggestion: 'Align page H1 headline with target search intent.'
      });
      score -= 3;
    }
  }

  // 4. Headings Hierarchy Checks
  if (!page.h1 || page.h1.trim().length === 0) {
    issues.push({
      id: 'h1-missing',
      code: 'H1_MISSING',
      level: 'error',
      category: 'headings',
      message: 'Missing primary H1 headline',
      suggestion: 'Ensure the page renders exactly one descriptive <h1> element.'
    });
    score -= 12;
  }

  // 5. Canonical URL Checks
  if (!page.canonicalUrl || page.canonicalUrl.trim().length === 0) {
    issues.push({
      id: 'canonical-missing',
      code: 'CANONICAL_MISSING',
      level: 'error',
      category: 'canonical',
      message: 'Missing Canonical URL',
      suggestion: 'Set self-referencing canonical URL: https://ramamtextiles.shop' + page.path
    });
    score -= 10;
  } else if (!page.canonicalUrl.startsWith('https://')) {
    issues.push({
      id: 'canonical-non-https',
      code: 'CANONICAL_NON_HTTPS',
      level: 'error',
      category: 'canonical',
      message: 'Canonical URL must use secure https:// protocol',
      suggestion: 'Update canonical link protocol to https://.'
    });
    score -= 10;
  }

  // 6. Robots Directives
  if (page.robotsDirectives.includes('noindex') && page.pageType !== 'legal') {
    issues.push({
      id: 'accidental-noindex',
      code: 'ACCIDENTAL_NOINDEX',
      level: 'warning',
      category: 'robots',
      message: 'Page marked as "noindex" — hidden from Google search results',
      suggestion: 'If this page should generate organic search traffic, switch robots to "index, follow".'
    });
    score -= 15;
  }

  // 7. Image Alt Text Checks
  if (page.images && page.images.length > 0) {
    const missingAlt = page.images.filter(img => !img.alt || img.alt.trim().length === 0);
    if (missingAlt.length > 0) {
      issues.push({
        id: 'images-missing-alt',
        code: 'IMAGE_ALT_MISSING',
        level: 'warning',
        category: 'images',
        message: `${missingAlt.length} image(s) missing descriptive alt text`,
        suggestion: 'Add meaningful alt attributes describing the textile product, motif, and craft.'
      });
      score -= Math.min(10, missingAlt.length * 3);
    }
  }

  // 8. Structured Data Validation
  if (!page.jsonLd || page.jsonLd.trim().length === 0) {
    issues.push({
      id: 'schema-missing',
      code: 'SCHEMA_MISSING',
      level: 'info',
      category: 'schema',
      message: 'No Structured Data (JSON-LD) configured',
      suggestion: 'Add rich snippet schema (Product, BlogPosting, or Organization).'
    });
    score -= 4;
  } else {
    try {
      JSON.parse(page.jsonLd);
    } catch (e: any) {
      issues.push({
        id: 'schema-invalid-json',
        code: 'SCHEMA_INVALID_JSON',
        level: 'error',
        category: 'schema',
        message: `JSON-LD syntax error: ${e.message}`,
        suggestion: 'Correct JSON syntax formatting in the Structured Data editor.'
      });
      score -= 15;
    }
  }

  // 9. Open Graph & Social Cards
  if (!page.ogImage || page.ogImage.trim().length === 0) {
    issues.push({
      id: 'og-image-missing',
      code: 'OG_IMAGE_MISSING',
      level: 'info',
      category: 'images',
      message: 'Missing Open Graph share image (og:image)',
      suggestion: 'Assign a luxury product photograph (1200x630px recommended).'
    });
    score -= 3;
  }

  // 10. Internal Links Check
  if (!page.internalLinks || page.internalLinks.length === 0) {
    issues.push({
      id: 'internal-links-low',
      code: 'INTERNAL_LINKS_LOW',
      level: 'info',
      category: 'links',
      message: 'Page has zero configured manual internal link pathways',
      suggestion: 'Link to related categories, wholesale quotation, or craft guides.'
    });
    score -= 4;
  }

  // External checks (clearly marked)
  issues.push({
    id: 'ext-google-index',
    code: 'GOOGLE_INDEX_STATUS',
    level: 'info',
    category: 'robots',
    message: 'Googlebot Indexation & Impression Performance',
    suggestion: 'Query Google Search Console API or URL Inspection Tool for real-time live index status.',
    isExternalCheck: true
  });

  const finalScore = Math.max(0, Math.min(100, Math.round(score)));
  const errorsCount = issues.filter(i => i.level === 'error').length;
  const warningsCount = issues.filter(i => i.level === 'warning').length;
  const passedCount = 15 - (errorsCount + warningsCount);

  return {
    path: page.path,
    score: finalScore,
    errorsCount,
    warningsCount,
    passedCount: Math.max(0, passedCount),
    issues
  };
}

/**
 * Runs site-wide audit across all pages
 */
export function runSiteWideAudit(): {
  summary: SiteWideAuditSummary;
  pageReports: Record<string, PageAuditReport>;
} {
  const pages = getAllPagesSEO();
  const pageReports: Record<string, PageAuditReport> = {};

  let missingTitles = 0;
  let missingDescriptions = 0;
  let missingCanonicals = 0;
  let missingAltTexts = 0;
  let pagesWithErrors = 0;
  let pagesWithWarnings = 0;
  let indexedPages = 0;
  let noindexPages = 0;
  let totalScore = 0;
  let totalImages = 0;
  let imagesMissingAlt = 0;

  // Title uniqueness tracking
  const titleCounts: Record<string, number> = {};
  pages.forEach(p => {
    if (p.seoTitle) {
      const normalized = p.seoTitle.trim().toLowerCase();
      titleCounts[normalized] = (titleCounts[normalized] || 0) + 1;
    }
  });
  let duplicateTitles = 0;
  Object.values(titleCounts).forEach(c => {
    if (c > 1) duplicateTitles += c;
  });

  pages.forEach(page => {
    const report = validatePageSEO(page);
    pageReports[page.path] = report;
    totalScore += report.score;

    if (!page.seoTitle || page.seoTitle.trim().length === 0) missingTitles++;
    if (!page.metaDescription || page.metaDescription.trim().length === 0) missingDescriptions++;
    if (!page.canonicalUrl || page.canonicalUrl.trim().length === 0) missingCanonicals++;

    if (page.images && page.images.length > 0) {
      totalImages += page.images.length;
      const missing = page.images.filter(img => !img.alt || img.alt.trim().length === 0);
      if (missing.length > 0) {
        missingAltTexts++;
        imagesMissingAlt += missing.length;
      }
    }

    if (page.robotsDirectives.includes('noindex')) {
      noindexPages++;
    } else {
      indexedPages++;
    }

    if (report.errorsCount > 0) pagesWithErrors++;
    if (report.warningsCount > 0) pagesWithWarnings++;
  });

  // Calculate orphan pages (inbound links < 1)
  const inboundMap: Record<string, number> = {};
  pages.forEach(p => {
    (p.internalLinks || []).forEach(link => {
      const target = normalizePath(link.targetPath);
      inboundMap[target] = (inboundMap[target] || 0) + 1;
    });
  });
  let orphanPages = 0;
  pages.forEach(p => {
    const target = normalizePath(p.path);
    if (!inboundMap[target] && p.path !== '/') orphanPages++;
  });

  const summary: SiteWideAuditSummary = {
    totalPages: pages.length,
    indexedPages,
    noindexPages,
    missingTitles,
    duplicateTitles,
    missingDescriptions,
    missingCanonicals,
    missingAltTexts,
    pagesWithErrors,
    pagesWithWarnings,
    averageHealthScore: pages.length > 0 ? Math.round(totalScore / pages.length) : 100,
    orphanPages,
    totalImages,
    imagesMissingAlt
  };

  return { summary, pageReports };
}

/**
 * Exports all published and draft SEO overrides as JSON
 */
export function exportSEOData(): string {
  const published = getPublishedOverrides();
  const drafts = getDraftOverrides();
  const settings = getSEOSettings();
  const history = getSEOChangeHistory();

  return JSON.stringify({
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    settings,
    published,
    drafts,
    history
  }, null, 2);
}

/**
 * Exports published overrides dictionary directly formatted for public/seo-published.json
 */
export function exportPublishedOverridesForBuild(): string {
  const published = getPublishedOverrides();
  return JSON.stringify(published, null, 2);
}

/**
 * Imports SEO data from JSON backup
 */
export function importSEOData(jsonString: string, user = 'Admin'): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.published || typeof parsed.published !== 'object') {
      return { success: false, message: 'Invalid SEO backup JSON format.' };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(parsed.published));
      if (parsed.drafts) localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(parsed.drafts));
      if (parsed.settings) localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(parsed.settings));
      if (parsed.history) localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(parsed.history));
    }

    recordHistory({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      timestamp: new Date().toISOString(),
      user,
      path: 'BACKUP_RESTORE',
      pageName: 'SEO Data Restore',
      field: 'Full Import',
      previousValue: 'Previous State',
      newValue: 'Imported State',
      status: 'published'
    });

    return { success: true, message: `Successfully imported SEO configurations.` };
  } catch (e: any) {
    return { success: false, message: `Import error: ${e.message}` };
  }
}
