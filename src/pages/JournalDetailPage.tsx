import React from 'react';
import { 
  ArrowLeft, ChevronRight, Share2, BookOpen, Clock, Tag, Sparkles, 
  MessageCircle, FileText, ShieldCheck, CheckCircle2, ArrowRight,
  HelpCircle, ChevronDown, ChevronUp, Table as TableIcon, Layers, Award
} from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { getBlogArticleBySlug, getPublishedArticles } from '../utils/blogStorage';
import { PRODUCTS } from '../data/products';
import { InstagramIcon } from '../components/InstagramIcon';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { usePageSEO } from '../utils/seo';

interface JournalDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const JournalDetailPage: React.FC<JournalDetailPageProps> = ({ slug, onNavigate }) => {
  const { showToast, openQuickQuote } = useApp();
  const article = getBlogArticleBySlug(slug) || JOURNAL_ARTICLES.find(a => a.slug === slug) || JOURNAL_ARTICLES[0];
  const allArticles = getPublishedArticles();
  const related = (allArticles.length > 0 ? allArticles : JOURNAL_ARTICLES).filter(a => a.slug !== article.slug).slice(0, 2);
  const isBlogPath = typeof window !== 'undefined' && (window.location.pathname.includes('/blog') || window.location.pathname.includes('/blogs'));
  const basePath = isBlogPath ? '/blog' : '/journal';
  const getArticleUrl = (articleSlug: string) => `${basePath}/${articleSlug}`;

  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // Find contextually matching Ramam Textiles product to recommend like a master consultant
  const featuredProduct = React.useMemo(() => {
    const text = (article.title + ' ' + (article.tags || []).join(' ') + ' ' + article.category + ' ' + article.excerpt).toLowerCase();
    if (text.includes('indigo') || text.includes('bagru')) {
      return PRODUCTS.find(p => p.slug.includes('indigo')) || PRODUCTS[8];
    }
    if (text.includes('sanganer') || text.includes('floral')) {
      return PRODUCTS.find(p => p.slug.includes('sanganeri') || p.slug.includes('blossom')) || PRODUCTS[2];
    }
    if (text.includes('kantha') || text.includes('gsm') || text.includes('quilt') || text.includes('weight')) {
      return PRODUCTS.find(p => p.slug.includes('kantha')) || PRODUCTS[7];
    }
    if (text.includes('kalamkari') || text.includes('woodblock') || text.includes('carv')) {
      return PRODUCTS.find(p => p.slug.includes('kalamkari')) || PRODUCTS[11];
    }
    if (text.includes('mordant') || text.includes('marigold') || text.includes('yellow')) {
      return PRODUCTS.find(p => p.slug.includes('marigold')) || PRODUCTS[4];
    }
    return PRODUCTS[7] || PRODUCTS[0];
  }, [article]);

  usePageSEO({
    title: `${article.title} | Ramam Textiles Journal`,
    description: article.excerpt,
    path: getArticleUrl(article.slug),
    image: article.coverImage
  });

