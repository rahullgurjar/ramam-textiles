const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const OUTPUT_FILENAME = 'Ramam_Textiles_OffPage_SEO_Backlink_Sheet.xlsx';
const outputPath = path.resolve(OUTPUT_FILENAME);

// 1. Executive Strategy & Link Velocity Sheet
const strategyData = [
  ['RAMAM TEXTILES — OFF-PAGE SEO & BACKLINK MASTER STRATEGY', '', '', ''],
  ['Atelier Website:', 'https://ramamtextiles.shop/', 'Location:', 'Jaipur, Rajasthan, India'],
  ['Primary Industry:', 'Handcrafted Textiles, Bagru Dabu Printing, Quilted Bags, B2B Sourcing', 'Target Market:', 'Global (US, UK, EU, Australia, India)'],
  ['Target Domain Authority (DA):', 'Aim DA 35+ in 6 Months (Currently DA 12)', 'Monthly Link Velocity:', '15–25 High-Quality Links / Month'],
  ['', '', '', ''],
  ['RECOMMENDED ANCHOR TEXT RATIO (To Prevent Google Algorithmic Penalties)', '', '', ''],
  ['Anchor Type', 'Ideal % Range', 'Description', 'Ramam Textiles Examples'],
  ['Branded Anchors', '40% - 45%', 'Brand name and company variations', '"Ramam Textiles", "Ramam Textiles Jaipur", "Ramam"'],
  ['Naked URL Anchors', '20% - 25%', 'Direct clean protocol and domain variations', '"https://ramamtextiles.shop/", "ramamtextiles.shop", "www.ramamtextiles.shop"'],
  ['LSI & Partial Match', '15% - 20%', 'Keyword mixed with brand or descriptive phrase', '"Jaipur block print bags by Ramam Textiles", "Ramam Textiles cotton mulmul fabric", "ethical textile manufacturer Ramam"'],
  ['Exact Match Keywords', '5% - 10%', 'Target primary transactional / commercial keywords (Keep under 10%!)', '"hand block print fabric", "quilted duffle bags jaipur", "wholesale cambric cotton"'],
  ['Generic / Natural', '5% - 10%', 'Natural conversational citation anchors', '"visit website", "source fabrics here", "view catalog", "official website"'],
  ['', '', '', ''],
  ['PRIMARY TARGET LANDING PAGES (URL MATRIX)', '', '', ''],
  ['Page Name', 'Full URL', 'Target Keyword Intent', 'Target Tier'],
  ['Homepage (Brand & Atelier Hub)', 'https://ramamtextiles.shop/', 'Ramam Textiles, Jaipur Hand Block Printing', 'Tier 1 (High DA Citations & Social)'],
  ['Wholesale & Bulk Sourcing', 'https://ramamtextiles.shop/wholesale', 'wholesale block print fabric, low MOQ fabric manufacturer', 'Tier 1 & Tier 2 (B2B Directories)'],
  ['Custom OEM Manufacturing', 'https://ramamtextiles.shop/custom-manufacturing', 'custom bag manufacturer India, private label apparel Jaipur', 'Tier 1 & Tier 2 (Trade Portals)'],
  ['Block Print Fabrics Collection', 'https://ramamtextiles.shop/collections/block-print-fabrics', 'hand block print fabric, Dabu fabric, Ajrakh print by meter', 'Tier 2 (Niche Curation & Blogs)'],
  ['Quilted Bags & Accessories', 'https://ramamtextiles.shop/collections/canvas-tote-bags', 'quilted duffle bags, block print toiletry pouches, cosmetic kits', 'Tier 2 (Lifestyle & Curation)'],
  ['Artisan Apparel & Ethnic Wear', 'https://ramamtextiles.shop/collections/apparel-ethnic-wear', 'block print kurtas, pure cotton dresses Jaipur', 'Tier 2 (Fashion Portals)'],
  ['Home & Living Heritage', 'https://ramamtextiles.shop/collections/home-living-decor', 'Jaipur cotton quilts, block print cushion covers', 'Tier 2 (Home Decor Hubs)'],
  ['Technical Shrinkage Guide (Link Magnet)', 'https://ramamtextiles.shop/blog/how-to-calculate-fabric-shrinkage-cutting-wastage', 'cotton fabric shrinkage calculation, cutting wastage garment', 'Tier 2 & 3 (Industry Resource Backlinks)'],
  ['Dabu vs Batik Guide (Authority Asset)', 'https://ramamtextiles.shop/blog/dabu-mud-resist-vs-batik-wax-resist', 'dabu printing vs batik print, natural resist dyeing', 'Tier 2 & 3 (Educational Citations)'],
  ['Low-MOQ Sourcing Guide (B2B Magnet)', 'https://ramamtextiles.shop/blog/low-moq-textile-sourcing-india-guide', 'low MOQ textile manufacturing India, fashion startup sourcing', 'Tier 2 & 3 (Fashion Incubator Backlinks)']
];

