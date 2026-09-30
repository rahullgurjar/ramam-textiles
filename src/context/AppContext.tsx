import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, InquiryItem, CurrencyConfig } from '../types';
import { PRODUCTS } from '../data/products';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 0.018, label: 'AUD (A$)' },
};

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface BuyerProfile {
  companyName: string;
  email: string;
  country: string;
}

interface AppContextType {
  // Inquiry Basket / RFQ Drawer
  inquiryItems: InquiryItem[];
  addToInquiry: (item: InquiryItem) => void;
  removeFromInquiry: (productId: string, color: string, size: string) => void;
  updateInquiryQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearInquiry: () => void;
  isInquiryDrawerOpen: boolean;
  setIsInquiryDrawerOpen: (open: boolean) => void;
  openInquiryDrawer: () => void;
  closeInquiryDrawer: () => void;

  // Quick Quote Modal
  isQuickQuoteOpen: boolean;
  activeQuoteProduct: Product | null;
  openQuickQuote: (product?: Product) => void;
  closeQuickQuote: () => void;

  // Search Modal
  isSearchModalOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;

  // Currency
  currency: CurrencyConfig;
  setCurrencyCode: (code: keyof typeof CURRENCIES) => void;
  formatPrice: (inrAmount?: number) => string;

  // B2B Pricing Lock / Verification
  isB2BPriceUnlocked: boolean;
  buyerProfile: BuyerProfile | null;
  unlockB2BPricing: (profile: BuyerProfile) => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Toast
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial inquiry basket from localStorage
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ramam_inquiry_basket');
      if (saved) {
        const parsed = JSON.parse(saved);
        // hydrate product object if necessary
        return parsed.map((item: any) => {
          const matched = PRODUCTS.find(p => p.id === item.productId);
          return {
            product: matched || item.product,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
            quantity: item.quantity,
            customNotes: item.customNotes
          };
        }).filter((item: any) => item.product);
      }
    } catch (e) {
      console.error('Failed to load inquiry basket:', e);
    }
    return [];
  });

  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);
  const [activeQuoteProduct, setActiveQuoteProduct] = useState<Product | null>(null);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [currencyCode, setCurrencyCodeState] = useState<keyof typeof CURRENCIES>('INR');
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;

  const [isB2BPriceUnlocked, setIsB2BPriceUnlocked] = useState(false);
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'info'
  });

  // Save inquiry basket to localStorage
  useEffect(() => {
    try {
      const serialized = inquiryItems.map(item => ({
        productId: item.product.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        customNotes: item.customNotes
      }));
      localStorage.setItem('ramam_inquiry_basket', JSON.stringify(serialized));
    } catch (e) {
      console.error('Failed to persist inquiry basket:', e);
    }
  }, [inquiryItems]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const addToInquiry = (item: InquiryItem) => {
    setInquiryItems(prev => {
      const index = prev.findIndex(
        i => i.product.id === item.product.id && 
             i.selectedColor === item.selectedColor && 
             i.selectedSize === item.selectedSize
      );
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.product.name}" to your Wholesale Inquiry Basket.`, 'success');
  };

  const removeFromInquiry = (productId: string, color: string, size: string) => {
    setInquiryItems(prev => prev.filter(
      i => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size)
    ));
    showToast('Item removed from inquiry basket.', 'info');
  };

  const updateInquiryQuantity = (productId: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromInquiry(productId, color, size);
      return;
    }
    setInquiryItems(prev => prev.map(i => {
      if (i.product.id === productId && i.selectedColor === color && i.selectedSize === size) {
        return { ...i, quantity };
      }
      return i;
    }));
  };

  const clearInquiry = () => {
    setInquiryItems([]);
  };

  const openInquiryDrawer = () => setIsInquiryDrawerOpen(true);
  const closeInquiryDrawer = () => setIsInquiryDrawerOpen(false);

  const openQuickQuote = (product?: Product) => {
    setActiveQuoteProduct(product || null);
    setIsQuickQuoteOpen(true);
  };

  const closeQuickQuote = () => {
    setIsQuickQuoteOpen(false);
    setActiveQuoteProduct(null);
  };

  const openSearch = () => setIsSearchModalOpen(true);
  const closeSearch = () => setIsSearchModalOpen(false);

  const setCurrencyCode = (code: keyof typeof CURRENCIES) => {
    if (CURRENCIES[code]) {
      setCurrencyCodeState(code);
    }
  };

  const formatPrice = (inrAmount?: number): string => {
    if (inrAmount === undefined || inrAmount === null) return 'Price on Request';
    const converted = inrAmount * currency.rate;
    if (currency.code === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${currency.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const unlockB2BPricing = (profile: BuyerProfile) => {
    setBuyerProfile(profile);
    setIsB2BPriceUnlocked(true);
    showToast(`Welcome ${profile.companyName}! Wholesale pricing tiers are now visible.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        inquiryItems,
        addToInquiry,
        removeFromInquiry,
        updateInquiryQuantity,
        clearInquiry,
        isInquiryDrawerOpen,
        setIsInquiryDrawerOpen,
        openInquiryDrawer,
        closeInquiryDrawer,
        isQuickQuoteOpen,
        activeQuoteProduct,
        openQuickQuote,
        closeQuickQuote,
        isSearchModalOpen,
        searchQuery,
        setSearchQuery,
        openSearch,
        closeSearch,
        currency,
        setCurrencyCode,
        formatPrice,
        isB2BPriceUnlocked,
        buyerProfile,
        unlockB2BPricing,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
