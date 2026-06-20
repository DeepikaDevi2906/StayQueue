from sqlalchemy import (
    Column,
    Integer,
    Date,
    ForeignKey
)

from app.database.db import Base


class RoomInventory(Base):

    __tablename__ = "room_inventory"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    room_id = Column(
        Integer,
        ForeignKey("rooms.id")
    )

    inventory_date = Column(
        Date,
        nullable=False
    )

    available_count = Column(
        Integer,
        nullable=False
    )