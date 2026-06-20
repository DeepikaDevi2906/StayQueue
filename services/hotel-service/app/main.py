from fastapi import FastAPI

from app.database.db import Base, engine
from app.models.hotel import Hotel
from app.api.hotel import router
from app.api.hotel import router as hotel_router
from app.api.room import router as room_router
from app.api.inventory import router as inventory_router
from app.api.room_inventory import (
    router as room_inventory_router
)

from app.models.hotel import Hotel
from app.models.room import Room
from app.models.inventory import Inventory


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)
app.include_router(hotel_router)
app.include_router(room_router)
app.include_router(inventory_router)
app.include_router(
    room_inventory_router
)

@app.get("/")
def home():
    return {
        "message": "Hotel Service Running"
    }