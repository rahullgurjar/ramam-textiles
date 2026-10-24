# Ramam Textiles — AI Agent Guidelines & Repository Standards

## 1. Editorial & Blog Writing Guidelines (MANDATORY)

Every blog post, article, draft, and journal entry written for Ramam Textiles (`ramamtextiles.shop`) MUST strictly adhere to the following rules:

### Core Content Rules
1. **Paragraph Length**: 
   - **Strictly under 3 lines** per paragraph (1–2 punchy, readable sentences; ~30–45 words max). 
   - Zero huge text walls. Maximize mobile readability and cognitive ease.
2. **Heading Structure**:
   - **H1**: Single main title containing the primary target keyword.
   - **H2**: Core section headings directly supporting the H1.
   - **H3**: Subheadings nested under their respective H2 sections for fine-grained clarity.
3. **Bullet Points**:
   - Use bullet points wherever appropriate (lists, key takeaways, feature breakdowns, tips, pros/cons, and process checklists).
4. **Add a Relevant Table**:
   - Every single blog must include a structured, high-value data table (e.g. GSM comparison, fabric parameters, care matrix, certification checklists, or technique breakdowns).
5. **Images or Infographics**:
   - Include high-quality craft imagery, stage-by-stage infographics, or step-by-step visual workflows.
6. **Author Details**:
   - Prominently include author name, verified role/credentials, and artisan guild bio/hallmark.
7. **FAQ Section**:
   - Add a dedicated FAQ section with 3 to 5 frequently asked questions and direct, expert answers (with FAQPage Schema markup).
8. **Analyse Top 5 Ranking Blogs**:
   - Always search the primary keyword on Google, inspect the top 5 ranking articles, analyze their structure and content gaps, and write a more comprehensive, authoritative, and helpful guide.
9. **Lead Generation CTA Redirecting to Contact Page**:
   - Include a high-converting B2B/wholesale lead generation call-to-action block with a direct primary button linking to `/contact` ("Contact Atelier / Start Sourcing →") alongside sample request/quote triggers.
10. **Always Use Claude (MANDATORY AI MODEL)**:
   - Every single blog post, article, draft, outline, expansion, revision, and humanization step MUST ALWAYS be written using Claude (specifically **Claude 3.7 Sonnet** / `claude-3-7-sonnet-20250219`).
   - Claude 3.7 Sonnet is the sole mandated model for its deep craft reasoning, authentic human prose, nuanced sensory descriptions, and flawless adherence to the under-3-line paragraph constraint.
   - Claude powers the Admin AI Writer tab (`/admin`), the terminal CLI (`npm run blog:generate`), and the GitHub Actions daily publisher (`daily-blog.yml`).

### Blog Writing Workflow (4 Steps)
- **Step 1: Search the primary keyword on Google.** Query Google to understand search intent, SERP features, and buyer queries.
- **Step 2: Open and read the top 5 ranking blogs.** Analyze their headers, content depth, FAQs, keywords, and blind spots.
- **Step 3: Finalise the blog outline and structure.** Lay out H1, H2, H3, table data, bullet points, author bio, FAQs, and lead gen CTA.
- **Step 4: Write the blog with Claude 3.7 Sonnet.** Always use Claude to write and humanize the content with authentic voice, zero fluff, under-3-line paragraphs, and deep technical craft knowledge.

---

## 2. Technical Standards
- Framework: React 19 + TypeScript + Vite.
- Styling: Tailwind CSS with brand color palette (`#9B332C` Royal Maroon, `#241A16` Dark Earth, `#FAF0EB` / `#FAF5EE` Heritage Linen, `#D4AF37` Muted Gold).
- Routing: Static pre-rendered SPA routes generated via `scripts/generate-spa-routes.js` for HTTP 200 on GitHub Pages.
- Admin Passkey: `5557` (fallback: `RamamTextiles@Jaipur2026`).
- Admin URLs: `/admin` and `/staff`.
