export const site = {
  nombre: "Tensor TI",
  razonSocial: "Tensor TI SpA",
  rut: "78.533.738-7",
  email: "contacto@tensorti.cl",
  telefono: "+56 9 8807 4562",
  telefonoLink: "+56988074562",
  // Número de WhatsApp Business sin "+" ni espacios. Vacío = no se muestra WhatsApp.
  whatsapp: "56988074562",
  ubicacion: "Pozo Almonte, Región de Tarapacá",

  // Representante de la empresa (sección "Quiénes somos").
  representante: {
    nombre: "Luciano Flores Rojas",
    cargo: "Representante",
    titulo: "Analista Programador (INACAP)",
    formacion: "Estudiante de Ingeniería en Informática",
    experiencia: [
      "Soporte informático en una municipalidad: atención a usuarios, equipos y red en terreno.",
      "Desarrollo de aplicaciones móviles y web, desde el diseño hasta la publicación en tiendas.",
    ],
  },

  // Descripción corta de la empresa (datos estructurados y vista previa al compartir).
  descripcion:
    "Soporte TI en terreno, desarrollo de plataformas web y apps, hosting y mantención web, redes y mantención de equipos para empresas e instituciones de la Región de Tarapacá.",

  // Horario de atención. `texto` se muestra en el sitio; `dias`, `abre` y `cierra`
  // van en los datos estructurados para Google (días en inglés, como pide schema.org).
  horario: {
    texto: "Lunes a viernes, de 9:00 a 18:00",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "09:00",
    cierra: "18:00",
  },

  // Zona de cobertura: en terreno en la región y a distancia en todo Chile.
  cobertura: {
    region: "Región de Tarapacá",
    comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara", "Camiña", "Colchane"],
    terreno: "En terreno en la Región de Tarapacá: Iquique, Alto Hospicio, Pozo Almonte y el resto de las comunas de la región.",
    remoto: "A distancia en todo Chile: desarrollo de software, hosting y soporte remoto.",
  },

  // Imagen para compartir el sitio (WhatsApp, redes, etc.). 1200x630.
  // Se genera con: node scripts/generar-og.mjs
  ogImage: "/og-tensorti.png",
  ogImageAlt: "Tensor TI: soporte TI en terreno, desarrollo de software y hosting web en la Región de Tarapacá",

  // ---------------------------------------------------------------------------
  // PENDIENTE: recepción real del formulario de contacto.
  // Mientras esté vacío, el formulario NO envía datos a ningún servidor: arma el
  // mensaje y lo abre en WhatsApp o en el correo del usuario. Cuando exista un
  // servicio que reciba los envíos (ver README), pega aquí su URL y el formulario
  // pasará a enviar con fetch (POST JSON), con estados de carga, éxito y error.
  // ---------------------------------------------------------------------------
  formEndpoint: "",

  // Clave PÚBLICA (site key) del widget de Cloudflare Turnstile del formulario
  // /cotizar. La clave secreta NO va aquí: se configura como variable
  // TURNSTILE_SECRET_KEY en Cloudflare Pages. Vacío = en desarrollo se usa la
  // clave de prueba de Cloudflare; en producción el formulario avisa que no está
  // disponible.
  turnstileSiteKey: "",

  // Código de verificación de Google Search Console (método "etiqueta HTML").
  // Solo el valor de content="...". Vacío = no se agrega la etiqueta.
  googleSiteVerification: "",
};
