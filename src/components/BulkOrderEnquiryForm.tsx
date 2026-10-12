import React, { useState } from 'react';
import { 
  Send, CheckCircle2, ShieldCheck,
  RotateCcw, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InstagramIcon } from './InstagramIcon';

interface BulkOrderEnquiryFormProps {
  id?: string;
  defaultCategory?: string;
  className?: string;
  onSuccess?: () => void;
}

export const PRODUCT_OPTIONS = [
  'Patchwork Duffle Bags',
  'Quilted Tote Bags',
  'Ruffled Tote Bags',
  'Yoga Mat Bags',
  'Quilted Laptop Sleeves',
  'Hair Tool & Travel Organizers',
  'Vanity Boxes & Pouches',
  'Mini Tote Bags',
  'Indigo Flat Pouches',
  'Custom Gifting Hampers',
  'Assorted Mix Collection',
];

const VOLUME_TIERS = [
  { id: 'trial', label: '25 – 50 pcs', desc: 'Sample Trial / Boutique Starter' },
  { id: 'boutique', label: '51 – 150 pcs', desc: 'Popular Boutique Batch' },
  { id: 'wholesale', label: '151 – 500 pcs', desc: 'Commercial Wholesale Volume' },
  { id: 'volume', label: '500+ pcs', desc: 'Enterprise / Export Production' },
  { id: 'fabric_meters', label: '100+ Meters', desc: 'Fabric Rolls by Meter' },
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
  const [address, setAddress] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(() => {
    if (defaultCategory) {
      const match = PRODUCT_OPTIONS.find(p => p.toLowerCase().includes(defaultCategory.toLowerCase()));
      if (match) return [match];
    }
    return ['Quilted Tote Bags', 'Vanity Boxes & Pouches'];
  });
  const [volumeTier, setVolumeTier] = useState<string>('51 – 150 pcs');
  const [customizations, setCustomizations] = useState<string[]>(['tags', 'sample']);
  const [notes, setNotes] = useState('');

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryRefId, setEnquiryRefId] = useState('');

  const toggleProduct = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product)
        ? (prev.length > 1 ? prev.filter(p => p !== product) : prev)
        : [...prev, product]
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

    if (!fullName.trim() || !email.trim() || !address.trim()) {
      showToast('Please fill in your name, email, and delivery address.', 'error');
      return;
    }

    if (selectedProducts.length === 0) {
      showToast('Please select at least one product of interest.', 'error');
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

  return (
    <div id={id} className={`w-full ${className}`}>
      <div className="bg-[#FAF5EE] rounded-[32px] sm:rounded-[36px] border border-[#D4AF37]/40 shadow-xl overflow-hidden relative">
        
        {/* Subtle decorative Jaali corner accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-jaipur-jaali opacity-5 pointer-events-none rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-jaipur-jaali opacity-5 pointer-events-none rounded-tr-full" />

        {/* Section Header */}
        <div className="p-6 sm:p-10 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#FAF0EB] via-[#FAF5EE] to-[#FAF0EB] relative">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EACAC0] text-[#9B332C] text-xs font-bold font-royal-title uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#9B332C] animate-pulse" />
              <span>Direct Jaipur Atelier Quotation Desk</span>
            </div>
            
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#241A16] tracking-tight">
              Submit Your Bulk Order / Wholesale Enquiry
            </h2>
            
            <p className="text-stone-600 font-royal-body text-xs sm:text-sm leading-relaxed">
              Partner directly with our Sanganer &amp; Bagru printing units. Low minimums starting from 25 pieces per style, authentic vegetable dyes, and guaranteed air express door delivery worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#241A16] font-semibold">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Low 25 Pcs MOQ</span>
              </span>
              <span className="text-stone-400">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>DHL / FedEx Door Delivery</span>
              </span>
              <span className="text-stone-400">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sample Approval Before Batch Crafting</span>
              </span>
            </div>
          </div>
        </div>

        {/* Form Body Container */}
        <div className="p-6 sm:p-10">
          {isSubmitted ? (
            /* =========================================================================
               SUBMISSION SUCCESS CONFIRMATION
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
                  Thank you, <strong className="text-[#241A16]">{fullName}</strong>. Our Senior Export Merchandiser is preparing your bespoke line sheet and volume price matrix.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="bg-[#FAF0EB] border border-[#D4AF37]/35 rounded-2xl p-5 text-left max-w-lg mx-auto text-xs space-y-2.5 text-stone-800 shadow-sm">
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span className="font-bold text-[#241A16]">Delivery Address:</span>
                  <span className="text-right max-w-[260px] truncate">{address}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span className="font-bold text-[#241A16]">Selected Volume:</span>
                  <span className="font-semibold text-[#9B332C]">{volumeTier}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                  <span className="font-bold text-[#241A16]">Products of Interest:</span>
                  <span className="text-right max-w-[260px] font-semibold text-[#241A16] line-clamp-2">
                    {selectedProducts.join(', ')}
                  </span>
                </div>
              </div>

              {/* Action Buttons for immediate response */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md mx-auto">
                <a
                  href="https://www.instagram.com/ramamtextiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 pill-btn-rose py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
                >
                  <InstagramIcon className="w-4 h-4 text-white" />
                  <span>Message @ramamtextiles on Instagram</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto pill-btn-outline py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Enquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 italic">
                A confirmation has been logged with our Jaipur atelier. Average response time: 4 to 12 hours.
              </p>
            </div>
          ) : (
            /* =========================================================================
               ACTIVE INTERACTIVE FORM
               ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Products of Interest (matching craftofpinkcity pill layout) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#9B332C] text-[#FAF5EE] inline-flex items-center justify-center text-[11px]">1</span>
                    <span>Products of Interest (Select all that apply) *</span>
                  </label>
                  <span className="text-[11px] text-stone-500 italic">{selectedProducts.length} selected</span>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {PRODUCT_OPTIONS.map(product => {
                    const isSelected = selectedProducts.includes(product);
                    return (
                      <button
                        key={product}
                        type="button"
                        onClick={() => toggleProduct(product)}
                        className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#B81D5B] text-white shadow-md ring-2 ring-[#B81D5B]/30'
                            : 'bg-white border border-[#D4AF37]/40 text-[#241A16] hover:border-[#B81D5B]/60 hover:text-[#B81D5B] hover:bg-[#FAF5EE]'
                        }`}
                      >
                        <span className="font-bold">{isSelected ? '✓' : '+'}</span>
                        <span>{product}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Order Volume Tier & Customization Add-ons */}
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

                {/* Customization Add-ons */}
                <div className="space-y-3">
                  <label className="text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#9B332C] text-[#FAF5EE] inline-flex items-center justify-center text-[11px]">3</span>
                    <span>Customization Requirements</span>
                  </label>
                  <div className="bg-white border border-[#D4AF37]/35 rounded-xl p-3.5 space-y-2.5 shadow-sm">
                    {CUSTOMIZATION_OPTIONS.map(cust => (
                      <label 
                        key={cust.id} 
                        className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer select-none hover:text-[#241A16]"
                      >
                        <input
                          type="checkbox"
                          checked={customizations.includes(cust.id)}
                          onChange={() => toggleCustomization(cust.id)}
                          className="rounded border-stone-300 text-[#9B332C] focus:ring-[#9B332C]"
                        />
                        <span className="text-xs font-medium">{cust.label}</span>
                      </label>
                    ))}
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

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                      Delivery / Shipping Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Complete courier shipping address with Street, City, State, Postal PIN & Country"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
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
              Prefer instant dialogue? Connect directly on Instagram{' '}
              <a
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#9B332C] hover:underline"
              >
                @ramamtextiles
              </a>
              {' '}or email{' '}
              <a
                href="mailto:ramamtextiles@gmail.com"
                className="font-bold text-[#9B332C] hover:underline"
              >
                ramamtextiles@gmail.com
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
