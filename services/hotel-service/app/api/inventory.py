from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.inventory_schema import (
    InventoryCreate,
    InventoryUpdate
)

from app.services.inventory_service import (
    create_inventory,
    get_inventory,
    get_inventory_by_room_id,
    update_inventory
)

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


@router.post("")
def add_inventory(
    inventory: InventoryCreate,
    db: Session = Depends(get_db)
):

    return create_inventory(
        db,
        inventory.room_id,
        inventory.available_count
    )


@router.get("")
def fetch_inventory(
    db: Session = Depends(get_db)
):

    return get_inventory(db)


@router.get("/{room_id}")
def fetch_inventory_by_room(
    room_id: int,
    db: Session = Depends(get_db)
):

    return get_inventory_by_room_id(
        db,
        room_id
    )


@router.put("/{room_id}")
def update_room_inventory(
    room_id: int,
    inventory: InventoryUpdate,
    db: Session = Depends(get_db)
):

    return update_inventory(
        db,
        room_id,
        inventory.available_count
    )