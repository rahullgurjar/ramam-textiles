/**
 * Automated Test Suite for Ramam Textiles Manual SEO Admin Panel & Storage Engine
 * Run with: node scripts/test-seo.js
 */

import assert from 'assert';

console.log('🧪 Starting Ramam Textiles SEO Admin Panel Test Suite...\n');

// Mock localStorage & sessionStorage for Node.js test environment
const store = new Map();
global.localStorage = {
  getItem: (key) => store.get(key) || null,
  setItem: (key, val) => store.set(key, String(val)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear()
};
const sessionStore = new Map();
global.sessionStorage = {
  getItem: (key) => sessionStore.get(key) || null,
  setItem: (key, val) => sessionStore.set(key, String(val)),
  removeItem: (key) => sessionStore.delete(key),
  clear: () => sessionStore.clear()
};
global.window = {};

import { authenticateAdmin } from '../src/utils/adminAuth.ts';

// Import storage functions
import {
  getAllPagesSEO,
  getPageSEO,
  saveDraftSEO,
  publishSEO,
  discardDraft,
  resetToDefault,
  validatePageSEO,
  runSiteWideAudit,
  getSEOChangeHistory,
  rollbackChange,
  exportSEOData,
  importSEOData,
  exportPublishedOverridesForBuild
} from '../src/utils/seoStorage.ts';

let passed = 0;
let total = 0;

function it(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
  }
}

// 1. Initial State & Page Discovery
it('Discovers all real website routes (Home, Categories, Products, Journal, Static)', () => {
  const pages = getAllPagesSEO();
  assert(pages.length >= 35, `Expected at least 35 pages, found ${pages.length}`);
  
  const home = pages.find(p => p.path === '/');
  assert(home, 'Home page route "/" must exist');
  assert(home.pageType === 'home', 'Home page type must be "home"');

  const shop = pages.find(p => p.path === '/shop');
  assert(shop, 'Shop page "/shop" must exist');

  const products = pages.filter(p => p.pageType === 'product');
  assert(products.length >= 10, `Expected >= 10 products, found ${products.length}`);

  const articles = pages.filter(p => p.pageType === 'article');
  assert(articles.length >= 8, `Expected >= 8 articles, found ${articles.length}`);
});

// 2. Draft Save Workflow
it('Saves a draft without publishing to live site', () => {
  const targetPath = '/shop';
  const initial = getPageSEO(targetPath);
  assert(initial, 'Initial shop page must exist');

  const draftTitle = 'Test Custom Draft Title | Ramam Textiles';
  const updated = saveDraftSEO(targetPath, { seoTitle: draftTitle }, 'TestEditor');

  assert.strictEqual(updated.status, 'draft', 'Status should be draft');
  assert.strictEqual(updated.seoTitle, draftTitle, 'SEO title should match draft');
  assert.strictEqual(updated.hasUnsavedChanges, true, 'hasUnsavedChanges should be true');

  const reloaded = getPageSEO(targetPath);
  assert.strictEqual(reloaded.seoTitle, draftTitle, 'Reloaded draft must match');
});

// 3. Publishing Workflow
it('Publishes SEO changes and logs change history', () => {
  const targetPath = '/shop';
  const pubTitle = 'Handcrafted Jaipur Textile Catalog & Wholesale SKUs | Ramam Textiles';
  const pubDesc = 'Direct factory catalog for Jaipur hand block printed quilted duffles, vanity pouches, and apparel.';

  const published = publishSEO(targetPath, {
    seoTitle: pubTitle,
    metaDescription: pubDesc,
    canonicalUrl: 'https://ramamtextiles.shop/shop',
    robotsDirectives: 'index, follow'
  }, 'ChiefMarketingOfficer');

  assert.strictEqual(published.status, 'published', 'Status should be published');
  assert.strictEqual(published.hasUnsavedChanges, false, 'hasUnsavedChanges should be false');
  assert.strictEqual(published.seoTitle, pubTitle, 'Published title must match');

  // Verify History Log
  const history = getSEOChangeHistory();
  assert(history.length > 0, 'Change history must contain at least 1 entry');
  const lastEntry = history[0];
  assert.strictEqual(lastEntry.path, '/shop', 'History path must match');
  assert.strictEqual(lastEntry.status, 'published', 'History status must be published');
});

// 4. Discard Draft Workflow
it('Discards uncommitted drafts and reverts to last published', () => {
  const targetPath = '/shop';
  const beforeDraft = getPageSEO(targetPath);
  
  saveDraftSEO(targetPath, { seoTitle: 'Ephemeral Scratch Draft' }, 'Intern');
  const withDraft = getPageSEO(targetPath);
  assert.strictEqual(withDraft.seoTitle, 'Ephemeral Scratch Draft');

  const reverted = discardDraft(targetPath);
  assert.strictEqual(reverted.seoTitle, beforeDraft.seoTitle, 'Reverted title must match previous published title');
  assert.strictEqual(reverted.hasUnsavedChanges, false, 'hasUnsavedChanges must be false after discard');
});

// 5. 16-Point On-Page SEO Validator
it('Calculates transparent SEO quality indicator score and categorizes issues', () => {
  const mockBadPage = {
    path: '/bad-page',
    pageName: 'Bad SEO Page',
    pageType: 'product',
    urlSlug: 'bad-page',
    seoTitle: '', // Missing title
    metaDescription: '', // Missing description
    canonicalUrl: '', // Missing canonical
    focusKeyword: '', // Missing keyword
    secondaryKeywords: [],
    searchIntent: 'commercial',
    robotsDirectives: 'noindex, nofollow', // Danger: noindex
    h1: '', // Missing H1
    h2s: [],
    h3s: [],
    images: [{ src: '/bad.jpg', filename: 'bad.jpg', alt: '' }], // Missing alt
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    schemaType: 'Product',
    jsonLd: '{ invalid json }', // Corrupt JSON-LD
    customMetaTags: [],
    hreflang: [],
    internalLinks: [],
    status: 'draft',
    lastUpdated: new Date().toISOString()
  };

  const report = validatePageSEO(mockBadPage);
  assert(report.score < 50, `Score should be low for bad page (got ${report.score})`);
  assert(report.errorsCount >= 3, `Expected at least 3 errors, got ${report.errorsCount}`);
  
  const codes = report.issues.filter(i => i.level === 'error').map(e => e.code);
  assert(codes.includes('TITLE_MISSING'), 'Should catch TITLE_MISSING');
  assert(codes.includes('DESCRIPTION_MISSING'), 'Should catch DESCRIPTION_MISSING');
  assert(codes.includes('H1_MISSING'), 'Should catch H1_MISSING');
  assert(codes.includes('SCHEMA_INVALID_JSON'), 'Should catch SCHEMA_INVALID_JSON');
});

// 6. Site-Wide Technical Audit Engine
it('Executes site-wide technical audit and calculates average health score', () => {
  const audit = runSiteWideAudit();
  assert(audit.summary.totalPages >= 35, 'Total pages should be >= 35');
  assert(typeof audit.summary.averageHealthScore === 'number', 'Health score should be a number');
  assert(Object.keys(audit.pageReports).length === audit.summary.totalPages, 'Every page should have an audit report');
});

// 7. Backup Export & Import Integrity
it('Exports valid JSON backup and re-imports without data corruption', () => {
  const exported = exportSEOData();
  assert(typeof exported === 'string', 'Export must be a string');
  const parsed = JSON.parse(exported);
  assert(parsed.version === '1.0.0', 'Version should match');
  assert(typeof parsed.published === 'object', 'published overrides must exist');

  const buildOverrides = exportPublishedOverridesForBuild();
  const parsedBuild = JSON.parse(buildOverrides);
  assert(typeof parsedBuild === 'object', 'Build overrides must parse as valid JSON');

  const importResult = importSEOData(exported, 'TestImporter');
  assert.strictEqual(importResult.success, true, 'Import should succeed');
});

// 8. Authentication with new passkey "5557"
async function runAsyncTests() {
  total++;
  try {
    const authNew = await authenticateAdmin('5557');
    assert.strictEqual(authNew.success, true, '5557 must authenticate successfully');

    const authBackup = await authenticateAdmin('RamamTextiles@Jaipur2026');
    assert.strictEqual(authBackup.success, true, 'Backup passkey must authenticate successfully');

    const authBad = await authenticateAdmin('wrong_code_999');
    assert.strictEqual(authBad.success, false, 'Invalid password must be rejected');

    console.log(`  ✅ PASS: Authenticates successfully with new password "5557" and backup passkey`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: Authenticates successfully with new password "5557"`);
    console.error(`     ${err.message}`);
  }

  console.log(`\n===========================================`);
  console.log(`Test Results: ${passed}/${total} Passed (${Math.round((passed/total)*100)}%)`);
  console.log(`===========================================\n`);

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

await runAsyncTests();
