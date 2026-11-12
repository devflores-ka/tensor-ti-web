// Proyectos realizados. Cada entrada genera una tarjeta en la sección "Proyectos"
// (inicio y /nosotros). Para sumar un proyecto, agrega un objeto al arreglo.
//
// - `enlaces`: solo se muestran los que tengan URL. Si el cliente no autoriza
//   publicar enlaces, deja el arreglo vacío y se muestran solo las plataformas.
// - `cliente`: déjalo vacío si el cliente no autoriza mostrar su nombre.

export type Proyecto = {
  nombre: string;
  /** Tipo de trabajo, en pocas palabras (aparece como etiqueta). */
  tipo: string;
  /** Nombre del cliente, si se puede publicar. */
  cliente?: string;
  descripcion: string;
  /** Dónde está disponible o en qué se usa (texto, sin enlace). */
  plataformas: string[];
  enlaces: { etiqueta: string; url: string }[];
  /** Slug del servicio relacionado (enlace a su página). */
  servicio?: string;
};

export const proyectos: Proyecto[] = [
  {
    nombre: "Perdiem",
    tipo: "App móvil y web",
    descripcion:
      "Aplicación desarrollada a medida para un cliente. Hicimos el diseño, el desarrollo y la publicación en las tiendas de aplicaciones, además de su versión web.",
    plataformas: ["Google Play", "App Store", "Web"],
    // PENDIENTE: agregar las URL públicas, por ejemplo:
    // { etiqueta: "Google Play", url: "https://play.google.com/store/apps/details?id=..." },
    // { etiqueta: "App Store", url: "https://apps.apple.com/cl/app/..." },
    // { etiqueta: "Sitio web", url: "https://..." },
    enlaces: [],
    servicio: "desarrollo-software",
  },
];
