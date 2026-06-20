from fastapi import APIRouter

from app.clients.hotel_client import (
    get_hotels_client
)

router = APIRouter(
    prefix="/hotels",
    tags=["Hotels"]
)


@router.get("")
async def get_hotels():

    return await get_hotels_client()