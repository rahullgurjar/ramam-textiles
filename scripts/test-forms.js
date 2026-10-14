const url = process.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbz5j4RS8gNobRrHVb0l9hsJylHisj9MjJFpJzIx7pu4r3z0x7D7Dl8DORT_pI2y3g7X/exec';

const forms = [
  {
    formType: 'Bulk Order Enquiry',
    enquiryId: 'RT-BULK-20261',
    fullName: 'Élise Laurent',
    companyName: 'Maison Céleste Paris',
    email: 'elise.laurent@maisonceleste.fr',
    phone: '+33 6 12 34 56 78',
    country: 'France',
    volumeTier: '100 - 250 pcs',
    selectedProducts: 'Heritage Kantha Patchwork Duffle Bag, Candy Stripe Quilted Airwrap Case',
    customizations: 'Woven Damask Neck Labels, Custom Barcode Hangtags',
    notes: 'Requires export air freight to CDG airport with Certificate of Origin.'
  },
  {
    formType: 'Custom Manufacturing Studio Brief',
    enquiryId: 'RT-MFG-30812',
    name: 'Maya Henderson',
    brand: 'Pacifica Coastal Apparel',
    email: 'maya@pacificacoastal.com',
    phone: '+1 415 889 2031',
    country: 'United States',
    quantity: '300 units',
    category: 'Resort Wear & Kaftans',
    fabric: 'Pure Mulmul Muslin 60s',
    technique: 'Bagru Dabu Indigo Hand Block Print',
    customServices: 'Custom Sheesham Teak Woodblock Carving, Fabric Preshrunk & Bio-washed',
    notes: 'Looking for sample prototype delivery by next month. Tech pack ready.'
  },
  {
    formType: 'Official Wholesale RFQ Drawer',
    rfqId: 'RFQ-RT-40915',
    name: 'Oliver Pemberton',
    company: 'Mayfair Heritage Living Ltd',
    email: 'o.pemberton@mayfairheritage.co.uk',
    phone: '+44 20 7946 0921',
    country: 'United Kingdom',
    totalQuantity: '180 pcs total',
    items: [
      { name: 'Turquoise Sanganeri Blossom Pouch Trio', quantity: 50 },
      { name: 'Rose Pink Mughal Paisley Toiletries Kit', quantity: 50 },
      { name: 'Royal Safari Jungle Yoga Mat Carrier', quantity: 80 }
    ],
    notes: 'Interested in FOB Mumbai pricing and physical swatches for colorway approval.'
  },
  {
    formType: 'Fabric Swatch Booklet Request',
    enquiryId: 'RT-SWT-50119',
    name: 'Chiara Rossi',
    company: 'Studio Tessile Milano',
    email: 'chiara.rossi@studiotessile.it',
    phone: '+39 02 8934 1120',
    country: 'Italy',
    targetVolume: '50 - 500 meters',
    notes: 'Please courier full 25+ swatch booklet to our design office in Brera, Milan.'
  },
  {
    formType: 'Contact Page Inquiry',
    enquiryId: 'RT-CNT-60421',
    name: "Liam O'Connor",
    company: 'Byron Bay Bohemian Goods',
    email: 'liam@byronboho.com.au',
    phone: '+61 2 9876 5432',
    country: 'Australia',
    inquiryType: 'Wholesale Line Sheet & Private Label Production',
    message: 'We run 3 luxury lifestyle boutiques in NSW. Looking for recurring seasonal runs of quilted duffle bags and washbags.'
  },
  {
    formType: 'Quick Quote & Sample Request',
    enquiryId: 'RT-QUO-70891',
    name: 'Tariq Al-Mansoor',
    company: 'Silk Route Lifestyle LLC',
    email: 'tariq@silkroutelifestyle.ae',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    quantity: '200 units',
    productName: 'Jaipur Quilted Playing Card Vanity Pouch',
    productSku: 'RT-POUCH-CARD-01',
    notes: 'Require expedited air courier delivery to Dubai Silicon Oasis.'
  },
  {
    formType: 'B2B Wholesale Price Tier Unlock',
    enquiryId: 'RT-B2B-80234',
    name: 'Kenji Sato',
    company: 'Ginza Lifestyle Collective',
    email: 'k.sato@ginzalifestyle.co.jp',
    country: 'Japan',
    buyerType: 'Multi-brand Store Retailer',
    notes: 'Unlocked FOB tiered pricing matrix for 2026 collection.'
  },
  {
    formType: 'Wholesale Catalog PDF Download',
    enquiryId: 'RT-CAT-90112',
    name: 'Hannah Weber',
    company: 'Atelier Berlin Concept Store',
    email: 'hannah.weber@atelierberlin.de',
    country: 'Germany',
    notes: 'Requested 2026 Wholesale Lookbook & Line Sheet PDF.'
  },
  {
    formType: 'Bulk Order Enquiry',
    enquiryId: 'RT-BULK-20262',
    fullName: 'Dewi Santoso',
    companyName: 'Ubud Sanctuary Resort & Spa',
    email: 'purchasing@ubudsanctuary.com',
    phone: '+62 361 975 888',
    country: 'Indonesia',
    volumeTier: '150 pcs',
    selectedProducts: 'Mint Aqua Mughal Lotus Vanity Trio, Bubblegum Botanical Weekender Bag',
    customizations: 'Resort embroidered logo on inner lining',
    notes: 'High-end hospitality amenity batch for luxury suites.'
  },
  {
    formType: 'Quick Quote & Sample Request',
    enquiryId: 'RT-QUO-70892',
    name: 'Chloe Tremblay',
    company: 'Nordic Lotus Studio Canada',
    email: 'chloe@nordiclotus.ca',
    phone: '+1 416 555 0199',
    country: 'Canada',
    quantity: '75 units',
    productName: 'Royal Mughal Kalamkari Quilted Laptop Sleeve',
    productSku: 'RT-TECH-KALAM-01',
    notes: 'Requesting 1 physical approval sample prior to contract batch run.'
  }
];

async function submitAll() {
  console.log('Sending 10 test forms to Google Sheets...');
  for (let i = 0; i < forms.length; i++) {
    const item = forms[i];
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      console.log(`[${i + 1}/10] ${item.formType} (${item.enquiryId || item.rfqId}) -> Success (${data.status})`);
    } catch (e) {
      console.error(`Error on form ${i + 1}:`, e.message);
    }
    // Small pause between requests
    await new Promise(r => setTimeout(r, 600));
  }
  console.log('Done! All 10 test forms sent.');
}

submitAll();
