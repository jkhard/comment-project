import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.models.user import User
from app.services.security import decode_access_token

bearer_scheme = HTTPBearer(auto_error=False)


def unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None:
        raise unauthorized("Требуется авторизация")

    try:
        payload = decode_access_token(credentials.credentials)
    except jwt.ExpiredSignatureError:
        raise unauthorized("Срок действия токена истёк")
    except jwt.InvalidTokenError:
        raise unauthorized("Недействительный токен")

    if payload.get("type") != "access":
        raise unauthorized("Недействительный токен")

    try:
        user_id = int(payload["sub"])
    except (KeyError, ValueError):
        raise unauthorized("Недействительный токен")

    db_user = crud.user.get_user(db, user_id)
    if db_user is None:
        raise unauthorized("Пользователь не найден")
    return db_user