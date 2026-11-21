from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.dependencies import get_current_user
from app.models.classification_request import ClassificationRequest
from app.models.user import User
from app.schemas.classification_request import (
    ClassificationRequestCreate,
    ClassificationRequestRead,
    ClassificationRequestUpdate,
)

router = APIRouter(prefix="/requests", tags=["classification_requests"])


def get_own_request(db: Session, request_id: int, current_user: User) -> ClassificationRequest:
    db_request = crud.classification_request.get_classification_request(db, request_id)
    if db_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Запись не найдена")
    if db_request.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Нет доступа к чужой записи",
        )
    return db_request


@router.post("/", response_model=ClassificationRequestRead, status_code=status.HTTP_201_CREATED)
def create_request(
    request_in: ClassificationRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return crud.classification_request.create_classification_request(
        db, current_user.id, request_in
    )


@router.get("/", response_model=list[ClassificationRequestRead])
def list_requests(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    return crud.classification_request.get_classification_requests(
        db, user_id=current_user.id, skip=skip, limit=limit
    )


@router.get("/{request_id}", response_model=ClassificationRequestRead)
def get_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_own_request(db, request_id, current_user)


@router.patch("/{request_id}", response_model=ClassificationRequestRead)
def update_request(
    request_id: int,
    request_in: ClassificationRequestUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db_request = get_own_request(db, request_id, current_user)
    return crud.classification_request.update_classification_request(db, db_request, request_in)


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db_request = get_own_request(db, request_id, current_user)
    crud.classification_request.delete_classification_request(db, db_request)