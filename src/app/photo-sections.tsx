import type { ReactNode } from "react";
import { Link } from "react-router";
import { Icon, type IconName } from "./ui";
import { TechnologyImage } from "./visuals";

export function unitContact(unit: string, capability?: string) {
  const params = new URLSearchParams({ unidad: unit });
  if (capability) params.set("servicio", capability);
  return `/contacto?${params}`;
}

export function PhotoCard({ photo, icon, title, description, children, tone = "dark" }: {
  photo: string; icon: IconName; title: string; description: string; children: ReactNode; tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return <article className={`nuvantis-photo-card group relative isolate flex min-h-[17rem] min-w-0 flex-col justify-end overflow-hidden rounded-2xl border p-5 shadow-lg transition-shadow hover:shadow-xl sm:p-6 ${light ? "border-[#b5cae0] bg-[#f7fbff] text-[#142b45]" : "border-sky-200/45 bg-[#132941] text-white"}`}>
    <TechnologyImage unit={photo} className={`absolute inset-0 -z-20 w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105 ${light ? "h-56 object-[50%_38%]" : "h-full"}`}/>
    <div aria-hidden="true" className={light ? "absolute inset-0 -z-10 bg-[linear-gradient(180deg,#10294112_0px,transparent_87px,#e5eff7dd_128px,#e5eff7_156px,#f1f6fc_100%)]" : "absolute inset-0 -z-10 bg-linear-to-t from-[#081627] from-12% via-[#0b1d33ee] via-55% to-[#142d4880]"}/>
    <span className="mb-auto grid size-10 place-items-center rounded-lg border border-sky-100/40 bg-[#102641e8] text-white"><Icon name={icon} size={19}/></span>
    <h3 className={`font-editorial text-[1.38rem] leading-tight font-bold ${light ? "mt-24 text-[#142b45]!" : "mt-8 text-white!"}`}>{title}</h3>
    <p className={`mt-2 text-sm leading-relaxed ${light ? "text-[#314d68]!" : "text-[#e2edf9]!"}`}>{description}</p>
    {children && <div className="mt-3">{children}</div>}
  </article>;
}

export function PhotoHero({ photo, label, title, description, children }: {
  photo: string; label: string; title: string; description: string; children?: ReactNode;
}) {
  return <header className="nuvantis-photo-hero relative isolate overflow-hidden bg-[#101f34] pt-32 text-white">
    <TechnologyImage unit={photo} priority className="absolute inset-0 -z-20 size-full object-cover object-center"/>
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#091728f7] from-10% via-[#102541dd] to-[#17385960]"/>
    <div className="mx-auto max-w-7xl px-6 pt-9 pb-14 sm:px-10 lg:pt-16 lg:pb-22">
      <p className="text-xs font-bold tracking-[.22em] text-sky-100">{label}</p>
      <h1 className="mt-4 max-w-4xl wrap-break-word font-editorial text-[clamp(2.4rem,6vw,5.1rem)] leading-[1.06] font-bold tracking-tight text-white!">{title}</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#e2edf9]">{description}</p>
      {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
    </div>
  </header>;
}

export const photoLink = "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white! underline decoration-sky-200/60 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4";

export function CollaborationCards() {
  const options = [
    ["software","code","Proyectos a medida","Definimos entregables y validamos la solución por etapas.","/contacto?unidad=software"],
    ["infrastructure","shield","Mantenimiento y soporte","Acordamos qué sistemas se atienden, los canales y el alcance del soporte.","/contacto?interes=soporte"],
    ["consulting","layers","Consultoría tecnológica","Revisamos tus procesos y priorizamos qué modernizar, integrar o construir.","/contacto?unidad=consulting"],
  ] as const;
  return <section className="reference-surface px-6 py-16 text-white sm:px-10 lg:py-24">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold tracking-[.22em] text-sky-100">FORMAS DE COLABORAR</p>
      <h2 className="mt-4 max-w-3xl font-editorial text-4xl leading-tight font-bold text-white sm:text-5xl">Un alcance alineado con tus objetivos.</h2>
      <div className="mt-9 grid gap-5 md:grid-cols-3">{options.map(([photo, icon, title, description, to]) =>
        <PhotoCard key={title} {...{photo, icon, title, description}}><Link to={to} className={photoLink}>Conversar sobre esta opción <Icon name="arrow" size={16}/></Link></PhotoCard>
      )}</div>
    </div>
  </section>;
}
