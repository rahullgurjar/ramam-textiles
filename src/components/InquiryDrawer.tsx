import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Send, 
  FileText, 
  CheckCircle2, 
  Globe, 
  Printer, 
  Building, 
  Mail,
  User,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const InquiryDrawer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { 
    inquiryItems, 
    isInquiryDrawerOpen, 
    closeInquiryDrawer, 
    removeFromInquiry, 
    updateInquiryQuantity, 
    clearInquiry,
    showToast 
  } = useApp();

  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rfqSubmittedId, setRfqSubmittedId] = useState<string | null>(null);

  if (!isInquiryDrawerOpen) return null;

  const totalQuantity = inquiryItems.reduce((sum, item) => sum + item.quantity, 0);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleSubmitOfficialRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !email) {
      showToast('Please fill in your Name and Official Email address.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `RFQ-RT-${Math.floor(100000 + Math.random() * 900000)}`;
      setRfqSubmittedId(generatedId);
      setIsSubmitting(false);
      triggerConfetti();
      showToast(`Quotation inquiry #${generatedId} submitted successfully!`, 'success');
    }, 900);
  };

  const handlePrintQuotation = () => {
    window.print();
  };

  const handleReset = () => {
    setRfqSubmittedId(null);
    clearInquiry();
    closeInquiryDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#FAF6EE] shadow-2xl flex flex-col justify-between overflow-hidden border-l-2 border-[#D4AF37]/50">
          
          {/* Header */}
          <div className="p-5 bg-[#4D0E0D] text-[#FAF3DC] border-b border-[#D4AF37]/40 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#380708] border border-[#D4AF37]/50 flex items-center justify-center shadow-inner">
                <ShoppingBag className="w-5 h-5 text-[#F5E6B5]" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-[#FAF3DC] uppercase tracking-wider flex items-center gap-1.5">
                  <span>👑 Wholesale RFQ Basket</span>
                </h3>
                <span className="text-[11px] text-stone-300 font-light">
                  {inquiryItems.length} Products | {totalQuantity} Total Units Selected
                </span>
              </div>
            </div>

            <button 
              onClick={closeInquiryDrawer}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close inquiry drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {rfqSubmittedId ? (
              /* Success State */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#380708] border-2 border-[#D4AF37] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-[#25D366]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#942220] uppercase tracking-widest font-heading">
                    Request Received
                  </span>
                  <h4 className="font-heading text-xl font-bold text-[#4D0E0D]">
                    Wholesale RFQ #{rfqSubmittedId}
                  </h4>
                  <p className="text-xs text-[#5C4540] max-w-sm mx-auto leading-relaxed font-light">
                    Thank you, <strong>{contactName}</strong> ({companyName || 'B2B Client'}). Our export and production desk in Jaipur will review your specifications and email you the official tiered quotation within 4–6 business hours.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/35 text-left space-y-2 text-xs shadow-sm">
                  <div className="flex justify-between pb-2 border-b border-[#D4AF37]/20 font-bold text-[#4D0E0D] font-heading">
                    <span>Summary Overview</span>
                    <span>{totalQuantity} Units</span>
                  </div>
                  <div className="text-[#5C4540] space-y-1 font-light">
                    <p>• <strong>Buyer:</strong> {contactName} ({email})</p>
                    <p>• <strong>Company:</strong> {companyName || 'B2B Client'}</p>
                    <p>• <strong>Destination:</strong> {country}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handlePrintQuotation}
                    className="w-full btn-royal-rose flex items-center justify-center gap-1.5 shadow"
                  >
                    <Printer className="w-4 h-4 text-[#D4AF37]" />
                    <span>Download / Print RFQ Summary</span>
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs font-bold text-[#942220] hover:underline font-heading"
                >
                  Start New Inquiry or Continue Browsing
                </button>
              </div>
            ) : inquiryItems.length === 0 ? (
              /* Empty Basket State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#F3EADB] rounded-full mx-auto flex items-center justify-center text-[#751B19] border border-[#D4AF37]/40 shadow-inner">
                  <ShoppingBag className="w-8 h-8 opacity-60 text-[#D4AF37]" />
                </div>
                <h4 className="font-heading text-lg text-[#4D0E0D] font-bold">
                  Your Wholesale Basket is Empty
                </h4>
                <p className="text-xs text-[#5C4540] max-w-xs mx-auto font-light">
                  Browse our apparel collections, quilted bags, and fabrics by meter to add items to your official quotation inquiry.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      closeInquiryDrawer();
                      onNavigate('/shop');
                    }}
                    className="btn-royal-gold text-xs"
                  >
                    Browse Catalog
                  </button>
                  <button
                    onClick={() => {
                      closeInquiryDrawer();
                      onNavigate('/custom-manufacturing');
                    }}
                    className="btn-royal-sand-outline text-xs"
                  >
                    Custom Project
                  </button>
                </div>
              </div>
            ) : (
              /* Itemized Product List */
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#D4AF37]/30">
                    <span className="text-xs font-bold text-[#942220] uppercase tracking-wider font-heading">
                      Selected Items ({inquiryItems.length})
                    </span>
                    <button
                      onClick={clearInquiry}
                      className="text-[11px] text-[#942220] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {inquiryItems.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="bg-white p-3.5 rounded-xl border border-[#D4AF37]/35 flex gap-3 shadow-sm relative group hover:border-[#D4AF37] transition-all"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-16 h-20 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0 shadow-sm"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-heading text-xs font-bold text-[#4D0E0D] line-clamp-1">
                              {item.product.name}
                            </h5>
                            <button
                              onClick={() => removeFromInquiry(item.product.id, item.selectedColor, item.selectedSize)}
                              className="text-gray-400 hover:text-[#942220] p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-[#7A5450] block mt-0.5">
                            SKU: {item.product.sku} | Color: <strong>{item.selectedColor}</strong> | Size: <strong>{item.selectedSize}</strong>
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D4AF37]/20">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateInquiryQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 5)}
                              className="w-6 h-6 rounded bg-[#F3EADB] text-[#4D0E0D] font-bold text-xs flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#381A03] transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center text-xs font-bold text-[#4D0E0D]">
                              {item.quantity} pcs
                            </span>
                            <button
                              onClick={() => updateInquiryQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 5)}
                              className="w-6 h-6 rounded bg-[#F3EADB] text-[#4D0E0D] font-bold text-xs flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#381A03] transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-[10px] text-[#4D0E0D] font-bold bg-[#FFF5F5] border border-[#D4AF37]/35 px-2 py-0.5 rounded-full font-heading">
                            MOQ {item.product.moq}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buyer Information Form */}
                <form onSubmit={handleSubmitOfficialRfq} className="bg-[#FFF5F5] p-4 rounded-xl border border-[#D4AF37]/40 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-[#D4AF37]/30">
                    <Building className="w-4 h-4 text-[#942220]" />
                    <span className="text-xs font-bold text-[#4D0E0D] uppercase tracking-wider font-heading">
                      Buyer &amp; Delivery Information
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#7A5450] uppercase mb-0.5 font-heading">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. Elena Rossi"
                        className="form-input text-xs py-1.5"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#7A5450] uppercase mb-0.5 font-heading">
                        Company / Boutique Name
                      </label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="e.g. Silk & Sand Studios"
                        className="form-input text-xs py-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#7A5450] uppercase mb-0.5 font-heading">
                      Official Business Email *
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="buyer@domain.com"
                      className="form-input text-xs py-1.5"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#7A5450] uppercase mb-0.5 font-heading">
                        Destination Country
                      </label>
                      <select 
                        value={country} 
                        onChange={e => setCountry(e.target.value)}
                        className="form-input text-xs py-1.5"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Canada">Canada</option>
                        <option value="Other / Global">Other / Global</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#7A5450] uppercase mb-0.5 font-heading">
                      Specific Notes / Target Timeline
                    </label>
                    <textarea 
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Add any specific color combinations, packaging instructions or target delivery dates..."
                      className="form-input text-xs"
                    ></textarea>
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-royal-gold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <FileText className="w-4 h-4 text-[#381A03]" />
                      <span>{isSubmitting ? 'Generating Quotation Ticket...' : 'Submit Official Wholesale RFQ'}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="p-3 bg-[#F3EADB] border-t border-[#D4AF37]/30 text-center text-[11px] text-[#4D0E0D] flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#942220]" />
            <span>Confidential B2B Pricing • Direct Manufacturer Rates • FOB Jaipur</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InquiryDrawer;
