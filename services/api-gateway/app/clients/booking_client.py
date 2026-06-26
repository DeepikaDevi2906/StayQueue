from urllib import response

import httpx

BOOKING_SERVICE = "http://booking-service:8003"


async def create_booking_client(
    payload,
    authorization
):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{BOOKING_SERVICE}/bookings",
            json=payload,
            headers={
                "Authorization": authorization
            }
        )

    print("STATUS =", response.status_code)
    print("TEXT =", response.text)

    return {
    "status": response.status_code,
    "response": response.text
}

async def get_my_bookings_client(
    authorization
):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"{BOOKING_SERVICE}/bookings/my",
            headers={
                "Authorization": authorization
            }
        )

    return response.json()