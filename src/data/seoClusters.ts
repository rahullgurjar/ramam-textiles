/**
 * RAMAM TEXTILES: SEO CLUSTER SERP & METADATA DIRECTORY
 * Generated from master directory: "WEBSITE CLUSTER SERP & METADATA DIRECTORY.xlsx"
 * Covers 6 high-demand commercial clusters with over 400,000+ monthly search demand.
 */

export interface ClusterSubTheme {
  name: string;
  topKeywords: string[];
  description: string;
}

export interface ClusterFAQ {
  question: string;
  answer: string;
}

export interface SEOClusterData {
  id: string;
  slug: string;
  path: string;
  clusterHub: string;
  targetPageType: 'Collection / Pillar Hub' | 'Category Page' | 'B2B / Bulk Category' | 'Wholesale Hub' | 'Specialty Page';
  mainTargetKeyword: string;
  seoTitle: string;
  titleLength: number;
  metaDescription: string;
  descriptionLength: number;
  monthlySearchVolume: number;
  keywordCount: number;
  heroImage: string;
  tagline: string;
  h1: string;
  h2s: string[];
  h3s: string[];
  introParagraph: string;
  textileSpecs: {
    material: string;
    weaveGsm: string;
    dyeType: string;
    moq: string;
    leadTime: string;
  };
  subThemes: ClusterSubTheme[];
  faqs: ClusterFAQ[];
  relatedClusters: { slug: string; name: string }[];
}

