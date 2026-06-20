from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database.session import get_db

from app.services.room_inventory_service import (
    create_inventory,
    get_inventory_by_date_range,
    update_inventory_by_date_range
)

from app.schemas.room_inventory_schema import (
    RoomInventoryCreate
)

router = APIRouter(
    prefix="/room-inventory",
    tags=["Room Inventory"]
)


@router.post("")
def add_inventory(
    inventory: RoomInventoryCreate,
    db: Session = Depends(get_db)
):

    return create_inventory(
        db,
        inventory.room_id,
        inventory.inventory_date,
        inventory.available_count
    )


@router.get("/{room_id}")
def fetch_inventory(
    room_id: int,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db)
):

    return get_inventory_by_date_range(
        db,
        room_id,
        start_date,
        end_date
    )


@router.put("/{room_id}")
def update_inventory(
    room_id: int,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db)
):

    return update_inventory_by_date_range(
        db,
        room_id,
        start_date,
        end_date
    )