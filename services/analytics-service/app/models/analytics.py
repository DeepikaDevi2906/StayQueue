from sqlalchemy import (
    Column,
    Integer,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class Analytics(Base):

    __tablename__ = "analytics"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    booking_id = Column(
        Integer
    )

    room_id = Column(
        Integer
    )

    user_id = Column(
        Integer
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )