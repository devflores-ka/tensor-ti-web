import type { APIRoute } from "astro";

// Se genera en el build para que la URL del sitemap use siempre el dominio configurado.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site).href;
  const cuerpo = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
