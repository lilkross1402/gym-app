from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
import io

from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserResponse
from app.core.jwt import get_current_user

router = APIRouter(prefix="/api/user", tags=["User"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
# PERFIL
# =========================
@router.get("/profile", response_model=UserResponse)
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return current_user

# =========================
# FOTO PERFIL (GET)
# =========================
@router.get("/profile/photo")
def get_profile_photo(
    current_user: User = Depends(get_current_user)
):
    if not current_user.foto:
        raise HTTPException(status_code=404, detail="Sin foto")

    return StreamingResponse(
        io.BytesIO(current_user.foto),
        media_type="image/jpeg"
    )

# =========================
# FOTO PERFIL (POST)
# =========================
@router.post("/profile/photo")
def upload_profile_photo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    current_user.foto = file.file.read()
    db.commit()
    return {"message": "Foto actualizada"}
