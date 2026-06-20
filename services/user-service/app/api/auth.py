from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.database.session import get_db
from app.schemas.user_schema import UserCreate
from app.services.user_service import create_user, login_user
from app.schemas.user_schema import LoginRequest
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    created_user = create_user(
        db,
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User Registered",
        "id": created_user.id
    }

@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    token = login_user(
        db,
        request.email,
        request.password
    )

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(
    current_user = Depends(get_current_user)
):

    return {
        "user": current_user
    }