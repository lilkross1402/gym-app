import os

JWT_SECRET = os.getenv("JWT_SECRET", "clave-secreta")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60
