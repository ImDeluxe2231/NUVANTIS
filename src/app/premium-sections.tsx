import { PhotoCard, PhotoHero, photoLink } from "./photo-sections";
import { ReferenceArt } from "./reference-art";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { TechnologyImage, UnitArtwork } from "./visuals";
import { projects } from "./projects-data";
import { Icon, type IconName } from "./ui";

const solutions: [string, string, string, IconName][] = [
  ["Transformación digital", "Prioriza qué procesos modernizar y define una ruta para integrarlos.", "consulting", "layers"],
  ["Desarrollo de software", "Construye aplicaciones, sistemas de gestión e integraciones a medida.", "software", "code"],
  ["IA y automatización", "Automatiza tareas repetitivas con flujos que admiten revisión humana.", "intelligence", "brain"],
  ["Analítica de negocios", "Consolida tus fuentes y convierte tus datos en indicadores operativos.", "analytics", "chart"],
  ["Infraestructura y seguridad", "Organiza la nube, los respaldos y los accesos de tu operación.", "infrastructure", "shield"],
  ["Consultoría tecnológica", "Evalúa alternativas y toma decisiones con un alcance claro.", "consulting", "layers"],
];

export function SolutionOverview() {
  return <section id="soluciones-principales" className="photo-solutions scroll-mt-28 bg-[#e3edf7] py-8 sm:py-9">
    <div className="mx-auto max-w-7xl px-5 sm:px-9">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0 max-w-4xl">
          <p className="text-xs font-semibold tracking-[.23em] text-[#355e85]">SOLUCIONES PRINCIPALES</p>
          <h2 className="mt-2 font-editorial text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-semibold tracking-tight text-[#102940]!">Soluciones tecnológicas para impulsar tu negocio.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#2d4a64] sm:text-base">Combinamos ingeniería, datos y estrategia para resolver desafíos de tu operación.</p>
        </div>
        <Link to="/servicios" className="reference-cta">Explorar soluciones <Icon name="arrow" size={17}/></Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map(([title, description, route, icon], index) => <Link key={title} data-photo={route} to={`/unidades/${route}`} className="reference-glass reference-solution group flex min-h-[12rem] flex-col items-start rounded-2xl border border-white/15 bg-linear-to-br from-white/10 to-white/3 px-5 py-5 text-white! transition hover:-translate-y-1 hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none">
          <h3 className="flex items-center gap-3 font-editorial text-lg leading-tight font-semibold"><span className="grid size-10 shrink-0 place-items-center rounded-xl border border-sky-100/35 bg-[#193551]"><Icon name={icon} size={18}/></span>{title}</h3>
          <p className="mt-4 max-w-[16rem] flex-1 text-sm leading-relaxed text-nuvantis-silver">{description}</p>
          <span className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-sky-100/45 bg-[#112842b8] px-3 text-sm font-semibold">Conocer solución <Icon name="arrow" size={16}/></span>
          <ReferenceArt index={index} icon={icon}/>
        </Link>)}
      </div>
    </div>
  </section>;
}

const demonstrations: Record<string, { title: string; steps: [string, string][] }> = {
  software: {title:"Sistema de gestión empresarial",steps:[["Pedidos","El equipo registra solicitudes y consulta su estado en un solo panel."],["Inventario","El catálogo centraliza existencias y alertas de reposición."],["Permisos","Cada perfil accede a las tareas que corresponden a su función."]]},
  intelligence: {title:"Flujo de automatización",steps:[["Recibir","El flujo recoge una solicitud de un canal autorizado."],["Clasificar","Se propone una categoría según reglas predefinidas."],["Revisar","Una persona verifica los casos ambiguos antes de continuar."]]},
  analytics: {title:"Panel de indicadores",steps:[["Operación","Vista de carga de trabajo semanal."],["Calidad","Vista de registros validados por periodo."],["Atención","Vista de consultas atendidas por canal."]]},
  infrastructure: {title:"Arquitectura de continuidad",steps:[["Acceso","Identidades y permisos delimitan el acceso al entorno."],["Servicios","Aplicaciones y almacenamiento se organizan por responsabilidad."],["Respaldo","Se definen copias, periodos de retención y pruebas de restauración."]]},
  consulting: {title:"Hoja de ruta tecnológica",steps:[["Diagnóstico","Levantamos objetivos, sistemas disponibles y restricciones."],["Prioridades","Ordenamos iniciativas por valor, esfuerzo y dependencias."],["Implementación","Definimos responsables, entregables y puntos de revisión."]]},
  labs: {title:"Prueba de concepto",steps:[["Hipótesis","Definimos qué pregunta necesitamos responder."],["Prototipo","Construimos una representación de la funcionalidad crítica."],["Validación","Evaluamos si la propuesta merece una siguiente inversión."]]},
};

