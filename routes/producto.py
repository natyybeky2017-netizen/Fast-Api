from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from schemas.producto import ProductoCreate, ProductoResponse
from controllers.producto_controller import (crear_producto, 
                                             listar_productos, 
                                             obtener_producto,
                                             actualizar_producto,
                                             eliminar_producto
                                             )


router = APIRouter(
    prefix="/productos",
    tags=["Productos"]
)


@router.post("/", response_model=ProductoResponse, status_code=201)
def crear(producto: ProductoCreate, db: Session = Depends(get_db)):
    return crear_producto(db, producto)
@router.get("/", response_model=list[ProductoResponse])
def listar(db: Session = Depends(get_db)):
    return listar_productos(db)
@router.get("/{producto_id}", response_model=ProductoResponse)
def obtener(producto_id: int, db: Session = Depends(get_db)):
    producto = obtener_producto(db, producto_id)

    if not producto:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    return producto
@router.put("/{producto_id}", response_model=ProductoResponse)
def actualizar(
    producto_id: int,
    producto: ProductoCreate,
    db: Session = Depends(get_db)
):
    producto_actualizado = actualizar_producto(
        db,
        producto_id,
        producto
    )

    if not producto_actualizado:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    return producto_actualizado
@router.delete("/{producto_id}", response_model=ProductoResponse)
def eliminar(producto_id: int, db: Session = Depends(get_db)):
    producto_eliminado = eliminar_producto(db, producto_id)

    if not producto_eliminado:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    return producto_eliminado