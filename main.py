from fastapi import FastAPI
from database.database import Base,engine
from models.categoria import Categoria
from models.producto import Producto

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Loja de Joias",
    description="API para gerenciamento de produtos e categorias de uma loja de joias.",
    version="1.0.0"
)


@app.get("/")
def inicio():
    return {
        "mensaje": "API de la tienda de joyas funcionando"
    }