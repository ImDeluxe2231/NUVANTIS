import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { services } from "./content";
import { Icon } from "./ui";

export const technologyImages: Record<string, { src: string; alt: string }> = {
  software: { src: "/images/technology/software.jpg", alt: "Código de una aplicación en pantalla" },
  intelligence: { src: "/images/technology/intelligence.jpg", alt: "Detalle de circuitos y procesadores electrónicos" },
  analytics: { src: "/images/technology/analytics.jpg", alt: "Panel de visualización y análisis de datos" },
  infrastructure: { src: "/images/technology/infrastructure.jpg", alt: "Infraestructura de servidores y redes" },
  consulting: { src: "/images/technology/consulting.jpg", alt: "Colaboración técnica alrededor de equipos de desarrollo" },
  labs: { src: "/images/technology/labs.jpg", alt: "Ingeniería aplicada y trabajo con equipamiento tecnológico" },
};

export function TechnologyImage({ unit, className = "", priority = false }: { unit: string; className?: string; priority?: boolean }) {
  const image = technologyImages[unit] || technologyImages.software;
  return <img className={className} src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} decoding="async" width={1400} height={935}/>;
}

export function UnitArtwork({ unit, scene, className }: { unit: string; scene: number; className: string }) {
  return <img className={className} src={`/images/units/${unit}-${scene}.webp`} alt="" loading="lazy" decoding="async" width={410} height={310}/>;
}

const messages = [
  ["Software que conecta", "tu forma de trabajar.", "Sistemas empresariales, aplicaciones y plataformas diseñados alrededor de tu operación."],
  ["Inteligencia que amplía", "tus posibilidades.", "Automatización e inteligencia artificial aplicadas a necesidades concretas del negocio."],
  ["Datos que se convierten", "en una visión clara.", "Bases de datos, dashboards e indicadores para comprender mejor lo que ocurre en tu organización."],
  ["Infraestructura para", "seguir avanzando.", "Nube, redes, respaldo y seguridad como base para una operación tecnológica organizada."],
  ["Una estrategia clara", "para el siguiente paso.", "Diagnóstico, arquitectura y consultoría para conectar tecnología con objetivos empresariales."],
  ["La próxima solución", "empieza explorando.", "Investigación aplicada y prototipos para transformar preguntas en posibilidades tangibles."],
];

export function TechnologyCarousel() {
  const [active, setActive] = useState(0);


  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.intersectionRatio >= 0.1);
    }, { threshold: 0.1 });
    if (stage.current) observer.observe(stage.current);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);
  const playing = !focused && visible && inView;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % services.length), 4000);
    return () => window.clearTimeout(timer);
  }, [playing, active]);
  const move = (direction: number) => setActive(i => (i + direction + services.length) % services.length);
  return <section id="capacidades" className={`technology-carousel ${playing ? "is-playing" : ""}`} aria-label="Explora las capacidades de NUVANTIS" aria-roledescription="carrusel" onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }} onKeyDown={e => { if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); } if (e.key === "ArrowRight") { e.preventDefault(); move(1); } }} onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touchStart.current !== null) { const delta = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(delta) > 45) move(delta > 0 ? 1 : -1); touchStart.current = null; } }}>
    <div className="container tech-carousel-intro"><div><span className="tech-carousel-kicker">INGENIERÍA EN ACCIÓN</span><h2>Tu próximo paso.<br/><span>Nuestras capacidades.</span></h2></div><p>Del software a la infraestructura.<br/>Explora lo que podemos construir contigo.</p></div>
    <div ref={stage} className="tech-carousel-stage">
      {services.map((unit, i) => {
        let offset = (i - active + services.length) % services.length;
        if (offset > services.length / 2) offset -= services.length;
        return <article className={`tech-carousel-slide ${active === i ? "active" : ""}`} style={{"--slide-offset": offset} as CSSProperties} data-neighbor={Math.abs(offset) === 1} key={unit.id} aria-hidden={active !== i} inert={active !== i} aria-roledescription="diapositiva" aria-label={`${i + 1} de ${services.length}: ${unit.label}`}><TechnologyImage unit={unit.id} priority={i < 2}/><div className="tech-slide-shade"/><span className="tech-slide-eyebrow"><Icon name={unit.icon} size={20}/>{unit.title}</span><div className="tech-slide-content"><h3>{messages[i][0]}<br/><span>{messages[i][1]}</span></h3><div className="tech-slide-detail"><p>{messages[i][2]}</p><Link to={`/unidades/${unit.id}`} className="tech-slide-link">Explorar {unit.label}</Link></div></div></article>;
      })}
    </div>
  </section>;
}

