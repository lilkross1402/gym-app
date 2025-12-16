from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

# Routers ya migrados
from app.api.auth import router as auth_router
from app.api.users import router as users_router

app = FastAPI(
    title="Gym API",
    version="1.0.0"
)

# ============================
# CORS
# ============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# Base de datos
# ============================
Base.metadata.create_all(bind=engine)

# ============================
# Rutas ACTIVAS
# ============================
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(users_router, prefix="/api/user", tags=["User"])

# ============================
# Healthcheck
# ============================
@app.get("/health")
def health():
    return {"status": "ok"}
