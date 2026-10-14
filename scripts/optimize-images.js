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
  console.log(' Starting image optimization pipeline...\n');

  let totalOriginalBytes = 0;
  let totalOptimizedJpgBytes = 0;
  let totalWebpBytes = 0;

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

        // Read image buffer
        const inputBuffer = fs.readFileSync(filePath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        // Target max width 1200px (crystal sharp on 2x retina, but prevents 3000px bloat)
        let pipeline = sharp(inputBuffer);
        if (metadata.width && metadata.width > 1200) {
          pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
        }

        // Generate optimized WebP
        const webpBuffer = await pipeline
          .clone()
          .webp({ quality: 80, effort: 6 })
          .toBuffer();
        fs.writeFileSync(webpPath, webpBuffer);
        totalWebpBytes += webpBuffer.length;

        // Generate optimized JPG
        const optimizedJpgBuffer = await pipeline
          .clone()
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
        fs.writeFileSync(filePath, optimizedJpgBuffer);
        totalOptimizedJpgBytes += optimizedJpgBuffer.length;

        const origKb = (originalStats.size / 1024).toFixed(1);
        const jpgKb = (optimizedJpgBuffer.length / 1024).toFixed(1);
        const webpKb = (webpBuffer.length / 1024).toFixed(1);
        const savings = (100 - (webpBuffer.length / originalStats.size) * 100).toFixed(1);

        console.log(` ${file}:`);
        console.log(`   Original: ${origKb} KB  JPG: ${jpgKb} KB  WebP: ${webpKb} KB (${savings}% saved)`);
      }
    }
  }

  // 2. Optimize logo files in public
  const logoPngPath = path.join(publicDir, 'logo.png');
  if (fs.existsSync(logoPngPath)) {
    const origStats = fs.statSync(logoPngPath);
    const logoBuffer = fs.readFileSync(logoPngPath);
    const logoWebpPath = path.join(publicDir, 'logo.webp');

    const webpBuffer = await sharp(logoBuffer)
      .webp({ quality: 88, effort: 6 })
      .toBuffer();
    fs.writeFileSync(logoWebpPath, webpBuffer);

    console.log(`\n logo.png:`);
    console.log(`   Original: ${(origStats.size / 1024).toFixed(1)} KB  logo.webp: ${(webpBuffer.length / 1024).toFixed(1)} KB`);
  }

  const logoJpegPath = path.join(publicDir, 'logo.jpeg');
  if (fs.existsSync(logoJpegPath)) {
    const origStats = fs.statSync(logoJpegPath);
    const logoBuffer = fs.readFileSync(logoJpegPath);
    const optimizedLogo = await sharp(logoBuffer)
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(logoJpegPath, optimizedLogo);

    console.log(` logo.jpeg:`);
    console.log(`   Original: ${(origStats.size / 1024).toFixed(1)} KB  Optimized: ${(optimizedLogo.length / 1024).toFixed(1)} KB`);
  }

  console.log('\n==================================================');
  console.log(` Total Original: ${(totalOriginalBytes / 1024).toFixed(1)} KB`);
  console.log(` Total Optimized JPG: ${(totalOptimizedJpgBytes / 1024).toFixed(1)} KB`);
  console.log(` Total WebP: ${(totalWebpBytes / 1024).toFixed(1)} KB`);
  const totalSavings = (100 - (totalWebpBytes / totalOriginalBytes) * 100).toFixed(1);
  console.log(` Overall WebP payload reduction: ${totalSavings}% !`);
  console.log('==================================================\n');
}

optimizeImages().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
