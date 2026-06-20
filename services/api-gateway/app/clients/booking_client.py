import httpx

BOOKING_SERVICE = "http://booking-service:8003"


async def create_booking_client(payload):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{BOOKING_SERVICE}/bookings",
            json=payload
        )

    return response.json()