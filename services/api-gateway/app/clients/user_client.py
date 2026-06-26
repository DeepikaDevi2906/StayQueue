import httpx
from fastapi import HTTPException

USER_SERVICE = "http://user-service:8001"


async def register_user_client(payload):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{USER_SERVICE}/auth/register",
            json=payload
        )

    if response.status_code >= 400:

        raise HTTPException(
            status_code=response.status_code,
            detail=response.json().get(
                "detail",
                "Registration Failed"
            )
        )

    return response.json()


async def login_user_client(payload):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{USER_SERVICE}/auth/login",
            json=payload
        )

    if response.status_code >= 400:

        raise HTTPException(
            status_code=response.status_code,
            detail=response.json().get(
                "detail",
                "Login Failed"
            )
        )

    return response.json()
async def get_me_client(token):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            "http://user-service:8001/auth/me",
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

        return response.json()
    
async def get_all_users_client():

    async with httpx.AsyncClient() as client:

        response = await client.get(
            "http://user-service:8001/auth/all"
        )

        return response.json()
    

async def get_user_by_id_client(
    user_id: int
):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"http://user-service:8001/auth/{user_id}"
        )

        return response.json()