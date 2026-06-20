import uuid

from app.redis.redis_client import redis_client


def acquire_lock(
    room_id: int,
    check_in,
    check_out
):

    lock_key = (
        f"lock:{room_id}:"
        f"{check_in}:"
        f"{check_out}"
    )

    lock_value = str(uuid.uuid4())

    acquired = redis_client.set(
        lock_key,
        lock_value,
        nx=True,
        ex=10
    )

    if acquired:
        return lock_value

    return None


def release_lock(
    room_id: int,
    check_in,
    check_out,
    lock_value: str
):

    lock_key = (
        f"lock:{room_id}:"
        f"{check_in}:"
        f"{check_out}"
    )

    current_value = redis_client.get(lock_key)

    if current_value == lock_value:
        redis_client.delete(lock_key)