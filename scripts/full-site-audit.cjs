const fs = require('fs');
const path = require('path');

const distDir = 'D:/Ramam Textiles/dist';
const files = [];

function getHtmlFiles(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'assets') getHtmlFiles(full);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  }
}
getHtmlFiles(distDir);

console.log('Total HTML entrypoints found in dist:', files.length);

const issues = {
  titleOver60: [],
  metaOver155: [],
  h1Missing: [],
  h1Multiple: [],
  h2Missing: [],
  lowContent: [],
  linksMissing: [],
  imagesWithoutAlt: [],
  brokenLinks: []
};

const allValidRoutes = new Set();
files.forEach(f => {
  let rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel.endsWith('/index.html')) {
    allValidRoutes.add('/' + rel.slice(0, -11));
  } else if (rel === 'index.html') {
    allValidRoutes.add('/');
  } else if (rel.endsWith('.html')) {
    allValidRoutes.add('/' + rel.slice(0, -5));
  }
});

for (const f of files) {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  // Skip duplicate cleanRoute.html if cleanRoute/index.html exists
  if (rel !== 'index.html' && rel.endsWith('.html') && !rel.endsWith('/index.html')) {
    const dirEquivalent = rel.slice(0, -5) + '/index.html';
    if (files.includes(path.join(distDir, dirEquivalent))) continue;
  }

  const html = fs.readFileSync(f, 'utf-8');
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc = (html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].trim());
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].trim());
  const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  const imgs = [...html.matchAll(/<img\s+([^>]*?)>/gi)].map(m => m[1]);

  // Words inside <main> or <body>
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i) || html.match(/<body[\s\S]*?<\/body>/i);
  const plainText = mainMatch ? mainMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const words = plainText ? plainText.split(' ').filter(Boolean).length : 0;

  if (title.length > 60) issues.titleOver60.push({ rel, title, len: title.length });
  if (desc.length > 155) issues.metaOver155.push({ rel, desc, len: desc.length });
  if (h1s.length === 0) issues.h1Missing.push(rel);
  if (h1s.length > 1) issues.h1Multiple.push({ rel, count: h1s.length });
  if (h2s.length === 0) issues.h2Missing.push(rel);
  if (words < 200) issues.lowContent.push({ rel, words });
  if (links.length === 0) issues.linksMissing.push(rel);

  for (const imgTag of imgs) {
    if (!imgTag.includes('alt=') || /alt=["']\s*["']/.test(imgTag)) {
      issues.imagesWithoutAlt.push({ rel, imgTag });
    }
  }

  // Check internal links
  for (const link of links) {
    if (link.startsWith('/') && !link.startsWith('//') && !link.includes('#') && !link.includes('?')) {
      const cleanLink = link.replace(/\/$/, '') || '/';
      if (!allValidRoutes.has(cleanLink) && cleanLink !== '/staff' && cleanLink !== '/admin') {
        issues.brokenLinks.push({ rel, link });
      }
    }
  }
}

console.log('\n======================================================');
console.log('   FULL SCREAMING FROG SIMULATED AUDIT REPORT');
console.log('   Target: D:/Ramam Textiles (ramamtextiles.shop)');
console.log('======================================================\n');

console.log(`1. Page Titles > 60 chars: ${issues.titleOver60.length}`);
issues.titleOver60.forEach(x => console.log(`   - [${x.len} chars] ${x.rel}: "${x.title}"`));

console.log(`\n2. Meta Descriptions > 155 chars: ${issues.metaOver155.length}`);
issues.metaOver155.forEach(x => console.log(`   - [${x.len} chars] ${x.rel}: "${x.desc}"`));

console.log(`\n3. H1 Missing: ${issues.h1Missing.length}`);
issues.h1Missing.forEach(x => console.log(`   - ${x}`));

console.log(`\n4. Multiple H1s: ${issues.h1Multiple.length}`);
issues.h1Multiple.forEach(x => console.log(`   - ${x.rel} (count: ${x.count})`));

console.log(`\n5. H2 Missing: ${issues.h2Missing.length}`);
issues.h2Missing.forEach(x => console.log(`   - ${x}`));

console.log(`\n6. Low Content (< 200 words): ${issues.lowContent.length}`);
issues.lowContent.forEach(x => console.log(`   - [${x.words} words] ${x.rel}`));

console.log(`\n7. Pages Without Internal Links: ${issues.linksMissing.length}`);
issues.linksMissing.forEach(x => console.log(`   - ${x}`));

console.log(`\n8. Images Missing Alt: ${issues.imagesWithoutAlt.length}`);
issues.imagesWithoutAlt.forEach(x => console.log(`   - ${x.rel}: ${x.imgTag}`));

console.log(`\n9. Broken Internal Links (Potential 404s): ${issues.brokenLinks.length}`);
issues.brokenLinks.forEach(x => console.log(`   - ${x.rel} -> ${x.link}`));

