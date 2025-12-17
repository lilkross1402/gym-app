from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.configuracion import ConfiguracionSistema
from app.schemas.configuracion import ConfiguracionResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_configuraciones():
    return {
        "duracion_sesion_inactividad": 5,   # minutos
        "tiempo_advertencia_ms": 60000        # 1 minuto
    }

# ============================
# GET /api/configuraciones
# ============================
@router.get("/", response_model=ConfiguracionResponse)
def get_configuracion(db: Session = Depends(get_db)):
    config = db.query(ConfiguracionSistema).first()

    if not config:
        raise HTTPException(
            status_code=404,
            detail="Configuración del sistema no encontrada"
        )

    return config

