/**
 * RAMAM TEXTILES: CRM & CONSIGNMENT ORDER MANAGEMENT ENGINE
 * Handles wholesale lead intake, B2B order lifecycle, client tracking,
 * shipment status syncing, and financial metrics.
 */

import { CRMOrder, CRMOrderItem, CRMOrderNote, CRMCustomer, CRMStats, OrderStatus, PaymentStatus, OrderType } from '../types/crm';
import { PRODUCTS } from '../data/products';

const ORDERS_STORAGE_KEY = 'rt_crm_orders_v1';
export const CRM_UPDATED_EVENT = 'rt_crm_updated';

// Initial realistic B2B consignment and wholesale orders
const SEED_ORDERS: CRMOrder[] = [
  {
    id: 'RAMAM-2026-8941',
    orderNumber: 'RT-8941',
    type: 'wholesale_consignment',
    createdAt: '2026-10-22T09:30:00Z',
    updatedAt: '2026-10-25T14:15:00Z',
    source: 'Official Wholesale RFQ Drawer',
    customer: {
      name: 'Elena Rostova',
      company: 'Maison Riviera Studio',
      email: 'elena@rivierastudio.fr',
      phone: '+33 6 49 20 18 90',
      whatsapp: '+33649201890',
      country: 'France',
      city: 'Paris',
      taxId: 'FR-928371940',
      address: '14 Rue Saint-Honoré, 75001 Paris',
      postalCode: '75001'
    },
    items: [
      {
        productId: 'prod-5',
        productName: 'Heritage Kantha Patchwork Quilted Travel Duffle Bag',
        sku: 'RT-BAG-005',
        image: '/products/duffle-kantha-patchwork.jpg',
        color: 'Multicolor Bagru Vintage Patchwork',
        size: '19" x 10" x 10" (Cabin Weekender)',
        quantity: 80,
        unitPriceInr: 1250,
        totalPriceInr: 100000,
        customNotes: 'Custom branded woven neck labels stitched inside'
      },
      {
        productId: 'prod-1',
        productName: 'Heritage Pink Quilted Playing Card Vanity Pouch',
        sku: 'RT-BAG-001',
        image: '/products/vanity-playing-cards.jpg',
        color: 'Ruby Pink & Crimson',
        size: '8.5" x 4.5" x 4.5"',
        quantity: 120,
        unitPriceInr: 330,
        totalPriceInr: 39600
      }
    ],
    financials: {
      subtotalInr: 139600,
      discountInr: 4600,
      shippingInr: 12500,
      taxInr: 6750,
      totalInr: 154250,
      currency: 'EUR',
      paymentStatus: 'advance_50',
      paymentMethod: 'Bank Wire (SWIFT)'
    },
    fulfillment: {
      status: 'in_transit',
      carrier: 'DHL Express Worldwide',
      trackingNumber: 'DHL-8492019481',
      trackingUrl: 'https://www.dhl.com/en/express/tracking.html?AWB=8492019481',
      estimatedDelivery: '2026-10-29',
      shippedAt: '2026-10-24T11:00:00Z',
      dispatchHub: 'Jaipur Air Cargo Complex'
    },
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-10-22T10:00:00Z',
        author: 'Atelier Lead Desk',
        text: 'Initial RFQ received via website drawer. 50% advance wire received via BNP Paribas.'
      },
      {
        id: 'note-2',
        createdAt: '2026-10-24T11:30:00Z',
        author: 'Dispatch Desk',
        text: 'Customs clearance completed at Jaipur Air Cargo. DHL AWB #8492019481 created.'
      }
    ]
  },
  {
    id: 'RAMAM-2026-8924',
    orderNumber: 'RT-8924',
    type: 'wholesale_consignment',
    createdAt: '2026-10-18T14:20:00Z',
    updatedAt: '2026-10-25T16:00:00Z',
    source: 'Bulk Order Enquiry Form',
    customer: {
      name: 'Archie Pendelton',
      company: 'Soho Living Collective UK',
      email: 'archie@soholiving.co.uk',
      phone: '+44 20 7946 0912',
      whatsapp: '+442079460912',
      country: 'United Kingdom',
      city: 'London',
      taxId: 'GB-109284752',
      address: '42 Berwick Street, Soho, London',
      postalCode: 'W1F 8SZ'
    },
    items: [
      {
        productId: 'prod-2',
        productName: 'Candy Stripe Hair Styler & Dyson Airwrap Quilted Travel Case',
        sku: 'RT-BAG-002',
        image: '/products/organizer-dyson-airwrap.jpg',
        color: 'Carmine Red & Cream Stripe',
        size: '13.5" x 6.5" x 5.5"',
        quantity: 150,
        unitPriceInr: 690,
        totalPriceInr: 103500
      },
      {
        productId: 'prod-3',
        productName: 'Imperial Mughal Poppy Block Print Quilted Vanity Pouch Trio',
        sku: 'RT-BAG-003',
        image: '/products/vanity-trio-turquoise.jpg',
        color: 'Turquoise & Emerald Poppy',
        size: 'Nesting 3-Piece Set',
        quantity: 100,
        unitPriceInr: 680,
        totalPriceInr: 68000
      }
    ],
    financials: {
      subtotalInr: 171500,
      discountInr: 5000,
      shippingInr: 15000,
      taxInr: 8325,
      totalInr: 189825,
      currency: 'GBP',
      paymentStatus: 'paid',
      paymentMethod: 'Bank Wire (SWIFT)'
    },
    fulfillment: {
      status: 'in_production',
      carrier: 'FedEx International Priority',
      trackingNumber: 'FX-918239014',
      trackingUrl: 'https://www.fedex.com/fedextrack/?trknbr=918239014',
      estimatedDelivery: '2026-11-05',
      dispatchHub: 'Sanganer Workshop Unit 2'
    },
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-10-18T16:00:00Z',
        author: 'Atelier Lead Desk',
        text: 'Confirmed 100% advance payment. Block printing completed on combed 60s cambric cotton.'
      },
      {
        id: 'note-2',
        createdAt: '2026-10-23T12:00:00Z',
        author: 'Production Master',
        text: 'Batting quilting underway on multi-needle machines. Hand piping finished.'
      }
    ]
  },
  {
    id: 'RAMAM-2026-8910',
    orderNumber: 'RT-8910',
    type: 'custom_manufacturing',
    createdAt: '2026-10-14T11:00:00Z',
    updatedAt: '2026-10-24T18:30:00Z',
    source: 'Quick Quote Modal',
    customer: {
      name: 'Samantha Vance',
      company: 'Tribeca Bohemian Goods',
      email: 'samantha@tribecabohogoods.com',
      phone: '+1 212 555 0198',
      whatsapp: '+12125550198',
      country: 'United States',
      city: 'New York',
      taxId: 'US-EIN-48-291048',
      address: '88 Franklin St, Tribeca, New York, NY',
      postalCode: '10013'
    },
    items: [
      {
        productId: 'prod-8',
        productName: 'Pink Candy Striped Sanganeri Floral Quilted Ruffle Tote',
        sku: 'RT-BAG-008',
        image: '/products/tote-pink-ruffle.jpg',
        color: 'Rose Pink Candy Stripe & Buti',
        size: '17" W x 14" H x 6" Base',
        quantity: 110,
        unitPriceInr: 650,
        totalPriceInr: 71500,
        customNotes: 'Reinforced cross-stitched web handles'
      },
      {
        productId: 'prod-10',
        productName: 'Royal Safari Jungle Animal Quilted Yoga Mat Carrier',
        sku: 'RT-BAG-010',
        image: '/products/carrier-yoga-safari.jpg',
        color: 'Forest Green & Safari Ochre',
        size: '28" Length x 6.5" Diameter',
        quantity: 80,
        unitPriceInr: 720,
        totalPriceInr: 57600
      }
    ],
    financials: {
      subtotalInr: 129100,
      discountInr: 4100,
      shippingInr: 14000,
      taxInr: 6250,
      totalInr: 145250,
      currency: 'USD',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card (Stripe B2B)'
    },
    fulfillment: {
      status: 'quality_check',
      carrier: 'DHL Express Worldwide',
      trackingNumber: 'DHL-9382104918',
      estimatedDelivery: '2026-10-31',
      dispatchHub: 'Bagru Finishing Atelier'
    },
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-10-15T09:00:00Z',
        author: 'Quality Inspector',
        text: 'All 190 items passed tensile seam test and Azo-free dye fastness verification.'
      }
    ]
  },
  {
    id: 'RFQ-RT-914820',
    orderNumber: 'RFQ-914820',
    type: 'quick_quote_rfq',
    createdAt: '2026-10-25T11:15:00Z',
    updatedAt: '2026-10-25T15:45:00Z',
    source: 'Official Wholesale RFQ Drawer',
    customer: {
      name: 'Tariq Al-Mansoor',
      company: 'Al-Habtoor Boutique Resort & Spa',
      email: 'tariq@alhabtoorresorts.ae',
      phone: '+971 4 399 5000',
      whatsapp: '+97143995000',
      country: 'United Arab Emirates',
      city: 'Dubai',
      taxId: 'AE-TRN-1002938102',
      address: 'Jumeirah Beach Road, Dubai',
      postalCode: 'PO Box 1284'
    },
    items: [
      {
        productId: 'prod-6',
        productName: 'Indigo Mughal Floral Quilted Cylindrical Travel Duffle',
        sku: 'RT-BAG-006',
        image: '/products/duffle-indigo-mughal.jpg',
        color: 'Deep Natural Indigo & Ecru',
        size: '18" Length x 9.5" Diameter',
        quantity: 250,
        unitPriceInr: 1050,
        totalPriceInr: 262500,
        customNotes: 'Embroidered resort crest on side pocket'
      }
    ],
    financials: {
      subtotalInr: 262500,
      discountInr: 12500,
      shippingInr: 22000,
      taxInr: 0,
      totalInr: 272000,
      currency: 'AED',
      paymentStatus: 'unpaid',
      paymentMethod: 'Bank Wire (SWIFT)'
    },
    fulfillment: {
      status: 'quote_sent',
      carrier: 'Emirates SkyCargo / DHL',
      trackingNumber: 'PENDING-DISPATCH',
      estimatedDelivery: '2026-11-14'
    },
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-10-25T15:45:00Z',
        author: 'Lead Desk',
        text: 'Sent formal proforma quotation including custom embroidery digitized sample.'
      }
    ]
  },
  {
    id: 'RAMAM-2026-8876',
    orderNumber: 'RT-8876',
    type: 'wholesale_consignment',
    createdAt: '2026-10-08T10:00:00Z',
    updatedAt: '2026-10-19T13:40:00Z',
    source: 'Contact Page B2B Inquiry',
    customer: {
      name: 'Meera Singhania',
      company: 'Parampara Heritage Living',
      email: 'meera@paramparaliving.in',
      phone: '+91 98201 44920',
      whatsapp: '+919820144920',
      country: 'India',
      city: 'Mumbai',
      taxId: '27AABCP1329Q1Z8',
      address: 'Kala Ghoda Arts District, Fort, Mumbai',
      postalCode: '400001'
    },
    items: [
      {
        productId: 'prod-5',
        productName: 'Heritage Kantha Patchwork Quilted Travel Duffle Bag',
        sku: 'RT-BAG-005',
        image: '/products/duffle-kantha-patchwork.jpg',
        color: 'Multicolor Bagru Vintage Patchwork',
        size: '19" x 10" x 10"',
        quantity: 60,
        unitPriceInr: 1350,
        totalPriceInr: 81000
      },
      {
        productId: 'prod-9',
        productName: 'Royal Mughal Kalamkari Quilted Laptop & Tablet Sleeve',
        sku: 'RT-BAG-009',
        image: '/products/sleeve-laptop-kalamkari.jpg',
        color: 'Kalamkari Tree of Life',
        size: '14" x 10" (Fits 13-14" MacBook)',
        quantity: 50,
        unitPriceInr: 620,
        totalPriceInr: 31000
      }
    ],
    financials: {
      subtotalInr: 112000,
      discountInr: 3000,
      shippingInr: 4500,
      taxInr: 5675,
      totalInr: 119175,
      currency: 'INR',
      paymentStatus: 'paid',
      paymentMethod: 'NEFT / RTGS'
    },
    fulfillment: {
      status: 'delivered',
      carrier: 'Bluedart Express Ground',
      trackingNumber: 'BD-729104819',
      trackingUrl: 'https://www.bluedart.com',
      estimatedDelivery: '2026-10-18',
      shippedAt: '2026-10-15T10:00:00Z',
      deliveredAt: '2026-10-18T16:20:00Z',
      dispatchHub: 'Jaipur Central Hub'
    },
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-10-19T10:00:00Z',
        author: 'Dispatch Desk',
        text: 'Consignment safely delivered and acknowledged by store manager Mr. Ashok Patel.'
      }
    ]
  },
  {
    id: 'RAMAM-2026-8850',
    orderNumber: 'RT-8850',
    type: 'wholesale_consignment',
    createdAt: '2026-09-28T08:30:00Z',
    updatedAt: '2026-10-10T12:00:00Z',
    source: 'Direct Atelier Order',
    customer: {
      name: 'Freja Lindqvist',
      company: 'Nordica Haven Design Boutique',
      email: 'freja@nordicahaven.se',
      phone: '+46 8 123 4567',
      whatsapp: '+4681234567',
      country: 'Sweden',
      city: 'Stockholm',
      taxId: 'SE-5561234567',
      address: 'Drottninggatan 55, Stockholm',
      postalCode: '111 21'
    },
    items: [
      {
        productId: 'prod-4',
        productName: 'Mint Aqua Mughal Lotus Block Print Quilted Vanity Trio',
        sku: 'RT-BAG-004',
        image: '/products/vanity-trio-mint-aqua.jpg',
        color: 'Seafoam Mint & Soft Aqua',
        size: 'Nesting 3-Piece Set',
        quantity: 140,
        unitPriceInr: 680,
        totalPriceInr: 95200
      }
    ],
    financials: {
      subtotalInr: 95200,
      discountInr: 2500,
      shippingInr: 13000,
      taxInr: 4635,
      totalInr: 110335,
      currency: 'EUR',
      paymentStatus: 'paid',
      paymentMethod: 'Bank Wire (SWIFT)'
    },
    fulfillment: {
      status: 'delivered',
      carrier: 'DHL Express Worldwide',
      trackingNumber: 'DHL-6719284019',
      estimatedDelivery: '2026-10-09',
      shippedAt: '2026-10-04T12:00:00Z',
      deliveredAt: '2026-10-09T14:30:00Z'
    },
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-10-10T11:00:00Z',
        author: 'Lead Desk',
        text: 'Client delighted with hand block print sharpness. Re-order promised for Spring 2027.'
      }
    ]
  }
];

