const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');

/**
 * Builds a valid multi-resolution .ico file containing an array of PNG buffers.
 * @param {Array<{ width: number, height: number, buffer: Buffer }>} pngBuffers
 * @returns {Buffer}
 */
function createIcoFile(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;

  let currentOffset = headerSize + dirSize;
  const entries = [];

  for (const img of pngBuffers) {
    entries.push({
      width: img.width >= 256 ? 0 : img.width,
      height: img.height >= 256 ? 0 : img.height,
      colorCount: 0,
      reserved: 0,
      planes: 1,
      bitCount: 32,
      bytesInRes: img.buffer.length,
      imageOffset: currentOffset,
      buffer: img.buffer
    });
    currentOffset += img.buffer.length;
  }

  const totalSize = currentOffset;
  const icoBuffer = Buffer.alloc(totalSize);

  // ICONDIR Header: reserved(0), type(1 for ICO), count
  icoBuffer.writeUInt16LE(0, 0);
  icoBuffer.writeUInt16LE(1, 2);
  icoBuffer.writeUInt16LE(numImages, 4);

  let entryPos = headerSize;
  for (const e of entries) {
    icoBuffer.writeUInt8(e.width, entryPos);
    icoBuffer.writeUInt8(e.height, entryPos + 1);
    icoBuffer.writeUInt8(e.colorCount, entryPos + 2);
    icoBuffer.writeUInt8(e.reserved, entryPos + 3);
    icoBuffer.writeUInt16LE(e.planes, entryPos + 4);
    icoBuffer.writeUInt16LE(e.bitCount, entryPos + 6);
    icoBuffer.writeUInt32LE(e.bytesInRes, entryPos + 8);
    icoBuffer.writeUInt32LE(e.imageOffset, entryPos + 12);

    e.buffer.copy(icoBuffer, e.imageOffset);
    entryPos += dirEntrySize;
  }

  return icoBuffer;
}

