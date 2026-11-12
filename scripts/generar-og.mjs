// Genera public/og-tensorti.png (1200x630), la imagen que aparece al compartir el
// sitio en WhatsApp, LinkedIn, etc. Usa el logo de public/tensor-logo.svg.
//
// Uso (desde la raíz del proyecto):  node scripts/generar-og.mjs
// Requiere "sharp", que ya viene instalado como dependencia de Astro.

import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const ANCHO = 1200;
const ALTO = 630;

const NOMBRE = "Tensor TI";
const BAJADA = ["Soporte TI en terreno, desarrollo de", "software y hosting web"];
const PIE = "Región de Tarapacá · tensorti.cl";

// Contenido interno del logo (sin la etiqueta <svg>, ni <title> ni <desc>).
const logo = (await readFile(new URL("../public/tensor-logo.svg", import.meta.url), "utf8"))
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<title[\s\S]*?<\/title>|<desc[\s\S]*?<\/desc>|<!--[\s\S]*?-->/g, "");

const fuente = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}">
  <rect width="100%" height="100%" fill="#1c1a4e"/>

  <!-- Trazas de circuito, igual que el hero del sitio -->
  <g fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2">
    <path d="M0 96 H250 L322 44 H640"/>
    <path d="M640 44 H900 V160 H1200"/>
    <path d="M0 540 H170 L240 600 H500 L570 540 H860"/>
    <path d="M860 540 H1060 V420 H1200"/>
  </g>
  <g fill="#b55d44" opacity="0.75">
    <circle cx="640" cy="44" r="6"/>
    <circle cx="900" cy="160" r="6"/>
    <circle cx="250" cy="96" r="6"/>
    <circle cx="860" cy="540" r="6"/>
  </g>

  <!-- Logo en cajón blanco -->
  <rect x="96" y="175" width="280" height="280" rx="36" fill="#ffffff"/>
  <svg x="141" y="216" width="190" height="200" viewBox="0 0 1024 1080">${logo}</svg>

  <!-- Textos -->
  <text x="436" y="270" font-family="${fuente}" font-size="96" font-weight="700" fill="#ffffff" letter-spacing="-2">Tensor<tspan fill="#d88466" dx="18">TI</tspan></text>
  <text font-family="${fuente}" font-size="38" fill="rgba(255,255,255,0.88)">
    <tspan x="440" y="340">${BAJADA[0]}</tspan>
    <tspan x="440" y="388">${BAJADA[1]}</tspan>
  </text>
  <rect x="440" y="430" width="64" height="4" fill="#d88466"/>
  <text x="440" y="482" font-family="${fuente}" font-size="28" fill="#d88466" letter-spacing="1">${PIE}</text>
</svg>`;

const destino = new URL("../public/og-tensorti.png", import.meta.url);
const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(destino, png);
console.log(`Imagen generada: public/og-tensorti.png (${(png.length / 1024).toFixed(0)} KB) · ${NOMBRE}`);
