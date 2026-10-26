import React, { useState, useMemo } from 'react';
import { 
  Search, Users, Building, Mail, Phone, MessageCircle, 
  MapPin, DollarSign, Package, Star, ShieldCheck, ArrowRight
} from 'lucide-react';
import { CRMCustomer } from '../../../types/crm';
import { getAllCustomers } from '../../../utils/crmStorage';

export const CustomersTab: React.FC = () => {
  const [customers, setCustomers] = useState<CRMCustomer[]>(() => getAllCustomers());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  // Filtered
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesCompany = (c.company || '').toLowerCase().includes(q);
        const matchesEmail = c.email.toLowerCase().includes(q);
        const matchesCountry = c.country.toLowerCase().includes(q);
        if (!matchesName && !matchesCompany && !matchesEmail && !matchesCountry) {
          return false;
        }
      }

      if (selectedTier !== 'all' && c.tier !== selectedTier) {
        return false;
      }

      if (selectedCountry !== 'all' && c.country !== selectedCountry) {
        return false;
      }

      return true;
    });
  }, [customers, searchQuery, selectedTier, selectedCountry]);

  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    customers.forEach(c => { if (c.country) set.add(c.country); });
    return Array.from(set).sort();
  }, [customers]);

  const totalClients = customers.length;
  const vipClientsCount = customers.filter(c => c.tier === 'VIP Wholesale').length;
  const totalLtv = customers.reduce((s, c) => s + c.totalSpentInr, 0);

  const getWhatsAppLink = (cust: CRMCustomer) => {
    const raw = cust.whatsapp || cust.phone || '';
    const clean = raw.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${cust.name}, Ramam Textiles Jaipur reaching out from our atelier desk. How can we assist with your latest boutique inventory needs?`
    );
    return `https://wa.me/${clean}?text=${msg}`;
  };

  return (
    <div className="space-y-6 animate-fade-in font-royal-body">
      
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Total Active Accounts</span>
            <p className="font-playfair text-2xl font-bold text-[#241A16]">{totalClients} B2B Importers</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
            <Star className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">VIP Accounts</span>
            <p className="font-playfair text-2xl font-bold text-amber-900">{vipClientsCount} Key Accounts</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Cumulative Invoiced LTV</span>
            <p className="font-playfair text-2xl font-bold text-emerald-900">₹{totalLtv.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/35 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Buyer Name, Company, Email, City, or Country..."
              className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-700 outline-none"
            >
              <option value="all">Relationship Tier: All</option>
              <option value="VIP Wholesale">VIP Wholesale</option>
              <option value="Verified Importer">Verified Importer</option>
              <option value="Boutique Client">Boutique Client</option>
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-700 outline-none"
            >
              <option value="all">Country: All</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center text-stone-500 border border-stone-200">
            <Users className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="font-bold text-stone-700 text-sm">No client profiles match your filter</p>
          </div>
        ) : (
          filteredCustomers.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-[#D4AF37]/35 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-[#241A16] line-clamp-1">
                      {c.name}
                    </h3>
                    <p className="text-xs font-semibold text-stone-600 flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-[#9B332C]" />
                      <span>{c.company || 'Direct Buyer'}</span>
                    </p>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                    c.tier === 'VIP Wholesale' ? 'bg-[#FCE5A4] text-[#801B18] border border-[#D4AF37]/60' :
                    c.tier === 'Verified Importer' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                    'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}>
                    {c.tier}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF5EE] rounded-2xl space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{c.city ? `${c.city}, ` : ''}{c.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-mono text-[11px]">{c.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Lifetime Volume</span>
                  <span className="font-mono font-bold text-sm text-[#9B332C]">
                    ₹{c.totalSpentInr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    {c.totalOrdersCount} {c.totalOrdersCount === 1 ? 'consignment' : 'consignments'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={getWhatsAppLink(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-all shadow-xs"
                    title="WhatsApp Direct"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <a
                    href={`mailto:${c.email}?subject=Ramam Textiles Jaipur - Exclusive Atelier Catalogue`}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
