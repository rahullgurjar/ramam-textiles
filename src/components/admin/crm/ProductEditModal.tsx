import React, { useState } from 'react';
import { 
  X, Save, Plus, Trash2, Image as ImageIcon, Sparkles, 
  Layers, Tag, DollarSign, CheckCircle2, AlertCircle, Eye, 
  Package, Palette, Ruler, ArrowRight, ShieldCheck
} from 'lucide-react';
import { Product, ProductCategory, WholesaleTier } from '../../../types';
import { saveProduct } from '../../../utils/productStorage';
import { useApp } from '../../../context/AppContext';
import { resolveProductImage } from '../../../utils/imageUtils';

interface ProductEditModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (savedProduct: Product) => void;
}

const CATEGORIES_OPTIONS: { id: ProductCategory; label: string }[] = [
  { id: 'bags', label: 'Bags & Quilted Duffles' },
  { id: 'women', label: 'Cosmetic & Vanity Pouches' },
  { id: 'home', label: 'Organizers & Styler Cases' },
  { id: 'fabrics', label: 'Running Hand Block Fabrics' },
  { id: 'men', label: 'Men Apparel & Kurtas' },
  { id: 'kids', label: 'Kids & Baby Textiles' },
];

const PRESET_GALLERY_IMAGES = [
  '/products/vanity-playing-cards.jpg',
  '/products/organizer-dyson-airwrap.jpg',
  '/products/vanity-trio-turquoise.jpg',
  '/products/vanity-trio-mint-aqua.jpg',
  '/products/duffle-kantha-patchwork.jpg',
  '/products/duffle-indigo-mughal.jpg',
  '/products/weekender-autumn-blossom.jpg',
  '/products/tote-pink-ruffle.jpg',
  '/products/sleeve-laptop-kalamkari.jpg',
  '/products/carrier-yoga-safari.jpg',
  '/products/duffle-bagru-indigo.jpg',
  '/products/vanity-trio-cream-marigold.jpg',
  '/products/vanity-trio-meadow-green.jpg',
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaved
}) => {
  const { showToast } = useApp();
  const isEditing = Boolean(product && product.id);

  // Tab switcher
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'specs' | 'content' | 'images' | 'badges'>('basic');

  // Form State
  const [name, setName] = useState(product?.name || '');
  const [sku, setSku] = useState(product?.sku || `RT-BAG-${Math.floor(100 + Math.random() * 900)}`);
  const [slug, setSlug] = useState(product?.slug || '');
  const [category, setCategory] = useState<ProductCategory>(product?.category || 'bags');
  const [subcategory, setSubcategory] = useState(product?.subcategory || 'Quilted Bags & Cases');
  const [collection, setCollection] = useState(product?.collection || 'Royal Jaipur Edition');

  // Pricing & Wholesale
  const [indicativeRetailInr, setIndicativeRetailInr] = useState<number>(product?.indicativeRetailInr || 1299);
  const [moq, setMoq] = useState<number>(product?.moq || 25);
  const [leadTime, setLeadTime] = useState(product?.leadTime || '10-14 Days');
  const [customizationAvailable, setCustomizationAvailable] = useState(product?.customizationAvailable ?? true);
  const [privateLabelAvailable, setPrivateLabelAvailable] = useState(product?.privateLabelAvailable ?? true);
  const [wholesaleTiers, setWholesaleTiers] = useState<WholesaleTier[]>(
    product?.wholesaleTiers && product.wholesaleTiers.length > 0
      ? JSON.parse(JSON.stringify(product.wholesaleTiers))
      : [
          { minQty: 25, maxQty: 99, pricePerUnitInr: 550, leadTimeWeeks: '2-3 Weeks' },
          { minQty: 100, maxQty: 499, pricePerUnitInr: 480, leadTimeWeeks: '3-4 Weeks' },
          { minQty: 500, pricePerUnitInr: 420, leadTimeWeeks: '4-5 Weeks' },
        ]
  );

  // Craft Specs
  const [fabric, setFabric] = useState(product?.fabric || '100% Pure Cambric Cotton with Soft Batting');
  const [printTechnique, setPrintTechnique] = useState(product?.printTechnique || 'Jaipur Wooden Hand Block Print');
  const [gsm, setGsm] = useState(product?.specifications?.gsm || '220 GSM');
  const [dimensions, setDimensions] = useState(product?.specifications?.dimensions || '12" x 8" x 4"');
  const [weave, setWeave] = useState(product?.specifications?.weave || 'Plain Weave 60s x 60s');
  const [dyeType, setDyeType] = useState(product?.specifications?.dyeType || 'Azo-Free Pigment Screen & Hand Block');
  const [washCare, setWashCare] = useState(product?.specifications?.washCare || 'Spot clean or gentle cold hand wash');
  const [origin, setOrigin] = useState(product?.specifications?.origin || 'Jaipur, Rajasthan, India');
  const [hsCode, setHsCode] = useState(product?.specifications?.hsCode || '4202.92.00');
  const [exportReady, setExportReady] = useState(product?.specifications?.exportReady ?? true);

  // Colors & Sizes
  const [colors, setColors] = useState<string[]>(product?.colors || ['Jaipur Pink & Ecru', 'Bagru Natural Indigo']);
  const [newColorInput, setNewColorInput] = useState('');
  const [sizes, setSizes] = useState<string[]>(product?.sizes || ['Standard Atelier Size']);
  const [newSizeInput, setNewSizeInput] = useState('');

  // Description & Highlights
  const [description, setDescription] = useState(
    product?.description || 
    'Handcrafted by generational artisans in Jaipur using authentic wooden hand block printing on pure combed cotton with shock-absorbing channel quilting.'
  );
  const [highlights, setHighlights] = useState<string[]>(
    product?.highlights || [
      'Authentic Jaipur hand block-printed pure combed cotton',
      'Channel quilted with soft shock-absorbing batting',
      'Heavy-duty smooth brass zip with lined interior',
      'Private brand label custom stitching available on MOQ'
    ]
  );
  const [newHighlightInput, setNewHighlightInput] = useState('');
  const [tags, setTags] = useState<string[]>(product?.tags || ['Quilted Bag', 'Block Print', 'Jaipur Craft', 'Wholesale']);
  const [newTagInput, setNewTagInput] = useState('');

  // Images
  const [images, setImages] = useState<string[]>(product?.images || ['/products/vanity-playing-cards.jpg']);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Badges & Flags
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? true);
  const [isBestseller, setIsBestseller] = useState(product?.isBestseller ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);

  if (!isOpen) return null;

  // Auto-generate slug when name changes for new products
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing || !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  // Wholesale Tiers Helpers
  const handleTierChange = (index: number, field: keyof WholesaleTier, value: any) => {
    const updated = [...wholesaleTiers];
    updated[index] = { ...updated[index], [field]: value };
    setWholesaleTiers(updated);
  };

  const handleAddTier = () => {
    const lastTier = wholesaleTiers[wholesaleTiers.length - 1];
    const newMin = lastTier ? (lastTier.maxQty ? lastTier.maxQty + 1 : lastTier.minQty + 100) : 25;
    setWholesaleTiers([
      ...wholesaleTiers,
      { minQty: newMin, pricePerUnitInr: 350, leadTimeWeeks: '3-4 Weeks' }
    ]);
  };

  const handleRemoveTier = (index: number) => {
    setWholesaleTiers(wholesaleTiers.filter((_, i) => i !== index));
  };

  // Color chips helpers
  const handleAddColor = () => {
    if (!newColorInput.trim()) return;
    if (!colors.includes(newColorInput.trim())) {
      setColors([...colors, newColorInput.trim()]);
    }
    setNewColorInput('');
  };

  const handleRemoveColor = (col: string) => {
    setColors(colors.filter(c => c !== col));
  };

  // Size chips helpers
  const handleAddSize = () => {
    if (!newSizeInput.trim()) return;
    if (!sizes.includes(newSizeInput.trim())) {
      setSizes([...sizes, newSizeInput.trim()]);
    }
    setNewSizeInput('');
  };

  const handleRemoveSize = (sz: string) => {
    setSizes(sizes.filter(s => s !== sz));
  };

  // Highlights helpers
  const handleAddHighlight = () => {
    if (!newHighlightInput.trim()) return;
    setHighlights([...highlights, newHighlightInput.trim()]);
    setNewHighlightInput('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  // Tags helpers
  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    if (!tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tg: string) => {
    setTags(tags.filter(t => t !== tg));
  };

  // Image helpers
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    if (!images.includes(newImageUrl.trim())) {
      setImages([...images, newImageUrl.trim()]);
    }
    setNewImageUrl('');
  };

  const handleSelectPresetImage = (url: string) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleRemoveImage = (url: string) => {
    if (images.length <= 1) {
      showToast('Product must have at least 1 image.', 'error');
      return;
    }
    setImages(images.filter(img => img !== url));
  };

  const handleSetPrimaryImage = (url: string) => {
    setImages([url, ...images.filter(img => img !== url)]);
    showToast('Set as primary product photo.', 'info');
  };

  // Save handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Product name is required.', 'error');
      setActiveTab('basic');
      return;
    }

    if (!sku.trim()) {
      showToast('Product SKU is required.', 'error');
      setActiveTab('basic');
      return;
    }

    const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalId = product?.id || `prod-custom-${Date.now()}`;

    const updatedProduct: Product = {
      id: finalId,
      slug: finalSlug,
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      collection: collection.trim(),
      category,
      subcategory: subcategory.trim(),
      images: images.length > 0 ? images : ['/products/vanity-playing-cards.jpg'],
      fabric: fabric.trim(),
      printTechnique: printTechnique.trim(),
      colors: colors.length > 0 ? colors : ['Custom'],
      sizes: sizes.length > 0 ? sizes : ['Standard'],
      moq: Number(moq) || 25,
      indicativeRetailInr: Number(indicativeRetailInr) || 999,
      wholesaleTiers: wholesaleTiers.length > 0 ? wholesaleTiers : [
        { minQty: 25, pricePerUnitInr: 450, leadTimeWeeks: '2-3 Weeks' }
      ],
      customizationAvailable,
      privateLabelAvailable,
      leadTime: leadTime.trim() || '10-14 Days',
      description: description.trim(),
      highlights: highlights.length > 0 ? highlights : ['Handmade in Jaipur'],
      specifications: {
        fabric: fabric.trim(),
        gsm: gsm.trim(),
        weave: weave.trim(),
        dyeType: dyeType.trim(),
        dimensions: dimensions.trim(),
        washCare: washCare.trim(),
        origin: origin.trim(),
        packaging: 'Individually polybagged; 50 pcs per export master carton',
        hsCode: hsCode.trim(),
        exportReady
      },
      tags: tags.length > 0 ? tags : ['Handmade'],
      inStock,
      isFeatured,
      isBestseller,
      isNew
    };

    saveProduct(updatedProduct);
    onSaved(updatedProduct);
    showToast(`Product "${updatedProduct.name}" saved successfully!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in font-royal-body">
      <div className="relative w-full max-w-5xl bg-[#FAF5EE] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-[#241A16] text-[#FAF5EE] p-5 sm:px-8 sm:py-6 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#801B18] text-[#FCE5A4] flex items-center justify-center font-bold shadow-inner">
              <Package className="w-5 h-5 text-[#FCE5A4]" />
            </div>
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#FCE5A4]">
                {isEditing ? `Edit Product: ${product?.name}` : 'Add New Atelier Product'}
              </h2>
              <p className="text-xs text-stone-400">
                {isEditing ? `SKU: ${product?.sku} • ID: ${product?.id}` : 'Create a new B2B catalogue item with wholesale pricing tiers'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#FAF0EB] px-6 py-2 border-b border-[#EACAC0] flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'basic' ? 'bg-[#9B332C] text-white shadow-sm' : 'text-stone-700 hover:bg-white/60'
            }`}
          >
            1. Basic &amp; Category
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'pricing' ? 'bg-[#9B332C] text-white shadow-sm' : 'text-stone-700 hover:bg-white/60'
            }`}
          >
            2. Pricing &amp; B2B Tiers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'specs' ? 'bg-[#9B332C] text-white shadow-sm' : 'text-stone-700 hover:bg-white/60'
            }`}
          >
            3. Craft &amp; Specs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'content' ? 'bg-[#9B332C] text-white shadow-sm' : 'text-stone-700 hover:bg-white/60'
            }`}
          >
            4. Description &amp; Highlights
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('images')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'images' ? 'bg-[#9B332C] text-white shadow-sm' : 'text-stone-700 hover:bg-white/60'
            }`}
          >
            5. Images &amp; Media
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'badges' ? 'bg-[#9B332C] text-white shadow-sm' : 'text-stone-700 hover:bg-white/60'
            }`}
          >
            6. Stock &amp; Badges
          </button>
        </div>

        {/* Modal Body & Forms */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Heritage Pink Quilted Playing Card Vanity Pouch"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-900 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. RT-BAG-001"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-900 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. jaipur-quilted-playing-card-pouch"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-700 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-900 outline-none focus:border-[#9B332C]"
                  >
                    {CATEGORIES_OPTIONS.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Vanity & Cosmetic Pouches"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    placeholder="e.g. Royal Jaipur Novelty Edition / Autumn Blossom 2026"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & B2B WHOLESALE TIERS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Indicative Retail Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={indicativeRetailInr}
                    onChange={(e) => setIndicativeRetailInr(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-stone-900 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Minimum Order Qty (MOQ)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={moq}
                    onChange={(e) => setMoq(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-stone-900 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Production Lead Time
                  </label>
                  <input
                    type="text"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    placeholder="e.g. 10-14 Days / 3 Weeks"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>
              </div>

              {/* Wholesale Pricing Tiers Matrix */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <h3 className="font-playfair text-base font-bold text-[#241A16]">
                      Tiered Wholesale Volume Pricing Matrix
                    </h3>
                    <p className="text-xs text-stone-500">
                      Progressive volume discounts unlocked for verified boutique and importer RFQs.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTier}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF0EB] hover:bg-[#801B18] text-[#9B332C] hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Tier</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF5EE] text-stone-700 font-bold border-b border-stone-200">
                        <th className="p-2.5">Min Qty</th>
                        <th className="p-2.5">Max Qty (Optional)</th>
                        <th className="p-2.5">Unit Price (₹ INR)</th>
                        <th className="p-2.5">Lead Time</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {wholesaleTiers.map((tier, idx) => (
                        <tr key={idx}>
                          <td className="p-2">
                            <input
                              type="number"
                              value={tier.minQty}
                              onChange={(e) => handleTierChange(idx, 'minQty', Number(e.target.value))}
                              className="w-24 bg-[#FAF5EE] border border-stone-300 rounded-lg px-2.5 py-1.5 font-mono font-bold"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={tier.maxQty || ''}
                              placeholder="No limit"
                              onChange={(e) => handleTierChange(idx, 'maxQty', e.target.value ? Number(e.target.value) : undefined)}
                              className="w-24 bg-[#FAF5EE] border border-stone-300 rounded-lg px-2.5 py-1.5 font-mono"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={tier.pricePerUnitInr}
                              onChange={(e) => handleTierChange(idx, 'pricePerUnitInr', Number(e.target.value))}
                              className="w-28 bg-[#FAF5EE] border border-stone-300 rounded-lg px-2.5 py-1.5 font-mono font-bold text-[#9B332C]"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={tier.leadTimeWeeks}
                              onChange={(e) => handleTierChange(idx, 'leadTimeWeeks', e.target.value)}
                              placeholder="2-3 Weeks"
                              className="w-32 bg-[#FAF5EE] border border-stone-300 rounded-lg px-2.5 py-1.5"
                            />
                          </td>
                          <td className="p-2 text-center">
                            {wholesaleTiers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveTier(idx)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* B2B Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customizationAvailable}
                    onChange={(e) => setCustomizationAvailable(e.target.checked)}
                    className="w-4 h-4 accent-[#9B332C]"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Customization Available</span>
                    <span className="text-[11px] text-stone-500">Allow bespoke sizes, linings, and color palette adjustments</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privateLabelAvailable}
                    onChange={(e) => setPrivateLabelAvailable(e.target.checked)}
                    className="w-4 h-4 accent-[#9B332C]"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Private Label / OEM Available</span>
                    <span className="text-[11px] text-stone-500">Attach buyer woven label, hangtags, and branded polybags</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: CRAFT & PHYSICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Fabric Composition *
                  </label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="e.g. 100% Pure Cambric Cotton with Soft Batting"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Print Technique
                  </label>
                  <input
                    type="text"
                    value={printTechnique}
                    onChange={(e) => setPrintTechnique(e.target.value)}
                    placeholder="e.g. Jaipur Wooden Hand Block Print (Teak Chhaap)"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    GSM / Fabric Weight
                  </label>
                  <input
                    type="text"
                    value={gsm}
                    onChange={(e) => setGsm(e.target.value)}
                    placeholder="e.g. 220 GSM (Quilted with batting)"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Dimensions (L x W x H)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder='e.g. 8.5" x 4.5" x 4.5"'
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Dye Certification
                  </label>
                  <input
                    type="text"
                    value={dyeType}
                    onChange={(e) => setDyeType(e.target.value)}
                    placeholder="e.g. Azo-Free Pigment Screen & Hand Block Stamp"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    HS Code
                  </label>
                  <input
                    type="text"
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    placeholder="e.g. 4202.92.00 (Textile Bags)"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Weave Structure
                  </label>
                  <input
                    type="text"
                    value={weave}
                    onChange={(e) => setWeave(e.target.value)}
                    placeholder="e.g. Plain Weave 60s Cambric"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Origin Workshop
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan, India"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Wash &amp; Care Matrix
                  </label>
                  <input
                    type="text"
                    value={washCare}
                    onChange={(e) => setWashCare(e.target.value)}
                    placeholder="e.g. Spot clean or gentle cold hand wash; do not tumble dry"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                </div>
              </div>

              {/* Colors Tag Manager */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Color / Variant Palettes
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colors.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] rounded-full text-xs font-bold">
                      <span>{c}</span>
                      <button type="button" onClick={() => handleRemoveColor(c)} className="hover:text-red-700">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newColorInput}
                    onChange={(e) => setNewColorInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddColor(); } }}
                    placeholder="Add color variant (e.g. Royal Indigo & Ecru)"
                    className="flex-1 bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-2 rounded-xl bg-[#9B332C] text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Sizes Tag Manager */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Available Sizes / Specs
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizes.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-800 border border-stone-300 rounded-full text-xs font-bold">
                      <span>{s}</span>
                      <button type="button" onClick={() => handleRemoveSize(s)} className="hover:text-red-700">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }}
                    placeholder="Add size (e.g. Cabin Weekender 19x10x10)"
                    className="flex-1 bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3 py-2 rounded-xl bg-[#9B332C] text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DESCRIPTION & CRAFT HIGHLIGHTS */}
          {activeTab === 'content' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Craft Story &amp; Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the wooden block technique, hand-quilting batting, zipper specifications, and boutique gifting applications..."
                  className="w-full bg-white border border-stone-300 rounded-xl p-4 text-xs text-stone-800 leading-relaxed outline-none focus:border-[#9B332C]"
                />
              </div>

              {/* Key Bullet Highlights */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Atelier Craft Highlights (Bullet Points)
                </label>
                <div className="space-y-2">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#FAF5EE] p-2.5 rounded-xl border border-stone-200 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B332C]" />
                      <span className="flex-1 text-stone-800">{h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newHighlightInput}
                    onChange={(e) => setNewHighlightInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddHighlight(); } }}
                    placeholder="e.g. 100% azo-free dyes certified colorfast under river wash"
                    className="flex-1 bg-[#FAF5EE] border border-stone-300 rounded-xl px-4 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 rounded-xl bg-[#9B332C] text-white text-xs font-bold"
                  >
                    Add Point
                  </button>
                </div>
              </div>

              {/* Search & SEO Tags */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Keywords &amp; Search Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-medium">
                      <span>#{t}</span>
                      <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-700">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    placeholder="Add tag (e.g. Duffle Bag, Sanganer Print)"
                    className="flex-1 bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 rounded-xl bg-[#9B332C] text-white text-xs font-bold"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: IMAGES & MEDIA */}
          {activeTab === 'images' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Current Product Gallery ({images.length} Photos)
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 aspect-square">
                      <img
                        src={resolveProductImage(img)}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {i === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#9B332C] text-white text-[10px] font-bold shadow-md">
                          Primary
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {i !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(img)}
                            className="p-1.5 rounded-lg bg-white/90 text-stone-800 hover:bg-white text-[10px] font-bold"
                            title="Set as primary"
                          >
                            Main
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img)}
                          className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Image URL */}
                <div className="flex gap-2 pt-2 border-t border-stone-100">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL (/products/name.jpg or https://...)"
                    className="flex-1 bg-[#FAF5EE] border border-stone-300 rounded-xl px-4 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 rounded-xl bg-[#9B332C] text-white text-xs font-bold"
                  >
                    Add Image
                  </button>
                </div>
              </div>

              {/* Atelier Media Gallery Presets Picker */}
              <div className="bg-[#FAF0EB] p-5 rounded-2xl border border-[#EACAC0] space-y-3">
                <label className="block text-xs font-bold text-[#9B332C] uppercase tracking-wider">
                  Pick from Verified Atelier Photography Presets:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {PRESET_GALLERY_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPresetImage(preset)}
                      className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                        images.includes(preset) ? 'ring-2 ring-[#9B332C] border-transparent' : 'border-stone-300 hover:border-[#9B332C]'
                      }`}
                    >
                      <img
                        src={resolveProductImage(preset)}
                        alt={`Preset ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STOCK & BADGES */}
          {activeTab === 'badges' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Catalog In-Stock Available</span>
                    <span className="text-[11px] text-stone-500">Item is active and ready for immediate wholesale batch orders</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-5 h-5 accent-[#9B332C]"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Featured on Atelier Showcase</span>
                    <span className="text-[11px] text-stone-500">Pinned to homepage master craft hero showcase</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="w-5 h-5 accent-amber-600"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Wholesale Bestseller Badge</span>
                    <span className="text-[11px] text-stone-500">Highlights high volume repeat-order items</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-5 h-5 accent-indigo-600"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">New 2026 Collection Badge</span>
                    <span className="text-[11px] text-stone-500">Displays 'New Season' gold tag on product cards</span>
                  </div>
                </label>

              </div>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="pt-6 border-t border-[#D4AF37]/30 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Discard Changes
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#FCE5A4]" />
              <span>{isEditing ? 'Save Product Updates' : 'Publish Product to Catalog'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
