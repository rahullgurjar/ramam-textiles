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
        <div className="royal-seal-rose">
          <span>👑 Royal Jaipur Heritage Curations</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-[#4D0E0D]">
          Artisan Craft Collections
        </h1>
        <div className="ornate-divider" />
        <p className="text-[#5C4540] text-sm sm:text-base leading-relaxed font-light">
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border-2 border-[#D4AF37]/35 shadow-md hover:shadow-xl transition-all"
            >
              {/* Image Showcase */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg group border border-[#D4AF37]/30">
                  <img
                    src={collection.heroImage}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#380708]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-[#FAF3DC] font-heading text-xs uppercase tracking-widest bg-[#4D0E0D]/90 border border-[#D4AF37]/40 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    {collection.tagline}
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-widest text-[#942220] font-bold font-heading">
                  👑 Heritage Chapter 0{idx + 1} • {collection.season}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#4D0E0D]">
                  {collection.name}
                </h2>
                <p className="text-[#5C4540] text-sm leading-relaxed font-light">
                  {collection.description}
                </p>

                {/* Sample items snippet */}
                {sampleProducts.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#7A5450] uppercase tracking-wider block mb-2 font-heading">
                      Featured in this collection:
                    </span>
                    <div className="flex gap-2.5 overflow-x-auto pb-1">
                      {sampleProducts.map(sp => (
                        <div
                          key={sp.id}
                          onClick={() => { onNavigate(`/product/${sp.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-20 cursor-pointer text-center group"
                        >
                          <div className="w-20 h-24 rounded-lg overflow-hidden border border-[#D4AF37]/35 mb-1 shadow-sm">
                            <img src={sp.images[0]} alt={sp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-[10px] text-[#4D0E0D] truncate block font-medium group-hover:text-[#942220]">{sp.name}</span>
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
                    className="btn-royal-rose text-xs inline-flex items-center gap-2"
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
