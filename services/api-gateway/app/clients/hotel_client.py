import httpx

HOTEL_SERVICE = "http://hotel-service:8002"


async def get_hotels_client():

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"{HOTEL_SERVICE}/hotels"
        )

    return response.json()


async def get_hotel_details_client(
    hotel_id: int
):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"{HOTEL_SERVICE}/hotels/{hotel_id}"
        )

    return response.json()