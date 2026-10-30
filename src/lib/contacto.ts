import { site } from "../data/site";

export const mensajeBase = "Hola, quisiera cotizar un servicio con Tensor TI.";

/** Enlace a WhatsApp, o null si no hay número configurado. */
export function whatsappUrl(texto: string = mensajeBase): string | null {
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`
    : null;
}

export function mailtoUrl(asunto = "Consulta desde tensorti.cl", cuerpo = ""): string {
  const base = `mailto:${site.email}?subject=${encodeURIComponent(asunto)}`;
  return cuerpo ? `${base}&body=${encodeURIComponent(cuerpo)}` : base;
}

/** Enlace a /contacto con datos prellenados (servicio, plan, detalle). */
export function contactoUrl(params: Record<string, string | undefined> = {}): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) q.set(k, v);
  const qs = q.toString();
  return qs ? `/contacto?${qs}` : "/contacto";
}
