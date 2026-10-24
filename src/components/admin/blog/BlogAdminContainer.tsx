import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, Edit3, Database, Sparkles, 
  CheckCircle2, Clock, ExternalLink, ArrowLeft, Plus, Flame, ShieldCheck 
} from 'lucide-react';
import { 
  getAllBlogArticles, 
  getBlogEditorialStats, 
  getNextQueuedBlogArticle, 
  publishBlogArticle, 
  unpublishBlogArticle, 
  deleteBlogArticle, 
  saveBlogArticle 
} from '../../../utils/blogStorage';
import { BlogArticleItem, BlogEditorialStats } from '../../../types/blog';
import { BlogDashboardTab } from './BlogDashboardTab';
import { BlogQueueTab } from './BlogQueueTab';
import { BlogEditorTab } from './BlogEditorTab';
import { BlogSyncTab } from './BlogSyncTab';
import { BlogReviewModal } from './BlogReviewModal';
import { BlogClaudeWriterTab } from './BlogClaudeWriterTab';
import { useApp } from '../../../context/AppContext';

interface BlogAdminContainerProps {
  onNavigate?: (path: string) => void;
  onBackToSecurity?: () => void;
  onBackToSEO?: () => void;
}

export type BlogAdminTabId = 'dashboard' | 'queue' | 'claude-writer' | 'editor' | 'sync';

