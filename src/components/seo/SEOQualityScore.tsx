import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, AlertCircle, Info, ChevronDown, 
  ChevronUp, ShieldCheck, Sparkles, HelpCircle 
} from 'lucide-react';
import { PageAuditReport, SEOValidationIssue } from '../../types/seo';

interface SEOQualityScoreProps {
  report: PageAuditReport;
}

export const SEOQualityScore: React.FC<SEOQualityScoreProps> = ({ report }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');
  const [expandedIssues, setExpandedIssues] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIssues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredIssues = report.issues.filter(issue => {
    if (activeFilter === 'all') return true;
    return issue.level === activeFilter;
  });

  const getScoreColor = (score: number) => {
    if (score >= 85) return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', stroke: '#059669', label: 'Excellent' };
    if (score >= 70) return { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', stroke: '#2563eb', label: 'Good' };
    if (score >= 50) return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', stroke: '#d97706', label: 'Needs Improvement' };
    return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', stroke: '#dc2626', label: 'Critical Errors' };
  };

  const scoreTheme = getScoreColor(report.score);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4 font-sans">
      {/* Top Header & Quality Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-3">
          {/* Radial Circular Progress */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-stone-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeDasharray={`${report.score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke={scoreTheme.stroke}
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold text-stone-900 leading-none">{report.score}</span>
              <span className="text-[9px] text-stone-500 font-semibold uppercase">/100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-stone-900">
                On-Page Technical SEO Score
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${scoreTheme.bg} ${scoreTheme.text} ${scoreTheme.border}`}>
                {scoreTheme.label}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Evaluated across {report.issues.length} technical validation rules & on-page factors.
            </p>
          </div>
        </div>

        {/* Breakdown Counters */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('error')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeFilter === 'error' ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{report.errorsCount} Error{report.errorsCount === 1 ? '' : 's'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('warning')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeFilter === 'warning' ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{report.warningsCount} Warning{report.warningsCount === 1 ? '' : 's'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              activeFilter === 'all' ? 'bg-stone-800 text-white border-stone-800 shadow-sm' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <span>All ({report.issues.length})</span>
          </button>
        </div>
      </div>

      {/* Checklist List */}
      <div className="space-y-2">
        {filteredIssues.map((issue) => {
          const isExpanded = expandedIssues[issue.id];
          const isError = issue.level === 'error';
          const isWarning = issue.level === 'warning';

          return (
            <div 
              key={issue.id}
              className={`rounded-xl border p-3 text-xs transition-colors ${
                isError 
                  ? 'bg-red-50/50 border-red-200/80' 
                  : isWarning 
                  ? 'bg-amber-50/40 border-amber-200/70' 
                  : 'bg-stone-50/60 border-stone-200'
              }`}
            >
              <div 
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleExpand(issue.id)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {isError ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{issue.message}</span>
                      {issue.isExternalCheck ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-800">
                          External Crawler Required
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-stone-200/70 text-stone-700">
                          In-App Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-600 mt-0.5 block">
                      Category: <span className="capitalize font-semibold text-stone-800">{issue.category}</span>
                    </span>
                  </div>
                </div>

                <button 
                  type="button" 
                  aria-label="Toggle details"
                  className="text-stone-400 hover:text-stone-700 p-1"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-2.5 pt-2.5 border-t border-stone-200/60 pl-6 text-[11px] text-stone-700 space-y-1">
                  <p>
                    <strong className="text-stone-900">Recommended Resolution:</strong> {issue.suggestion}
                  </p>
                  <p className="text-stone-500 text-[10px]">
                    Internal Code ID: <code className="bg-stone-100 px-1 py-0.5 rounded">{issue.code}</code>
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {filteredIssues.length === 0 && (
          <div className="p-6 text-center text-stone-500 bg-stone-50 rounded-xl border border-dashed border-stone-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-stone-800">No issues found for selected filter.</p>
            <p className="text-xs text-stone-500 mt-1">All verified parameters conform to technical standards.</p>
          </div>
        )}
      </div>

      {/* Transparent Disclaimer Banner */}
      <div className="p-3 bg-stone-100/70 border border-stone-200 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <span>
          <strong>Quality Score Disclaimer:</strong> This score is an internal heuristic checklist indicator (0–100) reflecting structural, metadata, and keyword alignment best practices. It is not an official Google ranking factor or a guarantee of organic position.
        </span>
      </div>
    </div>
  );
};
