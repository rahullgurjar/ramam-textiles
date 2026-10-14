import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const BASE_URL = 'https://ramamtextiles.shop';
const baseIndexHtml = fs.readFileSync(indexPath, 'utf-8');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function extractQuoted(text, field) {
  const dq = text.match(new RegExp(`${field}:\\s*"([^"]+)"`));
  if (dq) return dq[1];
  const sq = text.match(new RegExp(`${field}:\\s*'([^']+)'`));
  if (sq) return sq[1];
  return null;
}

// 1. Parse Categories & Products from src/data/products.ts
function parseProductsData() {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf-8');
  
  // Extract Categories
  const categories = [];
  const catBlocks = fileContent.match(/export\s+const\s+CATEGORIES:\s*CategoryInfo\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (catBlocks) {
    const rawItems = catBlocks[1].split(/\{\s*id:/);
    for (let i = 1; i < rawItems.length; i++) {
      const item = rawItems[i];
      const id = extractQuoted(item, 'id') || (item.match(/^\s*['"]([^'"]+)['"]/) ? item.match(/^\s*['"]([^'"]+)['"]/)[1] : null);
      const slug = extractQuoted(item, 'slug') || id;
      const name = extractQuoted(item, 'name');
      const desc = extractQuoted(item, 'description');
      const image = extractQuoted(item, 'image');
      if (slug) {
        categories.push({
          id,
          slug,
          name: name || slug,
          description: desc || 'Authentic Jaipur handcrafted textiles and quilted accessories.',
          image: image ? (image.startsWith('http') ? image : `${BASE_URL}/${image.replace(/^(\.|\/)+/, '')}`) : `${BASE_URL}/logo.png`
        });
      }
    }
  }

  // Extract Products
  const products = [];
  const prodBlocks = fileContent.split(/\{\s*id:\s*['"]prod-/);
  for (let i = 1; i < prodBlocks.length; i++) {
    const b = prodBlocks[i];
    const slug = extractQuoted(b, 'slug');
    const name = extractQuoted(b, 'name');
    const sku = extractQuoted(b, 'sku') || `RT-PROD-${i}`;
    const desc = extractQuoted(b, 'description');
    const fabric = extractQuoted(b, 'fabric');
    const category = extractQuoted(b, 'category') || 'bags';
    const retailPriceMatch = b.match(/indicativeRetailInr:\s*(\d+)/);
    const retailPrice = retailPriceMatch ? parseInt(retailPriceMatch[1], 10) : 999;
    const imgMatch = b.match(/images:\s*\[\s*['"]([^'"]+)['"]/);
    const rawImg = imgMatch ? imgMatch[1] : '/logo.png';
    const image = rawImg.startsWith('http') ? rawImg : `${BASE_URL}/${rawImg.replace(/^(\.|\/)+/, '')}`;

    if (slug && name) {
      products.push({
        slug,
        name,
        sku,
        description: desc || 'Authentic handcrafted Jaipur luxury textile product by Ramam Textiles.',
        fabric: fabric || '100% Pure Jaipur Cotton',
        category,
        retailPrice,
        image
      });
    }
  }

  return { categories, products };
}

// 2. Parse Journal Articles from src/data/journal.ts
function parseJournalData() {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/journal.ts'), 'utf-8');
  const articles = [];
  const articleBlocks = fileContent.split(/\{\s*id:\s*['"][^'"]+['"],\s*slug:\s*['"]([^'"]+)['"]/);
  for (let i = 1; i < articleBlocks.length; i += 2) {
    const slug = articleBlocks[i];
    const rest = articleBlocks[i + 1] || '';
    const title = extractQuoted(rest, 'title');
    const excerpt = extractQuoted(rest, 'excerpt');
    const coverImage = extractQuoted(rest, 'coverImage');
    const rawImg = coverImage || '/logo.png';
    const image = rawImg.startsWith('http') ? rawImg : `${BASE_URL}/${rawImg.replace(/^(\.|\/)+/, '')}`;

    articles.push({
      slug,
      title: title || slug,
      excerpt: excerpt || 'Expert technical textile insights and artisanal craftsmanship guide from Ramam Textiles Jaipur.',
      image
    });
  }
  return articles;
}

const { categories, products } = parseProductsData();
const articles = parseJournalData();

// Core Static Page Definitions
const CORE_PAGE_SEO = {
  '/': {
    title: 'RAMAM TEXTILES | Luxury Indian Textiles, Apparel & Wholesale Manufacturer | Jaipur',
    description: 'Ramam Textiles is an authentic Indian luxury textile manufacturer based in Jaipur, Rajasthan. Specializing in hand block prints, artisan apparel, quilted cotton bags, pure fabrics by meter, and custom manufacturing for global brands.',
    h1: 'Authentic Jaipur Artisan Textiles & Wholesale Manufacturing',
    snippet: 'Discover royal Rajasthani craftsmanship, hand block printed quilted duffles, nesting vanity pouches, and private label apparel direct from our Jaipur workshop.'
  },
  '/shop': {
    title: 'Wholesale Catalog & Ready-To-Order SKUs | Ramam Textiles Jaipur',
    description: 'Explore artisan quilted travel duffles, vanity pouches, laptop sleeves, and pure cotton fabrics. Low MOQ wholesale orders direct from Jaipur craftsmen.',
    h1: 'Jaipur Handcrafted Wholesale Catalog & Collections',
    snippet: 'Order direct from our artisan workshop with low minimum order quantities (MOQ 25 units), worldwide express air cargo, and custom private-label branding.'
  },
  '/collections': {
    title: 'Curated Sets & Heritage Editions | Ramam Textiles Jaipur',
    description: 'Discover coordinated sets including quilted weekender bags, nesting cosmetic vanity trios, and artisan organizers block-printed with heritage Bagru and Sanganeri motifs.',
    h1: 'Curated Artisan Sets & Heritage Textile Editions',
    snippet: 'Coordinated lifestyle bags, cosmetic vanity organizers, and tech sleeves handcrafted using traditional Bagru mud-resist Dabu dyeing and Sanganer block prints.'
  },
  '/custom-manufacturing': {
    title: 'Custom Garment Manufacturing & Private Label OEM | Ramam Textiles Jaipur',
    description: 'Bespoke apparel production, custom wooden block carving, botanical dyeing, and private label packaging from our Jaipur atelier. Flexible minimums and global shipping.',
    h1: 'Custom Manufacturing & Private Label Atelier Jaipur',
    snippet: 'Full end-to-end manufacturing for global retail boutiques, fashion designers, and hospitality brands: custom woodblock carving, lab-dip color matching, and custom woven tags.'
  },
  '/wholesale': {
    title: 'Wholesale Buyer Portal & Direct Atelier Terms | Ramam Textiles Jaipur',
    description: 'Access manufacturer FOB pricing, tiered volume discounts, fabric specifications, and custom branding services for retail boutiques and lifestyle brands.',
    h1: 'Direct Manufacturer Wholesale Terms & B2B Purchasing',
    snippet: 'Competitive FOB pricing, volume tier discounts, strict international export quality inspection, and air courier dispatch to USA, UK, Europe, Australia, and UAE.'
  },
  '/craftsmanship': {
    title: 'The Bagru & Sanganer Handblock Printing Heritage | Ramam Textiles Jaipur',
    description: 'Explore the 400-year-old artisanal process of hand block carving, botanical mud-resist Dabu dyeing, pure river washing, and traditional sun curing in Rajasthan.',
    h1: 'The Living Heritage of Hand Block Printing in Rajasthan',
    snippet: 'Preserving four centuries of artisanal technique: hand-carved teak woodblocks, natural botanical pigments, fermented indigo vats, and sun-cured pure Indian cotton.'
  },
  '/lookbook': {
    title: 'Editorial Lookbook & Lifestyle Catalog | Ramam Textiles Jaipur',
    description: 'High-fashion editorial showcase of handcrafted quilted cotton duffles, tote bags, and vanity pouches styled in Jaipur palatial architecture.',
    h1: 'Editorial Lifestyle Lookbook — Jaipur Royal Palaces',
    snippet: 'Visual style gallery showcasing our handcrafted quilted travel luggage, vanity cases, and resort lifestyle accessories in heritage Rajasthani architectural settings.'
  },
  '/journal': {
    title: 'Textile Sourcing Journal & Artisan Insights | Ramam Textiles',
    description: 'Practical guides and deep dives on sourcing pure Indian cotton, discerning authentic woodblock prints, caring for botanical dyes, and private label best practices.',
    h1: 'Artisan Textile Insights & Global Sourcing Guides',
    snippet: 'Technical articles on pure 60x60 cotton mulmul, natural indigo vat chemistry, ethical textile manufacturing, and private-label brand development.'
  },
  '/about': {
    title: 'About Ramam Textiles | Authentic Jaipur Artisan Atelier & Workshop',
    description: 'Meet the heritage craftsmen and master printers behind Ramam Textiles. Preserving traditional Indian textile arts while meeting rigorous international export standards.',
    h1: 'Preserving Heritage Craftsmanship in the Pink City',
    snippet: 'Founded in Jaipur, Rajasthan, Ramam Textiles bridges centuries-old Indian artisan heritage with rigorous modern commercial quality standards for discerning global clients.'
  },
  '/contact': {
    title: 'Contact Jaipur Atelier & Production Workshop | Ramam Textiles',
    description: 'Direct communication desk for international buyers, retail store owners, and custom manufacturing inquiries. Visit our Jaipur workshop or schedule a video call.',
    h1: 'Contact Our Jaipur Atelier & Export Desk',
    snippet: 'Connect directly with our production coordinators for wholesale swatch requests, custom block printing inquiries, factory visits, or private-label quotes.'
  },
  '/faq': {
    title: 'Frequently Asked Questions & Buyer Knowledge Base | Ramam Textiles',
    description: 'Clear answers on minimum order quantities, physical swatch sampling, payment terms, international air cargo transit times, and custom brand labeling.',
    h1: 'Frequently Asked Questions & International Buyer Guide',
    snippet: 'Clear technical guidance on order minimums (MOQ), international delivery transit times (3-7 days via DHL/FedEx Express), sampling protocols, and payment terms.'
  },
  '/track': {
    title: 'Track Consignment & Production Dispatch | Ramam Textiles',
    description: 'Real-time production and international courier tracking for wholesale textile consignments and custom manufacturing orders dispatched from Jaipur.',
    h1: 'Track Consignment & International Air Freight Dispatch',
    snippet: 'Real-time tracking for wholesale orders, fabric consignments, and custom manufacturing dispatches shipped via international express cargo.'
  },
  '/shipping-returns': {
    title: 'Worldwide Shipping & Returns Policy | Ramam Textiles',
    description: 'International export shipping timelines, customs duties, insured air freight, and quality inspection policy.',
    h1: 'International Air Freight, Customs & Export Assurance',
    snippet: 'Comprehensive shipping guidelines: insured international air cargo, customs clearance documentation, quality inspection approvals, and buyer protection.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Ramam Textiles Jaipur',
    description: 'Privacy policy and client data protection standards at Ramam Textiles Jaipur.',
    h1: 'Privacy Policy & Buyer Data Protection',
    snippet: 'Our commitment to confidential client designs, proprietary block print patterns, and secure international transaction data protection.'
  },
  '/terms-conditions': {
    title: 'Terms & Conditions | Ramam Textiles Jaipur',
    description: 'Official commercial terms, production milestones, sampling policies, and wholesale agreements.',
    h1: 'Commercial Terms, Production Milestones & Supply Agreement',
    snippet: 'Clear and transparent commercial agreements for sampling approvals, production lead times, intellectual property protections, and international export delivery.'
  }
};

// Route Generator
const allRoutes = [];

// 1. Core pages
Object.keys(CORE_PAGE_SEO).forEach(route => {
  if (route !== '/') {
    allRoutes.push({
      route,
      ...CORE_PAGE_SEO[route],
      image: `${BASE_URL}/logo.png`,
      schemaType: 'WebPage'
    });
  }
});

// 2. Categories
categories.forEach(cat => {
  const catProducts = products.filter(p => p.category === cat.id);
  allRoutes.push({
    route: `/category/${cat.slug}`,
    title: `${cat.name} | Jaipur Hand Block Prints | Ramam Textiles`,
    description: cat.description,
    h1: `${cat.name}`,
    snippet: `${cat.description} Explore ${catProducts.length} handcrafted wholesale SKUs.`,
    image: cat.image,
    schemaType: 'CollectionPage',
    categoryProducts: catProducts
  });
});

// 3. Products
products.forEach(prod => {
  allRoutes.push({
    route: `/product/${prod.slug}`,
    title: `${prod.name} | Ramam Textiles Jaipur`,
    description: prod.description,
    h1: `${prod.name}`,
    snippet: `Authentic Jaipur hand block printed: ${prod.fabric}. Wholesale MOQ: 25 units. Indicative Retail: ₹${prod.retailPrice}.`,
    image: prod.image,
    schemaType: 'Product',
    productData: prod
  });
});

// 4. Articles
articles.forEach(art => {
  allRoutes.push({
    route: `/journal/${art.slug}`,
    title: `${art.title} | Ramam Textiles Journal`,
    description: art.excerpt,
    h1: `${art.title}`,
    snippet: art.excerpt,
    image: art.image,
    schemaType: 'BlogPosting',
    articleData: art
  });
});

console.log(`Generating ${allRoutes.length} static entrypoint pages in dist/ for Google indexing & HTTP 200...`);

allRoutes.forEach(entry => {
  const canonicalUrl = `${BASE_URL}${entry.route}`;
  let html = baseIndexHtml;

  // 1. Update Title Tag
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeXml(entry.title)}</title>`);

  // 2. Update Meta Description
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeXml(entry.description)}" />`);

  // 3. Update Canonical Tag
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Update OpenGraph Tags
  html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeXml(entry.title)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeXml(entry.description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${entry.image}" />`);

  // 5. Update Twitter Tags
  html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeXml(entry.title)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeXml(entry.description)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:image["'][^>]*>/i, `<meta name="twitter:image" content="${entry.image}" />`);

  // 6. Inject Schema.org JSON-LD
  let schemaJson = '';
  if (entry.schemaType === 'Product' && entry.productData) {
    const p = entry.productData;
    schemaJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      image: [p.image],
      description: p.description,
      sku: p.sku,
      mpn: p.sku,
      brand: {
        '@type': 'Brand',
        name: 'Ramam Textiles'
      },
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        priceCurrency: 'INR',
        price: p.retailPrice,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Ramam Textiles Jaipur'
        }
      }
    });
  } else if (entry.schemaType === 'BlogPosting' && entry.articleData) {
    const a = entry.articleData;
    schemaJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: a.title,
      image: [a.image],
      description: a.excerpt,
      author: {
        '@type': 'Organization',
        name: 'Ramam Textiles Craft Archive'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ramam Textiles',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`
        }
      },
      mainEntityOfPage: canonicalUrl
    });
  } else if (entry.schemaType === 'CollectionPage') {
    schemaJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: entry.title,
      description: entry.description,
      url: canonicalUrl
    });
  }

  if (schemaJson) {
    const schemaTag = `\n    <script type="application/ld+json">\n    ${schemaJson}\n    </script>\n  </head>`;
    html = html.replace('</head>', schemaTag);
  }

  // 7. Inject Semantic Static Fallback inside <div id="root">
  let fallbackContent = `
    <header style="padding:24px 20px;border-bottom:1px solid #E8DFD8;background:#FDFCFA;display:flex;justify-content:space-between;align-items:center;">
      <a href="/" style="font-family:serif;font-size:20px;font-weight:700;color:#9B332C;text-decoration:none;letter-spacing:1px;">RAMAM TEXTILES</a>
      <nav style="display:flex;gap:18px;font-size:14px;">
        <a href="/shop" style="color:#241A16;text-decoration:none;">Shop Catalog</a>
        <a href="/collections" style="color:#241A16;text-decoration:none;">Collections</a>
        <a href="/wholesale" style="color:#241A16;text-decoration:none;">Wholesale</a>
        <a href="/about" style="color:#241A16;text-decoration:none;">About</a>
        <a href="/contact" style="color:#241A16;text-decoration:none;">Contact</a>
      </nav>
    </header>
    <main style="max-width:1100px;margin:40px auto;padding:0 20px;font-family:sans-serif;color:#241A16;line-height:1.6;">
      <h1 style="font-family:serif;font-size:32px;color:#9B332C;margin-bottom:16px;">${escapeXml(entry.h1)}</h1>
      <p style="font-size:16px;color:#554D47;max-width:800px;margin-bottom:24px;">${escapeXml(entry.snippet)}</p>
  `;

  if (entry.productData) {
    const p = entry.productData;
    fallbackContent += `
      <div style="display:flex;gap:32px;flex-wrap:wrap;margin-top:24px;">
        <img src="${p.image}" alt="${escapeXml(p.name)}" style="width:340px;height:340px;object-fit:cover;border-radius:8px;border:1px solid #E8DFD8;" />
        <div style="flex:1;min-width:280px;">
          <p style="font-size:20px;font-weight:bold;color:#241A16;">₹${p.retailPrice} INR <span style="font-size:14px;color:#7A6E65;">(Indicative Retail)</span></p>
          <p style="margin:12px 0;"><strong>SKU:</strong> ${escapeXml(p.sku)}</p>
          <p style="margin:12px 0;"><strong>Fabric:</strong> ${escapeXml(p.fabric)}</p>
          <p style="margin:16px 0;line-height:1.7;">${escapeXml(p.description)}</p>
          <div style="margin-top:24px;">
            <a href="/contact" style="display:inline-block;background:#9B332C;color:#FFFFFF;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin-right:12px;">Request Wholesale Quote</a>
            <a href="/shop" style="display:inline-block;border:1px solid #9B332C;color:#9B332C;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">View All Products</a>
          </div>
        </div>
      </div>
    `;
  } else if (entry.categoryProducts && entry.categoryProducts.length > 0) {
    fallbackContent += `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:20px;margin-top:24px;">
        ${entry.categoryProducts.map(p => `
          <div style="border:1px solid #E8DFD8;border-radius:8px;padding:16px;background:#FFFFFF;">
            <img src="${p.image}" alt="${escapeXml(p.name)}" style="width:100%;height:180px;object-fit:cover;border-radius:4px;" />
            <h3 style="font-size:16px;margin:12px 0 6px 0;"><a href="/product/${p.slug}" style="color:#241A16;text-decoration:none;">${escapeXml(p.name)}</a></h3>
            <p style="font-size:14px;color:#9B332C;font-weight:bold;">₹${p.retailPrice} INR</p>
            <a href="/product/${p.slug}" style="font-size:13px;color:#9B332C;text-decoration:underline;">View Details →</a>
          </div>
        `).join('')}
      </div>
    `;
  }

  fallbackContent += `
    </main>
    <footer style="margin-top:60px;padding:32px 20px;border-top:1px solid #E8DFD8;background:#FAF6F2;text-align:center;font-size:13px;color:#7A6E65;">
      <p>© ${new Date().getFullYear()} Ramam Textiles, Jaipur, Rajasthan, India. All rights reserved.</p>
      <p style="margin-top:8px;">Authentic Hand Block Prints | Quilted Bags | Wholesale Apparel</p>
    </footer>
  `;

  html = html.replace(/<div id=["']root["'][^>]*><\/div>/i, `<div id="root" class="overflow-x-hidden w-full relative">${fallbackContent}</div>`);

  // 1. Write to dist/[cleanRoute]/index.html (handles trailing slash: /route/)
  const cleanRoute = entry.route.replace(/^\//, '');
  const targetDir = path.join(distDir, cleanRoute);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetIndex = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetIndex, html, 'utf-8');

  // 2. Also write to dist/[cleanRoute].html (handles non-trailing slash: /route with direct 200 OK)
  const targetHtmlFile = path.join(distDir, `${cleanRoute}.html`);
  const parentDir = path.dirname(targetHtmlFile);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  fs.writeFileSync(targetHtmlFile, html, 'utf-8');
});

console.log(`✅ Successfully generated ${allRoutes.length} static entrypoint pages in dist/.`);
console.log(`🚀 All routes will now respond with HTTP 200 OK and customized SEO tags on GitHub Pages.`);
