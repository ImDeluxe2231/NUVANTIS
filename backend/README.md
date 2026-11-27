# Backend NUVANTIS

Backend Django/Python para las consultas de contacto y el Muro de Ideas.

## Desarrollo

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
python backend/manage.py migrate
python backend/manage.py createsuperuser
python backend/manage.py runserver 8000
```

El frontend Vite redirige `/api` a `http://127.0.0.1:8000` por defecto.

## Variables de entorno

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DJANGO_CSRF_TRUSTED_ORIGINS`
- `DB_ENGINE`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`

SQLite es el valor predeterminado para desarrollo. En producción debe configurarse
una base de datos administrada, una clave secreta segura, HTTPS, hosts permitidos,
copias de seguridad, monitoreo y límites de solicitudes.
