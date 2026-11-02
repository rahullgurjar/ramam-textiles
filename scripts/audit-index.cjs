const fs = require('fs');

function auditHtml(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf-8');
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc = (html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) || [])[1] || '';
  
  // Extract seo-static-container
  let containerText = '';
  if (html.includes('id="seo-static-container"')) {
    const start = html.indexOf('id="seo-static-container"');
    const end = html.indexOf('</main>');
    containerText = html.substring(start, end > start ? end + 7 : html.length);
  } else {
    containerText = (html.match(/<div id=["']root["'][^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '';
  }
  
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].trim());
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].trim());
  const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  
  // Word count (strip tags)
  const plainText = containerText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(' ').filter(Boolean).length : 0;

  console.log(`\n========================================`);
  console.log(`Audit for: ${filePath}`);
  console.log(`========================================`);
  console.log(`Title (${title.length} chars): "${title}"`);
  console.log(`Title <= 60 chars? ${title.length <= 60 ? '✅ YES' : '❌ NO'}`);
  console.log(`Meta Desc (${desc.length} chars): "${desc}"`);
  console.log(`Meta Desc <= 155 chars? ${desc.length <= 155 ? '✅ YES' : '❌ NO'}`);
  console.log(`H1 count: ${h1s.length} ${h1s.length >= 1 ? '✅ PASS' : '❌ FAIL'}`);
  h1s.forEach((h, i) => console.log(`  H1 [${i+1}]: "${h}"`));
  console.log(`H2 count: ${h2s.length} ${h2s.length >= 1 ? '✅ PASS' : '❌ FAIL'}`);
  h2s.forEach((h, i) => console.log(`  H2 [${i+1}]: "${h}"`));
  console.log(`Internal Links count: ${links.length} ${links.length >= 1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Word count in main content: ${wordCount} ${wordCount >= 200 ? '✅ PASS (>= 200)' : '❌ FAIL (< 200)'}`);
}

auditHtml('D:/Ramam Textiles/index.html');
auditHtml('D:/Ramam Textiles/dist/index.html');
