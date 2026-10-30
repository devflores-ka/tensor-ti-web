// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio: la usan canonical, Open Graph, sitemap y datos estructurados.
  site: 'https://tensorti.cl',

  // Cloudflare sirve /servicios (sin barra final) cuando existe servicios.html.
  // Con format "file" + trailingSlash "never" todas las URLs (enlaces, canonical,
  // sitemap) quedan sin barra final y coinciden con lo que sirve Cloudflare.
  trailingSlash: 'never',
  build: { format: 'file' },

  integrations: [
    sitemap({
      // La página 404 no debe estar en el sitemap.
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
