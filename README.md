# 💎 API Tienda de Joyas

Aplicación web para la gestión de productos y categorías de una tienda de joyas.

El proyecto está desarrollado con **FastAPI** en el backend, **SQLite** como base de datos y **HTML, CSS y JavaScript** en el frontend. La comunicación entre frontend y backend se realiza mediante **Axios**.

---

## 📌 Descripción

La aplicación permite gestionar los productos de una tienda de joyas y relacionarlos con sus respectivas categorías.

El sistema incluye:

* Gestión de productos.
* Gestión de categorías.
* Relación entre productos y categorías.
* Creación de productos.
* Edición de productos.
* Eliminación de productos.
* Búsqueda de productos por nombre.
* Filtrado de productos por categoría.
* Paginación de productos.
* Validación de datos.
* Manejo de errores HTTP.
* Documentación automática de la API con Swagger.
* Interfaz web para interactuar con la API.

---

## 🛠️ Tecnologías utilizadas

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn

### Frontend

* HTML5
* CSS3
* JavaScript
* Axios
* Tailwind CSS

### Herramientas

* Visual Studio Code
* Git
* GitHub
* DB Browser for SQLite

---

## 🗂️ Estructura del proyecto

```text
FastApi/
│
├── config/
│   ├── __init__.py
│   └── config_variables.py
│
├── controllers/
│   ├── categoria_controller.py
│   └── producto_controller.py
│
├── database/
│   └── database.py
│
├── models/
│   ├── categoria.py
│   └── producto.py
│
├── routes/
│   ├── categoria.py
│   └── producto.py
│
├── schemas/
│   ├── categoria.py
│   └── producto.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── images/
│
├── .gitignore
├── main.py
├── requirements.txt
├── README.md
└── joias.db
```

---

## 🗄️ Base de datos

La aplicación utiliza **SQLite** mediante **SQLAlchemy**.

La base de datos contiene dos entidades principales:

### Categoría

Representa las diferentes categorías de joyas.

Ejemplos:

* Anillos
* Pulseras
* Collares
* Pendientes

### Producto

Representa cada pieza de joyería.

Un producto pertenece a una categoría mediante una relación:

```text
Categoría 1 ─────────── N Productos
```

Esto significa que una categoría puede tener varios productos, mientras que cada producto pertenece a una categoría.

La relación se realiza mediante la clave foránea:

```text
producto.id_categoria → categoria.id
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/natyybeky2017-netizen/Fast-Api.git
```

### 2. Entrar en la carpeta

```bash
cd Fast-Api
```

### 3. Crear el entorno virtual

En Windows:

```powershell
python -m venv .venv
```

### 4. Activar el entorno virtual

En PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 5. Instalar las dependencias

```powershell
pip install -r requirements.txt
```

---

## ▶️ Ejecutar el backend

Con el entorno virtual activado:

```powershell
uvicorn main:app --reload
```

La API estará disponible en:

```text
http://127.0.0.1:8000
```

---

## 📚 Documentación
