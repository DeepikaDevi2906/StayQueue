from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.room_schema import RoomCreate

from app.services.room_service import (
    create_room,
    get_rooms
)

router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"]
)


@router.post("")
def add_room(
    room: RoomCreate,
    db: Session = Depends(get_db)
):

    return create_room(
        db,
        room.hotel_id,
        room.room_type,
        room.price
    )


@router.get("")
def fetch_rooms(
    db: Session = Depends(get_db)
):

    return get_rooms(db)