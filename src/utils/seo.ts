import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export const DEFAULT_SEO: Record<string, { title: string; description: string }> = {
  home: {
    title: 'RAMAM TEXTILES | Luxury Indian Textiles, Apparel & Wholesale Manufacturer | Jaipur',
    description: 'Ramam Textiles is an authentic Indian luxury textile manufacturer based in Jaipur, Rajasthan. Specializing in hand block prints, artisan apparel, quilted cotton bags, pure fabrics by meter, and custom manufacturing for global brands.'
  },
  shop: {
    title: 'Wholesale Catalog & Ready-To-Order SKUs | Ramam Textiles Jaipur',
    description: 'Explore artisan quilted travel duffles, vanity pouches, laptop sleeves, and pure cotton fabrics. Low MOQ wholesale orders direct from Jaipur craftsmen.'
  },
  collections: {
    title: 'Curated Sets & Heritage Editions | Ramam Textiles Jaipur',
    description: 'Discover coordinated sets including quilted weekender bags, nesting cosmetic vanity trios, and artisan organizers block-printed with heritage Bagru and Sanganeri motifs.'
  },
  customManufacturing: {
    title: 'Custom Garment Manufacturing & Private Label OEM | Ramam Textiles Jaipur',
    description: 'Bespoke apparel production, custom wooden block carving, botanical dyeing, and private label packaging from our Jaipur atelier. Flexible minimums and global shipping.'
  },
  bulkEnquiry: {
    title: 'Bulk Order & Wholesale Quotation Request | Ramam Textiles Jaipur',
    description: 'Submit your wholesale requirements for bulk production, custom printing runs, or private label catalog manufacturing. Get instant quotation and swatch proofs.'
  },
  wholesale: {
    title: 'Wholesale Buyer Portal & Direct Atelier Terms | Ramam Textiles Jaipur',
    description: 'Access manufacturer FOB pricing, tiered volume discounts, fabric specifications, and custom branding services for retail boutiques and lifestyle brands.'
  },
  craftsmanship: {
    title: 'The Bagru & Sanganer Handblock Printing Heritage | Ramam Textiles Jaipur',
    description: 'Explore the 400-year-old artisanal process of hand block carving, botanical mud-resist Dabu dyeing, pure river washing, and traditional sun curing in Rajasthan.'
  },
  about: {
    title: 'About Ramam Textiles | Authentic Jaipur Artisan Atelier & Workshop',
    description: 'Meet the heritage craftsmen and master printers behind Ramam Textiles. Preserving traditional Indian textile arts while meeting rigorous international export standards.'
  },
  lookbook: {
    title: 'Editorial Lookbook & Lifestyle Catalog | Ramam Textiles Jaipur',
    description: 'High-fashion editorial showcase of handcrafted quilted cotton duffles, tote bags, and vanity pouches styled in Jaipur palatial architecture.'
  },
  blog: {
    title: 'Jaipur Artisan Textile Blog & Sourcing Guides | Ramam Textiles',
    description: 'Expert technical guides on authentic Jaipur hand block printing, Bagru Dabu indigo dyeing, pure mulmul cotton sourcing, and private label apparel manufacturing.'
  },
  journal: {
    title: 'Textile Sourcing Journal & Artisan Insights | Ramam Textiles',
    description: 'Practical guides and deep dives on sourcing pure Indian cotton, discerning authentic woodblock prints, caring for botanical dyes, and private label best practices.'
  },
  contact: {
    title: 'Contact Jaipur Atelier & Production Workshop | Ramam Textiles',
    description: 'Direct communication desk for international buyers, retail store owners, and custom manufacturing inquiries. Visit our Jaipur workshop or schedule a video call.'
  },
  trackOrder: {
    title: 'Track Consignment & Production Dispatch | Ramam Textiles',
    description: 'Real-time production and international courier tracking for wholesale textile consignments and custom manufacturing orders dispatched from Jaipur.'
  },
  faq: {
    title: 'Frequently Asked Questions & Buyer Knowledge Base | Ramam Textiles',
    description: 'Clear answers on minimum order quantities, physical swatch sampling, payment terms, international air cargo transit times, and custom brand labeling.'
  },
  legal: {
    title: 'Customer Protection, Shipping Terms & Policies | Ramam Textiles',
    description: 'Comprehensive guidelines on international worldwide shipping, quality guarantees, wholesale terms, sample approval safeguards, and customer privacy.'
  },
  admin: {
    title: 'Atelier Staff Console & Admin Verification | Ramam Textiles',
    description: 'Authorized administrative terminal for lead reconciliation, Google Sheets order tracking, and export dispatch verification.'
  }
};

/**
 * Updates document title, meta descriptions, and OpenGraph metadata dynamically
 */
export function setPageSEO({ title, description, path = '', image = '/logo.png' }: SEOProps): void {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = title;

  // 2. Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 3. Update Canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const cleanPath = path ? (path.startsWith('/') ? path : '/' + path) : '';
  canonical.setAttribute('href', `https://ramamtextiles.shop${cleanPath}`);

  // 4. Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `https://ramamtextiles.shop${cleanPath}`);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && image) {
    const fullImage = image.startsWith('http') ? image : `https://ramamtextiles.shop${image.startsWith('/') ? image : '/' + image}`;
    ogImage.setAttribute('content', fullImage);
  }

  // 5. Update Twitter Card tags
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);
}

/**
 * React hook to set page SEO on component mount or prop change
 */
export function usePageSEO(seo: SEOProps): void {
  useEffect(() => {
    setPageSEO(seo);
  }, [seo.title, seo.description, seo.path, seo.image]);
}
