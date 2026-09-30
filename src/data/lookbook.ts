import { LookbookSlide } from '../types';

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'editorial-01',
    title: 'Heritage Indigo Mughal Duffle',
    collection: 'Bagru Dabu Heritage Series',
    season: 'Autumn / Resort 2026',
    story: 'Channel-quilted pure cotton luggage hand block-printed in indigo Mughal floral motifs, set against crisp candy-stripe trims.',
    image: './products/duffle-indigo.jpg',
    location: 'Bagru Artisan Workshop, Jaipur',
    featuredProductIds: ['prod-7']
  },
  {
    id: 'editorial-02',
    title: 'Sanganeri Rose Ruffle Shoulder Tote',
    collection: 'Sanganer Botanical Elegance',
    season: 'Spring / Summer 2026',
    story: 'Romantic candy-pink pinstripes meeting delicate rose floral bootis, embellished with feminine side ruffle frills.',
    image: './products/tote-pink-ruffle.jpg',
    location: 'Amber Heritage Courtyard, Jaipur',
    featuredProductIds: ['prod-6']
  },
  {
    id: 'editorial-03',
    title: 'Botanical Autumn Blossom Weekender',
    collection: 'Jaipur Autumn Garden',
    season: 'Autumn / Festive 2026',
    story: 'Joyful botanical blossoms on bubblegum quilted canvas, equipped with antique brass hardware and striped cross-body straps.',
    image: './products/duffle-pink-botanical.jpg',
    location: 'Jaipur Haveli Terrace',
    featuredProductIds: ['prod-8']
  },
  {
    id: 'editorial-04',
    title: 'Cerise Jungle Safari Yoga Carrier',
    collection: 'Ranthambore Jungle Safari',
    season: 'Wellness & Studio Series',
    story: 'Dynamic Rajasthani wildlife art featuring zebras, leopards, and palms on padded cotton canvas for yoga and wellness travel.',
    image: './products/yoga-safari.jpg',
    location: 'City Palace Quarter, Jaipur',
    featuredProductIds: ['prod-9']
  },
  {
    id: 'editorial-05',
    title: 'Royal Playing Card Vanity Organizer',
    collection: 'Royal Jaipur Novelty Edition',
    season: 'Gift & Boutique Series',
    story: 'Vibrant pink quilted cosmetic vanity pouch featuring hand-stamped playing card motifs and candy-stripe pull handle.',
    image: './products/vanity-playing-cards.jpg',
    location: 'Jaipur Design Studio',
    featuredProductIds: ['prod-1']
  },
  {
    id: 'editorial-06',
    title: 'Candy Stripe Hair Styler & Dyson Airwrap Case',
    collection: 'Artisanal Beauty & Tech Organizers',
    season: 'Innovation & Travel 2026',
    story: 'Specialized candy-striped quilted beauty case with dedicated elastic compartments for hair styler wands and curling barrels.',
    image: './products/organizer-dyson-airwrap.jpg',
    location: 'Jaipur Styling Suite',
    featuredProductIds: ['prod-2']
  },
  {
    id: 'editorial-07',
    title: 'Turquoise Sanganeri Blossom Vanity Trio',
    collection: 'Sanganer Botanical Elegance',
    season: 'Spring / Summer 2026',
    story: '3-Piece nesting cosmetic bags in calming seafoam turquoise with yellow floral bootis and handmade silky tassel zipper charms.',
    image: './products/vanity-trio-turquoise.jpg',
    location: 'Sanganer Print Atelier',
    featuredProductIds: ['prod-3']
  },
  {
    id: 'editorial-08',
    title: 'Rose Pink Mughal Paisley Toiletries Kit',
    collection: 'Royal Jaipur Novelty Edition',
    season: 'Resort & Spa 2026',
    story: 'Generous 3-piece nesting cosmetic and toiletry caddy stamped with ornate Mughal paisley motifs and fuchsia fringe tassels.',
    image: './products/vanity-trio-pink-paisley.jpg',
    location: 'Jaipur Heritage Spa',
    featuredProductIds: ['prod-4']
  },
  {
    id: 'editorial-09',
    title: 'Cream & Rust Marigold Genda Vanity Trio',
    collection: 'Jaipur Autumn Garden',
    season: 'Autumn / Festive 2026',
    story: 'Warm cream and terracotta rust orange floral medallion nesting pouches finished with durable channel quilting and gold hardware.',
    image: './products/vanity-trio-marigold-cream.jpg',
    location: 'Marigold Botanical Garden, Jaipur',
    featuredProductIds: ['prod-5']
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

