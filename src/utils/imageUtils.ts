/**
 * Resolves local relative image paths to robust absolute URLs based on current deployment environment.
 * Prevents 404s when browsing deep nested routes like /product/:slug or /category/:id on both
 * localhost and GitHub Pages (with repository sub-paths).
 */
export const resolveProductImage = (src: string | undefined): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }

  // Strip leading './' or '/'
  const clean = src.replace(/^\.?\//, '');

  if (typeof window === 'undefined') {
    return '/' + clean;
  }

  const origin = window.location.origin;
  if (!origin || origin === 'null' || origin === 'file://') {
    return './' + clean;
  }

  const isGhPagesRepo = window.location.pathname.includes('/ramam-textiles');
  const basePath = isGhPagesRepo ? '/ramam-textiles' : '';

  return `${origin}${basePath}/${clean}`;
};

/**
 * Returns the corresponding WebP URL if available for modern browser acceleration.
 */
export const resolveWebpImage = (src: string | undefined): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  // Convert extension to .webp
  const webpPath = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return resolveProductImage(webpPath);
};

/**
 * Returns the corresponding AVIF URL if available for cutting-edge browser acceleration (~30-50% smaller than WebP).
 */
export const resolveAvifImage = (src: string | undefined): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  // Convert extension to .avif
  const avifPath = src.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif');
  return resolveProductImage(avifPath);
};


