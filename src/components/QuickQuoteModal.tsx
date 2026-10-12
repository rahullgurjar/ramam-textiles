import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Layers, Sparkles, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { InstagramIcon } from './InstagramIcon';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { submitToGoogleSheet } from '../utils/googleScript';

export const QuickQuoteModal: React.FC = () => {
  const { isQuickQuoteOpen, closeQuickQuote, activeQuoteProduct, showToast } = useApp();
  
  const [inquiryType, setInquiryType] = useState<'bulk' | 'sample' | 'swatch'>('bulk');
  const [name, setName] = useState('');
  const [company, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [quantity, setQuantity] = useState(activeQuoteProduct ? activeQuoteProduct.moq : 50);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isQuickQuoteOpen || !activeQuoteProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please provide your name and business email address.', 'error');
      return;
    }
    submitToGoogleSheet({
      formType: 'Quick Quote & Sample Request',
      inquiryType,
      productSku: activeQuoteProduct.sku,
      productName: activeQuoteProduct.name,
      name,
      company,
      email,
      country,
      quantity,
      notes,
      submittedAt: new Date().toISOString()
    });
    setIsSubmitted(true);
    showToast(`Inquiry for ${activeQuoteProduct.name} received! Our Jaipur desk will reply shortly.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 flex items-center justify-center animate-fade-in font-royal-body">
      <div className="w-full max-w-xl bg-[#FAF5EE] rounded-[28px] shadow-2xl border border-[#D4AF37]/45 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#FAF0EB] via-[#F8EDE6] to-[#FAF5EE] text-[#241A16] border-b border-[#D4AF37]/35 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#9B332C]" />
            <div>
              <h3 className="font-royal-title text-sm font-bold text-[#241A16] uppercase tracking-wider">
                Wholesale Quote &amp; Sample Request
              </h3>
              <span className="text-[10px] text-stone-600 font-medium">Direct Jaipur Atelier Manufacturer Desk</span>
            </div>
          </div>
          <button 
            onClick={closeQuickQuote}
            className="p-1.5 rounded-full text-stone-600 hover:text-white hover:bg-[#9B332C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] rounded-full mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#9B332C]" />
              </div>
              <div>
                <h4 className="font-playfair text-lg font-bold text-[#241A16]">
                  Quotation Request Dispatched
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-1 leading-relaxed font-light">
                  Thank you, <strong>{name}</strong>. Your inquiry for <strong>{activeQuoteProduct.name}</strong> (Qty: {quantity} pcs) has been routed to our Jaipur desk. We will follow up within 4–6 business hours.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href="https://www.instagram.com/ramamtextiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn-rose text-xs px-5 py-2.5 rounded-full inline-flex items-center justify-center gap-2 shadow"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-white" />
                  <span>DM on Instagram @ramamtextiles</span>
                </a>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    closeQuickQuote();
                  }}
                  className="pill-btn-rani text-xs px-6 py-2.5 rounded-full shadow"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Spotlight Header */}
              <div className="p-3.5 bg-[#F5EDE1] rounded-2xl border border-[#D4AF37]/35 flex gap-3 shadow-sm">
                <picture className="w-14 h-16 shrink-0 block">
                  <source srcSet={resolveWebpImage(activeQuoteProduct.images[0])} type="image/webp" />
                  <img 
                    src={resolveProductImage(activeQuoteProduct.images[0])} 
                    alt={activeQuoteProduct.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-16 object-cover rounded-xl border border-[#D4AF37]/30 shadow-sm"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.dataset.fallbackTried) {
                        target.dataset.fallbackTried = 'true';
                        target.src = resolveProductImage('./products/duffle-kantha-patchwork.jpg');
                      }
                    }}
                  />
                </picture>
                <div className="flex-1 text-xs">
                  <span className="text-[10px] text-[#9B332C] font-bold uppercase font-royal-title">SKU: {activeQuoteProduct.sku}</span>
                  <h4 className="font-playfair font-bold text-[#241A16] line-clamp-1">{activeQuoteProduct.name}</h4>
                  <p className="text-[11px] text-stone-600 font-light">{activeQuoteProduct.fabric}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-stone-600 font-bold">
                    <span>MOQ: {activeQuoteProduct.moq} Pcs</span>
                    <span>•</span>
                    <span>Lead Time: {activeQuoteProduct.leadTime}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-[10px] font-bold text-[#241A16] uppercase tracking-wider mb-1.5 font-royal-title">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setInquiryType('bulk')}
                    className={`py-2 px-3 rounded-full text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'bulk' 
                        ? 'bg-[#9B332C] text-white border-[#9B332C] shadow-sm' 
                        : 'bg-[#F5EDE1] text-[#241A16] border-[#D4AF37]/35 hover:border-[#9B332C]'
                    }`}
                  >
                    Bulk Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('sample')}
                    className={`py-2 px-3 rounded-full text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'sample' 
                        ? 'bg-[#9B332C] text-white border-[#9B332C] shadow-sm' 
                        : 'bg-[#F5EDE1] text-[#241A16] border-[#D4AF37]/35 hover:border-[#9B332C]'
                    }`}
                  >
                    Proto-Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('swatch')}
                    className={`py-2 px-3 rounded-full text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'swatch' 
                        ? 'bg-[#9B332C] text-white border-[#9B332C] shadow-sm' 
                        : 'bg-[#F5EDE1] text-[#241A16] border-[#D4AF37]/35 hover:border-[#9B332C]'
                    }`}
                  >
                    Swatch Folder
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#241A16] uppercase mb-0.5 font-royal-title">Your Full Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Full name" 
                    className="w-full px-3 py-2 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#241A16] uppercase mb-0.5 font-royal-title">Company / Label Name</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={e => setCompanyName(e.target.value)} 
                    placeholder="Boutique / Company" 
                    className="w-full px-3 py-2 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#241A16] uppercase mb-0.5 font-royal-title">Official Business Email Address *</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="name@domain.com" 
                    className="w-full px-3 py-2 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#241A16] uppercase mb-0.5 font-royal-title">Estimated Quantity (Units)</label>
                  <input 
                    type="number" 
                    min={inquiryType === 'sample' ? 1 : activeQuoteProduct.moq} 
                    value={quantity} 
                    onChange={e => setQuantity(Number(e.target.value))} 
                    className="w-full px-3 py-2 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#241A16] uppercase mb-0.5 font-royal-title">Destination Country</label>
                  <input 
                    type="text" 
                    value={country} 
                    onChange={e => setCountry(e.target.value)} 
                    placeholder="e.g. India, USA, UK" 
                    className="w-full px-3 py-2 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#241A16] uppercase mb-0.5 font-royal-title">Specific Requirements</label>
                <textarea 
                  rows={2} 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="Mention custom colors, custom batch requirements, target FOB pricing..."
                  className="w-full px-3 py-2 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full pill-btn-rose py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-full shadow-lg"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Request Tiered Wholesale Quotation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteModal;
