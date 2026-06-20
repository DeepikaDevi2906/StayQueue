from pydantic import BaseModel
from datetime import date


class RoomInventoryCreate(BaseModel):

    room_id: int

    inventory_date: date

    available_count: int