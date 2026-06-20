from pydantic import BaseModel
from datetime import date


class BookingCreate(BaseModel):

    room_id: int
    check_in: date
    check_out: date