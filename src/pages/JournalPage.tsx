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
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#D4AF37]/25 border border-[#D4AF37]/45 rounded-full text-[#11352A] text-xs font-royal-title font-bold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Jaipur Craft Archive</span>
        </div>
        <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0B241C]">
          The Textile Journal &amp; Sourcing Guide
        </h1>
        <p className="text-[#164335]/80 font-royal-body text-base sm:text-lg leading-relaxed">
          In-depth technical guides, craft chronicles, natural dye chemistry, and export masterclasses for fashion designers and boutique founders.
        </p>
      </div>

      {/* Featured Lead Article */}
      {JOURNAL_POSTS[0] && (
        <div 
          onClick={() => { onNavigate(`/journal/${JOURNAL_POSTS[0].slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#FAF7EE] to-[#F3EEDB] p-6 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/35 cursor-pointer group hover:shadow-2xl transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-jaipur-jaali opacity-10 pointer-events-none" />

          <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/30">
            <img 
              src={JOURNAL_POSTS[0].image} 
              alt={JOURNAL_POSTS[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#11352A]">
              <span className="bg-[#11352A]/10 text-[#11352A] px-2.5 py-0.5 rounded-full font-royal-title font-bold uppercase">{JOURNAL_POSTS[0].category}</span>
              <span>•</span>
              <span className="font-royal-body">{JOURNAL_POSTS[0].readTime}</span>
            </div>
            <h2 className="font-royal-heading text-2xl sm:text-3xl font-bold text-[#0B241C] group-hover:text-[#11352A] transition-colors leading-snug">
              {JOURNAL_POSTS[0].title}
            </h2>
            <p className="text-stone-700 font-royal-body text-sm sm:text-base leading-relaxed">
              {JOURNAL_POSTS[0].excerpt}
            </p>
            <div className="pt-2 text-xs font-royal-title font-bold text-[#11352A] uppercase tracking-widest flex items-center gap-2">
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform" />
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
            className="group bg-white rounded-3xl overflow-hidden shadow-md border-2 border-[#D4AF37]/30 hover:shadow-2xl hover:border-[#11352A] transition-all cursor-pointer flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] border border-[#D4AF37]/50 px-3 py-1 rounded-full text-[10px] font-royal-title font-bold uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[11px] text-[#164335]/70 mb-2 flex items-center gap-2 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-royal-heading text-lg font-bold text-[#0B241C] group-hover:text-[#11352A] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs font-royal-body text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs font-royal-title font-bold text-[#11352A]">
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
