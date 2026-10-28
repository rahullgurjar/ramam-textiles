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
  },
  // Master SEO Clusters from WEBSITE CLUSTER SERP & METADATA DIRECTORY.xlsx
  clusterBlockPrintFabrics: {
    title: 'Hand Block Print Fabrics & Artisan Textiles | Buy Online',
    description: 'Explore authentic hand block print, Ajrakh, and Dabu artisan cotton fabrics. Ethical craftsmanship, vibrant natural dyes, and custom yardage. Shop today!'
  },
  clusterApparelEthnicWear: {
    title: 'Block Print Apparel & Ethnic Wear Collections',
    description: 'Discover handcrafted block print kurtis, ethnic dresses, and breathable artisan garments. Premium organic cotton fabrics tailored for elegance. Browse now!'
  },
  clusterCanvasToteBags: {
    title: 'Canvas Tote Bags Wholesale & Custom Printed Totes',
    description: 'Shop eco-friendly canvas tote bags in bulk. Customizable block prints, heavy-duty cotton, and wholesale manufacturing pricing. Request your instant quote!'
  },
  clusterWholesaleBulkFabrics: {
    title: 'Wholesale Fabric Suppliers & Bulk Textile Manufacturing',
    description: 'Source wholesale apparel and artisan fabric direct from manufacturers. Low MOQs, global door-to-door delivery, and factory pricing. Partner with us today!'
  },
  clusterHomeLivingDecor: {
    title: 'Handcrafted Home Decor & Block Print Living Furnishings',
    description: 'Elevate your living space with artisanal block print cushion covers, throws, table linens, and heavy upholstery fabrics. Bring craft home—order online!'
  },
  clusterCraftDiySupplies: {
    title: 'Carved Wooden Printing Blocks & DIY Textile Craft Kits',
    description: 'Shop hand-carved wooden textile printing blocks, felt sheets, and premium DIY fabric materials. Perfect for printmakers and artisans. Start crafting today!'
  }
};

const PUBLISHED_SEO_STORAGE_KEY = 'ramam_seo_published_v1';

function getPublishedSEORecord(path: string): any {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PUBLISHED_SEO_STORAGE_KEY);
    if (!raw) return null;
    const published = JSON.parse(raw);
    const cleanPath = path ? (path.startsWith('/') ? path : '/' + path) : '/';
    return published[cleanPath] || null;
  } catch {
    return null;
  }
}

/**
 * Builds a technically perfect canonical URL strictly following Google Search Central standards:
 * 1. Absolute HTTPS URL with the official domain: https://ramamtextiles.shop
 * 2. Strips all query parameters (?utm_..., ?ref=..., ?sort=..., etc.)
 * 3. Strips all URL hash fragments (#...)
 * 4. Normalizes root domain to have a trailing slash: https://ramamtextiles.shop/
 * 5. Normalizes subpaths to have NO trailing slash: https://ramamtextiles.shop/shop
 * 6. Consolidates alias/redirect routes to their canonical target:
 *    - /blogs/ -> /blog/
 *    - /journal/ -> /blog/
 *    - /bulk-order -> /bulk-enquiry
 * 7. Enforces lowercase ASCII paths
 */
export function getCanonicalUrl(rawPath: string = ''): string {
  const BASE_URL = 'https://ramamtextiles.shop';
  
  if (!rawPath || rawPath === '/' || rawPath === '') {
    return `${BASE_URL}/`;
  }

  let pathOnly = rawPath;
  if (pathOnly.startsWith('http://') || pathOnly.startsWith('https://')) {
    try {
      const parsed = new URL(pathOnly);
      pathOnly = parsed.pathname;
    } catch {
      pathOnly = pathOnly.replace(/^https?:\/\/[^\/]+/, '');
    }
  }

  // Strip query strings and hash anchors
  pathOnly = pathOnly.split('?')[0].split('#')[0];

  // Ensure leading slash
  if (!pathOnly.startsWith('/')) {
    pathOnly = '/' + pathOnly;
  }

  // Consolidate aliases to primary canonical paths
  if (pathOnly.startsWith('/blogs/')) {
    pathOnly = pathOnly.replace('/blogs/', '/blog/');
  } else if (pathOnly === '/blogs') {
    pathOnly = '/blog';
  } else if (pathOnly.startsWith('/journal/')) {
    pathOnly = pathOnly.replace('/journal/', '/blog/');
  } else if (pathOnly === '/journal') {
    pathOnly = '/blog';
  } else if (pathOnly.startsWith('/bulk-order')) {
    pathOnly = pathOnly.replace('/bulk-order', '/bulk-enquiry');
  }

  // Check root
  if (pathOnly === '/' || pathOnly === '') {
    return `${BASE_URL}/`;
  }

  // Remove trailing slash for subpaths
  if (pathOnly.endsWith('/')) {
    pathOnly = pathOnly.slice(0, -1);
  }

  return `${BASE_URL}${pathOnly.toLowerCase()}`;
}

/**
 * Updates or injects the <link rel="canonical"> tag in document.head.
 * Guarantees:
 * - Exactly ONE canonical tag exists in <head> (removes any accidental duplicates)
 * - href is absolute, HTTPS, clean, and self-referencing
 * - Synchronizes <meta property="og:url"> in tandem
 */
