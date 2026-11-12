// Solicitud de cotización de /cotizar.
//
// Este módulo lo usan el formulario (validación en el navegador) y la Pages
// Function functions/api/cotizar.ts (validación en el servidor y armado del JSON),
// para que ambos lados apliquen exactamente las mismas reglas.
// No debe importar nada específico de Astro ni del navegador.

import { servicios } from "../data/servicios";

// ---------------------------------------------------------------------------
// Opciones del formulario
// ---------------------------------------------------------------------------

export const REGIONES = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén del General Carlos Ibáñez del Campo",
  "Magallanes y de la Antártica Chilena",
] as const;

export const PLAZOS = [
  { valor: "urgente", etiqueta: "Lo antes posible" },
  { valor: "2-semanas", etiqueta: "Dentro de 2 semanas" },
  { valor: "1-mes", etiqueta: "Dentro de 1 mes" },
  { valor: "1-3-meses", etiqueta: "Entre 1 y 3 meses" },
  { valor: "sin-fecha", etiqueta: "Sin fecha definida" },
] as const;

export const SERVICIO_OTRO = "otro";

export const opcionesServicio = [
  ...servicios.map((s) => ({ valor: s.slug, etiqueta: s.nombre })),
  { valor: SERVICIO_OTRO, etiqueta: "Otro o no estoy seguro" },
];

/**
 * Tipo de servicio del cotizador local (app/textos.py → TIPOS_SERVICIO), para que
 * al importar se pueda elegir la plantilla de textos correspondiente.
 */
const TIPO_COTIZADOR: Record<string, string> = {
  "soporte-ti": "soporte",
  "desarrollo-software": "desarrollo",
  "hosting-mantencion-web": "hosting",
  "venta-equipos-licencias": "equipos",
};

// ---------------------------------------------------------------------------
// Adjunto
// ---------------------------------------------------------------------------

export const ADJUNTO_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const ADJUNTO_MAX_TEXTO = "5 MB";
export const ADJUNTO_EXTENSIONES = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png", ".zip"];
const ADJUNTO_MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".zip": "application/zip",
};

export const extension = (nombre: string) => {
  const i = nombre.lastIndexOf(".");
  return i >= 0 ? nombre.slice(i).toLowerCase() : "";
};

export const mimeAdjunto = (nombre: string) => ADJUNTO_MIME[extension(nombre)] ?? "application/octet-stream";

export function errorAdjunto(nombre: string, bytes: number): string | null {
  if (!ADJUNTO_EXTENSIONES.includes(extension(nombre))) {
    return `Formato no permitido. Usa ${ADJUNTO_EXTENSIONES.join(", ")}.`;
  }
  if (bytes > ADJUNTO_MAX_BYTES) return `El archivo supera el máximo de ${ADJUNTO_MAX_TEXTO}.`;
  if (bytes === 0) return "El archivo está vacío.";
  return null;
}

// ---------------------------------------------------------------------------
// RUT (módulo 11), igual que app/utils.py del cotizador
// ---------------------------------------------------------------------------

export const limpiarRut = (rut: string) => rut.replace(/[^0-9kK]/g, "").toUpperCase();

export function rutValido(rut: string): boolean {
  const r = limpiarRut(rut);
  if (r.length < 2 || !/^\d+$/.test(r.slice(0, -1))) return false;
  let suma = 0;
  let mult = 2;
  for (const d of r.slice(0, -1).split("").reverse()) {
    suma += Number(d) * mult;
    mult = mult === 7 ? 2 : mult + 1;
  }
  const resto = 11 - (suma % 11);
  const dv = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === r.slice(-1);
}

export function formatearRut(rut: string): string {
  const r = limpiarRut(rut);
  if (r.length < 2) return rut.trim();
  const cuerpo = r.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${cuerpo}-${r.slice(-1)}`;
}

// ---------------------------------------------------------------------------
// Campos y validación
// ---------------------------------------------------------------------------

export type Campos = {
  nombre: string;
  organizacion: string;
  rut: string;
  email: string;
  telefono: string;
  region: string;
  comuna: string;
  servicio: string;
  descripcion: string;
  plazo: string;
  mercadoPublicoId: string;
  /** Datos que el cliente trae desde /precios o desde un plan (opcional, no editable). */
  resumen: string;
};

export const CAMPOS: (keyof Campos)[] = [
  "nombre",
  "organizacion",
  "rut",
  "email",
  "telefono",
  "region",
  "comuna",
  "servicio",
  "descripcion",
  "plazo",
  "mercadoPublicoId",
  "resumen",
];

/** Largo máximo de cada campo (también se usa como maxlength en el formulario). */
export const LARGO_MAX: Record<keyof Campos, number> = {
  nombre: 120,
  organizacion: 200,
  rut: 12,
  email: 200,
  telefono: 20,
  region: 60,
  comuna: 80,
  servicio: 60,
  descripcion: 4000,
  plazo: 20,
  mercadoPublicoId: 40,
  resumen: 2100,
};

const MP_ID = /^\d{1,10}-\d{1,6}-[A-Z0-9]{2,8}$/;

/** Devuelve un mensaje de error por campo; vacío si todo está bien. */
export function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const e: Partial<Record<keyof Campos, string>> = {};

  for (const k of CAMPOS) {
    if (c[k].length > LARGO_MAX[k]) e[k] = `Máximo ${LARGO_MAX[k]} caracteres.`;
  }

  if (!c.nombre) e.nombre ??= "Escribe tu nombre.";
  if (!c.organizacion) e.organizacion ??= "Escribe el nombre de la empresa u organismo.";
  if (c.rut && !rutValido(c.rut)) e.rut ??= "El RUT no es válido. Revisa el dígito verificador.";

  if (!c.email) e.email ??= "Escribe tu correo.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email ??= "Revisa el correo: parece incompleto.";

  const digitos = c.telefono.replace(/\D/g, "");
  if (!c.telefono) e.telefono ??= "Escribe un teléfono de contacto.";
  else if (digitos.length < 8 || digitos.length > 12) e.telefono ??= "Revisa el teléfono: por ejemplo, +56 9 1234 5678.";

  if (!REGIONES.includes(c.region as (typeof REGIONES)[number])) e.region ??= "Elige la región.";
  if (!c.comuna) e.comuna ??= "Escribe la comuna.";

  if (!opcionesServicio.some((o) => o.valor === c.servicio)) e.servicio ??= "Elige el tipo de servicio.";
  if (c.descripcion.length < 20) e.descripcion ??= "Cuéntanos un poco más (al menos 20 caracteres).";
  if (!PLAZOS.some((p) => p.valor === c.plazo)) e.plazo ??= "Elige un plazo.";

  if (c.mercadoPublicoId && !MP_ID.test(c.mercadoPublicoId.toUpperCase())) {
    e.mercadoPublicoId ??= "Revisa el ID: por ejemplo, 1098710-227-COT26.";
  }
  return e;
}

/** Lee y normaliza los campos desde un FormData (navegador o servidor). */
export function leerCampos(fd: FormData): Campos {
  const txt = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v.normalize("NFC").trim() : "";
  };
  return {
    nombre: txt("nombre"),
    organizacion: txt("organizacion"),
    rut: txt("rut"),
    email: txt("email").toLowerCase(),
    telefono: txt("telefono"),
    region: txt("region"),
    comuna: txt("comuna"),
    servicio: txt("servicio"),
    descripcion: txt("descripcion"),
    plazo: txt("plazo"),
    mercadoPublicoId: txt("mercadoPublicoId").toUpperCase(),
    resumen: txt("resumen"),
  };
}

// ---------------------------------------------------------------------------
// JSON para el cotizador local
// ---------------------------------------------------------------------------
//
// Los nombres de los campos siguen los modelos del cotizador (app/models.py):
//  - `cliente`    → tabla clientes (Cliente)
//  - `cotizacion` → tabla cotizaciones (Cotizacion), siempre en estado "borrador"
//  - `secciones`  → secciones_cotizacion (SeccionCotizacion)
// El número (TTI-AAAA-NNN) NO viene en el archivo: lo asigna el cotizador al importar.
// `lineas` va vacío: los ítems y precios se arman en el cotizador.

export const FORMATO_JSON = "tensorti.solicitud";
export const VERSION_JSON = 1;

export type SolicitudJson = {
  formato: typeof FORMATO_JSON;
  version: typeof VERSION_JSON;
  folio: string;
  recibida: string;
  origen: string;
  cliente: {
    nombre: string;
    rut: string;
    unidad_compra: string;
    contacto: string;
    cargo_contacto: string;
    correo: string;
    telefono: string;
    direccion: string;
    notas: string;
  };
  cotizacion: {
    estado: "borrador";
    fecha: string;
    mercado_publico_id: string;
    nombre_proceso: string;
    monto_maximo: null;
    tipo_servicio: string;
    lineas: [];
    secciones: { clave: string; titulo: string; contenido: string; orden: number; incluir: boolean }[];
  };
  solicitud: {
    servicio: string;
    servicio_nombre: string;
    region: string;
    comuna: string;
    plazo: string;
    plazo_texto: string;
    adjunto: { nombre: string; tipo: string; bytes: number } | null;
  };
};

export function nombreServicio(slug: string): string {
  return opcionesServicio.find((o) => o.valor === slug)?.etiqueta ?? slug;
}

export function textoPlazo(valor: string): string {
  return PLAZOS.find((p) => p.valor === valor)?.etiqueta ?? valor;
}

export function armarJson(
  c: Campos,
  extra: {
    folio: string;
    recibida: Date;
    origen: string;
    adjunto: { nombre: string; tipo: string; bytes: number } | null;
  },
): SolicitudJson {
  const servicioNombre = nombreServicio(c.servicio);
  const plazoTexto = textoPlazo(c.plazo);
  // Fecha local de Chile (AAAA-MM-DD), que es la que usa el cotizador.
  const fecha = extra.recibida.toLocaleDateString("en-CA", { timeZone: "America/Santiago" });

  const datos = [
    `- **Servicio solicitado:** ${servicioNombre}`,
    `- **Plazo deseado:** ${plazoTexto}`,
    `- **Ubicación:** ${c.comuna}, Región de ${c.region}`,
  ];
  if (extra.adjunto) datos.push(`- **Adjunto:** ${extra.adjunto.nombre} (llegó en el correo)`);
  const resumen = c.resumen ? `\n\n**Datos traídos desde el sitio:**\n\n${c.resumen}` : "";
  const requerimiento = `${c.descripcion}\n\n${datos.join("\n")}${resumen}`;

  return {
    formato: FORMATO_JSON,
    version: VERSION_JSON,
    folio: extra.folio,
    recibida: extra.recibida.toISOString(),
    origen: extra.origen,
    cliente: {
      nombre: c.organizacion,
      rut: c.rut ? formatearRut(c.rut) : "",
      unidad_compra: "",
      contacto: c.nombre,
      cargo_contacto: "",
      correo: c.email,
      telefono: c.telefono,
      direccion: `${c.comuna}, Región de ${c.region}`,
      notas: `Solicitud recibida desde el sitio web (${extra.folio}).`,
    },
    cotizacion: {
      estado: "borrador",
      fecha,
      mercado_publico_id: c.mercadoPublicoId,
      nombre_proceso: servicioNombre,
      monto_maximo: null,
      tipo_servicio: TIPO_COTIZADOR[c.servicio] ?? "general",
      lineas: [],
      secciones: [
        {
          // Sección de referencia interna: no se incluye en el PDF por defecto.
          clave: "requerimiento_web",
          titulo: "Requerimiento del cliente",
          contenido: requerimiento,
          orden: 0,
          incluir: false,
        },
      ],
    },
    solicitud: {
      servicio: c.servicio,
      servicio_nombre: servicioNombre,
      region: c.region,
      comuna: c.comuna,
      plazo: c.plazo,
      plazo_texto: plazoTexto,
      adjunto: extra.adjunto,
    },
  };
}
