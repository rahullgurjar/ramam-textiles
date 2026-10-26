import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Download, Upload, RotateCcw, Edit2, 
  Trash2, Copy, ExternalLink, CheckCircle2, AlertCircle, 
  Layers, Tag, DollarSign, Package, LayoutGrid, List
} from 'lucide-react';
import { Product, ProductCategory } from '../../../types';
import { 
  getStoredProducts, saveProduct, deleteProduct, 
  duplicateProduct, resetProductsToDefault, exportProductsJson, importProductsJson 
} from '../../../utils/productStorage';
import { ProductEditModal } from './ProductEditModal';
import { resolveProductImage } from '../../../utils/imageUtils';
import { useApp } from '../../../context/AppContext';

interface ProductsTabProps {
  onNavigate?: (path: string) => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ onNavigate }) => {
  const { showToast } = useApp();
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const refreshProducts = () => {
    const list = getStoredProducts();
    setProducts(list);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCol = (p.collection || '').toLowerCase().includes(q);
        const matchesFabric = (p.fabric || '').toLowerCase().includes(q);
        const matchesTag = p.tags?.some((t: string) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSku && !matchesCol && !matchesFabric && !matchesTag) {
          return false;
        }
      }

      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      if (stockFilter === 'in_stock' && !p.inStock) return false;
      if (stockFilter === 'out_of_stock' && p.inStock) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  const handleToggleStock = (product: Product) => {
    const updated: Product = { ...product, inStock: !product.inStock };
    saveProduct(updated);
    refreshProducts();
    showToast(
      `Product "${product.name}" marked as ${updated.inStock ? 'In Stock' : 'Out of Stock'}.`,
      updated.inStock ? 'success' : 'info'
    );
  };

  const handleToggleFeatured = (product: Product) => {
    const updated: Product = { ...product, isFeatured: !product.isFeatured };
    saveProduct(updated);
    refreshProducts();
    showToast(
      `Product "${product.name}" ${updated.isFeatured ? 'pinned to Featured Showcase' : 'unpinned'}.`,
      'info'
    );
  };

  const handleDuplicate = (productId: string) => {
    const cloned = duplicateProduct(productId);
    if (cloned) {
      refreshProducts();
      showToast(`Duplicated product SKU created: ${cloned.sku}`, 'success');
    }
  };

  const handleDelete = (productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete "${productName}" from the Atelier Catalog?`)) {
      deleteProduct(productId);
      refreshProducts();
      showToast(`Product "${productName}" removed from catalog.`, 'info');
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to initial factory SKUs? Any added custom products will be restored to defaults.')) {
      resetProductsToDefault();
      refreshProducts();
      showToast('Catalog reset to initial factory specifications.', 'success');
    }
  };

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

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importProductsJson(content);
      if (res.success) {
        refreshProducts();
        showToast(`Successfully imported ${res.count} products into catalog!`, 'success');
      } else {
        showToast(res.error || 'Failed to import JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 animate-fade-in font-royal-body">
      
      {/* Top Filter and Actions Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/35 shadow-sm space-y-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-stone-200 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'all' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('bags')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'bags' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Quilted Duffles &amp; Totes ({products.filter(p => p.category === 'bags').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('women')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'women' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Cosmetic Vanity Pouches ({products.filter(p => p.category === 'women').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('home')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'home' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Styler Cases &amp; Organizers ({products.filter(p => p.category === 'home').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('fabrics')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'fabrics' ? 'bg-[#9B332C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Running Fabrics ({products.filter(p => p.category === 'fabrics').length})
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
              placeholder="Search by Title, SKU, Collection, Fabric, or Tag..."
              className="w-full bg-[#FAF5EE] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#9B332C]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="bg-[#FAF5EE] border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-700 outline-none"
            >
              <option value="all">Stock: All</option>
              <option value="in_stock">In Stock Only</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title={viewMode === 'table' ? 'Switch to Grid Cards' : 'Switch to Data Table'}
            >
              {viewMode === 'table' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button
              type="button"
              onClick={() => { setEditingProduct(null); setIsEditModalOpen(true); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FCE5A4]" />
              <span>Add Product</span>
            </button>

            <button
              type="button"
              onClick={handleResetCatalog}
              title="Reset Factory Catalog"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* VIEW MODE 1: DATA TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-[#D4AF37]/35 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF5EE] text-stone-700 font-bold border-b border-stone-200 uppercase tracking-wider">
                  <th className="py-3 px-4">Product / SKU</th>
                  <th className="py-3 px-4">Category &amp; Collection</th>
                  <th className="py-3 px-4 text-right">Indicative Retail</th>
                  <th className="py-3 px-4 text-right">Wholesale Tier / MOQ</th>
                  <th className="py-3 px-4 text-center">In Stock</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-500">
                      <Package className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                      <p className="font-bold text-stone-700 text-sm">No products found</p>
                      <p className="text-xs text-stone-400 mt-0.5">Click "Add Product" to create a new catalogue item.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const primaryImg = p.images?.[0] || '/products/vanity-playing-cards.jpg';
                    const lowestTier = p.wholesaleTiers?.[p.wholesaleTiers.length - 1];

                    return (
                      <tr key={p.id} className="hover:bg-[#FAF5EE]/50 transition-colors group">
                        
                        {/* Product Title & Thumbnail */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={resolveProductImage(primaryImg)}
                              alt={p.name}
                              className="w-11 h-11 rounded-xl object-cover border border-[#D4AF37]/30 shadow-xs shrink-0"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                            <div className="max-w-[260px]">
                              <button
                                type="button"
                                onClick={() => { setEditingProduct(p); setIsEditModalOpen(true); }}
                                className="font-playfair font-bold text-[#241A16] hover:text-[#9B332C] text-sm text-left line-clamp-1 block"
                              >
                                {p.name}
                              </button>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-[10px] text-stone-500 font-bold">{p.sku}</span>
                                {p.isBestseller && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">Bestseller</span>
                                )}
                                {p.isNew && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold">New</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category & Collection */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] uppercase">
                            {p.category}
                          </span>
                          <p className="text-[11px] text-stone-500 mt-0.5 truncate max-w-[180px]">
                            {p.collection}
                          </p>
                        </td>

                        {/* Retail Price */}
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono font-bold text-stone-900 text-sm">
                            ₹{p.indicativeRetailInr?.toLocaleString('en-IN') || '—'}
                          </span>
                        </td>

                        {/* Wholesale Tier & MOQ */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-mono font-bold text-[#9B332C]">
                            ₹{lowestTier ? lowestTier.pricePerUnitInr.toLocaleString('en-IN') : '—'} / pc
                          </div>
                          <div className="text-[10px] text-stone-500">
                            MOQ: <strong>{p.moq} pcs</strong>
                          </div>
                        </td>

                        {/* In Stock Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                              p.inStock 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                          >
                            {p.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        {/* Featured Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(p)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.isFeatured ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-stone-100 text-stone-400'
                            }`}
                          >
                            {p.isFeatured ? '★ Pinned' : '☆ Off'}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => { setEditingProduct(p); setIsEditModalOpen(true); }}
                              className="p-1.5 rounded-lg bg-[#FAF0EB] hover:bg-[#801B18] text-[#9B332C] hover:text-white transition-all shadow-2xs"
                              title="Edit Product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDuplicate(p.id)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all"
                              title="Duplicate SKU"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <a
                              href={`/product/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all"
                              title="View on Storefront"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleDelete(p.id, p.name)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition-all"
                              title="Delete Product"
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
      )}

      {/* VIEW MODE 2: GRID CARDS */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const primaryImg = p.images?.[0] || '/products/vanity-playing-cards.jpg';
            const lowestTier = p.wholesaleTiers?.[p.wholesaleTiers.length - 1];

            return (
              <div 
                key={p.id}
                className="bg-white rounded-3xl border border-[#D4AF37]/35 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                  <img
                    src={resolveProductImage(primaryImg)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF0EB] text-[#9B332C] border border-[#EACAC0] uppercase shadow-sm">
                      {p.category}
                    </span>
                    {p.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE5A4] text-[#801B18] shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                      p.inStock ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-stone-500 font-bold block">{p.sku}</span>
                    <h3 className="font-playfair text-base font-bold text-[#241A16] line-clamp-1 mt-0.5">
                      {p.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Wholesale from</span>
                      <span className="font-mono font-bold text-sm text-[#9B332C]">
                        ₹{lowestTier ? lowestTier.pricePerUnitInr.toLocaleString('en-IN') : '—'}
                      </span>
                      <span className="text-[10px] text-stone-500 ml-1">/ pc</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">B2B MOQ</span>
                      <span className="font-bold text-stone-800">{p.moq} pcs</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => { setEditingProduct(p); setIsEditModalOpen(true); }}
                      className="flex-1 py-2 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#FCE5A4]" />
                      <span>Edit Product</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(p.id)}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                      title="Duplicate SKU"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.name)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit & Add Product Modal */}
      {isEditModalOpen && (
        <ProductEditModal
          product={editingProduct}
          isOpen={isEditModalOpen}
          onClose={() => { setIsEditModalOpen(false); setEditingProduct(null); }}
          onSaved={() => {
            refreshProducts();
          }}
        />
      )}

    </div>
  );
};
