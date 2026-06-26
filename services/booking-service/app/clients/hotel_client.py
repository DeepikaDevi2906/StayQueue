import requests

HOTEL_SERVICE_URL = "http://hotel-service:8002"


def get_room_inventory(
    room_id: int,
    check_in,
    check_out
):

    response = requests.get(
        f"{HOTEL_SERVICE_URL}/room-inventory/{room_id}",
        params={
            "start_date": check_in,
            "end_date": check_out
        }
    )

    return response.json()


def update_room_inventory(
    room_id: int,
    check_in,
    check_out
):

    response = requests.put(
        f"{HOTEL_SERVICE_URL}/room-inventory/{room_id}",
        params={
            "start_date": check_in,
            "end_date": check_out
        }
    )

    return response.json()