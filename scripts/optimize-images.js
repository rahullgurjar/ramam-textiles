import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const productsDir = path.join(rootDir, 'public', 'products');
const publicDir = path.join(rootDir, 'public');

async function optimizeImages() {
  console.log('⚡ Starting high-performance image optimization pipeline (WebP + AVIF + MozJPEG)...\n');

  let totalOriginalBytes = 0;
  let totalOptimizedJpgBytes = 0;
  let totalWebpBytes = 0;
  let totalAvifBytes = 0;

  // 1. Optimize products
  if (fs.existsSync(productsDir)) {
    const files = fs.readdirSync(productsDir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
        const filePath = path.join(productsDir, file);
        const originalStats = fs.statSync(filePath);
        totalOriginalBytes += originalStats.size;

        const baseName = file.replace(/\.(jpg|jpeg)$/i, '');
        const webpPath = path.join(productsDir, `${baseName}.webp`);
        const avifPath = path.join(productsDir, `${baseName}.avif`);

        // Read image buffer
        const inputBuffer = fs.readFileSync(filePath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        // Target max width 900px (crystal sharp 2x retina for 400px product card grid)
        let pipeline = sharp(inputBuffer);
        if (metadata.width && metadata.width > 900) {
          pipeline = pipeline.resize({ width: 900, withoutEnlargement: true });
        }

        // Generate optimized WebP (effort 6, quality 76)
        const webpBuffer = await pipeline
          .clone()
          .webp({ quality: 76, effort: 6, smartSubsample: true })
          .toBuffer();
        fs.writeFileSync(webpPath, webpBuffer);
        totalWebpBytes += webpBuffer.length;

        // Generate modern AVIF (effort 4, quality 62)
        const avifBuffer = await pipeline
          .clone()
          .avif({ quality: 62, effort: 4 })
          .toBuffer();
        fs.writeFileSync(avifPath, avifBuffer);
        totalAvifBytes += avifBuffer.length;

        // Generate optimized progressive MozJPEG
        const optimizedJpgBuffer = await pipeline
          .clone()
          .jpeg({ quality: 76, mozjpeg: true, progressive: true })
          .toBuffer();
        fs.writeFileSync(filePath, optimizedJpgBuffer);
        totalOptimizedJpgBytes += optimizedJpgBuffer.length;

        const origKb = (originalStats.size / 1024).toFixed(1);
        const jpgKb = (optimizedJpgBuffer.length / 1024).toFixed(1);
        const webpKb = (webpBuffer.length / 1024).toFixed(1);
        const avifKb = (avifBuffer.length / 1024).toFixed(1);
        const savings = (100 - (webpBuffer.length / originalStats.size) * 100).toFixed(1);

        console.log(`📦 ${file}:`);
        console.log(`   Orig: ${origKb}KB | JPG: ${jpgKb}KB | WebP: ${webpKb}KB | AVIF: ${avifKb}KB (${savings}% saved)`);
      }
    }

    // 2. Specialized LCP Hero Image: Mobile variant (width 600px for instant mobile paint)
    const heroJpg = path.join(productsDir, 'duffle-kantha-patchwork.jpg');
    if (fs.existsSync(heroJpg)) {
      const heroBuf = fs.readFileSync(heroJpg);
      
      const mobileWebp = await sharp(heroBuf)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 74, effort: 6, smartSubsample: true })
        .toBuffer();
      const mobileWebpPath = path.join(productsDir, 'duffle-kantha-patchwork-mobile.webp');
      fs.writeFileSync(mobileWebpPath, mobileWebp);

      const mobileAvif = await sharp(heroBuf)
        .resize({ width: 600, withoutEnlargement: true })
        .avif({ quality: 60, effort: 4 })
        .toBuffer();
      const mobileAvifPath = path.join(productsDir, 'duffle-kantha-patchwork-mobile.avif');
      fs.writeFileSync(mobileAvifPath, mobileAvif);

      console.log(`\n🚀 LCP Mobile Hero:`);
      console.log(`   Mobile WebP (600w): ${(mobileWebp.length / 1024).toFixed(1)} KB`);
      console.log(`   Mobile AVIF (600w): ${(mobileAvif.length / 1024).toFixed(1)} KB`);
    }
  }

  // 3. Optimize logo files in public
  const logoPngPath = path.join(publicDir, 'logo.png');
  if (fs.existsSync(logoPngPath)) {
    const origStats = fs.statSync(logoPngPath);
    const logoBuffer = fs.readFileSync(logoPngPath);

    // Header WebP: 256x256 (ultra-crisp for 48px header display)
    const logoWebpPath = path.join(publicDir, 'logo.webp');
    const webpBuffer = await sharp(logoBuffer)
      .resize(256, 256)
      .webp({ quality: 85, effort: 6 })
      .toBuffer();
    fs.writeFileSync(logoWebpPath, webpBuffer);

    // Header AVIF: 256x256
    const logoAvifPath = path.join(publicDir, 'logo.avif');
    const avifBuffer = await sharp(logoBuffer)
      .resize(256, 256)
      .avif({ quality: 70, effort: 4 })
      .toBuffer();
    fs.writeFileSync(logoAvifPath, avifBuffer);

    // Resized crisp social/OG PNG: 512x512
    const optimizedPng = await sharp(logoBuffer)
      .resize(512, 512)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();
    fs.writeFileSync(logoPngPath, optimizedPng);

    console.log(`\n🏷️ Brand Logo:`);
    console.log(`   Original: ${(origStats.size / 1024).toFixed(1)} KB`);
    console.log(`   logo.webp (256px): ${(webpBuffer.length / 1024).toFixed(1)} KB`);
    console.log(`   logo.avif (256px): ${(avifBuffer.length / 1024).toFixed(1)} KB`);
    console.log(`   logo.png  (512px): ${(optimizedPng.length / 1024).toFixed(1)} KB`);
  }

  const logoJpegPath = path.join(publicDir, 'logo.jpeg');
  if (fs.existsSync(logoJpegPath)) {
    const origStats = fs.statSync(logoJpegPath);
    const logoBuffer = fs.readFileSync(logoJpegPath);
    const optimizedLogo = await sharp(logoBuffer)
      .resize(512, 512)
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(logoJpegPath, optimizedLogo);

    console.log(`   logo.jpeg (512px): ${(optimizedLogo.length / 1024).toFixed(1)} KB`);
  }

  console.log('\n==================================================');
  console.log(`📊 Total Original: ${(totalOriginalBytes / 1024).toFixed(1)} KB`);
  console.log(`📊 Total Optimized JPG: ${(totalOptimizedJpgBytes / 1024).toFixed(1)} KB`);
  console.log(`📊 Total WebP: ${(totalWebpBytes / 1024).toFixed(1)} KB`);
  console.log(`📊 Total AVIF: ${(totalAvifBytes / 1024).toFixed(1)} KB`);
  const webpSavings = (100 - (totalWebpBytes / totalOriginalBytes) * 100).toFixed(1);
  const avifSavings = (100 - (totalAvifBytes / totalOriginalBytes) * 100).toFixed(1);
  console.log(`🎉 WebP payload reduction: ${webpSavings}%`);
  console.log(`🎉 AVIF payload reduction: ${avifSavings}%`);
  console.log('==================================================\n');
}

optimizeImages().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
