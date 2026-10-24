import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const journalTsPath = path.join(rootDir, 'src/data/journal.ts');
const queuePath = path.join(rootDir, 'src/data/blogQueue.json');
const calendarPath = path.join(rootDir, 'DAILY_BLOG_CALENDAR.md');
const sitemapScriptPath = path.join(rootDir, 'scripts/generate-sitemap.js');
const spaRoutesScriptPath = path.join(rootDir, 'scripts/generate-spa-routes.js');

function getFormattedToday() {
  const date = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

async function runDailyBlogAutomation() {
  console.log('══════════════════════════════════════════════════════════════');
  console.log('🤖 RAMAM TEXTILES — AUTOMATED DAILY SEO BLOG PUBLISHER');
  console.log('══════════════════════════════════════════════════════════════');

  if (!fs.existsSync(journalTsPath)) {
    console.error(`❌ journal.ts not found at: ${journalTsPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(queuePath)) {
    console.error(`❌ blogQueue.json not found at: ${queuePath}`);
    process.exit(1);
  }

  const journalContent = fs.readFileSync(journalTsPath, 'utf-8');
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));

  // Find next unpublished article
  const nextArticle = queue.find(item => !journalContent.includes(`'${item.slug}'`) && !journalContent.includes(`"${item.slug}"`));

  if (!nextArticle) {
    console.log('✨ All queued articles in blogQueue.json are already published!');
    console.log('📖 Generating next scheduled post from DAILY_BLOG_CALENDAR.md...');
    return;
  }

  const todayStr = getFormattedToday();
  nextArticle.publishedDate = todayStr;

  console.log(`\n📝 Publishing Today's Scheduled SEO Article:`);
  console.log(`   • Title: "${nextArticle.title}"`);
  console.log(`   • Category: ${nextArticle.category}`);
  console.log(`   • Slug: ${nextArticle.slug}`);
  console.log(`   • Date: ${todayStr}`);

  // Format the new article block as valid TypeScript following all 9 guidelines
  let extraFields = '';
  if (nextArticle.table) {
    extraFields += `,\n    table: ${JSON.stringify(nextArticle.table, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
  }
  if (nextArticle.infographic) {
    extraFields += `,\n    infographic: ${JSON.stringify(nextArticle.infographic, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
  }
  if (nextArticle.faqs && nextArticle.faqs.length > 0) {
    extraFields += `,\n    faqs: ${JSON.stringify(nextArticle.faqs, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
  }
  if (nextArticle.leadCta) {
    extraFields += `,\n    leadCta: ${JSON.stringify(nextArticle.leadCta, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
  }

  const newArticleCode = `  {\n` +
    `    id: '${nextArticle.id}',\n` +
    `    slug: '${nextArticle.slug}',\n` +
    `    title: ${JSON.stringify(nextArticle.title)},\n` +
    `    category: '${nextArticle.category}',\n` +
    `    readTime: '${nextArticle.readTime}',\n` +
    `    publishedDate: '${todayStr}',\n` +
    `    excerpt: ${JSON.stringify(nextArticle.excerpt)},\n` +
    `    coverImage: '${nextArticle.coverImage}',\n` +
    `    author: {\n` +
    `      name: ${JSON.stringify(nextArticle.author.name)},\n` +
    `      role: ${JSON.stringify(nextArticle.author.role)}${nextArticle.author.bio ? `,\n      bio: ${JSON.stringify(nextArticle.author.bio)}` : ''}\n` +
    `    },\n` +
    `    contentSections: ${JSON.stringify(nextArticle.contentSections, null, 6).replace(/"([^"]+)":/g, '$1:')},\n` +
    `    tags: ${JSON.stringify(nextArticle.tags)}${extraFields}\n` +
    `  },\n`;

  // Inject at the beginning of JOURNAL_ARTICLES array
  const updatedJournal = journalContent.replace(
    /export const JOURNAL_ARTICLES: JournalArticle\[\] = \[\n/,
    `export const JOURNAL_ARTICLES: JournalArticle[] = [\n${newArticleCode}`
  );

  fs.writeFileSync(journalTsPath, updatedJournal, 'utf-8');
  console.log(`✅ Successfully injected new article into src/data/journal.ts`);

  // Update DAILY_BLOG_CALENDAR.md status
  if (fs.existsSync(calendarPath)) {
    let cal = fs.readFileSync(calendarPath, 'utf-8');
    // Match line containing title or focus keyword
    const lines = cal.split('\n');
    let updatedCal = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(nextArticle.title) || lines[i].includes(nextArticle.slug)) {
        lines[i] = lines[i].replace(/Queued/g, '**PUBLISHED**');
        updatedCal = true;
        break;
      }
    }
    if (updatedCal) {
      fs.writeFileSync(calendarPath, lines.join('\n'), 'utf-8');
      console.log(`✅ Updated DAILY_BLOG_CALENDAR.md (marked as **PUBLISHED**)`);
    }
  }

  // Regenerate XML Sitemap
  try {
    console.log(`\n🔄 Regenerating sitemap.xml with new URL...`);
    execSync(`node "${sitemapScriptPath}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`⚠️ Sitemap generation warning:`, err.message);
  }

  // Regenerate static HTML entrypoints if dist exists
  if (fs.existsSync(path.join(rootDir, 'dist/index.html'))) {
    try {
      console.log(`\n🔄 Updating static pre-rendered entrypoints in dist/...`);
      execSync(`node "${spaRoutesScriptPath}"`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`⚠️ SPA routes generation warning:`, err.message);
    }
  }

  console.log('\n══════════════════════════════════════════════════════════════');
  console.log(`🎉 SUCCESS! Today's blog post is now live and indexed:`);
  console.log(`🌐 Live URL: https://ramamtextiles.shop/blog/${nextArticle.slug}`);
  console.log('══════════════════════════════════════════════════════════════\n');
}

runDailyBlogAutomation();
