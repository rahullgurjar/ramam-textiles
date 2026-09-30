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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Real-Time Production & Shipment Tracking</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Track Your Order & Production Consignment
        </h1>
        <p className="text-stone-600 text-sm max-w-xl mx-auto">
          Enter your Ramam Order Reference (e.g. <code>RAMAM-2026-8941</code>) or DHL/FedEx Air Waybill tracking code.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Package className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            required
            placeholder="Enter Order # or Tracking Code (e.g. RAMAM-7892)"
            value={trackingNumber}
            onChange={e => setTrackingNumber(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#0E1612] text-amber-100 font-serif font-bold text-xs uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Track</span>
        </button>
      </form>

      {/* Simulated Live Order Milestones Status */}
      {hasSearched && (
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-amber-900/15 space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#942C29] font-bold">Consignment Ref</span>
              <h3 className="font-serif text-xl font-bold text-stone-900">{trackingNumber.toUpperCase()}</h3>
              <p className="text-xs text-stone-500">Destination: Export Cargo Terminal / Express Doorstep</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Status: In Transit (Customs Cleared)</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white ring-4 ring-[#FAF7F2]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-mono">Sep 24, 2026 • 11:30 AM</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm">Order & Technical Brief Confirmed</h4>
                <p className="text-xs text-stone-600">Design approval and fabric dyeing initiated at Jaipur workshop.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white ring-4 ring-[#FAF7F2]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-mono">Sep 27, 2026 • 04:15 PM</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm">Hand Block Printing & River Wash Completed</h4>
                <p className="text-xs text-stone-600">Passed 4-point colorfastness & shrinkage quality inspection.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white ring-4 ring-[#FAF7F2]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-mono">Sep 29, 2026 • 02:00 PM</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm">Packed in Moisture-Sealed Export Cartons</h4>
                <p className="text-xs text-stone-600">Dispatched from Jaipur to International Air Cargo Hub (Delhi/Mumbai).</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white ring-4 ring-[#FAF7F2] animate-pulse">
                <Truck className="w-3 h-3" />
              </div>
              <div>
                <span className="text-[10px] text-amber-700 font-mono font-bold">Estimated Delivery: Oct 3, 2026</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm">International Flight In Transit</h4>
                <p className="text-xs text-stone-600">Express courier tracking with DHL / FedEx Express.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
