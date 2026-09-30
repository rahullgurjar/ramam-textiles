import React, { useState } from 'react';
import { ShieldCheck, FileText, Truck, RotateCcw } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'shipping' | 'returns';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'shipping' | 'returns'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header Tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-stone-300 pb-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
            activeTab === 'terms'
              ? 'bg-[#0E1612] text-amber-100 shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Terms of Trade
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'bg-[#0E1612] text-amber-100 shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Shipping & Export Policy
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
            activeTab === 'returns'
              ? 'bg-[#0E1612] text-amber-100 shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Returns & Quality Claims
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-[#0E1612] text-amber-100 shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Content */}
      <div className="bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl border border-amber-900/15 prose prose-stone max-w-none text-stone-700 text-xs sm:text-sm leading-relaxed space-y-6">
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Commercial Terms of Wholesale Trade
            </h1>
            <p><strong>1. Commercial Quotations & Price Validity:</strong> All wholesale FOB quotations are valid for 30 days from issuance. Currency rates are pegged at the time of proforma invoice generation.</p>
            <p><strong>2. Production Minimums (MOQ):</strong> Standard wholesale catalog orders require a minimum of 25–50 units per style. Custom private-label block prints require 50–100 units depending on colorways.</p>
            <p><strong>3. Payment Milestones:</strong> Standard international terms require a 50% deposit upon proforma invoice confirmation to initiate yarn procurement and printing block carving. The remaining 50% balance is payable prior to cargo handover against visual pre-shipment inspection proof and AWB generation.</p>
            <p><strong>4. Handmade Tolerance:</strong> Because all Ramam Textiles creations are genuinely hand block-printed using natural wooden blocks, subtle variations in dye absorption and block registration are intrinsic characteristics of authentic Indian artisanal craft.</p>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              International Shipping & Customs Clearance
            </h1>
            <p><strong>1. Express Air Courier:</strong> Sample kits and urgent wholesale consignments (up to 300 kg) are dispatched via DHL Express or FedEx International Priority with typical transit times of 4–7 business days worldwide.</p>
            <p><strong>2. Air Freight & Ocean Container:</strong> High volume shipments (500+ kg / LCL or 20ft/40ft FCL) are exported under FOB terms from Mundra or Nhava Sheva (Mumbai) seaport, or Indira Gandhi International Airport (Delhi).</p>
            <p><strong>3. Export Documentation:</strong> Ramam Textiles supplies full commercial export documentation: Certificate of Origin, GSP Form A (where eligible), Phytosanitary Certificate, and Itemized Export Packing Lists.</p>
            <p><strong>4. Import Duties & Tariffs:</strong> Import duties, VAT, or local customs clearance taxes in destination countries are the responsibility of the consignee unless DDP terms are agreed in writing.</p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Quality Assurance & Commercial Claims
            </h1>
            <p><strong>1. 4-Point Quality Inspection:</strong> Every batch undergoes rigorous inspection for dimensional stability, seam tensile strength, and colorfastness prior to export packing.</p>
            <p><strong>2. Quality Claims Window:</strong> In the unlikely event of transit damage or manufacturing discrepancy, buyers must notify our claims desk within 7 business days of cargo receipt accompanied by unboxing photographs.</p>
            <p><strong>3. Resolution:</strong> Verified defective pieces will be credited against future orders or replaced at no additional cost on priority express freight.</p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Privacy & Non-Disclosure Policy
            </h1>
            <p><strong>1. Confidentiality of Private Labels:</strong> We strictly protect the proprietary tech packs, CAD designs, custom block motifs, and label specifications of our private-label brand clients. We never disclose OEM brand client rosters.</p>
            <p><strong>2. Data Protection:</strong> Buyer contact information, shipping addresses, and commercial inquiry data are strictly utilized for order fulfillment and commercial correspondence. We do not sell or lease buyer databases to third parties.</p>
            <p><strong>3. Secure Communications:</strong> Direct inquiries via official email and digital portal forms are processed directly by our Jaipur head office merchandising and export team.</p>
          </div>
        )}
      </div>
    </div>
  );
};
