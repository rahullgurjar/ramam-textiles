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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-5 bg-[#0C1813] text-[#FAF7F2] border-b border-[#254234] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#13241C] border border-[#C4A674]/40 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#DFCA9F]" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-[#DFCA9F] uppercase tracking-wider">
                  Wholesale Inquiry Basket
                </h3>
                <span className="text-[11px] text-[#A3AFA8]">
                  {inquiryItems.length} Products | {totalQuantity} Total Units Selected
                </span>
              </div>
            </div>

            <button 
              onClick={closeInquiryDrawer}
              className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
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
                <div className="w-16 h-16 bg-[#13241C] border-2 border-[#25D366] text-[#25D366] rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#8A4A3B] uppercase tracking-widest">
                    Request Received
                  </span>
                  <h4 className="font-heading text-xl font-bold text-[#0C1813]">
                    Wholesale RFQ #{rfqSubmittedId}
                  </h4>
                  <p className="text-xs text-[#4F5A54] max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{contactName}</strong> ({companyName || 'B2B Client'}). Our export and production manager in Jaipur will review your specifications and email you the official tiered quotation within 4–6 business hours.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border border-[#121815]/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between pb-2 border-b border-black/5 font-semibold text-[#0C1813]">
                    <span>Summary Overview</span>
                    <span>{totalQuantity} Units</span>
                  </div>
                  <div className="text-[#4F5A54] space-y-1">
                    <p>• <strong>Buyer:</strong> {contactName} ({email})</p>
                    <p>• <strong>Company:</strong> {companyName || 'B2B Client'}</p>
                    <p>• <strong>Destination:</strong> {country}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handlePrintQuotation}
                    className="w-full py-2.5 px-4 bg-[#0C1813] text-[#DFCA9F] rounded text-xs font-bold uppercase hover:bg-[#13241C] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Printer className="w-4 h-4 text-[#C4A674]" />
                    <span>Download / Print RFQ Summary</span>
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs font-semibold text-[#8A4A3B] hover:underline"
                >
                  Start New Inquiry or Continue Browsing
                </button>
              </div>
            ) : inquiryItems.length === 0 ? (
              /* Empty Basket State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#F2ECE0] rounded-full mx-auto flex items-center justify-center text-[#7E8A83]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-heading text-lg text-[#0C1813] font-semibold">
                  Your Wholesale Basket is Empty
                </h4>
                <p className="text-xs text-[#7E8A83] max-w-xs mx-auto">
                  Browse our apparel collections, quilted bags, and fabrics by meter to add items to your official quotation inquiry.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      closeInquiryDrawer();
                      onNavigate('/shop');
                    }}
                    className="btn-primary text-xs"
                  >
                    Browse Catalog
                  </button>
                  <button
                    onClick={() => {
                      closeInquiryDrawer();
                      onNavigate('/custom-manufacturing');
                    }}
                    className="btn-secondary text-xs"
                  >
                    Custom Project
                  </button>
                </div>
              </div>
            ) : (
              /* Itemized Product List */
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#121815]/10">
                    <span className="text-xs font-bold text-[#8A4A3B] uppercase tracking-wider">
                      Selected Items ({inquiryItems.length})
                    </span>
                    <button
                      onClick={clearInquiry}
                      className="text-[11px] text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {inquiryItems.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="bg-white p-3 rounded border border-[#121815]/10 flex gap-3 shadow-sm relative group"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-16 h-20 rounded object-cover border border-black/5 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-heading text-xs font-bold text-[#0C1813] line-clamp-1">
                              {item.product.name}
                            </h5>
                            <button
                              onClick={() => removeFromInquiry(item.product.id, item.selectedColor, item.selectedSize)}
                              className="text-gray-400 hover:text-red-600 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-[#7E8A83] block">
                            SKU: {item.product.sku} | Color: <strong>{item.selectedColor}</strong> | Size: <strong>{item.selectedSize}</strong>
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateInquiryQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 5)}
                              className="w-6 h-6 rounded bg-[#F2ECE0] text-[#0C1813] font-bold text-xs flex items-center justify-center hover:bg-[#EADFCF]"
                            >
                              -
                            </button>
                            <span className="w-12 text-center text-xs font-bold text-[#0C1813]">
                              {item.quantity} pcs
                            </span>
                            <button
                              onClick={() => updateInquiryQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 5)}
                              className="w-6 h-6 rounded bg-[#F2ECE0] text-[#0C1813] font-bold text-xs flex items-center justify-center hover:bg-[#EADFCF]"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-[10px] text-[#254234] font-semibold bg-[#F2ECE0] px-2 py-0.5 rounded">
                            MOQ {item.product.moq}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buyer Information Form */}
                <form onSubmit={handleSubmitOfficialRfq} className="bg-[#F2ECE0]/70 p-4 rounded border border-[#C4A674]/30 space-y-3">
                  <div className="flex items-center gap-2 pb-1 border-b border-black/10">
                    <Building className="w-4 h-4 text-[#8A4A3B]" />
                    <span className="text-xs font-bold text-[#0C1813] uppercase tracking-wider">
                      Buyer &amp; Delivery Information
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">
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
                      <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">
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
                    <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">
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
                      <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">
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

                    <div>
                      <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">
                        Custom Labelling Needed?
                      </label>
                      <select className="form-input text-xs py-1.5">
                        <option value="no">Standard Ramam Textiles Branding</option>
                        <option value="yes">Custom Brand Neck Labels &amp; Hangtags</option>
                        <option value="unbranded">White Label (No Brand Mark)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#4F5A54] uppercase mb-0.5">
                      Specific Notes / Timeline Requirements
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
                      className="w-full py-3 bg-[#0C1813] text-[#DFCA9F] hover:bg-[#13241C] text-xs font-bold uppercase tracking-wider rounded border border-[#C4A674]/50 flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <FileText className="w-4 h-4 text-[#C4A674]" />
                      <span>{isSubmitting ? 'Generating Quotation Ticket...' : 'Submit Official Wholesale RFQ'}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="p-3 bg-[#F2ECE0] border-t border-[#121815]/10 text-center text-[11px] text-[#4F5A54] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C4A674]" />
            <span>Confidential B2B Pricing • Direct Manufacturer Rates • FOB Jaipur</span>
          </div>

        </div>
      </div>
    </div>
  );
};
