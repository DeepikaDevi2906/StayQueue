from sqlalchemy import (
    Column,
    Integer,
    String,
    Date
)

from app.database.db import Base

class Booking(Base):

    __tablename__ = "bookings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(Integer)

    room_id = Column(Integer)

    check_in = Column(Date)

    check_out = Column(Date)

    status = Column(String)