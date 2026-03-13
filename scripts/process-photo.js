import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processImage() {
  const publicDir = path.resolve('public');
  const files = fs.readdirSync(publicDir);
  
  // Find the uploaded file
  const uploadedFile = files.find(f => 
    (f.startsWith('raw-logo') || f.startsWith('logo')) && 
    (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')) &&
    f !== 'logo.png' // Ignore the generated one if it exists
  );

  if (!uploadedFile) {
    console.log('Please upload your photo to the public folder and name it "raw-logo.png" or "raw-logo.jpg".');
    return;
  }

  const inputPath = path.join(publicDir, uploadedFile);
  console.log(`Processing ${inputPath}...`);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width, minY = height, maxX = 0, maxY = 0;

  // Make white pixels transparent and find bounding box
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // If pixel is white or very close to white (tolerance)
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // Set alpha to 0
    } else {
      // Not white, update bounding box
      const x = (i / channels) % width;
      const y = Math.floor((i / channels) / width);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (minX > maxX || minY > maxY) {
    console.log('Image is completely white or empty.');
    return;
  }

  // Crop to bounding box
  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  
  // Create a square
  const size = Math.max(cropWidth, cropHeight);
  const padding = Math.floor(size * 0.1); // 10% padding
  const finalSize = size + padding * 2;

  // First, save the cropped and transparent image
  const croppedBuffer = await sharp(data, {
    raw: { width, height, channels }
  })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .png()
    .toBuffer();

  // Now create the final square image
  const finalBuffer = await sharp({
    create: {
      width: finalSize,
      height: finalSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: croppedBuffer, gravity: 'center' }])
    .png()
    .toBuffer();

  // Save sizes
  const sizes = [1024, 512, 192, 144, 96, 72, 48];
  const outDir = path.resolve('public/icons');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const s of sizes) {
    await sharp(finalBuffer)
      .resize(s, s)
      .png()
      .toFile(path.join(outDir, `icon-${s}x${s}.png`));
    console.log(`Generated ${s}x${s}`);
  }

  // Save 1024x1024 as logo.png
  await sharp(finalBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.resolve('public/logo.png'));
  
  console.log('Successfully processed logo and generated all icons!');
}

processImage().catch(console.error);
