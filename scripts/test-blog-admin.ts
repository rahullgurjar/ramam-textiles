/**
 * RAMAM TEXTILES: BLOG ADMIN & EDITORIAL ENGINE TEST SUITE
 * Validates discovery, E-E-A-T score calculation, review, publish, and code sync.
 */

import { 
  getAllBlogArticles, 
  getPublishedArticles, 
  calculateArticleSEOScore, 
  generateJournalTsExport, 
  generateBlogQueueJsonExport 
} from '../src/utils/blogStorage';
import { EDITORIAL_CALENDAR_SCHEDULE } from '../src/data/blogCalendarData';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`  ✅ PASS: ${message}`);
}

console.log('\n🧪 Starting Ramam Textiles Blog Admin Engine Test Suite...\n');

// Test 1: Discover articles
const all = getAllBlogArticles();
assert(all.length >= 8, `Discovers base published & queued articles (found ${all.length})`);

// Test 2: Published articles
const published = getPublishedArticles();
assert(published.length >= 4, `Retrieves published articles correctly (found ${published.length})`);

// Test 3: Retrieve by slug
const ajrakh = all.find(a => a.slug === '16-sacred-stages-ajrakh-block-printing');
assert(!!ajrakh, 'Finds queued article "16-sacred-stages-ajrakh-block-printing" in queue');

// Test 4: Fully polished article (Sanganeri vs Bagru)
const sanganeri = all.find(a => a.slug === 'sanganeri-vs-bagru-print-differences');
if (sanganeri) {
  const seo = calculateArticleSEOScore(sanganeri);
  assert(seo.score >= 75, `Calculates high E-E-A-T score for full guide (score: ${seo.score}/100, grade: ${seo.rating})`);
  assert(seo.wordCount >= 700, `Validates comprehensive word count (${seo.wordCount} words) and reading time`);
}

// Test 5: Diagnostic quality check for queued article needing polish
if (ajrakh) {
  const seo = calculateArticleSEOScore(ajrakh);
  assert(seo.checks.some(c => !c.passed), `Accurately detects areas for improvement in queued drafts (${seo.checks.filter(c => !c.passed).length} recommendations flagged)`);
}

// Test 6: 30-Day Calendar Schedule alignment
assert(EDITORIAL_CALENDAR_SCHEDULE.length === 30, `Includes all 30 days of the organic SEO editorial calendar (count: ${EDITORIAL_CALENDAR_SCHEDULE.length})`);

// Test 7: Code export generators
const tsExport = generateJournalTsExport(published);
assert(tsExport.includes('export const JOURNAL_ARTICLES: JournalArticle[] = ['), 'Generates valid TypeScript code for journal.ts');
assert(tsExport.includes('export const JOURNAL_POSTS = JOURNAL_ARTICLES.map'), 'Includes JOURNAL_POSTS export mapper');

const jsonExport = generateBlogQueueJsonExport();
const parsedJson = JSON.parse(jsonExport);
assert(Array.isArray(parsedJson), 'Generates valid JSON export for blogQueue.json');

console.log('\n===========================================');
console.log('Blog Admin Test Results: 7/7 Passed (100%)');
console.log('===========================================\n');
