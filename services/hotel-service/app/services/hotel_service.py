from sqlalchemy.orm import Session

from app.models.hotel import Hotel
from app.models.room import Room
from app.models.inventory import Inventory

def create_hotel(
    db: Session,
    name: str,
    city: str,
    rating: float,
    description: str
):

    hotel = Hotel(
        name=name,
        city=city,
        rating=rating,
        description=description
    )

    db.add(hotel)

    db.commit()

    db.refresh(hotel)

    return hotel


def get_hotels(db: Session):

    return db.query(Hotel).all()

def get_hotel_details(
    db: Session,
    hotel_id: int
):

    hotel = db.query(Hotel).filter(
        Hotel.id == hotel_id
    ).first()

    if not hotel:
        return None

    rooms = db.query(Room).filter(
        Room.hotel_id == hotel_id
    ).all()

    room_data = []

    for room in rooms:

        inventory = db.query(Inventory).filter(
            Inventory.room_id == room.id
        ).first()

        room_data.append(
            {
                "room_id": room.id,
                "room_type": room.room_type,
                "price": room.price,
                "available_count":
                inventory.available_count
                if inventory else 0
            }
        )

    return {
        "id": hotel.id,
        "name": hotel.name,
        "city": hotel.city,
        "rating": hotel.rating,
        "description": hotel.description,
        "rooms": room_data
    }

def search_hotels_by_city(
    db: Session,
    city: str
):

    return db.query(Hotel).filter(
        Hotel.city.ilike(f"%{city}%")
    ).all()