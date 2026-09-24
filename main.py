from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from database.database import Base, engine
from models.categoria import Categoria
from models.producto import Producto
from routes.categoria import router as categoria_router
from routes.producto import router as producto_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
       title="API Tienda de Joyas",
       description="API para gestionar productos y categorías de una tienda de joyas.",
       version="1.0.0"
)


@app.exception_handler(Exception)
async def manejar_error_interno(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Error interno del servidor"
        }
    )

app.include_router(categoria_router)
app.include_router(producto_router)

@app.get("/")
def inicio():
    return {
        "mensaje": "API de la tienda de joyas funcionando"
    }

