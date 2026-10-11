import React from 'react';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface CategoryPageProps {
  categoryId: string;
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onNavigate }) => {
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const categoryProducts = PRODUCTS.filter(p => p.category === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-royal-body">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-royal-body">
        <button onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#9B332C] hover:underline font-royal-title font-bold">Atelier</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#9B332C] hover:underline font-royal-title font-bold">Catalog</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-[#241A16] font-bold font-royal-title">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#241A16] via-[#2F211C] to-[#241A16] text-[#FAF5EE] min-h-[260px] flex items-center p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/40">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241A16] via-[#241A16]/85 to-transparent" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-bold uppercase tracking-wider font-royal-title shadow-sm">
            <span>🪷 Jaipur Hand Block Line</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC]">
            {category.name}
          </h1>
          <p className="text-stone-300 font-royal-body text-base md:text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25">
          <span className="text-xs text-stone-600 font-medium font-royal-body">
            Showing <strong className="text-[#241A16] font-bold">{categoryProducts.length}</strong> handcrafted designs in this line
          </span>
          <button
            onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pill-btn-outline text-xs bg-[#FAF5EE] border border-[#D4AF37]/40"
          >
            View All Categories →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {categoryProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
