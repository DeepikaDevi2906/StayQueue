from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import Query

from app.database.session import get_db
from app.schemas.hotel_schema import HotelCreate
from app.services.hotel_service import (
    create_hotel,
    get_hotels,
    get_hotel_details
)

router = APIRouter(
    prefix="/hotels",
    tags=["Hotels"]
)


@router.post("")
def add_hotel(
    hotel: HotelCreate,
    db: Session = Depends(get_db)
):

    created_hotel = create_hotel(
        db,
        hotel.name,
        hotel.city,
        hotel.rating,
        hotel.description
    )

    return created_hotel


@router.get("")
def fetch_hotels(
    db: Session = Depends(get_db)
):

    return get_hotels(db)

@router.get("/{hotel_id}")
def hotel_details(
    hotel_id: int,
    db: Session = Depends(get_db)
):

    return get_hotel_details(
        db,
        hotel_id
    )

@router.get("/search/")
def search_hotels(
    city: str = Query(...),
    db: Session = Depends(get_db)
):

    return search_hotels_by_city(
        db,
        city
    )