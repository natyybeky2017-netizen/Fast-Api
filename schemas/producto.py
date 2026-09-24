from pydantic import BaseModel
from schemas.categoria import CategoriaResponse

class ProductoBase(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    material: str
    imagen: str | None = None
    stock: int
    id_categoria: int


class ProductoCreate(ProductoBase):
    pass


class ProductoResponse(ProductoBase):
    id: int
    categoria: CategoriaResponse

    class Config:
        from_attributes = True