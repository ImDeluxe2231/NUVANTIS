import { NavigationSplash, useNavigationSplash } from "./navigation-splash";
import { CookieNotice } from "./cookie-notice";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { services } from "./content";
import { BrandLogo } from "./corporate";
import { Button, Icon } from "./ui";

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const splash = useNavigationSplash();
  const [menu, setMenu] = useState(false);
  const [units, setUnits] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    setMenu(false); setUnits(false); setSearch(false);
    const page = location.pathname === "/" ? "Ingeniería que transforma el futuro" : location.pathname.startsWith("/unidades/") ? services.find(s => location.pathname.endsWith(s.id))?.title || "Unidades" : ({ "/unidades": "Unidades de negocio", "/servicios": "Servicios", "/nosotros": "Nosotros", "/sectores": "Sectores", "/proceso": "Cómo trabajamos", "/contacto": "Contacto", "/muro-de-ideas": "Muro de Ideas", "/proyectos": "Proyectos conceptuales", "/privacidad": "Privacidad", "/terminos": "Términos y condiciones", "/cookies": "Política de cookies", "/proteccion-datos": "Protección de datos", "/aviso-cookies": "Aviso de cookies", "/recursos": "Recursos" } as Record<string, string>)[location.pathname] || "NUVANTIS";
    document.title = `${page} | NUVANTIS`;
    const unit = services.find(service => location.pathname === `/unidades/${service.id}`);
    const summaries: Record<string, string> = {
      "/": "Ingeniería tecnológica en Perú. Software, inteligencia artificial, datos, infraestructura y consultoría.",
      "/servicios": "Explora los servicios de ingeniería tecnológica y soporte de NUVANTIS.",
      "/sectores": "Soluciones para salud, comercio, industria y pequeñas y medianas empresas.",
      "/nosotros": "Conoce la misión, visión y valores de NUVANTIS.",
      "/proyectos": "Explora propuestas conceptuales de software, automatización y datos.",
      "/recursos": "Guías prácticas para preparar proyectos tecnológicos.",
      "/contacto": "Cuéntanos los objetivos de tu organización y solicita asesoría tecnológica.",
    };
    const description = unit?.need || summaries[location.pathname] || `${page} de NUVANTIS. Ingeniería tecnológica e innovación digital.`;
    for (const [key, value] of [["description", description], ["og:title", document.title], ["og:description", description], ["twitter:card", "summary"], ["twitter:title", document.title], ["twitter:description", description]]) {
      const attribute = key.startsWith("og:") ? "property" : "name";
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.setAttribute("content", value);
    }
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setUnits(false); setSearch(false); } };
    const onClick = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) { setUnits(false); setSearch(false); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onClick); };
  }, []);

  useEffect(() => { if (search) searchInput.current?.focus(); }, [search]);

  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const restoreOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") menuToggle.current?.focus();
    };
    document.addEventListener("keydown", restoreOnEscape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", restoreOnEscape);
    };
  }, [menu]);
  const submitSearch = (e: FormEvent) => { e.preventDefault(); navigate(`/unidades${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`); setSearch(false); setMenu(false); };

  return <div className="app nuvantis-app" onClick={splash.followAnchor}>
    <div className="contents" inert={Boolean(splash.variant)}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header ref={header} className={`corporate-header ${scrolled ? "scrolled" : ""}`}>
      <div className="utility-bar"><div className="header-container"><span>Ingeniería tecnológica e innovación digital <i/> Perú</span><div><Link to="/proceso">Cómo trabajamos</Link><Link to="/contacto?interes=soporte">Mantenimiento y soporte <Icon name="arrow" size={12}/></Link></div></div></div>
      <div className="header-container main-nav"><Link className="brand-home" to="/" aria-label="NUVANTIS, ir al inicio"><BrandLogo/></Link>
        <nav id="navegacion" className={`corporate-nav ${menu ? "open" : ""}`} aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <div className="unit-nav-group relative"><button aria-expanded={units} aria-controls="unidades-menu" className={location.pathname.startsWith("/unidades") ? "active" : ""} onClick={() => { setUnits(!units); setSearch(false); }}>Unidades <span aria-hidden="true">⌄</span></button>
            {units && <ul id="unidades-menu" aria-label="Unidades de Nuvantis" className="my-1 grid grid-flow-col grid-cols-2 grid-rows-3 list-none gap-1 rounded-xl border border-[#b5c9df] bg-[#f5f9ff] p-1.5 shadow-xl min-[981px]:absolute min-[981px]:top-full min-[981px]:left-0 min-[981px]:w-80">
              {services.map(unit => <li key={unit.id}>
                <NavLink to={`/unidades/${unit.id}`} end onClick={() => { setUnits(false); setMenu(false); }} className="group flex min-h-10 items-center gap-2.5 rounded-lg px-2 text-sm font-semibold text-[#132942]! transition-colors hover:bg-[#dce9f7] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4276a8] aria-[current=page]:bg-[#dce9f7]">
                  <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-md bg-[#193a5a] text-white"><Icon name={unit.icon} size={15}/></span>
                  <span className="min-w-0 wrap-break-word">{unit.label}</span>
                </NavLink>
              </li>)}
            </ul>}
          </div>
          <NavLink to="/servicios">Servicios</NavLink><NavLink to="/sectores">Sectores</NavLink><NavLink to="/nosotros">Nosotros</NavLink><NavLink to="/proyectos">Proyectos</NavLink><NavLink to="/recursos">Recursos</NavLink>
          <Link className="mobile-contact" to="/contacto">Contacto</Link>
        </nav>
        <div className="header-actions"><button className="search-toggle" onClick={() => { setSearch(!search); setUnits(false); }} aria-label={search ? "Cerrar búsqueda" : "Buscar una unidad o servicio"} aria-expanded={search}><Icon name={search ? "x" : "search"}/></button><Button to="/contacto">Conversemos</Button><button ref={menuToggle} className="corporate-menu-btn" onClick={() => { setMenu(!menu); setUnits(false); }} aria-expanded={menu} aria-controls="navegacion" aria-label={menu ? "Cerrar menú" : "Abrir menú"}><Icon name={menu ? "x" : "menu"}/></button></div>
      </div>
      {search && <form className="header-search" onSubmit={submitSearch}><label htmlFor="site-search">¿Qué estás buscando?</label><div><input ref={searchInput} id="site-search" placeholder="Software, inteligencia artificial, nube…" value={query} onChange={e => setQuery(e.target.value)}/><button type="submit">Buscar <Icon name="arrow" size={16}/></button></div></form>}
    </header>
    <main id="contenido" tabIndex={-1} className="route-main" key={location.pathname}><Outlet/></main>
    <Footer/>
    <CookieNotice/>
    </div>
    {splash.variant && <NavigationSplash variant={splash.variant} duration={splash.duration} reduced={splash.reduced} onFinish={splash.finish}/>}
  </div>;
}

