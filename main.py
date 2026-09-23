from fastapi import FastAPI
from database.database import Base,engine
from models.categoria import Categoria
from models.producto import Producto
from routes.categoria import router as categoria_router
from routes.producto import router as producto_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Loja de Joias",
    description="API para gerenciamento de produtos e categorias de uma loja de joias.",
    version="1.0.0"
)

app.include_router(categoria_router)
app.include_router(producto_router)

@app.get("/")
def inicio():
    return {
        "mensaje": "API de la tienda de joyas funcionando"
    }

