import React, { useState } from 'react';
import { 
  X, Plus, Trash2, Save, Package, Building, User, 
  Mail, Phone, MapPin, DollarSign, Truck, CheckCircle2 
} from 'lucide-react';
import { CRMOrder, CRMOrderItem, OrderStatus, PaymentStatus } from '../../../types/crm';
import { Product } from '../../../types';
import { getStoredProducts } from '../../../utils/productStorage';
import { saveOrder } from '../../../utils/crmStorage';
import { useApp } from '../../../context/AppContext';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (order: CRMOrder) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onOrderCreated
}) => {
  const { showToast } = useApp();
  const products = getStoredProducts();

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [taxId, setTaxId] = useState('');

  // Selected Items in Order
  const [items, setItems] = useState<CRMOrderItem[]>([]);

  // Item Picker State
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [itemQuantity, setItemQuantity] = useState<number>(50);
  const [customUnitPrice, setCustomUnitPrice] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');

  // Update item defaults when product selection changes
  React.useEffect(() => {
    const prod = products.find(p => p.id === selectedProductId);
    if (prod) {
      setSelectedColor(prod.colors?.[0] || 'Standard');
      setSelectedSize(prod.sizes?.[0] || 'Standard');
      const tierPrice = prod.wholesaleTiers?.[0]?.pricePerUnitInr || prod.indicativeRetailInr || 500;
      setCustomUnitPrice(tierPrice);
    }
  }, [selectedProductId]);

  // Financials
  const [shippingInr, setShippingInr] = useState<number>(5000);
  const [taxInr, setTaxInr] = useState<number>(0);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'AED'>('INR');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('advance_50');
  const [paymentMethod, setPaymentMethod] = useState('Bank Wire (SWIFT)');
  const [fulfillmentStatus, setFulfillmentStatus] = useState<OrderStatus>('in_production');
  const [carrier, setCarrier] = useState('DHL Express Worldwide');
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!isOpen) return null;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === selectedProductId);
    if (!prod) return;

    const unitPrice = Number(customUnitPrice) > 0 ? Number(customUnitPrice) : 500;
    const qty = Number(itemQuantity) > 0 ? Number(itemQuantity) : 25;

    const newItem: CRMOrderItem = {
      productId: prod.id,
      productName: prod.name,
      sku: prod.sku,
      image: prod.images?.[0] || '/products/vanity-playing-cards.jpg',
      color: selectedColor || prod.colors?.[0] || 'Standard',
      size: selectedSize || prod.sizes?.[0] || 'Standard',
      quantity: qty,
      unitPriceInr: unitPrice,
      totalPriceInr: qty * unitPrice,
      customNotes: customNotes.trim() || undefined
    };

    setItems([...items, newItem]);
    setCustomNotes('');
    showToast(`Added ${prod.name} (${qty} pcs) to consignment.`, 'success');
  };

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const itemsSubtotal = items.reduce((s, it) => s + it.totalPriceInr, 0);
  const calculatedTax = taxInr > 0 ? taxInr : Math.round(itemsSubtotal * 0.05);
  const grandTotal = itemsSubtotal + Number(shippingInr) + calculatedTax;

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !email.trim()) {
      showToast('Client name and email are required.', 'error');
      return;
    }

    if (items.length === 0) {
      showToast('Please add at least 1 consignment item to the order.', 'error');
      return;
    }

    const orderNum = `RT-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = `RAMAM-2026-${orderNum.replace('RT-', '')}`;

    const newOrder: CRMOrder = {
      id: orderId,
      orderNumber: orderNum,
      type: 'wholesale_consignment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'Direct Atelier Staff Entry',
      customer: {
        name: customerName.trim(),
        company: companyName.trim() || 'Direct Boutique Client',
        email: email.trim(),
        phone: phone.trim() || 'N/A',
        whatsapp: phone.trim() || '',
        country: country.trim() || 'India',
        city: city.trim() || 'Jaipur',
        address: address.trim(),
        taxId: taxId.trim()
      },
      items,
      financials: {
        subtotalInr: itemsSubtotal,
        discountInr: 0,
        shippingInr: Number(shippingInr) || 0,
        taxInr: calculatedTax,
        totalInr: grandTotal,
        currency,
        paymentStatus,
        paymentMethod
      },
      fulfillment: {
        status: fulfillmentStatus,
        carrier: carrier.trim() || 'DHL Express Worldwide',
        trackingNumber: trackingNumber.trim() || 'PROCESSING-JAIPUR',
        dispatchHub: 'Sanganer Workshop Unit 1'
      },
      notes: [
        {
          id: `note-${Date.now()}`,
          createdAt: new Date().toISOString(),
          author: 'Atelier Staff Console',
          text: `Consignment created manually in CRM panel. Initial payment status: ${paymentStatus}.`
        }
      ]
    };

    saveOrder(newOrder);
    onOrderCreated(newOrder);
    showToast(`Consignment #${orderNum} booked successfully!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in font-royal-body">
      <div className="relative w-full max-w-4xl bg-[#FAF5EE] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-[#241A16] text-[#FAF5EE] p-5 sm:px-8 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#801B18] text-[#FCE5A4] flex items-center justify-center font-bold">
              <Plus className="w-5 h-5 text-[#FCE5A4]" />
            </div>
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#FCE5A4]">
                Create New B2B Consignment Order
              </h2>
              <p className="text-xs text-stone-400">
                Book official boutique shipment, generate proforma, and assign consignment tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveOrder} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Section 1: Customer Info */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2 border-b border-stone-200 pb-2">
              <User className="w-4 h-4 text-[#9B332C]" />
              <span>B2B Client &amp; Consignee Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Boutique / Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Maison Riviera Studio Paris"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@rivierastudio.fr"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 49 20 18 90"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. France / United States / India"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  City &amp; Postal Code
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Paris, 75001"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Shipping Delivery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="14 Rue Saint-Honoré, Paris"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#9B332C]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Consignment Items Picker */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2 border-b border-stone-200 pb-2">
              <Package className="w-4 h-4 text-[#9B332C]" />
              <span>Add Catalogue Items to Consignment</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-[#FAF5EE] p-4 rounded-xl border border-stone-200">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Select Product
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Quantity (Pcs)
                </label>
                <input
                  type="number"
                  min="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Unit Price (₹ INR)
                </label>
                <input
                  type="number"
                  min="1"
                  value={customUnitPrice}
                  onChange={(e) => setCustomUnitPrice(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#9B332C]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Color / Variant
                </label>
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  placeholder="Color variant"
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Size / Dimension
                </label>
                <input
                  type="text"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  placeholder="Standard size"
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full py-2 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FCE5A4]" />
                  <span>Add Line Item</span>
                </button>
              </div>
            </div>

            {/* Added Items List */}
            {items.length > 0 && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border border-stone-200">
                  <thead>
                    <tr className="bg-[#FAF5EE] text-stone-700 font-bold border-b border-stone-200">
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5">SKU</th>
                      <th className="p-2.5">Variant</th>
                      <th className="p-2.5 text-right">Qty</th>
                      <th className="p-2.5 text-right">Unit Rate</th>
                      <th className="p-2.5 text-right">Total</th>
                      <th className="p-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-stone-900">{it.productName}</td>
                        <td className="p-2.5 font-mono text-stone-600">{it.sku}</td>
                        <td className="p-2.5 text-stone-700">{it.color} • {it.size}</td>
                        <td className="p-2.5 text-right font-bold text-stone-900">{it.quantity} pcs</td>
                        <td className="p-2.5 text-right font-mono">₹{it.unitPriceInr.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-stone-900">
                          ₹{it.totalPriceInr.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 3: Financials & Shipping */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2 border-b border-stone-200 pb-2">
              <DollarSign className="w-4 h-4 text-[#9B332C]" />
              <span>Financials, Freight &amp; Fulfillment</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Air Cargo / Freight (₹ INR)
                </label>
                <input
                  type="number"
                  value={shippingInr}
                  onChange={(e) => setShippingInr(Number(e.target.value))}
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="advance_50">50% Advance Received</option>
                  <option value="paid">100% Fully Settled</option>
                  <option value="unpaid">Unpaid / Awaiting Wire</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Fulfillment Status
                </label>
                <select
                  value={fulfillmentStatus}
                  onChange={(e) => setFulfillmentStatus(e.target.value as OrderStatus)}
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="rfq_received">RFQ Received</option>
                  <option value="quote_sent">Quote Sent</option>
                  <option value="in_production">In Production</option>
                  <option value="quality_check">Quality Check</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
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
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Air Waybill / Tracking #
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. DHL-8492019481"
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Billing Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>
            </div>

            {/* Total calculation banner */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs bg-[#FAF5EE] p-4 rounded-xl">
              <div>
                <span className="text-stone-500 block">Subtotal: ₹{itemsSubtotal.toLocaleString('en-IN')} + Freight: ₹{shippingInr} + Tax: ₹{calculatedTax}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Grand Invoiced Amount</span>
                <span className="font-playfair text-xl font-bold text-[#9B332C]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#FCE5A4]" />
              <span>Book Consignment &amp; Save Order</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
