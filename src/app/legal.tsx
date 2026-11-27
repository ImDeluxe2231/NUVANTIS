import { Link, NavLink } from "react-router";
import { ShowCookieNotice } from "./cookie-notice";

const dataLaw = "https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/243470";
const dataRegulation = "https://www.gob.pe/institucion/anpd/normas-legales/6554453-16-2024-jus";
const consumerLaw = "https://www.gob.pe/institucion/indecopi/normas-legales/1244218-29571";
const rightsGuide = "https://www.gob.pe/9270-que-son-los-derechos-arco";
const rightsProcedure = "https://www.gob.pe/9269-iniciar-procedimiento-para-el-ejercicio-de-derechos-de-acceso-rectificacion-cancelacion-y-oposicion";

const documents = {
  privacidad: {
    title: "Política de privacidad",
    intro: "Qué información recibe NUVANTIS cuando utilizas el sitio y para qué se usa.",
    sections: [
      ["Datos de contacto", "El formulario solicita nombre, correo, WhatsApp, servicio, descripción y medio de contacto preferido. La empresa es opcional. La información se registra al enviar el formulario con tu autorización y se utiliza para responder tu consulta y coordinar los siguientes pasos relacionados con ella."],
      ["Muro de Ideas", "Si envías una idea, guardamos el texto, la categoría y la forma de presentación que elijas. Si eliges publicar con nombre, introduce únicamente el nombre que quieras hacer público. Las ideas aprobadas pueden quedar visibles para cualquier visitante. Evita incluir información personal de terceros o datos confidenciales."],
      ["Conservación y acceso", "Los envíos se registran en el sistema de NUVANTIS para su atención o moderación. Antes de publicar la versión definitiva de esta política se deben confirmar los plazos de conservación, los proveedores con acceso a datos y las posibles transferencias."],
      ["Tus derechos", <>Puedes consultar el procedimiento para ejercer tus derechos en <Link to="/proteccion-datos">Protección de datos</Link>. El uso de identificadores técnicos se describe en la <Link to="/cookies">Política de cookies</Link>.</>],
    ],
  },
  terminos: {
    title: "Términos y condiciones",
    intro: "Condiciones de uso del sitio informativo y de sus formularios.",
    sections: [
      ["Alcance del sitio", "El sitio presenta servicios, guías y demostraciones conceptuales de NUVANTIS. Enviar una consulta no implica contratar un servicio. El alcance, precio, entregables, plazos y soporte se acuerdan por separado en la propuesta o contrato correspondiente."],
      ["Uso responsable", "Usa el sitio y sus formularios con fines lícitos. Envía información que estés autorizado a compartir y evita suplantar a terceros, publicar contenido ofensivo o interferir con el funcionamiento del sitio."],
      ["Publicación de ideas", "Enviar una idea la deja pendiente de revisión. NUVANTIS puede aprobarla para mostrarla en el muro o dejarla sin publicar si contiene información confidencial, datos de terceros o contenido ajeno a la finalidad del espacio."],
      ["Materiales y derechos", <>Las marcas, imágenes y contenidos pertenecen a sus respectivos titulares. Se respetan los derechos y garantías aplicables, incluido el <a href={consumerLaw}>Código de Protección y Defensa del Consumidor, Ley N.° 29571</a>, cuando corresponda.</>],
    ],
  },
  cookies: {
    title: "Política de cookies",
    intro: "Identificadores técnicos que utiliza esta versión del sitio.",
    sections: [
      ["Cookie de seguridad", <>La cookie propia <code>csrftoken</code> se solicita al preparar un envío al servidor. Django la utiliza para comprobar que el envío está autorizado desde el sitio y proteger formularios como Contacto y Muro de Ideas. Su duración depende de la configuración del servidor.</>],
      ["Almacenamiento del aviso", <>La clave <code>nuvantis-cookie-notice-v1</code> guarda en este navegador la fecha de vencimiento del aviso. Transcurridos 180 días, el aviso vuelve a mostrarse al cargar el sitio. Puedes borrar esa clave eliminando los datos de este sitio desde el navegador.</>],
      ["Servicios externos", "Esta versión solicita tipografías a Google Fonts al cargar las páginas. Esto genera una conexión al proveedor. El sitio no incorpora scripts de publicidad o medición de audiencia."],
      ["Controles del navegador", <>Puedes borrar o bloquear las cookies desde tu navegador. Bloquear la cookie de seguridad puede impedir el envío de formularios. En el <Link to="/aviso-cookies">Aviso de cookies</Link> puedes volver a mostrar el aviso.</>],
    ],
  },
  "proteccion-datos": {
    title: "Protección de datos",
    intro: "Cómo solicitar el ejercicio de tus derechos sobre los datos personales que compartes con NUVANTIS.",
    sections: [
      ["Marco normativo", <>El marco aplicable incluye la <a href={dataLaw}>Ley N.° 29733, Ley de Protección de Datos Personales</a> y su <a href={dataRegulation}>Reglamento, aprobado por el Decreto Supremo N.° 016-2024-JUS</a>.</>],
      ["Derechos de las personas", <>Puedes pedir acceso a tus datos, solicitar la rectificación de datos inexactos, solicitar su cancelación u oponerte a un tratamiento cuando corresponda. También puedes retirar el consentimiento otorgado para un tratamiento. Consulta la <a href={rightsGuide}>orientación oficial sobre derechos ARCO</a>.</>],
      ["Presentar una solicitud", <>Usa el <Link to="/contacto">formulario de contacto</Link> e indica que se trata de una solicitud de protección de datos. Describe qué derecho quieres ejercer y a qué envío se refiere, sin incluir contraseñas ni documentación sensible en el mensaje inicial.</>],
      ["Tutela ante la autoridad", <>Si la solicitud no se atiende o discrepas de la respuesta, consulta el <a href={rightsProcedure}>procedimiento de tutela de la Autoridad Nacional de Protección de Datos Personales</a>.</>],
    ],
  },
  "aviso-cookies": {
    title: "Aviso de cookies",
    intro: "Qué significa el aviso de primera visita y cómo volver a consultarlo.",
    sections: [
      ["Qué guardamos", <>El sitio utiliza una cookie técnica de seguridad cuando envías un formulario. Al pulsar «Entendido» guardamos en tu navegador que ya viste el aviso. Consulta la <Link to="/cookies">Política de cookies</Link> para ver qué datos técnicos se guardan.</>],
      ["Cómo funciona el aviso", "Puedes navegar sin cerrar el aviso. Pulsar «Entendido» solo cierra el aviso y recuerda tu decisión en ese navegador."],
    ],
  },
};

