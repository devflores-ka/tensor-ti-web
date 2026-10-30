// Configuración del cotizador de /precios.
//
// Aquí viven las categorías, las preguntas y los precios. La interfaz
// (src/components/Cotizador.astro) y el cálculo (src/lib/cotizador.ts) no
// contienen ningún precio: todo sale de este archivo y de src/data/planes.ts.
//
// CÓMO FUNCIONAN LOS PRECIOS
//  - `uf: 1.5`        → suma 1,5 UF a la estimación cuando se elige esa opción.
//  - `uf: null`       → la opción afecta el precio, pero se cotiza según el caso:
//                       aparece en "Se cotiza según tu caso", sin monto.
//  - `uf` sin definir → dato informativo: no afecta el precio, solo se envía en la
//                       solicitud para dimensionar la cotización.
//  - En preguntas numéricas, `ufPorUnidad` funciona igual (número, null o sin definir).
//
// Hoy solo están definidos los precios base de los planes (en planes.ts). Todo lo
// demás queda como "se cotiza según tu caso" hasta que definas valores reales: basta
// con reemplazar `null` por un número y la estimación se actualiza sola.

import { planes } from "./planes";

export type Opcion = {
  valor: string;
  etiqueta: string;
  uf?: number | null;
  ayuda?: string;
};

type Base = { id: string; etiqueta: string; ayuda?: string };

export type Pregunta =
  | (Base & { tipo: "opciones"; opciones: Opcion[] })
  | (Base & { tipo: "multiple"; opciones: Opcion[] })
  | (Base & { tipo: "numero"; min: number; max?: number; ufPorUnidad?: number | null });

export type Categoria = {
  id: string;
  nombre: string;
  /** Slug del servicio al que corresponde (para prellenar el formulario). */
  servicio: string;
  /** "mensual" muestra "Desde X UF/mes"; "proyecto" muestra "Cotización a medida". */
  precio: "mensual" | "proyecto";
  descripcion: string;
  preguntas: Pregunta[];
  incluye: string[];
  exclusiones: string[];
};

const ubicacion = (conCosto: boolean): Pregunta => ({
  id: "ubicacion",
  tipo: "opciones",
  etiqueta: "Ubicación de las instalaciones",
  opciones: [
    { valor: "pozo-almonte", etiqueta: "Pozo Almonte" },
    { valor: "iquique", etiqueta: "Iquique" },
    { valor: "otra-tarapaca", etiqueta: "Otra comuna de Tarapacá", ...(conCosto && { uf: null }) },
    { valor: "fuera", etiqueta: "Fuera de la Región de Tarapacá", ...(conCosto && { uf: null }) },
  ],
});

const plazo: Pregunta = {
  id: "plazo",
  tipo: "opciones",
  etiqueta: "Plazo deseado",
  opciones: [
    { valor: "urgente", etiqueta: "Lo antes posible" },
    { valor: "un-mes", etiqueta: "Dentro de un mes" },
    { valor: "sin-urgencia", etiqueta: "Sin urgencia" },
  ],
};

export const categorias: Categoria[] = [
  {
    id: "soporte-ti",
    nombre: "Soporte TI mensual",
    servicio: "soporte-ti",
    precio: "mensual",
    descripcion:
      "Arma tu plan de soporte externo. La estimación parte del precio base del plan y muestra qué se cotiza aparte.",
    preguntas: [
      {
        id: "plan",
        tipo: "opciones",
        etiqueta: "Plan",
        opciones: planes.map((p) => ({
          valor: p.id,
          etiqueta: `Plan ${p.nombre}`,
          uf: p.desdeUF,
          ayuda: p.resumen,
        })),
      },
      { id: "equipos", tipo: "numero", etiqueta: "Cantidad de equipos (aprox.)", min: 0 },
      { id: "usuarios", tipo: "numero", etiqueta: "Cantidad de usuarios (aprox.)", min: 0 },
      {
        id: "modalidad",
        tipo: "opciones",
        etiqueta: "Modalidad de atención",
        opciones: [
          { valor: "remota", etiqueta: "Remota" },
          { valor: "mixta", etiqueta: "Mixta (remota y presencial)" },
          { valor: "presencial", etiqueta: "Principalmente presencial" },
        ],
      },
      {
        id: "visitas",
        tipo: "opciones",
        etiqueta: "Visitas programadas a terreno",
        opciones: [
          { valor: "ninguna", etiqueta: "Ninguna, solo atención remota" },
          { valor: "1-mes", etiqueta: "1 visita al mes", uf: null },
          { valor: "2-mes", etiqueta: "2 visitas al mes", uf: null },
          { valor: "semanal", etiqueta: "1 visita por semana", uf: null },
          { valor: "necesidad", etiqueta: "Según necesidad", uf: null },
        ],
      },
      ubicacion(true),
      {
        id: "horario",
        tipo: "opciones",
        etiqueta: "Horario de atención",
        opciones: [
          { valor: "habil", etiqueta: "Horario hábil" },
          { valor: "extendido", etiqueta: "Extendido o fines de semana", uf: null },
        ],
      },
      {
        id: "adicionales",
        tipo: "multiple",
        etiqueta: "Servicios adicionales",
        ayuda: "Opcional. Se cotizan por separado.",
        opciones: [
          { valor: "repuestos", etiqueta: "Repuestos y equipos nuevos", uf: null },
          { valor: "licencias", etiqueta: "Licencias de software", uf: null },
          { valor: "proyecto", etiqueta: "Proyecto de red o CCTV", uf: null },
        ],
      },
    ],
    incluye: [
      "Asistencia remota y resolución de incidencias, según el plan.",
      "Visitas programadas, mantención preventiva y seguimiento, según el plan.",
      "Registro de las incidencias atendidas.",
    ],
    exclusiones: [
      "No es un servicio ilimitado: equipos o usuarios, horas, visitas, horarios y cobertura se acuerdan por escrito.",
      "Desplazamientos extraordinarios, repuestos y trabajos adicionales se cotizan por separado.",
      "Los valores se expresan en UF por mes.",
    ],
  },
  {
    id: "redes",
    nombre: "Redes y cableado",
    servicio: "redes",
    precio: "proyecto",
    descripcion:
      "Cuéntanos qué red necesitas y te preparamos una cotización a medida después de un levantamiento.",
    preguntas: [
      {
        id: "trabajo",
        tipo: "multiple",
        etiqueta: "Tipo de trabajo",
        opciones: [
          { valor: "cableado-nuevo", etiqueta: "Cableado estructurado nuevo" },
          { valor: "ampliacion", etiqueta: "Ampliación de una red existente" },
          { valor: "fibra", etiqueta: "Fibra óptica" },
          { valor: "inalambrico", etiqueta: "Enlace inalámbrico entre sedes" },
          { valor: "wifi", etiqueta: "Configuración de Wi-Fi" },
          { valor: "diagnostico", etiqueta: "Diagnóstico o reparación de una red" },
        ],
      },
      { id: "puntos", tipo: "numero", etiqueta: "Puntos de red (aprox.)", min: 0 },
      { id: "sedes", tipo: "numero", etiqueta: "Edificios o sedes", min: 0 },
      {
        id: "canalizacion",
        tipo: "opciones",
        etiqueta: "Canalización existente",
        opciones: [
          { valor: "existe", etiqueta: "Ya existe" },
          { valor: "no-existe", etiqueta: "No existe" },
          { valor: "no-se", etiqueta: "No lo sé" },
        ],
      },
      ubicacion(false),
      plazo,
    ],
    incluye: [
      "Levantamiento del lugar y propuesta de solución.",
      "Instalación y puesta en marcha según lo cotizado.",
      "Entrega del detalle de lo instalado.",
    ],
    exclusiones: [
      "Equipos y materiales se cotizan según el proyecto.",
      "Obras de construcción mayores y sus permisos.",
      "El precio final se define tras el levantamiento.",
    ],
  },
  {
    id: "cctv",
    nombre: "CCTV y control de acceso",
    servicio: "cctv-control-acceso",
    precio: "proyecto",
    descripcion:
      "Indica qué quieres cubrir y recibe una cotización a medida del sistema.",
    preguntas: [
      {
        id: "sistema",
        tipo: "multiple",
        etiqueta: "Qué necesitas",
        opciones: [
          { valor: "cctv-nuevo", etiqueta: "CCTV nuevo" },
          { valor: "cctv-ampliar", etiqueta: "Ampliar un CCTV existente" },
          { valor: "acceso", etiqueta: "Control de acceso" },
          { valor: "mantencion", etiqueta: "Mantención de un sistema existente" },
        ],
      },
      { id: "camaras", tipo: "numero", etiqueta: "Cámaras (aprox.)", min: 0 },
      { id: "puertas", tipo: "numero", etiqueta: "Puertas o accesos a controlar", min: 0 },
      {
        id: "ambiente",
        tipo: "opciones",
        etiqueta: "Ambiente de instalación",
        opciones: [
          { valor: "interior", etiqueta: "Interior" },
          { valor: "exterior", etiqueta: "Exterior" },
          { valor: "ambos", etiqueta: "Interior y exterior" },
        ],
      },
      {
        id: "imagenes",
        tipo: "opciones",
        etiqueta: "Acceso a las imágenes",
        opciones: [
          { valor: "local", etiqueta: "Solo en el lugar" },
          { valor: "remoto", etiqueta: "También de forma remota" },
          { valor: "no-se", etiqueta: "No lo sé" },
        ],
      },
      ubicacion(false),
      plazo,
    ],
    incluye: [
      "Evaluación del sitio y propuesta del sistema.",
      "Instalación, configuración y puesta en marcha según lo cotizado.",
    ],
    exclusiones: [
      "Cámaras, grabadores, lectores y cerraduras se cotizan según el proyecto.",
      "Monitoreo permanente o guardias no están incluidos.",
      "El precio final se define tras la evaluación del sitio.",
    ],
  },
  {
    id: "mantencion",
    nombre: "Mantención y montaje de equipos",
    servicio: "mantencion-informatica",
    precio: "proyecto",
    descripcion:
      "Para parques de computadores: dinos cuántos equipos son y qué necesitas, y te cotizamos el trabajo en volumen.",
    preguntas: [
      {
        id: "trabajo",
        tipo: "multiple",
        etiqueta: "Qué necesitas",
        opciones: [
          { valor: "preventiva", etiqueta: "Mantención preventiva" },
          { valor: "correctiva", etiqueta: "Mantención correctiva o reparación" },
          { valor: "montaje", etiqueta: "Montaje de puestos de trabajo" },
        ],
      },
      { id: "equipos", tipo: "numero", etiqueta: "Cantidad de equipos (aprox.)", min: 0 },
      { id: "sedes", tipo: "numero", etiqueta: "Edificios o sedes", min: 0 },
      {
        id: "tipos",
        tipo: "multiple",
        etiqueta: "Tipo de equipos",
        opciones: [
          { valor: "escritorio", etiqueta: "Computadores de escritorio" },
          { valor: "notebook", etiqueta: "Notebooks" },
          { valor: "perifericos", etiqueta: "Impresoras y periféricos" },
        ],
      },
      {
        id: "repuestos",
        tipo: "opciones",
        etiqueta: "Repuestos y equipos nuevos",
        opciones: [
          { valor: "nosotros", etiqueta: "Los aporta Tensor TI" },
          { valor: "cliente", etiqueta: "Los aporta el cliente" },
          { valor: "no-se", etiqueta: "No lo sé aún" },
        ],
      },
      ubicacion(false),
      plazo,
    ],
    incluye: [
      "Plan de intervención por lotes y áreas.",
      "Trabajo en terreno y registro de lo realizado en cada equipo.",
    ],
    exclusiones: [
      "Repuestos y equipos nuevos se cotizan según necesidad.",
      "Traslados fuera de la cobertura acordada.",
      "El precio final depende de la cantidad y el estado de los equipos.",
    ],
  },
  {
    id: "auditoria",
    nombre: "Auditoría informática",
    servicio: "auditoria-informatica",
    precio: "proyecto",
    descripcion:
      "Define qué quieres revisar y cotizamos el diagnóstico según el tamaño de tu operación.",
    preguntas: [
      {
        id: "alcance",
        tipo: "multiple",
        etiqueta: "Qué quieres revisar",
        opciones: [
          { valor: "equipos", etiqueta: "Equipos y software" },
          { valor: "red", etiqueta: "Red" },
          { valor: "respaldos", etiqueta: "Respaldos y seguridad básica" },
        ],
      },
      { id: "equipos", tipo: "numero", etiqueta: "Cantidad de equipos (aprox.)", min: 0 },
      { id: "sedes", tipo: "numero", etiqueta: "Edificios o sedes", min: 0 },
      ubicacion(false),
      plazo,
    ],
    incluye: [
      "Levantamiento de lo seleccionado.",
      "Informe de hallazgos ordenado por prioridad y recomendaciones.",
    ],
    exclusiones: [
      "La implementación de mejoras se cotiza por separado.",
      "No incluye auditorías de cumplimiento normativo ni certificaciones.",
      "El precio final depende del alcance y el tamaño.",
    ],
  },
];
