import React, { useState } from 'react';
import { 
  X, CheckCircle2, Clock, Sparkles, BookOpen, Eye, 
  Flame, Calendar, Tag, User, ExternalLink, Edit3, ArrowRight, 
  Globe, Code, ChevronRight, Share2, Layers, AlertTriangle, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BlogArticleItem } from '../../../types/blog';
import { calculateArticleSEOScore } from '../../../utils/blogStorage';
import { resolveWebpImage } from '../../../utils/imageUtils';
import { PRODUCTS } from '../../../data/products';
import { useApp } from '../../../context/AppContext';

interface BlogReviewModalProps {
  article: BlogArticleItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPublish: (articleId: string, customDate?: string) => void;
  onUnpublish: (articleId: string) => void;
  onEdit: (article: BlogArticleItem) => void;
  onViewLive: (slug: string) => void;
}

export const BlogReviewModal: React.FC<BlogReviewModalProps> = ({
  article,
  isOpen,
  onClose,
  onPublish,
  onUnpublish,
  onEdit,
  onViewLive
}) => {
  const { showToast } = useApp();
  const [activeView, setActiveView] = useState<'audit' | 'preview'>('audit');
  const [customDate, setCustomDate] = useState(() => {
    const d = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });

  if (!isOpen || !article) return null;

  const seoResult = calculateArticleSEOScore(article);
  const isPublished = article.status === 'published';

  // Find matching product recommendation for simulator
  const matchedProduct = PRODUCTS.find(p => {
    const text = (article.title + ' ' + (article.tags || []).join(' ') + ' ' + article.category).toLowerCase();
    if (text.includes('indigo')) return p.slug.includes('indigo');
    if (text.includes('gsm') || text.includes('quilt')) return p.slug.includes('kantha');
    if (text.includes('sanganeri')) return p.slug.includes('sanganeri');
    return true;
  }) || PRODUCTS[7];

  const handleConfirmPublish = () => {
    onPublish(article.id, customDate);

    // Fire luxury celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#801B18', '#9B332C', '#D4AF37', '#FAF5EE']
      });
    } catch {}

    showToast(`"${article.title}" is now published live on the public journal!`, 'success');
  };

  // Generate schema preview
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: `https://ramamtextiles.shop${article.coverImage}`,
    datePublished: article.publishedDate || customDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ramam Textiles Jaipur',
      url: 'https://ramamtextiles.shop'
    },
    keywords: (article.tags || []).join(', ')
  }, null, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in font-royal-body">
      <div className="bg-[#FAF5EE] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-[#D4AF37]/50 overflow-hidden text-[#241A16]">
        {/* Top Header Bar */}
        <div className="bg-[#241A16] text-[#FAF5EE] px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#801B18] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-[#FAF5EE]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-playfair font-bold text-base text-[#FCE5A4]">
                  Editorial Review & Publishing Desk
                </span>
                {isPublished ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    LIVE ON SITE
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                    QUEUED FOR SIGN-OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-300">
                Inspect E-E-A-T depth, review full live preview, and launch post live.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle view mode */}
            <div className="flex items-center p-1 bg-white/10 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveView('audit')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'audit'
                    ? 'bg-[#801B18] text-white shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SEO & Editorial Audit</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'preview'
                    ? 'bg-[#801B18] text-white shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Reader Simulator</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeView === 'audit' ? (
            /* Tab 1: Editorial Audit & SEO Inspection */
            <div className="space-y-6">
              {/* Top Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Overall Quality
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-playfair text-3xl font-extrabold text-[#801B18]">
                      {seoResult.score}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Grade {seoResult.rating}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Out of 100 benchmark
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Content Depth
                  </span>
                  <div className="font-playfair text-3xl font-extrabold text-[#241A16]">
                    {seoResult.wordCount}
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block font-mono">
                    ~{seoResult.readingMinutes} min read duration
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Focus Keyword
                  </span>
                  <div className="text-sm font-bold text-[#801B18] font-mono truncate" title={article.focusKeyword}>
                    {article.focusKeyword || 'None assigned'}
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    {article.tags?.length || 0} taxonomy tags
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Calendar Target
                  </span>
                  <div className="text-base font-bold text-[#241A16] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>Day {article.targetDay || 'Queued'}</span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Category: {article.category}
                  </span>
                </div>
              </div>

              {/* Itemized SEO & E-E-A-T Checklist */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>E-E-A-T & Google Ranking Factor Checklist</span>
                  </h4>
                  <span className="text-xs text-stone-500 font-mono">
                    {seoResult.checks.filter(c => c.passed).length} of {seoResult.checks.length} criteria passed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {seoResult.checks.map((chk) => (
                    <div
                      key={chk.id}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-colors ${
                        chk.passed 
                          ? 'bg-emerald-50/50 border-emerald-200' 
                          : 'bg-amber-50/50 border-amber-200'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {chk.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={chk.passed ? 'text-emerald-900' : 'text-amber-900'}>
                            {chk.label}
                          </span>
                          <span className="font-mono text-[11px] text-stone-500">
                            +{chk.points}/{chk.maxPoints} pts
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          {chk.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Google Search Snippet Simulation */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <h4 className="font-playfair text-base font-bold text-[#241A16]">
                    Google SERP Search Result Simulation
                  </h4>
                </div>
                <div className="bg-[#FAF5EE] rounded-2xl p-4 sm:p-5 border border-stone-200 font-sans space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="w-4 h-4 rounded-full bg-[#801B18] text-[9px] text-white flex items-center justify-center font-bold">
                      RT
                    </span>
                    <span className="font-medium text-stone-800">ramamtextiles.shop</span>
                    <span>›</span>
                    <span className="text-stone-500">blog</span>
                    <span>›</span>
                    <span className="text-stone-500 truncate">{article.slug}</span>
                  </div>
                  <h5 className="text-base sm:text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug">
                    {article.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Content Section Outline with Word Counts */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9B332C]" />
                    <span>Article Content Structure ({article.contentSections?.length || 0} Sections)</span>
                  </h4>
                  <span className="text-xs text-stone-500 font-mono">
                    Author: {article.author.name} ({article.author.role})
                  </span>
                </div>

                <div className="space-y-3">
                  {article.contentSections?.map((section, idx) => {
                    const secWords = (section.body || '').split(/\s+/).filter(Boolean).length;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#801B18] font-playfair">
                            Section {idx + 1}: {section.heading || 'Editorial Commentary'}
                          </span>
                          <span className="font-mono text-[11px] text-stone-400">
                            {secWords} words
                          </span>
                        </div>

                        {section.quote && (
                          <div className="p-3 bg-[#FAF0EB] rounded-xl border-l-4 border-[#801B18] text-xs italic text-[#241A16]">
                            "{section.quote}"
                          </div>
                        )}

                        <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                          {section.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Schema JSON-LD Inspector */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-playfair text-base font-bold text-[#241A16]">
                    Schema.org BlogPosting Structured Data
                  </h4>
                </div>
                <pre className="bg-[#241A16] text-[#FCE5A4] p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-48">
                  {schemaJson}
                </pre>
              </div>
            </div>
          ) : (
            /* Tab 2: Live Public Reader Simulator */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8 max-w-4xl mx-auto font-royal-body">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Home</span>
                <ChevronRight className="w-3 h-3" />
                <span>Journal</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#9B332C] font-semibold">{article.category}</span>
              </div>

              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#FAF0EB] text-[#9B332C] font-bold font-royal-title tracking-wider uppercase border border-[#EACAC0]">
                    {article.category}
                  </span>
                  <span className="text-stone-400 font-mono">• {article.readTime}</span>
                  <span className="text-stone-400 font-mono">
                    • Published: {article.publishedDate || customDate}
                  </span>
                </div>

                <h1 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#241A16] leading-tight">
                  {article.title}
                </h1>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light italic">
                  {article.excerpt}
                </p>

                {/* Author Card */}
                <div className="flex items-center gap-3 pt-2 pb-4 border-b border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-[#801B18] text-[#FAF5EE] flex items-center justify-center font-bold text-sm shadow-xs font-playfair">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#241A16]">{article.author.name}</h5>
                    <p className="text-[11px] text-stone-500">{article.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Photographic Cover Image */}
              <div className="rounded-2xl overflow-hidden shadow-md max-h-96 w-full">
                <img
                  src={resolveWebpImage(article.coverImage)}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/products/duffle-indigo.jpg';
                  }}
                />
              </div>

              {/* Content Sections */}
              <div className="space-y-6 pt-4 text-stone-800 text-sm leading-relaxed">
                {article.contentSections?.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    {section.heading && (
                      <h3 className="font-playfair text-xl font-bold text-[#241A16] pt-2">
                        {section.heading}
                      </h3>
                    )}

                    {section.quote && (
                      <blockquote className="my-4 p-5 rounded-2xl bg-[#FAF0EB] border-l-4 border-[#801B18] text-stone-800 italic font-playfair text-base shadow-2xs">
                        "{section.quote}"
                      </blockquote>
                    )}

                    {/* Guideline 4: Section Table */}
                    {section.table && (
                      <div className="my-4 overflow-hidden rounded-xl border border-[#D4AF37]/40">
                        {section.table.caption && (
                          <div className="bg-[#FAF0EB] px-4 py-2 text-xs font-bold text-[#9B332C]">
                            📊 {section.table.caption}
                          </div>
                        )}
                        <table className="w-full text-xs text-left">
                          <thead className="bg-[#FAF5EE] text-[#241A16] font-bold">
                            <tr>
                              {section.table.headers.map((h, i) => (
                                <th key={i} className="px-3 py-2 border-b border-stone-200">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100">
                            {section.table.rows.map((r, ri) => (
                              <tr key={ri}>
                                {r.map((c, ci) => (
                                  <td key={ci} className="px-3 py-2">{c}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}

                {/* Guideline 4: Top-level Table */}
                {article.table && (
                  <div className="my-4 overflow-hidden rounded-xl border border-[#D4AF37]/40">
                    {article.table.caption && (
                      <div className="bg-[#FAF0EB] px-4 py-2 text-xs font-bold text-[#9B332C]">
                        📊 {article.table.caption}
                      </div>
                    )}
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#FAF5EE] text-[#241A16] font-bold">
                        <tr>
                          {article.table.headers.map((h, i) => (
                            <th key={i} className="px-3 py-2 border-b border-stone-200">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {article.table.rows.map((r, ri) => (
                          <tr key={ri}>
                            {r.map((c, ci) => (
                              <td key={ci} className="px-3 py-2">{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Guideline 7: FAQ Section */}
                {article.faqs && article.faqs.length > 0 && (
                  <div className="my-6 p-5 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/35 space-y-3">
                    <h4 className="font-playfair font-bold text-base text-[#241A16]">
                      Frequently Asked Questions
                    </h4>
                    <div className="space-y-2">
                      {article.faqs.map((f, fi) => (
                        <div key={fi} className="p-3 bg-white rounded-xl border border-stone-200">
                          <span className="font-bold text-xs text-[#9B332C] block mb-1">Q: {f.question}</span>
                          <span className="text-xs text-stone-700 block">{f.answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guideline 9: Lead Generation CTA to /contact */}
                <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-[#FAF0EB] to-[#FAF5EE] border-2 border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B332C]">Lead Generation CTA</span>
                    <h5 className="font-playfair font-bold text-base text-[#241A16]">
                      {article.leadCta?.title || 'Plan Your Custom Sourcing & Sampling with Jaipur Artisans'}
                    </h5>
                    <p className="text-xs text-stone-600">
                      {article.leadCta?.description || 'Low MOQ production starting from 25 pieces per style. Direct artisan dispatch from Jaipur.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onViewLive(article.slug)}
                    className="px-5 py-2.5 rounded-full bg-[#9B332C] text-white text-xs font-bold shrink-0 hover:bg-[#801B18] shadow-sm flex items-center gap-1.5"
                  >
                    <span>{article.leadCta?.primaryBtnText || 'Contact Atelier (/contact)'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-stone-200">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-stone-400" />
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Product Box */}
              <div className="p-6 rounded-3xl bg-[#FAF0EB] border border-[#EACAC0] space-y-4">
                <div className="flex items-center gap-2 text-[#9B332C]">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-royal-title text-xs font-bold uppercase tracking-wider">
                    Recommended Atelier Craft
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={resolveWebpImage(matchedProduct.images[0])}
                    alt={matchedProduct.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/40 shrink-0"
                  />
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="font-playfair font-bold text-sm text-[#241A16]">
                      {matchedProduct.name}
                    </h5>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {matchedProduct.description}
                    </p>
                    <span className="text-[11px] font-bold text-[#801B18] block">
                      MOQ: {matchedProduct.moq} Units • Fast Global Dispatch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-white px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-700">Publish Date:</span>
            <input
              type="text"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-800 focus:outline-none focus:border-[#9B332C]"
              title="Custom publish date for attribution"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onEdit(article)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Article</span>
            </button>

            {isPublished && (
              <button
                type="button"
                onClick={() => onViewLive(article.slug)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF5EE] hover:bg-[#FAF0EB] text-[#241A16] text-xs font-bold border border-[#D4AF37]/50 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#9B332C]" />
                <span>Open Live Link</span>
              </button>
            )}

            {!isPublished ? (
              <button
                type="button"
                onClick={handleConfirmPublish}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Confirm & Publish Live</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onUnpublish(article.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors"
              >
                <span>Move Back to Queue</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
