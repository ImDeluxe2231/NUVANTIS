import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { useBlocker, useLocation, useNavigate } from "react-router";
import "./navigation-splash.css";

const artwork = "/brand/nuvantis-identidad.png";
const timings = { complete: 7200, formation: 5200, reduced: 4700, reducedFormation: 2700, cover: 240, reducedCover: 45 };
type Variant = "intro" | "navigation";

export function useNavigationSplash() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousHash = useRef(location.hash);
  const [variant, setVariant] = useState<Variant | null>("intro");
  const blocker = useBlocker(({ currentLocation, nextLocation }) =>
    currentLocation.pathname !== nextLocation.pathname ||
    (currentLocation.hash !== nextLocation.hash && nextLocation.hash !== "#contenido")
  );
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reduced ? timings.reduced : timings.complete;

  useLayoutEffect(() => {
    document.documentElement.classList.remove("nuvantis-intro-boot");
  }, []);

  useLayoutEffect(() => {
    if (blocker.state === "blocked") setVariant(current => current ?? "navigation");
  }, [blocker.state]);

  useEffect(() => {
    if (blocker.state !== "blocked" || !variant) return;
    const timer = window.setTimeout(blocker.proceed, reduced ? timings.reducedCover : timings.cover);
    return () => window.clearTimeout(timer);
  }, [blocker, reduced, variant]);

  useLayoutEffect(() => {
    const hadAnchor = previousHash.current;
    previousHash.current = location.hash;
    if (!location.hash) {
      if (hadAnchor) window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    let id: string;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const destination = document.getElementById(id);
    if (destination) destination.scrollIntoView({ behavior: "instant", block: "start" });
  }, [location.pathname, location.hash]);

  function followAnchor(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || link.target || link.hasAttribute("download") || link.hash === "#contenido") return;
    let id: string;
    try { id = decodeURIComponent(link.hash.slice(1)); } catch { return; }
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    if (link.hash !== location.hash) navigate({ pathname: location.pathname, search: location.search, hash: link.hash });
    else document.getElementById(id)?.scrollIntoView({ block: "start" });
  }

  return { variant, duration, reduced, followAnchor, finish: () => setVariant(null) };
}

const particles = Array.from({ length: 34 }, (_, index) => ({
  x: 50 + Math.cos(index * 2.399) * (17 + (index % 8) * 4),
  y: 49 + Math.sin(index * 2.399) * (11 + (index % 7) * 4),
  delay: (index % 9) * -.21,
}));

