import { BlogArticleItem } from '../types/blog';
import { calculateArticleSEOScore } from './blogStorage';

export const CLAUDE_MODELS = [
  { id: 'claude-3-7-sonnet-20250219', name: 'Claude 3.7 Sonnet (Recommended - Deep Artisan Voice)', recommended: true },
  { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (High Speed & Craft Precision)', recommended: false },
  { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (Fastest & Lightweight Drafts)', recommended: false }
] as const;

export type ClaudeModelId = typeof CLAUDE_MODELS[number]['id'];

const API_KEY_STORAGE_KEY = 'rt_anthropic_api_key';
const DEFAULT_MODEL_STORAGE_KEY = 'rt_anthropic_default_model';

export function getStoredAnthropicKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
}

export function setStoredAnthropicKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key.trim()) {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } else {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
  }
}

export function getStoredClaudeModel(): ClaudeModelId {
  if (typeof window === 'undefined') return 'claude-3-7-sonnet-20250219';
  const stored = localStorage.getItem(DEFAULT_MODEL_STORAGE_KEY) as ClaudeModelId | null;
  if (stored && CLAUDE_MODELS.some(m => m.id === stored)) {
    return stored;
  }
  return 'claude-3-7-sonnet-20250219';
}

export function setStoredClaudeModel(model: ClaudeModelId): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEFAULT_MODEL_STORAGE_KEY, model);
}

export interface ClaudeBlogPromptOptions {
  focusKeyword: string;
  topicTitle?: string;
  category?: string;
  targetAudience?: string;
  competitorInsights?: string;
  model?: ClaudeModelId;
  apiKey?: string;
}

export const CLAUDE_SYSTEM_PROMPT = `You are a Master Textile Historian, Ethical Dyehouse Chemist, and Generational Craft Guild Elder at Ramam Textiles in Jaipur, Rajasthan (ramamtextiles.shop).

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
      "body": "Paragraph 1 strictly under 3 lines.\n\nParagraph 2 strictly under 3 lines.",
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

export async function testAnthropicKey(apiKey: string): Promise<{ success: boolean; message: string }> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    return { success: false, message: 'API key is empty.' };
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': cleanKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 15,
        messages: [{ role: 'user', content: 'Respond with the single word: "Connected"' }]
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
      return { success: false, message: errorMsg };
    }

    return { success: true, message: 'Anthropic API key is valid and connected!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error while contacting Anthropic API.' };
  }
}

export async function generateBlogWithClaude(
  options: ClaudeBlogPromptOptions,
  onProgress?: (status: string) => void
): Promise<BlogArticleItem> {
  const apiKey = (options.apiKey || getStoredAnthropicKey()).trim();
  if (!apiKey) {
    throw new Error('Anthropic API key is missing. Please configure it in the Claude AI Writer settings.');
  }

  const model = options.model || getStoredClaudeModel();

  if (onProgress) onProgress('Formulating research prompt with 9 editorial guidelines...');

  const userPrompt = `Write a comprehensive, authentic, high-ranking SEO blog article for Ramam Textiles.
Primary Focus Keyword: "${options.focusKeyword}"
${options.topicTitle ? `Proposed Title: "${options.topicTitle}"` : ''}
${options.category ? `Target Category: "${options.category}"` : ''}
${options.targetAudience ? `Target Audience: "${options.targetAudience}"` : 'Independent boutique fashion designers, sustainable apparel brands, and international textile sourcing buyers.'}
${options.competitorInsights ? `Competitor Gaps to Address: "${options.competitorInsights}"` : 'Cover physical fabric parameters, real wood carving or natural dye recipes, and low-MOQ export logistics that competitor articles omit.'}

Remember:
- PARAGRAPHS MUST BE STRICTLY UNDER 3 LINES (< 40 words each).
- H1, H2, and H3 nested hierarchy.
- Include scannable bullet points.
- Include a high-value comparison/data table.
- Include a verified author with credentials & bio.
- Include 3-5 FAQs.
- Include a Lead Gen CTA block with primaryBtnLink="/contact".
- Respond with pure JSON only, no markdown backticks.`;

  if (onProgress) onProgress(`Connecting to Claude (${model}) to craft authoritative artisan content...`);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 4096,
      system: CLAUDE_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Claude API Error (HTTP ${response.status})`);
  }

  if (onProgress) onProgress('Parsing Claude response & validating editorial guidelines...');

  const data = await response.json();
  const rawText = data?.content?.[0]?.text || '';

  // Extract JSON string (handling any accidental markdown block wrappers)
  let jsonString = rawText.trim();
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (jsonString.startsWith('```')) {
    jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (parseErr) {
    // Attempt relaxed regex extraction if surrounded by preface text
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Claude response did not contain valid JSON format: ' + rawText.slice(0, 200));
    }
  }

  // Format into valid BlogArticleItem
  const article: BlogArticleItem = {
    id: parsed.id || parsed.slug || options.focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    slug: parsed.slug || parsed.id || options.focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: parsed.title || options.topicTitle || 'Handmade Jaipur Textiles',
    category: parsed.category || options.category || 'Craft Heritage',
    readTime: parsed.readTime || '8 min read',
    publishedDate: '',
    status: 'queued',
    excerpt: parsed.excerpt || '',
    coverImage: parsed.coverImage || '/products/sanganeri-vs-bagru.jpg',
    author: {
      name: parsed.author?.name || 'Ramam Textiles Guild',
      role: parsed.author?.role || 'Master Artisan & Sourcing Lead',
      bio: parsed.author?.bio || 'Documenting generational Indian craft heritage and non-toxic dye chemistry.'
    },
    contentSections: Array.isArray(parsed.contentSections) ? parsed.contentSections : [],
    table: parsed.table || undefined,
    faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
    leadCta: parsed.leadCta || {
      title: 'Plan Your Custom Sourcing & Sampling with Jaipur Artisans',
      description: 'Low MOQ production starting from 25 pieces per style. Direct artisan dispatch from Jaipur.',
      primaryBtnText: 'Contact Atelier / Start Sourcing (/contact)',
      primaryBtnLink: '/contact'
    },
    tags: Array.isArray(parsed.tags) ? parsed.tags : [options.focusKeyword],
    focusKeyword: options.focusKeyword
  };

  // Run SEO validation check
  const audit = calculateArticleSEOScore(article);
  article.seoScore = audit.score;

  if (onProgress) onProgress(`Complete! Quality & Guideline Score: ${audit.score}/100.`);

  return article;
}
