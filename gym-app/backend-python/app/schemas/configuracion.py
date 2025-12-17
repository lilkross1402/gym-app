from pydantic import BaseModel

class ConfiguracionResponse(BaseModel):
    duracion_sesion_inactividad: int
    tiempo_advertencia_ms: int

    class Config:
        from_attributes = True
