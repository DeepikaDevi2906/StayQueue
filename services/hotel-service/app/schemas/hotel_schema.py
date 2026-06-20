from pydantic import BaseModel

class HotelCreate(BaseModel):
    name: str
    city: str
    rating: float
    description: str