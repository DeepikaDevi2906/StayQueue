from fastapi import FastAPI

from app.database.db import (
    Base,
    engine
)

from app.models.analytics import Analytics
from app.models.event_log import EventLog

import threading

from app.consumer import start_consumer

Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title="Analytics Service"
)


@app.on_event("startup")
def startup_event():

    thread = threading.Thread(
        target=start_consumer,
        daemon=True
    )

    thread.start()


@app.get("/")
def health_check():

    return {
        "message": "Analytics Service Running"
    }