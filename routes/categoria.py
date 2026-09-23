from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from schemas.categoria import CategoriaCreate, CategoriaResponse
from controllers.categoria_controller import (
    crear_categoria,
    listar_categorias,
    obtener_categoria,
    actualizar_categoria,
    eliminar_categoria
)


router = APIRouter(
    prefix="/categorias",
    tags=["Categorías"]
)


@router.post("/", response_model=CategoriaResponse, status_code=201)
def crear(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    return crear_categoria(db, categoria)
@router.get("/", response_model=list[CategoriaResponse])
def listar(db: Session = Depends(get_db)):
    return listar_categorias(db)
@router.get("/{categoria_id}", response_model=CategoriaResponse)
def obtener(categoria_id: int, db: Session = Depends(get_db)):
    categoria = obtener_categoria(db, categoria_id)

    if not categoria:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return categoria
@router.put("/{categoria_id}", response_model=CategoriaResponse)
def actualizar(
    categoria_id: int,
    categoria: CategoriaCreate,
    db: Session = Depends(get_db)
):
    categoria_actualizada = actualizar_categoria(
        db,
        categoria_id,
        categoria
    )

    if not categoria_actualizada:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return categoria_actualizada
@router.delete("/{categoria_id}", response_model=CategoriaResponse)
def eliminar(categoria_id: int, db: Session = Depends(get_db)):
    try:
        categoria_eliminada = eliminar_categoria(db, categoria_id)

        if not categoria_eliminada:
            raise HTTPException(
                status_code=404,
                detail="Categoría no encontrada"
            )

        return categoria_eliminada

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )