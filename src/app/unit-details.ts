export const unitDetails: Record<string, { title: string; scope: string[]; groups: { label: string; items: [string, string][] }[] }> = {
  intelligence: {
    title: "Automatización ajustada a tu operación",
    scope: ["Flujo y excepciones","Datos y herramientas","Supervisión y métricas"],
    groups: [
      { label: "Automatización", items: [
        ["¿Por dónde empezamos?","Elegimos una tarea frecuente con entradas claras y medimos cuánto trabajo manual requiere."],
        ["¿Qué tareas conviene automatizar?","Las repetitivas, con reglas claras y excepciones identificables."],
        ["¿Podemos probar un piloto?","Sí. Se acuerdan un canal, casos de prueba y criterios de éxito."],
      ] },
      { label: "Integración", items: [
        ["¿Qué datos requiere el flujo?","Los campos necesarios para clasificar cada solicitud y ejemplos representativos."],
        ["¿Qué sucede si falta información?","El flujo puede pedir los datos faltantes o derivar el caso a revisión."],
        ["¿Cómo prueban la integración?","Con registros de prueba y validaciones de entrada, salida y errores."],
      ] },
      { label: "Control humano", items: [
        ["¿Qué casos pasan a revisión?","Los ambiguos, incompletos o sensibles según las reglas acordadas."],
        ["¿Cómo se mide el resultado?","Comparamos tiempos, correcciones y casos resueltos antes y después del piloto."],
        ["¿Se pueden ajustar las reglas?","Sí. Se revisan los errores y se prueban los ajustes antes de aplicarlos."],
      ] },
    ],
  },
  analytics: {
    title: "Indicadores para decisiones concretas",
    scope: ["Preguntas del negocio","Fuentes y calidad","Indicadores y validación"],
    groups: [
      { label: "Indicadores", items: [
        ["¿Qué conviene medir primero?","Una métrica que permita tomar una decisión operativa concreta."],
        ["¿Pueden segmentar resultados?","Sí, según las dimensiones disponibles, como periodo, canal o área."],
        ["¿Cómo se interpreta un cambio?","Se compara con un periodo equivalente y se revisa si cambió la fuente."],
      ] },
      { label: "Fuentes", items: [
        ["¿Pueden usar archivos Excel?","Sí, si los formatos y los responsables de actualización están definidos."],
        ["¿Qué hacen con duplicados?","Acordamos una regla para identificarlos y la contrastamos con muestras."],
        ["¿Cómo verifican los totales?","Se comparan los resultados con los registros de origen."],
      ] },
      { label: "Uso y entrega", items: [
        ["¿Quién puede ver el panel?","Se acuerdan los perfiles de consulta según la sensibilidad de los datos."],
        ["¿Se pueden compartir reportes?","Depende de las opciones de la plataforma y los permisos acordados."],
        ["¿Dejan documentadas las métricas?","La propuesta puede incluir definiciones, fórmulas y fuentes."],
      ] },
    ],
  },
  infrastructure: {
    title: "Infraestructura para una operación continua",
    scope: ["Entorno y dependencias","Controles de acceso","Respaldo y continuidad"],
    groups: [
      { label: "Arquitectura", items: [
        ["¿Qué revisan del entorno actual?","Aplicaciones, conectividad, almacenamiento y servicios de los que depende la operación."],
        ["¿Pueden plantear una migración por fases?","Sí, si las dependencias permiten mover componentes y validarlos por etapas."],
        ["¿Cómo se dimensionan los recursos?","Según la demanda observada, el crecimiento previsto y el presupuesto."],
      ] },
      { label: "Seguridad", items: [
        ["¿Cómo organizan los permisos?","Por responsabilidades y con los accesos mínimos necesarios."],
        ["¿Cómo revisan los cambios del entorno?","Se identifican responsables y procedimientos de registro y aprobación."],
        ["¿Qué controles se priorizan?","Los que cubren los riesgos más relevantes para datos y servicios críticos."],
      ] },
      { label: "Continuidad", items: [
        ["¿Tener copias es suficiente?","También hay que comprobar que la información pueda restaurarse."],
        ["¿Cómo se define la retención?","Según la criticidad de los datos y las necesidades de recuperación."],
        ["¿Qué incluye una prueba de recuperación?","Una restauración controlada, verificación de datos y medición del tiempo."],
      ] },
    ],
  },
  consulting: {
    title: "Una hoja de ruta que puedas ejecutar",
    scope: ["Objetivos y restricciones","Opciones y prioridades","Responsables y entregables"],
    groups: [
      { label: "Diagnóstico", items: [
        ["¿Quién participa en el diagnóstico?","Responsables del negocio, usuarios clave y quienes administran los sistemas."],
        ["¿Qué necesitan para comenzar?","Contexto del proceso, herramientas actuales y decisiones pendientes."],
        ["¿Se pueden revisar proyectos en marcha?","Sí. Se pueden evaluar avances, riesgos y dependencias."],
      ] },
      { label: "Estrategia", items: [
        ["¿Cómo se ordenan las iniciativas?","Por beneficio operativo, esfuerzo, dependencias y capacidad del equipo."],
        ["¿Pueden comparar proveedores?","Sí, con criterios acordados de funcionalidad, integración y costo."],
        ["¿Qué incluye una hoja de ruta?","Iniciativas, dependencias, responsables y puntos de revisión."],
      ] },
      { label: "Ejecución", items: [
        ["¿Pueden acompañar la implementación?","El acompañamiento puede incluir revisiones de hitos y validación de entregables."],
        ["¿Cómo se revisa el avance?","Cada hito se compara con los resultados y criterios acordados."],
        ["¿Qué pasa si cambian las prioridades?","Se revisa el impacto sobre entregables, dependencias y presupuesto."],
      ] },
    ],
  },
  labs: {
    title: "Pruebas pequeñas para decisiones de inversión",
    scope: ["Hipótesis verificable","Prototipo acotado","Evidencia y próximos pasos"],
    groups: [
      { label: "Hipótesis", items: [
        ["¿Qué hace verificable una hipótesis?","Un resultado observable que permita decidir si se sostiene."],
        ["¿Se pueden evaluar varias ideas?","Sí. Se comparan y se prioriza la de mayor incertidumbre o impacto."],
        ["¿Cómo eligen el alcance de la prueba?","Se prueba la parte de la idea que más puede cambiar la decisión."],
      ] },
      { label: "Prototipos", items: [
        ["¿Qué tipo de prototipo usan?","Depende de si hay que probar una interacción, un flujo o la viabilidad técnica."],
        ["¿Se necesitan datos reales?","En pruebas iniciales se pueden usar datos ficticios o anonimizados."],
        ["¿Puedo probarlo con usuarios?","Sí. Se definen tareas y comportamientos a observar."],
      ] },
      { label: "Validación", items: [
        ["¿Qué se entrega al terminar?","Los resultados, las limitaciones de la prueba y los siguientes pasos posibles."],
        ["¿Qué pasa si la hipótesis no se sostiene?","Se decide si ajustar la propuesta, probar otra alternativa o cerrar el experimento."],
        ["¿Cómo se pasa de prototipo a producción?","Se estima el trabajo adicional de integración, pruebas y operación."],
      ] },
    ],
  },
};

