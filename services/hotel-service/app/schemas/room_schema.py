from pydantic import BaseModel

class RoomCreate(BaseModel):

    hotel_id: int

    room_type: str

    price: float