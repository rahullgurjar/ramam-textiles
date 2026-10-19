import https from 'https';

function check(url) {
  return new Promise((resolve) => {
    const req = https.get(url + '?nocache=' + Date.now(), { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/);
        const canonMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/);
        const hasSchema = data.includes('application/ld+json');
        const hasSemanticH1 = data.includes('<h1');
        resolve({
          url,
          statusCode: res.statusCode,
          location: res.headers.location || null,
          title: titleMatch ? titleMatch[1] : 'No title',
          canonical: canonMatch ? canonMatch[1] : 'No canonical',
          hasSchema,
          hasSemanticH1,
          length: data.length
        });
      });
    });
    req.on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  const testUrls = [
    'https://ramamtextiles.shop/',
    'https://ramamtextiles.shop/shop',
    'https://ramamtextiles.shop/shop/',
    'https://ramamtextiles.shop/category/bags',
    'https://ramamtextiles.shop/category/bags/',
    'https://ramamtextiles.shop/product/jaipur-quilted-playing-card-vanity-pouch',
    'https://ramamtextiles.shop/product/jaipur-quilted-playing-card-vanity-pouch/',
    'https://ramamtextiles.shop/about',
    'https://ramamtextiles.shop/blog',
    'https://ramamtextiles.shop/blog/',
    'https://ramamtextiles.shop/blog/alchemy-of-bagru-dabu-indigo',
    'https://ramamtextiles.shop/blogs',
    'https://ramamtextiles.shop/journal/alchemy-of-bagru-dabu-indigo'
  ];

  for (const u of testUrls) {
    const r = await check(u);
    console.log('----------------------------------------------------');
    console.log('URL:       ', r.url);
    console.log('Status:    ', r.statusCode);
    if (r.location) console.log('Redirect:  ', r.location);
    console.log('Title:     ', r.title);
    console.log('Canonical: ', r.canonical);
    console.log('Schema.org:', r.hasSchema);
    console.log('Semantic H1:', r.hasSemanticH1);
  }
}

run();