export function updateCanonicalTag(path?: string, customCanonical?: string): string {
  if (typeof document === 'undefined') return '';

  const finalUrl = customCanonical && customCanonical.startsWith('https://')
    ? (customCanonical === 'https://ramamtextiles.shop' ? 'https://ramamtextiles.shop/' : customCanonical)
    : getCanonicalUrl(path || (typeof window !== 'undefined' ? window.location.pathname : '/'));

  // Remove any duplicate canonical tags to strictly prevent Googlebot invalidation
  const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
  if (existingCanonicals.length > 1) {
    for (let i = 1; i < existingCanonicals.length; i++) {
      existingCanonicals[i].parentNode?.removeChild(existingCanonicals[i]);
    }
  }

  let canonical = existingCanonicals[0] as HTMLLinkElement | undefined;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', finalUrl);

  // Synchronize OpenGraph URL with canonical URL
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', finalUrl);

  return finalUrl;
}

/**
 * Updates document title, meta descriptions, and OpenGraph metadata dynamically,
 * incorporating any manual published SEO overrides from the SEO Admin Panel.
 */
export function setPageSEO({ title, description, path = '', image = '/logo.png' }: SEOProps): void {
  if (typeof document === 'undefined') return;

  const cleanPath = path ? (path.startsWith('/') ? path : '/' + path) : '/';
  
  // Check if a published manual SEO override exists for this route
  let effectiveTitle = title;
  let effectiveDesc = description;
  let effectiveCanonical = getCanonicalUrl(cleanPath);
  let effectiveRobots = 'index, follow';
  let effectiveOgTitle = title;
  let effectiveOgDesc = description;
  let effectiveOgImage = image;
  let effectiveTwCard = 'summary_large_image';
  let effectiveTwTitle = title;
  let effectiveTwDesc = description;
  let effectiveTwImage = image;
  let customJsonLd: string | null = null;
  let imageAltOverrides: Record<string, string> = {};

  try {
    const override = getPublishedSEORecord(cleanPath);
    if (override) {
      if (override.seoTitle) effectiveTitle = override.seoTitle;
      if (override.metaDescription) effectiveDesc = override.metaDescription;
      if (override.canonicalUrl) {
        effectiveCanonical = override.canonicalUrl === 'https://ramamtextiles.shop' 
          ? 'https://ramamtextiles.shop/' 
          : override.canonicalUrl;
      }
      if (override.robotsDirectives) effectiveRobots = override.robotsDirectives;
      if (override.ogTitle) effectiveOgTitle = override.ogTitle;
      if (override.ogDescription) effectiveOgDesc = override.ogDescription;
      if (override.ogImage) effectiveOgImage = override.ogImage;
      if (override.twitterCard) effectiveTwCard = override.twitterCard;
      if (override.twitterTitle) effectiveTwTitle = override.twitterTitle;
      if (override.twitterDescription) effectiveTwDesc = override.twitterDescription;
      if (override.twitterImage) effectiveTwImage = override.twitterImage;
      if (override.jsonLd) customJsonLd = override.jsonLd;
      
      if (override.images && override.images.length > 0) {
        override.images.forEach((img: any) => {
          if (img.src && img.alt) {
            imageAltOverrides[img.src] = img.alt;
            if (img.filename) imageAltOverrides[img.filename] = img.alt;
          }
        });
      }
    }
  } catch (e) {
    // Graceful fallback to default props
  }

  // 1. Update Title
  document.title = effectiveTitle;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', effectiveDesc);

  // 3. Update Canonical Link (strictly unique, normalized and verified)
  updateCanonicalTag(cleanPath, effectiveCanonical);

  // 4. Update Meta Robots
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.setAttribute('name', 'robots');
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.setAttribute('content', effectiveRobots);

  // 5. Update OpenGraph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', effectiveOgTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', effectiveOgDesc);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', effectiveCanonical);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && effectiveOgImage) {
    const fullImage = effectiveOgImage.startsWith('http') 
      ? effectiveOgImage 
      : `https://ramamtextiles.shop${effectiveOgImage.startsWith('/') ? effectiveOgImage : '/' + effectiveOgImage}`;
    ogImage.setAttribute('content', fullImage);
  }

  // 6. Update Twitter Card Tags
  let twCardTag = document.querySelector('meta[name="twitter:card"]');
  if (!twCardTag) {
    twCardTag = document.createElement('meta');
    twCardTag.setAttribute('name', 'twitter:card');
    document.head.appendChild(twCardTag);
  }
  twCardTag.setAttribute('content', effectiveTwCard);

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', effectiveTwTitle);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', effectiveTwDesc);

  let twImage = document.querySelector('meta[name="twitter:image"]');
  if (!twImage) {
    twImage = document.createElement('meta');
    twImage.setAttribute('name', 'twitter:image');
    document.head.appendChild(twImage);
  }
  const fullTwImg = effectiveTwImage.startsWith('http')
    ? effectiveTwImage
    : `https://ramamtextiles.shop${effectiveTwImage.startsWith('/') ? effectiveTwImage : '/' + effectiveTwImage}`;
  twImage.setAttribute('content', fullTwImg);

  // 7. Inject / Update Custom JSON-LD Structured Data
  if (customJsonLd) {
    try {
      // Validate JSON syntax before injecting
      JSON.parse(customJsonLd);
      let schemaScript = document.getElementById('rt-custom-page-schema') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'rt-custom-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = customJsonLd;
    } catch {}
  }

  // 8. Apply image alt overrides to visible DOM images if available
  if (Object.keys(imageAltOverrides).length > 0) {
    setTimeout(() => {
      document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src') || '';
        const filename = src.split('/').pop() || '';
        if (imageAltOverrides[src]) {
          img.setAttribute('alt', imageAltOverrides[src]);
        } else if (imageAltOverrides[filename]) {
          img.setAttribute('alt', imageAltOverrides[filename]);
        }
      });
    }, 100);
  }
}

/**
 * React hook to set page SEO on component mount or prop change
 */
export function usePageSEO(seo: SEOProps): void {
  useEffect(() => {
    setPageSEO(seo);
  }, [seo.title, seo.description, seo.path, seo.image]);
}

