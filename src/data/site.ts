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

  // Descripción corta de la empresa (datos estructurados y vista previa al compartir).
  descripcion:
    "Soporte TI en terreno, redes, auditoría informática y mantención de equipos para empresas e instituciones de la Región de Tarapacá.",

  // Zonas donde se ofrece el servicio (datos estructurados y textos de cobertura).
  cobertura: ["Pozo Almonte", "Iquique", "Región de Tarapacá"],

  // Imagen para compartir el sitio (WhatsApp, redes, etc.). 1200x630.
  ogImage: "/og-default.png",

  // ---------------------------------------------------------------------------
  // PENDIENTE: recepción real del formulario de contacto.
  // Mientras esté vacío, el formulario NO envía datos a ningún servidor: arma el
  // mensaje y lo abre en WhatsApp o en el correo del usuario. Cuando exista un
  // servicio que reciba los envíos (ver README), pega aquí su URL y el formulario
  // pasará a enviar con fetch (POST JSON), con estados de carga, éxito y error.
  // ---------------------------------------------------------------------------
  formEndpoint: "",

  // Código de verificación de Google Search Console (método "etiqueta HTML").
  // Solo el valor de content="...". Vacío = no se agrega la etiqueta.
  googleSiteVerification: "",
};
