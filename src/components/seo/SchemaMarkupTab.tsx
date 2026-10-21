import React, { useState } from 'react';
import { Code, CheckCircle2, AlertCircle, Copy, Sparkles, RefreshCw, Save } from 'lucide-react';
import { PageSEOData, SchemaType } from '../../types/seo';

interface SchemaMarkupTabProps {
  pages: PageSEOData[];
  onUpdatePageSEO: (path: string, updated: PageSEOData) => void;
  onSelectPage: (path: string) => void;
}

const TEMPLATES: Record<SchemaType, any> = {
  Product: {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': 'Heritage Pink Quilted Playing Card Vanity Pouch',
    'image': ['https://ramamtextiles.shop/products/vanity-playing-cards.jpg'],
    'description': 'Handcrafted cosmetic vanity pouch in radiant hot pink featuring artisanal playing card block print.',
    'sku': 'RT-BAG-001',
    'brand': {
      '@type': 'Brand',
      'name': 'Ramam Textiles'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'lowPrice': '290',
      'highPrice': '799',
      'offerCount': '3',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Ramam Textiles Jaipur'
      }
    }
  },
  Organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Ramam Textiles Jaipur',
    'url': 'https://ramamtextiles.shop',
    'logo': 'https://ramamtextiles.shop/logo.png',
    'description': 'Luxury Indian textile manufacturer and authentic Jaipur hand block print artisan atelier.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Jaipur',
      'addressRegion': 'Rajasthan',
      'postalCode': '302001',
      'addressCountry': 'IN'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-98290-00000',
      'contactType': 'wholesale sales',
      'areaServed': 'Worldwide',
      'availableLanguage': ['English', 'Hindi']
    }
  },
  Article: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': "Demystifying Fabric GSM: A Fashion Designer's Guide to Cotton Weights",
    'description': 'Learn how to choose the ideal Grams per Square Meter (GSM) for resort dresses and quilted bags.',
    'image': 'https://ramamtextiles.shop/products/duffle-kantha-patchwork.jpg',
    'author': {
      '@type': 'Organization',
      'name': 'Ramam Textiles Technical Guild'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Ramam Textiles',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ramamtextiles.shop/logo.png'
      }
    },
    'datePublished': '2026-10-20T08:00:00+05:30',
    'dateModified': '2026-10-21T10:00:00+05:30'
  },
  BlogPosting: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': 'The Complete Guide to Washing & Caring for Natural Indigo Dyed Cotton',
    'description': 'Discover why authentic plant-derived indigo bleeds, and how to preserve botanical blues.',
    'image': 'https://ramamtextiles.shop/products/duffle-indigo.jpg',
    'author': {
      '@type': 'Organization',
      'name': 'Ramam Textiles Conservation Desk'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Ramam Textiles'
    }
  },
  BreadcrumbList: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://ramamtextiles.shop/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Wholesale Catalog',
        'item': 'https://ramamtextiles.shop/shop'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Quilted Duffles & Bags',
        'item': 'https://ramamtextiles.shop/category/bags'
      }
    ]
  },
  FAQPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is your Minimum Order Quantity (MOQ) for wholesale textile orders?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our minimum order quantity starts at just 25 units per silhouette for stock prints, and 100 units for fully customized private label collections.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you ship wholesale consignments internationally?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, Ramam Textiles ships worldwide via DHL Express, FedEx Priority, and commercial air cargo directly from Jaipur, India.'
        }
      }
    ]
  },
  LocalBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Ramam Textiles Atelier Jaipur',
    'image': 'https://ramamtextiles.shop/logo.png',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Sanganer Artisan Cluster',
      'addressLocality': 'Jaipur',
      'addressRegion': 'Rajasthan',
      'addressCountry': 'IN'
    }
  },
  Custom: {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    'name': 'Ramam Textiles Custom Entity'
  }
};

