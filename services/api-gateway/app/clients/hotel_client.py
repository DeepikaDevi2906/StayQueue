import httpx

HOTEL_SERVICE = "http://hotel-service:8002"


async def get_hotels_client():

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"{HOTEL_SERVICE}/hotels"
        )

    return response.json()