from fastapi import FastAPI
from threading import Thread

from app.consumer import start_consumer

app = FastAPI(
    title="Notification Service"
)


@app.on_event("startup")
def startup():

    Thread(
        target=start_consumer,
        daemon=True
    ).start()


@app.get("/")
def health():

    return {
        "message":
        "Notification Service Running"
    }