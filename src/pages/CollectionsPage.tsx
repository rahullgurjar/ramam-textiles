import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';

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
                  <img
                    src={collection.heroImage}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241A16] via-transparent to-transparent opacity-75" />
                  <div className="absolute bottom-4 left-4 text-[#FAF5EE] font-royal-title text-xs uppercase tracking-widest bg-[#241A16]/95 border border-[#D4AF37]/50 px-3.5 py-1.5 rounded-full shadow-lg">
                    {collection.tagline}
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-widest text-[#9B332C] font-bold font-royal-title">
                  ✦ Heritage Chapter 0{idx + 1} • {collection.season}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                  {collection.name}
                </h2>
                <p className="text-stone-600 font-royal-body text-base leading-relaxed">
                  {collection.description}
                </p>

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
                            <img src={sp.images[0]} alt={sp.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform" />
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
                    className="pill-btn-rose text-xs px-6 py-3 rounded-full shadow-md inline-flex items-center gap-2"
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
