import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Edit3, Image as ImageIcon, Link2, 
  Code, ShieldCheck, History, Settings, ExternalLink, ArrowLeft, 
  Menu, X, Sparkles, AlertTriangle, CheckCircle2 
} from 'lucide-react';
import { 
  getAllPagesSEO, 
  runSiteWideAudit, 
  getSEOChangeHistory, 
  getSEOSettings, 
  saveDraftSEO, 
  publishSEO, 
  discardDraft, 
  resetToDefault, 
  rollbackChange, 
  saveSEOSettings 
} from '../../utils/seoStorage';
import { PageSEOData, SEOSettings, SEOChangeHistoryItem } from '../../types/seo';
import { SEOOverviewTab } from './SEOOverviewTab';
import { AllPagesTab } from './AllPagesTab';
import { PageEditorTab } from './PageEditorTab';
import { ImageSEOTab } from './ImageSEOTab';
import { InternalLinkingTab } from './InternalLinkingTab';
import { SchemaMarkupTab } from './SchemaMarkupTab';
import { SEOAuditTab } from './SEOAuditTab';
import { ChangeHistoryTab } from './ChangeHistoryTab';
import { SEOSettingsTab } from './SEOSettingsTab';
import { useApp } from '../../context/AppContext';

interface SEOAdminContainerProps {
  onBackToSecurityConsole?: () => void;
}

export type SEOTabId = 
  | 'overview'
  | 'all-pages'
  | 'page-editor'
  | 'image-seo'
  | 'internal-linking'
  | 'schema-markup'
  | 'seo-audit'
  | 'change-history'
  | 'seo-settings';

