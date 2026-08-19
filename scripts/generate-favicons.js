const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  console.log('Generating multi-device favicon suite from SVG...');

  const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { file: path.join(__dirname, '..', 'public', 'favicon-16x16.png'), size: 16 },
    { file: path.join(__dirname, '..', 'public', 'favicon-32x32.png'), size: 32 },
    { file: path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), size: 180 },
    { file: path.join(__dirname, '..', 'app', 'apple-icon.png'), size: 180 },
    { file: path.join(__dirname, '..', 'public', 'icon-192.png'), size: 192 },
    { file: path.join(__dirname, '..', 'public', 'icon-512.png'), size: 512 },
    { file: path.join(__dirname, '..', 'app', 'icon.png'), size: 512 },
  ];

  for (const t of targets) {
    await sharp(svgBuffer)
      .resize(t.size, t.size)
      .png()
      .toFile(t.file);
    console.log(`✓ Generated ${t.file} (${t.size}x${t.size})`);
  }

  // Create standard 32x32 PNG as fallback favicon.ico
  const ico32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), ico32Buffer);
  fs.writeFileSync(path.join(__dirname, '..', 'app', 'favicon.ico'), ico32Buffer);
  console.log('✓ Generated public/favicon.ico and app/favicon.ico');

  console.log('Favicon generation completed successfully!');
}

generateFavicons().catch(console.error);
