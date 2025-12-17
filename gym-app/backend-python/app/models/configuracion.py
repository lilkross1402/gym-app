from sqlalchemy import Column, Integer
from app.database import Base

class ConfiguracionSistema(Base):
    __tablename__ = "configuracion_sistema"

    id = Column(Integer, primary_key=True, index=True)
    duracion_sesion_inactividad = Column(Integer, nullable=False)
    tiempo_advertencia_ms = Column(Integer, nullable=False)
