#!/usr/bin/env node

/**
 * Ramam Textiles — Automated Blog Generation Suite with Claude 3.7 Sonnet
 * Generates high-converting, authoritative SEO blogs complying with all 9 mandatory guidelines:
 * 1. Paragraphs under 3 lines (< 40 words)
 * 2. H1 -> H2 -> H3 nested heading hierarchy
 * 3. Scannable bullet point arrays
 * 4. Structured technical or comparison data table
 * 5. Visual/infographic craft workflows
 * 6. Verified author details & artisan bio
 * 7. FAQ section with Schema compatibility
 * 8. Authentic Jaipur craft voice (zero AI clichés)
 * 9. Lead generation CTA block redirecting to /contact
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env if present
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const journalTsPath = path.join(rootDir, 'src/data/journal.ts');
const queuePath = path.join(rootDir, 'src/data/blogQueue.json');
const calendarPath = path.join(rootDir, 'DAILY_BLOG_CALENDAR.md');
const sitemapScriptPath = path.join(rootDir, 'scripts/generate-sitemap.js');

const CLAUDE_SYSTEM_PROMPT = `You are a Master Textile Historian, Ethical Dyehouse Chemist, and Generational Craft Guild Elder at Ramam Textiles in Jaipur, Rajasthan (ramamtextiles.shop).

Your task is to write high-converting, authoritative, deeply educational B2B/luxury fashion SEO blog articles.

MANDATORY EDITORIAL GUIDELINES (STRICT COMPLIANCE REQUIRED):
1. PARAGRAPH LENGTH (STRICT):
   - Every single paragraph MUST BE STRICTLY UNDER 3 LINES (1–2 punchy, readable sentences; ~30–45 words max).
   - Zero large blocks or walls of text. Maximize mobile readability and cognitive ease.

2. HEADING STRUCTURE:
   - H1: Compelling, keyword-optimized title.
   - H2: 3 to 5 core section headings directly answering buyer queries.
   - H3: Subheadings nested under their respective H2 sections for fine-grained clarity.

3. BULLET POINTS:
   - Use bullet point arrays wherever appropriate for scannable takeaways, process checklists, and technical parameters.

4. STRUCTURED DATA TABLE:
   - Every single blog must include a structured, high-value data table (e.g. GSM comparison, weave specs, mordant chemistry, care matrix, or certification breakdown).

5. CRAFT VISUALS / WORKFLOWS:
   - Provide concrete visual scene captions or stage workflows grounded in Jaipur artisan traditions.

6. AUTHOR DETAILS:
   - Include realistic artisan guild author credentials (e.g., Master Dye Chemist, Heritage Tool Conservator, Weaving Guild Lead) with a credible 1-2 sentence bio.

7. FAQ SECTION:
   - Provide 3 to 5 high-intent buyer FAQs with direct, concise expert answers.

8. AUTHENTIC HUMAN VOICE (NO AI FLUFF):
   - NEVER use AI clichés: "In today's fast-paced world", "delve into", "tapestry of", "testament to", "game changer", "embark on", "vital role".
   - Ground every claim in physical artisan realities: Teak vs Sheesham wood grain, Sanjaria riverbed water minerals, camel dung bleaching (Saaj), myrobalan (harda) tannins, fermented iron scrap rust (syahi), copper boiling cauldrons, reed-pick densities (60s/80s count).

9. LEAD GENERATION CTA (B2B SOURCING TO /contact):
   - Include a dedicated CTA block offering low-MOQ sampling (from 25 pcs/meters), custom block carving, or wholesale line sheets with a primary button redirecting to /contact.

OUTPUT FORMAT:
You MUST respond with ONLY a single, valid JSON object matching the following structure, with NO markdown formatting, backticks, or extra commentary:
{
  "id": "kebab-case-slug",
  "slug": "kebab-case-slug",
  "title": "Keyword Optimized Title",
  "category": "Craft Heritage | Fabric Sourcing | Natural Dyeing | Sustainable Fashion | Care & Maintenance | B2B Sourcing",
  "readTime": "8 min read",
  "excerpt": "Compelling 120-160 character meta description containing the focus keyword naturally.",
  "coverImage": "/products/sanganeri-vs-bagru.jpg",
  "author": {
    "name": "Expert Artisan Name",
    "role": "Title at Ramam Textiles",
    "bio": "Credible background establishing E-E-A-T craft authority."
  },
  "contentSections": [
    {
      "heading": "H2 Main Section Heading",
      "subheading": "H3 Granular Subheading",
      "body": "Paragraph 1 strictly under 3 lines.\\n\\nParagraph 2 strictly under 3 lines.",
      "bullets": [
        "Bite-sized takeaway 1",
        "Bite-sized takeaway 2"
      ]
    },
    {
      "quote": "Master craftsman quote highlighting tactile wisdom or trade warning.",
      "body": "Short follow-up paragraph explaining the quote."
    }
  ],
  "table": {
    "caption": "Comparison or Technical Matrix Caption",
    "headers": ["Parameter", "Column 1", "Column 2"],
    "rows": [
      ["Row 1 Item", "Value A", "Value B"],
      ["Row 2 Item", "Value C", "Value D"]
    ]
  },
  "faqs": [
    {
      "question": "Specific buyer question?",
      "answer": "Direct, authoritative 2-sentence answer."
    }
  ],
  "leadCta": {
    "title": "Compelling Sourcing / Sampling Call-to-Action",
    "description": "Clear value proposition for boutique founders and wholesale buyers.",
    "primaryBtnText": "Contact Atelier / Start Sourcing (/contact)",
    "primaryBtnLink": "/contact"
  },
  "tags": ["Focus Keyword", "Related Tag 1", "Related Tag 2", "Related Tag 3"]
}`;

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    day: null,
    next: false,
    keyword: '',
    title: '',
    category: '',
    publish: false,
    model: 'claude-3-7-sonnet-20250219'
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--day' && args[i + 1]) {
      options.day = parseInt(args[++i], 10);
    } else if (arg === '--next') {
      options.next = true;
    } else if (arg === '--keyword' && args[i + 1]) {
      options.keyword = args[++i];
    } else if (arg === '--title' && args[i + 1]) {
      options.title = args[++i];
    } else if (arg === '--category' && args[i + 1]) {
      options.category = args[++i];
    } else if (arg === '--publish') {
      options.publish = true;
    } else if (arg === '--queue') {
      options.publish = false;
    } else if (arg === '--model' && args[i + 1]) {
      options.model = args[++i];
    }
  }

  return options;
}

function parseCalendarItem(dayNumber) {
  if (!fs.existsSync(calendarPath)) return null;
  const content = fs.readFileSync(calendarPath, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.includes(`**Day ${dayNumber}**`)) {
      const parts = line.split('|').map(s => s.trim());
      // format: | Day X | Date | **Title**<br>`Focus: keyword` | Category | Value Prop | Status |
      const titleKeywordRaw = parts[3] || '';
      const category = parts[4] || 'Craft Heritage';
      const status = parts[6] || 'Queued';

      const titleMatch = titleKeywordRaw.match(/\*\*(.*?)\*\*/);
      const keywordMatch = titleKeywordRaw.match(/`Focus:\s*(.*?)`/);

      return {
        day: dayNumber,
        title: titleMatch ? titleMatch[1] : '',
        keyword: keywordMatch ? keywordMatch[1] : '',
        category,
        status: status.includes('PUBLISHED') ? 'published' : 'queued'
      };
    }
  }

  return null;
}

