import { ReactNode } from "react";
import { Link } from "react-router";

export type IconName = "arrow" | "automation" | "brain" | "chart" | "check" | "chevron" | "cloud" | "code" | "database" | "layers" | "link" | "menu" | "message" | "search" | "shield" | "spark" | "users" | "x";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    automation: <><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="4"/></>,
    brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6.2a3.4 3.4 0 0 0 .5 6.7A3.5 3.5 0 0 0 9.5 18"/><path d="M14.5 4.5A3 3 0 0 1 20 6.2a3.4 3.4 0 0 1-.5 6.7 3.5 3.5 0 0 1-5 5.1M9.5 4.5v14M14.5 4.5v14"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    cloud: <path d="M17.5 19H6a4 4 0 0 1-.7-7.9A7 7 0 0 1 19 9a5 5 0 0 1-1.5 10Z"/>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    spark: <path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M17 15a6 6 0 0 1 5 6"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function Button({ children, to, variant = "primary", onClick, type = "button", disabled = false }: {
  children: ReactNode; to?: string; variant?: "primary" | "secondary" | "light";
  onClick?: () => void; type?: "button" | "submit"; disabled?: boolean;
}) {
  const content = <>{children}<Icon name="arrow" size={17}/></>;
  const classes = `btn btn-${variant} inline-flex items-center justify-center gap-3 transition duration-200`;
  return to
    ? <Link className={classes} to={to}>{content}</Link>
    : <button className={classes} onClick={onClick} type={type} disabled={disabled}>{content}</button>;
}

export function SectionHead({ eyebrow, title, subtitle, light = false, center = false }: { eyebrow?: string; title: ReactNode; subtitle?: string; light?: boolean; center?: boolean }) {
  return <div className={`section-head ${light ? "light" : ""} ${center ? "center" : ""} flex flex-col`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{subtitle && <p>{subtitle}</p>}
  </div>;
}

export function TechVisual({ kind = "dashboard", compact = false, variant = 0 }: { kind?: string; compact?: boolean; variant?: number }) {
  return <div className={`tech-visual ${compact ? "compact" : ""} visual-variant-${variant}`} aria-label={`Ilustración tecnológica de ${kind}`}>
    <img className="tech-visual-photograph" src={`/images/technology/${["software","intelligence","analytics","infrastructure","consulting","labs"][variant % 6]}.jpg`} alt="" loading="lazy" decoding="async" width={1400} height={935}/>
    <div className="visual-glow"/><div className="connection connection-a"/><div className="connection connection-b"/>
    <div className="visual-window">
      <div className="window-top"><i/><i/><i/><span>N / {kind}</span></div>
      <div className="window-grid"><div className="visual-sidebar"><b/><b/><b/><b/></div><div className="chart-area">
        <div className="metric-row"><span/><span/><span/></div>
        <svg viewBox="0 0 240 90" preserveAspectRatio="none"><path d="M0 74 C30 70,38 28,70 46 S115 72,142 35 S190 15,240 22"/><path className="line-two" d="M0 82 C38 73,56 62,87 66 S128 28,160 45 S205 60,240 34"/></svg>
        <div className="bar-row"><i/><i/><i/><i/><i/><i/><i/></div>
      </div></div>
    </div>
    <div className="float-card float-a"><Icon name={variant % 2 ? "code" : "database"}/><span>{variant % 2 ? "Aplicación" : "Datos"}</span><b>Conectados</b></div>
    <div className="float-card float-b"><Icon name={kind.includes("IA") ? "brain" : "automation"}/><span>{kind.includes("IA") ? "IA aplicada" : "Procesos"}</span><b>En operación</b></div>
    <div className="node node-a"/><div className="node node-b"/><div className="node node-c"/>
  </div>;
}

export function PageHero({ eyebrow, title, subtitle, visual = "dashboard", variant = 0, children }: { eyebrow: string; title: ReactNode; subtitle: string; visual?: string; variant?: number; children?: ReactNode }) {
  return <section className="relative isolate overflow-hidden bg-nuvantis-navy text-white">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_34%,#435b78_0%,transparent_58%)]"/>
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-9 sm:py-24 lg:grid-cols-2 lg:py-28">
      <div className="min-w-0">
        <span className="text-sm font-semibold uppercase tracking-[.16em] text-nuvantis-silver">{eyebrow}</span>
        <h1 className="mt-5 break-words font-editorial text-[clamp(2.5rem,5vw,4.8rem)] leading-[1.08] font-semibold tracking-tight text-white [&_em]:text-nuvantis-silver [&_em]:not-italic">{title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-nuvantis-cyan">{subtitle}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      <div className="min-w-0"><TechVisual kind={visual} variant={variant}/></div>
    </div>
  </section>;
}

export function CtaBand({ title = "Conversemos sobre tu próxima solución", text = "Cuéntanos qué necesitas mejorar y planteemos juntos el siguiente paso." }: { title?: string; text?: string }) {
  return <section className="cta-band"><div className="container"><div><span className="eyebrow">SIGUIENTE PASO</span><h2>{title}</h2><p>{text}</p></div><Button to="/contacto" variant="light">Cuéntanos tu idea</Button></div></section>;
}
