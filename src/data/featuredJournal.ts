export interface JournalPreview {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export const FEATURED_JOURNAL_PREVIEWS: JournalPreview[] = [
  {
    id: 'chemistry-natural-mordants-harda-alum-syahi',
    slug: 'chemistry-natural-mordants-harda-alum-syahi',
    title: "The Chemistry of Natural Mordants: Harda, Alum, and Iron Rust Syahi",
    category: 'Natural Dyeing',
    readTime: '8 min read',
    date: 'October 25, 2026',
    excerpt: "Why natural botanical dyes cannot bond with cotton without mordants: tannin chemistry, alum bath ratios, and fermenting scrap iron with jaggery.",
    image: '/products/vanity-trio-marigold-cream.jpg'
  },
  {
    id: 'mulmul-vs-voile-vs-cambric-cotton-guide',
    slug: 'mulmul-vs-voile-vs-cambric-cotton-guide',
    title: "Mulmul vs Voile vs Cambric: Which Jaipur Cotton Weave is Right for You?",
    category: 'Fabric Sourcing',
    readTime: '8 min read',
    date: 'October 24, 2026',
    excerpt: "A technical side-by-side comparison of yarn counts, warp-weft density, transparency, tactile handfeel, and shrinkage for apparel and accessories.",
    image: '/products/tote-sanganeri-ruffle-lifestyle.jpg'
  },
  {
    id: 'how-teak-chhaap-woodblocks-are-made',
    slug: 'how-teak-chhaap-woodblocks-are-made',
    title: "Inside a Master Woodcarver's Workshop: How Teak Chhaap Blocks are Made",
    category: 'Craft Heritage',
    readTime: '8 min read',
    date: 'October 24, 2026',
    excerpt: "Discover the centuries-old art of wooden block carving in Rajasthan: choosing seasoned Sheesham and Teak, hand-chiseling with steel tools, and oil curing.",
    image: '/products/sanganeri-vs-bagru.jpg'
  }
];

export const TOTAL_JOURNAL_COUNT = 13;
