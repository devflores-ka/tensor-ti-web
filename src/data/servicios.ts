// Catálogo de servicios. Cada entrada genera su propia página en /servicios/<slug>.
// Para agregar o editar un servicio basta con modificar este archivo.
//
// NOMBRES
//  - `nombre`      → nombre completo: título (H1) de la página del servicio, listado
//                    de /servicios y formularios.
//  - `nombreCorto` → nombre que se usa en el inicio y en el footer. Si no se define,
//                    se usa `nombre`. Así ambos lugares muestran siempre lo mismo.

export type Servicio = {
  slug: string;
  /** Nombre completo (H1 de la página). */
  nombre: string;
  /** Nombre para el inicio y el footer, si difiere del nombre completo. */
  nombreCorto?: string;
  /** Una línea para listas y tarjetas. */
  corto: string;
  /** Aparece como servicio principal (numerado) en el inicio. */
  principal: boolean;
  /** Se presta a distancia: la cobertura es todo Chile, no solo Tarapacá. */
  remoto?: boolean;
  seo: { title: string; description: string };
  intro: string;
  paraQuien: string[];
  incluye: { titulo: string; texto: string }[];
  /** Lo que no incluye o se cotiza por separado. */
  aparte: string[];
  /** Slugs de servicios relacionados (enlaces internos). */
  relacionados: string[];
};

export const servicios: Servicio[] = [
  // ---------------------------------------------------------------------------
  // Servicios principales (en este orden aparecen numerados en el inicio).
  // ---------------------------------------------------------------------------
  {
    slug: "soporte-ti",
    nombre: "Soporte TI y mesa de ayuda",
    nombreCorto: "Soporte TI en terreno",
    corto:
      "Atención presencial y remota en oficinas, faenas y establecimientos: diagnóstico, resolución y seguimiento.",
    principal: true,
    seo: {
      title: "Soporte TI para empresas en Iquique y Tarapacá | Tensor TI",
      description:
        "Soporte informático con cuota mensual para empresas e instituciones de Iquique, Alto Hospicio y Pozo Almonte: asistencia remota y en terreno, y mantención.",
    },
    intro:
      "Para las empresas que necesitan soporte informático constante, pero no un informático a tiempo completo. Atendemos incidencias de usuarios, equipos y red de forma remota o en terreno, con una cuota mensual predecible y un registro de lo que se hace.",
    paraQuien: [
      "Pymes y empresas que no tienen un informático interno.",
      "Oficinas y sucursales con equipos repartidos en distintos lugares.",
      "Instituciones que necesitan apoyo técnico externo y periódico.",
    ],
    incluye: [
      {
        titulo: "Asistencia remota y en terreno",
        texto:
          "Resolvemos a distancia lo que se puede resolver así, y vamos al lugar cuando el problema lo requiere.",
      },
      {
        titulo: "Resolución de incidencias",
        texto:
          "Atención de fallas en computadores, impresoras, red y software de oficina, y de las consultas de los usuarios.",
      },
      {
        titulo: "Mantención preventiva",
        texto:
          "Revisión periódica de los equipos para detectar problemas antes de que detengan el trabajo.",
      },
      {
        titulo: "Soporte a usuarios y oficinas",
        texto:
          "Apoyo a las personas que usan los equipos y a la puesta en marcha de nuevos puestos de trabajo.",
      },
      {
        titulo: "Visitas programadas a terreno",
        texto:
          "Visitas periódicas acordadas de antemano, según el plan que se contrate.",
      },
      {
        titulo: "Seguimiento e informes",
        texto:
          "Registro de las incidencias atendidas e informe de lo realizado, para que sepas en qué se usa el servicio.",
      },
    ],
    aparte: [
      "Desplazamientos extraordinarios fuera de la cobertura acordada.",
      "Repuestos, equipos nuevos y licencias de software.",
      "Proyectos de instalación o ampliación (redes, CCTV, cableado): se cotizan por separado.",
      "Atención fuera del horario o de las visitas incluidas en el plan contratado.",
    ],
    relacionados: ["mantencion-informatica", "redes", "personal-tecnico-faenas"],
  },
  {
    // El slug se mantiene para no romper enlaces ya publicados.
    slug: "desarrollo-software",
    nombre: "Desarrollo de plataformas web y apps a medida",
    corto:
      "Plataformas web, PWA y apps móviles, integraciones por API, automatización de procesos e IA aplicada a documentos.",
    principal: true,
    remoto: true,
    seo: {
      title: "Desarrollo web y apps a medida en Iquique y Chile | Tensor TI",
      description:
        "Plataformas web, PWA y apps móviles a medida, integraciones por API, automatización y OCR para empresas e instituciones de Iquique, Tarapacá y todo Chile.",
    },
    intro:
      "Cuando una planilla o un sistema genérico ya no alcanza, desarrollamos la herramienta que tu proceso necesita: plataformas web, apps para teléfonos, integraciones entre sistemas y automatizaciones que eliminan el trabajo manual repetitivo. Partimos por entender cómo trabajas hoy y entregamos por etapas, para que puedas usar y revisar avances desde el principio.",
    paraQuien: [
      "Organizaciones que llevan procesos en planillas, papel o correos sueltos.",
      "Empresas que reingresan los mismos datos en varios sistemas.",
      "Equipos en terreno que necesitan registrar información desde el teléfono.",
      "Quienes procesan a mano facturas, guías, formularios u otros documentos.",
    ],
    incluye: [
      {
        titulo: "Plataformas web",
        texto:
          "Sistemas internos, portales para clientes o proveedores y paneles de gestión, accesibles desde el navegador.",
      },
      {
        titulo: "PWA y apps móviles",
        texto:
          "Aplicaciones para Android e iOS, o aplicaciones web instalables (PWA) que funcionan en el teléfono sin pasar por las tiendas.",
      },
      {
        titulo: "Integraciones por API",
        texto:
          "Conectamos tus sistemas entre sí y con servicios externos para que la información no se tenga que reingresar.",
      },
      {
        titulo: "Automatización de procesos",
        texto:
          "Reemplazamos tareas manuales repetitivas: copiado de datos entre planillas, generación de reportes, avisos y recordatorios.",
      },
      {
        titulo: "IA aplicada: OCR y extracción de datos",
        texto:
          "Lectura automática de documentos escaneados o fotografiados (facturas, guías, formularios) para extraer sus datos y cargarlos en tus sistemas, con revisión humana donde corresponde.",
      },
      {
        titulo: "Mantención y evolución",
        texto:
          "Correcciones, ajustes y nuevas funciones una vez que la herramienta está en uso.",
      },
    ],
    aparte: [
      "Publicación en Google Play y App Store: las cuentas de desarrollador quedan a nombre del cliente y su costo es aparte.",
      "Hosting, dominios, licencias y servicios de terceros (por ejemplo, APIs de IA): se cotizan según el caso.",
      "Proyectos sin alcance definido: partimos con una etapa de levantamiento, que se cotiza por separado.",
    ],
    relacionados: ["hosting-mantencion-web", "auditoria-informatica", "soporte-ti"],
  },
  {
    slug: "hosting-mantencion-web",
    nombre: "Hosting, migración y mantención web",
    corto:
      "Hosting en datacenter en Chile, migración de sitios WordPress e institucionales, SSL, respaldos y soporte con tiempos de respuesta acordados.",
    principal: true,
    remoto: true,
    seo: {
      title: "Hosting y mantención web en Chile e Iquique | Tensor TI",
      description:
        "Hosting en datacenter en Chile, migración y mantención de sitios WordPress e institucionales, SSL, respaldos y soporte con SLA. Desde Tarapacá a todo Chile.",
    },
    intro:
      "Un sitio web también necesita mantención: actualizaciones, respaldos, certificados que vencen y alguien que responda cuando algo falla. Alojamos tu sitio en un datacenter en Chile, lo migramos desde tu proveedor actual si hace falta y nos hacemos cargo de mantenerlo, con tiempos de respuesta acordados por escrito.",
    paraQuien: [
      "Municipalidades, servicios públicos y organizaciones con sitios institucionales.",
      "Empresas con sitios en WordPress que nadie actualiza desde hace tiempo.",
      "Quienes quieren cambiar de proveedor de hosting sin perder información ni correos.",
    ],
    incluye: [
      {
        titulo: "Hosting en datacenter en Chile",
        texto:
          "Alojamiento del sitio en servidores ubicados en Chile, con un plan acorde al tráfico y al tamaño del sitio.",
      },
      {
        titulo: "Migración",
        texto:
          "Traslado del sitio, su base de datos y sus archivos desde el proveedor actual, con revisión posterior y sin cambiar las direcciones publicadas.",
      },
      {
        titulo: "WordPress y sitios institucionales",
        texto:
          "Actualización del núcleo, temas y plugins, corrección de fallas y cambios de contenido acotados.",
      },
      {
        titulo: "Certificados SSL",
        texto:
          "Instalación y renovación de certificados para que el sitio funcione siempre con https.",
      },
      {
        titulo: "Respaldos",
        texto:
          "Copias periódicas del sitio y la base de datos, con restauración cuando se necesite.",
      },
      {
        titulo: "Soporte con SLA",
        texto:
          "Tiempos de respuesta y de atención definidos por escrito en el contrato, según el plan elegido.",
      },
    ],
    aparte: [
      "Registro y renovación de dominios (.cl u otros): se cotizan según el caso.",
      "Rediseños o desarrollos nuevos: se cotizan como proyecto.",
      "Cuentas de correo corporativo y servicios de terceros.",
    ],
    relacionados: ["desarrollo-software", "soporte-ti", "auditoria-informatica"],
  },
  {
    slug: "redes",
    nombre: "Redes y conectividad",
    corto:
      "Cableado estructurado, fibra óptica, enlaces inalámbricos y puesta en marcha de redes.",
    principal: true,
    seo: {
      title: "Redes y cableado estructurado en Iquique | Tensor TI",
      description:
        "Cableado estructurado, fibra óptica y enlaces inalámbricos para empresas e instituciones de Iquique, Alto Hospicio, Pozo Almonte y la Región de Tarapacá.",
    },
    intro:
      "Una red estable es la base de todo lo demás: correo, sistemas, telefonía, cámaras. Diseñamos, instalamos y mantenemos redes para oficinas y establecimientos. Dejamos todo funcionando y te entregamos el detalle de lo instalado.",
    paraQuien: [
      "Oficinas que se amplían o se trasladan y necesitan red nueva.",
      "Instituciones con redes antiguas, saturadas o poco ordenadas.",
      "Empresas con varios edificios o sectores que deben comunicarse entre sí.",
    ],
    incluye: [
      {
        titulo: "Levantamiento y diseño",
        texto:
          "Revisamos el lugar, los equipos y la red existente, y definimos qué se necesita antes de instalar.",
      },
      {
        titulo: "Cableado estructurado",
        texto:
          "Tendido, canalización y conexión de puntos de red en oficinas y establecimientos.",
      },
      {
        titulo: "Fibra óptica y enlaces inalámbricos",
        texto:
          "Conexión entre edificios o sectores donde el cable de cobre no alcanza o no conviene.",
      },
      {
        titulo: "Configuración de equipos de red",
        texto:
          "Switches, routers y puntos de acceso Wi-Fi puestos en marcha y ordenados según el uso de cada área.",
      },
      {
        titulo: "Mantención y reparación",
        texto: "Revisión periódica y corrección de fallas en redes ya instaladas.",
      },
    ],
    aparte: [
      "Equipos y materiales: se cotizan según el proyecto.",
      "Obras de construcción mayores y sus permisos.",
      "Contratación y planes del proveedor de internet.",
    ],
    relacionados: ["soporte-ti", "cctv-control-acceso", "auditoria-informatica"],
  },
  {
    slug: "mantencion-informatica",
    nombre: "Mantención, reparación y montaje de equipos",
    nombreCorto: "Mantención y montaje de equipos",
    corto:
      "Mantención preventiva y correctiva de parques de equipos, y montaje de puestos de trabajo completos, en volumen.",
    principal: true,
    seo: {
      title: "Mantención de computadores en Iquique y Tarapacá | Tensor TI",
      description:
        "Mantención preventiva y correctiva, reparación y montaje de computadores en volumen, en terreno, para Iquique, Alto Hospicio, Pozo Almonte y Tarapacá.",
    },
    intro:
      "Cuando hay decenas de equipos, el problema ya no es arreglar uno: es mantener todos funcionando. Hacemos mantención preventiva y correctiva de parques de computadores y montamos puestos de trabajo completos, en terreno.",
    paraQuien: [
      "Organismos públicos y empresas con muchos computadores.",
      "Instituciones que renuevan o amplían sus puestos de trabajo.",
      "Oficinas que acumulan equipos con fallas o sin mantención.",
    ],
    incluye: [
      {
        titulo: "Mantención preventiva",
        texto:
          "Limpieza, actualización y revisión general de cada equipo, con un plan acordado para todo el parque.",
      },
      {
        titulo: "Mantención correctiva y reparación",
        texto:
          "Diagnóstico y reparación de fallas de hardware y software en computadores y periféricos.",
      },
      {
        titulo: "Montaje de puestos de trabajo",
        texto:
          "Armado, instalación y configuración de equipos, listos para que el usuario trabaje.",
      },
      {
        titulo: "Trabajo en volumen",
        texto:
          "Organizamos la intervención por lotes y por áreas para reducir la interrupción de la operación.",
      },
      {
        titulo: "Registro por equipo",
        texto: "Dejamos constancia de lo realizado en cada equipo intervenido.",
      },
    ],
    aparte: [
      "Repuestos y equipos nuevos: se cotizan según necesidad.",
      "Traslados fuera de la cobertura acordada.",
    ],
    relacionados: ["soporte-ti", "venta-equipos-licencias", "auditoria-informatica"],
  },
  {
    slug: "auditoria-informatica",
    nombre: "Auditoría y diagnóstico informático",
    nombreCorto: "Auditoría informática",
    corto:
      "Levantamiento de equipos, redes y software, con informe de hallazgos y recomendaciones.",
    principal: true,
    seo: {
      title: "Auditoría informática en Iquique y Tarapacá | Tensor TI",
      description:
        "Diagnóstico de equipos, redes y software con informe de hallazgos y recomendaciones, para empresas e instituciones de Iquique, Alto Hospicio y Tarapacá.",
    },
    intro:
      "Antes de invertir o de contratar soporte, conviene saber qué hay y en qué estado está. Revisamos tus equipos, tu red y tu software, y te entregamos un informe claro, con prioridades.",
    paraQuien: [
      "Organizaciones que heredaron equipos y redes sin documentación.",
      "Empresas que quieren renovar tecnología y necesitan saber por dónde partir.",
      "Quienes van a contratar soporte y quieren partir con un diagnóstico.",
    ],
    incluye: [
      {
        titulo: "Inventario de equipos y software",
        texto:
          "Qué equipos tienes, su antigüedad y estado, y qué software se usa en ellos.",
      },
      {
        titulo: "Revisión de la red",
        texto:
          "Cómo está armada, qué puntos débiles tiene y qué equipos la sostienen.",
      },
      {
        titulo: "Respaldos y seguridad básica",
        texto:
          "Revisamos si la información importante está respaldada y si existen prácticas básicas de seguridad.",
      },
      {
        titulo: "Informe de hallazgos",
        texto: "Un documento con lo encontrado, ordenado por prioridad.",
      },
      {
        titulo: "Recomendaciones",
        texto: "Qué corregir, en qué orden y cómo abordarlo.",
      },
    ],
    aparte: [
      "Implementación de las mejoras recomendadas: se cotiza por separado.",
      "Auditorías de cumplimiento normativo o certificaciones específicas.",
    ],
    relacionados: ["soporte-ti", "redes", "mantencion-informatica"],
  },

  // ---------------------------------------------------------------------------
  // Otros servicios (aparecen como "También" en el inicio).
  // ---------------------------------------------------------------------------
  {
    slug: "personal-tecnico-faenas",
    nombre: "Personal técnico para faenas",
    corto:
      "Técnicos de soporte TI en sitio para faenas y proyectos, por turno o por período definido.",
    principal: false,
    seo: {
      title: "Técnicos TI para faenas mineras en Tarapacá | Tensor TI",
      description:
        "Técnicos de soporte informático en sitio para faenas, contratistas y proyectos en Pozo Almonte, Pica, Iquique y la Región de Tarapacá, por turno o período.",
    },
    intro:
      "Algunas operaciones necesitan a alguien de TI en el lugar, no a distancia. Ponemos técnicos de soporte en tu faena o proyecto durante el período que se requiera, coordinados por nosotros y con registro de lo que se hace en cada turno.",
    paraQuien: [
      "Faenas y campamentos que necesitan soporte TI presencial.",
      "Contratistas que deben cubrir un requerimiento de soporte informático de su mandante.",
      "Proyectos acotados: puestas en marcha, migraciones, recambio de equipos o inventarios.",
    ],
    incluye: [
      {
        titulo: "Técnicos de soporte en sitio",
        texto:
          "Atención a usuarios, equipos, impresoras y red en el lugar de trabajo.",
      },
      {
        titulo: "Turnos o períodos definidos",
        texto:
          "Cobertura según el sistema de turnos de la faena, o por el tiempo que dure el proyecto.",
      },
      {
        titulo: "Coordinación y continuidad",
        texto:
          "Coordinamos al personal y los reemplazos, con apoyo remoto desde nuestra oficina cuando hace falta.",
      },
      {
        titulo: "Registro e informes",
        texto:
          "Bitácora de las atenciones realizadas e informe periódico para el responsable del contrato.",
      },
    ],
    aparte: [
      "Exámenes, inducciones y acreditaciones que exija cada faena: se coordinan y cotizan según el mandante.",
      "Traslados, alojamiento y alimentación, cuando no los provee la faena.",
      "Equipos, repuestos y licencias.",
    ],
    relacionados: ["soporte-ti", "mantencion-informatica", "redes"],
  },
  {
    slug: "cctv-control-acceso",
    nombre: "CCTV y control de acceso",
    corto:
      "Videovigilancia y control de acceso: diseño, instalación, integración y mantención.",
    principal: false,
    seo: {
      title: "CCTV y control de acceso en Iquique y Tarapacá | Tensor TI",
      description:
        "Instalación y mantención de videovigilancia (CCTV) y control de acceso para empresas e instituciones de Iquique, Alto Hospicio, Pozo Almonte y Tarapacá.",
    },
    intro:
      "Cámaras y accesos que funcionan junto con tu red. Evaluamos qué necesitas proteger, instalamos el sistema y lo dejamos operativo. Después, lo mantenemos.",
    paraQuien: [
      "Empresas e instituciones que quieren vigilar instalaciones o accesos.",
      "Organizaciones con sistemas antiguos que dejaron de funcionar bien.",
      "Proyectos nuevos que necesitan integrar cámaras y accesos desde el inicio.",
    ],
    incluye: [
      {
        titulo: "Evaluación del sitio",
        texto:
          "Definimos ubicación de cámaras y puntos de acceso según lo que quieres cubrir.",
      },
      {
        titulo: "Videovigilancia (CCTV)",
        texto:
          "Instalación y configuración de cámaras y grabación, con acceso a las imágenes para quienes corresponda.",
      },
      {
        titulo: "Control de acceso",
        texto:
          "Lectores y cerraduras electrónicas para controlar quién entra y a qué áreas.",
      },
      {
        titulo: "Integración con la red",
        texto:
          "Conectamos el sistema a tu red de forma ordenada para que funcione de manera estable.",
      },
      {
        titulo: "Mantención",
        texto: "Revisión y reparación de sistemas ya instalados.",
      },
    ],
    aparte: [
      "Cámaras, grabadores, lectores y cerraduras: se cotizan según el proyecto.",
      "Obras de construcción o canalización mayores.",
      "Monitoreo permanente o servicios de guardias.",
    ],
    relacionados: ["redes", "soporte-ti", "venta-equipos-licencias"],
  },
  {
    slug: "venta-equipos-licencias",
    nombre: "Venta de equipos, periféricos y licencias",
    nombreCorto: "Venta de equipos y licencias",
    corto:
      "Computadores, periféricos, repuestos y licencias de software, al por mayor y al por menor.",
    principal: false,
    seo: {
      title: "Venta de computadores y licencias en Tarapacá | Tensor TI",
      description:
        "Computadores, periféricos, repuestos y licencias de software al por mayor y menor para empresas e instituciones de Iquique, Alto Hospicio y Tarapacá.",
    },
    intro:
      "Cotizamos equipos, periféricos, repuestos y licencias según lo que realmente necesitas, y los entregamos instalados y configurados si lo requieres.",
    paraQuien: [
      "Empresas e instituciones que renuevan o amplían sus equipos.",
      "Quienes necesitan comprar en cantidad y con una cotización formal.",
      "Clientes de soporte que requieren repuestos o equipos nuevos.",
    ],
    incluye: [
      {
        titulo: "Computadores y periféricos",
        texto: "Equipos y accesorios para oficina, en la cantidad que requiera tu proyecto.",
      },
      {
        titulo: "Repuestos y componentes",
        texto: "Piezas para reparar o ampliar equipos existentes.",
      },
      {
        titulo: "Licencias de software",
        texto: "Licencias para el software que utilizas en tu organización.",
      },
      {
        titulo: "Asesoría de compra",
        texto:
          "Te ayudamos a elegir según el uso, para no pagar de más ni quedarte corto.",
      },
      {
        titulo: "Instalación y configuración",
        texto: "Entregamos los equipos listos para usar, si lo contratas.",
      },
    ],
    aparte: [
      "Precios y disponibilidad: se confirman en cada cotización.",
      "Condiciones de garantía de cada producto: se informan en la cotización.",
    ],
    relacionados: ["mantencion-informatica", "soporte-ti"],
  },
];

export const rutaServicio = (slug: string) => `/servicios/${slug}`;

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);

/** Nombre que se muestra en el inicio y en el footer. */
export const nombreVisible = (s: Servicio) => s.nombreCorto ?? s.nombre;
