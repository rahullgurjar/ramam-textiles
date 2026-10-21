import React from 'react';
import { 
  FileText, CheckCircle2, AlertTriangle, AlertCircle, Image as ImageIcon, 
  Link2, Sparkles, ArrowRight, TrendingUp, Layers, RefreshCw, ShieldAlert, Edit3
} from 'lucide-react';
import { PageSEOData, SiteWideAuditSummary } from '../../types/seo';

interface SEOOverviewTabProps {
  pages: PageSEOData[];
  auditSummary: SiteWideAuditSummary;
  onSelectPage: (path: string) => void;
  onNavigateTab: (tabId: string) => void;
  onRefreshAudit: () => void;
}

export const SEOOverviewTab: React.FC<SEOOverviewTabProps> = ({
  pages,
  auditSummary,
  onSelectPage,
  onNavigateTab,
  onRefreshAudit
}) => {
  const unsavedCount = pages.filter(p => p.hasUnsavedChanges || p.status === 'draft').length;
  const completedCount = pages.filter(p => p.seoTitle && p.metaDescription && p.canonicalUrl).length;

  // Pages with errors or warnings for Quick Action priority list
  const criticalPages = pages.filter(p => {
    return !p.seoTitle || !p.metaDescription || (p.robotsDirectives.includes('noindex') && p.pageType !== 'legal');
  }).slice(0, 6);

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Top Banner & Quick Refresh */}
      <div className="bg-gradient-to-r from-[#241A16] via-[#3a201c] to-[#241A16] text-[#FAF5EE] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#D4AF37]/20 text-[#FCE5A4] border border-[#D4AF37]/40">
              Live Production Console
            </span>
            <span className="text-xs text-stone-300">
              {auditSummary.totalPages} Registered Routes Verified
            </span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Manual On-Page SEO Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1.5 max-w-2xl leading-relaxed">
            Configure, validate, preview, and publish metadata, OpenGraph, JSON-LD schema, and image alt attributes across Ramam Textiles without redeploying code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRefreshAudit}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Audit Site</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('all-pages')}
            className="inline-flex items-center gap-2 pill-btn-rose px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <span>Manage All Pages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (8 Cards as requested in Prompt) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Website Pages */}
        <div 
          onClick={() => onNavigateTab('all-pages')}
          className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Website Pages</span>
            <FileText className="w-5 h-5 text-stone-400 group-hover:text-[#9B332C] transition-colors" />
          </div>
          <div className="text-2xl font-black text-stone-900">{auditSummary.totalPages}</div>
          <div className="text-[11px] text-stone-500 mt-1">Real routes & static entrypoints</div>
        </div>

        {/* 2. SEO Metadata Completed */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">SEO Completed</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900">{completedCount} <span className="text-xs font-normal text-emerald-700">/ {pages.length}</span></div>
          <div className="text-[11px] text-emerald-700 mt-1">
            {Math.round((completedCount / (pages.length || 1)) * 100)}% coverage with title & desc
          </div>
        </div>

        {/* 3. Missing Titles */}
        <div className="bg-white rounded-2xl p-5 border border-red-200 shadow-sm">
          <div className="flex items-center justify-between text-red-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Missing Titles</span>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-900">{auditSummary.missingTitles}</div>
          <div className="text-[11px] text-red-700 mt-1">
            {auditSummary.missingTitles === 0 ? 'All pages have SEO titles' : 'Pages requiring immediate title tag'}
          </div>
        </div>

        {/* 4. Missing Meta Descriptions */}
        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Missing Descriptions</span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900">{auditSummary.missingDescriptions}</div>
          <div className="text-[11px] text-amber-700 mt-1">
            {auditSummary.missingDescriptions === 0 ? '100% snippet coverage' : 'Pages missing SERP snippets'}
          </div>
        </div>

        {/* 5. Missing Canonicals */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Missing Canonicals</span>
            <Link2 className="w-5 h-5 text-stone-400" />
          </div>
          <div className="text-2xl font-black text-stone-900">{auditSummary.missingCanonicals}</div>
          <div className="text-[11px] text-stone-500 mt-1">Self-referencing canonical links</div>
        </div>

        {/* 6. Missing Image Alt Text */}
        <div 
          onClick={() => onNavigateTab('image-seo')}
          className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Images Missing Alt</span>
            <ImageIcon className="w-5 h-5 text-stone-400 group-hover:text-[#9B332C] transition-colors" />
          </div>
          <div className="text-2xl font-black text-stone-900">{auditSummary.imagesMissingAlt} <span className="text-xs font-normal text-stone-500">/ {auditSummary.totalImages} imgs</span></div>
          <div className="text-[11px] text-stone-500 mt-1">Alt attributes for accessibility & SEO</div>
        </div>

        {/* 7. Pages with Validation Errors */}
        <div 
          onClick={() => onNavigateTab('seo-audit')}
          className="bg-white rounded-2xl p-5 border border-red-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-red-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pages with Errors</span>
            <ShieldAlert className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-red-900">{auditSummary.pagesWithErrors}</div>
          <div className="text-[11px] text-red-700 mt-1">Click to view comprehensive audit</div>
        </div>

        {/* 8. Unsaved Draft Changes */}
        <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between text-purple-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Unsaved / Drafts</span>
            <Edit3 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-900">{unsavedCount}</div>
          <div className="text-[11px] text-purple-700 mt-1">
            {unsavedCount === 0 ? 'All changes published live' : 'Pages with pending drafts'}
          </div>
        </div>
      </div>

      {/* Middle Grid: Site Health Donut + Page Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Health Card */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-lg font-bold text-stone-900">
                Site Technical Health
              </h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getHealthColor(auditSummary.averageHealthScore)}`}>
                Average: {auditSummary.averageHealthScore} / 100
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Aggregated across all on-page checks including title tags, meta descriptions, canonical headers, headings, alt texts, and JSON-LD schema validity.
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    strokeDasharray={`${auditSummary.averageHealthScore}, 100`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke={auditSummary.averageHealthScore >= 80 ? '#059669' : '#d97706'}
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-stone-900 leading-none">
                    {auditSummary.averageHealthScore}%
                  </span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase mt-1">Index Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 bg-stone-50 rounded-xl">
              <div className="font-bold text-stone-900">{auditSummary.indexedPages}</div>
              <div className="text-[10px] text-stone-500">Indexable Pages</div>
            </div>
            <div className="p-2 bg-stone-50 rounded-xl">
              <div className="font-bold text-stone-900">{auditSummary.noindexPages}</div>
              <div className="text-[10px] text-stone-500">Noindex Pages</div>
            </div>
          </div>
        </div>

        {/* Priority Action Needed Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-playfair text-lg font-bold text-stone-900">
                  Priority Action Pages
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pages with missing elements or high commercial impact.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('all-pages')}
                className="text-xs font-bold text-[#9B332C] hover:underline"
              >
                View All {pages.length} Pages →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                    <th className="pb-2">Page</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Focus Keyword</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {criticalPages.map(page => (
                    <tr key={page.path} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 pr-2">
                        <div className="font-bold text-stone-900 truncate max-w-[200px]">{page.pageName}</div>
                        <div className="text-[11px] text-stone-400 font-mono truncate max-w-[200px]">{page.path}</div>
                      </td>
                      <td className="py-3 pr-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                          {page.pageType}
                        </span>
                      </td>
                      <td className="py-3 pr-2 text-stone-600 truncate max-w-[150px]">
                        {page.focusKeyword || <span className="text-red-500 italic">None assigned</span>}
                      </td>
                      <td className="py-3 pr-2">
                        {page.hasUnsavedChanges ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Draft</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Published</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => onSelectPage(page.path)}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF0EB] hover:bg-[#9B332C] text-[#9B332C] hover:text-white font-bold text-xs transition-colors"
                        >
                          Edit SEO
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Orphan Pages (0 Inbound Links): <strong className="text-stone-800">{auditSummary.orphanPages}</strong></span>
            <button
              type="button"
              onClick={() => onNavigateTab('internal-linking')}
              className="text-[#9B332C] font-semibold hover:underline"
            >
              Manage Internal Links →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
