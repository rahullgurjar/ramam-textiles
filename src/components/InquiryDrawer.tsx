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
  ShieldCheck,
  Sparkles
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
    }, 800);
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 animate-fade-in font-royal-body">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col justify-between overflow-hidden border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 bg-[#1F1612] text-[#FAF3DC] border-b border-[#D4AF37]/30 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#D4AF37]/40 flex items-center justify-center shadow-inner">
                <ShoppingBag className="w-5 h-5 text-[#E5A93C]" />
              </div>
              <div>
                <h3 className="font-royal-title text-base font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>👑 Wholesale RFQ Basket</span>
                </h3>
                <span className="text-[11px] text-stone-300 font-light">
                  {inquiryItems.length} Products | {totalQuantity} Total Units Selected
                </span>
              </div>
            </div>

            <button 
              onClick={closeInquiryDrawer}
              className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close inquiry drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {rfqSubmittedId ? (
              /* Success State */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#FDF0F3] border-2 border-[#C8376B] text-[#C8376B] rounded-full mx-auto flex items-center justify-center shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-[#C8376B]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#C8376B] uppercase tracking-widest font-royal-title">
                    Request Received
                  </span>
                  <h4 className="font-playfair text-xl font-bold text-[#1F1612]">
                    Wholesale RFQ #{rfqSubmittedId}
                  </h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed font-light">
                    Thank you, <strong>{contactName}</strong> ({companyName || 'B2B Client'}). Our export desk in Jaipur will review your items and email your official quotation within 4–6 business hours.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 text-left space-y-2 text-xs shadow-sm">
                  <div className="flex justify-between pb-2 border-b border-stone-200 font-bold text-[#1F1612] font-royal-title">
                    <span>Summary Overview</span>
                    <span>{totalQuantity} Units</span>
                  </div>
                  <div className="text-stone-600 space-y-1 font-light">
                    <p>• <strong>Buyer:</strong> {contactName} ({email})</p>
                    <p>• <strong>Company:</strong> {companyName || 'B2B Client'}</p>
                    <p>• <strong>Destination:</strong> {country}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handlePrintQuotation}
                    className="w-full pill-btn-dark flex items-center justify-center gap-1.5 shadow"
                  >
                    <Printer className="w-4 h-4 text-[#E5A93C]" />
                    <span>Download / Print RFQ Summary</span>
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs font-bold text-[#C8376B] hover:underline font-royal-title"
                >
                  Start New Inquiry or Continue Browsing
                </button>
              </div>
            ) : inquiryItems.length === 0 ? (
              /* Empty Basket State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#FDF0F3] rounded-full mx-auto flex items-center justify-center text-[#C8376B] border border-[#F3CAD6] shadow-inner">
                  <ShoppingBag className="w-8 h-8 opacity-60 text-[#C8376B]" />
                </div>
                <h4 className="font-playfair text-lg text-[#1F1612] font-bold">
                  Your Wholesale Basket is Empty
                </h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto font-light">
                  Browse our apparel collections, quilted bags, and fabrics by meter to add items to your official quotation inquiry.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      closeInquiryDrawer();
                      onNavigate('/shop');
                    }}
                    className="pill-btn-rose text-xs px-6 py-2.5"
                  >
                    Browse Catalog
                  </button>
                  <button
                    onClick={() => {
                      closeInquiryDrawer();
                      onNavigate('/custom-manufacturing');
                    }}
                    className="pill-btn-outline text-xs px-6 py-2.5"
                  >
                    Custom Project
                  </button>
                </div>
              </div>
            ) : (
              /* Itemized Product List */
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                    <span className="text-xs font-bold text-[#1F1612] uppercase tracking-wider font-royal-title">
                      Selected Items ({inquiryItems.length})
                    </span>
                    <button
                      onClick={clearInquiry}
                      className="text-[11px] text-[#C8376B] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {inquiryItems.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="bg-white p-3.5 rounded-2xl border border-stone-200 flex gap-3 shadow-sm relative group hover:border-[#C8376B] transition-all"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-16 h-20 rounded-xl object-cover border border-stone-200 shrink-0 shadow-sm"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-playfair text-xs font-bold text-[#1F1612] line-clamp-1">
                              {item.product.name}
                            </h5>
                            <button
                              onClick={() => removeFromInquiry(item.product.id, item.selectedColor, item.selectedSize)}
                              className="text-stone-400 hover:text-[#C8376B] p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-stone-500 block mt-0.5">
                            SKU: {item.product.sku} | Color: <strong>{item.selectedColor}</strong> | Size: <strong>{item.selectedSize}</strong>
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateInquiryQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 5)}
                              className="w-6 h-6 rounded-full bg-slate-100 text-[#1F1612] font-bold text-xs flex items-center justify-center hover:bg-[#C8376B] hover:text-white transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center text-xs font-bold text-[#1F1612]">
                              {item.quantity} pcs
                            </span>
                            <button
                              onClick={() => updateInquiryQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 5)}
                              className="w-6 h-6 rounded-full bg-slate-100 text-[#1F1612] font-bold text-xs flex items-center justify-center hover:bg-[#C8376B] hover:text-white transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-[10px] text-[#C8376B] font-bold bg-[#FDF0F3] border border-[#F3CAD6] px-2.5 py-0.5 rounded-full font-royal-title">
                            MOQ {item.product.moq}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buyer Information Form */}
                <form onSubmit={handleSubmitOfficialRfq} className="bg-[#FAF7F2] p-5 rounded-[24px] border border-stone-200 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                    <Building className="w-4 h-4 text-[#C8376B]" />
                    <span className="text-xs font-bold text-[#1F1612] uppercase tracking-wider font-royal-title">
                      Buyer &amp; Delivery Information
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. Elena Rossi"
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">
                        Company / Boutique Name
                      </label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="e.g. Silk &amp; Sand Studios"
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">
                      Official Business Email *
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="buyer@domain.com"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">
                      Destination Country
                    </label>
                    <select 
                      value={country} 
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]"
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

                  <div>
                    <label className="block text-[10px] font-bold text-[#1F1612] uppercase mb-0.5 font-royal-title">
                      Specific Notes / Target Timeline
                    </label>
                    <textarea 
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Add specific color combinations, packaging instructions or target delivery dates..."
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-[#1F1612] focus:outline-none focus:border-[#C8376B]"
                    ></textarea>
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full pill-btn-rose py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-full shadow-lg"
                    >
                      <FileText className="w-4 h-4 text-white" />
                      <span>{isSubmitting ? 'Generating Quotation Ticket...' : 'Submit Official Wholesale RFQ'}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="p-3 bg-[#FAF7F2] border-t border-stone-200 text-center text-[11px] text-stone-600 flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C8376B]" />
            <span>Confidential B2B Pricing • Direct Manufacturer Rates • FOB Jaipur</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InquiryDrawer;
