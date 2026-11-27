# Recursos visuales tecnológicos

Las seis fotografías se guardan localmente en `public/images/technology`. Son imágenes referenciales para ilustrar capacidades; no representan instalaciones, personal ni resultados de clientes de NUVANTIS.

Origen: Unsplash, descargadas el 22 de noviembre de 2026.

| Recurso | Identificador de origen |
|---|---|
| Software | https://images.unsplash.com/photo-1461749280684-dccba630e2f6 |
| Intelligence | https://images.unsplash.com/photo-1518770660439-4636190af475 |
| Analytics | https://images.unsplash.com/photo-1551288049-bebda4e38f71 |
| Infrastructure | https://images.unsplash.com/photo-1558494949-ef010cbdcc31 |
| Consulting | https://images.unsplash.com/photo-1522071820081-009f0129c71c |
| Labs | https://images.unsplash.com/photo-1581091226825-a6a2a5aee158 |

La asociación de imagen y unidad se centraliza en `src/app/visuals.tsx`. Allí también se implementa el carrusel: avance automático cada 6,5 segundos, sin franja inferior, contador, pestañas ni botones. Se mantiene el gesto táctil y el teclado; el foco en un enlace pausa la rotación mientras se utiliza. No avanza fuera de pantalla, en una pestaña oculta ni cuando el sistema solicita movimiento reducido.

Las imágenes se muestran con capas CSS para contraste, tonos compatibles con la marca y acercamiento suave. El texto permanece como HTML legible y editable.

