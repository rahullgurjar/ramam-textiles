import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'alchemy-of-bagru-dabu-indigo',
    slug: 'alchemy-of-bagru-dabu-indigo',
    title: 'The Alchemy of Bagru: Traditional Dabu Mud-Resist Printing and Natural Indigo Vats',
    category: 'Craft Heritage',
    readTime: '6 min read',
    publishedDate: 'September 2026',
    excerpt: 'Deep in the desert artisan settlements of Bagru, master printers combine riverbed mud, gum, and biological fermentation to achieve immortal shades of indigo blue.',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=85',
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
        quote: 'In authentic Dabu, the subtle imperfections, veins of mud crackle, and variations in indigo penetration are not flaws—they are the living signature of handmade textile heritage.',
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
    coverImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85',
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
        body: 'When initiating private-label garment production, ordering initial swatch books and a sample strike-off ensures accurate color matching before commissioning master bolts. At Ramam Textiles, we support flexible low MOQs starting from 25 pieces to empower independent boutique labels and luxury department stores alike.'
      }
    ],
    tags: ['Fabric Sourcing', 'Mulmul Cotton', 'B2B Manufacturing', 'Garment Technical']
  },
  {
    id: 'how-to-launch-private-label-apparel',
    slug: 'how-to-launch-private-label-apparel',
    title: 'How to Launch a Private-Label Apparel Line with Indian Artisan Workshops',
    category: 'Private Label',
    readTime: '7 min read',
    publishedDate: 'September 2026',
    excerpt: 'Step-by-step roadmap from initial sketches and tech packs to custom wooden block carving, sampling, bulk quality control, and worldwide customs clearance.',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ramam Textiles Production Desk',
      role: 'Export Director'
    },
    contentSections: [
      {
        heading: '1. Converting Tech Packs to Heritage Craft',
        body: 'Launching a custom textile line begins with translating design intent—measurements, grading scales, and seam allowances—into production parameters suited for artisanal craftsmanship. Master block carvers can turn vector artwork into hand-carved sheesham woodblocks in just 5-7 working days.'
      },
      {
        heading: '2. Custom Branding & Trim Integration',
        body: 'Private labeling extends beyond the fabric itself. High-end buyers require custom woven damask labels, organic cotton wash care tags with localized multilingual care symbols, branded brass hardware, and eco-friendly compostable polybags.'
      },
      {
        heading: '3. Quality Assurance and Door-to-Door Logistics',
        body: 'Artisanal production requires stringent 4-point fabric inspection and inline stitching audits to eliminate thread pulls or registration misalignments. Once packed in moisture-sealed export cartons, shipments can be routed seamlessly via air courier (DHL/FedEx) in 4-6 business days or consolidated ocean freight for larger volumes.'
      }
    ],
    tags: ['Private Label', 'OEM Production', 'Export Logistics', 'Tech Pack']
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
