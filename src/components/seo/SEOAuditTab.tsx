import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, AlertTriangle, CheckCircle2, Info, 
  RefreshCw, ExternalLink, ChevronDown, ChevronUp, Search, Filter 
} from 'lucide-react';
import { PageSEOData, SiteWideAuditSummary, PageAuditReport } from '../../types/seo';

interface SEOAuditTabProps {
  pages: PageSEOData[];
  auditSummary: SiteWideAuditSummary;
  pageReports: Record<string, PageAuditReport>;
  onSelectPage: (path: string) => void;
  onRefreshAudit: () => void;
}

export const SEOAuditTab: React.FC<SEOAuditTabProps> = ({
  pages,
  auditSummary,
  pageReports,
  onSelectPage,
  onRefreshAudit
}) => {
  const [filterLevel, setFilterLevel] = useState<'all' | 'error' | 'warning'>('all');
  const [search, setSearch] = useState('');

  // Collect all issues across all pages
  const allIssues: Array<{
    pagePath: string;
    pageName: string;
    level: 'error' | 'warning' | 'info';
    category: string;
    message: string;
    suggestion: string;
    isExternalCheck?: boolean;
  }> = [];

  pages.forEach(p => {
    const report = pageReports[p.path];
    if (report && report.issues) {
      report.issues.forEach(issue => {
        allIssues.push({
          pagePath: p.path,
          pageName: p.pageName,
          level: issue.level,
          category: issue.category,
          message: issue.message,
          suggestion: issue.suggestion,
          isExternalCheck: issue.isExternalCheck
        });
      });
    }
  });

  const filteredIssues = allIssues.filter(item => {
    if (filterLevel !== 'all' && item.level !== filterLevel) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.pageName.toLowerCase().includes(q) ||
        item.pagePath.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-playfair text-xl font-bold text-stone-900">
              Site-Wide Technical SEO Audit & Health Diagnostic
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Automated crawler simulation testing on-page compliance across all 56+ product, category, and artisan routes.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefreshAudit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rerun Full Audit</span>
        </button>
      </div>

      {/* Diagnostics Matrix Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="font-bold uppercase text-[10px] text-emerald-800 tracking-wider">Site Health Score</div>
          <div className="text-2xl font-black text-emerald-900 mt-1">{auditSummary.averageHealthScore} / 100</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Weighted technical quality</div>
        </div>

        <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
          <div className="font-bold uppercase text-[10px] text-red-800 tracking-wider">Critical Errors</div>
          <div className="text-2xl font-black text-red-900 mt-1">{auditSummary.pagesWithErrors}</div>
          <div className="text-[11px] text-red-700 mt-0.5">Pages requiring fixes</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="font-bold uppercase text-[10px] text-amber-800 tracking-wider">Duplicate Titles</div>
          <div className="text-2xl font-black text-amber-900 mt-1">{auditSummary.duplicateTitles}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Avoid title cannibalization</div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="font-bold uppercase text-[10px] text-stone-700 tracking-wider">Orphan Routes</div>
          <div className="text-2xl font-black text-stone-900 mt-1">{auditSummary.orphanPages}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Zero inbound link pages</div>
        </div>
      </div>

      {/* Audit Scope Explanation Banner */}
      <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs space-y-1.5 leading-relaxed text-stone-600">
        <div className="flex items-center gap-2 font-bold text-stone-800">
          <Info className="w-4 h-4 text-[#9B332C]" />
          <span>Diagnostic Boundary & Verification Legend</span>
        </div>
        <p>
          • <strong className="text-stone-800">[In-App Verified]:</strong> Checked directly inside the website application engine (title tags, meta descriptions, image alts, canonical links, robots meta, JSON-LD syntax, heading hierarchy, internal link integrity).
        </p>
        <p>
          • <strong className="text-stone-800">[External Crawler Required]:</strong> Historical Google SERP ranking positions, real-time Googlebot crawl budget, server 5xx log analysis, and indexation cache can only be observed through Google Search Console API or external crawler suites.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit findings by page or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 focus:border-[#9B332C] outline-none text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilterLevel('all')}
            className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-colors ${
              filterLevel === 'all' ? 'bg-stone-800 text-white border-stone-800' : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            All Findings ({allIssues.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('error')}
            className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-colors ${
              filterLevel === 'error' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            Errors ({allIssues.filter(i => i.level === 'error').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('warning')}
            className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-colors ${
              filterLevel === 'warning' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            Warnings ({allIssues.filter(i => i.level === 'warning').length})
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="space-y-2.5">
        {filteredIssues.map((item, idx) => {
          const isError = item.level === 'error';
          const isWarning = item.level === 'warning';

          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start justify-between gap-3 ${
                isError 
                  ? 'bg-red-50/50 border-red-200' 
                  : isWarning 
                  ? 'bg-amber-50/50 border-amber-200' 
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="mt-0.5 shrink-0">
                  {isError ? (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-600" />
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-stone-900">{item.message}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white border border-stone-200 text-stone-700">
                      {item.category}
                    </span>
                    {item.isExternalCheck && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-800">
                        External Tool
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    <strong>Action:</strong> {item.suggestion}
                  </p>
                  <div className="text-[10px] text-stone-400 font-mono pt-0.5">
                    Affected Route: <strong className="text-stone-700">{item.pagePath}</strong> ({item.pageName})
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPage(item.pagePath)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-[#9B332C] hover:text-[#9B332C] text-stone-800 font-bold text-xs shrink-0 transition-colors shadow-sm"
              >
                <span>Fix on Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {filteredIssues.length === 0 && (
          <div className="text-center py-12 text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-stone-800">No issues found matching your filter</p>
            <p className="text-xs text-stone-500 mt-1">All pages pass standard validation checks.</p>
          </div>
        )}
      </div>
    </div>
  );
};
