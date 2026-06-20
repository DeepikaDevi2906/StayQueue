from sqlalchemy.orm import Session

from app.models.booking import Booking

from app.clients.hotel_client import (
    get_room_inventory,
    update_room_inventory
)

from app.redis.distributed_lock import (
    acquire_lock,
    release_lock
)

from app.rabbitmq.publisher import (
    publish_booking_created
)

from app.rabbitmq.events import (
    booking_created_event
)

def create_booking(
    db: Session,
    user_id: int,
    room_id: int,
    check_in,
    check_out
):

    lock_value = acquire_lock(
    room_id,
    check_in,
    check_out
)

    if not lock_value:
        raise Exception(
            "Room is currently being booked"
        )

    try:

        inventories = get_room_inventory(
            room_id,
            check_in,
            check_out
        )

        if not inventories:
            raise Exception(
                "Inventory Not Found"
            )

        for inventory in inventories:

            if inventory["available_count"] <= 0:
                raise Exception(
                    "Room Not Available"
                )

        update_room_inventory(
            room_id,
            check_in,
            check_out
        )

        booking = Booking(
            user_id=user_id,
            room_id=room_id,
            check_in=check_in,
            check_out=check_out,
            status="CONFIRMED"
        )

        db.add(booking)

        db.commit()

        db.refresh(booking)

        event = booking_created_event(
    booking
)

        publish_booking_created(
            event
        )

        return booking

    finally:

        release_lock(
            room_id,
            check_in,
            check_out,
            lock_value
        )


def get_bookings(
    db: Session
):

    return db.query(Booking).all()