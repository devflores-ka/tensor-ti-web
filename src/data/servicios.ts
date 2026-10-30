// Catálogo de servicios. Cada entrada genera su propia página en /servicios/<slug>.
// Para agregar o editar un servicio basta con modificar este archivo.

export type Servicio = {
  slug: string;
  /** Nombre completo (H1 de la página). */
  nombre: string;
  /** Nombre abreviado para el home, si difiere del nombre completo. */
  homeTitulo?: string;
  /** Una línea para listas y tarjetas. */
  corto: string;
  /** Aparece como servicio principal (numerado) en el home. */
  principal: boolean;
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
  {
    slug: "soporte-ti",
    nombre: "Soporte TI y mesa de ayuda",
    homeTitulo: "Soporte TI en terreno",
    corto:
      "Atención presencial y remota en oficinas, faenas y establecimientos: diagnóstico, resolución y seguimiento.",
    principal: true,
    seo: {
      title: "Soporte TI para empresas en Tarapacá | Tensor TI",
      description:
        "Soporte informático externo para empresas e instituciones en Tarapacá: asistencia remota y en terreno, mantención preventiva y seguimiento, con cuota mensual.",
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
    relacionados: ["mantencion-informatica", "redes", "auditoria-informatica"],
  },
  {
    slug: "redes",
    nombre: "Redes y conectividad",
    corto:
      "Cableado estructurado, fibra óptica, enlaces inalámbricos y puesta en marcha de redes.",
    principal: true,
    seo: {
      title: "Redes y cableado estructurado en Tarapacá | Tensor TI",
      description:
        "Instalación, configuración y mantención de redes: cableado estructurado, fibra óptica y enlaces inalámbricos para empresas e instituciones en Tarapacá.",
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
    slug: "auditoria-informatica",
    nombre: "Auditoría y diagnóstico informático",
    homeTitulo: "Auditoría informática",
    corto:
      "Levantamiento de equipos, redes y software, con informe de hallazgos y recomendaciones.",
    principal: true,
    seo: {
      title: "Auditoría informática para empresas | Tensor TI",
      description:
        "Auditoría y diagnóstico tecnológico: levantamiento de equipos, redes y software con informe de hallazgos y recomendaciones para empresas en Tarapacá.",
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
  {
    slug: "mantencion-informatica",
    nombre: "Mantención, reparación y montaje de equipos",
    homeTitulo: "Reparación, mantención y montaje de PC en volumen",
    corto:
      "Mantención preventiva y correctiva de parques de equipos, y montaje de puestos de trabajo completos.",
    principal: true,
    seo: {
      title: "Mantención y reparación de computadores | Tensor TI",
      description:
        "Mantención preventiva y correctiva, reparación y montaje de computadores en volumen para empresas e instituciones en Tarapacá, con atención en terreno.",
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
    slug: "cctv-control-acceso",
    nombre: "CCTV y control de acceso",
    corto:
      "Videovigilancia y control de acceso: diseño, instalación, integración y mantención.",
    principal: false,
    seo: {
      title: "CCTV y control de acceso en Tarapacá | Tensor TI",
      description:
        "Diseño, instalación y mantención de videovigilancia (CCTV) y control de acceso para empresas e instituciones en Pozo Almonte y la Región de Tarapacá.",
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
    slug: "desarrollo-software",
    nombre: "Desarrollo de software e integraciones",
    corto:
      "Aplicaciones a medida, automatización de procesos e integraciones entre sistemas.",
    principal: false,
    seo: {
      title: "Desarrollo de software a medida | Tensor TI",
      description:
        "Desarrollo de aplicaciones web y móviles, automatización de procesos e integraciones entre sistemas para empresas e instituciones. Tensor TI, Pozo Almonte.",
    },
    intro:
      "Cuando una planilla o un sistema genérico ya no alcanza, desarrollamos herramientas a la medida: aplicaciones, automatización de tareas repetitivas e integración entre los sistemas que ya usas.",
    paraQuien: [
      "Organizaciones que llevan procesos en planillas o papel.",
      "Empresas que reingresan los mismos datos en varios sistemas.",
      "Quienes necesitan una herramienta específica que no existe en el mercado.",
    ],
    incluye: [
      {
        titulo: "Aplicaciones web y móviles",
        texto: "Diseño y desarrollo según el proceso real de tu organización.",
      },
      {
        titulo: "Automatización de procesos",
        texto:
          "Reemplazamos tareas manuales repetitivas: planillas, copiado de datos, reportes.",
      },
      {
        titulo: "Integraciones",
        texto:
          "Conectamos sistemas y fuentes de datos para que la información fluya sin tener que reingresarla.",
      },
      {
        titulo: "Mantención y evolución",
        texto: "Ajustes y nuevas funciones una vez que la herramienta está en uso.",
      },
    ],
    aparte: [
      "Licencias, hosting y servicios de terceros: se contratan o cotizan según el caso.",
      "Proyectos sin alcance definido: partimos con una etapa de levantamiento.",
    ],
    relacionados: ["auditoria-informatica", "soporte-ti"],
  },
  {
    slug: "venta-equipos-licencias",
    nombre: "Venta de equipos, periféricos y licencias",
    corto:
      "Computadores, periféricos, repuestos y licencias de software, al por mayor y al por menor.",
    principal: false,
    seo: {
      title: "Venta de computadores y licencias | Tensor TI",
      description:
        "Venta al por mayor y menor de computadores, periféricos, repuestos y licencias de software para empresas e instituciones en Tarapacá. Cotiza con Tensor TI.",
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

/** Otros servicios que ofrece la empresa y todavía no tienen página propia. */
export const otrosServicios = ["Personal técnico para faenas"];

export const rutaServicio = (slug: string) => `/servicios/${slug}`;

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);