export const SEO_CLUSTERS: Record<string, SEOClusterData> = {
  'block-print-fabrics': {
    id: 'cluster-1',
    slug: 'block-print-fabrics',
    path: '/collections/block-print-fabrics',
    clusterHub: 'Block Print & Artisan Textiles',
    targetPageType: 'Collection / Pillar Hub',
    mainTargetKeyword: 'hand block print fabric',
    seoTitle: 'Hand Block Print Fabrics & Artisan Textiles | Buy Online',
    titleLength: 56,
    metaDescription: 'Explore authentic hand block print, Ajrakh, and Dabu artisan cotton fabrics. Ethical craftsmanship, vibrant natural dyes, and custom yardage. Shop today!',
    descriptionLength: 153,
    monthlySearchVolume: 248000,
    keywordCount: 171,
    heroImage: '/products/duffle-indigo.jpg',
    tagline: 'Centuries-old Rajasthani block carving, natural indigo mud resist, and pure handloom yardage.',
    h1: 'Hand Block Print Fabrics & Artisan Textiles Direct from Jaipur',
    h2s: [
      'Authentic Jaipur Hand Block Printing Heritage',
      'Ajrakh, Dabu & Sanganeri Fabric Collections by the Meter',
      'Technical Fabric Weights: 60s Mulmul to 20s Heavy Cambric',
      'Wholesale Bolt Sourcing & Low MOQ Custom Dyeing'
    ],
    h3s: [
      '100% GOTS Organic Cotton Batting & Fabric Bases',
      'Fermented Indigo, Alizarin Red & Botanical Dyes',
      'AZO-Free Eco-Certified Fastness Standards (ISO 105)'
    ],
    introParagraph: 'Welcome to Ramam Textiles’ premier artisan yardage hub. Each meter of our hand block printed fabric is stamped by master Chippa artisans in Bagru and Sanganer using hand-carved teak woodblocks and natural plant-derived dyes. Whether you require exquisite double-sided Ajrakh geometric prints, mud-resist Dabu indigo, or airy Sanganeri florals, we supply high-grade yardage for independent designers, ateliers, and global fashion labels.',
    textileSpecs: {
      material: '100% Pure Indian Cotton (Mulmul, Cambric, Cotton Silk & Chanderi)',
      weaveGsm: '60 GSM (Mulmul) to 180 GSM (Heavy Cambric & Sheeting)',
      dyeType: 'Pure Fermented Botanical Indigo, Harda, Alum & AZO-Free Reactive Dyes',
      moq: '25 Meters per print/colorway (Low Atelier MOQ)',
      leadTime: 'Ready inventory ships in 24-48 hrs; Custom yardage runs 10-18 business days'
    },
    subThemes: [
      {
        name: 'Ajrakh Traditional Prints',
        topKeywords: ['ajrak printing', 'ajrakh printing', 'ajrakh hand block print', 'ajrak black and white', 'ajrakh block print fabric', 'indigo ajrakh fabric', 'ajrak modal silk fabric'],
        description: 'Complex 16-stage resist-printed geometric stars, mandalas, and trellis motifs using natural madder, indigo, and iron syahi.'
      },
      {
        name: 'Dabu & Indigo Resist',
        topKeywords: ['indigo dabu print fabric', 'dabu print fabric', 'dabu cotton fabric', 'traditional dabu print', 'indigo hand block print fabric'],
        description: 'Bagru mud-resist (clay, gum, and lime) dipped repeatedly into deep fermented indigo vats to create soft crackle lines and deep royal blue shades.'
      },
      {
        name: 'Sanganeri Block Prints',
        topKeywords: ['sanganeri print', 'sanganeri block print', 'sanganeri cotton fabric', 'sanganeri hand block print fabric', 'sanganeri print fabric online'],
        description: 'Crisp white and pastel cotton bases hand-stamped with delicate Mughal florals, carnations, rosebuds, and botanical foliage.'
      },
      {
        name: 'Batik Wax Resist',
        topKeywords: ['block batik print', 'batik block', 'batik block print', 'batik wood blocks'],
        description: 'Hot beeswax applied via carved wooden stamps onto pure cotton, cracked, and cold-dyed for distinctive organic marbling.'
      },
      {
        name: 'Kalamkari Artisan',
        topKeywords: ['kalamkari hand block printed fabric', 'block printed kalamkari', 'kalamkari block print fabric', 'printed kalamkari cotton fabric'],
        description: 'Mythological narrative prints, peacocks, tree of life, and floral vine patterns stamped with natural tannins and milk-cured cotton.'
      },
      {
        name: 'Hand Block Cotton & Silk',
        topKeywords: ['hand block print cotton fabric', 'block print silk fabric', 'block print linen fabric', 'cotton block print fabric wholesale', 'indian block print fabric'],
        description: 'High thread-count cambric cotton, breezy mulmul, chanderi, and modal silk yardage tailored for luxury apparel and home textiles.'
      }
    ],
    faqs: [
      {
        question: 'What is the minimum order quantity (MOQ) for hand block printed fabric yardage?',
        answer: 'For in-stock catalog yardage, our minimum order quantity is just 25 meters. For custom woodblock development or bespoke colorway dyeing, the MOQ is 50 meters per colorway.'
      },
      {
        question: 'Are the dyes colorfast and safe for skin and export?',
        answer: 'Yes. All our natural botanical dyes are carefully fixed with organic mordants (harda and alum), and our modern commercial colorways use strictly AZO-Free, EU REACH-compliant reactive dyes with an ISO 105 colorfastness rating of Grade 4+.'
      },
      {
        question: 'Can I order fabric swatch booklets before placing a bulk yardage order?',
        answer: 'Absolutely. We offer curated Physical Fabric Swatch Kits containing swatches of 60s mulmul, 40s cambric, Dabu indigo, Ajrakh, and quilted cotton batting with express international DHL/FedEx delivery.'
      }
    ],
    relatedClusters: [
      { slug: 'apparel-ethnic-wear', name: 'Apparel & Ethnic Wear Collections' },
      { slug: 'wholesale-bulk-fabrics', name: 'Wholesale Fabric Suppliers & Bulk Manufacturing' },
      { slug: 'canvas-tote-bags', name: 'Canvas Tote Bags Wholesale' }
    ]
  },

  'apparel-ethnic-wear': {
    id: 'cluster-2',
    slug: 'apparel-ethnic-wear',
    path: '/collections/apparel-ethnic-wear',
    clusterHub: 'Apparel & Ethnic Wear',
    targetPageType: 'Category Page',
    mainTargetKeyword: 'block print ethnic wear apparel',
    seoTitle: 'Block Print Apparel & Ethnic Wear Collections',
    titleLength: 45,
    metaDescription: 'Discover handcrafted block print kurtis, ethnic dresses, and breathable artisan garments. Premium organic cotton fabrics tailored for elegance. Browse now!',
    descriptionLength: 155,
    monthlySearchVolume: 47400,
    keywordCount: 76,
    heroImage: '/products/duffle-kantha-patchwork.jpg',
    tagline: 'Breathable artisan kurtis, dresses, and coordinate sets tailored with authentic Jaipur prints.',
    h1: 'Block Print Apparel & Handcrafted Ethnic Wear Collections',
    h2s: [
      'Artisan Tailored Kurtis, Tunics & Boho Resort Dresses',
      'Hand Block Printed Cotton Sarees & Kota Doria Drapes',
      'Unstitched Jaipuri Suit Material with Pure Mulmul Dupattas',
      'Private Label OEM Garment Manufacturing with Custom Branding'
    ],
    h3s: [
      'Pre-Shrunk Sanforized Organic Cotton 60s & 40s',
      'Reinforced French Seams & Premium Tailoring Standards',
      'Custom Woven Tags, Hangtags & Eco-Packaging'
    ],
    introParagraph: 'Step into effortless artisan elegance with Ramam Textiles’ apparel and ethnic wear collection. Handcrafted from 100% breathable Jaipur cotton, our garments feature authentic Sanganeri motifs, Bagru indigo prints, and hand-embroidered Kantha accents. Designed for resort boutiques, conscious fashion labels, and modern retail collections, every garment combines royal Indian heritage with contemporary relaxed silhouettes.',
    textileSpecs: {
      material: '100% Combed Cotton, Mulmul Voile, Chanderi & Kota Doria',
      weaveGsm: '70 GSM (Breezy Voile) to 140 GSM (Durable Cotton Cambric)',
      dyeType: 'AZO-Free Botanical Mordants & Non-Toxic Fast Colors',
      moq: '25 Pieces per style (Mix sizes XS to XXL)',
      leadTime: 'Stock styles ship within 48 hrs; Custom cut & sew runs 14-21 days'
    },
    subThemes: [
      {
        name: 'Kurtis & Tunics',
        topKeywords: ['hand block printed kurtas', 'sanganeri kurti', 'sanganeri print kurti', 'block print kurtis wholesale', 'jaipuri cotton kurti'],
        description: 'A-line, straight cut, and flared tunics with delicate wooden button details, side slits, and artisanal block motifs.'
      },
      {
        name: 'Sarees & Drapes',
        topKeywords: ['block print cotton sarees', 'hand block print cotton sarees', 'hand block printed kota doria sarees', 'sanganeri print cotton sarees online', 'ajrakh block print sarees', 'mul cotton indigo sarees'],
        description: 'Feather-light 5.5-meter pure mulmul, kota doria, and chanderi sarees complete with matching running blouse piece.'
      },
      {
        name: 'Suits & Dress Material',
        topKeywords: ['jaipuri cotton suits with cotton dupatta', 'block printed suits', 'jaipur print dress material', 'hand block printed cotton suits', 'sanganeri print suits wholesale', 'ajrakh hand block print suits'],
        description: 'Three-piece unstitched luxury cotton salwar suit sets featuring coordinate top, bottom, and 2.5-meter floral mulmul dupattas.'
      },
      {
        name: 'Dupattas & Sets',
        topKeywords: ['block printed churidar materials', 'jaipuri cotton dupatta', 'cotton jaipuri dupatta', 'jaipur cotton dupatta', 'jaipuri print dupatta cotton'],
        description: 'Hand-stamped cotton mulmul and chanderi silk dupattas framed with intricate border woodblocks and handmade tassels.'
      },
      {
        name: 'Ready-to-Wear',
        topKeywords: ['block print clothes', 'indian block print clothes', 'sanganeri print dress', 'wholesale organic cotton clothing', 'boho block print maxi dress'],
        description: 'Resort maxi dresses, tiered smocked frocks, kimono robes, and loungewear crafted for conscious warm-weather wardrobes.'
      }
    ],
    faqs: [
      {
        question: 'Do you offer custom private-label garment manufacturing for fashion brands?',
        answer: 'Yes! We specialize in private label manufacturing for international boutiques. We provide full-package production: pattern drafting, fabric block printing, sample creation, grading (XS to 3XL), custom woven neck tags, hangtags, and barcoding.'
      },
      {
        question: 'Are the garments pre-washed to prevent shrinking?',
        answer: 'Yes. All our fabrics undergo natural river and tub pre-washing before cutting, ensuring residual shrinkage is strictly kept under 2% under standard cold-wash care.'
      },
      {
        question: 'Can I purchase unstitched dress material sets in wholesale volume?',
        answer: 'Yes. We offer bulk wholesale packs of Jaipuri cotton 3-piece suit materials with matching mulmul dupattas with tiered volume discounts starting at 20 sets.'
      }
    ],
    relatedClusters: [
      { slug: 'block-print-fabrics', name: 'Hand Block Print Fabrics & Yardage' },
      { slug: 'canvas-tote-bags', name: 'Wholesale Canvas Tote Bags' },
      { slug: 'wholesale-bulk-fabrics', name: 'Bulk Wholesale Textile Manufacturing' }
    ]
  },

  'canvas-tote-bags': {
    id: 'cluster-3',
    slug: 'canvas-tote-bags',
    path: '/collections/canvas-tote-bags',
    clusterHub: 'Bags & Totes',
    targetPageType: 'B2B / Bulk Category',
    mainTargetKeyword: 'cotton canvas tote bags bulk',
    seoTitle: 'Cotton Canvas Tote Bags in Bulk & Wholesale Custom Totes',
    titleLength: 56,
    metaDescription: 'Shop eco-friendly cotton canvas tote bags in bulk. Customizable block prints, heavy-duty fabric, and wholesale manufacturing pricing. Request your instant quote!',
    descriptionLength: 160,
    monthlySearchVolume: 38150,
    keywordCount: 416,
    heroImage: '/products/tote-sanganeri-ruffle-lifestyle.jpg',
    tagline: 'Heavyweight cotton canvas, channel-quilted batting, and bespoke block-printed tote bags.',
    h1: 'Cotton Canvas Tote Bags Wholesale & Custom Printed Totes',
    h2s: [
      'Heavy-Duty Eco-Friendly Cotton Canvas Totes in Bulk',
      'Artisanal Quilted & Ruffle-Trim Lifestyle Handbags',
      'Custom Screen & Handblock Logo Printing for Boutiques',
      'Volume B2B Manufacturing Tiers & Global Air Cargo Dispatch'
    ],
    h3s: [
      'Reinforced Box-X Handle Stitching & Internal Zip Pockets',
      '10oz to 16oz Unbleached & Organic Canvas Weaves',
      'Washable Natural Cotton Batting Core'
    ],
    introParagraph: 'Replace single-use synthetics with premium artisanal utility. Ramam Textiles manufactures heavy-duty, reusable cotton canvas tote bags, romantic ruffle weekenders, and channel-quilted shoulder carryalls. Handcrafted in our Jaipur atelier, our bags combine durable 10oz–16oz cotton canvas with heritage block prints and reinforced cross-stitched webbing handles, making them ideal for lifestyle retailers, corporate gifting, and luxury resort boutiques.',
    textileSpecs: {
      material: '100% Heavy-Duty Cotton Duck Canvas (10oz, 12oz, 14oz, 16oz) & Quilted Cambric',
      weaveGsm: '280 GSM to 450 GSM Heavy Canvas + 120 GSM Pure Cotton Batting Fill',
      dyeType: 'Organic GOTS Pigment Dyes & Traditional Handblock Resist',
      moq: '50 Pieces for stock prints; 100 Pieces for custom branded logo prints',
      leadTime: 'Stock models ship in 24-72 hrs; Custom production 10-15 business days'
    },
    subThemes: [
      {
        name: 'Bulk Canvas Tote Bags',
        topKeywords: ['cotton canvas tote bags bulk', 'wholesale canvas tote bags', 'blank canvas bags wholesale', 'cheap canvas totes in bulk', 'heavy duty cotton tote bags bulk'],
        description: 'Sturdy, long-lasting gusseted tote bags engineered for everyday shopping, farmer markets, and university carrying.'
      },
      {
        name: 'Quilted Handblock Totes',
        topKeywords: ['quilted block print tote bag', 'jaipuri quilted tote', 'cotton quilted shoulder bag', 'sanganeri floral quilted bag', 'ruffle canvas tote'],
        description: 'Multi-layer channel stitched totes with 100% natural cotton batting fill, candy-stripe piping, and romantic ruffle hems.'
      },
      {
        name: 'Custom Printed Promotional Bags',
        topKeywords: ['custom canvas tote bags with logo', 'screen printed tote bags bulk', 'personalized tote bags wholesale', 'branded promotional tote bags'],
        description: 'High-definition screen printing and traditional wooden block stamping for corporate events, retail packaging, and brand merchandising.'
      },
      {
        name: 'Travel Weekenders & Duffles',
        topKeywords: ['quilted travel duffle bag', 'overnight weekender canvas bag', 'artisan gym duffle block print', 'vintage kantha patchwork travel bag'],
        description: 'Spacious cylinder duffles with antique brass hardware, YKK luggage zippers, and exterior passport slip pockets.'
      }
    ],
    faqs: [
      {
        question: 'Can we print our company logo or custom artwork on the canvas totes?',
        answer: 'Yes! We offer both traditional wooden block stamping and modern precision screen-printing for brand logos, event artwork, and custom repeat patterns. We match Pantone (PMS) shades.'
      },
      {
        question: 'What handle configurations and closures are available?',
        answer: 'We provide self-fabric handles, heavy herringbone webbing, genuine leather straps, and magnetic snap or heavy-duty brass YKK zipper top closures.'
      },
      {
        question: 'Are these canvas bags machine washable?',
        answer: 'Yes. Our canvas totes and quilted bags can be gentle machine washed in cold water. We recommend air drying to preserve the structure of the cotton fibers.'
      }
    ],
    relatedClusters: [
      { slug: 'block-print-fabrics', name: 'Hand Block Print Fabrics & Yardage' },
      { slug: 'wholesale-bulk-fabrics', name: 'Wholesale Fabric Suppliers & Bulk Manufacturing' },
      { slug: 'home-living-decor', name: 'Handcrafted Home Decor & Living Furnishings' }
    ]
  },

  'wholesale-bulk-fabrics': {
    id: 'cluster-4',
    slug: 'wholesale-bulk-fabrics',
    path: '/collections/wholesale-bulk-fabrics',
    clusterHub: 'Wholesale & Bulk Fabrics',
    targetPageType: 'Wholesale Hub',
    mainTargetKeyword: 'wholesale fabric suppliers in bulk',
    seoTitle: 'Wholesale Fabric Suppliers & Bulk Textile Manufacturing',
    titleLength: 55,
    metaDescription: 'Source wholesale apparel and artisan fabric direct from manufacturers. Low MOQs, global door-to-door delivery, and factory pricing. Partner with us today!',
    descriptionLength: 154,
    monthlySearchVolume: 65950,
    keywordCount: 513,
    heroImage: '/products/duffle-pink-botanical.jpg',
    tagline: 'Direct manufacturer FOB rates, certified OEKO-TEX mills, and export textile logistics.',
    h1: 'Wholesale Fabric Suppliers & Bulk Textile Manufacturing in Jaipur',
    h2s: [
      'Direct Textile Mill & Artisan Workshop Sourcing',
      'Low MOQ Bulk Fabric Bolts: Pure Cotton, Linen, Silk & Rayon',
      'End-to-End Export Logistics: Air Cargo & Ocean Freight to 45+ Countries',
      'Custom Pattern Development, Sampling & Lab Dip Approvals'
    ],
    h3s: [
      'Tiered Volume Wholesale Discounts (50m, 200m, 1,000m+)',
      'Export Grade Quality Inspection (AQL 2.5 Standards)',
      'Transparent FOB Invoicing & Full HS Code Compliance'
    ],
    introParagraph: 'Cut out middlemen and source direct from Jaipur’s premier textile atelier. Ramam Textiles is a verified bulk supplier and manufacturer of premium apparel, craft, and upholstery fabrics for international fashion designers, retail chains, and fabric distributors. With state-of-the-art print tables, artisan carving workshops, and strict AQL 2.5 quality control, we ensure consistent color matching, durable handfeel, and guaranteed on-time air and sea delivery worldwide.',
    textileSpecs: {
      material: '100% Indian Cotton, Pure Linen, Mulberry Silk, Bamboo Hemp & Modal',
      weaveGsm: '55 GSM Ultra-Light Voile to 450 GSM Heavy Duck Canvas & Upholstery',
      dyeType: 'Certified AZO-Free Reactive, Pigment & Natural Indigo/Vegetable Dyes',
      moq: '50 Meters per design for custom runs; No MOQ for in-stock showroom bolts',
      leadTime: 'Express air dispatch 3-7 days via DHL/FedEx; Ocean FCL/LCL 20-35 days'
    },
    subThemes: [
      {
        name: 'Bulk Apparel Fabrics',
        topKeywords: ['wholesale fabric suppliers in bulk', 'wholesale clothing fabric', 'cotton fabric wholesale suppliers', 'wholesale fabric for clothing designers', 'bulk buy fabric online'],
        description: 'Consistent high-volume rolls of combed cambric, mulmul, poplin, twill, and viscose crepe for fashion manufacturing.'
      },
      {
        name: 'Artisan Block Print Wholesale',
        topKeywords: ['cotton block print fabric wholesale', 'hand block printed fabric wholesale', 'wholesalers of block print products', 'block print fabrics in bulk', 'indian block print fabric wholesale'],
        description: 'Authentic Bagru, Sanganeri, and Dabu yardage supplied in continuous 10m to 25m bolt cuts with minimal joint imperfections.'
      },
      {
        name: 'Organic & Sustainable Cottons',
        topKeywords: ['wholesale organic cotton clothing', 'organic cotton fabric wholesale', 'eco friendly fabric bulk supplier', 'GOTS certified cotton fabric wholesale'],
        description: '100% certified organic cotton and rainfed Kala cotton grown without synthetic pesticides and woven by fair-trade artisan cooperatives.'
      },
      {
        name: 'Custom Printing & Dyeing OEM',
        topKeywords: ['custom fabric printing bulk', 'custom order makers for block print products', 'custom pattern fabric manufacturer', 'private label fabric sourcing india'],
        description: 'Full OEM execution: send your Pantone color codes or digital vectors, and our master craftsmen will carve teak blocks and dye strike-off proofs.'
      }
    ],
    faqs: [
      {
        question: 'What are your wholesale payment terms and export documentation?',
        answer: 'We accept Wire Transfer (T/T), Letter of Credit (L/C), and secure online corporate invoicing. We provide full export documentation including Commercial Invoices, Packing Lists, Certificates of Origin (COO), and HS Code classifications.'
      },
      {
        question: 'Do you ship door-to-door internationally?',
        answer: 'Yes! We hold commercial accounts with DHL Express and FedEx Air Cargo, delivering door-to-door to the USA, UK, Europe, Australia, Canada, and the UAE within 3 to 7 business days.'
      },
      {
        question: 'What is your quality guarantee on bulk yardage?',
        answer: 'Every meter is inspected on illuminated rolling tables following international AQL 2.5 standards for weaving slubs, print alignment, and color bleeding before sealing in moisture-barrier export cartons.'
      }
    ],
    relatedClusters: [
      { slug: 'block-print-fabrics', name: 'Hand Block Print Fabrics & Yardage' },
      { slug: 'apparel-ethnic-wear', name: 'Apparel & Ethnic Wear Collections' },
      { slug: 'canvas-tote-bags', name: 'Wholesale Canvas Tote Bags' }
    ]
  },

  'home-living-decor': {
    id: 'cluster-5',
    slug: 'home-living-decor',
    path: '/collections/home-living-decor',
    clusterHub: 'Home & Living Furnishings',
    targetPageType: 'Category Page',
    mainTargetKeyword: 'hand block print home decor furnishings',
    seoTitle: 'Handcrafted Home Decor & Block Print Living Furnishings',
    titleLength: 55,
    metaDescription: 'Elevate your living space with artisanal block print cushion covers, throws, table linens, and heavy upholstery fabrics. Bring craft home—order online!',
    descriptionLength: 151,
    monthlySearchVolume: 5400,
    keywordCount: 29,
    heroImage: '/products/yoga-safari.jpg',
    tagline: 'Artisanal table linens, hand-quilted bedcovers, and statement block-printed cushion covers.',
    h1: 'Handcrafted Home Decor & Hand Block Print Living Furnishings',
    h2s: [
      'Artisanal Block-Printed Cushion Covers & Pillow Shams',
      'Table Linens: Hand-Stamped Table Runners & Cloth Napkins',
      'Layered Quilted Bedspreads & Reversible Dohars',
      'Heavy Cotton Upholstery & Curtain Drapery Fabrics'
    ],
    h3s: [
      '100% Breathable Indian Cotton with Organic Fillers',
      'YKK Concealed Zippers & Mitered Corner Hemming',
      'Colorfast Botanical Pigments Safe for Daily Family Living'
    ],
    introParagraph: 'Infuse authentic warmth, heritage texture, and soulful craftsmanship into interior spaces. Ramam Textiles curates bespoke home furnishings and living decor hand-printed in Jaipur. From elegant dining table settings featuring botanical tablecloths and matching napkins to plush, channel-quilted cotton bedcovers and decorative cushion covers, our home collection brings centuries of Rajasthani architectural elegance into contemporary homes.',
    textileSpecs: {
      material: '100% Heavy Cotton Sheeting, Duck Canvas, Linen Blend & Pure Mulmul',
      weaveGsm: '140 GSM (Dohar Voile) to 350 GSM (Drapery & Upholstery Canvas)',
      dyeType: 'Wash-Durable AZO-Free Botanical Reactive Dyes',
      moq: '20 Pieces per home decor style / 10 Sets for Table Linen ensembles',
      leadTime: 'Stock home accents dispatch in 48 hrs; Custom hotel/boutique runs 12-18 days'
    },
    subThemes: [
      {
        name: 'Cushions & Pillow Covers',
        topKeywords: ['hand block print home decor furnishings', 'block printed cushion covers', 'jaipuri cushion covers 16x16', 'artisan throw pillow covers', 'indian block print pillows'],
        description: '16x16", 18x18", 20x20", and lumbar pillow shams with piped trims and invisible bottom zippers.'
      },
      {
        name: 'Dining & Table Linens',
        topKeywords: ['block print table runner', 'hand printed cloth napkins bulk', 'jaipur floral tablecloth', 'artisan dining table linens', 'cotton placemats wholesale'],
        description: 'Coordinated dining table sets with block-stamped borders, heat-resistant cotton weaves, and wash-durable dyes.'
      },
      {
        name: 'Quilted Bedspreads & Dohars',
        topKeywords: ['jaipuri razai cotton quilt', 'block print bedspread queen', 'hand quilted cotton dohar', 'summer cotton quilt jaipur'],
        description: 'Double and King bedspreads hand-quilted with pure carded surgical cotton batting for year-round thermal comfort.'
      },
      {
        name: 'Curtains & Heavy Drapery',
        topKeywords: ['block print curtain fabric', 'cotton drapery panels jaipur', 'boho semi sheer window curtains', 'heavy upholstery block print'],
        description: 'Light-filtering cotton curtains with rod pockets and durable cotton canvas for accent armchair upholstery.'
      }
    ],
    faqs: [
      {
        question: 'Are the cushion covers and table runners safe for washing?',
        answer: 'Yes! All home textiles are pre-shrunk and treated with colorfast mordants. We recommend gentle cycle cold machine washing with mild detergent to preserve the rich botanical shades.'
      },
      {
        question: 'Can you manufacture custom dimensions for hotels, resorts, or interior designers?',
        answer: 'Yes. We frequently produce bespoke dimensions for boutique hotels, luxury Airbnbs, and interior staging projects. Custom tablecloth lengths, custom duvet sizing, and tailored throw cushions are readily supported.'
      },
      {
        question: 'Do you sell matching coordinate sets for dining tables?',
        answer: 'Yes. We offer coordinated 7-piece sets (1 Table Runner + 6 Napkins) and 9-piece sets (1 Tablecloth + 8 Napkins) in unified signature botanical colorways.'
      }
    ],
    relatedClusters: [
      { slug: 'block-print-fabrics', name: 'Hand Block Print Fabrics & Yardage' },
      { slug: 'canvas-tote-bags', name: 'Wholesale Canvas Tote Bags' },
      { slug: 'craft-diy-supplies', name: 'Carved Wooden Printing Blocks & Craft Kits' }
    ]
  },

  'craft-diy-supplies': {
    id: 'cluster-6',
    slug: 'craft-diy-supplies',
    path: '/collections/craft-diy-supplies',
    clusterHub: 'Craft & DIY Supplies',
    targetPageType: 'Specialty Page',
    mainTargetKeyword: 'wooden printing blocks & textile craft supplies',
    seoTitle: 'Carved Wooden Printing Blocks & Textile Craft Supplies',
    titleLength: 54,
    metaDescription: 'Shop hand-carved wooden textile printing blocks, felt sheets, and premium DIY fabric materials. Perfect for printmakers and artisans. Start crafting today!',
    descriptionLength: 155,
    monthlySearchVolume: 1650,
    keywordCount: 34,
    heroImage: '/products/vanity-playing-cards.jpg',
    tagline: 'Hand-carved seasoned teak woodblocks, natural dye pigments, and artisan printmaking kits.',
    h1: 'Carved Wooden Printing Blocks & DIY Textile Craft Supplies',
    h2s: [
      'Master Artisan Hand-Carved Teak & Sheesham Woodblocks',
      'DIY Textile Printing Starter Kits for Artists & Schools',
      'Natural Botanical Dye Powders: Harda, Indigo & Madder Root',
      'Custom Woodblock Carving Service from Your Digital Vectors'
    ],
    h3s: [
      'Seasoned Hardwood with Deep Relief Carving & Registration Air-Holes',
      'Oil-Cured for Decades of Smooth Printing on Cotton, Paper & Clay',
      'Non-Toxic Craft Textile Inks & Organic Wool Felt Inking Pads'
    ],
    introParagraph: 'Experience the magic of traditional printmaking in your own studio. Ramam Textiles supplies genuine hand-carved wooden printing blocks, craft materials, and DIY textile printing kits direct from our Jaipur woodcarving workshops. Carved from seasoned Sheesham and Teak wood by multi-generational master carvers, our blocks are built for printmakers, textile students, ceramic artists, and DIY craft enthusiasts around the world.',
    textileSpecs: {
      material: 'Seasoned Teak (Sagwan) & Indian Rosewood (Sheesham) Hardwood',
      weaveGsm: 'N/A (Tooling Hardness: 650-700 kg/m³ density; Oil-cured)',
      dyeType: 'Pure Cold-Pressed Linseed Oil Curing + Non-Toxic Acrylic & Botanical Inks',
      moq: '5 Blocks per design / 10 DIY Printmaking Starter Kits',
      leadTime: 'In-stock wooden blocks ship in 24 hrs; Bespoke vector carving takes 5-7 days'
    },
    subThemes: [
      {
        name: 'Hand-Carved Wooden Printing Blocks',
        topKeywords: ['wooden printing blocks & textile craft supplies', 'hand carved wooden printing blocks', 'indian wood block stamps', 'jaipur printing blocks', 'woodblock stamps for fabric'],
        description: 'Floral bootis, geometric mandalas, borders, paisleys, and animal motifs relief-carved with traditional iron chisels.'
      },
      {
        name: 'DIY Textile Craft Kits',
        topKeywords: ['diy block printing kit', 'fabric block printing supplies', 'fabric block printing kit for beginners', 'woodblock printing kit on fabric'],
        description: 'Complete kits including 3 hand-carved woodblocks, organic cotton tote bag, sponge inking tray, and non-toxic fabric inks.'
      },
      {
        name: 'Custom Woodblock Carving',
        topKeywords: ['custom wooden printing blocks', 'custom block carving for printing', 'carved logo stamp for fabric', 'bespoke wood block maker'],
        description: 'Send us your vector logo, signature monogram, or custom repeat pattern, and our master carvers will hand-chisel it onto seasoned teak.'
      },
      {
        name: 'Printmaking Accessories & Inks',
        topKeywords: ['block printing ink for fabric', 'felt inking pad for block printing', 'fabric block printing tools', 'natural mordants craft pack'],
        description: 'High-density felt trays, roller brayers, water-based wash-fast textile inks, and harda mordant powders.'
      }
    ],
    faqs: [
      {
        question: 'What types of surfaces can these wooden blocks print on?',
        answer: 'Our carved wooden blocks work beautifully on cotton, linen, silk, handmade paper, canvas, clay, ceramics, henna body art, and even soap stamping!'
      },
      {
        question: 'How do you care for and clean wooden printing blocks?',
        answer: 'Immediately after printing, wash the woodblock with warm water and a soft nylon toothbrush to clear paint from the crevices. Dry thoroughly with a cloth. Re-oil occasionally with a few drops of coconut or mustard oil.'
      },
      {
        question: 'Can I order a custom wooden block carved with my brand logo or artwork?',
        answer: 'Yes! Simply upload or email your digital design (JPEG, PNG, AI, or PDF). Our master carver drafts the mirror relief and hand-chisels your design in 5 to 7 business days.'
      }
    ],
    relatedClusters: [
      { slug: 'block-print-fabrics', name: 'Hand Block Print Fabrics & Yardage' },
      { slug: 'canvas-tote-bags', name: 'Wholesale Canvas Tote Bags' },
      { slug: 'home-living-decor', name: 'Handcrafted Home Decor & Living Furnishings' }
    ]
  }
};
