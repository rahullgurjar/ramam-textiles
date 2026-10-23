import { getPageSEO, validatePageSEO, runSiteWideAudit } from '../src/utils/seoStorage';
import { SEO_CLUSTERS } from '../src/data/seoClusters';

console.log('--- AUDITING 6 CLUSTER PAGES ---');
Object.values(SEO_CLUSTERS).forEach(c => {
  const page = getPageSEO(c.path);
  if (!page) {
    console.error('MISSING:', c.path);
    return;
  }
  const report = validatePageSEO(page);
  console.log(`\nPage: ${page.path} (${page.focusKeyword})`);
  console.log(`Score: ${report.score}/100 | Errors: ${report.errorsCount} | Warnings: ${report.warningsCount}`);
  if (report.issues.length > 0) {
    report.issues.forEach(i => console.log(`  [${i.level.toUpperCase()}] ${i.category}: ${i.message}`));
  }
});

const audit = runSiteWideAudit();
console.log('\n--- SITE WIDE AUDIT SUMMARY ---');
console.log('Total pages:', audit.summary.totalPages);
console.log('Avg Health Score:', audit.summary.averageHealthScore);
console.log('Indexed pages:', audit.summary.indexedPages);
console.log('Pages with errors:', audit.summary.pagesWithErrors);
console.log('Pages with warnings:', audit.summary.pagesWithWarnings);
