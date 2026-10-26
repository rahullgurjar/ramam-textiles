import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, AlertCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { usePageSEO, DEFAULT_SEO } from '../utils/seo';
import { getOrderById } from '../utils/crmStorage';
import { CRMOrder } from '../types/crm';

export const TrackOrderPage: React.FC = () => {
  usePageSEO(DEFAULT_SEO.trackOrder);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<CRMOrder | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    const order = getOrderById(trackingNumber.trim());
    setFoundOrder(order || null);
    setHasSearched(true);
  };

  const isDelivered = foundOrder?.fulfillment.status === 'delivered';
  const isInTransit = foundOrder?.fulfillment.status === 'in_transit' || foundOrder?.fulfillment.status === 'ready_for_dispatch';
  const isInProduction = foundOrder?.fulfillment.status === 'in_production' || foundOrder?.fulfillment.status === 'quality_check';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="bg-[#FAF0EB] text-[#241A16] rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-[#D4AF37]/40 shadow-sm text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${resolveWebpImage('/products/vanity-trio-meadow-green.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-[#FAF0EB]/85" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
            <Truck className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Real-Time Production &amp; Consignment Tracking</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold tracking-tight text-[#241A16]">
            Track Your Royal Consignment
          </h1>
          <p className="text-stone-700 font-royal-body text-base max-w-xl mx-auto">
            Enter your Ramam Order Reference (e.g. <code>RAMAM-2026-8941</code> or <code>RT-8924</code>) or Air Waybill tracking code.
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Package className="w-4 h-4 absolute left-4 top-4 text-[#9B332C]" />
          <input
            type="text"
            required
            placeholder="Enter Order # or Tracking Code (e.g. RAMAM-2026-8941)"
            value={trackingNumber}
            onChange={e => setTrackingNumber(e.target.value)}
            className="w-full pl-11 pr-3 py-3.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-2xl text-xs text-[#241A16] font-royal-body focus:outline-none focus:border-[#9B332C] shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="pill-btn-rani px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Track</span>
        </button>
      </form>

      {/* Live Order Milestones Status */}
      {hasSearched && (
        <div className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/35 shadow-sm space-y-8 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-jaipur-jaali opacity-30 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4AF37]/25 gap-4 relative z-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B332C] font-bold">
                Consignment Reference
              </span>
              <h3 className="font-playfair text-xl font-bold text-[#241A16]">
                {foundOrder ? foundOrder.id : trackingNumber.toUpperCase()}
              </h3>
              <p className="text-xs font-royal-body text-stone-600 mt-0.5">
                {foundOrder ? (
                  <span>Consignee: <strong>{foundOrder.customer.company || foundOrder.customer.name}</strong> • Destination: {foundOrder.customer.city}, {foundOrder.customer.country}</span>
                ) : (
                  <span>Destination: Export Cargo Terminal / Express Doorstep</span>
                )}
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-royal-title font-bold rounded-full shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#9B332C]" />
              <span>
                Status: {foundOrder 
                  ? foundOrder.fulfillment.status.replace(/_/g, ' ').toUpperCase() 
                  : 'IN TRANSIT (CUSTOMS CLEARED)'}
              </span>
            </div>
          </div>

          {/* If Real Order Found: Show Items */}
          {foundOrder && foundOrder.items.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-stone-200 relative z-10 space-y-2">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Consignment Contents ({foundOrder.items.reduce((s, it) => s + it.quantity, 0)} Units)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {foundOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-[#FAF5EE] rounded-xl">
                    <img
                      src={resolveProductImage(it.image)}
                      alt={it.productName}
                      className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/30"
                    />
                    <div>
                      <p className="font-bold text-xs text-stone-900 line-clamp-1">{it.productName}</p>
                      <p className="text-[11px] text-stone-500 font-mono">{it.quantity} pcs • {it.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Milestones */}
          <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D4AF37]/50 relative z-10">
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#9B332C] flex items-center justify-center text-white ring-4 ring-[#FAF5EE]">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#9B332C] font-mono">
                  {foundOrder ? new Date(foundOrder.createdAt).toLocaleDateString() : 'Sep 24, 2026'} • 11:30 AM
                </span>
                <h4 className="font-royal-title font-bold text-[#241A16] text-sm">Order &amp; Technical Brief Confirmed</h4>
                <p className="text-xs font-royal-body text-stone-600">Design approval and fabric dyeing initiated at Jaipur workshop.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#9B332C] flex items-center justify-center text-white ring-4 ring-[#FAF5EE]">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#9B332C] font-mono">Artisan Workshop Floor</span>
                <h4 className="font-royal-title font-bold text-[#241A16] text-sm">Hand Block Printing &amp; Channel Quilting</h4>
                <p className="text-xs font-royal-body text-stone-600">Pure combed cotton block printed with teak chhaap blocks and padded with soft batting.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-[#FAF5EE] ${
                isInTransit || isDelivered ? 'bg-[#9B332C]' : 'bg-stone-300'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#9B332C] font-mono">4-Point Quality Inspection</span>
                <h4 className="font-royal-title font-bold text-[#241A16] text-sm">Passed Tensile &amp; Azo-Free Dye Fastness Inspection</h4>
                <p className="text-xs font-royal-body text-stone-600">Individually polybagged and packed into moisture-resistant export master cartons.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-[#FAF5EE] ${
                isDelivered ? 'bg-[#9B332C]' : isInTransit ? 'bg-[#9B332C] animate-pulse shadow-md' : 'bg-stone-300'
              }`}>
                <Truck className="w-3 h-3 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#9B332C] font-mono font-bold">
                  Carrier: {foundOrder ? foundOrder.fulfillment.carrier : 'DHL Express Worldwide'}
                </span>
                <h4 className="font-royal-title font-bold text-[#241A16] text-sm">
                  {isDelivered ? 'Consignment Delivered Successfully' : 'Air Cargo Consignment In Transit'}
                </h4>
                <p className="text-xs font-royal-body text-stone-600">
                  AWB Tracking: <strong>{foundOrder?.fulfillment.trackingNumber || 'DHL-8492019481'}</strong>
                </p>
                {foundOrder?.fulfillment.trackingUrl && (
                  <a
                    href={foundOrder.fulfillment.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#9B332C] hover:underline font-bold mt-1"
                  >
                    <span>Track on Carrier Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
