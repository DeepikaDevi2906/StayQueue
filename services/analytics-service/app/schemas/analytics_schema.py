from pydantic import BaseModel


class BookingEvent(BaseModel):

    user_id: int

    hotel_id: int

    event: str