import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrackOrderPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#D4AF37]/25 border border-[#D4AF37]/45 rounded-full text-[#751B19] text-xs font-royal-title font-bold uppercase tracking-widest">
          <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Real-Time Production &amp; Shipment Tracking</span>
        </div>
        <h1 className="font-royal-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#4D0E0D]">
          Track Your Royal Consignment
        </h1>
        <p className="text-[#751B19]/80 font-royal-body text-base max-w-xl mx-auto">
          Enter your Ramam Order Reference (e.g. <code>RAMAM-2026-8941</code>) or DHL/FedEx Air Waybill tracking code.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Package className="w-4 h-4 absolute left-4 top-4 text-[#751B19]" />
          <input
            type="text"
            required
            placeholder="Enter Order # or Tracking Code (e.g. RAMAM-7892)"
            value={trackingNumber}
            onChange={e => setTrackingNumber(e.target.value)}
            className="w-full pl-11 pr-3 py-3.5 bg-white border-2 border-[#D4AF37]/40 rounded-2xl text-xs text-[#4D0E0D] font-royal-body focus:outline-none focus:border-[#751B19] shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="btn-royal-gold px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Track</span>
        </button>
      </form>

      {/* Simulated Live Order Milestones Status */}
      {hasSearched && (
        <div className="bg-gradient-to-br from-[#FAF6EE] to-[#F3EADB] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/35 shadow-xl space-y-8 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-jaipur-jaali opacity-10 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4AF37]/30 gap-4 relative z-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#751B19] font-bold">Consignment Ref</span>
              <h3 className="font-royal-heading text-xl font-bold text-[#4D0E0D]">{trackingNumber.toUpperCase()}</h3>
              <p className="text-xs font-royal-body text-stone-600">Destination: Export Cargo Terminal / Express Doorstep</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-royal-title font-bold rounded-full shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Status: In Transit (Customs Cleared)</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D4AF37]/50 relative z-10">
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-white ring-4 ring-[#FAF6EE]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-[#751B19] font-mono">Sep 24, 2026 • 11:30 AM</span>
                <h4 className="font-royal-title font-bold text-[#4D0E0D] text-sm">Order &amp; Technical Brief Confirmed</h4>
                <p className="text-xs font-royal-body text-stone-600">Design approval and fabric dyeing initiated at Jaipur workshop.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-white ring-4 ring-[#FAF6EE]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-[#751B19] font-mono">Sep 27, 2026 • 04:15 PM</span>
                <h4 className="font-royal-title font-bold text-[#4D0E0D] text-sm">Hand Block Printing &amp; River Wash Completed</h4>
                <p className="text-xs font-royal-body text-stone-600">Passed 4-point colorfastness &amp; shrinkage quality inspection.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-white ring-4 ring-[#FAF6EE]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-[#751B19] font-mono">Sep 29, 2026 • 02:00 PM</span>
                <h4 className="font-royal-title font-bold text-[#4D0E0D] text-sm">Packed in Moisture-Sealed Export Cartons</h4>
                <p className="text-xs font-royal-body text-stone-600">Dispatched from Jaipur to International Air Cargo Hub (Delhi/Mumbai).</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#4D0E0D] ring-4 ring-[#FAF6EE] animate-pulse shadow-md">
                <Truck className="w-3 h-3" />
              </div>
              <div>
                <span className="text-[10px] text-[#751B19] font-mono font-bold">Estimated Delivery: Oct 3, 2026</span>
                <h4 className="font-royal-title font-bold text-[#4D0E0D] text-sm">International Flight In Transit</h4>
                <p className="text-xs font-royal-body text-stone-600">Express courier tracking with DHL / FedEx Express.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
