import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, FileText, Sparkles, ArrowRight, 
  Calendar, Layers, Flame, BookOpen, ExternalLink, Filter, Search 
} from 'lucide-react';
import { BlogArticleItem, BlogEditorialStats, BlogCalendarDay } from '../../../types/blog';
import { EDITORIAL_CALENDAR_SCHEDULE } from '../../../data/blogCalendarData';
import { resolveWebpImage } from '../../../utils/imageUtils';

interface BlogDashboardTabProps {
  stats: BlogEditorialStats;
  articles: BlogArticleItem[];
  nextQueued: BlogArticleItem | null;
  onReviewArticle: (article: BlogArticleItem) => void;
  onEditArticle: (article: BlogArticleItem) => void;
  onPublishArticle: (articleId: string) => void;
  onNavigateToTab: (tab: 'dashboard' | 'queue' | 'editor' | 'sync') => void;
  onViewLiveBlog: () => void;
}

export const BlogDashboardTab: React.FC<BlogDashboardTabProps> = ({
  stats,
  articles,
  nextQueued,
  onReviewArticle,
  onEditArticle,
  onPublishArticle,
  onNavigateToTab,
  onViewLiveBlog
}) => {
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'published' | 'queued'>('all');
  const [calendarSearch, setCalendarSearch] = useState('');

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const map: Record<string, number> = {};
    articles.forEach(a => {
      map[a.category] = (map[a.category] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [articles]);

  // Filtered calendar days
  const filteredCalendarDays = React.useMemo(() => {
    return EDITORIAL_CALENDAR_SCHEDULE.filter(day => {
      // Find matching live article if exists
      const liveMatch = articles.find(
        a => a.id === day.linkedArticleId || a.title.toLowerCase().includes(day.title.toLowerCase().slice(0, 15))
      );
      const isPublished = liveMatch ? liveMatch.status === 'published' : day.status === 'PUBLISHED';

      if (calendarFilter === 'published' && !isPublished) return false;
      if (calendarFilter === 'queued' && isPublished) return false;

      if (calendarSearch) {
        const q = calendarSearch.toLowerCase();
        return (
          day.title.toLowerCase().includes(q) ||
          day.focusKeyword.toLowerCase().includes(q) ||
          day.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [calendarFilter, calendarSearch, articles]);

  const calendarProgressPercent = Math.round((stats.published / 30) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Summary Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0EB] text-[#9B332C] text-xs font-bold font-royal-title tracking-wider uppercase border border-[#EACAC0]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Command & Publishing Desk</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#241A16]">
              Ramam Textiles Blog Administration
            </h2>
            <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
              Review, refine, and publish daily SEO authority guides. Track the 30-day organic search dominance schedule, inspect E-E-A-T depth, and launch posts live to the public journal with zero friction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onViewLiveBlog}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#FAF0EB] text-[#241A16] font-bold text-xs border border-[#D4AF37]/40 shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#9B332C]" />
              <span>View Public Blog</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab('editor')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>+ Write New Article</span>
            </button>
          </div>
        </div>

        {/* 30-Day Calendar Progress Bar */}
        <div className="mt-8 pt-6 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#241A16]">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>30-Day SEO Authority Road-map Progress</span>
            </span>
            <span className="font-mono text-[#9B332C]">
              {stats.published} of 30 Posts Published ({calendarProgressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
            <div 
              className="h-full bg-gradient-to-r from-[#801B18] via-[#9B332C] to-[#D4AF37] rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(5, calendarProgressPercent))}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div 
          onClick={() => onNavigateToTab('queue')}
          className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Published Live</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-playfair text-3xl font-extrabold text-stone-900 group-hover:text-emerald-700 transition-colors">
            {stats.published}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Live on website & Google indexable</p>
        </div>

        <div 
          onClick={() => onNavigateToTab('queue')}
          className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Queued for Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-playfair text-3xl font-extrabold text-stone-900 group-hover:text-amber-700 transition-colors">
            {stats.queued}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Ready for editorial sign-off</p>
        </div>

        <div 
          onClick={() => onNavigateToTab('queue')}
          className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Drafts in Progress</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="font-playfair text-3xl font-extrabold text-stone-900 group-hover:text-purple-700 transition-colors">
            {stats.drafts}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Unfinished authoring notes</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B332C]">Avg SEO Quality</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF0EB] text-[#9B332C] flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
          <div className="font-playfair text-3xl font-extrabold text-[#241A16] flex items-baseline gap-1">
            <span>{stats.averageSeoScore}</span>
            <span className="text-xs text-stone-400 font-sans font-normal">/100</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1 font-mono">
            {stats.totalWords.toLocaleString()} total words indexed
          </p>
        </div>
      </div>

      {/* Spotlight: Next Up to Publish Card */}
      {nextQueued && (
        <div className="bg-gradient-to-br from-[#FAF0EB] via-white to-[#FAF5EE] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/40 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#801B18] text-white text-[11px] font-bold font-royal-title tracking-wider uppercase flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Next in Editorial Queue</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-stone-700 text-xs font-semibold border border-stone-200">
                  {nextQueued.category}
                </span>
                {nextQueued.targetDay && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#241A16] text-xs font-bold font-mono">
                    Day {nextQueued.targetDay} of 30
                  </span>
                )}
                <span className="text-xs text-stone-500 font-mono">
                  • {nextQueued.readTime}
                </span>
              </div>

              <h3 className="font-playfair text-xl sm:text-2xl font-extrabold text-[#241A16] leading-snug">
                {nextQueued.title}
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {nextQueued.excerpt}
              </p>

              {nextQueued.focusKeyword && (
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <span className="font-bold text-[#801B18]">Target Keyword:</span>
                  <code className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800 font-mono text-[11px]">
                    {nextQueued.focusKeyword}
                  </code>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onReviewArticle(nextQueued)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Review & Publish Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onEditArticle(nextQueued)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs border border-stone-300 transition-all"
              >
                <span>Edit Article</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 30-Day Editorial Matrix & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: 30-Day Editorial Calendar Schedule */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/30 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#241A16] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#9B332C]" />
                <span>30-Day Editorial Calendar Matrix</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Target keyword schedule engineered for Indian craft & B2B textile sourcing dominance
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCalendarFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  calendarFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                All (30)
              </button>
              <button
                type="button"
                onClick={() => setCalendarFilter('published')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  calendarFilter === 'published' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setCalendarFilter('queued')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  calendarFilter === 'queued' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Queued
              </button>
            </div>
          </div>

          {/* Search within calendar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={calendarSearch}
              onChange={(e) => setCalendarSearch(e.target.value)}
              placeholder="Search scheduled calendar topics, keywords, or categories..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
            />
          </div>

          {/* Calendar List */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredCalendarDays.map((day) => {
              const liveArticle = articles.find(
                a => a.id === day.linkedArticleId || a.title.toLowerCase().includes(day.title.toLowerCase().slice(0, 15))
              );
              const isPublished = liveArticle ? liveArticle.status === 'published' : day.status === 'PUBLISHED';

              return (
                <div
                  key={day.day}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isPublished 
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50/70' 
                      : 'bg-white border-stone-200 hover:border-[#D4AF37] hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex flex-col items-center justify-center font-mono font-bold text-xs ${
                      isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                    }`}>
                      <span className="text-[9px] uppercase tracking-tighter opacity-70">Day</span>
                      <span>{day.day}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-playfair font-bold text-sm text-[#241A16]">
                          {day.title}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                          {day.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                        <span>Date: <strong className="text-stone-700">{day.date}</strong></span>
                        <span>•</span>
                        <span>Focus: <code className="text-[#801B18] font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-stone-200">{day.focusKeyword}</code></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {isPublished ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PUBLISHED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>QUEUED</span>
                      </span>
                    )}

                    {liveArticle ? (
                      <button
                        type="button"
                        onClick={() => onReviewArticle(liveArticle)}
                        className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-[#801B18] hover:text-white text-stone-700 text-xs font-bold transition-all"
                      >
                        Review
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onNavigateToTab('editor')}
                        className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-[#801B18] hover:text-white text-stone-700 text-xs font-bold transition-all"
                      >
                        Draft
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Category Breakdown & Sourcing Cluster Overview */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/30 shadow-sm space-y-4">
            <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#9B332C]" />
              <span>Category Distribution</span>
            </h3>
            <p className="text-xs text-stone-500">
              Content balance across artisan heritage, fabric sourcing, and manufacturing
            </p>

            <div className="space-y-3 pt-2">
              {categoryCounts.map(([cat, count]) => {
                const pct = Math.round((count / articles.length) * 100);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                      <span>{cat}</span>
                      <span className="font-mono text-stone-500">{count} posts ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#801B18] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Guide Card */}
          <div className="bg-[#FAF0EB] rounded-3xl p-6 border border-[#EACAC0] space-y-3">
            <div className="flex items-center gap-2 text-[#9B332C]">
              <Sparkles className="w-4 h-4" />
              <h4 className="font-royal-title text-xs font-bold uppercase tracking-wider">
                E-E-A-T Publishing Standard
              </h4>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Every blog post is tuned to answer specific B2B and consumer queries with zero fluff: technical GSM weights, laboratory dye certifications, botanical chemistry formulas, and low MOQ guidelines.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateToTab('sync')}
                className="text-xs text-[#801B18] hover:text-[#9B332C] font-bold flex items-center gap-1"
              >
                <span>View Code Export & Git Sync Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
