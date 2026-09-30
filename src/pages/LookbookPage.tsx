import React, { useState } from 'react';
import { Sparkles, Eye, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { useApp } from '../context/AppContext';

interface LookbookPageProps {
  onNavigate: (path: string) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({ onNavigate }) => {
  const { showToast } = useApp();
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedImageModal, setSelectedImageModal] = useState<any | null>(null);

  const seasons = ['all', 'Spring / Summer 2026', 'Autumn / Resort 2026', 'Festive / Couture 2026', 'Core Evergreen Series'];

  const filteredItems = selectedSeason === 'all' 
    ? LOOKBOOK_ITEMS 
    : LOOKBOOK_ITEMS.filter((i: any) => i.season === selectedSeason);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Editorial Gallery</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
          2026 Seasonal Lookbook
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          High-fashion editorial campaigns celebrating Jaipur's artisanal textile soul. Photographed in historical Havelis, sand dunes, and artisan printing courtyards.
        </p>
      </div>

      {/* Season Filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {seasons.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSeason(s)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedSeason === s
                ? 'bg-[#0E1612] text-amber-100 shadow'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            {s === 'all' ? 'All Seasons' : s}
          </button>
        ))}
      </div>

      {/* Lookbook Gallery Masonry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredItems.map((item: any) => (
          <div
            key={item.id}
            onClick={() => setSelectedImageModal(item)}
            className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-stone-100 aspect-[4/3]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
                {item.season} • {item.location}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mt-1">
                {item.title}
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-serif uppercase tracking-wider text-amber-200">
                <span>View Full Editorial</span>
                <Eye className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 shadow-2xl border border-amber-900/30 text-[#1C1917]">
            <div className="md:col-span-7 bg-black max-h-[70vh] md:max-h-[80vh] flex items-center justify-center">
              <img
                src={selectedImageModal.image}
                alt={selectedImageModal.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#942C29] font-bold">
                  {selectedImageModal.season}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {selectedImageModal.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selectedImageModal.description}
                </p>

                <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                  <p><strong>Artisan Technique:</strong> Hand Block Stamped</p>
                  <p><strong>Material:</strong> 100% Pure Cambric / Muslin</p>
                  <p><strong>Location:</strong> {selectedImageModal.location}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSelectedImageModal(null);
                    onNavigate('/shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-[#0E1612] text-amber-100 font-serif font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors"
                >
                  Shop Featured Products
                </button>
                <button
                  onClick={() => setSelectedImageModal(null)}
                  className="w-full py-2.5 border border-stone-300 text-stone-700 font-serif text-xs uppercase tracking-wider rounded hover:bg-stone-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
