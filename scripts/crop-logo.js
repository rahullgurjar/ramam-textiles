import fs from 'fs';
import { PNG } from 'pngjs';

const inputBuffer = fs.readFileSync('public/logo.png');
const png = PNG.sync.read(inputBuffer);

let minX = png.width, minY = png.height, maxX = 0, maxY = 0;

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) * 4;
    const alpha = png.data[idx + 3];
    if (alpha > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log(`Bounding box: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);
const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;
console.log(`Cropped size: ${cropWidth}x${cropHeight} (Original: ${png.width}x${png.height})`);

// Add slight 10px padding
const padding = 10;
const targetWidth = cropWidth + padding * 2;
const targetHeight = cropHeight + padding * 2;

const croppedPng = new PNG({
  width: targetWidth,
  height: targetHeight
});

// Initialize with transparency
for (let i = 0; i < croppedPng.data.length; i += 4) {
  croppedPng.data[i] = 0;
  croppedPng.data[i + 1] = 0;
  croppedPng.data[i + 2] = 0;
  croppedPng.data[i + 3] = 0;
}

// Copy pixels
for (let y = 0; y < cropHeight; y++) {
  for (let x = 0; x < cropWidth; x++) {
    const srcIdx = (png.width * (minY + y) + (minX + x)) * 4;
    const dstIdx = (targetWidth * (y + padding) + (x + padding)) * 4;
    croppedPng.data[dstIdx] = png.data[srcIdx];
    croppedPng.data[dstIdx + 1] = png.data[srcIdx + 1];
    croppedPng.data[dstIdx + 2] = png.data[srcIdx + 2];
    croppedPng.data[dstIdx + 3] = png.data[srcIdx + 3];
  }
}

const outBuffer = PNG.sync.write(croppedPng);
fs.writeFileSync('public/logo.png', outBuffer);
console.log('Saved tightly cropped public/logo.png successfully!');
