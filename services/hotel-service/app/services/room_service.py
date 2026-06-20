from sqlalchemy.orm import Session

from app.models.room import Room

def create_room(
    db: Session,
    hotel_id: int,
    room_type: str,
    price: float
):

    room = Room(
        hotel_id=hotel_id,
        room_type=room_type,
        price=price
    )

    db.add(room)

    db.commit()

    db.refresh(room)

    return room


def get_rooms(db: Session):

    return db.query(Room).all()