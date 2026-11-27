import { unitApproachPoints, unitDetails } from "./unit-details";
import { PhotoHero, unitContact } from "./photo-sections";
import { projects } from "./projects-data";
import { UnitDemonstration } from "./premium-sections";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { createContact, createIdea, getIdeas, PublicIdea } from "./api";
import { Button, CtaBand, Icon, IconName, PageHero, SectionHead, TechVisual } from "./ui";

import { services, sectors, legacyUnits } from "./content";
import { TechnologyImage, UnitArtwork } from "./visuals";



const faqs: [string, string][] = [
  ["¿Qué soluciones desarrollan?", "Software, aplicaciones web, datos, integraciones y automatización de acuerdo con la necesidad y el alcance."],
  ["¿Cómo se define el presupuesto?", "Después de comprender el objetivo, usuarios y alcance preparamos una propuesta con entregables, tiempos y costos."],
  ["¿Cuánto dura un proyecto?", "Depende de la complejidad y de las funcionalidades. El plazo se acuerda dentro de la propuesta."],
  ["¿Pueden trabajar con herramientas existentes?", "Sí. Primero revisamos su arquitectura, posibilidades de conexión y restricciones."],
];

function ServiceCards({ limit }: { limit?: number }) {
  return <div className="service-grid service-grid-links">{services.slice(0, limit).map(service => <Link className="service-card" to={`/unidades/${service.id}`} key={service.id}>
    <div className={`service-art art-${service.variant}`}><Icon name={service.icon} size={34}/><div className="code-lines"/><div className="art-orbit"/></div>
    <span className="eyebrow">{service.eyebrow}</span><h3>{service.title}</h3><p>{service.short}</p><span className="text-link">Explorar solución <Icon name="arrow" size={16}/></span>
  </Link>)}</div>;
}

function FaqList({ items = faqs }: { items?: [string, string][] }) {
  const [open, setOpen] = useState(0);
  return <div className="accordion">{items.map((item, i) => <article className={open === i ? "open" : ""} key={item[0]}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{item[0]}</span><b>{open === i ? "−" : "+"}</b></button><div className="accordion-content">{open === i && <p>{item[1]}</p>}</div></article>)}</div>;
}

function NeedSelector() {
  const items = [
    ["Automatizar tareas","Reduce pasos manuales y conecta tus procesos.","Automatización e IA","/soluciones/automatizacion-ia","automation"],
    ["Crear un sistema","Organiza tu operación con una herramienta diseñada para tu empresa.","Software a medida","/soluciones/software-a-medida","code"],
    ["Analizar datos","Convierte información dispersa en una visión clara del negocio.","Datos y dashboards","/soluciones/datos-integraciones","chart"],
    ["Aplicar IA","Explora usos de IA vinculados a una necesidad concreta.","IA aplicada","/soluciones/automatizacion-ia","brain"],
    ["Conectar plataformas","Haz que tus herramientas compartan información de forma controlada.","APIs e integraciones","/soluciones/datos-integraciones","link"],
    ["Mejorar la atención","Facilita consultas, solicitudes y gestiones de tus clientes.","Portales y aplicaciones","/soluciones/desarrollo-web","message"],
  ] as [string,string,string,string,IconName][];
  const [selected, setSelected] = useState(0);
  return <section className="section needs-section"><div className="container two-col">
    <div><SectionHead eyebrow="ENCUENTRA TU PUNTO DE PARTIDA" title={<>¿Qué quieres mejorar <em>en tu empresa?</em></>} subtitle="Elige una necesidad y descubre una ruta posible para empezar."/>
      <div className="need-grid">{items.map((item,i) => <button className={`need-option ${selected === i ? "selected" : ""}`} onClick={() => setSelected(i)} key={item[0]}><span className="icon-box"><Icon name={item[4]}/></span><b>{item[0]}</b>{selected === i && <Icon name="check" size={15}/>}</button>)}</div>
    </div>
    <div className="recommend-panel" key={selected}><span className="eyebrow">SOLUCIÓN RECOMENDADA</span><h3>{items[selected][2]}</h3><p>{items[selected][1]}</p><div className="recommend-visual"><TechVisual compact kind={items[selected][0]} variant={selected}/></div><div className="rec-line"><Icon name={items[selected][4]}/><span><b>Una propuesta basada en tu operación</b><small>Primero necesitamos comprender procesos, usuarios y restricciones.</small></span></div><Button to={items[selected][3]}>Explorar esta solución</Button></div>
  </div></section>;
}

export { CorporateHomePage as HomePage } from "./corporate";

function ProcessPreview() {
  const steps = ["Entendemos","Proponemos","Diseñamos","Desarrollamos","Implementamos","Mejoramos"];
  return <section className="section process-preview dark-section"><div className="container"><SectionHead light eyebrow="CÓMO TRABAJAMOS" title={<>De la necesidad a una <em>solución en marcha</em></>} subtitle="Un proceso con decisiones, revisiones y entregables compartidos."/><div className="process-strip">{steps.map((step,i) => <div className={i === 2 ? "active" : ""} key={step}><span>0{i+1}</span><b>{step}</b></div>)}</div><div className="section-action"><Button to="/proceso">Conocer el proceso</Button></div></div></section>;
}

export { BusinessUnitsPage as SolutionsPage } from "./corporate";

const capabilityIcons: IconName[][] = [
  ["code", "layers", "spark", "users", "link", "check"],
  ["message", "automation", "brain", "database", "layers", "link"],
  ["database", "brain", "chart", "automation", "layers", "link"],
  ["cloud", "link", "database", "automation", "shield", "check"],
  ["search", "layers", "spark", "automation", "users", "check"],
  ["search", "layers", "code", "spark", "check", "brain"],
];

const capabilityDescriptions = [
  ["Aplicaciones diseñadas alrededor de los procesos de tu empresa.","Gestiona operaciones, registros y permisos desde una plataforma central.","Interfaces adaptadas a las tareas y dispositivos de tus usuarios.","Espacios privados para clientes, proveedores o equipos internos.","Conecta sistemas y reduce la digitación duplicada.","Planifica correcciones, actualizaciones y mejoras de aplicaciones existentes."],
  ["Diseña asistentes que consultan fuentes y reglas acordadas.","Detecta tareas repetitivas que pueden pasar a un flujo automático.","Incorpora modelos con criterios de calidad y revisión humana.","Clasifica, extrae o resume datos con validación de resultados.","Enruta solicitudes y gestiona excepciones con responsables definidos.","Conecta herramientas para que intercambien información."],
  ["Organiza registros, relaciones y permisos de consulta.","Consolida información de distintas áreas para analizar el negocio.","Visualiza tendencias y resultados para tomar decisiones.","Define métricas, responsables y frecuencia de actualización.","Reduce el trabajo manual al preparar reportes recurrentes.","Une orígenes de datos con reglas claras de calidad."],
  ["Diseña un entorno de nube adecuado a tus cargas y presupuesto.","Organiza la conectividad y los recursos de tus aplicaciones.","Define copias, retención y pruebas de restauración.","Prepara procedimientos ante fallos y escenarios de interrupción.","Prioriza controles para accesos, información y sistemas.","Acuerda tareas de revisión y canales de atención."],
  ["Levanta el estado de procesos, herramientas y riesgos.","Relaciona sistemas, procesos y objetivos de la organización.","Define qué iniciativas deben recibir inversión y en qué orden.","Ordena entregables, dependencias y revisiones para cada etapa.","Coordina decisiones y avances con responsables visibles.","Compara opciones de acuerdo con el contexto y el costo operativo."],
  ["Formula preguntas que puedan comprobarse con evidencia.","Materializa una idea para probar la experiencia y recibir comentarios.","Comprueba una hipótesis técnica con un alcance acotado.","Explora alternativas antes de comprometer una implementación.","Contrasta viabilidad, recursos y posibles riesgos.","Define la oportunidad y las primeras pruebas de una idea de producto."],
];

