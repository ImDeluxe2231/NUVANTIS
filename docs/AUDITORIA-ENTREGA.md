# Auditoría de Nuvantis antes de la entrega

Fecha: 22 de noviembre de 2026

El objetivo es que cada bloque breve pueda leerse bajo el menú en una ventana de referencia de 1365 × 600. Para bloques largos, presentar primero el resumen y las acciones principales y permitir continuar mediante desplazamiento natural. En móvil se mantiene el apilado y la navegación táctil. Las alturas se midieron con el frontend compilado. Los resultados por bloque están en [AUDITORIA-MEDICIONES.md](AUDITORIA-MEDICIONES.md).

## Portada

| Sección | Mejora recomendada |
|---|---|
| Navegación | Comprobar el foco del menú desplegable, el contraste sobre fotos claras y el margen de los enlaces a secciones bajo el menú fijo. |
| Hero | Mantener el lema, los dos CTA y las seis unidades alrededor del monograma. En pantallas bajas, reducir márgenes antes de reducir la letra. |
| Propuesta de valor | Conservar un solo párrafo institucional y dar una acción clara hacia Nosotros. |
| Soluciones principales | Mantener las tarjetas con la proporción de Unidades. Alinear títulos y botones y reservar la parte derecha de cada tarjeta para la foto. |
| Unidades | Mantener la cuadrícula de seis tarjetas en escritorio. En móvil priorizar títulos, descripciones y enlaces, dejando que las filas crezcan. |
| Carrusel | Mantener el intervalo de cuatro segundos. Comprobar retorno a la primera tarjeta, pausa al enfocar y cambio sin desplazamiento con movimiento reducido. |
| Fortalezas | Reducir el espacio entre el carrusel y las cuatro tarjetas. Alinear iconos y evitar duplicar los mensajes de Soluciones. |
| Selector por necesidad | Mantener la opción activa evidente. En pantallas bajas, reducir la altura del panel visual y dejar visible el enlace a la unidad. |
| Sectores | Usar encuadres distintos para salud, comercio, industria y pymes. Aplicar la misma selección en la portada y la página de detalle. |
| Proceso | Dar a cada paso un entregable breve. Unificar los nombres de las etapas con la página Proceso. |
| Preguntas frecuentes | Mantener una respuesta abierta por vez y equilibrar el espacio de las dos columnas. Revisar el recorrido con teclado. |
| Proyectos conceptuales | Destacar que son ejemplos. Enlazar desde cada tarjeta a la ficha pertinente cuando exista un enlace directo. |
| Recursos | Enlazar cada tarjeta a su guía de destino. Mantener la categoría visible. |
| CTA y pie | Unificar «Conversemos» como acción principal. Revisar enlaces y contraste en las columnas del pie. |

## Páginas internas

