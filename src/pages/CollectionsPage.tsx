import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';

interface CollectionsPageProps {
  onNavigate: (path: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-royal-body">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#9B332C]" />
          <span>Jaipur Heritage Curations</span>
        </div>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16]">
          Artisan Craft Collections
        </h1>
        <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed">
          Explore our thematic design chapters rooted in centuries-old Rajasthani royal history, natural indigo mud resist, and luxury cotton tailoring.
        </p>
      </div>

      {/* Collections List */}
      <div className="space-y-12">
        {COLLECTIONS.map((collection, idx) => {
          const sampleProducts = PRODUCTS.filter(p => p.collection === collection.name || p.collection === collection.id).slice(0, 3);
          const isReversed = idx % 2 === 1;

          return (
            <div 
              key={collection.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF5EE] p-6 sm:p-10 rounded-[32px] border border-[#D4AF37]/35 hover:border-[#9B332C] shadow-md hover:shadow-2xl transition-all"
            >
              {/* Image Showcase */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden shadow-lg group border border-[#D4AF37]/30">
                  <picture className="w-full h-full block">
                    <source srcSet={resolveWebpImage(collection.heroImage)} type="image/webp" />
                    <img
                      src={resolveProductImage(collection.heroImage)}
                      alt={collection.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.dataset.fallbackTried) {
                          target.dataset.fallbackTried = 'true';
                          target.src = resolveProductImage('./products/duffle-kantha-patchwork.jpg');
                        }
                      }}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6B2824]/80 via-transparent to-transparent opacity-65" />
                  <div className="absolute bottom-4 left-4 text-[#241A16] font-royal-title text-xs uppercase tracking-widest bg-[#FAF5EE]/95 backdrop-blur-md border border-[#D4AF37]/50 px-3.5 py-1.5 rounded-full shadow-md font-bold">
                    {collection.tagline}
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs uppercase tracking-widest font-bold font-royal-title px-3 py-1 rounded-full border ${
                    idx % 4 === 0 
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD]'
                      : idx % 4 === 1
                      ? 'bg-[#FDF2F8] text-[#BE185D] border-[#F472B6]'
                      : idx % 4 === 2
                      ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                      : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                  }`}>
                    ✦ Heritage Chapter 0{idx + 1} • {collection.season}
                  </span>
                </div>

                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                  {collection.name}
                </h2>
                <p className="text-stone-600 font-royal-body text-base leading-relaxed">
                  {collection.description}
                </p>

                {/* Artisan Color Palette Swatches */}
                {collection.palette && collection.palette.length > 0 && (
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] font-bold text-[#241A16] uppercase tracking-wider font-royal-title">
                      Atelier Shades:
                    </span>
                    <div className="flex items-center gap-2">
                      {collection.palette.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="group/color relative w-6 h-6 rounded-full border-2 border-[#FAF5EE] shadow-md transition-transform hover:scale-125 cursor-pointer ring-1 ring-black/10"
                          style={{ backgroundColor: color }}
                          title={`Jaipur Shade: ${color}`}
                        >
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#9B332C] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/color:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20 font-mono shadow-sm">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collection Tags with colorful pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {collection.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-royal-title border ${
                        idx % 3 === 0
                          ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
                          : idx % 3 === 1
                          ? 'bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]'
                          : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                      }`}
                    >
                      ✦ {tag}
                    </span>
                  ))}
                </div>

                {/* Sample items snippet */}
                {sampleProducts.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#241A16] uppercase tracking-wider block mb-2 font-royal-title">
                      Featured in this collection:
                    </span>
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                      {sampleProducts.map(sp => (
                        <div
                          key={sp.id}
                          onClick={() => { onNavigate(`/product/${sp.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-24 cursor-pointer text-center group"
                        >
                          <div className="w-24 h-28 rounded-xl overflow-hidden border border-[#D4AF37]/30 group-hover:border-[#9B332C] mb-1 shadow-sm transition-all bg-[#F0E6D8]">
                            <picture className="w-full h-full block">
                              <source srcSet={resolveWebpImage(sp.images[0])} type="image/webp" />
                              <img src={resolveProductImage(sp.images[0])} alt={sp.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-108 transition-transform" />
                            </picture>
                          </div>
                          <span className="text-[10px] text-stone-700 truncate block font-semibold group-hover:text-[#9B332C] font-royal-body">{sp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => {
                      onNavigate(`/shop?collection=${encodeURIComponent(collection.name)}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`${
                      idx % 3 === 0 ? 'pill-btn-indigo' : idx % 3 === 1 ? 'pill-btn-rani' : 'pill-btn-rose'
                    } text-xs px-6 py-3 rounded-full shadow-md inline-flex items-center gap-2`}
                  >
                    <span>Explore Collection Pieces</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsPage;
