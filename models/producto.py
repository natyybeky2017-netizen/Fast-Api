from sqlalchemy import ForeignKey, String, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.database import Base


class Producto(Base):
    __tablename__ = "productos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=False)
    precio: Mapped[float] = mapped_column(Float, nullable=False)
    material: Mapped[str] = mapped_column(String(100), nullable=False)
    imagen: Mapped[str | None] = mapped_column(String(255), nullable=True)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    id_categoria: Mapped[int] = mapped_column(
        ForeignKey("categorias.id"),
        nullable=False
    )

    categoria = relationship("Categoria", back_populates="productos")