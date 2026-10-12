import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { MobileBottomBar } from './components/MobileBottomBar';

// Keep HomePage in primary critical chunk for instant First Contentful Paint
import { HomePage } from './pages/HomePage';

// Lazy load all secondary routes to drastically minimize initial JS payload
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then(m => ({ default: m.CollectionsPage })));
const CustomManufacturingPage = lazy(() => import('./pages/CustomManufacturingPage').then(m => ({ default: m.CustomManufacturingPage })));
const BulkOrderEnquiryPage = lazy(() => import('./pages/BulkOrderEnquiryPage').then(m => ({ default: m.BulkOrderEnquiryPage })));
const WholesalePage = lazy(() => import('./pages/WholesalePage').then(m => ({ default: m.WholesalePage })));
const CraftsmanshipPage = lazy(() => import('./pages/CraftsmanshipPage').then(m => ({ default: m.CraftsmanshipPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const LookbookPage = lazy(() => import('./pages/LookbookPage').then(m => ({ default: m.LookbookPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then(m => ({ default: m.JournalPage })));
const JournalDetailPage = lazy(() => import('./pages/JournalDetailPage').then(m => ({ default: m.JournalDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage').then(m => ({ default: m.TrackOrderPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));

// Lazy load heavy interactive drawers & modals
const InquiryDrawer = lazy(() => import('./components/InquiryDrawer').then(m => ({ default: m.InquiryDrawer })));
const QuickQuoteModal = lazy(() => import('./components/QuickQuoteModal').then(m => ({ default: m.QuickQuoteModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const B2BPricingUnlockModal = lazy(() => import('./components/B2BPricingUnlockModal').then(m => ({ default: m.B2BPricingUnlockModal })));
const PolicyModal = lazy(() => import('./components/PolicyModal').then(m => ({ default: m.PolicyModal })));
import { useApp } from './context/AppContext';

// Luxury Jaipur atelier loading state for route transitions
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
    <div className="relative w-16 h-16 mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30" />
      <div className="absolute inset-0 rounded-full border-2 border-[#9B332C] border-t-transparent animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-royal-title text-[#9B332C]">🪷</span>
      </div>
    </div>
    <span className="font-royal-title text-xs uppercase tracking-widest text-[#241A16] font-bold">
      Ramam Textiles Jaipur
    </span>
    <span className="text-[11px] text-stone-500 font-royal-body mt-1">
      Preparing artisan collection...
    </span>
  </div>
);

const getNormalizedPath = (): string => {
  if (typeof window === 'undefined') return '/';
  
  // 1. Check hash route first (e.g. #/product/slug or #/shop)
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1);
  }

  // 2. Check query parameter redirect (e.g. ?p=/product/slug used by GitHub Pages SPA redirect)
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get('p');
  if (p) {
    return p.startsWith('/') ? p : '/' + p;
  }

  // 3. Check pathname, stripping repository base if present (e.g. /ramam-textiles)
  let path = window.location.pathname || '/';
  if (path.startsWith('/ramam-textiles')) {
    path = path.slice('/ramam-textiles'.length) || '/';
  }
  return path;
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return getNormalizedPath();
  });

  const [isB2BUnlockModalOpen, setIsB2BUnlockModalOpen] = useState(false);
  const { isPolicyModalOpen, policyModalTab, closePolicyModal, openPolicyModal } = useApp();

  // Listen for hash policy shortcuts like #privacy, #shipping, #terms, #refunds
  useEffect(() => {
    const handlePolicyHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#privacy') {
        openPolicyModal('privacy');
      } else if (hash === '#shipping' || hash === '#delivery') {
        openPolicyModal('shipping');
      } else if (hash === '#terms') {
        openPolicyModal('terms');
      } else if (hash === '#returns' || hash === '#refunds') {
        openPolicyModal('returns');
      }
    };

    window.addEventListener('hashchange', handlePolicyHash);
    handlePolicyHash();
    return () => {
      window.removeEventListener('hashchange', handlePolicyHash);
    };
  }, []);

  // Synchronize browser history and hash navigation
  useEffect(() => {
    // If redirected from 404.html with ?p=...
    const urlParams = new URLSearchParams(window.location.search);
    const p = urlParams.get('p');
    if (p) {
      const isGhPagesRepo = window.location.pathname.startsWith('/ramam-textiles');
      const basePath = isGhPagesRepo ? '/ramam-textiles' : '';
      const cleanPath = p.startsWith('/') ? p : '/' + p;
      window.history.replaceState({}, '', `${basePath}${cleanPath}`);
      setCurrentPath(cleanPath);
    }

    const handleRouteSync = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('hashchange', handleRouteSync);
    return () => {
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('hashchange', handleRouteSync);
    };
  }, []);

  // Track dynamic SPA route transitions in Google Tag Manager dataLayer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_path: currentPath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path.startsWith('#') && !path.startsWith('#/')) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const isGhPagesRepo = window.location.pathname.startsWith('/ramam-textiles');
    const basePath = isGhPagesRepo ? '/ramam-textiles' : '';
    const cleanPath = path.startsWith('#/') ? path.slice(1) : path;
    const targetUrl = `${basePath}${cleanPath}`;

    window.history.pushState({}, '', targetUrl);
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching logic
  const renderCurrentPage = () => {
    // 1. Home (instant synchronous render)
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Shop & Catalog
    if (currentPath === '/shop' || currentPath.startsWith('/shop?')) {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get('category') || undefined;
      const col = urlParams.get('collection') || undefined;
      return <ShopPage onNavigate={navigate} initialCategory={cat} initialCollection={col} />;
    }

    // 3. Product Detail
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 4. Category Page
    if (currentPath.startsWith('/category/')) {
      const categoryId = currentPath.replace('/category/', '').split('?')[0];
      return <CategoryPage categoryId={categoryId} onNavigate={navigate} />;
    }

    // 5. Collections
    if (currentPath.startsWith('/collections')) {
      return <CollectionsPage onNavigate={navigate} />;
    }

    // 6. Custom Manufacturing
    if (currentPath.startsWith('/custom-manufacturing')) {
      return <CustomManufacturingPage onNavigate={navigate} />;
    }

    // 6B. Bulk Order Enquiry & Wholesale Quotation
    if (currentPath.startsWith('/bulk-enquiry') || currentPath.startsWith('/bulk-order')) {
      return <BulkOrderEnquiryPage onNavigate={navigate} />;
    }

    // 7. Wholesale Portal
    if (currentPath.startsWith('/wholesale')) {
      return <WholesalePage onNavigate={navigate} />;
    }

    // 8. Craftsmanship / Our Craft
    if (currentPath.startsWith('/craftsmanship')) {
      return <CraftsmanshipPage onNavigate={navigate} />;
    }

    // 9. About Page
    if (currentPath.startsWith('/about')) {
      return <AboutPage onNavigate={navigate} />;
    }

    // 10. Lookbook
    if (currentPath.startsWith('/lookbook')) {
      return <LookbookPage onNavigate={navigate} />;
    }

    // 11. Journal Detail Page
    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '').split('?')[0];
      return <JournalDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 12. Journal Index Page
    if (currentPath.startsWith('/journal')) {
      return <JournalPage onNavigate={navigate} />;
    }

    // 13. Contact Page
    if (currentPath.startsWith('/contact')) {
      return <ContactPage onNavigate={navigate} />;
    }

    // 14. Track Order
    if (currentPath.startsWith('/track') || currentPath.startsWith('/track-order')) {
      return <TrackOrderPage />;
    }

    // 15. FAQ Page
    if (currentPath.startsWith('/faq')) {
      return <FAQPage onNavigate={navigate} />;
    }

    // 16. Legal Pages
    if (currentPath.startsWith('/privacy-policy') || currentPath.startsWith('/privacy')) {
      return <LegalPage initialTab="privacy" />;
    }
    if (currentPath.startsWith('/shipping-returns') || currentPath.startsWith('/shipping') || currentPath.startsWith('/delivery')) {
      return <LegalPage initialTab="shipping" />;
    }
    if (currentPath.startsWith('/terms-conditions') || currentPath.startsWith('/terms')) {
      return <LegalPage initialTab="terms" />;
    }
    if (currentPath.startsWith('/returns') || currentPath.startsWith('/refunds')) {
      return <LegalPage initialTab="returns" />;
    }

    // Default Fallback: Shop
    return <ShopPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EEE6] text-[#241A16] font-sans antialiased selection:bg-[#9B332C]/20 selection:text-[#9B332C]">
      {/* Primary Global Navigation */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Page Body with Suspense Fallback */}
      <main className="flex-1 pb-16 md:pb-0">
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* Global Luxury Footer */}
      <Footer navigate={navigate} />

      {/* Mobile Quick Thumb Navigation Bar */}
      <MobileBottomBar currentPath={currentPath} onNavigate={navigate} />

      {/* Interactive Drawers & Modals (Lazy Loaded) */}
      <Suspense fallback={null}>
        <InquiryDrawer onNavigate={navigate} />
        <QuickQuoteModal />
        <SearchModal onNavigate={navigate} />
        <B2BPricingUnlockModal 
          isOpen={isB2BUnlockModalOpen} 
          onClose={() => setIsB2BUnlockModalOpen(false)} 
        />
        <PolicyModal 
          isOpen={isPolicyModalOpen}
          initialTab={policyModalTab}
          onClose={closePolicyModal}
        />
      </Suspense>

      {/* Global Toast Notification System */}
      <Toast />
    </div>
  );
};

export default App;
