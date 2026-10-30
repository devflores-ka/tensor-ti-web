// Planes de soporte TI mensual.
//
// Este archivo es la ÚNICA fuente de los planes: lo usan la página
// /servicios/soporte-ti, la sección de precios y el cotizador.
//
// Los precios "desde" son referenciales. Los límites de cada plan (equipos,
// usuarios, horas, visitas, horario y cobertura) todavía no están definidos:
// quedan en `null` y la web NO muestra ninguna cifra inventada. Cuando definas un
// límite, escríbelo como texto (ej. "Hasta 10 equipos") y aparecerá solo en el
// plan correspondiente.

export const planesConfig = {
  /** false = oculta los precios y los reemplaza por "Cotiza tu plan". */
  mostrarPrecios: true,
  unidad: "UF/mes",
  notaPrecios:
    "Valores referenciales desde los cuales se arma tu cotización. No son servicios ilimitados: los límites de cada plan se detallan por escrito en la cotización.",
};

export type Limites = {
  equipos: string | null;
  usuarios: string | null;
  horas: string | null;
  visitas: string | null;
  horario: string | null;
  cobertura: string | null;
};

export type Plan = {
  id: "esencial" | "empresa" | "integral";
  nombre: string;
  desdeUF: number | null;
  resumen: string;
  incluye: string[];
  limites: Limites;
};

export const etiquetasLimites: Record<keyof Limites, string> = {
  equipos: "Equipos",
  usuarios: "Usuarios",
  horas: "Horas de atención",
  visitas: "Visitas incluidas",
  horario: "Horario",
  cobertura: "Cobertura",
};

const sinLimites: Limites = {
  equipos: null,
  usuarios: null,
  horas: null,
  visitas: null,
  horario: null,
  cobertura: null,
};

// La distribución de prestaciones por plan es una propuesta inicial: ajústala
// cuando definas la oferta comercial.
export const planes: Plan[] = [
  {
    id: "esencial",
    nombre: "Esencial",
    desdeUF: 2,
    resumen:
      "Para organizaciones pequeñas que necesitan resolver el día a día, principalmente a distancia.",
    incluye: [
      "Asistencia remota",
      "Resolución de incidencias de usuarios y equipos",
      "Registro de las incidencias atendidas",
    ],
    limites: { ...sinLimites },
  },
  {
    id: "empresa",
    nombre: "Empresa",
    desdeUF: 4,
    resumen:
      "Suma presencia en terreno y mantención preventiva para oficinas con más equipos.",
    incluye: [
      "Todo lo del plan Esencial",
      "Visitas programadas a terreno",
      "Mantención preventiva de equipos",
      "Soporte a usuarios y oficinas",
    ],
    limites: { ...sinLimites },
  },
  {
    id: "integral",
    nombre: "Integral",
    desdeUF: 6,
    resumen:
      "Para organizaciones que quieren un departamento de informática externo, con seguimiento.",
    incluye: [
      "Todo lo del plan Empresa",
      "Seguimiento de incidencias e informes",
      "Alcance de visitas y horarios ampliado, definido en la cotización",
    ],
    limites: { ...sinLimites },
  },
];

/** Lo que nunca está incluido en un plan y se cotiza por separado. */
export const adicionalesPlanes = [
  "Desplazamientos extraordinarios fuera de la cobertura acordada",
  "Repuestos y equipos nuevos",
  "Trabajos adicionales y proyectos (redes, CCTV, instalaciones)",
  "Atención fuera de las horas, visitas u horarios del plan",
];

export const getPlan = (id: string) => planes.find((p) => p.id === id);

export { formatoUF } from "../lib/formato";
