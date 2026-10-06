import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Truck, Sparkles, Heart, 
  Share2, Layers, HelpCircle, Package, Award, Scissors,
  Plus, Minus, Info, ChevronRight, FileText, Download, Mail, Star,
  ZoomIn, MessageCircle, Ruler, Maximize2, X
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
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Original Artisanal');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(product.moq || 25);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'wholesale' | 'custom'>('details');

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const retailPrice = product.indicativeRetailInr || 2499;
  const baseWholesalePrice = product.wholesaleTiers[0]?.pricePerUnitInr || Math.round(retailPrice * 0.55);

  // Dynamic Volume Discount Calculation
  const calculateTierPrice = (qty: number) => {
    if (qty >= 500) return Math.round(baseWholesalePrice * 0.75); // 25% off tier
    if (qty >= 200) return Math.round(baseWholesalePrice * 0.85); // 15% off tier
    if (qty >= 100) return Math.round(baseWholesalePrice * 0.92); // 8% off tier
    return baseWholesalePrice;
  };

  const currentUnitPrice = calculateTierPrice(quantity);
  const totalEstimatedCost = currentUnitPrice * quantity;

  const handleAddToBasket = () => {
    addToInquiry({
      product,
      selectedColor,
      selectedSize,
      quantity,
    });
    showToast(`Added ${quantity} pcs of ${product.name} to RFQ basket`, 'success');
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

  const whatsappMessage = encodeURIComponent(
    `Hello Ramam Textiles Jaipur, I am interested in wholesale order for:\n\n• Product: ${product.name}\n• SKU: ${product.sku}\n• Colorway: ${selectedColor}\n• Size: ${selectedSize}\n• Quantity: ${quantity} Pcs\n\nPlease share official FOB quotation & estimated dispatch timeline.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-royal-body pb-24 lg:pb-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 tracking-wider">
        <button 
          onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-[#C8376B] hover:underline transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button 
          onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-[#C8376B] hover:underline transition-colors"
        >
          Jaipur Atelier
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button 
          onClick={() => { onNavigate(`/category/${product.category}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-[#C8376B] hover:underline capitalize transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-[#1F1612] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Image Gallery with Lightbox Zoom */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            onClick={() => setIsZoomOpen(true)}
            className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-50 shadow-xl border border-stone-200 group cursor-zoom-in"
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />

            {/* Zoom Icon Hint */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setIsZoomOpen(true); }}
                className="p-3 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#1F1612] shadow-lg border border-stone-200 transition-all hover:scale-105"
                title="Click to Zoom Fabric"
              >
                <Maximize2 className="w-4 h-4 text-[#1F1612]" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleShare(); }}
                className="p-3 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#1F1612] shadow-lg border border-stone-200 transition-all hover:scale-105"
                title="Share Creation"
              >
                <Share2 className="w-4 h-4 text-[#1F1612]" />
              </button>
            </div>

            {/* Top Badges */}
            <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
              {product.isBestseller && (
                <span className="bg-[#1F1612] text-[#FAF3DC] text-[10px] font-royal-title uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg border border-[#D4AF37]/50 flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-[#E5A93C] fill-[#E5A93C]" />
                  <span>Bestseller</span>
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-[#C8376B] text-white text-[10px] font-royal-title font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Jaipur Signature</span>
                </span>
              )}
            </div>

            {/* Bottom SKU and Provenance Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1F1612]/95 backdrop-blur-md text-[#FAF3DC] p-3.5 rounded-2xl flex items-center justify-between text-xs border border-[#D4AF37]/40 shadow-xl">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[#E5A93C] font-royal-title">SKU:</span>
                <span className="font-semibold text-white">{product.sku}</span>
              </div>
              <div className="text-[11px] text-stone-300">
                Crafted in <strong className="text-[#E5A93C]">Jaipur Workshop Guilds</strong>
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
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-[#C8376B] ring-2 ring-[#C8376B]/30 shadow-md scale-105' 
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Physical Spec & Dimension Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-center">
              <span className="text-[10px] font-royal-title uppercase tracking-wider text-stone-500 block">Structure</span>
              <span className="text-xs font-bold text-[#1F1612] mt-0.5 block">Double Cotton Padding</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-center">
              <span className="text-[10px] font-royal-title uppercase tracking-wider text-stone-500 block">Zippers</span>
              <span className="text-xs font-bold text-[#1F1612] mt-0.5 block">Heavy-Duty YKK Brass</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-center">
              <span className="text-[10px] font-royal-title uppercase tracking-wider text-stone-500 block">Handles</span>
              <span className="text-xs font-bold text-[#1F1612] mt-0.5 block">Reinforced Candy Stripe</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-center">
              <span className="text-[10px] font-royal-title uppercase tracking-wider text-stone-500 block">Dyes</span>
              <span className="text-xs font-bold text-[#1F1612] mt-0.5 block">Azo-Free &amp; Colorfast</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Actions, B2B Volume Pricing & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-[11px] font-royal-title uppercase tracking-widest font-bold mb-2">
              <span>🪷 {product.collection}</span>
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1612] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-stone-600 mt-1.5 flex items-center gap-2">
              <span className="text-[#C8376B]">✦</span>
              Technique: <span className="text-[#1F1612] font-semibold">{product.printTechnique}</span>
            </p>
          </div>

          {/* Interactive Volume Pricing Tier Card */}
          <div className="p-5 bg-[#FAF7F2] rounded-[28px] border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-stone-500 font-royal-title uppercase tracking-wider block font-bold">Indicative Retail Benchmark</span>
                <span className="text-xl sm:text-2xl font-playfair font-bold text-stone-400 line-through">
                  {formatPrice(retailPrice)}
                </span>
                <span className="text-xs text-stone-500 ml-1">/ unit</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#C8376B] font-royal-title font-bold uppercase tracking-wider block">
                  Current Tier Rate ({quantity} Pcs)
                </span>
                <span className="text-2xl sm:text-3xl font-playfair font-bold text-[#C8376B]">
                  {formatPrice(currentUnitPrice)}
                </span>
                <span className="text-xs text-stone-600 ml-1 font-medium">/ piece</span>
              </div>
            </div>

            {/* Interactive Quantity Slider */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="flex justify-between text-xs font-royal-title font-bold text-[#1F1612]">
                <span>Select Order Volume</span>
                <span className="text-[#C8376B]">{quantity} Units (Est: {formatPrice(totalEstimatedCost)})</span>
              </div>
              <input
                type="range"
                min={product.moq}
                max={500}
                step={5}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#C8376B]"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>MOQ {product.moq} pcs</span>
                <span>100 pcs (8% Off)</span>
                <span>200 pcs (15% Off)</span>
                <span>500+ pcs (25% Off)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-[#1F1612]">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                Direct Jaipur FOB Factory Rate
              </span>
              <span className="text-stone-600 font-medium">Lead Time: {product.leadTime || '12-18 Days'}</span>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-royal-title uppercase tracking-wider text-[#1F1612] font-bold mb-2">
                Colorway / Block Palette: <span className="text-[#C8376B] font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`pill-nav-btn text-xs ${
                      selectedColor === col
                        ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                        : ''
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#1F1612] font-bold">
                  Size / Dimensions
                </label>
                <span className="text-[11px] text-stone-500 italic">Custom Dimensions for OEM Available</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`pill-nav-btn text-xs ${
                      selectedSize === sz
                        ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                        : ''
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToBasket}
              className="pill-btn-rose w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-full shadow-xl"
            >
              <Package className="w-4 h-4" />
              <span>Add {quantity} Pcs to Wholesale RFQ Basket</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/911412890000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn-dark py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2 bg-[#1F1612]"
              >
                <span className="text-emerald-400">💬</span>
                <span>WhatsApp Inquiry</span>
              </a>

              <button
                onClick={() => openQuickQuote(product)}
                className="pill-btn-outline py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#C8376B]" />
                <span>Request Custom Tech Pack</span>
              </button>
            </div>
          </div>

          {/* Buyer Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% Quality Inspected</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C8376B] flex-shrink-0" />
              <span>Worldwide Air/Sea Freight</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
              <span>Pure Cotton &amp; Azo-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#1F1612] flex-shrink-0" />
              <span>Direct Jaipur Factory Pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Detailed Technical Specifications & Wholesale Tiers */}
      <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-stone-200 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 overflow-x-auto scrollbar-none relative z-10">
          <button
            onClick={() => setActiveTab('details')}
            className={`pill-nav-btn ${
              activeTab === 'details'
                ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                : ''
            }`}
          >
            Craft Story &amp; Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pill-nav-btn ${
              activeTab === 'specs'
                ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                : ''
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`pill-nav-btn ${
              activeTab === 'wholesale'
                ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                : ''
            }`}
          >
            Wholesale Price Tiers &amp; MOQ
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pill-nav-btn ${
              activeTab === 'custom'
                ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                : ''
            }`}
          >
            Custom Branding &amp; Care
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6 relative z-10">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-4xl text-[#1F1612] leading-relaxed text-sm">
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1F1612]">
                The Artisan Heritage of {product.name}
              </h3>
              <p className="text-base text-stone-600">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-stone-200 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#C8376B] text-xs uppercase tracking-wider mb-1.5">Authentic Jaipur Handcraft</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Hand-stamped in Rajasthan using hand-carved Sheesham wood blocks. Subtle variations in shade or alignment are the authentic hallmarks of artisan heritage craftsmanship.
                  </p>
                </div>
                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-stone-200 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#C8376B] text-xs uppercase tracking-wider mb-1.5">Pre-Washed &amp; Colorfast</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Each fabric batch undergoes traditional river and steam washing to lock in natural mineral dyes and prevent post-purchase shrinkage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
                  <span className="text-stone-500 font-medium font-royal-title uppercase">SKU Reference:</span>
                  <span className="font-mono font-bold text-[#1F1612]">{product.sku}</span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
                  <span className="text-stone-500 font-medium font-royal-title uppercase">Base Fabric:</span>
                  <span className="font-bold text-[#1F1612]">{product.fabric}</span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
                  <span className="text-stone-500 font-medium font-royal-title uppercase">Printing Technique:</span>
                  <span className="font-bold text-[#1F1612]">{product.printTechnique}</span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
                  <span className="text-stone-500 font-medium font-royal-title uppercase">Craft Origin:</span>
                  <span className="font-bold text-[#1F1612]">Jaipur, Rajasthan (India)</span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
                  <span className="text-stone-500 font-medium font-royal-title uppercase">Dye Formulation:</span>
                  <span className="font-bold text-[#1F1612]">Azo-Free / Natural Fermented Indigo</span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
                  <span className="text-stone-500 font-medium font-royal-title uppercase">Export Carton Specs:</span>
                  <span className="font-bold text-[#1F1612]">50 units/carton (Double Wall Corrugated)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="max-w-4xl space-y-4">
              <h3 className="font-playfair text-lg font-bold text-[#1F1612]">
                Tiered Wholesale FOB Pricing Matrix (Jaipur Port / Airport)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-md">
                <table className="w-full text-left text-xs bg-white">
                  <thead className="bg-[#1F1612] text-[#FAF3DC] font-royal-title uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Order Quantity</th>
                      <th className="p-3.5">Discount Tier</th>
                      <th className="p-3.5">Estimated Price / Piece</th>
                      <th className="p-3.5">Production Lead Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-[#1F1612]">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold">Sample (1 - 10 pcs)</td>
                      <td className="p-3.5">Sample Rate</td>
                      <td className="p-3.5 font-bold">{formatPrice(retailPrice)}</td>
                      <td className="p-3.5">3 - 5 Days</td>
                    </tr>
                    <tr className="bg-[#FDF0F3]/60 hover:bg-[#FDF0F3]">
                      <td className="p-3.5 font-semibold">Tier 1 ({product.moq} - 99 pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">Standard Wholesale</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(baseWholesalePrice)}</td>
                      <td className="p-3.5">12 - 15 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold">Tier 2 (100 - 199 pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">8% Volume Discount</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(Math.round(baseWholesalePrice * 0.92))}</td>
                      <td className="p-3.5">15 - 18 Days</td>
                    </tr>
                    <tr className="bg-[#FDF0F3]/60 hover:bg-[#FDF0F3]">
                      <td className="p-3.5 font-semibold">Tier 3 (200 - 499 pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">15% Volume Discount</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(Math.round(baseWholesalePrice * 0.85))}</td>
                      <td className="p-3.5">20 - 25 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold">Tier 4 (500+ pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">25% Enterprise Contract Rate</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(Math.round(baseWholesalePrice * 0.75))}</td>
                      <td className="p-3.5">25 - 30 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="max-w-4xl space-y-4 text-xs text-stone-700">
              <h3 className="font-playfair text-lg font-bold text-[#1F1612]">
                Custom Production &amp; Care Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#C8376B] uppercase tracking-wider">Custom OEM Atelier Services:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>Custom Wooden Printing Block Carvings with bespoke motifs</li>
                    <li>Custom Colorway Strike-offs &amp; Lab Dips</li>
                    <li>Bespoke Product Dimensions &amp; Quilted Pattern Stitching</li>
                    <li>Sealed export polybag packaging with barcode tags</li>
                  </ul>
                </div>
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-2 shadow-sm">
                  <h4 className="font-royal-title font-bold text-[#C8376B] uppercase tracking-wider">Fabric Care Instructions:</h4>
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
              <span className="text-xs font-royal-title text-[#C8376B] font-bold uppercase tracking-widest">Atelier Suggestions</span>
              <h2 className="font-playfair text-2xl font-bold text-[#1F1612]">
                Complementary Creations in this Line
              </h2>
            </div>
            <button
              onClick={() => { onNavigate(`/category/${product.category}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-royal-title font-bold text-[#C8376B] uppercase tracking-widest hover:underline"
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

      {/* Lightbox Image Zoom Modal */}
      {isZoomOpen && (
        <div 
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-8 flex items-center justify-center animate-fade-in cursor-zoom-out"
        >
          <button 
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={product.images[activeImageIndex] || product.images[0]} 
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 z-40 shadow-2xl flex items-center gap-2">
        <a
          href={`https://wa.me/911412890000?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1F1612] text-emerald-400 shrink-0 shadow"
          title="WhatsApp Quote"
        >
          <span className="text-base">💬</span>
        </a>
        <button
          onClick={handleAddToBasket}
          className="flex-1 pill-btn-rose py-3 text-xs font-bold uppercase rounded-full shadow-lg flex items-center justify-center gap-1.5"
        >
          <Package className="w-4 h-4" />
          <span>Add to RFQ ({formatPrice(currentUnitPrice)})</span>
        </button>
      </div>

    </div>
  );
};

export default ProductDetailPage;
