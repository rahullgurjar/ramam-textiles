import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, Truck, FileText, RotateCcw, X, MessageSquare, 
  ExternalLink, CheckCircle2, ChevronRight
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface PolicyModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms' | 'shipping' | 'returns';
  onClose: () => void;
}

const TABS = [
  { id: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck, tag: 'Data Protection' },
  { id: 'shipping' as const, label: 'Shipping & Delivery', icon: Truck, tag: 'Pan-India & Global' },
  { id: 'terms' as const, label: 'Terms & Conditions', icon: FileText, tag: 'Usage & Milestone Terms' },
  { id: 'returns' as const, label: 'Returns & Refunds', icon: RotateCcw, tag: 'Customer Protection' },
];

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'shipping' | 'returns'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="policy-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241A16]/70 p-3 sm:p-6 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex h-[92vh] max-h-[820px] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] bg-[#FAF5EE] border border-[#D4AF37]/40 shadow-2xl font-royal-body">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/35 bg-[#FAF0EB] text-[#241A16] px-6 py-4.5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#9B332C] text-white shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="policy-modal-title" className="font-playfair text-xl sm:text-2xl font-bold text-[#241A16]">
                  Ramam Textiles Jaipur
                </h2>
                <span className="rounded-full bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-royal-title">
                  Official Store Policies
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Direct artisan textile atelier &amp; export desk • Jaipur, Rajasthan 302020
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] transition-colors hover:bg-[#9B332C] hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex border-b border-[#D4AF37]/25 bg-[#FAF0EB] px-6 overflow-x-auto scrollbar-none gap-2 py-2.5">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold font-royal-title uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#9B332C] text-white shadow-md border border-[#9B332C]'
                    : 'text-stone-700 hover:bg-[#F5EDE1] hover:text-[#241A16]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#9B332C]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800 leading-relaxed text-xs sm:text-sm">
          
          {/* =========================================================================
              1. PRIVACY POLICY
              ========================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fade-in">
              {/* Highlight Box */}
              <div className="rounded-2xl border-2 border-[#BE185D]/30 bg-[#FDF2F8]/60 p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-[#BE185D] font-bold text-xs uppercase tracking-wider font-royal-title">
                  <ShieldCheck className="w-4 h-4 text-[#BE185D]" />
                  <span>Essential Store &amp; Bulk Order Policies</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 text-xs text-stone-800">
                  <div className="rounded-xl bg-white p-3.5 border border-[#FBCFE8] space-y-1">
                    <p className="font-bold text-[#831843]">60% Advance Payment Policy</p>
                    <p className="text-stone-600 leading-relaxed">
                      A <strong>60% advance payment</strong> is mandatory to confirm your order and initiate custom artisan crafting and batch production. The remaining <strong>40% balance</strong> is payable prior to dispatch after we share video proof of the finished batch.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3.5 border border-[#FBCFE8] space-y-1">
                    <p className="font-bold text-[#831843]">Sample First Approval Process</p>
                    <p className="text-stone-600 leading-relaxed">
                      For bulk orders, we send you a <strong>sample piece first</strong>. Only once you inspect and <strong>confirm/approve the sample</strong> do our artisans start manufacturing your full order.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3.5 border border-[#FBCFE8] space-y-1">
                    <p className="font-bold text-[#831843]">Sample vs. Bulk Orders</p>
                    <p className="text-stone-600 leading-relaxed">
                      Sample orders are <strong>not the same as bulk orders</strong>. Pricing, production timelines, and customization specifications depend on the specific product category.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3.5 border border-[#FBCFE8] space-y-1">
                    <p className="font-bold text-[#831843]">Bulk Return &amp; Refund Policy</p>
                    <p className="text-stone-600 leading-relaxed">
                      Strictly <strong>NO returns or refunds on bulk orders</strong> because production starts only after sample approval. However, if any piece is verified to be <strong>defective or damaged</strong> upon delivery, we replace or credit it immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Commitment */}
              <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-4 flex items-start gap-3 text-xs text-stone-700 leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-[#9B332C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#241A16]">Privacy Commitment:</strong> Ramam Textiles values your privacy. We only collect necessary information (name, delivery address, phone/WhatsApp number) required to process, manufacture, and dispatch your orders. We never sell, rent, or trade your personal data.
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">1. Information We Collect</h3>
                <p className="text-stone-700">When you interact with our store, place retail orders, or request wholesale quotes, we collect:</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li><strong>Contact Details:</strong> Your name, phone/WhatsApp number, and email address.</li>
                  <li><strong>Shipping Information:</strong> Doorstep delivery address, city, state, and postal PIN code for courier dispatch.</li>
                  <li><strong>Order &amp; Customization Details:</strong> Chosen bag designs, block print selections, custom logo branding tags, and bulk quantity requirements.</li>
                  <li><strong>Payment Confirmation Data:</strong> Transaction reference IDs and receipts (we do not store your bank passwords or card CVVs).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">2. How We Use Your Information</h3>
                <p className="text-stone-700">Your details are used strictly for legitimate customer order processing, including:</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li>Handcrafting, stitching, and packaging your authentic Jaipur cotton bags and accessories.</li>
                  <li>Sending sample approval photos, batch production updates, and courier dispatch tracking links via WhatsApp/SMS.</li>
                  <li>Providing personalized customer support and concierge assistance directly from our artisan workshop.</li>
                  <li>Sharing wholesale catalog pricing slabs and tax invoices when requested.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">3. Payment &amp; Transaction Security</h3>
                <p className="text-stone-700">
                  All retail and bulk order transactions are conducted through verified and secure payment channels including UPI, NEFT/IMPS Bank Transfer, and secure payment gateways. Our 60% advance and 40% pre-dispatch milestone terms are executed transparently with digital invoices.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">4. Third-Party Courier Logistics</h3>
                <p className="text-stone-700">We only share essential shipping details with our trusted courier logistics partners:</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li><strong>Delivery Couriers:</strong> Bluedart, Delhivery, DTDC, India Post (Speed Post), and verified international freight forwarders (DHL/FedEx).</li>
                  <li><strong>Legal Authorities:</strong> Only when strictly required under applicable Indian statutory laws.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">5. Your Data Rights &amp; Contact</h3>
                <p className="text-stone-700">
                  You have the right to request access, correction, or removal of your contact details from our database at any time. For questions regarding our privacy or store policies, email us at <a href="mailto:ramamtextiles@gmail.com" className="text-[#9B332C] font-bold underline">ramamtextiles@gmail.com</a> or message us on Instagram at <a href="https://www.instagram.com/ramamtextiles" target="_blank" rel="noopener noreferrer" className="text-[#9B332C] font-bold underline">@ramamtextiles</a>.
                </p>
              </section>
            </div>
          )}

          {/* =========================================================================
              2. SHIPPING & DELIVERY
              ========================================================================= */}
          {activeTab === 'shipping' && (
            <div className="space-y-6 animate-fade-in">
              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">1. Pan-India Delivery Coverage</h3>
                <p className="text-stone-700">
                  We deliver across <strong>19,000+ postal PIN codes in India</strong> through express logistics partners including <strong>Bluedart, Delhivery, DTDC, and Speed Post</strong>.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">2. Dispatch &amp; Delivery Timelines</h3>
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-[#D4AF37]/35 bg-white p-3.5 space-y-1">
                    <p className="font-bold text-[#241A16] uppercase tracking-wider font-royal-title">Ready Stock Retail Orders</p>
                    <p className="text-stone-600">Dispatched within 24-48 hours from Jaipur. Delivery takes 3-5 business days depending on destination.</p>
                  </div>
                  <div className="rounded-xl border border-[#D4AF37]/35 bg-white p-3.5 space-y-1">
                    <p className="font-bold text-[#241A16] uppercase tracking-wider font-royal-title">Wholesale &amp; Custom Orders</p>
                    <p className="text-stone-600">Production and dispatch schedules depend on order volume and are confirmed directly on WhatsApp prior to order finalization.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">3. Live Shipment Tracking</h3>
                <p className="text-stone-700">
                  Once your package is handed over to the courier partner, an automated WhatsApp notification containing the Courier AWB number and direct tracking URL is sent to you immediately.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">4. International Shipping</h3>
                <p className="text-stone-700">
                  We ship boutique and personal orders globally (USA, UK, UAE, Europe, Australia) via DHL Express and FedEx Priority. International shipping tariffs are calculated based on parcel gross weight and destination country.
                </p>
              </section>
            </div>
          )}

          {/* =========================================================================
              3. TERMS & CONDITIONS
              ========================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-4 text-xs text-stone-700 leading-relaxed">
                <strong className="text-[#241A16]">Terms of Service:</strong> By browsing our website, placing an order, requesting samples, or engaging with our Jaipur workshop team, you agree to the following terms, milestone payment structures, and artisan craft specifications.
              </div>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">1. Authentic Artisan Craftsmanship</h3>
                <p className="text-stone-700">Every bag, pouch, and accessory at Ramam Textiles is handcrafted in Jaipur using 100% pure cotton, hand-carved teakwood blocks, and traditional hand-screen or block printing techniques.</p>
                <p className="text-stone-600 text-xs">Because these pieces are hand-printed by master artisans rather than automated factories, subtle variations in print alignment, color depth, and quilted stitching are natural characteristics of authentic handmade heritage, making each piece uniquely yours.</p>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">2. 60% Advance Payment Policy (Mandatory for Orders)</h3>
                <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 p-4 text-xs text-stone-900 leading-relaxed space-y-2">
                  <p className="font-bold text-[#241A16] text-xs uppercase font-royal-title tracking-wider">Milestone Structure for Orders &amp; Production:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>60% Advance Payment (Mandatory to Confirm Order):</strong> A 60% advance payment is strictly required to confirm the order, lock fabric print selections, procure pure cotton fabric and natural dyes, and schedule artisan workshop batch stitching.</li>
                    <li><strong>Remaining 40% Balance (Payable Prior to Dispatch):</strong> Once your complete batch is stitched, channel-quilted, quality-checked, and packaged, our workshop team shares high-definition photos and video footage of your ready stock on WhatsApp for your inspection. The remaining 40% balance is payable prior to courier handover.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">3. Sample First Approval Workflow for Bulk Orders</h3>
                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-4 text-xs text-stone-700 leading-relaxed space-y-2">
                  <p className="font-bold text-[#241A16] text-xs uppercase font-royal-title tracking-wider">Sample Approval &amp; Production Agreement:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Sample Sent First:</strong> For all wholesale and bulk orders, we send a physical sample piece first to ensure you are 100% satisfied with the fabric quality, print design, dimensions, and stitching.</li>
                    <li><strong>Batch Production upon Sample Confirmation:</strong> Our artisan workshop starts working on your full bulk batch only after you inspect, confirm, and give explicit approval of the sample.</li>
                    <li><strong>Sample Orders vs. Bulk Orders:</strong> Please note that sample orders are not the same as bulk orders. Unit pricing, production timelines, customization options, and freight terms depend on the specific product and quantity.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">4. Bulk Orders No Return / No Refund Policy</h3>
                <p className="text-stone-700 text-xs">Because wholesale and bulk orders are custom manufactured in volume strictly after sample approval, <strong>bulk orders cannot be returned or refunded</strong> once dispatched, unless an individual piece is verified to be defective upon arrival.</p>
              </section>
            </div>
          )}

          {/* =========================================================================
              4. RETURNS & REFUNDS
              ========================================================================= */}
          {activeTab === 'returns' && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border-2 border-[#9B332C]/30 bg-[#FAF0EB] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#9B332C] font-bold text-xs uppercase tracking-wider font-royal-title">
                  <RotateCcw className="w-4 h-4 text-[#9B332C]" />
                  <span>Wholesale &amp; Bulk Orders: No Return &amp; No Refund Policy</span>
                </div>
                <div className="text-xs text-stone-800 space-y-1.5 leading-relaxed">
                  <p><strong>Strict Policy on Bulk / Wholesale Orders:</strong> Because every bulk order is custom manufactured after a physical sample is sent and confirmed by you, we operate on a strict <strong>NO RETURN and NO REFUND policy on bulk orders</strong>.</p>
                  <p><strong>Exception for Defective Pieces:</strong> If any individual piece in your bulk batch is found to have a manufacturing defect or transit damage, we will promptly replace that piece or provide a credit adjustment upon receiving verification.</p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">1. Sample Approval Safeguard</h3>
                <p className="text-stone-700 text-xs">To prevent discrepancies, we send a physical sample piece prior to beginning bulk manufacturing. Once you inspect and approve the sample, batch production commences.</p>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">2. Defective or Damaged Item Reporting (48-Hour Policy)</h3>
                <p className="text-stone-700 text-xs">In the rare event that you receive a defective item or an item damaged during transit:</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs">
                  <li>Please notify us within <strong>48 hours of delivery</strong> by sending an unboxing photo/video and invoice details to our support email at <a href="mailto:ramamtextiles@gmail.com" className="text-[#9B332C] font-bold underline">ramamtextiles@gmail.com</a> or via Instagram <a href="https://www.instagram.com/ramamtextiles" target="_blank" rel="noopener noreferrer" className="text-[#9B332C] font-bold underline">@ramamtextiles</a>.</li>
                  <li>Upon verification of the defect, we will arrange a complimentary replacement piece or process a refund/credit for that piece.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">3. Cancellations &amp; Order Modifications</h3>
                <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs">
                  <li><strong>Retail Orders:</strong> Cancellations are accepted prior to parcel dispatch from our workshop.</li>
                  <li><strong>Bulk &amp; Custom Orders:</strong> Once the 60% advance is paid, fabric is cut/printed, or brand tags are stitched, production is committed and custom orders cannot be cancelled.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#241A16]">4. Refund Processing Time</h3>
                <p className="text-stone-700 text-xs">
                  Approved refunds for verified defective pieces are initiated within <strong>24-48 hours</strong> and credited back to your original payment mode or UPI within <strong>3-5 working days</strong>.
                </p>
              </section>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#D4AF37]/25 bg-white px-6 py-4">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            Questions regarding policies? Chat directly with our Jaipur Export Desk.
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/ramamtextiles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#9B332C] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#832721] transition-all"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-white" />
              <span>Ask on Instagram</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PolicyModal;
