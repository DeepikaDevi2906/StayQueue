from fastapi import (
    APIRouter,
    Depends,
    Header
)

from app.schemas.booking_schema import BookingCreate
from app.clients.booking_client import (
    create_booking_client,
    get_my_bookings_client
)
from app.middleware.auth_middleware import verify_token

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


@router.post("")
async def create_booking(
    payload: BookingCreate,
    authorization: str = Header(None),
    user=Depends(verify_token)
):

    return await create_booking_client(
        payload.model_dump(mode="json"),
        authorization
    )


@router.get("/my")
async def get_my_bookings(
    authorization: str = Header(None),
    user=Depends(verify_token)
):

    return await get_my_bookings_client(
        authorization
    )