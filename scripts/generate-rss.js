import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://ramamtextiles.shop';

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
  const match = text.match(new RegExp(`${fieldName}:\\s*(['"])([\\s\\S]*?)\\1`));
  if (match) return match[2];
  return null;
}

function generateRss() {
  const journalTsPath = path.join(rootDir, 'src/data/journal.ts');
  const publicDir = path.join(rootDir, 'public');
  const distDir = path.join(rootDir, 'dist');

  if (!fs.existsSync(journalTsPath)) {
    console.error('journal.ts not found');
    return;
  }

  const journalFile = fs.readFileSync(journalTsPath, 'utf-8');
  const articles = [];
  const articleBlocks = journalFile.split(/\{\s*id:\s*['"][^'"]+['"],[\s\r\n]*slug:\s*['"]([^'"]+)['"]/);

  for (let i = 1; i < articleBlocks.length; i += 2) {
    const slug = articleBlocks[i];
    const rest = articleBlocks[i + 1] || '';
    const title = extractQuotedField(rest, 'title') || slug;
    const category = extractQuotedField(rest, 'category') || 'Textiles';
    const excerpt = extractQuotedField(rest, 'excerpt') || '';
    const date = extractQuotedField(rest, 'publishedDate') || new Date().toUTCString();
    const coverImage = extractQuotedField(rest, 'coverImage') || '/logo.png';

    articles.push({
      slug,
      title,
      category,
      excerpt,
      date,
      coverImage: coverImage.startsWith('http') ? coverImage : `${BASE_URL}/${coverImage.replace(/^(\.|\/)+/, '')}`
    });
  }

  const now = new Date().toUTCString();

  const itemsXml = articles.map(a => {
    const itemUrl = `${BASE_URL}/blog/${a.slug}`;
    const pubDate = new Date(a.date).toUTCString() !== 'Invalid Date' 
      ? new Date(a.date).toUTCString() 
      : now;

    return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${pubDate}</pubDate>
      <author>ramamtextiles@gmail.com (Ramam Textiles Jaipur)</author>
      <enclosure url="${escapeXml(a.coverImage)}" type="image/jpeg" length="102400" />
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Ramam Textiles • Artisan Blog &amp; Sourcing Journal</title>
    <link>${BASE_URL}/blog</link>
    <description>Authentic Jaipur hand block printing, Bagru Dabu mud-resist dyeing, fabric GSM calculation, and wholesale sourcing guides.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>Ramam Textiles</title>
      <link>${BASE_URL}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

  const publicRssPath = path.join(publicDir, 'rss.xml');
  fs.writeFileSync(publicRssPath, rssXml, 'utf-8');
  console.log(`✅ RSS Feed successfully generated at: ${publicRssPath} (${articles.length} articles)`);

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'rss.xml'), rssXml, 'utf-8');
    console.log(`✅ Synced RSS Feed to dist/rss.xml`);
  }
}

generateRss();

