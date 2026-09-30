import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded border border-[#121815]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Image Gallery Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2ECE0]"
        onMouseEnter={() => {
          if (product.images.length > 1) setCurrentImgIndex(1);
        }}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        <img 
          src={product.images[currentImgIndex] || product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span className="px-2 py-0.5 bg-[#0C1813]/90 text-[#DFCA9F] text-[10px] font-bold tracking-wider uppercase rounded-sm backdrop-blur-sm border border-[#C4A674]/30">
            MOQ {product.moq} Pcs
          </span>
          {product.isFeatured && (
            <span className="px-2 py-0.5 bg-[#8A4A3B] text-white text-[9px] font-bold tracking-wider uppercase rounded-sm">
              Featured Line
            </span>
          )}
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute bottom-2.5 inset-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickQuote(product);
            }}
            className="flex-1 py-2 px-3 bg-[#0C1813]/90 text-[#DFCA9F] hover:bg-[#0C1813] text-xs font-semibold uppercase tracking-wider rounded backdrop-blur-sm flex items-center justify-center gap-1.5 border border-[#C4A674]/40 shadow-md transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#C4A674]" />
            <span>Instant Quote</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#7E8A83] font-semibold uppercase tracking-wider mb-1">
            <span>{product.collection}</span>
            <span className="text-[#8A4A3B]">SKU: {product.sku}</span>
          </div>

          <h3 className="font-heading text-sm sm:text-base font-semibold text-[#121815] group-hover:text-[#8A4A3B] transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-[#4F5A54] line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          <div className="text-[11px] text-[#254234] bg-[#F2ECE0]/60 p-2 rounded mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#8A4A3B] shrink-0" />
            <span className="line-clamp-1 font-medium">{product.fabric}</span>
          </div>
        </div>

        {/* Pricing / Wholesale CTA Block */}
        <div className="pt-2 border-t border-[#121815]/10 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              {isB2BPriceUnlocked ? (
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#7E8A83] uppercase tracking-wider">Wholesale Tier 1</span>
                  <span className="text-sm font-bold text-[#0C1813]">
                    {formatPrice(product.wholesaleTiers[0]?.pricePerUnitInr)} / unit
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[11px] text-[#8A4A3B] font-semibold">
                  <Lock className="w-3 h-3 text-[#C4A674]" />
                  <span>Wholesale Pricing on Request</span>
                </div>
              )}
            </div>

            <span className="text-[11px] text-[#4F5A54] font-medium">
              Lead Time: {product.wholesaleTiers[0]?.leadTimeWeeks || '2-3 wks'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1.5 ${
                isAdded 
                  ? 'bg-[#25D366] text-white' 
                  : 'bg-[#0C1813] text-[#DFCA9F] hover:bg-[#13241C] border border-[#C4A674]/50'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added {product.moq} Pcs</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C4A674]" />
                  <span>Add to Wholesale RFQ</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="p-2 border border-[#121815]/20 rounded hover:bg-[#F2ECE0] text-[#121815] transition-colors"
              title="View full technical specs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
