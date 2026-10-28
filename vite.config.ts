import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      // High-efficiency gzip compression (.gz) for fast network transfer
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false
      }),
      // Ultra-compact Brotli compression (.br) for modern edge CDNs
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false
      })
    ],
    base: '/',
    esbuild: {
      // Strips console and debuggers in production bundles for leanest runtime payload
      drop: isProd ? ['console', 'debugger'] : [],
      legalComments: 'none',
      treeShaking: true,
    },
    server: {
      port: 3000,
      open: false,
      cors: false,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    preview: {
      port: 3000,
      cors: false,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      target: 'es2020',
      cssCodeSplit: true,
      cssMinify: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 600,
      minify: 'esbuild',
      modulePreload: {
        polyfill: false // Modern browsers don't need polyfill; saves overhead
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('src/data/allClusterKeywords') || id.includes('src/data/seoClusters')) {
              return 'seo-cluster-data';
            }
            if (id.includes('src/data/journal.ts') || id.includes('src/data/blogCalendarData')) {
              return 'journal-archive-data';
            }
          }
        }
      }
    }
  };
});