export const unitApproachPoints: Record<string, [string[], string[], string[], string[]]> = {
  software: [
    ["Documentamos cómo trabaja tu equipo.","Identificamos usuarios y permisos.","Priorizamos tareas para la primera versión."],
    ["Elegimos cómo organizar la aplicación.","Definimos qué datos y sistemas se conectan.","Acordamos criterios para validar la entrega."],
    ["Probamos los recorridos principales.","Desarrollamos por entregas revisables.","Validamos los cambios con tu equipo."],
    ["Preparamos el despliegue y la migración.","Transferimos accesos y documentación.","Acordamos el alcance del soporte."],
  ],
  intelligence: [
    ["Elegimos una tarea con un objetivo medible.","Registramos el esfuerzo manual actual.","Identificamos excepciones del proceso."],
    ["Revisamos muestras y permisos de uso.","Comparamos reglas, modelos e integración.","Delimitamos el alcance del piloto."],
    ["Conectamos las fuentes autorizadas.","Probamos casos frecuentes y excepciones.","Acordamos cuándo interviene una persona."],
    ["Comparamos tiempos y correcciones.","Revisamos errores con el equipo.","Ajustamos reglas según lo observado."],
  ],
  analytics: [
    ["Inventariamos sistemas y archivos.","Revisamos calidad y formatos de datos.","Identificamos quién mantiene cada fuente."],
    ["Definimos qué decisiones apoyará el panel.","Acordamos fórmulas y responsables.","Fijamos la frecuencia de actualización."],
    ["Organizamos los datos para el análisis.","Diseñamos vistas, gráficos y filtros.","Probamos las consultas más frecuentes."],
    ["Contrastamos resultados con las fuentes.","Revisamos diferencias con sus responsables.","Documentamos fórmulas y validaciones."],
  ],
  infrastructure: [
    ["Inventariamos servicios y equipos.","Identificamos dependencias críticas.","Revisamos accesos y copias existentes."],
    ["Estimamos el impacto de interrupciones.","Identificamos servicios que requieren atención.","Ordenamos mejoras según criticidad."],
    ["Aplicamos los controles acordados.","Verificamos que los servicios sigan operando.","Documentamos los cambios realizados."],
    ["Acordamos objetivos de recuperación.","Planificamos pruebas de restauración.","Definimos responsables y canales de soporte."],
  ],
  consulting: [
    ["Acordamos qué resultados busca tu equipo.","Escuchamos a responsables y usuarios clave.","Identificamos restricciones de plazo y presupuesto."],
    ["Revisamos procesos, sistemas y dependencias.","Detectamos problemas y trabajo duplicado.","Contrastamos los hallazgos con tu equipo."],
    ["Comparamos opciones por valor y esfuerzo.","Trazamos una hoja de ruta por etapas.","Acordamos responsables e hitos."],
    ["Revisamos los avances en cada hito.","Registramos riesgos y cambios de alcance.","Verificamos los entregables acordados."],
  ],
  labs: [
    ["Delimitamos el problema a investigar.","Formulamos una hipótesis comprobable.","Acordamos qué evidencia buscamos."],
    ["Comparamos enfoques y tecnologías.","Identificamos las dudas más importantes.","Elegimos la prueba de menor alcance útil."],
    ["Construimos el recorrido crítico.","Preparamos tareas y datos de prueba.","Observamos cómo se usa el prototipo."],
    ["Contrastamos resultados con la hipótesis.","Documentamos hallazgos y limitaciones.","Decidimos si iterar, escalar o cerrar."],
  ],
};
