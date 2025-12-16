from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    nombre: str
    correo: EmailStr
    usuario: str
    contrasena: str

class LoginRequest(BaseModel):
    usuario: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
