import React, { useEffect } from 'react';
import { 
  Building2, ShieldCheck, Truck, FileCheck, ArrowRight, 
  HelpCircle, Sparkles, PhoneCall, CheckCircle2, Package
} from 'lucide-react';
import { BulkOrderEnquiryForm } from '../components/BulkOrderEnquiryForm';
import { resolveProductImage } from '../utils/imageUtils';

interface BulkOrderEnquiryPageProps {
  onNavigate: (path: string) => void;
}

export const BulkOrderEnquiryPage: React.FC<BulkOrderEnquiryPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Bulk Order & Wholesale Enquiry | Ramam Textiles Jaipur';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-royal-body">
      
      {/* Editorial Header */}
      <div className="bg-[#241A16] text-[#FAF5EE] rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-[#D4AF37]/35 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('${resolveProductImage('./products/duffle-kantha-patchwork.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241A16] via-[#241A16]/95 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold font-royal-title uppercase tracking-widest shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Direct Jaipur Export Atelier</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] leading-tight">
            Bulk Order &amp; Wholesale Quotation
          </h1>

          <p className="text-stone-300 font-royal-body text-sm sm:text-base leading-relaxed">
            Direct-from-manufacturer wholesale supply for lifestyle boutiques, resort gift shops, department stores, and independent designers. We offer low minimums (from 25 pieces), certified colorfast pure cotton, bespoke woodblock carving, and reliable door-to-door air freight worldwide.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="flex items-center gap-1.5 text-amber-200/90 font-royal-title">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>MOQ from 25 pcs</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="flex items-center gap-1.5 text-amber-200/90 font-royal-title">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Door-to-Door Air Express</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="flex items-center gap-1.5 text-amber-200/90 font-royal-title">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Zero-Defect 4-Point QC</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Bulk Order Enquiry Form */}
      <BulkOrderEnquiryForm id="bulk-enquiry" />

      {/* Why Source Directly from Ramam Textiles */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
            Manufacturer Credentials
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
            Why 140+ Global Boutiques Partner With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF5EE] p-6 rounded-[28px] border border-[#D4AF37]/35 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center border border-[#A7F3D0]">
              <ShieldCheck className="w-6 h-6 text-[#047857]" />
            </div>
            <h3 className="font-royal-title font-bold text-base text-[#065F46]">100% Zero-Defect Guarantee</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every production lot undergoes rigorous inspection for print alignment, seam tensile strength, YKK zipper gliding, and clean inner cotton lining.
            </p>
          </div>

          <div className="bg-[#FAF5EE] p-6 rounded-[28px] border border-[#D4AF37]/35 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center border border-[#BFDBFE]">
              <Truck className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <h3 className="font-royal-title font-bold text-base text-[#1E295B]">Air Express Doorstep Freight</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tracked air cargo delivery directly to your store or warehouse in 4–7 business days via DHL Express / FedEx with all export customs documents.
            </p>
          </div>

          <div className="bg-[#FAF5EE] p-6 rounded-[28px] border border-[#D4AF37]/35 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F8] text-[#BE185D] flex items-center justify-center border border-[#FBCFE8]">
              <FileCheck className="w-6 h-6 text-[#BE185D]" />
            </div>
            <h3 className="font-royal-title font-bold text-base text-[#831843]">Custom Branding &amp; Packaging</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We seamlessly integrate your brand woven neck labels, hangtags, care cards, and retail barcodes for direct-to-shelf boutique presentation.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Bulk Order Questions */}
      <div className="bg-[#FAF5EE] rounded-[32px] p-8 sm:p-10 border border-[#D4AF37]/35 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="font-playfair text-2xl font-bold text-[#241A16]">
            Bulk Ordering FAQ
          </h3>
          <p className="text-xs text-stone-600">
            Common questions from international wholesale buyers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
          <div className="p-4 bg-white/70 rounded-2xl border border-[#D4AF37]/25 space-y-1.5">
            <h4 className="font-royal-title font-bold text-[#241A16]">What is the Minimum Order Quantity (MOQ)?</h4>
            <p className="text-stone-600 leading-relaxed">
              Our standard MOQ is only 25 pieces per style for bags and duffles, and 50 meters for running fabric. You can mix assorted prints and colors within the batch.
            </p>
          </div>

          <div className="p-4 bg-white/70 rounded-2xl border border-[#D4AF37]/25 space-y-1.5">
            <h4 className="font-royal-title font-bold text-[#241A16]">Can I order pre-production proto samples?</h4>
            <p className="text-stone-600 leading-relaxed">
              Yes. Before full cutting begins, we courier physical prototype samples in your chosen prints and silhouettes for touch, feel, and fit sign-off.
            </p>
          </div>

          <div className="p-4 bg-white/70 rounded-2xl border border-[#D4AF37]/25 space-y-1.5">
            <h4 className="font-royal-title font-bold text-[#241A16]">What payment terms are accepted for exports?</h4>
            <p className="text-stone-600 leading-relaxed">
              We accept international wire transfers (SWIFT / IBAN), credit cards, and Wise. Typical commercial terms are 50% upon order placement and 50% prior to dispatch inspection.
            </p>
          </div>

          <div className="p-4 bg-white/70 rounded-2xl border border-[#D4AF37]/25 space-y-1.5">
            <h4 className="font-royal-title font-bold text-[#241A16]">How long does production take?</h4>
            <p className="text-stone-600 leading-relaxed">
              Standard turnaround is 3 to 5 weeks depending on hand-block printing weather and order size. Urgent rush runs can be expedited in 14–18 days.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BulkOrderEnquiryPage;
