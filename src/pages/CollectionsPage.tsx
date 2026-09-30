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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Heritage Curations</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
          Artisan Craft Collections
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl border border-amber-900/15 shadow-sm"
            >
              {/* Image Showcase */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg group">
                  <img
                    src={collection.heroImage}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white font-mono text-xs uppercase tracking-widest bg-[#0E1612]/80 px-3 py-1 rounded backdrop-blur-sm">
                    {collection.tagline}
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-widest text-[#942C29] font-bold">
                  Heritage Chapter 0{idx + 1} • {collection.season}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {collection.name}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {collection.description}
                </p>

                {/* Sample items snippet */}
                {sampleProducts.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Featured in this collection:
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {sampleProducts.map(sp => (
                        <div
                          key={sp.id}
                          onClick={() => { onNavigate(`/product/${sp.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-20 cursor-pointer text-center group"
                        >
                          <div className="w-20 h-24 rounded overflow-hidden border border-stone-300 mb-1">
                            <img src={sp.images[0]} alt={sp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-[10px] text-stone-700 truncate block group-hover:text-[#942C29]">{sp.name}</span>
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
                    className="px-6 py-3 bg-[#0E1612] text-amber-100 hover:bg-[#D4AF37] hover:text-[#0E1612] font-serif text-xs uppercase font-bold tracking-widest rounded shadow transition-colors inline-flex items-center gap-2"
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
