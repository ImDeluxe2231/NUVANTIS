# Actualizar el proyecto existente en Figma Make

El ZIP contiene código fuente. Primero hay que extraerlo; adjuntar el ZIP como una imagen en el chat no garantiza que Make sustituya el proyecto.

## Paso a paso

1. Extrae `NUVANTIS-TECHNOLOGIES-actualizado.zip`. Obtendrás la carpeta `NUVANTIS-TECHNOLOGIES`.
2. Conserva una copia del archivo actual de Figma Make o su checkpoint para poder comparar las versiones.
3. Abre tu proyecto de Figma Make.
4. Abre la pestaña **Files / Archivos**. Si no aparece, utiliza **Add tab / Añadir pestaña → Files**. Según la versión de la interfaz, el acceso al código también puede aparecer como **Code**.
5. Arrastra la carpeta extraída `NUVANTIS-TECHNOLOGIES` al explorador de archivos de Make. Arrástrala al árbol de archivos, no al área de la conversación. También puedes usar **File actions → Upload file** para archivos individuales.
6. Si queda como una carpeta adicional dentro del proyecto, pega el mensaje del apartado siguiente para que Make integre sus archivos en la raíz. No necesitas pedirle que vuelva a generar el diseño.
7. Si tu interfaz ofrece reemplazar archivos existentes y has subido su contenido directamente a la raíz, confirma los reemplazos correspondientes.
8. Espera a que termine la instalación de dependencias y se actualice la vista previa.
9. Revisa inicio, menú Unidades, las seis páginas de detalle, servicios, sectores, nosotros y móvil.

Figma documenta que pueden arrastrarse archivos o carpetas al explorador y que después deben mencionarse en un prompt para utilizarlos. Si tu interfaz no permite arrastrar una carpeta, sube los archivos con File actions o abre cada archivo de código y pega su contenido manteniendo las mismas rutas. No hay que renombrar el ZIP a `.fig` ni a `.make`.

## Mensaje para pegar en Make después de subir la carpeta

```text
He subido la carpeta NUVANTIS-TECHNOLOGIES con una actualización completa y ya compilada del proyecto.

Integra su código en la raíz del proyecto actual. Es una actualización del código existente; no rediseñes ni regeneres las pantallas.

1. Copia src/, public/ y backend/ de la carpeta subida a sus rutas equivalentes de la raíz. Crea los archivos nuevos y reemplaza los actualizados.
2. Actualiza package.json, package-lock.json, pnpm-lock.yaml, tsconfig.json, vite.config.ts e index.html con las versiones suministradas, si están presentes.
3. Actualiza .figma/make/site.json para utilizar los metadatos de NUVANTIS. Conserva los scripts de arranque del entorno Figma si el entorno necesita sus propias versiones.
4. Comprueba que src/main.tsx importe index.css y brand.css y que la aplicación use src/app/routes.tsx.
5. Conserva el logo original en public/brand/nuvantis-identidad.png y el componente BrandLogo. No dibujes un logo diferente.
6. Conserva las seis unidades NUVANTIS SOFTWARE, INTELLIGENCE, ANALYTICS, INFRASTRUCTURE, CONSULTING y LABS, sus textos, la paleta Obsidian Platinum y las tipografías Manrope e Inter.
7. Ejecuta npm run check y npm run build. Resuelve únicamente incompatibilidades del entorno sin cambiar el contenido ni la dirección visual.
8. Abre la vista previa y verifica las rutas /, /unidades, /servicios, /sectores, /nosotros, /proceso y las seis rutas /unidades/software, /unidades/intelligence, /unidades/analytics, /unidades/infrastructure, /unidades/consulting y /unidades/labs.

El backend Django se conserva en backend/nuvantis. No afirmes que contactos o ideas se han guardado si el backend no está conectado. No inventes teléfonos, correos, precios, clientes ni textos legales.
```

## Archivos nuevos principales

- `src/app/content.ts`: información corporativa y seis unidades.
- `src/app/corporate.tsx`: inicio, catálogo, servicios y nosotros.
- `src/app/shell-corporate.tsx`: navbar, búsqueda, mega menú y footer.
- `src/brand.css`: nueva identidad y adaptación móvil.
- `public/brand/nuvantis-identidad.png`: arte original.

También se actualizan rutas, páginas, utilidades, estilos globales, entrada de React, favicon, configuración Vite, metadatos y el nombre del paquete Django.

## Alternativa con GitHub

Si prefieres importar el proyecto completo en otro archivo Make, sube la carpeta a un repositorio al que tengas acceso y utiliza **Clone from GitHub** al crear el archivo Make, si tu cuenta ofrece esa opción. Esto crea una nueva copia; conserva el proyecto anterior para comparación. No es necesario hacer público el repositorio.

## Contacto, ideas y publicación

La importación deja disponible el diseño y la navegación. El backend Django, las políticas legales y los canales oficiales requieren configuración antes de publicar formularios reales. Los scripts `.figma/make/dev` de este proyecto inician Vite, no Python.

## Documentación oficial consultada

- https://help.figma.com/hc/en-us/articles/33649966245783-Edit-the-code-of-a-functional-prototype-or-web-app
- https://help.figma.com/hc/en-us/articles/44220165255063-Use-Git-with-Figma-Make-and-code-layers
