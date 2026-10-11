import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryDrawer } from './components/InquiryDrawer';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { MobileBottomBar } from './components/MobileBottomBar';
import { B2BPricingUnlockModal } from './components/B2BPricingUnlockModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CustomManufacturingPage } from './pages/CustomManufacturingPage';
import { WholesalePage } from './pages/WholesalePage';
import { CraftsmanshipPage } from './pages/CraftsmanshipPage';
import { AboutPage } from './pages/AboutPage';
import { LookbookPage } from './pages/LookbookPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { ContactPage } from './pages/ContactPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';

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
    // 1. Home
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

    // 6. Custom Manufacturing / Private Label
    if (currentPath.startsWith('/custom-manufacturing')) {
      return <CustomManufacturingPage onNavigate={navigate} />;
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
    if (currentPath.startsWith('/shipping-returns') || currentPath.startsWith('/shipping')) {
      return <LegalPage initialTab="shipping" />;
    }
    if (currentPath.startsWith('/terms-conditions') || currentPath.startsWith('/terms')) {
      return <LegalPage initialTab="terms" />;
    }

    // Default Fallback: Shop
    return <ShopPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EEE6] text-[#241A16] font-sans antialiased selection:bg-[#9B332C]/20 selection:text-[#9B332C]">
      {/* Primary Global Navigation */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Page Body */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentPage()}
      </main>

      {/* Global Luxury Footer */}
      <Footer navigate={navigate} />

      {/* Mobile Quick Thumb Navigation Bar */}
      <MobileBottomBar currentPath={currentPath} onNavigate={navigate} />

      {/* Interactive Drawers & Modals */}
      <InquiryDrawer onNavigate={navigate} />
      <QuickQuoteModal />
      <SearchModal onNavigate={navigate} />
      <B2BPricingUnlockModal 
        isOpen={isB2BUnlockModalOpen} 
        onClose={() => setIsB2BUnlockModalOpen(false)} 
      />

      {/* Global Toast Notification System */}
      <Toast />
    </div>
  );
};

export default App;
