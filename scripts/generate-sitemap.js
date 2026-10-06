import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://ramamtextiles.shop';
const TODAY = new Date().toISOString().split('T')[0];

// Static Core Pages
const CORE_PAGES = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/shop', changefreq: 'daily', priority: '0.9' },
  { url: '/collections', changefreq: 'weekly', priority: '0.9' },
  { url: '/custom-manufacturing', changefreq: 'monthly', priority: '0.9' },
  { url: '/wholesale', changefreq: 'weekly', priority: '0.9' },
  { url: '/craftsmanship', changefreq: 'monthly', priority: '0.8' },
  { url: '/lookbook', changefreq: 'weekly', priority: '0.8' },
  { url: '/journal', changefreq: 'weekly', priority: '0.8' },
  { url: '/about', changefreq: 'monthly', priority: '0.7' },
  { url: '/contact', changefreq: 'monthly', priority: '0.7' },
  { url: '/faq', changefreq: 'monthly', priority: '0.6' },
  { url: '/track', changefreq: 'monthly', priority: '0.5' },
  { url: '/shipping-returns', changefreq: 'monthly', priority: '0.5' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
  { url: '/terms-conditions', changefreq: 'yearly', priority: '0.4' },
];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function extractQuotedField(text, fieldName) {
  const dq = text.match(new RegExp(`${fieldName}:\\s*"([^"]+)"`));
  if (dq) return dq[1];
  const sq = text.match(new RegExp(`${fieldName}:\\s*'([^']+)'`));
  if (sq) return sq[1];
  return null;
}

function extractDataFromFiles() {
  const productsFile = fs.readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf-8');
  const journalFile = fs.readFileSync(path.join(rootDir, 'src/data/journal.ts'), 'utf-8');

  // Extract CATEGORIES specifically
  const categories = [];
  const categoriesBlockMatch = productsFile.match(/export\s+const\s+CATEGORIES:\s*CategoryInfo\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (categoriesBlockMatch) {
    const catContent = categoriesBlockMatch[1];
    const catItems = catContent.split(/\{\s*id:/);
    for (let i = 1; i < catItems.length; i++) {
      const item = catItems[i];
      const idMatch = extractQuotedField(item, 'id') || (item.match(/^\s*['"]([^'"]+)['"]/) ? item.match(/^\s*['"]([^'"]+)['"]/)[1] : null);
      const slug = extractQuotedField(item, 'slug');
      const name = extractQuotedField(item, 'name');
      const image = extractQuotedField(item, 'image');
      if (slug) {
        categories.push({
          id: idMatch || slug,
          slug,
          name: name || slug,
          image: image ? image.replace(/^\.\//, '') : null,
        });
      }
    }
  }

  // Extract PRODUCTS specifically
  const products = [];
  const productBlocks = productsFile.split(/\{\s*id:\s*['"]prod-/);
  for (let i = 1; i < productBlocks.length; i++) {
    const block = productBlocks[i];
    const slug = extractQuotedField(block, 'slug');
    const name = extractQuotedField(block, 'name');
    const imgMatch = block.match(/images:\s*\[\s*['"]([^'"]+)['"]/);

    if (slug && name) {
      products.push({
        slug,
        name,
        image: imgMatch ? imgMatch[1].replace(/^\.\//, '') : null,
      });
    }
  }

  // Extract Journal Articles
  const articles = [];
  const articleBlocks = journalFile.split(/\{\s*id:\s*['"][^'"]+['"],\s*slug:\s*['"]([^'"]+)['"]/);
  for (let i = 1; i < articleBlocks.length; i += 2) {
    const slug = articleBlocks[i];
    const rest = articleBlocks[i + 1] || '';
    const title = extractQuotedField(rest, 'title');
    const image = extractQuotedField(rest, 'coverImage');

    articles.push({
      slug,
      title: title || slug,
      image: image || null,
    });
  }

  return { categories, products, articles };
}

function generateSitemapXml() {
  const { categories, products, articles } = extractDataFromFiles();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  // 1. Core Pages
  for (const page of CORE_PAGES) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // 2. Category Pages
  for (const cat of categories) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/category/${escapeXml(cat.slug)}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    if (cat.image) {
      const imgUrl = cat.image.startsWith('http') ? cat.image : `${BASE_URL}/${cat.image}`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(cat.name)}</image:title>\n`;
      xml += '    </image:image>\n';
    }
    xml += '  </url>\n';
  }

  // 3. Product Pages
  for (const prod of products) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/product/${escapeXml(prod.slug)}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.80</priority>\n`;
    if (prod.image) {
      const imgUrl = prod.image.startsWith('http') ? prod.image : `${BASE_URL}/${prod.image}`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(prod.name)}</image:title>\n`;
      xml += '    </image:image>\n';
    }
    xml += '  </url>\n';
  }

  // 4. Journal / Blog Pages
  for (const art of articles) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/journal/${escapeXml(art.slug)}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.75</priority>\n`;
    if (art.image) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(art.image)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(art.title)}</image:title>\n`;
      xml += '    </image:image>\n';
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return { xml, count: CORE_PAGES.length + categories.length + products.length + articles.length, categories, products, articles };
}

const { xml, count, categories, products, articles } = generateSitemapXml();

const targetPath = path.join(rootDir, 'public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf-8');

console.log(`✅ Sitemap successfully generated at: ${targetPath}`);
console.log(`📊 Total indexed URLs: ${count}`);
console.log(`   - Core Pages: ${CORE_PAGES.length}`);
console.log(`   - Category Pages: ${categories.length} (${categories.map(c => c.slug).join(', ')})`);
console.log(`   - Product Pages: ${products.length} (${products.map(p => p.slug).join(', ')})`);
console.log(`   - Journal Articles: ${articles.length} (${articles.map(a => a.slug).join(', ')})`);
