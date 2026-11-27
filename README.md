# NUVANTIS — proyecto web local

Esta carpeta contiene el desarrollo en React + TypeScript + Tailwind CSS 4, preparado para Visual Studio Code. La marca se mantiene como NUVANTIS según el logo y el resumen ejecutivo; NOVANTIS es el nombre de la carpeta solicitado.

## Empezar

Ejecuta INICIAR-NUVANTIS.cmd. O abre una terminal en esta carpeta y ejecuta npm run dev. URL: http://127.0.0.1:5173/.

Consulta LEEME-INICIO.md para las instrucciones completas, incluido el backend Django.

## Esta versión

- Portada nueva con dirección visual Obsidian Platinum, tipografía Manrope e Inter y símbolo de marca original.
- Composición de profundidad con movimiento suave, respuesta al cursor, transiciones y apariciones al desplazarse.
- Seis páginas de unidad, catálogo, servicios, sectores, nosotros, proceso, ejemplos, contacto y Muro de Ideas.
- Selectores de necesidad y sector, búsqueda y menú móvil.
- Soporte para movimiento reducido.
- Vite configurado para desarrollo local en VS Code, sin depender de Figma Make.

La revisión de esta entrega incluye TypeScript, compilación Vite y navegación/interacciones en 15 rutas con Chromium a 1440 y 390 px. Sin errores JavaScript en el recorrido ni desbordamiento de documento en móvil. Se comprobaron también las tres pruebas Django existentes. Las capturas reales y el reporte están en VISTAS.

La revisión del navegador sirvió el bundle compilado mediante un interceptor local porque el servidor persistente no resultó accesible entre procesos del entorno de comprobación. El arranque debe realizarse en tu terminal con INICIAR-NUVANTIS.cmd.

## Pendientes de publicación

Contacto e ideas requieren Django activo; el código no confirma registros si el servidor está desconectado. Las políticas legales, canales oficiales, SMTP y alojamiento todavía requieren configuración. La versión de revisión conserva noindex. No se ha publicado ni enviado a GitHub o Figma.

Los documentos COMO-ACTUALIZAR-FIGMA-MAKE.md y docs/ corresponden al proyecto base exportado y se conservan como referencia. Para trabajar ahora usa LEEME-INICIO.md.
