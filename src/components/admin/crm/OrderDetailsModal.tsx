import React, { useState } from 'react';
import { 
  X, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, 
  Building, Mail, Phone, ExternalLink, Printer, MessageCircle, 
  Plus, Calendar, AlertCircle, DollarSign, Package, FileText,
  User, Send, Edit2, Save
} from 'lucide-react';
import { CRMOrder, CRMOrderItem, OrderStatus, PaymentStatus } from '../../../types/crm';
import { updateOrderStatus, updatePaymentStatus, addOrderNote, saveOrder } from '../../../utils/crmStorage';
import { useApp } from '../../../context/AppContext';
import { resolveProductImage } from '../../../utils/imageUtils';

interface OrderDetailsModalProps {
  order: CRMOrder;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated: (updated: CRMOrder) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdated
}) => {
  const { showToast, formatPrice } = useApp();
  const [activeTab, setActiveTab] = useState<'details' | 'invoice' | 'timeline'>('details');

  // Editable fields
  const [status, setStatus] = useState<OrderStatus>(order.fulfillment.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.financials.paymentStatus);
  const [carrier, setCarrier] = useState(order.fulfillment.carrier || 'DHL Express Worldwide');
  const [trackingNumber, setTrackingNumber] = useState(order.fulfillment.trackingNumber || '');
  const [trackingUrl, setTrackingUrl] = useState(order.fulfillment.trackingUrl || '');
  const [estimatedDelivery, setEstimatedDelivery] = useState(order.fulfillment.estimatedDelivery || '');
  const [newNoteText, setNewNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSaveFulfillment = () => {
    setIsSaving(true);
    const updated = updateOrderStatus(order.id, status, trackingNumber, carrier);
    if (updated) {
      // Also update payment status
      const fullyUpdated = updatePaymentStatus(order.id, paymentStatus);
      if (fullyUpdated) {
        // Also update trackingUrl and estimated delivery
        fullyUpdated.fulfillment.trackingUrl = trackingUrl;
        fullyUpdated.fulfillment.estimatedDelivery = estimatedDelivery;
        saveOrder(fullyUpdated);
        onOrderUpdated(fullyUpdated);
        showToast(`Order #${order.orderNumber} successfully updated.`, 'success');
      }
    }
    setIsSaving(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const updated = addOrderNote(order.id, newNoteText.trim(), 'Atelier Staff Console');
    if (updated) {
      onOrderUpdated(updated);
      setNewNoteText('');
      showToast('Internal note recorded.', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp quick greeting link
  const getWhatsAppLink = () => {
    const rawPhone = order.customer.whatsapp || order.customer.phone || '';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello ${order.customer.name}, Ramam Textiles Jaipur here regarding your consignment order #${order.orderNumber}. Status: ${status.replace('_', ' ').toUpperCase()}. Tracking: ${trackingNumber || 'Processing in Jaipur workshop'}. Please let us know if you need any adjustments!`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const totalItemCount = order.items.reduce((s: number, it: CRMOrderItem) => s + it.quantity, 0);

  const getStatusBadge = (st: OrderStatus) => {
    switch (st) {
      case 'rfq_received':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">RFQ Received</span>;
      case 'quote_sent':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">Quote Dispatched</span>;
      case 'sample_approved':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">Sample Approved</span>;
      case 'in_production':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-800 border border-orange-300 animate-pulse">In Workshop Production</span>;
      case 'quality_check':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">Quality Inspection (4-Point)</span>;
      case 'ready_for_dispatch':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-300">Ready for Dispatch</span>;
      case 'in_transit':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Air Cargo / In Transit</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-800 border border-green-300">Delivered & Fulfilled</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-200 text-stone-700">Consignment Cancelled</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in font-royal-body">
      <div className="relative w-full max-w-5xl bg-[#FAF5EE] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-[#241A16] text-[#FAF5EE] p-5 sm:px-8 sm:py-6 border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#801B18] border border-[#D4AF37]/40 text-[#FCE5A4] flex items-center justify-center font-bold font-playfair text-lg shadow-inner">
              RT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#FCE5A4]">
                  Consignment #{order.orderNumber}
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-stone-300 border border-white/20">
                  {order.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-2">
                <span>Booked on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>Source: {order.source}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'details' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              Order Details
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'invoice' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Proforma Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

          {/* TAB 1: ORDER DETAILS VIEW */}
          {activeTab === 'details' && (
            <>
              {/* Quick Status Bar */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D4AF37]/30 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Current Lifecycle:</span>
                  {getStatusBadge(status)}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Buyer</span>
                  </a>
                  <a
                    href={`mailto:${order.customer.email}?subject=Consignment ${order.orderNumber} - Ramam Textiles Jaipur`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Buyer</span>
                  </a>
                </div>
              </div>

              {/* Grid: Buyer Profile & Live Status Updater */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Column 1 & 2: Buyer Profile & Address */}
                <div className="md:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#9B332C]" />
                      <span>B2B Client & Consignee Profile</span>
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-300">
                      {order.customer.country}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">Contact Person</span>
                      <p className="font-bold text-stone-800 text-sm mt-0.5">{order.customer.name}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">Company / Boutique</span>
                      <p className="font-bold text-stone-800 text-sm mt-0.5">{order.customer.company || 'Direct Buyer'}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">Email Address</span>
                      <p className="font-mono text-stone-800 mt-0.5 break-all">{order.customer.email}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">Phone / WhatsApp</span>
                      <p className="font-mono text-stone-800 mt-0.5">{order.customer.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">VAT / GSTIN / Tax ID</span>
                      <p className="font-mono text-stone-800 mt-0.5">{order.customer.taxId || 'Export Non-GST / Direct'}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">City &amp; Country</span>
                      <p className="text-stone-800 font-semibold mt-0.5">{order.customer.city}, {order.customer.country}</p>
                    </div>
                  </div>

                  {order.customer.address && (
                    <div className="pt-2 border-t border-stone-100 text-xs">
                      <span className="text-stone-400 uppercase tracking-wider block font-bold text-[10px]">Shipping Consignee Address</span>
                      <p className="text-stone-700 mt-0.5 leading-relaxed bg-[#FAF5EE] p-2.5 rounded-xl border border-stone-200">
                        {order.customer.address} {order.customer.postalCode ? `• Postal Code: ${order.customer.postalCode}` : ''}
                      </p>
                    </div>
                  )}
                </div>

                {/* Column 3: Live Status & Carrier Management */}
                <div className="bg-[#FAF0EB] rounded-2xl p-5 border border-[#EACAC0] shadow-sm space-y-4">
                  <h3 className="font-playfair text-base font-bold text-[#9B332C] flex items-center gap-1.5 border-b border-[#EACAC0] pb-2">
                    <Truck className="w-4 h-4 text-[#9B332C]" />
                    <span>Fulfillment Controls</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Consignment Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as OrderStatus)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-800 outline-none focus:border-[#9B332C]"
                      >
                        <option value="rfq_received">1. RFQ Received</option>
                        <option value="quote_sent">2. Formal Quote Dispatched</option>
                        <option value="sample_approved">3. Swatch / Sample Approved</option>
                        <option value="in_production">4. In Workshop Production</option>
                        <option value="quality_check">5. 4-Point Quality Inspection</option>
                        <option value="ready_for_dispatch">6. Packed & Ready for Dispatch</option>
                        <option value="in_transit">7. Air Cargo / In Transit</option>
                        <option value="delivered">8. Delivered & Fulfilled</option>
                        <option value="cancelled">Consignment Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Payment Status
                      </label>
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-800 outline-none focus:border-[#9B332C]"
                      >
                        <option value="unpaid">Unpaid / Awaiting Wire</option>
                        <option value="advance_50">50% Advance Received</option>
                        <option value="paid">100% Fully Settled</option>
                        <option value="refunded">Refunded / Recredited</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Courier / Carrier
                      </label>
                      <input
                        type="text"
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                        placeholder="DHL Express / FedEx / Air Cargo"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-800 outline-none focus:border-[#9B332C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        AWB Tracking Code
                      </label>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="e.g. DHL-8492019481"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono text-stone-800 outline-none focus:border-[#9B332C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Estimated Delivery Date
                      </label>
                      <input
                        type="date"
                        value={estimatedDelivery}
                        onChange={(e) => setEstimatedDelivery(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-800 outline-none focus:border-[#9B332C]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveFulfillment}
                      disabled={isSaving}
                      className="w-full py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm mt-3"
                    >
                      <Save className="w-3.5 h-3.5 text-[#FCE5A4]" />
                      <span>{isSaving ? 'Updating...' : 'Save Lifecycle Updates'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Items In Order Table */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#9B332C]" />
                    <span>Consignment Itemization ({totalItemCount} Units)</span>
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    Currency: <strong className="text-stone-800">{order.financials.currency}</strong>
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF5EE] text-stone-600 uppercase tracking-wider font-bold border-b border-stone-200">
                        <th className="py-2.5 px-3">Item / Craft Specification</th>
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3">Variant / Color &amp; Size</th>
                        <th className="py-2.5 px-3 text-right">Quantity</th>
                        <th className="py-2.5 px-3 text-right">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {order.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF5EE]/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={resolveProductImage(item.image)}
                                alt={item.productName}
                                className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/30 shadow-xs"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <div>
                                <p className="font-bold text-stone-900 text-xs sm:text-sm">{item.productName}</p>
                                {item.customNotes && (
                                  <p className="text-[11px] text-[#9B332C] mt-0.5">Note: {item.customNotes}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-stone-600">{item.sku}</td>
                          <td className="py-3 px-3 text-stone-700">
                            <div>{item.color}</div>
                            <div className="text-[11px] text-stone-500">{item.size}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-stone-900">{item.quantity} pcs</td>
                          <td className="py-3 px-3 text-right font-mono text-stone-700">₹{item.unitPriceInr.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-stone-900">
                            ₹{item.totalPriceInr.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Totals Breakdown */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF5EE] p-4 rounded-xl">
                  <div className="text-xs text-stone-600 space-y-1">
                    <p><strong>Payment Method:</strong> {order.financials.paymentMethod}</p>
                    <p>
                      <strong>Payment Status:</strong>{' '}
                      <span className={`font-bold uppercase ${
                        order.financials.paymentStatus === 'paid' ? 'text-emerald-700' :
                        order.financials.paymentStatus === 'advance_50' ? 'text-blue-700' : 'text-amber-700'
                      }`}>
                        {order.financials.paymentStatus.replace('_', ' ')}
                      </span>
                    </p>
                  </div>

                  <div className="w-full sm:w-64 space-y-1.5 text-xs text-stone-700">
                    <div className="flex justify-between">
                      <span>Items Subtotal:</span>
                      <span className="font-mono font-semibold">₹{order.financials.subtotalInr.toLocaleString('en-IN')}</span>
                    </div>
                    {order.financials.discountInr > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Wholesale Discount:</span>
                        <span className="font-mono">-₹{order.financials.discountInr.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Air Cargo / Shipping:</span>
                      <span className="font-mono">₹{order.financials.shippingInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes &amp; Export Cess (GST):</span>
                      <span className="font-mono">₹{order.financials.taxInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-300 font-bold text-sm text-[#9B332C]">
                      <span>Grand Invoiced Total:</span>
                      <span className="font-mono text-base">₹{order.financials.totalInr.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff Activity & Notes Log */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-sm space-y-4">
                <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2 border-b border-stone-200 pb-3">
                  <Clock className="w-4 h-4 text-[#9B332C]" />
                  <span>Atelier Communication &amp; Staff Notes</span>
                </h3>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Record craft update, client call note, or packing brief..."
                    className="flex-1 bg-[#FAF5EE] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {order.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-[#FAF5EE] rounded-xl border border-stone-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span className="font-bold text-[#9B332C]">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                      </div>
                      <p className="text-stone-800 font-royal-body">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: PRINTABLE PROFORMA INVOICE VIEW */}
          {activeTab === 'invoice' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-sm space-y-8 printable-invoice">
              
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/30">
                <div>
                  <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#801B18]">
                    RAMAM TEXTILES JAIPUR
                  </h1>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Traditional Wooden Block Printing &amp; Quilted Luxury Textile Atelier
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 mt-1">
                    GSTIN: 08AAACR9214K1Z2 • IEC Code: 0819203847 • Sanganer &amp; Bagru, Jaipur, Rajasthan, India
                  </p>
                </div>

                <div className="text-right">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold transition-all shadow-sm print:hidden"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Proforma Slip</span>
                  </button>
                  <p className="text-xs font-mono font-bold text-stone-900 mt-2">
                    PROFORMA INVOICE #{order.orderNumber}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Invoice Parties */}
              <div className="grid grid-cols-2 gap-6 text-xs">
                <div className="bg-[#FAF5EE] p-4 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Manufacturer / Exporter</span>
                  <p className="font-bold text-stone-900 text-sm mt-1">Ramam Textiles Atelier</p>
                  <p className="text-stone-600 mt-0.5">Sanganer Export Enclave, Jaipur, Rajasthan 302029</p>
                  <p className="text-stone-600">Email: export@ramamtextiles.shop • Phone: +91 94140 00000</p>
                </div>

                <div className="bg-[#FAF5EE] p-4 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Consignee / B2B Buyer</span>
                  <p className="font-bold text-stone-900 text-sm mt-1">{order.customer.company || order.customer.name}</p>
                  <p className="text-stone-600 mt-0.5">Attn: {order.customer.name}</p>
                  <p className="text-stone-600">{order.customer.address || `${order.customer.city}, ${order.customer.country}`}</p>
                  <p className="text-stone-600">Email: {order.customer.email} • Tax/VAT: {order.customer.taxId || 'N/A'}</p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <table className="w-full text-left text-xs border border-stone-200">
                  <thead>
                    <tr className="bg-[#FAF5EE] text-stone-700 font-bold border-b border-stone-200">
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Item Description &amp; Craft Details</th>
                      <th className="p-2.5">SKU / HS Code</th>
                      <th className="p-2.5 text-right">Qty (Pcs)</th>
                      <th className="p-2.5 text-right">Rate (INR)</th>
                      <th className="p-2.5 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {order.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 text-stone-500">{idx + 1}</td>
                        <td className="p-2.5 font-semibold text-stone-900">
                          {it.productName}
                          <div className="text-[10px] text-stone-500 font-normal">Variant: {it.color} • {it.size}</div>
                        </td>
                        <td className="p-2.5 font-mono text-stone-600">{it.sku} / 4202.92.00</td>
                        <td className="p-2.5 text-right font-bold">{it.quantity}</td>
                        <td className="p-2.5 text-right font-mono">₹{it.unitPriceInr.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-mono font-bold">₹{it.totalPriceInr.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#FAF5EE] font-bold">
                      <td colSpan={5} className="p-2.5 text-right">Subtotal:</td>
                      <td className="p-2.5 text-right font-mono">₹{order.financials.subtotalInr.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="p-2.5 text-right text-stone-600">Export Air Cargo &amp; Palletizing:</td>
                      <td className="p-2.5 text-right font-mono">₹{order.financials.shippingInr.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="p-2.5 text-right text-stone-600">Taxes (IGST 5% / Export Surcharge):</td>
                      <td className="p-2.5 text-right font-mono">₹{order.financials.taxInr.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-[#241A16] text-[#FCE5A4] font-extrabold text-sm">
                      <td colSpan={5} className="p-3 text-right">Total Payable:</td>
                      <td className="p-3 text-right font-mono">₹{order.financials.totalInr.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Wire details & Signature */}
              <div className="grid grid-cols-2 gap-6 pt-4 text-xs">
                <div className="space-y-1 text-stone-600">
                  <p className="font-bold text-stone-800 uppercase text-[10px] tracking-wider">Wire Settlement Banking Details:</p>
                  <p>Bank: HDFC Bank Ltd • Branch: Sanganer Industrial Area, Jaipur</p>
                  <p>Account Name: Ramam Textiles Atelier</p>
                  <p>A/C Number: 50200092184910 • IFSC: HDFC0004918</p>
                  <p>SWIFT Code: HDFCINBBXXX (For International Wire Remittances)</p>
                </div>

                <div className="text-right flex flex-col justify-end items-end space-y-1">
                  <div className="w-36 border-b border-stone-400 mb-1" />
                  <p className="font-bold text-stone-800">Authorized Atelier Signatory</p>
                  <p className="text-[11px] text-stone-500">For Ramam Textiles Jaipur</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
