from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============================
# REGISTRO
# POST /api/auth/registro
# ============================
@router.post("/registro")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    exists = db.query(User).filter(
        (User.usuario == data.usuario) | (User.correo == data.correo)
    ).first()

    if exists:
        raise HTTPException(status_code=400, detail="Usuario o correo ya existe")

    user = User(
        nombre=data.nombre,
        correo=data.correo,
        usuario=data.usuario,
        password=hash_password(data.contrasena)  # Aquí usamos 'password' en lugar de 'contrasena'
    )

    db.add(user)
    db.commit()

    return {"message": "Usuario registrado correctamente"}

# ============================
# LOGIN
# POST /api/auth/login
# ============================
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.usuario == data.usuario).first()

    if not user or not verify_password(data.password, user.password):  # Cambiamos a 'password'
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = create_access_token({
        "id": user.id,
        "usuario": user.usuario
    })

    return {
        "token": token,
        "usuario": user.usuario,
        "nombre": user.nombre
    }
