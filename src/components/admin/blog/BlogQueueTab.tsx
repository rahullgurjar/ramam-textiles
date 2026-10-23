import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle2, Clock, Layers, ArrowUpDown, 
  BookOpen, Edit3, Trash2, RotateCcw, Copy, ExternalLink, Flame, Sparkles, Tag, ArrowRight 
} from 'lucide-react';
import { BlogArticleItem, BlogArticleStatus } from '../../../types/blog';
import { resolveWebpImage } from '../../../utils/imageUtils';
import { useApp } from '../../../context/AppContext';

interface BlogQueueTabProps {
  articles: BlogArticleItem[];
  onReviewArticle: (article: BlogArticleItem) => void;
  onEditArticle: (article: BlogArticleItem) => void;
  onPublishArticle: (articleId: string) => void;
  onUnpublishArticle: (articleId: string) => void;
  onDeleteArticle: (articleId: string) => void;
  onCreateNew: () => void;
}

export const BlogQueueTab: React.FC<BlogQueueTabProps> = ({
  articles,
  onReviewArticle,
  onEditArticle,
  onPublishArticle,
  onUnpublishArticle,
  onDeleteArticle,
  onCreateNew
}) => {
  const { showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState<'all' | BlogArticleStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'day' | 'title' | 'seo' | 'date'>('day');

  // Unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(articles.map(a => a.category))).filter(Boolean);
  }, [articles]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: articles.length,
      published: articles.filter(a => a.status === 'published').length,
      queued: articles.filter(a => a.status === 'queued').length,
      draft: articles.filter(a => a.status === 'draft').length
    };
  }, [articles]);

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    return articles.filter(item => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSlug = item.slug.toLowerCase().includes(q);
        const matchesExcerpt = item.excerpt.toLowerCase().includes(q);
        const matchesAuthor = item.author.name.toLowerCase().includes(q);
        const matchesKeyword = item.focusKeyword?.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesSlug && !matchesExcerpt && !matchesAuthor && !matchesKeyword && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'day') {
        return (a.targetDay || 99) - (b.targetDay || 99);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'seo') {
        return (b.seoScore || 0) - (a.seoScore || 0);
      }
      if (sortBy === 'date') {
        return (b.publishedDate || '').localeCompare(a.publishedDate || '');
      }
      return 0;
    });
  }, [articles, statusFilter, categoryFilter, searchQuery, sortBy]);

  const handleCopySnippet = (art: BlogArticleItem) => {
    const code = JSON.stringify(art, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      showToast(`Article JSON copied to clipboard for "${art.title}".`, 'info');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Search & Filters */}
      <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/30 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-playfair text-xl font-bold text-[#241A16]">
              Article Review Queue & Library
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Review, edit, publish, or schedule textile journal guides and manufacturing articles.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <span>+ Write Article</span>
          </button>
        </div>

        {/* Primary Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 pb-3">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              statusFilter === 'all'
                ? 'bg-[#241A16] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <span>All Articles</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('queued')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              statusFilter === 'queued'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Queued for Review</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/30 font-mono">
              {counts.queued}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('published')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              statusFilter === 'published'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published Live</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/30 font-mono">
              {counts.published}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('draft')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              statusFilter === 'draft'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Drafts</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/30 font-mono">
              {counts.draft}
            </span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, keyword, slug, author, or tags..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
            >
              <option value="day">Sort by Calendar Day</option>
              <option value="seo">Sort by SEO Score (High-Low)</option>
              <option value="title">Sort by Title (A-Z)</option>
              <option value="date">Sort by Publish Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Article Cards Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
          <h4 className="font-playfair text-lg font-bold text-stone-800">No articles matched your filters</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try resetting your search query or switching to another category or status tab.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setCategoryFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => {
            const isPublished = article.status === 'published';
            const isQueued = article.status === 'queued';
            const score = article.seoScore || 0;

            return (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-[#D4AF37]/60 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
              >
                {/* Left: Thumbnail + Content */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative">
                    <img
                      src={resolveWebpImage(article.coverImage)}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/products/duffle-indigo.jpg';
                      }}
                    />
                    {article.targetDay && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono font-bold">
                        D{article.targetDay}
                      </span>
                    )}
                  </div>

                  {/* Meta & Title */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      {isPublished && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>PUBLISHED</span>
                        </span>
                      )}
                      {isQueued && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold font-mono">
                          <Clock className="w-3 h-3" />
                          <span>QUEUED FOR REVIEW</span>
                        </span>
                      )}
                      {article.status === 'draft' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold font-mono">
                          <Layers className="w-3 h-3" />
                          <span>DRAFT</span>
                        </span>
                      )}

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                        {article.category}
                      </span>

                      {/* SEO Score Pill */}
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        score >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        score >= 70 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        <Flame className="w-3 h-3" />
                        <span>SEO {score}/100</span>
                      </span>

                      <span className="text-[11px] text-stone-400 font-mono">
                        • {article.readTime}
                      </span>
                    </div>

                    <h4 className="font-playfair text-base sm:text-lg font-bold text-[#241A16] group-hover:text-[#9B332C] transition-colors leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-xs text-stone-600 line-clamp-1 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pt-0.5">
                      {article.focusKeyword && (
                        <span>
                          Keyword: <strong className="text-stone-800 font-mono">{article.focusKeyword}</strong>
                        </span>
                      )}
                      {article.publishedDate && (
                        <span>
                          Published: <strong className="text-stone-800">{article.publishedDate}</strong>
                        </span>
                      )}
                      <span>
                        Author: <span className="text-stone-700">{article.author.name}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100 w-full lg:w-auto justify-end">
                  {/* Primary Review Button */}
                  <button
                    type="button"
                    onClick={() => onReviewArticle(article)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF0EB] hover:bg-[#801B18] text-[#9B332C] hover:text-white text-xs font-bold border border-[#EACAC0] transition-all shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Review & Preview</span>
                  </button>

                  {/* Publish / Unpublish Action */}
                  {!isPublished ? (
                    <button
                      type="button"
                      onClick={() => onPublishArticle(article.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Publish Live</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onUnpublishArticle(article.id)}
                      title="Move back to Queued"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-semibold transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </button>
                  )}

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => onEditArticle(article)}
                    title="Edit article in editor"
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Copy snippet */}
                  <button
                    type="button"
                    onClick={() => handleCopySnippet(article)}
                    title="Copy article JSON"
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Delete / Archive */}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove "${article.title}"?`)) {
                        onDeleteArticle(article.id);
                      }
                    }}
                    title="Remove article"
                    className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