const demonstrationScope: Record<string, string[]> = {
  intelligence: ["Qué tareas se automatizan y cómo se manejan solicitudes incompletas.", "Qué fuentes, canales y sistemas pueden conectarse.", "Cuándo interviene una persona y qué resultados se medirán."],
  analytics: ["Qué decisiones debe apoyar el análisis y quién toma cada una.", "De dónde vienen los datos y qué problemas de calidad afectan el resultado.", "Cómo se calcula cada métrica y con qué registros se verificará."],
  infrastructure: ["Qué servicios sostienen la operación y cómo dependen entre sí.", "Quién necesita acceso y con qué nivel de autorización.", "Qué datos se respaldan y cuánto tiempo puede interrumpirse un servicio."],
  consulting: ["Qué resultado espera el negocio y qué condiciona el proyecto.", "Qué iniciativas generan valor y de qué otras decisiones dependen.", "Quién valida cada hito y qué se revisa al terminar."],
  labs: ["Qué supuesto se quiere comprobar y qué resultado cambiaría la decisión.", "Qué parte del flujo debe representarse para observarla en uso.", "Qué evidencias se recogen y cuándo conviene iterar o escalar."],
};

const scopeDeliverables: Record<string, string> = {
  intelligence: "El flujo piloto, los puntos de revisión humana y las condiciones para ponerlo a prueba.",
  analytics: "Las métricas, sus fuentes y las comprobaciones necesarias para confiar en el panel.",
  infrastructure: "Los servicios críticos, los controles acordados y el plan de recuperación.",
  consulting: "Una hoja de ruta con prioridades, dependencias y responsables por etapa.",
  labs: "La hipótesis, el alcance del prototipo y los criterios para decidir el siguiente paso.",
};

const faqOrder: Record<string, number[]> = {
  intelligence: [0, 2, 1],
  analytics: [2, 1, 0],
  infrastructure: [1, 2, 0],
  consulting: [0, 1, 2],
  labs: [2, 0, 1],
};

