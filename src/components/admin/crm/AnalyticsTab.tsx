import React from 'react';
import { 
  BarChart3, TrendingUp, Globe, Package, DollarSign, 
  Download, ShieldCheck, CheckCircle2, Clock 
} from 'lucide-react';
import { getAllOrders, getCRMStats, exportOrdersToCSV } from '../../../utils/crmStorage';
import { getStoredProducts, exportProductsJson } from '../../../utils/productStorage';
import { useApp } from '../../../context/AppContext';
import { CRMOrder, CRMOrderItem } from '../../../types/crm';
import { Product } from '../../../types';

export const AnalyticsTab: React.FC = () => {
  const { showToast } = useApp();
  const orders: CRMOrder[] = getAllOrders();
  const stats = getCRMStats();
  const products: Product[] = getStoredProducts();

  // Country breakdown
  const countryMap: Record<string, { count: number; totalInr: number }> = {};
  orders.forEach((o: CRMOrder) => {
    const c = o.customer.country || 'Other';
    if (!countryMap[c]) countryMap[c] = { count: 0, totalInr: 0 };
    countryMap[c].count += 1;
    countryMap[c].totalInr += o.financials.totalInr;
  });
  const countryList = Object.entries(countryMap).sort((a, b) => b[1].totalInr - a[1].totalInr);

  // Category breakdown
  const categoryMap: Record<string, { count: number; revenue: number }> = {};
  orders.forEach((o: CRMOrder) => {
    o.items.forEach((it: CRMOrderItem) => {
      const prod = products.find((p: Product) => p.id === it.productId || p.sku === it.sku);
      const cat = prod?.category || 'bags';
      if (!categoryMap[cat]) categoryMap[cat] = { count: 0, revenue: 0 };
      categoryMap[cat].count += it.quantity;
      categoryMap[cat].revenue += it.totalPriceInr;
    });
  });
  const categoryList = Object.entries(categoryMap).sort((a, b) => b[1].revenue - a[1].revenue);

  // Total items volume
  const totalUnits = orders.reduce((sum: number, o: CRMOrder) => sum + o.items.reduce((s: number, it: CRMOrderItem) => s + it.quantity, 0), 0);

  const handleExportJson = () => {
    const jsonStr = exportProductsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ramam_Textiles_Catalog_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Catalog exported as JSON backup.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in font-royal-body">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/35 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            Gross B2B Consignment Volume
          </span>
          <p className="font-playfair text-2xl font-extrabold text-[#9B332C]">
            ₹{stats.totalRevenueInr.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-stone-500 font-mono">
            ~${Math.round(stats.totalRevenueInr * 0.012).toLocaleString()} USD Export Value
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/35 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            Total Handcrafted Units Booked
          </span>
          <p className="font-playfair text-2xl font-extrabold text-stone-900">
            {totalUnits.toLocaleString()} Pcs
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 inline" />
            <span>Passed 4-Point Quality Inspection</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/35 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            Average Consignment Size (AOV)
          </span>
          <p className="font-playfair text-2xl font-extrabold text-[#241A16]">
            ₹{stats.averageOrderValueInr.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-stone-500">
            Across {stats.totalOrdersCount} Wholesale Shipments
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/35 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            Settlement Rate
          </span>
          <p className="font-playfair text-2xl font-extrabold text-emerald-800">
            {stats.totalOrdersCount > 0 ? Math.round((stats.paidOrdersCount / stats.totalOrdersCount) * 100) : 0}%
          </p>
          <p className="text-[11px] text-stone-500">
            {stats.paidOrdersCount} Settled • {stats.unpaidOrdersCount} Pending Remittance
          </p>
        </div>

      </div>

      {/* Grid: Category Breakdown & Country Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Revenue Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/35 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#9B332C]" />
              <span>Volume &amp; Revenue by Category</span>
            </h3>
            <span className="text-xs text-stone-500 font-bold">Atelier Share</span>
          </div>

          <div className="space-y-4">
            {categoryList.map(([cat, data]) => {
              const pct = stats.totalRevenueInr > 0 ? Math.round((data.revenue / stats.totalRevenueInr) * 100) : 0;
              return (
                <div key={cat} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-stone-800 uppercase tracking-wider">{cat}</span>
                    <span className="font-mono text-[#9B332C]">₹{data.revenue.toLocaleString('en-IN')} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#9B332C] transition-all duration-500"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-stone-500 text-right">
                    {data.count} pieces fabricated
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Destination Markets */}
        <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/35 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#9B332C]" />
              <span>Global Export Destinations</span>
            </h3>
            <span className="text-xs text-stone-500 font-bold">{countryList.length} Countries</span>
          </div>

          <div className="space-y-3">
            {countryList.map(([country, data]) => {
              const pct = stats.totalRevenueInr > 0 ? Math.round((data.totalInr / stats.totalRevenueInr) * 100) : 0;
              return (
                <div key={country} className="p-3 bg-[#FAF5EE] rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900 text-sm">📍 {country}</p>
                    <p className="text-[11px] text-stone-500">
                      {data.count} {data.count === 1 ? 'consignment' : 'consignments'} dispatched
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-stone-900 text-sm">
                      ₹{data.totalInr.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-[#9B332C] font-bold">
                      {pct}% of export volume
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Export & Data Archival Hub */}
      <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/35 shadow-sm space-y-4">
        <h3 className="font-playfair text-lg font-bold text-[#241A16] flex items-center gap-2 border-b border-stone-200 pb-3">
          <Download className="w-4 h-4 text-[#9B332C]" />
          <span>Atelier Consignment Data Archival &amp; Backups</span>
        </h3>
        
        <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
          Download complete archival snapshots of wholesale consignments, RFQ leads, client registries, and product catalog metadata for accounting, customs reconciliation, and audit reporting.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={exportOrdersToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#FCE5A4]" />
            <span>Download Orders &amp; RFQs Spreadsheet (CSV)</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Products Catalogue (JSON)</span>
          </button>
        </div>
      </div>

    </div>
  );
};
