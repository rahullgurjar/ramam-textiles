import { LookbookSlide } from '../types';

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'editorial-01',
    title: 'Heritage Indigo Mughal Duffle',
    collection: 'Bagru Dabu Heritage Series',
    season: 'Autumn / Resort 2026',
    story: 'Channel-quilted pure cotton luggage hand block-printed in indigo Mughal floral motifs, set against crisp candy-stripe trims.',
    image: './products/prod-3.jpg',
    location: 'Bagru Artisan Workshop, Jaipur',
    featuredProductIds: ['prod-3']
  },
  {
    id: 'editorial-02',
    title: 'Sanganeri Rose Ruffle Shoulder Tote',
    collection: 'Sanganer Botanical Elegance',
    season: 'Spring / Summer 2026',
    story: 'Romantic candy-pink pinstripes meeting delicate rose floral bootis, embellished with feminine side ruffle frills.',
    image: './products/prod-2.jpg',
    location: 'Amber Heritage Courtyard, Jaipur',
    featuredProductIds: ['prod-2']
  },
  {
    id: 'editorial-03',
    title: 'Botanical Autumn Blossom Weekender',
    collection: 'Jaipur Autumn Garden',
    season: 'Autumn / Festive 2026',
    story: 'Joyful botanical blossoms on bubblegum quilted canvas, equipped with antique brass hardware and striped cross-body straps.',
    image: './products/prod-4.jpg',
    location: 'Jaipur Haveli Terrace',
    featuredProductIds: ['prod-4']
  },
  {
    id: 'editorial-04',
    title: 'Cerise Jungle Safari Yoga Carrier',
    collection: 'Ranthambore Jungle Safari',
    season: 'Wellness & Studio Series',
    story: 'Dynamic Rajasthani wildlife art featuring zebras, leopards, and palms on padded cotton canvas for yoga and wellness travel.',
    image: './products/prod-5.jpg',
    location: 'City Palace Quarter, Jaipur',
    featuredProductIds: ['prod-5']
  },
  {
    id: 'editorial-05',
    title: 'Royal Playing Card Vanity Organizer',
    collection: 'Royal Jaipur Novelty Edition',
    season: 'Gift & Boutique Series',
    story: 'Vibrant pink quilted cosmetic vanity pouch featuring hand-stamped playing card motifs and candy-stripe pull handle.',
    image: './products/prod-1.jpg',
    location: 'Jaipur Design Studio',
    featuredProductIds: ['prod-1']
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