function EnergyField() {
  const id = useId();
  return <div className="splash-field pointer-events-none absolute inset-0" aria-hidden="true">
    <div className="splash-grid absolute inset-0"/>
    <div className="splash-horizon absolute inset-x-0"/>
    <svg className="splash-waves absolute inset-x-0 bottom-0 h-[50%] w-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
      <defs><linearGradient id={id}><stop stopColor="#38bdf8"/><stop offset=".48" stopColor="#09365d" stopOpacity=".3"/><stop offset="1" stopColor="#7dd3fc"/></linearGradient></defs>
      {Array.from({ length: 13 }, (_, row) => <path key={row} d={`M-40,${38 + row * 18} C270,${5 + row * 28} 310,${224 + row * 12} 713,${148 + row * 13} S1120,${42 + row * 17} 1480,${104 + row * 24}`} stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0 8" fill="none"/>)}
    </svg>
    {particles.map(({ x, y, delay }, index) => <i key={index} className="splash-particle absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, "--particle-x": `${(50 - x) * 2.3}px`, "--particle-y": `${(49 - y) * 2.1}px` } as CSSProperties}/>)}
  </div>;
}

function BrandArtwork({ part, outline = false, letters = false, className }: { part: "symbol" | "name" | "tagline"; outline?: boolean; letters?: boolean; className: string }) {
  const id = useId();
  const divisions = [[495, 495], [632, 632], [758, 758], [900, 867], [1017, 1017], [1143, 1143], [1265, 1265], [1310, 1310], [1430, 1430]];
  const views = { symbol: "145 125 260 260", name: "495 172 935 114", tagline: "505 304 915 44" };
  return <svg viewBox={views[part]} className={className} aria-hidden="true">
    <defs><filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 .2126 .7152 .0722 0 0"/>
      <feComponentTransfer result="mask"><feFuncA type="linear" slope="4" intercept="-.45"/></feComponentTransfer>
      {outline && <><feMorphology in="mask" operator="erode" radius="2" result="interior"/>
        <feComposite in="mask" in2="interior" operator="out" result="edge"/>
        <feFlood floodColor="#91e3ff" result="light"/>
      </>}
      <feComposite in={outline ? "light" : "SourceGraphic"} in2={outline ? "edge" : "mask"} operator="in"/>
    </filter>
    {letters && <>
      <image id={`${id}-original`} href={artwork} width="1536" height="1024" filter={`url(#${id})`}/>
      {divisions.slice(0, -1).map(([leftTop, leftBottom], index) => {
        const [rightTop, rightBottom] = divisions[index + 1];
        return <clipPath id={`${id}-glyph-${index}`} key={index}>
          <polygon points={`${leftTop},172 ${rightTop},172 ${rightBottom},286 ${leftBottom},286`}/>
        </clipPath>;
      })}
    </>}
    </defs>
    {letters ? divisions.slice(0, -1).map((_, index) =>
      <g key={index} className="splash-glyph" style={{ "--glyph-index": index } as CSSProperties}>
        <use href={`#${id}-original`} clipPath={`url(#${id}-glyph-${index})`}/>
      </g>
    ) : <image href={artwork} width="1536" height="1024" filter={`url(#${id})`}/>}
  </svg>;
}

export function NavigationSplash({ variant, duration, reduced, onFinish }: {
  variant: Variant; duration: number; reduced: boolean; onFinish: () => void;
}) {
  const initial = variant === "intro";
  const focusTarget = useRef<HTMLDivElement>(null);
  const finish = useRef(onFinish);
  finish.current = onFinish;
  useLayoutEffect(() => {
    const last = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    focusTarget.current?.focus({ preventScroll: true });
    const timeout = window.setTimeout(() => finish.current(), duration + 90);
    return () => {
      window.clearTimeout(timeout);
      queueMicrotask(() => {
        if (document.querySelector(".navigation-splash")) return;
        const target = document.getElementById(window.location.hash.slice(1));
        if (target?.matches("textarea, input, select, button, a[href], [tabindex]")) target.focus({ preventScroll: true });
        else if (initial && last?.isConnected && last !== document.body) last.focus({ preventScroll: true });
        else document.getElementById("contenido")?.focus({ preventScroll: true });
      });
    };
  }, [duration, initial]);

  const onExit = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onFinish();
  };

  return <div ref={initial ? focusTarget : undefined} tabIndex={initial ? -1 : undefined} role={initial ? "dialog" : undefined} aria-modal={initial || undefined}
    aria-label={initial ? "Introducción de NUVANTIS" : undefined}
    aria-hidden={initial ? undefined : true}
    className={`navigation-splash fixed inset-0 z-[200] grid place-items-center overflow-hidden text-[#f8fafc] splash-${variant}${reduced ? " splash-reduced" : ""}`}
    style={{ "--duration": `${duration}ms`, "--formation": `${reduced ? timings.reducedFormation : timings.formation}ms` } as CSSProperties} onAnimationEnd={onExit}
    onKeyDown={event => {
      if (initial && event.key === "Escape") onFinish();
      if (initial && event.key === "Tab") { event.preventDefault(); focusTarget.current?.focus(); }
    }}>
    {!reduced && <EnergyField/>}
    <div className="splash-stage relative isolate flex w-[min(84vw,39rem)] flex-col items-center" aria-hidden="true">
      <div className="splash-orbits pointer-events-none absolute" aria-hidden="true">
        <i/><i/><i/>
        <svg className="splash-orbit-trails absolute inset-0 size-full" viewBox="0 0 600 380">
          <ellipse cx="300" cy="190" rx="242" ry="127" pathLength="100" transform="rotate(-21 300 190)"/>
          <ellipse cx="300" cy="190" rx="230" ry="115" pathLength="100" transform="rotate(23 300 190)"/>
        </svg>
      </div>
      <div className="splash-emblem relative mb-2 aspect-square w-[clamp(7rem,25vmin,13rem)]">
        <BrandArtwork part="symbol" outline className="splash-outline absolute inset-0 size-full"/>
        <BrandArtwork part="symbol" outline className="splash-trace absolute inset-0 size-full"/>
        <BrandArtwork part="symbol" className="splash-metal absolute inset-0 size-full"/>
        <BrandArtwork part="symbol" className="splash-sweep absolute inset-0 size-full"/>
        <i className="splash-edge-flare absolute left-[6%] top-[6%]"/><i className="splash-edge-flare absolute right-[7%] top-[5%]"/>
        {!reduced && <svg className="splash-build-lines absolute inset-0 size-full" viewBox="145 125 260 260">
          <path pathLength="1" d="M162 139 L385 294 L385 343 L162 189 Z"/>
          <path pathLength="1" d="M334 257 L334 176 L385 136 L385 293"/>
          <path pathLength="1" d="M162 208 L208 241 L208 329 L162 367 Z M225 254 L385 367 L323 367 L225 297 Z"/>
          <circle r="2.7" className="splash-build-spark">
            <animateMotion path="M162 139 L385 294 L385 343 L162 189" begin={`${timings.formation * .2}ms`} dur={`${timings.formation * .24}ms`} fill="freeze"/>
          </circle>
        </svg>}
      </div>
      <div className="splash-wordmark relative w-[min(74vw,25rem)]">
        <BrandArtwork part="name" letters className="splash-name block w-full"/>
        <BrandArtwork part="name" className="splash-name-sweep absolute inset-0 w-full"/>
      </div>
      <BrandArtwork part="tagline" className="splash-tagline mt-2 w-[min(62vw,19rem)]"/>
      <div className="splash-platform relative mt-3 h-8 w-[min(79vw,31rem)]"><i/><i/><i/><b/>
        {!reduced && <svg className="splash-floor-pulse absolute inset-0 size-full overflow-visible" viewBox="0 0 460 32" preserveAspectRatio="none">
          <path pathLength="1" d="M0 17 H154 L177 15 L194 18 L215 16 L230 8 L244 17 H460"/>
        </svg>}
      </div>
      <div className="splash-caption relative mt-4 h-12 w-[min(69vw,19rem)] text-center text-sm">
        <div className="splash-progress relative h-1 overflow-hidden rounded-full bg-[#a6d9ff36]"><i className="absolute inset-0 origin-left rounded-full"/></div>
        <p className="splash-preparing absolute inset-x-0 top-3">Preparando tu experiencia digital…</p>
        <p className="splash-welcome absolute inset-x-0 top-3 font-semibold text-[#b8eaff]">{initial ? "¡Bienvenido a NUVANTIS!" : "NUVANTIS"}</p>
      </div>
    </div>
  </div>;
}
