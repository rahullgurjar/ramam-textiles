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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 flex items-center justify-center animate-fade-in font-royal-body">
      <div className="w-full max-w-xl bg-white rounded-[28px] shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#1F1612] text-[#FAF3DC] border-b border-[#D4AF37]/30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#E5A93C]" />
            <div>
              <h3 className="font-royal-title text-sm font-bold text-white uppercase tracking-wider">
                👑 Wholesale Quote &amp; Sample Request
              </h3>
              <span className="text-[10px] text-stone-300 font-light">Direct Jaipur Atelier Manufacturer Desk</span>
            </div>
          </div>
          <button 
            onClick={closeQuickQuote}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#FDF0F3] border-2 border-[#C8376B] text-[#C8376B] rounded-full mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-[#C8376B]" />
              </div>
              <div>
                <h4 className="font-playfair text-lg font-bold text-[#1F1612]">
                  Quotation Request Dispatched
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-1 leading-relaxed font-light">
                  Thank you, <strong>{name}</strong>. Your inquiry for <strong>{activeQuoteProduct.name}</strong> (Qty: {quantity} pcs) has been routed to our Jaipur desk. We will email the official quotation to <strong>{email}</strong> within 4–6 business hours.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    closeQuickQuote();
                  }}
                  className="pill-btn-dark text-xs px-6 py-2.5"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Spotlight Header */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-stone-200 flex gap-3 shadow-sm">
                <img 
                  src={activeQuoteProduct.images[0]} 
                  alt={activeQuoteProduct.name} 
                  className="w-14 h-16 object-cover rounded-xl border border-stone-200 shadow-sm"
                />
                <div className="flex-1 text-xs">
                  <span className="text-[10px] text-[#C8376B] font-bold uppercase font-royal-title">SKU: {activeQuoteProduct.sku}</span>
                  <h4 className="font-playfair font-bold text-[#1F1612] line-clamp-1">{activeQuoteProduct.name}</h4>
                  <p className="text-[11px] text-stone-600 font-light">{activeQuoteProduct.fabric}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-stone-500 font-bold">
                    <span>MOQ: {activeQuoteProduct.moq} Pcs</span>
                    <span>•</span>
                    <span>Lead Time: {activeQuoteProduct.leadTime}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-[10px] font-bold text-[#1F1612] uppercase tracking-wider mb-1.5 font-royal-title">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setInquiryType('bulk')}
                    className={`py-2 px-3 rounded-full text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'bulk' 
                        ? 'bg-[#C8376B] text-white border-[#C8376B] shadow-sm' 
                        : 'bg-white text-[#1F1612] border-stone-200 hover:border-[#C8376B]'
                    }`}
                  >
                    Bulk Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('sample')}
                    className={`py-2 px-3 rounded-full text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'sample' 
                        ? 'bg-[#C8376B] text-white border-[#C8376B] shadow-sm' 
                        : 'bg-white text-[#1F1612] border-stone-200 hover:border-[#C8376B]'
                    }`}
                  >
                    Proto-Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('swatch')}
                    className={`py-2 px-3 rounded-full text-center font-bold font-royal-title transition-all border ${
                      inquiryType === 'swatch' 
                        ? 'bg-[#C8376B] text-white border-[#C8376B] shadow-sm' 
                        : 'bg-white text-[#1F1612] border-stone-200 hover:border-[#C8376B]'
                    }`}
                  >
                    Swatch Folder
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">Your Full Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Full name" 
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">Company / Label Name</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={e => setCompanyName(e.target.value)} 
                    placeholder="Boutique / Company" 
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">Official Business Email Address *</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="name@domain.com" 
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">Estimated Quantity (Units)</label>
                  <input 
                    type="number" 
                    min={inquiryType === 'sample' ? 1 : activeQuoteProduct.moq} 
                    value={quantity} 
                    onChange={e => setQuantity(Number(e.target.value))} 
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">Destination Country</label>
                  <input 
                    type="text" 
                    value={country} 
                    onChange={e => setCountry(e.target.value)} 
                    placeholder="e.g. India, USA, UK" 
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">Specific Requirements</label>
                <textarea 
                  rows={2} 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="Mention custom colors, private label requirements, target FOB pricing..."
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]"
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
