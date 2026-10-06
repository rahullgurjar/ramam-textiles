import React, { useState, useMemo } from 'react';
import { 
  Filter, SlidersHorizontal, Grid3X3, Grid2X2, X, ChevronDown, 
  RotateCcw, Sparkles, Lock, Unlock, Search
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ShopPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
  initialCollection?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, initialCategory, initialCollection }) => {
  const { isB2BPriceUnlocked } = useApp();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection || 'all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedTechnique, setSelectedTechnique] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Available Filter Options
  const fabrics = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach(p => set.add(p.fabric));
    return Array.from(set);
  }, []);

  const techniques = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach(p => set.add(p.printTechnique));
    return Array.from(set);
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Collection filter
      if (selectedCollection !== 'all' && product.collection !== selectedCollection) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all' && product.fabric !== selectedFabric) {
        return false;
      }
      // Technique filter
      if (selectedTechnique !== 'all' && product.printTechnique !== selectedTechnique) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q) ||
          product.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.indicativeRetailInr || a.wholesaleTiers[0]?.pricePerUnitInr || 0;
      const priceB = b.indicativeRetailInr || b.wholesaleTiers[0]?.pricePerUnitInr || 0;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'moq-low') return a.moq - b.moq;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [selectedCategory, selectedCollection, selectedFabric, selectedTechnique, searchQuery, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedCollection !== 'all',
    selectedFabric !== 'all',
    selectedTechnique !== 'all',
    Boolean(searchQuery.trim())
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedFabric('all');
    setSelectedTechnique('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header - Jaipur Emerald Court Style */}
      <div className="bg-gradient-to-r from-[#0B241C] via-[#11352A] to-[#0B241C] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061711] via-[#0E2F23]/85 to-transparent" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-35 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full text-[#F5E6B5] text-xs font-bold uppercase tracking-wider mb-4 font-royal-title shadow-md">
            <span>👑 2026 Wholesale &amp; Export Catalog</span>
          </div>
          <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] mb-3">
            Handcrafted Textile Catalog
          </h1>
          <p className="text-stone-200 font-royal-body text-base md:text-lg leading-relaxed">
            Browse our Jaipur hand block-printed apparel, quilted duffles, vanity pouches, and running pure cotton yardage. Direct artisan pricing with worldwide DHL/FedEx export logistics.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border-2 border-[#D4AF37]/35 h-fit sticky top-28 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25">
            <div className="flex items-center gap-2 font-royal-title font-bold text-[#0B241C] text-base">
              <Filter className="w-4 h-4 text-[#164335]" />
              <span>Filter Catalog</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#164335] hover:underline flex items-center gap-1 font-bold font-royal-title"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-1.5 font-royal-title">
              Search Design / Fabric
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#11352A]" />
              <input
                type="text"
                placeholder="e.g. Indigo, Duffle, Mulmul..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#11352A] text-[#0B241C]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">
              Product Category
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center justify-between font-royal-title ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#FAF3DC] font-bold shadow-md'
                    : 'text-[#0B241C] hover:bg-[#FAF7EE]'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] font-mono opacity-70">{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map(cat => {
                const count = PRODUCTS.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center justify-between font-royal-title ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#FAF3DC] font-bold shadow-md'
                        : 'text-[#0B241C] hover:bg-[#FAF7EE]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collection Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">
              Artisan Collection
            </label>
            <select
              value={selectedCollection}
              onChange={e => setSelectedCollection(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#11352A] text-[#0B241C]"
            >
              <option value="all">All Heritage Collections</option>
              {COLLECTIONS.map(col => (
                <option key={col.id} value={col.name}>{col.name}</option>
              ))}
            </select>
          </div>

          {/* Base Fabric Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">
              Base Fabric
            </label>
            <select
              value={selectedFabric}
              onChange={e => setSelectedFabric(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#11352A] text-[#0B241C]"
            >
              <option value="all">All Fabrics</option>
              {fabrics.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Technique Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">
              Print / Dye Technique
            </label>
            <select
              value={selectedTechnique}
              onChange={e => setSelectedTechnique(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#11352A] text-[#0B241C]"
            >
              <option value="all">All Techniques</option>
              {techniques.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Product Grid & Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar Controls */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#D4AF37]/35 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2.5 bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#FAF3DC] rounded-xl text-xs font-bold flex items-center gap-1.5 font-royal-title shadow-sm"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>
              <span className="text-xs text-stone-600 font-medium font-royal-body">
                Showing <strong className="text-[#0B241C] font-bold">{filteredProducts.length}</strong> creations
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 hidden sm:inline font-royal-body">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3.5 py-2 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs font-medium focus:outline-none focus:border-[#11352A] text-[#0B241C]"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="moq-low">MOQ: Lowest First</option>
                  <option value="name">Product Name (A-Z)</option>
                </select>
              </div>

              {/* Grid Toggle Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-[#FAF7EE] border border-[#D4AF37]/30 p-1 rounded-xl">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-lg transition-all ${gridCols === 3 ? 'bg-[#11352A] text-[#FAF3DC] shadow-sm' : 'text-stone-500 hover:text-[#0B241C]'}`}
                  title="3 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-lg transition-all ${gridCols === 4 ? 'bg-[#11352A] text-[#FAF3DC] shadow-sm' : 'text-stone-500 hover:text-[#0B241C]'}`}
                  title="4 Columns"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-600 font-bold font-royal-title">Active:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F0F7F4] text-[#164335] border border-[#D4AF37]/30 rounded-full text-xs font-medium font-royal-body">
                  Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-700" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {selectedCollection !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F0F7F4] text-[#164335] border border-[#D4AF37]/30 rounded-full text-xs font-medium font-royal-body">
                  Collection: {selectedCollection}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-700" onClick={() => setSelectedCollection('all')} />
                </span>
              )}
              {selectedFabric !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F0F7F4] text-[#164335] border border-[#D4AF37]/30 rounded-full text-xs font-medium font-royal-body">
                  Fabric: {selectedFabric}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-700" onClick={() => setSelectedFabric('all')} />
                </span>
              )}
              {selectedTechnique !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F0F7F4] text-[#164335] border border-[#D4AF37]/30 rounded-full text-xs font-medium font-royal-body">
                  Technique: {selectedTechnique}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-700" onClick={() => setSelectedTechnique('all')} />
                </span>
              )}
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F0F7F4] text-[#164335] border border-[#D4AF37]/30 rounded-full text-xs font-medium font-royal-body">
                  Query: "{searchQuery}"
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-700" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#164335] hover:underline font-bold ml-1 font-royal-title"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-[#D4AF37]/40 space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-[#F0F7F4] rounded-full flex items-center justify-center mx-auto text-[#164335] border border-[#D4AF37]/30">
                <Search className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="font-royal-heading text-xl font-bold text-[#0B241C]">No matching creations found</h3>
              <p className="text-sm font-royal-body text-stone-600 max-w-md mx-auto">
                We couldn't find any designs matching your specific combination of filters. Try clearing some filters or searching for something else.
              </p>
              <button
                onClick={resetFilters}
                className="btn-royal-emerald text-xs rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 flex items-end sm:items-center justify-center animate-fade-in lg:hidden">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 border-[#D4AF37] max-h-[85vh] overflow-y-auto p-6 space-y-6 text-[#0F172A]">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <h3 className="font-royal-heading text-lg font-bold text-[#0B241C]">👑 Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-stone-400 hover:text-[#0B241C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs text-[#0B241C]"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Collection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">Collection</label>
              <select
                value={selectedCollection}
                onChange={e => setSelectedCollection(e.target.value)}
                className="w-full p-3 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs text-[#0B241C]"
              >
                <option value="all">All Collections</option>
                {COLLECTIONS.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Fabric */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#164335] mb-2 font-royal-title">Fabric</label>
              <select
                value={selectedFabric}
                onChange={e => setSelectedFabric(e.target.value)}
                className="w-full p-3 bg-white border-2 border-[#D4AF37]/35 rounded-xl text-xs text-[#0B241C]"
              >
                <option value="all">All Fabrics</option>
                {fabrics.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#D4AF37]/30">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-[#11352A] rounded-xl text-xs font-bold text-[#11352A] uppercase font-royal-title"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 btn-royal-emerald text-xs font-bold uppercase rounded-xl"
              >
                Show {filteredProducts.length} Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
