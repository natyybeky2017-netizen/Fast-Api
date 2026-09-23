from sqlalchemy.orm import Session

from models.categoria import Categoria
from schemas.categoria import CategoriaCreate


def crear_categoria(db: Session, categoria: CategoriaCreate):
    nueva_categoria = Categoria(
        nombre=categoria.nombre
    )

    db.add(nueva_categoria)
    db.commit()
    db.refresh(nueva_categoria)

    return nueva_categoria
def listar_categorias(db: Session):
    return db.query(Categoria).all()
def obtener_categoria(db: Session, categoria_id: int):
    return db.query(Categoria).filter(Categoria.id == categoria_id).first()

def actualizar_categoria(
    db: Session,
    categoria_id: int,
    categoria: CategoriaCreate
):
    categoria_existente = obtener_categoria(db, categoria_id)

    if not categoria_existente:
        return None

    categoria_existente.nombre = categoria.nombre

    db.commit()
    db.refresh(categoria_existente)

    return categoria_existente

def eliminar_categoria(db: Session, categoria_id: int):
    categoria_existente = obtener_categoria(db, categoria_id)

    if not categoria_existente:
        return None

    if categoria_existente.productos:
        raise ValueError(
            "No se puede eliminar la categoría porque tiene productos asociados"
        )

    db.delete(categoria_existente)
    db.commit()

    return categoria_existente