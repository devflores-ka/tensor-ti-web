import { site } from "../data/site";

type Ld = Record<string, unknown>;

export const idOrganizacion = (origen: URL) => new URL("/#organizacion", origen).href;

// En terreno: la región y sus comunas. A distancia (desarrollo, hosting): todo Chile.
const zonas = [
  { "@type": "AdministrativeArea", name: site.cobertura.region },
  ...site.cobertura.comunas.map((name) => ({ "@type": "City", name })),
  { "@type": "Country", name: "Chile" },
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.horario.dias,
        opens: site.horario.abre,
        closes: site.horario.cierra,
      },
    ],
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
