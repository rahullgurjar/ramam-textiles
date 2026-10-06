import fs from 'fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

// Let's inspect logopng.jpeg
const jpegData = fs.readFileSync('public/logopng.jpeg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });
console.log(`Dimensions: ${rawImage.width}x${rawImage.height}`);

// Create transparent PNG
const png = new PNG({
  width: rawImage.width,
  height: rawImage.height
});

for (let y = 0; y < rawImage.height; y++) {
  for (let x = 0; x < rawImage.width; x++) {
    const idx = (rawImage.width * y + x) * 4;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];

    // Calculate luminance or max color
    const brightness = Math.max(r, g, b);
    
    // If it's pure black or near black, make it transparent
    if (brightness < 18) {
      png.data[idx] = 0;
      png.data[idx + 1] = 0;
      png.data[idx + 2] = 0;
      png.data[idx + 3] = 0;
    } else {
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      // Smooth alpha for edge anti-aliasing
      if (brightness < 45) {
        png.data[idx + 3] = Math.round(((brightness - 18) / (45 - 18)) * 255);
      } else {
        png.data[idx + 3] = 255;
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/logo.png', buffer);
console.log('Saved public/logo.png successfully!');
