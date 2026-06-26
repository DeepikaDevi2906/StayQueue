from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.user import router as user_router
from app.routes.booking import router as booking_router
from app.routes.hotel import router as hotel_router
from app.routes.admin import router as admin_router

app = FastAPI(
    title="API Gateway"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002"

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(
    user_router
)

app.include_router(
    booking_router
)

app.include_router(
    hotel_router
)
app.include_router(
    admin_router
)