export const SEOAdminContainer: React.FC<SEOAdminContainerProps> = ({
  onBackToSecurityConsole
}) => {
  const { showToast } = useApp();

  // Active Tab & Selection State
  const [activeTab, setActiveTab] = useState<SEOTabId>('overview');
  const [selectedPagePath, setSelectedPagePath] = useState<string>('/');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // SEO Data State
  const [pages, setPages] = useState<PageSEOData[]>(() => getAllPagesSEO());
  const [settings, setSettings] = useState<SEOSettings>(() => getSEOSettings());
  const [historyItems, setHistoryItems] = useState<SEOChangeHistoryItem[]>(() => getSEOChangeHistory());
  const [auditData, setAuditData] = useState(() => runSiteWideAudit());

  // Reload all state helper
  const reloadData = () => {
    const updatedPages = getAllPagesSEO();
    setPages(updatedPages);
    setSettings(getSEOSettings());
    setHistoryItems(getSEOChangeHistory());
    setAuditData(runSiteWideAudit());
  };

  const handleSelectPage = (path: string) => {
    setSelectedPagePath(path);
    setActiveTab('page-editor');
    setIsMobileNavOpen(false);
  };

  // Workflow Handlers
  const handleSaveDraft = (data: PageSEOData) => {
    saveDraftSEO(data.path, data, 'Madan (SEO Atelier)');
    reloadData();
    showToast(`Draft saved for "${data.pageName}".`, 'info');
  };

  const handlePublish = (data: PageSEOData) => {
    publishSEO(data.path, data, 'Madan (SEO Atelier)');
    reloadData();
    showToast(`SEO published live to public site for "${data.pageName}"!`, 'success');
  };

  const handleDiscard = () => {
    discardDraft(selectedPagePath);
    reloadData();
    showToast('Unsaved changes discarded.', 'info');
  };

  const handleResetDefault = () => {
    if (window.confirm('Reset this page to code defaults? All custom overrides will be removed.')) {
      resetToDefault(selectedPagePath, 'Madan (SEO Atelier)');
      reloadData();
      showToast('Page reset to initial factory defaults.', 'info');
    }
  };

  const handleRollback = (historyId: string) => {
    const success = rollbackChange(historyId, 'Madan (SEO Atelier)');
    if (success) {
      reloadData();
      showToast('Historic value restored and published live.', 'success');
    } else {
      showToast('Failed to rollback selected change.', 'error');
    }
  };

  const handleSaveSettings = (newSettings: SEOSettings) => {
    saveSEOSettings(newSettings, 'Madan (SEO Atelier)');
    reloadData();
    showToast('Global SEO settings updated.', 'success');
  };

  const activePageData = pages.find(p => p.path === selectedPagePath) || pages[0];
  const pendingDraftsCount = pages.filter(p => p.hasUnsavedChanges || p.status === 'draft').length;

  const NAV_ITEMS: Array<{ id: SEOTabId; label: string; icon: React.FC<{ className?: string }>; badge?: number }> = [
    { id: 'overview', label: 'SEO Overview', icon: LayoutDashboard },
    { id: 'all-pages', label: 'All Pages', icon: FileText, badge: pages.length },
    { id: 'page-editor', label: 'Page SEO Editor', icon: Edit3, badge: pendingDraftsCount > 0 ? pendingDraftsCount : undefined },
    { id: 'image-seo', label: 'Image SEO', icon: ImageIcon, badge: auditData.summary.imagesMissingAlt > 0 ? auditData.summary.imagesMissingAlt : undefined },
    { id: 'internal-linking', label: 'Internal Linking', icon: Link2 },
    { id: 'schema-markup', label: 'Schema Markup', icon: Code },
    { id: 'seo-audit', label: 'SEO Audit', icon: ShieldCheck, badge: auditData.summary.pagesWithErrors > 0 ? auditData.summary.pagesWithErrors : undefined },
    { id: 'change-history', label: 'Change History', icon: History },
    { id: 'seo-settings', label: 'SEO Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#241A16] font-royal-body flex flex-col antialiased">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
              aria-label="Toggle navigation"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="w-9 h-9 rounded-xl bg-[#801B18] text-[#FAF5EE] flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              SEO
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-base sm:text-lg font-black text-[#241A16] leading-none">
                  Ramam Textiles: Manual On-Page SEO Atelier
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#D4AF37]/20 text-[#801B18] border border-[#D4AF37]/40">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-royal-body">
                Full-Control Metadata, SERP Simulation, Alt Text & Schema Registry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToSecurityConsole && (
              <button
                type="button"
                onClick={onBackToSecurityConsole}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Security Console</span>
              </button>
            )}

            <a
              href="https://ramamtextiles.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Body with 9-Item Sidebar */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex">
        {/* Sidebar Navigation */}
        <aside className={`fixed lg:sticky top-[61px] inset-y-0 left-0 z-20 w-64 bg-white border-r border-stone-200 p-4 shrink-0 transition-transform lg:translate-x-0 h-[calc(100vh-61px)] overflow-y-auto flex flex-col justify-between ${
          isMobileNavOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="space-y-1.5">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              SEO Administration
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#801B18] text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100/80 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.id === 'seo-audit' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Stats */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-[11px] space-y-1 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Health Score:</span>
              <span className="font-extrabold text-emerald-800">{auditData.summary.averageHealthScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Draft Overrides:</span>
              <span className="font-extrabold text-purple-800">{pendingDraftsCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Indexed Pages:</span>
              <span className="font-extrabold text-stone-800">{auditData.summary.indexedPages}</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
          {activeTab === 'overview' && (
            <SEOOverviewTab
              pages={pages}
              auditSummary={auditData.summary}
              onSelectPage={handleSelectPage}
              onNavigateTab={(tab) => setActiveTab(tab as SEOTabId)}
              onRefreshAudit={reloadData}
            />
          )}

          {activeTab === 'all-pages' && (
            <AllPagesTab
              pages={pages}
              onSelectPage={handleSelectPage}
              onNavigateTab={(tab) => setActiveTab(tab as SEOTabId)}
            />
          )}

          {activeTab === 'page-editor' && (
            <PageEditorTab
              pageData={activePageData}
              allPages={pages}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
              onDiscard={handleDiscard}
              onResetDefault={handleResetDefault}
              onBackToList={() => setActiveTab('all-pages')}
            />
          )}

          {activeTab === 'image-seo' && (
            <ImageSEOTab
              pages={pages}
              onUpdatePageSEO={(path, updated) => {
                handleSaveDraft(updated);
              }}
              onSelectPage={handleSelectPage}
            />
          )}

          {activeTab === 'internal-linking' && (
            <InternalLinkingTab
              pages={pages}
              onUpdatePageSEO={(path, updated) => {
                handleSaveDraft(updated);
              }}
              onSelectPage={handleSelectPage}
            />
          )}

          {activeTab === 'schema-markup' && (
            <SchemaMarkupTab
              pages={pages}
              onUpdatePageSEO={(path, updated) => {
                handleSaveDraft(updated);
              }}
              onSelectPage={handleSelectPage}
            />
          )}

          {activeTab === 'seo-audit' && (
            <SEOAuditTab
              pages={pages}
              auditSummary={auditData.summary}
              pageReports={auditData.pageReports}
              onSelectPage={handleSelectPage}
              onRefreshAudit={reloadData}
            />
          )}

          {activeTab === 'change-history' && (
            <ChangeHistoryTab
              historyItems={historyItems}
              onRollback={handleRollback}
              onSelectPage={handleSelectPage}
            />
          )}

          {activeTab === 'seo-settings' && (
            <SEOSettingsTab
              settings={settings}
              onSaveSettings={handleSaveSettings}
              onRefreshData={reloadData}
            />
          )}
        </main>
      </div>
    </div>
  );
};
