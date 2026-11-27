# Verificación del proyecto

Revisión del 3 de noviembre de 2026.

- `npm run check`: correcto.
- `npm run build`: correcto; compilación Vite verificada.
- `python backend/manage.py test core`: tres pruebas correctas, sin problemas en la comprobación de Django.
- Navegador Chromium: 18 rutas verificadas sobre la compilación de producción.
- Escritorio: 1440 × 980. Móvil: 390 × 844.
- Menú de seis unidades, búsqueda de servicios, carrusel manual, selector de necesidades, pestañas, enlaces de sector, selección de soporte, validación del formulario y navegación móvil: verificados.
- Sin errores JavaScript durante el recorrido.
- Sin desbordamiento horizontal de documento en las rutas revisadas en móvil.

La revisión del navegador utilizó el bundle de producción servido mediante un interceptor local, porque el puerto de vista previa no quedó accesible entre procesos en este entorno. Las API se mantuvieron como no disponibles durante esa revisión; no se simularon registros guardados. La persistencia del backend se comprobó por separado mediante sus pruebas Django.

La instalación y el arranque dentro de la cuenta de Figma Make no se han ejecutado ni verificado. El proyecto no se ha publicado en un dominio ni en Figma.

Las imágenes en VISTAS son capturas de la implementación actual, no renders generados.
