import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Truck, RotateCcw, CheckCircle2, 
  AlertCircle, MessageSquare, Mail, ExternalLink, ArrowRight
} from 'lucide-react';
import { InstagramIcon } from '../components/InstagramIcon';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'shipping' | 'returns';
}

const LEGAL_TABS = [
  { id: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck, tag: 'Data Protection & Order Security' },
  { id: 'shipping' as const, label: 'Shipping & Delivery', icon: Truck, tag: 'Pan-India (19,000+ PINs) & Worldwide' },
  { id: 'terms' as const, label: 'Terms & Conditions', icon: FileText, tag: '60% Advance & Milestone Terms' },
  { id: 'returns' as const, label: 'Returns & Refunds', icon: RotateCcw, tag: '48-Hour Unboxing Policy' },
];

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'shipping' | 'returns'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const titles = {
      privacy: 'Privacy Policy | Ramam Textiles Jaipur',
      shipping: 'Shipping & Delivery Policy | Ramam Textiles Jaipur',
      terms: 'Terms & Conditions | Ramam Textiles Jaipur',
      returns: 'Returns & Refunds Policy | Ramam Textiles Jaipur',
    };
    document.title = titles[activeTab] || 'Customer Policies | Ramam Textiles Jaipur';
  }, [activeTab]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-royal-body">
      
      {/* Header Banner */}
      <div className="bg-[#241A16] text-[#FAF5EE] rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-[#D4AF37]/35 shadow-2xl">
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold font-royal-title uppercase tracking-widest shadow-sm">
            <span>Official Atelier &amp; Store Policies</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] leading-tight">
            Customer, Shipping &amp; Trade Policies
          </h1>

          <p className="text-stone-300 font-royal-body text-xs sm:text-sm leading-relaxed max-w-2xl">
            Transparent artisan guidelines governing order fulfillment, pan-India &amp; worldwide express shipping, milestone batch payments, sample approvals, and customer data confidentiality.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="flex items-center gap-1.5 text-amber-200/90 font-royal-title">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Pan-India 19,000+ PIN Codes</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="flex items-center gap-1.5 text-amber-200/90 font-royal-title">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>60% Advance Milestone Policy</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="flex items-center gap-1.5 text-amber-200/90 font-royal-title">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Sample First Confirmation</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 border-b border-[#D4AF37]/25 pb-4 overflow-x-auto scrollbar-none">
        {LEGAL_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-royal-title uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#241A16] text-[#FAF5EE] shadow-lg border border-[#D4AF37]/50 scale-[1.02]'
                  : 'bg-[#FAF5EE] text-[#241A16] hover:bg-[#FAF0EB] hover:text-[#9B332C] border border-[#D4AF37]/25'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#9B332C]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Policy Container */}
      <div className="bg-[#FAF5EE] p-6 sm:p-10 rounded-[32px] border border-[#D4AF37]/35 shadow-xl text-stone-800 font-royal-body text-sm leading-relaxed space-y-8">
        
        {/* =========================================================================
            1. PRIVACY POLICY (Full craftofpinkcity.shop matching)
            ========================================================================= */}
        {activeTab === 'privacy' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold block mb-1">
                Data Protection &amp; Confidentiality
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                Privacy &amp; Non-Disclosure Policy
              </h2>
            </div>

            {/* Essential Store & Bulk Order Policies Highlight Grid */}
            <div className="rounded-2xl border-2 border-[#BE185D]/30 bg-[#FDF2F8]/60 p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#BE185D] font-bold text-sm font-royal-title uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-[#BE185D] shrink-0" />
                <span>Essential Store &amp; Bulk Order Policies</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs text-[#241A16]">
                <div className="rounded-xl bg-white p-4 border border-[#FBCFE8] space-y-1.5 shadow-xs">
                  <p className="font-bold text-[#831843] flex items-center gap-1.5 text-xs">
                    <span>💰</span> 60% Advance Payment Policy
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    A <strong>60% advance payment</strong> is mandatory to confirm your order and initiate custom artisan crafting and batch production. The remaining <strong>40% balance</strong> is payable prior to courier dispatch after we share video proof of the finished batch.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-[#FBCFE8] space-y-1.5 shadow-xs">
                  <p className="font-bold text-[#831843] flex items-center gap-1.5 text-xs">
                    <span>📦</span> Sample First Approval Process
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    For bulk orders, we send you a <strong>sample piece first</strong>. Only once you inspect and <strong>confirm/approve the sample</strong> do our artisans begin manufacturing your full order.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-[#FBCFE8] space-y-1.5 shadow-xs">
                  <p className="font-bold text-[#831843] flex items-center gap-1.5 text-xs">
                    <span>⚖️</span> Sample vs. Bulk Orders
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Sample orders are <strong>not the same as bulk orders</strong>. Unit pricing, production timelines, and customization specifications depend on the specific product category.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-[#FBCFE8] space-y-1.5 shadow-xs">
                  <p className="font-bold text-[#831843] flex items-center gap-1.5 text-xs">
                    <span>🚫</span> Bulk Return &amp; Refund Policy
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Strictly <strong>NO returns or refunds on bulk orders</strong> because production commences only after sample approval. However, if any piece is verified to be <strong>defective or damaged</strong> upon delivery, we replace or credit it immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Commitment Banner */}
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 flex items-start gap-3.5 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#9B332C] shrink-0 mt-0.5" />
              <div className="text-xs text-stone-800 leading-relaxed">
                <strong className="text-[#241A16] font-royal-title uppercase tracking-wider block mb-1">
                  Privacy Commitment
                </strong>
                Ramam Textiles values your privacy. We only collect necessary information (name, delivery address, phone/WhatsApp number) required to process, manufacture, and dispatch your orders. We never sell, rent, lease, or trade your personal data to any external marketing firms.
              </div>
            </div>

            {/* Section 1: Information We Collect */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                1. Information We Collect
              </h3>
              <p className="text-stone-700">
                When you interact with our website, place retail orders, or request wholesale quotes, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-700 text-xs sm:text-sm">
                <li>
                  <strong className="text-[#241A16]">Contact Details:</strong> Your name, phone/WhatsApp number, and business email address.
                </li>
                <li>
                  <strong className="text-[#241A16]">Shipping Information:</strong> Doorstep delivery address, destination city, state, postal PIN code, and country for courier dispatch.
                </li>
                <li>
                  <strong className="text-[#241A16]">Order &amp; Customization Details:</strong> Chosen bag silhouettes, block print selections, custom logo branding tags, dimensions, and bulk quantity requirements.
                </li>
                <li>
                  <strong className="text-[#241A16]">Payment Confirmation Data:</strong> Transaction reference IDs and proforma invoice receipts (we do not store or process your bank passwords or credit card CVVs).
                </li>
              </ul>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                2. How We Use Your Information
              </h3>
              <p className="text-stone-700">
                Your details are used strictly for legitimate customer order processing, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-700 text-xs sm:text-sm">
                <li>Handcrafting, block-printing, stitching, and packaging your authentic Jaipur cotton bags and accessories.</li>
                <li>Sending sample approval photos, batch production updates, and courier dispatch tracking links via WhatsApp/SMS.</li>
                <li>Providing personalized customer support and concierge assistance directly from our Jaipur artisan workshop.</li>
                <li>Sharing wholesale catalog pricing slabs, Certificate of Origin documents, and proforma invoices when requested.</li>
              </ul>
            </section>

            {/* Section 3: Payment & Transaction Security */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                3. Payment &amp; Transaction Security
              </h3>
              <p className="text-stone-700">
                All retail and bulk order transactions are conducted through verified and secure payment channels including UPI, NEFT/IMPS Bank Transfer, and secure payment gateways. Our 60% advance and 40% pre-dispatch milestone terms are executed transparently with digital invoices.
              </p>
            </section>

            {/* Section 4: Third-Party Courier Logistics */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                4. Third-Party Courier Logistics
              </h3>
              <p className="text-stone-700">
                We only share essential delivery shipping details with our trusted courier logistics partners:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-700 text-xs sm:text-sm">
                <li>
                  <strong className="text-[#241A16]">Delivery Couriers:</strong> Bluedart, Delhivery, DTDC, India Post (Speed Post), and verified international freight forwarders (DHL Express / FedEx) for global consignments.
                </li>
                <li>
                  <strong className="text-[#241A16]">Legal Authorities:</strong> Only when strictly required under applicable statutory laws of India.
                </li>
              </ul>
            </section>

            {/* Section 5: Your Data Rights & Contact */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                5. Your Data Rights &amp; Contact
              </h3>
              <p className="text-stone-700">
                You have the right to request access, correction, or removal of your contact details from our database at any time. For questions regarding our privacy or store policies, email us at <a href="mailto:ramamtextiles@gmail.com" className="text-[#9B332C] font-bold underline">ramamtextiles@gmail.com</a> or connect directly on Instagram at <a href="https://www.instagram.com/ramamtextiles" target="_blank" rel="noopener noreferrer" className="text-[#9B332C] font-bold underline">@ramamtextiles</a>.
              </p>
            </section>
          </div>
        )}

        {/* =========================================================================
            2. SHIPPING & DELIVERY POLICY (Full craftofpinkcity.shop matching)
            ========================================================================= */}
        {activeTab === 'shipping' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold block mb-1">
                Logistics &amp; Fulfillment
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                Shipping &amp; Delivery Policy
              </h2>
            </div>

            {/* Section 1: Pan-India Delivery Coverage */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                1. Pan-India Delivery Coverage
              </h3>
              <p className="text-stone-700">
                We deliver across <strong>19,000+ postal PIN codes</strong> in India through express logistics partners including <strong>Bluedart, Delhivery, DTDC, and Speed Post</strong>.
              </p>
            </section>

            {/* Section 2: Dispatch & Delivery Timelines */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                2. Dispatch &amp; Delivery Timelines
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 text-xs pt-1">
                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-4 space-y-2 shadow-xs">
                  <p className="font-bold text-[#241A16] font-royal-title uppercase tracking-wider text-xs">
                    Ready Stock Retail Orders
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Dispatched within <strong>24–48 hours</strong> from our Jaipur atelier. Delivery takes <strong>3–5 business days</strong> depending on destination postal code.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-4 space-y-2 shadow-xs">
                  <p className="font-bold text-[#241A16] font-royal-title uppercase tracking-wider text-xs">
                    Wholesale &amp; Custom Orders
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Production and dispatch schedules depend on order volume and are <strong>confirmed directly on WhatsApp</strong> prior to proforma invoice generation.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Live Shipment Tracking */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                3. Live Shipment Tracking
              </h3>
              <p className="text-stone-700">
                Once your package is handed over to the courier partner, an automated WhatsApp notification containing the <strong>Courier AWB tracking number</strong> and direct tracking URL is sent to you immediately.
              </p>
            </section>

            {/* Section 4: International Shipping */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                4. International Shipping
              </h3>
              <p className="text-stone-700">
                We ship boutique and commercial orders globally (including the United States, United Kingdom, UAE, Europe, and Australia) via <strong>DHL Express and FedEx Priority</strong>. International shipping tariffs are calculated based on parcel gross weight and destination country.
              </p>
            </section>

            {/* Section 5: Packaging & Inspection Safeguard */}
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 space-y-2">
              <h4 className="font-royal-title text-xs uppercase tracking-wider font-bold text-[#241A16]">
                Pre-Dispatch Quality Assurance
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                Prior to sealing parcels, our Jaipur quality control team conducts a 4-point audit covering seam strength, YKK zipper action, quilted channel consistency, and clean packaging. For wholesale orders, a live video walkthrough of your sealed boxes is shared on WhatsApp before cargo dispatch.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. TERMS & CONDITIONS (Full craftofpinkcity.shop matching)
            ========================================================================= */}
        {activeTab === 'terms' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold block mb-1">
                Commercial Agreement
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                Terms &amp; Conditions of Trade
              </h2>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-4 text-xs text-stone-800 leading-relaxed shadow-xs">
              <strong className="text-[#241A16] font-royal-title uppercase tracking-wider block mb-1">
                Terms of Service
              </strong>
              By browsing our website, placing an order, requesting samples, or engaging with our Jaipur workshop team, you agree to the following terms, milestone payment structures, and artisan craft specifications.
            </div>

            {/* 1. Authentic Artisan Craftsmanship */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                1. Authentic Artisan Craftsmanship
              </h3>
              <p className="text-stone-700">
                Every bag, pouch, and accessory at Ramam Textiles is handcrafted in Jaipur using 100% pure cotton, hand-carved teakwood blocks, and traditional hand-screen or block printing techniques.
              </p>
              <p className="text-stone-600 text-xs sm:text-sm">
                Because these pieces are hand-printed by master artisans rather than automated factories, subtle variations in print alignment, color depth, and quilted stitching are natural characteristics of authentic handmade heritage, making each piece uniquely yours.
              </p>
            </section>

            {/* 2. 60% Advance Payment Policy */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                2. 60% Advance Payment Policy (Mandatory for Orders)
              </h3>
              <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 p-5 text-xs text-stone-900 leading-relaxed space-y-2">
                <p className="font-bold text-[#241A16] text-sm font-royal-title">
                  Milestone Structure for Orders &amp; Production:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>60% Advance Payment (Mandatory to Confirm Order):</strong> A 60% advance payment is strictly required to confirm the order, lock fabric print selections, procure pure cotton fabric and natural dyes, and schedule artisan workshop batch stitching.
                  </li>
                  <li>
                    <strong>Remaining 40% Balance (Payable Prior to Dispatch):</strong> Once your complete batch is stitched, channel-quilted, quality-checked, and packaged, our workshop team shares high-definition photos and video footage of your ready stock on WhatsApp for your inspection. The remaining 40% balance is payable prior to courier handover.
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Sample First Approval Workflow */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                3. Sample First Approval Workflow for Bulk Orders
              </h3>
              <div className="rounded-2xl border border-[#D4AF37]/35 bg-white p-5 text-xs text-stone-800 leading-relaxed space-y-2">
                <p className="font-bold text-[#241A16] text-sm font-royal-title">
                  Sample Approval &amp; Production Agreement:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-700">
                  <li>
                    <strong>Sample Sent First:</strong> For all wholesale and bulk orders, we send a physical sample piece first to ensure you are 100% satisfied with the fabric quality, print design, dimensions, and stitching.
                  </li>
                  <li>
                    <strong>Batch Production upon Sample Confirmation:</strong> Our artisan workshop starts working on your full bulk batch only after you inspect, confirm, and give explicit approval of the sample.
                  </li>
                  <li>
                    <strong>Sample Orders vs. Bulk Orders:</strong> Please note that sample orders are not the same as bulk orders. Unit pricing, production timelines, customization options, and freight terms depend on the specific product and quantity.
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Bulk Orders No Return / No Refund Policy */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                4. Bulk Orders No Return / No Refund Policy
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm">
                Because wholesale and bulk orders are custom manufactured in volume strictly after sample approval, <strong>bulk orders cannot be returned or refunded</strong> once dispatched, unless an individual piece is verified to be defective upon arrival. See the Returns &amp; Refunds section for defect replacement terms.
              </p>
            </section>

            {/* 5. Pricing & Taxes */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                5. Pricing &amp; Taxes
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm">
                Retail prices on the website are in Indian Rupees (INR) or displayed currencies and inclusive of applicable taxes. Wholesale prices are offered at tiered volume discounts. Catalog prices may adjust periodically based on pure cotton fabric and natural dye raw material market fluctuations.
              </p>
            </section>

            {/* 6. Intellectual Property */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                6. Intellectual Property
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm">
                All photographs, product descriptions, brand identity, logo, and artwork on this website are the intellectual property of <strong>Ramam Textiles</strong>. Reproduction, scraping, or commercial resale of media assets without written authorization is strictly prohibited.
              </p>
            </section>
          </div>
        )}

        {/* =========================================================================
            4. RETURNS & REFUNDS POLICY (Full craftofpinkcity.shop matching)
            ========================================================================= */}
        {activeTab === 'returns' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold block mb-1">
                Customer Protection &amp; Guarantees
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
                Returns, Refunds &amp; Quality Claims
              </h2>
            </div>

            {/* Wholesale Strict Policy Highlight Box */}
            <div className="rounded-2xl border-2 border-[#9B332C]/30 bg-[#FAF0EB] p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#9B332C] font-bold text-sm font-royal-title uppercase tracking-wider">
                <RotateCcw className="w-5 h-5 text-[#9B332C]" />
                <span>Wholesale &amp; Bulk Orders: No Return &amp; No Refund Policy</span>
              </div>
              <div className="text-xs text-stone-800 space-y-2 leading-relaxed">
                <p>
                  <strong>Strict Policy on Bulk / Wholesale Orders:</strong> Because every bulk order is custom manufactured after a physical sample is sent and confirmed by you, we operate on a strict <strong>NO RETURN and NO REFUND policy on bulk orders</strong>.
                </p>
                <p>
                  <strong>Exception for Defective Pieces:</strong> If any individual piece in your bulk batch is found to have a manufacturing defect or transit damage, we will promptly replace that piece or provide a credit adjustment upon receiving verification.
                </p>
              </div>
            </div>

            {/* 1. Sample Approval Safeguard */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                1. Sample Approval Safeguard
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm">
                To prevent discrepancies, we send a physical sample piece prior to beginning bulk manufacturing. Once you inspect and approve the sample, batch production commences. Sample orders are independent of bulk orders (pricing and timelines depend on the specific product).
              </p>
            </section>

            {/* 2. Defective or Damaged Item Reporting (48-Hour Policy) */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                2. Defective or Damaged Item Reporting (48-Hour Policy)
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm">
                In the rare event that you receive a defective item or an item damaged during transit:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-700 text-xs sm:text-sm">
                <li>
                  Please notify us within <strong>48 hours of delivery</strong> by sending an unboxing photo/video and invoice details to our support email at <a href="mailto:ramamtextiles@gmail.com" className="text-[#9B332C] font-bold underline">ramamtextiles@gmail.com</a> or via Instagram <a href="https://www.instagram.com/ramamtextiles" target="_blank" rel="noopener noreferrer" className="text-[#9B332C] font-bold underline">@ramamtextiles</a>.
                </li>
                <li>
                  Upon verification of the defect, we will arrange a complimentary replacement piece or process a refund/credit for that piece immediately.
                </li>
              </ul>
            </section>

            {/* 3. Cancellations & Order Modifications */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                3. Cancellations &amp; Order Modifications
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-stone-700 text-xs sm:text-sm">
                <li>
                  <strong>Retail Orders:</strong> Cancellations are accepted prior to parcel dispatch from our workshop.
                </li>
                <li>
                  <strong>Bulk &amp; Custom Orders:</strong> Once the 60% advance is paid, fabric is cut/printed, or brand tags are stitched, production is committed and custom orders cannot be cancelled.
                </li>
              </ul>
            </section>

            {/* 4. Refund Processing Time */}
            <section className="space-y-3">
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                4. Refund Processing Time
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm">
                Approved refunds for verified defective pieces are initiated within <strong>24–48 hours</strong> and credited back to your original payment mode or UPI within <strong>3–5 working days</strong>.
              </p>
            </section>
          </div>
        )}

      </div>

      {/* Footer Support Banner */}
      <div className="bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/35 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <span>💬</span>
          <span>
            Need policy clarification or custom contract assistance? Talk directly with our Jaipur Export Desk:
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/ramamtextiles"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn-rose px-5 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 shadow-md"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-white" />
            <span>Message @ramamtextiles</span>
          </a>
        </div>
      </div>

    </div>
  );
};

export default LegalPage;
