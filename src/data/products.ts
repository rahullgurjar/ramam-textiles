import { Product, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'women',
    slug: 'women',
    name: "Women's Apparel",
    subtitle: "Artisanal Silhouettes & Block Prints",
    description: "Hand block printed Anarkalis, Angrakha kurtas, breezy Mulmul dresses, Chanderi silk sarees, and tailored co-ord sets.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    badge: "B2B Export Ready"
  },
  {
    id: 'men',
    slug: 'men',
    name: "Men's Heritage Wear",
    subtitle: "Refined Handloom & Tailored Classics",
    description: "Breathable pure linen shirts, Bagru block-printed kurtas, classic Nehru waistcoats, and relaxed cotton trousers.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85",
    badge: "Custom Fits Available"
  },
  {
    id: 'kids',
    slug: 'kids',
    name: "Kids & Festive",
    subtitle: "Pure Organic Cotton & Gentle Dyes",
    description: "Skin-friendly botanical printed frocks, festive Kurta-Dhoti sets, and comfortable playwear crafted from 100% breathable cotton.",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=85",
    badge: "Hypoallergenic Dyes"
  },
  {
    id: 'bags',
    slug: 'bags',
    name: "Quilted Bags & Pouches",
    subtitle: "Hand-Stitched Quilted Cotton Accessories",
    description: "Heritage block-printed travel duffles, structured tote bags, cosmetic vanity organizers, yoga mat bags, and wedding favor pouches.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85",
    badge: "Wholesale MOQ 25 pcs"
  },
  {
    id: 'fabrics',
    slug: 'fabrics',
    name: "Fabrics by the Meter",
    subtitle: "Pure Mulmul, Cambric, Chanderi & Linen",
    description: "Authentic Bagru Dabu indigo, Sanganeri florals, Ajrakh natural resist, pure Maheshwari silks, and 60x60 superfine cotton bolts.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85",
    badge: "Sampling & Swatch Books"
  },
  {
    id: 'home',
    slug: 'home',
    name: "Home Textiles & Living",
    subtitle: "Heritage Razais, Dohars & Table Linens",
    description: "Cloud-soft hand-carded cotton Jaipuri quilts, summer dohars, botanical table runners, and block-printed cushion covers.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85",
    badge: "Hotel & Resort Supply"
  }
];

