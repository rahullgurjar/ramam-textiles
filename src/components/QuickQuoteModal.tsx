import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Layers, Sparkles, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

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
    setIsSubmitted(true);
    showToast(`Inquiry for ${activeQuoteProduct.name} received! Our Jaipur desk will reply shortly.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-xl bg-[#FAF7EE] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#0B241C] text-[#FAF7EE] border-b border-[#D4AF37]/40 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-royal-title text-sm font-bold text-[#FAF7EE] uppercase tracking-wider">
                👑 Wholesale Quote &amp; Sample Request
              </h3>
              <span className="text-[10px] text-emerald-200/80 font-light">Direct Jaipur Atelier Manufacturer Desk</span>
            </div>
          </div>
          <button 
            onClick={closeQuickQuote}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#061711] border-2 border-[#D4AF37] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-royal-heading text-lg font-bold text-[#0B241C]">
                  Quotation Request Dispatched
                </h4>
                <p className="text-xs text-[#164335]/80 max-w-md mx-auto mt-1 leading-relaxed font-light">
                  Thank you, <strong>{name}</strong>. Your inquiry for <strong>{activeQuoteProduct.name}</strong> (Qty: {quantity} pcs) has been routed to our Jaipur desk. We will email the official quotation to <strong>{email}</strong> within 4–6 business hours.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    closeQuickQuote();
                  }}
                  className="btn-royal-emerald text-xs"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Spotlight Header */}
              <div className="p-3 bg-white rounded-xl border border-[#D4AF37]/35 flex gap-3 shadow-sm">
                <img 
                  src={activeQuoteProduct.images[0]} 
                  alt={activeQuoteProduct.name} 
                  className="w-14 h-16 object-cover rounded-lg border border-[#D4AF37]/30 shadow-sm"
                />
                <div className="flex-1 text-xs">
                  <span className="text-[10px] text-[#11352A] font-bold uppercase font-royal-title">SKU: {activeQuoteProduct.sku}</span>
                  <h4 className="font-royal-heading font-bold text-[#0B241C] line-clamp-1">{activeQuoteProduct.name}</h4>
                  <p className="text-[11px] text-[#164335]/80 font-light">{activeQuoteProduct.fabric}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-[#0B241C] font-bold">
                    <span>MOQ: {activeQuoteProduct.moq} Pcs</span>
                    <span>•</span>
                    <span>Lead Time: {activeQuoteProduct.leadTime}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-[10px] font-bold text-[#164335] uppercase tracking-wider mb-1.5 font-royal-title">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setInquiryType('bulk')}
                    className={`py-2 px-3 rounded-lg text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'bulk' 
                        ? 'bg-[#11352A] text-[#FAF7EE] border-[#D4AF37]/50 shadow-sm' 
                        : 'bg-white text-[#0B241C] border-[#D4AF37]/30'
                    }`}
                  >
                    Bulk Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('sample')}
                    className={`py-2 px-3 rounded-lg text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'sample' 
                        ? 'bg-[#11352A] text-[#FAF7EE] border-[#D4AF37]/50 shadow-sm' 
                        : 'bg-white text-[#0B241C] border-[#D4AF37]/30'
                    }`}
                  >
                    Proto-Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('swatch')}
                    className={`py-2 px-3 rounded-lg text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'swatch' 
                        ? 'bg-[#11352A] text-[#FAF7EE] border-[#D4AF37]/50 shadow-sm' 
                        : 'bg-white text-[#0B241C] border-[#D4AF37]/30'
                    }`}
                  >
                    Swatch Folder
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#164335] uppercase mb-0.5 font-royal-title">Your Full Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Full name" 
                    className="form-input text-xs py-1.5" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#164335] uppercase mb-0.5 font-royal-title">Company / Label Name</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={e => setCompanyName(e.target.value)} 
                    placeholder="Boutique / Company" 
                    className="form-input text-xs py-1.5" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#164335] uppercase mb-0.5 font-royal-title">Official Business Email Address *</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="name@domain.com" 
                    className="form-input text-xs py-1.5" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#164335] uppercase mb-0.5 font-royal-title">Estimated Quantity (Units)</label>
                  <input 
                    type="number" 
                    min={inquiryType === 'sample' ? 1 : activeQuoteProduct.moq} 
                    value={quantity} 
                    onChange={e => setQuantity(Number(e.target.value))} 
                    className="form-input text-xs py-1.5" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#164335] uppercase mb-0.5 font-royal-title">Destination Country</label>
                  <input 
                    type="text" 
                    value={country} 
                    onChange={e => setCountry(e.target.value)} 
                    placeholder="e.g. India, USA, UK" 
                    className="form-input text-xs py-1.5" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#164335] uppercase mb-0.5 font-royal-title">Specific Requirements</label>
                <textarea 
                  rows={2} 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="Mention custom colors, private label requirements, target FOB pricing..."
                  className="form-input text-xs"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-royal-gold flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="w-4 h-4 text-[#0B241C]" />
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
