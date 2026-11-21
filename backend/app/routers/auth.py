from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.dependencies import get_current_user, unauthorized
from app.models.user import User
from app.schemas.auth import AuthResponse, LoginRequest, RefreshRequest
from app.schemas.user import UserCreate, UserRead
from app.services.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


def _issue_tokens(db: Session, user: User) -> AuthResponse:
    return AuthResponse(
        access_token=create_access_token(user.id),
        refresh_token=crud.refresh_token.create_refresh_token(db, user.id),
        user=UserRead.model_validate(user),
    )


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if crud.user.get_user_by_email(db, user_in.email) is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже зарегистрирован",
        )
    return crud.user.create_user(db, user_in)


@router.post("/login", response_model=AuthResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    db_user = crud.user.authenticate_user(db, credentials.email, credentials.password)
    if db_user is None:
        raise unauthorized("Неверный email или пароль")
    return _issue_tokens(db, db_user)


@router.post("/refresh", response_model=AuthResponse)
def refresh(body: RefreshRequest, db: Session = Depends(get_db)):
    db_token = crud.refresh_token.get_refresh_token(db, body.refresh_token)

    if db_token is None:
        raise unauthorized("Недействительный refresh-токен")
    if db_token.revoked_at is not None:
        raise unauthorized("Refresh-токен отозван")
    if db_token.expires_at <= datetime.now(timezone.utc):
        raise unauthorized("Срок действия refresh-токена истёк")

    crud.refresh_token.revoke_refresh_token(db, db_token)
    return _issue_tokens(db, db_token.user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(body: RefreshRequest, db: Session = Depends(get_db)):
    db_token = crud.refresh_token.get_refresh_token(db, body.refresh_token)
    if db_token is not None:
        crud.refresh_token.revoke_refresh_token(db, db_token)


@router.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user