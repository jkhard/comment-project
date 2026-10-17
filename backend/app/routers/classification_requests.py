from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas.classification_request import (
    ClassificationRequestCreate,
    ClassificationRequestRead,
    ClassificationRequestUpdate,
)

router = APIRouter(prefix="/requests", tags=["classification_requests"])


@router.post("/", response_model=ClassificationRequestRead, status_code=status.HTTP_201_CREATED)
def create_request(request_in: ClassificationRequestCreate, db: Session = Depends(get_db)):
    author = crud.user.get_user(db, request_in.user_id)
    if author is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь с указанным user_id не найден",
        )
    return crud.classification_request.create_classification_request(db, request_in)


@router.get("/", response_model=list[ClassificationRequestRead])
def list_requests(
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return crud.classification_request.get_classification_requests(
        db, user_id=user_id, skip=skip, limit=limit
    )


@router.get("/{request_id}", response_model=ClassificationRequestRead)
def get_request(request_id: int, db: Session = Depends(get_db)):
    db_request = crud.classification_request.get_classification_request(db, request_id)
    if db_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Запись не найдена")
    return db_request


@router.patch("/{request_id}", response_model=ClassificationRequestRead)
def update_request(
    request_id: int, request_in: ClassificationRequestUpdate, db: Session = Depends(get_db)
):
    db_request = crud.classification_request.get_classification_request(db, request_id)
    if db_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Запись не найдена")
    return crud.classification_request.update_classification_request(db, db_request, request_in)


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(request_id: int, db: Session = Depends(get_db)):
    db_request = crud.classification_request.get_classification_request(db, request_id)
    if db_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Запись не найдена")
    crud.classification_request.delete_classification_request(db, db_request)