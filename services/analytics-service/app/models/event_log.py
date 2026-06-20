from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class EventLog(Base):

    __tablename__ = "event_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(Integer)

    hotel_id = Column(Integer)

    booking_status = Column(
        String,
        default="PENDING"
    )

    email_status = Column(
        String,
        default="PENDING"
    )

    notification_status = Column(
        String,
        default="PENDING"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )