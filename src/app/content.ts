import type { IconName } from "./ui";

export type Service = {
  id: string; title: string; label: string; short: string; eyebrow: string; icon: IconName; variant: number;
  need: string; promise: string; builds: string[]; features: string[]; approach: string[];
  faq: [string, string][];
};

export const company = {
  name: "NUVANTIS",
  tagline: "ELEVATING TECHNOLOGY",
  headline: "Ingeniería que transforma el futuro.",
  introduction: "NUVANTIS es una compañía de ingeniería tecnológica especializada en desarrollar e integrar soluciones digitales para empresas. Diseñamos, desarrollamos e implementamos tecnologías que permiten optimizar procesos, aprovechar datos, automatizar operaciones y acelerar la evolución digital de las organizaciones.",
  value: "Convertimos necesidades empresariales en soluciones tecnológicas inteligentes, escalables y orientadas a resultados.",
  mission: "Desarrollar e integrar soluciones tecnológicas mediante ingeniería de software, inteligencia artificial, análisis de datos e innovación digital, ayudando a las organizaciones a optimizar sus procesos, fortalecer sus capacidades y alcanzar sus objetivos mediante tecnología inteligente, segura y escalable.",
  vision: "Ser una empresa tecnológica reconocida a nivel nacional e internacional por su excelencia en ingeniería, innovación y desarrollo de soluciones digitales, impulsando la transformación de las organizaciones y contribuyendo a construir un futuro más inteligente, conectado y eficiente.",
};

export const values = [
  ["Excelencia", "Calidad y precisión en cada solución."],
  ["Innovación", "Explorar nuevas tecnologías y posibilidades."],
  ["Integridad", "Actuar con responsabilidad y transparencia."],
  ["Compromiso", "Comprender las necesidades de los clientes."],
  ["Inteligencia", "Resolver problemas mediante análisis y criterio técnico."],
  ["Evolución", "Mejorar continuamente y adaptarse al futuro."],
] as const;

export const services: Service[] = [
  {
    id: "software", title: "NUVANTIS SOFTWARE", label: "Software", short: "Desarrollo de software y plataformas digitales.", eyebrow: "01 / INGENIERÍA DE SOFTWARE", icon: "code", variant: 0,
    need: "Sistemas empresariales, aplicaciones web y móviles, integraciones y soluciones a medida para conectar personas, procesos e información.",
    promise: "Ingeniería de software alrededor de tu operación.",
    builds: ["Software personalizado", "Sistemas de gestión empresarial", "Aplicaciones web y móviles", "Portales empresariales", "APIs e integraciones", "Mantenimiento de aplicaciones"],
    features: ["Roles y permisos", "Trazabilidad", "Gestión documental", "Integración entre plataformas", "Reportes operativos", "Arquitectura modular"],
    approach: ["Comprendemos los procesos", "Definimos la arquitectura", "Prototipamos y desarrollamos", "Implementamos y acompañamos"],
    faq: [["¿Desarrollan frontend y backend?", "Sí. El alcance puede incluir interfaz, lógica de negocio, APIs y almacenamiento de datos."], ["¿Pueden integrar un sistema existente?", "Primero revisamos su arquitectura, interfaces disponibles y restricciones."], ["¿Incluye mantenimiento?", "El mantenimiento y soporte recurrente se acuerdan según las necesidades del proyecto."]],
  },
  {
    id: "intelligence", title: "NUVANTIS INTELLIGENCE", label: "Intelligence", short: "Inteligencia artificial y automatización.", eyebrow: "02 / INTELIGENCIA APLICADA", icon: "brain", variant: 1,
    need: "IA, asistentes inteligentes, automatización de procesos e integración de modelos para atender necesidades concretas de la organización.",
    promise: "Inteligencia que se integra a tu forma de trabajar.",
    builds: ["Asistentes inteligentes", "Automatización de operaciones", "Integración de modelos de IA", "Procesamiento de información", "Flujos administrativos", "Conexión entre herramientas"],
    features: ["Supervisión humana", "Fuentes autorizadas", "Reglas de negocio", "Gestión de excepciones", "Control de accesos", "Seguimiento del flujo"],
    approach: ["Identificamos el caso de uso", "Evaluamos datos y viabilidad", "Integramos y validamos", "Medimos y mejoramos"],
    faq: [["¿Todo proceso necesita IA?", "No. Evaluamos si conviene automatizar con reglas, integrar sistemas o aplicar un modelo de IA."], ["¿Se puede mantener supervisión humana?", "Sí. Los puntos de revisión se definen según el riesgo y el contexto."], ["¿Se integra con mis herramientas?", "La viabilidad depende de sus APIs y las condiciones de acceso a los datos."]],
  },
  {
    id: "analytics", title: "NUVANTIS ANALYTICS", label: "Analytics", short: "Datos e inteligencia de negocios.", eyebrow: "03 / INTELIGENCIA DE NEGOCIOS", icon: "chart", variant: 2,
    need: "Bases de datos, Business Intelligence, dashboards, indicadores y análisis de información para comprender la operación y apoyar decisiones.",
    promise: "Conecta tus datos con las decisiones del negocio.",
    builds: ["Bases de datos", "Business Intelligence", "Dashboards gerenciales", "Indicadores operativos", "Reportes de información", "Integración de fuentes"],
    features: ["Filtros y visualizaciones", "Calidad de datos", "Permisos de consulta", "Actualización de indicadores", "Consolidación de fuentes", "Documentación"],
    approach: ["Revisamos las fuentes", "Definimos indicadores", "Modelamos y visualizamos", "Validamos la información"],
    faq: [["¿Pueden actualizar indicadores en tiempo real?", "Evaluamos la disponibilidad de las fuentes y la frecuencia requerida para definir una solución viable."], ["¿Trabajan con bases de datos existentes?", "Sí. Revisamos su estructura, calidad y mecanismos de acceso."], ["¿Cómo eligen los indicadores?", "Se definen con las personas responsables de la operación y de las decisiones."]],
  },
  {
    id: "infrastructure", title: "NUVANTIS INFRASTRUCTURE", label: "Infrastructure", short: "Infraestructura y seguridad tecnológica.", eyebrow: "04 / BASES PARA LA CONTINUIDAD", icon: "shield", variant: 3,
    need: "Nube, servidores, redes, respaldos, continuidad y ciberseguridad como base de una operación tecnológica organizada.",
    promise: "Una base tecnológica preparada para tu operación.",
    builds: ["Infraestructura en la nube", "Servidores y redes", "Respaldo de información", "Continuidad operativa", "Ciberseguridad", "Mantenimiento y soporte tecnológico"],
    features: ["Accesos y permisos", "Configuración de entornos", "Monitoreo acordado", "Planes de respaldo", "Gestión de riesgos", "Documentación técnica"],
    approach: ["Evaluamos el entorno", "Priorizamos riesgos", "Implementamos controles", "Definimos continuidad y soporte"],
    faq: [["¿Incluye soporte recurrente?", "Puede contratarse mantenimiento y soporte con alcance y condiciones definidos."], ["¿Pueden trabajar con mi proveedor cloud?", "Evaluamos el entorno y los servicios disponibles antes de plantear la arquitectura."], ["¿Garantizan seguridad absoluta?", "La seguridad requiere controles, seguimiento y mejora continua; el alcance se define a partir de los riesgos identificados."]],
  },
  {
    id: "consulting", title: "NUVANTIS CONSULTING", label: "Consulting", short: "Consultoría y transformación digital.", eyebrow: "05 / ESTRATEGIA TECNOLÓGICA", icon: "layers", variant: 4,
    need: "Diagnóstico tecnológico, arquitectura empresarial, estrategia y gestión de proyectos para alinear la tecnología con los objetivos de la organización.",
    promise: "Claridad para decidir el siguiente paso tecnológico.",
    builds: ["Diagnóstico tecnológico", "Arquitectura empresarial", "Estrategia digital", "Hoja de ruta", "Gestión de proyectos", "Evaluación de soluciones"],
    features: ["Análisis de procesos", "Priorización", "Evaluación de viabilidad", "Definición de alcance", "Ruta de implementación", "Acompañamiento"],
    approach: ["Escuchamos tus objetivos", "Analizamos la situación", "Definimos una estrategia", "Acompañamos su ejecución"],
    faq: [["¿Puedo empezar sin tener un proyecto definido?", "Sí. El diagnóstico permite identificar necesidades, prioridades y alternativas."], ["¿La consultoría requiere desarrollar software?", "No necesariamente. Puede concluir con una evaluación, una arquitectura o una hoja de ruta."], ["¿Cómo se define el presupuesto?", "Según los objetivos, el alcance y los entregables acordados."]],
  },
  {
    id: "labs", title: "NUVANTIS LABS", label: "Labs", short: "Investigación e innovación.", eyebrow: "06 / EXPLORAR EL SIGUIENTE PASO", icon: "spark", variant: 5,
    need: "Investigación aplicada, prototipos, experimentación y desarrollo de nuevas soluciones para explorar posibilidades antes de escalar.",
    promise: "De una pregunta a una posibilidad tangible.",
    builds: ["Investigación aplicada", "Prototipos", "Pruebas de concepto", "Experimentación tecnológica", "Evaluación de nuevas soluciones", "Exploración de productos propios"],
    features: ["Hipótesis claras", "Alcance experimental", "Validación temprana", "Aprendizajes documentados", "Análisis de viabilidad", "Evolución por etapas"],
    approach: ["Definimos la pregunta", "Exploramos alternativas", "Prototipamos y probamos", "Evaluamos el siguiente paso"],
    faq: [["¿Un prototipo es un producto terminado?", "No. Su objetivo es validar una hipótesis o una funcionalidad antes de ampliar la inversión."], ["¿Tienen productos propios disponibles?", "El desarrollo y la comercialización de productos propios forman parte de la proyección futura de NUVANTIS."], ["¿Puedo compartir una idea?", "Sí. Puedes conversar con el equipo o utilizar el Muro de Ideas sin incluir información confidencial."]],
  },
];

export const legacyUnits: Record<string, string> = { "software-a-medida": "software", "desarrollo-web": "software", "automatizacion-ia": "intelligence", "datos-integraciones": "analytics" };

export const sectors = [
  { name: "Salud y medicina ocupacional", icon: "message" as IconName, title: "Ingeniería para conectar atención e información", need: "Gestión clínica, coordinación de evaluaciones, documentación y seguimiento operativo.", examples: ["Sistemas de gestión", "Agenda y atención", "Documentación digital", "Dashboards operativos"] },
  { name: "Comercio y servicios", icon: "chart" as IconName, title: "Conecta la operación con tus clientes", need: "Ventas, inventario, servicios y gestión comercial organizados alrededor del negocio.", examples: ["Gestión comercial", "Inventario", "Portales de clientes", "Automatización"] },
  { name: "Industria y operaciones", icon: "automation" as IconName, title: "Visibilidad y control para la operación", need: "Procesos empresariales, mantenimiento, trazabilidad e indicadores de actividad.", examples: ["Órdenes de trabajo", "Seguimiento operativo", "Mantenimiento", "Business Intelligence"] },
  { name: "Pequeñas y medianas empresas", icon: "users" as IconName, title: "Tecnología para dar el siguiente paso", need: "Herramientas e infraestructura que evolucionan con el tamaño y las prioridades de tu empresa.", examples: ["Software a medida", "Diagnóstico digital", "Nube y respaldo", "Mantenimiento y soporte"] },
];