/**
 * Loads all orders from localStorage or seed fallback
 */
export function getAllOrders(): CRMOrder[] {
  if (typeof window === 'undefined') {
    return SEED_ORDERS;
  }

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('[crmStorage] Error loading orders:', err);
  }

  return SEED_ORDERS;
}

/**
 * Internal persist helper
 */
function persistOrders(orders: CRMOrder[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent(CRM_UPDATED_EVENT, { detail: orders }));
  } catch (err) {
    console.error('[crmStorage] Error persisting orders:', err);
  }
}

/**
 * Get order by ID or orderNumber
 */
export function getOrderById(idOrNum: string): CRMOrder | undefined {
  const orders = getAllOrders();
  const clean = idOrNum.trim().toUpperCase();
  return orders.find(o => o.id.toUpperCase() === clean || o.orderNumber.toUpperCase() === clean);
}

/**
 * Saves or updates an order
 */
export function saveOrder(order: CRMOrder): CRMOrder {
  const orders = getAllOrders();
  const idx = orders.findIndex(o => o.id === order.id);

  let updated: CRMOrder[];
  const orderWithUpdatedTime = {
    ...order,
    updatedAt: new Date().toISOString()
  };

  if (idx >= 0) {
    updated = [...orders];
    updated[idx] = orderWithUpdatedTime;
  } else {
    updated = [orderWithUpdatedTime, ...orders];
  }

  persistOrders(updated);
  return orderWithUpdatedTime;
}

