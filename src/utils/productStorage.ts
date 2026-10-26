/**
 * RAMAM TEXTILES: PRODUCT STORAGE & INVENTORY ENGINE
 * Provides persistence, catalog updates, additions, and reactive subscriptions
 * for the Atelier Admin CRM and Storefront.
 */

import { Product } from '../types';
import { PRODUCTS as BASE_PRODUCTS } from '../data/products';

const PRODUCTS_STORAGE_KEY = 'rt_custom_products_v1';
export const PRODUCTS_UPDATED_EVENT = 'rt_products_updated';

// Initialize BASE_PRODUCTS in-place if custom products exist in localStorage
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        BASE_PRODUCTS.length = 0;
        BASE_PRODUCTS.push(...parsed);
      }
    }
  } catch {}
}

/**
 * Loads the active product catalog from localStorage or initial defaults
 */
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return BASE_PRODUCTS;
  }

  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      return [...BASE_PRODUCTS];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('[productStorage] Error loading products:', err);
  }

  return [...BASE_PRODUCTS];
}

/**
 * Internal helper to save and dispatch updates
 */
function persistProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    // Synchronize the imported BASE_PRODUCTS array in-place so all consumers automatically receive updates
    BASE_PRODUCTS.length = 0;
    BASE_PRODUCTS.push(...products);
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: products }));
  } catch (err) {
    console.error('[productStorage] Error saving products:', err);
  }
}

/**
 * Get product by ID or Slug
 */
export function getProductById(idOrSlug: string): Product | undefined {
  const products = getStoredProducts();
  return products.find(p => p.id === idOrSlug || p.slug === idOrSlug);
}

/**
 * Saves a new product or updates an existing one
 */
export function saveProduct(product: Product): Product {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === product.id);

  let updatedList: Product[];
  if (index >= 0) {
    updatedList = [...products];
    updatedList[index] = { ...product };
  } else {
    // Generate valid id and slug if missing
    const id = product.id || `prod-custom-${Date.now()}`;
    const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...product,
      id,
      slug,
      sku: product.sku || `RT-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    };
    updatedList = [newProduct, ...products];
    persistProducts(updatedList);
    return newProduct;
  }

  persistProducts(updatedList);
  return product;
}

/**
 * Deletes a product by ID
 */
export function deleteProduct(productId: string): boolean {
  const products = getStoredProducts();
  const filtered = products.filter(p => p.id !== productId);
  if (filtered.length !== products.length) {
    persistProducts(filtered);
    return true;
  }
  return false;
}

/**
 * Duplicates a product to quickly create a new variant or SKU
 */
export function duplicateProduct(productId: string): Product | null {
  const products = getStoredProducts();
  const source = products.find(p => p.id === productId);
  if (!source) return null;

  const newId = `prod-custom-${Date.now()}`;
  const newSku = `${source.sku}-COPY`;
  const newName = `${source.name} (Copy)`;
  const newSlug = `${source.slug}-copy-${Math.floor(Math.random() * 1000)}`;

  const clone: Product = {
    ...JSON.parse(JSON.stringify(source)),
    id: newId,
    sku: newSku,
    name: newName,
    slug: newSlug,
    isNew: true
  };

  const updatedList = [clone, ...products];
  persistProducts(updatedList);
  return clone;
}

/**
 * Resets products catalog back to repository factory defaults
 */
export function resetProductsToDefault(): Product[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: BASE_PRODUCTS }));
  }
  return [...BASE_PRODUCTS];
}

/**
 * Export products catalog as JSON string
 */
export function exportProductsJson(): string {
  const products = getStoredProducts();
  return JSON.stringify(products, null, 2);
}

/**
 * Import products from JSON string
 */
export function importProductsJson(jsonString: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return { success: false, count: 0, error: 'Invalid JSON format: expected array of products' };
    }
    // Basic validation
    const valid = parsed.every(p => p.id && p.name && p.category);
    if (!valid) {
      return { success: false, count: 0, error: 'Products must contain id, name, and category' };
    }
    persistProducts(parsed);
    return { success: true, count: parsed.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || 'Failed to parse JSON' };
  }
}