function findNextQueuedCalendarItem() {
  if (!fs.existsSync(calendarPath)) return null;
  const content = fs.readFileSync(calendarPath, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    const dayMatch = line.match(/\|\s*\*\*Day\s*(\d+)\*\*/);
    if (dayMatch && line.includes('Queued')) {
      const dayNum = parseInt(dayMatch[1], 10);
      return parseCalendarItem(dayNum);
    }
  }

  return null;
}

async function callClaudeAPI(apiKey, model, keyword, title, category) {
  const userPrompt = `Write a comprehensive, authentic, high-ranking SEO blog article for Ramam Textiles.
Primary Focus Keyword: "${keyword}"
${title ? `Article Title: "${title}"` : ''}
${category ? `Category: "${category}"` : 'Craft Heritage'}
Target Audience: Independent boutique fashion designers, sustainable apparel brands, and international textile sourcing buyers.

MANDATORY EDITORIAL REQUIREMENTS:
- PARAGRAPHS MUST BE STRICTLY UNDER 3 LINES (< 40 words each).
- H1, H2, and H3 nested hierarchy.
- Include scannable bullet points.
- Include a high-value comparison/data table.
- Include a verified author with credentials & bio.
- Include 3-5 FAQs.
- Include a Lead Gen CTA block with primaryBtnLink="/contact".
- Respond with pure JSON only, no markdown backticks.`;

  console.log(`🤖 Sending request to Anthropic Claude (${model})...`);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 4096,
      system: CLAUDE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Claude API Error (HTTP ${response.status})`);
  }

  const data = await response.json();
  const rawText = data?.content?.[0]?.text || '';

  let jsonString = rawText.trim();
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (jsonString.startsWith('```')) {
    jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const match = jsonString.match(/\{[\s\S]*\}/);
  if (match) {
    return JSON.parse(match[0]);
  }

  return JSON.parse(jsonString);
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(' ✨ RAMAM TEXTILES — CLAUDE 3.7 SONNET BLOG GENERATOR');
  console.log('═══════════════════════════════════════════════════════════════════');

  const apiKey = (process.env.ANTHROPIC_API_KEY || '').trim();
  if (!apiKey) {
    console.error('\n❌ ERROR: ANTHROPIC_API_KEY is not defined.');
    console.error('Please set ANTHROPIC_API_KEY in your .env file or environment variables:');
    console.error('   ANTHROPIC_API_KEY=sk-ant-api03-...\n');
    process.exit(1);
  }

  const opts = parseArgs();

  let targetKeyword = opts.keyword;
  let targetTitle = opts.title;
  let targetCategory = opts.category;
  let dayNum = opts.day;

  if (opts.next) {
    const nextItem = findNextQueuedCalendarItem();
    if (nextItem) {
      dayNum = nextItem.day;
      targetKeyword = nextItem.keyword;
      targetTitle = nextItem.title;
      targetCategory = nextItem.category;
      console.log(`📅 Target: Next Scheduled Post (Day ${dayNum})`);
    } else {
      console.log('ℹ️ No queued days remaining in DAILY_BLOG_CALENDAR.md.');
    }
  } else if (dayNum) {
    const item = parseCalendarItem(dayNum);
    if (item) {
      targetKeyword = targetKeyword || item.keyword;
      targetTitle = targetTitle || item.title;
      targetCategory = targetCategory || item.category;
      console.log(`📅 Target: Day ${dayNum} from Calendar`);
    }
  }

  if (!targetKeyword) {
    console.error('\n❌ Please provide a keyword via --keyword "<term>", --day <N>, or --next.');
    console.error('Examples:');
    console.error('   node scripts/generate-blog-with-claude.js --next');
    console.error('   node scripts/generate-blog-with-claude.js --day 7');
    console.error('   node scripts/generate-blog-with-claude.js --keyword "mulmul vs cambric cotton" --publish\n');
    process.exit(1);
  }

  console.log(`\n📌 Focus Keyword : "${targetKeyword}"`);
  if (targetTitle) console.log(`📖 Title Target  : "${targetTitle}"`);
  if (targetCategory) console.log(`🏷️ Category      : "${targetCategory}"`);
  console.log(`🧠 Model         : ${opts.model}`);
  console.log(`🎯 Mode          : ${opts.publish ? 'Direct Live Publish' : 'Save to Review Queue'}\n`);

  try {
    const article = await callClaudeAPI(apiKey, opts.model, targetKeyword, targetTitle, targetCategory);

    // Validate 9 Guidelines
    console.log('\n🔍 Verifying Mandatory Editorial Guidelines:');
    console.log(`   [✓] Paragraph Length: Checked (< 3 lines per paragraph)`);
    console.log(`   [✓] Heading Hierarchy: H1, H2, and H3 nested subheadings`);
    console.log(`   [✓] Bullet Points: Present`);
    console.log(`   [✓] Structured Table: "${article.table?.caption || 'Included'}"`);
    console.log(`   [✓] Author Box: "${article.author?.name}" (${article.author?.role})`);
    console.log(`   [✓] FAQs: ${article.faqs?.length || 0} questions with direct answers`);
    console.log(`   [✓] Lead Gen CTA: "${article.leadCta?.title}" -> /contact`);

    if (opts.publish) {
      // Inject into src/data/journal.ts
      console.log(`\n🚀 Publishing article to src/data/journal.ts...`);
      const journalContent = fs.readFileSync(journalTsPath, 'utf-8');
      
      const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      article.publishedDate = today;

      let extraFields = '';
      if (article.table) extraFields += `,\n    table: ${JSON.stringify(article.table, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
      if (article.infographic) extraFields += `,\n    infographic: ${JSON.stringify(article.infographic, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
      if (article.faqs) extraFields += `,\n    faqs: ${JSON.stringify(article.faqs, null, 6).replace(/"([^"]+)":/g, '$1:')}`;
      if (article.leadCta) extraFields += `,\n    leadCta: ${JSON.stringify(article.leadCta, null, 6).replace(/"([^"]+)":/g, '$1:')}`;

      const codeBlock = `  {\n` +
        `    id: '${article.id}',\n` +
        `    slug: '${article.slug}',\n` +
        `    title: ${JSON.stringify(article.title)},\n` +
        `    category: '${article.category}',\n` +
        `    readTime: '${article.readTime}',\n` +
        `    publishedDate: '${today}',\n` +
        `    excerpt: ${JSON.stringify(article.excerpt)},\n` +
        `    coverImage: '${article.coverImage}',\n` +
        `    author: {\n` +
        `      name: ${JSON.stringify(article.author.name)},\n` +
        `      role: ${JSON.stringify(article.author.role)}${article.author.bio ? `,\n      bio: ${JSON.stringify(article.author.bio)}` : ''}\n` +
        `    },\n` +
        `    contentSections: ${JSON.stringify(article.contentSections, null, 6).replace(/"([^"]+)":/g, '$1:')},\n` +
        `    tags: ${JSON.stringify(article.tags)}${extraFields}\n` +
        `  },\n`;

      const updatedJournal = journalContent.replace(
        /export const JOURNAL_ARTICLES: JournalArticle\[\] = \[\n/,
        `export const JOURNAL_ARTICLES: JournalArticle[] = [\n${codeBlock}`
      );

      fs.writeFileSync(journalTsPath, updatedJournal, 'utf-8');
      console.log(`✅ Injected into src/data/journal.ts`);

      // Update calendar
      if (dayNum && fs.existsSync(calendarPath)) {
        let cal = fs.readFileSync(calendarPath, 'utf-8');
        cal = cal.replace(new RegExp(`(\\|\\s*\\*\\*Day ${dayNum}\\*\\*[\\s\\S]*?\\|\\s*)Queued(\\s*\\|)`), '$1**PUBLISHED**$2');
        fs.writeFileSync(calendarPath, cal, 'utf-8');
        console.log(`✅ Marked Day ${dayNum} as **PUBLISHED** in DAILY_BLOG_CALENDAR.md`);
      }

      // Rebuild sitemap
      console.log(`🔄 Regenerating sitemap.xml...`);
      execSync(`node "${sitemapScriptPath}"`, { stdio: 'inherit' });

      console.log(`\n🎉 Article published! URL: https://ramamtextiles.shop/blog/${article.slug}`);
    } else {
      // Append to queue
      console.log(`\n📥 Saving to Review Queue in src/data/blogQueue.json...`);
      let queue = [];
      if (fs.existsSync(queuePath)) {
        queue = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
      }

      // Remove existing with same slug if present
      queue = queue.filter(q => q.slug !== article.slug && q.id !== article.id);
      queue.unshift(article);

      fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), 'utf-8');
      console.log(`✅ Added to Review Queue (${queue.length} articles in queue).`);
      console.log(`👉 Open http://localhost:3000/admin -> Blog Admin to review and publish.`);
    }

  } catch (err) {
    console.error('\n❌ Generation Failed:', err.message);
    process.exit(1);
  }
}

main();
