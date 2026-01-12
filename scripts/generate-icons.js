// Script per generare icone PWA da SVG
// Richiede: npm install sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/icon.svg');
const outputDir = path.join(__dirname, '../public');

// SVG semplice per l'icona
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#8B5A3C" rx="100"/>
  <g transform="translate(256, 256)">
    <!-- Tazzina -->
    <path d="M -100 50 Q -100 0 -50 0 L 50 0 Q 100 0 100 50 L 100 150 Q 100 200 50 200 L -50 200 Q -100 200 -100 150 Z" fill="#F3E5D8" stroke="#D4C4B0" stroke-width="8"/>
    <!-- Manico -->
    <path d="M 100 100 Q 150 100 150 150 Q 150 200 100 200" fill="none" stroke="#F3E5D8" stroke-width="20" stroke-linecap="round"/>
    <!-- Liquido -->
    <ellipse cx="0" cy="50" rx="80" ry="10" fill="#6B5A3C" opacity="0.8"/>
    <!-- Vapore -->
    <circle cx="-40" cy="-50" r="8" fill="#FFFFFF" opacity="0.4"/>
    <circle cx="0" cy="-80" r="8" fill="#FFFFFF" opacity="0.4"/>
    <circle cx="40" cy="-50" r="8" fill="#FFFFFF" opacity="0.4"/>
  </g>
</svg>
`;

async function generateIcons() {
  try {
    // Genera icona 192x192
    await sharp(Buffer.from(svgIcon))
      .resize(192, 192)
      .png()
      .toFile(path.join(outputDir, 'icon-192.png'));

    console.log('✅ Generata icon-192.png');

    // Genera icona 512x512
    await sharp(Buffer.from(svgIcon))
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'icon-512.png'));

    console.log('✅ Generata icon-512.png');
    console.log('✅ Icone generate con successo!');
  } catch (error) {
    console.error('❌ Errore nella generazione delle icone:', error.message);
    console.log('\n💡 Installa sharp: npm install sharp');
    process.exit(1);
  }
}

generateIcons();