const footerSocialIcons = [
  ["LinkedIn", "M6 8v12M6 4v.1M11 20V8m0 5a4 4 0 0 1 8 0v7"],
  ["Instagram", "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm9 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1.5-5.5v.1"],
  ["Facebook", "M14 21V11h3l.5-3H14V6.5C14 5.5 14.5 5 16 5h2V2h-3c-3 0-5 2-5 5v1H7v3h3v10"],
  ["YouTube", "M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Zm7 1 5 3-5 3Z"],
  ["TikTok", "M14 3v12a4.5 4.5 0 1 1-4.5-4.5M14 3c.4 3.5 2.6 5.5 6 6"],
  ["X", "M4 3h4l12 18h-4Zm16 0-7 8m-2 2-7 8"],
] as const;

function Footer() {
  const groups = [
    { title: "Unidades", icon: "layers", links: services.map(unit => [unit.label, `/unidades/${unit.id}`]) },
    { title: "Empresa", icon: "code", links: [["Nosotros", "/nosotros"], ["Servicios", "/servicios"], ["Sectores", "/sectores"], ["Proyectos", "/proyectos"], ["Cómo trabajamos", "/proceso"]] },
    { title: "Soporte", icon: "shield", links: [["Contactar soporte", "/contacto?interes=soporte"], ["Recursos", "/recursos"], ["Muro de Ideas", "/muro-de-ideas"], ["Política de privacidad", "/privacidad"]] },
  ] as const;

  return <footer className="nuvantis-footer relative isolate overflow-hidden bg-[#091323]! p-0! text-[#b0c6dd]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_14%_0%,#294d74_0%,transparent_55%),linear-gradient(135deg,#0b1729,#101f33_58%,#081321)]"/>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_70%)] bg-[repeating-linear-gradient(90deg,transparent_0_57px,#7ca7cf38_58px_59px)]"/>
    <div aria-hidden="true" className="relative mx-auto h-px max-w-7xl overflow-hidden bg-linear-to-r from-transparent via-[#689abd] to-transparent">
      <span className="footer-light absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-sky-100 to-transparent"/>
    </div>
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-9 sm:grid-cols-3 lg:grid-cols-[1.65fr_1fr_1fr_1fr] lg:gap-x-12 lg:py-11">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:border-r lg:border-[#7599bd40] lg:pr-7">
          <Link className="inline-flex w-52 max-w-full rounded-xl border border-sky-100/20 bg-linear-to-br from-white/10 to-white/0 px-4 py-3 shadow-[inset_0_1px_0_#d0e7ff22] focus-visible:outline-2 focus-visible:outline-offset-4" to="/" aria-label="NUVANTIS, inicio"><BrandLogo className="w-full"/></Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#b0c6dd]">Desarrollamos e integramos soluciones de ingeniería, datos e innovación digital para empresas desde Perú.</p>
          <ul aria-label="Redes sociales" className="mt-5 flex list-none flex-wrap gap-2.5 p-0">
            {footerSocialIcons.map(([name, path]) => (
              <li key={name}>
                <span role="img" aria-label={name} title={name} className="grid size-9 place-items-center rounded-lg border border-sky-100/25 bg-linear-to-br from-[#284661] to-[#13263c] text-[#d6e8fa] shadow-sm">
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {groups.map(({title, icon, links}) => <nav key={title} aria-label={title} className="footer-nav">
          <h2 className="mb-4 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-white"><span aria-hidden="true" className="grid size-7 place-items-center rounded-md border border-sky-100/25 bg-sky-200/10 text-sky-200"><Icon name={icon} size={14}/></span>{title}</h2>
          <ul className="m-0 grid list-none gap-2 p-0">
            {links.map(([label,to]) => <li key={to}><Link to={to} className="inline-block py-0.5 text-sm leading-snug text-[#b0c6dd]! underline-offset-4 transition-colors hover:text-white! hover:underline motion-safe:transition-[color,transform] motion-safe:hover:translate-x-1 motion-safe:focus-visible:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2">{label}</Link></li>)}
          </ul>
        </nav>)}
      </div>
      <div className="space-y-3 border-t border-[#24354a] py-5 text-center text-xs leading-relaxed">
        <nav aria-label="Información legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link className="text-[#c9d9eb]! hover:underline" to="/privacidad">Privacidad</Link>
          <Link className="text-[#c9d9eb]! hover:underline" to="/terminos">Términos y condiciones</Link>
          <Link className="text-[#c9d9eb]! hover:underline" to="/cookies">Cookies</Link>
          <Link className="text-[#c9d9eb]! hover:underline" to="/proteccion-datos">Protección de datos</Link>
          <Link className="text-[#c9d9eb]! hover:underline" to="/aviso-cookies">Aviso de cookies</Link>
        </nav>
        <p>© 2026 Nuvantis Elevating Technology E.I.R.L. Todos los derechos reservados.</p>
        <p>Desarrollado por Medyxia - Tecnología en Salud E.I.R.L.</p>
      </div>
    </div>
  </footer>;
}
