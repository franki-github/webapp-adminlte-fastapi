# WebApp AdminLTE + FastAPI + PostgreSQL

Guía rápida para arrancar **frontend** (AdminLTE + JS puro) y **backend** (FastAPI + PostgreSQL), en **local** y preparada para salto a **producción**.

---

## 🧱 Requisitos previos

- **Python 3.10+**
- **pip** y **venv**
- **Git**
- (Opcional) **Docker** para levantar PostgreSQL fácilmente

---

## 📁 Estructura recomendada del repo

```
webapp-adminlte-fastapi/
├── frontend/               # HTML, CSS, JS (AdminLTE, páginas, assets)
│   ├── index.html
│   ├── js/
│   └── pages/
└── backend/
    ├── app/                # Código Python del backend (FastAPI)
    │   ├── main.py
    │   ├── models.py
    │   ├── database.py
    │   ├── schemas.py
    │   ├── auth.py
    │   └── crud.py
    ├── requirements.txt
    ├── run.bat             # Windows: activa venv y lanza uvicorn
    └── run.sh              # Linux/Mac: activa venv y lanza uvicorn
```

---

## 🚀 Frontend (local)

### Servir con Python HTTP server
1. Abre una terminal en `frontend/`:
   ```bash
   cd frontend
   ```
2. Lanza el servidor:
   ```bash
   python -m http.server 5500
   ```
3. Abre en el navegador:
   - `http://localhost:5500`

---

## 🔐 Backend (FastAPI) con entorno virtual

1. Abre terminal en `backend/`:
   ```bash
   cd backend
   ```
2. Crea y activa el **entorno virtual**:
   - **Windows**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **Linux/Mac**:
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```
3. Instala dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Crea un archivo `.env` (ver `.env.example`).
5. Lanza el servidor:
   ```bash
   uvicorn app.main:app --reload
   ```
6. Prueba en:
   - Docs: `http://localhost:8000/docs`
   - Redoc: `http://localhost:8000/redoc`

---

## 🐘 PostgreSQL en local (vía Docker)

```bash
docker run --name postgres   -e POSTGRES_USER=admin   -e POSTGRES_PASSWORD=secret   -e POSTGRES_DB=webapp   -p 5432:5432   -d postgres:15
```

Cadena de conexión:
```
DATABASE_URL=postgresql://admin:secret@localhost:5432/webapp
```

---

## ⚙️ Plantilla de variables de entorno (`.env`)

Ver `.env.example` incluido en este repo.

---

## 📦 Producción (visión rápida)

- **Nginx** para servir frontend y hacer proxy `/api` → FastAPI
- **FastAPI** con **Gunicorn + UvicornWorker**
- **PostgreSQL** administrado (o Docker)
- **HTTPS** con Traefik o Certbot

---

¿Dudas o mejoras? Abre un issue en el repo.
