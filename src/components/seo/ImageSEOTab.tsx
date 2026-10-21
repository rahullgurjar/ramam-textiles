import React, { useState } from 'react';
import { Image as ImageIcon, Search, CheckCircle2, AlertTriangle, ExternalLink, Save, Filter } from 'lucide-react';
import { PageSEOData } from '../../types/seo';

interface ImageSEOTabProps {
  pages: PageSEOData[];
  onUpdatePageSEO: (path: string, updated: PageSEOData) => void;
  onSelectPage: (path: string) => void;
}

interface FlatImageItem {
  id: string;
  pagePath: string;
  pageName: string;
  src: string;
  filename: string;
  alt: string;
  index: number;
}

export const ImageSEOTab: React.FC<ImageSEOTabProps> = ({
  pages,
  onUpdatePageSEO,
  onSelectPage
}) => {
  const [search, setSearch] = useState('');
  const [filterMissingOnly, setFilterMissingOnly] = useState(false);
  const [editedAlts, setEditedAlts] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  // Flatten all images across all pages
  const allImages: FlatImageItem[] = [];
  pages.forEach(p => {
    (p.images || []).forEach((img, idx) => {
      allImages.push({
        id: `${p.path}::${idx}::${img.src}`,
        pagePath: p.path,
        pageName: p.pageName,
        src: img.src,
        filename: img.filename || img.src.split('/').pop() || 'image.jpg',
        alt: editedAlts[`${p.path}::${idx}::${img.src}`] !== undefined ? editedAlts[`${p.path}::${idx}::${img.src}`] : img.alt,
        index: idx
      });
    });
  });

  const filteredImages = allImages.filter(item => {
    if (filterMissingOnly && item.alt && item.alt.trim().length > 0) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.filename.toLowerCase().includes(q) ||
        item.pageName.toLowerCase().includes(q) ||
        item.pagePath.toLowerCase().includes(q) ||
        item.alt.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const missingAltCount = allImages.filter(img => !img.alt || img.alt.trim().length === 0).length;

  const handleAltChange = (id: string, value: string) => {
    setEditedAlts(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveSingle = (item: FlatImageItem) => {
    const page = pages.find(p => p.path === item.pagePath);
    if (!page) return;

    const newAlts = [...(page.images || [])];
    if (newAlts[item.index]) {
      newAlts[item.index] = { ...newAlts[item.index], alt: item.alt };
      const updatedPage = { ...page, images: newAlts, hasUnsavedChanges: true };
      onUpdatePageSEO(item.pagePath, updatedPage);
      setSavedSuccess(item.id);
      setTimeout(() => setSavedSuccess(null), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#9B332C]" />
            <h2 className="font-playfair text-xl font-bold text-stone-900">
              Site-Wide Image SEO & Alt Text Inventory
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Optimize image filenames and accessibility alt attributes to rank in Google Images and support screen readers.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          {missingAltCount > 0 ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{missingAltCount} Missing Alt Tag{missingAltCount === 1 ? '' : 's'}</span>
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All {allImages.length} Images Have Alt Text</span>
            </span>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search image filename or page..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 focus:border-[#9B332C] outline-none text-xs"
          />
        </div>

        <button
          type="button"
          onClick={() => setFilterMissingOnly(!filterMissingOnly)}
          className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 transition-colors ${
            filterMissingOnly 
              ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Show Only Missing Alt ({missingAltCount})</span>
        </button>
      </div>

      {/* Image Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredImages.map((item) => {
          const isMissing = !item.alt || item.alt.trim().length === 0;
          const isSaved = savedSuccess === item.id;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start gap-4 ${
                isMissing 
                  ? 'bg-amber-50/30 border-amber-200/80 shadow-sm' 
                  : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
              }`}
            >
              {/* Image Preview */}
              <div className="w-24 h-24 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                <img
                  src={item.src}
                  alt={item.alt || 'preview'}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                />
              </div>

              {/* Details & Inline Edit */}
              <div className="flex-1 min-w-0 w-full space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-stone-700 font-bold truncate max-w-[180px]">
                    {item.filename}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectPage(item.pagePath)}
                    className="text-[11px] font-semibold text-[#9B332C] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>{item.pageName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                    Editable Alt Text
                  </label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => handleAltChange(item.id, e.target.value)}
                    placeholder="Describe motif, colors, fabric..."
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-stone-400 font-mono">
                    {item.pagePath}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSaveSingle(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      isSaved 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-stone-800 hover:bg-black text-white'
                    }`}
                  >
                    {isSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved!' : 'Save Alt'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredImages.length === 0 && (
          <div className="col-span-2 py-12 text-center text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-stone-800">No images match your filter criteria.</p>
            <p className="text-xs text-stone-500 mt-1">All images are properly attributed.</p>
          </div>
        )}
      </div>
    </div>
  );
};