export const BlogAdminContainer: React.FC<BlogAdminContainerProps> = ({
  onNavigate,
  onBackToSecurity,
  onBackToSEO
}) => {
  const { showToast } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState<BlogAdminTabId>('dashboard');

  // Master Data
  const [articles, setArticles] = useState<BlogArticleItem[]>(() => getAllBlogArticles());
  const [stats, setStats] = useState<BlogEditorialStats>(() => getBlogEditorialStats());
  const [nextQueued, setNextQueued] = useState<BlogArticleItem | null>(() => getNextQueuedBlogArticle());

  // Review & Edit Modal / View states
  const [reviewArticle, setReviewArticle] = useState<BlogArticleItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticleItem | null>(null);

  // Sync state helper
  const reloadArticles = () => {
    const list = getAllBlogArticles();
    setArticles(list);
    setStats(getBlogEditorialStats());
    setNextQueued(getNextQueuedBlogArticle());
  };

  // Listen to window event for cross-tab or cross-component sync
  useEffect(() => {
    const handleUpdate = () => {
      reloadArticles();
    };
    window.addEventListener('rt:blog-updated', handleUpdate);
    return () => window.removeEventListener('rt:blog-updated', handleUpdate);
  }, []);

  // Handlers
  const handleOpenReview = (article: BlogArticleItem) => {
    setReviewArticle(article);
    setIsReviewModalOpen(true);
  };

  const handleOpenEdit = (article: BlogArticleItem) => {
    setEditingArticle(article);
    setActiveTab('editor');
    setIsReviewModalOpen(false);
  };

  const handleCreateNew = () => {
    setEditingArticle(null);
    setActiveTab('editor');
  };

  const handlePublish = (articleId: string, customDate?: string) => {
    const updated = publishBlogArticle(articleId, customDate);
    reloadArticles();
    if (reviewArticle && reviewArticle.id === articleId) {
      setReviewArticle(updated);
    }
  };

  const handleUnpublish = (articleId: string) => {
    unpublishBlogArticle(articleId);
    reloadArticles();
    if (reviewArticle && reviewArticle.id === articleId) {
      setReviewArticle(prev => prev ? { ...prev, status: 'queued', publishedDate: '' } : null);
    }
    showToast('Article moved back to queued review.', 'info');
  };

  const handleDelete = (articleId: string) => {
    deleteBlogArticle(articleId);
    reloadArticles();
    if (reviewArticle && reviewArticle.id === articleId) {
      setIsReviewModalOpen(false);
    }
    showToast('Article removed.', 'info');
  };

  const handleSaveDraft = (article: BlogArticleItem) => {
    saveBlogArticle(article);
    reloadArticles();
    showToast(`Draft saved for "${article.title}".`, 'info');
    setActiveTab('queue');
  };

  const handlePublishFromEditor = (article: BlogArticleItem) => {
    saveBlogArticle({
      ...article,
      status: 'published'
    });
    publishBlogArticle(article.id, article.publishedDate);
    reloadArticles();
    showToast(`"${article.title}" published live!`, 'success');
    setActiveTab('queue');
  };

  const handleViewLiveBlog = (slug?: string) => {
    const target = slug ? `/blog/${slug}` : '/blog';
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.href = target;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#241A16] font-royal-body pb-16">
      {/* Top Banner & Tab Navigation */}
      <div className="bg-[#FAF0EB] border-b border-[#D4AF37]/30 shadow-2xs sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#801B18] text-[#FAF5EE] flex items-center justify-center shadow-md font-bold text-lg font-playfair">
              RT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-lg sm:text-xl font-extrabold text-[#241A16] tracking-wide">
                  Blog Review & Publishing Panel
                </h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#801B18] text-white font-mono font-bold">
                  {stats.published} Live
                </span>
                {stats.queued > 0 && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-mono font-bold">
                    {stats.queued} Queued
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Editorial Review, E-E-A-T Quality Inspector & Daily 30-Day Pipeline
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('claude-writer')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#9B332C] to-[#801B18] hover:brightness-110 text-white text-xs font-bold shadow-sm transition-all border border-[#D4AF37]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Write with Claude (3.7)</span>
            </button>

            {nextQueued && (
              <button
                type="button"
                onClick={() => handleOpenReview(nextQueued)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white text-xs font-bold shadow-sm transition-all"
              >
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Review Next Queued Post</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold border border-stone-200 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#801B18]" />
              <span>+ New Post</span>
            </button>

            <button
              type="button"
              onClick={() => handleViewLiveBlog()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Blog</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-[#D4AF37]/20 pt-2 pb-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-[#801B18] text-white shadow-xs'
                : 'text-stone-600 hover:bg-white/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard & Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('claude-writer')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'claude-writer'
                ? 'bg-[#801B18] text-white shadow-xs'
                : 'text-[#9B332C] hover:bg-[#FAF0EB] bg-[#FAF5EE] border border-[#D4AF37]/35'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Claude AI Writer</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#9B332C] text-white font-mono font-bold uppercase">
              3.7
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'queue'
                ? 'bg-[#801B18] text-white shadow-xs'
                : 'text-stone-600 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>All Articles & Review Queue</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-mono">
              {articles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'editor'
                ? 'bg-[#801B18] text-white shadow-xs'
                : 'text-stone-600 hover:bg-white/60'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{editingArticle ? 'Edit Article' : 'Write Article'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sync'
                ? 'bg-[#801B18] text-white shadow-xs'
                : 'text-stone-600 hover:bg-white/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Code Export & Sync</span>
          </button>
        </div>
      </div>

      {/* Main Tab View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <BlogDashboardTab
            stats={stats}
            articles={articles}
            nextQueued={nextQueued}
            onReviewArticle={handleOpenReview}
            onEditArticle={handleOpenEdit}
            onPublishArticle={handlePublish}
            onNavigateToTab={setActiveTab}
            onViewLiveBlog={() => handleViewLiveBlog()}
          />
        )}

        {activeTab === 'claude-writer' && (
          <BlogClaudeWriterTab
            onOpenReview={handleOpenReview}
            onOpenEdit={handleOpenEdit}
            onArticlePublished={() => {
              reloadArticles();
              setActiveTab('queue');
            }}
          />
        )}

        {activeTab === 'queue' && (
          <BlogQueueTab
            articles={articles}
            onReviewArticle={handleOpenReview}
            onEditArticle={handleOpenEdit}
            onPublishArticle={handlePublish}
            onUnpublishArticle={handleUnpublish}
            onDeleteArticle={handleDelete}
            onCreateNew={handleCreateNew}
          />
        )}

        {activeTab === 'editor' && (
          <BlogEditorTab
            initialArticle={editingArticle}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublishFromEditor}
            onPreview={handleOpenReview}
            onCancel={() => setActiveTab('queue')}
          />
        )}

        {activeTab === 'sync' && (
          <BlogSyncTab
            articles={articles}
            onReload={reloadArticles}
          />
        )}
      </div>

      {/* Deep Review & Live Preview Modal */}
      <BlogReviewModal
        article={reviewArticle}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        onEdit={handleOpenEdit}
        onViewLive={(slug) => handleViewLiveBlog(slug)}
      />
    </div>
  );
};