// 2. High-DA Business, B2B & Citation Directories
const directoriesData = [
  ['Platform Name', 'Category', 'Website / Submission URL', 'Domain Authority (DA)', 'Link Type', 'Target Landing Page', 'Recommended Anchor Text', 'Priority', 'Status'],
  ['Google Business Profile', 'Local Citation & Map Pack', 'https://business.google.com/', 98, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles', 'P0 (Immediate)', 'Ready to Submit'],
  ['Bing Places for Business', 'Search Engine Local Citation', 'https://www.bingplaces.com/', 94, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles Jaipur', 'P0 (Immediate)', 'Ready to Submit'],
  ['Apple Maps Connect', 'Local / Mobile Citation', 'https://mapsconnect.apple.com/', 97, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles', 'P0 (Immediate)', 'Ready to Submit'],
  ['Crunchbase', 'Global Business Directory', 'https://www.crunchbase.com/add-organization', 91, 'NoFollow (High Trust)', 'https://ramamtextiles.shop/', 'Ramam Textiles', 'P0 (Immediate)', 'Ready to Submit'],
  ['Trustpilot', 'Customer Review & Trust Citation', 'https://www.trustpilot.com/', 93, 'NoFollow (Rich Snippet)', 'https://ramamtextiles.shop/', 'Ramam Textiles', 'P0 (Immediate)', 'Ready to Submit'],
  ['IndiaMART', 'B2B Trade & Wholesale Directory', 'https://seller.indiamart.com/', 85, 'DoFollow Profile', 'https://ramamtextiles.shop/wholesale', 'Ramam Textiles Wholesale', 'P0 (Immediate)', 'Ready to Submit'],
  ['Fibre2Fashion', 'Global Textile Industry Portal', 'https://www.fibre2fashion.com/member/register.aspx', 72, 'DoFollow', 'https://ramamtextiles.shop/wholesale', 'Jaipur Hand Block Print Fabric Supplier', 'P0 (Immediate)', 'Ready to Submit'],
  ['TextileInfomedia', 'Indian Textile B2B Portal', 'https://www.textileinfomedia.com/join-free.aspx', 54, 'DoFollow', 'https://ramamtextiles.shop/custom-manufacturing', 'Ramam Textiles Custom Manufacturing', 'P1 (High)', 'Ready to Submit'],
  ['TradeIndia', 'Indian B2B Export Directory', 'https://www.tradeindia.com/', 79, 'DoFollow', 'https://ramamtextiles.shop/wholesale', 'Ramam Textiles Jaipur Exporter', 'P1 (High)', 'Ready to Submit'],
  ['ExportersIndia', 'International Export Portal', 'https://www.exportersindia.com/', 70, 'DoFollow', 'https://ramamtextiles.shop/wholesale', 'Indian Textile Manufacturer & Exporter', 'P1 (High)', 'Ready to Submit'],
  ['YellowPages India', 'Business Yellow Pages', 'https://www.yellowpages.in/', 62, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles Jaipur', 'P1 (High)', 'Ready to Submit'],
  ['JustDial', 'Indian Business Search Engine', 'https://www.justdial.com/free-listing', 75, 'DoFollow Profile', 'https://ramamtextiles.shop/', 'Ramam Textiles Hand Block Printing', 'P1 (High)', 'Ready to Submit'],
  ['Sulekha', 'Indian Business Services Directory', 'https://www.sulekha.com/', 74, 'DoFollow Profile', 'https://ramamtextiles.shop/', 'Ramam Textiles', 'P1 (High)', 'Ready to Submit'],
  ['Kompass India', 'International B2B Directory', 'https://in.kompass.com/', 78, 'DoFollow Profile', 'https://ramamtextiles.shop/custom-manufacturing', 'Ramam Textiles Jaipur', 'P1 (High)', 'Ready to Submit'],
  ['Europages', 'European & Global B2B Directory', 'https://www.europages.com/', 80, 'DoFollow Profile', 'https://ramamtextiles.shop/wholesale', 'Handcrafted Indian Cotton Textiles', 'P1 (High)', 'Ready to Submit'],
  ['Global Sources', 'Global Sourcing & Trade Directory', 'https://www.globalsources.com/', 84, 'NoFollow (High Authority)', 'https://ramamtextiles.shop/wholesale', 'Ramam Textiles Sourcing', 'P2 (Medium)', 'Ready to Submit'],
  ['Yalwa India', 'Free Business Directory', 'https://jaipur.yalwa.in/', 56, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles Hand Block Prints', 'P2 (Medium)', 'Ready to Submit'],
  ['Hotfrog India', 'Business Profile Directory', 'https://www.hotfrog.in/', 60, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles', 'P2 (Medium)', 'Ready to Submit'],
  ['Sitejabber', 'Business Review & Authority Hub', 'https://www.sitejabber.com/business-owners', 79, 'DoFollow Profile', 'https://ramamtextiles.shop/', 'Ramam Textiles Reviews', 'P2 (Medium)', 'Ready to Submit'],
  ['Alignable', 'Small Business Referral Network', 'https://www.alignable.com/', 79, 'DoFollow', 'https://ramamtextiles.shop/', 'Ramam Textiles Atelier', 'P2 (Medium)', 'Ready to Submit'],
  ['About.me', 'Personal & Brand Profile Citation', 'https://about.me/', 90, 'DoFollow Profile', 'https://ramamtextiles.shop/', 'Ramam Textiles Official', 'P1 (High)', 'Ready to Submit'],
  ['Linktree / Beacons', 'Social Hub Profile Link', 'https://linktr.ee/', 94, 'DoFollow Profile', 'https://ramamtextiles.shop/', 'Ramam Textiles Jaipur Collection', 'P0 (Immediate)', 'Ready to Submit'],
  ['Product Hunt', 'Product & Brand Directory', 'https://www.producthunt.com/', 91, 'DoFollow Profile', 'https://ramamtextiles.shop/', 'Ramam Textiles Artisan Atelier', 'P2 (Medium)', 'Ready to Submit'],
  ['Clutch.co (Manufacturing)', 'B2B Sourcing Reviews & Profiles', 'https://clutch.co/', 89, 'DoFollow Profile', 'https://ramamtextiles.shop/custom-manufacturing', 'Ramam Textiles Apparel Manufacturer', 'P2 (Medium)', 'Ready to Submit'],
  ['GoodFirms', 'B2B Directory & Reviews', 'https://www.goodfirms.co/', 83, 'DoFollow Profile', 'https://ramamtextiles.shop/custom-manufacturing', 'Ramam Textiles Jaipur', 'P2 (Medium)', 'Ready to Submit']
];

// 3. Web 2.0 & Authority Content Syndication
const web2Data = [
  ['Platform', 'Authority / Domain', 'Submission URL', 'Link Type', 'Proposed Article Topic / Title', 'Target URL on Ramam', 'Target Anchor Text', 'Syndication Action'],
  ['Medium', 'DA 95', 'https://medium.com/new-story', 'DoFollow (Story Body) / Rel Canonical', 'Inside Jaipur\'s Sanganeri & Bagru Clusters: Why Hand Block Prints Outlive Screen Imitations', 'https://ramamtextiles.shop/blog/sanganeri-vs-bagru-print-differences', 'Sanganeri vs Bagru print differences', 'Publish 800w article with backlink to atelier post'],
  ['LinkedIn Pulse / Articles', 'DA 98', 'https://www.linkedin.com/post/new', 'DoFollow (Article Body)', 'How Fashion Boutique Founders Calculate Fabric Shrinkage & Avoid Cutting Wastage', 'https://ramamtextiles.shop/blog/how-to-calculate-fabric-shrinkage-cutting-wastage', 'fabric shrinkage and cutting wastage formulas', 'Publish B2B sourcing masterclass with founder profile'],
  ['Substack', 'DA 92', 'https://substack.com/', 'DoFollow', 'The Artisan Chronicle: The Chemistry of Cold Mud-Resist Dabu vs Hot Wax Batik', 'https://ramamtextiles.shop/blog/dabu-mud-resist-vs-batik-wax-resist', 'Dabu mud-resist printing guide', 'Weekly newsletter issue linking back to technical post'],
  ['Dev.to / Hashnode (E-Commerce & Tech in Craft)', 'DA 88', 'https://hashnode.com/', 'DoFollow (Canonical Link)', 'How We Digitized a Traditional 300-Year-Old Jaipur Handloom Atelier with Modern SEO & Direct Sourcing', 'https://ramamtextiles.shop/', 'Ramam Textiles Jaipur', 'Author technical/business case study with brand backlink'],
  ['Tealfeed', 'DA 64', 'https://tealfeed.com/', 'DoFollow', 'A Designer\'s Practical Blueprint for Low-MOQ Textile Sourcing in India', 'https://ramamtextiles.shop/blog/low-moq-textile-sourcing-india-guide', 'low MOQ textile manufacturing in India', 'Publish sourcing advisory article'],
  ['Tumblr', 'DA 96', 'https://www.tumblr.com/new/text', 'DoFollow', 'Photo Journal: 16 Sacred Stages of Natural Indigo & Ajrakh Block Printing', 'https://ramamtextiles.shop/blog/16-sacred-stages-ajrakh-block-printing', 'Ajrakh printing process stages', 'Visual photo-story with direct links to fabrics'],
  ['Quora Spaces (Textiles & Sourcing)', 'DA 93', 'https://www.quora.com/', 'NoFollow (Massive Referral Traffic)', 'Answer queries on "Where can I source authentic hand block printed fabrics in India?" and "What is the difference between Dabu and Batik?"', 'https://ramamtextiles.shop/collections/block-print-fabrics', 'Ramam Textiles hand block prints', 'Provide 3 expert authoritative answers with contextual links'],
  ['Reddit (/r/textiles & /r/sustainablefashion)', 'DA 97', 'https://www.reddit.com/r/textiles/', 'NoFollow (High Referral & E-E-A-T)', 'Share technical infographic on fabric GSM calculations (60 GSM vs 120 GSM vs 200 GSM)', 'https://ramamtextiles.shop/blog/demystifying-fabric-gsm-cotton-weights', 'fabric GSM guide for cotton', 'Engage authentically in community discussion'],
  ['Blogger (Blogspot)', 'DA 98', 'https://www.blogger.com/', 'DoFollow', 'Sustainable Fabric Guide: What are AZO-Free Dyes and Why Eco-Boutiques Require Them', 'https://ramamtextiles.shop/blog/what-are-azo-free-dyes-certifications', 'AZO-free dye certifications', 'Syndicate post with attribution link']
];

// 4. Visual, Portfolio & Curation Backlinks
const visualData = [
  ['Platform', 'Domain Authority', 'Submission URL', 'Link Type', 'Asset to Showcase', 'Target Landing Page', 'Optimized Anchor / Pin Title', 'Implementation Strategy'],
  ['Pinterest (Business Hub)', 'DA 94', 'https://www.pinterest.com/', 'DoFollow Pin Links', 'Quilted Duffle Bags, Block Print Mulmul Fabrics, Vanity Kits, Printing Process Infographics', 'https://ramamtextiles.shop/collections/canvas-tote-bags', 'Hand Block Printed Quilted Bags Jaipur | Ramam Textiles', 'Create 5 Boards: "Jaipur Hand Block Prints", "Quilted Duffle Bags", "Dabu Indigo Fabrics", "Artisan Workshops", "Textile Sourcing India". Pin with rich links.'],
  ['Behance', 'DA 92', 'https://www.behance.net/', 'DoFollow Profile & Project Links', 'Case Study: "Preserving Jaipur Block Printing: The Craft of Woodcarving & Resist Dyeing"', 'https://ramamtextiles.shop/craftsmanship', 'Ramam Textiles Craftsmanship & Heritage', 'Publish rich visual project showcasing woodblock chiseling, natural indigo vats, and finished collection with link to atelier.'],
  ['Dribbble', 'DA 91', 'https://dribbble.com/', 'DoFollow Profile Link', 'Visual Design Patterns & Textile Print Swatches', 'https://ramamtextiles.shop/', 'Ramam Textiles Textile Design Atelier', 'Create design portfolio displaying traditional Mughal floral and geometric pattern repeats.'],
  ['Flickr', 'DA 93', 'https://www.flickr.com/', 'DoFollow in Photo Descriptions', 'High-Res Workshop Photo Gallery (Chippa Artisans at Work, Indigo Vats, Sun Drying Fields)', 'https://ramamtextiles.shop/blog/alchemy-of-bagru-dabu-indigo', 'Bagru Dabu indigo dyeing workshop - Ramam Textiles', 'Upload CC-licensed workshop images with clickable source attribution links in photo descriptions.'],
  ['DeviantArt', 'DA 92', 'https://www.deviantart.com/', 'DoFollow Profile & Journal', 'Traditional Folk Art & Woodblock Printing Motifs of Rajasthan', 'https://ramamtextiles.shop/collections/block-print-fabrics', 'authentic Rajasthani hand block prints', 'Feature the craft heritage with artist journal link.']
];

// 5. Document & PDF Sharing Networks
const documentData = [
  ['Platform', 'Domain Authority', 'Submission URL', 'Link Type', 'Document Title', 'Target URL in Document Hyperlinks', 'Document Format & Content'],
  ['SlideShare', 'DA 93', 'https://www.slideshare.net/upload', 'DoFollow (Embedded Links in Slides)', 'The Fashion Designer\'s Technical Handbook to Jaipur Cotton & Block Printing', 'https://ramamtextiles.shop/wholesale', '15-slide PDF guide covering yarn counts, GSM, shrinkage calculations, and MOQ sourcing tiers.'],
  ['Scribd', 'DA 94', 'https://www.scribd.com/upload-document', 'DoFollow / High-Index Document', 'B2B Sourcing Specification Sheet: Bagru Dabu, Sanganeri, and Quilted Accessories', 'https://ramamtextiles.shop/custom-manufacturing', '8-page PDF wholesale catalog with embedded clickable links to /wholesale, /custom-manufacturing, and /contact.'],
  ['Issuu', 'DA 94', 'https://issuu.com/', 'DoFollow Publication Link', 'Ramam Textiles Luxury Heritage Lookbook & Wholesale Fabric Swatch Catalog', 'https://ramamtextiles.shop/lookbook', 'Digital flipbook lookbook featuring artisan duffle bags, pouches, and pure mulmul fabrics with direct buying links.'],
  ['Calameo', 'DA 91', 'https://www.calameo.com/', 'DoFollow Links in Interactive PDF', 'Understanding AZO-Free Dye Standards & GOTS Compliance for Textile Exports', 'https://ramamtextiles.shop/blog/what-are-azo-free-dyes-certifications', 'Technical whitepaper with clickable link back to Ramam Textiles certification breakdown.'],
  ['Edocr', 'DA 78', 'https://www.edocr.com/', 'DoFollow Profile & Document Link', 'Textile Shrinkage & Cutting Wastage Calculation Worksheet', 'https://ramamtextiles.shop/blog/how-to-calculate-fabric-shrinkage-cutting-wastage', 'Printable cutting room worksheet for apparel pattern makers and fashion designers.']
];

// 6. Niche Textile & Guest Outreach Targets
const outreachData = [
  ['Publication / Platform', 'Domain Authority (DA)', 'Niche Focus', 'Proposed Pitch Angle / Article Topic', 'Target Anchor Text', 'Target URL', 'Outreach Email Subject & Value Hook'],
  ['The Sustainable Fashion Forum', 'DA 54', 'Sustainable & Ethical Fashion', 'How Hand Block Printing Preserves Zero-Carbon Craft Traditions in Modern Fashion', 'ethical Jaipur textile manufacturing', 'https://ramamtextiles.shop/craftsmanship', '"Article Pitch: The Zero-Electricity, Botanical Dye Heritage of Jaipur Artisans"'],
  ['Fashion United', 'DA 76', 'Global Fashion B2B & Sourcing', 'Navigating Low-MOQ Sourcing in India: A Roadmap for Indie Boutique Labels', 'low MOQ fabric sourcing from India', 'https://ramamtextiles.shop/wholesale', '"B2B Editorial: Why indie fashion brands are turning to low-MOQ artisan clusters in India"'],
  ['Textile World / Textile World Asia', 'DA 59', 'Textile Engineering & Trade', 'Overcoming Warp vs Weft Shrinkage Variations in Pure Handloom Cotton Cambrics', 'cotton fabric shrinkage calculation', 'https://ramamtextiles.shop/blog/how-to-calculate-fabric-shrinkage-cutting-wastage', '"Technical Article: Empirical shrinkage formulas for natural handloom cottons"'],
  ['Good On You (Brand Directory Outreach)', 'DA 70', 'Sustainable Brand Ratings', 'Ramam Textiles Brand Evaluation: Ethical Wages, AZO-Free Dyes, and Zero Plastic Bags', 'Ramam Textiles ethical apparel', 'https://ramamtextiles.shop/', '"Brand Submission: Ramam Textiles Jaipur ethical manufacturing credentials"'],
  ['Remake.world', 'DA 60', 'Fair Trade & Ethical Garments', 'Chippa Artisan Guilds: Empowering Multi-Generational Craft Families in Bagru & Sanganer', 'artisanal hand block print workshop', 'https://ramamtextiles.shop/craftsmanship', '"Guest Story: Inside the Chippa craft families sustaining India\'s block print heritage"'],
  ['Common Objective (CO)', 'DA 52', 'Sustainable Sourcing Network', 'Supplier Profile Listing: Natural Botanical Dyes & Certified AZO-Free Handblock Cottons', 'Ramam Textiles Jaipur Supplier Profile', 'https://ramamtextiles.shop/wholesale', '"Supplier Directory Listing for Sustainable Textile & Bag Manufacturing"']
];

// 7. Ready-to-Copy Submission Payloads
const payloadsData = [
  ['Field Name', 'Content / Pre-Written Submission Snippet'],
  ['Official Business Name (NAP)', 'Ramam Textiles'],
  ['Legal / Atelier Name', 'Ramam Textiles Jaipur'],
  ['Official Website URL', 'https://ramamtextiles.shop/'],
  ['Wholesale Portal URL', 'https://ramamtextiles.shop/wholesale'],
  ['Contact Email', 'ramamtextiles@gmail.com'],
  ['Contact Phone / WhatsApp', '[To be updated: Please provide your official phone/WhatsApp number]'],
  ['Physical Workshop Address', '[To be updated: Please provide your exact street address & PIN code in Jaipur]'],
  ['Operating Hours', 'Monday – Saturday: 09:30 AM – 06:30 PM IST (GMT +5:30)'],
  ['Short Bio (50 Words - Directories)', 'Ramam Textiles is an authentic Jaipur artisan atelier specializing in luxury hand block prints, Bagru Dabu mud-resist, and natural botanical dyes. We craft premium quilted cotton duffle bags, toiletry kits, and export-grade pure mulmul and cambric fabrics by the meter for boutique designers and global wholesale partners worldwide. Contact: ramamtextiles@gmail.com'],
  ['Medium Bio (100 Words - Citations)', 'Rooted in the historic craft clusters of Jaipur, Rajasthan, Ramam Textiles bridges centuries-old heritage woodblock carving with modern ethical production. Our master Chippa artisans produce small-batch hand block printed apparel, quilted cotton travel bags, cosmetic vanity pouches, and pure cotton fabrics using certified AZO-free and natural indigo dyes. We support independent fashion labels, sustainable boutiques, and interior designers with low MOQs starting from 25 pieces, custom pattern development, and express worldwide air cargo shipping. Email ramamtextiles@gmail.com or visit https://ramamtextiles.shop/ to explore our collections.'],
  ['Comprehensive Bio (250 Words - B2B & Web 2.0)', 'Ramam Textiles is a premier artisanal textile manufacturer and export house based in Jaipur, Rajasthan, India. Honoring over three centuries of Rajasthani textile traditions, our atelier specializes in genuine Sanganeri floral prints, ancient Dabu mud-resist indigo dyeing, and Ajrakh geometric printing.\n\nOur specialized product portfolio includes:\n• Quilted Cotton Bags: Hand-quilted travel duffles, weekender bags, Dyson Airwrap cases, and cosmetic vanity pouch trios.\n• Pure Cotton Fabrics by the Meter: 60s super-fine Mulmul, 40s Cambric, and textured Kantha patchwork yardage.\n• Custom Private-Label Manufacturing: Low-MOQ ethical garment production, physical strike-off sampling, and bespoke teak woodblock carving for independent designers.\n\nEvery meter of fabric is hand-printed using traditional hand-carved Teakwood blocks (chhaap) and washed in open-air drying fields. We prioritize sustainability through non-toxic AZO-free dyes, natural plant mordants (Harda, Alum, Fermented Iron), and circular water conservation. We proudly ship B2B wholesale orders worldwide across the USA, UK, Europe, Australia, and the Middle East with comprehensive export documentation, HS coding, and air cargo logistics. Connect directly with our atelier at https://ramamtextiles.shop/ or email ramamtextiles@gmail.com.'],
  ['Primary Category Tags', 'Hand Block Printing, Cotton Fabrics Wholesale, Quilted Bags Manufacturer, Bagru Dabu Printing, Textile Exporter India, Custom Apparel Manufacturing, Sustainable Fashion Supplier, Mulmul Cotton, Sanganeri Prints, Ethical Fashion Jaipur'],
  ['Target Social Profiles', 'Instagram: https://www.instagram.com/ramamtextiles | Pinterest: https://www.pinterest.com/ramamtextiles | LinkedIn: https://www.linkedin.com/company/ramamtextiles']
];

// Build Workbook
const wb = XLSX.utils.book_new();

function createStyledSheet(data, colWidths) {
  const ws = XLSX.utils.aoa_to_sheet(data);
  if (colWidths) {
    ws['!cols'] = colWidths.map(w => ({ wch: w }));
  }
  return ws;
}

const wsStrategy = createStyledSheet(strategyData, [35, 45, 30, 45]);
const wsDirectories = createStyledSheet(directoriesData, [25, 25, 45, 12, 22, 45, 35, 18, 18]);
const wsWeb2 = createStyledSheet(web2Data, [22, 12, 35, 28, 55, 45, 35, 40]);
const wsVisual = createStyledSheet(visualData, [20, 15, 35, 25, 50, 40, 40, 50]);
const wsDocument = createStyledSheet(documentData, [18, 15, 35, 30, 45, 45, 55]);
const wsOutreach = createStyledSheet(outreachData, [28, 12, 25, 45, 35, 45, 45]);
const wsPayloads = createStyledSheet(payloadsData, [30, 95]);

XLSX.utils.book_append_sheet(wb, wsStrategy, 'Executive Strategy');
XLSX.utils.book_append_sheet(wb, wsDirectories, 'High-DA Directories');
XLSX.utils.book_append_sheet(wb, wsWeb2, 'Web 2.0 Syndication');
XLSX.utils.book_append_sheet(wb, wsVisual, 'Visual & Portfolios');
XLSX.utils.book_append_sheet(wb, wsDocument, 'Document & PDF Sharing');
XLSX.utils.book_append_sheet(wb, wsOutreach, 'Guest & Niche Outreach');
XLSX.utils.book_append_sheet(wb, wsPayloads, 'Copy-Paste Payloads');

// Write out to root
XLSX.writeFile(wb, outputPath);
console.log(`✅ Successfully generated master Excel backlink sheet at: ${outputPath}`);

// Also copy to brain artifact directory if exists
const artifactDir = 'C:/Users/madan/.gemini/antigravity/brain/b17b3040-d90b-4ad1-b8fa-5bfd9cd2ef3a';
if (fs.existsSync(artifactDir)) {
  const artifactPath = path.join(artifactDir, OUTPUT_FILENAME);
  fs.copyFileSync(outputPath, artifactPath);
  console.log(`✅ Copied backlink sheet to artifact directory at: ${artifactPath}`);
}