const demonstrationDetails: Record<string, string[][]> = {
  software: [
    ["Registra el pedido con los datos que necesita el área que lo atenderá.", "Asigna un responsable y consulta qué pedidos están pendientes, en proceso o cerrados.", "Conserva el historial para revisar fechas, cambios y responsables."],
    ["Consulta existencias y movimientos de entrada o salida por ubicación.", "Define mínimos por producto para identificar cuándo reponer.", "Revisa diferencias entre el inventario físico y el registrado."],
    ["Separa los perfiles de administración, supervisión y operación.", "Define quién puede consultar, editar, aprobar o exportar información.", "Revisa el historial de cambios antes de ajustar un permiso."],
  ],
  intelligence: [
    ["Define el canal y los datos mínimos que debe incluir cada solicitud.", "Valida campos y deriva los registros incompletos para revisión."],
    ["Establece categorías a partir de ejemplos representativos.", "Envía a revisión las solicitudes que no encajen con las reglas."],
    ["Presenta a la persona revisora la propuesta y la información de origen.", "Registra la decisión para evaluar y ajustar el flujo."],
  ],
  analytics: [
    ["Agrupa la carga por periodo, área o responsable.", "Acuerda qué indicador ayuda a detectar un cuello de botella."],
    ["Identifica registros duplicados, incompletos o fuera de rango.", "Asigna responsables para corregir los datos en la fuente."],
    ["Compara canales y periodos con una definición compartida de consulta atendida.", "Desglosa la información para detectar cuándo aumenta la demanda."],
  ],
  infrastructure: [
    ["Identifica quién necesita acceso y con qué nivel de privilegios.", "Establece un procedimiento para altas, bajas y revisiones."],
    ["Relaciona cada aplicación con sus dependencias, almacenamiento y conectividad.", "Define qué componentes requieren monitoreo y responsables."],
    ["Acuerda con el negocio cuánta información se puede perder ante un incidente.", "Prueba la restauración y documenta el tiempo real de recuperación."],
  ],
  consulting: [
    ["Entrevista a responsables y documenta cómo funciona el proceso actual.", "Valida restricciones de presupuesto, plazos y herramientas."],
    ["Compara el valor de cada iniciativa con su esfuerzo y dependencias.", "Identifica qué cambios se pueden probar con menor costo."],
    ["Divide el trabajo en entregables que el equipo pueda validar.", "Acuerda fechas de revisión y quién toma cada decisión."],
  ],
  labs: [
    ["Delimita el problema y escribe qué evidencia apoyaría la hipótesis.", "Define qué resultado justificaría continuar o cambiar de enfoque."],
    ["Construye únicamente el recorrido crítico para la prueba.", "Prepara un guion de observación con tareas representativas."],
    ["Documenta dónde funciona la propuesta y dónde aparecen dudas.", "Decide qué ajustes conviene probar antes de escalar."],
  ],
};

