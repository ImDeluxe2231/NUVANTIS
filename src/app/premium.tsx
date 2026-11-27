import { ReferenceArt } from "./reference-art";
import { ProjectPreview, ResourcesPreview, SolutionOverview } from "./premium-sections";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { BrandLogo } from "./corporate";
import { HomeHero } from "./home-hero";
import { company, services, sectors } from "./content";
import { Button, Icon } from "./ui";
import { TechnologyImage, TechnologyCarousel, UnitArtwork } from "./visuals";

export function PremiumHomePage() {
  const [selected, setSelected] = useState(0);
  const [sector, setSector] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    scope.current?.querySelectorAll(".on-enter").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div ref={scope} className="premium-home">
    <HomeHero/>
    <section id="ecosistema" aria-labelledby="home-vision-title" className="premium-manifesto home-vision relative isolate scroll-mt-28">
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:gap-10">
          <div>
            <p className="text-xs font-bold tracking-[.19em] text-[#416586]">NUESTRA VISIÓN</p>
            <h2 id="home-vision-title" className="mt-3 font-editorial text-[clamp(2rem,4vw,3.3rem)] leading-[1.08] font-bold tracking-tight">
              La tecnología cambia.<br/><span>El criterio hace la diferencia.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed sm:text-lg">{company.value}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed sm:text-base">NUVANTIS reúne ingeniería, innovación y estrategia en seis unidades de negocio. De la primera pregunta a la implementación, construimos alrededor de tu organización.</p>
            <Link to="/nosotros" className="home-vision-link mt-5 inline-flex min-h-11 items-center gap-3 rounded-lg border border-[#aac1d8] bg-white px-4 text-sm font-semibold text-[#173e63]! transition-colors hover:bg-[#e2effb] focus-visible:outline-2 focus-visible:outline-offset-2">
              La visión detrás de NUVANTIS <Icon name="arrow" size={16}/>
            </Link>
          </div>
          <div className="grid min-h-64 grid-cols-[1.45fr_1fr] gap-2.5 sm:min-h-72 lg:min-h-80">
            <div className="group relative isolate overflow-hidden rounded-2xl border border-[#9ab4d0] bg-[#15324c] shadow-md">
              <UnitArtwork unit="software" scene={1} className="absolute inset-0 -z-20 size-full object-cover object-[45%_center] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#0b203661] to-transparent"/>
            </div>
            <div className="grid grid-rows-2 gap-2.5">
              <div className="group relative overflow-hidden rounded-xl border border-[#9ab4d0] bg-[#15324c] shadow-md">
                <UnitArtwork unit="consulting" scene={1} className="absolute inset-0 size-full object-cover object-[60%_35%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-[#9ab4d0] bg-[#15324c] shadow-md">
                <UnitArtwork unit="labs" scene={3} className="absolute inset-0 size-full object-cover object-[52%_45%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SolutionOverview/>
    <section className="premium-units"><div className="container"><div className="premium-section-label on-enter"><span>02 / ECOSISTEMA NUVANTIS</span><i/><small>SEIS CAPACIDADES. UNA DIRECCIÓN.</small></div><div className="premium-heading-row on-enter"><h2>Seis unidades comerciales.<br/><span>Una visión integral.</span></h2><p>Una marca. Capacidades complementarias para cada etapa de tu evolución digital.</p></div><div className="premium-unit-grid">{services.map((s,i)=><Link to={`/unidades/${s.id}`} className={`premium-unit on-enter premium-unit-${i}`} data-photo={s.id} key={s.id}><div className="premium-unit-head"><span>0{i+1}</span><Icon name={s.icon} size={23}/></div><div className={`premium-unit-art premium-unit-art-${i}`}><ReferenceArt index={i} icon={s.icon}/></div><div className="premium-unit-content"><div className="flex items-center gap-3"><span className="reference-unit-icon"><Icon name={s.icon} size={22}/></span><div><small>NUVANTIS</small><h3>{s.label}</h3></div></div><p>{s.short}</p><div className="premium-unit-footer"><span>Explorar unidad</span><Icon name="arrow" size={20}/></div></div></Link>)}</div></div></section>
    <TechnologyCarousel/>
    <section className="reference-surface photo-capabilities px-6 py-12 text-white sm:px-10">
      <div className="reference-glass mx-auto grid max-w-7xl gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
        {([
          ["layers", "Soluciones integradas", "Software, datos e infraestructura que trabajan en conjunto."],
          ["chart", "Decisiones con datos", "Indicadores definidos alrededor de tu operación."],
          ["shield", "Continuidad operativa", "Respaldos, accesos y soporte según el alcance."],
          ["spark", "Innovación aplicada", "Prototipos para validar antes de implementar."],
        ] as const).map(([icon, title, description], index) => <article data-photo={["software","analytics","infrastructure","labs"][index]} key={title} className="rounded-xl border border-sky-200/25 bg-sky-100/5 p-4">
          <Icon name={icon} size={24}/>
          <h3 className="mt-4 font-editorial text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 leading-relaxed text-[#dfebf8]">{description}</p>
        </article>)}
      </div>
    </section>
    <section className="premium-finder"><div className="container"><div className="premium-section-label on-enter"><span>03 / TU SIGUIENTE PASO</span><i/><small>EMPIEZA POR LA NECESIDAD</small></div><div className="premium-finder-layout"><div className="on-enter"><h2>Un reto concreto.<br/><span>Una ruta posible.</span></h2><p>No necesitas tener todas las respuestas. Elige tu punto de partida y exploremos las capacidades que podrían ayudarte.</p><div className="premium-finder-tabs" role="group" aria-label="¿Qué necesita tu empresa?">{["Crear un sistema", "Automatizar procesos", "Entender mis datos", "Fortalecer mi infraestructura", "Definir una estrategia", "Explorar una idea"].map((s,i)=><button key={s} className={selected===i?"active":""} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span>0{i+1}</span>{s}<Icon name="arrow" size={17}/></button>)}</div></div><div className="premium-finder-panel on-enter"><TechnologyImage unit={services[selected].id} className="finder-photo"/><div className="finder-photo-shade"/><div key={selected} className="premium-finder-inner"><span className="premium-kicker">CAPACIDAD RECOMENDADA / 0{selected+1}</span><div className="premium-finder-symbol"><Icon name={services[selected].icon} size={76}/><i/><i/></div><small>NUVANTIS</small><h3>{services[selected].label}</h3><p>{services[selected].need}</p><div className="premium-chips">{services[selected].builds.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><Button to={`/unidades/${services[selected].id}`}>Conocer esta unidad</Button></div></div></div></div></section>
    <section className="premium-sector-section"><div className="container"><div className="premium-section-label on-enter"><span>04 / SECTORES</span><i/><small>INGENIERÍA EN CONTEXTO</small></div><div className="premium-heading-row on-enter"><h2>Distintos sectores.<br/><span>El mismo rigor.</span></h2><Link className="premium-arrow-link" to="/sectores">Explorar sectores <Icon name="arrow"/></Link></div><div className="premium-sector-layout on-enter"><div className="premium-sector-list">{sectors.map((s,i)=><button aria-pressed={sector===i} className={sector===i?"active":""} onClick={()=>setSector(i)} key={s.name}><span>0{i+1}</span><b>{s.name}</b><Icon name="arrow" size={20}/></button>)}</div><div className="premium-sector-panel" data-photo={["software","analytics","infrastructure","consulting"][sector]} key={sector}><div className="sector-architecture" aria-hidden="true"><div/><div/><div/><Icon name={sectors[sector].icon} size={82}/></div><div><span className="premium-kicker">SECTOR / 0{sector+1}</span><h3>{sectors[sector].title}</h3><p>{sectors[sector].need}</p><Link to={`/sectores?sector=${sector}`} className="premium-arrow-link">Descubre posibilidades <Icon name="arrow"/></Link></div></div></div></div></section>
    <section className="premium-process"><div className="container"><TechnologyImage unit="consulting" className="process-photo"/><div className="process-photo-shade"/><div className="premium-process-heading on-enter"><div className="premium-kicker">05 / NUESTRA FORMA DE TRABAJAR</div><h2>La confianza también<br/><span>se construye por etapas.</span></h2><Link to="/proceso" className="premium-quiet-link">Conoce nuestro proceso <Icon name="arrow"/></Link></div><div className="premium-process-steps">{[["Entendemos y proponemos", "Entregable: alcance y prioridades acordadas."],["Diseñamos", "Entregable: arquitectura y prototipo."],["Desarrollamos", "Entregable: módulos e integraciones validados."],["Implementamos y mejoramos", "Entregable: puesta en marcha y plan de seguimiento."]].map(([title,desc],i)=><article className="on-enter" data-photo={["consulting","analytics","software","labs"][i]} key={title}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p><div/></article>)}</div></div></section>
    <HomeQuestions/>
    <ProjectPreview/><ResourcesPreview/>
    <section aria-labelledby="home-project-title" className="reference-surface px-5 py-6 sm:px-9 sm:py-7">
      <div className="reference-glass mx-auto grid max-w-7xl items-center gap-5 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
        <div>
          <p className="text-xs font-semibold tracking-[.19em] text-[#c7e0f7]">TRABAJEMOS JUNTOS</p>
          <h2 id="home-project-title" className="mt-2 font-editorial text-[clamp(1.65rem,3.15vw,2.7rem)] leading-tight font-semibold text-white">¿Listo para iniciar tu próximo proyecto?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#e0ecf8] sm:text-base">Cuéntanos qué necesitas mejorar. Revisaremos tus objetivos y el alcance para definir el siguiente paso.</p>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-4 sm:gap-5 lg:border-l lg:border-sky-100/25 lg:pl-7">
          <div className="w-14 shrink-0 sm:w-20" aria-hidden="true">
            <BrandLogo symbol className="drop-shadow-[0_0_12px_#7cbbf6]"/>
          </div>
          <Link to="/contacto" className="reference-cta">Iniciar un proyecto <Icon name="arrow" size={17}/></Link>
        </div>
      </div>
    </section>
  </div>;
}

const homeQuestionGroups = [
  {
    label: "Servicios",
    icon: "layers",
    items: [
      ["¿Qué servicios ofrece Nuvantis?", "Desarrollamos software a medida e integramos automatización, análisis de datos, infraestructura y consultoría tecnológica."],
      ["¿A qué sectores atienden?", "Nuestra oferta se orienta a salud ocupacional, comercio y servicios, industria y pequeñas y medianas empresas."],
      ["¿Pueden integrar las herramientas que ya usamos?", "Revisamos los sistemas existentes, sus interfaces y la disponibilidad de los datos para determinar qué se puede conectar."],
      ["¿Pueden automatizar tareas sin cambiar todo nuestro sistema?", "Podemos revisar qué tareas se pueden automatizar con las herramientas actuales y en cuáles conviene incorporar una integración o una solución adicional."],
    ],
  },
  {
    label: "Proyecto y presupuesto",
    icon: "code",
    items: [
      ["¿Cómo es el proceso de implementación?", "Primero revisamos tu necesidad y acordamos el alcance. Después diseñamos, construimos y validamos la solución por etapas antes de ponerla en marcha."],
      ["¿Cómo se define el presupuesto?", "Preparamos una propuesta en soles según el alcance, las integraciones y los entregables acordados."],
      ["¿Qué debo preparar para la primera conversación?", "Cuéntanos qué quieres mejorar, quiénes usan el proceso y con qué herramientas trabajan hoy. Eso nos ayuda a orientar la conversación."],
      ["¿Podemos empezar con un piloto?", "Sí. Podemos definir una prueba de alcance acotado, acordar qué se medirá y decidir con tu equipo si conviene ampliar la solución."],
    ],
  },
  {
    label: "Soporte",
    icon: "shield",
    items: [
      ["¿Qué soporte y mantenimiento brindan?", "Acordamos el alcance del soporte, los canales de atención y el plan de mantenimiento según las necesidades del proyecto."],
      ["¿Pueden revisar un sistema que ya está en uso?", "Podemos evaluar su estado, documentación e integraciones para priorizar el mantenimiento o los cambios que necesita."],
      ["¿Cómo solicito mantenimiento?", "En el formulario de contacto, selecciona Mantenimiento y soporte tecnológico y describe el sistema y lo que necesitas revisar."],
      ["¿Cómo se acuerdan los tiempos de atención?", "La propuesta de soporte define los canales, horarios y tiempos de respuesta según la prioridad de cada tipo de incidencia."],
    ],
  },
] as const;

function HomeQuestions() {
  const [topic, setTopic] = useState(0);
  return <section id="preguntas-frecuentes" aria-labelledby="home-faq-title" className="reference-surface home-faq scroll-mt-28 border-y border-sky-200/30 px-6 py-8 text-white sm:px-10">
    <div className="mx-auto grid max-w-7xl items-start gap-4 lg:grid-cols-[minmax(0,.76fr)_minmax(0,1.24fr)]">
      <div className="relative isolate overflow-hidden rounded-2xl border border-sky-200/40 bg-[#10263f] p-5 shadow-md sm:p-6">
        <UnitArtwork unit="consulting" scene={3} className="absolute inset-0 -z-20 size-full object-cover object-right"/>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b2037fa] via-[#102a45eb] to-[#122c4a9c]"/>
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg border border-sky-200/40 bg-[#214765] text-[#cde8ff]"><Icon name="message" size={18}/></span>
        <h2 id="home-faq-title" className="mt-3 font-editorial text-3xl leading-tight font-semibold text-white">Preguntas frecuentes</h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#dfebf9]">Consulta qué hacemos, cómo iniciamos un proyecto y qué soporte podemos acordar.</p>
        <Link className="reference-cta mt-4" to="/contacto">Conversemos <Icon name="arrow" size={16}/></Link>
      </div>
      <div className="min-w-0">
        <div role="group" aria-label="Temas de preguntas frecuentes" className="flex flex-wrap gap-2">
          {homeQuestionGroups.map(({ label, icon }, index) => <button key={label} type="button" aria-pressed={topic === index} aria-controls="home-faq-answers" onClick={() => setTopic(index)} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-sky-200/40 bg-[#122b45] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#224867] aria-pressed:border-[#aad5f3] aria-pressed:bg-[#d9edfc] aria-pressed:text-[#133752] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200">
            <span aria-hidden="true"><Icon name={icon} size={16}/></span>{label}
          </button>)}
        </div>
        <div id="home-faq-answers" key={topic} className="mt-3 grid gap-2 motion-safe:animate-[photo-heading-in_.25s_ease-out]">
          {homeQuestionGroups[topic].items.map(([question, answer], index) => <details key={question} name="nuvantis-faq" open={index === 0} className="reference-glass group overflow-hidden open:border-sky-200/65">
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-200 [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="shrink-0 text-center text-xs font-bold tabular-nums text-[#b7ddfa]">0{index + 1}</span>
              <span className="min-w-0 flex-1">{question}</span>
              <span aria-hidden="true" className="shrink-0 text-sky-100 motion-safe:transition-transform group-open:rotate-180"><Icon name="chevron" size={16}/></span>
            </summary>
            <p className="mx-4 mb-3 border-l-2 border-[#7cb5e3] pl-3 text-sm leading-relaxed text-[#dfebf9]">{answer}</p>
          </details>)}
        </div>
      </div>
    </div>
  </section>;
}
