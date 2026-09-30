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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-12 animate-fade-in flex items-start justify-center">
      <div className="w-full max-w-3xl bg-[#FAF7F2] rounded-lg shadow-2xl border border-[#C4A674]/30 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#121815]/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C4A674] shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search hand block prints, mulmul fabrics, quilted bags, SKUs..."
            className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-medium text-[#121815] placeholder:text-[#7E8A83]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[#7E8A83] hover:text-[#121815] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={closeSearch}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#7E8A83] hover:text-[#121815] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-[#F2ECE0]/60 border-b border-[#121815]/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-[#7E8A83] tracking-wider shrink-0">
            Category:
          </span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === 'all' 
                ? 'bg-[#0C1813] text-[#DFCA9F]' 
                : 'bg-white/80 text-[#4F5A54] hover:bg-white'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedFilter(c.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === c.id 
                  ? 'bg-[#0C1813] text-[#DFCA9F]' 
                  : 'bg-white/80 text-[#4F5A54] hover:bg-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Quick Category Tags if search is blank */}
          {!searchQuery && selectedFilter === 'all' && (
            <div>
              <span className="text-[11px] font-bold text-[#8A4A3B] uppercase tracking-wider block mb-2">
                Popular B2B Inquiries &amp; Craft Search
              </span>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Dabu Indigo', 'Mulmul 60x60', 'Quilted Duffle', 'Chanderi Zari', 'Cosmetic Vanity', 'Sanganer Florals'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 rounded bg-white border border-[#121815]/10 hover:border-[#C4A674] text-xs text-[#0C1813] flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Tag className="w-3 h-3 text-[#C4A674]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#4F5A54] uppercase tracking-wider block">
              Matching Products ({filteredProducts.length})
            </span>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 text-sm text-[#7E8A83]">
                No matching textile styles or fabrics found for "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="p-3 bg-white rounded border border-[#121815]/10 hover:border-[#C4A674] flex gap-3 cursor-pointer group shadow-sm hover:shadow-md transition-all"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-16 h-20 rounded object-cover border border-black/5 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#8A4A3B] font-bold uppercase">
                          <span>{product.category}</span>
                          <span className="bg-[#F2ECE0] px-1.5 py-0.5 rounded text-[#0C1813]">MOQ {product.moq}</span>
                        </div>
                        <h5 className="font-heading text-xs font-semibold text-[#0C1813] group-hover:text-[#8A4A3B] transition-colors line-clamp-1 mt-0.5">
                          {product.name}
                        </h5>
                        <p className="text-[10px] text-[#7E8A83] line-clamp-1 mt-0.5">
                          {product.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#0C1813] pt-1">
                        <span className="text-[#8A4A3B]">SKU: {product.sku}</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