| Ruta o sección | Mejora recomendada |
|---|---|
| Unidades | Normalizar la proporción de todas las tarjetas y mantener búsqueda y estado vacío en un lugar visible. |
| Servicios | Mantener búsqueda, filtros y enlace de consulta. Reducir espacio vertical entre el título y el catálogo, y distinguir el resultado de búsqueda de la unidad activa. |
| Software | Mostrar un flujo de ejemplo de pedido a inventario y permisos. Mantener el interés de Contacto asociado a la tarjeta elegida. |
| Intelligence | Mostrar entrada, clasificación y revisión como un recorrido conectado. Identificar cada pantalla como demostrativa. |
| Analytics | Añadir etiquetas de periodo y unidades al gráfico ficticio para que se entienda sin depender del color. |
| Infrastructure | Organizar el caso conceptual por acceso, servicios y respaldo. Usar tarjetas de igual altura con la foto hacia el lado de los iconos. |
| Consulting | Dar a cada etapa un entregable concreto, como diagnóstico, prioridades y hoja de ruta. |
| Labs | Mostrar la relación entre hipótesis, prototipo y evidencia. Enlazar a Muro de Ideas desde el cierre. |
| Nosotros | Misión y Visión ya tienen fotografías, degradados y entrada suave de texto. Revisar el ritmo entre ambas y Valores, y alinear el contexto institucional con el resumen aprobado. |
| Sectores | Presentar el resumen sobre el panel visual y agrupar necesidades y ejemplos debajo. Mantener selección y CTA visibles. |
| Proceso | Mantener la etapa activa, el panel asociado y sus entregables visibles juntos. En móvil, evitar que la etapa activa quede lejos de su explicación. |
| Proyectos | Preservar filtros y etiqueta conceptual. Revisar foco y cierre de cada ficha y añadir enlaces directos cuando haga falta. |
| Recursos | Mantener búsqueda y filtros al abrir una guía. Añadir navegación directa a cada guía y hacer que las tarjetas cerradas mantengan una altura uniforme. |
| Contacto | Priorizar el formulario en la primera pantalla útil. Probar errores, reintento y registro real con Django, incluyendo la capacidad preseleccionada. |
| Muro de Ideas | Separar visualmente ejemplos y publicaciones aprobadas. Probar carga, envío a moderación y reporte con Django. |
| Privacidad y Términos | Afinar la anchura de lectura, enlazar apartados largos y mantener explícita la validación legal pendiente. |
| Página no encontrada | Mostrar enlaces a Inicio, Unidades y Contacto en el primer bloque. |

## Orden de pulido

1. Resolver bloques que superan el espacio disponible en escritorio bajo. Ajustar primero márgenes, ilustraciones y distribución. Medir con el menú visible y una respuesta abierta en FAQ.
2. Revisar contraste y foco en cada plantilla, incluida la legibilidad encima de fotografías. Validar en pantallas físicas o tamaños equivalentes antes de cerrar.
3. Verificar los recorridos completos de contacto y del Muro con Django activo. Las mediciones de esta auditoría usan la compilación y no validan los envíos reales.
4. Medir rendimiento y accesibilidad con las imágenes definitivas y la configuración de despliegue. Revisar SEO e indexación con el dominio de producción aprobado.

## Cambios aplicados en esta ronda

| Área | Resultado |
|---|---|
| Portada en escritorio bajo | Hero de 910 a 731 px y selector por necesidad de 777 a 606 px a 1365 × 600. Se redujeron márgenes y elementos decorativos. El contenido continúa en flujo natural. Sectores mide 479 px y el cierre 409 px. |
| Proceso | Los nombres corresponden a las etapas de la página Proceso y la portada muestra un entregable por tarjeta. El texto añadido aumenta su altura de 518 a 559 px. |
| Preguntas frecuentes | Preguntas más bajas en escritorios de poca altura. El bloque pasó de 593 a 575 px en la medición de referencia. |
| Proyectos | Enlaces directos a las fichas desde la portada. Diálogo modal con cierre mediante Escape y retorno del foco al botón. |
| Recursos | Enlaces desde portada con la guía correspondiente abierta. |
| Analytics y Labs | Gráfico conceptual con semanas, cantidades y etiqueta de datos ficticios. Labs enlaza al Muro de Ideas. |
| Contacto y 404 | Mensajes del formulario con roles de alerta y confirmación. Página 404 con accesos a Inicio, Unidades y Contacto. |
| Verificación | 19 rutas en tres tamaños, sin desbordamiento horizontal ni errores JavaScript en el recorrido. Pruebas focalizadas de enlaces y diálogo. Cinco pruebas de Django aprobadas. |

Queda por cerrar el encaje de los bloques cuya altura sigue superando el espacio bajo el menú, especialmente Soluciones, Unidades y las secciones de tarjetas extensas. También quedan la revisión visual de fotografía y contraste página por página, la prueba de formularios desde el navegador conectado a Django, Lighthouse y la validación legal y de dominio antes de publicar.
