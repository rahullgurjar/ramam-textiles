import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Package, 
  Palette, 
  FileText,
  Search
} from 'lucide-react';
import { SEO_CLUSTERS, SEOClusterData } from '../data/seoClusters';
import { ALL_CLUSTER_KEYWORDS, KeywordEntry } from '../data/allClusterKeywords';
import { PRODUCTS } from '../data/products';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { usePageSEO } from '../utils/seo';

interface ClusterCollectionPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ClusterCollectionPage: React.FC<ClusterCollectionPageProps> = ({ slug, onNavigate }) => {
  const cluster: SEOClusterData = SEO_CLUSTERS[slug] || SEO_CLUSTERS['block-print-fabrics'];
  const [activeSubThemeIndex, setActiveSubThemeIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [isKeywordListExpanded, setIsKeywordListExpanded] = useState(false);

  const clusterKeywords: KeywordEntry[] = ALL_CLUSTER_KEYWORDS[cluster.slug] || [];
  const filteredKeywords = clusterKeywords.filter(k => 
    !keywordSearch || 
    k.keyword.toLowerCase().includes(keywordSearch.toLowerCase()) ||
    k.subTheme.toLowerCase().includes(keywordSearch.toLowerCase())
  );
  const visibleKeywords = isKeywordListExpanded ? filteredKeywords : filteredKeywords.slice(0, 48);

  // Set Dynamic Page SEO from Master Directory
  usePageSEO({
    title: cluster.seoTitle,
    description: cluster.metaDescription,
    path: cluster.path,
    image: cluster.heroImage
  });

  // Filter relevant products
  const matchingProducts = PRODUCTS.filter(p => {
    const text = `${p.name} ${p.description} ${p.fabric} ${p.category}`.toLowerCase();
    const clusterName = cluster.clusterHub.toLowerCase();
    if (cluster.slug === 'block-print-fabrics') {
      return text.includes('print') || text.includes('cotton') || text.includes('indigo') || text.includes('dabu') || text.includes('fabric');
    }
    if (cluster.slug === 'apparel-ethnic-wear') {
      return text.includes('kurti') || text.includes('dress') || text.includes('saree') || text.includes('suit') || text.includes('tunic');
    }
    if (cluster.slug === 'canvas-tote-bags') {
      return text.includes('tote') || text.includes('bag') || text.includes('duffle') || text.includes('canvas');
    }
    if (cluster.slug === 'wholesale-bulk-fabrics') {
      return true; // all products represent wholesale manufacturing capability
    }
    if (cluster.slug === 'home-living-decor') {
      return text.includes('cushion') || text.includes('pouch') || text.includes('quilted') || text.includes('vanity');
    }
    if (cluster.slug === 'craft-diy-supplies') {
      return text.includes('block') || text.includes('handcrafted') || text.includes('artisan');
    }
    return true;
  }).slice(0, 6);

  const activeSubTheme = cluster.subThemes[activeSubThemeIndex] || cluster.subThemes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-royal-body">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2 font-royal-title">
        <button 
          onClick={() => onNavigate('/')} 
          className="hover:text-[#9B332C] transition-colors uppercase tracking-wider font-semibold"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button 
          onClick={() => onNavigate('/collections')} 
          className="hover:text-[#9B332C] transition-colors uppercase tracking-wider font-semibold"
        >
          Collections
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-[#9B332C] uppercase tracking-wider font-bold">
          {cluster.clusterHub}
        </span>
      </nav>

      {/* 2. Hero Header Banner */}
      <header className="relative bg-[#FAF0EB] text-[#241A16] rounded-[32px] p-8 sm:p-12 overflow-hidden border border-[#D4AF37]/40 shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${resolveWebpImage(cluster.heroImage)}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF0EB] via-[#FAF0EB]/95 to-[#FAF0EB]/80" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 border border-[#D4AF37]/50 rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Jaipur Master Cluster • {cluster.targetPageType}</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16] leading-tight">
            {cluster.h1}
          </h1>

          <p className="text-stone-700 font-royal-body text-base sm:text-lg leading-relaxed max-w-3xl">
            {cluster.introParagraph}
          </p>

          {/* Quick Value Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block font-royal-title">MOQ</span>
              <span className="font-playfair text-sm sm:text-base font-bold text-[#9B332C]">Low Atelier MOQ</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block font-royal-title">Certifications</span>
              <span className="font-playfair text-sm sm:text-base font-bold text-[#9B332C]">AZO-Free • ISO 105</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block font-royal-title">Worldwide Freight</span>
              <span className="font-playfair text-sm sm:text-base font-bold text-[#9B332C]">3-7 Days Air Cargo</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block font-royal-title">Origin</span>
              <span className="font-playfair text-sm sm:text-base font-bold text-[#9B332C]">Jaipur, India</span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                onNavigate('/bulk-enquiry');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-rose px-7 py-3.5 rounded-full text-sm font-royal-title font-bold inline-flex items-center gap-2 shadow-lg"
            >
              <span>Request Wholesale Swatches & Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onNavigate('/shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full text-sm font-royal-title font-bold bg-white text-[#241A16] border border-[#D4AF37]/60 hover:bg-[#FAF5EE] transition-all shadow-sm"
            >
              Browse Ready Catalog SKUs
            </button>
          </div>
        </div>
      </header>

      {/* 3. Sub-Themes & Keyword Cluster Exploration */}
      <section className="bg-[#FAF5EE] p-6 sm:p-10 rounded-[32px] border border-[#D4AF37]/35 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
            <Search className="w-3.5 h-3.5" />
            <span>Keyword Matrix & Sub-Themes</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
            {cluster.h2s[0] || 'Artisan Specializations in this Collection'}
          </h2>
          <p className="text-stone-600 font-royal-body text-sm leading-relaxed max-w-3xl">
            Select an artisan theme below to inspect target fabric specifications, traditional printing methods, and high-demand commercial styles.
          </p>
        </div>

        {/* Sub-theme Navigation Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cluster.subThemes.map((st, idx) => (
            <button
              key={st.name}
              onClick={() => setActiveSubThemeIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-royal-title font-bold transition-all border ${
                activeSubThemeIndex === idx
                  ? 'bg-[#9B332C] text-white border-[#9B332C] shadow-md'
                  : 'bg-white text-stone-700 border-[#D4AF37]/40 hover:border-[#9B332C]'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>

        {/* Active Sub-theme Content Box */}
        {activeSubTheme && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <h3 className="font-playfair text-xl font-bold text-[#9B332C]">
                {activeSubTheme.name}
              </h3>
              <span className="text-xs font-royal-title uppercase tracking-wider text-stone-500 font-semibold">
                Authentic Jaipur Craftsmanship
              </span>
            </div>
            <p className="text-stone-700 font-royal-body text-sm sm:text-base leading-relaxed">
              {activeSubTheme.description}
            </p>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-royal-title block mb-2">
                Targeted Commercial Styles & Search Queries:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeSubTheme.topKeywords.map(kw => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5EEE6] text-[#241A16] border border-[#E0D5C7] rounded-full text-xs font-mono"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#9B332C]" />
                    <span>{kw}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3B. Complete Commercial Search Directory (Every Keyword from the Sheet) */}
      {clusterKeywords.length > 0 && (
        <section className="bg-white p-6 sm:p-10 rounded-[32px] border border-[#D4AF37]/35 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Exhaustive Sourcing Matrix • Master Directory</span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                Target Search & Technical Sourcing Directory ({clusterKeywords.length} Terms)
              </h2>
              <p className="text-stone-600 font-royal-body text-sm leading-relaxed max-w-2xl">
                Every verified search phrase and commercial fabric query mapped directly to our Jaipur manufacturing and printing workshop.
              </p>
            </div>

            {/* Keyword Live Search Bar */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keywordSearch}
                onChange={e => setKeywordSearch(e.target.value)}
                placeholder="Search keywords or sub-themes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#FAF5EE] text-xs font-medium text-[#241A16] placeholder:text-stone-400 focus:outline-none focus:border-[#9B332C] transition-colors"
              />
            </div>
          </div>

          {/* Keywords Tag Grid */}
          <div className="flex flex-wrap gap-2 pt-2">
            {visibleKeywords.map(k => (
              <div
                key={k.keyword}
                onClick={() => {
                  onNavigate(`/shop?query=${encodeURIComponent(k.keyword)}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF5EE] hover:bg-[#9B332C] hover:text-white border border-[#D4AF37]/30 hover:border-[#9B332C] rounded-full text-xs transition-all cursor-pointer shadow-xs"
                title={`Sub-Theme: ${k.subTheme} | Intent: ${k.intent} | Priority: ${k.priority}`}
              >
                <span className="font-medium">{k.keyword}</span>
                {k.monthlySearches > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/80 group-hover:bg-white/20 text-stone-600 group-hover:text-white border border-black/5">
                    {k.monthlySearches >= 1000 ? `${(k.monthlySearches / 1000).toFixed(0)}k/mo` : `${k.monthlySearches}/mo`}
                  </span>
                )}
              </div>
            ))}
          </div>

          {filteredKeywords.length > 48 && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setIsKeywordListExpanded(!isKeywordListExpanded)}
                className="px-6 py-2.5 rounded-full text-xs font-royal-title font-bold text-[#9B332C] border border-[#9B332C]/40 hover:bg-[#9B332C] hover:text-white transition-all shadow-sm"
              >
                {isKeywordListExpanded 
                  ? 'Show Less Keywords' 
                  : `Show All ${filteredKeywords.length} Target Keywords →`}
              </button>
            </div>
          )}
        </section>
      )}

      {/* 4. Curated Products Showcase */}
      {matchingProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
                Atelier Catalog
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                {cluster.h2s[1] || 'Featured SKUs & Wholesale Models'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-royal-title uppercase tracking-wider font-bold text-[#9B332C] hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Wholesale Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => {
                  onNavigate(`/product/${prod.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-[#FAF5EE] rounded-3xl p-5 border border-[#D4AF37]/30 hover:border-[#9B332C] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 border border-[#D4AF37]/20 relative">
                    <picture className="w-full h-full block">
                      <source srcSet={resolveWebpImage(prod.images[0])} type="image/webp" />
                      <img
                        src={resolveProductImage(prod.images[0])}
                        alt={`${prod.name} - ${cluster.mainTargetKeyword}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </picture>
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#FAF5EE]/90 backdrop-blur-sm text-[#9B332C] font-royal-title text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#D4AF37]/40 shadow-sm">
                      {prod.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-playfair text-lg font-bold text-[#241A16] group-hover:text-[#9B332C] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block font-royal-title font-semibold">Indicative Retail</span>
                    <span className="font-bold text-[#241A16] text-sm">₹{prod.indicativeRetailInr || 999}</span>
                  </div>
                  <span className="text-[#9B332C] font-royal-title font-bold uppercase tracking-wider group-hover:underline inline-flex items-center gap-1">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Technical Textile Specifications Table (E-E-A-T) */}
      <section className="bg-white p-6 sm:p-10 rounded-[32px] border border-[#D4AF37]/35 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
            Technical Standards & Quality Assurance
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
            {cluster.h2s[2] || 'Technical Specifications & Production Capabilities'}
          </h2>
          <p className="text-stone-600 font-royal-body text-sm leading-relaxed max-w-3xl">
            Our atelier adheres to rigorous international export standards. Review our benchmark fabric counts, dye fixations, and order minimums below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/25 space-y-1">
            <span className="text-xs font-royal-title uppercase tracking-wider text-stone-500 font-bold block">
              Fabric Composition & Base
            </span>
            <p className="text-sm font-semibold text-[#241A16]">{cluster.textileSpecs.material}</p>
          </div>

          <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/25 space-y-1">
            <span className="text-xs font-royal-title uppercase tracking-wider text-stone-500 font-bold block">
              Fabric Weight & Weave GSM
            </span>
            <p className="text-sm font-semibold text-[#241A16]">{cluster.textileSpecs.weaveGsm}</p>
          </div>

          <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/25 space-y-1">
            <span className="text-xs font-royal-title uppercase tracking-wider text-stone-500 font-bold block">
              Dye System & Safety Standards
            </span>
            <p className="text-sm font-semibold text-[#241A16]">{cluster.textileSpecs.dyeType}</p>
          </div>

          <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/25 space-y-1">
            <span className="text-xs font-royal-title uppercase tracking-wider text-stone-500 font-bold block">
              Sampling & Production Lead Time
            </span>
            <p className="text-sm font-semibold text-[#241A16]">{cluster.textileSpecs.leadTime}</p>
          </div>
        </div>

        {/* High-priority Quality Bullet Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
          {cluster.h3s.map(h3 => (
            <div key={h3} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#9B332C] shrink-0 mt-0.5" />
              <span className="text-xs text-stone-700 font-semibold">{h3}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Frequently Asked Questions (FAQ Accordion with Schema Markup) */}
      {cluster.faqs.length > 0 && (
        <section className="bg-[#FAF5EE] p-6 sm:p-10 rounded-[32px] border border-[#D4AF37]/35 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Buyer Knowledge Base</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
              Frequently Asked Questions About {cluster.clusterHub}
            </h2>
            <p className="text-stone-600 font-royal-body text-sm leading-relaxed max-w-3xl">
              Get immediate answers to wholesale ordering, international door-to-door courier dispatch, and custom printing specifications.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {cluster.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div 
                  key={faq.question}
                  className="bg-white rounded-2xl border border-[#D4AF37]/30 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-playfair font-bold text-base text-[#241A16] hover:text-[#9B332C] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className={`transform transition-transform text-[#9B332C] text-xl font-mono ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-stone-600 font-royal-body leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Pillar-Cluster Internal Linking Mesh */}
      <section className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#D4AF37]/35 shadow-sm space-y-4">
        <h3 className="font-playfair text-lg font-bold text-[#241A16]">
          Explore Related Artisan Clusters & Wholesale Hubs
        </h3>
        <p className="text-xs text-stone-500 font-royal-body">
          Connect with sibling craft chapters in Ramam Textiles’ Jaipur production atelier:
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          {cluster.relatedClusters.map(rc => (
            <button
              key={rc.slug}
              onClick={() => {
                onNavigate(`/collections/${rc.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF5EE] hover:bg-[#9B332C] hover:text-white border border-[#D4AF37]/40 rounded-full text-xs font-royal-title font-bold transition-all"
            >
              <span>{rc.name}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={() => onNavigate('/collections')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5EEE6] text-[#9B332C] border border-[#9B332C]/40 rounded-full text-xs font-royal-title font-bold hover:bg-[#9B332C] hover:text-white transition-all"
          >
            <span>All 6 Thematic Collections</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ClusterCollectionPage;
