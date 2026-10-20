import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'how-to-wash-natural-indigo-cotton',
    slug: 'how-to-wash-natural-indigo-cotton',
    title: "The Complete Guide to Washing & Caring for Natural Indigo Dyed Cotton",
    category: 'Care & Maintenance',
    readTime: '7 min read',
    publishedDate: 'October 20, 2026',
    excerpt: "Discover why authentic plant-derived indigo bleeds, how to prevent dry crocking, the truth about vinegar soaking, and how to preserve botanical blues for decades.",
    coverImage: '/products/duffle-indigo.jpg',
    author: {
      name: "Ramam Textiles Conservation Desk",
      role: "Master Textile Chemist"
    },
    contentSections: [
      {
            heading: "Why Authentic Indigo Behaves Differently Than Chemical Dyes",
            body: "Natural indigo derived from the Indigofera tinctoria plant does not bond chemically with cellulose cotton fibers the way synthetic reactive dyes do. Instead, indigo molecules physically adhere to the exterior surfaces and fissures of each cotton fiber during subterranean vat dips. Because the pigment rests mechanistically on the outer yarn layer, microscopic particles naturally slough off during initial handling and washing. This phenomenon is known in the textile guild as 'crocking'."
      },
      {
            quote: "Natural indigo is a living patina. It is not meant to stay frozen like plastic; it softens, breathes, and matures into unique personal whiskerings over years of gentle wear.",
            body: "Understanding that crocking is a hallmark of genuine botanical indigo rather than a fabric defect is the first step in properly educating your retail customers and caring for artisanal heirlooms."
      },
      {
            heading: "1. The First Wash: Cold Water Soak with Mild Rock Salt",
            body: "For the first laundering, submerge your indigo textile into a tub of cool water (below 25°C / 77°F). Dissolve two tablespoons of non-iodized rock salt per gallon of water. Salt increases the ionic strength of the water, gently tightening the fiber structure and setting unbound surface pigment particles.\n\nAvoid hot or even lukewarm water, as elevated thermal energy expands cotton pores, causing rapid pigment loss and blotchy streaking."
      },
      {
            heading: "2. Debunking the Vinegar Myth",
            body: "An internet myth suggests soaking indigo in white vinegar to 'set' the dye. In reality, vinegar (acetic acid) is effective for setting acid dyes on protein fibers like silk and wool, but has negligible fixing effect on plant-based indigo on cellulose cotton. High acidity can actually weaken fine combed cotton fibers over time. Stick to pH-neutral plant-based soaps like soapnut (Reetha) or delicate enzyme-free liquid detergents."
      },
      {
            heading: "3. Hand Washing vs Machine Cycles",
            body: "Always wash natural indigo garments and quilted accessories inside out. If using a washing machine, select a gentle hand-wash cycle with minimal spin. Never wash natural indigo alongside white or pastel apparel, as free indigo particles will cause light blue cross-staining."
      },
      {
            heading: "4. Drying in Open Shade: Guarding Against Solar Photo-Degradation",
            body: "While Rajasthan's artisans sun-dry unwashed bolts during production, finished indigo pieces should never be left in harsh direct sunlight for extended drying. Direct ultraviolet rays trigger photo-reduction of indigo blue into isatin, causing fading along fold lines. Dry your textiles flat or draped evenly across a wooden clothes horse in open, well-ventilated shade."
      }
],
    tags: ["Natural Indigo","Fabric Care","Indigo Washing Guide","Sustainable Fashion","Textile Conservation"]
  },
  {
    id: 'sanganeri-vs-bagru-print-differences',
    slug: 'sanganeri-vs-bagru-print-differences',
    title: 'Sanganeri vs Bagru Print: 5 Crucial Differences Every Textile Designer Must Know',
    category: 'Craft Heritage',
    readTime: '8 min read',
    publishedDate: 'October 20, 2026',
    excerpt: 'Confused between Sanganeri and Bagru hand block prints? Discover the essential differences in ground fabric colors, floral vs geometric motifs, mud-resist Dabu techniques, and natural dye chemistry.',
    coverImage: '/products/sanganeri-vs-bagru.jpg',
    author: {
      name: 'Master Craftsman Guild',
      role: 'Heritage Textile Research Desk'
    },
    contentSections: [
      {
        heading: 'The Twin Pillars of Rajasthani Hand Block Printing',
        body: 'Jaipur is celebrated globally as the epicenter of Indian hand-block printing. Yet, within a 35-kilometer radius of the Pink City lie two distinct artisan settlements that have preserved completely different printing philosophies for over four centuries: Sanganer and Bagru.\n\nWhile casual shoppers often group them under the generic banner of "Jaipur prints," textile designers, sourcing directors, and craft connoisseurs know that Sanganeri and Bagru prints differ fundamentally in their chemical processes, motif origins, ground fabrics, and cultural contexts. Here is your definitive technical guide to distinguishing between these two historic traditions.'
      },
      {
        heading: '1. Ground Fabric Tone: Pure Bleached White vs Earthy Cream & Mud',
        body: 'The most immediate visual differentiator between Sanganeri and Bagru textiles is the base background color of the fabric:\n\n• Sanganeri Prints: Traditionally executed on crisp white, off-white, or bleached ivory cotton grounds. Historically, the water of the local Saraswati River in Sanganer possessed natural mineral properties that bleached unbleached kora cotton to radiant brightness when washed under the desert sun.\n\n• Bagru Prints: Always set against warm, unbleached, cream, mud-resist, or dyed backgrounds. Bagru craftspeople traditionally wash their fabrics in the local Sanjaria riverbed water, rich in iron and saline minerals that chemically bond with river clay and myrobalan (harda) tannins to produce deep, earthy tones.'
      },
      {
        quote: 'In Sanganer, the artisan works with light and luminescence; in Bagru, the artisan works with earth, shadow, and soil.',
        body: 'Because of this background difference, Sanganeri textiles feel light, airy, and summery, making them historically favored for royal turbans (angarkhas) and delicate summer dupattas, whereas Bagru textiles exude grounded warmth and rustic depth.'
      },
      {
        heading: '2. Motif Grammar: Delicate Royal Florals vs Bold Tribal Geometrics',
        body: 'The design motifs of each craft village reflect its historical patrons:\n\n• The Sanganeri Repertoire: Flourished under the direct royal patronage of the Kachwaha Maharajas of Jaipur. Consequently, Sanganeri prints feature delicate Mughal and Persian botanical influences: intricately curving bel (creepers), fine jaal (floral trellises), single floral sprays (buta), iris, narcissus, rose petals, and graceful carnations. The carved lines are razor-thin, often requiring a three-to-four-block sequence: the Rekh (fine outline), followed by Datta and Gad blocks for colored inner fills.\n\n• The Bagru Repertoire: Developed by the Chippa community to serve local agrarian communities and nomadic tribes. Motifs are noticeably bolder, wider, and more geometric. Typical Bagru chhaap patterns include chaubandi (four-petal motifs), leheriya diagonals, concentric circles, jali diamonds, and stylized botanical buds with heavy, grounded silhouettes.'
      },
      {
        heading: '3. Printing Technique: Direct Stamping vs Dabu Mud-Resist',
        body: 'The technical mechanism of transferring color to cloth represents another fundamental distinction:\n\n• Sanganeri Direct Printing: Sanganer is primarily known for direct block printing. Wooden blocks saturated with color paste are stamped directly onto the pre-treated cotton fabric in layered sequences. There is no physical resist paste barrier applied to the background.\n\n• Bagru Dabu Resist Technique: While Bagru also practices direct printing, its global hallmark is Dabu—a mud-resist printing method. Artisans stamp a dense paste made of dried riverbed clay, slaked lime (chuna), and natural tree gum (gond) onto the cloth. Once dried under the sun, the fabric is plunged into deep subterranean indigo vats. The mud shields the stamped pattern from absorbing dye, creating Bagru’s iconic crackled resist borders and mystical midnight silhouettes.'
      },
      {
        heading: '4. Dye Chemistry & Color Palettes',
        body: 'The palettes of both craft clusters are deeply tied to their historical chemical formulations:\n\n• Sanganeri Color Spectrum: Vibrant, radiant, and expansive. Traditional botanical colors like madder red (majjith), turmeric yellow (haldi), and indigo have evolved into safe, modern AZO-free and reactive dyes that deliver vivid coral pinks, turquoise, saffron, and mint greens without sacrificing environmental safety.\n\n• Bagru Color Spectrum: Deeply conservative, organic, and mineral-centric. Bagru master dyers strictly prioritize natural botanical and mineral ingredients:\n  - Syahi: Intense charcoal black prepared by fermenting rusted iron scrap, molasses, and horse-gram flour for over 30 days.\n  - Begar: Rich terracotta red achieved by combining alum, red clay, and madder roots.\n  - Dabu Indigo: Natural subterranean fermented indigo vats that produce four gradations of blue from light Asmani to deep midnight Surmai.\n  - Kashish: Earthy stone grey and chocolate brown obtained from iron sulfate salts.'
      },
      {
        quote: 'Bagru natural dyes smell of the earth, the sun, and the river. They soften and deepen with every wash, gaining a vintage patina that synthetic pigments can never emulate.',
        body: 'When sourcing authentic Bagru textiles, one should expect gentle color transfer during the first two cold-water hand washes. This is the hallmark of genuine biological and mineral pigments, not a defect.'
      },
      {
        heading: '5. Sourcing & Authentication Checklist for Independent Designers',
        body: 'If you are sourcing artisanal Indian textiles for an apparel line, resort wear collection, or interior accessories, use this 4-step authentication framework:\n\n1. Inspect the Reverse Face: Hand block printed fabrics—whether Sanganeri or Bagru—show substantial pigment bleed on the reverse side of the cloth. Flat screen prints have a stark, faded, or white backing.\n2. Look for the Rekh-Joints: Scan the borders for subtle registration overlaps where the master printer pressed successive wooden blocks together. Uniform mechanical repeats across 50 meters indicate machine printing.\n3. Verify Thread Count: Authentic Jaipur artisan fabrics perform best on 60x60 superfine mulmul or 60s cambric cotton. Heavy synthetic blends resist botanical dye penetration and will stiffen.\n4. Request GOTS & AZO-Free Lab Certifications: For commercial collections destined for the US, EU, or UK, ensure your manufacturing partner provides zero-toxicity dye reports.'
      }
    ],
    tags: [
      'Sanganeri Print',
      'Bagru Block Print',
      'Dabu Printing',
      'Indian Textiles',
      'Natural Dyes',
      'Fabric Sourcing',
      'Textile Authentication'
    ]
  },
  {
    id: 'alchemy-of-bagru-dabu-indigo',
    slug: 'alchemy-of-bagru-dabu-indigo',
    title: 'The Alchemy of Bagru: Traditional Dabu Mud-Resist Printing and Natural Indigo Vats',
    category: 'Craft Heritage',
    readTime: '6 min read',
    publishedDate: 'September 2026',
    excerpt: 'Deep in the desert artisan settlements of Bagru, master printers combine riverbed mud, gum, and biological fermentation to achieve immortal shades of indigo blue.',
    coverImage: '/products/duffle-indigo.jpg',
    author: {
      name: 'Ramam Textiles Craft Archive',
      role: 'Textile Research Desk'
    },
    contentSections: [
      {
        heading: 'The Ancient Mud Formula',
        body: 'Dabu is an ancient mud-resist hand-block printing technique practiced for centuries in the arid soils of Rajasthan. The resist paste is a carefully proportioned mixture of clay collected from local dried riverbeds (Kaali Mitti), calcium hydroxide (Chuna), and natural tree gum (Gond). Applied with heavy carved woodblocks onto unbleached cotton, it shields specific design sections from subsequent dyeing.'
      },
      {
        quote: 'In authentic Dabu, the subtle imperfections, veins of mud crackle, and variations in indigo penetration are not flaws: they are the living signature of handmade textile heritage.',
        body: 'Once stamped, fine wood sawdust is sprinkled across the wet mud paste to prevent smudging during sun drying. Under the intense Rajasthani sun, the clay solidifies into an impervious barrier.'
      },
      {
        heading: 'Dipping in the Indigo Well',
        body: 'The sun-baked fabric is submerged into subterranean indigo fermentation vats (Mataji ki Baori). When the fabric first emerges from the emerald-green liquid vat, it reacts with oxygen in the air, magically transforming into rich midnight indigo before your eyes. Multiple dips deepen the tone from light sky Asmani to royal Neel and impenetrable Surmai.'
      },
      {
        heading: 'Why Global Fashion Houses Value Bagru',
        body: 'Modern global buyers are increasingly turning away from synthetic petroleum-derived dyes. Bagru textiles offer a fully bio-degradable, zero-microplastic alternative that softens and matures with age, providing unparalleled tactile luxury and storytelling value.'
      }
    ],
    tags: ['Dabu Printing', 'Natural Indigo', 'Bagru Craft', 'Sustainable Textiles']
  },
  {
    id: 'sourcing-guide-pure-cotton-mulmul',
    slug: 'sourcing-guide-pure-cotton-mulmul',
    title: "A Designer's Technical Guide to Sourcing Pure Jaipur Cotton Mulmul & Cambric",
    category: 'B2B Sourcing',
    readTime: '8 min read',
    publishedDate: 'September 2026',
    excerpt: 'Understand thread counts, GSM weights, shrinkage tolerances, and dye fastness when sourcing Jaipur handloom cottons for commercial collections.',
    coverImage: '/products/duffle-kantha-patchwork.jpg',
    author: {
      name: 'Ramam Textiles Technical Guild',
      role: 'Quality & Sourcing Specialist'
    },
    contentSections: [
      {
        heading: 'Demystifying Thread Counts: 60x60 vs 40x40',
        body: 'When sourcing cotton from Rajasthan, two fundamental weaves dominate luxury apparel: 60x60 Superfine Mulmul (approx. 75-85 GSM) and 60s High-Density Cambric (95-110 GSM). Mulmul offers supreme drape, breathability, and cloud softness, making it the world benchmark for scarves, summer kurtas, and resort dresses. Cambric features a tighter construction, offering ideal structure for shirts, tailored trousers, and structured bags.'
      },
      {
        heading: 'Managing Natural Shrinkage & Colorfastness',
        body: 'Because 100% natural cotton fibers expand and contract in water, reputable manufacturers pre-wash fabrics with soft enzymatic rinses to stabilize shrinkage within standard international tolerances (typically 2-4%). In wholesale purchasing, always verify whether AZO-free reactive dyes or plant-based natural dyes are utilized for your target destination regulatory standards.'
      },
      {
        heading: 'Sampling to Production: Best Practices for Brands',
        body: 'When initiating custom garment production, ordering initial swatch books and a sample strike-off ensures accurate color matching before commissioning master bolts. At Ramam Textiles, we support flexible low MOQs starting from 25 pieces to empower independent boutique labels and luxury department stores alike.'
      }
    ],
    tags: ['Fabric Sourcing', 'Mulmul Cotton', 'B2B Manufacturing', 'Garment Technical']
  },
  {
    id: 'how-to-launch-private-label-apparel',
    slug: 'how-to-launch-private-label-apparel',
    title: 'How to Launch a Custom Textile & Bag Line with Indian Artisan Workshops',
    category: 'Custom Manufacturing',
    readTime: '7 min read',
    publishedDate: 'September 2026',
    excerpt: 'Step-by-step roadmap from initial sketches and tech packs to custom wooden block carving, sampling, bulk quality control, and worldwide customs clearance.',
    coverImage: '/products/tote-sanganeri-ruffle-lifestyle.jpg',
    author: {
      name: 'Ramam Textiles Production Desk',
      role: 'Export Director'
    },
    contentSections: [
      {
        heading: '1. Converting Tech Packs to Heritage Craft',
        body: 'Launching a custom textile line begins with translating design intent (measurements, grading scales, and seam allowances) into production parameters suited for artisanal craftsmanship. Master block carvers can turn vector artwork into hand-carved sheesham woodblocks in just 5-7 working days.'
      },
      {
        heading: '2. Custom Branding & Trim Integration',
        body: 'Custom manufacturing extends beyond the fabric itself. High-end buyers require custom woven damask labels, organic cotton wash care tags with localized multilingual care symbols, branded brass hardware, and eco-friendly compostable polybags.'
      },
      {
        heading: '3. Quality Assurance and Door-to-Door Logistics',
        body: 'Artisanal production requires stringent 4-point fabric inspection and inline stitching audits to eliminate thread pulls or registration misalignments. Once packed in moisture-sealed export cartons, shipments can be routed seamlessly via air courier (DHL/FedEx) in 4-6 business days or consolidated ocean freight for larger volumes.'
      }
    ],
    tags: ['Custom Manufacturing', 'OEM Production', 'Export Logistics', 'Tech Pack']
  },
  {
    id: 'block-print-vs-screen-print-guide',
    slug: 'block-print-vs-screen-print-guide',
    title: 'Hand Block Print vs Screen Print: How to Identify Authentic Jaipur Craftsmanship',
    category: 'Craft Heritage',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    excerpt: 'Learn how to spot genuine hand block printing through registration overlap, ink penetration, and border joints versus flat industrial screen printing.',
    coverImage: '/products/duffle-pink-botanical.jpg',
    author: {
      name: 'Ramam Textiles Technical Guild',
      role: 'Master Craftsman & Sourcing Lead'
    },
    contentSections: [
      {
        heading: 'Why Genuine Hand Block Printing Outclasses Industrial Screens',
        body: 'Jaipur hand-block printing holds a centuries-old geographical identity. However, global fashion markets are increasingly flooded with rotary screen-printed fabrics claiming to be authentic handcrafted textiles. Understanding the physical signatures of genuine woodblock craftsmanship protects both brand reputation and buyer investment.'
      },
      {
        quote: 'A true hand block print breathes with micro-variations. The slight pressure differentials of the artisan’s palm and subtle registration overlaps are marks of human soul that mechanical screens cannot replicate.',
        body: 'When examining authentic Bagru or Sanganer printwork, inspect the reverse side of the textile. Pure hand-stamped fabrics exhibit deep natural pigment penetration into the cotton fiber core, whereas screen-printing leaves pigments resting primarily on the fabric surface.'
      },
      {
        heading: 'The 3 Physical Benchmarks of Authentic Block Print',
        body: '1. Registration Imperfections (Chhapa Joint): Where successive wood blocks meet, look for gentle overlap or slight negative space variations. Perfectly identical repeat patterns across 50 meters indicate automated machinery.\n2. Pigment Veining: In Dabu mud-resist dyeing, hair-thin cracks in the dried riverbed clay create distinctive marbling lines across the motifs.\n3. Organic Fragrance & Natural Softness: Authentic Jaipur cottons dried under the desert sun retain an earthy, crisp texture that softens dramatically with each wash.'
      },
      {
        heading: 'Commercial Sourcing Advice for Independent Labels',
        body: 'For luxury lifestyle brands, selling authentic artisanal stories justifies premium retail price points. Always demand certified workshop inspection proofs and AZO-free dye compliance test reports from your manufacturing partner.'
      }
    ],
    tags: ['Block Print vs Screen Print', 'Authentic Jaipur Craft', 'Textile Authentication', 'Quality Control']
  },
  {
    id: 'low-moq-textile-sourcing-india-guide',
    slug: 'low-moq-textile-sourcing-india-guide',
    title: 'Ultimate Guide to Low-MOQ Textile Sourcing & Export from Jaipur, India',
    category: 'B2B Sourcing',
    readTime: '9 min read',
    publishedDate: 'October 2026',
    excerpt: 'Everything international buyers need to know about sampling, low minimum order quantities, air cargo transit times, and HS code export compliance.',
    coverImage: '/products/laptop-sleeve-kalamkari.jpg',
    author: {
      name: 'Ramam Textiles Export Desk',
      role: 'International Trade Director'
    },
    contentSections: [
      {
        heading: 'Navigating Minimum Order Quantities (MOQs) in India',
        body: 'Traditional textile export mills often demand massive minimums of 500 to 1,000 units per style, locking out emerging fashion designers and boutique retailers. At Ramam Textiles, we restructured artisan workshop clusters in Jaipur to allow flexible low MOQs starting at just 25 units per colorway or style.'
      },
      {
        quote: 'Low MOQs empower independent boutique brands to test diverse heritage prints in their local markets without tying up vital cash flow in stagnant bulk inventory.',
        body: 'This agile production model allows boutique founders in the US, UK, Australia, and Europe to commission curated seasonal drops, limited-edition quilted bags, and bespoke apparel lines with rapid sample turnaround.'
      },
      {
        heading: 'Sampling Protocols & Pre-Production Approvals',
        body: 'Before master cutting and bulk printing commences, reputable ateliers dispatch physical strike-offs and swatch cards. This ensures Pantone color validation, seam tensile strength testing, and precise zipper and hardware fit.'
      },
      {
        heading: 'Export Logistics, HS Codes & Customs Clearance',
        body: 'Consignments shipped via international air couriers (DHL Express, FedEx) typically reach major worldwide hubs within 4 to 7 business days. Commercial invoices with accurate HS Classification Codes (e.g., 4202.92 for Quilted Bags, 6204.42 for Cotton Dresses) ensure frictionless customs clearance and accurate tariff calculation.'
      }
    ],
    tags: ['Low MOQ Manufacturing', 'India Textile Sourcing', 'Export Logistics', 'Wholesale Purchasing']
  }
];

export const JOURNAL_POSTS = JOURNAL_ARTICLES.map(a => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  category: a.category,
  readTime: a.readTime,
  date: a.publishedDate,
  excerpt: a.excerpt,
  image: a.coverImage,
  author: a.author,
  contentSections: a.contentSections,
  tags: a.tags
}));
