from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.booking_schema import BookingCreate
from app.services.booking_service import (
    create_booking,
    get_bookings
)
from app.utils.auth_dependency import (
    get_current_user
)
from app.models.booking import Booking

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


@router.post("")
def add_booking(
    booking: BookingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return create_booking(
        db,
        current_user["id"],
        booking.room_id,
        booking.check_in,
        booking.check_out
    )


@router.get("")
def fetch_bookings(
    db: Session = Depends(get_db)
):

    return get_bookings(db)


@router.get("/my")
def get_my_bookings(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    bookings = (
        db.query(Booking)
        .filter(
            Booking.user_id == current_user["id"]
        )
        .all()
    )

    return bookings