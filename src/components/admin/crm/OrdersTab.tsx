import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Download, RotateCcw, ExternalLink, 
  MessageCircle, Printer, Eye, Truck, CheckCircle2, Clock, 
  AlertCircle, DollarSign, Package, MoreVertical, Trash2, Edit2
} from 'lucide-react';
import { CRMOrder, CRMOrderItem, OrderStatus, PaymentStatus } from '../../../types/crm';
import { getAllOrders, updateOrderStatus, updatePaymentStatus, deleteOrder, exportOrdersToCSV, resetCRMData } from '../../../utils/crmStorage';
import { OrderDetailsModal } from './OrderDetailsModal';
import { resolveProductImage } from '../../../utils/imageUtils';
import { useApp } from '../../../context/AppContext';

interface OrdersTabProps {
  onOpenNewOrderModal: () => void;
  onRefreshStats: () => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ onOpenNewOrderModal, onRefreshStats }) => {
  const { showToast } = useApp();
  const [orders, setOrders] = useState<CRMOrder[]>(() => getAllOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<CRMOrder | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const refreshOrders = () => {
    const list = getAllOrders();
    setOrders(list);
    onRefreshStats();
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(q) || order.orderNumber.toLowerCase().includes(q);
        const matchesName = order.customer.name.toLowerCase().includes(q);
        const matchesCompany = (order.customer.company || '').toLowerCase().includes(q);
        const matchesEmail = order.customer.email.toLowerCase().includes(q);
        const matchesCountry = order.customer.country.toLowerCase().includes(q);
        const matchesTracking = (order.fulfillment.trackingNumber || '').toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesCompany && !matchesEmail && !matchesCountry && !matchesTracking) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'rfqs' && !(order.fulfillment.status === 'rfq_received' || order.fulfillment.status === 'quote_sent')) return false;
        if (statusFilter === 'production' && !(order.fulfillment.status === 'in_production' || order.fulfillment.status === 'quality_check')) return false;
        if (statusFilter === 'transit' && !(order.fulfillment.status === 'in_transit' || order.fulfillment.status === 'ready_for_dispatch')) return false;
        if (statusFilter === 'delivered' && order.fulfillment.status !== 'delivered') return false;
        if (statusFilter === 'cancelled' && order.fulfillment.status !== 'cancelled') return false;
      }

      // Payment filter
      if (paymentFilter !== 'all' && order.financials.paymentStatus !== paymentFilter) {
        return false;
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  const handleQuickStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    refreshOrders();
    showToast(`Order status updated to ${newStatus.replace('_', ' ')}.`, 'info');
  };

  const handleDelete = (orderId: string, orderNumber: string) => {
    if (window.confirm(`Are you sure you want to delete Consignment #${orderNumber}?`)) {
      deleteOrder(orderId);
      refreshOrders();
      showToast(`Order #${orderNumber} deleted.`, 'info');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all CRM orders to repository seed sample data?')) {
      resetCRMData();
      refreshOrders();
      showToast('CRM orders reset to seed defaults.', 'success');
    }
  };

  // WhatsApp helper
  const getWhatsAppLink = (order: CRMOrder) => {
    const raw = order.customer.whatsapp || order.customer.phone || '';
    const clean = raw.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${order.customer.name}, Ramam Textiles Jaipur updating you regarding consignment #${order.orderNumber}. Tracking: ${order.fulfillment.trackingNumber || 'Processing in Jaipur workshop'}.`
    );
    return `https://wa.me/${clean}?text=${msg}`;
  };

  return (
    <div className="space-y-6 animate-fade-in font-royal-body">
      
      {/* Top Controls & Status Pills */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/35 shadow-sm space-y-4">
        
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-stone-200 text-xs">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              statusFilter === 'all' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Consignments ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('rfqs')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              statusFilter === 'rfqs' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            RFQs &amp; Quotes ({orders.filter(o => o.fulfillment.status === 'rfq_received' || o.fulfillment.status === 'quote_sent').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('production')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              statusFilter === 'production' ? 'bg-orange-600 text-white shadow-sm' : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
            }`}
          >
            In Workshop ({orders.filter(o => o.fulfillment.status === 'in_production' || o.fulfillment.status === 'quality_check').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('transit')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              statusFilter === 'transit' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            In Transit / Air Cargo ({orders.filter(o => o.fulfillment.status === 'in_transit' || o.fulfillment.status === 'ready_for_dispatch').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('delivered')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              statusFilter === 'delivered' ? 'bg-green-700 text-white shadow-sm' : 'bg-green-50 text-green-800 hover:bg-green-100'
            }`}
          >
            Delivered ({orders.filter(o => o.fulfillment.status === 'delivered').length})
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order #, Client Name, Company, Email, Tracking, or Country..."
              className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-700 outline-none"
            >
              <option value="all">Payment: All</option>
              <option value="paid">100% Paid</option>
              <option value="advance_50">50% Advance</option>
              <option value="unpaid">Unpaid</option>
            </select>

            <button
              type="button"
              onClick={exportOrdersToCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onOpenNewOrderModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FCE5A4]" />
              <span>New Consignment</span>
            </button>

            <button
              type="button"
              onClick={handleResetData}
              title="Reset Demo Data"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Orders Data Table */}
      <div className="bg-white rounded-3xl border border-[#D4AF37]/35 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF5EE] text-stone-700 font-bold border-b border-stone-200 uppercase tracking-wider">
                <th className="py-3 px-4">Consignment #</th>
                <th className="py-3 px-4">Client / Company</th>
                <th className="py-3 px-4">Items Breakdown</th>
                <th className="py-3 px-4 text-right">Invoiced Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Lifecycle Status</th>
                <th className="py-3 px-4">Air Cargo Tracking</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-500">
                    <Package className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                    <p className="font-bold text-stone-700 text-sm">No consignment orders found</p>
                    <p className="text-xs text-stone-400 mt-0.5">Try altering your search filters or click "New Consignment".</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const firstItem = order.items[0];
                  const totalPcs = order.items.reduce((s: number, it: CRMOrderItem) => s + it.quantity, 0);

                  return (
                    <tr key={order.id} className="hover:bg-[#FAF5EE]/50 transition-colors group">
                      
                      {/* Consignment # & Date */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}
                          className="font-playfair font-bold text-[#9B332C] hover:underline text-sm block text-left"
                        >
                          #{order.orderNumber}
                        </button>
                        <span className="text-[10px] text-stone-400 font-mono block mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                          {order.source.replace('Official ', '').substring(0, 18)}
                        </span>
                      </td>

                      {/* Client / Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900 text-xs sm:text-sm">
                          {order.customer.name}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate max-w-[160px]">
                          {order.customer.company || 'Direct Buyer'}
                        </div>
                        <div className="text-[10px] text-[#9B332C] font-semibold mt-0.5">
                          📍 {order.customer.city ? `${order.customer.city}, ` : ''}{order.customer.country}
                        </div>
                      </td>

                      {/* Items Preview */}
                      <td className="py-3.5 px-4">
                        {firstItem && (
                          <div className="flex items-center gap-2.5">
                            <img
                              src={resolveProductImage(firstItem.image)}
                              alt={firstItem.productName}
                              className="w-9 h-9 rounded-lg object-cover border border-[#D4AF37]/30 shadow-2xs"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                            <div className="max-w-[150px]">
                              <p className="font-semibold text-stone-800 text-[11px] truncate" title={firstItem.productName}>
                                {firstItem.productName}
                              </p>
                              <p className="text-[10px] text-stone-500 font-mono">
                                <strong>{totalPcs} pcs</strong> {order.items.length > 1 ? `(${order.items.length} SKUs)` : ''}
                              </p>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Invoiced Total */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="font-mono font-bold text-stone-900 text-sm">
                          ₹{order.financials.totalInr.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono">
                          {order.financials.currency !== 'INR' ? `(~${order.financials.currency})` : 'Ex-Jaipur Atelier'}
                        </div>
                      </td>

                      {/* Payment Status */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-block ${
                          order.financials.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          order.financials.paymentStatus === 'advance_50' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                          order.financials.paymentStatus === 'refunded' ? 'bg-stone-200 text-stone-700' :
                          'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {order.financials.paymentStatus.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Lifecycle Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.fulfillment.status}
                          onChange={(e) => handleQuickStatusChange(order.id, e.target.value as OrderStatus)}
                          className="bg-[#FAF5EE] border border-stone-200 rounded-lg px-2 py-1 text-[11px] font-bold text-stone-800 outline-none focus:border-[#9B332C]"
                        >
                          <option value="rfq_received">RFQ Received</option>
                          <option value="quote_sent">Quote Sent</option>
                          <option value="sample_approved">Sample Approved</option>
                          <option value="in_production">In Production</option>
                          <option value="quality_check">Quality Check</option>
                          <option value="ready_for_dispatch">Ready Dispatch</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Air Cargo Tracking */}
                      <td className="py-3.5 px-4">
                        {order.fulfillment.trackingNumber && order.fulfillment.trackingNumber !== 'PENDING-DISPATCH' ? (
                          <div>
                            <span className="font-mono text-[11px] font-bold text-stone-800 block">
                              {order.fulfillment.trackingNumber}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              {order.fulfillment.carrier}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-stone-400 italic">Pre-Dispatch Batch</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}
                            className="p-1.5 rounded-lg bg-[#FAF0EB] hover:bg-[#801B18] text-[#9B332C] hover:text-white transition-all shadow-xs"
                            title="Inspect Consignment Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={getWhatsAppLink(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-all"
                            title="WhatsApp Buyer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(order.id, order.orderNumber)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition-all"
                            title="Delete Consignment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-dive Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isDetailsOpen}
          onClose={() => { setIsDetailsOpen(false); setSelectedOrder(null); }}
          onOrderUpdated={(updated) => {
            setSelectedOrder(updated);
            refreshOrders();
          }}
        />
      )}

    </div>
  );
};
