import React, { useEffect } from 'react';
import { ShieldCheck, Truck, FileCheck, Layers } from 'lucide-react';
import { BulkOrderEnquiryForm } from '../components/BulkOrderEnquiryForm';
import { usePageSEO, DEFAULT_SEO } from '../utils/seo';
import { resolveProductImage } from '../utils/imageUtils';

interface BulkOrderEnquiryPageProps {
  onNavigate: (path: string) => void;
}

export const BulkOrderEnquiryPage: React.FC<BulkOrderEnquiryPageProps> = ({ onNavigate }) => {
  usePageSEO(DEFAULT_SEO.bulkEnquiry);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const el = document.getElementById('bulk-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 font-royal-body animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-500 font-royal-title">
        <button 
          onClick={() => onNavigate('/')} 
          className="hover:text-[#9B332C] transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-[#9B332C] font-semibold">Bulk Order &amp; Wholesale Enquiry</span>
      </div>

      {/* Dedicated Custom Photo Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-md h-52 sm:h-64">
        <img 
          src={resolveProductImage('/products/organizer-dyson-airwrap.jpg')} 
          alt="Ramam Textiles Jaipur Bulk Manufacturing Line" 
          className="w-full h-full object-cover" 
          loading="eager" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241A16]/90 via-[#241A16]/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[#E5C058] text-[11px] font-royal-title font-bold uppercase tracking-widest w-fit mb-2">
            <Layers className="w-3.5 h-3.5 text-[#E5C058]" />
            <span>Direct Jaipur Manufacturer Facility</span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-4xl font-bold">
            Bulk Order &amp; Wholesale Quotations
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl font-light">
            Flexible production minimums starting at 25 units. Handcrafted woodblock printing, export packaging, and global air dispatch.
          </p>
        </div>
      </div>

      {/* Primary Bulk Order Enquiry Form - Direct & Center */}
      <BulkOrderEnquiryForm id="bulk-enquiry" />

      {/* Why Source Directly from Ramam Textiles */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-royal-title uppercase tracking-widest text-[#9B332C] font-bold">
            Manufacturer Credentials
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16]">
            Why Boutiques &amp; Retailers Partner With Us
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
              Tracked air cargo delivery directly to your store or warehouse in 4-7 business days via DHL Express / FedEx with all export customs documents.
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
              Standard turnaround is 3 to 5 weeks depending on hand-block printing weather and order size. Urgent rush runs can be expedited in 14-18 days.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BulkOrderEnquiryPage;
