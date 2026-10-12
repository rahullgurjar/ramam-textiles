import React, { useState } from 'react';
import { 
  Send, CheckCircle2, Sparkles, Building2, ShieldCheck, Truck, 
  Package, Globe2, Clock, Layers, MessageSquare, Phone, Mail, 
  FileCheck, ArrowRight, RotateCcw, Check, ExternalLink, HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BulkOrderEnquiryFormProps {
  id?: string;
  defaultCategory?: string;
  className?: string;
  onSuccess?: () => void;
}

const CATEGORY_OPTIONS = [
  { id: 'duffle', label: 'Quilted Travel Duffle Bags', minQty: '25 pcs', icon: '🧳' },
  { id: 'pouches', label: 'Block Print Vanity & Cosmetic Pouches', minQty: '50 pcs', icon: '👝' },
  { id: 'totes', label: 'Ruffle Shoulder Totes & Beach Bags', minQty: '30 pcs', icon: '👜' },
  { id: 'tech', label: 'Tech Organizers & Laptop Sleeves', minQty: '30 pcs', icon: '💻' },
  { id: 'fabrics', label: 'Pure Cotton Running Fabric Yardage', minQty: '50 meters', icon: '🧵' },
  { id: 'custom', label: 'Custom Silhouette / Bespoke Design', minQty: '50 pcs', icon: '✨' },
];

const VOLUME_TIERS = [
  { id: 'trial', label: '25 – 50 pcs', desc: 'Sample Trial / Boutique Starter' },
  { id: 'boutique', label: '51 – 150 pcs', desc: 'Popular Boutique Batch' },
  { id: 'wholesale', label: '151 – 500 pcs', desc: 'Commercial Wholesale Volume' },
  { id: 'volume', label: '500+ pcs', desc: 'Enterprise / Export Production' },
  { id: 'fabric_meters', label: '100+ Meters', desc: 'Fabric Rolls by Meter' },
];

const TIMELINE_OPTIONS = [
  { id: 'standard', label: '4 – 6 Weeks (Standard Artisan Handcraft)' },
  { id: 'express', label: '2 – 3 Weeks (Express Air Priority)' },
  { id: 'flexible', label: 'Flexible / Next Season Planning' },
];

const CUSTOMIZATION_OPTIONS = [
  { id: 'tags', label: 'Custom Brand Neck & Wash Care Tags' },
  { id: 'blocks', label: 'Custom Woodblock Carving (Exclusive Motif)' },
  { id: 'sample', label: 'Pre-production Prototype Physical Sample' },
  { id: 'packaging', label: 'Custom Retail Packaging / Barcode Labels' },
  { id: 'origin_cert', label: 'Certificate of Origin (GSP / Export Docs)' },
];

export const BulkOrderEnquiryForm: React.FC<BulkOrderEnquiryFormProps> = ({
  id = 'bulk-enquiry',
  defaultCategory,
  className = '',
  onSuccess
}) => {
  const { showToast, openPolicyModal } = useApp();

  // Form State
  const [fullName, setFullName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return defaultCategory ? [defaultCategory] : ['duffle'];
  });
  const [volumeTier, setVolumeTier] = useState<string>('51 – 150 pcs');
  const [targetTimeline, setTargetTimeline] = useState<string>('4 – 6 Weeks (Standard Artisan Handcraft)');
  const [customizations, setCustomizations] = useState<string[]>(['tags', 'sample']);
  const [notes, setNotes] = useState('');

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryRefId, setEnquiryRefId] = useState('');

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId)
        ? (prev.length > 1 ? prev.filter(c => c !== catId) : prev)
        : [...prev, catId]
    );
  };

  const toggleCustomization = (custOptionId: string) => {
    setCustomizations(prev =>
      prev.includes(custOptionId)
        ? prev.filter(c => c !== custOptionId)
        : [...prev, custOptionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !country.trim()) {
      showToast('Please fill in your name, email, and country.', 'error');
      return;
    }

    if (selectedCategories.length === 0) {
      showToast('Please select at least one product category of interest.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate export server processing & generate Reference ID
    setTimeout(() => {
      const generatedId = `RT-BULK-${Math.floor(10000 + Math.random() * 90000)}`;
      setEnquiryRefId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(`Bulk enquiry #${generatedId} submitted successfully! Our export desk will reply within 24 hours.`, 'success');
      if (onSuccess) onSuccess();
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEnquiryRefId('');
    setNotes('');
  };

  // Pre-formatted WhatsApp inquiry message for instant conversion
  const getWhatsAppMessage = () => {
    const categoriesNames = selectedCategories
      .map(c => CATEGORY_OPTIONS.find(opt => opt.id === c)?.label || c)
      .join(', ');

    const text = `Namaste Ramam Textiles Jaipur,\n\nI have submitted a Bulk Order Enquiry (Ref: ${enquiryRefId || 'NEW'}).\n\n` +
      `• Name: ${fullName}\n` +
      `• Brand / Boutique: ${brandName || 'Independent Retailer'}\n` +
      `• Destination: ${city ? `${city}, ` : ''}${country}\n` +
      `• Categories: ${categoriesNames}\n` +
      `• Order Volume: ${volumeTier}\n` +
      `• Timeline: ${targetTimeline}\n` +
      (notes ? `• Notes: ${notes}\n` : '') +
      `\nPlease share the bulk wholesale catalog and FOB pricing.`;

    return encodeURIComponent(text);
  };

  return (
    <div id={id} className={`w-full ${className}`}>
      <div className="bg-[#FAF5EE] rounded-[32px] sm:rounded-[36px] border border-[#D4AF37]/40 shadow-xl overflow-hidden relative">
        
        {/* Subtle decorative Jaali corner accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-jaipur-jaali opacity-5 pointer-events-none rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-jaipur-jaali opacity-5 pointer-events-none rounded-tr-full" />

        {/* Section Header */}
        <div className="bg-[#241A16] text-[#FAF5EE] px-6 py-8 sm:px-10 sm:py-10 border-b border-[#D4AF37]/30 relative">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold uppercase tracking-widest font-royal-title">
                <Sparkles className="w-3.5 h-3.5 text-[#9B332C]" />
                <span>Direct Jaipur Atelier • Wholesale &amp; Bulk Desk</span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-4xl font-bold tracking-tight text-[#FAF3DC]">
                Bulk Order &amp; Wholesale Enquiry
              </h2>
              <p className="text-stone-300 font-royal-body text-xs sm:text-sm leading-relaxed max-w-2xl">
                Partner directly with our Sanganer &amp; Bagru printing units. Low minimums starting from 25 pieces per style, authentic vegetable dyes, and guaranteed air express door delivery worldwide.
              </p>
            </div>

            {/* Quick Assurance Badges */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0 text-left border-t md:border-t-0 md:border-l border-[#D4AF37]/25 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-xs text-amber-200/90 font-royal-title">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero-Defect 4-Point QC</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-200/90 font-royal-title">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>DHL / FedEx Door Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-200/90 font-royal-title">
                <FileCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Certificate of Origin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-10 max-w-4xl mx-auto relative z-10 font-royal-body">
          {isSubmitted ? (
            /* =========================================================================
               SUCCESS CONFIRMATION STATE
               ========================================================================= */
            <div className="py-8 sm:py-12 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] text-xs font-bold font-mono uppercase tracking-wider">
                  Enquiry Reference: {enquiryRefId}
                </span>
                <h3 className="font-playfair text-3xl font-bold text-[#241A16]">
                  Bulk Enquiry Received!
                </h3>
                <p className="text-stone-700 max-w-xl mx-auto text-sm leading-relaxed">
                  Thank you, <strong className="text-[#241A16]">{fullName}</strong>. Our Senior Export Merchandiser is preparing your bespoke line sheet, volume price matrix, and shipping timeline.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="bg-[#FAF0EB] border border-[#D4AF37]/35 rounded-2xl p-5 text-left max-w-lg mx-auto text-xs space-y-2.5 text-stone-800 shadow-sm">
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span className="font-bold text-[#241A16]">Destination:</span>
                  <span>{city ? `${city}, ` : ''}{country}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span className="font-bold text-[#241A16]">Selected Volume:</span>
                  <span className="font-semibold text-[#9B332C]">{volumeTier}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span className="font-bold text-[#241A16]">Product Categories:</span>
                  <span className="text-right">
                    {selectedCategories.map(c => CATEGORY_OPTIONS.find(o => o.id === c)?.label).filter(Boolean).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#241A16]">Target Delivery:</span>
                  <span>{targetTimeline}</span>
                </div>
              </div>

              {/* Action Buttons for immediate response */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md mx-auto">
                <a
                  href={`https://wa.me/911412890000?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 pill-btn-rose py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 141 289 0000)</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto pill-btn-outline py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Enquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 italic">
                A confirmation has been logged with our Jaipur atelier. Average email response time: 4 to 12 hours.
              </p>
            </div>
          ) : (
            /* =========================================================================
               ACTIVE INTERACTIVE FORM
               ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Product Categories of Interest */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#9B332C] text-[#FAF5EE] inline-flex items-center justify-center text-[11px]">1</span>
                    <span>Product Categories of Interest *</span>
                  </label>
                  <span className="text-[11px] text-stone-500 italic">Select one or more</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORY_OPTIONS.map(cat => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 relative ${
                          isSelected
                            ? 'bg-[#FAF0EB] border-[#9B332C] shadow-md ring-1 ring-[#9B332C]'
                            : 'bg-white border-[#D4AF37]/35 hover:border-[#9B332C]/60 hover:bg-[#FAF5EE]'
                        }`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{cat.icon}</span>
                        <div className="flex-1 pr-5">
                          <h4 className="text-xs font-bold text-[#241A16] leading-snug">{cat.label}</h4>
                          <span className="text-[10px] text-stone-500 font-royal-title">MOQ: {cat.minQty}</span>
                        </div>
                        <div className={`absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center border text-[10px] transition-colors ${
                          isSelected 
                            ? 'bg-[#9B332C] border-[#9B332C] text-white' 
                            : 'border-stone-300 text-transparent'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Order Volume Tier & Delivery Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#D4AF37]/25">
                {/* Volume Tier */}
                <div className="space-y-3">
                  <label className="text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#9B332C] text-[#FAF5EE] inline-flex items-center justify-center text-[11px]">2</span>
                    <span>Target Order Volume *</span>
                  </label>
                  <div className="space-y-2">
                    {VOLUME_TIERS.map(tier => (
                      <label 
                        key={tier.id}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          volumeTier === tier.label
                            ? 'bg-[#FAF0EB] border-[#9B332C] text-[#241A16] font-bold shadow-sm'
                            : 'bg-white border-[#D4AF37]/35 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="volumeTier"
                            value={tier.label}
                            checked={volumeTier === tier.label}
                            onChange={() => setVolumeTier(tier.label)}
                            className="text-[#9B332C] focus:ring-[#9B332C]"
                          />
                          <span>{tier.label}</span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-normal">{tier.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Target Timeline */}
                <div className="space-y-3">
                  <label className="text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#9B332C] text-[#FAF5EE] inline-flex items-center justify-center text-[11px]">3</span>
                    <span>Target Delivery Schedule</span>
                  </label>
                  <div className="space-y-2">
                    {TIMELINE_OPTIONS.map(time => (
                      <label 
                        key={time.id}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          targetTimeline === time.label
                            ? 'bg-[#FAF0EB] border-[#9B332C] text-[#241A16] font-bold shadow-sm'
                            : 'bg-white border-[#D4AF37]/35 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="targetTimeline"
                          value={time.label}
                          checked={targetTimeline === time.label}
                          onChange={() => setTargetTimeline(time.label)}
                          className="text-[#9B332C] focus:ring-[#9B332C]"
                        />
                        <span>{time.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Customization Add-ons */}
                  <div className="pt-2">
                    <span className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-2">
                      Customization Requirements
                    </span>
                    <div className="space-y-1.5">
                      {CUSTOMIZATION_OPTIONS.map(cust => (
                        <label 
                          key={cust.id} 
                          className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none hover:text-[#241A16]"
                        >
                          <input
                            type="checkbox"
                            checked={customizations.includes(cust.id)}
                            onChange={() => toggleCustomization(cust.id)}
                            className="rounded border-stone-300 text-[#9B332C] focus:ring-[#9B332C]"
                          />
                          <span className="text-[11px]">{cust.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact & Business Details */}
              <div className="pt-4 border-t border-[#D4AF37]/25 space-y-4">
                <label className="text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#9B332C] text-[#FAF5EE] inline-flex items-center justify-center text-[11px]">4</span>
                  <span>Buyer &amp; Business Profile</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      Boutique / Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Atelier Botanica"
                      value={brandName}
                      onChange={e => setBrandName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@atelierbotanica.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      WhatsApp / Phone with Country Code *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 415 555 2671"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United States, UK, Australia"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      Destination City / Nearest Airport
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Los Angeles / LAX"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Specific Project Notes / Reference */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold">
                    Additional Specifications, Colorway or Reference Notes
                  </label>
                  <span className="text-[10px] text-stone-500">Optional</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Specify target prints (e.g. Kantha patchwork, marigold floral), lining requirements, zipper finishes, or custom dimensions..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] transition-all leading-relaxed"
                />
              </div>

              {/* Submission Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>60% Advance Milestone • Direct Export Rates</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPolicyModal('privacy')}
                    className="text-[#9B332C] underline font-bold hover:text-[#241A16] cursor-pointer sm:ml-2 text-[11px]"
                  >
                    View Store Policies →
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto pill-btn-rose px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Quotation...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Bulk Order Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Direct Connect Footer Banner */}
        <div className="bg-[#FAF0EB] px-6 py-4 sm:px-10 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="text-base">💬</span>
            <span>
              Prefer instant dialogue? WhatsApp our Jaipur Export Director directly:{' '}
              <a
                href="https://wa.me/911412890000"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#9B332C] hover:underline"
              >
                +91 141 289 0000
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-500 font-royal-title uppercase tracking-wider">
            <span>Hours: 09:30 – 19:30 IST</span>
            <span>•</span>
            <span>Worldwide Air Delivery</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BulkOrderEnquiryForm;
