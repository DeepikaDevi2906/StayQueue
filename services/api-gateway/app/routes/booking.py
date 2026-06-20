from fastapi import (
    APIRouter,
    Depends
)

from app.schemas.booking_schema import (
    BookingCreate
)

from app.clients.booking_client import (
    create_booking_client
)

from app.middleware.auth_middleware import (
    verify_token
)

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


@router.post("")
async def create_booking(
    payload: BookingCreate,
    user=Depends(
        verify_token
    )
):

    return await create_booking_client(
        payload.model_dump(
            mode="json"
        )
    )