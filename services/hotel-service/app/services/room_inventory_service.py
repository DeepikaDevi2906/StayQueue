from sqlalchemy.orm import Session
from datetime import date

from app.models.room_inventory import RoomInventory


def create_inventory(
    db: Session,
    room_id: int,
    inventory_date: date,
    available_count: int
):

    inventory = RoomInventory(
        room_id=room_id,
        inventory_date=inventory_date,
        available_count=available_count
    )

    db.add(inventory)

    db.commit()

    db.refresh(inventory)

    return inventory


def get_inventory_by_date_range(
    db: Session,
    room_id: int,
    start_date: date,
    end_date: date
):

    return db.query(RoomInventory).filter(
        RoomInventory.room_id == room_id,
        RoomInventory.inventory_date >= start_date,
        RoomInventory.inventory_date <= end_date
    ).all()


def update_inventory_by_date_range(
    db: Session,
    room_id: int,
    start_date: date,
    end_date: date
):

    inventories = db.query(RoomInventory).filter(
        RoomInventory.room_id == room_id,
        RoomInventory.inventory_date >= start_date,
        RoomInventory.inventory_date <= end_date
    ).all()

    print("Found:", len(inventories))

    for inventory in inventories:

        print(
            inventory.inventory_date,
            inventory.available_count
        )

        inventory.available_count -= 1

    db.commit()

    return inventories