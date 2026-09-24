from sqlalchemy.orm import Session

from models.producto import Producto
from models.categoria import Categoria
from schemas.producto import ProductoCreate


def crear_producto(db: Session, producto: ProductoCreate):
    categoria_existente = db.query(Categoria).filter(
        Categoria.id == producto.id_categoria
    ).first()

    if not categoria_existente:
        raise ValueError("Categoría no encontrada")

    nuevo_producto = Producto(
        nombre=producto.nombre,
        descripcion=producto.descripcion,
        precio=producto.precio,
        material=producto.material,
        imagen=producto.imagen,
        stock=producto.stock,
        id_categoria=producto.id_categoria
    )

    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)

    return nuevo_producto


def listar_productos(db: Session):
    return db.query(Producto).all()


def obtener_producto(db: Session, producto_id: int):
    return db.query(Producto).filter(
        Producto.id == producto_id
    ).first()


def actualizar_producto(
    db: Session,
    producto_id: int,
    producto: ProductoCreate
):
    producto_existente = obtener_producto(db, producto_id)

    if not producto_existente:
        return None

    categoria_existente = db.query(Categoria).filter(
        Categoria.id == producto.id_categoria
    ).first()

    if not categoria_existente:
        raise ValueError("Categoría no encontrada")

    producto_existente.nombre = producto.nombre
    producto_existente.descripcion = producto.descripcion
    producto_existente.precio = producto.precio
    producto_existente.material = producto.material
    producto_existente.imagen = producto.imagen
    producto_existente.stock = producto.stock
    producto_existente.id_categoria = producto.id_categoria

    db.commit()
    db.refresh(producto_existente)

    return producto_existente


def eliminar_producto(db: Session, producto_id: int):
    producto_existente = obtener_producto(db, producto_id)

    if not producto_existente:
        return None

    db.delete(producto_existente)
    db.commit()

    return producto_existente