export const SchemaMarkupTab: React.FC<SchemaMarkupTabProps> = ({
  pages,
  onUpdatePageSEO
}) => {
  const [selectedPath, setSelectedPath] = useState<string>(() => pages[0]?.path || '/');
  const activePage = pages.find(p => p.path === selectedPath) || pages[0];

  const [schemaCode, setSchemaCode] = useState<string>(() => activePage.jsonLd || JSON.stringify(TEMPLATES.Organization, null, 2));
  const [schemaType, setSchemaType] = useState<SchemaType>(() => activePage.schemaType || 'Organization');
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Validate JSON in real-time
  const getValidationState = () => {
    if (!schemaCode || schemaCode.trim().length === 0) {
      return { isValid: false, error: 'Empty schema markup' };
    }
    try {
      JSON.parse(schemaCode);
      return { isValid: true, error: null };
    } catch (e: any) {
      return { isValid: false, error: e.message };
    }
  };

  const validation = getValidationState();

  const handlePageChange = (path: string) => {
    setSelectedPath(path);
    const p = pages.find(item => item.path === path);
    if (p) {
      setSchemaCode(p.jsonLd || JSON.stringify(TEMPLATES[p.schemaType || 'Organization'], null, 2));
      setSchemaType(p.schemaType || 'Organization');
    }
  };

  const handleApplyTemplate = (type: SchemaType) => {
    setSchemaType(type);
    const template = TEMPLATES[type] || TEMPLATES.Organization;
    setSchemaCode(JSON.stringify(template, null, 2));
  };

  const handleFormatCode = () => {
    try {
      const parsed = JSON.parse(schemaCode);
      setSchemaCode(JSON.stringify(parsed, null, 2));
    } catch {}
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSave = () => {
    if (!validation.isValid) return;
    const updated = {
      ...activePage,
      schemaType,
      jsonLd: schemaCode,
      hasUnsavedChanges: true
    };
    onUpdatePageSEO(activePage.path, updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-[#9B332C]" />
            <h2 className="font-playfair text-xl font-bold text-stone-900">
              Structured Data & Schema.org JSON-LD Editor
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Rich search snippets for Google: Products, Aggregate Offers, FAQ dropdowns, Breadcrumb trails, and Author entities.
          </p>
        </div>

        {/* Validation Status Indicator */}
        <div>
          {validation.isValid ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Valid Schema.org JSON-LD Syntax</span>
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-800 border border-red-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>JSON Syntax Error</span>
            </span>
          )}
        </div>
      </div>

      {/* Target Selector & Quick Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            Target Page for Schema Injection
          </label>
          <select
            value={selectedPath}
            onChange={(e) => handlePageChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white text-xs font-bold outline-none"
          >
            {pages.map(p => (
              <option key={p.path} value={p.path}>
                {p.pageName} ({p.path})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            Quick Pre-Built Schema.org Templates
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['Product', 'Article', 'Organization', 'BreadcrumbList', 'FAQPage', 'LocalBusiness'] as SchemaType[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => handleApplyTemplate(t)}
                className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
                  schemaType === t ? 'bg-[#801B18] text-white border-[#801B18]' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">
            JSON-LD Code Payload (&lt;script type="application/ld+json"&gt;)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFormatCode}
              className="text-[#9B332C] hover:underline font-bold"
            >
              Format JSON
            </button>
            <span className="text-stone-300">•</span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copySuccess ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            rows={14}
            value={schemaCode}
            onChange={(e) => setSchemaCode(e.target.value)}
            className="w-full p-4 rounded-2xl border border-stone-300 bg-stone-900 text-emerald-400 font-mono text-xs leading-relaxed outline-none focus:ring-1 focus:ring-[#9B332C] shadow-inner"
            spellCheck={false}
          />
        </div>

        {!validation.isValid && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span><strong>JSON Error:</strong> {validation.error}</span>
          </div>
        )}
      </div>

      {/* Save Action */}
      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <span className="text-xs text-stone-500">
          Applied automatically to <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-700">{activePage.path}</code> when published.
        </span>

        <button
          type="button"
          onClick={handleSave}
          disabled={!validation.isValid}
          className="inline-flex items-center gap-2 pill-btn-rose px-6 py-2.5 text-xs font-bold uppercase tracking-wider disabled:opacity-50 shadow-md"
        >
          {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'Saved to Draft!' : 'Save Schema to Page'}</span>
        </button>
      </div>
    </div>
  );
};
