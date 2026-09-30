import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Truck, Sparkles, Heart, 
  Share2, Layers, HelpCircle, Package, Award, Scissors,
  Plus, Minus, Info, ChevronRight, FileText, Download, Mail
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
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <button 
          onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-stone-900 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-stone-900 transition-colors"
        >
          Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => { onNavigate(`/category/${product.category}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-stone-900 capitalize transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Main Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 shadow-xl border border-stone-200">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isBestseller && (
                <span className="bg-[#942C29] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-md">
                  Best Seller
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-[#D4AF37] text-[#0E1612] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-md">
                  Signature Jaipur Craft
                </span>
              )}
            </div>

            {/* Share & Origin Floating Badges */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md backdrop-blur-sm transition-all"
                title="Share Creation"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-[#0E1612]/85 backdrop-blur-md text-white p-3 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[#D4AF37]">SKU:</span>
                <span>{product.sku}</span>
              </div>
              <div className="text-[11px] text-stone-300">
                Crafted in <strong>Bagru & Sanganer</strong>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-[#0E1612] ring-2 ring-[#D4AF37]' 
                      : 'border-transparent opacity-70 hover:opacity-100'
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
            <span className="text-xs uppercase tracking-widest text-[#942C29] font-bold">
              {product.collection}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mt-1 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-stone-500 font-mono mt-1">
              Technique: <span className="text-stone-800 font-semibold">{product.printTechnique}</span>
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-amber-900/15 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Retail Benchmark Price</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {formatPrice(retailPrice)}
                </span>
                <span className="text-xs text-stone-500 ml-1">/ piece</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#942C29] font-bold uppercase tracking-wider block">
                  B2B Wholesale FOB Rate
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-800">
                  {formatPrice(wholesalePrice)}
                </span>
                <span className="text-[11px] text-stone-500 ml-1 font-medium">({product.moq}+ MOQ)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1.5 font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Production MOQ: {product.moq} pcs
              </span>
              <span className="text-stone-500">Lead Time: {product.leadTime || '12-18 Days'}</span>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Colorway / Block Palette: <span className="text-stone-900 font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-all ${
                      selectedColor === col
                        ? 'border-[#0E1612] bg-[#0E1612] text-white shadow-sm'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
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
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Size / Dimensions
                </label>
                <span className="text-[11px] text-[#942C29] font-medium">Custom Sizing for Bulk Orders Available</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded text-xs font-medium border transition-all ${
                      selectedSize === sz
                        ? 'border-[#0E1612] bg-[#0E1612] text-white shadow-sm'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
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
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Target Order Quantity (MOQ: {product.moq} pcs)
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 10))}
                  className="p-2.5 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-sm font-bold text-stone-900 focus:outline-none border-x border-stone-200 py-2"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 10)}
                  className="p-2.5 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-stone-500">
                {quantity < product.moq ? (
                  <span className="text-amber-700 font-semibold">Sample order tier</span>
                ) : (
                  <span className="text-emerald-700 font-semibold">Wholesale pricing tier</span>
                )}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToBasket}
              className="w-full py-4 bg-[#0E1612] text-amber-100 font-serif font-bold text-xs uppercase tracking-widest rounded shadow-xl hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Add to Wholesale Inquiry Basket</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openQuickQuote(product)}
                className="py-3 bg-white border border-stone-400 text-stone-900 font-serif font-bold text-xs uppercase tracking-wider rounded hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#942C29]" />
                <span>Request Custom Quote</span>
              </button>

              <button
                onClick={() => { onNavigate('/custom-manufacturing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="py-3 bg-[#0E1612] hover:bg-[#1f2e26] text-amber-100 font-serif font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom OEM Brief</span>
              </button>
            </div>
          </div>

          {/* Buyer Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>100% Quality Inspected</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-800 flex-shrink-0" />
              <span>Worldwide Air/Sea Freight</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-stone-700 flex-shrink-0" />
              <span>Pure Cotton & Azo-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-stone-700 flex-shrink-0" />
              <span>Direct Atelier Pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Detailed Technical Specifications & Wholesale Tiers */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-amber-900/15">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-stone-300 pb-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
              activeTab === 'details'
                ? 'bg-[#0E1612] text-amber-100 shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Craft Story & Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-[#0E1612] text-amber-100 shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
              activeTab === 'wholesale'
                ? 'bg-[#0E1612] text-amber-100 shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Wholesale Price Tiers & MOQ
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
              activeTab === 'custom'
                ? 'bg-[#0E1612] text-amber-100 shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Custom Branding & Care
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-4xl text-stone-700 leading-relaxed text-sm">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                The Heritage of {product.name}
              </h3>
              <p>{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-lg border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-xs uppercase mb-1">Authentic Jaipur Craft</h4>
                  <p className="text-xs text-stone-600">
                    Hand-stamped in Rajasthan using hand-carved teak and Sheesham wood blocks. Slight natural irregularities in alignment or shade are the hallmark of authentic heritage craftsmanship.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-xs uppercase mb-1">Pre-Washed & Colorfast</h4>
                  <p className="text-xs text-stone-600">
                    Each fabric batch undergoes traditional river and steam washing to lock in natural mineral dyes and prevent post-purchase shrinkage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-lg border border-stone-200 flex justify-between">
                  <span className="text-stone-500 font-medium">SKU Reference:</span>
                  <span className="font-mono font-bold text-stone-900">{product.sku}</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-200 flex justify-between">
                  <span className="text-stone-500 font-medium">Base Fabric:</span>
                  <span className="font-bold text-stone-900">{product.fabric}</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-200 flex justify-between">
                  <span className="text-stone-500 font-medium">Printing Technique:</span>
                  <span className="font-bold text-stone-900">{product.printTechnique}</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-200 flex justify-between">
                  <span className="text-stone-500 font-medium">Craft Origin:</span>
                  <span className="font-bold text-stone-900">Jaipur, Rajasthan (India)</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-200 flex justify-between">
                  <span className="text-stone-500 font-medium">Dye Formulation:</span>
                  <span className="font-bold text-stone-900">Azo-Free / Natural Fermented Indigo</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-200 flex justify-between">
                  <span className="text-stone-500 font-medium">Export Carton Specs:</span>
                  <span className="font-bold text-stone-900">50 units/carton (Double Wall Corrugated)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="max-w-4xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Tiered Wholesale FOB Pricing Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs bg-white rounded-lg overflow-hidden border border-stone-200">
                  <thead className="bg-[#0E1612] text-amber-100 font-serif uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Order Quantity</th>
                      <th className="p-3">Discount Tier</th>
                      <th className="p-3">Estimated Price / Piece</th>
                      <th className="p-3">Production Lead Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    <tr>
                      <td className="p-3 font-semibold">Sample (1 - 10 pcs)</td>
                      <td className="p-3">Sample Rate</td>
                      <td className="p-3 font-bold">{formatPrice(retailPrice)}</td>
                      <td className="p-3">3 - 5 Days</td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="p-3 font-semibold">Tier 1 ({product.moq} - 199 pcs)</td>
                      <td className="p-3 text-emerald-700 font-bold">Standard Wholesale</td>
                      <td className="p-3 font-bold text-emerald-800">{formatPrice(wholesalePrice)}</td>
                      <td className="p-3">12 - 15 Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Tier 2 (200 - 499 pcs)</td>
                      <td className="p-3 text-emerald-700 font-bold">10% Volume Discount</td>
                      <td className="p-3 font-bold text-emerald-800">{formatPrice(Math.round(wholesalePrice * 0.90))}</td>
                      <td className="p-3">18 - 22 Days</td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="p-3 font-semibold">Tier 3 (500+ pcs)</td>
                      <td className="p-3 text-emerald-700 font-bold">Custom OEM Contract Rate</td>
                      <td className="p-3 font-bold text-emerald-800">{formatPrice(Math.round(wholesalePrice * 0.80))}</td>
                      <td className="p-3">25 - 30 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="max-w-4xl space-y-4 text-xs text-stone-700">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Custom Production & Care Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 uppercase">Custom Production Services:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>Custom Wooden Printing Block Carvings with bespoke motifs</li>
                    <li>Custom Colorway Strike-offs & Lab Dips</li>
                    <li>Bespoke Product Dimensions & Quilted Pattern Stitching</li>
                    <li>Sealed export polybag packaging with barcode tags</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 uppercase">Fabric Care Instructions:</h4>
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Complementary Creations in this Line
            </h2>
            <button
              onClick={() => { onNavigate(`/category/${product.category}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-serif font-bold text-[#942C29] uppercase tracking-wider hover:underline"
            >
              View Full Category
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
