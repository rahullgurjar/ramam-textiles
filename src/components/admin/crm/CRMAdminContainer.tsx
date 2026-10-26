import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Package, Users, BarChart3, Plus, 
  ArrowLeft, ExternalLink, ShieldCheck, Globe, BookOpen, 
  LogOut, CheckCircle2, Clock, Truck, DollarSign, Sparkles
} from 'lucide-react';
import { OrdersTab } from './OrdersTab';
import { ProductsTab } from './ProductsTab';
import { CustomersTab } from './CustomersTab';
import { AnalyticsTab } from './AnalyticsTab';
import { NewOrderModal } from './NewOrderModal';
import { getCRMStats, CRM_UPDATED_EVENT } from '../../../utils/crmStorage';
import { getStoredProducts, PRODUCTS_UPDATED_EVENT } from '../../../utils/productStorage';
import { CRMStats } from '../../../types/crm';

interface CRMAdminContainerProps {
  onNavigate: (path: string) => void;
  onBackToSecurity: () => void;
  onBackToSEO: () => void;
  onBackToBlogs: () => void;
  onLogout?: () => void;
}

export const CRMAdminContainer: React.FC<CRMAdminContainerProps> = ({
  onNavigate,
  onBackToSecurity,
  onBackToSEO,
  onBackToBlogs,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'customers' | 'analytics'>('orders');
  const [stats, setStats] = useState<CRMStats>(() => getCRMStats());
  const [productCount, setProductCount] = useState<number>(() => getStoredProducts().length);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  const refreshData = () => {
    setStats(getCRMStats());
    setProductCount(getStoredProducts().length);
  };

  useEffect(() => {
    const handleCrmUpdate = () => refreshData();
    const handleProdUpdate = () => refreshData();

    window.addEventListener(CRM_UPDATED_EVENT, handleCrmUpdate);
    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleProdUpdate);

    return () => {
      window.removeEventListener(CRM_UPDATED_EVENT, handleCrmUpdate);
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleProdUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#241A16] font-royal-body pb-16">
      
      {/* Top Main Admin Suite Navigation */}
      <div className="bg-[#241A16] text-[#FAF5EE] px-4 sm:px-6 py-2.5 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="font-playfair font-bold text-[#FCE5A4] hidden md:inline shrink-0">
              Atelier Administration:
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className="px-3 py-1 rounded-lg bg-[#801B18] text-[#FAF5EE] font-bold border border-[#D4AF37]/40 flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CRM &amp; Orders Hub</span>
            </button>
            <button
              type="button"
              onClick={onBackToBlogs}
              className="px-3 py-1 rounded-lg hover:bg-white/10 text-stone-300 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog Admin &amp; Editorial</span>
            </button>
            <button
              type="button"
              onClick={onBackToSEO}
              className="px-3 py-1 rounded-lg hover:bg-white/10 text-stone-300 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>On-Page SEO Panel</span>
            </button>
            <button
              type="button"
              onClick={onBackToSecurity}
              className="px-3 py-1 rounded-lg hover:bg-white/10 text-stone-300 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security &amp; Webhook</span>
            </button>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors shrink-0 ml-2"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Luxury Hero Banner */}
        <div className="bg-[#FAF0EB] rounded-[32px] p-6 sm:p-10 border border-[#D4AF37]/40 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient from-[#D4AF37]/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FAF5EE] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#9B332C]" />
                <span>Atelier Enterprise Command Center</span>
              </div>
              <h1 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#241A16] tracking-tight">
                CRM, Orders &amp; Product Inventory Hub
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Manage B2B wholesale consignments, incoming RFQs, customer profiles, live shipment tracking, and edit product catalogue specifications in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsNewOrderModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#9B332C] hover:bg-[#801B18] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#FCE5A4]" />
                <span>Create Consignment</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
              >
                <Package className="w-4 h-4 text-[#9B332C]" />
                <span>Manage Products</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 mt-6 border-t border-[#D4AF37]/25 relative z-10 text-xs">
            
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Gross Orders Value</span>
              <p className="font-mono font-bold text-[#9B332C] text-base mt-0.5">
                ₹{stats.totalRevenueInr.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Consignments</span>
              <p className="font-mono font-bold text-stone-900 text-base mt-0.5">
                {stats.totalOrdersCount} Booked
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-200">
              <span className="text-[10px] text-amber-700 font-bold uppercase block">Pending RFQs</span>
              <p className="font-mono font-bold text-amber-900 text-base mt-0.5">
                {stats.pendingRfqsCount} Inquiries
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-orange-200">
              <span className="text-[10px] text-orange-700 font-bold uppercase block">In Production</span>
              <p className="font-mono font-bold text-orange-900 text-base mt-0.5">
                {stats.inProductionCount} Batches
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-200">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block">In Transit</span>
              <p className="font-mono font-bold text-emerald-900 text-base mt-0.5">
                {stats.inTransitCount} Air Cargo
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Live Catalog</span>
              <p className="font-mono font-bold text-stone-900 text-base mt-0.5">
                {productCount} SKUs
              </p>
            </div>

          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/35 pb-2">
          
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders' 
                ? 'bg-[#9B332C] text-white shadow-md' 
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders &amp; Consignments</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
            }`}>
              {stats.totalOrdersCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products' 
                ? 'bg-[#9B332C] text-white shadow-md' 
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products &amp; Inventory</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
            }`}>
              {productCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'customers' 
                ? 'bg-[#9B332C] text-white shadow-md' 
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client &amp; Buyer CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'analytics' 
                ? 'bg-[#9B332C] text-white shadow-md' 
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics &amp; Archival</span>
          </button>

        </div>

        {/* Selected Tab Content */}
        {activeTab === 'orders' && (
          <OrdersTab
            onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
            onRefreshStats={refreshData}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab onNavigate={onNavigate} />
        )}

        {activeTab === 'customers' && (
          <CustomersTab />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab />
        )}

      </div>

      {/* New Order Modal */}
      {isNewOrderModalOpen && (
        <NewOrderModal
          isOpen={isNewOrderModalOpen}
          onClose={() => setIsNewOrderModalOpen(false)}
          onOrderCreated={() => {
            refreshData();
          }}
        />
      )}

    </div>
  );
};
