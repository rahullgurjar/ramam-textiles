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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#7A5450] font-medium font-heading">
        <button onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#4D0E0D]">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        <button onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#4D0E0D]">Catalog</button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="text-[#4D0E0D] font-bold">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#4D0E0D] text-white min-h-[260px] flex items-center p-8 sm:p-12 shadow-2xl border-2 border-[#D4AF37]/50">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#380708] via-[#4D0E0D]/85 to-transparent" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-35 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full text-[#F5E6B5] text-xs font-bold uppercase tracking-wider font-heading shadow-sm">
            <span>👑 Jaipur Manufacturing Division</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FAF3DC]">
            {category.name}
          </h1>
          <p className="text-stone-200 text-sm md:text-base font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25">
          <span className="text-xs text-[#5C4540] font-medium font-heading">
            Showing <strong className="text-[#4D0E0D]">{categoryProducts.length}</strong> designs in this line
          </span>
          <button
            onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-heading font-bold text-[#942220] uppercase tracking-wider hover:underline"
          >
            View All Categories
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
