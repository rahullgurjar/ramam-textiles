export type ProductCategory = 
  | 'women'
  | 'men'
  | 'kids'
  | 'bags'
  | 'fabrics'
  | 'home';

export interface ProductSpecifications {
  fabric: string;
  gsm?: string;
  width?: string;
  weave?: string;
  dimensions?: string;
  dyeType?: string;
  washCare: string;
  origin: string;
  packaging?: string;
  hsCode?: string;
  exportReady?: boolean;
}

export interface WholesaleTier {
  minQty: number;
  maxQty?: number;
  pricePerUnitInr: number; // Stored securely in state or unlocked on B2B inquiry
  leadTimeWeeks: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  collection: string;
  category: ProductCategory;
  subcategory: string;
  images: string[];
  videoUrl?: string;
  fabric: string;
  printTechnique: string;
  colors: string[];
  sizes: string[];
  moq: number; // Minimum Order Quantity for B2B
  indicativeRetailInr?: number; // Optional retail benchmark
  wholesaleTiers: WholesaleTier[];
  customizationAvailable: boolean;
  privateLabelAvailable: boolean;
  leadTime: string;
  description: string;
  highlights: string[];
  specifications: ProductSpecifications;
  tags: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

export interface CollectionInfo {
  id: string;
  slug: string;
  name: string;
  season: string;
  tagline: string;
  description: string;
  heroImage: string;
  palette: string[];
  tags: string[];
}

export interface InquiryItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  customNotes?: string;
}

export interface CurrencyConfig {
  code: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'AUD';
  symbol: string;
  rate: number; // Multiplier from INR
  label: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
  };
  contentSections: {
    heading?: string;
    body: string;
    image?: string;
    quote?: string;
  }[];
  tags: string[];
}

export interface LookbookSlide {
  id: string;
  title: string;
  collection: string;
  season: string;
  story: string;
  image: string;
  location: string;
  featuredProductIds: string[];
}

export interface FAQItem {
  id: string;
  category: 'Wholesale & MOQ' | 'Custom Manufacturing' | 'Fabrics & Quality' | 'Shipping & Export' | 'Ordering & Payments';
  question: string;
  answer: string;
}
