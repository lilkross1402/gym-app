from sqlalchemy import Column, Integer, String, DateTime, LargeBinary
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100))
    usuario = Column(String(50), unique=True, index=True, nullable=False)
    correo = Column(String(100), unique=True)
    password = Column(String(255), nullable=False)
    foto = Column(LargeBinary)
    created_at = Column(DateTime(timezone=False), server_default=func.now())
