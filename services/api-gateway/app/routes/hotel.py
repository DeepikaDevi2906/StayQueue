from fastapi import APIRouter

from app.clients.hotel_client import (
    get_hotels_client,
    get_hotel_details_client
)

router = APIRouter(
    prefix="/hotels",
    tags=["Hotels"]
)


@router.get("")
async def get_hotels():

    return await get_hotels_client()


@router.get("/{hotel_id}")
async def get_hotel_details(
    hotel_id: int
):

    return await get_hotel_details_client(
        hotel_id
    )