  // Inject BlogPosting & FAQPage Structured Data into <head> for Google Rich Results
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const scriptId = 'blog-posting-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaGraph: any[] = [
      {
        '@type': 'BlogPosting',
        '@id': `https://ramamtextiles.shop${getArticleUrl(article.slug)}#article`,
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage.startsWith('http') ? article.coverImage : `https://ramamtextiles.shop${article.coverImage}`,
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ramam Textiles',
          logo: {
            '@type': 'ImageObject',
            url: 'https://ramamtextiles.shop/logo.png'
          }
        },
        mainEntityOfPage: `https://ramamtextiles.shop${getArticleUrl(article.slug)}`,
        datePublished: (article as any).publishedDate || '2026-10-20T08:00:00+05:30',
        keywords: article.tags ? article.tags.join(', ') : 'Jaipur hand block print, cotton sourcing'
      }
    ];

    if (article.faqs && article.faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': `https://ramamtextiles.shop${getArticleUrl(article.slug)}#faq`,
        mainEntity: article.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': schemaGraph
    };

    script.textContent = JSON.stringify(schemaData);
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [article, basePath]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  // Helper to render body paragraphs with strict under-3-lines readability & auto-bullet detection
  const renderFormattedBody = (text: string) => {
    if (!text) return null;
    const rawParagraphs = text.split(/\n\n+/).filter(Boolean);

    return rawParagraphs.map((para, pIdx) => {
      const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
      const isBulletList = lines.length > 1 && lines.every(l => /^(\d+[\.\)]|[•\-\*])\s/.test(l));

      if (isBulletList) {
        return (
          <ul key={pIdx} className="space-y-2.5 my-4 pl-1">
            {lines.map((item, iIdx) => {
              const cleanItem = item.replace(/^(\d+[\.\)]|[•\-\*])\s*/, '');
              return (
                <li key={iIdx} className="flex items-start gap-2.5 text-stone-700 text-sm sm:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B332C] mt-2.5 shrink-0" />
                  <span>{cleanItem}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="leading-relaxed text-stone-700 text-base sm:text-lg mb-4">
          {para}
        </p>
      );
    });
  };

  // Helper to render structured data tables
  const renderTable = (tableData: { caption?: string; headers: string[]; rows: string[][] }) => {
    if (!tableData || !tableData.headers || tableData.headers.length === 0) return null;
    return (
      <div className="my-8 overflow-hidden rounded-2xl border border-[#D4AF37]/45 shadow-sm bg-white">
        {tableData.caption && (
          <div className="bg-[#FAF0EB] px-5 py-3 border-b border-[#D4AF37]/35 text-xs font-royal-title font-bold uppercase tracking-wider text-[#9B332C] flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-[#9B332C]" />
            <span>{tableData.caption}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-[#E0D6CB] text-[#241A16] font-royal-title font-bold">
                {tableData.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3.5 border-r border-[#E0D6CB]/60 last:border-r-0 whitespace-nowrap bg-[#FAF5EE]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0D6CB]/60 font-royal-body">
              {tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-[#FAF5EE]/50 transition-colors' : 'bg-[#FAF5EE]/30 hover:bg-[#FAF5EE]/70 transition-colors'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-stone-700 border-r border-[#E0D6CB]/40 last:border-r-0">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Helper to render visual craft workflow / infographics
  const renderInfographic = (info: { title: string; subtitle?: string; steps: { step: string; title: string; desc: string }[] }) => {
    if (!info || !info.steps || info.steps.length === 0) return null;
    return (
      <div className="my-8 bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/45 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-royal-title uppercase tracking-widest text-[#9B332C] font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#9B332C]" /> Visual Craft Workflow &amp; Infographic
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#241A16]">
            {info.title}
          </h3>
          {info.subtitle && (
            <p className="text-xs sm:text-sm text-stone-600 font-royal-body">{info.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {info.steps.map((st, sIdx) => (
            <div key={sIdx} className="bg-white rounded-2xl p-5 border border-[#D4AF37]/35 shadow-sm relative space-y-2">
              <span className="inline-block px-2.5 py-1 bg-[#FAF0EB] text-[#9B332C] text-xs font-mono font-bold rounded-lg border border-[#EACAC0]">
                Step {st.step || (sIdx + 1)}
              </span>
              <h4 className="font-playfair font-bold text-[#241A16] text-base">{st.title}</h4>
              <p className="text-xs text-stone-600 font-royal-body leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper to render Frequently Asked Questions
  const renderFaqSection = (faqs: { question: string; answer: string }[]) => {
    if (!faqs || faqs.length === 0) return null;
    return (
      <section className="my-10 space-y-4 pt-6 border-t border-[#D4AF37]/25">
        <div className="space-y-1">
          <span className="text-xs font-royal-title text-[#9B332C] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#9B332C]" /> Frequently Asked Questions
          </span>
          <h3 className="font-playfair text-2xl font-bold text-[#241A16]">
            Direct Answers from Jaipur Master Artisans
          </h3>
          <p className="text-xs text-stone-600 font-royal-body">
            Common questions on craft authenticity, chemical safety, fabric weights, and wholesale minimums.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/35 overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-royal-title font-bold text-sm sm:text-base text-[#241A16] hover:text-[#9B332C] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#9B332C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 font-royal-body leading-relaxed border-t border-[#D4AF37]/20">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // Helper to render Author Profile Box
  const renderAuthorBox = (author: any) => {
    return (
      <div className="bg-[#FAF5EE] rounded-2xl p-6 border border-[#D4AF37]/40 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 my-8">
        <div className="w-16 h-16 rounded-full bg-[#FAF0EB] border-2 border-[#D4AF37] flex items-center justify-center text-[#9B332C] font-royal-title font-bold text-xl shrink-0 shadow-inner">
          {author.name.charAt(0)}
        </div>
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h4 className="font-playfair text-lg font-bold text-[#241A16]">{author.name}</h4>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] font-royal-title font-bold uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-[#9B332C]" /> Verified Artisan Author
            </span>
          </div>
          <p className="text-xs text-[#9B332C] font-royal-title font-semibold">{author.role}</p>
          <p className="text-xs text-stone-600 font-royal-body leading-relaxed">
            {author.bio || 'Veteran textile researcher and master artisan contributor at Ramam Textiles, Jaipur. Specializing in geographical indication block prints, natural dye fermentation chemistry, and export quality controls.'}
          </p>
        </div>
      </div>
    );
  };

  // Helper to render High-Converting Lead Generation CTA (redirecting to /contact)
  const renderLeadCta = (cta?: any) => {
    const title = cta?.title || "Plan Your Custom Collection or Sourcing With Jaipur Artisans";
    const desc = cta?.description || "Looking to commission custom woodblock prints, low-MOQ apparel, or certified organic fabrics? Our atelier team is here to assist with sampling, pricing, and rapid worldwide fulfillment.";
    const btnText = cta?.primaryBtnText || "Contact Atelier & Start Sourcing";
    const btnLink = cta?.primaryBtnLink || "/contact";

    return (
      <div className="my-10 bg-gradient-to-br from-[#FAF0EB] via-[#FAF5EE] to-[#FAF0EB] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-lg relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/35 text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Jaipur Production &amp; Sampling Desk</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16] leading-snug">
              {title}
            </h3>
            <p className="text-stone-700 font-royal-body text-sm leading-relaxed">
              {desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate(btnLink);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-[#9B332C] text-white text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#801B18] transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>{btnText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => openQuickQuote()}
              className="px-5 py-3 rounded-full bg-white text-[#241A16] border border-[#D4AF37]/50 text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#FAF0EB] hover:text-[#9B332C] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 font-royal-body">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-royal-body">
        <button onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#9B332C] hover:underline font-royal-title font-bold">Atelier</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => { onNavigate(basePath); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#9B332C] hover:underline font-royal-title font-bold">Artisan Blog &amp; Journal</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-[#241A16] font-bold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header (H1) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1.5 bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] rounded-full text-xs font-royal-title font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <button 
            onClick={handleShare}
            className="p-2.5 text-stone-600 hover:text-[#9B332C] rounded-full hover:bg-stone-100 border border-stone-200 transition-colors"
            title="Share article"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Guideline 2: H1 Main Heading */}
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#241A16] leading-tight">
          {article.title}
        </h1>

        {/* Guideline 6: Author Information Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 font-mono border-y border-[#E0D6CB] py-3">
          <div className="flex items-center gap-2">
            <span>By <strong>{article.author.name}</strong> ({article.author.role})</span>
            <span>•</span>
            <span>{(article as any).publishedDate || 'Published'}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <a
            href="https://www.instagram.com/ramamtextiles"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#9B332C] hover:text-[#241A16] font-royal-title font-bold transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>@ramamtextiles</span>
          </a>
        </div>

        {/* Fact-Checked & Verified Guild Hallmark Seal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#FAF0EB] rounded-2xl border border-[#EACAC0] text-xs">
          <div className="flex items-center gap-2 text-[#047857] font-semibold font-royal-title">
            <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0" />
            <span>Verified Artisan Guild Standard</span>
          </div>
          <span className="text-[11px] text-stone-600 font-royal-body">
            Researched &amp; cross-referenced with GI Hand Block Registries, AZO-Free Chemical Norms &amp; Jaipur Master Artisan Archives.
          </span>
        </div>
      </div>

      {/* Guideline 5: Featured Image */}
      <div className="aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl border border-[#E0D6CB]">
        <picture className="w-full h-full block">
          <source srcSet={resolveWebpImage(article.coverImage)} type="image/webp" />
          <img 
            src={resolveProductImage(article.coverImage)} 
            alt={article.title} 
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover" 
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (!target.dataset.fallbackTried) {
                target.dataset.fallbackTried = 'true';
                target.src = resolveProductImage('/products/duffle-kantha-patchwork.jpg');
              }
            }}
          />
        </picture>
      </div>

      {/* Article Excerpt */}
      <div className="font-royal-body max-w-none text-stone-800 space-y-6 text-base sm:text-lg leading-relaxed">
        <p className="text-lg sm:text-xl font-editorial italic text-[#241A16] bg-[#FAF5EE] p-6 sm:p-8 rounded-2xl border-l-4 border-[#9B332C] border border-[#D4AF37]/30 shadow-sm">
          "{article.excerpt}"
        </p>

        {/* Infographic (if article has a top-level infographic) */}
        {article.infographic && renderInfographic(article.infographic)}

        {/* Article Content Sections with H2, H3, Bullets, Tables, and Short Paragraphs */}
        {article.contentSections.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            {/* Guideline 2: H2 Heading */}
            {sec.heading && (
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16] mt-8 mb-2">
                {sec.heading}
              </h2>
            )}

            {/* Guideline 2: H3 Subheading */}
            {sec.subheading && (
              <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-[#9B332C] mt-4 mb-2">
                {sec.subheading}
              </h3>
            )}

            {/* Pull Quote */}
            {sec.quote && (
              <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-[#9B332C] my-4 font-editorial text-lg bg-[#FAF5EE]/60 p-4 rounded-r-xl">
                {sec.quote}
              </blockquote>
            )}

            {/* Guideline 1 & 3: Short Paragraphs (< 3 lines) and Bullets */}
            {sec.body && renderFormattedBody(sec.body)}

            {/* Explicit Bullets Array */}
            {sec.bullets && sec.bullets.length > 0 && (
              <ul className="space-y-2.5 my-4 pl-1">
                {sec.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-stone-700 text-sm sm:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B332C] mt-2.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* In-section Image or Infographic */}
            {sec.image && (
              <div className="my-6 rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-md">
                <img src={resolveProductImage(sec.image)} alt={sec.imageCaption || sec.heading || 'Craft detail'} className="w-full h-auto object-cover max-h-96" />
                {sec.imageCaption && (
                  <div className="bg-[#FAF5EE] px-4 py-2 text-xs text-stone-600 font-royal-body italic border-t border-[#D4AF37]/20">
                    📷 {sec.imageCaption}
                  </div>
                )}
              </div>
            )}

            {/* Guideline 4: Section-level Data Table */}
            {sec.table && renderTable(sec.table)}
          </div>
        ))}

        {/* Guideline 4: Top-level Data Table (if defined at article level) */}
        {article.table && renderTable(article.table)}

        {/* Guideline 6: Author Details Card */}
        {article.author && renderAuthorBox(article.author)}

        {/* Guideline 7: FAQ Section */}
        {article.faqs && article.faqs.length > 0 && renderFaqSection(article.faqs)}

        {/* Guideline 9: Lead Generation CTA Redirecting to /contact */}
        {renderLeadCta(article.leadCta)}
      </div>

      {/* Consultative Luxury Sales Showcase */}
      {featuredProduct && (
        <section className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/45 shadow-lg relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-4">
            <div>
              <span className="text-[10px] font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
                The Living Craft in Our Atelier
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#241A16] mt-0.5">
                Experience This Heritage Technique Handcrafted by Our Artisans
              </h3>
            </div>
            <span className="text-[11px] px-3 py-1 bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] rounded-full font-royal-title font-bold uppercase tracking-wider self-start sm:self-auto shrink-0">
              Low MOQ: {featuredProduct.moq} Pcs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Product Image */}
            <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-md bg-stone-100 group">
              <picture className="w-full h-full block">
                <source srcSet={resolveWebpImage(featuredProduct.images[0])} type="image/webp" />
                <img
                  src={resolveProductImage(featuredProduct.images[0])}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>
            </div>

            {/* Product Consultative Sales Details */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="space-y-1">
                <span className="text-xs text-[#9B332C] font-royal-title font-bold uppercase tracking-wider">
                  {featuredProduct.collection}
                </span>
                <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#241A16]">
                  {featuredProduct.name}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-royal-body leading-relaxed">
                If you value the authentic craft standards detailed in this guide, our Jaipur workshop brings them to life in small, mindful batches. Tailored for independent boutique labels and luxury retail buyers who insist on genuine hand-carved woodblocks and 100% combed cotton.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs font-royal-body text-stone-600">
                <span className="px-2.5 py-1 bg-white rounded-lg border border-[#D4AF37]/30">
                  <strong>Fabric:</strong> {featuredProduct.fabric}
                </span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-[#D4AF37]/30">
                  <strong>Technique:</strong> {featuredProduct.printTechnique}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onNavigate(`/product/${featuredProduct.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#9B332C] text-white text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#801B18] transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Explore This Creation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => openQuickQuote()}
                  className="px-5 py-2.5 rounded-full bg-white text-[#241A16] border border-[#D4AF37]/50 text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#FAF0EB] hover:text-[#9B332C] transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Request Wholesale Swatch</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Official Atelier Instagram Spotlight Card */}
      <div className="bg-[#FAF0EB] rounded-3xl p-6 sm:p-7 border border-[#EACAC0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-md flex items-center justify-center shrink-0">
            <InstagramIcon className="w-7 h-7 text-[#9B332C]" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-royal-title text-[#9B332C] font-bold uppercase tracking-wider">Follow Our Artisan Journey</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9B332C]/10 text-[#9B332C] font-mono font-bold">@ramamtextiles</span>
            </div>
            <h4 className="font-playfair text-lg font-bold text-[#241A16] mt-0.5">
              Live Printing Videos &amp; Workshop Reels from Jaipur
            </h4>
            <p className="text-xs text-stone-600 font-royal-body mt-1">
              Watch master woodcarvers, natural indigo vat stirrings, and behind-the-scenes production reels daily on Instagram.
            </p>
          </div>
        </div>
        <a
          href="https://www.instagram.com/ramamtextiles"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 rounded-full bg-[#9B332C] text-white text-xs font-royal-title font-bold uppercase tracking-widest hover:bg-[#801B18] transition-all shadow-md shrink-0 flex items-center gap-2 group"
        >
          <InstagramIcon className="w-4 h-4 text-white" />
          <span>Follow @ramamtextiles</span>
        </a>
      </div>

      {/* Tags */}
      {article.tags && (
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#D4AF37]/25">
          <span className="text-xs font-royal-title font-bold text-[#241A16] uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#9B332C]" /> Tags:
          </span>
          {article.tags.map(t => (
            <button 
              key={t} 
              onClick={() => { onNavigate(basePath); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-1 bg-[#F5EDE1] text-[#241A16] hover:bg-[#FAF0EB] hover:text-[#9B332C] border border-[#D4AF37]/35 rounded-full text-xs font-royal-body font-semibold transition-colors cursor-pointer"
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-[#D4AF37]/25 space-y-6">
          <h3 className="font-playfair text-2xl font-bold text-[#241A16]">Recommended Sourcing Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map(r => (
              <div 
                key={r.id}
                onClick={() => { onNavigate(getArticleUrl(r.slug)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#FAF5EE] p-6 rounded-2xl border border-[#D4AF37]/35 cursor-pointer hover:shadow-xl hover:border-[#9B332C] transition-all space-y-2.5"
              >
                <span className="text-[10px] font-royal-title uppercase text-[#9B332C] font-bold">{r.category}</span>
                <h4 className="font-playfair font-bold text-[#241A16] text-lg leading-snug">{r.title}</h4>
                <p className="text-xs font-royal-body text-stone-600 line-clamp-2">{r.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
