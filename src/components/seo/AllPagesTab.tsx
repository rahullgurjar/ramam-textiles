import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ArrowUpDown, Edit3, Eye, CheckCircle2, AlertTriangle, 
  AlertCircle, ChevronLeft, ChevronRight, Globe, ExternalLink, ShieldAlert
} from 'lucide-react';
import { PageSEOData, PageType } from '../../types/seo';
import { validatePageSEO } from '../../utils/seoStorage';

interface AllPagesTabProps {
  pages: PageSEOData[];
  onSelectPage: (path: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const AllPagesTab: React.FC<AllPagesTabProps> = ({
  pages,
  onSelectPage
}) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedIndexing, setSelectedIndexing] = useState<string>('all');
  const [selectedCompletion, setSelectedCompletion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'path' | 'score' | 'updated'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Memoize audit scores for fast table rendering
  const pageScores = useMemo(() => {
    const map: Record<string, number> = {};
    pages.forEach(p => {
      map[p.path] = validatePageSEO(p).score;
    });
    return map;
  }, [pages]);

  // Filter & Search logic
  const filteredPages = useMemo(() => {
    return pages.filter(p => {
      // 1. Search Query
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = p.pageName.toLowerCase().includes(query);
        const matchesPath = p.path.toLowerCase().includes(query);
        const matchesKw = (p.focusKeyword || '').toLowerCase().includes(query);
        const matchesTitle = (p.seoTitle || '').toLowerCase().includes(query);
        if (!matchesName && !matchesPath && !matchesKw && !matchesTitle) return false;
      }

      // 2. Page Type Filter
      if (selectedType !== 'all' && p.pageType !== selectedType) {
        return false;
      }

      // 3. Indexing Filter
      if (selectedIndexing === 'indexable' && p.robotsDirectives.includes('noindex')) return false;
      if (selectedIndexing === 'noindex' && !p.robotsDirectives.includes('noindex')) return false;

      // 4. Completion Filter
      if (selectedCompletion === 'completed') {
        if (!p.seoTitle || !p.metaDescription || !p.canonicalUrl) return false;
      } else if (selectedCompletion === 'missing_title') {
        if (p.seoTitle && p.seoTitle.trim().length > 0) return false;
      } else if (selectedCompletion === 'missing_desc') {
        if (p.metaDescription && p.metaDescription.trim().length > 0) return false;
      } else if (selectedCompletion === 'has_draft') {
        if (!p.hasUnsavedChanges && p.status !== 'draft') return false;
      } else if (selectedCompletion === 'missing_alt') {
        const hasMissing = (p.images || []).some(img => !img.alt || img.alt.trim().length === 0);
        if (!hasMissing) return false;
      }

      return true;
    }).sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.pageName.localeCompare(b.pageName);
      if (sortBy === 'path') cmp = a.path.localeCompare(b.path);
      if (sortBy === 'score') cmp = (pageScores[a.path] || 0) - (pageScores[b.path] || 0);
      if (sortBy === 'updated') cmp = (new Date(a.lastUpdated || 0)).getTime() - (new Date(b.lastUpdated || 0)).getTime();
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [pages, search, selectedType, selectedIndexing, selectedCompletion, sortBy, sortOrder, pageScores]);

  // Pagination
  const totalPagesCount = Math.max(1, Math.ceil(filteredPages.length / pageSize));
  const paginatedPages = filteredPages.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSortToggle = (field: 'name' | 'path' | 'score' | 'updated') => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{score}%</span>;
    if (score >= 70) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">{score}%</span>;
    if (score >= 50) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">{score}%</span>;
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">{score}%</span>;
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <h2 className="font-playfair text-xl font-bold text-stone-900">
            Page SEO Inventory ({filteredPages.length} of {pages.length} Pages)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Select any page to manually modify title tags, meta descriptions, image alts, and JSON-LD schema.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by page, URL, keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] outline-none"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Page Type Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            Page Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-xs outline-none"
          >
            <option value="all">All Page Types</option>
            <option value="home">Home Page</option>
            <option value="category">Category Pages</option>
            <option value="product">Product Pages</option>
            <option value="collection">Collection Pages</option>
            <option value="wholesale">Wholesale Pages</option>
            <option value="custom">Custom Manufacturing</option>
            <option value="article">Blog & Articles</option>
            <option value="static">Static Content Pages</option>
            <option value="legal">Legal & Policy Pages</option>
          </select>
        </div>

