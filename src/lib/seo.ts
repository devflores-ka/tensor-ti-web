import { site } from "../data/site";

type Ld = Record<string, unknown>;

export const idOrganizacion = (origen: URL) => new URL("/#organizacion", origen).href;

const zonas = [
  { "@type": "AdministrativeArea", name: "Región de Tarapacá" },
  { "@type": "City", name: "Pozo Almonte" },
  { "@type": "City", name: "Iquique" },
];

/**
 * Datos de la empresa. No se publica la dirección exacta: solo comuna y región.
 */
export function organizacionLd(origen: URL): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": idOrganizacion(origen),
    name: site.nombre,
    legalName: site.razonSocial,
    url: new URL("/", origen).href,
    logo: new URL("/tensor-logo.svg", origen).href,
    image: new URL(site.ogImage, origen).href,
    description: site.descripcion,
    email: site.email,
    telephone: site.telefonoLink,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pozo Almonte",
      addressRegion: "Tarapacá",
      addressCountry: "CL",
    },
    areaServed: zonas,
  };
}

export function breadcrumbLd(items: { nombre: string; ruta: string }[], origen: URL): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      item: new URL(it.ruta, origen).href,
    })),
  };
}

export function servicioLd(
  s: { nombre: string; descripcion: string; ruta: string },
  origen: URL,
): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nombre,
    description: s.descripcion,
    url: new URL(s.ruta, origen).href,
    provider: { "@id": idOrganizacion(origen) },
    areaServed: zonas,
  };
}
