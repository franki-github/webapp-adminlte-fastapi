@echo off
REM === Dev runner for Windows ===
REM Launches backend (FastAPI) and frontend (static) in separate terminals.

setlocal ENABLEDELAYEDEXPANSION
REM Jump to the folder where this script lives (repo root)
cd /d "%~dp0"

REM ---- BACKEND WINDOW ----
start "BACKEND (FastAPI)" cmd /k ^
"cd backend ^&^& ^
IF EXIST venv\Scripts\activate.bat ( ^
  call venv\Scripts\activate.bat ^
) ELSE ( ^
  echo [INFO] Creando entorno virtual... ^&^& ^
  python -m venv venv ^&^& ^
  call venv\Scripts\activate.bat ^&^& ^
  echo [INFO] Instalando dependencias... ^&^& ^
  pip install -r requirements.txt ^
) ^&^& ^
echo [INFO] Iniciando FastAPI en http://127.0.0.1:8000 ^&^& ^
uvicorn app.main:app --reload"

REM ---- FRONTEND WINDOW ----
start "FRONTEND (Static server)" cmd /k ^
"cd frontend ^&^& ^
echo [INFO] Servidor estatico en http://localhost:5500 ^&^& ^
python -m http.server 5500"

echo [OK] Dos ventanas abiertas: BACKEND y FRONTEND.
echo Cierra estas ventanas para detener los servicios.
endlocal
