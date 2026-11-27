@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Instala Node.js 22.12 o superior antes de continuar.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Instalando dependencias de la web...
  call npm ci
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo NUVANTIS - desarrollo local
echo Abre http://127.0.0.1:5173 en tu navegador.
echo Para guardar contactos e ideas, inicia tambien Django.
call npm run dev
endlocal
