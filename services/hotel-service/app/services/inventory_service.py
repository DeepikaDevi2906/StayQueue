from sqlalchemy.orm import Session

from app.models.inventory import Inventory


def create_inventory(
    db: Session,
    room_id: int,
    available_count: int
):

    inventory = Inventory(
        room_id=room_id,
        available_count=available_count
    )

    db.add(inventory)

    db.commit()

    db.refresh(inventory)

    return inventory


def get_inventory(db: Session):

    return db.query(Inventory).all()


def get_inventory_by_room_id(
    db: Session,
    room_id: int
):

    return db.query(Inventory).filter(
        Inventory.room_id == room_id
    ).first()


def update_inventory(
    db: Session,
    room_id: int,
    available_count: int
):

    inventory = db.query(Inventory).filter(
        Inventory.room_id == room_id
    ).first()

    if not inventory:
        return None

    inventory.available_count = available_count

    db.commit()

    db.refresh(inventory)

    return inventory