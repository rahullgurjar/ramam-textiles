const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateCleanLogo() {
  const inputPath = path.resolve('public/logo.png');
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

  const bgR = 237, bgG = 229, bgB = 218;
  const rgba = Buffer.alloc(info.width * info.height * 4);

  // Emblem boundary box with slight safety margin
  const minValidX = 110;
  const maxValidX = 400;
  const minValidY = 75;
  const maxValidY = 415;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const srcIdx = (y * info.width + x) * 3;
      const dstIdx = (y * info.width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // If outside emblem region, 100% transparent
      if (x < minValidX || x > maxValidX || y < minValidY || y > maxValidY) {
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
        continue;
      }

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      let alpha = 255;
      if (lum >= 208) {
        alpha = 0;
      } else if (lum > 165) {
        const t = (208 - lum) / (208 - 165);
        alpha = Math.round(255 * t);
      }

      if (alpha === 0) {
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
      } else if (alpha < 255) {
        const a = alpha / 255;
        // De-halo: remove background color blend from edge pixels
        const unR = Math.min(255, Math.max(0, Math.round((r - bgR * (1 - a)) / a)));
        const unG = Math.min(255, Math.max(0, Math.round((g - bgG * (1 - a)) / a)));
        const unB = Math.min(255, Math.max(0, Math.round((b - bgB * (1 - a)) / a)));
        rgba[dstIdx] = unR;
        rgba[dstIdx + 1] = unG;
        rgba[dstIdx + 2] = unB;
        rgba[dstIdx + 3] = alpha;
      } else {
        rgba[dstIdx] = r;
        rgba[dstIdx + 1] = g;
        rgba[dstIdx + 2] = b;
        rgba[dstIdx + 3] = 255;
      }
    }
  }

  // Find actual tight bounding box
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const a = rgba[(y * info.width + x) * 4 + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Tight emblem bounds:', { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });

  // Center the motif in a square box with 12% luxury padding
  const emblemW = maxX - minX + 1;
  const emblemH = maxY - minY + 1;
  const centerX = Math.round((minX + maxX) / 2);
  const centerY = Math.round((minY + maxY) / 2);
  const maxDim = Math.max(emblemW, emblemH);
  const paddedSize = Math.round(maxDim * 1.15);

  const left = Math.max(0, centerX - Math.round(paddedSize / 2));
  const top = Math.max(0, centerY - Math.round(paddedSize / 2));
  const extractW = Math.min(info.width - left, paddedSize);
  const extractH = Math.min(info.height - top, paddedSize);

  // Extract, resize to crisp 512x512 with transparent background
  const finalImage = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left, top, width: extractW, height: extractH })
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    });

  // Export PNG (lossless with alpha)
  await finalImage.clone().png({ compressionLevel: 9 }).toFile('public/logo.png');
  // Export WebP (lossless with alpha)
  await finalImage.clone().webp({ lossless: true, quality: 100 }).toFile('public/logo.webp');
  // Export AVIF (lossless with alpha)
  await finalImage.clone().avif({ lossless: true }).toFile('public/logo.avif');

  // Also copy to dist if dist exists
  if (fs.existsSync('dist')) {
    fs.copyFileSync('public/logo.png', 'dist/logo.png');
    fs.copyFileSync('public/logo.webp', 'dist/logo.webp');
    fs.copyFileSync('public/logo.avif', 'dist/logo.avif');
  }

  console.log('Successfully generated transparent public/logo.png, public/logo.webp, public/logo.avif!');
}

generateCleanLogo().catch(console.error);
