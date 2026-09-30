import React from 'react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { JOURNAL_POSTS } from '../data/journal';

interface JournalPageProps {
  onNavigate: (path: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Jaipur Craft Archive</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
          The Textile Journal & Sourcing Guide
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          In-depth technical guides, craft chronicles, natural dye chemistry, and export masterclasses for fashion designers and boutique founders.
        </p>
      </div>

      {/* Featured Lead Article */}
      {JOURNAL_POSTS[0] && (
        <div 
          onClick={() => { onNavigate(`/journal/${JOURNAL_POSTS[0].slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl border border-amber-900/15 cursor-pointer group hover:shadow-xl transition-all"
        >
          <div className="lg:col-span-7 aspect-[16/10] rounded-xl overflow-hidden shadow-md">
            <img 
              src={JOURNAL_POSTS[0].image} 
              alt={JOURNAL_POSTS[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <span className="text-[#942C29] font-bold uppercase">{JOURNAL_POSTS[0].category}</span>
              <span>•</span>
              <span>{JOURNAL_POSTS[0].readTime}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-[#942C29] transition-colors leading-snug">
              {JOURNAL_POSTS[0].title}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {JOURNAL_POSTS[0].excerpt}
            </p>
            <div className="pt-2 text-xs font-serif font-bold text-[#942C29] uppercase tracking-wider flex items-center gap-2">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* All Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {JOURNAL_POSTS.slice(1).map(post => (
          <article 
            key={post.id}
            onClick={() => { onNavigate(`/journal/${post.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all cursor-pointer flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#0E1612]/90 text-[#D4AF37] px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-stone-500 mb-2 flex items-center gap-2 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#942C29] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-serif font-bold text-stone-900">
                <span className="text-[#942C29]">Read Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
