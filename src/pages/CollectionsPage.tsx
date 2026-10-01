import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';

interface CollectionsPageProps {
  onNavigate: (path: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="royal-seal-emerald">
          <span>👑 Royal Jaipur Heritage Curations</span>
        </div>
        <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0B241C]">
          Artisan Craft Collections
        </h1>
        <div className="ornate-divider" />
        <p className="text-stone-700 font-royal-body text-base sm:text-lg leading-relaxed">
          Explore our thematic design chapters rooted in centuries-old Rajasthani royal history, natural indigo mud resist, and luxury cotton tailoring.
        </p>
      </div>

      {/* Collections List */}
      <div className="space-y-16">
        {COLLECTIONS.map((collection, idx) => {
          const sampleProducts = PRODUCTS.filter(p => p.collection === collection.name || p.collection === collection.id).slice(0, 3);
          const isReversed = idx % 2 === 1;

          return (
            <div 
              key={collection.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/35 shadow-md hover:shadow-2xl transition-all"
            >
              {/* Image Showcase */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg group border-2 border-[#D4AF37]/30">
                  <img
                    src={collection.heroImage}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061711]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-[#FAF3DC] font-royal-title text-xs uppercase tracking-widest bg-[#0B241C]/90 border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-xl backdrop-blur-sm">
                    {collection.tagline}
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-widest text-[#164335] font-bold font-royal-title">
                  👑 Heritage Chapter 0{idx + 1} • {collection.season}
                </span>
                <h2 className="font-royal-heading text-2xl sm:text-3xl font-bold text-[#0B241C]">
                  {collection.name}
                </h2>
                <p className="text-stone-700 font-royal-body text-base leading-relaxed">
                  {collection.description}
                </p>

                {/* Sample items snippet */}
                {sampleProducts.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#164335] uppercase tracking-wider block mb-2 font-royal-title">
                      Featured in this collection:
                    </span>
                    <div className="flex gap-2.5 overflow-x-auto pb-1">
                      {sampleProducts.map(sp => (
                        <div
                          key={sp.id}
                          onClick={() => { onNavigate(`/product/${sp.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-20 cursor-pointer text-center group"
                        >
                          <div className="w-20 h-24 rounded-xl overflow-hidden border border-[#D4AF37]/35 mb-1 shadow-sm">
                            <img src={sp.images[0]} alt={sp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-[10px] text-[#0B241C] truncate block font-medium group-hover:text-[#164335] font-royal-body">{sp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => {
                      onNavigate(`/shop?collection=${collection.name}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn-royal-emerald text-xs inline-flex items-center gap-2 rounded-xl"
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
