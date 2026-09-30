import React from 'react';
import { ArrowLeft, ChevronRight, Share2, BookOpen, Clock, Tag } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useApp } from '../context/AppContext';

interface JournalDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const JournalDetailPage: React.FC<JournalDetailPageProps> = ({ slug, onNavigate }) => {
  const { showToast } = useApp();
  const article = JOURNAL_ARTICLES.find(a => a.slug === slug) || JOURNAL_ARTICLES[0];
  const related = JOURNAL_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <button onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-stone-900">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => { onNavigate('/journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-stone-900">Journal</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 font-bold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <button 
            onClick={handleShare}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-stone-500 font-mono border-y border-stone-200 py-3">
          <span>By <strong>{article.author.name}</strong> ({article.author.role})</span>
          <span>•</span>
          <span>{article.publishedDate}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose prose-stone max-w-none text-stone-800 space-y-6 text-sm sm:text-base leading-relaxed">
        <p className="text-lg font-serif italic text-stone-700 bg-[#FAF7F2] p-6 rounded-xl border-l-4 border-[#942C29]">
          "{article.excerpt}"
        </p>

        {article.contentSections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            {sec.heading && (
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-6">{sec.heading}</h2>
            )}
            {sec.quote && (
              <blockquote className="border-l-2 border-[#D4AF37] pl-4 italic text-stone-700 my-4">
                {sec.quote}
              </blockquote>
            )}
            {sec.body && <p className="leading-relaxed">{sec.body}</p>}
          </div>
        ))}
      </div>

      {/* Tags */}
      {article.tags && (
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-stone-200">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          {article.tags.map(t => (
            <span key={t} className="px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-stone-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-stone-900">Recommended Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map(r => (
              <div 
                key={r.id}
                onClick={() => { onNavigate(`/journal/${r.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#FAF7F2] p-6 rounded-xl border border-stone-200 cursor-pointer hover:shadow-md transition-all space-y-2"
              >
                <span className="text-[10px] font-mono uppercase text-[#942C29] font-bold">{r.category}</span>
                <h4 className="font-serif font-bold text-stone-900 text-base leading-snug">{r.title}</h4>
                <p className="text-xs text-stone-600 line-clamp-2">{r.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
