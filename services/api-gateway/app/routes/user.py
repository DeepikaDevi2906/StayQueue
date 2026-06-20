from fastapi import APIRouter

from app.schemas.user_schema import (
    UserCreate,
    UserLogin
)

from app.clients.user_client import (
    register_user_client,
    login_user_client
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register")
async def register_user(
    payload: UserCreate
):

    return await register_user_client(
        payload.model_dump()
    )


@router.post("/login")
async def login_user(
    payload: UserLogin
):

    return await login_user_client(
        payload.model_dump()
    )