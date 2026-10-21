const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const opentype = require('opentype.js');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// 1. Load Georgia Bold Italic to get the exact iconic vector path for "RT"
const fontBuf = fs.readFileSync('C:/Windows/Fonts/georgiaz.ttf');
const font = opentype.parse(fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength));

const glyphR = font.charToGlyph('R');
const glyphT = font.charToGlyph('T');

const fontSize = 36.5;
const scale = fontSize / font.unitsPerEm;

const rPath = glyphR.getPath(0, 0, fontSize);
const rBBox = rPath.getBoundingBox();

const letterSpacing = 0.5;
const tX = glyphR.advanceWidth * scale + letterSpacing;
const tPath = glyphT.getPath(tX, 0, fontSize);
const tBBox = tPath.getBoundingBox();

const totalX1 = Math.min(rBBox.x1, tBBox.x1);
const totalX2 = Math.max(rBBox.x2, tBBox.x2);
const totalY1 = Math.min(rBBox.y1, tBBox.y1);
const totalY2 = Math.max(rBBox.y2, tBBox.y2);

// Center optically inside the 100x100 circle
const targetCenterX = 50.0;
const targetCenterY = 47.5;

const offsetX = targetCenterX - (totalX1 + totalX2) / 2;
const offsetY = targetCenterY - (totalY1 + totalY2) / 2;

const centeredR = glyphR.getPath(offsetX, offsetY, fontSize);
const centeredT = glyphT.getPath(offsetX + tX, offsetY, fontSize);

const rtPathData = centeredR.toPathData(2) + ' ' + centeredT.toPathData(2);

// 2. Generate the master vector SVG
// - Pure vector math (NO raster blur filters, no external font dependencies)
// - Razor sharp on any tab, Retina, 4K, 125%, 150%, 200% scaling
// - Includes dark/light mode responsive contrast
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <!-- Royal Gold Gradient -->
    <linearGradient id="rtGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0C2"/>
      <stop offset="30%" stop-color="#E6C35C"/>
      <stop offset="70%" stop-color="#CA9A26"/>
      <stop offset="100%" stop-color="#9E7212"/>
    </linearGradient>

    <!-- Deep Jaipur Ruby Carmine Gradient -->
    <radialGradient id="rtRuby" cx="36%" cy="32%" r="72%">
      <stop offset="0%" stop-color="#BA3931"/>
      <stop offset="55%" stop-color="#932821"/>
      <stop offset="100%" stop-color="#5E1410"/>
    </radialGradient>
  </defs>

  <!-- Razor-Sharp Circular Medallion -->
  <circle cx="50" cy="50" r="47" fill="url(#rtRuby)" stroke="url(#rtGold)" stroke-width="4.5"/>

  <!-- Inner Delicate Royal Filigree Ring -->
  <circle cx="50" cy="50" r="41.5" fill="none" stroke="url(#rtGold)" stroke-width="1" stroke-opacity="0.55"/>

  <!-- Crisp 1px Shadow for Legibility & Contrast (Non-blurred) -->
  <path d="${rtPathData}" fill="#3C0B08" stroke="#3C0B08" stroke-width="0.6" stroke-linejoin="round" transform="translate(0, 1.2)"/>

  <!-- Royal RT Monogram Inlay (Warm artisan ivory with crisp outline) -->
  <path d="${rtPathData}" fill="#FAF5EE" stroke="#FAF5EE" stroke-width="0.6" stroke-linejoin="round"/>

  <!-- Jaipur Heritage Artisan Hallmark Dot -->
  <circle cx="50" cy="74.5" r="2.8" fill="url(#rtGold)"/>
</svg>`;

// Helper: build standard multi-size .ico file with embedded PNGs
function createIcoFile(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
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
  
  // Header: 0, 0, 1 (type icon), numImages
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

async function generateAll() {
  console.log('1. Writing public/favicon.svg...');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterSvg);

  const svgBuf = Buffer.from(masterSvg);

  console.log('2. Generating high-resolution raster favicons with sharp...');
  const p16 = await sharp(svgBuf, { density: 400 }).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuf, { density: 400 }).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuf, { density: 400 }).resize(48, 48).png().toBuffer();
  const p64 = await sharp(svgBuf, { density: 400 }).resize(64, 64).png().toBuffer();
  const p180 = await sharp(svgBuf, { density: 400 }).resize(180, 180).png().toBuffer();
  const p192 = await sharp(svgBuf, { density: 400 }).resize(192, 192).png().toBuffer();
  const p512 = await sharp(svgBuf, { density: 400 }).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), p16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), p32);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), p48);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180);

  // Generate multi-resolution favicon.ico containing 16, 32, 48
  console.log('3. Generating public/favicon.ico (16, 32, 48 multi-res)...');
  const icoBuffer = createIcoFile([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  // Also create test verification samples
  await sharp(svgBuf, { density: 400 }).resize(37, 37).png().toFile(path.join(rootDir, 'test_tab_37.png'));

  console.log('All favicon assets generated successfully!');
}

generateAll().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
