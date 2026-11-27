import { CollaborationCards, PhotoCard, PhotoHero, unitContact } from "./photo-sections";
import { useId, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { company, services, sectors, values } from "./content";
import { Button, CtaBand, Icon, PageHero, SectionHead } from "./ui";
import { TechnologyImage, UnitArtwork } from "./visuals";
import type { IconName } from "./ui";

export function BrandLogo({ symbol = false, wordmark = false, className = "" }: { symbol?: boolean; wordmark?: boolean; className?: string }) {
  // Use the supplied artwork intact. The SVG viewport selects the original lockup;
  // neither the lettering nor the emblem is redrawn or generated.
  const filterId = useId();
  return <svg className={`official-logo ${className}`} viewBox={symbol ? "145 125 260 260" : wordmark ? "495 163 935 192" : "140 125 1300 260"} role="img" aria-label="NUVANTIS — ELEVATING TECHNOLOGY">
    <defs><filter id={filterId} colorInterpolationFilters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 .2126 .7152 .0722 0 0"/><feComponentTransfer result="logoMask"><feFuncA type="linear" slope="4" intercept="-.45"/></feComponentTransfer><feComposite in="SourceGraphic" in2="logoMask" operator="in"/></filter></defs>
    <image href="/brand/nuvantis-identidad.png" width="1536" height="1024" filter={`url(#${filterId})`} />
  </svg>;
}

const heroSlides = [
  { tag: "INGENIERÍA TECNOLÓGICA · PERÚ", title: <>Ingeniería que<br/>transforma <span>el futuro.</span></>, text: "Desarrollamos e integramos soluciones digitales para optimizar procesos, aprovechar datos y acelerar la evolución de las organizaciones.", path: "/unidades", cta: "Explorar nuestras unidades", unit: "Ingeniería. Innovación. Estrategia." },
  { tag: "NUVANTIS INTELLIGENCE", title: <>Inteligencia para<br/>evolucionar <span>tu operación.</span></>, text: "Integramos inteligencia artificial y automatización para resolver necesidades concretas, con criterio técnico y supervisión.", path: "/unidades/intelligence", cta: "Explorar Intelligence", unit: "De las tareas a las posibilidades." },
  { tag: "NUVANTIS ANALYTICS", title: <>Tus datos.<br/>Una perspectiva <span>más clara.</span></>, text: "Conectamos fuentes, organizamos información y diseñamos indicadores para apoyar las decisiones de tu negocio.", path: "/unidades/analytics", cta: "Explorar Analytics", unit: "Información que conecta decisiones." },
];

function ArchitectureVisual({ active }: { active: number }) {
  return <div className="architecture-visual" aria-label="Las seis unidades conectadas de NUVANTIS">
    <div className="arch-orbit orbit-one"/><div className="arch-orbit orbit-two"/>
    <div className="arch-axis"/><div className="arch-monogram"><BrandLogo symbol/></div>
    <div className="arch-base"><span>NUVANTIS</span><small>ELEVATING TECHNOLOGY</small></div>
    {services.map((s, i) => <Link to={`/unidades/${s.id}`} className={`arch-node arch-node-${i} ${i === active ? "lit" : ""}`} key={s.id}><Icon name={s.icon} size={18}/><span>{s.label}</span><small>0{i + 1}</small></Link>)}
    <span className="arch-caption">UNA MARCA. SEIS UNIDADES CONECTADAS.</span>
  </div>;
}

function UnitCards({ compact = false }: { compact?: boolean }) {
  return <div className={`unit-grid ${compact ? "compact" : ""}`}>{services.map((s, i) => <Link className="unit-card" to={`/unidades/${s.id}`} key={s.id}>
    <div className="unit-top"><span>0{i + 1}</span><Icon name={s.icon} size={25}/></div>
    <div className="catalog-unit-photo"><TechnologyImage unit={s.id}/><span/></div>
    <div className="unit-card-copy"><small>NUVANTIS</small><h3>{s.label}</h3><p>{s.short}</p><span className="unit-link">Conocer la unidad <Icon name="arrow" size={17}/></span></div>
  </Link>)}</div>;
}

function SolutionFinder() {
  const options: [string, string, IconName, string][] = [
    ["Desarrollar un sistema", "Software", "code", "software"],
    ["Automatizar operaciones", "Intelligence", "brain", "intelligence"],
    ["Aprovechar mis datos", "Analytics", "chart", "analytics"],
    ["Fortalecer mi infraestructura", "Infrastructure", "shield", "infrastructure"],
    ["Definir una estrategia", "Consulting", "layers", "consulting"],
    ["Explorar una idea", "Labs", "spark", "labs"],
  ];
  const [selected, setSelected] = useState(0);
  const unit = services[selected];
  return <section className="section corporate-finder"><div className="container finder-layout"><div><SectionHead eyebrow="ENCUENTRA TU PUNTO DE PARTIDA" title={<>¿Qué necesita<br/>evolucionar en tu empresa?</>} subtitle="Empieza por tu necesidad. Nosotros te ayudamos a conectar las capacidades adecuadas."/><div className="finder-options" role="group" aria-label="Selecciona una necesidad">{options.map((x, i) => <button key={x[3]} aria-pressed={selected === i} className={selected === i ? "active" : ""} onClick={() => setSelected(i)}><Icon name={x[2]}/><span>{x[0]}</span><Icon name="chevron" size={16}/></button>)}</div></div><div className="finder-result" key={selected}><span className="eyebrow">UNA RUTA POSIBLE / 0{selected + 1}</span><div className="finder-icon"><Icon name={unit.icon} size={48}/></div><span className="unit-prefix">NUVANTIS</span><h3>{unit.label}</h3><p>{unit.need}</p><div className="finder-chips">{unit.builds.slice(0, 3).map(x => <span key={x}>{x}</span>)}</div><Button to={`/unidades/${unit.id}`}>Explorar esta unidad</Button></div></div></section>;
}

function HomeFaq() {
  return <section className="section corporate-faq"><div className="container faq-grid"><SectionHead eyebrow="PREGUNTAS FRECUENTES" title="Claridad desde el primer contacto." subtitle="Cada proyecto comienza por comprender su contexto y acordar un alcance."/><div className="corporate-accordion">{[
    ["¿Por dónde puedo empezar?", "Puedes contarnos tu necesidad. NUVANTIS CONSULTING ayuda a ordenar prioridades y definir una ruta tecnológica."],
    ["¿Las unidades son empresas diferentes?", "No. Son seis unidades comerciales de NUVANTIS que pueden colaborar dentro del mismo proyecto."],
    ["¿Cómo se define una propuesta?", "Según objetivos, funcionalidades, infraestructura, entregables y tiempos acordados. Las cotizaciones se presentan en soles."],
    ["¿Ofrecen mantenimiento y soporte?", "El mantenimiento y soporte tecnológico puede acordarse de forma recurrente, con condiciones y alcance definidos."],
  ].map(([title, text], i) => <details key={title} open={i === 0}><summary>{title}<span>+</span></summary><p>{text}</p></details>)}</div></div></section>;
}

export function CorporateHomePage() {
  const [slide, setSlide] = useState(0);
  const current = heroSlides[slide];
  return <>
    <section className="corporate-hero"><div className="hero-blueprint"/><div className="container corporate-hero-grid"><div className="corporate-hero-copy" key={slide}><span className="eyebrow">{current.tag}</span><h1>{current.title}</h1><p>{current.text}</p><div className="button-row"><Button to={current.path}>{current.cta}</Button><Button to="/contacto" variant="secondary">Conversemos</Button></div><div className="hero-slider" aria-label="Presentaciones destacadas"><span>0{slide + 1}<small> / 03</small></span><div>{heroSlides.map((_, i) => <button key={i} className={slide === i ? "active" : ""} onClick={() => setSlide(i)} aria-label={`Ver presentación ${i + 1}`} aria-pressed={slide === i}/>)}</div><p>{current.unit}</p></div></div><ArchitectureVisual active={slide}/></div><div className="hero-bottomline"><div className="container"><span>ELEVATING TECHNOLOGY</span><span>Ingeniería para empresas y organizaciones <Icon name="arrow" size={14}/></span></div></div></section>
    <section className="quick-access" aria-label="Accesos destacados"><div className="container">{[
      ["code", "Unidades de negocio", "Explora nuestras capacidades", "/unidades"],
      ["layers", "Consultoría tecnológica", "Define tu siguiente paso", "/unidades/consulting"],
      ["shield", "Soporte y continuidad", "Hablemos de tu operación", "/contacto?interes=soporte"],
      ["spark", "Innovación aplicada", "Conoce NUVANTIS LABS", "/unidades/labs"],
    ].map(([icon, title, sub, href]) => <Link to={href} key={title}><span className="quick-icon"><Icon name={icon as IconName}/></span><span><b>{title}</b><small>{sub}</small></span><Icon name="arrow" size={17}/></Link>)}</div></section>
    <section className="section corporate-intro"><div className="container"><div className="intro-overline"><span className="eyebrow">UNA VISIÓN INTEGRAL DE LA TECNOLOGÍA</span><span className="intro-rule"/><small>NUVANTIS / TECHNOLOGIES</small></div><div className="intro-columns"><h2>Ingeniería, innovación<br/>y estrategia.<br/><span>En una misma dirección.</span></h2><div><p className="lead">{company.value}</p><p>Integramos las capacidades de seis unidades de negocio para acompañar la evolución digital de empresas, organizaciones y negocios.</p><Link className="text-link" to="/nosotros">Conoce NUVANTIS <Icon name="arrow" size={17}/></Link></div></div></div></section>
    <section className="section corporate-units"><div className="container"><div className="section-title-row"><SectionHead eyebrow="NUESTRAS UNIDADES DE NEGOCIO" title="Seis especialidades. Una visión." subtitle="Capacidades que se conectan para desarrollar, integrar e implementar soluciones digitales."/><Link className="text-link" to="/unidades">Explorar todas <Icon name="arrow"/></Link></div><UnitCards/></div></section>
    <SolutionFinder/>
    <section className="section corporate-sectors"><div className="container"><SectionHead eyebrow="SECTORES DE ATENCIÓN" title="Tecnología que entiende tu contexto." subtitle="Cuatro sectores prioritarios para empezar. Una solución planteada alrededor de cada organización."/><div className="priority-grid">{sectors.map((sector, i) => <Link to={`/sectores?sector=${i}`} key={sector.name}><div className={`sector-lineart lineart-${i}`}><Icon name={sector.icon} size={52}/><i/><i/><i/></div><span className="eyebrow">0{i + 1} / SECTOR</span><h3>{sector.name}</h3><p>{sector.need}</p><span className="text-link">Explorar posibilidades <Icon name="arrow" size={17}/></span></Link>)}</div></div></section>
    <section className="corporate-method dark-section"><div className="container"><div><span className="eyebrow">DEL DIAGNÓSTICO A LA EVOLUCIÓN</span><h2>Una ruta clara.<br/>Decisiones compartidas.</h2><p>Analizamos, diseñamos, desarrollamos e implementamos. Acompañamos la puesta en marcha y el siguiente paso.</p><Button to="/proceso" variant="secondary">Así trabajamos</Button></div><ol>{["Entendemos la necesidad", "Definimos la solución", "Diseñamos y desarrollamos", "Implementamos y evolucionamos"].map((s, i) => <li key={s}><span>0{i + 1}</span><b>{s}</b><Icon name="arrow" size={18}/></li>)}</ol></div></section>
    <HomeFaq/>
    <CtaBand title="El siguiente paso empieza con una conversación." text="Cuéntanos qué necesita tu organización. Conectemos ingeniería, innovación y estrategia."/>
  </>;
}

export function BusinessUnitsPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const filtered = services.filter(s => (s.title + " " + s.short + " " + s.builds.join(" ")).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <><PageHero eyebrow="UNA MARCA · SEIS UNIDADES" title={<>Especialidades conectadas.<br/><em>Ingeniería integral.</em></>} subtitle="Las unidades comerciales de NUVANTIS reúnen capacidades complementarias para atender cada etapa de la evolución digital." visual="unidades de negocio"><Button to="/contacto">Encuentra tu punto de partida</Button></PageHero><section className="section corporate-unit-catalog"><div className="container"><div className="section-title-row"><SectionHead eyebrow="EXPLORA NUVANTIS" title="La capacidad adecuada para cada desafío."/><label className="unit-search"><Icon name="search"/><input aria-label="Buscar unidad o servicio" placeholder="Buscar una unidad o servicio" value={query} onChange={e => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}/></label></div><div className="unit-grid">{filtered.map(s => <Link className="unit-card" to={`/unidades/${s.id}`} key={s.id}><div className="unit-top"><span>0{services.indexOf(s) + 1}</span><Icon name={s.icon} size={28}/></div><div className="catalog-unit-photo"><TechnologyImage unit={s.id}/><span/></div><div className="unit-card-copy"><small>NUVANTIS</small><h3>{s.label}</h3><p>{s.short}</p><span className="unit-link">Conocer la unidad <Icon name="arrow" size={17}/></span></div></Link>)}</div>{!filtered.length && <div className="empty-state">No encontramos coincidencias. Prueba con «software», «nube» o «datos». <button onClick={() => setParams({})}>Ver todas las unidades</button></div>}<p className="unit-explainer">Una misma marca, seis unidades comerciales. La combinación se define según los objetivos y el alcance de cada proyecto.</p></div></section><CtaBand/></>;
}

export function ServicesPage() {
  const [active, setActive] = useState(0);
  const unit = services[active];
  const [search, setSearch] = useState("");
  const normalize = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const query = normalize(search.trim());
  const matches = services.flatMap(service => service.builds.filter(name => normalize(`${name} ${service.label}`).includes(query)).map(name => ({ name, service })));
  return <div className="bg-linear-to-br from-[#f5f9ff] via-[#edf3fa] to-[#dce8f5] text-nuvantis-navy">
    <header className="reference-surface relative isolate overflow-hidden px-6 pt-32 pb-9 text-white sm:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="text-xs font-bold tracking-[.22em] text-sky-100">SERVICIOS NUVANTIS</p>
          <h1 className="mt-3 max-w-3xl font-editorial text-[clamp(2.4rem,4.5vw,4.25rem)] leading-tight font-bold tracking-tight text-white">De la necesidad a la solución tecnológica.</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-[#d9e7f6]">Explora nuestras capacidades de desarrollo, implementación, consultoría y soporte.</p>
          <a href="#catalogo-servicios" className="reference-cta mt-5">Explorar catálogo</a>
        </div>
        <div className="relative isolate min-h-44 overflow-hidden rounded-2xl border border-white/80 bg-[#132941] shadow-xl sm:min-h-60">
          <TechnologyImage unit="software" priority className="absolute inset-0 size-full object-cover"/>
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#071728e8] to-transparent"/>
          <BrandLogo className="absolute right-5 bottom-5 w-40"/>
        </div>
      </div>
    </header>
    <section id="catalogo-servicios" className="mx-auto max-w-7xl scroll-mt-28 px-6 pt-4 pb-10 sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-editorial text-3xl font-bold tracking-tight sm:text-4xl">Catálogo de servicios</h2>
        <label className="block w-full max-w-sm text-sm font-semibold">
          Buscar un servicio
          <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Ej. respaldos, portales o datos" className="mt-1 w-full rounded-lg border border-[#9aadc3] bg-[#f9fcff] px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-[#315d86]"/>
        </label>
      </div>
      {query ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {matches.length ? matches.map(({name, service}) => <Link key={`${service.id}-${name}`} to={unitContact(service.id,name)} className="rounded-xl border border-[#bccde0] bg-[#f9fcff] p-4 transition-colors hover:border-[#315d86]">
          <span className="block font-semibold">{name}</span><span className="text-sm text-slate-600">{service.label}</span>
        </Link>) : <p>No encontramos servicios para esta búsqueda.</p>}
      </div> : <>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" role="group" aria-label="Filtrar servicios por unidad">
          {services.map((service, index) => <button type="button" key={service.id} aria-pressed={index === active} className="flex min-h-11 min-w-0 items-center gap-2 rounded-lg border border-[#bccde0] bg-[#f9fcff] px-2 text-left text-sm font-semibold transition-colors hover:border-[#315d86] aria-pressed:border-[#173551] aria-pressed:bg-[#173551] aria-pressed:text-white sm:px-3" onClick={() => setActive(index)}>
            <Icon name={service.icon} size={17}/><span className="min-w-0 wrap-break-word">{service.label}</span>
          </button>)}
        </div>
        <article key={unit.id} className="mt-4 grid overflow-hidden rounded-2xl border border-[#bccde0] bg-[#f9fcff] shadow-lg motion-safe:animate-[photo-heading-in_.35s_ease-out] lg:grid-cols-[.75fr_1.25fr]">
          <div className="relative isolate flex min-h-48 items-end overflow-hidden bg-[#132941] p-5 text-white">
            <TechnologyImage unit={unit.id} className="absolute inset-0 -z-20 size-full object-cover"/>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#0b1a2bfd] to-[#142c4360]"/>
            <div><p className="text-xs font-bold tracking-widest text-sky-100">{unit.title}</p><h3 className="mt-2 font-editorial text-2xl font-bold text-white">{unit.promise}</h3></div>
          </div>
          <div className="p-5 sm:p-6">
            <p className="leading-relaxed text-[#43566c]">{unit.need}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">{unit.builds.map(name => <li key={name}><Link to={unitContact(unit.id,name)} className="flex min-h-11 items-center justify-between gap-2 rounded-lg border border-[#cddbeb] bg-[#eef4fb] px-3 py-2 text-sm font-semibold transition-colors hover:border-[#315d86] hover:bg-[#e5eef6]">{name}<span aria-hidden="true" className="shrink-0"><Icon name="arrow" size={15}/></span></Link></li>)}</ul>
            <Link className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold underline underline-offset-4" to={`/unidades/${unit.id}`}>Conocer la unidad <Icon name="arrow" size={15}/></Link>
          </div>
        </article>
      </>}
    </section>
    <CollaborationCards/>
  </div>;
}

export function AboutCorporatePage() {
  return <div className="about-page bg-[#eaf2fb]">
    <PhotoHero photo="consulting" label="SOMOS NUVANTIS" title="Conectamos ingeniería, tecnología y talento." description={company.value}>
      <a href="#mision-vision" className="reference-cta">Conoce nuestro propósito</a>
      <Link to="/proceso" className="reference-glass inline-flex min-h-12 items-center px-5 font-semibold">Cómo trabajamos</Link>
    </PhotoHero>

    <section className="about-intro border-y border-[#c8d9eb] bg-linear-to-br from-[#f7fbff] via-[#edf5fd] to-[#dbe9f8] px-6 py-10 sm:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#385875]">QUIÉNES SOMOS</p>
            <h2 className="mt-3 max-w-xl font-editorial text-3xl font-bold tracking-tight text-nuvantis-navy sm:text-4xl">Ingeniería peruana con visión de futuro</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[#263e59]">{company.introduction}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#405875]">Desde Perú, buscamos desarrollar productos propios, construir alianzas estratégicas y crecer hacia mercados internacionales.</p>
            <dl className="mt-5 grid gap-2 sm:grid-cols-3">
              {([
                ["code", "Ingeniería", "Software e integración."],
                ["chart", "Datos", "Análisis y automatización."],
                ["layers", "Estrategia", "Diagnóstico y puesta en marcha."],
              ] satisfies [IconName, string, string][]).map(([icon, title, text]) => <div key={title} className="rounded-xl border border-[#bfd0e4] bg-white/75 p-3">
                <dt className="flex items-center gap-2 text-sm font-bold text-[#183a5a]"><Icon name={icon} size={16}/>{title}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-[#405875]">{text}</dd>
              </div>)}
            </dl>
          </div>
          <div className="group relative isolate flex min-h-52 items-end overflow-hidden rounded-2xl border border-[#8ca9c8] bg-[#132941] p-6 shadow-lg sm:min-h-64">
            <UnitArtwork unit="consulting" scene={0} className="absolute inset-0 -z-20 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#081829f5] via-[#1029427c] to-transparent"/>
            <div className="rounded-xl border border-white/25 bg-[#10243bd9] px-4 py-3 backdrop-blur-sm"><BrandLogo className="w-44 max-w-full"/></div>
          </div>
        </div>
      </div>
    </section>

    <section id="mision-vision" className="reference-surface relative isolate overflow-hidden scroll-mt-28 px-6 py-10 text-white sm:px-10 lg:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#5797cb40,transparent_62%)]"/>
      <div className="mx-auto max-w-7xl">
        <h2 className="flex items-center gap-4 font-editorial text-3xl font-bold tracking-tight text-white sm:text-4xl after:h-px after:flex-1 after:bg-linear-to-r after:from-sky-200/60 after:to-transparent">Misión y visión</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#dceaf8]">Lo que hacemos hoy y la dirección que guía nuestras decisiones a largo plazo.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {([
            ["software", 1, "layers", "Nuestra misión", company.mission, ["Optimizar procesos y conectar sistemas", "Diseñar soluciones seguras y escalables"]],
            ["labs", 3, "spark", "Nuestra visión", company.vision, ["Desarrollar productos tecnológicos propios", "Construir alianzas y crecer desde Perú"]],
          ] as const).map(([photo, scene, icon, title, description, points]) =>
            <article key={title} className="about-purpose-card group relative overflow-hidden rounded-2xl border border-sky-200/35 bg-linear-to-br from-[#1c3653] to-[#0b1a2c] shadow-lg transition-[border-color,box-shadow] duration-300 hover:border-sky-200/75 hover:shadow-[0_12px_34px_#071524a0] motion-safe:hover:-translate-y-1 motion-safe:transition-[transform,border-color,box-shadow]">
              <div className="relative isolate flex h-40 items-end gap-3 overflow-hidden bg-[#132941] px-5 py-4 sm:h-44 sm:px-6">
                <UnitArtwork unit={photo} scene={scene} className="absolute inset-0 -z-20 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#091a2df5] via-[#0c2138a0] to-transparent"/>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-lg border border-sky-100/50 bg-[#112b45bd]"><Icon name={icon} size={19}/></span>
                <h3 className="pb-1 font-editorial text-xl font-bold text-white sm:text-2xl">{title}</h3>
              </div>
              <div className="border-t border-sky-200/25 px-5 py-4 text-[#e2edf9] sm:px-6">
                <p className="text-sm leading-relaxed sm:text-base">{description}</p>
                <ul className="mt-3 grid gap-2 border-t border-sky-200/20 pt-3 text-sm">
                  {points.map(point => <li key={point} className="flex items-start gap-2"><span aria-hidden="true" className="mt-0.5 shrink-0 text-sky-300"><Icon name="check" size={16}/></span>{point}</li>)}
                </ul>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>

    <ValuesCarousel/>

    <section className="reference-surface px-6 py-11 text-white sm:px-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="max-w-xl font-editorial text-3xl font-bold tracking-tight text-white sm:text-4xl">Seis unidades que trabajan en conjunto</h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#dceaf8]">Cada proyecto reúne las capacidades de ingeniería, datos o estrategia que requiere su alcance.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(unit => <Link key={unit.id} to={`/unidades/${unit.id}`} className="group relative isolate flex min-h-32 items-end overflow-hidden rounded-xl border border-sky-200/40 bg-[#112842] p-4 text-white! transition-colors hover:border-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2">
            <UnitArtwork unit={unit.id} scene={2} className="absolute inset-0 -z-20 size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"/>
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#081b30fa] via-[#102842dd] to-[#13294166]"/>
            <span className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg border border-sky-200/40 bg-[#193b57]"><Icon name={unit.icon} size={18}/></span>
              <span><strong className="block">{unit.label}</strong><span className="block text-xs leading-snug text-[#e4effa]">{unit.short}</span></span>
              <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"><Icon name="arrow" size={15}/></span>
            </span>
          </Link>)}
        </div>
      </div>
    </section>
  </div>;
}

function ValuesCarousel() {
  return <section className="corporate-values px-6 py-11 sm:px-10 lg:py-14">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h2 className="font-editorial text-3xl font-bold text-nuvantis-navy sm:text-4xl">Valores corporativos</h2><p className="mt-1 text-sm text-[#405875]">Principios que guían nuestras decisiones de ingeniería.</p></div>
      </div>
      <div className="values-carousel mt-5" aria-label="Valores de Nuvantis">
        <div className="values-carousel-track">
          {[0, 1].map(copy => <ul className="values-carousel-row" key={copy} aria-hidden={copy === 1 || undefined}>
            {values.map(([title, description], index) => {
              const unit = services[index];
              return <li key={title}>
                <article className="group relative isolate flex flex-col justify-end overflow-hidden rounded-xl border border-sky-200/45 bg-[#11273e] p-5 text-white">
                  <UnitArtwork unit={unit.id} scene={11} className="absolute inset-0 -z-20 size-full object-cover object-[50%_35%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"/>
                  <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#0a192b] via-[#102740ba] to-[#10274036]"/>
                  <span aria-hidden="true" className="mb-3 grid size-9 place-items-center rounded-lg border border-sky-200/40 bg-[#173755]"><Icon name={unit.icon} size={18}/></span>
                  <h3 className="font-editorial text-xl font-bold text-white!">{title}</h3>
                  <p className="mt-1 text-sm text-[#e1edf9]">{description}</p>
                </article>
              </li>;
            })}
          </ul>)}
        </div>
      </div>
    </div>
  </section>;
}
