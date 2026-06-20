from sqlalchemy import Column,Integer,String,Float

from app.database.db import Base

class Hotel(Base):

    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True,index=True)

    name = Column(String, nullable=False)

    city = Column(String, nullable=False)

    rating = Column(Float)

    description = Column(String)