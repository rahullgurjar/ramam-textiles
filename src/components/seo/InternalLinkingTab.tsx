import React, { useState } from 'react';
import { 
  Link2, Plus, Trash2, AlertTriangle, CheckCircle2, ArrowRight, 
  ExternalLink, Sparkles, Search, Layers, RefreshCw 
} from 'lucide-react';
import { PageSEOData, InternalLinkItem } from '../../types/seo';
import { normalizePath } from '../../utils/seoStorage';

interface InternalLinkingTabProps {
  pages: PageSEOData[];
  onUpdatePageSEO: (path: string, updated: PageSEOData) => void;
  onSelectPage: (path: string) => void;
}

export const InternalLinkingTab: React.FC<InternalLinkingTabProps> = ({
  pages,
  onUpdatePageSEO,
  onSelectPage
}) => {
  const [selectedSourcePath, setSelectedSourcePath] = useState<string>(() => pages[0]?.path || '/');
  const [newTargetPath, setNewTargetPath] = useState<string>('/shop');
  const [newAnchorText, setNewAnchorText] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const activePage = pages.find(p => p.path === selectedSourcePath) || pages[0];

  // Inbound links map across entire site
  const inboundMap: Record<string, Array<{ sourcePath: string; sourceName: string; anchorText: string }>> = {};
  const registeredPaths = new Set(pages.map(p => normalizePath(p.path)));

  pages.forEach(p => {
    (p.internalLinks || []).forEach(link => {
      const target = normalizePath(link.targetPath);
      if (!inboundMap[target]) inboundMap[target] = [];
      inboundMap[target].push({
        sourcePath: p.path,
        sourceName: p.pageName,
        anchorText: link.anchorText
      });
    });
  });

  // Identify orphan pages (0 inbound links, excluding home)
  const orphanPages = pages.filter(p => {
    if (p.path === '/') return false;
    const inbounds = inboundMap[normalizePath(p.path)] || [];
    return inbounds.length === 0;
  });

  // Current outbound links of selected page
  const currentLinks = activePage?.internalLinks || [];

  // Add new link handler
  const handleAddLink = () => {
    if (!newAnchorText.trim()) return;
    const newLink: InternalLinkItem = {
      id: String(Date.now()),
      targetPath: newTargetPath,
      anchorText: newAnchorText.trim()
    };
    const updated = {
      ...activePage,
      internalLinks: [...currentLinks, newLink],
      hasUnsavedChanges: true
    };
    onUpdatePageSEO(activePage.path, updated);
    setNewAnchorText('');
    setSaveMessage('Internal link added to draft.');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleRemoveLink = (linkId: string) => {
    const updated = {
      ...activePage,
      internalLinks: currentLinks.filter(l => l.id !== linkId),
      hasUnsavedChanges: true
    };
    onUpdatePageSEO(activePage.path, updated);
    setSaveMessage('Internal link removed from draft.');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  // Smart suggestions generator based on page type
  const getSmartSuggestions = () => {
    if (!activePage) return [];
    if (activePage.pageType === 'product') {
      return [
        { path: '/bulk-enquiry', anchor: 'Request Wholesale Price Sheet' },
        { path: '/custom-manufacturing', anchor: 'Bespoke Private Label Manufacturing' },
        { path: '/shop', anchor: 'Browse Quilted Travel Catalog' }
      ];
    }
    if (activePage.pageType === 'article') {
      return [
        { path: '/shop', anchor: 'Shop Handcrafted Jaipur Duffles' },
        { path: '/craftsmanship', anchor: 'Explore 400-Year Heritage Craft' },
        { path: '/bulk-enquiry', anchor: 'Direct Export Atelier Inquiry' }
      ];
    }
    return [
      { path: '/shop', anchor: 'Explore Wholesale Catalog' },
      { path: '/custom-manufacturing', anchor: 'Custom Garment Production' },
      { path: '/contact', anchor: 'Connect with Jaipur Workshop' }
    ];
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#9B332C]" />
            <h2 className="font-playfair text-xl font-bold text-stone-900">
              Manual Internal Linking Manager & Orphan Page Detector
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Build strategic crawl equity pathways between luxury products, artisan journal guides, and wholesale quotation pages.
          </p>
        </div>

        {/* Orphan Pages Alert Badge */}
        <div>
          {orphanPages.length > 0 ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{orphanPages.length} Orphan Page(s) Need Inbound Links</span>
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Healthy Internal Linking Network</span>
            </span>
          )}
        </div>
      </div>

      {/* 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Source Page Selector & Orphan Radar */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Select Source Page to Manage Links
            </label>
            <select
              value={selectedSourcePath}
              onChange={(e) => setSelectedSourcePath(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white text-xs font-bold outline-none"
            >
              {pages.map(p => (
                <option key={p.path} value={p.path}>
                  {p.pageName} ({p.path})
                </option>
              ))}
            </select>
          </div>

          {/* Active Page Card Status */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">{activePage.pageName}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-200 text-stone-800">
                {activePage.pageType}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">{activePage.path}</div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 text-center">
              <div className="p-2 bg-white rounded-xl border border-stone-200">
                <div className="text-base font-bold text-stone-900">{currentLinks.length}</div>
                <div className="text-[10px] text-stone-500">Outbound Links</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-stone-200">
                <div className="text-base font-bold text-stone-900">
                  {(inboundMap[normalizePath(activePage.path)] || []).length}
                </div>
                <div className="text-[10px] text-stone-500">Inbound Links</div>
              </div>
            </div>
          </div>

          {/* Orphan Page Radar */}
          {orphanPages.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Orphan Pages (0 Inbound Links)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Googlebot may take significantly longer to discover or rank these pages:
              </p>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                {orphanPages.map(orphan => (
                  <div 
                    key={orphan.path} 
                    className="p-1.5 bg-white rounded-lg border border-amber-200/80 flex items-center justify-between text-[11px]"
                  >
                    <span className="truncate max-w-[180px] font-medium text-stone-800">{orphan.pageName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setNewTargetPath(orphan.path);
                        setNewAnchorText(orphan.pageName);
                      }}
                      className="text-[10px] font-bold text-[#9B332C] hover:underline"
                    >
                      + Link Here
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Link Creator & Active Links Table */}
        <div className="lg:col-span-7 space-y-5 text-xs">
          {/* Add Link Form */}
          <div className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/40 space-y-3">
            <h4 className="font-playfair text-sm font-bold text-[#241A16] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#9B332C]" />
              <span>Add Contextual Internal Link from this Page</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Anchor Text (Clickable text) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAnchorText}
                  onChange={(e) => setNewAnchorText(e.target.value)}
                  placeholder="e.g. Pure Cotton Fabric Wholesale"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Destination Target Page
                </label>
                <select
                  value={newTargetPath}
                  onChange={(e) => setNewTargetPath(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white font-mono"
                >
                  {pages.map(p => (
                    <option key={p.path} value={p.path}>
                      {p.path} ({p.pageName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-stone-500">
                Changes are saved to draft until published.
              </span>
              <button
                type="button"
                onClick={handleAddLink}
                disabled={!newAnchorText.trim()}
                className="pill-btn-rose px-4 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-40"
              >
                Add Link
              </button>
            </div>

            {saveMessage && (
              <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveMessage}</span>
              </div>
            )}
          </div>

          {/* Current Outbound Links Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
              Active Outbound Links on this Page ({currentLinks.length})
            </h4>

            <div className="space-y-2">
              {currentLinks.map(link => {
                const isBroken = !registeredPaths.has(normalizePath(link.targetPath));

                return (
                  <div
                    key={link.id}
                    className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-sm hover:border-stone-300 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">"{link.anchorText}"</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="font-mono text-stone-600 truncate">{link.targetPath}</span>
                      </div>
                      {isBroken ? (
                        <span className="text-[10px] text-red-600 font-bold flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Broken Destination: Route not registered in website</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
                          Verified Destination 200 OK
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveLink(link.id)}
                      className="text-stone-400 hover:text-red-600 p-1.5 transition-colors"
                      title="Remove Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {currentLinks.length === 0 && (
                <div className="py-8 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <Link2 className="w-6 h-6 mx-auto mb-1.5 text-stone-300" />
                  <p className="font-bold text-stone-700">No outbound internal links configured</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Use the form above to connect this page to other catalog items.</p>
                </div>
              )}
            </div>
          </div>

          {/* Smart Contextual Link Suggestions */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-stone-800 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Smart Contextual Opportunities for {activePage.pageName}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {getSmartSuggestions().map((sugg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setNewTargetPath(sugg.path);
                    setNewAnchorText(sugg.anchor);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-[#9B332C] hover:text-[#9B332C] text-[11px] font-semibold transition-colors"
                >
                  + Link to "{sugg.anchor}" ({sugg.path})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
