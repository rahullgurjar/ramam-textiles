import { LookbookSlide } from '../types';

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'editorial-01',
    title: 'The Courtyards of Amber',
    collection: 'Sanganer Summer Florals',
    season: 'Spring / Summer 2026',
    story: 'Airy mulmul silhouettes interacting with sun-baked sandstone courtyards. Hand-stamped marigold floral motifs evoking Rajasthan’s royal summer traditions.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    location: 'Amber Heritage Enclave, Jaipur',
    featuredProductIds: ['rt-w-001', 'rt-f-001']
  },
  {
    id: 'editorial-02',
    title: 'Mud, Water & Indigo',
    collection: 'Bagru Monsoon Indigo',
    season: 'Autumn / Resort 2026',
    story: 'The tactile poetry of wet clay resist drying beneath open desert skies before biological indigo fermentation vats impart their deep oceanic blue.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    location: 'Bagru Riverbed Atelier, Rajasthan',
    featuredProductIds: ['rt-w-003', 'rt-f-002']
  },
  {
    id: 'editorial-03',
    title: 'Golden Zari & Twilight Silk',
    collection: 'Rajputana Heritage Weaves',
    season: 'Festive / Couture 2026',
    story: 'Pure handloom Chanderi silk glistening with subtle metallic zari threads, tailored for evening elegance and royal celebration.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    location: 'City Palace Quarter, Jaipur',
    featuredProductIds: ['rt-w-002', 'rt-f-003']
  },
  {
    id: 'editorial-04',
    title: 'The Nomad Quilted Voyage',
    collection: 'Hand-Quilted Travel Collection',
    season: 'Core Evergreen Series',
    story: 'Channel-quilted pure cotton luggage built for discerning travellers. Padded strength meets artisanal Jaipur block print charm.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    location: 'Jaipur Haveli Workshop',
    featuredProductIds: ['rt-b-001', 'rt-b-002', 'rt-b-003']
  }
];

export const LOOKBOOK_ITEMS = LOOKBOOK_SLIDES.map(s => ({
  id: s.id,
  title: s.title,
  collection: s.collection,
  season: s.season,
  description: s.story,
  image: s.image,
  location: s.location,
  featuredProductIds: s.featuredProductIds
}));
