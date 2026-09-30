import { LookbookSlide } from '../types';

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'editorial-01',
    title: 'Heritage Kantha Patchwork Cylindrical Duffle',
    collection: 'Bagru Dabu Heritage Series',
    season: 'Autumn / Resort 2026',
    story: 'Handcrafted Kantha patchwork combining indigo resist, saffron prints, and monochrome candy-striped piping with reinforced straps.',
    image: './products/duffle-kantha-patchwork.jpg',
    location: 'Bagru Master Workshop, Jaipur',
    featuredProductIds: ['prod-8']
  },
  {
    id: 'editorial-02',
    title: 'Sanganeri Rose Ruffle Shoulder Tote',
    collection: 'Sanganer Botanical Elegance',
    season: 'Spring / Summer 2026',
    story: 'Romantic candy-pink pinstripes meeting delicate rose floral bootis, embellished with feminine side ruffle frills.',
    image: './products/tote-sanganeri-ruffle-lifestyle.jpg',
    location: 'Amber Heritage Courtyard, Jaipur',
    featuredProductIds: ['prod-11']
  },
  {
    id: 'editorial-03',
    title: 'Meadow Green & Blue Blossom Vanity Trio',
    collection: 'Sanganer Botanical Elegance',
    season: 'Spring / Resort 2026',
    story: 'Refreshing 3-piece nesting cosmetic pouches with light green gingham piping and botanical floral vine block prints.',
    image: './products/vanity-trio-meadow-green.jpg',
    location: 'Jaipur Garden Atelier',
    featuredProductIds: ['prod-6']
  },
  {
    id: 'editorial-04',
    title: 'Mint Aqua Mughal Lotus Vanity Caddy Set',
    collection: 'Sanganer Botanical Elegance',
    season: 'Resort & Spa 2026',
    story: '3-Piece nesting cosmetic organizers in serene mint aqua stamped with recurring Mughal magenta lotus blossoms.',
    image: './products/vanity-trio-mint-lotus.jpg',
    location: 'Heritage Haveli Suite, Jaipur',
    featuredProductIds: ['prod-7']
  },
  {
    id: 'editorial-05',
    title: 'Royal Mughal Kalamkari Quilted Laptop Sleeve',
    collection: 'Artisanal Beauty & Tech Organizers',
    season: 'Innovation & Travel 2026',
    story: 'Shock-absorbing padded tech sleeve with intricate Kalamkari floral vine block prints and teal zipper track.',
    image: './products/laptop-sleeve-kalamkari.jpg',
    location: 'Jaipur Design Studio',
    featuredProductIds: ['prod-12']
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
  },
  {
    id: 'editorial-10',
    title: 'Heritage Indigo Mughal Floral Duffle',
    collection: 'Bagru Dabu Heritage Series',
    season: 'Autumn / Resort 2026',
    story: 'Channel-quilted pure cotton luggage hand block-printed in indigo Mughal floral motifs, set against crisp candy-stripe trims.',
    image: './products/duffle-indigo.jpg',
    location: 'Bagru Artisan Workshop, Jaipur',
    featuredProductIds: ['prod-9']
  },
  {
    id: 'editorial-11',
    title: 'Botanical Autumn Blossom Weekender',
    collection: 'Jaipur Autumn Garden',
    season: 'Autumn / Festive 2026',
    story: 'Joyful botanical blossoms on bubblegum quilted canvas, equipped with antique brass hardware and striped cross-body straps.',
    image: './products/duffle-pink-botanical.jpg',
    location: 'Jaipur Haveli Terrace',
    featuredProductIds: ['prod-10']
  },
  {
    id: 'editorial-12',
    title: 'Royal Playing Card Vanity Organizer',
    collection: 'Royal Jaipur Novelty Edition',
    season: 'Gift & Boutique Series',
    story: 'Vibrant pink quilted cosmetic vanity pouch featuring hand-stamped playing card motifs and candy-stripe pull handle.',
    image: './products/vanity-playing-cards.jpg',
    location: 'Jaipur Design Studio',
    featuredProductIds: ['prod-1']
  },
  {
    id: 'editorial-13',
    title: 'Cerise Jungle Safari Yoga Carrier',
    collection: 'Ranthambore Jungle Safari',
    season: 'Wellness & Studio Series',
    story: 'Dynamic Rajasthani wildlife art featuring zebras, leopards, and palms on padded cotton canvas for yoga and wellness travel.',
    image: './products/yoga-safari.jpg',
    location: 'City Palace Quarter, Jaipur',
    featuredProductIds: ['prod-13']
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


