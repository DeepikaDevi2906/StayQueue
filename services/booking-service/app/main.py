from fastapi import FastAPI

from app.database.db import (
    Base,
    engine
)

from app.models.booking import Booking
from app.api.booking import router as booking_router

app = FastAPI()

Base.metadata.create_all(
    bind=engine
)
app.include_router(booking_router)

@app.get("/")
def home():

    return {
        "message":
        "Booking Service Running"
    }