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
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#D4AF37]/25 border border-[#D4AF37]/45 rounded-full text-[#11352A] text-xs font-royal-title font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Royal Editorial Gallery</span>
        </div>
        <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0B241C]">
          2026 Seasonal Royal Lookbook
        </h1>
        <p className="text-[#164335]/80 font-royal-body text-base sm:text-lg leading-relaxed">
          High-fashion editorial campaigns celebrating Jaipur's artisanal textile soul. Photographed in historical Havelis, sand dunes, and artisan printing courtyards.
        </p>
      </div>

      {/* Season Filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {seasons.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSeason(s)}
            className={`px-4 py-2 rounded-full text-xs font-royal-title font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedSeason === s
                ? 'bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-lg border border-[#D4AF37]'
                : 'bg-white text-[#0B241C] hover:bg-[#FAF7EE] border border-[#D4AF37]/30'
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
            className="group relative rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-stone-100 aspect-[4/3] border-2 border-[#D4AF37]/35"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B241C]/90 via-[#0B241C]/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white flex flex-col justify-end">
              <span className="text-[10px] font-royal-title uppercase tracking-widest text-[#D4AF37] font-bold">
                {item.season} • {item.location}
              </span>
              <h3 className="font-royal-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#F5E6B5] transition-colors mt-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-royal-body text-stone-200 mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-royal-title uppercase tracking-widest text-[#F5E6B5]">
                <span>View Full Editorial</span>
                <Eye className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 sm:p-8 flex items-center justify-center animate-fade-in">
          <div className="bg-[#FAF7EE] rounded-3xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 shadow-2xl border-2 border-[#D4AF37] text-[#0B241C]">
            <div className="md:col-span-7 bg-black max-h-[70vh] md:max-h-[80vh] flex items-center justify-center">
              <img
                src={selectedImageModal.image}
                alt={selectedImageModal.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-royal-title uppercase tracking-widest text-[#11352A] font-bold">
                  {selectedImageModal.season}
                </span>
                <h3 className="font-royal-heading text-2xl font-bold text-[#0B241C]">
                  {selectedImageModal.title}
                </h3>
                <p className="text-xs sm:text-sm font-royal-body text-stone-700 leading-relaxed">
                  {selectedImageModal.description}
                </p>

                <div className="pt-3 border-t border-[#D4AF37]/30 text-xs font-royal-body text-stone-700 space-y-1">
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
                  className="btn-royal-gold w-full py-3.5 font-royal-title font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg"
                >
                  Shop Featured Creations
                </button>
                <button
                  onClick={() => setSelectedImageModal(null)}
                  className="btn-royal-sand-outline w-full py-2.5 font-royal-title text-xs uppercase tracking-wider rounded-xl"
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
