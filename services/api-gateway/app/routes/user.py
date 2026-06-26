from fastapi import APIRouter, Depends

from app.schemas.user_schema import (
    UserCreate,
    UserLogin
)

from app.clients.user_client import (
    register_user_client,
    login_user_client,
    get_me_client
)

from app.middleware.auth_middleware import verify_token

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


@router.get("/me")
async def get_me(
    current_user=Depends(verify_token)
):

    return await get_me_client(
        current_user
    )