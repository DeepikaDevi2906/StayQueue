from fastapi import APIRouter

from app.clients.user_client import (
    get_all_users_client,
    get_user_by_id_client
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/stats")
async def get_stats():

    users = await get_all_users_client()

    return {
        "total_users": len(users),
        "total_hotels": 0,
        "total_bookings": 0,
        "emails_sent": 0
    }


@router.get("/users")
async def get_users():

    return await get_all_users_client()


@router.get("/users/{user_id}")
async def get_user_by_id(
    user_id: int
):

    return await get_user_by_id_client(
        user_id
    )


@router.get("/activity")
async def get_activity():

    return []