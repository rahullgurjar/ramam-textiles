import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllPagesSEO } from '../src/utils/seoStorage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const targetFile = path.join(rootDir, 'public', 'seo-published.json');

const pages = getAllPagesSEO();
const publishedMap: Record<string, any> = {};

pages.forEach(p => {
  publishedMap[p.path] = {
    path: p.path,
    pageName: p.pageName,
    pageType: p.pageType,
    focusKeyword: p.focusKeyword,
    secondaryKeywords: p.secondaryKeywords,
    searchIntent: p.searchIntent,
    pageTitle: p.pageTitle,
    seoTitle: p.seoTitle,
    metaDescription: p.metaDescription,
    urlSlug: p.urlSlug,
    canonicalUrl: p.canonicalUrl,
    robotsDirectives: p.robotsDirectives,
    isIndexable: p.isIndexable,
    isFollowable: p.isFollowable,
    h1: p.h1,
    h2s: p.h2s,
    h3s: p.h3s,
    images: p.images,
    ogTitle: p.ogTitle,
    ogDescription: p.ogDescription,
    ogImage: p.ogImage,
    ogType: p.ogType,
    twitterCard: p.twitterCard,
    twitterTitle: p.twitterTitle,
    twitterDescription: p.twitterDescription,
    twitterImage: p.twitterImage,
    schemaType: p.schemaType,
    schemaJson: p.jsonLd,
    internalLinks: p.internalLinks,
    status: 'published',
    lastUpdated: p.lastUpdated,
    lastPublished: p.lastPublished
  };
});

fs.writeFileSync(targetFile, JSON.stringify(publishedMap, null, 2), 'utf-8');
console.log(`✅ Successfully exported ${Object.keys(publishedMap).length} published SEO records to ${targetFile}`);