export function SolutionDetailPage() {
  const { solutionId } = useParams();
  const service = services.find(s => s.id === (legacyUnits[solutionId || ""] || solutionId));
  if (!service) return <NotFoundPage />;
  const details = unitDetails[service.id];
  return <div className={`software-page compact-photo-page unit-detail unit-detail--${service.id}`}>
    <PhotoHero photo={service.id} label={service.eyebrow} title={service.title} description={service.need}>
      <Link className="reference-cta" to={unitContact(service.id)}>Conversemos sobre tu proyecto</Link>
      <a href="#capacidades-unidad" className="reference-glass inline-flex min-h-12 items-center px-5 font-semibold">Ver capacidades</a>
    </PhotoHero>
    <UnitDemonstration key={service.id} unit={service.id}/>
    <section className="unit-scope bg-linear-to-br from-[#f5f9ff] to-[#dce9f6] px-6 py-10 sm:px-10 lg:pt-[3.375rem] lg:pb-11">
      <div className="mx-auto grid max-w-7xl items-stretch gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#405875]">DEFINICIÓN DEL ALCANCE</p>
          <h2 className="mt-2 font-editorial text-3xl font-bold text-nuvantis-navy">{details?.title ?? "Software que encaja con tu operación"}</h2>
          <p className="mt-3 max-w-[35rem] leading-relaxed text-[#354c64]">{details ? service.need : "Revisamos cómo trabaja tu equipo, qué datos necesita y dónde pierde tiempo. Con esa información definimos una primera versión que puedas probar y validar."}</p>
          <dl className="mt-5 grid gap-2.5">
            {(details ? details.scope.map((term, index) => [term, demonstrationScope[service.id][index]]) : [
              ["Usuarios y permisos", "Qué tareas realiza cada perfil y a qué información necesita acceder."],
              ["Procesos prioritarios", "Qué pasos conviene simplificar en la primera versión y cómo validar el cambio."],
              ["Integraciones y datos", "Qué sistemas deben conectarse y qué registros deben conservarse."],
            ]).map(([term, description]) => <div key={term} className="grid grid-cols-[auto_1fr] gap-x-3 rounded-xl border border-[#bdcfe2] bg-white/75 p-3">
              <span aria-hidden="true" className="row-span-2 grid size-8 place-items-center rounded-lg bg-[#dceafa] text-[#234d74]"><Icon name="check" size={16}/></span>
              <dt className="text-sm font-bold text-[#132c47]">{term}</dt>
              <dd className="text-sm leading-snug text-[#354c64]">{description}</dd>
            </div>)}
          </dl>
        </div>
        <div className="unit-scope-photo group relative isolate flex min-h-72 items-end overflow-hidden rounded-2xl bg-[#142b45] p-5 shadow-lg sm:p-7">
          <UnitArtwork unit={service.id} scene={0} className="absolute inset-0 -z-20 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#081829] via-[#0b203450] to-transparent"/>
          <div className="max-w-md rounded-xl border border-white/25 bg-[#10263de6] p-4 text-white">
            <p className="text-sm font-bold">Qué queda definido</p>
            <p className="mt-1 text-sm leading-relaxed text-[#deedff]">{details ? scopeDeliverables[service.id] : "Las funciones de la primera versión, sus dependencias y los criterios para comprobar que responde a la necesidad."}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="capacidades-unidad" className="scroll-mt-32 bg-linear-to-br from-[#f4f9ff] to-[#d5e4f4] px-6 py-9 sm:px-10 lg:py-11">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="CAPACIDADES DE LA UNIDAD" title={`Qué podemos desarrollar con ${service.label}`} subtitle="Elige una capacidad para consultar cómo aplicarla en tu organización."/>
        <div className="unit-capabilities mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.builds.map((title, index) => <Link key={title} to={unitContact(service.id, title)} className="unit-capability group relative isolate flex flex-col items-start gap-2 overflow-hidden rounded-2xl border p-4 sm:p-5 focus-visible:outline-2 focus-visible:outline-offset-2">
            <UnitArtwork unit={service.id} scene={index + 4} className="unit-card-image pointer-events-none absolute inset-0 -z-20 size-full object-cover object-right motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"/>
            <span aria-hidden="true" className="unit-capability-icon grid size-9 place-items-center rounded-lg"><Icon name={capabilityIcons[service.variant][index]} size={18}/></span>
            <div className="w-[79%]">
              <h3 className="text-lg leading-tight font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-snug">{capabilityDescriptions[service.variant][index]}</p>
            </div>
            <span aria-hidden="true" className="unit-card-link mt-auto inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold">Consultar <Icon name="arrow" size={14}/></span>
          </Link>)}
        </div>
      </div>
    </section>
    <section className="section interface-showcase dark-section"><div className="container showcase-grid"><div><span className="eyebrow">EJEMPLO VISUAL</span><h2>Capacidades que se conectan con tu organización</h2><p>Cada unidad conecta capacidades técnicas con necesidades empresariales. El alcance y los entregables se definen después de comprender tu contexto.</p><ul>{service.features.map(x => <li key={x}><Icon name="check" size={15}/>{x}</li>)}</ul></div><TechVisual kind={service.title} variant={service.variant}/></div></section>
    <section className="unit-approach bg-linear-to-br from-[#f3f8ff] to-[#d7e6f5] px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="CÓMO LO PLANTEAMOS" title="Del problema a un alcance claro" subtitle="Avanzamos con decisiones compartidas y validaciones en momentos clave."/>
          <Button to="/proceso">Ver nuestro proceso</Button>
        </div>
        <ol className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {service.approach.map((step, index) => (
            <li key={step} className="unit-approach-card group relative isolate grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-[#7292b0] bg-[#102942] shadow-md transition-shadow hover:shadow-xl">
              <div className="unit-approach-media relative isolate grid min-h-36 content-between gap-2 overflow-hidden p-4">
                <UnitArtwork unit={service.id} scene={index + 10} className="unit-card-image pointer-events-none absolute inset-0 -z-20 size-full object-cover object-[50%_35%]"/>
                <span className="grid size-8 place-items-center rounded-lg border border-sky-100/60 bg-[#102942de] text-xs font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-editorial text-lg leading-tight font-bold text-white!">{step}</h3>
              </div>
              <ul className="grid content-start gap-2 border-t border-sky-100/20 bg-[#091a2e] px-4 py-3 text-[0.8125rem] leading-[1.4] text-sky-50">
                {unitApproachPoints[service.id][index].map(point => <li key={point} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-sky-300"><Icon name="check" size={14}/></span>
                  <span>{point}</span>
                </li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <UnitFaq key={service.id} service={service}/>
    {service.id === "labs" ? <LabsNextSteps/> : <CtaBand title={`Conecta tu siguiente proyecto con NUVANTIS ${service.label}.`} />}
  </div>;
}

function LabsNextSteps() {
  const options = [
    { title: "Explora el Muro de Ideas", description: "Descubre qué problemas propone resolver la comunidad o comparte una idea para que el equipo la revise.", label: "Ir al Muro de Ideas", to: "/muro-de-ideas", photo: 0, icon: "spark" },
    { title: "Conversemos sobre tu proyecto", description: "Si ya tienes un desafío concreto, cuéntanos qué necesitas comprobar y qué resultado buscas. Podemos ayudarte a definir una primera prueba.", label: "Contactar a Labs", to: unitContact("labs"), photo: 3, icon: "message" },
  ] as const;

  return <section aria-labelledby="labs-next-steps" className="bg-linear-to-br from-[#f9f7ff] to-[#e1eaf6] px-6 py-9 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <h2 id="labs-next-steps" className="font-editorial text-3xl font-bold text-[#152740]">Dale forma a tu próxima idea</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {options.map(({ title, description, label, to, photo, icon }) => (
          <article key={title} className="group relative isolate flex flex-col items-start overflow-hidden rounded-2xl border border-[#a8bbe0] bg-[#14243f] p-5 shadow-md sm:p-6">
            <UnitArtwork unit="labs" scene={photo} className="pointer-events-none absolute inset-y-0 right-0 -z-20 size-full object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105 sm:w-[65%]"/>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#121e37] from-32% via-[#182647e8] via-65% to-[#1a255270]"/>
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl border border-[#c9c5fa55] bg-[#b7a6ff29] text-[#ede6ff]"><Icon name={icon} size={20}/></span>
            <h3 className="mt-3 font-editorial text-xl font-bold text-white!">{title}</h3>
            <p className="mt-2 mb-4 max-w-[27rem] text-sm leading-relaxed text-[#e4ebfa]">{description}</p>
            <Link to={to} className="mt-auto inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#eef1ff] px-4 text-sm font-bold text-[#172540] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{label}<Icon name="arrow" size={16}/></Link>
          </article>
        ))}
      </div>
    </div>
  </section>;
}

const softwareFaqDetails: [string, string][] = [
      ["¿Qué necesito para solicitar una propuesta?", "Cuéntanos qué proceso quieres mejorar, quiénes lo usan y con qué herramientas trabajan hoy. Podemos ayudarte a ordenar los requisitos en la primera conversación."],
      ["¿Cómo se definen el costo y los plazos?", "Estimamos según alcance, integraciones, migración y pruebas. La propuesta indica qué incluye cada etapa y qué depende de información o accesos de tu equipo."],
      ["¿Pueden migrar información de Excel u otro sistema?", "Evaluamos el formato, la calidad y el volumen de los datos. Antes de migrar, acordamos qué se conserva y validamos una muestra."],
      ["¿Cómo reviso el avance antes de publicar?", "Presentamos entregas revisables y acordamos qué debe pasar cada prueba de aceptación antes de la puesta en marcha."],
      ["¿Qué recibo al finalizar el proyecto?", "Los entregables se definen en la propuesta. Pueden incluir documentación, capacitación y transferencia de accesos. Las condiciones del código fuente y del soporte se acuerdan según el proyecto."],
];

function UnitFaq({ service }: { service: (typeof services)[number] }) {
  const original = service.faq;
  const details = unitDetails[service.id];
  const [category, setCategory] = useState(0);
  const groups = details ? details.groups.map(({ label, items }, index) => ({ label, items: [original[faqOrder[service.id][index]], ...items] })) : [
    { label: "Desarrollo", items: [original[0], softwareFaqDetails[0], softwareFaqDetails[1], ["¿Podemos empezar con una versión mínima?", "Sí. Podemos definir un primer alcance con las funciones esenciales, validarlo con los usuarios y planificar las siguientes mejoras con ese aprendizaje."]] },
    { label: "Integraciones y datos", items: [original[1], softwareFaqDetails[2], ["¿Qué información necesitan para evaluar una integración?", "Identificamos los sistemas involucrados, los datos que deben intercambiar y la frecuencia de actualización. Con esa información revisamos las opciones de conexión."], ["¿Cómo validan los datos migrados?", "Según el alcance, revisamos muestras, comprobamos campos obligatorios y conciliamos los registros antes de validar la migración contigo."]] },
    { label: "Entrega y soporte", items: [softwareFaqDetails[3], softwareFaqDetails[4], original[2], ["¿Qué se entrega al finalizar el proyecto?", "La propuesta define los entregables de cierre. Pueden incluir documentación técnica, guías de uso y una sesión de transferencia para el equipo responsable."]] },
  ];

  return <section className="bg-linear-to-br from-[#f6faff] to-[#e3edf8] px-6 py-10 sm:px-10">
    <div className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <aside aria-labelledby={`${service.id}-faq-title`} className="relative isolate overflow-hidden rounded-3xl border border-[#294967] bg-linear-to-br from-[#0b1830] via-[#142d48] to-[#235072] p-6 text-white shadow-[0_18px_36px_-22px_#142d48] sm:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,#bce5ff30_1px,transparent_0)] bg-size-[18px_18px]"/>
        <h2 id={`${service.id}-faq-title`} className="font-editorial text-3xl font-bold">Preguntas <span className="block text-[#addbff]">frecuentes</span></h2>
        <p className="mt-3 text-sm leading-relaxed text-[#e1edf9]">{details ? `Resuelve tus dudas sobre ${service.label} y cuéntanos qué necesitas para tu proyecto.` : "Resuelve tus dudas sobre desarrollo, integración y soporte. Si tienes un proyecto en mente, cuéntanos qué necesitas."}</p>
        <ul className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-[#e1edf9]">
          {([{ icon: "layers", label: "Alcance" }, { icon: "shield", label: "Datos" }, { icon: "message", label: "Soporte" }] satisfies { icon: IconName; label: string }[]).map(({icon, label}) => <li key={label} className="grid justify-items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-1 py-3"><span aria-hidden="true" className="text-[#addbff]"><Icon name={icon} size={18}/></span>{label}</li>)}
        </ul>
        <Link to={details ? unitContact(service.id) : "/contacto"} className="group mt-5 flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2">
          <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#bce5ff]/15 text-[#addbff]"><Icon name="message" size={17}/></span>
          <span className="flex-1">Conversa con nosotros</span>
          <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"><Icon name="arrow" size={16}/></span>
        </Link>
      </aside>
      <div className="min-w-0">
      <div role="group" aria-label="Temas de preguntas frecuentes" className="flex flex-wrap gap-2">
        {groups.map(({label}, index) => <button type="button" key={label} aria-pressed={category === index} aria-controls={`${service.id}-faq-answers`} onClick={() => setCategory(index)} className="min-h-11 rounded-xl border border-[#aec7de] bg-white px-4 text-sm font-semibold text-[#213d58] shadow-sm transition-colors hover:border-[#4276a8] aria-pressed:border-[#173551] aria-pressed:bg-[#173551] aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2"><span aria-hidden="true" className="mr-2 inline-block size-1.5 rounded-full bg-current opacity-70"/>{label}</button>)}
      </div>
      <div id={`${service.id}-faq-answers`} key={category} className="mt-3 grid gap-2 motion-safe:animate-[photo-heading-in_.3s_ease-out]">
        {groups[category].items.map(([question, answer], index) => <details key={question} name={`${service.id}-faq`} open={index === 0} className="group rounded-xl border border-[#c3d5e7] bg-white shadow-sm open:border-[#6f9cc4]">
          <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 font-semibold text-nuvantis-navy focus-visible:outline-2 focus-visible:outline-offset-[-3px] [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="text-xs tabular-nums text-[#486b8d]">{String(index + 1).padStart(2,"0")}</span>
            <span className="flex-1">{question}</span>
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e8f2fc] text-[#284e72] motion-safe:transition-transform group-open:rotate-180"><Icon name="chevron" size={16}/></span>
          </summary>
          <p className="mx-4 mb-4 border-l-2 border-[#80acd3] pl-3 text-sm leading-relaxed text-[#405875]">{answer}</p>
        </details>)}
      </div>
      </div>
    </div>
  </section>;
}

export function SectorsPage() {
  const [sectorParams] = useSearchParams();
  const initialSector = Number(sectorParams.get("sector") || 0);
  const [selected, setSelected] = useState(Number.isInteger(initialSector) && initialSector >= 0 && initialSector < sectors.length ? initialSector : 0);
  const item = sectors[selected];
  const photo = ["software", "analytics", "infrastructure", "consulting"][selected];
  return <div className="compact-photo-page bg-linear-to-br from-[#f5f9ff] via-[#edf3fa] to-[#dce8f5]">
    <PhotoHero photo="consulting" label="SOLUCIONES POR SECTOR" title="Tecnología que se adapta a cada contexto." description="Explora cómo podemos aplicar nuestras capacidades a los procesos de tu organización.">
      <a href="#explorar-sectores" className="reference-cta">Explorar sectores</a>
    </PhotoHero>
    <section id="explorar-sectores" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-9 sm:px-10 lg:py-12">
      <h2 className="font-editorial text-3xl font-bold tracking-tight text-nuvantis-navy">Encuentra tu sector</h2>
      <div role="group" aria-label="Seleccionar sector" className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {sectors.map((sector, index) => <button key={sector.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className="flex min-h-12 items-center gap-2 rounded-xl border border-[#bccde0] bg-[#f9fcff] px-3 py-2 text-left text-sm font-semibold text-nuvantis-navy transition-colors hover:border-[#315d86] aria-pressed:border-[#173551] aria-pressed:bg-[#173551] aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2">
          <span aria-hidden="true" className="shrink-0"><Icon name={sector.icon} size={18}/></span>{sector.name}
        </button>)}
      </div>
      <article key={item.name} className="mt-4 grid overflow-hidden rounded-2xl border border-[#bccde0] bg-[#f9fcff] shadow-lg motion-safe:animate-[photo-heading-in_.35s_ease-out] lg:grid-cols-[.85fr_1.15fr]">
        <div className="relative isolate flex min-h-48 items-end overflow-hidden bg-[#132941] p-5 text-white">
          <TechnologyImage unit={photo} className="absolute inset-0 -z-20 size-full object-cover"/>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#08182af5] to-transparent"/>
          <span className="text-sm font-semibold">{item.name}</span>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-editorial text-2xl font-bold text-nuvantis-navy">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-[#43566c]">{item.need}</p>
          <h4 className="mt-4 text-sm font-semibold text-nuvantis-navy">Ejemplos de solución</h4>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {item.examples.map(example => <li key={example} className="flex items-center gap-2 rounded-lg border border-[#cddbeb] bg-[#eef4fb] px-3 py-2 text-sm text-nuvantis-navy"><Icon name="check" size={15}/>{example}</li>)}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button to="/contacto">Conversemos sobre tu sector</Button>
            <Link to="/proceso" className="text-sm font-semibold underline underline-offset-4">Cómo trabajamos</Link>
          </div>
        </div>
      </article>
    </section>
    <section className="mx-auto max-w-7xl px-6 pb-8 sm:px-10">
      <div className="grid items-center gap-4 rounded-2xl border border-[#bccde0] bg-[#f9fcff] p-5 sm:p-7 lg:grid-cols-[1fr_1fr_auto]">
        <div><p className="text-xs font-semibold tracking-widest text-[#465e78]">UN ENFOQUE ADAPTABLE</p><h2 className="mt-2 font-editorial text-xl font-bold text-nuvantis-navy">Conocemos el sector y diseñamos para tu organización</h2></div>
        <p className="text-sm leading-relaxed text-[#43566c]">Las regulaciones, equipos, usuarios y sistemas cambian entre organizaciones. Por eso validamos cada decisión antes de convertirla en una funcionalidad.</p>
        <Button to="/proceso">Conocer cómo trabajamos</Button>
      </div>
    </section>
  </div>;
}

export function ProjectsPage() {
  const [filter, setFilter] = useState("Todos");
  const [projectParams, setProjectParams] = useSearchParams();
  const open = projects.find(project => project.id === projectParams.get("caso")) ?? null;
  const setOpen = (project: typeof projects[number] | null) =>
    setProjectParams(project ? { caso: project.id } : {}, { replace: true, preventScrollReset: true });
  const shown = projects.filter(p => filter === "Todos" || p.type === filter);
  const photos = ["software", "analytics", "intelligence", "consulting", "infrastructure", "labs"];
  return <div className="compact-photo-page bg-linear-to-br from-[#f6faff] to-[#d9e8f6]">
    <PhotoHero photo="infrastructure" label="PROYECTOS NUVANTIS" title="Del reto a una solución digital." description="Explora seis proyectos conceptuales y descubre cómo podríamos aplicar estas capacidades en tu organización.">
      <a href="#galeria-proyectos" className="reference-cta">Explorar proyectos</a>
    </PhotoHero>
    <section id="galeria-proyectos" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-9 sm:px-10 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl font-bold tracking-tight text-nuvantis-navy sm:text-4xl">Galería de proyectos</h2>
          <p className="mt-2 text-sm text-slate-700">Propuestas ilustrativas de software, datos y automatización.</p>
        </div>
        <div role="group" aria-label="Filtrar proyectos por categoría" className="flex flex-wrap gap-2">
          {["Todos","Software","Datos","Automatización","Web"].map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)} className="min-h-11 rounded-full border border-[#a9bfd5] bg-white px-3 text-sm font-semibold text-nuvantis-navy transition-colors hover:border-[#315d86] aria-pressed:bg-[#173551] aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2">{category}</button>)}
        </div>
      </div>
      <p role="status" className="mt-4 text-sm font-medium text-[#405875]">{shown.length} {shown.length === 1 ? "proyecto conceptual" : "proyectos conceptuales"}</p>
      <div key={filter} className="mt-3 grid gap-4 motion-safe:animate-[photo-heading-in_.35s_ease-out] sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(item => <article key={item.id} className="group relative isolate flex min-h-[21rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-[#759cbe] bg-[#142b45] p-5 text-white shadow-lg transition-shadow hover:shadow-xl sm:p-6">
          <TechnologyImage unit={photos[projects.indexOf(item)]} className="absolute inset-0 -z-20 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105"/>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#081829] from-12% via-[#10263ef7] via-58% to-[#2d547788]"/>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg border border-sky-100/50 bg-[#183b60d9]"><Icon name={item.icon} size={18}/></span>
            <span className="rounded-full border border-sky-100/40 bg-[#163656de] px-3 py-1 text-xs font-bold">{item.type}</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#edf5ff]">{item.solution}</p>
          <dl className="mt-3 border-t border-sky-100/30 pt-3 text-sm text-[#dbe9f7]"><dt className="font-bold text-white">Reto</dt><dd className="mt-1">{item.challenge}</dd></dl>
          <ul aria-label="Capacidades" className="mt-3 flex flex-wrap gap-1.5">{item.features.split(" · ").map(feature => <li key={feature} className="rounded-md bg-sky-100/10 px-2 py-1 text-xs">{feature}</li>)}</ul>
          <div className="mt-auto pt-4"><button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-sky-100/55 bg-[#173a59] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#28567f] focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => setOpen(item)}>Explorar ejemplo <Icon name="arrow" size={16}/></button></div>
        </article>)}
      </div>
    </section>
    {open && <Modal onClose={() => setOpen(null)}>
      <div className="relative isolate flex min-h-36 flex-col justify-end overflow-hidden rounded-xl bg-[#10243b] p-5 text-white">
        <TechnologyImage unit={photos[projects.indexOf(open)]} className="absolute inset-0 -z-20 size-full object-cover"/>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#081829f7] to-[#183b6055]"/>
        <p className="text-xs font-bold uppercase tracking-widest text-sky-100">Ejemplo conceptual · {open.type}</p>
        <h2 className="mt-2 font-editorial text-3xl font-bold text-white">{open.title}</h2>
      </div>
      <dl className="my-5 grid gap-4 text-sm text-[#263e59] sm:grid-cols-2">
        <div><dt className="font-bold">Reto</dt><dd className="mt-1 leading-relaxed">{open.challenge}</dd></div>
        <div><dt className="font-bold">Solución propuesta</dt><dd className="mt-1 leading-relaxed">{open.solution}</dd></div>
        <div className="rounded-lg bg-[#eaf2fb] p-3 sm:col-span-2"><dt className="font-bold">Funcionalidades</dt><dd className="mt-1">{open.features}</dd></div>
      </dl>
      <Button to="/contacto">Quiero explorar algo similar</Button>
    </Modal>}
  </div>;
}

const processSteps = [
  ["Entendemos","Conocemos tus objetivos, procesos y restricciones.",["Objetivos","Usuarios","Proceso actual","Restricciones"]],
  ["Proponemos","Definimos el alcance y una ruta de trabajo.",["Alcance","Priorización","Ruta de trabajo","Propuesta"]],
  ["Diseñamos","Preparamos la experiencia, arquitectura y prototipo.",["Arquitectura","Prototipo","Experiencia de usuario","Diseño de interfaz"]],
  ["Desarrollamos","Construimos y revisamos la solución por etapas.",["Módulos","Integraciones","Pruebas","Revisiones"]],
  ["Implementamos","Configuramos y acompañamos la puesta en marcha.",["Configuración","Publicación","Transferencia","Acompañamiento"]],
  ["Mejoramos","Damos seguimiento y evaluamos nuevos ajustes.",["Seguimiento","Aprendizajes","Ajustes","Evolución"]],
] as [string,string,string[]][];

export function ProcessPage() {
  const [step, setStep] = useState(0);
  const [title, summary, deliverables] = processSteps[step];
  const photo = ["consulting", "analytics", "labs", "software", "infrastructure", "intelligence"][step];

  const icons = ["search", "layers", "spark", "code", "shield", "chart"] as const;
  const stageDetails = [
    ["Entrevistamos a quienes ejecutan el proceso, revisamos las herramientas actuales e identificamos dónde se pierde tiempo o información.", "Un mapa del proceso actual, con responsables, problemas priorizados y una forma de medir el punto de partida."],
    ["Comparamos opciones como adaptar una herramienta, conectar sistemas existentes o construir una solución. Estimamos esfuerzo y dependencias.", "Una propuesta por fases con alcance, entregables, supuestos y exclusiones para decidir por dónde empezar."],
    ["Modelamos los recorridos, los permisos y las integraciones. Probamos el prototipo con tareas representativas y registramos los ajustes.", "Un prototipo navegable, un esquema técnico y criterios de aceptación para los recorridos principales."],
    ["Construimos por incrementos, probamos las reglas del negocio y validamos las integraciones con datos de prueba.", "Versiones revisables en un entorno de prueba, con resultados de validación y una lista de pendientes."],
    ["Preparamos el entorno, los accesos y, si corresponde, la migración. Comprobamos los recorridos críticos y acordamos cómo responder ante fallos.", "Una lista de puesta en marcha, documentación de uso y responsables de la operación inicial."],
    ["Revisamos incidencias, comentarios y los indicadores acordados. Separamos correcciones de nuevas necesidades y priorizamos el trabajo.", "Una lista de mejoras ordenada por impacto y esfuerzo, con responsables y fechas de revisión."],
  ];
  const [activities, outcome] = stageDetails[step];
  const checkpoints = [
    "Acordamos qué problema merece prioridad y cómo reconoceremos una mejora.",
    "Revisamos contigo el alcance, las dependencias y lo que entra en la primera entrega.",
    "Validamos el recorrido con un prototipo antes de invertir en desarrollo.",
    "Revisamos módulos e integraciones en ciclos cortos con criterios de aceptación.",
    "Comprobamos el entorno, la transferencia al equipo y el plan de puesta en marcha.",
    "Revisamos el uso y las incidencias para priorizar la siguiente mejora.",
  ];

  return <div className="compact-photo-page bg-linear-to-br from-[#f5f9ff] to-[#dce8f5]">
    <PhotoHero photo="consulting" label="CÓMO TRABAJAMOS" title="Un proceso claro para construir con confianza." description="De tu necesidad a una solución en marcha, con decisiones y entregables compartidos.">
      <a href="#etapas" className="reference-cta">Explorar las etapas</a>
    </PhotoHero>
    <section id="etapas" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-7 sm:px-10 sm:py-9">
      <h2 className="text-center font-editorial text-3xl font-bold tracking-tight text-nuvantis-navy sm:text-4xl">Del diagnóstico a la mejora continua</h2>
      <p className="mx-auto mt-1.5 max-w-xl text-center leading-relaxed text-[#43566c]">Elige una etapa para ver qué hacemos, qué entregamos y qué validamos contigo.</p>
      <div role="group" aria-label="Seleccionar etapa" className="relative isolate mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:before:absolute lg:before:inset-x-[8%] lg:before:top-6 lg:before:-z-10 lg:before:h-px lg:before:bg-[#7c9cbd]">
        {processSteps.map(([name], index) => <button key={name} type="button" aria-pressed={step === index} aria-controls="detalle-etapa" onClick={() => setStep(index)} className="group flex min-h-12 min-w-0 flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 rounded-xl border border-[#b6cce2] bg-[#f6faff] px-2 py-1.5 text-center text-sm font-semibold text-nuvantis-navy shadow-sm transition-colors hover:border-[#315d86] aria-pressed:border-[#183c60] aria-pressed:bg-[#173551] aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-[transform,background-color] motion-safe:hover:-translate-y-1">
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-lg border border-[#8fafce] bg-[#dceafa] text-[#173551] group-aria-pressed:border-sky-200/50 group-aria-pressed:bg-white/10 group-aria-pressed:text-sky-100"><Icon name={icons[index]} size={15}/></span>
          <span aria-hidden="true" className="text-[11px] tabular-nums tracking-widest">{String(index + 1).padStart(2, "0")}</span>
          <span className="max-w-full wrap-break-word">{name}</span>
        </button>)}
      </div>
      <article id="detalle-etapa" aria-live="polite" key={step} className="mt-3 grid overflow-hidden rounded-2xl border border-[#bccde0] bg-[#f9fcff] shadow-lg motion-safe:animate-[photo-heading-in_.35s_ease-out] lg:grid-cols-[.65fr_1.35fr]">
        <div className="relative isolate flex min-h-52 items-end overflow-hidden bg-[#132941] p-5">
          <TechnologyImage unit={photo} className="absolute inset-0 -z-20 size-full object-cover"/>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#08182af5] to-transparent"/>
          <span className="text-sm font-semibold text-white">Etapa {step + 1} de {processSteps.length}</span>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="font-editorial text-2xl font-bold text-nuvantis-navy">{title}</h3>
          <p className="mt-2 leading-relaxed text-[#43566c]">{summary}</p>
          <div className="mt-4 grid gap-4 border-t border-[#cddbeb] pt-4 sm:grid-cols-2">
            <div><h4 className="text-sm font-bold text-nuvantis-navy">Qué hacemos</h4><p className="mt-1 text-sm text-[#43566c]">{activities}</p></div>
            <div><h4 className="text-sm font-bold text-nuvantis-navy">Qué recibes</h4><p className="mt-1 text-sm text-[#43566c]">{outcome}</p></div>
          </div>
          <h4 className="mt-4 text-sm font-semibold text-nuvantis-navy">Puntos que cubrimos</h4>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">{deliverables.map(item => <li key={item} className="flex items-center gap-2 rounded-lg border border-[#cddbeb] bg-[#eef4fb] px-3 py-2 text-sm text-nuvantis-navy"><Icon name="check" size={15}/>{item}</li>)}</ul>
          <div className="mt-5 border-l-2 border-[#6087ab] bg-[#eef4fb] px-4 py-3">
            <h4 className="text-sm font-bold text-nuvantis-navy">Qué validamos contigo</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#43566c]">{checkpoints[step]}</p>
          </div>
        </div>
      </article>
    </section>
    <section className="mx-auto max-w-7xl px-6 pb-8 sm:px-10">
      <div className="grid items-center gap-3 rounded-2xl border border-[#bccde0] bg-[#f9fcff] p-5 sm:p-7 lg:grid-cols-2">
        <h2 className="font-editorial text-xl font-bold text-nuvantis-navy">Las decisiones importantes se comparten.</h2>
        <p className="text-sm leading-relaxed text-[#43566c]">Validamos objetivos, prototipos y entregables contigo. Así puedes seguir el avance y revisar el alcance en cada etapa.</p>
      </div>
    </section>
  </div>;
}

export { AboutCorporatePage as AboutPage } from "./corporate";

const seedNotes = [
  { id: -1, text: "Quiero automatizar mis reportes.", category: "Procesos", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -2, text: "Necesito conectar mis sistemas.", category: "Innovación", color: "cream", author_mode: "anonymous", display_name: "" },
  { id: -3, text: "Me gustaría organizar mejor las reservas.", category: "Atención", color: "purple", author_mode: "anonymous", display_name: "" },
  { id: -4, text: "Quiero consultar mis datos en un solo lugar.", category: "Datos", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -5, text: "Necesito dar seguimiento a solicitudes internas.", category: "Procesos", color: "cream", author_mode: "anonymous", display_name: "" },
  { id: -6, text: "Me gustaría comparar las ventas por sede sin juntar hojas de cálculo cada semana.", category: "Datos", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -7, text: "Quiero mostrar el estado de cada solicitud para reducir las consultas repetidas.", category: "Atención", color: "purple", author_mode: "anonymous", display_name: "" },
  { id: -8, text: "Me gustaría probar un prototipo de autoservicio para trámites frecuentes.", category: "Innovación", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -9, text: "Quiero dejar de copiar manualmente los pedidos entre sistemas.", category: "Procesos", color: "cream", author_mode: "anonymous", display_name: "" },
  { id: -10, text: "Necesito detectar registros duplicados antes de generar los informes.", category: "Datos", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -11, text: "Me gustaría recordar las citas pendientes desde un solo panel.", category: "Atención", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -12, text: "Quiero probar un asistente interno para consultar procedimientos.", category: "Innovación", color: "purple", author_mode: "anonymous", display_name: "" },
  { id: -13, text: "Me gustaría recibir un aviso cuando una aprobación se quede pendiente.", category: "Procesos", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -14, text: "Quiero reunir el inventario de todas las sedes en un tablero.", category: "Datos", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -15, text: "Quiero que las consultas lleguen al área que puede resolverlas.", category: "Atención", color: "purple", author_mode: "anonymous", display_name: "" },
  { id: -16, text: "Me gustaría validar con usuarios un portal antes de desarrollarlo.", category: "Innovación", color: "cream", author_mode: "anonymous", display_name: "" },
  { id: -17, text: "Quiero asignar cada solicitud al responsable correcto en el momento del registro.", category: "Procesos", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -18, text: "Necesito comparar el presupuesto con los gastos de cada proyecto.", category: "Datos", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -19, text: "Me gustaría reunir mensajes de distintos canales en una sola bandeja.", category: "Atención", color: "purple", author_mode: "anonymous", display_name: "" },
  { id: -20, text: "Quiero probar un catálogo digital con una búsqueda que entienda preguntas.", category: "Innovación", color: "cream", author_mode: "anonymous", display_name: "" },
  { id: -21, text: "Me gustaría registrar las entregas desde el celular y dejar evidencia en cada pedido.", category: "Procesos", color: "cream", author_mode: "anonymous", display_name: "" },
  { id: -22, text: "Quiero identificar qué productos se quedan sin stock con mayor frecuencia.", category: "Datos", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -23, text: "Necesito que cada cliente pueda ver el historial de sus consultas.", category: "Atención", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -24, text: "Quiero evaluar si un prototipo puede leer etiquetas durante la recepción de mercadería.", category: "Innovación", color: "purple", author_mode: "anonymous", display_name: "" },
  { id: -25, text: "Quiero automatizar el registro de devoluciones y ver quién está a cargo.", category: "Procesos", color: "blue", author_mode: "anonymous", display_name: "" },
  { id: -26, text: "Necesito comparar el tiempo de atención de cada sede en un solo informe.", category: "Datos", color: "cyan", author_mode: "anonymous", display_name: "" },
  { id: -27, text: "Me gustaría probar un quiosco digital para registrar visitas.", category: "Innovación", color: "purple", author_mode: "anonymous", display_name: "" },
];

export function IdeasPage() {
  const [idea, setIdea] = useState("");
  const [identity, setIdentity] = useState("Anónimo");
  const [ideaCategory, setIdeaCategory] = useState("Innovación");
  const [displayName, setDisplayName] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [serverNotes, setServerNotes] = useState<(typeof seedNotes)[number][]>([]);
  const [publishing, setPublishing] = useState(false);
  const notes = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...serverNotes, ...seedNotes].filter(note =>
      (filter === "Todas" || note.category === filter) && note.text.toLowerCase().includes(search)
    );
  }, [filter, query, serverNotes]);
  const pageSize = 9;
  const pageCount = filter === "Todas" ? Math.max(1, Math.ceil(notes.length / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount);
  const visibleNotes = filter === "Todas" ? notes.slice((currentPage - 1) * pageSize, currentPage * pageSize) : notes;

  useEffect(() => {
    getIdeas().then(({ results }) => setServerNotes(results.map((item: PublicIdea, index) => ({
      ...item,
      color: ["blue", "cream", "purple", "cyan"][index % 4],
    })))).catch(() => setStatus("No pudimos cargar las ideas publicadas. Mostramos ejemplos locales."));
  }, []);

  const publish = async () => {
    if (!idea.trim()) return setStatus("Escribe una idea antes de continuar.");
    if (/(correo|tel[eé]fono|whatsapp|direcci[oó]n)/i.test(idea)) return setStatus("Revisa el contenido de tu nota antes de volver a enviarla.");
    setPublishing(true);
    setStatus("Enviando tu idea para revisión.");
    try {
      const mode = identity === "Con nombre" ? "named" : identity === "Avatar" ? "avatar" : "anonymous";
      await createIdea({
        text: idea,
        category: ideaCategory,
        author_mode: mode,
        display_name: mode === "named" ? displayName : "",
      });
      setStatus("Idea recibida. Se publicará cuando sea aprobada desde Django.");
      setIdea("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No pudimos enviar la idea.");
    } finally {
      setPublishing(false);
    }
  };
  return <>
    <PageHero eyebrow="MURO DE IDEAS" title={<>¿Qué problema resolverías <em>con tecnología?</em></>} subtitle="Comparte una necesidad y ayúdanos a imaginar nuevas soluciones. Las publicaciones pasan por revisión antes de aparecer." visual="ideas" variant={3}><Button to="/contacto">Convertir una idea en proyecto</Button></PageHero>
    <section className="section ideas-experience"><div className="container ideas-layout">
      <aside className="idea-form-panel"><span className="eyebrow inline-flex items-center gap-2"><Icon name="spark" size={15}/>PUBLICAR UNA IDEA</span><h2>Describe algo que te gustaría mejorar</h2><p>Evita datos personales o información confidencial.</p><label>Tu idea<textarea id="texto-idea" className="scroll-mt-24" maxLength={300} value={idea} onChange={e => {setIdea(e.target.value); setStatus("");}} placeholder="Escribe tu idea…"/></label><small>{idea.length}/300 caracteres</small><label>Categoría<select value={ideaCategory} onChange={e => setIdeaCategory(e.target.value)}>{["Procesos","Datos","Atención","Innovación"].map(x => <option key={x}>{x}</option>)}</select></label><fieldset><legend>Compartir como</legend>{["Con nombre","Anónimo","Avatar"].map(x => <button className={identity === x ? "active" : ""} type="button" aria-pressed={identity === x} onClick={() => setIdentity(x)} key={x}>{x}</button>)}</fieldset>{identity === "Con nombre" && <label>Nombre visible<input value={displayName} maxLength={80} onChange={e => setDisplayName(e.target.value)} placeholder="Cómo quieres aparecer"/></label>}<Button onClick={publish} disabled={publishing}>{publishing ? "Enviando…" : "Publicar idea"}</Button>{status && <div role="status" className={`idea-status ${status.includes("Revisa") || status.includes("No pudimos") ? "warning" : ""}`}><Icon name={status.includes("recibida") ? "check" : "shield"}/><span>{status}</span></div>}<small className="demo-note">Tu idea se revisará antes de aparecer públicamente. Este espacio no sustituye una consulta comercial.</small></aside>
      <div className="ideas-board" data-all-ideas={filter === "Todas"}><div className="ideas-toolbar"><div className="board-filters">{["Todas","Procesos","Datos","Atención","Innovación"].map(x => <button className={filter === x ? "active" : ""} aria-pressed={filter === x} onClick={() => { setFilter(x); setPage(1); }} key={x}>{x}</button>)}</div><label><Icon name="search"/><input type="search" aria-label="Buscar ideas" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Buscar ideas…"/></label></div><div className="ideas-notes">{visibleNotes.map((note,i) => <article className={`idea-note ${note.color} idea-pos-${i%6}`} key={note.id}><span>{note.category}</span><p>{note.text}</p>{note.id > 0 && <small>{note.display_name || "Anónimo"}</small>}</article>)}</div>{notes.length === 0 && <div className="empty-state">No encontramos ideas con esos filtros.</div>}{pageCount > 1 && <nav aria-label="Páginas del muro" className="ideas-pagination">
        <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Anterior</button>
        <span role="status">Página {currentPage} de {pageCount}</span>
        <button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>Siguiente</button>
      </nav>}</div>
    </div></section>
    <section aria-labelledby="guia-de-ideas" className="bg-linear-to-br from-[#e6effa] to-[#f7fbff] px-6 py-8 sm:px-10 sm:py-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#b7cce1] bg-white shadow-[0_12px_32px_-22px_#214b72] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <div className="group relative isolate flex min-h-64 flex-col items-start justify-end overflow-hidden bg-[#122d49] p-6 text-white sm:p-8">
          <UnitArtwork unit="labs" scene={10} className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-[50%_35%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-[#0b1d32] via-[#112d49b8] to-[#112d491f]"/>
          <h2 id="guia-de-ideas" className="max-w-sm font-editorial text-3xl leading-tight font-bold text-white sm:text-4xl">Comparte una necesidad. Explora una posibilidad.</h2>
          <a href="#texto-idea" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-[#143653]! transition-colors hover:bg-[#deedfb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Escribir una idea <Icon name="arrow" size={16}/></a>
        </div>
        <ol className="grid content-center gap-2.5 px-4 py-5 sm:px-6 sm:py-6">
          {([
            ["search", "Describe el problema", "Explica a quién afecta, cuándo ocurre y qué te gustaría mejorar. Ejemplo: consolidar en un solo lugar las solicitudes de varias áreas."],
            ["layers", "Ubica tu propuesta", "Elige Procesos, Datos, Atención o Innovación. Puedes compartirla con un nombre visible, como anónimo o con avatar."],
            ["shield", "Envíala para revisión", "El equipo revisará el contenido antes de publicarlo. Evita incluir datos personales o información confidencial."],
          ] satisfies [IconName, string, string][]).map(([icon, title, description]) => (
            <li key={title} className="group grid grid-cols-[auto_1fr] items-start gap-3 rounded-xl border border-[#d0dfef] bg-[#f4f8fd] p-3 transition-colors hover:border-[#8eafd1] hover:bg-[#e9f3fe]">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-[#dceafb] text-[#204c73] motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5"><Icon name={icon} size={18}/></span>
              <div><h3 className="font-bold text-[#153451]">{title}</h3><p className="mt-0.5 text-sm leading-snug text-[#38546f]">{description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </>;
}

export function ContactPage() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [contactParams] = useSearchParams();
  const requestedUnit = services.find(unit => unit.id === contactParams.get("unidad"));
  const requestedService = requestedUnit?.builds.find(name => name === contactParams.get("servicio"));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: string[] = [];
    if (!String(data.get("name") || "").trim()) next.push("Ingresa tu nombre.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") || ""))) next.push("Revisa el formato de tu correo.");
    if (!/^9\d{8}$/.test(String(data.get("phone") || "").replace(/\s/g,""))) next.push("Revisa el número de contacto.");
    if (String(data.get("description") || "").trim().length < 12) next.push("Describe brevemente tu necesidad.");
    if (!data.get("consent")) next.push("Revisa el consentimiento antes de continuar.");
    setErrors(next); if (next.length) return;
    setStatus("sending");
    try {
      await createContact({
        name: data.get("name"),
        company: data.get("company"),
        email: data.get("email"),
        phone: String(data.get("phone") || "").replace(/\s/g, ""),
        service: data.get("service"),
        description: data.get("description"),
        preferred_contact: data.get("preferred"),
        privacy_consent: data.get("consent") === "on",
      });
      setStatus("sent");
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "No pudimos enviar tu consulta."]);
      setStatus("idle");
    }
  };
  return <>
    <PageHero eyebrow="CONTACTO" title={<>Hablemos de tu <em>próximo proyecto</em></>} subtitle="Cuéntanos qué necesitas y coordinemos una conversación para comprender el alcance." visual="contacto" variant={0}/>
    <section className="section contact-page"><div className="container contact-page-grid"><div className="contact-aside"><span className="eyebrow">SIGUIENTE PASO</span><h2>Empecemos por tu necesidad</h2><div className="next-steps">{["Cuéntanos tu necesidad.","Revisamos el alcance.","Te enviamos una propuesta."].map((x,i) => <div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div><div className="contact-facts"><p><Icon name="check"/> Cotización personalizada en soles según el proyecto.</p><p><Icon name="shield"/> Tus datos se utilizarán únicamente para responder la consulta.</p><p><Icon name="message"/> Cuéntanos tu necesidad mediante este formulario.</p></div></div>
      <form className="contact-form" onSubmit={submit} noValidate>{status === "sent" ? <div className="success" role="status"><span><Icon name="check" size={30}/></span><h3>Consulta recibida.</h3><p>La información quedó registrada para que NUVANTIS pueda revisar tu necesidad y coordinar el siguiente paso.</p><button type="button" onClick={() => setStatus("idle")}>Enviar otra consulta</button></div> : <>
        <div className="form-row"><label>Nombre<input name="name" autoComplete="name" maxLength={120} required placeholder="Tu nombre"/></label><label>Empresa <small>opcional</small><input name="company" autoComplete="organization" maxLength={180} placeholder="Nombre de la empresa"/></label></div>
        <div className="form-row"><label>Correo<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="nombre@empresa.com"/></label><label>WhatsApp<div className="phone-field"><span>+51</span><input name="phone" type="tel" autoComplete="tel-national" inputMode="numeric" maxLength={11} required placeholder="999 999 999"/></div></label></div>
        <label>Necesidad o servicio<select name="service" defaultValue={requestedService || requestedUnit?.title || (contactParams.get("interes") === "soporte" ? "Mantenimiento y soporte tecnológico" : "")}><option value="" disabled>Selecciona una opción</option>{services.map(s => <option key={s.id}>{s.title}</option>)}<option>Mantenimiento y soporte tecnológico</option>{requestedService && <option>{requestedService}</option>}<option>Aún no lo sé</option></select></label>
        <label>Descripción<textarea name="description" maxLength={5000} required placeholder="¿Qué necesitas mejorar, conectar o construir?"/></label>
        <fieldset><legend>Medio de contacto preferido</legend><label><input type="radio" name="preferred" value="email" defaultChecked/> Correo</label><label><input type="radio" name="preferred" value="whatsapp"/> WhatsApp</label></fieldset>
        <label className="consent"><input type="checkbox" name="consent"/><span>He leído la <Link to="/privacidad">política de privacidad</Link> y autorizo el uso de mis datos para responder esta consulta.</span></label>
        {errors.length > 0 && <div className="error-list" role="alert">{errors.map(e => <p key={e}>{e}</p>)}</div>}
        <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar consulta"}</Button><small className="prototype-note">Utilizaremos tus datos para revisar la consulta y coordinar el siguiente paso.</small>
      </>}</form>
    </div></section>
  </>;
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const initialFocus = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element?.showModal();
    initialFocus.current?.focus();
    return () => {
      element?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} aria-label="Detalle del proyecto conceptual" className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[min(720px,calc(100%-2rem))] overflow-auto rounded-2xl bg-white p-6 text-nuvantis-navy shadow-2xl backdrop:bg-[#071526c9] sm:p-8" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }}>
    <button ref={initialFocus} type="button" className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-white text-nuvantis-navy" onClick={onClose} aria-label="Cerrar"><Icon name="x"/></button>
    {children}
  </dialog>;
}

export function NotFoundPage() {
  return <section className="not-found"><div className="container"><span className="eyebrow">404</span><h1>Esta página no está disponible.</h1><p>La ruta que buscas no existe o cambió de ubicación.</p><div className="flex flex-wrap gap-3"><Button to="/">Volver al inicio</Button><Button to="/unidades" variant="secondary">Explorar unidades</Button><Button to="/contacto" variant="secondary">Contacto</Button></div></div></section>;
}
