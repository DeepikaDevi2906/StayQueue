from jose import jwt, JWTError

from fastapi import (
    Header,
    HTTPException
)

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"


async def verify_token(
    authorization: str = Header(None)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Token Missing"
        )

    if not authorization.startswith(
        "Bearer "
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization Header"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )