// Cloudflare Pages Function: POST /api/cotizar
//
// Recibe el formulario de /cotizar, lo valida (mismas reglas que el navegador),
// verifica Cloudflare Turnstile y envía la solicitud por correo con SMTP2GO,
// con dos adjuntos: el JSON para importar en el cotizador local y el archivo
// que haya subido el cliente (opcional).
//
// VARIABLES (Cloudflare → Workers y Pages → tensor-ti-web → Configuración →
// Variables y secretos). Para probar en local, en el archivo .dev.vars:
//   TURNSTILE_SECRET_KEY  (secreto) clave secreta del widget de Turnstile
//   SMTP2GO_API_KEY       (secreto) API key de SMTP2GO con permiso "Emails"
//   CORREO_DESTINO        opcional, por defecto contacto@tensorti.cl
//   CORREO_REMITENTE      opcional, por defecto "Sitio web Tensor TI <web@tensorti.cl>"
//                         (el dominio debe estar verificado en SMTP2GO)
//   MODO_PRUEBA           solo en local: "1" no envía el correo, lo muestra en consola
//
// BINDING OPCIONAL (Configuración → Enlaces → KV namespace):
//   SOLICITUDES           si existe, guarda también el JSON de cada solicitud
//                         (clave = folio). Si no existe, el JSON llega solo por correo.

import {
  ADJUNTO_MAX_BYTES,
  armarJson,
  errorAdjunto,
  formatearRut,
  leerCampos,
  mimeAdjunto,
  nombreServicio,
  textoPlazo,
  validar,
  type Campos,
} from "../../src/lib/solicitud";

interface KV {
  put(key: string, value: string, options?: { metadata?: unknown }): Promise<void>;
}

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  SMTP2GO_API_KEY?: string;
  CORREO_DESTINO?: string;
  CORREO_REMITENTE?: string;
  MODO_PRUEBA?: string;
  SOLICITUDES?: KV;
}

type Contexto = { request: Request; env: Env };

const DESTINO = "contacto@tensorti.cl";
const REMITENTE = "Sitio web Tensor TI <web@tensorti.cl>";
// Margen para los campos de texto y la codificación multipart, además del adjunto.
const MAX_CUERPO = ADJUNTO_MAX_BYTES + 256 * 1024;

type Falla = { codigo: string; mensaje: string; estado: number; errores?: Record<string, string> };

// ---------------------------------------------------------------------------

export async function onRequestPost({ request, env }: Contexto): Promise<Response> {
  const quiereJson = (request.headers.get("Accept") ?? "").includes("application/json");
  try {
    const folio = await procesar(request, env);
    return quiereJson
      ? json({ ok: true, folio })
      : Response.redirect(new URL(`/cotizar/enviado?folio=${folio}`, request.url).href, 303);
  } catch (e) {
    const f: Falla = esFalla(e)
      ? e
      : { codigo: "interno", mensaje: "Ocurrió un error inesperado.", estado: 500 };
    if (!esFalla(e)) console.error("Error en /api/cotizar:", e);
    return quiereJson
      ? json({ ok: false, codigo: f.codigo, mensaje: f.mensaje, errores: f.errores ?? {} }, f.estado)
      : Response.redirect(new URL(`/cotizar?error=${f.codigo}`, request.url).href, 303);
  }
}

// ---------------------------------------------------------------------------

async function procesar(request: Request, env: Env): Promise<string> {
  const largo = Number(request.headers.get("Content-Length") ?? 0);
  if (largo > MAX_CUERPO) {
    throw falla("tamano", "El envío es demasiado grande. El adjunto puede pesar hasta 5 MB.", 413);
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    throw falla("formato", "No pudimos leer el formulario.", 400);
  }

  const folio = nuevoFolio(new Date());

  // Honeypot: un bot lo completó. Respondemos como si todo hubiera salido bien,
  // pero no enviamos nada.
  const trampa = fd.get("sitio_web");
  if (typeof trampa === "string" && trampa.trim() !== "") return folio;

  await verificarTurnstile(fd.get("cf-turnstile-response"), request, env);

  const campos = leerCampos(fd);
  const errores = validar(campos) as Record<string, string>;

  const archivo = fd.get("adjunto");
  let adjunto: { nombre: string; tipo: string; bytes: number; base64: string } | null = null;
  if (archivo && typeof archivo !== "string" && archivo.size > 0) {
    const nombre = limpiarNombreArchivo(archivo.name);
    const error = errorAdjunto(nombre, archivo.size);
    if (error) errores.adjunto = error;
    else {
      adjunto = {
        nombre,
        tipo: mimeAdjunto(nombre),
        bytes: archivo.size,
        base64: aBase64(new Uint8Array(await archivo.arrayBuffer())),
      };
    }
  }

  if (Object.keys(errores).length > 0) {
    throw { ...falla("validacion", "Revisa los campos marcados.", 422), errores };
  }

  const recibida = new Date();
  const datos = armarJson(campos, {
    folio,
    recibida,
    origen: new URL(request.url).origin + "/cotizar",
    adjunto: adjunto && { nombre: adjunto.nombre, tipo: adjunto.tipo, bytes: adjunto.bytes },
  });
  const textoJson = JSON.stringify(datos, null, 2);
  if (env.MODO_PRUEBA === "1") console.log(`[MODO_PRUEBA] ${folio}.json:\n${textoJson}`);

  // Copia en KV (opcional). Si falla, igual se envía el correo.
  if (env.SOLICITUDES) {
    try {
      await env.SOLICITUDES.put(folio, textoJson, {
        metadata: { organizacion: campos.organizacion, servicio: campos.servicio, recibida: datos.recibida },
      });
    } catch (e) {
      console.error("No se pudo guardar en KV:", e);
    }
  }

  await enviarCorreo(env, {
    asunto: `Solicitud de cotización ${folio}: ${nombreServicio(campos.servicio)} · ${campos.organizacion}`,
    responderA: campos.email,
    texto: cuerpoTexto(campos, folio, adjunto?.nombre),
    html: cuerpoHtml(campos, folio, adjunto?.nombre),
    adjuntos: [
      { filename: `${folio}.json`, fileblob: aBase64(new TextEncoder().encode(textoJson)), mimetype: "application/json" },
      ...(adjunto ? [{ filename: adjunto.nombre, fileblob: adjunto.base64, mimetype: adjunto.tipo }] : []),
    ],
  });

  return folio;
}

// ---------------------------------------------------------------------------
// Turnstile
// ---------------------------------------------------------------------------

async function verificarTurnstile(token: FormDataEntryValue | null, request: Request, env: Env) {
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error("Falta la variable TURNSTILE_SECRET_KEY.");
    throw falla("configuracion", "El formulario no está disponible en este momento.", 503);
  }
  if (typeof token !== "string" || token === "") {
    throw falla("verificacion", "Completa la verificación antes de enviar.", 400);
  }
  const cuerpo = new FormData();
  cuerpo.append("secret", env.TURNSTILE_SECRET_KEY);
  cuerpo.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) cuerpo.append("remoteip", ip);

  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: cuerpo,
  });
  const resultado = (await r.json().catch(() => ({}))) as { success?: boolean; "error-codes"?: string[] };
  if (!resultado.success) {
    console.warn("Turnstile rechazó el envío:", resultado["error-codes"]);
    throw falla("verificacion", "No pudimos verificar el envío. Recarga la página e inténtalo de nuevo.", 400);
  }
}

// ---------------------------------------------------------------------------
// Correo (SMTP2GO, API HTTP: https://developers.smtp2go.com/reference/send-standard-email)
// ---------------------------------------------------------------------------

type Correo = {
  asunto: string;
  responderA: string;
  texto: string;
  html: string;
  adjuntos: { filename: string; fileblob: string; mimetype: string }[];
};

async function enviarCorreo(env: Env, c: Correo) {
  const destino = env.CORREO_DESTINO || DESTINO;
  const remitente = env.CORREO_REMITENTE || REMITENTE;

  if (env.MODO_PRUEBA === "1") {
    console.log("[MODO_PRUEBA] Correo no enviado:", {
      de: remitente,
      para: destino,
      responderA: c.responderA,
      asunto: c.asunto,
      adjuntos: c.adjuntos.map((a) => `${a.filename} (${a.mimetype})`),
    });
    console.log(c.texto);
    return;
  }

  if (!env.SMTP2GO_API_KEY) {
    console.error("Falta la variable SMTP2GO_API_KEY.");
    throw falla("configuracion", "El formulario no está disponible en este momento.", 503);
  }

  const r = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Smtp2go-Api-Key": env.SMTP2GO_API_KEY,
    },
    body: JSON.stringify({
      sender: remitente,
      to: [destino],
      subject: c.asunto,
      text_body: c.texto,
      html_body: c.html,
      custom_headers: [{ header: "Reply-To", value: c.responderA }],
      attachments: c.adjuntos,
    }),
  });
  const resultado = (await r.json().catch(() => ({}))) as { data?: { succeeded?: number; error?: string } };
  if (!r.ok || resultado.data?.succeeded !== 1) {
    console.error("SMTP2GO rechazó el envío:", r.status, JSON.stringify(resultado));
    throw falla("envio", "No pudimos enviar tu solicitud.", 502);
  }
}

const FILAS = (c: Campos): [string, string][] => [
  ["Nombre", c.nombre],
  ["Empresa u organismo", c.organizacion],
  ["RUT", c.rut ? formatearRut(c.rut) : "No informado"],
  ["Correo", c.email],
  ["Teléfono", c.telefono],
  ["Ubicación", `${c.comuna}, Región de ${c.region}`],
  ["Servicio", nombreServicio(c.servicio)],
  ["Plazo deseado", textoPlazo(c.plazo)],
  ["ID Mercado Público", c.mercadoPublicoId || "No informado"],
];

function cuerpoTexto(c: Campos, folio: string, adjunto?: string): string {
  return [
    `Nueva solicitud de cotización desde tensorti.cl (${folio})`,
    "",
    ...FILAS(c).map(([k, v]) => `${k}: ${v}`),
    `Adjunto: ${adjunto ?? "Sin adjunto"}`,
    "",
    "Requerimiento:",
    c.descripcion,
    "",
    ...(c.resumen ? ["Datos traídos desde el sitio:", c.resumen, ""] : []),
    `El archivo ${folio}.json se puede importar en el cotizador como borrador.`,
    "Puedes responder este correo para escribirle directamente al cliente.",
  ].join("\n");
}

function cuerpoHtml(c: Campos, folio: string, adjunto?: string): string {
  const filas = [...FILAS(c), ["Adjunto", adjunto ?? "Sin adjunto"]]
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;color:#5b5b73;font-weight:600;vertical-align:top">${esc(k)}</th><td style="padding:6px 0">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html lang="es"><body style="font-family:Segoe UI,Arial,sans-serif;color:#16153a;line-height:1.5">
<p style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#9a4a33;margin:0">Solicitud de cotización · ${esc(folio)}</p>
<h1 style="font-size:20px;margin:6px 0 16px">${esc(nombreServicio(c.servicio))} · ${esc(c.organizacion)}</h1>
<table cellspacing="0" cellpadding="0" style="font-size:14px;border-collapse:collapse">${filas}</table>
<h2 style="font-size:16px;margin:20px 0 6px">Requerimiento</h2>
<p style="white-space:pre-wrap;margin:0;font-size:14px">${esc(c.descripcion)}</p>
${c.resumen ? `<h2 style="font-size:16px;margin:20px 0 6px">Datos traídos desde el sitio</h2><p style="white-space:pre-wrap;margin:0;font-size:14px">${esc(c.resumen)}</p>` : ""}
<p style="font-size:13px;color:#5b5b73;margin-top:24px">El archivo <strong>${esc(folio)}.json</strong> se puede importar en el cotizador como borrador. Responde este correo para escribirle directamente al cliente.</p>
</body></html>`;
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function falla(codigo: string, mensaje: string, estado: number): Falla {
  return { codigo, mensaje, estado };
}

function esFalla(e: unknown): e is Falla {
  return typeof e === "object" && e !== null && "codigo" in e && "estado" in e;
}

function json(datos: unknown, estado = 200): Response {
  return new Response(JSON.stringify(datos), {
    status: estado,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/** Folio de la solicitud: WEB-AAAAMMDD-XXXX (fecha de Chile + 4 caracteres al azar). */
function nuevoFolio(fecha: Date): string {
  const dia = fecha.toLocaleDateString("en-CA", { timeZone: "America/Santiago" }).replaceAll("-", "");
  const azar = Array.from(crypto.getRandomValues(new Uint8Array(2)), (b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `WEB-${dia}-${azar}`;
}

function limpiarNombreArchivo(nombre: string): string {
  const limpio = nombre
    .normalize("NFC")
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_")
    .trim()
    .slice(-120);
  return limpio || "adjunto";
}

function aBase64(bytes: Uint8Array): string {
  let binario = "";
  const bloque = 0x8000;
  for (let i = 0; i < bytes.length; i += bloque) {
    binario += String.fromCharCode(...bytes.subarray(i, i + bloque));
  }
  return btoa(binario);
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