export type LegalDocument = keyof typeof documents;

export function LegalPage({ type }: { type: LegalDocument }) {
  const document = documents[type];
  return <>
    <header className="reference-surface px-6 pt-32 pb-8 text-white sm:px-10">
      <div className="mx-auto max-w-6xl"><p className="text-xs font-bold tracking-widest text-[#b9dbf7]">INFORMACIÓN LEGAL</p><h1 className="mt-2 font-editorial text-4xl font-bold sm:text-5xl">{document.title}</h1><p className="mt-3 max-w-2xl text-[#e1edf8]">{document.intro}</p></div>
    </header>
    <section className="bg-linear-to-br from-[#f5faff] to-[#e1edf9] px-6 py-8 text-[#15334e] sm:px-10">
      <div className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label="Documentos legales" className="grid gap-1 rounded-xl border border-[#bed1e4] bg-white p-2">
          {Object.entries(documents).map(([path, item]) => <NavLink key={path} to={`/${path}`} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#204968]! hover:bg-[#e6f0fa] aria-[current=page]:bg-[#dcebf8]">{item.title}</NavLink>)}
        </nav>
        <article className="rounded-xl border border-[#bed1e4] bg-white p-5 shadow-sm sm:p-7">
          {(type === "privacidad" || type === "terminos" || type === "proteccion-datos") && <p className="mb-4 rounded-lg bg-[#edf4fb] px-3 py-2 text-sm text-[#294b68]">Versión para revisión interna de NUVANTIS. Datos empresariales y condiciones finales pendientes de confirmación.</p>}
          {document.sections.map(([title, text], index) => <section key={index} className="border-b border-[#d9e5f0] py-4 first:pt-0 last:border-b-0 last:pb-0">
            <h2 className="font-editorial text-xl font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#354f67] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2">{text}</p>
          </section>)}
          {type === "aviso-cookies" && <ShowCookieNotice/>}
        </article>
      </div>
    </section>
  </>;
}
