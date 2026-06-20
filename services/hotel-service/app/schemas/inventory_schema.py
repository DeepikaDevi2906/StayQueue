from pydantic import BaseModel

class InventoryCreate(BaseModel):
    room_id: int
    available_count: int


class InventoryUpdate(BaseModel):
    available_count: int