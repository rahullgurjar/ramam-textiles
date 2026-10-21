import React, { useState, useEffect } from 'react';
import { 
  Save, Globe, Share2, Layers, Image as ImageIcon, Heading, Shield, 
  RefreshCw, CheckCircle2, AlertTriangle, ArrowLeft, Eye, RotateCcw, 
  Trash2, Plus, Code, HelpCircle, ExternalLink, Sparkles
} from 'lucide-react';
import { PageSEOData, SearchIntent, SchemaType, PageType } from '../../types/seo';
import { validatePageSEO } from '../../utils/seoStorage';
import { LiveSERPPreview } from './LiveSERPPreview';
import { SEOQualityScore } from './SEOQualityScore';
import { SocialSharePreview } from './SocialSharePreview';

interface PageEditorTabProps {
  pageData: PageSEOData;
  allPages: PageSEOData[];
  onSaveDraft: (data: PageSEOData) => void;
  onPublish: (data: PageSEOData) => void;
  onDiscard: () => void;
  onResetDefault: () => void;
  onBackToList: () => void;
}

export const PageEditorTab: React.FC<PageEditorTabProps> = ({
  pageData,
  allPages,
  onSaveDraft,
  onPublish,
  onDiscard,
  onResetDefault,
  onBackToList
}) => {
  // Local state for all fields
  const [formData, setFormData] = useState<PageSEOData>(() => ({ ...pageData }));
  const [activeSection, setActiveSection] = useState<'basic' | 'headings' | 'images' | 'social' | 'advanced'>('basic');
  const [secondaryInput, setSecondaryInput] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Synchronize when page prop changes
  useEffect(() => {
    setFormData({ ...pageData });
    setHasChanges(false);
  }, [pageData.path]);

  // Handle generic field change
  const handleChange = (field: keyof PageSEOData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      hasUnsavedChanges: true
    }));
    setHasChanges(true);
  };

  // Run live validation on current formData
  const currentReport = validatePageSEO(formData);

  // Secondary keyword add/remove
  const handleAddSecondary = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (secondaryInput.trim()) {
      const updated = Array.from(new Set([...(formData.secondaryKeywords || []), secondaryInput.trim()]));
      handleChange('secondaryKeywords', updated);
      setSecondaryInput('');
    }
  };

  const handleRemoveSecondary = (kw: string) => {
    const updated = (formData.secondaryKeywords || []).filter(k => k !== kw);
    handleChange('secondaryKeywords', updated);
  };

  // Heading handlers
  const handleAddH2 = () => {
    handleChange('h2s', [...(formData.h2s || []), 'New H2 Section Heading']);
  };

  const handleUpdateH2 = (index: number, text: string) => {
    const updated = [...(formData.h2s || [])];
    updated[index] = text;
    handleChange('h2s', updated);
  };

  const handleRemoveH2 = (index: number) => {
    const updated = (formData.h2s || []).filter((_, i) => i !== index);
    handleChange('h2s', updated);
  };

  // Image alt text update
  const handleUpdateImageAlt = (index: number, newAlt: string) => {
    const updated = [...(formData.images || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], alt: newAlt };
      handleChange('images', updated);
    }
  };

  // Safe custom meta tags handler
  const handleAddMetaTag = () => {
    handleChange('customMetaTags', [
      ...(formData.customMetaTags || []),
      { id: String(Date.now()), name: 'author', content: 'Ramam Textiles' }
    ]);
  };

  const handleUpdateMetaTag = (id: string, field: 'name' | 'content', value: string) => {
    // Sanitize: strip script or dangerous tags
    const cleanValue = value.replace(/<[^>]*>?/gm, '');
    const updated = (formData.customMetaTags || []).map(tag => {
      if (tag.id === id) {
        return { ...tag, [field]: cleanValue };
      }
      return tag;
    });
    handleChange('customMetaTags', updated);
  };

  const handleRemoveMetaTag = (id: string) => {
    const updated = (formData.customMetaTags || []).filter(t => t.id !== id);
    handleChange('customMetaTags', updated);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Action & Navigation Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToList}
            className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
            title="Return to Page Inventory"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                {formData.pageType}
              </span>
              <h2 className="font-playfair text-lg font-bold text-stone-900 truncate max-w-md">
                {formData.pageName}
              </h2>
              {formData.hasUnsavedChanges || hasChanges ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                  Unsaved Draft
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Published Live
                </span>
              )}
            </div>
            <div className="text-xs text-stone-400 font-mono mt-0.5">
              {formData.path}
            </div>
          </div>
        </div>

        {/* Action Controls: Draft, Preview, Publish, Discard */}
        <div className="flex flex-wrap items-center gap-2">
          {hasChanges && (
            <button
              type="button"
              onClick={onDiscard}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>
          )}

          <a
            href={formData.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Page</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <button
            type="button"
            onClick={() => onSaveDraft(formData)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => onPublish(formData)}
            className="inline-flex items-center gap-1.5 pill-btn-rose px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Editor Layout: Main Content (2 cols) & Right Sticky Sidebar (SERP & Score) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Area (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sub-section Navigation Tabs */}
          <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2 overflow-x-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveSection('basic')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeSection === 'basic' 
                  ? 'bg-[#801B18] text-white shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Basic SEO</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('headings')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeSection === 'headings' 
                  ? 'bg-[#801B18] text-white shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Heading className="w-3.5 h-3.5" />
              <span>Headings (H1–H3)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('images')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeSection === 'images' 
                  ? 'bg-[#801B18] text-white shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image Alt ({formData.images?.length || 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('social')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeSection === 'social' 
                  ? 'bg-[#801B18] text-white shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Social Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('advanced')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeSection === 'advanced' 
                  ? 'bg-[#801B18] text-white shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Advanced & Schema</span>
            </button>
          </div>

          {/* SECTION 1: BASIC SEO */}
          {activeSection === 'basic' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 animate-fade-in text-xs">
              <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#9B332C]" />
                <span>Search Engine Meta Tags & Keywords</span>
              </h3>

              {/* SEO Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                    SEO Title Tag (&lt;title&gt;) <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[11px] font-bold ${
                    (formData.seoTitle || '').length > 60 ? 'text-amber-600' : 'text-stone-400'
                  }`}>
                    {(formData.seoTitle || '').length} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange('seoTitle', e.target.value)}
                  placeholder="e.g. Quilted Duffel Bags Wholesale Jaipur | Ramam Textiles"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] outline-none text-xs text-stone-900 font-medium"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Appears as the primary clickable headline in Google SERPs and browser tabs.
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                    Meta Description <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[11px] font-bold ${
                    (formData.metaDescription || '').length > 160 ? 'text-amber-600' : 'text-stone-400'
                  }`}>
                    {(formData.metaDescription || '').length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                  placeholder="e.g. Authentic hand block printed quilted duffles and vanity cases handcrafted in Jaipur. Direct atelier wholesale pricing with low MOQs."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] outline-none text-xs text-stone-900 leading-relaxed"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Snippet shown beneath the title on Google results to drive search click-through rate (CTR).
                </p>
              </div>

              {/* Primary Focus Keyword & Intent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Primary Focus Keyword <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.focusKeyword}
                    onChange={(e) => handleChange('focusKeyword', e.target.value)}
                    placeholder="e.g. quilted cotton duffle bag Jaipur"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] outline-none text-xs"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    Target keyword tested against title, description, and H1.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Search Intent
                  </label>
                  <select
                    value={formData.searchIntent}
                    onChange={(e) => handleChange('searchIntent', e.target.value as SearchIntent)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:border-[#9B332C] outline-none text-xs"
                  >
                    <option value="commercial">Commercial (Comparing wholesale options)</option>
                    <option value="transactional">Transactional (Ready to order / request quote)</option>
                    <option value="informational">Informational (Reading craft guides)</option>
                    <option value="navigational">Navigational (Looking for specific brand page)</option>
                  </select>
                </div>
              </div>

              {/* Secondary Keywords */}
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                  Secondary LSI Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={secondaryInput}
                    onChange={(e) => setSecondaryInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSecondary(e); } }}
                    placeholder="Type keyword and press Add..."
                    className="flex-1 px-4 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSecondary}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.secondaryKeywords || []).map(kw => (
                    <span 
                      key={kw} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-semibold"
                    >
                      <span>{kw}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSecondary(kw)}
                        className="text-stone-400 hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Canonical URL & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={formData.canonicalUrl}
                    onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                    placeholder="https://ramamtextiles.shop/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs font-mono"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    Definitive master URL to prevent duplicate content indexing.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Robots Directives
                  </label>
                  <select
                    value={formData.robotsDirectives}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange('robotsDirectives', val);
                      handleChange('isIndexable', !val.includes('noindex'));
                      handleChange('isFollowable', !val.includes('nofollow'));
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:border-[#9B332C] outline-none text-xs font-mono"
                  >
                    <option value="index, follow">index, follow (Default: Public search)</option>
                    <option value="noindex, follow">noindex, follow (Hide from Google, follow links)</option>
                    <option value="noindex, nofollow">noindex, nofollow (Strict quarantine)</option>
                    <option value="index, nofollow">index, nofollow (Index page, ignore links)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HEADINGS MANAGEMENT */}
          {activeSection === 'headings' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 animate-fade-in text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Heading className="w-4 h-4 text-[#9B332C]" />
                  <span>Headings Hierarchy & Structure (H1–H3)</span>
                </h3>
                <span className="text-[11px] text-stone-500">
                  Strictly 1 H1 headline required per page
                </span>
              </div>

              {/* Primary H1 */}
              <div>
                <label className="block font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1">
                  Primary Page &lt;h1&gt; Headline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.h1}
                  onChange={(e) => handleChange('h1', e.target.value)}
                  placeholder="Primary headline on the page..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs text-stone-900 font-bold"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  The main topical headline. Google gives significant weight to terms inside the single H1.
                </p>
              </div>

              {/* H2 Headings List */}
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                    Sub-section &lt;h2&gt; Headings ({formData.h2s?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddH2}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9B332C] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add H2</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.h2s || []).map((h2, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-8 text-[11px] font-bold text-stone-400">H2 #{idx + 1}</span>
                      <input
                        type="text"
                        value={h2}
                        onChange={(e) => handleUpdateH2(idx, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveH2(idx)}
                        className="text-stone-400 hover:text-red-600 p-1.5"
                        title="Remove H2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content editing helper alert */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 text-[11px]">
                <strong>Content Synchronization:</strong> Headings defined here are saved as the authoritative structural roadmap for this route and verified in technical audits.
              </div>
            </div>
          )}

          {/* SECTION 3: IMAGE SEO */}
          {activeSection === 'images' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 animate-fade-in text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#9B332C]" />
                  <span>Image Alt Attributes & Media SEO</span>
                </h3>
                <span className="text-[11px] text-stone-500">
                  {formData.images?.length || 0} associated image(s)
                </span>
              </div>

              <div className="space-y-4">
                {(formData.images || []).map((img, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-start gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-stone-200 overflow-hidden shrink-0 border border-stone-300">
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                      />
                    </div>

                    {/* Metadata & Alt Input */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-stone-600 font-semibold truncate max-w-xs">
                          {img.filename || img.src.split('/').pop()}
                        </span>
                        {!img.alt || img.alt.trim().length === 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                            Missing Alt Text
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Alt Configured
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                          Descriptive Image Alt Text
                        </label>
                        <input
                          type="text"
                          value={img.alt}
                          onChange={(e) => handleUpdateImageAlt(idx, e.target.value)}
                          placeholder="Describe the textile pattern, color, and craft..."
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {(formData.images || []).length === 0 && (
                  <div className="text-center py-8 text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-stone-400" />
                    <p className="font-bold text-stone-700">No images linked to this route</p>
                    <p className="text-stone-400 text-[11px] mt-0.5">Images rendered on this page will automatically inherit the atelier fallback.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 4: SOCIAL CARDS */}
          {activeSection === 'social' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 animate-fade-in text-xs">
              <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#9B332C]" />
                <span>Open Graph (Facebook, WhatsApp, LinkedIn) & Twitter/X Cards</span>
              </h3>

              {/* Open Graph Title */}
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                  Open Graph Title (og:title)
                </label>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => handleChange('ogTitle', e.target.value)}
                  placeholder="Defaults to SEO Title if blank..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
                />
              </div>

              {/* Open Graph Description */}
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                  Open Graph Description (og:description)
                </label>
                <textarea
                  rows={2}
                  value={formData.ogDescription}
                  onChange={(e) => handleChange('ogDescription', e.target.value)}
                  placeholder="Defaults to Meta Description if blank..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs leading-relaxed"
                />
              </div>

              {/* Social Image URL */}
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                  Social Sharing Image URL (og:image)
                </label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => {
                    handleChange('ogImage', e.target.value);
                    handleChange('twitterImage', e.target.value);
                  }}
                  placeholder="/products/duffle-kantha-patchwork.jpg or full https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs font-mono"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Recommended size: 1200 x 630 pixels.
                </p>
              </div>

              {/* Twitter Card Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Twitter Card Type
                  </label>
                  <select
                    value={formData.twitterCard}
                    onChange={(e) => handleChange('twitterCard', e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:border-[#9B332C] outline-none text-xs"
                  >
                    <option value="summary_large_image">summary_large_image (High-Impact Hero)</option>
                    <option value="summary">summary (Compact Square Thumbnail)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Open Graph Type (og:type)
                  </label>
                  <select
                    value={formData.ogType}
                    onChange={(e) => handleChange('ogType', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:border-[#9B332C] outline-none text-xs"
                  >
                    <option value="website">website</option>
                    <option value="article">article</option>
                    <option value="product">product</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: ADVANCED SEO & SCHEMA */}
          {activeSection === 'advanced' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5 animate-fade-in text-xs">
              <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-[#9B332C]" />
                <span>Structured Data (JSON-LD) & Safe Custom Meta</span>
              </h3>

              {/* Schema Type Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Primary Schema.org Entity Type
                  </label>
                  <select
                    value={formData.schemaType}
                    onChange={(e) => handleChange('schemaType', e.target.value as SchemaType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:border-[#9B332C] outline-none text-xs"
                  >
                    <option value="Product">Product (E-commerce Rich Snippet)</option>
                    <option value="Organization">Organization (Brand Knowledge Graph)</option>
                    <option value="Article">Article / BlogPosting</option>
                    <option value="BreadcrumbList">BreadcrumbList (URL Navigation trail)</option>
                    <option value="FAQPage">FAQPage (Expandable SERP Questions)</option>
                    <option value="LocalBusiness">LocalBusiness (Jaipur Atelier)</option>
                    <option value="Custom">Custom JSON-LD</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
                    Hreflang Language Target
                  </label>
                  <input
                    type="text"
                    value={formData.hreflang?.[0]?.lang || 'en'}
                    onChange={(e) => handleChange('hreflang', [{ lang: e.target.value, href: formData.canonicalUrl }])}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
                    placeholder="en, en-US, en-GB, en-IN..."
                  />
                </div>
              </div>

              {/* JSON-LD Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                    Structured Data JSON-LD Markup
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(formData.jsonLd);
                        handleChange('jsonLd', JSON.stringify(parsed, null, 2));
                      } catch {}
                    }}
                    className="text-[11px] font-bold text-[#9B332C] hover:underline"
                  >
                    Format JSON
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={formData.jsonLd}
                  onChange={(e) => handleChange('jsonLd', e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none font-mono text-[11px] leading-relaxed bg-stone-50"
                  spellCheck={false}
                />
              </div>

              {/* Safe Custom Meta Tags */}
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                    Custom Safe Meta Tags ({formData.customMetaTags?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMetaTag}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9B332C] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Custom Meta</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.customMetaTags || []).map(tag => (
                    <div key={tag.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tag.name}
                        onChange={(e) => handleUpdateMetaTag(tag.id, 'name', e.target.value)}
                        placeholder="name (e.g. author)"
                        className="w-1/3 px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
                      />
                      <input
                        type="text"
                        value={tag.content}
                        onChange={(e) => handleUpdateMetaTag(tag.id, 'content', e.target.value)}
                        placeholder="content"
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMetaTag(tag.id)}
                        className="text-stone-400 hover:text-red-600 p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Social Share Preview (Visible when on Social tab or basic) */}
          {activeSection === 'social' && (
            <SocialSharePreview
              ogTitle={formData.ogTitle || formData.seoTitle}
              ogDescription={formData.ogDescription || formData.metaDescription}
              ogImage={formData.ogImage}
              canonicalUrl={formData.canonicalUrl}
              twitterCard={formData.twitterCard}
              twitterTitle={formData.twitterTitle || formData.seoTitle}
              twitterDescription={formData.twitterDescription || formData.metaDescription}
              twitterImage={formData.twitterImage || formData.ogImage}
            />
          )}
        </div>

        {/* Right Sticky Sidebar (5 Columns): Live Google Preview & SEO Quality Score */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Google Search Preview */}
          <LiveSERPPreview
            seoTitle={formData.seoTitle}
            metaDescription={formData.metaDescription}
            canonicalUrl={formData.canonicalUrl}
            pagePath={formData.path}
            pageName={formData.pageName}
          />

          {/* Transparent Quality Score */}
          <SEOQualityScore report={currentReport} />

          {/* Reset to Default Danger Zone */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800">Factory Revert</span>
              <p className="text-[11px] text-stone-500 mt-0.5">Wipe custom overrides for this page.</p>
            </div>
            <button
              type="button"
              onClick={onResetDefault}
              className="px-3 py-1.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 font-bold transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
