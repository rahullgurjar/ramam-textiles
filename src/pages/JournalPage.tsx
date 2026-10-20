import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, BookOpen, Search, X, Tag, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { JOURNAL_POSTS } from '../data/journal';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { usePageSEO } from '../utils/seo';

interface JournalPageProps {
  onNavigate: (path: string) => void;
}

const CATEGORIES = ['All', 'Craft Heritage', 'B2B Sourcing', 'Custom Manufacturing'];

export const JournalPage: React.FC<JournalPageProps> = ({ onNavigate }) => {
  const isBlogPath = typeof window !== 'undefined' && (window.location.pathname.includes('/blog') || window.location.pathname.includes('/blogs'));
  const basePath = isBlogPath ? '/blog' : '/journal';

  usePageSEO({
    title: 'Ramam Textiles • Artisan Blog & Sourcing Journal',
    description: 'Explore in-depth technical guides, Bagru Dabu indigo dyeing chemistry, pure mulmul cotton sourcing, and private label apparel manufacturing in Jaipur.',
    path: basePath
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getArticleUrl = (slug: string) => `${basePath}/${slug}`;

  // Filter articles based on category and search query
  const filteredPosts = useMemo(() => {
    return JOURNAL_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#FAF0EB] text-[#241A16] rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-[#D4AF37]/40 shadow-sm text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${resolveProductImage('/products/tote-pink-ruffle.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-[#FAF0EB]/85" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Jaipur Craft Archive &amp; Artisan Blog</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16]">
            The Textile Blog &amp; Sourcing Journal
          </h1>
          <p className="text-stone-700 font-royal-body text-base sm:text-lg leading-relaxed">
            In-depth technical guides, craft chronicles, natural dye chemistry, and export masterclasses for fashion designers, boutique founders, and global sourcing teams.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-lg mx-auto relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides (e.g. indigo, mulmul, low MOQ, block print)..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white/95 border border-[#D4AF37]/45 text-sm text-[#241A16] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9B332C]/30 shadow-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#9B332C]"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(category => {
            const count = category === 'All' 
              ? JOURNAL_POSTS.length 
              : JOURNAL_POSTS.filter(p => p.category === category).length;
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-royal-title font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#9B332C] text-white shadow-md'
                    : 'bg-[#FAF5EE] text-stone-600 hover:text-[#9B332C] hover:bg-[#FAF0EB] border border-[#D4AF37]/30'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-stone-500 font-royal-body">
          Showing <strong>{filteredPosts.length}</strong> of {JOURNAL_POSTS.length} artisan guides
        </div>
      </div>

      {/* If No Articles Found */}
      {filteredPosts.length === 0 && (
        <div className="bg-[#FAF5EE] rounded-3xl p-12 text-center border border-[#D4AF37]/35 space-y-4">
          <BookOpen className="w-12 h-12 text-[#9B332C]/40 mx-auto" />
          <h3 className="font-playfair text-2xl font-bold text-[#241A16]">No matching guides found</h3>
          <p className="text-stone-600 font-royal-body text-sm max-w-md mx-auto">
            We couldn't find any articles matching your search query "{searchQuery}". Try searching for terms like "indigo", "mulmul", or "screen print".
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-6 py-2.5 rounded-full bg-[#9B332C] text-white text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#801B18] transition-colors shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Featured Lead Article (Only when All or first item matches and no query) */}
      {featuredPost && (
        <a 
          href={getArticleUrl(featuredPost.slug)}
          onClick={(e) => { 
            e.preventDefault(); 
            onNavigate(getArticleUrl(featuredPost.slug)); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF5EE] p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/35 cursor-pointer group hover:shadow-2xl transition-all relative overflow-hidden block text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-jaipur-jaali opacity-10 pointer-events-none" />

          <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-[#D4AF37]/40">
            <picture className="w-full h-full block">
              <source srcSet={resolveWebpImage(featuredPost.image)} type="image/webp" />
              <img 
                src={resolveProductImage(featuredPost.image)} 
                alt={featuredPost.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
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
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] px-2.5 py-0.5 rounded-full font-royal-title font-bold uppercase shadow-sm">
                {featuredPost.category}
              </span>
              <span>•</span>
              <span className="font-royal-body text-stone-500">{featuredPost.readTime}</span>
              <span>•</span>
              <span className="font-royal-body text-stone-500">{featuredPost.date}</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16] group-hover:text-[#9B332C] transition-colors leading-snug">
              {featuredPost.title}
            </h2>
            <p className="text-stone-700 font-royal-body text-sm sm:text-base leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="pt-2 text-xs font-royal-title font-bold text-[#9B332C] uppercase tracking-widest flex items-center gap-2">
              <span>Read Full Sourcing Guide</span>
              <ArrowRight className="w-4 h-4 text-[#9B332C] group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </a>
      )}

      {/* All Remaining Articles Grid */}
      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post, pIdx) => (
            <a 
              key={post.id}
              href={getArticleUrl(post.slug)}
              onClick={(e) => { 
                e.preventDefault(); 
                onNavigate(getArticleUrl(post.slug)); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className={`group bg-[#FAF5EE] rounded-3xl overflow-hidden shadow-md border-2 hover:shadow-2xl transition-all cursor-pointer flex flex-col block text-left ${
                pIdx % 3 === 0 ? 'border-[#BFDBFE]/60 hover:border-[#1D4ED8]' : pIdx % 3 === 1 ? 'border-[#FBCFE8]/60 hover:border-[#BE185D]' : 'border-[#A7F3D0]/60 hover:border-[#047857]'
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <picture className="w-full h-full block">
                  <source srcSet={resolveWebpImage(post.image)} type="image/webp" />
                  <img
                    src={resolveProductImage(post.image)}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.dataset.fallbackTried) {
                        target.dataset.fallbackTried = 'true';
                        target.src = resolveProductImage('/products/duffle-kantha-patchwork.jpg');
                      }
                    }}
                  />
                </picture>
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-royal-title font-bold uppercase tracking-wider shadow-md border ${
                  pIdx % 3 === 0 
                    ? 'bg-[#1E295B] text-[#BFDBFE] border-[#60A5FA]' 
                    : pIdx % 3 === 1 
                    ? 'bg-[#831843] text-[#FBCFE8] border-[#F472B6]' 
                    : 'bg-[#064E3B] text-[#A7F3D0] border-[#34D399]'
                }`}>
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-stone-500 mb-2 flex items-center gap-2 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#241A16] group-hover:text-[#9B332C] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs font-royal-body text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs font-royal-title font-bold text-[#9B332C]">
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4 text-[#9B332C] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* B2B Sourcing Support CTA Banner */}
      <div className="bg-gradient-to-r from-[#FAF0EB] via-[#FAF5EE] to-[#FAF0EB] rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/45 shadow-sm text-center space-y-4 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4AF37]/35 text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Direct Jaipur Manufacturer Support</span>
          </div>
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
            Need Custom Sampling or Wholesale Swatch Booklets?
          </h3>
          <p className="text-stone-600 font-royal-body text-sm leading-relaxed">
            Our atelier provides physical strike-offs, Pantone lab-dips, and custom woodblock carving starting from low MOQs of 25 pieces. Ships worldwide via express air cargo.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => { onNavigate('/wholesale'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-2.5 rounded-full bg-[#9B332C] text-white text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#801B18] transition-colors shadow-md"
            >
              Wholesale Portal &amp; Pricing
            </button>
            <button
              onClick={() => { onNavigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-2.5 rounded-full bg-white text-[#241A16] border border-[#D4AF37]/50 text-xs font-royal-title font-bold uppercase tracking-wider hover:bg-[#FAF0EB] hover:text-[#9B332C] transition-colors shadow-sm"
            >
              Contact Atelier Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
