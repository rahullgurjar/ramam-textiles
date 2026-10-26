import { Product, ProductCategory, WholesaleTier } from './index';

export type OrderStatus = 
  | 'rfq_received'
  | 'quote_sent'
  | 'sample_approved'
  | 'in_production'
  | 'quality_check'
  | 'ready_for_dispatch'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 
  | 'unpaid'
  | 'advance_50'
  | 'paid'
  | 'refunded';

export type OrderType = 
  | 'wholesale_consignment'
  | 'custom_manufacturing'
  | 'sample_order'
  | 'quick_quote_rfq';

export interface CRMOrderItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  unitPriceInr: number;
  totalPriceInr: number;
  customNotes?: string;
}

export interface CRMOrderFinancials {
  subtotalInr: number;
  discountInr: number;
  shippingInr: number;
  taxInr: number;
  totalInr: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'AUD';
  paymentStatus: PaymentStatus;
  paymentMethod: string;
}

export interface CRMOrderFulfillment {
  status: OrderStatus;
  carrier: string; // e.g. DHL Express, FedEx, Air India Cargo, Bluedart
  trackingNumber: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
  dispatchHub?: string;
}

export interface CRMOrderNote {
  id: string;
  createdAt: string;
  author: string;
  text: string;
}

export interface CRMOrder {
  id: string; // e.g. "RAMAM-2026-8941" or "RFQ-RT-914820"
  orderNumber: string;
  type: OrderType;
  createdAt: string;
  updatedAt: string;
  source: string; // e.g. 'Official Wholesale RFQ Drawer', 'Quick Quote Modal', 'Bulk Enquiry', 'Direct Atelier Order'
  customer: {
    name: string;
    company: string;
    email: string;
    phone: string;
    whatsapp?: string;
    country: string;
    city: string;
    taxId?: string; // GSTIN or VAT
    address?: string;
    postalCode?: string;
  };
  items: CRMOrderItem[];
  financials: CRMOrderFinancials;
  fulfillment: CRMOrderFulfillment;
  notes: CRMOrderNote[];
}

export interface CRMCustomer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  city: string;
  taxId?: string;
  address?: string;
  totalOrdersCount: number;
  totalSpentInr: number;
  firstOrderDate: string;
  lastOrderDate: string;
  tier: 'VIP Wholesale' | 'Verified Importer' | 'Boutique Client' | 'Prospect Lead';
  notes?: string;
}

export interface CRMStats {
  totalRevenueInr: number;
  totalOrdersCount: number;
  pendingRfqsCount: number;
  inProductionCount: number;
  inTransitCount: number;
  deliveredCount: number;
  averageOrderValueInr: number;
  paidOrdersCount: number;
  unpaidOrdersCount: number;
}
