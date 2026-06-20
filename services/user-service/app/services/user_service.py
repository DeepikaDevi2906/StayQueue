from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user import User
from app.utils.password import hash_password
from app.utils.password import verify_password
from app.utils.jwt_handler import create_access_token

def create_user(
    db: Session,
    name: str,
    email: str,
    password: str
):

    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(password)

    user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def login_user(
    db: Session,
    email: str,
    password: str
):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    token = create_access_token(
        {
             "id": user.id,
             "email": user.email
        }
    )

    return token