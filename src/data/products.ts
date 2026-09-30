import { Product, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'bags',
    slug: 'bags',
    name: 'Quilted Bags & Vanity',
    subtitle: '100% Pure Quilted Cotton Duffles & Pouches',
    description: 'Handcrafted cylindrical duffle bags, ruffle totes, cosmetic vanity pouches, and yoga mat carriers made from pure hand block-printed cotton.',
    image: './products/prod-3.jpg',
    badge: 'Artisan Workshop Line'
  },
  {
    id: 'women',
    slug: 'women',
    name: 'Travel & Weekender Bags',
    subtitle: 'Overnight & Resort Quilted Luggage',
    description: 'Generously sized quilted travel duffles featuring heritage indigo Mughal prints and autumn botanical hand blocks.',
    image: './products/prod-4.jpg',
    badge: 'Wholesale Bestseller'
  },
  {
    id: 'home',
    slug: 'home',
    name: 'Yoga & Wellness Accessories',
    subtitle: 'Artisanal Studio Carriers',
    description: 'Padded quilted yoga mat carriers and wellness bags with vibrant safari animal blocks and striped cross-body straps.',
    image: './products/prod-5.jpg',
    badge: 'New 2026 Collection'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'jaipur-quilted-playing-card-vanity-pouch',
    name: 'Heritage Pink Quilted Playing Card Vanity Pouch',
    sku: 'RT-BAG-001',
    collection: 'Royal Jaipur Novelty Edition',
    category: 'bags',
    subcategory: 'Vanity & Cosmetic Pouches',
    images: [
      './products/prod-1.jpg'
    ],
    fabric: '100% Pure Cambric Cotton with Poly-Cotton Batting',
    printTechnique: 'Jaipur Wooden Hand Block Print (Playing Cards Motif)',
    colors: ['Ruby Pink & Crimson', 'Natural Ecru (Custom on Request)'],
    sizes: ['8.5" x 4.5" x 4.5" (Standard Vanity)'],
    moq: 25,
    indicativeRetailInr: 799,
    wholesaleTiers: [
      { minQty: 25, maxQty: 99, pricePerUnitInr: 380, leadTimeWeeks: '2-3 Weeks' },
      { minQty: 100, maxQty: 499, pricePerUnitInr: 330, leadTimeWeeks: '3-4 Weeks' },
      { minQty: 500, pricePerUnitInr: 290, leadTimeWeeks: '4-5 Weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '10-14 Days',
    description: 'Handcrafted cosmetic vanity pouch in radiant hot pink featuring artisanal playing card spade, club, and heart motifs. Quilted with soft cotton padding, finished with candy-striped handle loop, smooth top zipper, and water-resistant interior lining. Ideal for retail boutiques, cosmetics gifting, and wedding favors.',
    highlights: [
      'Authentic Jaipur hand block-printed pure cotton',
      'Channel quilted with soft shock-absorbing batting',
      'Candy-striped piping with matching pull handle',
      'Smooth heavy-duty zip closure with lined interior',
      'Custom brand label stitching available on MOQ 25 pcs'
    ],
    specifications: {
      fabric: '100% Combed Cambric Cotton 60s',
      gsm: '220 GSM (Quilted with batting)',
      dimensions: '8.5" L x 4.5" W x 4.5" H',
      dyeType: 'Azo-Free Pigment Screen & Hand Block Stamp',
      washCare: 'Spot clean or gentle cold hand wash; do not tumble dry',
      origin: 'Jaipur, Rajasthan, India',
      packaging: 'Individually polybagged; 50 pcs per export master carton',
      hsCode: '4202.92.00',
      exportReady: true
    },
    tags: ['Vanity Pouch', 'Cosmetic Bag', 'Block Print Pouch', 'Pink Pouch', 'Wedding Favors', 'Jaipur Gift'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'prod-2',
    slug: 'pink-striped-sanganeri-floral-quilted-ruffle-tote',
    name: 'Pink Striped Sanganeri Floral Quilted Ruffle Tote Bag',
    sku: 'RT-BAG-002',
    collection: 'Sanganer Botanical Elegance',
    category: 'bags',
    subcategory: 'Tote & Shoulder Bags',
    images: [
      './products/prod-2.jpg'
    ],
    fabric: '100% Pure Cotton with Delicate Candy Stripe & Ruffle Frills',
    printTechnique: 'Sanganeri Delicate Botanical Floral Hand Block',
    colors: ['Blush Pink & White Stripe', 'Sage Green Stripe (Custom)'],
    sizes: ['16" x 14" x 5" (Strap Drop: 11")'],
    moq: 25,
    indicativeRetailInr: 1499,
    wholesaleTiers: [
      { minQty: 25, maxQty: 99, pricePerUnitInr: 690, leadTimeWeeks: '2-3 Weeks' },
      { minQty: 100, maxQty: 499, pricePerUnitInr: 610, leadTimeWeeks: '3-4 Weeks' },
      { minQty: 500, pricePerUnitInr: 540, leadTimeWeeks: '4-5 Weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '12-16 Days',
    description: 'Exquisite shoulder tote bag featuring Jaipur’s iconic Sanganeri rose floral bootis set over soft candy-pink pinstripes. Embellished with romantic gathered ruffle trims along the side seams, quilted structure for shape retention, reinforced shoulder straps, and magnetic button closure with inner slip pocket.',
    highlights: [
      'Signature gathered ruffle frill edge detailing',
      'Dual-texture candy stripe quilted cotton body',
      'Reinforced shoulder straps with comfortable 11" drop',
      'Spacious interior with key pocket and magnetic clasp',
      '100% biodegradable pure cotton construction'
    ],
    specifications: {
      fabric: '100% Combed Mulmul & Cambric Cotton',
      gsm: '240 GSM (Quilted with soft inner filling)',
      dimensions: '16" Height x 14" Width x 5" Base Gusset',
      dyeType: 'Certified Azo-Free Eco Dyes',
      washCare: 'Gentle cold hand wash; dry in shade',
      origin: 'Sanganer, Jaipur, India',
      packaging: 'Flat packed with tissue; 30 pcs per export master carton',
      hsCode: '4202.22.00',
      exportReady: true
    },
    tags: ['Ruffle Tote', 'Sanganeri Bag', 'Floral Tote Bag', 'Pink Striped Bag', 'Boho Shoulder Bag', 'Jaipur Handloom'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'prod-3',
    slug: 'indigo-mughal-floral-quilted-travel-duffle-bag',
    name: 'Jaipur Indigo Mughal Floral Quilted Travel Duffle Bag',
    sku: 'RT-BAG-003',
    collection: 'Bagru Dabu Heritage Series',
    category: 'bags',
    subcategory: 'Travel & Weekender Duffles',
    images: [
      './products/prod-3.jpg'
    ],
    fabric: 'Heavy Cotton Canvas with Linear Channel Quilted Padding',
    printTechnique: 'Heritage Bagru Indigo Floral Mughal Booti Block Print',
    colors: ['Off-White & Indigo Navy', 'Terracotta Rust (Custom)'],
    sizes: ['19" x 10" x 10" (28 Liters Capacity)'],
    moq: 25,
    indicativeRetailInr: 1999,
    wholesaleTiers: [
      { minQty: 25, maxQty: 99, pricePerUnitInr: 950, leadTimeWeeks: '2-3 Weeks' },
      { minQty: 100, maxQty: 499, pricePerUnitInr: 850, leadTimeWeeks: '3-4 Weeks' },
      { minQty: 500, pricePerUnitInr: 760, leadTimeWeeks: '4-5 Weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '14-18 Days',
    description: 'Our signature cylindrical weekend duffle bag hand block-printed in timeless indigo blue floral Mughal bootas on natural off-white cotton. Quilted in parallel channels with plush batting, featuring heavy navy candy-striped handles, front quick-access slip pocket, and double zip closures.',
    highlights: [
      'Timeless Bagru indigo botanical motif pattern',
      'Heavy-duty channel quilting ensures structural resilience',
      'Sturdy dual-woven striped carry handles + side slip pockets',
      'Generous 28-liter weekend trip packing capacity',
      'Custom woven label and brass logo tag options'
    ],
    specifications: {
      fabric: 'Heavy 100% Pure Cotton Canvas (280+ GSM Quilted)',
      gsm: '320 GSM composite',
      dimensions: '19" Length x 10" Diameter x 10" Height',
      dyeType: 'Natural Indigo Vat & Azo-Free Reactive Dyes',
      washCare: 'Cold water spot clean or gentle machine wash inside out',
      origin: 'Bagru / Jaipur, Rajasthan, India',
      packaging: 'Packed with silica gel & moisture barrier; 20 pcs per export carton',
      hsCode: '4202.12.00',
      exportReady: true
    },
    tags: ['Indigo Duffle', 'Quilted Duffle Bag', 'Jaipur Travel Bag', 'Weekender Bag', 'Mughal Print', 'Cotton Luggage'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'prod-4',
    slug: 'bubblegum-botanical-autumn-blossom-quilted-weekender-bag',
    name: 'Bubblegum Botanical Autumn Blossom Quilted Weekender Bag',
    sku: 'RT-BAG-004',
    collection: 'Jaipur Autumn Garden',
    category: 'women',
    subcategory: 'Travel & Weekender Duffles',
    images: [
      './products/prod-4.jpg'
    ],
    fabric: '100% Pure Cotton Quilted Canvas with Antique Brass Hardware',
    printTechnique: 'Multi-Color Botanical Autumn Blossom Hand Block Print',
    colors: ['Bubblegum Pink with Autumn Florals'],
    sizes: ['18" x 10" x 9.5" (26 Liters Capacity)'],
    moq: 25,
    indicativeRetailInr: 1899,
    wholesaleTiers: [
      { minQty: 25, maxQty: 99, pricePerUnitInr: 890, leadTimeWeeks: '2-3 Weeks' },
      { minQty: 100, maxQty: 499, pricePerUnitInr: 790, leadTimeWeeks: '3-4 Weeks' },
      { minQty: 500, pricePerUnitInr: 710, leadTimeWeeks: '4-5 Weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '12-16 Days',
    description: 'Charming weekend travel duffle crafted in playful bubblegum pink, adorned with intricate autumn botanical leaves, berries, and multi-color blossoms. Features pink candy-striped carry handles, an adjustable/detachable cross-body shoulder strap with antique brass swivel hooks, and front open pocket.',
    highlights: [
      'Joyful botanical garden hand block print on blush pink canvas',
      'Includes detachable striped cross-body shoulder strap',
      'Solid antique brass swivel clips and metal zipper pullers',
      'Reinforced base and internal zip security compartment',
      'Pre-washed and colorfast for international travel'
    ],
    specifications: {
      fabric: '100% Pure Cotton with Dense Poly-Cotton Batting',
      gsm: '300 GSM composite',
      dimensions: '18" Length x 10" Diameter x 9.5" Height',
      dyeType: 'Azo-Free Non-Toxic Fast Pigments',
      washCare: 'Cold wash gentle cycle; air dry naturally',
      origin: 'Jaipur, Rajasthan, India',
      packaging: 'Individually wrapped with barcode label; 20 pcs per carton',
      hsCode: '4202.12.00',
      exportReady: true
    },
    tags: ['Pink Duffle', 'Botanical Travel Bag', 'Quilted Weekender', 'Floral Gym Bag', 'Jaipur Handcrafted', 'Overnight Luggage'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'prod-5',
    slug: 'royal-safari-jungle-animal-quilted-yoga-mat-carrier',
    name: 'Royal Safari Jungle Animal Quilted Yoga Mat Carrier',
    sku: 'RT-BAG-005',
    collection: 'Ranthambore Jungle Safari',
    category: 'home',
    subcategory: 'Yoga & Wellness Bags',
    images: [
      './products/prod-5.jpg'
    ],
    fabric: 'Heavy Pure Quilted Cotton Canvas with Breathable Lining',
    printTechnique: 'Rajasthani Wild Safari Block Print (Zebra, Leopard, Monkey, Palms)',
    colors: ['Cerise Rose Red & Forest Green', 'Sunset Ochre (Custom)'],
    sizes: ['28" Length x 6.5" Diameter (Universal Yoga Mat Fit)'],
    moq: 25,
    indicativeRetailInr: 1299,
    wholesaleTiers: [
      { minQty: 25, maxQty: 99, pricePerUnitInr: 580, leadTimeWeeks: '2-3 Weeks' },
      { minQty: 100, maxQty: 499, pricePerUnitInr: 510, leadTimeWeeks: '3-4 Weeks' },
      { minQty: 500, pricePerUnitInr: 450, leadTimeWeeks: '4-5 Weeks' }
    ],
    customizationAvailable: true,
    privateLabelAvailable: true,
    leadTime: '10-14 Days',
    description: 'Statement cylindrical yoga mat carrier bag hand-printed with dynamic Rajasthani jungle wildlife illustrations—featuring zebras, stalking leopards, swinging monkeys, and lush tropical palm trees on rich cerise red. Tailored with quilted cotton padding, an adjustable striped shoulder sling, and top cinch drawstring closure.',
    highlights: [
      'Hand block-printed safari wildlife art (Zebra, Leopard, Monkey)',
      'Universal fit for standard 3mm to 8mm thick yoga mats',
      'Wide adjustable shoulder strap for effortless hands-free transport',
      'Breathable quilted cotton prevents mat odor and moisture buildup',
      'Ideal for yoga studios, wellness boutiques, and activewear labels'
    ],
    specifications: {
      fabric: '100% Pure Combed Cotton Canvas with Padded Quilting',
      gsm: '260 GSM composite',
      dimensions: '28" Length x 6.5" Diameter Cylindrical Tube',
      dyeType: 'Certified Eco Reactive & Pigment Dyes',
      washCare: 'Machine wash cold delicate; line dry in shade',
      origin: 'Jaipur, Rajasthan, India',
      packaging: 'Folded & polybagged with hangtag; 40 pcs per carton',
      hsCode: '4202.92.00',
      exportReady: true
    },
    tags: ['Yoga Mat Bag', 'Yoga Mat Carrier', 'Jungle Print Bag', 'Leopard Print', 'Safari Print', 'Wellness Bag', 'Jaipur Yoga'],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isNew: true
  }
];
