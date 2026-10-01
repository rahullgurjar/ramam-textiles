import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Truck, Sparkles, Heart, 
  Share2, Layers, HelpCircle, Package, Award, Scissors,
  Plus, Minus, Info, ChevronRight, FileText, Download, Mail, Star
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const { 
    formatPrice, 
    addToInquiry, 
    openQuickQuote, 
    isB2BPriceUnlocked,
    showToast 
  } = useApp();

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Original Artisanal');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(product.moq || 50);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'wholesale' | 'custom'>('details');

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToBasket = () => {
    addToInquiry({
      product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} from Ramam Textiles Jaipur`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const retailPrice = product.indicativeRetailInr || 2499;
  const wholesalePrice = product.wholesaleTiers[0]?.pricePerUnitInr || Math.round(retailPrice * 0.55);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#164335]/75 font-royal-body tracking-wider">
        <button 
          onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-[#0B241C] hover:underline transition-colors"
        >
          Royal Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        <button 
          onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-[#0B241C] hover:underline transition-colors"
        >
          Jaipur Atelier
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        <button 
          onClick={() => { onNavigate(`/category/${product.category}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-[#0B241C] hover:underline capitalize transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="text-[#0B241C] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Main Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAF7EE] shadow-2xl border-2 border-[#D4AF37]/35 group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Jharokha Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
              {product.isBestseller && (
                <span className="bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] text-[10px] font-royal-title uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg border border-[#D4AF37]/50 flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>Royal Bestseller</span>
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#B89426] text-[#0B241C] text-[10px] font-royal-title font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg border border-[#FAF7EE]/50 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Heritage Masterpiece</span>
                </span>
              )}
            </div>

            {/* Share Floating Badge */}
            <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-[#FAF7EE]/90 hover:bg-[#FAF7EE] text-[#0B241C] shadow-lg border border-[#D4AF37]/40 backdrop-blur-md transition-all hover:scale-105"
                title="Share Creation"
              >
                <Share2 className="w-4 h-4 text-[#11352A]" />
              </button>
            </div>

            {/* Bottom SKU and Provenance Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-[#0B241C]/95 via-[#11352A]/90 to-[#0B241C]/95 backdrop-blur-md text-[#F5E6B5] p-3.5 rounded-2xl flex items-center justify-between text-xs border border-[#D4AF37]/40 shadow-xl">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[#D4AF37] font-royal-title">SKU:</span>
                <span className="font-semibold">{product.sku}</span>
              </div>
              <div className="text-[11px] text-[#FAF7EE]/90 font-royal-body">
                Crafted in <strong className="text-[#F5E6B5]">Bagru & Sanganer Guilds</strong>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-[#D4AF37] ring-2 ring-[#11352A] shadow-lg scale-105' 
                      : 'border-stone-300/80 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Actions & B2B Purchase Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#11352A]/10 border border-[#11352A]/25 text-[#11352A] text-[11px] font-royal-title uppercase tracking-widest font-bold mb-2">
              <span>{product.collection}</span>
            </div>
            <h1 className="font-royal-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B241C] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-[#164335]/80 font-royal-body mt-1.5 flex items-center gap-2">
              <span className="text-[#D4AF37]">✦</span>
              Technique: <span className="text-[#0B241C] font-semibold">{product.printTechnique}</span>
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-5 bg-gradient-to-br from-[#FAF7EE] to-[#F3EEDB] rounded-2xl border-2 border-[#D4AF37]/35 shadow-md space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-jaipur-jaali opacity-10 pointer-events-none" />
            
            <div className="flex items-baseline justify-between relative z-10">
              <div>
                <span className="text-[10px] text-[#164335] font-royal-title uppercase tracking-wider block font-bold">Indicative Retail Benchmark</span>
                <span className="text-2xl sm:text-3xl font-royal-heading font-bold text-[#0B241C]">
                  {formatPrice(retailPrice)}
                </span>
                <span className="text-xs text-stone-500 font-royal-body ml-1">/ piece</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#164335] font-royal-title font-bold uppercase tracking-wider block">
                  B2B Wholesale FOB Rate
                </span>
                <span className="text-xl sm:text-2xl font-royal-heading font-bold text-[#11352A]">
                  {formatPrice(wholesalePrice)}
                </span>
                <span className="text-[11px] text-stone-600 ml-1 font-medium font-royal-body">({product.moq}+ MOQ)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs text-[#0B241C] font-royal-body">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#164335]" />
                Atelier MOQ: {product.moq} pcs
              </span>
              <span className="text-[#164335] font-medium">Production Lead Time: {product.leadTime || '12-18 Days'}</span>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-2">
                Jaipur Colorway / Block Palette: <span className="text-[#164335] font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-royal-body transition-all ${
                      selectedColor === col
                        ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-md font-semibold'
                        : 'border border-[#D4AF37]/30 bg-[#FAF7EE] text-[#0B241C] hover:border-[#11352A]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Sizing Breakdown */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold">
                  Size / Dimensions
                </label>
                <span className="text-[11px] text-[#164335] font-royal-body italic">Custom Sizing for Bulk Orders Available</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-royal-body transition-all ${
                      selectedSize === sz
                        ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-md font-semibold'
                        : 'border border-[#D4AF37]/30 bg-[#FAF7EE] text-[#0B241C] hover:border-[#11352A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-2">
              Target Order Quantity (MOQ: {product.moq} pcs)
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-[#D4AF37]/40 rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 10))}
                  className="p-2.5 text-[#0B241C] hover:bg-[#FAF7EE] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-sm font-bold text-[#0B241C] focus:outline-none border-x border-[#D4AF37]/30 py-2 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 10)}
                  className="p-2.5 text-[#0B241C] hover:bg-[#FAF7EE] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs font-royal-body text-[#164335]">
                {quantity < product.moq ? (
                  <span className="text-amber-800 font-semibold">Sample order tier</span>
                ) : (
                  <span className="text-[#11352A] font-semibold">Wholesale production rate tier</span>
                )}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToBasket}
              className="btn-royal-gold w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl shadow-xl"
            >
              <Package className="w-4 h-4" />
              <span>Add to Wholesale Inquiry Basket</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openQuickQuote(product)}
                className="btn-royal-outline py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#11352A]" />
                <span>Request Custom Quote</span>
              </button>

              <button
                onClick={() => { onNavigate('/custom-manufacturing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-royal-emerald py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              >
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom OEM Brief</span>
              </button>
            </div>
          </div>

          {/* Buyer Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#D4AF37]/25 text-xs text-[#0B241C] font-royal-body">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#164335] flex-shrink-0" />
              <span>100% Quality Inspected</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#11352A] flex-shrink-0" />
              <span>Worldwide Air/Sea Freight</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Pure Cotton & Azo-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#11352A] flex-shrink-0" />
              <span>Direct Jaipur Atelier Pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Detailed Technical Specifications & Wholesale Tiers */}
      <div className="bg-gradient-to-br from-[#FAF7EE] to-[#F3EEDB] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/35 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali opacity-5 pointer-events-none" />
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-4 overflow-x-auto scrollbar-none relative z-10">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-5 py-2.5 rounded-full text-xs font-royal-title uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
              activeTab === 'details'
                ? 'bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-lg border border-[#D4AF37]'
                : 'text-[#164335] hover:text-[#0B241C] hover:bg-[#FAF7EE]'
            }`}
          >
            Craft Story & Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-2.5 rounded-full text-xs font-royal-title uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-lg border border-[#D4AF37]'
                : 'text-[#164335] hover:text-[#0B241C] hover:bg-[#FAF7EE]'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`px-5 py-2.5 rounded-full text-xs font-royal-title uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
              activeTab === 'wholesale'
                ? 'bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-lg border border-[#D4AF37]'
                : 'text-[#164335] hover:text-[#0B241C] hover:bg-[#FAF7EE]'
            }`}
          >
            Wholesale Price Tiers & MOQ
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-5 py-2.5 rounded-full text-xs font-royal-title uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
              activeTab === 'custom'
                ? 'bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-lg border border-[#D4AF37]'
                : 'text-[#164335] hover:text-[#0B241C] hover:bg-[#FAF7EE]'
            }`}
          >
            Custom Branding & Care
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6 relative z-10">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-4xl text-[#0B241C] font-royal-body leading-relaxed text-sm">
              <h3 className="font-royal-heading text-xl sm:text-2xl font-bold text-[#0B241C]">
                The Royal Heritage of {product.name}
              </h3>
              <p className="text-base text-stone-700">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-white/85 rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#11352A] text-xs uppercase tracking-wider mb-1.5">Authentic Jaipur Handcraft</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Hand-stamped in Rajasthan using hand-carved Sheesham wood blocks. Subtle variations in shade or alignment are the authentic hallmarks of royal heritage craftsmanship.
                  </p>
                </div>
                <div className="p-5 bg-white/85 rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#11352A] text-xs uppercase tracking-wider mb-1.5">Pre-Washed & Colorfast</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Each fabric batch undergoes traditional river and steam washing to lock in natural mineral dyes and prevent post-purchase shrinkage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-royal-body">
                <div className="bg-white/85 p-4 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center shadow-sm">
                  <span className="text-[#164335] font-medium font-royal-title uppercase">SKU Reference:</span>
                  <span className="font-mono font-bold text-[#0B241C]">{product.sku}</span>
                </div>
                <div className="bg-white/85 p-4 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center shadow-sm">
                  <span className="text-[#164335] font-medium font-royal-title uppercase">Base Fabric:</span>
                  <span className="font-bold text-[#0B241C]">{product.fabric}</span>
                </div>
                <div className="bg-white/85 p-4 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center shadow-sm">
                  <span className="text-[#164335] font-medium font-royal-title uppercase">Printing Technique:</span>
                  <span className="font-bold text-[#0B241C]">{product.printTechnique}</span>
                </div>
                <div className="bg-white/85 p-4 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center shadow-sm">
                  <span className="text-[#164335] font-medium font-royal-title uppercase">Craft Origin:</span>
                  <span className="font-bold text-[#0B241C]">Jaipur, Rajasthan (India)</span>
                </div>
                <div className="bg-white/85 p-4 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center shadow-sm">
                  <span className="text-[#164335] font-medium font-royal-title uppercase">Dye Formulation:</span>
                  <span className="font-bold text-[#0B241C]">Azo-Free / Natural Fermented Indigo</span>
                </div>
                <div className="bg-white/85 p-4 rounded-xl border border-[#D4AF37]/30 flex justify-between items-center shadow-sm">
                  <span className="text-[#164335] font-medium font-royal-title uppercase">Export Carton Specs:</span>
                  <span className="font-bold text-[#0B241C]">50 units/carton (Double Wall Corrugated)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="max-w-4xl space-y-4">
              <h3 className="font-royal-heading text-lg font-bold text-[#0B241C]">
                Tiered Wholesale FOB Pricing Matrix (Jaipur Port / Airport)
              </h3>
              <div className="overflow-x-auto rounded-2xl border-2 border-[#D4AF37]/30 shadow-md">
                <table className="w-full text-left text-xs font-royal-body bg-white">
                  <thead className="bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] font-royal-title uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Order Quantity</th>
                      <th className="p-3.5">Discount Tier</th>
                      <th className="p-3.5">Estimated Price / Piece</th>
                      <th className="p-3.5">Production Lead Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4AF37]/20 text-[#0B241C]">
                    <tr className="hover:bg-[#FAF7EE]/60">
                      <td className="p-3.5 font-semibold">Sample (1 - 10 pcs)</td>
                      <td className="p-3.5">Sample Rate</td>
                      <td className="p-3.5 font-bold">{formatPrice(retailPrice)}</td>
                      <td className="p-3.5">3 - 5 Days</td>
                    </tr>
                    <tr className="bg-[#FAF7EE] hover:bg-[#F3EEDB]">
                      <td className="p-3.5 font-semibold">Tier 1 ({product.moq} - 199 pcs)</td>
                      <td className="p-3.5 text-[#11352A] font-bold">Standard Wholesale</td>
                      <td className="p-3.5 font-bold text-[#11352A]">{formatPrice(wholesalePrice)}</td>
                      <td className="p-3.5">12 - 15 Days</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7EE]/60">
                      <td className="p-3.5 font-semibold">Tier 2 (200 - 499 pcs)</td>
                      <td className="p-3.5 text-[#11352A] font-bold">10% Volume Discount</td>
                      <td className="p-3.5 font-bold text-[#11352A]">{formatPrice(Math.round(wholesalePrice * 0.90))}</td>
                      <td className="p-3.5">18 - 22 Days</td>
                    </tr>
                    <tr className="bg-[#FAF7EE] hover:bg-[#F3EEDB]">
                      <td className="p-3.5 font-semibold">Tier 3 (500+ pcs)</td>
                      <td className="p-3.5 text-[#11352A] font-bold">Custom OEM Contract Rate</td>
                      <td className="p-3.5 font-bold text-[#11352A]">{formatPrice(Math.round(wholesalePrice * 0.80))}</td>
                      <td className="p-3.5">25 - 30 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="max-w-4xl space-y-4 text-xs font-royal-body text-stone-700">
              <h3 className="font-royal-heading text-lg font-bold text-[#0B241C]">
                Custom Production & Royal Care Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/85 p-5 rounded-2xl border border-[#D4AF37]/30 space-y-2 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#11352A] uppercase tracking-wider">Custom OEM Atelier Services:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>Custom Wooden Printing Block Carvings with bespoke motifs</li>
                    <li>Custom Colorway Strike-offs & Lab Dips</li>
                    <li>Bespoke Product Dimensions & Quilted Pattern Stitching</li>
                    <li>Sealed export polybag packaging with barcode tags</li>
                  </ul>
                </div>
                <div className="bg-white/85 p-5 rounded-2xl border border-[#D4AF37]/30 space-y-2 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#11352A] uppercase tracking-wider">Fabric Care Instructions:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>Gentle cold hand wash or machine wash on delicate cycle</li>
                    <li>Use mild eco-friendly liquid detergent</li>
                    <li>Do not bleach or dry in harsh direct sunlight</li>
                    <li>Warm iron inside-out to maintain block print luster</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-royal-title text-[#164335] font-bold uppercase tracking-widest">Atelier Suggestions</span>
              <h2 className="font-royal-heading text-2xl font-bold text-[#0B241C]">
                Complementary Creations in this Royal Line
              </h2>
            </div>
            <button
              onClick={() => { onNavigate(`/category/${product.category}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-royal-title font-bold text-[#164335] uppercase tracking-widest hover:underline hover:text-[#0B241C]"
            >
              View Full Category →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
