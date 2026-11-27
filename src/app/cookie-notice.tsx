import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Icon } from "./ui";

const noticeKey = "nuvantis-cookie-notice-v1";
const noticeEvent = "nuvantis:show-cookie-notice";
const noticeLifetime = 180 * 24 * 60 * 60 * 1000;

export function ShowCookieNotice() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(noticeEvent))} className="mt-4 rounded-lg bg-[#173957] px-4 py-2.5 font-semibold text-white hover:bg-[#214d73] focus-visible:outline-2 focus-visible:outline-offset-2">Volver a mostrar el aviso</button>;
}

export function CookieNotice() {
  const [visible, setVisible] = useState(() => {
    try { return !(Number(localStorage.getItem(noticeKey)) > Date.now()); }
    catch { return true; }
  });

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener(noticeEvent, show);
    return () => window.removeEventListener(noticeEvent, show);
  }, []);

  function acknowledge() {
    try { localStorage.setItem(noticeKey, String(Date.now() + noticeLifetime)); }
    catch { /* The notice can still be dismissed for this visit. */ }
    setVisible(false);
  }

  if (!visible) return null;
  return <aside aria-labelledby="cookie-notice-title" className="fixed inset-x-0 bottom-0 z-[100] max-h-[55dvh] overflow-y-auto border-t-2 border-[#4b95bf] bg-[#f2f8ff] text-[#173651] shadow-[0_-10px_30px_#0a254533]">
    <div className="mx-auto grid max-w-7xl items-center gap-3 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 sm:px-8">
      <span aria-hidden="true" className="hidden size-11 place-items-center rounded-xl bg-[#dcebf8] text-[#245376] sm:grid"><Icon name="shield" size={21}/></span>
      <div>
        <h2 id="cookie-notice-title" className="text-base font-bold text-[#112b43]">Tu privacidad en NUVANTIS</h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed">Usamos una cookie técnica para proteger los envíos y almacenamiento local para recordar que leíste este aviso. Esta versión no usa cookies publicitarias ni analíticas.</p>
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link className="text-[#245376]! underline underline-offset-2" to="/cookies">Política de cookies</Link>
          <Link className="text-[#245376]! underline underline-offset-2" to="/privacidad">Privacidad</Link>
        </div>
      </div>
      <button type="button" onClick={acknowledge} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#193758] to-[#246181] px-5 font-bold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245376]">Entendido <span aria-hidden="true"><Icon name="check" size={17}/></span></button>
    </div>
  </aside>;
}