export const PRODUCTS: Product[] = [
  // --- WOMEN'S APPAREL ---
  {
    id: 'rt-w-001',
    slug: 'royal-marigold-mulmul-anarkali-set',
    name: 'Royal Marigold Hand Block-Printed Mulmul Anarkali Set',
    sku: 'RT-WOM-ANR-001',
    collection: 'Sanganer Summer Florals',
    category: 'women',
    subcategory: 'Anarkali & Kurta Sets',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Superfine Cotton Mulmul (60x60 Count)',
    printTechnique: 'Authentic 3-Color Sanganeri Hand Wooden Block Print',
    colors: ['Marigold Amber', 'Sage Leaf', 'Indigo Blue', 'Madder Coral'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', 'Custom B2B Grading'],
    moq: 30,
    indicativeRetailInr: 4850,
    wholesaleTiers: [
      { minQty: 30, maxQty: 100, pricePerUnitInr: 1650, leadTimeWeeks: '3-4 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 1450, leadTimeWeeks: '4-5 weeks' },
      { minQty: 301, maxQty: 1000, pricePerUnitInr: 1280, leadTimeWeeks: '5-6 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '3-4 Weeks for Bulk Production',
    description: 'An elegant flared Anarkali silhouette cut from featherweight Jaipur cotton mulmul. Decorated with delicate floral buti motifs hand-stamped using traditional carved teak blocks. Paired with straight-cut cropped pants and a gossamer mulmul dupatta with hand-knotted tassels.',
    highlights: [
      '100% pure breathable cotton mulmul (60x60 weave)',
      'Hand-carved wooden block print using AZO-free fast colors',
      'Gota patti detailing on neckline and sleeve cuffs',
      'Complete 3-piece set: Kurta, Pants, and Dupatta',
      'Custom buyer branding, size grading and custom tags included for B2B'
    ],
    specifications: {
      fabric: '100% Cotton Mulmul with pure cotton lining',
      gsm: '85 GSM (Ultra-breathable lightweight)',
      washCare: 'Dry clean recommended for first wash; subsequent gentle cold hand wash in shade.',
      origin: 'Sanganer, Jaipur, Rajasthan, India',
      packaging: 'Individually poly-packed with moisture barriers; standard export master cartons (50 units/carton).',
      hsCode: '6204.42',
      exportReady: true
    },
    tags: ['Anarkali', 'Block Print', 'Mulmul', 'Sanganer', 'Women Fashion', 'Wholesale Dress'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-w-002',
    slug: 'chanderi-silk-zari-festive-kurti',
    name: 'Heritage Chanderi Silk Zari Kurti & Organza Dupatta',
    sku: 'RT-WOM-CHN-002',
    collection: 'Rajputana Heritage Weaves',
    category: 'women',
    subcategory: 'Festive Kurtis',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: 'Pure Handloom Chanderi Silk-Cotton with Real Muted Zari',
    printTechnique: 'Woven Brocade Booti with Hand Foil Highlights',
    colors: ['Emerald Forest', 'Champagne Beige', 'Royal Crimson', 'Midnight Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    moq: 25,
    indicativeRetailInr: 6200,
    wholesaleTiers: [
      { minQty: 25, maxQty: 75, pricePerUnitInr: 2150, leadTimeWeeks: '3-4 weeks' },
      { minQty: 76, maxQty: 250, pricePerUnitInr: 1890, leadTimeWeeks: '4-5 weeks' },
      { minQty: 251, maxQty: 800, pricePerUnitInr: 1680, leadTimeWeeks: '5-6 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '3-4 Weeks',
    description: 'A regal Chanderi silk tunic designed for luxury boutiques and festive wear collections. Lined with pure cotton cambric, featuring fine zari selvedge detailing, side slits, and accompanied by a sheer scalloped organza dupatta.',
    highlights: [
      'Lustrous lightweight Chanderi silk-cotton blend',
      'Artisanal golden zari border craftsmanship',
      'Pure mulmul lining for all-day skin comfort',
      'Ideal for festive collections, luxury boutiques and bridal wedding guest capsules'
    ],
    specifications: {
      fabric: '60% Pure Silk, 40% Mercerized Cotton',
      gsm: '110 GSM',
      washCare: 'Professional dry clean only.',
      origin: 'Jaipur / Chanderi Clusters, India',
      packaging: 'Custom branded hanger pack with dust bags available for wholesale.',
      hsCode: '6204.49',
      exportReady: true
    },
    tags: ['Chanderi', 'Silk Kurti', 'Festive', 'Zari', 'Luxury Apparel'],
    inStock: true,
    isFeatured: true,
    isBestseller: false,
    isNew: true
  },
  {
    id: 'rt-w-003',
    slug: 'bagru-dabu-indigo-tiered-boho-dress',
    name: 'Bagru Dabu Mud-Resist Indigo Tiered Maxi Dress',
    sku: 'RT-WOM-DRS-003',
    collection: 'Bagru Monsoon Indigo',
    category: 'women',
    subcategory: 'Dresses & Western Fusion',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Pure Organic Cotton Cambric (60s)',
    printTechnique: 'Traditional Bagru Dabu Mud Resist & Fermented Indigo Vat Dye',
    colors: ['Deep Indigo', 'Kashish Grey', 'Alizarin Crimson', 'Mustard Ochre'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    moq: 35,
    indicativeRetailInr: 3950,
    wholesaleTiers: [
      { minQty: 35, maxQty: 100, pricePerUnitInr: 1250, leadTimeWeeks: '3-4 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 1080, leadTimeWeeks: '4-5 weeks' },
      { minQty: 301, maxQty: 1000, pricePerUnitInr: 940, leadTimeWeeks: '5-6 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '3-4 Weeks',
    description: 'Flowing bohemian tiered maxi dress created through ancient mud-resist Dabu printing and natural indigo dipping. Features smocked waist detailing, subtle flutter sleeves, and discreet side seam pockets.',
    highlights: [
      '100% natural plant-based indigo and mud-resist printing',
      'Pre-washed and shrink-tested organic cotton',
      'Global bohemian resortwear silhouette loved by European and US retailers',
      'Includes matching fabric tie belt'
    ],
    specifications: {
      fabric: '100% Organic Cotton Cambric',
      gsm: '95 GSM',
      washCare: 'Hand wash separately in cold water with eco-friendly mild detergent; dry in shade.',
      origin: 'Bagru Artisan Workshop, Rajasthan, India',
      hsCode: '6204.42',
      exportReady: true
    },
    tags: ['Indigo', 'Dabu', 'Maxi Dress', 'Resortwear', 'Bohemian', 'Sustainable'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-w-004',
    slug: 'desert-khadi-linen-co-ord-set',
    name: 'Desert Khadi Pure Linen Relaxed Co-ord Set',
    sku: 'RT-WOM-CRD-004',
    collection: 'Desert Khadi Minimalist',
    category: 'women',
    subcategory: 'Co-ord Sets',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Handloom Organic European-Grade Linen',
    printTechnique: 'Minimalist Wooden Block Border Stamps & Coconut Shell Buttons',
    colors: ['Oatmeal Sand', 'Terracotta Rose', 'Slate Moss', 'Pure Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    moq: 25,
    indicativeRetailInr: 5400,
    wholesaleTiers: [
      { minQty: 25, maxQty: 80, pricePerUnitInr: 1780, leadTimeWeeks: '3-4 weeks' },
      { minQty: 81, maxQty: 250, pricePerUnitInr: 1550, leadTimeWeeks: '4-5 weeks' },
      { minQty: 251, maxQty: 600, pricePerUnitInr: 1390, leadTimeWeeks: '5-6 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '3-4 Weeks',
    description: 'An elevated two-piece co-ord set featuring an oversized notch-collar tunic shirt and matching wide-leg trousers. Made with premium enzyme-washed handloom linen for an effortlessly refined drape.',
    highlights: [
      '100% natural organic handloom linen with natural slub texture',
      'Real polished coconut shell buttons',
      'Elasticated back waistband with clean tailored front pleats',
      'Export certified colorfastness and shrinkage resistance'
    ],
    specifications: {
      fabric: '100% Pure Organic Linen',
      gsm: '165 GSM',
      washCare: 'Machine wash delicate cold cycle or hand wash; warm iron or steam.',
      origin: 'Jaipur Atelier, Rajasthan, India',
      hsCode: '6204.69',
      exportReady: true
    },
    tags: ['Linen', 'Co-ord Set', 'Luxury Minimalist', 'Resort', 'Private Label'],
    inStock: true,
    isFeatured: false,
    isBestseller: true,
    isNew: true
  },

  // --- MEN'S APPAREL ---
  {
    id: 'rt-m-001',
    slug: 'jaipur-hand-block-cotton-shirt',
    name: 'Jaipur Hand Block-Printed Pure Cotton Resort Shirt',
    sku: 'RT-MEN-SHT-001',
    collection: 'Sanganer Summer Florals',
    category: 'men',
    subcategory: 'Casual & Resort Shirts',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Super-combed Cotton Cambric 60s',
    printTechnique: 'Sanganeri Geometric & Botanical Woodblock Print',
    colors: ['Sage & Rust', 'Indigo Paisley', 'Charcoal Chevron', 'Olive Botanical'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    moq: 40,
    indicativeRetailInr: 2650,
    wholesaleTiers: [
      { minQty: 40, maxQty: 100, pricePerUnitInr: 790, leadTimeWeeks: '2-3 weeks' },
      { minQty: 101, maxQty: 400, pricePerUnitInr: 680, leadTimeWeeks: '3-4 weeks' },
      { minQty: 401, maxQty: 1500, pricePerUnitInr: 590, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2-3 Weeks',
    description: 'Camp-collar short-sleeved Cuban resort shirt stamped with heritage Jaipur woodblock motifs. Tailored with French seams, mother-of-pearl buttons, and breathable lightweight combed cotton.',
    highlights: [
      'Ultra-breathable 60s combed cotton for tropical & summer markets',
      'Cuban camp collar with clean boxy regular cut',
      'Genuine mother-of-pearl or natural horn buttons',
      'Pre-shrunk fabric with guaranteed colorfastness'
    ],
    specifications: {
      fabric: '100% Cotton Cambric (60x60 Count)',
      gsm: '105 GSM',
      washCare: 'Machine wash cold with like colors, tumble dry low or shade dry.',
      origin: 'Jaipur, Rajasthan, India',
      hsCode: '6205.20',
      exportReady: true
    },
    tags: ['Men Shirt', 'Resort Wear', 'Camp Collar', 'Block Print', 'Menswear Wholesale'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-m-002',
    slug: 'handloom-cotton-short-kurta-bandhgala',
    name: 'Handloom Slub Cotton Short Kurta with Mandarin Collar',
    sku: 'RT-MEN-KRT-002',
    collection: 'Desert Khadi Minimalist',
    category: 'men',
    subcategory: 'Kurtas & Tunics',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Pure Handloom Slub Cotton',
    printTechnique: 'Yarn Dyed Slub Weave with Subtle Wooden Block Cuffs',
    colors: ['Ivory Cream', 'Khaki Sand', 'Sky Chambray', 'Forest Pine'],
    sizes: ['M', 'L', 'XL', '2XL'],
    moq: 30,
    indicativeRetailInr: 2950,
    wholesaleTiers: [
      { minQty: 30, maxQty: 100, pricePerUnitInr: 890, leadTimeWeeks: '3 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 770, leadTimeWeeks: '3-4 weeks' },
      { minQty: 301, maxQty: 1000, pricePerUnitInr: 660, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '3 Weeks',
    description: 'Modern relaxed short kurta tailored with a structured mandarin band collar, concealed button placket, and deep side pockets. Blends traditional Indian silhouette with global smart-casual wearability.',
    highlights: [
      'Rich tactile slub texture woven on traditional pit looms',
      'Reinforced side vents and double-stitched stress points',
      'Versatile for pairing with denims, chinos or linen trousers'
    ],
    specifications: {
      fabric: '100% Handloom Cotton',
      gsm: '140 GSM',
      washCare: 'Gentle machine wash cold or hand wash.',
      origin: 'Jaipur, Rajasthan, India',
      hsCode: '6205.20',
      exportReady: true
    },
    tags: ['Short Kurta', 'Mandarin Collar', 'Menswear', 'Handloom Cotton'],
    inStock: true,
    isFeatured: false,
    isBestseller: true,
    isNew: false
  },

  // --- KIDS & FESTIVE ---
  {
    id: 'rt-k-001',
    slug: 'organic-cotton-block-print-kids-frock',
    name: 'Organic Cotton Hand Block-Printed Flutter Sleeve Frock',
    sku: 'RT-KID-FRK-001',
    collection: 'Sanganer Summer Florals',
    category: 'kids',
    subcategory: 'Girls Dresses',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Certified Organic Cotton Mulmul',
    printTechnique: 'Non-Toxic Vegetable Extract Block Print',
    colors: ['Pastel Pink Flora', 'Turquoise Bird', 'Yellow Marigold', 'Lilac Leaf'],
    sizes: ['1-2 Yrs', '2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs'],
    moq: 50,
    indicativeRetailInr: 1850,
    wholesaleTiers: [
      { minQty: 50, maxQty: 150, pricePerUnitInr: 520, leadTimeWeeks: '2-3 weeks' },
      { minQty: 151, maxQty: 500, pricePerUnitInr: 440, leadTimeWeeks: '3-4 weeks' },
      { minQty: 501, maxQty: 2000, pricePerUnitInr: 380, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2-3 Weeks',
    description: 'Gentle, hypoallergenic pure cotton dress designed with playful flutter sleeves, a soft cotton voil lining, and back button fastening. Non-irritating flat seams ensure complete comfort for delicate young skin.',
    highlights: [
      'OEKO-TEX standard non-toxic baby-safe dyes',
      'Feather-soft pure cotton lining',
      'Comfortable easy-slip silhouette with room for movement'
    ],
    specifications: {
      fabric: '100% Organic Cotton Mulmul',
      gsm: '85 GSM',
      washCare: 'Gentle machine wash 30°C; mild baby detergent.',
      origin: 'Jaipur, Rajasthan, India',
      hsCode: '6209.20',
      exportReady: true
    },
    tags: ['Kids Wear', 'Organic Cotton', 'Block Print Frock', 'Baby Safe Dyes'],
    inStock: true,
    isFeatured: true,
    isBestseller: false,
    isNew: true
  },

  // --- QUILTED BAGS & POUCHES ---
  {
    id: 'rt-b-001',
    slug: 'jaipur-quilted-cotton-travel-duffle-bag',
    name: 'Artisan Quilted Cotton Barrel Travel Duffle Bag',
    sku: 'RT-BAG-DUF-001',
    collection: 'Hand-Quilted Travel Collection',
    category: 'bags',
    subcategory: 'Travel Duffels & Bags',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Pure Cotton with Dense 120 GSM Cotton Batting Layer',
    printTechnique: 'Dual-Side Reversible Hand Block Print with Channel Quilting',
    colors: ['Autumn Botanical Blush', 'Heritage Indigo Paisley', 'Sunshine Marigold', 'Vintage Forest Sage'],
    sizes: ['Standard Cabin Size (48cm x 26cm x 26cm)', 'Overnight Compact (40cm x 22cm x 22cm)'],
    moq: 25,
    indicativeRetailInr: 2850,
    wholesaleTiers: [
      { minQty: 25, maxQty: 75, pricePerUnitInr: 920, leadTimeWeeks: '2-3 weeks' },
      { minQty: 76, maxQty: 200, pricePerUnitInr: 810, leadTimeWeeks: '3-4 weeks' },
      { minQty: 201, maxQty: 1000, pricePerUnitInr: 690, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2-3 Weeks',
    description: 'Spacious cylindrical weekender duffle bag handcrafted with pure quilted block-printed cotton. Features parallel channel stitching, sturdy cotton canvas webbed handles, detachable shoulder sling, heavy-duty YKK antique brass zippers, and water-resistant inner lining with internal organizing pockets.',
    highlights: [
      '100% pure quilted cotton with reinforced load-bearing seams',
      'YKK brass zipper hardware and heavy-gauge metal swivel hooks',
      'High-capacity cabin approved carry-on dimensions',
      'Ideal for boutique wholesale, resort gift shops and custom bridal party favors',
      'Custom buyer woven logo tags and customized prints supported'
    ],
    specifications: {
      fabric: '100% Cotton Outer + Pure Cotton Batting Core',
      gsm: '320 GSM (Quilted Combined)',
      washCare: 'Spot clean with damp cloth or gentle cold hand wash; air dry flat.',
      origin: 'Jaipur Bag Atelier, Rajasthan, India',
      packaging: 'Individually folded and poly-bagged; 30 units per heavy export master carton.',
      hsCode: '4202.92',
      exportReady: true
    },
    tags: ['Duffle Bag', 'Quilted Cotton', 'Travel Bag', 'Block Print Bag', 'Wholesale Bags', 'Jaipur Craft'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-b-002',
    slug: 'botanical-quilted-cosmetic-vanity-pouch-set',
    name: 'Botanical Quilted Cosmetic Vanity Box & Pouch Set of 3',
    sku: 'RT-BAG-PCH-002',
    collection: 'Hand-Quilted Travel Collection',
    category: 'bags',
    subcategory: 'Vanity Cases & Pouches',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Hand-Printed Quilted Cotton with Waterproof PVC Lining',
    printTechnique: 'Sanganer Floral Block Print & Contrast Piping',
    colors: ['Blush Rose', 'Indigo Bloom', 'Turquoise Lily', 'Honey Mustard'],
    sizes: ['Trio Set: Large (24x14x12cm), Medium (20x11x10cm), Small (16x9x8cm)'],
    moq: 30,
    indicativeRetailInr: 1650,
    wholesaleTiers: [
      { minQty: 30, maxQty: 100, pricePerUnitInr: 490, leadTimeWeeks: '2 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 410, leadTimeWeeks: '2-3 weeks' },
      { minQty: 301, maxQty: 1500, pricePerUnitInr: 340, leadTimeWeeks: '3-4 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2 Weeks',
    description: 'Nesting trio of structured vanity pouches designed for toiletries, cosmetics, jewellery, and travel essentials. Equipped with wipe-clean inner waterproof linings, smooth nylon zip pullers, and top grab handles on the large vanity case.',
    highlights: [
      '3-in-1 nesting set maximizes shipping volume and retail shelf appeal',
      'Wipe-clean spillproof interior lining protects against liquid leaks',
      'Massive global B2B demand for gifting, subscriptions, and beauty brands',
      'Low MOQ with fast 14-day dispatch capability'
    ],
    specifications: {
      fabric: '100% Quilted Cotton Outer + Food-Grade Clear PVC Lining',
      washCare: 'Wipe clean interior with wet wipe; exterior hand washable.',
      origin: 'Jaipur, Rajasthan, India',
      hsCode: '4202.12',
      exportReady: true
    },
    tags: ['Vanity Case', 'Cosmetic Pouch', 'Quilted Pouch', 'Wedding Favors', 'Wholesale Gifting'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'rt-b-003',
    slug: 'hand-block-printed-quilted-tote-bag',
    name: 'Quilted Everyday Market Tote Bag with Internal Laptop Sleeve',
    sku: 'RT-BAG-TOT-003',
    collection: 'Hand-Quilted Travel Collection',
    category: 'bags',
    subcategory: 'Tote Bags',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: 'Heavyweight Quilted Cotton Cambric + Canvas Base',
    printTechnique: 'Dual-Tone Bagru Mud Resist & Indigo Stamp',
    colors: ['Indigo Wave', 'Terracotta Mandala', 'Kashish Grey Foliage'],
    sizes: ['One Size (42cm x 36cm x 12cm, 28cm Drop Strap)'],
    moq: 30,
    indicativeRetailInr: 1850,
    wholesaleTiers: [
      { minQty: 30, maxQty: 100, pricePerUnitInr: 580, leadTimeWeeks: '2 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 490, leadTimeWeeks: '2-3 weeks' },
      { minQty: 301, maxQty: 1200, pricePerUnitInr: 420, leadTimeWeeks: '3-4 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2 Weeks',
    description: 'An ergonomic, lightweight quilted daily tote bag engineered to carry up to 10kg with comfortable padded shoulder straps. Includes a padded interior compartment that fits up to 15.6" laptops, magnetic snap closure, and zippered key pocket.',
    highlights: [
      'Padded shoulder straps prevent shoulder strain',
      'Reinforced bottom gusset with heavy canvas base',
      'Internal magnetic button closure with secure zippered coin pocket'
    ],
    specifications: {
      fabric: '100% Cotton with Cotton Batting',
      gsm: '280 GSM',
      washCare: 'Cold hand wash or gentle machine wash.',
      origin: 'Jaipur, Rajasthan, India',
      hsCode: '4202.22',
      exportReady: true
    },
    tags: ['Tote Bag', 'Quilted Tote', 'Laptop Bag', 'Eco Bag', 'Wholesale Cotton Bags'],
    inStock: true,
    isFeatured: false,
    isBestseller: true,
    isNew: false
  },

  // --- FABRICS BY THE METER ---
  {
    id: 'rt-f-001',
    slug: 'pure-mulmul-cotton-60s-sanganeri-fabric',
    name: 'Superfine Pure Mulmul Cotton 60x60 Hand Block-Printed Fabric (By Meter)',
    sku: 'RT-FAB-MUL-001',
    collection: 'Sanganer Summer Florals',
    category: 'fabrics',
    subcategory: 'Mulmul & Cambric Fabrics',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Superfine Pure Cotton Mulmul (60x60 Count, 92x88 Construction)',
    printTechnique: 'Master Woodblock Stamped with Fast Reactive Botanical Dyes',
    colors: ['Marigold Floral', 'Ivory Sage Boota', 'Indigo Vine', 'Dusty Rose Mughal Jaal'],
    sizes: ['Fabric Width: 44 Inches (112 cm) | Sold in Bolts / Meters'],
    moq: 50, // 50 Meters MOQ
    indicativeRetailInr: 340, // per meter
    wholesaleTiers: [
      { minQty: 50, maxQty: 200, pricePerUnitInr: 175, leadTimeWeeks: '1-2 weeks' },
      { minQty: 201, maxQty: 800, pricePerUnitInr: 145, leadTimeWeeks: '2-3 weeks' },
      { minQty: 801, maxQty: 5000, pricePerUnitInr: 125, leadTimeWeeks: '3-4 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '1-2 Weeks (Stock Ready Available)',
    description: 'Renowned world over as "Jaipur Mulmul", this superfine 60s combed cotton is celebrated for its ethereal cloud-like softness and breathability. Stamped by master block carvers on 100-meter long padded printing tables. Ideal for summer dresses, resort kurtas, babywear, scarves, and airy shirting.',
    highlights: [
      '100% pure combed 60x60 cotton with zero synthetic polyester blending',
      'Ultra-soft touch with soft-finish wash processing',
      'Supplied in continuous bolts of 25m or 50m rolls wrapped in moisture film',
      'Custom colorway strikes and exclusive print development from 200m'
    ],
    specifications: {
      fabric: '100% Cotton Mulmul',
      gsm: '78 GSM',
      width: '44 Inches (112 cm)',
      weave: 'Plain Weave 92x88',
      washCare: 'Gentle hand wash cold; dry in shade.',
      origin: 'Sanganer Workshop, Jaipur, India',
      hsCode: '5208.52',
      exportReady: true
    },
    tags: ['Fabric by Meter', 'Mulmul Cotton', 'Block Print Fabric', 'Jaipur Cotton', 'Textile Mill', 'B2B Fabrics'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-f-002',
    slug: 'authentic-bagru-dabu-indigo-cotton-fabric',
    name: 'Authentic Bagru Dabu Mud-Resist Natural Indigo Cotton Fabric',
    sku: 'RT-FAB-IND-002',
    collection: 'Bagru Monsoon Indigo',
    category: 'fabrics',
    subcategory: 'Natural Dye & Bagru Fabrics',
    images: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Premium Cambric Cotton (60s)',
    printTechnique: 'Mud-Resist Dabu Paste Stamping & Fermented Indigo Vat Dipping',
    colors: ['Deep Indigo Midnight', 'Kashish Brown-Grey', 'Alizarin Crimson Red'],
    sizes: ['Fabric Width: 44 Inches (112 cm)'],
    moq: 50,
    indicativeRetailInr: 390,
    wholesaleTiers: [
      { minQty: 50, maxQty: 200, pricePerUnitInr: 195, leadTimeWeeks: '2-3 weeks' },
      { minQty: 201, maxQty: 600, pricePerUnitInr: 165, leadTimeWeeks: '3-4 weeks' },
      { minQty: 601, maxQty: 3000, pricePerUnitInr: 140, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2-3 Weeks',
    description: 'The ancient art of Bagru Dabu printing involves applying a thick mud-and-gum paste using wooden blocks, sprinkling sawdust, sun-baking, and dipping into biological indigo vats. Yields the distinct organic crackle and deep blue tones cherished by ethical fashion houses globally.',
    highlights: [
      'True traditional mud-resist craft from Bagru village artisan clusters',
      'Natural biological indigo fermentation without harsh chemicals',
      'Rich distinctive craquelure effect unique to authentic hand dipping'
    ],
    specifications: {
      fabric: '100% Cotton Cambric',
      gsm: '100 GSM',
      width: '44 Inches (112 cm)',
      dyeType: 'Natural Indigofera Tinctoria Vat Dye',
      washCare: 'Cold wash separately with mild detergent.',
      origin: 'Bagru, Rajasthan, India',
      hsCode: '5208.52',
      exportReady: true
    },
    tags: ['Dabu Fabric', 'Natural Indigo', 'Bagru Block Print', 'Artisan Textile', 'Eco Dye'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-f-003',
    slug: 'pure-chanderi-silk-cotton-zari-fabric',
    name: 'Pure Chanderi Silk-Cotton Handloom Fabric with Golden Zari Weave',
    sku: 'RT-FAB-CHN-003',
    collection: 'Rajputana Heritage Weaves',
    category: 'fabrics',
    subcategory: 'Silk & Luxury Handloom',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: 'Handloom Chanderi Silk (65% Degummed Silk, 35% Mercerized Cotton)',
    printTechnique: 'Jacquard Zari Extra-Weft Bootis & Fine Sheer Ground',
    colors: ['Champagne Gold', 'Royal Emerald', 'Burgundy Wine', 'Ivory Pearl'],
    sizes: ['Fabric Width: 45 Inches (114 cm)'],
    moq: 30,
    indicativeRetailInr: 680,
    wholesaleTiers: [
      { minQty: 30, maxQty: 100, pricePerUnitInr: 340, leadTimeWeeks: '2-3 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 295, leadTimeWeeks: '3-4 weeks' },
      { minQty: 301, maxQty: 1000, pricePerUnitInr: 260, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2-3 Weeks',
    description: 'A diaphanous, sheer handloom luxury fabric woven with fine mulberry silk warp and mercerized cotton weft, accented with metallic zari motifs. Preferred by haute couture designers for dupattas, evening overlays, sarees, and couture gowns.',
    highlights: [
      'Authentic transparent crisp hand-feel characteristic of pure Chanderi',
      'Extra-weft woven golden zari booti craftsmanship',
      'Supplied in export-standard rolls with edge protection'
    ],
    specifications: {
      fabric: '65% Silk, 35% Cotton Handloom',
      gsm: '65 GSM',
      width: '45 Inches (114 cm)',
      washCare: 'Dry clean only.',
      origin: 'Chanderi / Jaipur Weaving Guilds, India',
      hsCode: '5007.20',
      exportReady: true
    },
    tags: ['Chanderi Silk', 'Silk Fabric', 'Zari Fabric', 'Haute Couture', 'Wholesale Silk'],
    inStock: true,
    isFeatured: false,
    isBestseller: false,
    isNew: true
  },

  // --- HOME TEXTILES & LIVING ---
  {
    id: 'rt-h-001',
    slug: 'jaipur-hand-block-printed-cotton-razai-quilt',
    name: 'Artisan Reversible Hand Block-Printed Pure Cotton Razai (Quilt)',
    sku: 'RT-HOM-RAZ-001',
    collection: 'Sanganer Summer Florals',
    category: 'home',
    subcategory: 'Quilts & Dohars',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: 'Superfine 100% Cotton Mulmul Outer with Pure Hand-Carded Desi Cotton Fill',
    printTechnique: 'Dual-Sided Complementary Hand Block Print with Hand-Tagai Quilting Stitches',
    colors: ['Royal Marigold & Mint', 'Indigo Garden & Ivory', 'Crimson Mughal Floral'],
    sizes: ['King Size (270 x 225 cm / 108 x 90 in)', 'Single / Twin (225 x 150 cm / 90 x 60 in)'],
    moq: 15,
    indicativeRetailInr: 4950,
    wholesaleTiers: [
      { minQty: 15, maxQty: 50, pricePerUnitInr: 1850, leadTimeWeeks: '2-3 weeks' },
      { minQty: 51, maxQty: 150, pricePerUnitInr: 1620, leadTimeWeeks: '3-4 weeks' },
      { minQty: 151, maxQty: 500, pricePerUnitInr: 1420, leadTimeWeeks: '4-5 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2-3 Weeks',
    description: 'The legendary Jaipur Razai is celebrated globally for its unbelievable featherweight lightness combined with extraordinary warmth. Filled with hand-fluffed and carded pure desi cotton sealed between twin layers of mulmul, then hand-stitched by master women quilters.',
    highlights: [
      'Super-lightweight (approx 1.2 kg) yet provides cozy all-season insulation',
      '100% natural, hand-carded hygienic surgical grade cotton filling',
      'Reversible two-in-one design with intricate boota and jaal patterns',
      'High demand for boutique home decor, luxury hotels and Airbnb collections'
    ],
    specifications: {
      fabric: '100% Pure Cotton Mulmul with 100% Cotton Batting',
      gsm: '450 GSM (Total Quilt Density)',
      washCare: 'Dry clean recommended; periodic sunning keeps cotton fluffy and fresh.',
      origin: 'Jaipur, Rajasthan, India',
      packaging: 'Vacuum-compressed in eco-friendly reusable cotton canvas zipper bags.',
      hsCode: '9404.90',
      exportReady: true
    },
    tags: ['Jaipur Razai', 'Cotton Quilt', 'Handmade Quilt', 'Home Decor Wholesale', 'Bedding'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'rt-h-002',
    slug: 'hand-block-printed-botanical-cushion-cover-set',
    name: 'Mughal Botanical Block-Printed Heavy Cotton Canvas Cushion Covers (Set of 4)',
    sku: 'RT-HOM-CSH-002',
    collection: 'Sanganer Summer Florals',
    category: 'home',
    subcategory: 'Cushion Covers & Throws',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    fabric: '100% Heavy Duck Cotton Canvas (280 GSM)',
    printTechnique: 'Pigment Woodblock Print with Flanged Piping and Concealed Zipper',
    colors: ['Sage Palm', 'Indigo Trellis', 'Terracotta Poppy', 'Mustard Lotus'],
    sizes: ['Square 16x16 inches (40x40 cm)', 'Square 18x18 inches (45x45 cm)', 'Lumbar 12x20 inches (30x50 cm)'],
    moq: 40,
    indicativeRetailInr: 1590,
    wholesaleTiers: [
      { minQty: 40, maxQty: 100, pricePerUnitInr: 450, leadTimeWeeks: '2 weeks' },
      { minQty: 101, maxQty: 300, pricePerUnitInr: 380, leadTimeWeeks: '2-3 weeks' },
      { minQty: 301, maxQty: 1000, pricePerUnitInr: 320, leadTimeWeeks: '3-4 weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '2 Weeks',
    description: 'Substantial duck canvas cushion covers with artisanal hand-block stamped motifs, contrast piped borders, and concealed YKK zipper back closure. Provides an instant artisan aesthetic to living rooms and resort lounges.',
    highlights: [
      'Durable heavyweight 280 GSM cotton canvas resists daily wear',
      'Concealed invisible YKK zip with overlapping flap',
      'Tested for rub fastness and lightfastness'
    ],
    specifications: {
      fabric: '100% Heavy Duck Cotton Canvas',
      gsm: '280 GSM',
      washCare: 'Machine wash gentle cold; warm iron on reverse.',
      origin: 'Jaipur, Rajasthan, India',
      hsCode: '6304.92',
      exportReady: true
    },
    tags: ['Cushion Covers', 'Home Textiles', 'Block Print Living', 'Canvas Cushions', 'Resort Furnishing'],
    inStock: true,
    isFeatured: false,
    isBestseller: false,
    isNew: true
  }
];
