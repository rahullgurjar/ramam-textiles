import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Phone, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const QuickQuoteModal: React.FC = () => {
  const { isQuickQuoteOpen, closeQuickQuote, activeQuoteProduct, showToast } = useApp();
  
  const [inquiryType, setInquiryType] = useState<'bulk' | 'sample' | 'swatch'>('bulk');
  const [name, setName] = useState('');
  const [company, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [quantity, setQuantity] = useState(activeQuoteProduct ? activeQuoteProduct.moq : 50);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isQuickQuoteOpen || !activeQuoteProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please provide your name, email and contact number.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast(`Inquiry for ${activeQuoteProduct.name} received! Our Jaipur desk will reply shortly.`, 'success');
  };

  const handleWhatsAppQuick = () => {
    const text = `*RAMAM TEXTILES QUOTE INQUIRY*%0A*Product:* ${activeQuoteProduct.name}%0A*SKU:* ${activeQuoteProduct.sku}%0A*Inquiry Type:* ${inquiryType.toUpperCase()}%0A*Target Qty:* ${quantity} units%0A*Buyer:* ${name || 'B2B Client'} (${company || 'Boutique'})%0A*Country:* ${country}%0A*Notes:* ${notes || 'Please provide tiered pricing and lead time'}`;
    window.open(`https://wa.me/919351291471?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-xl bg-[#FAF7F2] rounded-lg shadow-2xl border border-[#C4A674]/40 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#0C1813] text-[#FAF7F2] border-b border-[#254234] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#DFCA9F]" />
            <div>
              <h3 className="font-heading text-sm font-bold text-[#DFCA9F] uppercase tracking-wider">
                Wholesale Quote &amp; Sample Request
              </h3>
              <span className="text-[10px] text-[#A3AFA8]">Direct Jaipur Atelier Manufacturer Desk</span>
            </div>
          </div>
          <button 
            onClick={closeQuickQuote}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#13241C] border-2 border-[#25D366] text-[#25D366] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-[#0C1813]">
                  Quotation Request Dispatched
                </h4>
                <p className="text-xs text-[#4F5A54] max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your inquiry for <strong>{activeQuoteProduct.name}</strong> (Qty: {quantity} pcs) has been routed to our production desk.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleWhatsAppQuick}
                  className="py-2.5 px-4 bg-[#25D366] text-white text-xs font-bold uppercase rounded flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    closeQuickQuote();
                  }}
                  className="py-2.5 px-4 bg-[#0C1813] text-[#DFCA9F] text-xs font-bold uppercase rounded"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Spotlight Header */}
              <div className="p-3 bg-white rounded border border-[#121815]/10 flex gap-3">
                <img 
                  src={activeQuoteProduct.images[0]} 
                  alt={activeQuoteProduct.name} 
                  className="w-14 h-16 object-cover rounded border border-black/5"
                />
                <div className="flex-1 text-xs">
                  <span className="text-[10px] text-[#8A4A3B] font-bold uppercase">SKU: {activeQuoteProduct.sku}</span>
                  <h4 className="font-heading font-semibold text-[#0C1813] line-clamp-1">{activeQuoteProduct.name}</h4>
                  <p className="text-[11px] text-[#7E8A83]">{activeQuoteProduct.fabric}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-[#254234] font-semibold">
                    <span>MOQ: {activeQuoteProduct.moq} Pcs</span>
                    <span>•</span>
                    <span>Lead Time: {activeQuoteProduct.leadTime}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-[10px] font-bold text-[#4F5A54] uppercase tracking-wider mb-1.5">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setInquiryType('bulk')}
                    className={`py-2 px-3 rounded text-center font-semibold transition-all border ${
                      inquiryType === 'bulk' 
                        ? 'bg-[#0C1813] text-[#DFCA9F] border-[#0C1813]' 
                        : 'bg-white text-[#4F5A54] border-[#121815]/15'
                    }`}
                  >
                    Bulk Production
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('sample')}
                    className={`py-2 px-3 rounded text-center font-semibold transition-all border ${
                      inquiryType === 'sample' 
                        ? 'bg-[#0C1813] text-[#DFCA9F] border-[#0C1813]' 
                        : 'bg-white text-[#4F5A54] border-[#121815]/15'
                    }`}
                  >
                    Proto-Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('swatch')}
                    className={`py-2 px-3 rounded text-center font-semibold transition-all border ${
                      inquiryType === 'swatch' 
                        ? 'bg-[#0C1813] text-[#DFCA9F] border-[#0C1813]' 
                        : 'bg-white text-[#4F5A54] border-[#121815]/15'
                    }`}
                  >
                    Swatch Deck
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">Your Full Name *</label>
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
                  <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">Company / Label Name</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={e => setCompanyName(e.target.value)} 
                    placeholder="Boutique / Company" 
                    className="form-input text-xs py-1.5" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">Email Address *</label>
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
                  <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">WhatsApp / Phone *</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="+91 / +1..." 
                    className="form-input text-xs py-1.5" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">Estimated Quantity (Units)</label>
                  <input 
                    type="number" 
                    min={inquiryType === 'sample' ? 1 : activeQuoteProduct.moq} 
                    value={quantity} 
                    onChange={e => setQuantity(Number(e.target.value))} 
                    className="form-input text-xs py-1.5" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">Destination Country</label>
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
                <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">Specific Requirements</label>
                <textarea 
                  rows={2} 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="Mention custom colors, private label requirements, target FOB pricing..."
                  className="form-input text-xs"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0C1813] text-[#DFCA9F] hover:bg-[#13241C] text-xs font-bold uppercase rounded border border-[#C4A674]/50 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#C4A674]" />
                  <span>Request Tiered Quote Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppQuick}
                  className="py-2.5 px-3 bg-[#25D366] text-white text-xs font-bold uppercase rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Inquire immediately on WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