        {/* Indexing Status Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            Indexing Status
          </label>
          <select
            value={selectedIndexing}
            onChange={(e) => { setSelectedIndexing(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-xs outline-none"
          >
            <option value="all">All Index Directives</option>
            <option value="indexable">Indexable (index, follow)</option>
            <option value="noindex">Noindex (Hidden from Search)</option>
          </select>
        </div>

        {/* SEO Completion Status */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            SEO Completion
          </label>
          <select
            value={selectedCompletion}
            onChange={(e) => { setSelectedCompletion(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-xs outline-none"
          >
            <option value="all">All Completion States</option>
            <option value="completed">Completed (Title & Desc Present)</option>
            <option value="missing_title">Missing SEO Title Tag</option>
            <option value="missing_desc">Missing Meta Description</option>
            <option value="missing_alt">Missing Image Alt Text</option>
            <option value="has_draft">Pending Unsaved Draft</option>
          </select>
        </div>

        {/* Reset Filters Action */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedType('all');
              setSelectedIndexing('all');
              setSelectedCompletion('all');
              setCurrentPage(1);
            }}
            className="w-full py-2 px-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 font-bold text-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Pages Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="w-full text-left text-xs divide-y divide-stone-200">
          <thead className="bg-stone-50 text-stone-600 font-bold uppercase text-[10px] tracking-wider select-none">
            <tr>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-stone-900"
                onClick={() => handleSortToggle('name')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Page Name & URL</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Focus Keyword</th>
              <th className="py-3 px-3">SEO Title & Snippet</th>
              <th className="py-3 px-3">Index</th>
              <th 
                className="py-3 px-3 cursor-pointer hover:text-stone-900 text-center"
                onClick={() => handleSortToggle('score')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Score</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white">
            {paginatedPages.map(page => {
              const score = pageScores[page.path] || 0;
              const hasDraft = page.hasUnsavedChanges || page.status === 'draft';

              return (
                <tr key={page.path} className="hover:bg-stone-50/80 transition-colors">
                  {/* Name & URL */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900 max-w-[220px] truncate" title={page.pageName}>
                      {page.pageName}
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono max-w-[220px] truncate" title={page.path}>
                      {page.path}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                      {page.pageType}
                    </span>
                  </td>

                  {/* Focus Keyword */}
                  <td className="py-3 px-3">
                    <div className="max-w-[150px] truncate text-stone-700 font-medium">
                      {page.focusKeyword ? (
                        <span>{page.focusKeyword}</span>
                      ) : (
                        <span className="text-red-500 italic">None</span>
                      )}
                    </div>
                  </td>

                  {/* SEO Title & Description */}
                  <td className="py-3 px-3">
                    <div className="max-w-[260px]">
                      <div className="font-semibold text-stone-800 truncate" title={page.seoTitle}>
                        {page.seoTitle || <span className="text-red-500 italic">Missing Title</span>}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate mt-0.5" title={page.metaDescription}>
                        {page.metaDescription || <span className="text-amber-600 italic">Missing snippet</span>}
                      </div>
                    </div>
                  </td>

                  {/* Indexing status */}
                  <td className="py-3 px-3">
                    {page.robotsDirectives.includes('noindex') ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Noindex
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Index
                      </span>
                    )}
                  </td>

                  {/* Checklist score */}
                  <td className="py-3 px-3 text-center">
                    {getScoreBadge(score)}
                  </td>

                  {/* Workflow status */}
                  <td className="py-3 px-3">
                    {hasDraft ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        Draft
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                        Published
                      </span>
                    )}
                  </td>

                  {/* Edit action */}
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectPage(page.path)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF0EB] hover:bg-[#9B332C] text-[#9B332C] hover:text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit SEO</span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {paginatedPages.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-stone-500">
                  <Search className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="font-bold text-sm text-stone-800">No matching pages found</p>
                  <p className="text-xs text-stone-500 mt-1">Try broadening your search term or clearing filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
        <div>
          Showing {Math.min(filteredPages.length, (currentPage - 1) * pageSize + 1)} to{' '}
          {Math.min(filteredPages.length, currentPage * pageSize)} of {filteredPages.length} pages
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 font-bold text-stone-800">
            Page {currentPage} of {totalPagesCount}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPagesCount}
            onClick={() => setCurrentPage(prev => Math.min(totalPagesCount, prev + 1))}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
