# NUVANTIS — desarrollo local

Abre esta carpeta en Visual Studio Code. Se conserva la marca **NUVANTIS** del resumen y del logo, aunque la carpeta se llama NOVANTIS.

## Iniciar

Requiere Node.js 22.12 o superior. Ejecuta `INICIAR-NUVANTIS.cmd` o utiliza la terminal:

```powershell
npm ci
npm run dev
```

Abre http://127.0.0.1:5173/ y deja la terminal abierta. Guarda los archivos para ver los cambios.

## Desarrollo

React 19, TypeScript, React Router, Vite y Tailwind CSS 4. Tailwind está integrado mediante @tailwindcss/vite. Las utilidades conviven con estilos de marca y animaciones CSS.

- `src/app/premium.tsx`: portada e interacciones nuevas.
- `src/premium.css`: composiciones, transiciones y movimiento.
- `src/app/content.ts`: contenido corporativo y seis unidades.
- `src/app/shell-corporate.tsx`: navbar, búsqueda, mega menú y footer.
- `src/app/corporate.tsx`: páginas corporativas y logo original.
- `src/app/pages.tsx`: páginas de detalle, contacto, proceso e ideas.
- `src/brand.css`: identidad Obsidian Platinum y responsive.

## Backend

Contacto y Muro de Ideas conservan el backend Django del proyecto. En otra terminal:

```powershell
py -m venv backend/.venv
.\backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
.\backend\.venv\Scripts\python.exe backend/manage.py migrate
.\backend\.venv\Scripts\python.exe backend/manage.py createsuperuser
.\backend\.venv\Scripts\python.exe backend/manage.py runserver 8000
```

El frontend redirige /api al backend local. El administrador está en http://127.0.0.1:8000/admin/. Los envíos solo se confirman si responde el servidor; las ideas requieren aprobación administrativa.

## Validar y compilar

```powershell
npm run check
npm run build
npm run preview
```

La compilación queda en dist. La vista previa compilada necesita un servidor API o proxy configurado para enviar formularios.

Esta es una versión local de desarrollo. La configuración noindex sigue activa. Los textos legales y canales oficiales están pendientes de confirmación. No se ha publicado ni sincronizado con Figma o GitHub.
