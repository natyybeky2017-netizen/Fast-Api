import os
from dotenv import load_dotenv

# Carga las variables definidas en el archivo .env si existe
load_dotenv()

# Configuración general de la API
APP_TITLE: str = os.getenv("APP_TITLE", "API Tienda de Joyas")
APP_VERSION: str = os.getenv("APP_VERSION", "1.0.0")
APP_DESCRIPTION: str = os.getenv(
    "APP_DESCRIPTION",
    "API REST para gestionar productos y categorías de una tienda de joyas usando FastAPI y SQLite."
)

# Configuración de la base de datos SQLite
DATABASE_NAME: str = os.getenv("DATABASE_NAME", "joias.db")
DATABASE_URL: str = os.getenv(
    "DATABASE_URL",
    f"sqlite:///./{DATABASE_NAME}"
)