/**
 * Updates order fulfillment status and optional tracking details
 */
export function updateOrderStatus(
  id: string, 
  status: OrderStatus, 
  trackingNumber?: string, 
  carrier?: string, 
  note?: string
): CRMOrder | undefined {
  const orders = getAllOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return undefined;

  const current = orders[idx];
  const newNotes = [...current.notes];
  if (note && note.trim()) {
    newNotes.unshift({
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: 'Atelier Staff Console',
      text: note.trim()
    });
  }

  const updatedOrder: CRMOrder = {
    ...current,
    updatedAt: new Date().toISOString(),
    fulfillment: {
      ...current.fulfillment,
      status,
      carrier: carrier || current.fulfillment.carrier,
      trackingNumber: trackingNumber || current.fulfillment.trackingNumber,
      shippedAt: status === 'in_transit' && !current.fulfillment.shippedAt ? new Date().toISOString() : current.fulfillment.shippedAt,
      deliveredAt: status === 'delivered' && !current.fulfillment.deliveredAt ? new Date().toISOString() : current.fulfillment.deliveredAt,
    },
    notes: newNotes
  };

  orders[idx] = updatedOrder;
  persistOrders(orders);
  return updatedOrder;
}

/**
 * Updates payment status
 */
export function updatePaymentStatus(id: string, paymentStatus: PaymentStatus): CRMOrder | undefined {
  const orders = getAllOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return undefined;

  const current = orders[idx];
  const updatedOrder: CRMOrder = {
    ...current,
    updatedAt: new Date().toISOString(),
    financials: {
      ...current.financials,
      paymentStatus
    }
  };

  orders[idx] = updatedOrder;
  persistOrders(orders);
  return updatedOrder;
}

