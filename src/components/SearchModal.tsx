import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Layers, Tag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { Product } from '../types';

export const SearchModal: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { isSearchModalOpen, closeSearch, searchQuery, setSearchQuery } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredProducts = PRODUCTS.filter(p => {
    const query = searchQuery.toLowerCase().trim();
    const matchCategory = selectedFilter === 'all' || p.category === selectedFilter;
    if (!matchCategory) return false;
    if (!query) return true;

    return (
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.fabric.toLowerCase().includes(query) ||
      p.printTechnique.toLowerCase().includes(query) ||
      p.collection.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  });

  const handleProductSelect = (product: Product) => {
    closeSearch();
    onNavigate(`/product/${product.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryId: string) => {
    closeSearch();
    onNavigate(`/category/${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-4 sm:p-6 md:p-12 animate-fade-in flex items-start justify-center">
      <div className="w-full max-w-3xl bg-[#FAF7EE] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#D4AF37]/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Jaipur hand block prints, quilted duffles, vanity cases, SKUs..."
            className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-medium text-[#0B241C] placeholder:text-[#164335]/70"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-stone-400 hover:text-[#0B241C] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={closeSearch}
            className="p-1.5 rounded-full hover:bg-black/5 text-stone-400 hover:text-[#0B241C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-[#F3EEDB] border-b border-[#D4AF37]/20 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-[#164335] tracking-wider shrink-0 font-royal-title">
            👑 Category:
          </span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all font-royal-title ${
              selectedFilter === 'all' 
                ? 'bg-[#11352A] text-[#FAF7EE] border border-[#D4AF37]/50 shadow-sm' 
                : 'bg-white text-[#0B241C] hover:bg-[#FAF7EE] border border-[#D4AF37]/30'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedFilter(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all font-royal-title ${
                selectedFilter === c.id 
                  ? 'bg-[#11352A] text-[#FAF7EE] border border-[#D4AF37]/50 shadow-sm' 
                  : 'bg-white text-[#0B241C] hover:bg-[#FAF7EE] border border-[#D4AF37]/30'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          {/* Quick Category Tags if search is blank */}
          {!searchQuery && selectedFilter === 'all' && (
            <div>
              <span className="text-[11px] font-bold text-[#11352A] uppercase tracking-wider block mb-2 font-royal-title">
                🪷 Popular Jaipur Inquiries &amp; Craft Searches
              </span>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Quilted Duffle', 'Playing Card Vanity', 'Dyson Airwrap Case', 'Bagru Indigo', 'Kantha Patchwork', 'Sanganeri Florals'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#D4AF37]/35 hover:border-[#D4AF37] hover:bg-[#F0F7F4] text-xs text-[#0B241C] font-medium flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Tag className="w-3 h-3 text-[#D4AF37]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#164335] uppercase tracking-wider block font-royal-title">
              Matching Products ({filteredProducts.length})
            </span>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 text-sm text-[#164335]/70">
                No matching textile styles or fabrics found for "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="p-3 bg-white rounded-xl border border-[#D4AF37]/35 hover:border-[#D4AF37] flex gap-3 cursor-pointer group shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-16 h-20 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0 shadow-sm"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#11352A] font-bold uppercase font-royal-title">
                          <span>{product.category}</span>
                          <span className="bg-[#F0F7F4] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded-full text-[#0B241C]">MOQ {product.moq}</span>
                        </div>
                        <h5 className="font-royal-heading text-xs font-bold text-[#0B241C] group-hover:text-[#11352A] transition-colors line-clamp-1 mt-0.5">
                          {product.name}
                        </h5>
                        <p className="text-[10px] text-[#164335]/80 line-clamp-1 mt-0.5 font-light">
                          {product.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-bold text-[#0B241C] pt-1 border-t border-[#D4AF37]/20 font-royal-title">
                        <span className="text-stone-400 font-mono">SKU: {product.sku}</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#11352A]">
                          <span>View Specs</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchModal;
