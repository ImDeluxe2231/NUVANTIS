import { Link } from "react-router";
import { BrandLogo } from "./corporate";
import { services } from "./content";
import { technologyImages } from "./visuals";
import { Icon } from "./ui";

export function HomeHero() {
  return <section className="reference-surface reference-hero relative isolate overflow-hidden pt-26 text-white md:pt-28">
    <div className="reference-grid" aria-hidden="true"/>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_56%,#4b8dc745,transparent_42%),radial-gradient(ellipse_at_14%_13%,#203e6180,transparent_48%)]"/>
    <div className="home-hero-layout mx-auto grid max-w-[86rem] items-center gap-4 px-6 py-7 md:px-12 lg:grid-cols-[.96fr_1.04fr] lg:py-9">
      <div>
        <p className="text-xs font-semibold tracking-[.25em] text-slate-200">INGENIERÍA TECNOLÓGICA · PERÚ</p>
        <h1 className="mt-6 font-editorial text-[clamp(2.75rem,4.7vw,5rem)] leading-[1.02] font-bold tracking-[-.055em] text-white">Ingeniería que<br className="hidden lg:block"/> <span className="text-[#cfdded]">transforma el futuro.</span></h1>
        <p className="mt-5 flex items-center gap-4 text-xs tracking-[.35em] text-white">ELEVATING TECHNOLOGY <span aria-hidden="true" className="h-px w-16 bg-sky-200 shadow-[0_0_12px_#84caff]"/></p>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">Desarrollamos e integramos soluciones digitales para optimizar procesos, aprovechar datos y acelerar la evolución de las organizaciones.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="reference-cta" to="/servicios">Explorar nuestras soluciones <Icon name="arrow" size={17}/></Link>
          <Link className="reference-glass inline-flex min-h-12 items-center px-5 font-semibold" to="/contacto">Conversemos</Link>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-200">{["Ingeniería aplicada","Innovación tecnológica","Acompañamiento"].map(label => <li key={label} className="flex items-center gap-2"><Icon name="check" size={15}/>{label}</li>)}</ul>
      </div>
      <div className="home-hero-stage relative isolate mt-3 flex min-h-[20rem] flex-col justify-end lg:mt-0 lg:min-h-[26rem]">
        <div className="reference-orbit" aria-hidden="true"/>
        <div className="reference-stage-rings" aria-hidden="true"><i/><i/><i/><span className="home-ring-spark absolute top-1/2 left-[12%] size-1.5 rounded-full bg-sky-100 shadow-[0_0_15px_4px_#84caff] motion-safe:animate-[home-ring-spark_5s_ease-in-out_infinite]"/></div>
        <div className="reference-emblem absolute bottom-24 left-1/2 z-10 w-[42%] max-w-[15rem] -translate-x-1/2"><BrandLogo symbol/></div>
        <div className="reference-pedestal relative z-0 mx-auto mb-4 w-[68%] pb-5 pt-9 text-center">
          <strong className="block text-lg tracking-[.22em] sm:text-xl">NUVANTIS</strong>
          <span className="text-[10px] tracking-[.32em] text-slate-200">TECHNOLOGIES</span>
        </div>
        <div className="relative z-20 mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:absolute lg:inset-x-0 lg:top-[12%] lg:mt-0 lg:grid-cols-2 lg:justify-between lg:gap-y-8">
          {services.map((unit, index) => (
            <Link to={`/unidades/${unit.id}`} key={unit.id} className={`reference-glass group relative isolate flex min-h-14 min-w-0 items-center gap-2 overflow-hidden px-2.5 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 sm:text-sm lg:w-[10.75rem] ${index % 2 ? "lg:justify-self-end" : ""}`}>
              <img src={technologyImages[unit.id].src} alt="" width="172" height="56" decoding="async" className="absolute inset-0 -z-20 size-full object-cover opacity-60 transition-opacity group-hover:opacity-90 group-focus-visible:opacity-90 motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110"/>
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b213af5] via-[#142e48dd] to-[#193a5e50]"/>
              <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-md border border-sky-100/35 bg-[#173754] text-sky-100"><Icon name={unit.icon} size={15}/></span>
              <span className="min-w-0 wrap-break-word">{unit.label}</span>
              <span aria-hidden="true" className="ml-auto hidden shrink-0 text-sky-100 sm:inline"><Icon name="arrow" size={12}/></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <div className="reference-glass mx-5 mb-6 grid grid-cols-2 gap-3 px-5 py-3 text-sm font-semibold text-slate-100 sm:grid-cols-4 lg:mx-auto lg:max-w-[83rem]">
      {["Software a medida","Datos e inteligencia","Infraestructura","Consultoría"].map(label => <span key={label} className="flex items-center gap-2"><Icon name="check" size={16}/>{label}</span>)}
    </div>
  </section>;
}

