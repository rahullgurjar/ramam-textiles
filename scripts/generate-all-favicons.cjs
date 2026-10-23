const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

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
  console.log('--- Ramam Textiles: Generating Authentic Brand Logo Favicons ---');

  // 1. Load high-resolution master brand logo (1254x1254)
  const masterLogoPath = path.join(publicDir, 'logo.jpeg');
  if (!fs.existsSync(masterLogoPath)) {
    throw new Error(`Master logo file not found at ${masterLogoPath}`);
  }

  // Emblem is centered at (627, 603) with bounding box ~670x819
  // Crop 910x910 around the emblem so it fills the medallion with optimal balance
  const cropSize = 910;
  const left = Math.round(627 - cropSize / 2);
  const top = Math.round(603 - cropSize / 2);

  console.log(`1. Extracting high-resolution emblem crop (${cropSize}x${cropSize}) from master logo...`);
  const croppedEmblem = await sharp(masterLogoPath)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toBuffer();

  // 2. Create circular mask for transparent perimeter
  const maskOnly = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="242" fill="#000000" />
    </svg>
  `);

  // 3. Create royal gold filigree ring overlay
  const goldRimSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rtGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF2CA"/>
          <stop offset="25%" stop-color="#E5C25B"/>
          <stop offset="60%" stop-color="#C59B28"/>
          <stop offset="100%" stop-color="#8F640C"/>
        </linearGradient>
      </defs>
      <!-- Outer Royal Gold Rim -->
      <circle cx="256" cy="256" r="242" fill="none" stroke="url(#rtGold)" stroke-width="15" />
      <!-- Inner Delicate Filigree Ring -->
      <circle cx="256" cy="256" r="228" fill="none" stroke="#D4AF37" stroke-width="2.5" stroke-opacity="0.65" />
    </svg>
  `);

  // Mask cropped image to circle
  const circularEmblem = await sharp(croppedEmblem)
    .composite([{ input: maskOnly, blend: 'dest-in' }])
    .toBuffer();

  // Master 512x512 transparent medallion
  const masterMedallion512 = await sharp(circularEmblem)
    .composite([{ input: goldRimSvg }])
    .png()
    .toBuffer();

  // 4. Generate Apple Touch Icon (180x180) with opaque luxury ivory background
  // Note: iOS Safari fills transparent pixels with pure black if transparent.
  // Using an opaque warm artisan background ensures a pristine luxury iOS experience.
  console.log('2. Generating public/apple-touch-icon.png (180x180)...');
  const appleTouchBackground = Buffer.from(`
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

  const appleTouchIcon = await sharp(appleTouchBackground)
    .composite([{
      input: medallionForApple,
      top: 8,
      left: 8
    }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);

  // 5. Generate Raster Sizes
  console.log('3. Generating raster favicons (16x16, 32x32, 48x48, 64x64, 192x192, 512x512)...');
  
  // 16x16 with subtle unsharp sharpening for 100% display tab sharpness
  const p16 = await sharp(masterMedallion512)
    .resize(16, 16)
    .sharpen(0.9, 1.2, 1.8)
    .png()
    .toBuffer();

  // 32x32 standard Retina tab
  const p32 = await sharp(masterMedallion512)
    .resize(32, 32)
    .sharpen(0.8, 1.0, 1.4)
    .png()
    .toBuffer();

  // 48x48 Windows desktop / large bookmark
  const p48 = await sharp(masterMedallion512)
    .resize(48, 48)
    .sharpen(0.6, 0.8, 1.2)
    .png()
    .toBuffer();

  // 64x64
  const p64 = await sharp(masterMedallion512)
    .resize(64, 64)
    .png()
    .toBuffer();

  // 192x192 Android Chrome PWA
  const p192 = await sharp(masterMedallion512)
    .resize(192, 192)
    .png()
    .toBuffer();

  // 512x512 Master PWA splash
  const p512 = masterMedallion512;

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), p16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), p32);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), p48);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), p192);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), p512);

  // 6. Generate Multi-Resolution Windows favicon.ico
  console.log('4. Generating public/favicon.ico (multi-resolution 16, 32, 48)...');
  const icoBuffer = createIcoFile([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  // 7. Generate Modern Vector public/favicon.svg
  console.log('5. Generating public/favicon.svg with embedded high-resolution brand logo...');
  const emblemBase64 = masterMedallion512.toString('base64');
  const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Royal Gold Gradient -->
    <linearGradient id="rtGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2CA"/>
      <stop offset="25%" stop-color="#E5C25B"/>
      <stop offset="60%" stop-color="#C59B28"/>
      <stop offset="100%" stop-color="#8F640C"/>
    </linearGradient>

    <!-- Warm Artisan Ivory Radial Texture -->
    <radialGradient id="rtIvory" cx="50%" cy="46%" r="62%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="#FAF5EE"/>
      <stop offset="100%" stop-color="#F2E6D4"/>
    </radialGradient>
  </defs>

  <!-- Circular Medallion Background -->
  <circle cx="256" cy="256" r="242" fill="url(#rtIvory)"/>

  <!-- High-Resolution Authentic Brand Logo Emblem -->
  <image href="data:image/png;base64,${emblemBase64}" x="0" y="0" width="512" height="512"/>

  <!-- Precision Vector Gold Filigree Rim -->
  <circle cx="256" cy="256" r="242" fill="none" stroke="url(#rtGold)" stroke-width="15"/>
  <circle cx="256" cy="256" r="228" fill="none" stroke="#D4AF37" stroke-width="2.5" stroke-opacity="0.65"/>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterSvg);

  console.log('>>> All brand logo favicons generated successfully!');
}

generateAllFavicons().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
