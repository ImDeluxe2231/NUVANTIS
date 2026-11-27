# Rediseño NUVANTIS

## Cambios aplicados

- Referencias visuales extraídas en design-references. Los mockups funcionan como referencia y no forman parte de la interfaz.
- Portada alineada con el lema institucional, con seis soluciones enlazadas y acceso a Recursos.
- Encabezado corporativo reutilizable migrado a utilidades Tailwind v4 y tokens de marca.
- Una demostración conceptual interactiva por unidad. El gráfico de Analytics usa datos ficticios.
- Recursos con tres guías originales y navegación desde la portada y el menú.
- Django conserva los modelos y la moderación. Los envíos ahora requieren un token CSRF y validan el contenido JSON y las restricciones de los modelos.

- Portada con franja institucional y muestra de proyectos conceptuales.
- Catálogo con búsqueda por nombre de servicio o unidad. Las páginas corporativas comparten superficies, tarjetas y estados de foco definidos con Tailwind.
- El menú móvil bloquea el desplazamiento de fondo y devuelve el foco al botón al pulsar Escape.
- Las páginas actualizan los títulos, las descripciones y los metadatos sociales durante la navegación.
- Django limita contactos, ideas y reportes por dirección y tipo de envío. La caché local aplica el límite por proceso. En producción con varios procesos debe emplearse una caché compartida y configurarse la identificación del cliente en el proxy.

## Ejecución y verificación

- npm run check
- npm run build
- python backend/manage.py test core
- qa/premium.cjs sirve la compilación en un navegador de prueba y comprueba rutas, menú, búsqueda, carrusel y anchos. No conecta con la API real.
- La configuración de producción requiere DJANGO_DEBUG=false, DJANGO_SECRET_KEY, el dominio admitido y un acceso HTTPS. El proxy local de Vite conserva el host para que el origen de las peticiones coincida durante el desarrollo.

La suite de navegador cubre 18 rutas en escritorio y móvil y comprueba cinco rutas principales en ocho anchos entre 360 y 1920 px. Las cinco pruebas de Django incluyen CSRF, persistencia, moderación, reportes y límites de envío.

## Pendientes

- Completar la migración del CSS tradicional y el rediseño detallado de las páginas secundarias.
- Completar las interacciones y secciones del encargo que aún no tienen equivalente en el proyecto.
- Verificar formularios de punta a punta con navegador y Django, medir Lighthouse y revisar el acceso por teclado en todos los anchos.
- Preparar metadatos sociales disponibles en HTML inicial, canonicals y sitemap cuando se confirme el dominio. La revisión continúa sin indexación.
- La empresa debe aprobar las páginas legales y confirmar contactos, aliados, testimonios y casos antes de publicar esos contenidos.
