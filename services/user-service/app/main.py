from fastapi import FastAPI

from app.database.db import Base, engine
from app.models.user import User
from app.api.auth import router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "User Service Running"
    }