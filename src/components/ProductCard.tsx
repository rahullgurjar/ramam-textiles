import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Layers, 
  Check, 
  FileText,
  Lock,
  ArrowUpRight
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToInquiry, openQuickQuote, formatPrice, isB2BPriceUnlocked } = useApp();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Natural');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToInquiry({
      product,
      selectedColor,
      selectedSize,
      quantity: product.moq
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleCardClick = () => {
    onNavigate(`/product/${product.slug}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      onMouseEnter={() => import('../pages/ProductDetailPage')}
      className="group bg-[#FAF5EE] rounded-3xl border-2 border-[#D4AF37]/50 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 flex flex-col justify-between cursor-pointer relative hover:-translate-y-1.5 hover:border-[#9B332C] jharokha-arch-card"
    >
      {/* Image Gallery Container with Arch Contour */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0E6D8]"
        onMouseEnter={() => {
          if (product.images.length > 1 && currentImgIndex !== 1) setCurrentImgIndex(1);
        }}
        onMouseLeave={() => {
          if (product.images.length > 1 && currentImgIndex !== 0) setCurrentImgIndex(0);
        }}
      >
        <picture className="w-full h-full block">
          <source 
            srcSet={resolveWebpImage(product.images[currentImgIndex] || product.images[0])} 
            type="image/webp" 
          />
          <img 
            src={resolveProductImage(product.images[currentImgIndex] || product.images[0])} 
            alt={product.name}
            width="600"
            height="800"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (!target.dataset.fallbackTried) {
                target.dataset.fallbackTried = 'true';
                target.src = resolveProductImage('/products/duffle-kantha-patchwork.jpg');
              }
            }}
          />
        </picture>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.category === 'bags' ? (
            <span className="px-3 py-1 bg-[#1E295B] text-[#BFDBFE] text-[10px] font-bold tracking-wider uppercase rounded-full border border-[#60A5FA] shadow-md font-royal-title">
              MOQ {product.moq} Pcs • Indigo &amp; Kantha
            </span>
          ) : product.category === 'women' ? (
            <span className="px-3 py-1 bg-[#831843] text-[#FBCFE8] text-[10px] font-bold tracking-wider uppercase rounded-full border border-[#F472B6] shadow-md font-royal-title">
              MOQ {product.moq} Pcs • Rani Pink
            </span>
          ) : (
            <span className="px-3 py-1 bg-[#064E3B] text-[#A7F3D0] text-[10px] font-bold tracking-wider uppercase rounded-full border border-[#34D399] shadow-md font-royal-title">
              MOQ {product.moq} Pcs • Artisan Craft
            </span>
          )}

          {product.isFeatured && (
            <span className="px-2.5 py-0.5 bg-[#B81D5B] text-white text-[9.5px] font-extrabold tracking-wider uppercase rounded-full shadow-md font-royal-title border border-[#F472B6]/40">
              Jaipur Signature
            </span>
          )}
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickQuote(product);
            }}
            className="flex-1 py-2.5 px-3 bg-[#B81D5B] hover:bg-[#981247] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 border border-[#B81D5B] shadow-xl transition-all font-royal-title"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>Instant Quote</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#FAF5EE] font-royal-body">
        <div>
          <div className="flex items-center justify-between text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-1.5 font-royal-title">
            <span className="flex items-center gap-1 text-[#BE185D]">
              <span className={`w-2 h-2 rounded-full ${
                product.category === 'bags' ? 'bg-[#2563EB]' : product.category === 'women' ? 'bg-[#EC4899]' : 'bg-[#059669]'
              }`}></span>
              <span>{product.collection}</span>
            </span>
            <span className="text-stone-400 font-mono">SKU: {product.sku}</span>
          </div>

          <h3 className="font-royal-heading text-sm sm:text-base font-bold text-[#1A1817] group-hover:text-[#9B332C] transition-colors line-clamp-2 leading-snug mb-1.5">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 mb-3 leading-relaxed font-royal-body">
            {product.description}
          </p>

          <div className="text-[11px] text-[#241A16] bg-[#FAF0EB] border border-[#EACAC0] p-2 rounded-xl mb-3 flex items-center gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5 text-[#9B332C] shrink-0" />
            <span className="line-clamp-1">{product.fabric}</span>
          </div>
        </div>

        {/* Pricing / Wholesale CTA Block */}
        <div className="pt-2.5 border-t border-[#D4AF37]/30 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              {isB2BPriceUnlocked ? (
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#BE185D] uppercase tracking-wider font-semibold font-royal-title">Wholesale Tier 1</span>
                  <span className="text-sm font-extrabold text-[#1E295B] font-royal-heading">
                    {formatPrice(product.wholesaleTiers[0]?.pricePerUnitInr)} / unit
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-[#7E2822] font-bold font-royal-title">
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  <span>Wholesale Rate On Request</span>
                </div>
              )}
            </div>

            <span className="text-[11px] text-stone-500 font-medium">
              Lead: {product.wholesaleTiers[0]?.leadTimeWeeks || '2-3 wks'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm font-royal-title ${
                isAdded 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-[#B81D5B] hover:bg-[#981247] text-white hover:opacity-95 border border-[#B81D5B] hover:shadow-md'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added {product.moq} Pcs</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-white" />
                  <span>Add to RFQ</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="p-2 border border-[#B81D5B]/35 rounded-xl hover:bg-[#FDF2F8] hover:border-[#B81D5B] text-[#B81D5B] transition-colors"
              title="View full technical specs"
            >
              <ArrowUpRight className="w-4 h-4 text-[#B81D5B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