/**
 * Adds an internal staff note to an order
 */
export function addOrderNote(orderId: string, noteText: string, author = 'Atelier Staff Console'): CRMOrder | undefined {
  const orders = getAllOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return undefined;

  const current = orders[idx];
  const newNote: CRMOrderNote = {
    id: `note-${Date.now()}`,
    createdAt: new Date().toISOString(),
    author,
    text: noteText
  };

  const updatedOrder: CRMOrder = {
    ...current,
    updatedAt: new Date().toISOString(),
    notes: [newNote, ...current.notes]
  };

  orders[idx] = updatedOrder;
  persistOrders(orders);
  return updatedOrder;
}

/**
 * Deletes an order
 */
export function deleteOrder(id: string): boolean {
  const orders = getAllOrders();
  const filtered = orders.filter(o => o.id !== id);
  if (filtered.length !== orders.length) {
    persistOrders(filtered);
    return true;
  }
  return false;
}

/**
 * Computes high-level KPI stats
 */
export function getCRMStats(): CRMStats {
  const orders = getAllOrders();
  
  const totalRevenueInr = orders.reduce((sum, o) => sum + (o.financials?.totalInr || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingRfqsCount = orders.filter(o => o.fulfillment?.status === 'rfq_received' || o.fulfillment?.status === 'quote_sent').length;
  const inProductionCount = orders.filter(o => o.fulfillment?.status === 'in_production' || o.fulfillment?.status === 'quality_check').length;
  const inTransitCount = orders.filter(o => o.fulfillment?.status === 'in_transit' || o.fulfillment?.status === 'ready_for_dispatch').length;
  const deliveredCount = orders.filter(o => o.fulfillment?.status === 'delivered').length;
  const paidOrdersCount = orders.filter(o => o.financials?.paymentStatus === 'paid').length;
  const unpaidOrdersCount = orders.filter(o => o.financials?.paymentStatus === 'unpaid').length;
  const averageOrderValueInr = totalOrdersCount > 0 ? Math.round(totalRevenueInr / totalOrdersCount) : 0;

  return {
    totalRevenueInr,
    totalOrdersCount,
    pendingRfqsCount,
    inProductionCount,
    inTransitCount,
    deliveredCount,
    averageOrderValueInr,
    paidOrdersCount,
    unpaidOrdersCount
  };
}

/**
 * Extracts and aggregates customer directory from orders
 */
export function getAllCustomers(): CRMCustomer[] {
  const orders = getAllOrders();
  const customerMap = new Map<string, CRMCustomer>();

  orders.forEach(order => {
    const key = order.customer.email.toLowerCase().trim() || order.customer.company.toLowerCase().trim();
    if (!key) return;

    const existing = customerMap.get(key);
    const orderTotal = order.financials?.totalInr || 0;

    if (existing) {
      existing.totalOrdersCount += 1;
      existing.totalSpentInr += orderTotal;
      if (new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = order.createdAt;
      }
      if (new Date(order.createdAt) < new Date(existing.firstOrderDate)) {
        existing.firstOrderDate = order.createdAt;
      }
      // Upgrade tier based on spend
      if (existing.totalSpentInr > 300000) {
        existing.tier = 'VIP Wholesale';
      } else if (existing.totalOrdersCount > 1) {
        existing.tier = 'Verified Importer';
      }
    } else {
      customerMap.set(key, {
        id: `cust-${Math.abs(hashString(key))}`,
        name: order.customer.name,
        company: order.customer.company,
        email: order.customer.email,
        phone: order.customer.phone,
        whatsapp: order.customer.whatsapp || order.customer.phone,
        country: order.customer.country,
        city: order.customer.city,
        taxId: order.customer.taxId,
        address: order.customer.address,
        totalOrdersCount: 1,
        totalSpentInr: orderTotal,
        firstOrderDate: order.createdAt,
        lastOrderDate: order.createdAt,
        tier: orderTotal > 200000 ? 'VIP Wholesale' : 'Boutique Client'
      });
    }
  });

  return Array.from(customerMap.values()).sort((a, b) => b.totalSpentInr - a.totalSpentInr);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Automatically captures incoming form submissions from the storefront
 * into the CRM database as new RFQs/orders.
 */
export function recordLeadAsOrder(leadData: Record<string, any>): CRMOrder | null {
  if (!leadData || typeof window === 'undefined') return null;

  try {
    const id = leadData.rfqId || `RFQ-RT-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderNum = id.replace('RFQ-RT-', 'RFQ-');
    
    // Parse items if available
    let items: any[] = [];
    if (Array.isArray(leadData.items)) {
      items = leadData.items.map((it: any) => {
        const prod = PRODUCTS.find(p => p.id === it.id || p.sku === it.sku);
        const unitPrice = prod?.wholesaleTiers?.[0]?.pricePerUnitInr || prod?.indicativeRetailInr || 500;
        return {
          productId: it.id || prod?.id || 'prod-custom',
          productName: it.name || prod?.name || 'Artisan Textile Consignment',
          sku: it.sku || prod?.sku || 'RT-GEN-001',
          image: prod?.images?.[0] || '/products/duffle-kantha-patchwork.jpg',
          color: it.color || 'Standard Atelier Color',
          size: it.size || 'Standard Size',
          quantity: it.quantity || 25,
          unitPriceInr: unitPrice,
          totalPriceInr: (it.quantity || 25) * unitPrice,
          customNotes: it.customNotes || ''
        };
      });
    }

    if (items.length === 0) {
      items = [
        {
          productId: 'prod-inquiry',
          productName: leadData.productName || leadData.category || 'Bespoke Block Print Inquiry',
          sku: 'RT-INQ-001',
          image: '/products/vanity-playing-cards.jpg',
          color: 'Custom Sample',
          size: 'B2B Custom Specification',
          quantity: parseInt(leadData.quantity || leadData.totalQuantity || '50', 10) || 50,
          unitPriceInr: 450,
          totalPriceInr: (parseInt(leadData.quantity || '50', 10) || 50) * 450,
          customNotes: leadData.message || leadData.notes || ''
        }
      ];
    }

    const subtotal = items.reduce((sum, it) => sum + it.totalPriceInr, 0);

    const newOrder: CRMOrder = {
      id,
      orderNumber: orderNum,
      type: 'quick_quote_rfq',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: leadData.formType || 'Storefront RFQ Lead Engine',
      customer: {
        name: leadData.name || 'Valued B2B Buyer',
        company: leadData.company || 'Atelier Inquirer',
        email: leadData.email || 'lead@inquiry.com',
        phone: leadData.phone || 'N/A',
        whatsapp: leadData.phone || '',
        country: leadData.country || 'India',
        city: leadData.city || 'Regional Center',
        address: leadData.address || ''
      },
      items,
      financials: {
        subtotalInr: subtotal,
        discountInr: 0,
        shippingInr: 5000,
        taxInr: Math.round(subtotal * 0.05),
        totalInr: subtotal + 5000 + Math.round(subtotal * 0.05),
        currency: 'INR',
        paymentStatus: 'unpaid',
        paymentMethod: 'Bank Wire / Proforma'
      },
      fulfillment: {
        status: 'rfq_received',
        carrier: 'DHL / Air Cargo (Quotation Pending)',
        trackingNumber: 'AWAITING-CONFIRMATION',
        estimatedDelivery: 'TBD'
      },
      notes: [
        {
          id: `note-${Date.now()}`,
          createdAt: new Date().toISOString(),
          author: 'Automated Lead Gateway',
          text: `Inquiry submitted via ${leadData.formType || 'Website'}. Notes: ${leadData.notes || leadData.message || 'No additional notes'}`
        }
      ]
    };

    saveOrder(newOrder);
    return newOrder;
  } catch (err) {
    console.error('[crmStorage] Failed to record lead as order:', err);
    return null;
  }
}

/**
 * Export all orders to CSV
 */
export function exportOrdersToCSV(): void {
  const orders = getAllOrders();
  const headers = [
    'Order ID',
    'Date',
    'Customer Name',
    'Company',
    'Email',
    'Phone',
    'Country',
    'City',
    'Items Count',
    'Total (INR)',
    'Payment Status',
    'Fulfillment Status',
    'Carrier',
    'Tracking Number'
  ];

  const rows = orders.map(o => [
    o.id,
    new Date(o.createdAt).toLocaleDateString(),
    `"${(o.customer.name || '').replace(/"/g, '""')}"`,
    `"${(o.customer.company || '').replace(/"/g, '""')}"`,
    o.customer.email,
    o.customer.phone,
    o.customer.country,
    o.customer.city,
    o.items.reduce((s, it) => s + it.quantity, 0),
    o.financials.totalInr,
    o.financials.paymentStatus,
    o.fulfillment.status,
    o.fulfillment.carrier,
    o.fulfillment.trackingNumber
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + 
    [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Ramam_Textiles_Orders_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Resets CRM data to initial seed
 */
export function resetCRMData(): CRMOrder[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(SEED_ORDERS));
    window.dispatchEvent(new CustomEvent(CRM_UPDATED_EVENT, { detail: SEED_ORDERS }));
  }
  return [...SEED_ORDERS];
}
