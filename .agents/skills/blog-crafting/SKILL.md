---
name: blog-crafting
description: Step-by-step workflow for researching, analyzing top 5 competitors, outlining, writing with Claude, humanizing, and publishing SEO blogs for Ramam Textiles following all 9 mandatory guidelines.
---

# Blog Crafting & Research Skill for Ramam Textiles

Follow this systematic 4-step process whenever creating or revising blogs for Ramam Textiles.

## Step 1: Search Primary Keyword on Google
1. Identify the primary focus keyword from `DAILY_BLOG_CALENDAR.md` or the user prompt.
2. Use `search_web` to search the keyword.
3. Identify the search intent: informational, commercial investigation, or transactional.
4. Record the top 5 ranking URLs from the SERP.

## Step 2: Open and Read Top 5 Ranking Blogs
1. Use `read_url_content` or `search_web` on the top 5 ranking results.
2. For each competitor, document:
   - Primary heading hierarchy (H1, H2, H3).
   - What key points they cover well.
   - What questions they leave unanswered (the "content gap").
   - Frequently asked questions and common terminology.
3. Formulate our competitive angle: Ramam Textiles' first-hand artisan workshop expertise in Jaipur, real woodblock carving, AZO-free dye recipes, and low-MOQ export experience.

## Step 3: Finalise the Blog Outline and Structure
Structure the article using all 9 mandatory guidelines:
- **H1**: Captivating headline with primary keyword.
- **H2 Sections**: 3 to 5 core sections.
- **H3 Subheadings**: Specific breakdowns inside H2 sections.
- **Paragraphs**: Strictly under 3 lines per paragraph.
- **Bullet Points**: Scannable, bulleted insights in key sections.
- **Data Table**: Relevant technical, GSM, care, or comparison matrix.
- **Visuals / Infographic**: Stage-by-stage craft workflow or diagram.
- **Author Details**: Verified title, artisan guild credentials, and bio.
- **FAQ Section**: 3 to 5 high-intent questions with direct, concise answers.
- **Lead Generation CTA**: Prominent block with primary button pointing to `/contact`.

## Step 4: Write with Claude and Humanise
- **Voice**: Authentic, warm, knowledgeable, and grounded in centuries of Jaipur craft heritage.
- **Style Rules**:
  - Avoid AI cliché jargon ("In this fast-paced world", "delve into", "tapestry of", "testament to", "game changer").
  - Speak as a master artisan and ethical textile manufacturer.
  - Break all paragraphs into 1–2 sentences (< 3 lines).
  - Include tangible physical details (riverbed mud, teak wood density, copper dye cauldrons, warp/weft tension).
- **Output Format**: Format as JSON or TypeScript matching `JournalArticle` and `BlogArticleItem` in `src/types/blog.ts`.
