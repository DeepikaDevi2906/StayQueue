from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base

class Room(Base):

    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)

    hotel_id = Column(
        Integer,
        ForeignKey("hotels.id")
    )

    room_type = Column(String, nullable=False)

    price = Column(Float, nullable=False)

    hotel = relationship("Hotel")