export function UnitDemonstration({ unit }: { unit: string }) {
  const [active, setActive] = useState(0);
  const demo = demonstrations[unit];
  if (!demo) return null;
  const [label, description] = demo.steps[active];

  return <section className="unit-demo reference-surface px-6 py-10 text-white sm:px-10 lg:py-12">
    <div className="mx-auto grid max-w-7xl items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] lg:gap-x-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.23em] text-sky-100">Demostración conceptual</p>
        <h2 className="mt-3 font-editorial text-3xl font-bold tracking-tight text-white sm:text-4xl">{demo.title}</h2>
        <p className="mt-3 text-pretty leading-relaxed text-[#e2edf9]">Explora cómo funcionaría la solución en una operación de ejemplo. Las capacidades se ajustan después de revisar tu proceso.</p>
      </div>
      <div role="group" aria-label="Seleccionar escenario" className="grid gap-2 rounded-2xl border border-sky-200/25 bg-[#0a1c31]/60 p-2 min-[540px]:grid-cols-3">
        {demo.steps.map(([name], index) => <button key={name} type="button" aria-pressed={active === index} aria-controls={`${unit}-demo-scenario`} onClick={() => setActive(index)} className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-sky-200/35 bg-white/5 px-3 text-left text-sm font-semibold text-white transition-colors hover:bg-white/15 aria-pressed:border-sky-100 aria-pressed:bg-[#355a7b]">
          <span className="flex min-w-0 items-center gap-2"><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-lg bg-sky-100/10 text-xs text-sky-100">{String(index + 1).padStart(2, "0")}</span>{name}</span>
          <span aria-hidden="true" className="shrink-0"><Icon name="arrow" size={14}/></span>
        </button>)}
      </div>
      <div key={label} id={`${unit}-demo-scenario`} className="lg:col-span-2 motion-safe:animate-[unit-demo-enter_.4s_ease-out]">
        <article className="unit-demo-card relative isolate grid gap-5 overflow-hidden rounded-2xl border border-sky-200/35 bg-[#0b1b2d] p-5 text-white sm:p-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <UnitArtwork unit={unit} scene={active + 1} className="size-full object-cover object-center"/>
            <div className="absolute inset-0 bg-linear-to-r from-[#091a2ce0] via-[#0c2338a6] to-[#091a2c80]"/>
          </div>
          <div className="self-center">
            <h3 className="font-editorial text-2xl font-bold text-white">{label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sky-50">{description}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white">
              {demonstrationDetails[unit][active].map(point => <li key={point} className="flex gap-2"><span aria-hidden="true" className="mt-0.5 shrink-0"><Icon name="check" size={15}/></span>{point}</li>)}
            </ul>
          </div>
          <ScenarioPreview unit={unit} active={active} label={label}/>
        </article>
      </div>
    </div>
  </section>;
}

const softwarePreviewRows = [
  [["PED-104", "Reposición de insumos", "Pendiente"], ["PED-105", "Material de oficina", "En proceso"], ["PED-106", "Equipo de trabajo", "Cerrado"]],
  [["INV-021", "Cables de red", "42 unidades"], ["INV-022", "Monitores", "6 unidades"], ["INV-023", "Adaptadores", "Por reponer"]],
  [["01", "Administración", "Gestiona accesos"], ["02", "Supervisión", "Revisa y aprueba"], ["03", "Operación", "Registra pedidos"]],
];

const unitPreviewRows: Record<string, [string, string][][]> = {
  intelligence: [[["Solicitud de compra","Recibida"],["Correo de soporte","Datos completos"],["Factura entrante","Falta adjunto"]],[["Cambio de pedido","Operaciones"],["Consulta de cobro","Finanzas"],["Mensaje ambiguo","Revisión"]],[["Confirmar categoría","Asignada"],["Corregir propuesta","En revisión"],["Registrar decisión","Pendiente"]]],
  analytics: [[["Solicitudes ingresadas","124"],["Tareas completadas","98"],["Pendientes","26"]],[["Registros revisados","240"],["Incompletos","12"],["Duplicados","4"]],[["Correo","68 consultas"],["Formulario web","42 consultas"],["Teléfono","27 consultas"]]],
  infrastructure: [[["Administración","Acceso restringido"],["Operaciones","Acceso por rol"],["Visitante","Sin acceso"]],[["Aplicación web","Monitoreada"],["Base de datos","Red privada"],["Almacenamiento","Con respaldo"]],[["Copia nocturna","Completada"],["Retención","30 días"],["Restauración de prueba","Programada"]]],
  consulting: [[["Entrevistas","Completadas"],["Mapa de procesos","En revisión"],["Restricciones","Por validar"]],[["Integrar registros","Prioridad alta"],["Renovar portal","Prioridad media"],["Evaluar licencias","En análisis"]],[["Piloto de integración","Planificado"],["Validación con usuarios","Por programar"],["Revisión de resultados","Siguiente hito"]]],
  labs: [[["Problema observado","Registro duplicado"],["Hipótesis","Formulario único"],["Criterio de prueba","Menos pasos"]],[["Flujo principal","Prototipado"],["Datos de prueba","Preparados"],["Guion de uso","Listo"]],[["Tareas completadas","4 de 5"],["Punto de fricción","Confirmación"],["Siguiente iteración","Simplificar cierre"]]],
};

function ScenarioPreview({ unit, active, label }: { unit: string; active: number; label: string }) {
  return <figure className="min-w-0 overflow-hidden rounded-xl border border-[#486a89] bg-[#0a192a] shadow-lg">
    <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[#34516d] bg-[#1a3550] px-4 py-3 text-sm font-semibold text-white">
      <span className="flex items-center gap-2"><Icon name={active === 2 ? "shield" : "layers"} size={16}/> Panel de {label.toLowerCase()}</span>
      <span className="text-xs font-medium text-[#b9d6f1]">Datos de ejemplo</span>
    </figcaption>
    <ul className="grid gap-2 px-3 py-3">
      {(unit === "software" ? softwarePreviewRows[active] : unitPreviewRows[unit][active].map(([name, status], index) => [String(index + 1).padStart(2, "0"), name, status])).map(([code, name, status]) => <li key={code} className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-[#2b465f] bg-[#112841] px-3 py-2.5 text-sm">
        <span className="text-xs font-semibold tabular-nums text-[#b5cfe7]">{code}</span>
        <span className="min-w-0 flex-1 basis-28 font-medium text-white">{name}</span>
        <span className="rounded-md bg-[#254a67] px-2 py-1 text-xs font-medium text-[#e1f1ff]">{status}</span>
      </li>)}
    </ul>
  </figure>;
}

export const guides = [
  { id: "software-a-medida", title: "Antes de encargar software a medida", summary: "Prepara el alcance de tu primera reunión.", tips: ["Lista los procesos que el sistema debe cubrir y señala quién interviene en cada uno.", "Identifica qué herramientas deben intercambiar datos y qué accesos tienes disponibles.", "Acuerda con el equipo qué entregable permitirá validar la primera versión."] },
  { id: "automatizacion", title: "Cómo elegir un proceso para automatizar", summary: "Evalúa la tarea antes de decidir qué tecnología usar.", tips: ["Elige una tarea repetitiva con entradas y resultados que puedas describir con ejemplos.", "Documenta las excepciones e identifica cuáles requieren revisión humana.", "Prueba con un conjunto reducido de casos y compara el resultado con el proceso actual."] },
  { id: "indicadores", title: "Qué definir antes de construir un dashboard", summary: "Diseña el panel alrededor de decisiones concretas.", tips: ["Identifica quién consulta el indicador y qué decisión podrá tomar a partir de él.", "Acuerda cómo se calcula, de dónde vienen los datos y cada cuánto deben actualizarse.", "Verifica una muestra contra la fuente de origen antes de publicar."] },
];

const resourceCategories = [
  ["Software","software","code"],
  ["Automatización","intelligence","brain"],
  ["Datos","analytics","chart"],
  ["Infraestructura","infrastructure","shield"],
  ["Estrategia","consulting","layers"],
  ["Innovación","labs","spark"],
] as const;

const library = [...guides,
  { id:"respaldos", title:"Cómo preparar una estrategia de respaldos", summary:"Define cuánto puedes perder y cuánto tardarías en volver a operar.", tips:["Identifica qué información es crítica y quién debe recuperarla.", "Define la frecuencia y retención de las copias según el impacto de una pérdida.", "Prueba periódicamente una restauración y registra el resultado.", "Documenta quién actúa y cómo avisa al equipo ante un incidente."] },
  { id:"hoja-de-ruta", title:"Cómo priorizar una hoja de ruta tecnológica", summary:"Ordena iniciativas según su valor, esfuerzo y dependencias.", tips:["Enumera las dificultades actuales y el impacto de resolverlas.", "Estima el esfuerzo e identifica permisos, sistemas y personas necesarias.", "Empieza por un alcance que puedas validar pronto y agenda una revisión."] },
  { id:"prototipo", title:"Cómo validar una idea con un prototipo", summary:"Aprende qué construir antes de comprometer más tiempo y recursos.", tips:["Escribe una hipótesis concreta y define qué evidencia la confirmaría.", "Reproduce solo el recorrido necesario para ponerla a prueba.", "Observa a usuarios representativos, anota sus dudas y decide qué conviene cambiar."] },
];
const normalizeResource = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export function ResourcesPage() {
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const [params] = useSearchParams();
  const linkedGuide = params.get("guia");
  useEffect(() => {
    if (!linkedGuide) return;
    const frame = requestAnimationFrame(() => document.getElementById(linkedGuide)?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [linkedGuide]);
  const results = library.map((guide, index) => ({ guide, metadata: resourceCategories[index] })).filter(({guide, metadata}) =>
    (category === "Todas" || category === metadata[0]) &&
    normalizeResource(`${guide.title} ${guide.summary} ${metadata[0]}`).includes(normalizeResource(query.trim()))
  );
  return <div className="compact-photo-page bg-linear-to-br from-[#f5faff] to-[#d7e6f6]">
    <PhotoHero photo="analytics" label="RECURSOS NUVANTIS" title="Ideas para iniciar tu próximo proyecto." description="Guías con pasos concretos para desarrollar software, organizar datos y decidir qué tecnología necesita tu organización."><a href="#biblioteca" className="reference-cta">Explorar las guías</a></PhotoHero>
    <section id="biblioteca" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-9 sm:px-10 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-editorial text-4xl font-bold text-nuvantis-navy">Biblioteca de guías</h2>
        <label className="block w-full max-w-sm text-sm font-semibold text-nuvantis-navy">Buscar en Recursos
          <input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Ej. respaldos o prototipo" className="mt-2 w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-base"/>
        </label>
      </div>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Categorías">
        {["Todas",...resourceCategories.map(([name])=>name)].map(name=><button type="button" key={name} aria-pressed={category===name} onClick={()=>setCategory(name)} className="min-h-11 rounded-full border border-slate-400 bg-white px-4 text-sm font-semibold text-nuvantis-navy transition hover:border-nuvantis-blue aria-pressed:border-nuvantis-navy aria-pressed:bg-nuvantis-navy aria-pressed:text-white">{name}</button>)}
      </div>
      <p className="mt-5 text-sm text-slate-700" role="status">{results.length} {results.length === 1 ? "guía" : "guías"}</p>
      {results.length ? <div className="mt-4 grid auto-rows-fr items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(({guide,metadata:[name,photo,icon]}) => <div id={guide.id} key={guide.id} className="grid min-w-0 scroll-mt-28 grid-cols-1 rounded-2xl">
          <PhotoCard tone="light" {...{photo,icon}} title={guide.title} description={guide.summary}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#24567b]!">{name}</p>
            <ol className="mt-3 list-decimal space-y-2 border-t border-[#b6cee5] pt-3 pl-5 text-sm leading-relaxed text-[#294762]">
              {guide.tips.map(tip => <li key={tip}>{tip}</li>)}
            </ol>
          </PhotoCard>
        </div>)}
      </div> : <div className="mt-4 rounded-xl border border-slate-300 bg-white p-6"><p>No encontramos guías para esa búsqueda.</p><button type="button" onClick={()=>{setQuery("");setCategory("Todas");}} className="mt-2 min-h-11 font-semibold underline">Ver todas las guías</button></div>}
    </section>
  </div>;
}

export function ResourcesPreview() {
  return <section className="reference-surface py-20 text-white">
    <div className="mx-auto max-w-7xl px-5 sm:px-9">
      <h2 className="font-editorial text-4xl font-semibold tracking-tight text-white">Recursos para tu próximo proyecto</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {guides.map((guide, index) => <Link key={guide.id} to={`/recursos?guia=${guide.id}`} className="reference-glass block overflow-hidden">
          <TechnologyImage unit={["consulting","intelligence","analytics"][index]} className="aspect-[2/1] w-full object-cover"/>
          <div className="p-6">
          <h3 className="font-editorial text-xl font-semibold">{guide.title}</h3>
          <p className="mt-2 text-slate-200">{guide.summary}</p>
          <span className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">Ver guías</span></div>
        </Link>)}
      </div>
    </div>
  </section>;
}

export function ProjectPreview() {
  return <section className="reference-surface py-20 text-white sm:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-9">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 className="font-editorial text-4xl font-semibold tracking-tight sm:text-5xl">Proyectos conceptuales</h2>
        <Link to="/proyectos" className="rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10">Explorar la galería</Link>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {projects.slice(0, 3).map(project => <article key={project.title} className="reference-project-card overflow-hidden">
          <TechnologyImage unit={project.type === "Datos" ? "analytics" : project.type === "Automatización" ? "intelligence" : "software"} className="aspect-[2/1] w-full object-cover"/>
          <div className="p-6">
            <p className="text-sm text-nuvantis-silver">{project.type}</p>
            <h3 className="mt-2 font-editorial text-2xl font-semibold">{project.title}</h3>
            <p className="mt-3 leading-relaxed text-nuvantis-cyan">{project.solution}</p><Link to={`/proyectos?caso=${project.id}`} className={photoLink}>Ver caso conceptual</Link>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
