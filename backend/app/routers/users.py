from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])

def ensure_self(user_id: int, current_user: User) -> None:
    """Пользователь может работать только со своей учётной записью."""
    if user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Нет доступа к данным другого пользователя",
        )


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, current_user: User = Depends(get_current_user)):
    ensure_self(user_id, current_user)
    return current_user


@router.patch("/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_self(user_id, current_user)

    if user_in.email is not None:
        existing = crud.user.get_user_by_email(db, user_in.email)
        if existing is not None and existing.id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь с таким email уже зарегистрирован",
            )

    return crud.user.update_user(db, current_user, user_in)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ensure_self(user_id, current_user)
    crud.user.delete_user(db, current_user)