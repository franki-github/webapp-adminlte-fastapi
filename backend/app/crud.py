
from sqlalchemy.orm import Session
import models, schemas

def crear_cliente(db: Session, cliente: schemas.ClienteCreate):
    db_cliente = models.Cliente(**cliente.dict())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def obtener_clientes(db: Session):
    return db.query(models.Cliente).all()

def obtener_cliente(db: Session, cliente_id: int):
    return db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()

def actualizar_cliente(db: Session, cliente_id: int, datos: schemas.ClienteCreate):
    cliente = obtener_cliente(db, cliente_id)
    if not cliente:
        return None
    for field, value in datos.dict().items():
        setattr(cliente, field, value)
    db.commit()
    db.refresh(cliente)
    return cliente

def eliminar_cliente(db: Session, cliente_id: int):
    cliente = obtener_cliente(db, cliente_id)
    if cliente:
        db.delete(cliente)
        db.commit()