async function generateAllFavicons() {
  console.log('--- Ramam Textiles: Generating Authentic Company Logo Favicons ---');

  // 1. Load official company logo (public/logo.png)
  const officialLogoPath = path.join(publicDir, 'logo.png');
  if (!fs.existsSync(officialLogoPath)) {
    throw new Error(`Official logo not found at ${officialLogoPath}`);
  }

  console.log('1. Loading and trimming official company logo (public/logo.png)...');
  const trimmedLogoBuffer = await sharp(officialLogoPath)
    .trim()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedLogoBuffer).metadata();
  console.log(`   Trimmed logo dimensions: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 2. Create the Luxury Artisan Medallion (512x512)
  // Target: Center emblem scaled inside a circular medallion with royal gold rim
  // Circle radius 240, diameter 480 within 512x512 canvas.
  // Emblem target dimensions: height ~380, width proportional
  const targetLogoHeight = 360;
  const targetLogoWidth = Math.round((trimmedMeta.width / trimmedMeta.height) * targetLogoHeight);

  const scaledLogo = await sharp(trimmedLogoBuffer)
    .resize(targetLogoWidth, targetLogoHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // Create SVG background medallion with warm ivory radial gradient and precision gold rim
  const medallionBgSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Warm Artisan Ivory Radial Background -->
        <radialGradient id="rtIvory" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="65%" stop-color="#FAF5EE"/>
          <stop offset="100%" stop-color="#F2E6D4"/>
        </radialGradient>

        <!-- Royal Gold Gradient -->
        <linearGradient id="rtGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF2CA"/>
          <stop offset="25%" stop-color="#E5C25B"/>
          <stop offset="60%" stop-color="#C59B28"/>
          <stop offset="100%" stop-color="#8F640C"/>
        </linearGradient>
      </defs>

      <!-- Circular Ivory Medallion Background -->
      <circle cx="256" cy="256" r="240" fill="url(#rtIvory)"/>

      <!-- Outer Royal Gold Filigree Rim -->
      <circle cx="256" cy="256" r="240" fill="none" stroke="url(#rtGold)" stroke-width="16"/>

      <!-- Inner Delicate Royal Ring -->
      <circle cx="256" cy="256" r="226" fill="none" stroke="#D4AF37" stroke-width="3" stroke-opacity="0.8"/>
    </svg>
  `);

  const bgBuffer = await sharp(medallionBgSvg)
    .png()
    .toBuffer();

  const logoTop = Math.round((512 - targetLogoHeight) / 2);
  const logoLeft = Math.round((512 - targetLogoWidth) / 2);

  // Master 512x512 circular medallion with transparent outer perimeter
  const masterMedallion512 = await sharp(bgBuffer)
    .composite([{
      input: scaledLogo,
      top: logoTop,
      left: logoLeft
    }])
    .png()
    .toBuffer();

  console.log('2. Master 512x512 brand logo medallion generated successfully.');

  // 3. Generate Apple Touch Icon (180x180) with solid luxury linen background
  // Apple iOS Safari fills transparent areas with solid black, so an opaque luxury background is required.
  console.log('3. Generating apple-touch-icon.png (180x180)...');
  const appleTouchBgSvg = Buffer.from(`
    <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="appleBg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="70%" stop-color="#FAF5EE" />
          <stop offset="100%" stop-color="#F2E6D4" />
        </radialGradient>
      </defs>
      <rect width="180" height="180" fill="url(#appleBg)" />
    </svg>
  `);

  const medallionForApple = await sharp(masterMedallion512)
    .resize(164, 164)
    .toBuffer();

  const appleTouchIcon = await sharp(appleTouchBgSvg)
    .composite([{
      input: medallionForApple,
      top: 8,
      left: 8
    }])
    .png()
    .toBuffer();

  // 4. Generate Raster Favicon Sizes with fine-tuned display sharpening
  console.log('4. Generating raster favicons (16x16, 32x32, 48x48, 64x64, 192x192, 512x512)...');

  // 16x16: standard Windows & non-Retina browser tabs
  const p16 = await sharp(masterMedallion512)
    .resize(16, 16)
    .sharpen(1.1, 1.2, 1.8)
    .png()
    .toBuffer();

  // 32x32: standard Retina & high-DPI browser tabs
  const p32 = await sharp(masterMedallion512)
    .resize(32, 32)
    .sharpen(0.9, 1.0, 1.5)
    .png()
    .toBuffer();

  // 48x48: Google Search SERP icon & Windows desktop shortcut
  const p48 = await sharp(masterMedallion512)
    .resize(48, 48)
    .sharpen(0.8, 0.9, 1.3)
    .png()
    .toBuffer();

  // 64x64: High-res bookmark icon
  const p64 = await sharp(masterMedallion512)
    .resize(64, 64)
    .png()
    .toBuffer();

  // 192x192: Android Chrome PWA home screen icon
  const p192 = await sharp(masterMedallion512)
    .resize(192, 192)
    .png()
    .toBuffer();

  // 512x512: PWA master splash icon
  const p512 = masterMedallion512;

  // 5. Generate Multi-Resolution Windows favicon.ico
  console.log('5. Generating favicon.ico (multi-resolution 16x16, 32x32, 48x48)...');
  const icoBuffer = createIcoFile([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ]);

  // 6. Generate Optimized Modern Vector public/favicon.svg
  console.log('6. Generating lightweight public/favicon.svg...');
  // Optimize 256x256 medallion for vector wrapper (under 25 KB instead of 417 KB)
  const p256Compressed = await sharp(masterMedallion512)
    .resize(256, 256)
    .png({ compressionLevel: 9 })
    .toBuffer();

  const emblemBase64 = p256Compressed.toString('base64');
  const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="rtIvory" cx="50%" cy="46%" r="62%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="#FAF5EE"/>
      <stop offset="100%" stop-color="#F2E6D4"/>
    </radialGradient>
    <linearGradient id="rtGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2CA"/>
      <stop offset="25%" stop-color="#E5C25B"/>
      <stop offset="60%" stop-color="#C59B28"/>
      <stop offset="100%" stop-color="#8F640C"/>
    </linearGradient>
  </defs>
  <!-- Circular Medallion Background -->
  <circle cx="256" cy="256" r="240" fill="url(#rtIvory)"/>
  <!-- Authentic Company Logo Medallion -->
  <image href="data:image/png;base64,${emblemBase64}" x="0" y="0" width="512" height="512"/>
  <!-- Precision Vector Gold Filigree Rim -->
  <circle cx="256" cy="256" r="240" fill="none" stroke="url(#rtGold)" stroke-width="16"/>
  <circle cx="256" cy="256" r="226" fill="none" stroke="#D4AF37" stroke-width="3" stroke-opacity="0.8"/>
</svg>`;

  // 7. Generate site.webmanifest
  console.log('7. Generating site.webmanifest...');
  const webmanifest = {
    name: 'Ramam Textiles Jaipur',
    short_name: 'Ramam Textiles',
    description: 'Authentic Indian luxury textile manufacturer based in Jaipur, Rajasthan.',
    icons: [
      {
        src: '/android-chrome-192x192.png?v=5',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png?v=5',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#241A16',
    background_color: '#FAF5EE',
    display: 'standalone',
    start_url: '/'
  };

  // Write all assets to public/ and dist/ (if dist exists)
  const targets = [publicDir];
  if (fs.existsSync(distDir)) {
    targets.push(distDir);
  }

  for (const dir of targets) {
    fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(dir, 'favicon.svg'), masterSvg);
    fs.writeFileSync(path.join(dir, 'favicon-16x16.png'), p16);
    fs.writeFileSync(path.join(dir, 'favicon-32x32.png'), p32);
    fs.writeFileSync(path.join(dir, 'favicon-48x48.png'), p48);
    fs.writeFileSync(path.join(dir, 'favicon-64x64.png'), p64);
    fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), appleTouchIcon);
    fs.writeFileSync(path.join(dir, 'android-chrome-192x192.png'), p192);
    fs.writeFileSync(path.join(dir, 'android-chrome-512x512.png'), p512);
    fs.writeFileSync(path.join(dir, 'site.webmanifest'), JSON.stringify(webmanifest, null, 2));
  }

  console.log('>>> All authentic company logo favicons generated successfully in public/ and dist/!');
}

generateAllFavicons().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
