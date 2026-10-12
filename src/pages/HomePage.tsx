import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, ShieldCheck, Truck, Layers, Award, CheckCircle2,
  Eye, PhoneCall, ChevronRight, Compass, Heart, Scissors, Clock, Globe2, MapPin, Feather
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { JOURNAL_POSTS } from '../data/journal';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { ProductCard } from '../components/ProductCard';
const CustomManufacturingWizard = React.lazy(() => 
  import('../components/CustomManufacturingWizard').then(m => ({ default: m.CustomManufacturingWizard }))
);
import { InstagramIcon } from '../components/InstagramIcon';
import { BulkOrderEnquiryForm } from '../components/BulkOrderEnquiryForm';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openQuickQuote, showToast } = useApp();
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [activeCraftCluster, setActiveCraftCluster] = useState<'sanganer' | 'bagru' | 'kantha'>('sanganer');
  const filteredProducts = activeCategoryTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategoryTab);

  return (
    <div className="space-y-16 md:space-y-24 bg-[#F5EEE6] text-[#241A16]">
      
      {/* =========================================================================
          1. HERO SECTION - SIGNATURE CRAFT OF PINK CITY SPLIT HERO
          ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtext, Action Buttons & Live Order Proof */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left">
              
              {/* Crafted in Jaipur Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F8] border border-[#F472B6] text-[#BE185D] text-xs font-bold tracking-wider uppercase font-royal-title shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />
                <span>CRAFTED IN JAIPUR • PINK CITY ATELIER</span>
              </div>

              {/* Editorial Headline */}
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] font-medium text-[#241A16] leading-[1.08] tracking-tight">
                The Art of Block Printing, <span className="italic font-editorial font-normal text-[#BE185D]">Crafted</span> in Jaipur.
              </h1>

              {/* Subtext */}
              <p className="text-stone-700 font-royal-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                Discover thoughtfully crafted fabrics, quilted travel duffles, and handmade vanity pouches inspired by traditional block-printing techniques and the rich textile heritage of Jaipur.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="pill-btn-rani flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg"
                >
                  <span>Explore Collection ({PRODUCTS.length} Styles)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('bulk-enquiry');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigate('/bulk-enquiry');
                    }
                  }}
                  className="pill-btn-outline flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full border-[#1D4ED8]/40 hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                >
                  <Scissors className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Custom Batch &amp; Bulk</span>
                </button>
              </div>



            </div>

            {/* Right Column: Blush Card with Artisan Patchwork Bag & Rotating Seal */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative bg-gradient-to-br from-[#FAF0EB] via-[#F7ECE5] to-[#F2DFD7] rounded-[36px] p-5 sm:p-7 border border-[#E8CECA] shadow-2xl overflow-hidden">
                
                {/* Floating Top-Left Artisan Patchwork Badge */}
                <div className="absolute top-6 left-6 z-20 bg-[#FAF5EE]/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-[#D4AF37]/40 flex items-center gap-2 text-xs font-bold text-[#241A16]">
                  <span className="text-[#9B332C] text-sm">🪄</span>
                  <span className="font-royal-title tracking-wider text-[11px]">ARTISAN PATCHWORK</span>
                </div>

                {/* Floating Top-Right Rotating Circular Seal */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#241A16] text-[#FAF5EE] flex items-center justify-center shadow-xl border border-[#D4AF37]/50">
                    <svg className="w-full h-full animate-spin-seal" viewBox="0 0 100 100">
                      <path
                        id="heroSealPath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text className="text-[8.5px] font-bold uppercase tracking-[0.22em] fill-[#FAF5EE]">
                        <textPath href="#heroSealPath" startOffset="0%">
                          • 100% ARTISAN • JAIPUR HANDBLOCK •
                        </textPath>
                      </text>
                    </svg>
                    {/* Center Gold Star Emblem */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#E5A93C] text-base sm:text-lg">✤</span>
                    </div>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="aspect-[4/4.5] rounded-[28px] overflow-hidden bg-[#F0E6D8] shadow-inner relative group">
                  <picture className="w-full h-full block">
                    <source
                      srcSet={resolveWebpImage('./products/duffle-kantha-patchwork.jpg')}
                      type="image/webp"
                    />
                    <img
                      src={resolveProductImage('./products/duffle-kantha-patchwork.jpg')}
                      alt="Artisan Jaipur Hand Block Quilted Patchwork Duffle Bag"
                      width="768"
                      height="864"
                      loading="eager"
                      // @ts-ignore
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </picture>
                  {/* Subtle Gradient Shade at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#241A16]/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5E6B5] font-royal-title">
                        Signature Collection
                      </span>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-white">
                        Barmer Kantha Quilted Duffle
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Small Bottom Tag */}
                <div className="mt-4 flex items-center justify-between text-xs text-stone-600 font-royal-body px-1">
                  <span className="font-medium">Hand-stitched channel padding</span>
                  <button 
                    onClick={() => { onNavigate('/category/bags'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-[#9B332C] hover:text-[#241A16] font-bold font-royal-title flex items-center gap-1 transition-colors"
                  >
                    <span>View Duffle Bags</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. JAIPUR CRAFT CLUSTERS INTERACTIVE ATLAS
          ========================================================================= */}
      {/* =========================================================================
          2. JAIPUR CRAFT CLUSTERS INTERACTIVE ATLAS (HIGH CONTRAST & RICH DETAILS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFE4D6] rounded-[32px] p-6 sm:p-10 border border-[#D4AF37]/35 shadow-md relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold tracking-wider uppercase font-royal-title mb-3 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#9B332C]" />
              <span>Rajasthan Textile Heritage Clusters</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-4xl text-[#1A120E] font-bold tracking-tight">
              The Artisan Craft Quarters of Jaipur
            </h2>
            <p className="text-stone-800 font-royal-body text-sm sm:text-base mt-2 leading-relaxed font-medium">
              Every Ramam Textiles piece originates in centuries-old Rajasthani craft clusters, where generational master artisans preserve UNESCO-recognized block carving and hand-dye traditions.
            </p>
          </div>

          {/* Interactive Cluster Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setActiveCraftCluster('sanganer')}
              className={`p-5 rounded-2xl text-left transition-all border-2 cursor-pointer ${
                activeCraftCluster === 'sanganer'
                  ? 'bg-gradient-to-br from-[#FDF2F8] via-[#FAF5EE] to-[#FCE7F3] border-[#DB2777] shadow-xl ring-2 ring-[#DB2777]/30'
                  : 'bg-[#FAF5EE] border-[#FBCFE8] hover:border-[#DB2777] hover:bg-[#FDF2F8] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🪷</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6] font-royal-title">
                  Jaipur Rani Pink
                </span>
              </div>
              <h3 className={`font-playfair font-bold text-lg leading-snug transition-colors ${activeCraftCluster === 'sanganer' ? 'text-[#BE185D]' : 'text-[#1A120E]'}`}>
                Sanganer Atelier
              </h3>
              <p className="text-xs text-stone-700 font-royal-body mt-1 leading-relaxed font-medium">
                Delicate botanical bootas and Mughal trellis patterns printed on pure combed cotton.
              </p>
            </button>

            <button
              onClick={() => setActiveCraftCluster('bagru')}
              className={`p-5 rounded-2xl text-left transition-all border-2 cursor-pointer ${
                activeCraftCluster === 'bagru'
                  ? 'bg-gradient-to-br from-[#EFF6FF] via-[#FAF5EE] to-[#DBEAFE] border-[#1D4ED8] shadow-xl ring-2 ring-[#1D4ED8]/30'
                  : 'bg-[#FAF5EE] border-[#BFDBFE] hover:border-[#1D4ED8] hover:bg-[#EFF6FF] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🌿</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] font-royal-title">
                  Bagru Indigo Vats
                </span>
              </div>
              <h3 className={`font-playfair font-bold text-lg leading-snug transition-colors ${activeCraftCluster === 'bagru' ? 'text-[#1D4ED8]' : 'text-[#1A120E]'}`}>
                Bagru Indigo Works
              </h3>
              <p className="text-xs text-stone-700 font-royal-body mt-1 leading-relaxed font-medium">
                Natural fermented indigo, clay mud-resist stamps, and sun-curing on riverbank drying fields.
              </p>
            </button>

            <button
              onClick={() => setActiveCraftCluster('kantha')}
              className={`p-5 rounded-2xl text-left transition-all border-2 cursor-pointer ${
                activeCraftCluster === 'kantha'
                  ? 'bg-gradient-to-br from-[#FFFBEB] via-[#FAF5EE] to-[#FEF3C7] border-[#D97706] shadow-xl ring-2 ring-[#D97706]/30'
                  : 'bg-[#FAF5EE] border-[#FDE68A] hover:border-[#D97706] hover:bg-[#FFFBEB] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🧵</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FCD34D] font-royal-title">
                  Marigold &amp; Kantha
                </span>
              </div>
              <h3 className={`font-playfair font-bold text-lg leading-snug transition-colors ${activeCraftCluster === 'kantha' ? 'text-[#B45309]' : 'text-[#1A120E]'}`}>
                Barmer Kantha Stitching
              </h3>
              <p className="text-xs text-stone-700 font-royal-body mt-1 leading-relaxed font-medium">
                Double-channel padded cotton batting, running kantha embroidery, and candy-stripe piping.
              </p>
            </button>
          </div>

          {/* Interactive Cluster Spotlight Panel */}
          <div className={`rounded-2xl p-6 border shadow-lg mb-6 transition-all animate-fade-in ${
            activeCraftCluster === 'sanganer'
              ? 'bg-gradient-to-br from-[#FAF5EE] via-[#FDF2F8] to-[#FAF0EB] border-[#F472B6]/60'
              : activeCraftCluster === 'bagru'
              ? 'bg-gradient-to-br from-[#FAF5EE] via-[#EFF6FF] to-[#FAF5EE] border-[#93C5FD]/60'
              : 'bg-gradient-to-br from-[#FAF5EE] via-[#FFFBEB] to-[#FAF5EE] border-[#FDE68A]/60'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-royal-title uppercase tracking-wider border ${
                  activeCraftCluster === 'sanganer'
                    ? 'bg-[#FCE7F3] border-[#F472B6] text-[#BE185D]'
                    : activeCraftCluster === 'bagru'
                    ? 'bg-[#DBEAFE] border-[#93C5FD] text-[#1E40AF]'
                    : 'bg-[#FEF3C7] border-[#FCD34D] text-[#B45309]'
                }`}>
                  <span>✨ Cluster Deep Dive</span>
                  <span>•</span>
                  <span>
                    {activeCraftCluster === 'sanganer' && 'Sanganer Woodblock Guild'}
                    {activeCraftCluster === 'bagru' && 'Bagru Dabu & Indigo Vats'}
                    {activeCraftCluster === 'kantha' && 'Barmer Hand Quilting Workshop'}
                  </span>
                </div>

                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1A120E] leading-snug">
                  {activeCraftCluster === 'sanganer' && 'Centuries-Old Fine Flora Block Printing on Pure Cotton'}
                  {activeCraftCluster === 'bagru' && 'Fermented Natural Indigo Wells & Riverbed Mud Resist'}
                  {activeCraftCluster === 'kantha' && 'Tactile Hand-Stitched Channels & Heirloom Quilted Padding'}
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-royal-body font-medium">
                  {activeCraftCluster === 'sanganer' && 'Originating over 500 years ago along the Saraswati river basin, Sanganeri printing is revered for delicate floral bootis, intricate Mughal trellises, and crisp, razor-sharp outlines hand-pressed onto combed cotton.'}
                  {activeCraftCluster === 'bagru' && 'Bagru is world-renowned for its 300-year-old Dabu mud-resist method. Natural clay, tree gum, and saw dust are stamped before sun-drying on riverbeds and repeated dipping in deep natural indigo ferment wells.'}
                  {activeCraftCluster === 'kantha' && 'Rooted in Thar desert artisanal traditions, Kantha quilting sandwiches thick, shock-absorbing combed cotton wadding between hand-printed layers, finished with running kantha needlework and signature candy-striped handles.'}
                </p>

                {/* Craft Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(activeCraftCluster === 'sanganer' 
                    ? ['Pure Combed Cotton', 'Hand-Carved Teak Blocks', 'Natural Eco Pigments', 'UNESCO Recognized'] 
                    : activeCraftCluster === 'bagru' 
                    ? ['100% Fermented Indigo', 'Dabu Mud-Resist Clay', 'Riverbed Sun-Cured', 'Chemical-Free'] 
                    : ['Padded Cotton Batting', 'Dense Kantha Channels', 'Candy-Stripe Handles', 'Travel Durability']
                  ).map(tag => (
                    <span 
                      key={tag} 
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold font-royal-body border ${
                        activeCraftCluster === 'sanganer'
                          ? 'bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]'
                          : activeCraftCluster === 'bagru'
                          ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
                          : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                      }`}
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`${
                      activeCraftCluster === 'sanganer'
                        ? 'pill-btn-rani'
                        : activeCraftCluster === 'bagru'
                        ? 'pill-btn-indigo'
                        : 'pill-btn-rose'
                    } px-5 py-2.5 text-xs font-bold uppercase rounded-full shadow-md flex items-center gap-2`}
                  >
                    <span>View {activeCraftCluster === 'sanganer' ? 'Sanganeri' : activeCraftCluster === 'bagru' ? 'Bagru Indigo' : 'Kantha Quilted'} Creations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Image Card */}
              <div className="lg:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#F0E6D8] border border-[#D4AF37]/35 shadow-inner relative group">
                <picture className="w-full h-full block">
                  <source
                    srcSet={resolveWebpImage(
                      activeCraftCluster === 'sanganer'
                        ? './products/vanity-trio-turquoise.jpg'
                        : activeCraftCluster === 'bagru'
                        ? './products/duffle-indigo.jpg'
                        : './products/duffle-kantha-patchwork.jpg'
                    )}
                    type="image/webp"
                  />
                  <img
                    src={resolveProductImage(
                      activeCraftCluster === 'sanganer'
                        ? './products/vanity-trio-turquoise.jpg'
                        : activeCraftCluster === 'bagru'
                        ? './products/duffle-indigo.jpg'
                        : './products/duffle-kantha-patchwork.jpg'
                    )}
                    alt={activeCraftCluster}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A120E]/80 via-[#1A120E]/30 to-transparent p-3.5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5A93C] font-royal-title block">
                    Authentic Jaipur Atelier
                  </span>
                  <span className="font-playfair text-sm font-bold">
                    {activeCraftCluster === 'sanganer' ? 'Turquoise Sanganeri Cosmetic Trio' : activeCraftCluster === 'bagru' ? 'Indigo Mughal Travel Duffle' : 'Barmer Kantha Patchwork Duffle'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/30 text-xs font-royal-title">
            <span className="text-[#1A120E] font-bold">👑 GI-Certified Jaipur Hand Block Craftsmanship</span>
            <button 
              onClick={() => { onNavigate('/craftsmanship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[#9B332C] hover:text-[#1A120E] font-bold flex items-center gap-1 transition-colors"
            >
              <span>Explore full craft story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY PILLARS SHOWCASE (HAVELI ARCH CARDS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold tracking-wider uppercase font-royal-title mb-3">
            <span>👑 Curated Jaipur Haveli Lines</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
            Handcrafted Masterpieces of Rajasthan
          </h2>
          <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed mt-2">
            Authentic Jaipur quilted duffles, ruffle tote bags, 3-piece vanity organizer sets, and yoga mat carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => { onNavigate(`/category/${cat.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`group relative h-96 rounded-[28px] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#FAF5EE] border-2 ${
                cat.id === 'bags'
                  ? 'border-[#3B82F6]/50 hover:border-[#1D4ED8]'
                  : cat.id === 'women'
                  ? 'border-[#F472B6]/50 hover:border-[#BE185D]'
                  : 'border-[#10B981]/50 hover:border-[#047857]'
              }`}
            >
              <picture className="w-full h-full block">
                <source srcSet={resolveWebpImage(cat.image)} type="image/webp" />
                <img
                  src={resolveProductImage(cat.image)}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-[#1F1612]/40 to-transparent group-hover:via-[#1F1612]/60 transition-colors" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                <span className={`text-[11px] font-royal-title uppercase tracking-widest mb-1.5 font-bold px-3 py-1 rounded-full w-fit backdrop-blur-md border ${
                  cat.id === 'bags'
                    ? 'bg-[#1E295B]/90 text-[#93C5FD] border-[#3B82F6]'
                    : cat.id === 'women'
                    ? 'bg-[#831843]/90 text-[#FBCFE8] border-[#EC4899]'
                    : 'bg-[#064E3B]/90 text-[#A7F3D0] border-[#10B981]'
                }`}>
                  {cat.id === 'bags' ? '🌿 Bagru Indigo & Duffles' : cat.id === 'women' ? '🪷 Sanganer Rani Pink Sets' : '✨ Panna Emerald Organizers'}
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white group-hover:text-[#FAF3DC] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs font-royal-body text-stone-200 mt-1 line-clamp-2">
                  {cat.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#E5A93C] group-hover:translate-x-1.5 transition-transform font-bold">
                  <span>View Wholesale Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. SIGNATURE PRODUCTS WITH PILL FILTER TABS
          ========================================================================= */}
      <section className="bg-[#EFE4D6] py-16 md:py-24 border-y border-[#D4AF37]/35 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-2 font-royal-title">
                👑 Ready-To-Order &amp; Custom Runs
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
                Signature Hand Block Quilted Creations
              </h2>
              <p className="text-stone-700 font-royal-body text-base mt-1">
                Authentic Jaipur handcrafted pieces with candy-stripe straps, pure cotton padding, and export-grade stitching.
              </p>
            </div>

            {/* Category Filter Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`pill-nav-btn ${
                  activeCategoryTab === 'all'
                    ? 'pill-nav-btn-active bg-[#9B332C] text-white border-[#9B332C] shadow-md'
                    : 'hover:border-[#9B332C]'
                }`}
              >
                All Pieces ({PRODUCTS.length})
              </button>
              {CATEGORIES.map(cat => {
                const isActive = activeCategoryTab === cat.id;
                const activeColorClass = 
                  cat.id === 'bags'
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-md'
                    : cat.id === 'women'
                    ? 'bg-[#DB2777] text-white border-[#DB2777] shadow-md'
                    : 'bg-[#0E7490] text-white border-[#0E7490] shadow-md';

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryTab(cat.id)}
                    className={`pill-nav-btn ${isActive ? activeColorClass : ''}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      cat.id === 'bags' ? 'bg-[#2563EB]' : cat.id === 'women' ? 'bg-[#EC4899]' : 'bg-[#06B6D4]'
                    }`}></span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="pill-btn-rose inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-wider rounded-full shadow-xl"
            >
              <span>Explore Complete Jaipur Wholesale Catalog ({PRODUCTS.length} SKUs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. THE ARTISAN STORY & HERITAGE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase with Real Product */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#FAF5EE] bg-[#F0E6D8]">
                <picture className="w-full h-full block">
                  <source srcSet={resolveWebpImage('./products/duffle-pink-botanical.jpg')} type="image/webp" />
                  <img
                    src={resolveProductImage('./products/duffle-pink-botanical.jpg')}
                    alt="Jaipur Hand Block Printed Quilted Weekender Bag"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>

              {/* Overlapping Royal Medallion */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 bg-[#1F1612] text-[#FAF3DC] p-6 sm:p-7 rounded-[28px] shadow-2xl border border-[#D4AF37]/60 max-w-xs">
                <div className="flex items-center gap-2 text-[#E5A93C] text-xs font-bold uppercase tracking-wider mb-1 font-royal-title">
                  <Award className="w-4 h-4 text-[#E5A93C]" />
                  <span>3rd Generation Jaipur Artistry</span>
                </div>
                <div className="font-playfair text-lg font-bold text-white">Pure Quilted Indian Cotton</div>
                <p className="text-[11px] font-royal-body text-stone-300 mt-1 leading-relaxed">
                  Every duffle and pouch is hand-stamped with wooden Sheesham blocks, channel-quilted with cotton batting, and finished with candy-stripe piping.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold tracking-wider uppercase font-royal-title">
              <Sparkles className="w-3.5 h-3.5 text-[#9B332C]" />
              <span>Living Heritage of Rajasthan</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1F1612] font-bold leading-tight">
              Where Ancient Mud-Resist Meets Modern Luxury Travel.
            </h2>

            <p className="text-stone-700 font-royal-body text-base sm:text-lg leading-relaxed">
              At <strong>Ramam Textiles</strong>, every bag is a tribute to the artisan quarters of Jaipur. In our Bagru and Sanganer workshops, master block-printers stamp intricate Mughal botanicals, delicate rose bootas, and vibrant wildlife art onto 100% pure combed cotton.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/35 shadow-sm">
                <h4 className="font-royal-title font-bold text-[#1F1612] text-sm mb-1">Padded Channel Quilting</h4>
                <p className="text-xs font-royal-body text-stone-600">Shock-absorbing soft cotton batting that provides structured shape and travel durability.</p>
              </div>

              <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/35 shadow-sm">
                <h4 className="font-royal-title font-bold text-[#1F1612] text-sm mb-1">Candy-Stripe Trims</h4>
                <p className="text-xs font-royal-body text-stone-600">Dual-tone candy striped carry handles, piping, and detachable shoulder slings with brass clips.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => { onNavigate('/craftsmanship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="pill-btn-rose rounded-full px-6 py-3"
              >
                <span>Read The Craftsmanship Process</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { onNavigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="pill-btn-outline rounded-full px-6 py-3"
              >
                Our Jaipur Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE CUSTOM MANUFACTURING WIZARD SECTION
          ========================================================================= */}
      <section className="bg-[#1F1612] py-16 md:py-24 text-white relative overflow-hidden border-y border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9B332C]/20 border border-[#9B332C]/40 text-[#FDF0F3] text-xs font-bold tracking-wider uppercase font-royal-title mb-3">
              <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Custom Manufacturing &amp; OEM Studio</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF3DC]">
              Launch Your Custom Quilted Bag Collection
            </h2>
            <p className="text-stone-300 font-royal-body text-base sm:text-lg mt-2">
              Customize print artwork, bag dimensions, zipper pullers, and woven brand labels with direct-from-factory Jaipur pricing.
            </p>
          </div>

          {/* Interactive Wizard Component */}
          <div className="max-w-4xl mx-auto">
            <React.Suspense fallback={
              <div className="p-12 text-center text-stone-500 bg-[#FAF5EE] rounded-3xl border border-[#D4AF37]/30 shadow-md">
                <div className="w-10 h-10 rounded-full border-2 border-[#BE185D] border-t-transparent animate-spin mx-auto mb-3" />
                <p className="font-royal-title text-xs tracking-wider uppercase text-[#BE185D]">Loading Custom Manufacturing Atelier...</p>
              </div>
            }>
              <CustomManufacturingWizard />
            </React.Suspense>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. EDITORIAL LOOKBOOK PREVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-2 font-royal-title">
              🪷 Editorial Visuals
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
              2026 Quilted Collection Lookbook
            </h2>
            <p className="text-stone-700 font-royal-body text-base mt-1">
              Authentic Jaipur hand block-printed duffles, totes, vanity boxes, and yoga mat bags.
            </p>
          </div>

          <button
            onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pill-btn-outline rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <span>View Full Editorial Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_ITEMS.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative rounded-[28px] overflow-hidden shadow-lg cursor-pointer aspect-[3/4] bg-[#FAF5EE] border border-[#D4AF37]/40 hover:border-[#9B332C] transition-all"
            >
              <picture className="w-full h-full block">
                <source srcSet={resolveWebpImage(item.image)} type="image/webp" />
                <img
                  src={resolveProductImage(item.image)}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-[#1F1612]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[10px] font-royal-title uppercase tracking-widest text-[#E5A93C] font-bold">{item.season}</span>
                <h3 className="font-playfair text-xl font-bold text-white mt-1 group-hover:text-[#F5E6B5] transition-colors">{item.title}</h3>
                <p className="text-xs font-royal-body text-stone-300 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. WHOLESALE BUYER ADVANTAGES & LOGISTICS
          ========================================================================= */}
      <section className="bg-[#F7ECE5] py-16 md:py-20 border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-2 font-royal-title">
              👑 Jaipur B2B Manufacturing Partner
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
              Why Global Boutiques Partner With Ramam Textiles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#FAF5EE] rounded-[28px] shadow-md border-2 border-[#A7F3D0]/60 hover:border-[#059669] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#ECFDF5] text-[#047857] rounded-2xl flex items-center justify-center mb-6 border border-[#A7F3D0] shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#047857]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#065F46] mb-2">Strict 4-Point Quality Inspection</h3>
              <p className="text-xs font-royal-body text-stone-700 leading-relaxed">
                Every stitched bag undergoes zero-defect inspection for zipper durability, strap tensile strength, quilting alignment, and clean edge binding.
              </p>
            </div>

            <div className="p-8 bg-[#FAF5EE] rounded-[28px] shadow-md border-2 border-[#BFDBFE]/60 hover:border-[#2563EB] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#EFF6FF] text-[#1D4ED8] rounded-2xl flex items-center justify-center mb-6 border border-[#BFDBFE] shadow-sm">
                <Truck className="w-6 h-6 text-[#1D4ED8]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#1E295B] mb-2">Doorstep Air Express Freight</h3>
              <p className="text-xs font-royal-body text-stone-700 leading-relaxed">
                Direct DHL / FedEx Express air shipments (4-7 business days) with full Certificate of Origin and export clearance handled seamlessly.
              </p>
            </div>

            <div className="p-8 bg-[#FAF5EE] rounded-[28px] shadow-md border-2 border-[#FBCFE8]/60 hover:border-[#DB2777] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#FDF2F8] text-[#BE185D] rounded-2xl flex items-center justify-center mb-6 border border-[#FBCFE8] shadow-sm">
                <Scissors className="w-6 h-6 text-[#BE185D]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#831843] mb-2">Low MOQ (25 Pcs) &amp; Custom Orders</h3>
              <p className="text-xs font-royal-body text-stone-700 leading-relaxed">
                Start with only 25 pieces per style. Custom brand woven neck tags, hangtags, and packaging are supported seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8B. GLOBAL BOUTIQUE REVIEWS & CLIENT PROOF
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold font-royal-title uppercase tracking-wider mb-2">
            <span>⭐️ Verified Retailer &amp; Boutique Reviews</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
            Trusted by Luxury Boutiques Worldwide
          </h2>
          <p className="text-stone-700 font-royal-body text-base mt-2">
            Over 140+ independent lifestyle stores, resorts, and boutiques rely on Ramam Textiles for authentic Jaipur craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF5EE] p-7 rounded-[28px] border border-[#D4AF37]/40 shadow-sm hover:border-[#9B332C] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic font-royal-body">
                "The channel quilting and hand block print alignment on the weekender duffle bags exceeded our expectations. Our customers in Soho loved the authentic cotton feel. We reordered 150 more pieces within three weeks."
              </p>
            </div>
            <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
              <div>
                <h5 className="font-royal-title font-bold text-xs text-[#1F1612]">Charlotte Vance</h5>
                <span className="text-[10px] text-stone-500">Maison &amp; Fleur Boutique • London, UK</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified B2B</span>
            </div>
          </div>

          <div className="bg-[#FAF5EE] p-7 rounded-[28px] border border-[#D4AF37]/40 shadow-sm hover:border-[#9B332C] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic font-royal-body">
                "Ramam Textiles custom embroidered our brand tags onto 200 units of the playing card vanity cases. The packaging was immaculate, and FedEx delivery to Milan was flawless with full Certificate of Origin."
              </p>
            </div>
            <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
              <div>
                <h5 className="font-royal-title font-bold text-xs text-[#1F1612]">Matteo Moretti</h5>
                <span className="text-[10px] text-stone-500">Moretti Lifestyle Concept • Milan, Italy</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified B2B</span>
            </div>
          </div>

          <div className="bg-[#FAF5EE] p-7 rounded-[28px] border border-[#D4AF37]/40 shadow-sm hover:border-[#9B332C] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic font-royal-body">
                "Finding an authentic Jaipur manufacturer with low MOQs and genuine vegetable-dyed cotton was tough until we connected with Ramam Textiles. Their WhatsApp communication and sample turnaround are world-class."
              </p>
            </div>
            <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
              <div>
                <h5 className="font-royal-title font-bold text-xs text-[#1F1612]">Hannah Brooks</h5>
                <span className="text-[10px] text-stone-500">Sanctuary Resort Studio • Byron Bay, Australia</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified B2B</span>
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================================
          9. BULK ORDER ENQUIRY & WHOLESALE QUOTATION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BulkOrderEnquiryForm id="bulk-enquiry" />
      </section>

      {/* =========================================================================
          10. JOURNAL / JAIPUR CRAFT CHRONICLES PREVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-2 font-royal-title">
              👑 Jaipur Craft Chronicles
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
              Artisan Stories &amp; Textile Heritage
            </h2>
          </div>

          <button
            onClick={() => { onNavigate('/journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pill-btn-outline rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_POSTS.slice(0, 3).map(post => (
            <article 
              key={post.id}
              onClick={() => { onNavigate(`/journal/${post.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-[#FAF5EE] rounded-[28px] overflow-hidden shadow-sm border border-[#D4AF37]/40 hover:border-[#9B332C] hover:shadow-2xl transition-all cursor-pointer flex flex-col hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <picture className="w-full h-full block">
                  <source srcSet={resolveWebpImage(post.image)} type="image/webp" />
                  <img
                    src={resolveProductImage(post.image)}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <span className="absolute top-3 left-3 bg-[#1F1612]/95 text-[#FAF3DC] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-royal-title border border-[#D4AF37]/40 shadow-sm">
                  🪷 {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between font-royal-body">
                <div>
                  <div className="text-[11px] text-stone-500 mb-2 flex items-center gap-2 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#1F1612] group-hover:text-[#9B332C] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs font-royal-title font-bold text-[#1F1612]">
                  <span className="text-[#9B332C]">Read Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#9B332C]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
