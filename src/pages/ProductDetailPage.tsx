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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-royal-body">
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
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Main Image */}
          <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-50 shadow-xl border border-stone-200 group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

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

            {/* Share Floating Badge */}
            <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#1F1612] shadow-lg border border-stone-200 transition-all hover:scale-105"
                title="Share Creation"
              >
                <Share2 className="w-4 h-4 text-[#1F1612]" />
              </button>
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
        </div>

        {/* Right Column: Product Actions & B2B Purchase Controls */}
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

          {/* Pricing Block */}
          <div className="p-5 bg-[#FAF7F2] rounded-[24px] border border-stone-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-baseline justify-between relative z-10">
              <div>
                <span className="text-[10px] text-stone-500 font-royal-title uppercase tracking-wider block font-bold">Indicative Retail Benchmark</span>
                <span className="text-2xl sm:text-3xl font-playfair font-bold text-[#1F1612]">
                  {formatPrice(retailPrice)}
                </span>
                <span className="text-xs text-stone-500 ml-1">/ piece</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#C8376B] font-royal-title font-bold uppercase tracking-wider block">
                  B2B Wholesale FOB Rate
                </span>
                <span className="text-xl sm:text-2xl font-playfair font-bold text-[#C8376B]">
                  {formatPrice(wholesalePrice)}
                </span>
                <span className="text-[11px] text-stone-600 ml-1 font-medium">({product.moq}+ MOQ)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-[#1F1612]">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Atelier MOQ: {product.moq} pcs
              </span>
              <span className="text-stone-600 font-medium">Production Lead: {product.leadTime || '12-18 Days'}</span>
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
                <span className="text-[11px] text-stone-500 italic">Custom Sizing Available</span>
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

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-royal-title uppercase tracking-wider text-[#1F1612] font-bold mb-2">
              Target Order Quantity (MOQ: {product.moq} pcs)
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-full bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 10))}
                  className="p-2.5 text-[#1F1612] hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-sm font-bold text-[#1F1612] focus:outline-none border-x border-stone-200 py-2 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 10)}
                  className="p-2.5 text-[#1F1612] hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-stone-600">
                {quantity < product.moq ? (
                  <span className="text-amber-700 font-semibold">Sample order tier</span>
                ) : (
                  <span className="text-[#C8376B] font-semibold">Wholesale volume tier</span>
                )}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToBasket}
              className="pill-btn-rose w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-full shadow-xl"
            >
              <Package className="w-4 h-4" />
              <span>Add to Wholesale Inquiry Basket</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openQuickQuote(product)}
                className="pill-btn-outline py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#C8376B]" />
                <span>Request Custom Quote</span>
              </button>

              <button
                onClick={() => { onNavigate('/custom-manufacturing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="pill-btn-dark py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center justify-center gap-1.5"
              >
                <Scissors className="w-4 h-4 text-[#E5A93C]" />
                <span>Custom OEM Brief</span>
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
        {/* Tab Headers */}
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
                      <td className="p-3.5 font-semibold">Tier 1 ({product.moq} - 199 pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">Standard Wholesale</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(wholesalePrice)}</td>
                      <td className="p-3.5">12 - 15 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold">Tier 2 (200 - 499 pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">10% Volume Discount</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(Math.round(wholesalePrice * 0.90))}</td>
                      <td className="p-3.5">18 - 22 Days</td>
                    </tr>
                    <tr className="bg-[#FDF0F3]/60 hover:bg-[#FDF0F3]">
                      <td className="p-3.5 font-semibold">Tier 3 (500+ pcs)</td>
                      <td className="p-3.5 text-[#C8376B] font-bold">Custom OEM Contract Rate</td>
                      <td className="p-3.5 font-bold text-[#C8376B]">{formatPrice(Math.round(wholesalePrice * 0.80))}</td>
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
    </div>
  );
};

export default ProductDetailPage;
